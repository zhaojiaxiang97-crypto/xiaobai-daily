# 又一个 render 代码泄漏点：`v-text` 里的调用链

> round-0467

## 排除第三个假设

假设「图标组件被直接调用」：实测 main.js 里 lucide 的三个别名

| 别名 | lucide 导出 | 出现次数 | 直接调用 |
|---|---|---|---|
| `jt` | `n`（工厂产物） | 39 | 11 |
| `Mt` | `r`（工厂本身） | 210 | 177 |
| `Nt` | `t`（另一产物） | 88 | 0 |

看起来 `Mt` 有 177 次直接调用，但抽样看全是**局部同名函数遮蔽**：

```js
async function jt(e = false) { ... }      // ← 局部函数，不是 lucide 的 jt
async function jt() { ... }
onBeforeMount(() => { jt(), ... })
```

**所以「图标被直接调用」这个假设也排除。**

## 新发现：`v-text` 里的 render 代码泄漏

main bundle 生成的 392 个组件里，**5 个**的模板中还留着 `resolveComponent(...)`，
其中 **3 个在 59 个 slots 错误名单内**（`Sidebar` / `TimelinePage` / `XiaoheiBotTodoPanel`）。

`Sidebar.vue` 的实际内容：

```html
v-text="Xe(resolveComponent(Ip,{ref_key:`campaignCardRef`,ref:w,
        'user-id':s?.userId??null,onClaimed:l},null,8,[`user-id`,`onClaimed`]),
        [[Tt,!items.collapsed]])"
```

`v-text` 本该接一个字符串，这里塞进了整段
`withDirectives(resolveComponent(...), [[dir, arg]])` 调用。

`TimelinePage.vue` 更严重，整个 `createElementVNode(...)` 调用树都被塞进了 `v-text`：

```html
v-text="Xe(createElementVNode(`section`, vut, [
        createElementVNode(`div`, yut, [
          createElementVNode(`div`, but, [
            resolveComponent(Ja, {size:14, 'stroke-width':1.5, class:`...`}),
            ...
```

## 这说明什么

`convert-component.cjs` 对 **`v-text` 指令位置**没有做 render→template 转换：
它把 `withDirectives(...)` 的完整调用当普通表达式塞进属性值。

round-0438 修的是 **children 位置**的 `resolveComponent(X, props)`，
但**属性值 / `v-text` 位置**这条路径没覆盖。

## 结论

| 项 | 状态 |
|---|---|
| 假设 3（图标被直接调用） | ✅ 已排除（是局部同名函数） |
| 5 个组件的 render 代码泄漏 | ✅ 已定位（`v-text` 位置） |
| 其中在 59 名单内的 | **3 个**（`Sidebar` / `TimelinePage` / `XiaoheiBotTodoPanel`） |
| 59 个的完整根因 | ❌ 还有 56 个待查 |

## 下一步

1. 修 `convert-component.cjs` 的 `v-text` 处理：`v-text="expr"` 里的 render 调用
   应转成对应的模板结构（`withDirectives` → `v-show`/`v-model`，
   `resolveComponent(X)` → `<component :is="X">`）—— 但 `v-text` 位置无法放组件标签，
   更合理的做法是让它回退成 `<component :is>` 或直接丢该属性
2. 剩下 56 个继续按「堆栈 → 模板行」逐类收敛

**注意**：这类「render API 泄漏到模板」已经修过三次（0438 resolveComponent /
0439 renderCache / 0444 createCommentVNode），这是第四个泄漏点。
说明 `convert-component.cjs` 的模板转换覆盖度仍有系统性缺口。
