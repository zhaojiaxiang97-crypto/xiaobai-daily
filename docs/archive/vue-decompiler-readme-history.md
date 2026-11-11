# Vue 反编译器（render → .vue）

目标：把 418 个内联组件从 render 函数形态还原为可编译的 `.vue` 单文件组件。

## 已完成的阶段

### 阶段 1：AST 级 import 绑定分析 ✅

`analyze-bindings.cjs <chunk.js>`：对任一 chunk 输出其从 `vue-i18n.runtime.js`
导入的每个绑定的**真实引用数与调用签名**。

关键：必须用 babel `Program.scope.bindings` 取 `kind === 'module'` 的绑定，
再读 `binding.referencePaths` —— 这样自动排除了被同名局部变量遮蔽的伪引用。
（用文本正则统计会产生上万次假阳性：`c`/`j`/`S` 这类短名同时也是普通变量名。）

输出示例（`ui/Kbd.js`）：

```
$n/t: 1 次 call          → normalizeClass
An/n: 1 次 call(id)      → unref
Ct/r: 1 次 call(member,str) → renderSlot
S/i : 1 次 call(str,obj,arr,num) → createElementBlock
gt/a: 1 次 call()        → openBlock
j/o : 1 次 call(obj)     → defineComponent
```

### 阶段 2：API 语义映射校正 ✅

`vue-api-map.json`：18 个已验证映射 + 1 个待定。`verify-map.cjs` 用全库签名
交叉验证，发现并修正 2 处错误：

| 短名 | 原标注 | 实际 | 证据 |
|---|---|---|---|
| `Ct` | withCtx | **renderSlot** | 290/385 次调用为 `(member,str)`，形如 `n(i.$slots, 'header-left', {}, undefined, true)` |
| `k` | resolveComponent | **待定** | 1061 次为 `(call,obj,obj)`，形如 `re(se, {name:'...'}, {...})`，更像直接渲染组件 |

## 待完成的阶段

### 阶段 3：render → template 转换器

需处理：
- 元素：`createElementVNode('div', {class:...}, [children], patchFlag)`
- 分支：三元 + `createCommentVNode()` → `v-if`
- 列表：`renderList(list, item => ...)` → `v-for`
- 插槽：`renderSlot($slots, 'name')` → `<slot name="name">`
- 动态组件：`createBlock(resolveComponent(...), props, slots)` → `<component :is>`
- 属性：`class: normalizeClass(x)` → `:class="x"`；`onClick` → `@click`；字符串字面量 → 静态属性

### 阶段 4：逐组件生成 + 编译验证

每个组件输出 `.vue` 后用 `@vue/compiler-sfc` 编译验证（阶段 1 的 Kbd 试点已证明
单组件闭环可行：见 `docs/vue-project-pilot/`）。

### 阶段 5：工程组装

`package.json` + `vite.config.js` + `src/main.js` + 组件目录。

## 已知不等价

逆向后的 template 再编译，静态提升、patchFlag 取值、缓存槽位与原始产物必然
不同——功能等价可以验证，逐字节等价做不到。

## 使用

```bash
npm i @babel/parser @babel/traverse @babel/generator @babel/types @vue/compiler-sfc
node tools/vue-decompiler/analyze-bindings.cjs <chunk.js>
node tools/vue-decompiler/verify-map.cjs src/renderer
```

---

## 阶段 3 进展（转换器已实现）

`render2tpl.cjs` + `mkcomponent.cjs` + `compile-check.cjs`：递归把 vnode 树转成
template 语法，生成 `.vue`，用 `@vue/compiler-sfc` 编译验证。

### 试点结果（4 个组件）

| 组件 | 结果 |
|---|---|
| `ui/Kbd.js` → Kbd.vue | ✅ 解析 + 编译 OK（745B） |
| `ui/AlertDialogMedia.js` → AlertDialogMedia.vue | ✅ 解析 + 编译 OK（573B） |
| `ui/DialogTitle.js` → DialogRoot.vue | ❌ 模板表达式解析失败 |
| `ui/Slider.js` → SliderHorizontal.vue | ❌ 模板表达式解析失败 |

**首次成功率 2/4**。

### 暴露的两类系统性问题

