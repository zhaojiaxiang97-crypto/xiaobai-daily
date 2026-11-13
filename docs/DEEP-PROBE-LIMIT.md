# 深层探针：setup 上下文解锁了一部分，但 provide 假 context 走不通

> round-0499
>
> 目标：让需要 context 的 hook 也能探出返回值结构。

## 做了什么

在**真实组件的 setup 里**调用 hook —— 这能通过 `MUST_BE_CALL_SETUP_TOP` 检查
（有 `currentInstance`）。

```js
const app = createApp({
  setup() {
    try { captured = hook(); } catch (e) { err = e.message; }
    return () => null;
  },
});
app.mount(host);   // 触发 setup
```

## 结果：一半成功

| hook | 结果 |
|---|---|
| `Collection::r` | **`object{fn,setter,_value,dep,__v_isRef,deps}`** ← 是 computed |
| `Switch::I` | `string` |
| `RovingFocusGroup::n` | 抛 `Injection Symbol(RovingFocusGroupContext) not found` |
| `DialogTitle::s` | 抛 `Injection Symbol(DialogRootContext) not found` |
| `PopoverTrigger::i` | 抛 `Injection Symbol(PopoverRootContext) not found` |
| `PopperContent::r` | 抛 `Injection Symbol(PopperContentContext) not found` |

**`Collection::r` 是个漂亮的收获**：之前在无上下文环境它只抛 context 错误，
现在拿到返回值结构 —— `{fn, setter, _value, dep, __v_isRef}` 是 **computed** 的
标准结构。

**而且和上轮的标注对上了**：上轮通过错误消息判定它是 `useConfigProviderContext`，
现在知道它**返回一个 computed** —— 两者不矛盾（`useContext` 通常返回
`computed(() => ctx.xxx)`）。

## 为什么 provide 假 context 走不通

想法是 `provide(symbol, fakeCtx)` 让 `inject` 拿到假对象。**但问题在 symbol**：

- context 的 key 是 **Symbol**（`Symbol(RovingFocusGroupContext)`）
- symbol 是**运行时唯一**的，无法从字符串重建
- reka-ui 包里 `createContext()` 创建的 symbol 和应用里的**不是同一个**

**所以没法 provide 一个能匹配的 key。**

（除非能拿到应用模块内部的那个 symbol 实例 —— 那是模块私有变量，不可导出。）

## 还能做什么

### 1. 在真实组件树里调用（而不是空 setup）

`Collection::r` 能成功，是因为它只需要 `currentInstance`。
那些需要 `XxxContext` 的，如果在**真实的 Provider 组件内部**调用，
就能拿到真 context。

**做法**：渲染 `<DialogRoot><ProbeComponent /></DialogRoot>`，
在 `ProbeComponent` 的 setup 里调 `useDialogRootContext()`。

**但**：这需要知道每个 Context 对应的 Provider 组件名 —— 而组件名我们是有的
（`DialogRoot`、`PopoverRoot` 等）。

**这条路是通的**，但工作量大（要为每类 context 搭一次渲染树）。

### 2. 从错误消息已经拿到了足够信息

对于需要 context 的 hook，**错误消息里的 context 名就已经是身份**：

- `Injection Symbol(DialogRootContext) not found` → 它读 DialogRoot 的 context
  → 名字就是 `useDialogRootContext`

**这类不需要返回值结构也能确定名字。**

## 结论

| 项 | 状态 |
|---|---|
| setup 上下文解锁部分 hook | ✅ 有效（`Collection::r` 拿到 computed 结构） |
| provide 假 context | ❌ 不可行（symbol 不可重建） |
| 真实 Provider 树内调用 | ⚠️ 可行但工作量大 |
| 错误消息判定身份 | ✅ 已用（9 个 use-context） |

**净收益**：确认了「setup 上下文是必需的、provide 是无效的」，
并拿到了 `Collection::r` 的实际类型。**投入产出比已经明显下降。**
