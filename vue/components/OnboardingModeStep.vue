<template>
<div><component :is="pp" :modelValue="n.value" @update:modelvalue="e=>n.value=e" :recommended="e.recommendedUsageMode" :disabled="c.value" /><footer><component :is="P" variant="ghost" :class="`h-9 cursor-pointer gap-1.5 px-3`" :disabled="c.value" @click="e=>r(`back`)" /><div><p>{{ l.value }}</p><component :is="P" :class="`h-9 cursor-pointer gap-2 px-4`" :disabled="c.value" data-testid="onboarding-usage-mode-continue" @click="u" /></div></footer></div>
</template>

<script setup>
import pp from './UsageModePicker.vue';
// [符号说明] u=useConfigProviderContext
import { S_is as is, S_px as px, S_n as n, S_r as r, S_c as c, S_l as l, S_u as u, S_p as p, S_P as P } from '../shared.js';
const e = defineProps({});
</script>
