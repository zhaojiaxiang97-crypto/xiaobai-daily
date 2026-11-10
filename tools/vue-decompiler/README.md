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
