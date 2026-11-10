# 统一符号映射表：把 main bundle 工程推到"能构建、差 8 个符号"

> round-0427

## 方案

一份映射表，四个环节共用：
- shared.js 的跨 chunk import 用 `src_<n>`
- shared.js 对外导出一律 `S_<n>`
- 组件用 `import { S_x as x }` 还原原名

这样本地声明与 import 别名即便同名也不打架。

## 本轮修掉的 8 类系统性 bug

| # | bug | 症状 |
|---|---|---|
| 1 | 排除粒度按 `VariableDeclaration` 整条 | 缺约 6700 个符号（`Mt is not defined`） |
| 2 | 漏收顶层 `ExpressionStatement` | IIFE 枚举初始化被丢（`EntityStart undefined`） |
| 3 | 三类语句**分组拼接**破坏顺序 | IIFE 排到使用它的 `var` 之后（`EntityStart` 仍报错） |
| 4 | Vue API 无条件改写 `__vue.x` | 普通变量 `h` 被误判（`Cannot assign to import 'h'`） |
| 5 | 路径重写用文本正则 | 误伤 `/pattern/i` 的 flag（`Unexpected flag _`） |
| 6 | 组件 `.install` 语句未排除 | 引用已排除的组件变量（`vX is not defined`） |
| 7 | Vue API 别名未被识别 | `import { bn as ref }` → `ref` 289 处未定义 |
| 8 | `var OZ = DZ` 引用组件变量 | `DZ is not defined` |

**关键一条是 #3**：虽然修了 #2 把 IIFE 收集进来了，但按「var / function / expression」
三类分组拼接，IIFE 被排到所有 `var` 之后，于是 `var IJe = xG(TJe)` 先执行、
`new PJe()` 里的 `yG.EntityStart` 还是 undefined。改成**按源码位置排序**才真正解决。

## 当前状态

| 项 | 值 |
|---|---|
| vite build | ✅ **88 modules 通过**（520ms） |
| shared.js | 2.1 MB，本地 9197 + 跨 chunk 301 |
| 组件 | 391 个 .vue |
| Vue API 改写 | 549 处 |
| cross-chunk 改写 | 561 处 |
| 路径重写 | 121 有效 + 2 死引用 |
| **未定义符号** | **从 63 降到 8**（且 61 个原本就是浏览器全局，不是 bug） |

## 剩余 8 个符号

静态扫描（排除 Web API）确认只剩：
`fZ` `define` `LX` `o$` `L2t` `V2t` `G9` `s$`

它们与 `DZ` 同类 —— 都是「组件变量被其他顶层语句间接引用」的边缘形态
（如 `var OZ = DZ`、`var s$ = <component>` 之后又 `.install`）。

**每类都能修，但需要逐一追**。

## 结论

**这条路已经证明可行**：构建稳定通过，缺失符号从 63 收敛到 8，剩余全是同类边缘形态。

要跑通 SSR 还需清理这 8 个（预计再加 2-3 轮）。**不是架构问题，是收尾工作量。**

工具：`tools/vue-decompiler/gen-unified.cjs`（统一映射表版生成器）
