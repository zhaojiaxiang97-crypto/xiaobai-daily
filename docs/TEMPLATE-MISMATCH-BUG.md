# 重大发现：vendor 组件共用同一模板（张冠李戴）

> round-0447
>
> 这个 bug 推翻了前面几轮对「vendor 组件渲染率低」的部分归因。

## 证据

把 `HeatMapRangePicker.js` 转出的 16 个 `.vue` 按模板哈希分组：

```
组件数: 16 | 不同模板数: 3

3 个组件独有模板：HeatMapRangePicker / RangeCalendarRoot / RangeCalendarGridHead
2 个组件共用同一模板：HeatMapRangePicker.vue, RangeCalendar.vue
13 个组件共用同一模板：RangeCalendarCell, RangeCalendarCellTrigger,
                       RangeCalendarGrid, RangeCalendarGridBody, ...
```

**13 个不同组件拿到的是同一份模板。**

## 根因

`lib-conv.cjs` 的循环：

```js
for (const c of comps) {
  let tpl = execFileSync('node', [convPath, file]);   // ← 参数始终是「整个文件」
  ...
}
```

`convert-component.cjs` 的接口是**按文件**的：给它一个 chunk，它返回该文件的
模板（实际上只对应文件里的第一个组件）。`lib-conv` 却按**组件**切分，
于是每个组件都拿到同一份「第一个组件的模板」。

## 直接后果

以 `RangeCalendarCell` 为例：

```js
// 它的真实 render（源文件里）
return (e, n) => (w(), x(d(i), {
  as: e.as, "as-child": e.asChild, role: `gridcell`,
  "aria-selected": ..., "aria-disabled": ...
```

它的 render 里**根本没有 `onFocusin`**。但生成的模板里却有
`@focusin="N" @mouseenter="N"` —— 因为模板来自另一个组件。

**所以「`N is not defined`」不是缺定义，是模板压根用错了。**

## 对前面结论的修正

| 轮次 | 当时的归因 | 实际 |
|---|---|---|
| 0438 | `resolveComponent` 泄漏到模板 | ✅ 仍然是真 bug（main bundle 那条线） |
| 0439 | renderCache 事件缓存泄漏 | ✅ 仍然是真 bug |
| 0444 | `createCommentVNode` 泄漏 | ✅ 仍然是真 bug（已修，25→0） |
| 0445 | setup 内局部绑定未保留 | ✅ 仍然是真问题（但作用更小） |
| 0447 | — | **新增：vendor 组件模板张冠李戴** |

**main bundle 那条线（109 个渲染）不受影响** —— 它走的是
`gen-main.cjs`，按组件精确提取 AST 范围，没有这个问题。

**只有 `lib-conv.cjs`（独立 chunk / vendor 路线）有这个问题。**

## 为什么之前没发现

- 独立 chunk 路线（round-0423）验证时，122/123 通过是**只测编译**，没测渲染
- vendor 批量转换后只测了「能不能生成 .vue」，没比对「模板是不是自己的」
- 错误信息（`N is not defined`）看起来像缺 import，把注意力引向了错误方向

## 修复方向

让转换器支持**按组件范围**提取模板：

**方案 1**：给 `convert-component.cjs` 加参数 `--component <Name>` 或
`--range <start> <end>`，只转该范围。

**方案 2**：`lib-conv` 自己从组件 AST 里取出 render 节点，写临时文件再调转换器
（`gen-main.cjs` 就是这么做的：它对每个组件单独开临时文件）。

**方案 2 更省事**：`gen-main.cjs` 里已有现成写法：

```js
const tmp = '/tmp/_cmp_' + name + '.js';
fs.writeFileSync(tmp, 'var __c = ' + src.slice(c.start, c.end) + ';\nexport default {};\n');
tpl = execFileSync('node', [convPath, tmp], ...);
```

## 结论

| 项 | 状态 |
|---|---|
| vendor 组件模板正确性 | ❌ **13/16 张冠李戴** |
| 根因 | `convert-component` 是按文件的，`lib-conv` 按组件复用其输出 |
| main bundle 渲染率 | 109（不受影响） |
| 修复难度 | 低（照抄 gen-main 的临时文件写法） |
