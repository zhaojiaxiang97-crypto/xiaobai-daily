# 59 个 `Cannot destructure property 'slots'` 的追查（阶段性）

> round-0466

## 拿到完整名单

59 个组件（前 12）：

```
AiModelSettings, AppLockOverlay, AppUsagePage, AutoDailyReportSettings,
AutoReportTaskDialog, CreditCampaignCard, DataClearDialog,
DataManagementSettingsSection, FriendManagerDialog, HeatMapBadgeShareDialog,
HeatMapPage, HeatMapYearHighlightsPanel, ...
```

完整名单已存 `tools/vue-decompiler/slots-error-components.txt`。

## 排除掉的假设

### 假设 1：图标组件本身坏了 —— **排除**

`h(L.n, { size: 16 })`（`L.n` = `l('pin', [...])` 工厂产物）输出完整 `<svg>`，无错误。

### 假设 2：`S_r` 名字冲突导致工厂被当组件 —— **排除**

实测三种导出的行为：

| 导出 | 行为 |
|---|---|
| `n`（工厂产物） | 完整 `<svg>` ✅ |
| **`r`（工厂本身）** | **输出函数源码字符串**，Vue 当文本渲染，**不报错** |
| `t`（另一产物） | `<svg>` ✅ |

**工厂被当组件不会崩**，只是渲染成源码文本。所以 `S_r` 冲突解释不了
`Cannot destructure property 'slots'`。

## 剩下的唯一可能

**单测正常、嵌套崩溃** —— 差异只在「是否嵌套在别的组件树里」。

堆栈指向 `lucide-icons.js:50`（`l` 工厂内层箭头 `(props, { slots, attrs }) => ...`），
说明那个内层箭头确实被执行了、且 ctx 是 undefined。

Vue 3 只有在**把它当函数式组件调用**时才会传 `(props, ctx)`。ctx 为 undefined
意味着调用方不是 Vue 的组件渲染流程 —— 可能是被**直接调用**了：

```js
// 如果某处把工厂产物当普通函数调：
someIcon(props)        // → ctx 缺失 → 崩
// 而不是：
h(someIcon, props)     // → Vue 走组件流程 → ctx 有值
```

**下一步**：在 59 个组件里搜「图标组件被直接调用」的形态 ——
模板里的 `{{ Icon() }}`、或 script 里的 `Icon(...)` 直接调用。

## 结论

| 项 | 状态 |
|---|---|
| 59 个名单 | ✅ 已导出到文件 |
| 图标组件本身 | ✅ 单测正常（已排除） |
| `S_r` 冲突 | ✅ 已排除（工厂当组件只渲染成文本） |
| 确切根因 | ❌ 还需查「直接调用」形态 |
| 可回收空间 | 98 → 157（+60%） |
