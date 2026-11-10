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

## 单文件 bundle 的定位方法（工程性补充）

`src/renderer/chunks/main.js`（11MB）是打包产物形态，组件与函数全部内联。物理分文件
（组件级拆分）需要符号重映射，实测边界如下：

- 顶层声明 **9986 个，无重复**（已核验）——同名冲突不来自顶层
- 早期拆分失败的根因是「一条 var 逗号链含多个组件却写成多个文件」→ 同一链被复制多份
  → 聚合导出时同名冲突。按**链**（而非按组件）拆可规避
- 仍存在的风险：链内 `var` 赋值顺序依赖、跨链前向引用（拆分后 import 提升会改变
  初始化顺序）、以及 `new URL(..., import.meta.url)` 图像路径在移动后失效

因此当前采用**索引式可读性**而非物理拆分：

- [docs/COMPONENT-INDEX.md](COMPONENT-INDEX.md)——418 个组件 + 1600 个顶层函数的
  「名称 → 行号」索引，以及按库特征密度切分的**文件区块地图**（chart.js / reka-ui /
  markdown-it / Vue 运行时 / 业务 各占哪段行区间）

实际开发时：按组件名查索引 → 跳到行号 → 该行附近即组件定义；该组件依赖的共享
CSS 常量与工具函数同在文件内（就近可查）。

## 改动风险边界（实测数据，2026-11 反混淆系列）

以下边界均由「构建 + 九页面内容断言」实测得出，不是推测：

| 改动类型 | 主进程 | 前端渲染层 | 事故/依据 |
|---|---|---|---|
| 变量、参数命名（含后缀变体） | ✅ 安全 | ⚠️ 仅函数作用域内 | round-0402：前端函数参数批量改名 → 九页面内容全 0 |
| import 别名改名 | ✅ 安全 | ❌ 禁止 | round-0400：前端 import 别名批量改名 → 整页空白，Vue 报 `Cannot read 'subTree'` / `insertBefore` |
| 顶层绑定改名 | 未验证 | ❌ 不建议 | 跨 chunk 引用关系复杂 |
| 括号属性转点访问 | ✅ | ✅ | AST 语义等价 |
| `void 0` / `!0` 还原 | ✅ | ✅ | 语义等价 |
| 字符串 `\x`/`\u` 还原 | ✅ | ⚠️ 正则字面量内不可动 | round-0407：把正则内的 `gRPC` 改成 `gRpc` 会改变匹配行为 |
| 改大小写美化（`X + ALLCAPS` → camelCase） | ⚠️ 有风险 | ⚠️ 有风险 | 同上，误伤字符串/正则内文本 |

**验证方式**：任何改动后必须跑 `tools/check.sh`（语法 → 构建 → 结构 → 九页面
内容断言）。只看「侧边栏存在/导航项数量」无法发现主内容空白，这是 round-0400
事故连续通过十余轮"验证"的原因。
