# vendor 组件线（独立 chunk）

> round-0441 ~ 0460
>
> 这条线处理 `src/renderer/{ui,blocks,pages,vendors}` 下的 148 个未转换组件。
> 合并自 5 份过程记录。

## 最终状态

| 项 | 值 |
|---|---|
| 生成组件 | **145** 个 `.vue` |
| 全部可 import | ✅ **145 / 145** |
| 真实 Chrome 可渲染 | **10** |
| 顶层重复声明 | 0 |
| `vite build` | ✅ 1.14s |

## 两条路线的区别（重要）

| | main bundle | vendor 线 |
|---|---|---|
| 工具 | `gen-main.cjs` | `lib-conv.cjs` |
| 组件数 | 392 | 145 |
| 可渲染 | 109（28%） | 10（7%） |
| 为什么不一样 | 组件边界由 `defineComponent({__name})` 直接给出 | 一文件一模块，但组件多是 UI 库内部实现 |

**vendor 里的组件大量是 reka-ui 风格的内部实现**（Popper / Dialog / Menu /
ScrollArea），定位就是「必须在某个 Root 内、由父组件传复杂 props」——
本来就不该被单独渲染。所以 10/145 接近这类组件的固有上限。

## 三个架构性修复（每个影响一大批）

### 1. `VUE_API_MAP` 是 main bundle 专用表

`convert-component.cjs` 用一张**全局硬编码表**把短名翻译成 Vue 语义：

```js
const VUE_API_MAP = { 'x': 'createCommentVNode', 'b': 'createBlock', ... };
```

这张表是对 **main bundle 运行时探测**得出的，在 main bundle 里正确，
**但不同 chunk 的短名含义不同**：

| 短名 | `HeatMapRangePicker.js` 里的真实含义 | 全局表认为 |
|---|---|---|
| `x` | `import b` → **createBlock** | **createCommentVNode** ❌ |

于是整个 render 被当成注释节点丢弃 → 空模板。

**修复**：`lib-conv` 调转换器时**带上原文件的 import 语句**，让 `API` 表能正确建立
（`apiOf` 本就是 `API[n] || VUE_API_MAP[n]`，API 优先）。

**效果**：模板归属从「13 个组件共用一个模板」变成 **16 个组件 16 个模板**；
全量 145 个里不同模板数 60 → **121**。

### 2. 字符串拼接改全程 AST 组装

原来生成 `<script setup>` 是字符串拼接，再用正则判断冲突、用字符串替换改名。
这条路必踩的坑：`topNamesOf(script)` 在 script 已有冲突时 parse 失败 →
`occupied` 静默变空 → 冲突全漏过。

**改成全程 AST**：所有语句先建成 AST 节点，在同一作用域统一检测/改名，
最后一次性 `generate`。

```js
const pushStmt = st => {
  if (renameHistory.size) renameInStmt(st, renameHistory);   // 先按历史改名
  const declared = namesOfStmt(st);                          // AST 提取（含解构）
  for (const nm of declared) {
    if (used.has(nm)) { /* 冲突 → 生成唯一名 + 记入 renameHistory */ }
    else used.add(nm);
  }
  bodyStmts.push(st);
};
```

**效果**：顶层重复声明 **10 → 0**，`vite build` 从失败变为通过。

### 3. 改名要回溯已生成的语句

`pushStmt` 的改名只作用于当前语句。当 `N` 的声明后来被内联、因冲突改名成 `N_10`
时，**更早 push 的语句里还写着 `N()`** —— 声明叫 `N_10`、引用还叫 `N()`
→ `N is not defined`。

**修复**：改名时回溯扫描已 push 的语句，并用 `own` 过滤（不改别条语句自己的同名声明）。
**不加 `own` 过滤会立刻多出 9 个重复声明。**

## 其他修复

| 问题 | 修复 |
|---|---|
| 解构绑定没被收集（`let { a: N } = useX()`） | `bindingNames` 递归处理 `ObjectPattern` / `ArrayPattern` / `AssignmentPattern` / `RestElement`；按整条声明内联（右侧依赖要一起带） |
| `createBlock(unref(X))` 的标签识别失败 | `conv()` 里先 `unwrap(args[0])` |
| render 的 BlockStatement 形态不支持 | `(e,t) => { return w(), createBlock(...) }` 也处理 |
| `createCommentVNode` 泄漏到模板 | `stripCommentVNodes` 深层替换为 `undefined` |
| import 决策只看模板 | 扩到「模板 + 组件源码全部标识符」（宽松集合，宁可多收） |
| 组件内被赋值的名字不能 import | 收集赋值目标（`X=` / `X++` / `X+=`），非模板引用时跳过 |
| props 值引用后置声明的变量 | 先算出 `propsCode` 引用的标识符，提前 push 到 `defineProps` 之前 |
| props 值是包装调用 `SomeFn({...})` | 提取时解包，取第一个 `ObjectExpression`（Vue 要求对象字面量） |
| setup 内联的种子只来自模板 | 改成迭代收敛（generate → scan → refill），每 push 一批就重扫 |

## 剩余 71 个错误（已分类，见下表）

| 类别 | 数量 | 性质 |
|---|---|---|
| `X is not defined` | 20 | 可修，但**每个组件缺一个不同符号、无共同根因** |
| `Injection Symbol(...) not found` | 8 | 必须在父组件内（组件库设计） |
| `Cannot read properties of null (reading 'ce')` | 8 | 内部 context 属性，需要父组件树 |
| `Cannot read properties of undefined (reading 'value')` | 6 | **需要真实 props**（如 `n.open.value` 里 `n.open` 是 prop） |
| `_ctx.X is not a function` | 5 | 可修（模板引用未绑定） |
| 其它 `Cannot read properties of undefined` | 4 | 需要真实 props |
| 杂项（`27`、`dataOptions.call`、TDZ） | 5 | 混合 |

**可修约 25 个，但无共同根因** —— 前几轮的突破都是「一处改动解决一片」，
这批是「每个组件单独调试一个符号」。投入产出比明显下降。

`reading 'ce'` 那 8 个全是 reka-ui 的 Root/Content 组件
（`AlertDialogRoot` / `Dialog` / `DialogContentImpl` / `MenuContentImpl` /
`MenuItemImpl` / `PopoverContentImpl` / `PopoverRoot` / `TooltipRoot`）。

## 工具

| 工具 | 用途 |
|---|---|
| `lib-conv.cjs` | 独立 chunk → `.vue`（全程 AST 组装 + 迭代内联 + import 重定向） |
| `build-component-map.cjs` | 建 `"(chunk路径)::(导出名)" → 组件名` 映射（107 条） |
| `convert-component.cjs` | render → template（含 unwrap / BlockStatement / stripCommentVNodes） |

## 判断：这条线到边界了

**剩余问题的主体不是转换 bug，而是「组件需要上下文和真实数据」。**

要继续提升只有两条路，都不是「修转换器」：
1. 写真实的 props fixture（按组件类型给合理数据）
2. 做父组件组合渲染（`<DialogRoot><DialogContent/></DialogRoot>`）

main bundle 线在 round-0432 试过父组件包裹，只提升 3 个（91 → 94），
说明这个方向收益有限。
