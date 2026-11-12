<template>
<div :class="`group flex items-center rounded-md transition-colors hover:bg-[#f3f4f6]`"><button type="button" :class="`flex min-w-0 flex-1 items-center gap-2 px-2 py-1.5 text-left text-sm text-[#111827]`" @click="e=>m(t)"><span>{{ t }}</span><component :is="an" :size="14" :stroke-width="2" :class="`shrink-0 text-[#16a34a]`" /></button><button type="button" :class="`mr-1 flex size-6 shrink-0 items-center justify-center rounded text-[#9ca3af] opacity-0 transition-opacity hover:text-[#ef4444] focus-visible:opacity-100 group-hover:opacity-100`" :aria-label="i(`todo.labelPopover.removeHistory`,{name:t})" @click="withDirectives(e=>_(t),[`stop`])"><component :is="Nt" :size="12" :stroke-width="2" /></button></div>
</template>

<script setup>
import { withDirectives } from 'vue';
import md from './BaseSeparator.vue';
import { S_is as is, S_sm as sm, S_px as px, S_e as e, S_t as t, S_i as i, S_m as m, S__ as _, S_w as w, S_Nt as Nt, S_an as an, S_mr as mr } from '../shared.js';
</script>
