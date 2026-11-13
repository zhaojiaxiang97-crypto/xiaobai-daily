# 组件预览

从 Electron 打包产物反编译出的 Vue 组件，**在隔离环境逐个渲染后截图**。

打开 `index.html` 就能看全部效果（静态截图，不需要装依赖、不需要联网）。

## 数据

| 项 | 值 |
|---|---|
| 参与渲染 | **107**（`main` 98 + `vendor` 9） |
| 渲染成功 | **102** |
| 失败 | 5（列在页尾） |
| 截图 | 102 张，548K |

## 重要说明：截图是无 props 的裸渲染

组件在**无 props、无父组件上下文**的环境里渲染，样式由 Tailwind CDN 提供。

**所以看到的是「组件结构本身」，不是它在真实应用里的样子。**
很多组件的效果依赖传进来的数据和周围的父组件（`DialogContent` 必须在
`DialogRoot` 里、`HeatMapPage` 需要真实业务数据）。

## 怎么生成的

1. 每个组件用**独立页面**加载（`one.html?name=X&group=Y`）——隔离错误
2. 页面里挂 Tailwind CDN 提供样式
3. 等 `window.__STATUS__` 变成 `OK` 再截图（避免截到空白）
4. 裁剪到内容实际高度

### 为什么不用单页画廊

试过在一个页面里渲染全部组件，**连只加载 3 个都失败**：`#app` 变成 `<!---->`，
`errorHandler` 也捕获不到。原因是组件模块的顶层代码会污染全局
（出现过 `'set' on proxy: trap returned falsish`），把 Vue 的渲染管线搞崩。

**隔离页面是唯一可靠的做法**（Storybook 也是这么做的）。

## 也能实时跑

```bash
cd ..          # 回到 vue/
npm install
npm run dev    # 访问 /one.html?name=Alert&group=components
```
