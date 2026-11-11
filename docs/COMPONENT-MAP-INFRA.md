# 组件映射表基建（chunk 导出名 → 组件 .vue）

> round-0442

## 做了什么

### 1. 建立映射表：`build-component-map.cjs`

扫描全部 vendor chunk，建立 `(chunk 相对路径)::(导出名) → 组件名` 的映射：

```json
{
  "chunks/dialog.js::a": "Dialog",
  "chunks/dialog.js::i": "DialogContent",
  "ui/AlertDialogMedia.js::t": "AlertDialogMedia",
  "blocks/mermaid-block.js::default": "MermaidBlockNode"
}
```

实测：**99 个 chunk、644 个组件、107 条导出映射**。

**用途**：转换 vendor 组件时，把跨 chunk import 重定向到已转换的 `.vue`，
而不是原始 vendor 文件。这是让 vendor 组件能互相引用的前提。

### 2. `lib-conv.cjs` 加了重定向支持

```bash
node tools/vue-decompiler/lib-conv.cjs <chunk.js> <outDir> \
     tools/vue-decompiler/convert-component.cjs /tmp/compmap.json
```

命中映射则生成 `import Foo from './Foo.vue'`（同目录），否则保持原 vendor import。

**验证**：`ui/Kbd.js` 正常转换，其 `Switch.js` 的 `xt`（cn 函数，非组件）
正确地**没有**被重定向 —— 符合预期。

## 尚未打通的

`chunks/dialog.js` 转换返回 `no-component`，但映射表里明明有它的 6 条记录。

**已排除**：组件判定逻辑本身没问题。单独测试确认：

```
h 的 import: { imported: 'j', from: './vue-i18n.runtime.js' }
isRuntime: true
VUE_API_MAP['j'] → defineComponent
var X = h({...}) 数量: 7
```

判定链完整，但运行时就找不到组件。**实现里有未定位的差异**（可能在 `comps`
收集后的过滤条件、或 `arg.properties` 的遍历方式）。

## 结论

| 项 | 状态 |
|---|---|
| 映射表生成器 | ✅ 107 条（可复用资产） |
| lib-conv 重定向支持 | ✅ 单组件验证通过 |
| vendor 批量转换 | ❌ 部分 chunk 转不出 |
| **main bundle 渲染率** | **109（未变）** |

## 判断

这条线（vendor 转换）的实现细节比预估的多。已经投入 3 轮（0439 定位、
0441 首次尝试、0442 基建），数字始终停在 109。

**剩余问题不是架构性的，是逐个 chunk 的实现差异** —— 可以继续修，但每修一个
只覆盖一部分组件，看不到数字跳变。

## 留下来的可复用资产

1. `build-component-map.cjs` —— 映射表生成器
2. `lib-conv.cjs` 的映射重定向能力
3. 明确了 vendor 依赖链的结构（`dialog.js` → `DialogTitle.js` → `lucide-icons.js`）
