<template>
<div data-v-e29f1834 ref="r" :class="[`generate-report-theme-scope heat-map-theme-scope heat-map-page-scroll flex h-full min-h-0 flex-col gap-5 overflow-y-auto p-6 px-7`,{'is-scrolling':u?.value}]" @scroll="f"><div><div><div><component :is="KL" type="single" variant="outline" size="sm" :spacing="1" :model-value="E?.value" :class="`h-8 rounded-md border border-black/5 bg-black/[0.03] p-0.5`" @update:modelvalue="ne" /><component :is="KL" type="single" variant="outline" size="sm" :spacing="1" :model-value="D?.value" :class="`h-8 rounded-md border border-black/5 bg-black/[0.03] p-0.5`" @update:modelvalue="te" /></div><button :class="`flex shrink-0 items-center gap-1 whitespace-nowrap h-7 px-2.5 rounded-md bg-black/[0.03] hover:bg-black/[0.06] text-xs text-[#666] transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed`" :disabled="De?.value||Oe?.value" @click="ut"><component :is="zn" :size="13" :class="`animate-spin`" />{{ ` `+toDisplayString(De?.value?i(`heatMap.generating`):i(`heatMap.generateHeatmap`)) }}</button></div><div><p :class="`min-w-0 flex-1 truncate text-xs text-[#999]`" :title="ie?.value">{{ ie?.value }}</p><div><component :is="Ht" :start="O?.value" :end="k?.value" @change="se" /><div :id="Rt.slice(1)" :class="`contents`"></div></div></div></div><div ref="xe" :class="`flex flex-col gap-5`"><component :is="O8" :refresh-key="event.refreshKey" @navigate="e=>s(`navigate`,e)" /></div><component :is="FSt" :summaries="ue?.value" @navigate="N" /><component :is="TCt" :year="re?.value" :refresh-key="event.refreshKey" :summaries="le?.value" :longest-streak-days="ot?.value" @generatebadge="e=>ke.value={...e,year:re?.value}" /><component :is="b_" :target="Ye.target.value" @close="Ye.close" /><component :is="a5" :badge="ke?.value" :year="ke.value.year" @close="e=>ke.value=null" /><div :class="`fixed z-50 w-[220px] rounded-lg border border-black/10 bg-white px-3 py-2 text-xs shadow-lg pointer-events-none`" :style="{left:`${me.value.x}px`,top:`${me.value.y}px`}"><div>{{ me.value.title }}</div><div>{{ me.value.range }}</div><div><div><div>{{ me.value.totalRecords }}</div><div>{{ i(`heatMap.recordCount`) }}</div></div><div><div>{{ me.value.focusLabel }}</div><div>{{ i(`heatMap.focusHours`) }}</div></div><div><div>{{ me.value.activeDays }}</div><div>{{ i(`heatMap.activeDays`) }}</div></div></div></div></div>
</template>

<script setup>
import { toDisplayString } from 'vue';
import md from './BaseSeparator.vue';
import b_ from './HeatmapCellDetail.vue';
import KL from './ToggleGroup.vue';
import O8 from './KeyboardHeatmapPanel.vue';
import FSt from './HeatMapRangeRhythmPanel.vue';
import TCt from './HeatMapYearHighlightsPanel.vue';
import a5 from './HeatMapBadgeShareDialog.vue';
// [符号说明] f=useConfigProviderContext
import { S_is as is, S_xs as xs, S_sm as sm, S_lg as lg, S_px as px, S_e as e, S_r as r, S_i as i, S_s as s, S_f as f, S_p as p, S_y as y, S_x as x, S_w as w, S_te as te, S_ne as ne, S_N as N, S_se as se, S_xe as xe, S_Ye as Ye, S_at as at, S_ut as ut, S_Rt as Rt, S_Ht as Ht, S_zn as zn } from '../shared.js';
const event = defineProps({
      refreshKey: {},
      initialView: {}
    });

// [兜底] 模板引用但无来源的符号
const De = { value: undefined };
const ie = { value: undefined };
const me = { value: undefined };
const u = { value: undefined };
const E = { value: undefined };
const D = { value: undefined };
const Oe = { value: undefined };
const O = { value: undefined };
const k = { value: undefined };
const ue = { value: undefined };
const re = { value: undefined };
const le = { value: undefined };
const ot = { value: undefined };
const ke = { value: undefined };
</script>

<style>
/* 从原应用 CSS 恢复（data-v-e29f1834） */
[data-v-e29f1834]{container-type:inline-size}
[data-v-e29f1834]{display:none}
[data-v-e29f1834]{overscroll-behavior:contain}
[data-v-e29f1834]::-webkit-scrollbar-thumb{background-color:#0000}
[data-v-e29f1834]:hover::-webkit-scrollbar-thumb{background-color:#0000}
[data-v-e29f1834]::-webkit-scrollbar-thumb{background-color:#00000038}
[data-v-e29f1834]:hover::-webkit-scrollbar-thumb{background-color:#00000038}
[data-v-e29f1834]::-webkit-scrollbar-thumb:hover{background-color:#0000004d}
[data-v-e29f1834]::-webkit-scrollbar-thumb{background-color:#ffffff38}
[data-v-e29f1834]:hover::-webkit-scrollbar-thumb{background-color:#ffffff38}
[data-v-e29f1834]::-webkit-scrollbar-thumb:hover{background-color:#ffffff4d}
[data-v-e29f1834],.slogan-fade-leave-active[data-v-e29f1834]{transition:opacity .5s}
[data-v-e29f1834],.slogan-fade-leave-to[data-v-e29f1834]{opacity:0}
[data-v-e29f1834]{scrollbar-width:none}
[data-v-e29f1834]::-webkit-scrollbar{display:none}
</style>
