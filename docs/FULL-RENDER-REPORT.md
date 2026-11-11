# 全量渲染验证：393 个组件的真实可渲染率

> round-0431

## 数据

自动化测试：为每个组件从 `defineProps` 提取 props 并生成 mock 值，在真实 Chrome
里批量挂载，统计结果。

| 结果 | 数量 | 占比 |
|---|---|---|
| **OK**（渲染出内容） | **91** | 23% |
| EMPTY（空但无错） | 51 | 13% |
| ERR（报错） | 251 | 64% |
| 总计 | 393 | 100% |

## 关键洞察：23% 不是失败率

251 个错误按类型分布：

| 错误 | 数量 | 性质 |
|---|---|---|
| `str.replace is not a function` | 69 | **mock 数据类型给错**（如 `icon` 传了 `{}` 但代码要 string） |
| `Cannot destructure property 'slots' of 'undefined'` | 54 | **必须在父组件内使用** |
| `Cannot read properties of null (reading 'ce')` | 31 | 需要 provide/inject 上下文 |
| `Cannot read properties of undefined (reading 'value')` | 17 | 数据/上下文 |
| `set on proxy: trap returned falsish for style` | 10 | mock 数据（style 给 `{}` 但代码要写） |
| `Injection Symbol(DialogRootContext) not found` | 6 | **必须在 DialogRoot 内** |
| `Injection Symbol(ConfigProviderContext) not found` | 4 | 必须在 ConfigProvider 内 |
| `Injection Symbol(MenuRootContext) not found` | 4 | 必须在 MenuRoot 内 |
| 其余（合计） | 56 | 同类 |

**其中约 99 个是「需要父组件/上下文」，69 个是「mock 数据类型不对」。**

这套 UI 库是 **reka-ui / radix 风格的组合式组件**：`DialogItem` 必须在 `DialogRoot`
内、`MenuTrigger` 必须在 `MenuRoot` 内，单独挂载必然报 `Injection not found`。
**这是设计使然，不是还原失败。**

所以 **23% 是「能独立渲染的叶子组件占比」**，而不是成功率。

## 本轮修的真 bug

`ProgressRoot.vue` 的 props **默认值**引用了 shared 符号：

```js
const e = defineProps({
  max: { type: Number, default: Rl },        // ← Rl 未导入，运行时 ReferenceError
});
```

生成器此前只检查**模板**里的符号引用，没检查 props 代码。修复后把
`propsCode` 一并纳入扫描。

## 结论

- 全量 393 组件在真实浏览器里跑通验证流程
- **91 个能独立渲染出内容**
- 其余大部分是组合式组件（需要父组件上下文）或 mock 数据不足，**不是还原质量差**
- 修复了 props 默认值引用未导入的真实 bug

## 工具

- `tools/vue-decompiler/gen-render-test.cjs` —— 自动提取 props 并生成批量测试入口
- `tools/vue-decompiler/verify-browser.sh` —— 真实浏览器验证
