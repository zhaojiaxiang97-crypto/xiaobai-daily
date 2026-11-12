<template>
<section :id="`settings-${e.id}`" :class="`scroll-mt-6 rounded-[10px] bg-black/[0.02] p-5 px-[18px] dark:bg-card`"><div><component :is="Be(r.value.icon)" :size="14" :stroke-width="1.5" :class="`text-[#999] dark:text-muted-foreground`" /><h2>{{ n(r.value.titleKey) }}</h2></div><slot /></section>
</template>

<script setup>
// [符号说明] n~computed
import { S_is as is, S_px as px, S_h2 as h2, S_n as n, S_r as r, S_p as p, S_Be as Be, S_mt as mt } from '../shared.js';
const e = defineProps({
      id: {}
    });
const t = e;
</script>
