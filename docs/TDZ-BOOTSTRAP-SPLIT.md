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


## 让首屏真正有内容：三处容错

TDZ 修完之后首屏还是白的，逐个排掉三个原因（数据来自真实 Chrome + 真 preload）：

**1. 模板里 `X.value` 的语义在转换中变了。**
原组件的 render 函数直接访问 `p.value`（setup 返回的 computed 没被解包）；转成模板后
Vue 会自动解包 ref，`p.value` 变成 `(220).value` = `undefined`。
实测表现：`:style="{'--sidebar-expanded-w': `${p.value}px`}"` 渲染成 `undefinedpx`，
`.app-layout` 宽度塌成 12px，整页只剩一个图标。

修法：还原 setup 声明时记录「ref 型绑定」（`ref/shallowRef/computed/customRef/toRef` 初始化），
模板里把这些名字的 `.value` 去掉；剩下的未知绑定加可选链 `?.value` 防崩
（只改读取，`v-model` 与赋值一律不动 —— 否则编译成 `X?.value = e` 直接语法错误）。

**2. hook 抛异常会中断整个 setup。**
i18n 未安装时 `useI18n()` 抛 `NOT_INSTALLED`，异常打断 setup，后面所有绑定都没建立。
修法：解构前先 try/catch 兜住 hook 调用，并给解构项默认值（`t` 默认 `() => ''`，其余 `{ value: undefined }`）。

**3. 宿主页面缺两条布局规则。**
原应用由 Electron 外壳保证 `#app` 撑满；浏览器里要自己补：

```css
#app { display: flex; height: 100vh; }
.app-layout { width: 100%; }
```

缺这两条，`.app-layout` 只有内容宽度（实测 12px），界面等于不可见。

## 三处修复后的实测

| 项 | 值 |
|---|---|
| 批量挂载（默认产物） | 105 → **112** |
| 批量挂载（`RESTORE_SETUP_HOOKS=1`） | 83 → **117** |
| 首屏 `#app` 内容 | 7B → **8246B** |
| 首屏可见文案 | `加载中… / 小白日报 / 小白已锁定 / 保护你的工作记录，请输入应用锁密码后继续 / 忘记密码？使用助记词重设` |

注意 `RESTORE_SETUP_HOOKS=1` 现在的批量挂载率**反超**默认产物（117 > 112）：hook 调用被
try/catch 兜住后，i18n/store 解构不再把组件打成错误态，之前的「105 → 83 回归」消失了。

**仍然到的边界**：首屏停在 loading 骨架 + 应用锁一层，主界面不出来。
原因是 App 的 setup 里那些「初值依赖 IPC」的声明（拉数据、初始化）被安全子集剔除了，
加载流程根本没跑。要往下走需要执行这些逻辑，也就是真正的 setup 体还原 + 数据来源处理。


## 试过但暂不可用：setup 顶层语句全量还原

App 的 setup 有 70 条顶层语句，安全子集只取其中 20 条（初值不依赖 IPC 的）。
剩下的包含 store hook 解构、watch、以及拉数据的调用 —— 也就是让 loading 结束的那部分。

实验脚本 `tools/vue-decompiler/restore-full-setup.cjs` 把它们全量还原，结果：

| 项 | 值 |
|---|---|
| 顶层语句保留 | 70 / 70（符号全部可解析，shared 导入 34 个） |
| 生成脚本语法 | 通过 |
| 首屏 `#app` | **8246B → 1809B（退化，只剩 loading）** |

两个卡点：

1. `useI18n()` 即使在真外壳里也抛 `NOT_INSTALLED`（i18n 实例没装上），异常打断 setup。
   给顶层 hook 调用包 `__safe` 也只能兜住解构，兜不住后续依赖这些值的逻辑。
2. 模板里的辅助函数（如 `:style="at({...})"` 的 `at`）在 shared 里是**同名的另一个符号**，
   调用即抛 `$setup.at is not a function`。这类符号属于模板编译期辅助函数，
   需要按语义映射（`normalizeStyle` 等），不能靠名字对齐。

