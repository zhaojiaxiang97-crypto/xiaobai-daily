# 内联改名机制 + 剩余 11 个组件的外部符号

> round-0450

## 做了什么

### 1. 内联改名机制

`lib-conv.cjs` 在写 `.vue` 前，把 `setup` 函数体内被模板引用、但转换器没保留的
定义抽出来内联，**名字冲突时重命名而不是跳过**：

```js
// 已占用名字 = script 里已声明的
const occupied = new Set(script 里所有 const/let/var/function 声明);

for (const d of deps) {
  const nm = 定义名;
  if (occupied.has(nm)) {
    let nn; do { nn = '_inl' + (counter++); } while (occupied.has(nn));
    renames.set(nm, nn);       // 原名 → 新名
    occupied.add(nn);
  }
}

// 先改定义里的名字，再改模板引用
for (const [o, n] of renames) {
  code = code.replace(词边界正则(o), n);
  tpl2 = tpl2.replace(词边界正则(o), n);
}
```

**为什么必须改名而不是跳过**：跳过的话模板里还是引用原名 → 运行时 ReferenceError。
（round-0449 试过跳过，`PopperContent.vue` 的 `let $` 和 `HeatmapBars3D.vue` 的 `x`
直接让构建挂掉。）

**效果**：145 个组件里 **26 个**成功内联了 setup 内定义。

### 2. 关键修复的连带效果

上一轮修的「临时文件带 import」（`VUE_API_MAP` 是 main bundle 专用表），
让模板归属从 60 → **121 个不同模板**，同时**顺带消除了 `@focusin="N"` 这类
因模板错位产生的假引用**（那是别的组件的 render 里的 `onFocusin: N`）。

## 仍未解决：11 个组件引用外部符号

静态检查（模板引用了某标识符，但 script 里没有绑定）：

```
引用了 N 但 script 无绑定: 11 个
  KeyboardHeatmapTool / PopperContent / StylePanel /
  MarkdownReaderSidePanel / MarkdownReaderEmptyState / PopperArrow ...
```

例：

```html
:status-text="V.value && N?.running ? t(`settings.keyboardHeatmapRu..."
```

**`N` 不在该组件的 setup 里，也不在 import 里** —— 说明它是 chunk 文件级定义，
或来自另一个 chunk 的 re-export。

**`collectSetupDefs` 只找 setup 函数体内的声明，找不到这类。**

## 现状总表

| 项 | 值 |
|---|---|
| vendor 组件转换 | 145 |
| 不同模板 | **121**（共用组 18） |
| 成功内联 setup 定义 | 26 |
| 仍引用外部符号 | 11 |
| main bundle 渲染率 | 109（不受影响） |

## 下一步

对那 11 个组件，把搜索范围从「setup 函数体」扩到「整个 chunk 文件顶层」：

```js
// 已有实现（文件级），只是之前没和 setup 级合并
topDefs   // chunk 顶层所有 VariableDeclaration / FunctionDeclaration
resolveDeps(freeNames, importKeys)   // 递归收集
```

两者合并按「setup 内优先、文件级兜底」的顺序取，就能覆盖这 11 个。

**工具里这两套代码都已存在**（`topDefs`/`resolveDeps` 在 round-0445 写的、
`collectSetupDefs`/`collectRenderLocals` 在 round-0446 写的），只需合并调用顺序。
