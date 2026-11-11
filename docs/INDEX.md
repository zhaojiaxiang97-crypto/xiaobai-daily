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

1. [DECOMPILER.md](DECOMPILER.md) —— **总文档**：能力、方法、8 类踩坑、24% 的由来
2. 工具在 `tools/vue-decompiler/`

## 我要改代码并验证

```bash
./tools/check.sh      # 语法 → 构建 → 结构自检 → 九页面内容断言
```

**必须断主内容区**（`.content-body` 文本长度），只看侧边栏存在会漏掉整页空白
—— 这个坑踩过两次（import 别名批量改名、函数参数批量改名）。

## 我在排查某个历史问题

[archive/](archive/) 里有 12 份过程记录（问题已解决或方案已废弃），保留供追溯：

| 文档 | 当时解决什么 |
|---|---|
| `REMAINING-SYMBOLS.md` | 追踪最后 8 个未定义符号 |
| `MODULE-GRAPH-REBUILD.md` | 平铺方案的失败分析（已被 gen-main 取代） |
| `UNIFIED-SYMBOL-MAP.md` | 统一符号映射表重构 |
| `MAIN-BUNDLE-PROGRESS.md` | main bundle 修复进度 |
| `RENDER-VERIFICATION.md` | jsdom 阶段（已被真实浏览器替代） |
| `MAIN-BUNDLE-BOUNDARY.md` | 「模块边界能否恢复」的实测（结论：不需要恢复） |
| `API-MAP-INVESTIGATION.md` | 静态 API 映射为何不可行 |
| `BASE-COMPONENT-LIB.md` | 独立 chunk 路线 |
| `BROWSER-VERIFICATION.md` | 真实浏览器验证（首次渲染成功） |
| `MAIN-GEN-REWRITE.md` | 生成器两段式重写 |
| `FULL-RENDER-REPORT.md` | 393 组件全量渲染数据 |
| `FAMILY-TEST-RESULT.md` | 族包裹测试对比 |

## 主线结论速查

| 问题 | 答案 |
|---|---|
| 应用能构建运行吗 | ✅ `./tools/check.sh` PASS |
| 源码能读吗 | ✅ 主进程 `_0x` 13800→6122，到机械极限 |
| 能还原成 Vue 工程吗 | ✅ 393 个 .vue、可编译、94 个真实渲染 |
| 为什么不是 100% | 组合式组件库的固有属性（需父组件上下文 + 真实数据），见 DECOMPILER.md |
| 能逐字节等价吗 | ❌ 编译产物必然不同，功能等价可验证 |
