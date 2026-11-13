# TDZ 的最终解法：启动代码拆到 `bootstrap.js`

**结论**：`shared.js` 里不能再放「求值期立即读取组件绑定」的代码。
拆出 7 个顶层 unit（22 个符号）到 `bootstrap.js` 后，
以 `App.vue` 为入口加载不再抛 TDZ，`createApp().mount('#app')` 正常执行。

## 症状

```
ReferenceError: Cannot access 'G9' before initialization
    at shared.js:66327
```

只在「以根组件为入口」时出现：`App.vue` / `Sidebar.vue` / `TodayWork.vue`。
批量挂载单个组件不受影响 —— 所以 24% 的渲染率长期掩盖了这个问题。

## 根因（三层，逐层排除后剩下的）

1. **不是 parse 失败**：2120 个顶层 unit 全部可解析（实测 0 失败）
2. **不是符号表太小**：458 个组件局部名齐全，集合完整
3. **是模块环 + 求值顺序**

```js
// shared.js 顶层
var Z9 = new URLSearchParams(location.search).get('window'),
  Q9 = Z9 === 'todo-floating' ? L2t : Z9 === 'wooden-fish' ? V2t : G9,   // Ct = createApp
  $9 = Ct(Q9);
aa((e, t) => Ot('action', e, t)), $9.use(Yt), $9.mount('#app');
```

`G9` / `L2t` / `V2t` 是组件的 import 绑定。391/392 个组件又 `import { … } from '../shared.js'`，
形成环。以 `App.vue` 为入口时求值顺序是：

```
App.vue（求值中）→ shared.js（求值）→ 读 G9（组件绑定，尚未初始化）→ TDZ
```

`.install` 排除（59 → 32）只能减少环的宽度，消除不了这个点。

## 解法

1. 每个顶层 unit 用 AST 取两组符号：**顶层声明名**、**无本地绑定的自由引用**
   （不用正则拼字符串扫代码 —— 那正是前几轮失败的共同原因）
2. 种子 = 自由引用里命中组件局部名的 unit
3. **传递闭包**：自由引用命中「已移出符号」的 unit 也一起移出，否则 shared.js 留悬空引用
4. 两部分走同一条改写管线（Vue API → `__vue.x`、跨 chunk 改名、资源路径重写）
5. bootstrap 侧对 shared 符号的引用改写成 `__s.S_xxx`

依赖方向变成单向：

```
bootstrap.js → shared.js
bootstrap.js → 组件
组件          → shared.js
```

`shared.js` 的组件 import 从 6 降到 **0**。

## 顺带修掉的静默 bug

```js
if (u.kind === 'var') for (const d of u.declarators) if (t.isIdentifier(d.id)) localNames.add(d.id.name);
else if (u.kind === 'func') localNames.add(...);   // ← else 绑在内层 if 上
```

`else` 绑到内层 `if`，所以**所有顶层函数名从未进入 `localNames`**（2134 个漏项）。
后果：函数在 `shared.js` 里定义了，却没有 `export { aa as S_aa }`；
bootstrap 引用它们时 `aa is not defined`。
加块级花括号后 `本地声明 7548 → 9202`。

## 实测

| 项 | 拆分前 | 拆分后 |
|---|---|---|
| shared.js 组件 import | 6 | **0** |
| 未定义符号自检 | 0 | 0 |
| bootstrap.js | — | 7 unit / 32K |
| 批量渲染（同脚本同环境） | 104 OK | **105 OK** |
| `App.vue` 为入口加载 | `Cannot access 'G9' before initialization` | **成功** |
| `bootstrap.js` 执行后 | — | `#app` 已由 Vue 接管（空注释节点） |

渲染出空节点不是挂载失败：`App.vue` 依赖主进程 IPC 数据（设置 / 待办 / 登录态），
浏览器里没有数据源。**挂载链路本身是通的**。

## 复现

```bash
node tools/vue-decompiler/gen-main.cjs <main.js> tools/vue-decompiler/convert-component.cjs <out>
mkdir -p <out>/src/vendor && cp -R <renderer>/* <out>/src/vendor/
tools/vue-decompiler/verify-root-entry.sh <out> 5212
```

## 边界

- 传递闭包有阈值保护（`REFACTOR_CAP`，默认 200 个 unit）。闭包失控时退化为只移种子，
  宁可报错也不搬走整片共享工具
- `App.vue` 里仍有少量悬空符号（如 `iW`），它们是原 bundle 里本就不在本模块作用域的引用，
  只在事件回调触发时求值，不影响挂载
