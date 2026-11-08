# 从本仓库构建离线版

## 前置

- macOS + Node.js ≥ 20
- GitHub CLI（`gh auth login`）或能访问 GitHub Release 的网络

## 一键构建

```bash
./build.sh          # 输出 build/extract/小白日报.app
./build.sh myout    # 自定义输出目录
```

脚本自动完成：
1. 从本仓库 Release（v1.8.3）下载 Electron 外壳（app-shell.tar.gz）与
   原生模块（app-unpacked.tar.gz）
2. 用本仓库源码（dist/ + dist-electron/ + package.json）打包 app.asar
   （node_modules 保持解包形态）
3. 组装 .app 结构 + ad-hoc 签名

## 构建产物

`小白日报.app`——离线完整版（Pro 解锁/免登录/AI 本地化/待办本地存储）。

启动前清实例锁（三个进程模式）：
```bash
pkill -9 -f "小白日报"; pkill -9 -f "小黑日报助手"; pkill -9 -f "xiaohei-active-context"
open 小白日报.app
```

## 首次配置

- 设置页/API 设置：填入自己的 OpenAI 兼容 API（Base URL + Key + 模型 ID）
- 数据目录：~/Library/Application Support/xiaobai-daily

## Release 资产说明

| 资产 | 内容 |
|------|------|
| app-shell.tar.gz | Electron 运行时外壳（Contents/Frameworks + Info.plist + MacOS，已按小白日报品牌定制 Helper 结构） |
| app-unpacked.tar.gz | app.asar.unpacked（playwright/get-windows 等原生 node 模块，323MB 解压态） |