所以当前正解是「安全子集 + 显式开关」：默认产物拿 112 个可渲染组件，
需要看整应用首屏时开 `RESTORE_SETUP_HOOKS=1`（117 个 + 应用锁界面）。


## 模板辅助函数：`:style="X(...)"` 的外层调用要去掉

除 i18n 之外，全量还原还有第二个障碍：模板里的 `:style="at({...})"`。
`at` 本该是 `normalizeStyle` 一类编译期辅助函数，但 shared 里同名符号是 vue-i18n 的调度器
（`nr`），调用直接抛 `at is not a function`，style 整块丢失。

这类符号不能靠名字对齐。现在的处理是**把外层调用去掉**：
`normalizeStyle` 对纯对象/数组就是原样返回，`:style="at({...})"` 与 `:style="{...}"` 等价。
生成器里做（37 个组件命中），实测批量挂载仍是 112，没有回归。

## 首屏布局：能看见，但还没对齐

真实 Chrome + 真 preload 下的当前状态（`RESTORE_SETUP_HOOKS=1` 的产物）：

- `#app` 内容 8247 B
- i18n 已装上（`__app__.__VUE_I18N_SYMBOL__` 为真），文案是真实翻译
  （`小白已锁定` / `忘记密码？使用助记词重设`）
- `--sidebar-expanded-w: 220px`（setup 还原的 computed 生效）
- 应用锁面板完整渲染（锁图标 + 说明 + 密码框 + 入口链接），见 `vue/preview/app-lock.png`

没对齐的是外壳层宽度：原 CSS 的 `#app{width:100%;height:100%}` 依赖 html/body 有高度，
宿主页面已经补了 `html,body{height:100%}`；但 `.app-layout` 的 flex 规则（`flex:1 1 0%`）
在没有正确父级 flex 上下文时，宽度只剩内容宽度（12px 或内容宽 820px）。

试过三种宿主写法：不加 #app 规则（12px，界面不可见）、`#app{display:flex}`（820px，面板可见但错位）、
`#app>*{width:100%!important}`（1192px，但面板被挤没）。最终保留「可见」的那一版，
精确对齐需要照着原外壳的 flex 上下文补，属于外壳适配、不影响还原产物本身。


### 补一个关键事实：应用锁真实状态是「未设置」

在真外壳里直接调 `window.electronAPI.appLock.getState()`：

```json
{"ok":true,"data":{"configured":false,"enabled":false,"locked":false,
 "retryAfterSeconds":0,"recoveryMode":"wordSelection"}}
```

也就是说这台机器上**从来没设过应用锁**，界面不应该出现锁屏。它出现是因为
`App.vue` 里 `We = ref({configured:true, enabled:true, locked:true})` 这个**初值**
从来没有被真实状态覆盖 —— 拉状态的初始化逻辑依赖 IPC，被「安全子集」排除了。

手工验证过：在 `App.vue` 的 setup 里补一段 `onBeforeMount` 调 `getState` 并
`Object.assign(We.value, data)`，IPC 返回正常（日志可见 `locked:false`），但锁屏**仍然显示** ——
说明显示条件在 `AppLockOverlay` 内部（它有自己的一套状态判断），只同步 `App` 的 `We` 不够。

结论：主界面差的是「初始化链路」，不是渲染能力。要往下走必须还原
`App` 与 `AppLockOverlay` 里那些依赖 IPC 的初始化语句，而不是在宿主层打补丁。


## 初始化链路：已经定位到具体语句

上一轮只知道「主界面差初始化链路」。这一轮把它挖出来了。`App` 的 setup 里有一整块：

```js
onBeforeMount(async () => {
  en = Dt(o.value), jt = ZR.onStateChanged(e => { We.value = e, Ge.value = true; });
  try { We.value = await ZR.getState(); } catch {} finally { Ge.value = true; }
  At = window.electronAPI?.notifications?.onNativeAction?.(...);
  ...
});
```

