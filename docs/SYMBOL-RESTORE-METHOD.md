# 符号还原：把 `Za` 这类压缩名映射回真名

> round-0480
>
> 七轮渲染率尝试全部失败后，换了一个方向。**这轮验证了方法可行，并拿到第一个成功案例。**

## 为什么换方向

七轮 setup 内联（0472→0479）都没能超过基线 98，原因已查清：
内联把「静态可用的 shared 符号」换成「依赖运行时上下文的内联解构」。

**渲染率是天花板，而符号可读性是线性收益。**
现在生成的组件里到处是：

```js
function Za(e) {
  return B(() => !A(e) || !!Z(e)?.closest(`form`));
}
```

没人看得懂 `Za` / `B` / `A` / `Z` 是什么。

## 关键发现：reka-ui 的 dist 是未压缩的

```bash
npm pack reka-ui      # 2.11.0
tar xzf reka-ui-2.11.0.tgz
```

`package/dist/shared/*.js` 里**每个文件一个函数，带真名和注释**：

```js
// package/dist/shared/useFormControl.js
el) {
  return computed(() => toValue(el) ? Boolean(unrefElement(el)?.closest("form")) : true);
}
export { useFormControl };
```

## 第一个成功还原

应用里的 `Za`（在 `src/renderer/ui/Switch.js`）：

```js
function Za(e) {
  return B(() => !A(e) || !!Z(e)?.closest(`form`));
}
```

对照 reka-ui 的 `useFormControl`，**特征完全对上**：

| 应用版本 | reka-ui 版本 |
|---|---|
| `B(...)` | `computed(...)` |
| `A(e)` | `isRef(e)`（`!isRef` 短路） |
| `Z(e)?.closest('form')` | `unrefElement(el)?.closest("form")` |
| `!A(e) \|\| !!...` | `toValue(el) ? ... : true`（同义的边界处理） |

**所以 `Za` = `useFormControl`。**

（注：逻辑措辞有细微差别，说明应用用的 reka-ui 版本略早于 2.11.0，
但函数身份是确定的。）

## 方法（可批量化）

```
1. 遍历 vendor chunk 里的所有顶层函数（AST）
2. 对每个函数，提取「指纹」：
   - 调用的 Vue API（computed / ref / watch / onMounted...）
   - 字符串字面量（'form'、'data-state'...）
   - DOM API（closest / querySelector / addEventListener）
   - 返回结构（函数 / 对象 / 组件）
3. 对 reka-ui 的 dist/shared/*.js 建同样的指纹库
4. 按指纹相似度匹配 → `Za → useFormControl`
5. 生成映射表，应用到 gen-main / lib-conv 的符号命名
```

**优势**：纯静态，不依赖运行时，不受 i18n / props / 父组件影响。

## 本轮验证到哪一步

- ✅ reka-ui dist 可用（未压缩）
- ✅ 指纹法可行（`Za` → `useFormControl` 已验证）
- ⬜ 批量匹配脚本还没写
- ⬜ 映射表还没生成

## 下一步

1. 写批量化脚本：AST 提取 vendor chunk 的函数 + 指纹
2. 对 reka-ui dist 建指纹库
3. 匹配，先看覆盖率（多少短名能被还原）
4. 若能覆盖大部分，应用映射到生成器

**预期收益**：生成的 `.vue` 里 `Za(e){...}` 变成 `useFormControl(e){...}`，
可读性大幅提升 —— 这是使用者真正会读的东西。
