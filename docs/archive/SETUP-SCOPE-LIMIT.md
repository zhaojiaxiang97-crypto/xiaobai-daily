# 真正的缺口：模板引用了 setup 内部的局部函数

> round-0445
>
> 修正上一轮的假设。49 个组件缺符号**不是** chunk 文件级自由变量问题，
> 而是 **setup 作用域**问题。

## 上一轮的假设是错的

上一轮判断「组件切分时，文件级局部函数没被带进 .vue」。按这个假设实现了
自由变量分析（`resolveDeps`：收集组件引用但既非 import 也非内部的标识符，
从 chunk 顶层抽定义递归内联）。

**实现本身可用**，但对 `N` 无效 —— 因为 `N` 不在文件顶层。

## 真实根因

```js
setup(e) {
  // ...一堆 ref / computed...
  function N() {                                    // ← setup 内部定义的局部函数
    E.value || r.isDateUnavailable?.(n.date) ||
      (r.focusedValue.value = n.date);
  }
  return (e, t) => e('button', {
    onClick: ee,
    onFocusin: N,       // ← 模板里变成 @focusin="N"
    onMouseenter: N,    // ← @mouseenter="N"
  }, ...);
}
```

**`N` 是 `setup()` 函数作用域内的局部函数。**

我的转换器只提取 `setup` **返回的 render 函数**并转成模板，
**`setup` 里其余的代码（局部函数、ref、computed、生命周期钩子）全部丢弃**。

模板里引用了 `N` → 组件里没有 `N` → `N is not defined`。

## 这不是孤例

49 个组件都缺符号，且形态一致：**模板引用了 setup 内的局部绑定**。

这也解释了更早观察到的现象：
- `Cannot read properties of null (reading 'ce')` 41 个
- `Cannot read properties of undefined (reading 'value')` 21 个
- `_ctx.rt is not a function` 6 个

这些都是**模板引用了 setup 内没被保留的绑定**（`_ctx.rt` 是 Vue 运行时对
未定义模板引用的兜底访问路径）。

## 修复方向（明确）

不再是「内联文件级定义」，而是**保留 setup 逻辑**：

**方案 A：整体保留 setup**
把 `setup` 函数体完整放进 `<script setup>`，只把 return 的 render 转成模板。
- 优点：语义完整，ref/computed/钩子都在
- 难点：`<script setup>` 的 `defineProps` / 返回值处理需要适配

**方案 B：按需提取**
从 setup 体里抽出「被模板引用」的定义（局部函数、ref、computed），
放进 `<script setup>`。
- 优点：产出干净
- 难点：需要 setup 作用域内的依赖分析（比文件级复杂，但同一个方法论）

**方案 B 更符合「还原成可读 Vue 代码」的目标**，且能复用本轮已有的
`resolveDeps` 思路，只是把作用域从 Program 换成 setup 函数体。

## 本轮留下的可复用实现

`lib-conv.cjs` 里的两段代码（对文件级有效，可直接改成 setup 级）：

```js
// 自由变量分析：把组件追加到临时 Program，用 scope.hasBinding 判断
torch: T(fileAst, { Identifier(ip) {
  if (!ip.isReferencedIdentifier()) return;
  if (ip.scope.hasBinding(nm)) return;
  free.add(nm);
}});

// 递归收集定义（按源码顺序）
function resolveDeps(freeNames, importKeys) { ... }
```

只需把「临时 Program 里的组件」换成「setup 函数体」，`topDefs` 换成
「setup 体内所有 VariableDeclaration / FunctionDeclaration」，逻辑即可复用。

## 结论

| 项 | 状态 |
|---|---|
| 文件级自由变量分析 | ✅ 已实现（但对本问题无效） |
| 真实缺口 | **setup 内局部绑定未保留** |
| 影响 | 49 个组件缺符号 + 早前观察到的 ce/value/_ctx 错误 |
| vendor 组件转换 | 148（全量） |
| main bundle 渲染率 | 109（未受影响） |

**这是一个结构性限制，不是 bug。** 前几轮修的 render API 泄漏是「多搬了东西」，
这层是「少搬了东西」，且少搬的是整个 setup 逻辑。
