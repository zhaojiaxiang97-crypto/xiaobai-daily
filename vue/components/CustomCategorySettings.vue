<template>
<div :class="`group flex max-w-full items-center gap-1 rounded-full border border-black/6 bg-white px-2 py-1 text-xs leading-none text-[#555] transition-colors hover:border-black/10 hover:bg-black/[0.015]`"><span :class="[`size-2 shrink-0 rounded-full`,w[e.color]]"></span><span>{{ f_(e.name,n) }}</span><span>{{ t(`settings.customCategoryDisabled`) }}</span><button type="button" :class="`ml-0.5 flex size-4 shrink-0 items-center justify-center rounded-full text-[#999] opacity-70 transition hover:bg-black/5 hover:text-(--foreground) group-hover:opacity-100`" :title="t(`settings.editCustomCategory`)" @click="t=>oe(e)"><component :is="v" :size="11" /></button><button type="button" :class="`flex size-4 shrink-0 items-center justify-center rounded-full text-red-400 opacity-70 transition hover:bg-red-500/10 hover:text-red-600 group-hover:opacity-100`" :title="t(`common.delete`)" @click="t=>ce(e)"><component :is="Ae" :size="11" /></button></div>
</template>

<script setup>
// [符号说明] n~computed
import { S_is as is, S_xs as xs, S_px as px, S_e as e, S_t as t, S_n as n, S_v as v, S_w as w, S_oe as oe, S_ce as ce, S_Ae as Ae } from '../shared.js';
const text = defineProps({});
</script>
