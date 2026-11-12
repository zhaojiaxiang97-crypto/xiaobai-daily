# 真实 props fixture：方法跑通了，但救不了渲染率

> round-0464
>
> 想法：不再「猜」mock props，而是从**运行中的应用**里 dump 真实的组件 props。

## 方法（跑通了）

生产构建里 `app._instance` 是 null、DOM 上也没有 `__vueParentComponent`
（那是 dev build 才挂的）。**唯一可行入口**：

```js
const app = document.querySelector('#app').__vue_app__;
const root = app._container._vnode.component;   // ← 这里能拿到根实例
// 然后遍历 inst.subTree 里的 vnode.component
```

写成的工具：`tools/vue-decompiler/dump-props-vnode.js`（单页 dump）+
`collect-props-fixture.py`（点侧边栏遍历 9 个页面并合并）。

**结果**：从 9 个页面收集到 **109 个组件的真实 props**，其中 **100 个带 props**。

样本质量（这是真实数据，不是我猜的）：

```json
"Sidebar":            { "activeNav": "today-work", "collapsed": false }
"CreditCampaignCard": { "userId": 1, "variant": null, "refreshKey": null }
"DialogContent":      { "forceMount": false, "asChild": false,
                        "class": "!max-w-[680px] h-[86vh] flex flex-col gap-0 overflow-hidden p-0",
                        "showCloseButton": true }
"AlertDialogContent": { "forceMount": false, "asChild": false,
                        "class": false, "size": "default" }
```

## 但对渲染率没有帮助

拿 145 个 vendor 组件测（29 个匹配到 fixture）：

| 项 | 空 props（基线） | 真实 props |
|---|---|---|
| OK | **10** | **9** |
| EMPTY | 62 | 65 |
| ERR | 71 | 71 |

**没提升，甚至少 1。**

## 为什么

剩余错误的主体根本不是「props 值不对」：

| 错误 | 数量 | 真实原因 |
|---|---|---|
| `Cannot read properties of undefined` | 34 | 访问的是 **provide/inject 的 context 字段**，不是 props |
| `Cannot read properties of null (reading 'ce')` | 8 | 同上（reka-ui 内部 context 对象） |
| `Injection Symbol(DialogRootContext) not found` | 4 | **明确的 provide/inject 缺失** |
| `_ctx.X is not a function` | 6 | 模板引用未绑定 |

**vendor 组件大量是 reka-ui 的内部实现**（Popper / Dialog / Menu 的 Root / Content /
Portal / Anchor）。它们的定位就是「必须在某个 Root 提供的 context 里」——
**props 给对了也没用，缺的是父组件树。**

## 结论

**方法本身是可复用的资产**（`dump-props-vnode.js` + `props-fixture.json`），
以后要做任何「用真实数据跑还原组件」的验证都能直接用。

**但它改变不了 vendor 线的渲染率** —— 因为瓶颈不在数据，在组件树结构。

## 下一步若要提升，只剩一条路

**父组件组合渲染**：`<DialogRoot><DialogContent/></DialogRoot>` 这样按组件族组装，
让 provide/inject 自然成立。

不过 main bundle 线在 round-0432 试过类似做法（按组件名后缀划族、用 `XxxRoot`
包裹），只从 91 提升到 94（+3）。**预期收益同样有限。**
