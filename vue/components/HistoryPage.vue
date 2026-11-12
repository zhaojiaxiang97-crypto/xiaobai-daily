<template>
<div data-v-0a4d4bbf ref="n" :class="`generate-report-theme-scope history-theme-scope flex flex-col gap-5 p-6 px-7`"><div><div><button type="button" :class="[`inline-flex items-center gap-1.5 rounded-md px-4 py-1.5 font-medium transition-colors`,Te.value===`mine`?`bg-white text-(--foreground) shadow-sm dark:bg-background`:`text-[#999] hover:text-(--foreground)`]" @click="e=>Te.value=`mine`">{{ r(`reportCc.segmentMine`) }}</button><button type="button" :class="[`inline-flex items-center gap-1.5 rounded-md px-4 py-1.5 font-medium transition-colors`,Te.value===`sent`?`bg-white text-(--foreground) shadow-sm dark:bg-background`:`text-[#999] hover:text-(--foreground)`]" @click="e=>Te.value=`sent`">{{ toDisplayString(r(`reportCc.segmentSent`))+` ` }}<span :class="`size-1.5 rounded-full bg-red-500`" :title="r(`reportCc.newActivity`)"></span></button><button type="button" :class="[`inline-flex items-center gap-1.5 rounded-md px-4 py-1.5 font-medium transition-colors`,Te.value===`received`?`bg-white text-(--foreground) shadow-sm dark:bg-background`:`text-[#999] hover:text-(--foreground)`]" @click="e=>Te.value=`received`">{{ toDisplayString(r(`reportCc.segmentReceived`))+` ` }}<span>{{ Oe.value>99?`99+`:Oe.value }}</span></button></div><p>{{ Te.value===`mine`?r(`history.desc`):Te.value===`sent`?r(`reportCc.sentDesc`):r(`reportCc.receivedDesc`) }}</p></div><section><div><component :is="cw" /><div><div><component :is="Cs" :size="13" :class="`absolute left-2.5 top-1/2 -translate-y-1/2 text-[#bbb]`" /><component :is="Lp" :modelValue="E.value" @update:modelvalue="e=>E.value=e" :placeholder="r(`history.searchPlaceholder`)" :class="`h-7 w-[180px] pl-8 text-xs`" /></div><component :is="P" size="icon-sm" variant="ghost" :title="r(`common.refresh`)" :disabled="d" @click="wn" /></div></div><div><div><span>{{ r(`history.date`) }}</span><component :is="cw" /><component :is="P" size="sm" variant="ghost" :class="`h-7 gap-1 text-xs text-[#999]`" @click="ne" /></div><div><component :is="CP" :modelValue="O.value" @update:modelvalue="e=>O.value=e" :label="r(`common.selectStartDate`)" mode="date" align="end" /><span>{{ r(`generateReport.to`) }}</span><component :is="CP" :modelValue="k.value" @update:modelvalue="e=>k.value=e" :label="r(`common.selectEndDate`)" mode="date" align="end" /></div></div></section><section><div><div><component :is="uo" :size="14" :stroke-width="1.5" :class="`text-[#999]`" /><h2>{{ r(`history.reportList`) }}</h2><component :is="zn" :size="12" :class="`text-blue-500 animate-spin`" /></div><span><span v-text="r(`history.totalCount`,{n:u})" /></span></div><div>{{ r(`history.loadingReports`) }}</div></section><component :is="OW" :open="xe.value" @update:open="e=>xe.value=e" /><component :is="M$" :open="Se.value" @update:open="e=>Se.value=e" :summary="Ce.value?.factSummary??null" /><component :is="ui" :open="Et.value" @update:open="e=>Et.value=e" /><component :is="_i" :open="vt.value" @update:open="e=>vt.value=e" /><component :is="_i" :open="mt.value" @update:open="e=>mt.value=e" /><component :is="v5" :open="Me.value" @update:open="e=>Me.value=e" :report-id="Ne.value.id" :title="Ne.value.title" @changed="Ve" /></div>
</template>

<script setup>
import { toDisplayString } from 'vue';
import md from './BaseSeparator.vue';
import cw from './ButtonGroup.vue';
import CP from './DateTimePickerField.vue';
import OW from './Sheet.vue';
import M$ from './ReportGenerationBasisDialog.vue';
import v5 from './ReportCcShareDialog.vue';
import { S_to as to, S_uo as uo, S_is as is, S_xs as xs, S_Cs as Cs, S_sm as sm, S_px as px, S_h2 as h2, S_e as e, S_n as n, S_r as r, S_u as u, S_d as d, S_p as p, S_v as v, S_y as y, S_w as w, S_E as E, S_O as O, S_k as k, S_ne as ne, S_xe as xe, S_Se as Se, S_P as P, S_Ce as Ce, S_Te as Te, S_Oe as Oe, S_Me as Me, S_Ne as Ne, S_Ve as Ve, S_mt as mt, S_vt as vt, S_Et as Et, S_wn as wn, S_zn as zn, S_ui as ui, S__i as _i } from '../shared.js';
const items = defineProps({
      refreshKey: {}
    });
</script>

<style>
/* 从原应用 CSS 恢复（data-v-0a4d4bbf） */
[data-v-0a4d4bbf]{container:history-report/inline-size}
[data-v-0a4d4bbf]{padding-right:52px}
[data-v-0a4d4bbf]{padding-right:136px}
[data-v-0a4d4bbf]{pointer-events:none;width:64px;height:64px;display:block;position:absolute;top:16px;right:56px}
[data-v-0a4d4bbf]{padding-right:52px}
[data-v-0a4d4bbf]{display:none}
</style>
