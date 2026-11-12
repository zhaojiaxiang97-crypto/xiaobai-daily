<template>
<button data-v-0440f53a type="button" role="tab" :class="[`flex min-w-0 flex-col items-center rounded-md px-1 pt-2 pb-1.5 transition-colors`,counter.value===t?`bg-black/[0.04]`:`hover:bg-black/[0.03]`]" :aria-selected="counter.value===t" @click="e=>counter.value=t"><span :class="[`text-xs leading-none tabular-nums whitespace-nowrap`,counter.value===t||_.value===t?`font-semibold text-(--foreground)`:`text-[#999]`]">{{ h(e) }}</span><div><span :class="`w-full max-w-[28px] rounded-t-[4px] rounded-b-[2px] transition-[height] duration-200`" :style="at(C(e,t))"></span></div><span :class="[`mt-2 text-xs leading-none whitespace-nowrap`,counter.value===t?`font-medium text-(--foreground)`:`text-[#555]`]">{{ u(e.date) }}</span><span>{{ l(e.date) }}</span></button>
</template>

<script setup>
import { h } from 'vue';
import md from './BaseSeparator.vue';
// [符号说明] u=useConfigProviderContext
import { S_xs as xs, S_pb as pb, S_px as px, S_counter as counter, S_e as e, S_t as t, S_l as l, S_u as u, S__ as _, S_b as b, S_C as C, S_w as w, S_at as at, S_mt as mt } from '../shared.js';
const text = defineProps({
      summaries: {}
    });
const n = text;
</script>

<style>
/* 从原应用 CSS 恢复（data-v-0440f53a） */
[data-v-0440f53a]{container-type:inline-size}
[data-v-0440f53a]{flex-direction:column;gap:12px}
[data-v-0440f53a]{border-left:0;flex-direction:row;justify-content:space-between;width:auto;padding-left:0}
</style>
