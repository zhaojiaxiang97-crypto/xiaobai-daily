<template>
<button type="button" :class="[`flex items-center gap-2.5 px-3 py-2.5 rounded-md border text-sm text-left transition-colors`,o[e.id].values.includes(state.value)?`border-green-500/60 bg-green-50 text-green-700 dark:border-green-400/40 dark:bg-green-500/10 dark:text-green-300`:`border-black/10 hover:bg-black/[0.02] text-(--foreground) dark:border-border dark:hover:bg-accent`]" @click="n=>v(e,state.value)"><span :class="[`shrink-0 w-4 h-4 rounded-[4px] border flex items-center justify-center`,o[e.id].values.includes(state.value)?`border-green-500 bg-green-500`:`border-black/25 dark:border-muted-foreground/60`]"><component :is="an" :size="11" :class="`text-white`" /></span><span>{{ state.label }}</span></button>
</template>

<script setup>
import md from './BaseSeparator.vue';
// [符号说明] n~computed
import { S_is as is, S_sm as sm, S_state as state, S_px as px, S_e as e, S_n as n, S_o as o, S_v as v, S_w as w, S_an as an } from '../shared.js';
</script>
