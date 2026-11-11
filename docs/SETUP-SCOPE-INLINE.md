# setup / render 作用域定义内联：框架已建，作用域待精确

> round-0446

## 做了什么

在 `lib-conv.cjs` 里加了三段能力，把「组件引用了但转换器没保留」的定义捞回来内联：

**1. `collectSetupDefs(setupNode)`**
从 `setup` 函数体顶层收集 `VariableDeclaration` / `FunctionDeclaration`。
（现实数据：`RangeCalendarCell` 的 setup 只有 2 条语句 `let t = e` + `return`，
所以这里通常很少。）

**2. `collectRenderLocals(setupNode)`**
压缩代码会把局部函数塞进逗号表达式：

```js
return (e, t) => (function N() { ... }, createElementVNode(...))
```

只取最后一项当模板会丢掉前面的定义，这里把前 N-1 项捞出来
（`FunctionExpression` 有 id 的直接用、赋值表达式转 `const`）。
同时处理 render 函数体是 BlockStatement 的情况（收集其中的
`FunctionDeclaration` / `VariableDeclaration`）。

**3. `collectSetupDeps(setupDefs, wanted, skip)`**
按「模板实际引用的标识符」递归收集依赖，按源码位置排序输出。

## 关键诊断结果

对 `onFocusin: N` 做 AST 绑定查询：

```
onFocusin 的值: N
  绑定 kind: hoisted
  绑定节点: FunctionDeclaration
  代码: function N() { E.value || r.isDateUnavailable?.(n.day) || (r.focusedValue.value = n.day.copy()); }
```

**`kind: hoisted` + `FunctionDeclaration`** —— 说明 `function N(){}` 在
**某个函数体顶层**被提升。它引用了 `E`、`r`、`n` 三个外部绑定（refs / props）。

但 `RangeCalendarCell` 的 setup 只有 `let t = e` + `return`，
render 的 body 只有 2 个 `CallExpression` —— **都不含 `function N`**。

**结论**：我查到的 `onFocusin: N` 属于**另一个组件**（同一 chunk 里有多个
占位组件，`onFocusin` 出现多次）。必须**按组件精确限定作用域**再分析。

## 结论

| 项 | 状态 |
|---|---|
| setup 级定义收集 | ✅ 已实现 |
| render 级（逗号表达式）定义提取 | ✅ 已实现 |
| 依赖递归收集 | ✅ 已实现 |
| `N` 的真实归属 | ⚠️ 是 hoisted FunctionDeclaration，但**尚未定位到确切组件** |
| vendor 组件 | 148（全量转换） |
| main bundle 渲染率 | 109（未受影响） |

## 下一步（明确且更细）

对每个组件，**在它自己的作用域内**做绑定查询：

1. 取该组件的 `setupNode`
2. 对模板里的每个未绑定标识符 `X`，在 setup 作用域执行 `scope.getBinding(X)`
3. 拿到 `binding.path.node` 的源码片段，内联到 `<script setup>`
4. 递归处理这段源码里的新自由变量

这比「按名字在文件里搜定义」精确得多 —— 同一 chunk 里同名符号可能有多个，
只能靠 **AST 绑定** 区分，不能靠文本匹配。

## 已保留的可复用代码

`lib-conv.cjs`：
- `collectSetupDefs` / `collectRenderLocals` / `collectSetupDeps`
- 内联注入点（写 `.vue` 之前）
- kind 为 `raw` 时可原样输出代码（用于已经带 `const` 前缀的片段）
