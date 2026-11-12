# 符号还原：30 条高置信映射（只跑了 ui/ 的 15 个文件）

> round-0481

## 方法（比 round-0480 的指纹法更准）

**核心：独特字符串字面量精确匹配。**

- 通用词（`none`/`string`/`object`/`auto`/`hidden`...）过滤掉，它们没有区分度
- 剩下来的（`[data-reka-collection-item]`、`data-reka-focus-guard`、
  `Injection \`...\` not found`）是**跨版本稳定的唯一标识**
- 对每个 vendor 函数，在 reka-ui 全 dist（567 个文件）里找**交集最大**的那个

**为什么比指纹法好**：

| 方法 | 高置信率 |
|---|---|
| Jaccard 指纹（round-0480） | 9/343 = 2.6% |
| **独特字符串交集（本轮）** | **30/98 = 31%** |

（分母变小是因为加了「没字符串就跳过」的过滤 —— 那 245 个没独特字符串的函数
本来就没法用这个方法还原。）

## 结果：30 条高置信映射

最漂亮的几个：

| 短名 | 还原为 | 命中 | 依据 |
|---|---|---|---|
| `sr` | `useKbd` | 15/15 | `ArrowLeft` / `ArrowRight` 等全套键盘键名 |
| `yo` | `usePresence` | 15/15 | `unmounted` / `unmountSuspended` |
| `J` | `useArrowNavigation` | 7/7 | `[data-reka-collection-item]` |
| `vi` | `createContext` | 3/3 | `Injection \`...\` not found. Component must be used within` |
| `v` | `Collection` | 3/3 | `CollectionProvider` / `CollectionSlot` |
| `mo` | `useId` | 2/2 | 字符串里直接有 `reka` / `useId` |
| `W` | `useGraceArea` | 4/4 | `[data-grace-area-trigger]` |
| `V` | `useFocusGuards` | 2/2 | `data-reka-focus-guard` |
| `g` | `useSize` | 2/2 | `borderBoxSize` / `border-box` |
| `mr` | `useCalendar` | 2/2 | `short` / `Event Date` |

完整 30 条存 `tools/vue-decompiler/symbol-restore-map.json`。

## 还没做的

1. **只跑了 `src/renderer/ui/`（15 个文件）**
   —— 还有 `src/renderer/chunks/`（99 个文件）没跑，那里函数更多
2. **映射还没应用到生成器**
   —— 现在只是「查出来是什么」，还没让生成的 `.vue` 真的用上这些名字
3. **同名不同物要小心**
   —— `v` 在 `Collection.js` 里是 `Collection`，但在 `RovingFocusGroup.js` 里是
   `ColorAreaArea`。**映射必须按「文件 + 短名」而不是全局短名**，
   否则会犯和 shared 补位一样的错

第 3 点是最关键的：**这个映射表必须带文件作用域**。

## 下一步

1. 把映射改成 `(文件)::(短名) → 真名` 的形式（同 `build-component-map.cjs` 的做法）
2. 扩展到 `chunks/` 的 99 个文件
3. 应用到 `convert-component.cjs` / `gen-main.cjs` 的命名
4. 验证生成的 `.vue` 里短名被替换成真名，且不影响构建

## 判断

**这是七轮以来第一个有实际正向产出方向。**

- 不依赖运行时 → 不会像 setup 内联那样反复失败
- 30 条已经可用 → 每个都能让生成的代码更可读
- 扩展性明确 → 换更多文件、加更多参考库（lucide / vue-i18n）就能继续涨
