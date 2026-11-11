# 组件映射表基建：修掉 3 个 bug，vendor 组件全部转出

> round-0442 / round-0443

## 结果

| 项 | 之前 | 现在 |
|---|---|---|
| vendor 组件转换数 | 124 | **148（预期全量）** |
| `dialog.js` | 0 个组件 | **7 个** |
| 映射表 | 无 | **107 条**（99 chunk / 644 组件） |
| 运行时 | — | 仍有 49 个组件缺跨 chunk 符号 `N` |

## 三个 bug（都已修）

### 1. import 解析优先级错误（最关键）

```js
if (SEM.has(callee)) sem = callee;   // ← 错：SEM 里有 'h'
else if (imp) { ... }
```

`SEM`（Vue 语义名集合）里包含 `'h'`（渲染函数）。而 `dialog.js` 里
`h` 恰好是从 `vue-i18n.runtime` 导入的 **`defineComponent` 别名**：

```js
import { j as h } from './vue-i18n.runtime.js';   // j = defineComponent
var D = h({ __name: 'DialogPortal', ... })
```

`SEM.has('h')` 先命中 → `sem = 'h'` ≠ `defineComponent` → 直接 return。
**`dialog.js` 的 7 个组件全部被丢弃。**

修复：**import 解析优先，SEM 只作无 import 时的兜底**。

```js
let sem = null;
if (imp) { ...按 import 表解析... }
if (sem === null && SEM.has(callee)) sem = callee;
```

### 2. 重定向生成的 import 语法错误

```
Failed to resolve import "__vue__Button" from "src/components/WhiteboardWorkspace.vue"
```

`byFrom` 用 `__vue__${name}` 当 key，但生成 import 的循环没区分前缀，
把 `__vue__Button` 当成具名 specifier 写进了 `import { ... }`。

修复：循环里判断 `f2.startsWith('__vue__')` → 生成默认导入
`import X from './Name.vue'`。

### 3. 重定向指向未生成的组件

```
Could not resolve './Input.vue' in src/components/ClipboardAssistantWorkspace.vue
```

映射表里有 `Input`，但该组件可能转换失败（或尚未生成）。重定向前加存在性检查：

```js
if (target && fs.existsSync(path.join(outDir, target + '.vue'))) redirected = target;
```

配合跑两遍转换（第一遍生成、第二遍收敛）。

## 映射表生成器（可复用资产）

`tools/vue-decompiler/build-component-map.cjs`：

```bash
node build-component-map.cjs <rendererDir> <out.json>
```

扫描所有 chunk，建立 `"(chunk相对路径)::(导出名)" → 组件名`：

```json
{
  "chunks/dialog.js::a": "Dialog",
  "chunks/dialog.js::o": "DialogPortal",
  "ui/AlertDialogMedia.js::t": "AlertDialogMedia"
}
```

## 仍未打通：49 个组件缺跨 chunk 符号

批量渲染测试（147 个用例）报 `N is not defined`。

静态检查：**49 个 `.vue` 的模板里用了 `N`，但 script 里没有对应 import**。

这是 `lib-conv` 的 **import 收集粒度问题**：它只收集「在模板里出现的源文件 import」，
但 `N` 这类跨 chunk 符号可能来自默认导出或深层 re-export，没被识别。

**下一步**：在 `lib-conv` 里补一层「模板用到的标识符 vs script 已绑定标识符」的差集检查，
对缺失的按 chunk 导出表补 import。

## 判断

三个 bug 里 **#1 是最有价值的**（`SEM` 与 import 别名撞车，是个隐蔽的优先级错误），
它一次性让 `dialog.js` 从 0 变 7。

但 **148 个组件能转换 ≠ 能跑**：还剩 import 收集这一环。
main bundle 的 109 个渲染率**未受影响**（那条线独立）。
