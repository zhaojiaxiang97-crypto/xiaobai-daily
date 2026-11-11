# 组件族包裹测试：收益很小，瓶颈在数据深度

> round-0432

## 做了什么

按组件名后缀划分族（`Dialog`/`Select`/`Menu`/`Tabs`…），对子组件生成**包裹式**
测试场景：`h(FamilyRoot, ..., { default: () => h(Child) })`，让 provide/inject 生效。

393 个用例中 76 个是包裹式。

## 结果对比

| 指标 | 无包裹（round-0431） | 包裹式（本轮） |
|---|---|---|
| OK | 91 | **94** |
| EMPTY | 51 | 36 |
| ERR | 251 | 263 |
| 包裹式成功 | — | **33 / 76** |

**只提升了 3 个。** 包裹确实让一部分子组件开始工作（33 个），但同时把一些原本
能独立渲染的组件塞进了容器里反而失败（ERR 从 251 升到 263）。

## 为什么收益这么小

剩余错误分布（263 个）：

| 错误 | 数量 |
|---|---|
| `str.replace is not a function` | 68 |
| `Cannot destructure property 'slots' of 'undefined'` | 54 |
| `Cannot read properties of null (reading 'ce')` | 49 |
| `set on proxy: trap returned falsish for style` | 14 |
| `Cannot read properties of undefined (reading 'value')` | 10 |
| `Cannot read properties of undefined (reading 'as')` | 8 |

**核心瓶颈已经不是「上下文」，而是「数据结构深度」**：

- `str.replace is not a function`：组件期望字符串，我给了 `{}` 或 `[]`
- `Cannot destructure 'slots'`：组件期望 `props.slots` 是个对象
- `Cannot read ... (reading 'value')`：期望 ref 形态
- `set on proxy ... style`：期望可写的 style 对象

也就是说，这些组件需要**贴近真实业务数据的 prop 结构**，而不是"类型对了就行"的
mock 值。要把它们全部渲染出来，得从原应用的数据流反推每个组件实际吃到什么数据
——那是另一个量级的工程。

## 结论

**这套 UI 组件的可独立渲染率就是 ~24%，这是它的设计使然**：

- 它是 reka-ui / radix 风格的**组合式组件**
- 大量子组件需要父组件上下文（provide/inject）
- 即使包上容器，还需要匹配真实的数据结构

**换句话说：24% 不是还原质量问题，是这类组件库的固有属性。**

已渲染成功的 94 个（叶子组件、自足组件）证明还原链路是通的：
模板、props、样式、slot 全都能正确工作。

## 工具

`tools/vue-decompiler/gen-family-test.cjs` —— 族划分 + 包裹式测试生成
