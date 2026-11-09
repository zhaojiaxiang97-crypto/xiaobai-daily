# 工程结构与架构

## 运行架构（三层）

```
┌─────────────────────────────────────────────────┐
│  Electron 外壳（Release 资产 app-shell.tar.gz） │
│  Contents/Frameworks/Electron Framework 等       │
├─────────────────────────────────────────────────┤
│  主进程（asar 内 dist-electron/）                │
│  main.js 入口 → 注册 500+ IPC handler            │
│  ├─ auth.service      会话/待办/积分/分享         │
│  ├─ settings.repository  SQLite/设置/AI通道      │
│  ├─ work-record.repository  时间线记录           │
│  └─ 其他服务（遥测/剪贴板/截图美化/网页账号…）    │
├─────────────────────────────────────────────────┤
│  渲染进程（asar 内 dist/）                        │
│  index.html → main bundle（全部 Vue 组件）        │
│  ← preload.cjs 桥接 window.electronAPI.*         │
└─────────────────────────────────────────────────┘
        原生模块（Release 资产 app-unpacked.tar.gz）
        playwright/get-windows/uiohook 等 323MB
```

## 主进程模块依赖图

```
main.js
 ├── rolldown-runtime（模块互操作）
 ├── auth.service ──┐
 ├── settings.repository ──┤（auth/settings 互相导入，
 │   │                    │  rolldown 循环依赖处理）
 │   ├── work-record.repository（独立仓储）
 │   ├── app-language（translate 函数）
 │   └── window-messaging（窗口消息）
 ├── telemetry.service（独立埋点）
 ├── web-account-*.service（豆包/元宝/DeepSeek 网页账号三件套）
 ├── clipboard-assistant.service / screenshot-beautifier.service
 ├── native-active-context-collector.service（前台窗口采集）
 └── xiaohei-bot-*.service（Bot 死代码，UI 已移除）
```

## 核心数据流

**自动截图记录**（主循环）：
```
定时器（2min，可调）
 → desktopCapturer 截屏 → 帧去重（pixelmatch）
 → native-active-context 取前台应用
 → AI 识别（resolveAiMode 决定通道：
     local = 自配 API / custom = 火山方舟 / webAccount = 网页账号）
 → 结构化 JSON → SQLite work_records 表
 → 截图即删（内存与磁盘）
```

**报告生成**：
```
用户选时间范围
 → 读 work_records + 应用时长统计
 → buildReportPrompts（含用户工作上下文记忆）
 → AI 流式生成（本地 API 直连）
 → SQLite reports 表 + 历史报告页展示
```

**待办（本地化改造后）**：
```
渲染进程 todos.list()
 → preload → ipcMain "todos:list"
 → auth.service listTodos()
 → localTodoAction 拦截（14 个 action 全本地）
 → SQLite local_todos 表
（云通道 todos.php 保留但永不可达——免登录）
```

## 原始开发工程形态（从打包结构反推）

原工程为标准 Electron + Vue3 + vite/rolldown 单仓：

```
src/
├── main/                    → 打包为 dist-electron/main.js
│   ├── index.ts             （Electron 入口）
│   ├── services/            （auth/settings/telemetry/… 每服务一文件）
│   ├── repositories/        （work-record/todo-project/badge…）
│   ├── ipc/                 （各 register*Controller）
│   └── windows/             （主窗口/木鱼/浮球等窗口管理）
├── preload/                 → dist-electron/*.preload.cjs
├── renderer/                → 打包为 dist/
│   ├── src/
│   │   ├── App.vue + components/（侧边栏/账号菜单/各页面组件）
│   │   ├── views/           （今日工作/待办/生成报告/…）
│   │   ├── composables/     （useAuth/useTodo/…）
│   │   └── locales/         （en-US-*.js 的源头）
│   └── index.html           （dist/index.html）
└── shared/                  （types-*.js 的源头，主/渲染共享类型）
```

> 反推依据：组件 `__name` 标记、仓储/服务命名边界、rolldown chunk 划分。
> 原始 .vue/.ts 源文件未随发布存在，本仓库的语义化 JS 即可读源码形态。

## 当前仓库结构（已按工程语义重组）

```
xiaobai-daily/
├── src/
│   ├── main/                 # 主进程（Electron main）
│   │   ├── main.js           # 入口
│   │   ├── services/         # 业务服务（auth/settings/telemetry/…）
│   │   ├── preload/          # 渲染桥接脚本（*.cjs）
│   │   ├── lib/              # rolldown 运行时/类型/语言
│   │   └── vendors/music-metadata/  # 音频解析器族
│   └── renderer/            # 渲染进程（Vue3）
│       ├── index.html        # 主窗口入口
│       ├── keyboard-sound-audio.html / screenshot-tool.html / clipboard-picker.html / work-motivator.html  # 独立小窗口
│       ├── components → ui/ # UI 基础组件（Switch/Popover/…）
│       │   └── icons/        # 图标集（lucide）
│       ├── pages/            # 页面级组件（编辑器/3D/回放/…）
│       ├── i18n/             # 语言包（en-US-main/player）
│       ├── blocks/           # 富文本块（math/mermaid/…）
│       ├── chunks/           # 功能模块（业务功能 chunk）
│       ├── styles/           # 样式
│       ├── vendors/          # OrbitControls/Barcode3D
│       └── assets/           # 图像（webp/png）
├── package.json              # main: src/main/main.js
├── build.sh                  # 一键构建
└── docs/
```

## asar 结构（构建产物）

```
app.asar
├── package.json          （main: dist-electron/main.js, type: module）
├── dist/                 （渲染进程，index.html + assets/）
├── dist-electron/        （主进程 40 模块 + 7 个 preload）
└── [node_modules → unpack 记录]（实体在 app.asar.unpacked/）
app.asar.unpacked/
└── node_modules/         （17878 个原生/纯 JS 依赖，323MB）
```

## 改造点速查（对 diff 感兴趣时）

| 改动 | 文件 | 锚点 |
|------|------|------|
| 恒 Pro | auth.service | `getSubscription`/`syncSubscription` |
| 积分 stub | auth.service | `consumeWordCloud`/`getCreditsBalance` 等 |
| 免登录 | auth.service | `getSession`（匿名 session）|
| AI 本地通道 | settings.repository | `resolveAiMode` + `localReport*` 键 |
| 待办本地化 | auth.service | 文件尾 `localTodoDatabase`/`localTodoAction`（~120 行）|
| 前端 UI 清理 | dist/assets/main-*.js | 各已删功能的挂载点（详见 README 改造清单）|
| API 设置页 | dist/assets/main-*.js | `ApiSettingsPage` 组件 |
