# 静态 API 映射：为什么不可行（含实证）

> round-0417 调查结论

## 结论先说

**静态 AST 特征识别对这段代码不可行，且补全 167 个导出没有实际收益。**

理由有两条实证：

1. 静态识别与运行时探测**冲突时，静态总是错的**
2. 组件实际用到的 Vue API **全部落在已有的 21 项映射内**

## 一、静态识别的三次尝试与结果

| 方法 | 结果 |
|---|---|
| 括号平衡提取 + 文本特征 | 118 个有定义中仅识别 **6** 个 |
| 精确括号平衡 + Vue 源码文本特征 | 识别 **5** 个（且含误判） |
| **AST 结构特征 + export binding 精确定位** | 识别 **7** 个（**2 处与运行时冲突**） |

### 冲突实例（决定性证据）

| 导出 | 静态判定 | 运行时实测 | 谁对 |
|---|---|---|---|
| `rr` | `unref` | `rr(null)===''`、`rr(123)==='123'` | **运行时**（它是 toDisplayString；unref(null) 会返回 undefined 而非 ''） |
| `Ct` | `withDirectives` | arity 6；`Ct({_d:1})` 抛 "Cannot read properties of null" | **运行时**（withDirectives 是 arity 3；`Ct` 实际是 renderSlot，需要渲染上下文） |

### 为什么静态一定失败

1. **同名冲突**：该 chunk 把 Vue 核心与 vue-i18n 运行时混编，存在多个同名函数（调试时曾把 i18n 的 `he` 误当 Vue 的 `he`）
2. **压缩后函数体内联共享逻辑**：特征互相串味
3. **特征不唯一**：`isRef` / `unref` 都访问 `__v_isRef`，文本/AST 特征无法区分，只有**传入真实 ref 看返回值**才能区分

## 二、为什么不需要补全 167 个

统计 main.js 中 Vue API 的实际调用：

| API | 调用次数 |
|---|---|
| unref | 11549 |
| createElementVNode | 5844 |
| toDisplayString | 4961 |
| resolveComponent | 4027 |
| createElementBlock | 2799 |
| ... | ... |

**全部 21 个实际用到的 API 都已在映射表内。**

167 个导出中其余约 146 个是 Vue 内部的工具函数（patch 算法、ref 实现细节、调度器等），**组件代码不直接调用**，识别它们对反编译器没有价值。

## 三、运行时探测为什么可靠

在渲染进程里 `import()` 运行时模块，对每个导出做**行为断言**：

```js
fn(null) === '' && fn(123) === '123'         // toDisplayString
fn({__v_isRef:true, value:'X'}) === 'X'      // unref
fn('div',{id},['x']).type === 'div'          // createElementVNode (arity 3)
fn() === undefined                           // openBlock
```

不看名字、不看代码，只看行为。**这是唯一可靠的方法**，已产出 16 项映射（修正静态分析 5 处错误）。

## 四、建议

- **不要继续投入静态 API 识别**：三次方法迭代均为个位数识别率且有误判
- 若将来需要新 API 的语义，用运行时探测补一条断言即可（成本几分钟）
- main.js 里仍有未语义化的短名 API（`H` 3039 次、`c` 145 次、`x` 202 次等），但**它们是 import 别名，改名会破坏渲染**（round-0400 事故），不能动
