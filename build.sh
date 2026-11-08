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

echo "[3/6] 安装 @electron/asar 工具"
ASAR_PKG="$(mktemp -d)"
npm install --prefix "$ASAR_PKG" @electron/asar --no-fund --no-audit >/dev/null 2>&1
ASAR_BIN="$ASAR_PKG/node_modules/@electron/asar/bin/asar.js"

echo "[4/6] 从本仓库源码打包 app.asar"
SRC_DIR="$(cd "$(dirname "$0")" && pwd)"
node "$ASAR_BIN" pack "$SRC_DIR" "$OUT/extract/小白日报.app/Contents/Resources/app.asar" --unpack-dir "node_modules"
# 注: 本仓库 dist-electron/dist/package.json 即 asar 根内容

echo "[5/6] 布置原生模块"
tar xzf "$OUT/assets/app-unpacked.tar.gz" -C "$OUT/extract/小白日报.app/Contents/Resources/"

echo "[6/6] Ad-hoc 签名"
codesign --force --deep --sign - "$OUT/extract/小白日报.app" >/dev/null 2>&1

echo "构建完成: $OUT/extract/小白日报.app"
echo "启动前清实例锁: pkill -9 -f '小白日报'; pkill -9 -f '小黑日报助手'"
