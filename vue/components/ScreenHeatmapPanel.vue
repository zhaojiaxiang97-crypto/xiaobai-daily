<template>
<div><component :is="Qe" :to="Rt" defer="" /><div><component :is="zn" :size="20" :class="`mx-auto mb-2 animate-spin`" />{{ ` `+toDisplayString(a(`screenHeatmap.loading`)) }}</div><div :class="`pointer-events-none fixed z-50 w-[230px] rounded-lg border border-black/10 bg-white px-3 py-2 text-xs shadow-lg dark:border-border dark:bg-popover`" :style="at(be.value)"><div>{{ ye.value.title }}</div><div>{{ ye.value.total }}</div><div></div></div></div>
</template>

<script setup>
import { toDisplayString } from 'vue';
import { S_to as to, S_is as is, S_xs as xs, S_lg as lg, S_px as px, S_mx as mx, S_a as a, S_w as w, S_ye as ye, S_be as be, S_Qe as Qe, S_at as at, S_Rt as Rt, S_zn as zn } from '../shared.js';
</script>
