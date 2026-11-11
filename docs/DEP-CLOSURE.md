# 依赖闭包：种子范围与剩余边界

> round-0454

## 本轮做的两处修复

### 1. `skip` 集与实际 import 不一致

```js
const skip = new Set([...Object.keys(imports), ...]);   // ← 所有 import 名字
```

但**实际生成的 import 只是模板里用到的那些**（`byFrom` 里）。于是：
某符号是 import 的、模板没用到（不会生成 import），却因为被 skip 挡住而不参与内联
→ 悬空引用。

改成从 `byFrom` 提取「实际会生成 import 的 local 名」：

```js
const actuallyImported = new Set();
for (const specs of Object.values(byFrom)) {
  for (const sp of specs) {
    const m = sp.match(/\s+as\s+([A-Za-z_$][\w$]*)$/);
    actuallyImported.add(m ? m[1] : sp);
  }
}
```

### 2. 内联改成迭代到不动点

原来种子只来自模板（`tplIds`），内联代码新引用的符号不会被继续带出。
改成 BFS：

```js
let frontier = new Set(seed);
while (frontier.size && guard++ < 8) {
  const next = new Set();
  for (const nm of frontier) {
    const def = setupDefs.get(nm);
    chosen.set(nm, def);
    for (const r of freeIdsOf(def.code)) {       // AST 提取，不是正则
      if (setupDefs.has(r)) next.add(r);
    }
  }
  frontier = next;
}
```

`freeIdsOf` 用 AST（`scope.hasBinding`）提取自由标识符，比原来的正则准。

## 结果

| 指标 | 值 |
|---|---|
| vendor 组件 | 145 |
| **顶层重复声明** | **0** |
| `vite build` | ✅ 通过 |
| main bundle 渲染率 | 109（不受影响） |

## 仍有一个边界：`N` 这类「render 副作用代码」里的引用

`PopperContent.vue` 的情况：

```js
N = P(() => l.side + (l.align === `center` ? `` : `-${l.align}`))   // 声明在 setup 内
...
C([l, d], T, { flush: `sync` }), C(i, D, { flush: `sync` }), N() && k(w), { x: S(f), ... }
```

**`innerDefs` 确实捕获了 `N`**（实测 18 个声明里含 `N`），收集没问题。

**问题是种子范围**：`N` 出现在 **render 函数的副作用序列**里（`(副作用A, 副作用B, VNode)`），
不在模板文本里 → 不在 `seed` 里 → 不触发内联。

而这段副作用代码本身是被 `convert-component` 保留在模板/script 某处的，
它引用了 `N`，`N` 却没被带出。

**修法**：把种子的来源从「模板标识符」扩到「模板标识符 + 已内联代码的自由标识符」的
**闭包**——迭代逻辑已经写了，但 seed 本身没覆盖到这条路径。

具体：在 push 完所有语句后，对**整段 bodyCode** 再跑一次 `freeIdsOf`，
把剩余未绑定、但在 `setupDefs` 里的名字补进来，循环到不动点。

## 结论

| 项 | 状态 |
|---|---|
| 全程 AST 组装 | ✅（round-0453） |
| 顶层重复声明 | ✅ 0 / 145 |
| `vite build` | ✅ |
| skip 集一致性 | ✅ 已修 |
| 迭代闭包 | ✅ 已实现（但 seed 范围不够） |
| render 副作用代码引用的符号 | ❌ 少数组件（`PopperContent` / `ReplayStreet`） |

**距离全绿只差「把 seed 扩到整段 bodyCode 的自由标识符」这一小步。**
