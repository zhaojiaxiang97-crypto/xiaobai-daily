# 深挖第二层：事件缓存泄漏（模板正确性修复）

> round-0439

## 修了什么

`FeatureInfoDialog.vue` 生成的模板原本是：

```html
<component :is="ui" :open="r.value" @update:open="[n[0]||=e=>r.value=e,o]" />
```

`[n[0]||=e=>r.value=e, o]` 是 **Vue 编译器的 renderCache 事件缓存**，被原样泄漏进模板。
在模板里这不是合法表达式。

修复 `convert-component.cjs` 的事件属性处理：

```
数组形式 [X[i] ||= fn, other]  → 取 fn
赋值形式 X[i] ||= fn          → 取 fn
```

结果：

```html
<component :is="ui" :open="r.value" @update:open="e=>r.value=e" />
```

## 效果：模板更干净，但渲染率没动

同口径（带 props mock）重测：

| 指标 | 前 | 后 |
|---|---|---|
| 渲染成功 | 109 | **109** |
| `slots` 解构错误 | 69 | 69 |

**说明这些组件失败的原因不在事件缓存**，而在别处。这是模板**正确性**的改进，
不是覆盖率提升 —— 如实记录。

## 这一层确认的根因链

抓完整堆栈（3 个组件）：

```
AboutSettingsSection.vue:29  → lucide-icons.js:50
AiModelSettings.vue:47       → lucide-icons.js:50
AppLockSettings.vue:48       → Cannot read properties of undefined (reading 'enabled')
```

`lucide-icons.js:50` 是 `createLucideIcon` 的实现：

```js
l = (name, iconNode) => (props, { slots, attrs }) => createElementVNode(...)
```

**这是标准 Vue 3 函数式组件签名**（`(props, ctx)`）。报 `Cannot destructure 'slots' of undefined`
说明 **ctx 参数是 undefined** —— 即它被当作**普通函数调用**，而不是函数式组件。

**关键**：`lucide-icons.js` 是 vendor 里**未转换的原始代码**（不在 392 个 .vue 之列）。
它的组件通过 `shared.js` 的跨 chunk re-export 被 main bundle 的组件使用。

## 结论

| 项 | 状态 |
|---|---|
| 事件缓存泄漏 | ✅ 已修（模板正确性） |
| 渲染率 | 109（未变） |
| `slots` 69 个的根因 | vendor 里未转换的函数式组件 |
| 继续修的前提 | 需要把 vendor 组件也转换/适配 |

## 下一步（明确但有工作量）

`lucide-icons.js` 这类 vendor 组件是**函数式组件**，在 Vue 3 里应该能被正确调用。
ctx 为 undefined 的可能原因：
1. 它在被 `h()` 或模板解析时丢失了函数式组件标记
2. 或者被当成普通函数值传递（如 `:is="someFn"` 而 someFn 不是组件）

**需要单独针对 `lucide-icons.js` 做实验**：直接 `h(iconComp, props)` 看是否复现，
以及加上 `defineComponent` 包装能否解决。
