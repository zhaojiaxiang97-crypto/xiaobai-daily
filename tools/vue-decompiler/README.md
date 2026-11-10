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
