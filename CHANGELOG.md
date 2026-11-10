# 改造与反混淆履历

## 功能改造（原小黑日报助手 v1.8.3 → 小白日报）

- **Pro 解锁**：订阅校验恒为 Pro（到期 2100-12-31）
- **积分 stub**：消耗恒零、额度恒满
- **免登录**：`getSession` 恒返回匿名会话，云端鉴权全链路不可达
- **AI 本地化**：报告 / 截图识别 / 音频转写 / 可视化报告全部支持自定义
  OpenAI 兼容 API 直连（`resolveAiMode` + `localReport*` 设置键 + API 设置页）
- **待办本地化**：云端 `todos.php` 替换为本地 SQLite（`localTodoAction`
  拦截 14 个 action）
- **UI 精简**（逐轮删除并经 CDP 断言验证）：
  订阅/邀请、客服/交流群、教育认证/成长计划、积分余额/反馈、帮助/检查更新、
  今日工作页教程/赚能量/排行榜、超能伙伴 Bot、账号页分享与登录残留、
  Pro/工具箱/通知中心/连接移动端、2026 年度成就、吉祥物（木鱼窗口 /
  空态插画 / 时间线 companion / 报告 companion / 统计 companion）
- **品牌重塑**：应用名、窗口标题、菜单文案

## 反混淆

| 手段 | 处理量 |
|---|---|
| javascript-obfuscator 壳（字符串数组 + 旋转 IIFE + self-defending）剥离 | 95466 条字符串解码 |
| 布尔混淆 `![]` / `!![]` | 全清 |
| 括号属性 `obj["x"]` → 点访问（AST） | 31000+ 处 |
| 十六进制字面量十进制化（保留 UTF-8 字节数组与大常量） | 8570 处 |
| 字符串 `\x` / `\u` 转义还原（正则内合法转义保留） | 58000+ 处 |
| `void 0` → `undefined` | 3008 处 |
| `!0` / `!1` → `true` / `false` | 12612 处 |
| 死声明清理（null 别名） | 1948 处 |
| 跨模块导入名语义化 | 121 个 + 后续 185 个 |
| 变量名语义化（画像/形态/上下文推断） | 2669 个 |
| 函数参数语义化（使用画像） | 约 1300 个 |
| Vue 编译 API 与组件名语义化 | 22 + 118 个组件名 |

## 工程化

- 目录重组：`src/main`（services/preload/lib/vendors）+ `src/renderer`
  （ui/pages/i18n/blocks/chunks/styles/vendors/assets）
- 文件名去 hash（191 个，含 5 组同名冲突的唯一化）
- `build.sh` 一键离线构建（Electron 外壳 + 原生模块走 Release 资产）
- `tools/deobf.cjs` 反混淆统一入口 + `tools/selfcheck.sh` 构建自检
- 文档：`docs/FILE-GUIDE.md`（文件名含义）、`docs/ARCHITECTURE.md`（架构与
  拆分边界）、`docs/COMPONENT-INDEX.md`（组件/函数索引 + 区块地图）、
  `docs/MODULES.md`（主进程依赖图）

## 反混淆（2026-11 收官）

| 项目 | 数值 |
|---|---|
| 主进程唯一 `_0x` 变量 | 13800 → **6122**（-56%） |
| 主进程 `_0x` 引用点 | ~37860 → **17498** |
| 全库短名(≤2 字符)占比 | **31.2%**（其中前端语言包/UI 库占大头，业务代码已可读） |

关键方法论（详见 `tools/README.md` 与 `docs/ARCHITECTURE.md`）：
1. 从「赋值右侧」推断 + 从「使用目标」反推（属性名反向单条命中 482 个）
2. 候选名冲突时用后缀变体（`Value`/`Input`/`Arg`…）解锁 734 个参数
3. 严格作用域检查（`scope.hasBinding`）防止遮蔽
4. 改动边界实测表：前端 import 别名/函数参数不可改名，主进程可