- `We` = 应用锁状态（`configured/enabled/locked`），模板按 `Ge ? We.locked ? 锁屏 : null : …` 分支
- `Ge` = 是否已加载完
- `ZR` = 应用锁 API 封装

**两个实测事实**：

1. `ZR.getState()` 返回的是**裸对象**
   `{"configured":false,"enabled":false,"locked":false,...}` —— 没有 `{ok, data}` 包装。
   （上一轮的手工补丁按 `r.ok && r.data` 判断，所以永远不成立，白试。）
2. 这块代码**根本没执行到**：`en = Dt(o.value), jt = ZR.onStateChanged(...)` 是序列表达式，
   `en`/`jt` 在原 setup 里声明过、但没被还原，严格模式下直接抛 `ReferenceError`，
   `onBeforeMount` 整个中断，后面的 `We.value = await ZR.getState()` 不会跑。

也就是说：**锁屏常驻不是渲染问题，是 `onBeforeMount` 第一行就抛错**。

把 `en`/`jt` 预声明成 `let` 后，首屏反而变成 0 字节（setup 里下一个隐式变量继续抛）。
说明「只还原顶层语句 + 补几个 let」不够，原 setup 的声明链要更完整地还原。

## 边界

- 传递闭包有阈值保护（`REFACTOR_CAP`，默认 200 个 unit）。闭包失控时退化为只移种子，
  宁可报错也不搬走整片共享工具
- `App.vue` 里仍有少量悬空符号（如 `iW`），它们是原 bundle 里本就不在本模块作用域的引用，
  只在事件回调触发时求值，不影响挂载

## 整应用首屏：推进到哪一步

TDZ 解决后，可以把 `vue/app.html` 放进**原 Electron 外壳**里跑：启动原 app
（`--remote-debugging-port=9229`），用 CDP 把窗口导航到本地 vite 的 `app.html`。
preload 会在新页面注入，`window.electronAPI` 可用，IPC 走真实主进程。

实测（真实 Chrome + 真 preload）：

| 构建模式 | `#app` 内容 | 现象 |
|---|---|---|
| 默认（组件库优先） | 7 字节 | `Cannot read properties of undefined (reading 'value')` |
| `RESTORE_SETUP_HOOKS=1` | **8296 字节** | 渲染出应用锁界面（见 `vue/preview/app-lock.png`） |

`RESTORE_SETUP_HOOKS=1` 打开后，生成器会识别原组件 setup 里的
`{ t: N } = useI18n()` 这类解构并补回绑定。首屏文本从 `加载中...` 变成
标题栏 + 应用锁密码框 + `返回密码解锁`。

代价是批量挂载率：**105 → 83**。原因是裸挂载环境没有 `app.use(i18n)`，
`useI18n()` 抛 `NOT_INSTALLED`，直接把组件打成错误态。两种用途正交，所以做成开关，
默认关闭。

也试过「把 setup 顶层声明整体还原」，数据否掉了这个方向：

| 方案 | 批量挂载 OK | App 首屏 |
|---|---|---|
| 不还原 | 105 | 崩溃（undefined.value） |
| 只还原模板引用到的声明 + 依赖闭包（App 20/63 条） | 60 | 崩溃（null.value） |
| 只还原 hook 解构（开关） | 83 | 渲染出应用锁界面 |

原因：模板里的短名（`p` / `a` / `o`）在原组件里是 `ref` / `computed`，初值又依赖
IPC 与别的 setup 局部符号。只搬声明、不搬依赖链，拿到的仍是半成品；而把依赖链全搬进来，
就把「组件库」变成了「半个应用」，批量挂载自然崩。**要真正跑起来，需要的是
setup 函数体的完整还原（含数据来源 mock），那是另一个量级的工作。**

