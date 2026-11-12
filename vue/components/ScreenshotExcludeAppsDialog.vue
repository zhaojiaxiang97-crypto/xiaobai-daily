<template>
<div :class="[`flex items-center justify-start gap-1.5 px-3 py-2 rounded-md border cursor-pointer transition-colors`,y(e)?a.value===`exclude`?`border-green-500/35 bg-green-50/80 hover:bg-green-50`:`border-sky-500/35 bg-sky-50/80 hover:bg-sky-50`:`border-black/10 bg-white hover:bg-black/[0.02]`]" :title="k(e)" @click="t=>b(e,!y(e))"><component :is="sg" :model-value="y(e)" :class="`pointer-events-none`" /><span>{{ e }}</span></div>
</template>

<script setup>
import md from './BaseSeparator.vue';
import sg from './Checkbox.vue';
import { S_is as is, S_px as px, S_e as e, S_t as t, S_a as a, S_y as y, S_b as b, S_k as k } from '../shared.js';
</script>
