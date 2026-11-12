<template>
<div data-v-bce7723a :class="`flex flex-col items-center gap-3 cursor-pointer`" @click="t=>o.value=e"><div :class="`relative flex items-center justify-center w-[88px] h-[88px] rounded-full text-[30px] transition-transform duration-300 hover:scale-110`" :style="at(e.unlocked?{background:d(e.tier),boxShadow:f(e.tier)}:{background:`linear-gradient(135deg, #f0f0f0, #e4e4e4)`})"><span :class="[`relative z-10`,e.unlocked?`drop-shadow-sm`:`opacity-40 grayscale`]">{{ e.icon }}</span></div><span :class="[`text-xs text-center leading-tight max-w-[92px]`,e.unlocked?`text-[#555]`:`text-[#ccc]`]">{{ m(e) }}</span></div>
</template>

<script setup>
// [符号说明] f=useConfigProviderContext
import { S_xs as xs, S_sm as sm, S_t as t, S_o as o, S_d as d, S_f as f, S_m as m, S_w as w, S_at as at } from '../shared.js';
const e = defineProps({});
</script>

<style>
/* 从原应用 CSS 恢复（data-v-bce7723a） */
[data-v-bce7723a],.modal-leave-active[data-v-bce7723a]{transition:opacity .2s}
[data-v-bce7723a],.modal-leave-active .relative[data-v-bce7723a]{transition:transform .25s cubic-bezier(.34,1.56,.64,1),opacity .2s}
[data-v-bce7723a],.modal-leave-to[data-v-bce7723a]{opacity:0}
[data-v-bce7723a],.modal-leave-to .relative[data-v-bce7723a]{opacity:0;transform:scale(.9)translateY(8px)}
</style>
