# 方案 B 落地：全程 AST 组装，145/145 零重复声明

> round-0453
>
> **这是 vendor 线 12 轮来最大的突破。**

## 之前为什么一直卡

`lib-conv.cjs` 生成 `<script setup>` 时是**字符串拼接**：

```js
let script = '';
script += `import { ... } from 'vue';\n`;
script += `const ${paramName} = defineProps(...);\n`;
script += 内联代码;
```

然后回头用**正则**判断名字冲突、用**字符串替换**改名。

这条路的问题在 round-0452 暴露得很清楚：`topNamesOf(script)` 在 script
已有冲突时 parse 失败 → `occupied` 静默变空 → 所有名字都当新名字 → 冲突全漏过。

**「先拼字符串、再回头加约束」这个做法本身就是坑。**

## 方案 B 的做法

把所有语句先建成 **AST 节点**，在同一个作用域里统一检测/改名，最后一次性 generate：

```js
const bodyStmts = [];
const used = new Set();
const tplRenames = new Map();

const pushStmt = st => {
  const declared = namesOfStmt(st);          // AST 提取（含解构模式）
  const local = new Map();
  for (const nm of declared) {
    if (used.has(nm)) {                       // 冲突
      const nn = uniqueName(nm);              // → 生成唯一名
      local.set(nm, nn);
      used.add(nn);
      tplRenames.set(nm, nn);                 // 记录，供模板同步
    } else {
      used.add(nm);
    }
  }
  if (local.size) renameInStmt(st, local);    // AST 级改名（跳过属性 key / 成员访问）
  bodyStmts.push(st);
};

// props 绑定、文件级内联、setup 内联 —— 全部走 pushStmt
```

最后：

```js
const bodyCode = bodyStmts.map(st => G(st).code).filter(Boolean).join('\n');
const script = importBlock + bodyCode;
```

**关键优势**：冲突检测在**真正生成的 AST 节点**上做，不依赖「重新 parse 已拼接的字符串」——
那个 parse 恰恰会因为冲突而失败。

## 效果（决定性）

| 指标 | round-0452 | round-0453 |
|---|---|---|
| 顶层重复声明 | 10 / 145 | **0 / 145** |
| `vite build` | ❌ 失败 | ✅ **1.14s 通过** |
| 组件数 | 145 | 145 |

`KeyboardHeatmapTool.vue` 与 `KeyboardHeatmapPreview.vue` 单点验证也是零重复。

## 仍未解决：依赖闭包没闭合

批量加载（一次性 import 全部组件）时报 `N is not defined`，但**逐个加载时全部通过**
（用 `import.meta.glob` 懒加载 + try-catch，0 个组件报这个错）。

说明：**是模块初始化阶段**（`<script setup>` 顶层代码求值）出的问题，
而且只出现在极少数组件里 —— 内联进去的代码引用了 `N()`，但 `N` 本身没被一起内联。

典型现场（`PopperContent.vue`）：

```js
}), C([l, d], T, { flush: `sync` }), C(i, D, { flush: `sync` }), N() && k(w), { x: S(f), ...
```

`N()` 出现在逗号表达式里（setup 的副作用逻辑），`N` 定义在 setup 内但没被带出。

**根因**：`collectSetupDeps` 的递归依赖用正则提取（`def.code.match(/[A-Za-z_$][\w$]*/g)`），
内联代码新引入的引用没有被继续追踪 —— 依赖闭包没迭代到不动点。

**修法**：内联后重新分析新引用的名字，能解析就继续内联，直到集合不再增长（标准的
依赖闭包算法）。这是明确的、工作量不大的收尾。

## 结论

| 项 | 状态 |
|---|---|
| 全程 AST 组装 | ✅ 已落地 |
| 顶层重复声明 | ✅ **0 / 145** |
| `vite build` | ✅ 1.14s |
| 依赖闭包闭合 | ❌ 少数组件（`PopperContent` / `ReplayStreet` 等） |
| main bundle 渲染率 | 109（不受影响） |

**方案 B 是对的。** 之前 12 轮里「字符串拼接 + 正则改名」的所有挣扎，
根源都在这个做法本身；换成 AST 组装后问题一次性消失。
