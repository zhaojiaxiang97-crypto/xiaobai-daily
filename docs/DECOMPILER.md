# 反编译器：从打包产物还原 Vue 组件

> 本文合并了 5 份过程文档的结论。过程记录见 `archive/`。

## 结论

| 项 | 数值 |
|---|---|
| 组件总数 | 575（main bundle 418 + 独立 chunk 160，重名 3） |
| 已切分并生成 `.vue` | **393**（main bundle）+ **122**（独立 chunk，99%） |
| 可编译 | main bundle 393/393、独立 chunk 122/123 |
| **真实浏览器渲染成功** | **94 / 393（24%）**，独立 chunk 的 Kbd 也已验证 |
| 未定义符号 | **0**（从 63 收敛到 0） |
| `vite build` | ✅ 通过 |

**24% 不是失败率，是这类组件库的固有属性** —— 见下文「为什么是 24%」。

## 两条路线（结论不同）

| 位置 | 组件数 | 结论 |
|---|---|---|
| **独立 chunk**（`ui/` `blocks/` `pages/`，43 个文件） | 160 | ✅ 天然模块化（一文件一模块、真实 import 关系），**122/123 还原为可编译 .vue** |
| **main bundle**（`renderer/chunks/main.js`，5.2MB） | 418 | ✅ 也能做 —— 393 个 .vue、依赖归零、构建通过、94 个真实渲染 |

> 早期曾误判"main bundle 模块边界已抹除 → 不可恢复"。**这个结论是错的**：
> 组件边界由 `defineComponent({__name})` 直接给出，458 个组件 vs 9229 个普通声明，
> 根本不需要 rollup 注释或 `mapDeps`。真正的障碍是两个**实现 bug**（见「踩过的坑」）。

## 关键方法

### 1. Vue API 语义靠运行时探测，不靠静态分析

静态 AST 分析三次尝试都失败（167 个导出里只认出 5-7 个，且有误判）。
改为在**渲染进程里 `import()` 运行时模块**，对每个导出做行为断言：

```js
fn(null) === '' && fn(123) === '123'        // toDisplayString
fn({__v_isRef:true,value:'X'}) === 'X'      // unref
fn('div',{id},['x']).type === 'div'         // createElementVNode（arity 3）
fn() === undefined                          // openBlock（返回 undefined，不是数组！）
```

产出 16 项映射，**修正了静态分析的 5 处错误**（`y`/`H`/`St`/`gt`/`Ct`）。

### 2. 统一符号映射表

一份表四处共用：shared.js 的跨 chunk import 用 `src_<n>`、对外导出 `S_<n>`、
组件用 `import { S_x as x }` 还原原名。这样本地声明与 import 别名同名也不打架。

### 3. 一切都走 AST，不用文本正则

文本替换 `"./x.js"` 会误伤正则字面量（`/pattern/i` 的 flag 被改坏）、
重命名会误伤字符串。全部改成 AST 级操作。

### 4. 两段式生成器

`gen-main.cjs`：**阶段 A 纯分析**（组件区间 / import 表 / 顶层语句按原位置 /
符号分类 / 统一导出清单）→ **阶段 B 生成**（组件两遍：先算模板再写文件 →
shared body → 占位组件 → 组装 → 自检）。

## 踩过的坑（8 类，均已修复）

| # | bug | 症状 |
|---|---|---|
| 1 | 排除粒度按 `VariableDeclaration` 整条 | `Mt is not defined`（缺 6700 符号）→ 改 declarator 粒度 |
| 2 | 漏收顶层 `ExpressionStatement` | `EntityStart undefined`（IIFE 枚举初始化被丢） |
| 3 | **三类语句分组拼接破坏顺序** | IIFE 被排到使用它的 `var` 之后 → 改按 `node.start` 排序 |
| 4 | Vue API 无条件改写 `__vue.x` | 普通变量 `h` 被误判 → 改按 import 绑定来源判断 |
| 5 | 路径重写用文本正则 | 误伤 `/pattern/i` 的 flag |
| 6 | 组件 `.install` 语句未排除 | 引用已排除的组件变量 |
| 7 | Vue API 别名未识别（`import { bn as ref }`） | `ref` 289 处未定义 |
| 8 | props 默认值引用 shared 符号 | `ProgressRoot` 的 `default: Rl` 未 import |

## 为什么是 24%

393 个组件在真实 Chrome 里批量挂载，251 个报错，分布：

| 错误 | 数量 | 性质 |
|---|---|---|
| `str.replace is not a function` | 68 | mock 数据类型给错（期望 string，给了 `{}`） |
| `Cannot destructure 'slots' of undefined` | 54 | 期望 `props.slots` 是对象 |
| `Cannot read properties of null (reading 'ce')` | 49 | 更深的上下文/数据 |
| `set on proxy trap falsish for style` | 14 | 期望可写 style 对象 |
| `Injection Symbol(DialogRootContext) not found` 等 | 14+ | **必须在父组件内使用** |

**这套 UI 库是 reka-ui / radix 风格的组合式组件**：子组件必须在父组件内使用
（provide/inject），且需要贴近真实业务数据的 prop 结构。

