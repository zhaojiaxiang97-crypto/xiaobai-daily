<template>
<div :class="`mb-2`"><p>{{ i(`todo.activity.deleted`) }}</p><div><button type="button" :class="`ml-2 mt-0.5 inline-flex items-center gap-1 text-xs font-medium text-[#6b7280] transition-colors hover:text-[#111827]`" @click="t=>Pe(e)"><component :is="Be(A.value.has(e.id)?In:un)" :size="13" :stroke-width="2" />{{ ` `+toDisplayString(A.value.has(e.id)?i(`todo.activity.collapseReplies`):i(`todo.activity.expandReplies`,{count:Ne(e)})) }}</button></div></div>
</template>

<script setup>
import { toDisplayString } from 'vue';
import { S_is as is, S_xs as xs, S_e as e, S_t as t, S_i as i, S_p as p, S_A as A, S_Ne as Ne, S_Pe as Pe, S_Be as Be, S_mt as mt, S_un as un, S_In as In } from '../shared.js';
</script>
