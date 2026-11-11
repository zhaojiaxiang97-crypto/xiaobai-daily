# vendor 渲染基线：7 / 145

> round-0458
>
> 上一轮 vendor 线"全绿"指的是**可 import**。这轮测的是**可渲染**，结果完全不同。

## 基线数据（真实 Chrome）

| 结果 | 数量 |
|---|---|
| **OK**（渲染出内容） | **7** |
| EMPTY（空但无错） | 62 |
| ERR | 76 |
| 总计 | 145 |

错误分布（前 6）：

| 错误 | 数量 |
|---|---|
| `Cannot read properties of undefined (reading ...)` | 37 |
| `Cannot read properties of null (reading 'c...')` | 8 |
| `Injection Symbol(DialogRootContext) not found` | 4 |
| `_ctx.m is not a function` | 3 |
| `_ctx.D is not a function` | 3 |
| `e is not defined` | 3 |

**对比 main bundle：109 / 392（28%）vs vendor 7 / 145（5%）。**

## 为什么差这么多

vendor 里的 `ui/` `blocks/` `pages/` 组件大量是 **UI 库内部实现**
（reka-ui 风格的 Popper / Dialog / Menu / ScrollArea 等），它们的定位就是
「必须在某个 Root 内、由父组件传复杂 props」，本来就不该单独渲染。

所以 **7 / 145 很可能接近这类组件的固有上限**，与 main bundle 的 24% 同理。

## 这轮修的一个真 bug

### props 参数改名后，后续语句的引用没同步

```js
const o_0 = defineProps({ class: {...} });   // o 被改名成 o_0（冲突检测）
const s = o;                                  // ← 引用还写着 o（未绑定）
```

`pushStmt` 的回溯只处理「新语句声明的名字与已有冲突 → 改已 push 的语句」，
**没有处理反向情况**：新语句引用了**已被改名的旧名**。

**修复**：维护累积的 `renameHistory`（原名 → 新名），`pushStmt` 开头先按它
切换本语句里的引用。

效果（`AlertDialogMedia.vue`）：

```js
const o_0 = defineProps({...});
const s = o_0;              // ✅ 同步了
```

## 精确诊断工具（这轮的另一个产出）

之前的正则检查不可靠（把 CSS class 里的 `px` / `py` / `top` 都算进去，报了 111 个）。
改用 Babel：

- parse 每个 `.vue` 的 `<script setup>`
- 遍历 `ReferencedIdentifier`，用 `scope.hasBinding` 判断
- 排除 Web 全局 + `defineProps` 等宏 + 属性 key / 成员访问

结果：**56 个组件有真正的未绑定引用**，修完 props alias 那类后降到 **53**。

## 现状

| 项 | 值 |
|---|---|
| vendor 组件生成 | 145 |
| 全部可 import | ✅ 145/145 |
| **全部可渲染** | ❌ **7/145（5%）** |
| 有未绑定引用的组件 | 53 |
| main bundle 渲染率 | 109 / 392（未退化） |

## 判断

**「可 import」和「可渲染」是两个数量级的差距**（145 vs 7）。

剩余 53 个未绑定引用里，有相当一部分是**原代码本身就依赖组件上下文**
（如 `_ctx.m is not a function` —— Vue 对未定义模板引用的兜底路径），
不全是转换 bug。

**继续投入前应先分类**：
1. 真转换 bug（符号没带出）→ 可修
2. 需要上下文（Injection not found）→ 组件库设计，改不了
3. 需要复杂 props（`Cannot read properties of undefined`）→ 需要真实数据

只有第 1 类值得继续修。建议下一轮先做这个**分类统计**，
用数据决定值不值得继续。