1. **未映射的 API 别名**：模板里出现 `<component :is="$">`，因为 `$`（导出短名
   `_s`）不在映射表中。`vue-i18n.runtime.js` 有 **167 个导出**，当前只映射了 18 个
   ——补齐这张表是本工程的主体工作量。
2. **表达式引号冲突**：`:style="E({ \"--var\": ... })"` 内层双引号直接嵌在外层
   属性双引号里，Vue 模板解析失败。需统一把表达式内字符串改为单引号/反引号。

### 剩余工作

| 阶段 | 内容 | 状态 |
|---|---|---|
| 3.1 | 补全 167 个导出的语义映射 | 待做（主体工作量） |
| 3.2 | 表达式引号统一转义 | 待做 |
| 3.3 | v-for / v-if / 动态组件的指令化 | 部分 |
| 4 | 418 组件全量生成 + 逐组件编译验证 | 待做 |
| 5 | 工程组装（package.json / vite.config / 入口） | 待做 |

---

## 阶段 2.5：运行时指纹探测（关键突破）

**问题**：静态 AST 分析无法可靠判定 167 个导出的语义（压缩后函数形态多样，
实测 118 个有定义里只识别出 6 个，且多处错误）。

**解法**：在渲染进程里**直接 import 运行时模块**，逐个导出做**行为探测**：

```js
// 例：判定 createElementVNode
fn('div', { id: 'p' }, ['PROBE'])   // → vnode.type === 'div' 且 arity === 3

// 判定 normalizeClass
fn(['a','b']) === 'a b'

// 判定 toDisplayString
fn(null) === '' && fn(123) === '123'

// 判定 unref
fn({ __v_isRef: true, value: 'X' }) === 'X'

// 判定 openBlock
fn() === undefined        // 注意：openBlock 返回 undefined，不是数组！
```

### 探测结果（16 项，修正了静态分析的 5 处错误）

| 短名 | 语义 | 证据 |
|---|---|---|
| `j` | defineComponent | `j({name:'P'})` 原样返回 |
| `gt` | openBlock | arity 0，返回 undefined |
| `H` | **createElementVNode** | arity 3，`('div',{...},[...])` → type==='div' |
| `S` | createElementBlock | arity 6 |
| `b` | createBlock | arity 5 |
| `k`/`y` | createVNode | arity 1 |
| `O` | createTextVNode | 返回 type===Symbol(v-txt) |
| `x` | createCommentVNode | 返回 Symbol(v-cmt) |
| `D` | createStaticVNode | 返回 Symbol(v-stc) |
| `$n` | normalizeClass | `(['a','b'])` → `'a b'` |
| `rr` | toDisplayString | `null`→`''`, `123`→`'123'` |
| `An` | unref | ref 对象 → value |
| `Bn` | isArray | 函数名未被压缩 |
| `Ct` | renderSlot | 用法恒为 `(ctx.$slots,'name')` |
| `A` | defineAsyncComponent | 返回 `__asyncLoader` |

### 静态分析的 5 处错误

| 短名 | 静态猜测 | 实际 |
|---|---|---|
| `y` | createElementVNode | createVNode（真正的 createElementVNode 是 `H`） |
| `H` | 未识别 | createElementVNode |
| `St` | renderList | 非 renderList（renderList 是 `h`） |
| `gt` | 曾怀疑被 `St` 取代 | openBlock（探测确认） |
| `Ct` | withCtx | renderSlot |

## 阶段 3.1：引号规范化（解决模板解析失败）

表达式内的双引号（如 `{ "pointer-events": \`auto\` }`）与外层属性引号冲突，
导致 `@vue/compiler-sfc` 报 `Unexpected token`。修复：表达式内双引号统一为
单引号（JS 表达式内等价）。

## 当前转换成功率

| 批次 | 结果 |
|---|---|
| 首批 5 个（Kbd / AlertDialogMedia / DialogRoot / MermaidBlockNode / SliderHorizontal） | **5/5 全部编译通过** |
| ui + blocks 批量 20 个 | **20/20 全部编译通过** |

（对比：阶段 3 首次试点为 2/4）

---

## 阶段 4：组件切分与批量转换（90% 编译通过）

### 切分：`split-components.cjs`

从单文件 bundle 提取内联组件为独立文件（**不改原文件，零风险**）：

