<template>
<div><button type="button" :class="`flex h-7 w-7 items-center justify-center rounded-l-md transition-colors hover:bg-black/[0.06] disabled:cursor-not-allowed disabled:opacity-40`" :aria-label="n(`heatMap.previousYear`)" :disabled="t.value<=y8" @click="e=>i(-1)"><component :is="Qt" :size="14" /></button><span><span v-text="n(`heatMap.yearValue`,{year:t.value})" /></span><button type="button" :class="`flex h-7 w-7 items-center justify-center rounded-r-md transition-colors hover:bg-black/[0.06] disabled:cursor-not-allowed disabled:opacity-40`" :aria-label="n(`heatMap.nextYear`)" :disabled="t.value>=r" @click="e=>i(1)"><component :is="dn" :size="14" /></button></div>
</template>

<script setup>
import md from './BaseSeparator.vue';
// [符号说明] n~computed, l~computed
import { S_is as is, S_y8 as y8, S_t as t, S_n as n, S_r as r, S_i as i, S_l as l, S_v as v, S_w as w, S_Qt as Qt, S_dn as dn } from '../shared.js';
const e = defineProps({
      modelValue: {
        required: true
      },
      modelModifiers: {}
    });
</script>
