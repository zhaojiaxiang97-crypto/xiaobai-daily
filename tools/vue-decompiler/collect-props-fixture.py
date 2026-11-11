import json, urllib.request, time, sys
from websockets.sync.client import connect

pages = [p for p in json.load(urllib.request.urlopen('http://127.0.0.1:9222/json')) if p['type'] == 'page']
main = next((p for p in pages if 'wooden-fish' not in p['url']), pages[0])
DUMP = open('/tmp/tree-dump.js').read()
PAGES = ['今日工作', '待办', '生成报告', '记忆时间线', '热力图', '应用记录', '历史报告', 'API 设置', '隐私保护']
merged = {}

with connect(main['webSocketDebuggerUrl'], max_size=10**8) as ws:
    def ev(expr):
        ws.send(json.dumps({"id": 1, "method": "Runtime.evaluate",
                             "params": {"expression": expr, "returnByValue": True, "awaitPromise": True}}))
        while True:
            m = json.loads(ws.recv())
            if m.get('id') == 1:
                return m['result']['result'].get('value')

    for label in PAGES:
        clicked = ev("""(() => {
          const b = [...document.querySelectorAll('.nav-item')].find(e => (e.innerText||'').trim().includes(%r));
          if (b) { b.click(); return true; } return false;
        })()""" % label)
        if not clicked:
            print(f'  {label}: 未找到入口', file=sys.stderr)
            continue
        time.sleep(2.2)
        r = ev(DUMP)
        if isinstance(r, dict) and r.get('components'):
            n0 = len(merged)
            for k, v in r['components'].items():
                if k not in merged:
                    merged[k] = v
            print(f'  {label}: +{len(merged)-n0} 个（累计 {len(merged)}）', file=sys.stderr)
        else:
            print(f'  {label}: dump 失败', file=sys.stderr)

json.dump(merged, open('/tmp/props-fixture.json', 'w'), ensure_ascii=False, indent=1)
print(f'总计 {len(merged)} 个组件的真实 props', file=sys.stderr)
withprop = {k: v for k, v in merged.items() if v.get('propKeys')}
print(f'其中带 props 的: {len(withprop)}', file=sys.stderr)
for k in list(withprop)[:15]:
    print(f'  {k}: {withprop[k]["propKeys"][:6]}', file=sys.stderr)
