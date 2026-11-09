#!/usr/bin/env bash
# 构建产物自检：结构完整性 + 混淆残留统计
set -uo pipefail
APP="${1:-build/extract/小白日报.app}"
ASAR="$APP/Contents/Resources/app.asar"
UNPACKED="$APP/Contents/Resources/app.asar.unpacked"
fail() { echo "FAIL: $1"; exit 1; }
[ -f "$ASAR" ] || fail "app.asar 缺失"
[ -d "$UNPACKED/node_modules" ] || fail "app.asar.unpacked/node_modules 缺失"
echo "== 结构 =="
echo "asar: $(du -h "$ASAR" | cut -f1) / unpacked: $(du -sh "$UNPACKED" | cut -f1)"
echo "== 源码混淆残留 =="
SRC="$(dirname "$0")/../src"
count() { grep -rIo --include='*.js' "$1" "$SRC" 2>/dev/null | wc -l | tr -d ' '; }
echo "_0x 变量引用: $(count '_0x[0-9a-f]*')"
echo "void 0: $(count 'void 0')"
echo "括号属性(合法标识符): $(count '\["[A-Za-z_$][A-Za-z0-9_$]*"\]')"
echo "== 建议 =="
echo "语义回归：启动应用 + CDP 页面断言（见 docs/ARCHITECTURE.md）"
