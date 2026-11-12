# 运行时探针：静态分析拿不到的东西，这里直接读出来

> round-0493
>
> 静态分析到 7% 覆盖率就卡住了。换动态：把 vendor chunk 加载进浏览器，
> **直接调用函数看行为**。

## 为什么动态有效

静态分析只能看代码文本，很多信息被压缩抹掉了。但运行时：

- **返回值的 key 名**是保留的（`{primitiveElement, currentElement}`）
- **错误消息**里带 context 名（`Injection Symbol(RovingFocusGroupContext) not found`）
- **对象的隐藏字段**暴露类型（`{dep, __v_isRef, _value}` → ref）

**这些在压缩后的源码里看不出来，但运行时一调就有。**

## 实测结果（3 个模块，97 个导出）

### `Switch.js`（89 个导出）

| 导出 | 探针结果 | 直接判定的身份 |
|---|---|---|
| `$` | `object{dep,__v_isRef,__v_isShallow,_rawValue,_value}` | **ref / shallowRef** |
| `B` | `object{fn,setter,_value,dep,__v_isRef}` | **computed** |
| `H` | `object{fn,setter,_value,dep,__v_isRef}` | **computed** |
| `A` | `object{primitiveElement,currentElement}` | **usePrimitiveElement** |
| `F` | `object{state,dispatch}` | 某 reducer / useState |
| `C` | `string:unchecked` | checkbox 状态常量 |
| `D` | `boolean:false` | 布尔常量 |
| `At`/`Ct`/`Dt`/`Et` | `throw: Cannot destructure property 'slots'` | 函数式组件（lucide） |

### `Collection.js`（3 个导出）

| 导出 | 结果 | 身份 |
|---|---|---|
| `t` | `object{getItems,reactiveItems,itemMapSize,CollectionSlot,CollectionProvider}` | **useCollection** ✓ |

**和静态匹配的结论一致**（上轮 `v` = `useCollection`），**双方法互证**。

### `RovingFocusGroup.js`（5 个导出）

| 导出 | 结果 | 身份 |
|---|---|---|
| `n` | `throw: Injection Symbol(RovingFocusGroupContext) not found` | **useRovingFocusGroupContext** |

## 关键判据表

从这批数据能总结出**运行时判据**：

| 探针现象 | 判定 |
|---|---|
| 返回对象含 `__v_isRef` + `_value` + `dep` | ref 系（ref/shallowRef/computed） |
| 返回对象含 `fn` + `setter` + `_value` | **computed** |
| 返回对象含 `_rawValue` + `__v_isShallow` | **shallowRef** |
| 返回对象含 `primitiveElement` | **usePrimitiveElement** |
| 返回对象含 `getItems` / `itemMapSize` | **useCollection** |
| 抛 `Injection Symbol(XxxContext) not found` | **useXxxContext** |
| 抛 `Cannot destructure property 'slots'` | 函数式组件（非 hook） |
| 抛 `MUST_BE_CALL_SETUP_TOP` | **某种 hook**（需 setup 上下文） |

## 为什么这条路比静态强

| | 静态（字符串匹配） | **动态（运行时探针）** |
|---|---|---|
| 覆盖率 | 24/343 = 7% | 每个导出都能探到行为 |
| 是否需要独特字符串 | 是（多数没有） | **否** |
| 依赖版本匹配 | 是（应用用的版本 ≠ 2.11.0） | **否** |
| 能否确定类型 | 只能猜 | **返回值结构直接给** |

**动态不依赖「源码长得像」，只依赖「跑起来什么样」。**

## 下一步（可批量化的路）

1. 对 15 个 vendor 文件逐个做探针（有些 import 会失败，跳过）
2. 按判据表自动标注类型（ref/computed/hook/常量/组件）
3. 对 hook 类，进一步用「注入假 context 再调用」拿到返回值结构
4. 把标注写进生成的 `.vue` 作为注释（**不改名，避免猜错误导**）

**最后一条是关键**：动态能确定「类型」和「用途范围」，但**给不出准确名字**
（`usePrimitiveElement` 这种是从返回值 key 推的，可能不准）。所以**用注释标注比改名安全**。
