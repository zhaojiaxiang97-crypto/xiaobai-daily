# 文档索引

按「你要做什么」选入口。

## 我要构建并运行这个应用

1. [DELIVERY.md](DELIVERY.md) —— 交付清单：状态、能力、已知限制
2. [FILE-GUIDE.md](FILE-GUIDE.md) —— 每个文件（含哈希 chunk）的实际含义
3. [BUILD.md](../BUILD.md) —— 构建步骤
4. 直接跑：`./tools/check.sh`

## 我要理解这个应用怎么跑起来的

1. [ARCHITECTURE.md](ARCHITECTURE.md) —— 三层架构、模块依赖图、数据流、asar 结构
2. [MODULES.md](MODULES.md) —— 主进程 47 个模块 + 145 条内部依赖
3. [COMPONENT-INDEX.md](COMPONENT-INDEX.md) —— 418 组件 + 1600 函数名 → 行号索引

## 我要还原前端组件（反编译器）

两条线分开看：

1. [DECOMPILER.md](DECOMPILER.md) —— **main bundle 线**：392 个 .vue、109 渲染、
   112 带 scoped 样式、8 类踩坑
2. [VENDOR.md](VENDOR.md) —— **vendor 独立 chunk 线**：145 个组件全部可 import、
   10 可渲染、71 个错误分类、3 个架构性修复
3. 工具在 `tools/vue-decompiler/`

## 我要改代码并验证

```bash
./tools/check.sh      # 语法 → 构建 → 结构自检 → 九页面内容断言
```

**必须断主内容区**（`.content-body` 文本长度），只看侧边栏存在会漏掉整页空白
—— 这个坑踩过两次（import 别名批量改名、函数参数批量改名）。

## 我在排查某个历史问题

[archive/](archive/) 里有 **37 份**过程记录（问题已解决或方案已废弃），保留供追溯。

按主题分组：

- **vendor 线（0441-0460）**：`VENDOR-CONVERT-ATTEMPT` / `VENDOR-RENDER-BASELINE` /
  `VENDOR-GREEN` / `VENDOR-LINE-CONCLUSION` / `VENDOR-ERROR-TAXONOMY` /
  `COMPONENT-MAP-INFRA` / `TEMPLATE-MISMATCH-BUG` / `API-MAP-CHUNK-MISMATCH` /
  `AST-ASSEMBLY` / `AST-RENAME-TRAP` / `BACKTRACK-RENAME` / `DEP-CLOSURE` /
  `DESTRUCTURING-INLINE` / `IMPORT-GAP-ANALYSIS` / `INLINE-RENAME` /
  `INNERDEFS-MISMATCH` / `ITERATIVE-INLINE` / `SETUP-SCOPE-INLINE` /
  `SETUP-SCOPE-LIMIT`
- **main bundle 深挖（0438-0444）**：`DEEP-DIVE-RESOLVECOMP` / `DEEP-DIVE-LAYER2` /
  `DEEP-DIVE-LUCIDE`
- **早期（0433 前）**：`REMAINING-SYMBOLS` / `MODULE-GRAPH-REBUILD` /
  `UNIFIED-SYMBOL-MAP` / `MAIN-BUNDLE-PROGRESS` / `RENDER-VERIFICATION` /
  `MAIN-BUNDLE-BOUNDARY` / `API-MAP-INVESTIGATION` / `BASE-COMPONENT-LIB` /
  `BROWSER-VERIFICATION` / `MAIN-GEN-REWRITE` / `FULL-RENDER-REPORT` /
  `FAMILY-TEST-RESULT` / `vue-project-pilot/`
- **工具调研**：`TOOL-SURVEY`
- **应用健康**：`APP-HEALTH-CHECK`


## 主线结论速查

| 问题 | 答案 |
|---|---|
| 应用能构建运行吗 | ✅ `./tools/check.sh` PASS |
| 源码能读吗 | ✅ 主进程 `_0x` 13800→6122，到机械极限 |
| 能还原成 Vue 工程吗 | ✅ 393 个 .vue、可编译、94 个真实渲染 |
| 为什么不是 100% | 组合式组件库的固有属性（需父组件上下文 + 真实数据），见 DECOMPILER.md |
| 能逐字节等价吗 | ❌ 编译产物必然不同，功能等价可验证 |
