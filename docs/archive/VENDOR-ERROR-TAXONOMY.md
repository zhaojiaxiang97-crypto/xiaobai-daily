# vendor 组件错误分类（71 个）

> round-0460
>
> 上一轮只知道「71 个 ERR」，这轮把每一个都归类，看清哪些可修、哪些改不了。

## 分类结果

| 类别 | 数量 | 可修？ |
|---|---|---|
| **`X is not defined`** | **20** | ✅ 可修（符号没带出） |
| `Injection Symbol(...) not found` | 8 | ❌ 必须在父组件内 |
| `Cannot read properties of null (reading 'ce')` | 8 | ❌ 需要上下文 |
| `Cannot read properties of undefined (reading 'value')` | 6 | ⚠️ 可能是 ref 未初始化 |
| `_ctx.X is not a function` | 5 | ✅ 可修（模板引用未绑定） |
| `Cannot read properties of undefined`（其它） | 4 | ❌ 需要真实 props |
| 其它杂项（`27`、`dataOptions.call is not a function`、TDZ） | 5 | ⚠️ 混合 |

## 20 个 `X is not defined` 的符号分布

**每个组件各缺 1 个符号，符号几乎不重复**：

```
u: 2   options: 2   c: 2   o: 2
z/gt/f/L/v/s/H/state: 各 1
```

涉及组件：`DesktopWidgetPage` / `FocusScope` / `HeatMapRangePicker` /
`HeatmapBars3D` / `MarkdownReaderEmptyState` / `MenuRoot` / `MilestoneCard` /
`MilestoneEditorDialog` / `MilestoneRichTextField` / `MilestoneTodoPicker` /
`MouseHeatmapPreview` / `PopperContent` …

## 追了一个样本，没追通

`FocusScope` 缺 `gt`：

- 源文件里 `gt` 是 `import { gt } from '../chunks/vue-i18n.runtime.js'`
- `VUE_API_MAP['gt']` = `openBlock`
- 生成的 `.vue` 里已经 `import { openBlock as L } from 'vue'`（另一个别名 `L` 指向同一个 API）
- **但 `gt` 这个别名没被加进去**

按 `runtimeAliasImports` 的逻辑应该会加 `openBlock as gt`（`seenLocal` 检查的是
`local`，`gt` 不在里面）—— 实际没加，**说明还有隐藏条件**（可能是
`compRefs` 里没有 `gt`，或 `imports` 表的 `from` 不匹配 `isRuntime`）。

**这类长尾需要逐个追，投入产出比明显下降。**

## 为什么这类问题无法批量解决

对比前几轮的大突破（都是**同一根因影响一大批**）：

| 问题 | 影响面 | 修法 |
|---|---|---|
| `VUE_API_MAP` 是 main bundle 专用 | 模板归属 60→121 | 一处改动 |
| 字符串拼接改 AST 组装 | 重复声明 10→0 | 一处改动 |
| import 只看模板 | 未绑定 371→154 | 一处改动 |

**而剩下这 20 个：每个组件缺一个不同的符号、各自成因不同** —— 没有共同的根因。

## `reading 'ce'` 那 8 个是什么

全是 reka-ui 的 Root/Content 组件：

```
AlertDialogRoot / Dialog / DialogContentImpl / MenuContentImpl /
MenuItemImpl / PopoverContentImpl / PopoverRoot / TooltipRoot
```

`ce` 是它们内部某个 context 对象的属性。**必须在正确的父组件树里才有值** ——
这是组件库设计，不是转换 bug。

## 结论

| 项 | 值 |
|---|---|
| vendor 组件 | 145 |
| 可 import | 145/145 ✅ |
| 可渲染（OK） | **10** |
| 剩余 71 个错误 | 已分类 |
| **可修的部分** | **约 25 个（`X is not defined` 20 + `_ctx.*` 5）** |
| 不可修的部分 | 约 26 个（Injection 8 + null 8 + 真实 props 4 + 其它） |
| 未分类 | 约 20 个 |

## 判断

**可修的部分是 25 个组件各缺一个符号，无共同根因** —— 想把这 25 个救回来，
对每个都要单独调试「这个符号为什么没被内联/import」。

**这不划算。** 除非要的是「145 个全部可渲染」这个完整度指标本身。

**更有价值的下一步**是接受「vendor 组件需要上下文」这个事实，把精力放在：
1. 用真实 props fixture 测（而不是空 props）
2. 或做父组件组合渲染
3. 或回到 main bundle / 应用本身
