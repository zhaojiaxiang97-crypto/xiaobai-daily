# `S_<原名>` 命名冲突的实证：`S_P` 指向了局部函数

> round-0467

## 决定性证据链

### 1. `AiModelSettings` 的 5 个动态组件

```html
<component :is="H_" />   ← ./FeatureInfoDialog.vue
<component :is="By" />   ← ./Select.vue
<component :is="P" />    ← from shared.js（S_P）
<component :is="P" />
<component :is="fV" />   ← ./SubscriptionModelSettings.vue
```

**只有 `P` 来自 `shared.js`。**

### 2. `S_P` 是什么

`shared.js` 里：

```js
import { r as src_P } from './vendor/ui/Switch.js';
...
export { src_P as S_P };
```

**即 `S_P` = Switch.js 的 `r` 导出。**

### 3. Switch.js 的 `r` 是什么

Switch.js 里有两处：

```js
r = xn(t...)                                                    // ← 局部函数！
import { r as vn } from './icons/lucide-icons.js';              // ← lucide 工厂导入为 vn（不是 r）
```

**`r` 是局部函数（`r = xn(t...)`），不是组件。**

### 4. 后果

模板 `<component :is="P" />` → `:is` 拿到函数 → Vue 当函数式组件调用
`P(props, ctx)` → 执行 `xn(t...)` 这条路径 → 崩溃。

**错误信息是 `Cannot destructure property 'slots' of 'undefined'`** ——
因为 Vue 把它当函数式组件调用时，这个函数并不接受 `(props, ctx)` 签名。

## 这不是孤例

`shared.js` 的导出规则是 `export { <原名> as S_<原名> }`。
**但 main bundle 里同一个短名（如 `P`、`r`、`o`、`u`）在不同 chunk 里指向完全不同的东西**：

- 在 `Switch.js` 里 `r` 是局部函数
- 在 `lucide-icons.js` 里 `r` 是图标工厂
- 在 `dialog.js` 里 `r` 是 `DialogFooter` 组件

`shared.js` 只能保留**一个** `S_r`。**谁被保留取决于跨 chunk import 的合并顺序** —— 这就是冲突。

## 这轮排除的 4 个假设（都有实验证据）

| 假设 | 结论 |
|---|---|
| 图标组件本身坏了 | ❌ `h(L.n, {size:16})` 输出完整 `<svg>` |
| `S_r` 冲突导致工厂被当组件 | ❌ 工厂当组件只渲染成源码文本，不崩 |
| 图标被直接调用 | ❌ `jt`/`Mt` 的调用都是局部同名函数遮蔽 |
| 批量 mount 状态污染 | ❌ 单独挂载 `AiModelSettings` 同样崩 |
| 嵌套本身有问题 | ❌ 单独/嵌div/嵌组件/动态is 四种场景都正常 |
| `FeatureInfoDialog` 引起 | ❌ 它报的是 `ce` 错误，不是 slots |

## 修法（明确）

**`shared.js` 的导出必须按来源 chunk 加前缀**，例如：

```js
export { src_P_switch as S_switch_P };
export { src_r_lucide as S_lucide_r };
```

然后组件的 import 改成指向**它原本那个 chunk** 的符号。
这需要 `gen-main.cjs` 在收集跨 chunk import 时记录「来源 chunk」，
并在导出/导入两侧都用带前缀的名字。

**工作量：中等**（改 gen-main 的 crossList 命名规则 + 组件 import 生成），
但能一次性解决这类「拿到错误同名符号」的崩溃。
