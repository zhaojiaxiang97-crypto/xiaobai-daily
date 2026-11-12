# 下一步目标：建 Vue API 映射表

> round-0482
>
> 上轮还原了 30 个业务函数名。**但真正影响可读性的是 Vue API 短名。**

## 为什么 Vue API 映射更关键

看 `Switch.js` 里的 `Za`：

```js
function Za(e) { return B(() => !A(e) || !!Z(e)?.closest(`form`)); }
```

- `Za` 已经还原成 `useFormControl`（上轮）
- **但 `B` / `A` / `Z` 还是不可读** —— 而这才是每一行都在用的东西

还原后：

```js
function useFormControl(e) { return computed(() => !unref(e) || !!unref(e)?.closest(`form`)); }
```

**这才是能读的代码。**

## 映射链已打通

```
Switch.js 里            runtime 导出              真实实现
B          ←→          v            ←→         rc = (e, t) => Cn(e, t, Us)     = computed
A          ←→          On           ←→         fn(e) { return g(e) ? e() : dn(e) }  = unref
```

**关键**：`Switch.js` 从 `../chunks/vue-i18n.runtime.js` import，而那个 runtime
**就是 Vue + vue-i18n 的打包**。所以「runtime 导出名 → Vue API」是一张
**跨文件通用**的表 —— 15 个 ui 文件、99 个 chunks 全都用它。

## 目标

**建一张 `runtime 导出名 → Vue API 真名` 的表，应用到生成器。**

完成后，生成的 `.vue` 里：

```js
// 现在
let n = B(() => e.value);
// 目标
let n = computed(() => e.value);
```

## 怎么做

**Vue 的 API 数量有限（~50 个），且实现特征明确**：

| API | 特征 |
|---|---|
| `computed` | `(e, t) => Cn(e, t, Us)` — 接收 getter，返回带 `_value`/`effect` 的对象 |
| `unref` | `(e) => isRef(e) ? e.value : e` — 两行三元 |
| `ref` | 返回 `{ __v_isRef: true, value }` |
| `reactive` | 用 Proxy |
| `watch` | 接收 cb + options |
| `onMounted`/`onUnmounted` | 调 `injectHook` 之类 |

**两条路**：

1. **特征识别**（纯静态）：对 runtime 的每个导出，看实现特征打标
2. **对照 Vue 官方 dist**：Vue 的 `dist/vue.runtime.esm-bundler.js` 是未压缩的，
   把 runtime 的每个导出和 Vue 的同名 API 做实现比对

**推荐第 2 条** —— 更准，且能覆盖全部 API。

## 当前数据

- `Switch.js` 从 runtime import 了约 **40 个**符号（一段 `import {...}`）
- 全部 15 个 ui 文件 + 99 个 chunks 都从同一个 runtime import
- **所以一张表能覆盖整个项目**

## 风险

**短名在不同文件里含义可能不同** —— 但这次不会：
它们都从**同一个 runtime 模块** import，`runtime.v` 就是 `computed`，
在哪都一样。**这次是真正跨文件安全的。**

（对比：上轮 `v` 在 `Collection.js` 和 `RovingFocusGroup.js` 里是不同东西，
所以那个映射必须带文件作用域。**但 Vue API 不需要**。）

## 验证方式

1. 生成一张映射表
2. 对 `Switch.js` 做还原，看 `Za` 是否变成完全可读的 `useFormControl` + `computed` + `unref`
3. 应用到生成器，验证 `.vue` 构建仍通过、渲染率不降

**关键约束**：**渲染率不能降**（七轮教训）。所以应用映射后必须重跑基线对比。
