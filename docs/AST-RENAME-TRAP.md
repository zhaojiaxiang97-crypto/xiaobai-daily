# AST 级改名的陷阱：parse 在冲突已存在时失败

> round-0452

## 做了什么

把 `lib-conv.cjs` 内联段的三处正则全部换成 AST：

| 原 | 新 |
|---|---|
| `occupied` 用正则从 script 提取声明名 | `topNamesOf(script)`，AST 提取（含解构） |
| `declaredNames` 用正则从 deps 提取 | `topNamesOf(d.code)` |
| 改名用 `String.replace` | `renameInCode(code, map)`，AST 遍历改名（跳过属性 key / 成员访问） |

## 但撞上一个死循环式的坑

`topNamesOf(script)` 实现：

```js
const topNamesOf = codeText => {
  try {
    const a = P.parse(codeText, { sourceType: 'module' });
    ...
  } catch (e) {}   // ← 解析失败 → 返回空数组
  return out;
};
```

**实测**：`KeyboardHeatmapTool.vue` 的 script 在**内联之后**已经含重复声明，
parse 直接抛 `Identifier 'l' has already been declared`。

虽然 `occupied` 是在内联**之前**算的，但这条路径暴露了一个真实隐患：
**只要 script 有任何解析问题，`occupied` 就静默变成空集，改名逻辑全线失效**
（所有名字都被当成「新名字」，冲突全部漏过）。

结果：145 个组件里 **10 个**有顶层重复声明（比上一版的 2 个更多 —— 因为 AST 提取
比正则更准，反而把之前漏掉的冲突都暴露出来了）。

## 为什么这版反而更差

| 版本 | 提取方式 | 顶层重复 |
|---|---|---|
| round-0451 | 正则（漏解构） | 2（但嵌套层还有更多） |
| round-0452 | AST（准确） | **10** |

**不是退步，是测量变准了。** 之前的 2 是被正则漏掉的假象。

## 正确的修法

`topNamesOf` 不能「parse 失败就返回空」，必须**降级到正则兜底**：

```js
const topNamesOf = codeText => {
  try {
    const a = P.parse(codeText, { sourceType: 'module' });
    ... AST 提取 ...
    return out;
  } catch (e) {
    // 解析失败（可能已有冲突）：降级到正则，宁可多收不可漏收
    return [...codeText.matchAll(/(?:const|let|var|function|class)\s+([A-Za-z_$][\w$]*)/g)].map(m => m[1]);
  }
};
```

同理 `renameInCode` 也要有降级路径（当前已有：`catch { return codeText }`，但那等于
不改名 → 冲突照旧，应该降级到逐名正则替换）。

## 另一条更稳的路

**根本原因**是「先拼接字符串、再回头加约束」。更稳的做法：

1. 先把所有要内联的 deps 和 props 绑定都**建成 AST 节点**
2. 在同一个 Program 里用 Babel 的 `scope` 系统统一 `rename`
3. 最后 `generate` 成字符串

这样 Babel 的作用域机制会自动处理所有冲突（含嵌套），不需要人工判断。
`gen-main.cjs` 之所以稳，就是因为它全程 AST、从不拼接字符串。

## 结论

| 项 | 状态 |
|---|---|
| 解构收集 | ✅（round-0451） |
| 整条声明内联 | ✅ |
| 去重 | ✅ |
| 正则 → AST 提取 | ✅ 已换 |
| AST 改名 | ✅ 已换 |
| **parse 失败时的降级** | ❌ 缺（当前静默返回空集） |
| 顶层重复声明 | **10 / 145** |
| main bundle 渲染率 | 109（不受影响） |

## 下一步（明确）

**方案 A（小改）**：给 `topNamesOf` / `renameInCode` 都加正则降级路径。

**方案 B（彻底）**：内联段整体改成 AST 组装 —— 把 props 绑定、文件级内联、
setup 内联全部建成 AST 节点，放进同一个 Program，用 Babel scope 统一改名，
最后一次性 generate。这是 `gen-main.cjs` 已经在用的模式。

**建议方案 B** —— 方案 A 只是让正则兜底，治不了「拼接字符串」这个根。
