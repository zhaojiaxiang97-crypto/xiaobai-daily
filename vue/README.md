# 小白日报 v1.8.3 — 还原的 Vue 组件

从 Electron 打包产物反编译出的组件，**共 537 个**，分两批。


## 先看效果（不用装依赖）

`preview/index.html` 是**102 个组件的实际渲染截图**——直接从浏览器打开就能看，
不需要 `npm install`。

| 项 | 值 |
|---|---|
| 截图覆盖 | 107 个里 **102 个**渲染成功 |
| 生成方式 | 每个组件独立页面加载 → 真实 Chrome 截图 |

## 结构

```
components/          392 个（从 chunks/main.js 反编译）
vendor-components/   145 个（从 ui/ blocks/ pages/ vendors/ 反编译）
shared.js            2.1M，main bundle 的共享符号（9202 个本地 + 301 跨 chunk）
bootstrap.js         32K，应用启动侧代码（根组件选择 + createApp().mount('#app')）
styles/variables.css 665 个 CSS 变量（components/ 里的 scoped 规则要用）
vendor/              原始 renderer 的必要部分（组件的跨 chunk 依赖）
app.html             整应用入口（加载 bootstrap.js）
index.html / main.js 组件画廊入口
```

`shared.js` 与 `bootstrap.js` 的拆分不是风格问题：原 bundle 顶层既有符号定义，
也有 `var Q9 = ... ? L2t : V2t : G9; createApp(Q9).mount('#app')` 这类**求值期立即
读取组件绑定**的启动代码。后者留在 shared.js 里，就会和 391 个 `import shared.js`
的组件形成模块环，以 `App.vue` 为入口加载时抛
`Cannot access 'G9' before initialization`。拆开后依赖是单向的：
`bootstrap.js → shared.js`、`bootstrap.js → 组件`、`组件 → shared.js`。

## 快速跑起来

```bash
npm install
npm run dev      # 或 npx vite
```

## 可用性（实测，不是估计）

把 537 个组件一次性挂载到真实 Chrome（空 props、无父组件）得到的结果：

| 批次 | 总数 | 可独立渲染 | 空白 | 报错 |
|---|---|---|---|---|
| `components/` | 392 | **98** | 52 | 242 |
| `vendor-components/` | 145 | **9** | 65 | 71 |
| **合计** | **537** | **107** | 117 | 313 |

完整的组件级清单见仓库 `docs/render-verified-components.json`。

### 能独立渲染的 107 个是什么样

- **`components/` 里的 98 个**：结构简单、props 可选、无强依赖——`Alert` / `Card` /
  `Avatar` / `Calendar` / `Table` / `Dialog`（子组件）等
- **`vendor-components/` 里的 9 个**：全是子组件（`Footer` / `Header` / `Media` /
  `Shortcut` / `Next` / `Prev` / `Thumb`），不依赖 Root 提供的 context

### 其余 430 个为什么不能单独渲染

| 原因 | 例子 |
|---|---|
| 需要父组件 context | `DialogContent` / `PopoverContent` 必须在 `DialogRoot` / `PopoverRoot` 内 |
| 需要真实 props | 空 props 下访问 `props.xxx.yyy` 会抛错 |
| 需要业务数据 | `HeatMapPage` / `LeaderboardPanel` 要真实数据才能算 |

**这不是转换质量问题**，是这些组件的设计本来就需要上下文。
**但它们都能编译**——537 个全部通过 `vite build`。

## 怎么用

- **要拿组件直接用** → 从上面那 107 个里挑
- **只参考结构/写法** → 537 个都能看（都能编译）
- **要跑起来看效果** → 只有 107 个能独立跑
- **要看整应用入口** → `app.html`（加载 `bootstrap.js`，真实 Chrome 实测：模块加载完成、
  `createApp` 挂载成功、无 TDZ 报错）

## 整应用入口的验证结果

以 `App.vue` 为入口在真实 Chrome 里加载，两版对照（同一环境、同一页面）：

| 版本 | 结果 |
|---|---|
| 拆分前（shared.js 含启动代码） | `ReferenceError: Cannot access 'G9' before initialization` |
| 拆分后（启动代码在 bootstrap.js） | 加载成功；`bootstrap.js` 执行后 `#app` 已由 Vue 接管 |

渲染出的是空注释节点而非完整界面：`App.vue` 依赖 Electron 主进程的 IPC 数据
（设置、待办、登录态），浏览器里没有这些来源。挂载链路本身是通的。

## 已知限制

1. **逆向后再编译与原始产物不等价**——静态提升、patchFlag、缓存槽位都不同，功能等价
2. **局部变量名不可还原**——压缩时语义已丢失（如 `function Za(e) { return B(() => !A(e)) }`
   里的 `B`/`A`），只能确定少数全局符号（如 `H` = `withCtx`）
3. **scoped 样式按原 CSS 恢复**（`[data-v-xxx]` 规则 + 665 个 CSS 变量）

详见仓库 `docs/DECOMPILER.md`（main 批次）与 `docs/VENDOR.md`（vendor 批次）。
