# 深挖：修 `resolveComponent` 泄漏到模板（渲染率 93 → 109）

> round-0438

## 怎么找到的

不再猜 mock 数据，而是**读失败组件的完整堆栈**：

```
TypeError: Cannot destructure property 'slots' of 'undefined'
    at Proxy.<anonymous> (src/vendor/ui/icons/lucide-icons.js:50:12)
    at src/components/AboutSettingsSection.vue:35:68
```

堆栈指向生成的模板第 35 行。那一行是：

```html
<span v-text="resolveComponent(H_,{title:..., description:...})" />
```

## 根因

原 render 函数里的写法：

```js
resolveComponent(H_, { title: ..., description: ... })
```

- `H_` 是组件对象（`defineComponent({__name:'FeatureInfoDialog'})`），不是字符串
- `resolveComponent` 在 Vue 内部对非字符串参数会原样返回，所以**在 render 里能跑**
- **但 `resolveComponent` 是 render 函数专用 API，模板里根本不存在**

我的转换器把它原样搬进了模板 → 运行时报错。

## 修复

`convert-component.cjs` 里新增：遇到 children 位置的 `resolveComponent(X, props)`，
转成泛型组件标签：

```html
<component :is="X" :title="..." :description="..." />
```

（从 `props` 对象里逐个展开属性）

## 效果

| 指标 | 修复前 | 修复后 |
|---|---|---|
| **渲染成功** | 93 | **109（+16）** |
| `str.replace is not a function` | 68 | **0**（消失） |
| `slots` 解构错误 | 54 | 69（部分组件走了新路径） |
| 其他错误 | — | 减少 |

**相对提升 17%。**

## 同时否掉的一个方向

试过用组件源码里的 **props `default` 值**替代猜测的 mock：
833 个 props 里有 99 个能提取到自足的 default（其余引用外部符号）。

**结果：93 —— 比原来的 94 还少 1。** 说明瓶颈不在 props 默认值，
而在**模板里泄漏的 render 专用 API**。

## 下一层（已定位）

`slots` 解构错误 69 个 —— 同类问题：**还有别的 render 专用 API 被搬进模板**。
预期按同样方法（读堆栈 → 定位模板行 → 改转换规则）能继续收敛。

其他错误分布：
- `Cannot read properties of null (reading 'ce')` 41
- `Cannot read properties of undefined (reading 'value')` 21
- `set on proxy: trap returned falsish for style` 10
- `_ctx.rt is not a function` 6（`_ctx.xxx` 说明模板引用了未绑定的名字）
- `Injection Symbol(...) not found` 14（需父组件，设计使然）

## 方法总结

**深挖的正确姿势**：
1. 不要猜 mock 数据（试过，无收益：93 vs 94）
2. 抓**完整堆栈**，它会直接指向有问题的模板行
3. 判断是「转换器把 render API 搬进了模板」还是「真的缺上下文」
4. 前者是转换 bug（可修），后者是组件库设计（改不了）
