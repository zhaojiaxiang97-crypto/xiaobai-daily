# 文件名含义索引

本仓库是构建产物形态的源码（原工程为 Vue3 + Electron + rolldown/vite 打包，
发布即 asar）。文件名带 8 位内容哈希（如 `auth.service.js`）——
哈希是 vite 按内容自动生成的，与用途无关。

## src/main/（主进程）

（文件已从 dist-electron/ 重组：服务→services/、预加载→preload/、音频→vendors/music-metadata/）

| 文件 | 含义 |
|------|------|
| `main.js` | 主进程入口。Electron 生命周期、全部 IPC handler 注册（`ipcMain.handle`）、窗口管理、自动截图循环、报告生成管线。语义化版本 |
| `auth.service-*.js` | 认证与账号服务。登录会话（已改造为恒返回匿名会话）、**待办本地存储（localTodoAction，本地 SQLite 免登录）**、积分 stub、订阅状态（恒 Pro）、好友/分享 API。语义化 |
| `settings.repository-*.js` | 设置存储与核心基础设施。SQLite 连接/迁移（`getDatabase`/`switchDatabase`）、全部设置键（含 `localReport*` 自定义 API 键）、**`resolveAiMode` AI 通道选择**、zod schema、各仓储（work-record/todoProject/badge 等）。语义化 |
| `work-record.repository-*.js` | 工作记录仓储（时间线 CRUD、日汇总） |
| `telemetry.service-*.js` | 遥测/埋点服务（全链路 trace span/event） |
| `web-account-auth.service-*.js` | 网页账号（豆包/元宝/DeepSeek）绑定的本地认证 |
| `web-account-recognition.service-*.js` | 网页账号模型识别（判断登录的是哪家 AI） |
| `web-account-scheduler.service-*.js` | 网页账号绑定调度 |
| `clipboard-assistant.service-*.js` | 剪贴板助手业务逻辑 |
| `screenshot-beautifier.service-*.js` | 截图美化（本地无 AI 处理） |
| `native-active-context-collector.service-*.js` | 原生活跃窗口采集（前台应用/标题） |
| `window-messaging-*.js` | 窗口间消息总线 |
| `app-language-*.js` | 应用语言/翻译函数（`translate(key)`，main.js 中 477 处调用） |
| `xiaohei-bot-management.service-*.js` | Bot（超能伙伴）账号管理（UI 已移除，服务保留为死代码） |
| `xiaohei-bot-memory-tools-*.js` / `-share-tools` / `-schedule.service` | Bot 记忆/分享/定时工具（同上，死代码） |
| `rolldown-runtime-*.js` | 打包器运行时（CJS/ESM 互操作 helper） |
| `types-*.js` | 共享类型定义 |
| `preload.cjs` | 渲染进程预加载（`window.electronAPI.*` 全部通道桥接） |
| `clipboard-picker-preload.cjs` / `screenshot-tool-preload.cjs` / `keyboard-sound-audio-preload.cjs` / `todo-floating-preload.cjs` / `wooden-fish-preload.cjs` / `work-motivator-preload.cjs` | 各独立小窗口（剪贴板选择器/截图工具/键盘音/待办浮球/木鱼/工作激励）的预加载脚本 |
| `APEv2Parser/FlacParser/ID3v2Parser/MP4Parser/MatroskaParser/OggParser/WavPackParser/WaveParser/...-*.js` | music-metadata 库的音频元数据解析器（音频转写前读时长/格式用），按格式拆分的 chunk |

## src/renderer/（渲染进程/前端）

（文件已从 dist/assets/ 重组：UI→ui/、页面→pages/、语言→i18n/、富文本块→blocks/、功能→chunks/、图标→ui/icons/）

