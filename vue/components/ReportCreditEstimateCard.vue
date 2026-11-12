<template>
<div><div><span :class="[e.insufficient?`text-destructive`:`text-primary`,`font-medium`]"><span v-text="e.loading?t(`generateReport.reportEstimating`):e.credits===null?`—`:t(`generateReport.reportEstimateCredits`,{credits:r(e.credits)})" /></span><component :is="Qr" :delay-duration="150" /></div></div>
</template>

<script setup>
import { S_is as is, S_t as t, S_r as r, S_v as v, S_Qr as Qr } from '../shared.js';
const e = defineProps({
      credits: {},
      inputRate: {},
      outputRate: {},
      loading: {
        type: Boolean
      },
      insufficient: {
        type: Boolean
      }
    });
</script>
