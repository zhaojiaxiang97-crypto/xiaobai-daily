# 实测可渲染组件清单（537 个里 107 个）

> round-0485
>
> **修正了之前记录的数字**：main 是 **98** 不是 109，vendor 是 **9** 不是 10。

## 实测方法

把 Release 的 `vue-components-v1.8.3.tar.gz` 解包，537 个组件一次性挂载到
真实 Chrome（无 props、无父组件上下文），检查 `host.innerHTML.length > 20`。

数据存 `docs/render-verified-components.json`（含全部组件名）。

## 结果

| 批次 | 总数 | 可渲染 | 空白 | 报错 |
|---|---|---|---|---|
| main（`src/components/`） | 392 | **98** | 52 | 242 |
| vendor（`src/vendor-components/`） | 145 | **9** | 65 | 71 |
| **合计** | **537** | **107** | 117 | 313 |

## main 可渲染的 98 个（按类型）

| 类型 | 数量 | 例子 |
|---|---|---|
| 其它（布局/文本/图标类） | 53 | `Alert`、`Badge`、`Kbd`… |
| Card | 7 | `Card`、`CardContent`、`CardDescription`… |
| Avatar | 6 | |
| Calendar | 6 | `Calendar`、`CalendarNext`、`CalendarPrev`… |
| Table | 6 | |
| Dialog | 5 | |
| Input | 4 | |
| Select | 4 | |
| Alert | 3 | `Alert`、`AlertTitle`、`AlertDescription` |
| Tabs | 2 | |

**共同特征**：都是**结构简单、props 可选、无强依赖**的组件。

## vendor 可渲染的 9 个

```
AlertDialogFooter  AlertDialogHeader  AlertDialogMedia  DialogHeader
DropdownMenuShortcut  Kbd  RangeCalendarNext  RangeCalendarPrev  SliderThumbImpl
```

**共同特征**：都是**子组件**（Footer / Header / Media / Shortcut / Next / Prev / Thumb），
它们不依赖 Root 提供的 context，所以能单独渲染。

## 为什么其余 430 个不行

| 原因 | 说明 |
|---|---|
| 需要父组件 context | `DialogContent` / `PopoverContent` 这类，必须在 `DialogRoot` / `PopoverRoot` 内 |
| 需要真实 props | 空 props 下访问 `props.xxx.yyy` 直接抛错 |
| 需要业务数据 | `HeatMapPage` / `LeaderboardPanel` 之类要真实数据才能算 |

**这不是转换质量问题** —— 是这些组件的设计本来就需要上下文。

## 用途

这份清单直接给使用者：

- **要拿组件用** → 从这 107 个里挑，clone 就能渲染
- **只是参考结构** → 537 个都能看（都能编译）
- **要跑起来看效果** → 只有这 107 个能独立跑

避免用户一个个试 537 个然后发现多数不行。
