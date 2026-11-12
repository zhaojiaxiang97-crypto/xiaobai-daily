# setup 内联落地：slots 错误 59 → 0，但净渲染率下降

> round-0472
>
> **方向对，但内联不完整 —— 修好一类，引入两类。**

## 做了什么

把 `gen-main.cjs` 的 Pass2 从「字符串拼接」改成 **AST 组装**，
并内联 setup 函数体的顶层声明。照搬 `lib-conv.cjs` 的成熟机制：

- `pushStmt`：AST 提取声明名（含解构）→ 冲突改名 → 回溯同步已 push 的语句
- `renameHistory`：累积改名，新语句先按它切换引用
- 预占 `VUE_APIS` / 兄弟组件 import 名，避免 setup 声明撞名
- 内联代码里的相对路径重写（`./X.js` / `../X.js` → `../vendor/...`）

## 结果

| 指标 | 修前 | 修后 |
|---|---|---|
| **`Cannot destructure property 'slots'`** | **59** | **0** ✅ |
| OK | 98 | **42** |
| EMPTY | 52 | 4 |
| ERR | 242 | 346 |
| 顶层重复声明 | 0 | 0 |
| `vite build` | ✅ | ✅ 1.79s |

**slots 那 59 个彻底修好了，但整体渲染率从 98 掉到 42。**

## 新引入的两类错误

| 错误 | 数量 | 例 |
|---|---|---|
| `e is not defined` | **59** | `Badge` / `BaseSeparator` / `CalendarGrid` |
| `X is not a function` | **58** | `AgentSessionImportSettings` / `AiModelSettings` |
| `reading 'value'` | 67 | （之前就有） |
| `reading 'id'` / `'as'` / `'type'` | 15 / 12 / 10 | （之前就有） |

### 为什么

内联 setup 代码时，**只带了 `VariableDeclaration` / `FunctionDeclaration`**，
但 setup 体里引用的东西还有三类没带：

1. **props 参数 `e`** —— `setup(e)` 的 `e`，在 `<script setup>` 里需要映射到
   `const e = defineProps(...)`。当前只在「模板用到 `e`」时才生成 props 绑定，
   内联代码引用 `e` 时没有
2. **模块级辅助函数**（如 `Jr()` / `E()`）—— 应该从 shared.js import，
   但 `occupied` 里预占了太多名字，或者 sharedSpecs 的扫描范围没覆盖内联代码
3. **嵌套函数里的局部声明** —— 只取 setup 的直接语句，嵌套块里的不带

## 结论

**方向是对的**（slots 归零证明了），但**内联不完整**。

修法（下一步，明确三条）：

1. **props 参数无条件绑定**：只要 setup 有参数名，就生成 `const e = defineProps(...)`，
   不管模板用不用（内联代码会用）
2. **sharedSpecs 扫描范围加上内联代码**：现在只扫 `tpl + propsCode`，
   要加上 `bodyStmts` 序列化后的文本
3. **递归带出内联代码的引用**：类似 `lib-conv` 的迭代闭包，把内联代码引用的
   模块级函数也带进来

## 当前状态

改动**已保留**（因为 slots 归零是真实修复），但**净渲染率是 42 而不是 98**。

如果继续修上面三条，预期能超过 98（因为那 59 个 slots 组件的底层问题已解决）。
