<template>
<button type="button" role="checkbox" :aria-checked="o.value.has(t)" :aria-disabled="i.value.get(t)?.disabled||undefined" :class="[`items-start gap-2.5 px-3 py-2.5`,[$H(o.value.has(t),items.tone),i.value.get(t)?.disabled?`cursor-not-allowed opacity-50 hover:bg-black/[0.028] dark:hover:bg-white/[0.045]`:``,ZH]]" @click="e=>f(t)"><span :class="[`mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-[5px] transition-colors`,eU(o.value.has(t),items.tone)]"><component :is="an" :size="11" :stroke-width="3" /></span><span><span><span><span v-text="r(`settings.dataTransfer.groups.${t}.name`)" /></span><span>{{ p(i.value.get(t)) }}</span></span><span><span v-text="r(`settings.dataTransfer.groups.${t}.desc`)" /></span><span :class="[`mt-1 block truncate text-[11px] tabular-nums`,o.value.has(t)?items.tone===`danger`?`text-destructive`:`text-primary`:`text-muted-foreground`]" :title="i.value.get(t)?.detail">{{ i.value.get(t)?.detail }}</span></span></button>
</template>

<script setup>
// [符号说明] f=useConfigProviderContext
import { S_is as is, S_px as px, S_ZH as ZH, S_$H as $H, S_eU as eU, S_get as get, S_e as e, S_r as r, S_i as i, S_o as o, S_f as f, S_p as p, S_v as v, S_mt as mt, S_an as an } from '../shared.js';
const items = defineProps({});
const t = items;
</script>
