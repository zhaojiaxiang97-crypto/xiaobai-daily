<template>
<div :class="[`flex items-center justify-between py-3 gap-4`,t<f.value.length-1?`border-b border-black/5`:``]"><div><div><span>{{ e.plan }}</span><span :class="[`text-[10px] font-medium px-1.5 py-px rounded`,e.status===`paid`?`text-emerald-600 bg-emerald-500/10`:e.status===`pending`?`text-amber-600 bg-amber-500/10`:e.status===`refunded`?`text-red-600 bg-red-500/10`:`text-[#999] bg-black/5`]">{{ e.status===`paid`?i(`subscribe.orders.status.paid`):e.status===`pending`?i(`subscribe.orders.status.pending`):e.status===`refunded`?i(`subscribe.orders.status.refunded`):i(`subscribe.orders.status.cancelled`) }}</span></div><span>{{ toDisplayString(e.id)+` · `+toDisplayString(e.date) }}</span></div><div><span>{{ `¥`+toDisplayString(e.amount) }}</span><span>—</span></div></div>
</template>

<script setup>
import { toDisplayString } from 'vue';
// [符号说明] f=useConfigProviderContext
import { S_px as px, S_e as e, S_t as t, S_i as i, S_f as f, S_b as b } from '../shared.js';
</script>
