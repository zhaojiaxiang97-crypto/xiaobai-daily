#!/usr/bin/env bash
# 整应用入口验证：以 App.vue / bootstrap.js 为入口，在真实 Chrome 里加载
#
# 为什么单独一个脚本：批量渲染测试（gen-render-test.cjs）挂载的是单个组件，
# 碰不到「shared.js ↔ 组件」的模块环。TDZ 只在以根组件为入口时暴露。
#
# 用法: verify-root-entry.sh <工程目录> [端口]
#   退出码 0 = 根组件可加载且 bootstrap 可执行
set -uo pipefail
PROJ="${1:?用法: verify-root-entry.sh <工程目录> [端口]}"
PORT="${2:-5212}"
CDP=$((PORT + 1000))

SRC="$PROJ/src"
[ -d "$SRC/components" ] || { echo "找不到 $SRC/components"; exit 1; }

# 1) 测试页：两条断言 —— (a) App.vue 作为入口能否加载 (b) bootstrap.js 能否执行到挂载
cat > "$PROJ/root.html" <<'HTML'
<!doctype html><html lang="zh-CN"><head><meta charset="UTF-8"><title>root-entry</title></head>
<body><div id="app"></div><script type="module" src="/src/root-test.js"></script></body></html>
HTML

cat > "$SRC/root-test.js" <<'JS'
// 以根组件为入口：修复前 App.vue → shared.js → 顶层读组件绑定（未初始化）→ TDZ
window.__ERR__ = null;
window.__STAGE__ = 'start';
window.__APP_ERR__ = null;
window.__BOOT_ERR__ = null;
window.__MOUNT_LEN__ = null;
try {
  window.__STAGE__ = 'import-app';
  await import('./components/App.vue');
  window.__STAGE__ = 'app-ok';
} catch (e) {
  window.__APP_ERR__ = String((e && e.stack) || e).slice(0, 500);
}
try {
  window.__STAGE__ = 'import-bootstrap';
  await import('./bootstrap.js');
  window.__STAGE__ = 'imported';
  await new Promise(r => setTimeout(r, 1500));
  const el = document.getElementById('app');
  window.__MOUNT_LEN__ = el ? el.innerHTML.length : -1;
  window.__STAGE__ = 'done';
} catch (e) {
  window.__BOOT_ERR__ = String((e && e.stack) || e).slice(0, 500);
  window.__STAGE__ = 'caught';
}
JS

pkill -f "vite --port $PORT" 2>/dev/null
pkill -f "remote-debugging-port=$CDP" 2>/dev/null
sleep 1

cd "$PROJ" || exit 1
nohup npx vite --port "$PORT" > /tmp/vue-root-vite.log 2>&1 &
sleep 12

nohup "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless=new --disable-gpu --no-sandbox \
  --remote-debugging-port=$CDP --user-data-dir="/tmp/vue-root-chrome-$PORT" \
  "http://localhost:$PORT/root.html" > /tmp/vue-root-chrome.log 2>&1 &
sleep 10

python3 - "$CDP" "$PORT" <<'PY'
import json, sys, time, urllib.request
from websockets.sync.client import connect
cdp, port = sys.argv[1], sys.argv[2]
try:
    pages = [p for p in json.load(urllib.request.urlopen(f'http://127.0.0.1:{cdp}/json')) if p['type'] == 'page']
except Exception as e:
    print('CDP 不可达:', e); sys.exit(2)
if not pages:
    print('无 page target'); sys.exit(2)
with connect(pages[0]['webSocketDebuggerUrl'], max_size=10**8) as ws:
    seq = [0]
    def call(expr):
        seq[0] += 1
        ws.send(json.dumps({"id": seq[0], "method": "Runtime.evaluate",
                            "params": {"expression": expr, "returnByValue": True, "awaitPromise": True}}))
        while True:
            m = json.loads(ws.recv())
            if m.get('id') == seq[0]:
                r = m.get('result', {})
                if 'exceptionDetails' in r:
                    return '__exc__' + r['exceptionDetails'].get('text', '')
                return r.get('result', {}).get('value')
    time.sleep(3)
    err = call("document.querySelector('vite-error-overlay')?.shadowRoot?.textContent || ''")
    if err:
        print('VITE 编译错误:', err[:400]); sys.exit(1)
    t0 = time.time()
    while time.time() - t0 < 60:
        time.sleep(1.0)
        if call("window.__STAGE__ === 'done' || window.__STAGE__ === 'caught' ? 1 : 0"):
            break
    stage = call("window.__STAGE__")
    app_err = call("window.__APP_ERR__") or ''
    boot_err = call("window.__BOOT_ERR__") or ''
    mount = call("window.__MOUNT_LEN__")
    print('stage      =', stage)
    print('App.vue    =', 'FAIL: ' + app_err.split('\n')[0] if app_err else 'OK')
    print('bootstrap  =', ('FAIL: ' + boot_err.split('\n')[0]) if boot_err else 'OK')
    print('挂载长度    =', mount)
    tdz = 'before initialization' in (app_err + boot_err)
    print('TDZ        =', 'FAIL' if tdz else 'PASS')
    ok = (not tdz) and (not boot_err) and stage == 'done'
    print('RESULT:', 'PASS' if ok else 'FAIL')
    sys.exit(0 if ok else 1)
PY
RC=$?
pkill -f "remote-debugging-port=$CDP" 2>/dev/null
pkill -f "vite --port $PORT" 2>/dev/null
exit $RC
