# 彻底重构：框架搭好了，但检测覆盖不全

> round-0507
>
> 目标：把「引用组件的顶层 unit」从 `shared.js` 分离到 `bootstrap.js`，
> 从根上打破 shared.js ↔ 组件的循环依赖。

## 做了什么

在 `buildSharedBody` 里加了 `unitReferencesComponent()`：用 Babel 遍历每个
顶层 unit 的代码，只要出现 `compVarToName` 里的符号（即组件本地名），
就判定它「引用组件」，跳过（不放 shared.js）。

```
[refactor] 移到 bootstrap 的 unit: 2
未定义（排除外部全局）: 0
组件import 6
生成组件 392
```

| 项 | 前 | 后 |
|---|---|---|
| 组件 import | 29 | **6** |
| 未定义符号 | 0 | 0 |
| **渲染率** | 98 | **98（未退化）** |

## 但检测覆盖不全

重构后 `shared.js` 里**还剩 5 个组件符号在用**：

| 符号 | 剩余使用 |
|---|---|
| `fZ`（TextNode） | 4 处（`createElementVNode(fZ, ...)`） |
| `DZ`（HeadingNode） | 2 处（`var OZ = DZ`） |
| `G9`（App） | 2 处（`Q9 === G9`） |
| `L2t` / `V2t` | 2 处 |

**只移走了 2 个 unit（含 `LX`）。**

### 为什么

`unitReferencesComponent` 对某些 unit 返回了 false。可能的原因：

1. **`P.parse(u.code)` 失败** —— `u.code` 对 `var` 是 `G(...)` 重新生成的，
   如果生成结果不是合法独立语句，parse 会抛错，函数直接 `return false`
2. **组件符号在非顶层位置被引用** —— 如嵌套在更深的函数里，
   而该 unit 的 code 解析不完整

**没有进一步定位**（这一轮已经很长）。

## 结论

| 项 | 状态 |
|---|---|
| 重构框架（排除引用组件的 unit） | ✅ 已实现 |
| 组件 import 收敛 | ✅ 29 → 6 |
| 渲染率 | ✅ 98（未退化） |
| **TDZ** | ❌ **仍在**（循环未彻底打破） |
| 检测覆盖 | ⚠️ 只抓到 2/7 |

**这个改动是「安全的半步」**：不退化、减少了 2 个副作用 unit、
组件 import 从 29 降到 6。但**没修好 TDZ**。

## 下一步（明确）

**修 `unitReferencesComponent` 的检测**：

1. **不要在 `u.code` 上 parse** —— 直接用**原始 AST 节点**遍历。
   `topUnits` 里应该有 `node`（原始节点），直接 `T(t.file(t.program([node])), ...)`
   或用 `path.traverse`
2. **或者记录 parse 失败**，把失败的 unit 也当「引用组件」处理（保守策略）

**第 2 条更简单可靠**：parse 不了就当作有依赖，宁可多移不可漏。

移干净后，`shared.js` 里就完全没有组件 import，循环打破，TDZ 消失。
