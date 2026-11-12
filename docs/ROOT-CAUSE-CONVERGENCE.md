# 三轮尝试收敛到同一个根因：shared 补位不可靠

> round-0475
>
> round-0472 → 0473 → 0475，三次修 setup 内联，都没能让 OK 超过基线的 98。
> 这轮查清了为什么。

## 本轮的修复（确实有效，但不够）

把多 declarator 的 `VariableDeclaration` 拆成单条：

```js
// 之前（Vue 识别不了逗号后的解构别名）
let n_0 = e, r = t, { t: i } = it(), ...

// 现在
let n_0 = e;
let r = t;
let { t: i } = it();      // ← 独立了
```

**验证**：`i` 确实是顶层独立声明了。

## 但 `$setup.i` 仍然报错

`$setup.i is not a function` 这句话的意思是：**`$setup.i` 存在，但值是 undefined**。

如果 `i` 完全没暴露，报错会是 `$setup.i === undefined` 之类；说「is not a function」
说明 `i` 这个槽位有东西但不可调用。

**关键推论：`it()` 本身返回的对象里没有 `t` 字段** —— 即 `it` 不是
`useI18n` 之类的真正来源。

而 `it` 是：`import { S_it as it } from '../shared.js'`。

**又是 shared 补位。**

## 三轮的反向验证

| 轮次 | 尝试 | 结果 |
|---|---|---|
| 0472 | setup 内联（基础） | slots 59→0，但 OK 98→42 |
| 0473 | + props 无条件绑定 + 扫描范围 + 排除赋值 | OK 仍 42 |
| 0475 | + 多 declarator 拆分 | OK 仍 42，`$setup` 61 个 |

**三次都失败在同一个地方**：内联进来的代码引用的**外部符号**（`it`、`S_l` 等）
仍然是 shared 补位来的错误符号。

## 根因收敛

```
模板引用短名
  ├─ 如果是组件内声明 → setup 内联（已实现，有效）
  └─ 如果是外部符号   → shared 补位（❌ 不可靠）
                          ↑
                    这就是三轮都没解决的部分
```

round-0471 已经用浏览器实测证明过：`S_l` = `Za`（工具函数），不是 `SelectItem`
需要的组件。**而 `S_<原名>` 之所以错，是因为 shared.js 只能保留 main.js
顶层那一个同名 import，不同 chunk 的同名符号根本无法区分。**

## 结论

**setup 内联是必要的，但不充分。**

只要 shared 补位还在，内联进来的代码总会拿到错误的同名符号。
无论怎么补内联规则，OK 都回不到 98 以上。

**唯一出路**：**让组件从它自己的 chunk 拿符号** ——
即把 vendor chunk 也转换成 `.vue`，让 import 指向转换后的模块，
而不是靠 main.js 顶层的同名 import 猜。

这正是 round-0457 之后一直说的方向，也是这个项目真正的结构性缺口。
