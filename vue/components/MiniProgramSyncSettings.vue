<template>
<div><div><p>{{ t(`settings.miniProgramSync`) }}</p><p>{{ m.value }}</p><p>{{ t(`settings.miniProgramSyncCloudNote`) }}</p></div><div><component :is="P" size="sm" variant="outline" :class="`h-7 text-xs`" @click="e=>s.value=true" /><component :is="P" size="sm" variant="outline" :class="`h-7 gap-1.5 border-destructive/30 text-xs text-destructive hover:bg-destructive/20 hover:text-destructive`" :disabled="p.value" @click="e=>f.value=true" /><component :is="Te" :model-value="i" :disabled="r" @update:modelvalue="l" /></div></div>
</template>

<script setup>
import { S_is as is, S_xs as xs, S_sm as sm, S_t as t, S_r as r, S_i as i, S_s as s, S_l as l, S_f as f, S_p as p, S_m as m, S_P as P, S_Te as Te } from '../shared.js';
const e = defineProps({});
</script>
