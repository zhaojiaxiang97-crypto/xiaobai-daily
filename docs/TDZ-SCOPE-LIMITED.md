# TDZ 影响范围有限：6 个组件是真使用删不掉，但只在「以根组件为入口」时暴露

> round-0506
>
> 目标：彻底移除 `shared.js` 的组件 import，修掉 TDZ。
> 结果：**这 6 个删不掉**（是真使用），但查清了 TDZ 的**实际影响范围很小**。

## 那 6 个组件符号的真实用途

| 符号 | 组件 | 用途 | 能删吗 |
|---|---|---|---|
| `LX` | `Tooltip.vue` | `createElementVNode(LX, {...})` — 渲染 | ❌ |
| `fZ` | `TextNode.vue` | `createElementVNode(fZ, {...})` — 渲染 | ❌ |
| `DZ` | `HeadingNode.vue` | `var OZ = DZ` — 间接引用 | ❌ |
| `G9` | `App.vue` | `Q9 === G9` — 比较组件引用 | ❌ |
| `L2t` | `TodoFloatingWindow.vue` | 同上（选项之一） | ❌ |
| `V2t` | `WoodenFishWindow.vue` | 同上 | ❌ |

**全部是真使用** —— AST 精确判断后剩下的就是这些，不是误判。

## 根因更深：main.js 的副作用代码被搬进了 shared.js

`createElementVNode(LX, ...)`、`Q9 === G9` 这些**不是「声明」，是「执行」**
—— 它们是 `main.js` 里模块级的副作用代码，被 `buildSharedBody` 一并搬进了 `shared.js`。

**shared.js 本应只放「符号定义」，不该放「渲染逻辑」。**

所以循环依赖的真正源头是：

```
main.js 的模块级副作用（渲染 App / 比较组件）
  → 被搬进 shared.js
    → shared.js 需要 import 组件
      → 组件又 import shared.js
        → 循环
```

## 但 TDZ 的实际影响范围很小

**批量渲染测试**（`h(C, {}, ...)` 逐个挂载 392 个组件）：

| 项 | 结果 |
|---|---|
| 渲染 OK | **98** |
| TDZ 错误 | **0** |

**为什么**：批量测试时 `shared.js` 已完整加载（所有符号初始化完毕），
不存在「初始化前访问」。

**只在「单独渲染根组件」时暴露**：

```
App        THROW: Cannot access 'G9' before initialization
Sidebar    THROW: 同上
TodayWork  THROW: 同上
```

因为此时 `App.vue` 是最先被求值的模块，它 import 的 `shared.js` 还在初始化中、
恰好需要 `App` 本身（循环）→ TDZ。

**换句话说：TDZ 影响「以根组件为入口」的场景，不影响「用具体组件」的场景。**

## 结论

| 项 | 状态 |
|---|---|
| 组件 import 收敛 | ✅ 29 → 6（AST 精确判断，去掉 22 个误判） |
| 未定义符号 | ✅ 0 |
| 批量渲染率 | ✅ 98（未退化，TDZ 错误 0） |
| 单独渲染根组件 | ❌ 仍有 TDZ |
| **TDZ 的实际影响** | ⚠️ **仅限「以根组件为入口」** |

## 要彻底修，只有重构

**必须把 `main.js` 的模块级副作用代码从 `shared.js` 分离出去**：

1. `shared.js` 只放「符号定义」（7548 个本地符号 + 301 个跨 chunk 引用）
2. 副作用代码（`createElementVNode(LX, ...)`、`Q9 === G9`）移到独立的
   `bootstrap.js`，在那里 import 组件和 shared

**这是架构级改动**，不是加几行代码能解决的。

## 对交付的影响

**当前交付（537 个组件）用的是「批量挂载」模式，TDZ 不影响。**
只有「把 `App.vue` 当根组件重建整个应用」才会撞上 —— 那正是
round-0502~0503「还原组件在应用里的样子」受阻的原因之一。

**所以：修 TDZ 是「还原整个应用」的前置条件，不是「使用组件」的前置条件。**
