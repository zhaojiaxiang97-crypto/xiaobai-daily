# 59 个 slots 错误的真根因：setup 内局部状态被丢弃，被错误的 import 补位

> round-0468

## 决定性证据

`AiModelSettings` 的模板里 `<component :is="P" variant="outline" size="sm">`。

**`P` 从哪来？两条完全不同的路径：**

```js
// ① main.js 顶层 import
import { r as P } from '../ui/Switch.js';     // ← Switch.js 的局部函数

// ② 每个组件内部各自声明（8 处，全在组件内）
let P = computed(() => ...)                    // 组件 A
let P = ref(null)                              // 组件 B
let P = e => e.trim()...                       // 组件 C
```

水平检查：**`P` 的声明全部是 `顶层 = false`** —— 都在组件函数作用域里。

## 根因链

1. `gen-main.cjs` 提取组件时，**只取 `setup` 返回的 render**，setup 里其余代码（`let P = computed(...)` 这类局部状态）**全部丢弃**
2. 模板里 `<component :is="P">` 因此悬空
3. `crossByLocal` 的改写把它当成**顶层 import 的 `P`** 处理 → 生成
   `import { S_P as P } from '../shared.js'`
4. 而 `S_P` 实际是 `Switch.js` 的 `r`（局部函数），不是组件
5. Vue 把函数当组件调用 → 崩 → `Cannot destructure property 'slots' of 'undefined'`

**误差被错误地"补位"了** —— 本来该是「缺定义」的错，却拿到一个同名的错误符号，
于是变成更难查的运行时崩溃。

## 为什么之前几轮没查出来

前面一直在追「图标组件」「工厂函数」「嵌套场景」，都排除了。
转折点是查 `P` 的**两条来源**：顶层 import 和组件内声明同时存在，
而转换只留了前者、丢了后者。

## 修法（明确）

**把 setup 函数体里的顶层声明全部内联进 `<script setup>`**，
不只是「被模板引用的那些」，而是 setup 里所有 `let/const/var/function` 声明。

理由：Vue 的 `<script setup>` 本来就是把整个 setup 函数体搬进去，
`ref` / `computed` / 方法 都应该是组件的顶层绑定。当前的 `collectSetupDefs` +
`collectRenderLocals` 只按「模板引用」挑，覆盖不全（`P` 被 `crossByLocal`
先补位了，于是连「模板引用」这个条件都不成立——它以为 `P` 已经由 import 解决了）。

**具体改动**（`gen-main.cjs`）：
1. 收集 setup 函数体的**全部**顶层声明（现有 `collectSetupDefs` 已能拿到，只是使用条件太窄）
2. 内联优先级：**setup 内定义 > 跨 chunk import**
   —— 即 `skip` 集合里不能包含「setup 内已声明的名字」
3. 顺序：先收集 setup 声明，再用它去过滤 `crossList` 的改写

## 这条根因能解释多少

`P` 只是众多短名之一。main bundle 里有 7548 个本地符号，
大量是 `ref` / `computed` 形态（`P = computed(...)` 这种模式在 8 个组件里各有一份）。

**所以 59 个 slots 错误很可能是同一个原因的一批表现**：
模板引用的短名，本来是组件内部的 `ref`/`computed`，却因 setup 逻辑被丢弃，
被 shared 的同名 import 补位。
