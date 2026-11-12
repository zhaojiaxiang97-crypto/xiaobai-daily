<template>
<div><div><div><div><p>{{ t(`settings.autoReport.title`) }}</p><component :is="H_" :title="t(`settings.autoReport.title`)" :description="t(`settings.autoReport.desc`)" event-name="settings_view_loaded" panel="report_automation" :disabled="s||!c||!!i" /></div><p>{{ t(`settings.autoReport.desc`) }}</p></div><div><component :is="P" variant="outline" size="sm" :class="`h-7 gap-1 text-xs`" :disabled="s||S.value" @click="e=>E()" /><component :is="Te" data-credit-feature="report" data-credit-action="enable" :modelValue="u.value" @update:modelvalue="e=>u.value=e" :disabled="s" /></div></div><component :is="wt" enter-active-class="transition duration-300 ease-out" enter-from-class="opacity-0 max-h-0 overflow-hidden" enter-to-class="opacity-100 max-h-[1600px] overflow-hidden" leave-active-class="transition duration-200 ease-in" leave-from-class="opacity-100 max-h-[1600px] overflow-hidden" leave-to-class="opacity-0 max-h-0 overflow-hidden" /><component :is="zAe" :open="d.value" @update:open="e=>d.value=e" :task="f.value" :preset="p.value" :saving="m.value" @save="O" /><component :is="_i" :open="h.value" @update:open="e=>h.value=e" /></div>
</template>

<script setup>
import H_ from './FeatureInfoDialog.vue';
import zAe from './AutoReportTaskDialog.vue';
import { S_to as to, S_is as is, S_xs as xs, S_sm as sm, S_out as out, S_e as e, S_t as t, S_i as i, S_s as s, S_c as c, S_u as u, S_d as d, S_f as f, S_p as p, S_m as m, S_S as S, S_E as E, S_O as O, S_P as P, S_Te as Te, S_wt as wt, S__i as _i } from '../shared.js';
</script>
