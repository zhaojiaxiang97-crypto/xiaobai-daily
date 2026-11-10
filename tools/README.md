# 反混淆工具链

本目录保存用于把**打包产物形态**的代码还原为可读语义代码的 AST 工具。所有脚本
都基于 `@babel/parser` + `@babel/traverse` + `@babel/generator`，只做**语义等价**
的转换，改完必须过 `node --check` 并跑构建回归。

## 用法

```bash
cd /tmp && mkdir asar-tools && cd asar-tools
npm init -y && npm install @babel/parser @babel/traverse @babel/generator @babel/types
# 把本目录脚本中的 require('./node_modules/...') 换成上面安装路径，或在 tools/ 下安装依赖
node tools/deobf.cjs --only=params   # 参数语义化
node tools/deobf.cjs --only=locals   # 局部变量形态命名
node tools/deobf.cjs --only=final    # void 0 / !0 / 字符串转义
```

## 脚本职责

| 模式 | 作用 | 风险 |
|---|---|---|
| `--only=computed` | `x["prop"]` → `x.prop`（含 `x?.["prop"]`），仅合法标识符 | 低（AST） |
| `--only=params` | 压缩参数名按「函数体内属性/方法/比较画像」推断语义 | 低（scope.rename） |
| `--only=locals` | `const x = obj.prop` → 变量名取 prop 名（过滤通用词与**全部保留字**） | 低 |
| `--only=final` | `void 0`→`undefined`、`!0/!1`→`true/false`、字符串 `\x`/`\u` 转义还原 | 低 |
| `--only=forms` | `const x = await obj.getY()`→`y`、`new Cls()`→`cls`、`ref([])`→`items`/`ref(null)`→`target` | 低 |
| `--only=callbacks` | `.then(x=>)`→`result`、`.catch(x=>)`→`err`、`.map(x=>)`→`item`、`.reduce((a,b)=>`→`acc,cur`、`.sort((a,b)=>`→`left,right` | 低 |
| `--only=byfunc` | 参数按**函数名名词**命名（`openTodo(x)`→`todo`）、`const x = 语义名`→取右侧名、`.parse()`→`parsed`、`.join()`→`joined` | 中（必须过全局黑名单） |
| `--only=more` | `const x = getSettings()`→`settings`、`a \|\| b`→取语义侧名、`[]`→`items`、`()=>{}`→`handler`、对象字面量按属性推断（`ok/error/data`→`result`、`title/status`→`record`、`url/method`→`request`） | 低 |
| `--only=late` | `let x; x = {...}`（后续赋值形态）、三元取分支名、`a+b`→`text`/`total`、`a-b`→`diff`、字面量按内容（`fileName`/`urlText`/`dateText`/`label`/`count`/`flag`） | 低 |
| 不带 `--only` | 依次执行以上全部 | — |

统一入口：`node tools/deobf.cjs [--only=...] [--dry]`（遍历 `src/**/*.js`）

## 已验证的坑

1. **保留字**：prop 名 `debugger`/`default`/`class` 等不能直接当变量名——必须先过滤
   完整关键字表，否则生成 `const debugger = ...` 直接 SyntaxError。
1b. **全局内置对象（最严重）**：函数名含 `Window` 时名词规则会生成 `window` 形参，
   遮蔽全局 `window` 引发 `Cannot access 'window' before initialization`（TDZ），
   页面白屏。必须维护独立的 `GLOBALS` 黑名单（window/document/process/console/
   require/electron/ipcMain/BrowserWindow/Promise/Map/Set/URL/…），它**不等于**
   关键字表。已知库/框架名也应纳入。
1c. **原型链陷阱**：`MAP[callee.property.name]` 当键名是 `toString`/`toLocaleString`
   时会命中 `Object.prototype` 上的同名方法并返回函数对象。映射表查询必须用
   `Object.prototype.hasOwnProperty.call(MAP, key)` 或 `Object.create(null)`。
2. **原型/方法名**：`map`/`filter`/`value`/`data` 这类通用词若用作变量名，会与后续
   属性访问混淆，纳入黑名单。
3. **正则内的 `\x`/`\u`**：属性扫描会命中正则字面量（`/[\x00-\x1f]/`），这些是
   合法语法，**必须保留**，不能当混淆处理。
4. **`(0, obj.method)()`**：这是提取方法解除 `this` 绑定的语义，不是混淆，保留。
5. **改完必须回归**：`node --check` 只保证语法；语义正确性靠 `./build.sh` + 启动 +
   CDP 页面断言。

## 命名模式汇总（累计已应用）

