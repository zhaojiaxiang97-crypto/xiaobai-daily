# vendor 线全绿：145 个组件全部可 import

> round-0457
>
> 从 round-0439 首次定位 vendor 依赖问题算起，**14 轮**后终于闭合。

## 最终状态

| 项 | 值 |
|---|---|
| vendor 组件生成 | **145** |
| 一次性 import 全部 | ✅ **145/145 成功** |
| `N is not defined` | ✅ **消失** |
| 顶层重复声明 | **0 / 145** |
| `vite build` | ✅ **1.15s 通过** |
| main bundle | 392 组件、未定义符号 **0**、渲染率 109（**未退化**） |

## 这轮修的三个问题

### 1. `propsCode` 引用后置声明的变量

Vue 会把 `defineProps` 提升到 setup 之外，**它的值不能引用局部变量**：

```js
const e = defineProps({ max: { default: Rl } });   // Rl 还没声明
let Rl = 100;                                       // 在后面
```

**修复**：先算出 `propsCode` 引用的标识符，把对应定义**提前 push** 到
`defineProps` 之前。

### 2. `propsCode` 是包装函数调用

原代码里 props 值可能是 `SomeFn({...})`（props 规范化工具），而那个函数没被内联：

```js
const props = defineProps(N_7({ loop: {...}, ... }))   // N_7 未定义
```

**修复**：`propsCode` 提取时解包 —— 若值是 `CallExpression`，取它里面的第一个
`ObjectExpression` 参数（Vue 要求 `defineProps` 参数是对象字面量）。

### 3. 函数声明顺序（TDZ）

`freeIdsOf` 从 `const` 箭头函数改成 `function` 声明，避免在上面的提前 push
逻辑里使用时触发 TDZ。

## 加上上一轮的根因修复

### 4. 改名回溯（`N is not defined` 的真根因）

`pushStmt` 的改名只作用于当前语句。当 `N` 的声明后来被内联、因冲突改名成 `N_10`
时，**更早 push 的语句里还写着 `N()`** —— 引用没跟着改。

**修复**：改名时回溯扫描已 push 的语句，并用 `own` 过滤避免改坏别条语句自己的
同名声明（不加过滤会立刻多出 9 个重复声明）。

## 14 轮的路径回顾

| 轮次 | 动作 | 结果 |
|---|---|---|
| 0439 | 定位 lucide ctx 问题 | 109 |
| 0441 | 首次批量转换 | 124 组件 |
| 0442 | 映射表 + 3 个 bug | 148 |
| 0444 | `createCommentVNode` 泄漏 | 148 |
| 0445 | 自由变量分析 | 148 |
| 0446 | setup/render 内联框架 | 148 |
| 0447 | 发现模板张冠李戴 | 148 |
| 0448 | unwrap + BlockStatement | 148 |
| 0449 | **发现 `VUE_API_MAP` 是 main bundle 专用表** | 模板归属 60 → **121** |
| 0450 | 内联改名机制 | 26 组件受益 |
| 0451 | **解构绑定收集** | 关键缺口 |
| 0452 | 正则 → AST 提取 | 暴露 10 个冲突 |
| 0453 | **方案 B：全程 AST 组装** | 重复声明 10 → **0** |
| 0454 | skip 集 + 迭代闭包 | 0 |
| 0455 | `freeIdsOf` 降级 + 兜底扫描 | 0 |
| 0456 | **改名回溯（真根因）** | 裸 `N()` → 0 |
| 0457 | propsCode 顺序 + 包装解包 | **145/145 全部可 import** |

**关键转折有三个**：`VUE_API_MAP` 不是通用的（0449）、全程 AST 组装（0453）、
改名要回溯（0456）。前两个是架构性的，最后一个是细节但致命。

## 工具现状

| 工具 | 能力 |
|---|---|
| `gen-main.cjs` | main bundle → 392 个 .vue，0 未定义符号 |
| `lib-conv.cjs` | vendor 独立 chunk → 145 个 .vue，全部可 import |
| `convert-component.cjs` | render → template（含 unwrap / BlockStatement） |
| `build-component-map.cjs` | chunk 导出名 → 组件名映射（107 条） |
| `verify-browser.sh` | 真实浏览器验证 |
