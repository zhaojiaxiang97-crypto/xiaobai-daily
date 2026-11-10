# 渲染验证：暴露的真实缺陷

> round-0420 实测记录

## 为什么必须做这一步

`vite build` 通过只证明**语法合法**，不代表组件能渲染。实测用
`@vue/server-renderer` 的 `renderToString` 渲染 3 个组件，输出**全是 0 字节**。

第一次测试我还误把 `app.config.errorHandler = () => {}` 打开，错误被静默吞掉，
显示"渲染成功 3/3"。**捕获错误后真相才出来。**

## 捕获到的真实错误

| 组件 | 错误 |
|---|---|
| SettingsSection | `Property "e" was accessed during render but is not defined on instance` → `Cannot read properties of undefined (reading 'id')` |
| AlertTitle | `Property "je" was accessed ... not defined` / `Cannot read ... (reading 'class')` |
| AboutSettingsSection | `Failed to resolve component: SettingsSection` / `_ctx.t is not a function` |

## 根因：模板表达式用的是原 render 函数的变量名

原组件代码：

```js
setup(e) {                     // e = props
  let t = e,                   // t = props 别名
      { t: n } = it(),         // n = i18n 的 t 函数
      r = computed(...);
  return (t, i) => (...);      // render 的 (ctx, cache)，注意 t 又遮蔽了一次
}
```

模板里出现的 `e.id` / `t.class` / `je(...)` 分别对应：
- `e` / `t` → props（render 的第一个参数 `_ctx` 代理了 props）
- `je` → 跨 chunk import 的 `cn`（classnames）
- `n` → i18n 的 `t` 函数

而生成出来的 `.vue` 里 **script 段是空的**，这些名字一个都没有绑定 → 渲染即崩。

## 已做的修复

在 `<script setup>` 里按原代码生成绑定：

```vue
<script setup>
import { openBlock, createElementBlock, normalizeClass, unref, withCtx } from 'vue';
import { je } from '../shared.js';
const e = defineProps({});
const t = e;
</script>
```

同时：
- import 语句必须在最前（此前生成在后面，语法位置不对）
- 跨 chunk 依赖统一由 `shared.js` re-export（269 项），组件只需 `import { x } from '../shared.js'`
- 原 `src/renderer` 整目录复制为 `src/vendor/`，re-export 路径改指向 `./vendor/...`

## 仍未打通的部分

完整 SSR 构建卡在**仓库既有的路径 bug**上（不是本次改动引入）：

```
Could not resolve "./DayReplayPlayer.js"   ← 文件实际在 pages/ 下
Could not resolve "./seedream.js"          ← 该 chunk 已在 round-0376 删除
```

这两类问题在 round-0400 修过一次（当时加了 `../pages/` 前缀、清理死 chunk 引用），
但那次修复随 bf41f73 的整体回滚丢失了 —— **当前仓库的源码树本身有断链**。

## 结论

- 组件模板**结构**正确（元素/属性/slot/具名子组件）
- 组件**运行时绑定**缺失 —— 本轮已补 props 与别名，跨 chunk 符号走 shared.js
- **完整可渲染还差**：修复源码树的断链路径（动态 import 缺目录前缀 + 死 chunk 引用）

修完这两类路径问题，就能跑 `npm run dev` 看到真实页面。
