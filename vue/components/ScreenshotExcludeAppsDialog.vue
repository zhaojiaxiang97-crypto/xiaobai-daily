<template>
<div :class="[`flex items-center justify-start gap-1.5 px-3 py-2 rounded-md border cursor-pointer transition-colors`,y(e)?a===`exclude`?`border-green-500/35 bg-green-50/80 hover:bg-green-50`:`border-sky-500/35 bg-sky-50/80 hover:bg-sky-50`:`border-black/10 bg-white hover:bg-black/[0.02]`]" :title="k(e)" @click="t=>b(e,!y(e))"><component :is="sg" :model-value="y(e)" :class="`pointer-events-none`" /><span>{{ e }}</span></div>
</template>

<script setup>
import md from './BaseSeparator.vue';
import sg from './Checkbox.vue';
import { ref } from 'vue';

// [setup 还原] 原组件 setup 里初值不依赖 IPC 的声明
let a = ref(`exclude`);
function y(e, t = a.value) {
  let n = $L(e).toLowerCase();
  return _(t).value.some(item => $L(item).toLowerCase() === n);
}
function b(e, t, n = a.value) {
  t ? x(e, n) : S(e, n);
}
function k(e) {
  let t = D(e);
  return t ? `${e} · ${O(t)}` : e;
}
import { S_is as is, S_px as px, S_e as e, S_t as t } from '../shared.js';
</script>
