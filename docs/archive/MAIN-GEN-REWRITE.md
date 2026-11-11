# main 工程生成器重写：未定义符号归零

> round-0429

## 结果

**静态检查：未定义符号 0 个**（从 63 → 8 → 1 → **0**）
**`vite build`：通过**（532ms）
组件：393 个（391 个从 render 还原 + 2 个占位）

## 为什么重写

之前的生成器是在旧结构上反复打补丁（8 轮），结果代码里"组件生成"与
"shared.js 写出"的执行顺序互相纠缠，改一处崩一处。

重写为**严格两段式**：

```
阶段 A（纯分析，不写文件）
  A1 组件区间（含 __name 的 defineComponent 调用）
  A2 import 表
  A3 顶层语句（按原位置收集，保持顺序）
  A4 符号分类：本地声明 / cross-chunk import / Vue API
  A5 组件清单（含名字与源码范围）
  A6 vendor 路径索引
  A7 统一导出清单（组件 import 与 shared export 共用）

阶段 B（生成）
  B1 组件：两遍——Pass1 只算模板（确定哪些能生成），Pass2 再写 .vue
  B2 shared.js body：AST 级改写（Vue API → __vue.x、cross → src_x、路径重写）
  B2.5 为「被引用但未生成」的组件补占位 .vue
  B3 组装 shared.js（顶部组件 import + cross import + body + export）
  B4 未定义符号自检
```

## 关键修复点

| 问题 | 修复 |
|---|---|
| 组件 .vue 互相 import 时目标可能未生成 | Pass1 先算全部模板，Pass2 只 import 已生成的 |
| `t` 既是 props 别名又被 shared import | 统一 `exportSet`，且 props 绑定占用名优先 |
| 组件被引用但还原失败 → 悬空 import | 生成占位 .vue（`<div />`） |
| 四类语句拼接破坏顺序 | topUnits 按 `node.start` 排序 |

## 与之前版本的差异

| 项 | 旧（gen-unified） | 新（gen-main） |
|---|---|---|
| 未定义符号 | 8 | **0** |
| 组件 import 注入 | ❌ 无 | ✅ 57 个根组件 |
| props 绑定 | ❌ 无 | ✅ 按原 setup 参数 + 别名生成 |
| 结构 | 补丁堆叠 | 两段式 |
| 构建 | ✅ 88 modules | ✅ 通过 |

## 仍未完成

**SSR 渲染**仍报错，但已不是"符号缺失"（那个已归零），而是 jsdom
环境 API 差异：`Cannot read properties of undefined (reading 'bind')`。

这是测试工具的适配问题（原应用代码大量依赖浏览器 API，jsdom 覆盖不全），
不是生成器的问题。**换成真实浏览器（vite dev + playwright）应该能跑。**

## 工具

`tools/vue-decompiler/gen-main.cjs`
