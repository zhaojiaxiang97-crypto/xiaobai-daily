# 模块依赖图重建：本轮进展与真实障碍

> round-0422

## 本轮修复的四层问题（依次暴露）

| # | 症状 | 根因 | 修复 |
|---|---|---|---|
| 1 | `Mt is not defined` | `shared.js` 用 `export { r as Mt } from '...'` 做 re-export，**ES 模块的重新导出不会在当前模块建立本地绑定**，而随后的顶层代码 `var oa = Mt(...)` 需要它 | 改为 `import { r as Mt } from '...'` + 末尾 `export { Mt }` |
| 2 | `defineComponent is not defined` | 组件定义（`var uc = defineComponent({...})`）被误平铺进 shared.js；排除判断用的是"声明起点是否落在组件区间内"，而声明起点在调用之前 | 改为**区间重叠**判断（`start < b && end > a`）。效果：共享符号 9660 → **2484**，shared.js 5.5MB → **1.4MB** |
| 3 | `Identifier "h" has already been declared` | import 了 Vue 的 `h`，但 main.js 自己有顶层 `h` 或 re-export 本地名 `h` | 改为 `import * as __vue from 'vue'` + **AST 改写** body 里的 Vue API 引用为 `__vue.xxx`（672 处），彻底避免任何同名冲突 |
| 4 | `Ie is not defined` | `Ie` 是 `import { Cn as Ie } from 'vue-i18n.runtime.js'`，我此前把该模块的导入全跳过了 | 区分：映射表内的算 Vue API（走 `__vue`），其余内部工具函数仍从运行时导入（38 处） |

## 修完后的状态

```
✓ 87 modules transformed.
✓ built in 8.23s        ← Vue 工程构建持续成功
```

**但渲染仍失败**：

```
TypeError: Cannot read properties of undefined (reading 'EntityStart')
  at new PJe (...)
```

这是 **HTML 实体解码器**的枚举在构造时还未初始化 —— **模块初始化顺序问题**。

## 真实障碍：平铺方案无法保证初始化顺序

原 bundle 由 vite/rollup 打包，模块之间有一套精细的初始化顺序（拓扑序 + 循环
依赖的 hoisting 处理）。把这些代码平铺进一个 `shared.js`，等于把多个模块的
顶层语句拼在一起，**原有的执行顺序保证丢失**：

- `var x = someFn()` 可能在 `const someFn = ...` 之前执行（TDZ 报错）
- 枚举对象（如 `EntityStart`）在被引用时还没赋值
- 循环依赖在两个模块之间无法用 hoisting 解决

**这不是修几处就能过的**，是架构问题。

## 正确的下一步：按模块边界切分

不能再平铺。要做的是：

1. **确定真实模块边界**：`__vite__mapDeps` 数组 + 各 chunk 的 import 图
2. **切分 shared.js** 成 N 个模块文件，保留各自的 import/export
3. **拓扑排序**初始化顺序，对循环依赖用函数提升或延迟初始化处理
4. 组件只 import 自己真正需要的模块

工作量与原反编译器同级，但是可做的 —— 每一步都能用 `npm run build` +
SSR 渲染验证。

## 已确认可用的产出（不受此障碍影响）

- **源码树路径已修好**：29 处断链 + 11 处死引用清零，Electron 应用构建运行 PASS
  （九页面 388/388/1097/192/433/2439/240/304/1352）
- **391 个 .vue 是合法 SFC**，能被 vite 正常编译（87 modules 构建验证）
- **组件注册表 341 项**：把 `<component :is="YM"/>` 还原为 `<SettingsSection/>`
- **Vue API 映射 16 项**（运行时行为探测），修正静态分析 5 处错误
- **依赖解析**：模板里的 props/别名/跨 chunk 符号已能正确生成 import
