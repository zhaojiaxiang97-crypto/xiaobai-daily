<template>
<button type="button" role="radio" :aria-checked="t.id===e.selectedId" :class="[`w-full cursor-pointer rounded-lg border p-3 text-left transition-colors`,t.id===e.selectedId?`border-primary bg-primary/[0.04]`:`border-border hover:border-primary/40`]" @click="e=>l(t.id)"><span><span>{{ t.name }}</span><component :is="Pp" variant="secondary" :class="[`shrink-0 px-1.5 text-[10px]`,t.isRecommended?`bg-primary/10 text-primary`:``]" /><component :is="an" :class="`ml-auto size-4 shrink-0 text-primary`" /></span><span>{{ t.description||a(o(`noDescription`)) }}</span></button>
</template>

<script setup>
import Pp from './Badge.vue';
// [符号说明] l~computed
import { S_is as is, S_lg as lg, S_px as px, S_t as t, S_a as a, S_o as o, S_l as l, S_p as p, S_w as w, S_an as an } from '../shared.js';
const e = defineProps({});
const n = e;
</script>
