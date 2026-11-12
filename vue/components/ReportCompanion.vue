<template>
<div data-v-8108dfc8 :class="[`report-companion`,{'report-companion--compact':e.compact}]"><img :src="o.value" :alt="n(`generateReport.companion.${e.state}Title`)" draggable="false" @error="d" /><div><strong><span v-text="n(`generateReport.companion.${e.state}Title`)" /></strong><p><span v-text="n(`generateReport.companion.${e.state}Description`)" /></p><span><component :is="zn" :size="13" :class="`animate-spin motion-reduce:animate-none`" aria-hidden="true" />{{ ` `+toDisplayString(n(e.state===`waiting`?`generateReport.queuing`:`generateReport.generating`)) }}</span></div></div>
</template>

<script setup>
import { toDisplayString } from 'vue';
import { S_is as is, S_state as state, S_alt as alt, S_n as n, S_o as o, S_d as d, S_p as p, S_v as v, S_zn as zn } from '../shared.js';
const e = defineProps({
      state: {},
      compact: {
        type: Boolean
      }
    });
const t = e;
</script>

<style>
/* 从原应用 CSS 恢复（data-v-8108dfc8） */
[data-v-8108dfc8]{background:0 0;flex-direction:column;align-items:center;gap:18px;padding:20px 16px;display:flex}
[data-v-8108dfc8]{object-fit:contain;-webkit-user-select:none;user-select:none;width:156px;height:156px;display:block}
[data-v-8108dfc8]{text-align:center;max-width:360px}
[data-v-8108dfc8]{color:var(--foreground);font-size:15px;font-weight:500}
[data-v-8108dfc8]{color:var(--muted-foreground);margin:8px 0 14px;font-size:12px;line-height:1.7}
[data-v-8108dfc8]{color:var(--muted-foreground);align-items:center;gap:6px;font-size:12px;display:inline-flex}
[data-v-8108dfc8]{width:64px;height:64px;padding:0}
[data-v-8108dfc8]{width:64px;height:64px}
</style>
