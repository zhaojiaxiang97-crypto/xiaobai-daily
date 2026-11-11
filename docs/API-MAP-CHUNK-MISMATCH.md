# 关键根因：`VUE_API_MAP` 是 main bundle 专用表

> round-0449
>
> 这是 vendor 线 10 轮来最重要的发现。

## 问题

`convert-component.cjs` 用一张**全局硬编码**的 `VUE_API_MAP` 把短名翻译成 Vue 语义：

```js
const VUE_API_MAP = {
  'x': 'createCommentVNode',
  'y': 'createElementVNode',
  'b': 'createBlock',
  'gt': 'openBlock',
  ...
};
```

**这张表是对 main bundle 的运行时探测得出的**（round-0416 的成果），
在 main bundle 里完全正确。**但不同 chunk 的短名含义不同。**

实测对比 `HeatMapRangePicker.js`：

| 短名 | 本 chunk 里的真实含义 | VUE_API_MAP 认为是 |
|---|---|---|
| `x` | `import b` → **createBlock** | **createCommentVNode** ❌ |
| `d` | `import An` → unref | unref ✅ |

## 后果

`RangeCalendarCell` 的 render：

```js
return (e, n) => (w(), x(d(i), { as: e.as, role: 'gridcell', ... }))
```

即 `(openBlock(), createBlock(unref(Comp), {...}))`。

转换器按 `VUE_API_MAP` 把 `x` 当成 `createCommentVNode`，
而我的代码对 `createCommentVNode` 是 **`return ''`（当空节点丢弃）**（round-0444 修的）。

**于是整个 render 被当注释节点扔掉 → 空模板。**

## 为什么之前没发现

`lib-conv` 调转换器时只传组件对象（`var __c = {...}`），**没有 import**。
没有 import → `API` 表为空 → 只能靠 `VUE_API_MAP` 兜底 → 必然用错语义。

而 `gen-main.cjs`（main bundle 那条线）**传的是整个文件**，import 齐全，
`API` 表正确，轮不到全局表兜底 —— 所以它一直是对的。

## 修复

临时文件必须带上原文件的 import：

```js
fs.writeFileSync(tmpFile,
  importSrc.join('\n') + '\nvar __c = ' + src.slice(c.node.start, c.node.end) + ';\nexport default {};\n');
```

这样 `convert-component` 的 `Program` 遍历能建立正确的 `API` 表
（`apiOf` 本就是 `API[n] || VUE_API_MAP[n]`，API 优先）。

## 效果（决定性）

`HeatMapRangePicker.js` 的 16 个组件：

| 指标 | 修复前 | 修复后 |
|---|---|---|
| 不同模板数 | 3 | **16** |
| 共用模板的组 | 13 个共用 | **0** |
| 空模板 | 有 | **0** |

全量 145 个 vendor 组件：

| 指标 | 修复前 | 修复后 |
|---|---|---|
| 组件数 | 148 | 145 |
| **不同模板数** | 60 | **121** |
| **空模板** | 有 | **0** |
| 共用组 | 22 | 18 |

**模板归属问题彻底解决。**（之前 13 个组件共用一个模板，现在基本一一对应。）

## 仍未解决

渲染测试仍报 `N is not defined` —— 模板引用了 `setup` 内定义的局部函数，
而转换器只取 setup 返回的 render，setup 内其余代码被丢弃。

**尝试过内联（round-0446/0447 的 `collectSetupDeps`），但会引入重复声明冲突**
（如 `PopperContent.vue` 的 `let $`、`HeatmapBars3D.vue` 的 `x`），
一个组件就能拖垮整个构建，已移除。

**正确的内联需要真正的变量改名机制**（冲突时重命名而非跳过），这是下一步的工作量。

## 附带发现

`HeatmapBars3D.vue` 有个独立的 bug：script 里 `x` 重复声明
（props 改名逻辑的边界情况）。单独修这一个即可，不是系统性问题。

## 结论

| 项 | 状态 |
|---|---|
| 模板归属（张冠李戴） | ✅ **彻底修复**（121/145 不同模板，0 空） |
| `createBlock(unref(X))` 识别 | ✅ 已修（unwrap） |
| render 的 BlockStatement 形态 | ✅ 已修 |
| setup 内定义内联 | ❌ 会冲突，已移除 |
| main bundle 渲染率 | 109（不受影响） |
