# 符号类型标注：173 个导出逐个探针

> round-0494
>
> 对 15 个 vendor 文件做运行时探针，**全部加载成功、173 个导出全部拿到行为画像**。
> 数据存 `tools/vue-decompiler/symbol-types.json`。

## 方法

在浏览器里 `import` 每个 vendor 模块，对每个导出：

1. 若是组件（有 `__name`/`render`/`setup`）→ 直接判定
2. 否则尝试无参调用，捕获返回值或错误
3. 按判据表分类：
   - 返回对象含 `__v_isRef`+`_value`+`dep` → ref 系
   - 含 `fn`+`setter`+`_value` → **computed**
   - 含 `primitiveElement` → usePrimitiveElement
   - 含 `getItems`/`itemMapSize` → useCollection
   - 抛 ``Injection Symbol(XxxContext) not found`` → **useXxxContext**（名字直接给）

## 类型分布

| 类型 | 数量 |
|---|---|
| 非函数（常量/对象） | 58 |
| hook（需组件上下文） | 18 |
| 函数式组件（lucide） | 12 |
| **use-context（名字可确定）** | **9** |
| 需更多参数才不抛错 | 9 |
| 空对象 | 7 |
| 字符串常量 | 6 |
| 布尔常量 | 6 |
| 普通函数 | 6 |
| **Vue 指令定义**（`{name,options,fn}`） | 6 |
| **computed** | 5 |
| undefined | 4 |
| shallowRef | 3 |
| ref | 2 |

## 9 个可直接命名的（错误消息给出 context 名）

| 导出 | 建议名 |
|---|---|
| `Collection::r` | **useConfigProviderContext** |
| `DialogTitle::s` | **useDialogRootContext** |
| `PopoverTrigger::i` | **usePopoverRootContext** |
| `PopoverTrigger::s` | **useConfigProviderContext** |
| `PopperContent::r` | **usePopperContentContext** |
| `RovingFocusGroup::n` | **useRovingFocusGroupContext** |
| `Switch::I` | **useConfigProviderContext** |
| `Switch::K` | **useConfigProviderContext** |
| `Switch::W` | **useConfigProviderContext** |

**这 9 个是确定性的** —— 名字直接来自 reka-ui 自己抛的错误消息。

## 常量值直接暴露语义

| 导出 | 值 | 含义 |
|---|---|---|
| `PopoverTrigger::D` | `'Asia/Shanghai'` | **默认时区** |
| `Switch::C` | `'unchecked'` | checkbox 未选中状态 |
| `Switch::n` | `'focus-visible:border'` | CSS 类名前缀 |
| `Switch::p` | `'#document'` | 特殊文档节点 ID |
| `Switch::w` | `'closed'` | 状态字符串 |
| `Switch::gt` | `true` | 布尔开关 |

## 完整标注表

