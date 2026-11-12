# main bundle 错误分类（242 个）

> round-0465
>
> vendor 的 71 个错误在 round-0460 做过详细分类，**但 main bundle 的 242 个从没分析过**。
> 这轮补上，且用了真实 props fixture（55 个组件匹配）。

## 基线（真实 props）

```
total=392  ok=98  empty=52  err=242  (真实 props: 55)
```

比只用空 props 时（109 OK）略低 —— 说明真实 props 里有些值不适合单独渲染
（比如 `activeNav="today-work"` 这类依赖路由状态的值）。

## 错误分类

| 错误 | 数量 | 初步判断 |
|---|---|---|
| `Cannot read properties of undefined`（其它） | **62** | 需要上下文或更深的数据 |
| **`Cannot destructure property 'slots'`** | **59** | **最大单一类，待定位** |
| `Cannot read properties of null (reading 'ce')` | 41 | reka-ui 内部 context |
| `Cannot read properties of undefined (reading 'value')` | 20 | ref / props 未初始化 |
| `Injection Symbol(...) not found` | 20 | 必须父组件内 |
| `'set' on proxy: trap returned falsish` | 12 | 对 readonly proxy 赋值 |
| `_ctx.X is not a function` | 8 | 模板引用未绑定 |
| `Converting circular structure to JSON` | 4 | 序列化问题（可能是我测试代码） |
| `$setup.X is not a function` | 8 | setup 返回值缺失 |

## 追了 `slots` 那 59 个，拿到三个事实

### 1. 链路定位

以 `AiModelSettings` 为例，堆栈：

```
TypeError: Cannot destructure property 'slots' of 'undefined'
    at lucide-icons.js:50:12
    at AiModelSettings.vue:47:35
```

`AiModelSettings` 的模板里 `<component :is="H_">`（`H_` = FeatureInfoDialog），
后者内部用 vendor 的 `DialogRoot`，再往内是 lucide 图标。

### 2. 但图标组件单独渲染是正常的

在浏览器里直接 `h(L.n, { size: 16 })`（`L.n` 就是 `l('pin', [...])` 工厂产物）：

```html
<svg xmlns="..." width="16" height="16" viewBox="0 0 24 24" ... class="lucide lucide-..."></svg>
```

**完整输出，无错误。** 所以图标组件本身没问题。

### 3. 发现一个名称冲突风险

lucide-icons.js 的导出是 `{ n, r, t }`，其中 **`r` 就是工厂 `l` 本身**
（`name === 'l'`），不是组件。

而 `shared.js` 也导出一个 `S_r`。组件里：

```html
@click="t=>r(`test`,e,`manual`)"
```

`r('test', e, 'manual')` 是**三个参数的业务调用** —— 说明这里的 `S_r` 是业务函数，
**不是** lucide 工厂。

**即：`shared.js` 的 `S_<原名>` 命名空间中，不同 chunk 的同名符号会撞车。**
（`r` 在 main bundle 里有几百个，lucide 的只是其中一个。）

## 结论

| 项 | 状态 |
|---|---|
| main bundle 242 个错误分类 | ✅ 本轮完成 |
| `slots` 59 个的链路 | ✅ 定位到 lucide 图标层 |
| 图标组件本身 | ✅ 单测正常 |
| `slots` 的确切根因 | ❌ 未确定 |
| `S_<原名>` 命名冲突 | ⚠️ 已发现风险 |

## 下一步（明确）

`slots` 那 59 个是目前**最大的可回收空间**（98 → 157，+60%）。
已排除「图标组件坏了」，剩下两个方向：

1. **`S_r` 类命名冲突**：shared.js 里 `S_<原名>` 对不同 chunk 的同名符号无法区分，
   需要按「来源 chunk」加前缀（如 `S_main_r` / `S_lucide_r`）
2. **`l` 工厂被当组件**：如果某处 `:is` 拿到的是工厂而非工厂产物，
   `l(props, ctx)` 会把 props 当 name、ctx 当 iconNode，返回一个新函数 → 崩

查法：在 59 个组件里搜 `:is="S_r"` / `:is="r"`，以及所有 import 了 `S_r` 的组件
在模板里怎么用它。
