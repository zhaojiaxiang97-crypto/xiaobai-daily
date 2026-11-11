# 深挖第三层：`lucide-icons.js` 的 ctx undefined

> round-0440

## 调查过程

### 1. 导出结构（浏览器实测）

在真实 Chrome 里 import `ui/icons/lucide-icons.js`，看三个导出的类型：

```json
{
  "n": { "type": "function", "name": "" },      // u = l('pin', [...]) 工厂产物 → 图标组件
  "r": { "type": "function", "name": "l" },     // l 工厂函数本体（name 是 'l'）
  "t": { "type": "function", "name": "" }       // 另一个图标组件
}
```

**关键**：`r` 导出的函数 `name === 'l'`，正是源码里的工厂：

```js
l = (t, n) => (r, { slots: i, attrs: a }) => e(c, {...}, i)   // 工厂
u = l(`pin`, [[...]])                                          // 工厂产物（组件）
```

所以 **`r` 是工厂，`n`/`t` 才是组件**。

### 2. 但组件并没有直接用这个工厂

`AboutSettingsSection.vue` 的 import 是：

```js
import { ..., S_r as r } from '../shared.js';
```

这里 `S_r` 是**某个 ref**，不是 lucide 的 `Mt`（跨 chunk 别名的同名碰撞）。
模板里也没有 `<component :is="Mt">`。

### 3. 真正的错误链

堆栈是：

```
AboutSettingsSection.vue:29
  → lucide-icons.js:50
```

而 `AboutSettingsSection` 模板第 29 行的内容是 `<component :is="H_" ...>`，
`H_` 是 `FeatureInfoDialog`；它的模板是：

```html
<component :is="ui" :open="r.value" @update:open="e=>r.value=e" />
```

`ui` 来自 shared.js，是 **vendor 里 `dialog.js` 的 `DialogRoot`**（未转换的原始代码）。

**所以链路是**：我的 .vue → vendor 的 DialogRoot → vendor 的 lucide 图标组件。
**中间两层都是 vendor 的未转换代码。**

### 4. 为什么 ctx 是 undefined

`lucide-icons.js:50` 的：

```js
l = (t, n) => (props, { slots: i, attrs: a }) => e(c, {...}, i)
```

这是**标准 Vue 3 函数式组件签名**（Vue 3 会用 `(props, ctx)` 调用，ctx 含 slots/attrs）。
`Cannot destructure property 'slots' of 'undefined'` 说明 **ctx 是 undefined**。

可能路径：
1. 它被当作**普通函数值**而非组件类型传给 `h()` / `:is`
2. 或者 vendor 的 `DialogRoot` 内部有非标准调用

**这需要转换 vendor 的 `dialog.js` 才能验证** —— 因为它是未转换的原始代码，
我无法确认它内部怎么用图标。

## 结论

| 项 | 结论 |
|---|---|
| `slots` 错误的源头 | **vendor 里未转换的函数式组件**（lucide 图标） |
| 我的 392 个 `.vue` | 不是直接责任方 |
| 根治前提 | 把 vendor 的 `dialog.js` 等也转成 `.vue` |
| 本轮渲染率 | **109（未变）** |

**这一层的价值是定性**：确认了剩下 69 个 `slots` 错误不是我的转换器 bug，
而是**依赖链上有未转换的原始代码**。

## 要继续的前提（成本明确）

把 vendor 里 **148 个未转换组件**（`ui/` 102、`pages/` 40、`blocks/` 5、`vendors/` 1）
也用 `lib-conv.cjs` 转成 `.vue`，并让 shared.js 指向转换后的版本。

这是可做的，但是**逐个转换 + 逐个验证**的工作量，且转换器本身对函数式组件
（`l = (t,n) => (props,ctx) => ...`）需要新增支持。
