<template>
<div><component :is="Qe" :to="Rt" defer="" /><section><div><div></div><p>{{ ye.value }}</p></div></section><section><div><h2>{{ he.value }}<span>{{ `· `+toDisplayString(ge.value) }}</span></h2><div><label><component :is="sg" :modelValue="v.value" @update:modelvalue="e=>v.value=e" :class="`size-3.5`" /><span>{{ E(`todayWork.heatmap3d`) }}</span></label><component :is="KL" type="single" variant="outline" size="sm" :spacing="1" :model-value="l.value" :class="`h-8 rounded-md border border-black/5 bg-black/[0.03] p-0.5`" @update:modelvalue="ae" /></div></div><div><component :is="zn" :size="20" :class="`mx-auto mb-2 animate-spin`" />{{ ` `+toDisplayString(E(`appBarcode.loading`)) }}</div></section><component :is="$g" :result="d.value" :colors="ce.value" :theme="te.value" :hover="h.value" /><component :is="S" :date="C.value" source="barcode_wall" @close="e=>C.value=null" /></div>
</template>

<script setup>
import { toDisplayString } from 'vue';
import md from './BaseSeparator.vue';
import sg from './Checkbox.vue';
import KL from './ToggleGroup.vue';
import { S_to as to, S_is as is, S_sm as sm, S_mx as mx, S_h2 as h2, S_l as l, S_d as d, S_p as p, S_v as v, S_S as S, S_C as C, S_E as E, S_te as te, S_ae as ae, S_ce as ce, S_he as he, S_ge as ge, S_ye as ye, S_Qe as Qe, S_Rt as Rt, S_zn as zn } from '../shared.js';
const e = defineProps({
      refreshKey: {}
    });
const r = e;
</script>
