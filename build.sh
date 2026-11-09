#!/usr/bin/env bash
# 小白日报离线版一键构建脚本
# 用法: ./build.sh [输出目录]
# 依赖: node >= 20, gh (GitHub CLI, 已登录) 或已手动放置 assets
set -euo pipefail
OUT="${1:-build}"
REPO="zhaojiaxiang97-crypto/xiaobai-daily"
RELEASE="v1.8.3"
ASAR_URL="https://github.com/${REPO}/releases/download/${RELEASE}/app-shell.tar.gz"
UNPACKED_URL="https://github.com/${REPO}/releases/download/${RELEASE}/app-unpacked.tar.gz"

echo "[1/6] 获取 Electron 外壳与原生模块"
mkdir -p "$OUT/assets" "$OUT/extract"
if [ ! -f "$OUT/assets/app-shell.tar.gz" ]; then
  gh release download "$RELEASE" -R "$REPO" -p "app-shell.tar.gz" -O "$OUT/assets/app-shell.tar.gz" 2>/dev/null \
    || curl -L "$ASAR_URL" -o "$OUT/assets/app-shell.tar.gz"
fi
if [ ! -f "$OUT/assets/app-unpacked.tar.gz" ]; then
  gh release download "$RELEASE" -R "$REPO" -p "app-unpacked.tar.gz" -O "$OUT/assets/app-unpacked.tar.gz" 2>/dev/null \
    || curl -L "$UNPACKED_URL" -o "$OUT/assets/app-unpacked.tar.gz"
fi

echo "[2/6] 解压外壳"
tar xzf "$OUT/assets/app-shell.tar.gz" -C "$OUT/extract"

echo "[3/6] 安装 @electron/asar"
ASAR_PKG="$(mktemp -d)"
(cd "$ASAR_PKG" && npm init -y >/dev/null 2>&1 && npm install @electron/asar --no-fund --no-audit >/dev/null 2>&1)

echo "[4/6] 从本仓库源码打包 app.asar（含原生模块 unpack 记录）"
SRC_DIR="$(cd "$(dirname "$0")" && pwd)"
RES_DIR="$OUT/extract/小白日报.app/Contents/Resources"
# 组装打包目录：源码 + node_modules（asar 头需要 node_modules 条目指向 unpacked）
PACK_DIR="$OUT/packdir"
mkdir -p "$PACK_DIR"
tar cf - -C "$SRC_DIR" src package.json | tar xf - -C "$PACK_DIR"
tar xzf "$OUT/assets/app-unpacked.tar.gz" -C "$OUT" app.asar.unpacked
cp -R "$OUT/app.asar.unpacked/node_modules" "$PACK_DIR/node_modules"
node --input-type=module -e "
import { createPackageWithOptions } from '$ASAR_PKG/node_modules/@electron/asar/lib/asar.js';
await createPackageWithOptions('$PACK_DIR', '$RES_DIR/app.asar', { unpackDir: 'node_modules' });
console.log('asar OK');
"
# pack 输出的 app.asar.unpacked（原生模块回位）+ 剩余 unpacked 资产
if [ -d "$OUT/packdir.asar.unpacked" ]; then
  rm -rf "$RES_DIR/app.asar.unpacked"
  cp -R "$OUT/packdir.asar.unpacked" "$RES_DIR/app.asar.unpacked"
fi

echo "[5/6] 校验原生模块布局"
[ -d "$RES_DIR/app.asar.unpacked/node_modules" ] || { echo "缺少 unpacked node_modules"; exit 1; }

echo "[6/6] Ad-hoc 签名"
codesign --force --deep --sign - "$OUT/extract/小白日报.app" >/dev/null 2>&1

echo "构建完成: $OUT/extract/小白日报.app"
echo "启动前清实例锁: pkill -9 -f '小白日报'; pkill -9 -f '小黑日报助手'"
