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
| 不带 `--only` | 依次执行以上全部 | — |

统一入口：`node tools/deobf.cjs [--only=...] [--dry]`（遍历 `src/**/*.js`）

## 已验证的坑

1. **保留字**：prop 名 `debugger`/`default`/`class` 等不能直接当变量名——必须先过滤
   完整关键字表，否则生成 `const debugger = ...` 直接 SyntaxError。
2. **原型/方法名**：`map`/`filter`/`value`/`data` 这类通用词若用作变量名，会与后续
   属性访问混淆，纳入黑名单。
3. **正则内的 `\x`/`\u`**：属性扫描会命中正则字面量（`/[\x00-\x1f]/`），这些是
   合法语法，**必须保留**，不能当混淆处理。
4. **`(0, obj.method)()`**：这是提取方法解除 `this` 绑定的语义，不是混淆，保留。
5. **改完必须回归**：`node --check` 只保证语法；语义正确性靠 `./build.sh` + 启动 +
   CDP 页面断言。

## 尚未安全的操作

- **组件级物理拆分**：实测顶层 9986 声明零重复，但一条 `var` 逗号链常含多个组件；
  按组件拆会复制同链导致导出冲突。只能按**链**拆，且需处理链内赋值顺序、跨链前向
  引用、`new URL(..., import.meta.url)` 图像路径。详见 `docs/ARCHITECTURE.md`。
