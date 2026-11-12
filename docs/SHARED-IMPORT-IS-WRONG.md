# 决定性证据：`S_<原名>` 补位对所有组件都不可靠（浏览器实测）

> round-0471
>
> 前面 5 轮都在猜 59 个 slots 错误的根因，这轮用**浏览器实测**拿到了硬证据。

## 完整链路

```
SubscriptionModelSettings.vue          ← 59 个之一，单测就报 slots 错误
  └─ <component :is="Uy" />            ← Uy = SelectItem.vue
       SelectItem.vue
         └─ <component :is="l" :value="({textValue:p.value})" />
              ↑                          ↑
            S_l（来自 shared.js）      S_p（来自 shared.js）
```

`SelectItem.vue` 的 script：

```js
import { S_is as is, S_as as as, S_l as l, S_p as p } from '../shared.js';
```

## 浏览器实测的类型

直接 `import('./shared.js')`，看这四个符号是什么：

| 符号 | type | 实际名字 | 有 render/setup? |
|---|---|---|---|
| **`S_l`** | function | **`Za`** | ❌ |
| **`S_p`** | function | **`fo`** | ❌ |
| `S_is` | function | （匿名） | ❌ |
| `S_as` | function | （匿名） | ❌ |

**没有一个是组件。**

`Za` 在源码里是：

```js
function Za(e) {
  return B(() => !A(e) || !!Z(e)?.closest('form'));
}
```

—— 一个业务工具函数（判断是否在 form 里）。

而模板拿它当组件用：`:is="l"` → Vue 当函数式组件调用 `Za(props, ctx)` → 崩。

## 这说明什么

`gen-main.cjs` 的做法是：**模板里出现的任何短名，都去 `exportSet`
（shared.js）里找同名符号补位**。

而 `shared.js` 的 `S_<原名>` 指向的是 **main.js 顶层那个 import**。
**但同一个短名在不同 chunk 里是完全不同的东西**：

- `main.js` 顶层的 `l` = 从 `Switch.js` 导入的 `H` = `Za`（工具函数）
- `SelectItem.vue`（reka-ui 的组件）里的 `l` = 它自己的某个组件引用

**两者毫无关系，但转换把它们接上了。**

## 为什么这是"决定性"

之前 5 轮的排除都是间接推理，这次是**直接测量的类型**：

```
S_l = function Za, hasRender=false, hasSetup=false
```

**不是组件，却出现在 `<component :is>` 的位置。**

这条证据不依赖任何推理链，可以直接复现。

## 影响面

任何**模板引用了 shared 短名**的组件都可能中招。59 个报错组件里，
`SelectItem` 只是被点出来的第一个。

**真正的修法**只能是：**不靠 shared 补位模板里的短名**，而是
让组件从**它自己的 chunk** 拿到正确符号 —— 即 round-0457 之后一直说的
「vendor 组件也要转换，让 import 指向转换后的 .vue」。

## 结论

| 项 | 状态 |
|---|---|
| 59 个的根因 | ✅ **shared 短名补位接错了符号**（浏览器实测证据） |
| 具体链路 | ✅ `SubscriptionModelSettings → SelectItem → S_l(=Za 函数)` |
| 修法方向 | 组件必须从自己的 chunk 拿符号，不能靠 main.js 顶层的同名 import |
