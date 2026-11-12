# `$setup.X is not a function` 的根因：多 declarator 的解构没被 `<script setup>` 识别

> round-0474

## 现象

setup 内联后，13+12 个组件报 `$setup.i is not a function` / `$setup.t is not a function`。

`$setup` 是 Vue 在 dev 模式下对 `<script setup>` 顶层绑定的访问路径。
报这个错说明**模板引用的名字没被识别为顶层绑定**。

## 查证

以 `AiModelSettings.vue` 为例，先确认 `i` 是否真的在 script 里：

```
i: script 顶层声明 0 处（用 `^(const|let|var)\s+i\b` 查）, 模板引用 2 处
```

看起来"没有声明"。但换一种查法（找所有含 `i` 的声明语句）：

```js
let n_0 = e,
    r = t,
    {
      t: i        // ← i 就在这里！
    } = it(),
    { captureGrowthObservation: a } = Ri(),
    o = null
```

**`i` 确实声明了，而且是顶层的** —— 它是 `it()` 返回值的解构别名。

## 根因

`i` 在**一条 `let` 的多个 declarator 之间**，且是**解构形态**：

```js
let n_0 = e, r = t, { t: i } = it(), ...
```

Vue 的 `<script setup>` 编译器分析顶层绑定时，对这种「续在逗号后的解构别名」
**识别不了**（至少这个版本 3.5.43 是这样）。

于是模板里的 `i(...)` 在运行时找不到 `$setup.i`。

## 修法（明确）

**把多 declarator 的声明拆成单条**：

```js
// 现在（Vue 识别不了后面的解构）
let n_0 = e, r = t, { t: i } = it();

// 应该拆成
const n_0 = e;
const r = t;
const { t: i } = it();
```

实现上很简单 —— AST 组装时（`pushStmt` 之前），把 `VariableDeclaration` 的
每个 declarator 拆成独立的 `VariableDeclaration`。

**这与 round-0472 遇到「一条声明被内联多次」是同一个问题的另一面**：
- 那条问题的表现是「重复声明」（我在内联时按 `start` 去重解决）
- 这条问题的表现是「解构没暴露」

## 这也解释了为什么 setup 内联版本的 OK 反而更低

内联把 `i` / `t` 这些原本"从 shared 错误补位"的名字，换成了"作用域内但 Vue 识别不了"。
**错误换了个形式，但对渲染的影响一样。**

## 下一步

1. 在 `pushStmt` 里，如果 `st` 是多 declarator 的 `VariableDeclaration`，拆成多条再 push
2. 重新跑，看 `$setup.X` 是否归零
3. 若归零，再看 OK 是否超过基线的 98
