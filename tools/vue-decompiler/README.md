# Vue 反编译器工具集

把 Electron 打包产物里的内联组件还原成可编译的 `.vue`。

**能力与限制见 [docs/DECOMPILER.md](../../docs/DECOMPILER.md)。**

## 现状

| 路线 | 组件数 | 可编译 | 真实渲染 |
|---|---|---|---|
| 独立 chunk（`ui/` `blocks/` `pages/`） | 160 | 122（99%） | ✅ 已验证 |
| main bundle（`renderer/chunks/main.js`） | 418 | 393（100%） | 94（24%） |

24% 是这类组合式组件库（reka-ui / radix 风格）的固有属性 —— 子组件需父组件
上下文 + 真实业务数据结构。详见 docs/DECOMPILER.md「为什么是 24%」。

## 两条路线

### A. main bundle（418 个组件）

```bash
# 1. 生成工程（393 个 .vue + shared.js 2MB）
node gen-main.cjs <main.js> convert-component.cjs <outDir>

# 2. 把 renderer 复制成 vendor（组件的跨 chunk 依赖在这里）
mkdir -p <outDir>/src/vendor && cp -R <renderer>/* <outDir>/src/vendor/

# 3. 生成批量渲染测试 + 真实浏览器验证
node gen-render-test.cjs <outDir>
../verify-browser.sh <outDir>
```

### B. 单个独立 chunk（122/123 通过）

```bash
node lib-conv.cjs <chunk.js> <outDir> convert-component.cjs
# → <outDir>/Kbd.vue
```

## 工具

| 工具 | 用途 |
|---|---|
| `gen-main.cjs` | **主生成器**。两段式：阶段 A 纯分析 → 阶段 B 生成。输出 393 个 .vue + shared.js |
| `lib-conv.cjs` | 独立 chunk → 可运行 `.vue`（99% 通过率） |
| `convert-component.cjs` | **核心转换**：render 函数 → template（元素/属性/slot/文本/条件） |
| `render2tpl.cjs` | 早期转换器（被 convert-component 取代，保留供对照） |
| `registry.cjs` | 组件注册表（341 项）：`<component :is="YM"/>` → `<SettingsSection/>` |
| `vue-api-map.json` | Vue API 映射（16 项，运行时行为探测得出） |
| `split-components.cjs` / `split-with-deps.cjs` | 从 bundle 切分组件（后者含正确的自由变量分析） |
| `gen-project.cjs` / `gen-unified.cjs` / `gen-main-project.cjs` | 历史版本生成器（被 gen-main 取代，保留供对照） |
| `analyze-bindings.cjs` | AST 级 import 绑定分析（排除同名局部变量遮蔽） |
| `verify-map.cjs` | 用全库签名交叉校验 Vue API 映射 |
| `mkcomponent.cjs` / `batch-convert.cjs` / `compile-check.cjs` | 早期单组件生成 / 批量转换 / 编译验证 |
| `gen-render-test.cjs` | 从 `defineProps` 提取 props 并生成 mock，输出批量测试入口 |
| `gen-family-test.cjs` | 按组件族生成「父组件包裹」测试场景 |
| `verify-browser.sh` | **真实浏览器验证**：vite dev + headless Chrome + CDP 取 DOM |
| `template-package.json` / `template-vite.config.js` | 工程配置模板 |

## 硬性约束（都是踩出来的）

1. **不要用文本正则改写代码** —— 会误伤正则字面量（`/pattern/i` 的 flag）和字符串。
   一律走 AST。
2. **顶层语句必须按源码原位置排序拼接** —— 分组拼接（var / function / expr）
   会把 IIFE 排到使用它的 `var` 之后，导致枚举未初始化。
3. **排除组件要按 declarator 粒度** —— 按整条 `VariableDeclaration` 排除会连带
   丢掉同一条里的普通声明（曾因此缺 6700 个符号）。
4. **Vue API 判定要看 import 绑定来源** —— 只按名字判断会把普通变量 `h` 误当
   渲染函数，也会漏掉别名（`import { bn as ref }`）。
5. **组件的 props 代码也要纳入符号扫描** —— props 默认值会引用外部常量
   （`default: Rl`），只扫模板会漏。

## 环境

```bash
npm i @babel/parser @babel/traverse @babel/generator @babel/types
# 验证还需要
npm i vue vite @vitejs/plugin-vue
```
