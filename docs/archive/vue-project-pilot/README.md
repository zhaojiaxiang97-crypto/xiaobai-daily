# Vue 工程还原：可行性试点与结论

## 试点（已通过）

`Kbd.vue` 是从 `src/renderer/ui/Kbd.js` 完整还原的 Vue SFC，已用
`@vue/compiler-sfc` 验证：

```
SFC 解析: OK（模板 + script setup 均存在）
模板编译: OK（生成 750 字节 render 代码）
生成的 render 含: createElementBlock / normalizeClass / renderSlot / kbd
script setup 编译: OK
```

对比原始 chunk（render 函数形态）：

```js
var s = o({ __name: `Kbd`, props: {...}, setup(o) {
  let s = o;
  return (o, c) => (a(), i(`kbd`, { "data-slot": `kbd`, class: t(n(e)(`...`, s.class)) },
                   [r(o.$slots, `default`)], 2))
}});
```

还原后的 SFC：

```vue
<template>
  <kbd data-slot="kbd" :class="cn('...classes...', props.class)">
    <slot />
  </kbd>
</template>
<script setup>
defineProps({ class: { type: [Boolean, String, Object, Array] } })
</script>
```

**结论：单个组件的 render → template 逆向是可行的，且能通过编译验证。**

## 规模化到 418 个组件的障碍（实测）

| 障碍 | 说明 |
|---|---|
| **短名歧义** | 组件 chunk 里 `import { S as i }` 后，`i` 既是 API 别名又可能被局部同名变量遮蔽。文本正则无法区分（实测统计出上万次伪调用），必须用 AST 作用域分析逐个 chunk 解析绑定 |
| **API 语义映射有误** | 现有主 bundle 的语义化结果里，`Ct` 被标为 `withCtx`，但其实际用法 `Ct(ctx.$slots, 'default')` 是 **renderSlot**。映射需按用法重新校正 |
| **template 语法还原** | 需要从 vnode 还原 `v-if`（三元 + createCommentVNode）、`v-for`（renderList）、插槽、动态组件（resolveComponent + createBlock）、事件绑定、双向绑定 |
| **等价性不可保证** | 逆向后的 template 再编译，得到的 render 与原始产物在静态提升、patchFlag、缓存位置上有差异 |
| **规模** | 418 个组件 / 5844 处 createElementVNode / 2799 处 createElementBlock |

## 建议

- **若目的是「能读、能改、能维护」**：当前 render 函数形态已达标（组件有 `__name`
  标记、vnode 调用已语义化、变量已命名）。无需还原成 .vue。
- **若目的是「npm run build 的真 Vue 工程」**：技术路线可行（试点已证明），但需要
  实现一个完整的 render→template 反编译器（AST 绑定解析 + 语法映射 + 逐组件
  验证），工作量在数十小时量级，且产出与原始编译产物不完全等价。

## 试点验证方法

```bash
npm i @vue/compiler-sfc
node -e "
const {parse,compileTemplate}=require('@vue/compiler-sfc');
const src=require('fs').readFileSync('Kbd.vue','utf8');
const {descriptor,errors}=parse(src,{filename:'Kbd.vue'});
console.log('解析:',errors.length?'FAIL':'OK');
const c=compileTemplate({source:descriptor.template.content,filename:'Kbd.vue',id:'kbd'});
console.log('编译:',c.errors.length?'FAIL':'OK');
"
```
