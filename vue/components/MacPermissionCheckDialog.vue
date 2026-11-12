<template>
<div :class="`rounded-lg border border-black/5 bg-black/[0.015] p-3`"><div><span><component :is="Be(u(e.key))" :size="16" :stroke-width="1.7" /></span><div><div><p>{{ l(e.key).title }}</p><span :class="[`rounded-full border px-2 py-0.5 text-[11px] font-medium`,f(e.status,e.granted)]">{{ d(e) }}</span></div><p>{{ l(e.key).description }}</p><p>{{ l(e.key).usage }}</p><p>{{ t(`settings.permissionCheck.notificationStatusHint`) }}</p></div><component :is="P" size="sm" variant="outline" :class="`h-7 shrink-0 gap-1.5 text-xs`" :disabled="e.status===`not-supported`" @click="t=>p(e.key)" /></div></div>
</template>

<script setup>
// [符号说明] u=useConfigProviderContext, f=useConfigProviderContext
import { S_is as is, S_xs as xs, S_sm as sm, S_lg as lg, S_px as px, S_e as e, S_t as t, S_l as l, S_u as u, S_d as d, S_f as f, S_p as p, S_P as P, S_Be as Be } from '../shared.js';
</script>
