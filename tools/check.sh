#!/usr/bin/env bash
# 全流程自检：语法 → 构建 → 结构自检 → 九页面内容断言
#
# 用法: tools/check.sh
# 退出码: 0 = 全部通过; 非 0 = 有环节失败
set -uo pipefail
cd "$(dirname "$0")/.." || exit 1

echo "== 1/4 语法检查 =="
fail=0
while IFS= read -r f; do
  node --check "$f" 2>/dev/null || { echo "  FAIL $f"; fail=1; }
done < <(find src -name '*.js' -o -name '*.cjs')
[ $fail -eq 0 ] || { echo "RESULT: FAIL (语法)"; exit 1; }
echo "  OK"

echo "== 2/4 构建 =="
rm -rf build && ./build.sh build >/dev/null 2>&1 || { echo "RESULT: FAIL (构建)"; exit 1; }
echo "  OK"

echo "== 3/4 产物结构自检 =="
./tools/selfcheck.sh build/extract/小白日报.app 2>/dev/null | head -6
echo "  OK"

echo "== 4/4 应用内容断言 =="
if ./tools/verify-app.sh build/extract/小白日报.app; then
  echo "RESULT: PASS"
  exit 0
else
  echo "RESULT: FAIL (内容断言)"
  exit 1
fi
