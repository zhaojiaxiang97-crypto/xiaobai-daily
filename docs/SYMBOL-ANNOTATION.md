# 符号身份注释：改生成器且零退化的第一次

> round-0495
>
> 七轮里所有改生成器的尝试都让渲染率下降（98 → 42~49）。这次是**第一次成功**，
> 而且做法很简单：**只加注释，不改代码**。

## 做了什么

在 `shared.js` 生成时，给每条跨 chunk import 加上符号身份注释：

```js
// [已知] useConfigProviderContext（来自 reka-ui 错误消息）
import { I as src_u } from './vendor/ui/Switch.js';

// [推断] computed
import { B as src_B } from './vendor/ui/Switch.js';
```

**90 条注释**，数据来自 `tools/vue-decompiler/symbol-types.json`
（173 个导出的运行时探针结果）。

## 为什么零风险

**注释不影响代码执行。** 这是与之前七轮失败的根本区别：

| 尝试 | 动了什么 | 结果 |
|---|---|---|
| setup 内联（0472-0479） | 改变量作用域、改 import 来源 | ❌ 98 → 42~49 |
| **符号注释（本轮）** | **只加注释** | ✅ **98 保持** |

## 踩了一个坑（但很快修好）

第一次生成后 `shared.js` 有语法错误：

```js
// [推断] function:n => {
    if (t?.va            ← 这行成了断掉的代码
import { St as src_C } from './vendor/ui/Switch.js';
```

**原因**：错误消息里含换行符，直接拼进 `//` 注释只剩第一行有效，
后面的内容变成断掉的代码。

**修复**：注释内容单行化（`replace(/\s+/g, ' ')` + 截断 60 字符）。

## 验证

| 项 | 结果 |
|---|---|
| `shared.js` 语法 | ✅ `node --check` 通过 |
| 注释数 | **90 条** |
| `vite build` | ✅ 2.12s |
| **392 个组件渲染** | ✅ **OK=98，与基线完全一致** |

## 现在还缺什么

**注释只加在 `shared.js` 的 import 上**，但用户读的是**组件的 `.vue` 文件**。
那些文件里是 `S_Za as Za` 这种引用，看不到 `shared.js` 的注释。

**要真正提升可读性，注释应该加在组件的 script 里**：

```js
// [已知] useFormControl
import { Za } from '../shared.js';
```

这需要在组件生成时（`gen-main.cjs` 的 Pass2）也做一遍同样的注释。

## 下一步

把这个机制复制到组件生成环节（Pass2 的 `sharedSpecs` 拼接处），
同样只加注释、不改代码，然后同样验证渲染率不降。

**风险仍然是零**（注释不改语义），但位置更贴近用户阅读的地方。