| 文件 | 含义 |
|------|------|
| `main-*.js` | **前端主 bundle**：全部 UI 组件（今日工作/待办/生成报告/记忆时间线/热力图/应用记录/历史报告/API 设置页/设置）、App 外壳、侧边栏、路由。语义化版本（createElementVNode 等 22 个 Vue API + 组件名） |
| `en-US-*.js` | 语言包（实际内容为中文文案，键路径如 `settings.recording.*`） |
| `vue-i18n.runtime-*.js` | Vue i18n 运行时 + **Vue 核心运行时**（ref/computed/createElementVNode 从这里导出） |
| `src-*.js` | AI 流式转写器（bigmodel 音频 token 处理）运行时 |
| `DayReplayPlayer-*.js` | 一日回放播放器（按时间轴回放当天截图） |
| `HeatmapBars3D-*.js` + `OrbitControls-*.js` + `three-stage-*.js` | 3D 热力图（three.js + 轨道控制器） |
| `HeatMapRangePicker-*.js` | 热力图日期范围选择 |
| `EditorApp-*.js` | 截图美化编辑器（标注/裁剪画板） |
| `DesktopWidgetPage-*.js` | 桌面小组件页面 |
| `OverlayApp-*.js` | 截图覆盖层应用 |
| `PinApp-*.js` | 桌面贴图（Pin 图钉窗口） |
| `ToastApp-*.js` / `AlertDialogMedia-*.js` / `DialogTitle-*.js` | 通知/弹窗组件 |
| `KeyboardHeatmapTool / KeyboardSoundTool / MouseHeatmapTool-*.js` | 工具箱里的键盘热力/键盘音/鼠标热力工具（UI 入口已移除） |
| `WorkMotivatorTool-*.js` / `WoodenFishTool-*.js` / `VoiceSynthesisWorkspace-*.js` | 工作激励/木鱼/语音合成工具（入口已移除） |
| `Toolbox* / Tool*（Select/WorkspaceHeader/Dropzone/EmptyState/PricingBadge/SavingRing/StepHeading）-*.js` | 工具箱页面组件族（入口已移除） |
| `Switch/Slider/Kbd/PopoverTrigger/PopperContent/TooltipTrigger/RovingFocusGroup/RovingFocusItem/DropdownMenuItem/DropdownMenuTrigger-*.js` | UI 基础组件库（shadcn-vue 风格，被主 bundle 懒加载） |
| `CodeBlockNode / Collection-*.js` | 富文本代码块/集合组件 |
| `Barcode3D-*.js` | 3D 条形码（成就卡片装饰） |
| `__vite-optional-peer-dep_*-*.js` | vite 可选 peer 依赖垫片（katex/mermaid for markstream-vue） |
| 其余 `index2~index7-*.js` | 按需加载的小页面 chunk |

## dist/assets/ 图像资产

| 文件 | 含义 |
|------|------|
| `logo-*.png` | 应用 logo（窗口图标用） |
| `tray-icon.png` | 托盘图标 |
| `favicon.png` | 网页 favicon |
| `default-ready / default-completed / default-journal / default-writing / default-heatmap-*.webp` | 小白吉祥物状态插画（渲染入口已移除） |
| `default-leaderboard-cup-*.webp` | 排行榜奖杯插画（入口已移除） |
| `streak / focus / focus-total / night / early / active / peak / records / reports / keyboard-*.webp` | 成就徽章插画（连续记录/专注/夜猫/早鸟等） |
| `composer-default-resting-*.webp` | 输入框小白形象（挂载已移除） |
| `xiaohei-login-*.png` / `bot-recharge-xiaohei-*.png` | 登录页/Bot 充值形象（死代码） |
| `deepseek-logo-*.png` / `doubao-logo-*.png` | AI 供应商 logo |
| `invite-banner / invite-credits-banner(-dark) / subscribe-banner / subscribe-countdown / subscribe-permanent-icon.png` | 订阅/邀请横幅（功能已删） |

## dist/ 根

| 文件 | 含义 |
|------|------|
| `index.html` | 渲染进程入口 HTML |
| 其余 | 见上表 |
