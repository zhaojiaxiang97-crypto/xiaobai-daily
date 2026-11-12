<template>
<div data-v-956a1a5f ref="C" :class="[`today-work-scroll flex h-full min-h-0 flex-col gap-5 overflow-y-auto p-6 px-7 pt-1`,{'is-scrolling':T.value}]" @scroll="Qe"><div><div><div><img :src="href" :alt="a(`common.appName`)" :class="`w-[48px] h-[48px] rounded-xl shrink-0 border-2 border-black dark:border-transparent`" /><div><component :is="wt" name="slogan" mode="out-in" /></div></div><div><div><component :is="As" :size="13" :stroke-width="1.5" :class="`shrink-0 text-[#aaa] dark:text-muted-foreground`" /><span>{{ a(`todayWork.privacyBadge1`) }}</span></div><div><span>{{ a(`todayWork.privacyBadge2`) }}</span></div><div><span>{{ a(`todayWork.privacyBadge3`) }}</span></div></div></div></div><section><h2>{{ a(`todayWork.workOverview`) }}</h2><div>{{ a(`todayWork.recordsLoading`) }}</div></section><component :is="gae" :snapshot="re.value" :class="`shrink-0`" @generate="Ke" @dismiss="Ge" /><section><div><h2>{{ a(`todayWork.timeRecords`) }}</h2><div><label><component :is="sg" :modelValue="ue.value" @update:modelvalue="e=>ue.value=e" :class="`size-3.5`" /><span>{{ a(`todayWork.heatmap3d`) }}</span></label><label><component :is="sg" :modelValue="ae.value" @update:modelvalue="e=>ae.value=e" :class="`size-3.5`" /><span>{{ a(`todayWork.showPrevDaysHeatmap`) }}</span></label><div><span>{{ a(`todayWork.less`) }}</span><span>{{ a(`todayWork.more`) }}</span></div></div></div><component :is="pe" :rows="je.value" :column-labels="Ae" clickable="" @unavailable="e=>de.value=true" @cellclick="Re" /><component :is="b_" :target="Me.target.value" @close="Me.close" /></section><component :is="voe" :ref="w" :refresh-key="event.refreshKey" @open="e=>i(`navigate`,`heat-map-barcode`)" /><section><div><div><component :is="rs" :size="13" :stroke-width="1.5" :class="`text-[#999] dark:text-muted-foreground`" /><span>{{ a(`todayWork.connectedDisplays`) }}</span></div><span><span v-text="a(`todayWork.displayCount`,{n:d.length})" /></span></div><div>{{ a(`todayWork.displayReadError`) }}</div></section><div><component :is="xoe" :container="C.value" :ready="!E.value" @jump="$e" /></div></div>
</template>

<script setup>
import xl from './MenuRadioItem.vue';
import sg from './Checkbox.vue';
import gae from './FirstReportGuideCard.vue';
import voe from './TodayBarcodeCard.vue';
import xoe from './TodayWorkScrollHint.vue';
import b_ from './HeatmapCellDetail.vue';
// [符号说明] n~computed, re~指令, ue~指令, de~shallowRef
import { S_rs as rs, S_is as is, S_As as As, S_href as href, S_px as px, S_h2 as h2, S_alt as alt, S_out as out, S_e as e, S_n as n, S_i as i, S_a as a, S_d as d, S_p as p, S_v as v, S_y as y, S_C as C, S_w as w, S_T as T, S_E as E, S_re as re, S_ae as ae, S_ue as ue, S_de as de, S_pe as pe, S_Ae as Ae, S_je as je, S_Me as Me, S_Re as Re, S_Ge as Ge, S_Ke as Ke, S_Qe as Qe, S_$e as $e, S_wt as wt } from '../shared.js';
const event = defineProps({
      refreshKey: {}
    });
</script>

<style>
/* 从原应用 CSS 恢复（data-v-956a1a5f） */
[data-v-956a1a5f]{overscroll-behavior:contain}
[data-v-956a1a5f]::-webkit-scrollbar-thumb{background-color:#0000}
[data-v-956a1a5f]:hover::-webkit-scrollbar-thumb{background-color:#0000}
[data-v-956a1a5f]::-webkit-scrollbar-thumb{background-color:#00000038}
[data-v-956a1a5f]:hover::-webkit-scrollbar-thumb{background-color:#00000038}
[data-v-956a1a5f]::-webkit-scrollbar-thumb:hover{background-color:#0000004d}
[data-v-956a1a5f]::-webkit-scrollbar-thumb{background-color:#ffffff38}
[data-v-956a1a5f]:hover::-webkit-scrollbar-thumb{background-color:#ffffff38}
[data-v-956a1a5f]::-webkit-scrollbar-thumb:hover{background-color:#ffffff4d}
[data-v-956a1a5f],.slogan-leave-active[data-v-956a1a5f]{transition:all .5s}
[data-v-956a1a5f]{opacity:0;transform:translateY(8px)}
[data-v-956a1a5f]{opacity:0;transform:translateY(-8px)}
</style>
