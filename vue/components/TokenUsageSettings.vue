<template>
<div><div><div><p>{{ t(`settings.tokenUsage`) }}</p><span><span v-text="t(`settings.tokenUsageEstimatedCount`,{count:a.value.estimatedCount})" /></span></div><p>{{ S.value }}</p><div></div></div><div><div><div><div>{{ t(`settings.tokenUsageInputShort`) }}</div><div>{{ Qi(b.value) }}</div></div><div><div>{{ t(`settings.tokenUsageOutputShort`) }}</div><div>{{ Qi(x.value) }}</div></div></div><component :is="P" size="sm" variant="outline" :class="`h-7 gap-1.5 text-xs`" @click="E" /></div></div>
</template>

<script setup>
import { S_is as is, S_xs as xs, S_sm as sm, S_t as t, S_a as a, S_p as p, S_v as v, S_b as b, S_x as x, S_S as S, S_E as E, S_P as P, S_Qi as Qi } from '../shared.js';
</script>
