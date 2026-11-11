#!/usr/bin/env bash
# 真实浏览器渲染验证：vite dev + headless Chrome + CDP 取 DOM
#
# 为什么不用 jsdom：原应用代码大量依赖浏览器 API（localStorage/matchMedia/
# IntersectionObserver 等），jsdom 覆盖不全，会在模块加载阶段就崩，
# 掩盖真正的问题。真实 Chrome 才是有效验证环境。
#
# 用法: tools/vue-decompiler/verify-browser.sh <工程目录> [端口]
set -uo pipefail
PROJ="${1:?用法: verify-browser.sh <工程目录> [端口]}"
PORT="${2:-5199}"
CDP=9333

pkill -f "remote-debugging-port=$CDP" 2>/dev/null
pkill -f "vite --port $PORT" 2>/dev/null
sleep 1

cd "$PROJ" || exit 1
nohup npx vite --port "$PORT" > /tmp/vue-verify-vite.log 2>&1 &
sleep 12

nohup "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless=new --disable-gpu --no-sandbox \
  --remote-debugging-port=$CDP --user-data-dir=/tmp/vue-verify-chrome \
  "http://localhost:$PORT/" > /tmp/vue-verify-chrome.log 2>&1 &
sleep 10

python3 - "$CDP" <<'PY'
import json, sys, time, urllib.request
from websockets.sync.client import connect
cdp = sys.argv[1]
try:
    pages = [p for p in json.load(urllib.request.urlopen(f'http://127.0.0.1:{cdp}/json')) if p['type'] == 'page']
except Exception as e:
    print('CDP 不可达:', e); sys.exit(1)
if not pages:
    print('无 page target'); sys.exit(1)
with connect(pages[0]['webSocketDebuggerUrl'], max_size=10**8) as ws:
    def call(i, e):
        ws.send(json.dumps({"id": i, "method": "Runtime.evaluate",
                            "params": {"expression": e, "returnByValue": True, "awaitPromise": True}}))
        while True:
            m = json.loads(ws.recv())
            if m.get('id') == i:
                return m['result']['result'].get('value')
    # 等 HMR 稳定
    time.sleep(3)
    err = call(1, "document.querySelector('vite-error-overlay')?.shadowRoot?.textContent || ''")
    if err:
        print('VITE 编译错误:', err[:400]); sys.exit(1)
    hosts = json.loads(call(2, """JSON.stringify(Array.from(document.body.children)
      .filter(d => d.hasAttribute && d.hasAttribute('data-v-app'))
      .map(d => ({ len: d.innerHTML.length, html: d.innerHTML.slice(0,200) })))""") or '[]')
    ok = [h for h in hosts if h['len'] > 20]
    print(f'渲染宿主 {len(hosts)} 个，有内容 {len(ok)} 个')
    for h in ok[:6]:
        print(f"  {h['len']}B  {h['html'][:140]}")
    print('RESULT:', 'PASS' if ok else 'FAIL')
    sys.exit(0 if ok else 1)
PY
RC=$?
pkill -f "remote-debugging-port=$CDP" 2>/dev/null
exit $RC
