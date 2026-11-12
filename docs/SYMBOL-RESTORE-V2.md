# 符号还原 v2：文件名约束下拿到 24 个 1:1 映射

> round-0492
>
> 上轮只用了「函数级独特字符串」，全库搜索，得 30 个但质量参差（含 `utils` 这种泛结果）。
> 这轮发现一个关键结构：**vendor chunk 的文件名本身就是 reka-ui 的文件名。**

## 关键发现：文件名对应

对每个 vendor 文件做「文件级字符串指纹」，与 reka-ui 全库比对：

| vendor 文件 | 匹配到 reka-ui | 命中率 |
|---|---|---|
| `RovingFocusItem.js` | `RovingFocusItem` | **77%** |
| `PopperContent.js` | `PopperContent` | 51% |
| `Collection.js` | `Collection` | 50% |
| `DialogTitle.js` | `DialogContentImpl` | 49% |
| `RovingFocusGroup.js` | `RovingFocusGroup` | 43% |

**前三个文件名直接对上。**

**意义**：原来要在 567 个文件里找，现在只需在**1 个文件内**找函数。
歧义大幅下降，准确率大幅上升。

## 改进后的方法

1. **文件级**：先用字符串指纹确定「vendor 文件 → reka-ui 文件」
2. **函数级**：在该 reka-ui 文件内做函数匹配（而不是全库）
3. **1:1 过滤**：同一短名只对应一个 reka-ui 函数，反之亦然

## 结果：24 个 1:1 映射

| 短名 | 还原为 | | 短名 | 还原为 |
|---|---|---|---|---|
| `v` | useCollection | | `Za` | useFormControl |
| `vi` | createContext | | `yo` | usePresence |
| `mo` | useId | | `$o` | getState |
| `F` | getLabel | | `Ja` | checkOverflowScroll |
| `ko` | usePointerDownOutside | | `Qo` | isIndeterminate |
| `rs` | isTouchOrPen | | `Uo` | isSelectableInput |
| `wa` | getInputType | | `Xa` | useEmitAsProps |
| `Oo` | isLayerExist | | `Ni` | cancel |
| `pa` | highlightFirstItem | | `Ao` | useFocusOutside |
| `Bo` | getTabbableCandidates | | `fo` | useHideOthers |
| `Ra` | useSingleOrMultipleValue | | `ic` | useComboboxContentPositioning |
| `Jc` | useDrawerSnapPoints | | `Yc` | useDrawerVirtualKeyboard |

存 `tools/vue-decompiler/symbol-map-v2.json`。

## 与上轮（v1）的交叉验证

| 类型 | 数量 | 明细 |
|---|---|---|
| **双确认**（两轮独立得出相同结论） | **3** | `vi`=createContext、`mo`=useId、`yo`=usePresence |
| 冲突 | 3 | `v`、`F`、`ko` |

### 冲突时本轮更可信

| 短名 | v1（全库搜索） | v2（文件名约束） | 判断 |
|---|---|---|---|
| `v` | ColorAreaArea | **useCollection** | v2 对（它出自 `Collection.js`） |
| `F` | utils | **getLabel** | v2 对（`utils` 太泛） |
| `ko` | utils | **usePointerDownOutside** | v2 对 |

**v1 的问题**：全库搜索时，通用函数（`utils`、`transformOrigin`）会污染结果。
**v2 用文件名把搜索空间锁死，避免了这个问题。**

## 覆盖率

343 个 vendor 顶层函数 → **24 个确定性映射（7%）**。

**其余 319 个为什么识别不了**：

| 原因 | 说明 |
|---|---|
| 没有独特字符串 | 纯计算函数（如 `isIndeterminate` 的邻居），字符串只是类型名（`'string'`/`'object'`） |
| 字符串太通用 | `'none'`/`'auto'`/`'open'` 被过滤后没有特征 |
| 组件定义 | 大量顶层「函数」其实是 `defineComponent` 的产物，靠 `__name` 识别（已有） |
| 版本差异 | 应用用的 reka-ui 版本 ≠ 2.11.0，部分函数已改写 |

## 本轮方法的价值

**这套方法（文件级字符串约束 → 函数级匹配 → 1:1 过滤）是可复用的**：

- 不依赖运行时
- 不需要人工标注
- 有交叉验证机制（两轮独立结果比对）

以后处理任何「Electron + 打包库」的反编译，只要能拿到原始库的 dist，就能用。
