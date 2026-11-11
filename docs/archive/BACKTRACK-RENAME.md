# 根因锁定：改名没回溯已生成的语句

> round-0456

## 这轮找到并修掉的真根因

前面几轮一直在追「`N is not defined`」，怀疑过种子范围、parse 降级、依赖闭包。
这轮把 `chosen.get('N')` 的实际 code 打出来，才看清：

```js
let l_0 = r,
  u_1 = o,
  ...
  N_10 = P(() => l_0.side + (l_0.align === `center` ? `` : `-${l_0.align}`)),
```

**`N` 已经被内联了，只是被改名成 `N_10`**（因为它与已用名冲突）。

**而 script 里早先 push 的语句还写着 `N()`** —— 引用没跟着改。

### 根因

`pushStmt` 的改名只作用于**当前这条语句**：

```js
if (local.size) renameInStmt(st, local);
bodyStmts.push(st);
```

但 `N()` 出现在**更早 push 的语句**里（render 的副作用序列），
那条语句 push 时 `N` 还不是冲突名，所以没改；等 `N` 的声明后来被内联、
检测到冲突改名成 `N_10` 时，**已经 push 的语句不会被回头处理**。

→ 声明叫 `N_10`，引用还叫 `N()` → `N is not defined`。

### 修复

改名时**回溯扫描已 push 的语句**：

```js
if (local.size) {
  renameInStmt(st, local);
  for (const prev of bodyStmts) {
    // 只改「对外的引用」，不改别条语句自己的同名声明
    const own = new Set(namesOfStmt(prev));
    const filtered = new Map([...local].filter(([k]) => !own.has(k)));
    if (filtered.size) renameInStmt(prev, filtered);
  }
}
bodyStmts.push(st);
```

**`own` 过滤是关键**：不加的话会改坏别条语句自己的局部绑定
（第一版没加，立刻多出 9 个顶层重复声明；加上后回到 0）。

### 效果

`PopperContent.vue`：

| 指标 | 修前 | 修后 |
|---|---|---|
| `N_10 = ...` 定义 | 有 | 有 |
| 裸 `N()` 引用 | 有 | **0** |
| 全量 145 个顶层重复 | 0 | **0**（未退化） |

## 但批量 import 暴露了下一层问题

一次性 import 145 个组件时，`compiler-sfc` 报：

```
`defineProps()` in <script setup> cannot reference locally declared variables
because it will be hoisted outside of the setup() function.
```

以及：

```
'import statement' declaration can only be used at the top level of a module
```

### 根因（顺序问题）

`defineProps({...})` 被 push 在最前，但它的 `default` 值引用了**后面才内联进来的变量**：

```js
const e = defineProps({ max: { default: Rl } });   // Rl 还没声明
...
let Rl = 100;                                       // 在后面
```

Vue 要求 `defineProps` 会被提升到 setup 之外，**它不能引用局部变量**。

**修法**：把「被 propsCode 引用到的定义」提前到 `defineProps` 之前 push。

第二条（import 不在顶层）需要单独定位 —— 可能是某条被内联的 `code` 里含
`import`，或者 `parseStmts` 把多段代码拼进了错误位置。

## 结论

| 项 | 状态 |
|---|---|
| **改名回溯** | ✅ **已修（这是 `N is not defined` 的真根因）** |
| 顶层重复声明 | ✅ 0 / 145 |
| `freeIdsOf` 降级 | ✅（上一轮） |
| 兜底扫描 | ✅（上一轮） |
| **`defineProps` 引用局部变量** | ❌ 新暴露（顺序问题） |
| **import 不在顶层** | ❌ 新暴露 |
| main bundle 渲染率 | 109（不受影响） |

**进展是实的**：`N is not defined` 的机制搞清楚了、修掉了。
批量 import 已经能走到 `compiler-sfc` 这一层 —— 说明之前的模块初始化崩溃没了，
现在暴露的是更靠后的编译期约束。
