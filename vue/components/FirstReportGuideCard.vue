<template>
<section><div><div><component :is="uo" :size="18" /></div><div><p>{{ r(`todayWork.firstReportGuide.badge`) }}</p><h3>{{ r(`todayWork.firstReportGuide.title`) }}</h3><p><span v-text="r(`todayWork.firstReportGuide.description`,{count:e.snapshot.totalRecords})" /></p><p><span v-text="r(`todayWork.firstReportGuide.stats`,{count:e.snapshot.totalRecords,duration:i(e.snapshot.focusMinutes)})" /></p><div><component :is="P" size="sm" :class="`cursor-pointer`" @click="e=>n(`generate`)" /><component :is="P" size="sm" variant="outline" :class="`cursor-pointer`" @click="e=>n(`dismiss`)" /></div><p>{{ r(`todayWork.firstReportGuide.billingNote`) }}</p></div></div></section>
</template>

<script setup>
// [符号说明] n~computed
import { S_uo as uo, S_is as is, S_sm as sm, S_n as n, S_r as r, S_i as i, S_p as p, S_v as v, S_P as P } from '../shared.js';
const e = defineProps({
      snapshot: {}
    });
</script>
