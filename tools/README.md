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

## 尚未安全的操作

- **组件级物理拆分**：实测顶层 9986 声明零重复，但一条 `var` 逗号链常含多个组件；
  按组件拆会复制同链导致导出冲突。只能按**链**拆，且需处理链内赋值顺序、跨链前向
  引用、`new URL(..., import.meta.url)` 图像路径。详见 `docs/ARCHITECTURE.md`。
