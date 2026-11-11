# 渲染验证：从"能构建"到"能运行"的距离

> round-0420 / round-0421 实测记录

## 一、为什么必须做真实渲染验证

`vite build` 通过只证明**语法合法**。实测用 `@vue/server-renderer` 渲染组件，
输出**全是 0 字节**。

而且第一次测试时我把 `app.config.errorHandler = () => {}` 打开了，错误被静默吞掉，
界面显示"渲染成功 3/3"——**捕获错误后真相才出来**。

## 二、逐层挖出的问题

### 层 1：模板变量未绑定（round-0420）

```
Property "e" was accessed during render but is not defined on instance
Property "je" was accessed ... not defined
_ctx.t is not a function
```

原组件：

```js
setup(e) {                    // e = props
  let t = e,                  // t = props 别名
      { t: n } = it(),        // n = i18n 的 t
  return (t, i) => (...);     // render(ctx, cache)
}
```

模板里的 `e` / `t` / `je` / `n` 都是**外部作用域的名字**，而生成的 `.vue`
script 段是空的。

**已修**：在 `<script setup>` 里按原代码生成 `const e = defineProps({}); const t = e;`，
import 移到最前，跨 chunk 依赖由 `shared.js` re-export。

### 层 2：源码树断链（round-0421）

```
Could not resolve "./DayReplayPlayer.js"   ← 文件实际在 pages/
Could not resolve "./seedream.js"          ← 该 chunk 已在 round-0376 删除
```

这是**仓库既有 bug**：round-0400 修过一次（加 `../pages/` 前缀、清死 chunk 引用），
但随 bf41f73 整体回滚丢失。

**已修**：
- 29 处断链重定向到真实路径（4 个文件）
- 11 处死引用（动态组件注册表里指向已删 chunk 的 `import()`）替换为
  `() => Promise.resolve({})`
- 复验：**剩余断链 0**

修完后应用本身验证 PASS（九页面 388/388/1097/192/433/2439/240/304/1352）。

### 层 3：Vue 工程构建成功（本轮突破）

```
dist-ssr/entry.js  7,471.02 kB
✓ built in 10.11s
```

断链修好后，`npm run build` 终于通过。

### 层 4：运行时仍未打通

用 jsdom 提供浏览器环境（补齐 `matchMedia`/`ResizeObserver`/`matchMedia` 等），
渲染时遇到：

```
ReferenceError: Mt is not defined   （shared.js 里某个顶层符号在使用时还未定义）
```

**根因**：`shared.js` 是把 main.js 的 11MB 顶层代码平铺出来的，模块间的执行顺序
与作用域依赖无法复现。原 bundle 由 vite 打包，模块初始化的先后顺序有精细保证；
拆成「多个 .vue + 一个 shared.js」后，这个顺序丢失了。

## 三、结论

| 层次 | 状态 |
|---|---|
| 组件模板结构（元素/属性/slot/具名子组件） | ✅ 正确（391/418 可编译） |
| 组件运行时绑定（props/别名/跨 chunk 符号） | ✅ 已补 |
| 源码树路径完整性 | ✅ 断链清零 |
| Vue 工程可构建 | ✅ 7.4MB 产物 |
| **Vue 工程可运行** | ❌ 卡在模块执行顺序 |

## 四、要继续的话，只剩一条路

**重建模块依赖图**：不能把 main.js 顶层代码平铺进一个 shared.js，而要
按原 bundle 的模块边界切成多个模块，并保留它们的初始化顺序（可用
`__vite__mapDeps` 与 import 图的拓扑序推导）。

这是一项独立工程，工作量与原反编译器同级。做完才能 `npm run dev` 看到页面。

## 五、已确认可行的部分（可直接使用）

- **源码树本身是健康的**：断链清零后，Electron 应��能正常构建运行（已 PASS）
- **391 个 .vue 是合法 SFC**：能被 vite/rollup 处理，可单独取用
- **组件注册表（341 项）**：能把 `<component :is="YM"/>` 还原为 `<SettingsSection/>`
- **Vue API 映射（16 项）**：运行时行为探测得出，修正了静态分析的 5 处错误
