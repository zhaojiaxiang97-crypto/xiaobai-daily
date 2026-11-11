# 补差集检查：修 createCommentVNode 泄漏，定位真正的缺口

> round-0444

## 修了什么

`createCommentVNode('', true)` 是 render 里的「空/注释节点」，常出现在三元表达式的
else 分支：

```js
cond ? createElementVNode('span', ...) : createCommentVNode('', true)
```

它被原样搬进模板 → 模板引用了不存在的 render API（如 `N('',true)`）。
静态扫描确认 `N` 就是 `import { x as N } from './vue-i18n.runtime.js'`，
而 `x` = `createCommentVNode`（运行时探测表已验证）。

修复 `convert-component.cjs`：
- 新增 `stripCommentVNodes()`：深层遍历三元/逻辑/序列表达式，把
  `createCommentVNode(...)` 替换成 `undefined`
- `conv()` 里遇到它直接返回 `''`（不产生节点）
- `dyn()` 里先剥离再生成表达式

**效果**：`HeatMapRangePicker.js` 转换输出里 `N('',true)` 从 25 处 → **0**。

## 但 49 个组件仍报 `N is not defined` —— 原因不同

精确静态检查（模板用了 `N` 但 script 未绑定）→ 49 个。

看实际上下文：

```html
@focusin="N" @mouseenter="N"
```

**这里的 `N` 是事件处理器，不可能是 `createCommentVNode`。**

## 真正的根因

`N` 在**不同 chunk 里含义不同**：
- `HeatMapRangePicker.js` 里 `N` = `createCommentVNode`（已修）
- `RangeCalendarCell` 所属文件里 `N` 是**文件级局部函数**

而**组件切分时，文件级局部函数没有被带进 `.vue`**。

这是组件切分的结构性限制：一个 chunk 里的组件共享该文件的模块级辅助函数，
切出来后这些函数既不在组件内（没被复制），也不在 import 里（不是 import 的）。

## 与前几轮的关系

| 轮次 | 修的问题 | 性质 |
|---|---|---|
| 0438 | `resolveComponent` 泄漏到模板 | render API 泄漏 |
| 0439 | renderCache 事件缓存泄漏 | render API 泄漏 |
| **0444** | **`createCommentVNode` 泄漏** | **render API 泄漏（已修）** |
| 0444 | 文件级局部函数未带入组件 | **组件切分结构性限制** |

前三类是「转换器把不该出现的东西搬进模板」，都能修。
第四类是「该出现的东西没搬过来」，需要**自由变量分析 + 代码复制**才能解。

## 结论

| 项 | 状态 |
|---|---|
| createCommentVNode 泄漏 | ✅ 已修（25 → 0） |
| vendor 组件转换数 | 148（全量） |
| 映射表 | 107 条 |
| 49 个缺 `N` | ❌ 文件级局部函数未带入 |
| main bundle 渲染率 | 109（未受影响） |

## 下一步（工作量明确）

给 `lib-conv` 加**自由变量分析**：对每个组件，算出它引用的、但既非 import 也非
props 的标识符，然后把这些定义从原 chunk **复制**进组件的 `<script setup>`。

技术上 `split-with-deps.cjs`（round 早期）做过类似分析，可以复用其思路。
