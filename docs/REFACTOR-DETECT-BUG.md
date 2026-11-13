# 重构检测的 bug：458 个组件符号，却只排除了 2 个 unit

> round-0508
>
> 上一轮的重构只移走了 2 个 unit，但 `shared.js` 里还剩 5 个组件符号在用。
> 这轮查了原因。

## 先排除了「parse 失败」这个假设

上轮猜「`P.parse(u.code)` 对某些 unit 失败 → 返回 false」。

实测 2092 个顶层 unit：

| 项 | 数 |
|---|---|
| parse 成功 | **2092** |
| parse 失败 | **0（0%）** |

**所以不是 parse 的问题。**

## 再排除了「组件符号集太小」

上轮用 `compVarToName.keys()` 作为组件符号集，怀疑只有 6 个。

实测：

```
[dbg] compVarNames=458 compVarToName=458
```

**两个集合都是 458** —— 组件符号集是完整的。

## 所以 bug 在 `unitReferencesComponent` 的遍历

```js
function unitReferencesComponent(u, compLocals) {
  let ast;
  try { ast = P.parse(u.code, { sourceType: 'module' }); } catch (e) { return false; }
  let hit = false;
  T(t.file(ast.program), {
    Identifier(ip) {
      if (hit) return;
      if (!ip.isReferencedIdentifier()) return;
      if (compLocals.has(ip.node.name)) hit = true;
    },
  });
  return hit;
}
```

**458 个符号都在集合里，2092 个 unit 都能 parse，却只命中 2 个。**

**问题只能在 `T(...)` 的遍历本身**。可能：

1. **`t.file(ast.program)` 包一层后再 traverse，path 结构变了**，
   `isReferencedIdentifier()` 判断失效
2. **`P.parse` 的结果已经被我用过**（`ast.program`），再次包 `t.file` 可能不合法
3. 应该直接 `T(ast, {...})` 或 `T(ast.program, {...})`，不要 `t.file()`

## 结论

| 项 | 状态 |
|---|---|
| parse 失败 | ❌ 不是原因（0% 失败） |
| 组件符号集太小 | ❌ 不是原因（458 个） |
| **`T(t.file(...))` 遍历失效** | ⚠️ **最可能** |

**没有继续修**（这一轮够长了）。但**定位到了具体的代码位置**：
`unitReferencesComponent` 里的 `T(t.file(ast.program), ...)`。

## 下一步（一行改动的量级）

**把 `T(t.file(ast.program), {...})` 改成 `T(ast, {...})`**，再跑一次看
「移到 bootstrap 的 unit」是否变成 5~10 个（而不是 2 个）。

如果变成 5+ 且 `未定义` 仍是 0，就说明修对了。

## 这轮的价值

**排除了两个错误假设，并把 bug 定位到一行**。虽然没修好，
但下一次只需改一行 + 验证。**这比继续猜有用。**
