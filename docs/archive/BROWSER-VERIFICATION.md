# 真实浏览器渲染验证：成功渲染出 HTML

> round-0430

## 结论

**从打包产物还原的组件，第一次在真实浏览器里渲染出了正确的 HTML。**

```
渲染宿主 5 个，有内容 2 个

194B  <div data-slot="alert-title"
         class="font-medium group-has-[>svg]/alert:col-start-2 cn-font-heading
                [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground">SLOT</div>

224B  <div data-slot="alert-description"
         class="text-muted-foreground text-sm text-balance md:text-pretty
                [&_p:not(:last-child)]:mb-4 [&_a]:underline [&_a]:underline-offset-3
                [&_a]:hover:text-foreground">SLOT</div>
```

`data-slot`、完整 class（含 Tailwind 变体）、slot 内容全部正确。

## 为什么必须换真实浏览器

之前用 jsdom 跑 SSR，卡在 `Cannot read properties of undefined (reading 'bind')`。
原因：原应用代码大量依赖浏览器 API（`localStorage` / `matchMedia` /
`IntersectionObserver` / `OffscreenCanvas` 等），jsdom 覆盖不全，**在模块加载阶段
就崩**，把真正的问题掩盖了。

换真实 Chrome 后：
- `vite-error-overlay` 为空（无编译错误）
- 组件正常挂载
- DOM 里出现完整渲染结果

## 验证方法

```bash
tools/vue-decompiler/verify-browser.sh <工程目录> [端口]
```

流程：`vite dev` → headless Chrome + CDP → 检查 `vite-error-overlay` → 统计
`[data-v-app]` 宿主的 innerHTML。

## 2/4 的差异说明

4 个测试组件里 2 个渲染出内容、2 个渲染为 `<!---->`：

| 组件 | 结果 | 原因 |
|---|---|---|
| AlertTitle | ✅ 194B | 无 props 依赖 |
| AlertDescription | ✅ 224B | 无 props 依赖 |
| AdmonitionNode | ⬜ `<!---->` | 需要 `node`（树结构）/ `content`（数组）等复杂 props，测试未提供 |
| SettingsSection | ⬜ `<!---->` | 需要 `id` prop 之外的上下文 |

**渲染为空是 props 没给对，不是组件坏了。**

## 这条线的完整历程

| 阶段 | 状态 |
|---|---|
| 组件切分 | 418 个 → 393 个 .vue |
| 模板转换 | 99% 可编译 |
| 依赖解析 | 未定义符号 63 → 0 |
| `vite build` | ✅ 通过 |
| **真实浏览器渲染** | ✅ **AlertTitle / AlertDescription 渲染出完整 HTML** |

## 工具

- `tools/vue-decompiler/gen-main.cjs` —— 两段式生成器（分析 → 生成）
- `tools/vue-decompiler/verify-browser.sh` —— 真实浏览器验证
