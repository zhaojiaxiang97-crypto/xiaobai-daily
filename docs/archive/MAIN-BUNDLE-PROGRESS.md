# main bundle 工程：修复进度与剩余障碍

> round-0425 / 0426

## 已确认的事实（推翻此前结论）

**"模块边界丢失导致 418 组件不可运行"这个判断是错的。**

- main.js 顶层声明 9687 个 = 组件 458 + **普通代码 9229**
- 组件边界由 `defineComponent({__name})` 直接给出，不需要 rollup 注释或 mapDeps

## 已修复的四个真实 bug

| # | bug | 症状 | 修复 |
|---|---|---|---|
| 1 | 排除粒度按 `VariableDeclaration` 整条 | `Mt is not defined`（缺约 6700 个符号） | 改 declarator 粒度 → shared 符号 2484→9202 |
| 2 | 漏收顶层 `ExpressionStatement` | `EntityStart` undefined（IIFE 枚举初始化被整条丢掉） | 补收 ExpressionStatement → 9214 |
| 3 | Vue API 无条件改写 `__vue.xxx` | `Cannot assign to import 'h'`（普通变量 `h` 被误当渲染函数） | 改作用域级判定（`scope.hasBinding` + 来源检查） |
| 4 | 路径重写用文本正则 | `Unexpected flag _`（误伤 `/pattern/i` 的 flag） | 改 AST 级（只改 StringLiteral/TemplateLiteral） |

**修完 1-3 后，`vite build` 从 4 modules 跳到 88 modules 并通过。**

## 剩余障碍：命名冲突的连锁

top-level 有大量单字母声明（`s`/`t`/`n`/`i`），与跨 chunk import 的别名持续冲突：

- 改名本地声明 → 但 `sharedNames` 是改名**前**收集的，export 列表还是旧名
- → `Export 's' is not defined`
- 修了这个，下一条同类冲突再冒出来

**这类问题可以逐个修，但数量不可控**（单字母名 9687 个声明里占比很高）。
需要的是**一次性解决方案**：给所有冲突符号做统一的重命名映射表，
在收集 → 改名 → export → 组件 import 四个环节用同一份表。

## 结论

**这条路是通的**（88 modules 一度通过），但收尾需要一轮"统一符号映射表"的
重构，而不是继续逐条打补丁。

## 工具状态

`tools/vue-decompiler/gen-main-project.cjs` 已实现：
- declarator 粒度切分
- ExpressionStatement 收集
- AST 级路径重写（123 处有效 + 2 处死引用）
- 作用域级 Vue API 改写（499 处）
- AST 级冲突改名（不完整：export 列表未同步）

**待完成**：统一符号映射表（收集/改名/export/import 四处共用）。
