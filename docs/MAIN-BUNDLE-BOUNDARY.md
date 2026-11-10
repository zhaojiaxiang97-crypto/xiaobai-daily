# main bundle 的"模块边界"能否搞回来？—— 实测回答

> round-0425（本轮推翻了此前结论）

## 结论先说

**不需要"搞回来"，而且"边界丢失"这个判断是错的。**

实测证明：main bundle 的组件**接近可运行**，剩下的障碍是实现细节，不是架构问题。

## 一、决定性数据：边界根本不用恢复

对 `renderer/chunks/main.js`（5.2 MB）顶层结构实测（declarator 粒度）：

| 项目 | 数量 |
|---|---|
| 顶层声明 | **9687** |
| 其中组件 | **458** |
| 其中普通代码 | **9229** |

**组件边界是明确的** —— 458 个 `defineComponent({__name})` 调用就是边界，
不需要 rollup 注释、不需要 `__vite__mapDeps`。其余 9229 个声明只需按原顺序
放进 shared.js（函数声明会提升，`var` 顺序由原文件保证）。

## 二、此前为什么失败：两个实现 bug

### bug 1：排除粒度太粗

原实现按 **VariableDeclaration 整条**排除。遇到
`var a = 1, uc = defineComponent({...}), d = 3;` 这种混合声明时，
**整条都丢**，连带 `a` 和 `d`。

后果：shared.js 只剩 **2484** 个符号（应 9229），缺约 6700 个。
`Mt is not defined`、`EntityStart` 未初始化都是这么来的。

改成 declarator 粒度后：符号 2484 → **9202**。

### bug 2：漏收顶层表达式语句

```js
var yG;
(function (e) { e[e.EntityStart = 0] = 'EntityStart'; ... })(yG ||= {});   // ← IIFE
var PJe = class { constructor() { this.state = yG.EntityStart; } };
var IJe = xG(TJe);   // 立即 new PJe → yG 此时必须已赋值
```

`(function(e){...})(yG ||= {})` 是 **ExpressionStatement**，不是变量声明。
原实现只收集 `VariableDeclaration` / `FunctionDeclaration`，**整个 IIFE 被漏掉**
→ `yG` 声明了但永远没赋值 → `Cannot read properties of undefined (reading 'EntityStart')`。

补上 ExpressionStatement 收集后：符号 9202 → **9214**，且构建**从 4 modules
跳到 88 modules 通过**。

## 三、当前状态

| 项 | 状态 |
|---|---|
| main bundle 组件生成 | **391 个 .vue** ✅ |
| shared.js | 2.3 MB，**9214 个符号** ✅ |
| `vite build` | ✅ **88 modules 通过**（此前 4 modules） |
| SSR 渲染 | ⏳ 卡在最后一层 |

**最后一层**：文本级路径替换误伤了代码里的正则字面量
（`Unexpected flag _ in regular expression literal`）——
我用正则替换 `"./x.js"` 这类路径时，误匹配了 `/\.js$/` 这样的正则。
改成 AST 级路径重写即可。

## 四、对之前结论的修正（重要）

| 之前（round-0422/0424） | 现在（实测） |
|---|---|
| "main bundle 模块边界已被抹除，不可恢复" | **组件边界不需要恢复** —— 458 个 `__name` 就是边界 |
| "418 组件可读不可运行，非努力可补" | **判断错误** —— 是两个实现 bug（排除粒度、漏收 IIFE），已修到 88 modules 构建通过 |
| "平铺必然触发初始化顺序问题" | 确实会遇到，但**根源是漏收表达式语句**，补上即可 |

**教训**：我把"观测到的现象"（0 处 rollup 注释、mapDeps 只覆盖懒加载）
当成了"不可逾越的障碍"，而没有去验证**真正的失败原因**。实际失败原因是
我自己的代码漏掉了两类顶层语句。

## 五、要跑通还剩什么

1. 把 shared.js 的路径重写从"文本正则"改成 AST 级（避免误伤正则字面量）
2. 重跑 build + SSR，看新的错误
3. 迭代 —— 每层都有明确的错误信息，不再是"sand"

## 六、附带产出

- `tools/vue-decompiler/gen-main-project.cjs` —— declarator 粒度 + ExpressionStatement
  收集的工程生成器（本轮新增）
- 391 个 main bundle 组件的 `.vue` 已能生成并通过 vite 构建