| 模式 | 主进程 | 前端主 bundle |
|---|---|---|
| params（使用画像） | 284 | 859 |
| locals（prop 形态） | 28 | 616 |
| forms（await/new/ref） | 351 | 450 |
| callbacks（回调位置） | 818 | 1630 |
| byfunc（函数名词/别名/方法结果） | 3176 | 1706 |
| more（调用结果/logical/容器字面量） | 1193 | 1743 |
| late（后续赋值/三元/运算/字面量） | 63 | 797 |
| 2026-11-09 全库复跑（九模式一次跑） | params 800 / locals 862 / forms 367 / callbacks 1216 / byfunc 2465 / more 1331 / late 1059（96 文件） |
| final（void 0 / !0 / 转义） | 3008 / 12612 / 89 文件 | 同左（全库） |

## 短名（1–3 字符）扩展匹配

`COMPRESSED` 正则可放宽到 `^[A-Za-z_$][\w$]{0,2}$`，覆盖 `Aa`/`$a`/`M2` 这类此前
未处理的压缩形态。但必须同时维护 `MEANINGFUL_SHORT` 白名单（`id`/`ok`/`el`/`fn`/
`max`/`min`/`url`/`api`/`err`/`msg`/`row`/`col`… 约 150 个），否则会把有意义的
短名也改掉。放宽后全库可新增命名约 1176 处（byfunc 620 为最多）。

## import 别名语义化（前端专属）

前端主 bundle 的 42 条 `import { A as e, At as t … } from "./xxx.js"` 中，325 个别名
有 **303 个是 ≤2 字符**。它们不是局部变量，而是模块级绑定（`binding.kind === 'module'`），
遮蔽了大量短名。

做法：
1. 用 `Program` scope 的 `bindings` 取 `kind === 'module'` 的绑定，按
   `referencePaths.length` 排优先级（只处理引用 ≥100 的）
2. 从 `binding.path` 反查 `ImportSpecifier.imported` 得到原导出名，从
   `ImportDeclaration.source` 得到来源模块
3. 命名 = **来源缩写 + 导出名**（`vue` + `N` → `vueN`；`dialog` + `T` → `dialogT`；
   `Switch` + `R` → `uiSwitchR`），个别已知语义直接命名（`H` → `withCtx`）
4. 必须过 `GLOBALS` 黑名单与 `hasBinding` 检查

分层处理建议：引用 ≥100 的先做（12 个，需人工确认语义）；引用 5–99 的按
「来源缩写 + 导出名」批量处理（125 个，覆盖约 1300 处引用）；引用 <5 的收益低。

来源缩写表需覆盖常见 chunk（vue-i18n.runtime→vue、Switch→uiSwitch、
lucide-icons→lucide、dialog→dialog、alert-dialog→alertDialog、
screenshot-beautifier→beautifier、en-US-player→player 等）。

实测效果：`H(n.$slots, 'default')` → `withCtx(n.$slots, 'default')`；
`unref(je)(...)` → `unref(uiSwitchXt)(...)`。表项与缩写表需人工维护，不宜自动化过度。

## 模式化命名（前端 Vue 结构）

前端压缩代码里有三类高频**结构化模式**，可整体识别命名，覆盖量远超逐变量推断：

1. **i18n translate**：`const { t: X, locale: Y } = vueN()` —— `X` 恒为翻译函数，
   命名 `translate`（判据：X 在作用域内被当作函数调用）。同一文件的多个组件 setup
   会重复出现该模式。
2. **组件变量**：`X = defineComponent({ __name: 'SelectItem' })`（可能被
   `_export_sfc` 包裹）—— 按 `__name` 命名（`SelectItem`/`SelectItemComponent`）。
   Vue 组件的 `__name` 是可靠的语义源。
3. **渲染缓存**：`X[N] ||= ...`（NumericLiteral 下标 + `||=`）—— Vue 编译产物
   的 patch cache，命名 `cache`。

这三类在本项目共 2315 个候选、实际应用 765 个（其余因作用域冲突跳过）。

## Vue setup 语义命名（覆盖量最大的一类）

Vue 组件的 `setup` 签名是固定的：`setup(props, context) { ... return (ctx, cache) => render() }`。
压缩后表现为：

```js
setup(e) { let t = e; return (n, r) => (openBlock(), createElementBlock(...)) }
setup(t, { emit: n }) { let r = t; ... }
```

因此可确定地命名（本项目 458 个 setup、298 个首参为短名）：

| 位置 | 命名 |
|---|---|
| `setup` 首参 | `props` |
| `setup` 第二参（非解构） | `context` |
| 第二参解构键（`emit`/`attrs`/`slots`） | 与键同名 |
| `setup` 内 `return (A, B) =>` 的 A / B | `ctx` / `renderCache` |

**关键教训**：`props`/`ctx`/`cache`/`emit` 不是 JS 全局对象，**不能放进 GLOBALS
黑名单**——否则目标名被自己拦掉（本轮首次运行 0 个 `setup(props` 就是这个原因）。

