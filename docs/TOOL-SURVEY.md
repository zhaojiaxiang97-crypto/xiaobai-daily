# GitHub 现成工具调研

> round-0434
>
> 结论：**没有能直接用的工具**。两个最相关的都实测过，各有硬性缺陷。

## 一、webcrack（3043★，TypeScript，活跃维护）

`j4k0xb/webcrack` —— "Deobfuscate obfuscator.io, unminify and unpack bundled javascript"

### 实测

| 能力 | 对 main bundle（5.2MB） | 结果 |
|---|---|---|
| **unpack**（解包成模块） | `bundle? no` | ❌ **不支持 vite/rollup 产物** |
| **deobfuscate**（反混淆） | 6122 → 6101 唯一 `_0x` | ❌ 只减 21 个（0.3%） |
| unminify（格式化） | 有效 | ⚪ 等价于 prettier，已有 |

**为什么 unpack 不работ**：webcrack 的 unpack 针对 webpack / browserify 的**模块包装格式**
（`__webpack_require__`、`webpackJsonp`、`browserify` 的 `require` 映射）。而我们的
`renderer/chunks/main.js` 是 **vite/rollup 的 ESM 输出** —— 模块在打包时被扁平合并，
只保留顶层 `import` 引用外部 chunk，**没有可识别的模块包装**。

**为什么 deobfuscate 无效**：它针对 obfuscator.io 的特征（string array、rotator、
control flow flattening）。我们的代码已经被手动反混淆过（主进程 `_0x` 从 13800 降到
6122），剩余的都是无特征的短命局部变量，工具无从下手。

## 二、vue-decompiler（1★，Python）

`kubikaugustyn/vue-decompiler` —— "A Vue built app decompiler"

### 值得注意的地方

**它确实做 render → template 反编译**，输出真正的 template 语法：

```html
<template>
  <div class="w-full">
    <BaseModule :color="statusColor" :glow="success" :button="true">
      <template #default>
        <span v-if="request_status || request_start" key="0" class="ml-2 text-grey">
          <Icon class="fa-spin" :icon="['fas','sync']"/>
```

实现 1650 行，有独立的 `TemplateParser.py` / `JSParser.py`，用 vnode 参数布局
`[type, props, children, patchFlag, dynamicProps, shapeFlag, ...]` 解析 —— 与我的
`convert-component.cjs` 思路一致。

### 但跑不起来

```
ModuleNotFoundError: No module named 'kutil.io'
```

它依赖作者的私有库 `kutil`。PyPI 上虽然有 `kutil 1.0.0`，但 **API 版本不匹配**
（缺 `kutil.io` 模块）。requirements.txt 里的注释「Not currently on PyPI」是过时的，
真实情况是「PyPI 版本太旧」。

## 三、这说明什么

**我们卡住的地方，恰好是整个生态的空白：**

1. **vite/rollup 产物的解包工具不存在** —— webpack 有一堆（webcrack、unwebpack、
   webpack-unbundler），ESM 扁平输出没有。
2. **Vue render → template 的反编译只有这个 1★ 的实验项目**，且依赖不可得。

所以自研 `tools/vue-decompiler/` 不是重复造轮子，而是这条路上确实没有现成的。

## 四、可借鉴的一点

从 `vue-decompiler` 的 `TemplateParser.py` 可见它对 vnode 参数布局有明确定义：

```python
BASE_V_NODE_ARGS = ["type", "props", "children", "patchFlag", "dynamicProps",
                    "shapeFlag", "unknown1", "unknown2"]
V_NODE_ARGS = ["type", "props", "children", "patchFlag", "dynamicProps", "unknown1"]
```

我的转换器目前只用前三个参数（type/props/children），**没有利用 patchFlag**。
patchFlag 的位含义（`1`=TEXT、`2`=CLASS、`8`=STYLE、`16`=PROPS、`32`=FULL_PROPS…）
可以用来判断哪些属性是动态的、哪些是静态的，理论上能提升模板还原的准确度
（例如静态属性可以直接写成不带 `:` 的字面量）。

**但收益不确定**：目前的 94/393 渲染失败主要因为「需要父组件上下文」和
「mock 数据不足」，不是 patchFlag 处理不当。**暂不投入。**
