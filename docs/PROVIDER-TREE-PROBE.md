# 真实 Provider 树探针：方向验证了，但环境成本高

> round-0500
>
> 上轮确认「provide 假 context 走不通」（symbol 不可重建）。这轮试「真实 Provider 树」
> —— 把 Root 组件嵌套起来，在最深处调 hook。

## 做了

1. **定位 Root 组件**：从 vendor chunk 里按 `__name` 找
   ```
   DialogTitle::o   = DialogRoot
   DropdownMenuTrigger::s = MenuRoot
   RovingFocusGroup::t    = RovingFocusGroup
   PopperContent::a       = PopperRoot
   ```
2. **搭嵌套树**，在 `Probe` 的 setup 里调用所有 hook
3. 在浏览器里跑

## 撞到的环境问题（不是方法问题）

| 问题 | 现象 | 原因 |
|---|---|---|
| 相对路径 | `Failed to fetch dynamically imported module` | 探针脚本在 `probe/` 子目录，`./src/` 解析错位 |
| 裸模块 | `Failed to resolve module specifier 'vue'` | 浏览器无法解析裸模块名（需 Vite 转译的页面脚本） |
| 页面脚本时序 | `window.__DEEP__` 拿不到值 | 异步链中断后不写结果 |

**这些都修了但仍在某个环节卡住**，调试成本明显高于收益。

## 已确认有效的部分

**setup 上下文是必需的**（上轮已验证）：

| hook | 在真实 setup 里 | 在裸环境里 |
|---|---|---|
| `Collection::r` | `object{fn,setter,_value,dep,__v_isRef,deps}` = **computed** | 抛 context 错误 |
| `Switch::I` | `string` | 抛 context 错误 |

**所以「真实组件上下文能解锁 hook」这个方向是对的。**

## 下一步（如果要继续）

**不要在浏览器里搭探针**，改用 **jsdom + Node**：

```js
// 假设 jsdom 已装
const { JSDOM } = require('jsdom');
const dom = new JSDOM('<div id="app"></div>');
global.document = dom.window.document;
// 然后 require 转译后的模块 + Vue，跑 setup 探针
```

**优势**：
- 模块解析走 Node（没有浏览器的 import specifier 问题）
- 没有页面脚本时序问题
- 可以直接 `console.log` 每一步

**成本**：需要装 jsdom + 把 vendor chunk 转成 CommonJS（或用 vite build 出产物）。

## 结论

| 项 | 状态 |
|---|---|
| 方向（真实 Provider 树） | ✅ 逻辑可行（Root 组件都找到了） |
| setup 上下文解锁 hook | ✅ 已验证（`Collection::r`） |
| 浏览器环境搭探针 | ❌ 调试成本过高 |
| jsdom 方案 | ⬜ 未试 |

**投入产出比已经很低**：剩下的 hook 只有十几个，而且大部分名字已经从
「错误消息里的 context 名」得知（`useDialogRootContext` 等）。
**再投一轮去拿它们的返回值结构，对可读性的边际提升很小。**
