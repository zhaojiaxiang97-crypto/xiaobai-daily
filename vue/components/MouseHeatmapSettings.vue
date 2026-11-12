<template>
<div id="settings-item-mouse-heatmap" :class="[`flex items-center justify-between gap-4 rounded-md outline-2 outline-offset-[6px] transition-[outline-color] duration-500`,r===`mouse-heatmap`?`outline-primary/40`:`outline-transparent`]"><div><div><p>{{ t(`settings.mouseHeatmap`) }}</p><component :is="Or" :size="14" :class="`text-muted-foreground`" /><component :is="Pp" variant="secondary" /></div><p>{{ t(`settings.mouseHeatmapDesc`) }}</p><div><span>{{ t(`settings.mouseHeatmapAppUsageOff`) }}</span><component :is="P" size="sm" variant="ghost" :class="`h-6 px-2 text-xs`" @click="e=>i(`settings-app-usage-tracking`)" /></div><component :is="P" size="sm" variant="link" :class="`mt-1 h-6 px-0 text-xs`" @click="e=>i(`heat-map-mouse`)" /></div><component :is="Te" :model-value="a" :disabled="n||c" @update:modelvalue="l" /></div>
</template>

<script setup>
import md from './BaseSeparator.vue';
import Pp from './Badge.vue';
// [符号说明] n~computed, l~computed
import { S_is as is, S_xs as xs, S_sm as sm, S_px as px, S_t as t, S_n as n, S_r as r, S_i as i, S_a as a, S_c as c, S_l as l, S_p as p, S_P as P, S_Te as Te, S_mt as mt, S_Or as Or } from '../shared.js';
const e = defineProps({});
</script>
