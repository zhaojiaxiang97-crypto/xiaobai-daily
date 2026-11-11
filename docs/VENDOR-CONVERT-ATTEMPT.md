# 尝试：转换 vendor 的 148 个未转换组件

> round-0441

## 做了什么

用 `lib-conv.cjs` 批量转换 `ui/` `blocks/` `pages/` `vendors/` 下的 chunk：

```bash
for d in ui blocks pages vendors; do
  for f in src/renderer/$d/**/*.js; do
    node tools/vue-decompiler/lib-conv.cjs "$f" ./out convert-component.cjs
  done
done
```

**结果：124 个 `.vue` 生成**（预期 148，部分 chunk 转不出）。

## 遇到两个问题

### 1. `SliderThumb` 让整个构建挂掉

```
Error parsing JavaScript expression: Identifier 'props' has already been declared
@slidestart="props=>{let props=_(props,true);i(`slideStart`,props);}"
```

这是 **props 冲突改名逻辑的 bug**：把参数 `e` 改名成 `props` 时，
函数体内本来就有 `let props = ...` 局部变量 → 自我冲突。

（round-0423 提过这个组件，当时也卡在这。）

排除它之后其余 123 个能构建通过（1.23s）。

### 2. vendor 组件之间的依赖链断裂

排除 SliderThumb 后跑渲染测试，报：

```
LOADERR N is not defined
```

**原因**：`lib-conv.cjs` 是为**独立 chunk**设计的（round-0423，一文件一模块、
依赖清晰）。但 vendor 的 chunk 之间**互相 import**（`ui/Switch.js` 里
`import { H as e } from "../chunks/vue-i18n.runtime.js"` 这类），
转换后的 `.vue` 需要指向转换后的兄弟组件，而不是原始 vendor 文件。

**这需要一份完整的「chunk 导出名 → 组件 .vue」映射表**，让 `.vue` 之间的
import 重定向。这是本轮没做的部分。

## 结论

| 项 | 结果 |
|---|---|
| vendor 组件转换 | **124 个 .vue 生成** |
| 构建（排除 SliderThumb） | ✅ 1.23s 通过 |
| 渲染测试 | ❌ `N is not defined`（依赖链断裂） |
| main bundle 渲染率 | 109（未变） |

**这条路比预期复杂**：不是「转完就能用」，而是需要先建立 chunk↔组件映射，
把转换后组件之间的 import 重定向。工作量比 main bundle 那条线更大。

## 判断

到这里，反编译器的边际收益已经明显下降：

| 轮次 | 动作 | 渲染率 |
|---|---|---|
| 0431 | 全量测试基线 | 91 |
| 0432 | 族包裹 | 94 |
| 0438 | 修 resolveComponent 泄漏 | **109** |
| 0439 | 修事件缓存泄漏 | 109 |
| 0440 | 定位 lucide ctx 问题 | 109 |
| 0441 | 转 vendor 组件 | 109（依赖链未接） |

**唯一显著提升来自 round-0438（93→109）**，之后两层都是「定位/清理」而非提升。

**再往前的成本结构变了**：需要先做映射表基建，才可能看到数字变化。
