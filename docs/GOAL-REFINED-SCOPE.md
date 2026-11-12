# 目标修正：Vue API 映射的必要性被高估了

> round-0483（goal round 2）
>
> 上轮定的目标是「建完整的 Vue API 映射表」。这轮实测后发现**范围需要大幅收窄**。

## 实测：大部分名字已经是真名

统计 `ui/` + `chunks/` 里所有函数调用的频次，前 25 名：

| 短名 | 调用次数 | 是真名吗 |
|---|---|---|
| `unref` | 11549 | ✅ 真名 |
| `createElementVNode` | 5844 | ✅ 真名 |
| `toDisplayString` | 4961 | ✅ 真名 |
| `resolveComponent` | 4027 | ✅ 真名 |
| `openBlock` | 3918 | ✅ 真名 |
| **`H`** | **3130** | ❌ **压缩名** |
| `ref` | 1916 | ✅ 真名 |
| `computed` | 1322 | ✅ 真名 |
| `createBlock` / `normalizeClass` / `renderList` / `defineComponent` | … | ✅ 全是真名 |

**结论：`chunks/` 目录里的大量文件本来就有语义化命名。**

Vue API 映射的**必要性和范围都要重新评估** —— 不是「全局都需要」，而是
「只有真正压缩的文件需要」。

## 真正压缩的只有 `ui/` 的 15 个文件

`src/renderer/ui/*.js`（1.4M）里是这样的：

```js
function Za(e) { return B(() => !A(e) || !!Z(e)?.closest(`form`)); }
```

而 `chunks/*.js` 里是这样的：

```js
{ default: H(() => [withCtx(e.$slots, `default`)]), _: 3 }
```

**后者已经半可读了**（`withCtx`、`$slots` 都是真名）。

## 正面收获：`H` = `withCtx`

`H` 是**最大的单个压缩符号**（3130 次，其中 3038 次是 getter 形式 `H(() => [...])`）。

从用法确定身份：

```js
{ default: H(() => [withCtx(e.$slots, `default`)]), _: 3 }
```

Vue 的 slot 定义是 `{ default: withCtx(() => [...]) }` —— **所以 `H` = `withCtx`。**

（`withCtx` 是 Vue 内部 API，编译产物里常见，不在公开文档里。）

## 目标修正

| 原目标 | 修正后 |
|---|---|
| 建完整的 Vue API 映射表（~50 个 API，全局应用） | **只针对 `ui/` 的 15 个压缩文件做局部映射** |

**理由**：
1. `chunks/` 大部分已可读，不需要映射
2. `ui/` 才是真正压缩的（`Za`、`B`、`A`、`Z` 这种）
3. 范围小了 10 倍，风险也小 10 倍

## 修正后的执行路径

1. **只对 `src/renderer/ui/*.js` 做映射**（15 个文件）
2. 这些文件都从**同一个 runtime** import（`vue-i18n.runtime.js`）
   —— 所以可以按 `(文件)::(短名) → 真名` 精确映射，不用怕同名不同物
3. 先用上轮已有的 30 条业务函数映射 + 本轮的 `H` = `withCtx` 打底
4. **验证方式**：生成后对比渲染率，确认不降（七轮教训）

## 仍然待解决

**`ui/` 里的 Vue API 短名怎么确定**？

`B` ← `runtime.v` = `rc` = `(e, t) => Cn(e, t, Us)` = **computed**（已验证）
`A` ← `runtime.On` = `fn` = `(e) => g(e) ? e() : dn(e)` = **unref**（已验证）

**方法**：对 `ui/` 里每个文件，提取它的 import 表（`X as 本地名`），
再对 `X` 逐个识别身份。

**识别靠什么**：`runtime` 导出的实现特征 —— 这轮试了内部标识（只覆盖 7 个）、
导出顺序（对不上）。剩下最可靠的是**逐个读实现**（15 个文件里的 import 总数有限，
约 40 个/文件 × 15 = 600 个引用，去重后可能只有几十个不同符号）。
