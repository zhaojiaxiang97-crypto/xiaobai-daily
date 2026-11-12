# setup 内联第二次尝试：三条修法都做了，OK 仍是 42 → 已回退

> round-0473
>
> 承接 round-0472（那次 slots 归零但 OK 98 → 42）。这轮按三条修法补齐，
> **结果 OK 还是 42**，所以整体回退到基线。

## 三条修法都实现了

### 1. props 参数无条件绑定

```js
// 之前：只在「模板用到」时才生成
if (propsArg && (usedInTpl.has(propsArg) || ...)) { pushCode(`const ${propsArg} = defineProps(...)`) }
// 现在：只要 setup 有参数名就生成（内联代码会引用）
if (propsArg) { pushCode(`const ${propsArg} = defineProps(${propsCode});`) }
```

### 2. `sharedSpecs` 扫描范围加上内联代码

```js
const inlineText = bodyStmts.map(st => G(st).code).join('\n');
const scanText = tpl + '\n' + (propsCode || '') + '\n' + inlineText;
```

→ 内联代码引用的模块级辅助函数（`Jr()` / `E()`）也会被 import。

### 3. 递归带出 + 排除被赋值目标

内联代码里被赋值的目标（`X =` / `X++` / **`X ||=`**）不能做成 import
（ESM import 只读，rollup 报 `Cannot assign to import`）。

**这一条修掉了一个真实构建错误**：`TextNode.vue` 的
`a2e ||= uZ().then(...)` —— 逻辑赋值 `||=` 一开始没匹配到。

## 结果

| 指标 | 基线 | round-0472 | **本轮** |
|---|---|---|---|
| `Cannot destructure property 'slots'` | 59 | 0 | **0** |
| OK | **98** | 42 | **42** |
| EMPTY | 52 | 4 | 18 |
| ERR | 242 | 346 | 332 |
| `vite build` | ✅ | ✅ | ✅ 1.94s |

**三条修法没能让 OK 回到 98。**

## 新错误分布

| 错误 | 数量 |
|---|---|
| `reading 'value'` | 68 |
| `reading 'as'` | 15 |
| `reading 'id'` | 15 |
| **`$setup.i is not a function`** | **13** |
| **`$setup.t is not a function`** | **12** |

`$setup.X` 是 Vue 对「模板引用了 setup 没暴露的名字」的内部表示。

**说明**：内联的 setup 声明没有全部暴露给模板，或者模板引用的名字（如 `i` / `t`）
在内联声明里被改名了（`tplRenames`），但模板没同步到。

## 为什么回退

**主分支不能留「OK 98 → 42」的版本**，尽管 slots 那 59 个确实修好了
（它们在基线里也是崩的，现在只是换了个错误）。

已 `git revert 3137b3c`，回到基线。

## 留在文档里的资产

1. **AST 组装机制的完整实现**（`pushStmt` + `renameHistory` + 回溯改名 + 路径重写）
   —— 下轮可以直接复用
2. **四个真实 bug 的修法**：多 declarator 去重、`../` 路径、逻辑赋值 `||=`、预占 import 名
3. **明确的剩余问题**：`$setup.X` 未暴露

## 下一步（若要继续）

**`$setup.X` 是明确的下一步**：内联声明后，模板引用的名字要能对上。
可能的原因：

1. 冲突改名（`tplRenames`）只改了模板里的一部分引用
2. 有些声明来自 `ObjectMethod` 形态的 setup，`takeBody` 没覆盖
3. 模板引用的名字实际不在 setup 顶层（在嵌套块里）

**验证方法**：对 `$setup.i` 这类错误，把生成出来的 .vue 的 script 和 template
摆在一起看，确认 `i` 在 script 里存不存在、是不是被改了名。