```bash
node tools/vue-decompiler/split-components.cjs src/renderer/chunks/main.js /tmp/split-comps
# → 提取组件: 418（原始 458 个 __name 标记，同名去重）
```

关键点：`__name` 的值是**模板字符串**（反引号）不是普通字符串，判���时两者都要接受
（此前只判 StringLiteral 导致只提取到 1 个）。

### 批量转换：`batch-convert.cjs`

对提取出的组件逐个转 template 并编译验证。

| 结果 | 数量 | 占比 |
|---|---|---|
| **编译通过** | **376** | **90%** |
| 编译失败 | 0 | 0% |
| 无模板（renderless / render 在别处） | 42 | 10% |

### 转换质量样例

```html
<!-- AlertTitle -->
<div data-slot="alert-title" :class="je('font-medium ...', t.class)">
  <slot />
</div>

<!-- Kbd -->
<kbd data-slot="kbd" :class="e('bg-muted ...', s.class)"><slot /></kbd>
```

### 关键修正：用法驱动的 slot 识别

main.js 里历史上把 **renderSlot 误标为 withCtx**，导致 children 变成
`withCtx(ctx.$slots, 'default')`。转换器改为**按用法判定**：任何调用只要首参形如
`xxx.$slots` 且第二参是字符串，就视为 renderSlot → `<slot />`。不依赖函数名。

### 剩余 10% 的成因

`CheckboxRoot` / `AvatarImage` / `ApiSettingsPage` 等：setup 返回的是逻辑或状态，
render 在 `render()` 方法里，或是 renderless 组件。需扩展转换器支持
`render: () => ...` 与 `render() {}` 形态。

---

## 阶段 4.5：Fragment 修复（391/418 = 93.5%）

`createElementBlock(Fragment, null, [children])` 的子节点在 **args[2]**（args[1]
是 null），而原实现只从 args[1] 取 → 大量组件转出空内容。

修复（改成取参数里第一个 ArrayExpression）后：**376 → 391 通过，无模板 42 → 27**。

## 阶段 5：工程骨架（已完成，vite build 通过）

`template-package.json` / `template-vite.config.js` 提供可用的工程配置。

实测：把 2 个真实还原的 `.vue` 挂进入口后 `npx vite build` 成功
（10 modules transformed，239ms）。说明还原产物是**真 Vue SFC**，能被标准
工具链处理。

### 工程结构

```
index.html
vite.config.js
package.json
src/components/*.vue     ← 391 个还原组件
src/main.js              ← 入口
deps.json                ← 每组件待补依赖清单
```

### 仍未完成：script 依赖补全

`.vue` 的模板部分正确，但 script 里的辅助函数/常量仍是原 bundle 短名
（如 `je`、`pc`、`t`），需：
1. 从原 `main.js` 顶层提取共享符号 → `src/shared.js`
2. 按 `deps.json` 为每个组件补 `import`
3. `npm run dev` 逐个挂载验证

在此之前，组件可编译但不可运行。

---

## 阶段 6：依赖补全（177/391 完全解析）

### 修正 1：自由变量分析

原分析只查 Program scope bindings，把 **setup 参数**（`e`、`t`）误判为外部依赖。
改用 `path.scope.hasBinding(name)` 在每个引用点判断 → AlertTitle 的依赖从 8 个
降到 6 个真实依赖。

### 修正 2：跨 chunk 依赖

`je` 之类不是 main.js 顶层声明，而是 **import 别名**
（`import { xt as je } from "../ui/Switch.js"`）。补上对 main.js 全部 import
语句的解析后：

| 指标 | 修正前 | 修正后 |
|---|---|---|
| 完全解析依赖的组件 | 12 | **177** |
| 仍有未解析依赖 | 379 | 214 |

### 生成质量（AdmonitionNode.vue）

```vue
<template>
<div :class="[`admonition`, [`admonition-${r.node.kind}`]]">
  <div :id="c" :class="`admonition-legend`">...</div>
</div>
</template>

<script setup>
import { computed, ref, openBlock, createElementBlock, normalizeClass } from 'vue';
import { l3e, u3e, d3e, f3e } from '../shared.js';
import { nr as at, Zt as Xe } from './vue-i18n.runtime.js';
</script>
```

