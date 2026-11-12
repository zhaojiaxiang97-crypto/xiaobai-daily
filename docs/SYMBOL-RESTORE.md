# 符号还原：能做到什么、做不到什么

> 合并自两份过程文档。代码在 `tools/vue-decompiler/restore-symbols.cjs`，
> 映射表在 `tools/vue-decompiler/symbol-restore-map.json`。

## 能做到：业务函数名（30 条高置信）

reka-ui 的 dist **未压缩**（`npm pack reka-ui` 解包后 `package/dist/**` 每文件一函数，
带真名和注释），所以可以用「独特字符串字面量」反查：

- 过滤通用词（`none`/`string`/`object`/`auto`/`hidden`…）
- 剩下的（`[data-reka-collection-item]`、`data-reka-focus-guard`、
  ``Injection `...` not found``）是跨版本稳定的唯一标识
- 对每个 vendor 函数，在 reka-ui 全 dist（567 文件）里找交集最大的

**结果**：30 条高置信映射。最漂亮的几个：

| 短名 | 还原为 | 命中 | 依据 |
|---|---|---|---|
| `sr` | `useKbd` | 15/15 | 全套键盘键名 |
| `yo` | `usePresence` | 15/15 | `unmounted`/`unmountSuspended` |
| `J` | `useArrowNavigation` | 7/7 | `[data-reka-collection-item]` |
| `vi` | `createContext` | 3/3 | ``Injection `...` not found`` |
| `v` | `Collection` | 3/3 | `CollectionProvider`/`CollectionSlot` |
| `mo` | `useId` | 2/2 | 字符串里直接有 `reka`/`useId` |
| `W` | `useGraceArea` | 4/4 | `[data-grace-area-trigger]` |
| `V` | `useFocusGuards` | 2/2 | `data-reka-focus-guard` |

**效果**：

```js
// 前
function Za(e) { return B(() => !A(e) || !!Z(e)?.closest(`form`)); }
// 后（Za + B/A/Z 都还原）
function useFormControl(e) { return computed(() => !unref(e) || !!unref(e)?.closest(`form`)); }
```

## 做不到：局部变量名（信息已丢失）

统计 `main.js` 里短名（≤2 字符）的引用频次：

| 排名 | 短名 | 次数 |
|---|---|---|
| 1-7 | `e`/`t`/`n`/`r`/`i`/`a`/`o` | 20718 / 13979 / 9321 / 7280 / 5662 / 4299 / 3665 |
| 8 | `H` | 3043 |

前 25 个覆盖 **74.9%**，前 100 个覆盖 85.1%。

**但 `e`/`t`/`n`/`r`/`i`/`a`/`o` 是局部变量和函数参数名**
—— 压缩时语义信息**已丢失、不可逆**。

唯一已知的全局符号是 `H` = `withCtx`（从 slot 定义 `{ default: H(() => [...]) }` 确认）。

**所以符号还原只能做全局符号，局部变量名没有还原的可能。**

## 关键风险

`v` 在 `Collection.js` 里是 `Collection`，在 `RovingFocusGroup.js` 里是 `ColorAreaArea`。

**映射必须按「文件 + 短名」而不是全局短名**，否则会犯和 shared 补位一样的错
（`S_l` 曾把 `SelectItem` 需要的组件接成了 `Za` 工具函数）。
