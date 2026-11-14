<template>
<div :class="`mb-2`"><p>{{ i(`todo.activity.deleted`) }}</p><div><button type="button" :class="`ml-2 mt-0.5 inline-flex items-center gap-1 text-xs font-medium text-[#6b7280] transition-colors hover:text-[#111827]`" @click="t=>Pe(e)"><component :is="Be(A.has(e.id)?In:un)" :size="13" :stroke-width="2" />{{ ` `+toDisplayString(A.has(e.id)?i(`todo.activity.collapseReplies`):i(`todo.activity.expandReplies`,{count:Ne(e)})) }}</button></div></div>
</template>

<script setup>
import { toDisplayString } from 'vue';
import { ref } from 'vue';

// [setup 还原] 原组件 setup 里初值不依赖 IPC 的声明
let A = ref(new Set());
function Ne(e) {
  return A.value.has(e.id) ? 0 : Math.max(0, e.replies.length - Av);
}
function Pe(e) {
  let t = new Set(A.value);
  t.has(e.id) ? t.delete(e.id) : t.add(e.id), A.value = t;
}
import { S_is as is, S_xs as xs, S_e as e, S_t as t, S_i as i, S_p as p, S_Be as Be, S_mt as mt, S_un as un, S_In as In } from '../shared.js';
</script>
