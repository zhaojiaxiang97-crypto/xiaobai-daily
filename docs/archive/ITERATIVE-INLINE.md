# 迭代内联：未绑定引用 371 → 154（-58%）

> round-0459

## 做了什么

### 1. 分类统计（先证据）

对 371 个未绑定引用做来源归类：

| 分类 | 数量 | 占比 |
|---|---|---|
| 源文件 import 表里有该名字 | 345 | 93% |
| chunk 顶层定义 | 7 | 2% |
| 找不到（Web API 类） | 19 | 5% |

**但深挖发现 345 里多数不是「漏 import」，而是「import 了但只在 script 里被引用」** ——
因为 import 决策只看模板。

### 2. 修 import 决策（关键）

```js
if (!new RegExp('(?<![\\w$])' + local + '(?![\\w$])').test(tpl)) continue;
```

**只看 `tpl`**。而内联进 `<script setup>` 的代码同样引用 import 别名
（如 `Barcode3D` 的 `_` / `v` / `y`）→ 模板没有、script 有 → 漏 import。

改成 `tpl + 组件源码里的全部标识符`（宽松集合，宁可多收）：

```js
const compText = src.slice(c.node.start, c.node.end);
for (const m of compText.matchAll(/(?<![\w$.])([A-Za-z_$][\w$]*)(?![\w$])/g)) compRefs.add(m[1]);
```

**注意**：不能用 `p.traverse` —— 实测在那个位置对组件子树返回空集（`size=0`）。

**效果**：`Barcode3D` 的 import 从 5 个 → 12 个（`_` / `v` / `y` 都进来了）。

### 3. 排除「组件内被赋值的名字」

扩展后撞上 `Cannot assign to import 's'`：某名字既是 import 又被组件内赋值。

修复：收集组件源码里所有赋值目标（`X =`、`X++`、`X +=` 等），
非模板引用时跳过这些名字的 import。

### 4. 迭代内联（generate → scan → refill）

把「一次性算种子」改成循环：

```js
let frontier = new Set(seed);   // 模板引用 + propsCode 引用
while (frontier.size && guard++ < 8) {
  // 1. 按源码顺序 push frontier 的定义（走 pushStmt，自带冲突改名）
  // 2. 重新扫描已生成的 bodyText，找出新的可解析未绑定名
  frontier = freeIdsOf(bodyText) ∩ setupDefs ∩ !skip;
}
```

**每 push 一批就重扫**，而不是只看 def 自身的引用。

## 结果

| 指标 | 修前 | 修后 |
|---|---|---|
| **未绑定引用** | 371 | **154（-58%）** |
| **渲染 OK** | 7 | **10** |
| ERR | 76 | 71 |
| `vite build` | ✅ | ✅ 1.14s |
| main bundle | 109 | 109（未退化） |

## 为什么渲染只 +3

剩下的错误分布完全变了 —— **不再是符号缺失**：

| 错误 | 数量 | 性质 |
|---|---|---|
| `Cannot read properties of undefined` | 34 | 需要真实业务 props |
| `Cannot read properties of null` | 8 | 同上 |
| `Injection Symbol(DialogRootContext) not found` | 4 | 必须在父组件内 |
| `_ctx.m / _ctx.D is not a function` | 3 + 3 | 模板引用未绑定（Vue 兜底路径） |

**这印证了本轮计划里写的预期上限**：符号清零也不会让渲染率大涨，
因为大量 vendor 组件（reka-ui 风格的 Popper / Dialog / Menu）本来就需要
「父组件上下文 + 复杂 props」才能渲染。

## 结论

**这轮的价值在「符号完整性」而不是「渲染率」**：
- 未绑定引用减半（371 → 154）
- 修了两个真 bug（import 只看模板、Vue 运行时别名缺失）
- 渲染率小幅提升（7 → 10）

**继续压剩余 154 个的边际收益很低** —— 它们要么需要真实 props、
要么需要父组件组合渲染，都不是「修转换器」能解决的。