按组件族做了**包裹式测试**（子组件挂在 `XxxRoot` 内），只从 91 提升到 **94**
—— 说明瓶颈已从「上下文」转为「数据深度」。

**要全部渲染，需从原应用数据流反推每个组件实际吃什么数据，是另一个量级的工程。**


## 直接下载现成产物

不用自己跑生成器 —— Release `v1.8.3` 上有打包好的产物：

```bash
gh release download v1.8.3 -R zhaojiaxiang97-crypto/xiaobai-daily \
   -p "vue-components-v1.8.3.tar.gz"
tar xzf vue-components-v1.8.3.tar.gz && cd . && npm install && npm run dev
# → http://localhost:5300 实时渲染还原出的组件
```

产物内容（32MB）：
- `src/components/*.vue` —— 393 个还原组件
- `src/shared.js` —— 共享符号（2MB）
- `src/vendor/` —— 原始 renderer 副本（跨 chunk 依赖）
- `src/main.js` —— 演示入口（渲染 AlertTitle / AlertDescription）

已验证：下载后 `tar tzf` 通过、393 个组件齐全、`npm run build` 3.3s 通过。


## scoped CSS 恢复

原应用用 `_export_sfc(comp, [...])` 给组件挂了 scopeId（`data-v-xxx`），对应 CSS 里有
**2844 处 `[data-v-xxx]` 规则**、**691 个 CSS 自定义属性**。

生成器现在会：
1. 从组件定义后紧跟的 `[[__scopeId, 'data-v-xxx']]` 提取 scopeId
2. 按 scopeId 从原 CSS 提取对应规则（129 个 scopeId / 2489 条规则）
3. 写进组件的 `<style>` 块，并给模板根元素加上 `data-v-xxx` 属性
4. 另生成 `src/styles/variables.css`（665 个 CSS 变量），入口 import 即可

**结果：392 个组件中 112 个带上了 scoped 样式。**

实测（真实 Chrome）：

```
--admonition-border = hsl(0 0% 87%)   ← 变量正确加载
styleTags = 18                         ← 组件 style 块已注入
```

### 关键修复：`.install` 语句导致 TDZ

原应用在顶层做全局组件注册：

```js
c$.install = e => { e.component(c$.__name, c$); };
```

这行若保留在 `shared.js` 顶层，会与组件形成**循环依赖**
（`shared.js` import 组件 → 组件 import `shared.js`），执行时 `c$` 尚未初始化
→ `Cannot access 'c$' before initialization`。

**修复**：排除所有 `X.install = ...` 语句（还原成 `.vue` 后不需要全局注册）。
效果：组件 import 从 59 降到 32，循环依赖大幅减少。

## 验证方法

```bash
# 1. 生成工程（393 个 .vue + shared.js）
node tools/vue-decompiler/gen-main.cjs src/renderer/chunks/main.js \
     tools/vue-decompiler/convert-component.cjs /tmp/proj
# 2. 把 renderer 复制成 vendor（组件的跨 chunk 依赖在这里）
mkdir -p /tmp/proj/src/vendor && cp -R src/renderer/* /tmp/proj/src/vendor/
# 3. 生成批量渲染测试并验证
node tools/vue-decompiler/gen-render-test.cjs /tmp/proj
tools/vue-decompiler/verify-browser.sh /tmp/proj
```

独立 chunk 路线：

```bash
node tools/vue-decompiler/lib-conv.cjs src/renderer/ui/Kbd.js ./out \
     tools/vue-decompiler/convert-component.cjs
# → out/Kbd.vue（122/123 通过）
```

## 渲染成功的实例

```html
<!-- AlertTitle（真实 Chrome 输出） -->
<div data-slot="alert-title"
     class="font-medium group-has-[>svg]/alert:col-start-2 cn-font-heading
            [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground">SLOT</div>
```

`data-slot`、完整 Tailwind class（含 `group-has-[>svg]` 变体）、slot 内容全部正确。

## 工具

| 工具 | 用途 |
|---|---|
| `gen-main.cjs` | **主生成器**：main bundle → 393 个 .vue + shared.js |
| `lib-conv.cjs` | 独立 chunk → 可运行 .vue（99%） |
| `convert-component.cjs` | render 函数 → template（核心转换） |
| `registry.cjs` | 组件注册表（341 项，`<component :is="YM"/>` → `<SettingsSection/>`） |
| `vue-api-map.json` | Vue API 映射（运行时探测得出） |
| `verify-browser.sh` | 真实浏览器渲染验证 |
| `gen-render-test.cjs` / `gen-family-test.cjs` | props mock / 族包裹测试生成 |
| `split-components.cjs` / `split-with-deps.cjs` | 组件切分 |
| `analyze-bindings.cjs` / `verify-map.cjs` | 绑定分析与映射校验 |

## 明确做不到的

1. **逐字节等价**：逆向后再编译，静态提升、patchFlag、缓存槽位必然不同。功能等价可验证。
2. **24% 之外的全部渲染**：需要真实业务数据流反推，成本远高于收益。
3. **组件内部 CSS**：`_export_sfc` 的 scopeId 已丢弃（`data-v-xxx`），样式需另行处理。