实测：458 个 setup 中 305 个变为 `setup(props, ...)`；`ctx` 597 处、`renderCache` 1671 处。

## API 客户端对象命名

前端常见 `var xx = { async list(){}, async create(){}, ... }` 形式的 API 客户端对象。
按**方法名关键词投票**决定业务域，命名 `<domain>Api`；置信度门槛 `命中数/方法数 ≥ 0.35`
且命中 ≥2，否则跳过（方法太杂的对象误判率高，如 bot/消息类多域混合对象）。

实测：59 个候选 → 高置信仅 4 个（`syncApi`/`reportApi`/`privacyApi`/`statsApi`）。

补充：Vue 组合式 API（`defineProps`/`defineEmits`/`useSlots`/`useAttrs`/
`useRouter`/`inject`）在打包产物中**已被编译器内联消除**，正则/AST 均搜不到，
不要浪费时间在这条线上。


## 反向启发式命名（较晚发现，收益显著）

除「从右侧表达式推断」外，还有一组**从使用目标反推**的启发式，对 `_0x` 变量
特别有效（本项目单轮合计 780 个）：

| 启发式 | 判据 | 例子 |
|---|---|---|
| 属性名反向 | `obj.prop = _0x` 或 `{ prop: _0x }` | `_0x` → `prop` 名（482 个） |
| 实参反推 | `_0x` 作为实参传给已知函数 | `handle(_0x)` → 按 `channel` 形参命名（261 个） |
| 别名复制 | `const _0x = 语义名` | → 同名或 `+Ref`（37 个） |
| 数组元素 | `已知数组.push(_0x)` | → `item` |

**注意**：这些规则同样必须过 `scope.hasBinding`，且只用于 `_0x`（主进程）——
前端短名使用同类规则风险高（见下方边界表）。


## 应用验证脚本（最重要）

| 脚本 | 用途 |
|---|---|
| `tools/verify-app.sh <App> [port]` | **内容断言**：启动 → 遍历九页面断言 `.content-body` 文本长度 → PASS/FAIL |
| `tools/check.sh` | 全流程：语法 → 构建 → 结构自检 → 九页面内容断言 |
| `tools/selfcheck.sh` | 产物结构与混淆残留统计 |

### 为什么必须断言主内容

本项目两次事故（round-0400 import 别名批量改名、round-0402 函数参数改名）都表现为
**侧边栏正常、主内容区全空**。此前只检查「导航项存在」的验证方式无法发现，导致
坏版本连续通过十余轮"验证"。`verify-app.sh` 断言 `.content-body` 的文本长度，
能立即发现这类回归。

测试数据要求：`$HOME/Library/Application Support/xiaobai-daily/data/xiaohei.db`
（含 `usageModeGuideSeenUserId=1`，用于跳过新手引导直达主内容）。

## 改动风险边界（实测结论，务必遵守）

| 改动类型 | 主进程 | 前端 | 判据 |
|---|---|---|---|
| 变量/参数命名 | ✅ 安全 | ⚠️ 仅函数内局部变量 | 前端参数改名会破坏 Vue render |
| import 别名改名 | ✅ 安全 | ❌ 禁止 | 前端别名被 Vue 运行时闭包引用 |
| 顶层绑定改名 | ⚠️ 谨慎 | ❌ 禁止 | 跨 chunk 引用关系复杂 |
| 括号属性→点访问 | ✅ | ✅ | AST 语义等价 |
| `void 0`/`!0` 还原 | ✅ | ✅ | 语义等价 |
| 字符串转义还原 | ✅ | ⚠️ 正则内不可动 | 正则字面量内的 `\x`/`\u` 合法 |

## 反向启发式命名器

`tools/deobf-rules.cjs <文件> [--suffix-only] [--imports]`

从「使用目标」反推语义（与 `deobf.cjs` 从右侧表达式推断互补）：

- **属性名反向**：`obj.prop = _0x` / `{ prop: _0x }` → 用 `prop`（本项目单条
  规则收益最高，482 个）
- 画像实体：按被访问的属性/方法归类（event/el/items/text/response/row/result）
- init 属性名、调用名去动词、函数名名词
- 所有候选都带后缀变体（`Value`/`Input`/`Arg`/`Data`/`Result`/`Item`/`Info`/`Ref`）
  规避绑定冲突——这是解锁大量命名的关键

**安全约束**：每个候选都必须通过 `scope.hasBinding`（沿作用域链），防止遮蔽。

## 尚未安全的操作

- **组件级物理拆分**：实测顶层 9986 声明零重复，但一条 `var` 逗号链常含多个组件；
  按组件拆会复制同链导致导出冲突。只能按**链**拆，且需处理链内赋值顺序、跨链前向
  引用、`new URL(..., import.meta.url)` 图像路径。详见 `docs/ARCHITECTURE.md`。
