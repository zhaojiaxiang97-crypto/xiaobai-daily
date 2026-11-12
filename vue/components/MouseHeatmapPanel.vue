<template>
<div><component :is="Qe" :to="r.rangePickerTarget??`#heatmap-panel-actions`" defer="" /><div><component :is="zn" :size="18" :class="`animate-spin`" />{{ ` `+toDisplayString(a(`mouseHeatmap.loading`)) }}</div><div :class="`pointer-events-none fixed z-50 rounded-md bg-foreground px-2.5 py-1.5 text-xs text-background shadow-md`" :style="at(Te.value)"><div>{{ we.value.title }}</div><div>{{ we.value.text }}</div></div><component :is="AU" :open="d" @update:open="e=>$e(d)?d.value=e:null" @confirm="m" /></div>
</template>

<script setup>
import { toDisplayString } from 'vue';
import md from './BaseSeparator.vue';
import AU from './MouseHeatmapConsentDialog.vue';
import { S_to as to, S_is as is, S_xs as xs, S_px as px, S_e as e, S_a as a, S_d as d, S_m as m, S_we as we, S_Te as Te, S_Qe as Qe, S_$e as $e, S_at as at, S_zn as zn } from '../shared.js';
const event = defineProps({
      refreshKey: {},
      rangePickerTarget: {},
      embedded: {
        type: Boolean
      }
    });
const r = event;
</script>
