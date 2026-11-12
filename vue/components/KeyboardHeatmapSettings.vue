<template>
<div id="settings-item-keyboard-heatmap" :class="[`flex items-center justify-between gap-4 rounded-md outline-2 outline-offset-[6px] transition-[outline-color] duration-500`,a===`keyboard-heatmap`?`outline-primary/40`:`outline-transparent`]"><div><div><p>{{ t(`settings.keyboardHeatmap`) }}</p><component :is="cr" :size="14" :class="`text-muted-foreground`" /><component :is="Pp" variant="secondary" /></div><p>{{ t(`settings.keyboardHeatmapDesc`) }}</p><p>{{ t(`settings.keyboardHeatmapWindowsNote`) }}</p><p>{{ t(`settings.keyboardHeatmapLoginRequired`) }}</p><div><span>{{ s.errorMessage||t(`settings.keyboardHeatmapFailed`) }}</span><component :is="P" size="sm" variant="ghost" :class="`h-6 px-2 text-xs`" :disabled="u" @click="m" /></div><component :is="P" size="sm" variant="link" :class="`mt-1 h-6 px-0 text-xs`" @click="e=>o(`heat-map-keyboard`)" /></div><component :is="Te" :model-value="n.enableKeyboardHeatmap" :disabled="i||d||u||!r&&!n.enableKeyboardHeatmap" @update:modelvalue="f" /></div>
</template>

<script setup>
import md from './BaseSeparator.vue';
import Pp from './Badge.vue';
import { S_is as is, S_xs as xs, S_sm as sm, S_px as px, S_t as t, S_n as n, S_r as r, S_i as i, S_a as a, S_o as o, S_s as s, S_u as u, S_d as d, S_f as f, S_p as p, S_m as m, S_P as P, S_Te as Te, S_mt as mt, S_cr as cr } from '../shared.js';
const e = defineProps({});
</script>
