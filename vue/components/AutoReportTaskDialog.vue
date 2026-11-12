<template>
<button type="button" :class="[`flex w-full shrink-0 cursor-pointer items-start gap-2.5 rounded-lg px-2.5 py-2 text-left transition-colors outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary/40`,y.value===e.id?`bg-black/[0.07] dark:bg-white/[0.09]`:`hover:bg-black/[0.035] dark:hover:bg-white/[0.045]`]" :aria-current="y.value===e.id?`step`:undefined" @click="t=>y.value=e.id"><span :class="[`mt-px flex size-6 shrink-0 items-center justify-center rounded-md transition-colors`,y.value===e.id?`bg-primary/10 text-primary`:`text-muted-foreground`]"><component :is="Be(e.icon)" :size="14" /></span><span><span :class="[`flex items-center gap-1.5 text-[13px] text-(--foreground)`,y.value===e.id?`font-semibold`:`font-medium`]"><span>{{ t+1 }}</span>{{ ` `+toDisplayString(a(`settings.autoReport.sections.${e.id}`))+` ` }}<span></span></span><span :class="`mt-0.5 block truncate text-[11px] text-muted-foreground`" :title="e.summary">{{ e.summary }}</span></span></button>
</template>

<script setup>
import { toDisplayString } from 'vue';
import md from './BaseSeparator.vue';
import { S_is as is, S_lg as lg, S_px as px, S_e as e, S_t as t, S_a as a, S_y as y, S_w as w, S_Be as Be, S_mt as mt } from '../shared.js';
</script>
