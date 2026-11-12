# 组件级符号说明：73 个组件带上了注释，渲染率不变

> round-0496
>
> 上轮给 `shared.js` 加了 90 条符号身份注释。但这轮把它带到**组件文件**里
> —— 那才是用户真正会读的地方。

## 做了什么

在每个组件的 `shared.js` import 上方加一行符号说明：

```js
// [符号说明] u=useConfigProviderContext, D=useConfigProviderContext
import { S_u as u, S_D as D, S_x as x } from '../shared.js';
```

**73 个组件**有这行注释（那些实际 import 了已知符号的）。

## 两个 bug（都修了）

### 1. `labelOf` 定义在使用之后

```
ReferenceError: Cannot access 'labelOf' before initialization
```

定义放在 `crossImports` 附近（模块顶层靠后），而 Pass2 的循环在它之前执行。
**修复**：把定义移到 Pass2 之前。

### 2. 注释列出了全部已知符号，而不是组件实际用的

第一版效果：

```js
// [符号说明] u=useConfigProviderContext, f=useConfigProviderContext,
//            D=useConfigProviderContext, Cn=usePopoverRootContext, ...（几十个）
```

**原因**：遍历了 `exportSet`（全部符号），应该遍历 `sharedSpecs`（该组件 import 的）。

**修复**：从 `S_Za as Za` 这种 spec 里提取 `orig`，再查 `crossByLocal`。

修完后 73 个组件、内容精确。

## 验证

| 项 | 结果 |
|---|---|
| `vite build` | ✅ 2.00s |
| **392 个组件渲染** | ✅ **OK=98，与基线完全一致** |
| 有符号说明的组件 | **73 个** |

## 累计成果

| 位置 | 注释 |
|---|---|
| `shared.js` 的跨 chunk import | 90 条（`[已知]` / `[推断]`） |
| 组件的 `shared.js` import | 73 条（`[符号说明]`） |

**两处都零风险**（只加注释），两处都验证了渲染率不变。

## 为什么这套做法对

之前七轮改生成器都失败，因为它们**改语义**（变量作用域、导入来源）。
这轮和上轮只**加注释**——注释不参与执行，改错了也只影响可读性，不影响正确性。

**这是「提升可读性」的正确姿势**：只增不改。

## 下一步

1. `vue/` 目录里的组件还是旧的（没注释），重新生成即可带上
2. 可以把「不确定但已推断」的类型（`computed` / `ref` / `指令定义`）也加进去
3. **找更多参考库**（vue-i18n 官方 dist、lucide）继续扩充 `symbol-types.json`
