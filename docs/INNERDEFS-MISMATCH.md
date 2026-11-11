# 降级与兜底都已就位，但暴露更底层的问题：`innerDefs` 的 code 映射错乱

> round-0455

## 按计划完成的两项

### 1. `freeIdsOf` 加降级路径

```js
let nodes = parseStmts(codeText);
if (!nodes.length) {
  // 降级 1：包进函数体 —— 裸 `return ...` 在 module 顶层会报
  //   "'return' outside of function"，之前这里静默返回空集
  nodes = parseStmts('function __wrap(){' + codeText + '\n}');
  if (nodes.length) { ...提取引用... return out; }
  // 降级 2：正则兜底（宁可多收不可漏收）
  for (const m of codeText.matchAll(...)) out.add(m[1]);
  return out;
}
```

**已实测确认**：`return C(...), N() && k(w), {...}` 在 `sourceType:'module'` 下直接抛
`'return' outside of function` —— 这是原实现静默丢符号的直接原因。

### 2. 兜底扫描（闭包收敛到不动点）

内联主循环后，对**已 push 的全部语句**扫自由标识符，把还没绑定但在 `setupDefs`
里的名字补齐：

```js
let prev = -1;
while (chosen.size !== prev && g2++ < 8) {
  prev = chosen.size;
  const bodyText = bodyStmts.map(st => G(st).code).join('\n');
  for (const nm of freeIdsOf(bodyText)) {
    if (chosen.has(nm) || skip.has(nm)) continue;
    const def = setupDefs.get(nm);
    if (def) chosen.set(nm, def);
  }
}
```

**诊断确认它生效了**：

```
[DBG] PopperContent | setupDefs有N: true | skip有N: false
      | chosen有N: true | bodyText含N: true | bodyStmts: 12
```

`N` **已经进入 `chosen`**。

## 但暴露了更底层的问题

`chosen.get('N')` 的 code 实际是：

```js
let l = r,
    u = o,
    d = H(),
    {
      forwardRef: m,
      currentElement: g
    } = e(
```

**这条声明里根本没有 `N`，而且被截断了**（`= e(` 后面没有闭合）。

### 这说明什么

`innerDefs` 的「名字 → code」映射是错乱的：

- round-0451 的设计是「一条声明里所有绑定名都映射到**整条声明语句**」
- 多个 declarator 共用一条 `let a = ..., b = ..., {c} = ...` 时，每个名字都指向同一条
- **但如果 `bindingNames` 对某个模式识别错，或者 `decl.node.start/end` 的边界不对，
  就会把 `N` 映射到一条不含 `N` 的声明上**

于是内联时 `pushCode` 拿到的是错误代码 → 生成的 script 里既没有 `N` 的定义、
也可能引入重复声明（这条 `let l = r, u = o, ...` 与已有的冲突）。

### 为什么之前没暴露

前几轮只检查「顶层重复声明」（当前是 0），没检查「内联进来的是不是该内联的代码」。
`freeIdsOf` 的降级和兜底扫描让更多名字进入 `chosen`，反而把这个映射错乱放大了：
以前 `N` 根本不进 `chosen`（所以只是悬空引用），现在进了、但带的是错误代码。

## 结论

| 项 | 状态 |
|---|---|
| `freeIdsOf` 降级 | ✅ 已加（根因确认：裸 return 片段 parse 失败） |
| 兜底扫描（闭包到不动点） | ✅ 已加（诊断确认 `N` 进入 chosen） |
| 顶层重复声明 | 0（未退化） |
| `vite build` | ✅ |
| **`innerDefs` 名字→code 映射** | ❌ **错乱**（`N` 指向不含 `N` 的截断声明） |
| main bundle 渲染率 | 109（不受影响） |

## 下一步（定位这一步，而不是继续打补丁）

1. 在 `innerDefs` 收集处加断言：**每个映射进去的名字，必须真的出现在它对应的
   `code` 文本里**（`new RegExp('\\b' + name + '\\b').test(code)`），不满足就打印
   组件名 + 名字 + code 前 100 字，先看清错乱的比例和形态
2. 查 `bindingNames` 对「对象模式里嵌套解构 / 默认值 / 计算键」的边界
3. 查 `decl.node.start/end` 在跨行、含注释、含嵌套模式时是否准确

**这不是继续加兜底能解决的** —— 兜底已经把「该带的名字」找对了，
错的是「找到之后取错了代码」。
