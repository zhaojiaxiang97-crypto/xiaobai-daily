# Vue API 还原：归一化 AST 比对，拿到 23 个确定性映射

> round-0490

## 方法：归一化结构比对

**问题**：runtime 的导出名是压缩的（`gt`、`bn`、`An`…），而 Vue 官方
`dist/vue.esm-browser.js` 是**未压缩的**（有真名和完整实现）。两者的函数体结构一致，
但变量名不同。

**做法**：

1. 把 AST 序列化成**只看结构**的字符串——所有 `Identifier` → `I`，
   字面量 → `S`，只保留节点类型和属性名
2. 对 Vue dist 的每个导出函数、runtime 的每个导出函数，各算一个结构签名
3. 签名完全相同即匹配
4. **再做 1:1 交叉验证**：只保留「一个 runtime 导出唯一对应一个 Vue API，
   且该 API 也只被这一个导出匹配」的

**为什么需要第 4 步**：不加过滤时有 43 个匹配，但 `BaseTransition` 被 4 个
runtime 导出（`Hn`/`Mn`/`R`/`Ut`）同时匹配——说明归一化太粗，结构相同的东西
被当成同一个。加上 1:1 过滤后剩 **23 个，全部可靠**。

## 结果：23 个确定性映射

| runtime 导出 | Vue API |
|---|---|
| `gt` | **openBlock** |
| `bn` | ref |
| `An` | unref |
| `On` | toValue |
| `b` | createBlock |
| `S` | createElementBlock |
| `wt` | resolveComponent |
| `z` | getCurrentInstance |
| `rt` | nextTick |
| `wn` | stop |
| `Cn` | shallowRef |
| `xn` | shallowReactive |
| `Gt` | watchEffect |
| `g` | callWithErrorHandling |
| `_n` | proxyRefs |
| `ln` | isProxy |
| `Q` | isRuntimeOnly |
| `T` | createRenderer |
| `i` | BaseTransitionPropsValidators |
| `$t` | withScopeId |
| `yt` | pushScopeId |
| `_t` | popScopeId |
| `W` | hasInjectionContext |

映射存 `tools/vue-decompiler/vue-api-map.json`。

## 验证：交叉印证了一个已知案例

`gt` = `openBlock` —— 而 round-0459 追查 `FocusScope` 的 `Cannot destructure
property 'slots'` 时，卡在 `gt(true)` 这个调用上（当时只知道它是某个 Vue API
别名，不知道是哪个）。

**现在确定了：`gt(true)` = `openBlock(true)`。**

这独立印证了映射的正确性。

## 一个重要纠正

之前 round-0482 手工分析时，我判断 `runtime.On` = `unref`（依据是
`fn(e) { return g(e) ? e() : dn(e) }` —— 如果函数就调用，否则取 ref 值）。

**这轮自动比对给出的是 `toValue`，是对的**：

- `unref(x)` = `isRef(x) ? x.value : x`
- `toValue(x)` = `isFunction(x) ? x() : unref(x)`

`fn` 的实现「是函数就先调用」正是 `toValue` 的特征。**手工分析看漏了这层。**

## 还能继续挖的

| 批次 | 数量 | 状态 |
|---|---|---|
| Vue API（runtime 导出） | 167 | **23 个 1:1 匹配**，123 未匹配 |
| vue-i18n API | 混在 runtime 里 | 未识别 |
| reka-ui 内部符号 | 343 个顶层函数 | 上轮 30 个高置信 |

**未匹配的 123 个**主要是：
- 结构有版本差异（应用用的 Vue 版本 ≠ 3.5.45）
- vue-i18n 的 API（Vue dist 里没有）
- 内部辅助函数（不是公开 API）

## 下一步

1. **应用这 23 个映射**到生成器，看 `.vue` 里 `gt(` → `openBlock(` 的效果
2. **验证渲染率不降**（七轮教训：任何改动都要对比基线 98）
3. 若要提升覆盖率，可以拉 vue-i18n 官方 dist 单独比对
