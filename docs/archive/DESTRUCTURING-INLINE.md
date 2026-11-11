# 解构绑定内联：缺口已补，改名机制仍需重做

> round-0451

## 补上的关键缺口：解构声明

`lib-conv.cjs` 收集组件内定义时，原来只认普通变量声明：

```js
if (!t.isIdentifier(d.node.id) || !d.node.init) return;   // 解构被整条跳过
```

实际代码里大量符号来自**解构**：

```js
let {
  controlsDisabled: C,
  keyboardHeatmapState: N,     // ← 模板里 :status-text="...N?.running..."
  ...
} = O()
```

**这是 11 个组件缺符号的主因**（抽样 5 个里 4 个有解构声明）。

### 实现

新增 `bindingNames(node)`，递归处理 `ObjectPattern` / `ArrayPattern` /
`AssignmentPattern` / `RestElement`，提取所有绑定名；并且**按整条声明语句内联**
（解构右侧的 `O()` 必须一起带上，否则内联出来的只是空洞别名）。

### 效果

`KeyboardHeatmapTool.vue`：

| 指标 | 修复前 | 修复后 |
|---|---|---|
| `keyboardHeatmapState: N` 出现次数 | 0 | **1**（去重后） |
| 内联项 | 2（不含解构） | 14 → 去重后 1 条语句 |

去重逻辑：同一条解构语句会被它内多个别名引用，按 `code` 去重。

## 顺带修的两处改名边界

1. **解构里的名字提取**：原 `nameOf()` 用 `^(?:const|let|var)\s+(\w+)` 匹配，
   对 `let { a: t }` 返回 null → 不改名 → 冲突。改成 `declaredNames()` 同时处理解构模式。
2. **props 参数必进占用集**：`c.setupParam` / `c.alias` 一定是已占用名
   （script 里已有 `const X = defineProps(...)`）。修完 `SliderVertical.vue` 的
   `let t` 与 props 别名 `t` 冲突消失。

## 仍未解决：嵌套作用域的重复声明

静态检查（只看 script 顶层）显示 145 个组件里只剩 2 个有问题，
但 `vite build` 报出更多：

```
Identifier 'S' has already been declared. (620:17)
Identifier 'C' has already been declared. (47:31)
Identifier 't' has already been declared. (61:10)
```

**这些是嵌套层级的冲突**（模板内的事件处理函数、内联代码内部的子作用域），
而我的冲突检测是**正则扫顶层**，覆盖不到。

## 结论

| 项 | 状态 |
|---|---|
| 解构绑定收集 | ✅ 已实现（11 个组件的缺符号主因） |
| 整条声明内联 | ✅ 已实现（带右侧依赖） |
| 同一语句去重 | ✅ 已实现 |
| props 参数进占用集 | ✅ 已实现 |
| **嵌套作用域冲突检测** | ❌ 正则不可靠，需改用真正的 scope 分析 |

## 下一步：改用 scope 分析而非正则

冲突判定不应靠正则扫字符串，而应：

1. 内联前，把「即将生成的 script」重新 parse 一次
2. 用 Babel 建立作用域，检查要插入的名字是否已在任一可达作用域里绑定
3. 冲突则改名（并同步模板引用，模板也要 parse 成 AST 再改，而不是正则替换）

**这正是 `gen-main.cjs` 的做法**（全程 AST），`lib-conv.cjs` 的内联段还是
字符串拼接 + 正则，这是它脆弱的根本原因。

## 现状

| 指标 | 值 |
|---|---|
| vendor 组件生成 | 145 |
| 不同模板 | 121 |
| 解构已内联 | 是（部分组件） |
| 构建 | ❌ 仍有重复声明（嵌套层） |
| main bundle 渲染率 | 109（不受影响） |
