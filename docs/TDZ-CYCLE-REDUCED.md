# 循环依赖收敛到 7 个，但 TDZ 仍在

> round-0505
>
> 上轮拓扑排序失败（破坏副作用顺序）。这轮换思路：**直接找 TDZ 的根源**。

## 找到了：模块级循环依赖

`shared.js` 和组件之间的**双向 import**：

```
shared.js  →  import App from './components/App.vue'     （29 个组件）
App.vue    →  import { ... } from '../shared.js'         （391/392 个组件都这样）
```

ESM 在循环里求值时，未初始化的绑定会抛 TDZ —— 实测的
`Cannot access 'G9' before initialization` 里，`G9` 就是
`import G9 from './components/App.vue'`。

**这才是真因，不是「符号顺序」问题。**

## 做了什么

原来的组件 import 判断用的是正则：

```js
if (!new RegExp('(?<!\\w$)' + varName + '(?!\\w$)').test(body)) continue;
```

**它把属性名误判成引用** —— 比如 `id`（`SelectItemIndicator.vue`）被算了 545 次，
其实全是 `e.id` / `left.id` 这类属性访问。

改成 **AST 精确判断**（排除成员表达式的 property、对象字面量的 key）：

| 项 | 前 | 后 |
|---|---|---|
| 组件 import | 29 | **7** |
| 未定义符号 | 0 | **0** |
| 渲染率 | 98 | **98** |

## 但 TDZ 没消失

单独测：

```
App        THROW: Cannot access 'G9' before initialization
Sidebar    THROW: 同上
TodayWork  THROW: 同上
```

**只要 `shared.js` 还 import 任何组件，循环就存在。**

## 那 7 个是什么

`App`、`SelectItemIndicator`、`Sidebar` 等，在 `shared.js` 内部**确实被引用**：

```js
Q9 = Z9 === `todo-floating` ? L2t : Z9 === `wooden-fish` ? V2t : G9,
...
Q9 === G9 ? Q2t().then(...) : ...
```

**用途是「比较组件引用」**（判断当前是哪个页面组件）。

## 要彻底修，只有一条路

**让 `shared.js` 完全不 import 组件**，把那 7 处「组件引用比较」换成别的形式：

1. **改成 `__name` 字符串比较** —— `Q9.__name === 'App'`
   - 语义接近（组件定义唯一），但依赖 `__name` 一定存在
2. **改成标志位** —— 在组件创建时打个标记
3. **或者把这段逻辑移到组件侧**（本来它就该在组件里）

**第 3 条最干净**：`shared.js` 不应该承担「判断当前页面是哪个组件」的职责。

## 结论

| 项 | 状态 |
|---|---|
| 找出 TDZ 真因 | ✅ **模块级循环依赖**（shared.js ↔ 组件） |
| 组件 import 收敛 | ✅ 29 → 7（AST 精确判断） |
| 未定义符号 | ✅ 0 |
| 渲染率 | ✅ 98（未退化） |
| **TDZ** | ❌ **仍在**（循环未彻底打破） |

**这轮的价值**：不是修好 TDZ，而是**把问题从「符号顺序」正确归因到「模块循环」**，
并给出了唯一的修复路径。

## 下一步

把 `shared.js` 里那 7 处「组件引用比较」改成 `__name` 比较或移出 shared.js，
然后彻底移除组件 import。**那时 TDZ 才会消失。**
