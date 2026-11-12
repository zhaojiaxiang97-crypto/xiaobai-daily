# 纠正：`S_P` 是 Button 组件，上轮的证据链是错的

> round-0470
>
> 上一轮（round-0468/0469）我说「`S_P` 指向 Switch.js 的局部函数 `r`」，
> **这个判断是错的。**

## 事实

`src/renderer/ui/Switch.js` 里：

```js
cl = R({
  __name: `Button`,
  props: { variant: {}, size: {}, ... }
})
...
export { ..., cl as r, ... }
```

**`cl` 就是 `Button` 组件，导出名是 `r`。**

所以：

```js
// shared.js
import { r as src_P } from './vendor/ui/Switch.js';   // ← 这是 Button
export { src_P as S_P };
```

**`S_P` = Button 组件，完全正确。**

模板 `<component :is="P" variant="outline" size="sm">` 的用法也是对的
（Button 确实有 `variant` / `size`）。

## 我错在哪

上轮我把 `Switch.js` 里某个**局部变量** `r = xn(t...)` 当成了 export 的 `r`。
实际情况：

- `r = xn(t...)` 是某个函数内部的**解构别名/局部变量**
- export 的 `r` 指向 `cl`（Button）
- 两者同名但不是同一个东西 —— **这正是短名混淆的典型案例，我自己也中了招**

## 这对 59 个 slots 错误意味着什么

**根因还没找到。** 之前排除的四项仍然成立（图标组件正常、工厂当组件不崩、
不是直接调用、不是批量污染），但第五项「`S_P` 冲突」**要撤回**。

剩下的线索：

1. `AiModelSettings.vue:47` → `lucide-icons.js:50`
2. `FeatureInfoDialog` **单独**渲染报的是 `Cannot read properties of null (reading 'ce')`
   —— **不是 slots 错误**，说明它在更早阶段就挂了
3. 所以 `AiModelSettings` 的 slots 错误，来自 `H_`（FeatureInfoDialog）**之外的**路径

**下一步**：`AiModelSettings` 的 5 个动态组件是 `H_` / `By`(Select) / `P`(Button) / `fV`。
逐个单独渲染，看谁会产生 slots 错误 —— 最可能是 `By`（Select）或 `fV`。

## 教训

**追短名混淆时，必须用 AST 绑定查真实定义，不能靠文本 grep。**
这轮我自己把 `r = xn(...)` 当成了 export 的 `r`，犯的正是项目里反复出现的
同一个错误。