三类 import（Vue API / 共享符号 / 跨 chunk 别名）都已正确生成。

### 剩余 214 个的未解析项

主要是 `cm`、`R_`、`VF` 这类，指向 main.js 之外、又不在 import 表里的符号
（可能来自动态导入或更深的依赖链）。需要继续追依赖图。

## 工程现状

| 项 | 数值 |
|---|---|
| 组件总数 | 418 |
| 可编译 `.vue` | 391（93.5%） |
| 依赖完全解析 | 177（45%） |
| 共享符号提取 | 8006 个顶层声明 |
| vite build | 通过（真实组件被编译，10 modules / 239ms） |

---

## 阶段 7：依赖 100% 解析（关键 bug 修复）

### 根因

`cm` / `R_` / `VF` 等符号明明在 main.js 顶层，却没进 shared.js。原因：

```js
// 错误写法
if (p.scope.block.type !== 'Program') return;   // 在 FunctionDeclaration 上，
                                                 // p.scope 已经是函数自身的作用域，
                                                 // 该判断恒为真 → 所有顶层函数被排除
```

**正确写法**：`if (!p.parentPath.isProgram()) return;`

修复后顶层符号 **8006 → 9660**（补上 1654 个顶层函数）。

### 结果

| 指标 | 前 | 后 |
|---|---|---|
| 依赖完全解析组件 | 177 | **391（100%）** |
| 共享符号 | 8006 | **9660** |
| shared.js 体积 | — | 5.5MB（构建时 tree-shake，实测 3 组件产物仅 66KB） |

### 工程验证

```
vite v5.4.21 building for production...
✓ 11 modules transformed.
dist/assets/index-C97sdWfc.js  66.46 kB │ gzip: 26.36 kB
✓ built in 252ms
```

## 当前完成的全部阶段

| 阶段 | 内容 | 结果 |
|---|---|---|
| 1 | AST 级 import 绑定分析 | ✅ |
| 2 | API 语义映射（静态） | 6/118 识别（失败） |
| 2.5 | **运行时指纹探测** | **16 项映射，修正 5 处错误** |
| 3 | render → template 转换器 | ✅ |
| 3.1 | 引号规范化 | ✅ |
| 4 | 418 组件切分 | ✅ |
| 4.5 | Fragment 修复 | 376 → **391 通过（93.5%）** |
| 5 | 工程骨架 | ✅ vite build 通过 |
| 6 | 依赖补全 | 12 → 177 完全解析 |
| 7 | **顶层函数提取修复** | **391/391 = 100% 解析** |

## 已明确的限制

1. **模板里的子组件是 `<component :is="YM" />`** —— 语义正确但可读性差，需要组件注册表才能还原成 `<Ym />`
2. **27 个组件无模板** —— renderless 或 render 写在别处
3. **不等价** —— 逆向后再编译，静态提升/patchFlag 与原始产物必然不同

---

## 阶段 8：组件注册表（具名标签还原）

### 问题

转换出的模板里子组件是 `<component :is="YM" />`，语义正确但不可读。

### 方案

`registry.cjs` 扫描全库，从 `var X = defineComponent({ __name: 'Y' })` 建立
**变量名 → 组件名** 映射（341 个），转换器查表把 `createBlock(YM, ...)` 还原为
`<SettingsSection ...>`，并同时展开 slots（`{ default: withCtx(() => [...]) }`）。

### 效果

| 指标 | 值 |
|---|---|
| 有模板的组件 | 391 |
| **还原为具名标签** | **163（41.7%）** |
| 仍有 `<component :is>` | 228 |
| 编译通过 | 391（不变） |

样例：

```html
<!-- 前 -->
<component :is="YM" id="about" />
<!-- 后 -->
<SettingsSection id="about"><div><p></p></div>...</SettingsSection>
```

### 剩余 228 个的原因

组件引用不在 main.js 的注册表内（来自其他 chunk，或运行时动态解析）。
跨文件变量名会冲突（同名短名在不同 chunk 指不同组件），不能简单合并注册表。

### 用法

```bash
node tools/vue-decompiler/registry.cjs src/renderer /tmp/registry.json
REGISTRY_PATH=/tmp/registry.json node tools/vue-decompiler/convert-component.cjs <组件.js>
```
