# `S_it` 身份确认：它就是 `useI18n`

> round-0477
>
> 上轮实测发现「注册标准 vue-i18n 插件无效」。这轮从源码确认了原因。

## `S_it` 是什么

`shared.js` 里：

```js
import { n as src_it } from './vendor/chunks/vue-i18n.runtime.js';
export { src_it as S_it };
```

`vue-i18n.runtime.js` 里：`export { gf as n }`

`gf` 的实现：

```js
function gf(e = {}) {
  let t = Yd();
  if (t == null) throw Fd($.MUST_BE_CALL_SETUP_TOP);
  if (!t.isCE && t.appContext.app != null && !t.appContext.app.__VUE_I18N_SYMBOL__)
    throw Fd($.NOT_INSTALLED);
  let n = vf(t), r = bf(n), i = Kd(t), a = yf(e, i);
  ...
}
```

**两个硬性前置条件**：

1. `Yd()` 非 null —— **必须在 setup 上下文里调用**
2. `app.__VUE_I18N_SYMBOL__` 必须存在 —— **必须装了「原应用这个」i18n 插件**

**所以 `gf` 就是 `useI18n`。**

## 原应用的 i18n 实例

`vue-i18n.runtime.js` 里能找到实例对象：

```js
let l = {
  get mode() { return `composition`; },
  async install(e, ...n) {
    if (e.__VUE_I18N_SYMBOL__ = a, e.provide(e.__VUE_I18N_SYMBOL__, l), Z(n[0])) { ... }
  }
}
```

**它的 `install` 会设置 `app.__VUE_I18N_SYMBOL__ = a`。**

## 为什么标准 vue-i18n 包无效

我注册的是 `npm i vue-i18n`（11.4.18）的 `createI18n`。
**标准包用的是它自己的 Symbol 键，不会设置原应用那个 `a`（`__VUE_I18N_SYMBOL__` 的值）。**

于是 `gf` 一进来就抛 `Fd($.NOT_INSTALLED)`，`let { t: i } = it()` 整个失败，
`i` 从未被赋值 → 模板里的 `i(...)` 报 `$setup.i is not a function`。

**这解释了上轮为什么注册标准包后 `$setup` 还有 60 个（一点没降）。**

## 正确的做法

要用**原应用的 i18n 实例**：

```js
// 从 runtime 取实例（它的 install 会设置正确的 symbol）
import { /* 创建 i18n 的那个导出 */ } from './vendor/chunks/vue-i18n.runtime.js';
const i18n = createI18nFromRuntime({ locale: 'en-US', messages: {...} });
app.use(i18n);   // ← 这个 install 才能让 gf 通过检查
```

**待查**：那个创建 `l` 的函数（`createI18n` 的压缩名）是 runtime 的哪个导出。
上一步定位到 `install` 定义在 `let l = {...}` 里，但 `l` 由哪个函数返回还没追。

## 这轮的价值

**彻底解释了「为什么标准 i18n 无效」**，并且证明了：

- `S_it` **不是错的符号** —— 它确实是 `useI18n`，
  `AiModelSettings` 用 `it()` 拿 `t` 函数是**正确用法**
- 问题只在**测试环境没有原应用的 i18n 实例**

**这是重要修正**：之前几轮我一直怀疑「shared 补位拿错符号」，
但 `S_it` 这个案例证明 shared 补位**有时是对的**。
`S_l`（= `Za` 工具函数）是错的，`S_it`（= `useI18n`）是对的。

## 下一步

1. 找到 runtime 里创建 i18n 实例的导出（`createI18n` 的压缩名）
2. 用它建测试环境，再测 setup 内联版本
3. 如果 `$setup` 归零，OK 可能大幅回升 —— 那时 setup 内联的净效果才能被正确评估
