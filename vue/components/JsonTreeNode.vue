<template>
<div><details :open="e.root" :class="`group`"><summary><span>{{ c?.value }}</span><span>:</span><span><span v-text="n?.value?`[`:`{`" /></span><span>{{ toDisplayString(s?.value)+` `+toDisplayString(n?.value?`items`:`keys`) }}</span><span><span v-text="n?.value?`]`:`}`" /></span><span>,</span></summary><div><span v-text="n?.value?(openBlock(true),createElementBlock(Fragment,{key:0},renderList(a?.value,(e,t)=>(openBlock(),createBlock(d,{key:t,value:e,label:t,trailing:t<a.value.length-1},null,8,[`value`,`label`,`trailing`]))),128)):(openBlock(true),createElementBlock(Fragment,{key:1},renderList(o?.value,([e,t],n)=>(openBlock(),createBlock(d,{key:e,value:t,label:e,trailing:n<o.value.length-1},null,8,[`value`,`label`,`trailing`]))),128))" /></div></details></div>
</template>

<script setup>
import { openBlock, createElementBlock, createBlock, renderList, toDisplayString } from 'vue';
// [符号说明] n~computed
import { S_n as n, S_d as d, S_v as v } from '../shared.js';
const e = defineProps({
      value: {},
      label: {},
      root: {
        type: Boolean,
        default: false
      },
      trailing: {
        type: Boolean,
        default: false
      }
    });
const t = e;

// [兜底] 模板引用但无来源的符号
const c = { value: undefined };
const s = { value: undefined };
const Fragment = { value: undefined };
const a = { value: undefined };
const o = { value: undefined };
</script>
