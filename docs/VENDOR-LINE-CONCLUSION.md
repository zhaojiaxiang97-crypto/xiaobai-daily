# vendor 组件线：投入产出边界

> round-0448

## 本轮修的三处（都保留）

### 1. `convert-component`：`createBlock(unref(X))` 的标签 unwrap

```js
const tagN = unwrap(args[0]);   // 之前是 args[0]
```

独立 chunk 里组件渲染常写成 `createBlock(unref(Comp), ...)`，
`args[0]` 是 CallExpression，`strVal()` 返回 null，被误判成无法识别的动态组件。

### 2. `convert-component`：render 的 BlockStatement 形态

```js
// 之前只处理 (e,t) => createBlock(...)
// 现在也处理 (e,t) => { return w(), createBlock(...) }
let raw = p.node.body;
if (t.isBlockStatement(raw)) {
  const ret = raw.body.find(x => t.isReturnStatement(x) && x.argument);
  if (!ret) return;
  raw = ret.argument;
}
```

### 3. `lib-conv`：组件子树内声明的精确收集

用 `p.traverse({...})` 局部遍历，替代全文件按名字搜索。

## 效果

| 指标 | 之前 | 现在 |
|---|---|---|
| 全量 vendor 组件 | 148 | 148 |
| 不同模板数 | 较少 | **60**（148 个组件里） |
| 仍共用模板的组 | 多 | **22 组** |
| main bundle 渲染率 | 109 | **109（未变）** |

**模板归属部分改善**（60 个不同模板），但仍有 22 组共用。

## 卡住的地方

按组件切临时文件（`var __c = <该组件的 ObjectExpression>`）后再调转换器，
**稳定返回 0 个组件**。

以 `RangeCalendarCell` 为例，它的 render 是：

```js
return (e, n) => (w(), x(d(i), { as: e.as, role: 'gridcell', ... }))
```

即 `(openBlock(), createBlock(unref(Comp), {...}))`。

`unwrap` 和 BlockStatement 两处修复都没能让它转出模板 —— 说明还有更深的原因
（可能是 `d(i)` 的 unref 识别链路、或 `REGISTRY` 缺项导致提前 return）。

## 判断：这条线到边界了

| 轮次 | vendor 线动作 | 结果 |
|---|---|---|
| 0439 | 定位 lucide ctx 问题 | 109 |
| 0441 | 首次批量转换 | 124 组件 |
| 0442 | 映射表基建 + 3 个 bug | 148 组件 |
| 0444 | createCommentVNode 泄漏修复 | 148 |
| 0445 | 自由变量分析 | 148 |
| 0446 | setup/render 内联框架 | 148 |
| 0447 | 发现模板张冠李戴 | 148 |
| 0448 | unwrap + BlockStatement 修复 | 148（模板归属改善） |

**8 轮，组件数始终 148，main bundle 始终 109。**

每轮都在修真实 bug（不是瞎试），但**没有一轮让渲染率动过**。
原因是这批独立 chunk 的 render 形态差异太大，`convert-component`（为 main bundle
调的）需要针对每种形态逐个适配。

## 结论

**vendor 组件线的价值在于「转换数」而非「渲染率」**：
- 148 个 `.vue` 能生成、能编译
- 模板归属已改善到 60 个不同模板
- 但「全部能跑」需要逐个形态适配，投入产出比已经很低

**main bundle 的 109 是这条工程的实际成果**，它走 `gen-main.cjs`，
按组件精确提取 AST 范围，避开了上面所有形态问题。

## 建议

停在这里。如果将来要提升 vendor 线，正确顺序是：
1. 先给 `convert-component` 补一个「按组件范围转换」的正式接口（而不是切临时文件）
2. 用 `RangeCalendarCell` 这一类做**单点调试**，把 render 形态支持补全
3. 再回到批量
