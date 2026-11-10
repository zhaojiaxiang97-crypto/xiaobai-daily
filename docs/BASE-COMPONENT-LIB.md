# 基础组件库还原（独立 chunk 路线）

> round-0423

## 结论

**123 个独立 chunk 组件中 122 个（99%）还原为可编译的 `.vue`**，
并且 **Kbd 组件已用 SSR 实测渲染出真实 HTML**。

## 为什么走独立 chunk 而不是 main.js

| 位置 | 组件数 | 模块边界 | 可行性 |
|---|---|---|---|
| **独立 chunk**（ui/blocks/pages，43 个文件） | **160** | ✅ 天然（一文件一模块，真实 import 关系） | **可做** |
| main.js（单文件 5.2MB） | 418 | ❌ 已抹除（0 处 rollup 模块注释，mapDeps 只覆盖懒加载 chunk） | 不可恢复 |

实测数据：main.js 5.2MB 占全部代码 43%，其内部模块边界信息在打包时消失，
把顶层代码平铺进 shared.js 必然触发初始化顺序问题（见 `docs/MODULE-GRAPH-REBUILD.md`）。

## 实现

`tools/vue-decompiler/lib-conv.cjs`：独立 chunk → 可运行 `.vue`

1. 解析 import，把导出短名映射为语义（`j`→defineComponent、`S`→createElementBlock…）
2. 提取 `defineComponent({__name, props, setup})`，支持 **ObjectProperty 与 ObjectMethod 两种形态**
3. 模板转换复用 `convert-component.cjs`
4. 生成真实 import（相对 `src/components/` 重算路径到 `../vendor/...`）
5. **props 绑定**：`const props = defineProps({...})` + 别名

## 通过率演进

| 阶段 | 通过 | 原因 |
|---|---|---|
| 首轮 | 46/123（37%） | `Identifier 'e'/'t'/'n'/'r' has already been declared` —— props 代码切片与原 import 别名/ setup 参数重名 |
| 加冲突重命名 | 46/123 | 只处理了 import 侧，未处理 setup 参数 |
| **setup 参数冲突改名** | **122/123（99%）** | `setup(e)` 的 `e` 与 `import { xt as e }` 重名 → 统一改名为 `props`（占用时用 `__props`） |

剩余 1 个（SliderThumb）是复杂动态组件，`props` 标识符重复声明，待单独处理。

## 渲染验证（关键）

`Kbd.vue` 全链路：

```
源码 ui/Kbd.js (690B)
  → Kbd.vue（template + import + defineProps + 别名）
  → vite build（7 modules）
  → jsdom SSR

输出 415B：
<kbd data-slot="kbd" class="bg-muted text-muted-foreground in-data-[slot=tooltip-content]:bg-background/20 ...">
  <!--[-->SLOT<!--]-->
</kbd>
```

**这是从打包产物还原的组件第一次真实渲染出 HTML。**

## 生成样例

```vue
<!-- Kbd.vue -->
<template>
  <kbd data-slot="kbd" :class="e('bg-muted text-muted-foreground ...', s.class)"><slot /></kbd>
</template>
<script setup>
import { xt as e } from '../vendor/ui/Switch.js';
const o = defineProps({class:{type:[Boolean,null,String,Object,Array]}});
const s = o;
</script>
```

## 使用方式

```bash
npm i @babel/parser @babel/traverse @babel/generator @babel/types
node tools/vue-decompiler/lib-conv.cjs <chunk.js> <outDir> tools/vue-decompiler/convert-component.cjs
```

生成后把 `src/renderer` 复制为 `src/vendor/`，即可 `vite build` 并 SSR 渲染。
