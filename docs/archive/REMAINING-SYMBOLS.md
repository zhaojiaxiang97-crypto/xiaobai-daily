# 剩余 8 个未定义符号：真实形态与修复方案

> round-0428

## 逐个查清的结果

静态扫描（排除 Web API）后剩 8 个符号，全部查清形态：

| 符号 | 真实身份 | 说明 |
|---|---|---|
| `G9` | 组件 **App** | 主应用根组件（`_export_sfc(defineComponent({__name:'App'}))`） |
| `L2t` | 组件 **TodoFloatingWindow** | 待办浮窗根组件 |
| `V2t` | 组件 **WoodenFishWindow** | 木鱼浮窗根组件 |
| `LX` | 组件 **Tooltip** | 被另一个组件的 `setup` 直接引用 |
| `o$` | 组件 **NodeRenderer** | 被 `s$ = o$` 别名后 `resolveComponent` 引用 |
| `fZ` | 组件 **TextNode** | 后被 `fZ.install = ...` 引用 |
| `s$` | `o$` 的别名 | `s$ = o$`，再被 `resolveComponent(unref(s$))` 引用 |
| `define` | **AMD 全局** | `typeof define == 'function' && define.amd`，**不是 bug** |

## 为什么它们缺失

这些组件**都被正确排除了**（归 .vue 文件），但 main.js 顶层还有代码引用它们：

```js
// 主应用启动逻辑（顶层）
var Z9 = new URLSearchParams(window.location.search).get('window'),
    Q9 = Z9 === 'todo-floating' ? L2t : Z9 === 'wooden-fish' ? V2t : G9,
    $9 = createApp(Q9);
$9.mount('#app');

// 组件自注册（顶层）
fZ.install = e => { e.component(fZ.__name, fZ); };

// 组件别名（顶层 var 声明）
var s$ = o$;
```

这些语句**不该被排除**（它们是有效的启动/注册逻辑），而应该让 `L2t`/`V2t`/
`G9`/`fZ`/`o$`/`LX` 在 shared.js 里有定义。

## 正确修复方案（已明确，实现待完成）

1. **保留**这些引用语句（此前错误地把它们排除了）
2. 在 shared.js 顶部为它们生成 import：
   ```js
   import G9  from './components/App.vue';
   import L2t from './components/TodoFloatingWindow.vue';
   import V2t from './components/WoodenFishWindow.vue';
   import LX  from './components/Tooltip.vue';
   import o$  from './components/NodeRenderer.vue';
   import fZ  from './components/TextNode.vue';
   ```
3. `define` 加入全局白名单（AMD），不再计入未定义

## 实现时踩的坑

尝试上述方案时，生成器在「组件生成」与「shared.js 写出」的**执行顺序**上出错
（`comps` 变量在定义前被引用）。代码结构调整未收敛，本轮未完成。

**这是纯实现问题，不是方案问题。**

## 当前可用状态

| 工具 | 状态 |
|---|---|
| `tools/vue-decompiler/gen-unified.cjs` | ✅ 可用：vite build 88 modules 通过，缺失符号 63→8 |
| 本轮实验版 `gen4.cjs` | ❌ 未收敛（顺序问题），未入库 |

## 结论

剩余 8 个符号的**性质、来源、修复方案**都已查清，且其中 1 个（`define`）是误报。
真正需要处理的是 **7 个根组件**的 import 注入 —— 方案明确，剩纯实现工作。
