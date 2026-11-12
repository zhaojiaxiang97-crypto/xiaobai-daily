# setup 内联方向：环境因素全部排除，结论是「这条方向无效」

> round-0478
>
> 六轮（0472/0473/0475/0476/0477/0478）追同一个目标：
> 让 setup 内联版本的渲染率超过基线 98。**结论：做不到。**

## 最后一轮的关键验证

### 找到了真正的 `createI18n`

```js
// vue-i18n.runtime.js
function hf(e = {}) {
  let t = !Y(e.globalInjection) || e.globalInjection, n = new Map(),
      [r, i] = _f(e, false), a = hc(``);
  ...
  return l;      // l 是含 install 的实例
}
export { hf as t };   // ← createI18n 的压缩名
```

`S_it` = `gf` = `useI18n`，它要求 `app.__VUE_I18N_SYMBOL__`。

### 用原应用 i18n 建环境，install 完全成功

```
created: true
hasInstall: true
installOk: true          ← install 成功
symbolSet: true          ← app.__VUE_I18N_SYMBOL__ 已设置
providesHasSymbol: true  ← provide 也生效
```

### 但 `$setup.i` 仍然是 undefined

| 版本 | OK | slots | `$setup` |
|---|---|---|---|
| 基线 + 原应用 i18n | **98** | 59 | 11 |
| **实验 + 原应用 i18n** | **44** | **0** | **60** |
| 实验 + 标准 vue-i18n | 44 | 0 | 60 |
| 实验 + 无 i18n | 42 | 0 | 61 |

**三种 i18n 环境（无 / 标准包 / 原应用实例）下，实验版都是 42~44。**

## 六轮完整证据链

| 轮次 | 假设 | 结果 |
|---|---|---|
| 0472 | setup 内联能修 59 个 slots | ✅ slots 归零，但 OK 98→42 |
| 0473 | 补三条规则能挽回 | ❌ 42 |
| 0475 | 多 declarator 拆分能修 `$setup` | ❌ 42 |
| 0476 | 缺 i18n 插件（标准包） | ❌ 44 |
| 0477 | 确认 `S_it` = `useI18n` | （符号本身是对的） |
| **0478** | **用原应用 i18n 实例** | ❌ **44，install 成功也没用** |

## 最终结论

**setup 内联这条方向无效。**

不是环境问题 —— i18n install 成功了、symbol 设上了、provide 也生效了，
但 `$setup.i` 依然是 undefined，OK 依然比基线低 54 个。

**根因只能在内联逻辑本身**：内联进来的 setup 代码与 `<script setup>` 的绑定语义
有不兼容的地方，而且不只是「一个规则没补上」——补了四条规则（多 declarator
拆分 / props 无条件绑定 / 内联文本纳入扫描 / 排除被赋值目标）都没用。

## 该做什么

**停止在这个方向投入。** 六轮的证据足够充分：

- `gen-main.cjs` 维持基线（OK 98）
- 四轮的修法文档保留（有参考价值）
- 若还要提升渲染率，只剩「vendor chunk 全部转换」那条更大的路 ——
  但那需要先建映射表全覆盖，成本远高于已投入的六轮

## 留下什么

1. **`createI18n` 的定位方法**（`hf`，导出为 `t`）—— 以后建测试环境可以直接用
2. **i18n 实例的 install 语义**（async、设置 `__VUE_I18N_SYMBOL__`）
3. **四条 setup 内联修法**（都实现过、验证过）
4. **明确的负面结论** —— 这个方向不用再试了
