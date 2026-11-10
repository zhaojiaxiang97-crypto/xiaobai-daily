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
