#!/usr/bin/env bash
# 应用内容断言验证：构建产物 → 启动 → 断言九页面主内容非空 → PASS/FAIL
#
# 这是本项目最重要的护栏。历史上曾有两次事故只靠"侧边栏存在"判断验证通过，
# 但主内容区实际全空（round-0400 的 import 别名批量改名、round-0402 的函数
# 参数改名）。本脚本断言 .content-body 的文本长度，能立即发现这类回归。
#
# 用法: tools/verify-app.sh <App.app> [CDP端口]
#   例: tools/verify-app.sh build/extract/小白日报.app
#   依赖: 与真实用户数据同构的 xiaohei.db（含 usageModeGuideSeenUserId=1，
#         跳过新手引导直达主内容）
set -uo pipefail

APP="${1:?用法: verify-app.sh <App.app> [port]}"
PORT="${2:-9222}"
NAVS=("今日工作" "待办" "生成报告" "记忆时间线" "热力图" "应用记录" "历史报告" "API 设置" "隐私保护")

# 1) 清实例锁
pkill -9 -f "小黑日报助手" 2>/dev/null
pkill -9 -f "小白日报" 2>/dev/null
sleep 2

# 2) 准备测试数据目录（真实数据副本，跳过引导）
TESTDIR="/tmp/xiaobai-verify"
rm -rf "$TESTDIR"; mkdir -p "$TESTDIR/data"
REAL_DB="$HOME/Library/Application Support/xiaobai-daily/data/xiaohei.db"
if [ -f "$REAL_DB" ]; then
  cp "$REAL_DB" "$TESTDIR/data/xiaohei.db"
else
  echo "WARN: 未找到真实数据库，将使用空库（可能停留在引导页导致误判）"
fi

# 3) 启动
nohup "$APP/Contents/MacOS/小黑日报助手" --remote-debugging-port="$PORT" \
      --user-data-dir="$TESTDIR" > /tmp/xiaobai-verify.log 2>&1 &
sleep 26

# 4) CDP 断言
python3 - "$PORT" "${NAVS[@]}" <<'PY'
import json, sys, time, urllib.request
port = sys.argv[1]
navs = sys.argv[2:]
try:
    pages = [p for p in json.load(urllib.request.urlopen(f'http://127.0.0.1:{port}/json')) if p['type'] == 'page']
except Exception as e:
    print('RESULT: FAIL (CDP 不可达:', e, ')'); sys.exit(1)
if not pages:
    print('RESULT: FAIL (无 page target)'); sys.exit(1)

from websockets.sync.client import connect
main = next((p for p in pages if 'wooden-fish' not in p['url']), pages[0])
with connect(main['webSocketDebuggerUrl'], max_size=10 ** 8) as ws:
    def call(i, expr):
        ws.send(json.dumps({"id": i, "method": "Runtime.evaluate",
                            "params": {"expression": expr, "returnByValue": True, "awaitPromise": True}}))
        while True:
            m = json.loads(ws.recv())
            if m.get('id') == i:
                return m['result']['result'].get('value')

    body = call(1, "document.body.innerText.length") or 0
    print('BODY', body)
    results = {}
    for i, n in enumerate(navs):
        call(10 + i * 3, "(()=>{const b=Array.from(document.querySelectorAll('.nav-item'))"
                         f".find(e=>(e.innerText||'').trim().includes('{n}'));if(b)b.click();return 1}})()")
        time.sleep(1.4)
        results[n] = call(11 + i * 3, "(document.querySelector('.content-body')?.innerText||'').length") or 0
    ipc = call(90, "(async()=>{try{const l=await window.electronAPI.todos.list({});"
                   "const d=(l&&l.data)||l;return (d&&d.tasks||[]).length}catch(e){return 'ERR'}})()")
    for n, v in results.items():
        print(f'  {n}: {v}')
    print('IPC todos:', ipc)

    ok = body > 100 and all(v > 20 for v in results.values())
    print('RESULT:', 'PASS' if ok else 'FAIL')
    sys.exit(0 if ok else 1)
PY
RC=$?
pkill -9 -f "小黑日报助手" 2>/dev/null
exit $RC