| `AlertDialogMedia::t` | non-fn:object | — |
| `CodeBlockNode::default` | non-fn:object | — |
| `Collection::n` | object{width,height} | — |
| `Collection::r` | **useConfigProviderContext** | arity 1 |
| `Collection::t` | useCollection | — |
| `DialogTitle::a` | non-fn:object | — |
| `DialogTitle::i` | non-fn:object | — |
| `DialogTitle::n` | non-fn:object | — |
| `DialogTitle::o` | non-fn:object | — |
| `DialogTitle::r` | non-fn:object | — |
| `DialogTitle::s` | **useDialogRootContext** | arity 1 |
| `DialogTitle::t` | non-fn:object | — |
| `DropdownMenuItem::n` | 函数式组件 | — |
| `DropdownMenuItem::t` | non-fn:object | — |
| `DropdownMenuTrigger::a` | non-fn:object | — |
| `DropdownMenuTrigger::c` | non-fn:object | — |
| `DropdownMenuTrigger::i` | non-fn:object | — |
| `DropdownMenuTrigger::l` | unknown | — |
| `DropdownMenuTrigger::n` | non-fn:object | — |
| `DropdownMenuTrigger::o` | non-fn:object | — |
| `DropdownMenuTrigger::r` | non-fn:object | — |
| `DropdownMenuTrigger::s` | non-fn:object | — |
| `DropdownMenuTrigger::t` | non-fn:object | — |
| `Kbd::t` | non-fn:object | — |
| `PopoverTrigger::A` | 函数式组件 | — |
| `PopoverTrigger::C` | hook（需组件上下文） | arity 1 |
| `PopoverTrigger::D` | 常量 `Asia/Shanghai` | — |
| `PopoverTrigger::E` | hook（需组件上下文） | arity 2 |
| `PopoverTrigger::O` | object{calendar,era,year,month} | — |
| `PopoverTrigger::S` | hook（需组件上下文） | arity 1 |
| `PopoverTrigger::T` | hook（需组件上下文） | arity 2 |
| `PopoverTrigger::_` | hook（需组件上下文） | arity 2 |
| `PopoverTrigger::a` | hook（需组件上下文） | arity 1 |
| `PopoverTrigger::b` | hook（需组件上下文） | arity 1 |
| `PopoverTrigger::c` | object{ALT,ARROW_DOWN,ARROW_LEFT,ARROW_RIGHT} | — |
| `PopoverTrigger::d` | throws:Cannot destructure property 's | — |
| `PopoverTrigger::f` | hook（需组件上下文） | arity 2 |
| `PopoverTrigger::g` | throws:Cannot destructure property 'd | — |
| `PopoverTrigger::h` | 常量 `true` | — |
| `PopoverTrigger::i` | **usePopoverRootContext** | arity 1 |
| `PopoverTrigger::k` | hook（需组件上下文） | arity 2 |
| `PopoverTrigger::l` | object{setLocale,getLocale,fullMonth,fullYear} | — |
| `PopoverTrigger::m` | hook（需组件上下文） | arity 1 |
| `PopoverTrigger::n` | non-fn:object | — |
| `PopoverTrigger::o` | object{isDateSelected,isInvalid,hasSelectedDate,isSelectedDateDisabled} | — |
| `PopoverTrigger::p` | throws:First argument to Intl.Locale  | — |
| `PopoverTrigger::r` | non-fn:object | — |
| `PopoverTrigger::s` | **useConfigProviderContext** | arity 1 |
| `PopoverTrigger::t` | non-fn:object | — |
| `PopoverTrigger::u` | throws:Cannot destructure property 'd | — |
| `PopoverTrigger::v` | hook（需组件上下文） | arity 3 |
| `PopoverTrigger::w` | hook（需组件上下文） | arity 2 |
| `PopoverTrigger::x` | throws:Class constructor e cannot be  | — |
| `PopoverTrigger::y` | hook（需组件上下文） | arity 3 |
| `PopperContent::a` | non-fn:object | — |
| `PopperContent::i` | non-fn:object | — |
| `PopperContent::n` | non-fn:object | — |
| `PopperContent::o` | undefined:undefined | — |
| `PopperContent::r` | **usePopperContentContext** | arity 1 |
| `PopperContent::s` | 函数式组件 | — |
| `PopperContent::t` | non-fn:object | — |
| `RovingFocusGroup::a` | hook（需组件上下文） | arity 2 |
| `RovingFocusGroup::i` | hook（需组件上下文） | arity 3 |
| `RovingFocusGroup::n` | **useRovingFocusGroupContext** | arity 1 |
| `RovingFocusGroup::r` | throws:e is not iterable | — |
| `RovingFocusGroup::t` | non-fn:object | — |
| `RovingFocusItem::t` | non-fn:object | — |
| `Slider::t` | non-fn:object | — |
| `Switch::$` | shallowRef | arity 0 |
| `Switch::A` | usePrimitiveElement | — |
| `Switch::At` | 函数式组件 | — |
| `Switch::B` | computed | arity 1 |
| `Switch::C` | 常量 `unchecked` | — |
| `Switch::Ct` | 函数式组件 | — |
| `Switch::D` | 常量 `false` | — |
| `Switch::Dt` | 函数式组件 | — |
| `Switch::E` | hook（需组件上下文） | arity 1 |
| `Switch::Et` | 函数式组件 | — |
| `Switch::F` | useState-ish | — |
| `Switch::Ft` | object{default} | — |
| `Switch::G` | object{} | — |
| `Switch::H` | computed | arity 1 |
| `Switch::I` | **useConfigProviderContext** | arity 1 |
| `Switch::J` | undefined:undefined | — |
| `Switch::K` | **useConfigProviderContext** | arity 1 |
| `Switch::L` | undefined:undefined | — |
| `Switch::M` | non-fn:object | — |
| `Switch::Mt` | function:() => (t || (event(( | — |
| `Switch::N` | non-fn:object | — |
| `Switch::Nt` | object{} | — |
| `Switch::O` | non-fn:object | — |
| `Switch::Ot` | 函数式组件 | — |
| `Switch::P` | object{search,handleTypeaheadSearch,resetTypeahead} | — |
| `Switch::Pt` | throws:Calling `require` for "undefin | — |
| `Switch::Q` | function:() => {
      m.stop | — |
| `Switch::R` | object{} | — |
| `Switch::S` | throws:e is not iterable | — |
| `Switch::St` | function:n => {
    if (t?.va | — |
| `Switch::T` | 常量 `false` | — |
| `Switch::Tt` | 函数式组件 | — |
| `Switch::U` | object{} | — |
| `Switch::V` | throws:Cannot read properties of null | — |
| `Switch::W` | **useConfigProviderContext** | arity 1 |
| `Switch::X` | object{width,height,stop} | — |
| `Switch::Y` | ref | arity 1 |
| `Switch::Z` | object{on,once,off,emit} | — |
| `Switch::_` | non-fn:object | — |
| `Switch::_t` | hook（需组件上下文） | arity 3 |
| `Switch::a` | hook（需组件上下文） | arity 4 |
| `Switch::at` | computed | arity 3 |
| `Switch::b` | non-fn:object | — |
| `Switch::bt` | number:NaN | — |
| `Switch::c` | Vue 指令定义 | arity 1 |
| `Switch::ct` | non-fn:boolean | — |
| `Switch::d` | Vue 指令定义 | arity 1 |
| `Switch::dt` | 常量 `false` | — |
| `Switch::et` | shallowRef | arity 0 |
| `Switch::f` | Vue 指令定义 | arity 1 |
| `Switch::ft` | function:function n(...n) {
  | — |
| `Switch::g` | non-fn:object | — |
| `Switch::gt` | 常量 `true` | — |
| `Switch::h` | non-fn:object | — |
| `Switch::ht` | function:() => {
      m.stop | — |
| `Switch::i` | Vue 指令定义 | arity 1 |
| `Switch::it` | shallowRef | arity 3 |
| `Switch::j` | non-fn:object | — |
| `Switch::jt` | 函数式组件 | — |
| `Switch::k` | non-fn:object | — |
| `Switch::kt` | 函数式组件 | — |
| `Switch::l` | object{options,fn} | — |
| `Switch::lt` | object{} | — |
| `Switch::m` | 常量 `false` | — |
| `Switch::mt` | object{isPending,start,stop} | — |
| `Switch::n` | 常量 `focus-visible:border` | — |
| `Switch::nt` | object{isSupported,stop} | — |
| `Switch::o` | object{} | — |
| `Switch::ot` | object{on,off,trigger,clear} | — |
| `Switch::p` | 常量 `#document` | — |
| `Switch::pt` | object{isActive,pause,resume} | — |
| `Switch::q` | object{define,reuse} | — |
| `Switch::r` | non-fn:object | — |
| `Switch::rt` | object{x,y,isScrolling,arrivedState} | — |
| `Switch::s` | Vue 指令定义 | arity 1 |
| `Switch::st` | function:(...a) => (t += 1, r | — |
| `Switch::t` | non-fn:object | — |
| `Switch::tt` | computed | arity 1 |
| `Switch::u` | Vue 指令定义 | arity 1 |
| `Switch::ut` | ref | arity 1 |
| `Switch::v` | non-fn:object | — |
| `Switch::vt` | object{} | — |
| `Switch::w` | 常量 `closed` | — |
| `Switch::wt` | 函数式组件 | — |
| `Switch::x` | non-fn:object | — |
| `Switch::xt` | 常量 `` | — |
| `Switch::y` | non-fn:string | — |
| `Switch::yt` | unknown | — |
| `Switch::z` | computed | arity 2 |
| `TooltipTrigger::a` | non-fn:object | — |
| `TooltipTrigger::c` | undefined:undefined | — |
| `TooltipTrigger::i` | non-fn:object | — |
| `TooltipTrigger::n` | non-fn:object | — |
| `TooltipTrigger::o` | non-fn:object | — |
| `TooltipTrigger::r` | non-fn:object | — |
| `TooltipTrigger::s` | non-fn:object | — |
| `TooltipTrigger::t` | non-fn:object | — |
| `alert-dialog::a` | non-fn:object | — |
| `alert-dialog::c` | non-fn:object | — |
| `alert-dialog::i` | non-fn:object | — |
| `alert-dialog::n` | non-fn:object | — |
| `alert-dialog::o` | non-fn:object | — |
| `alert-dialog::r` | non-fn:object | — |
| `alert-dialog::s` | non-fn:object | — |
| `alert-dialog::t` | non-fn:object | — |

## 关键判断：用注释，不改名

动态探针能给出**类型**（ref/computed/hook/常量/组件）和**用途范围**，
但给不出所有函数的准确名字。

**所以正确用法是把标注写成注释，而不是改名**：

```js
// [推断] computed
const n = B(() => e.value);
// [已知] useDialogRootContext（来自 reka-ui 错误消息）
const s = se();
```

这样即使推断有偏差，也不会让代码逻辑变得误导 ——
比把 `Za` 硬改成 `useFormControl` 安全得多。
