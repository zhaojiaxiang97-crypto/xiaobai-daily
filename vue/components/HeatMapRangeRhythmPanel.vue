<template>
<button data-v-0440f53a type="button" role="tab" :class="[`flex min-w-0 flex-col items-center rounded-md px-1 pt-2 pb-1.5 transition-colors`,counter===t?`bg-black/[0.04]`:`hover:bg-black/[0.03]`]" :aria-selected="counter===t" @click="e=>counter=t"><span :class="[`text-xs leading-none tabular-nums whitespace-nowrap`,counter===t||_?.value===t?`font-semibold text-(--foreground)`:`text-[#999]`]">{{ h(e) }}</span><div><span :class="`w-full max-w-[28px] rounded-t-[4px] rounded-b-[2px] transition-[height] duration-200`" :style="at(C(e,t))"></span></div><span :class="[`mt-2 text-xs leading-none whitespace-nowrap`,counter===t?`font-medium text-(--foreground)`:`text-[#555]`]">{{ u(e.date) }}</span><span>{{ l(e.date) }}</span></button>
</template>

<script setup>
import { h } from 'vue';
import md from './BaseSeparator.vue';
import { S_xs as xs, S_pb as pb, S_px as px, S_e as e, S_t as t, S_b as b, S_w as w, S_at as at, S_mt as mt } from '../shared.js';
const text = defineProps({
      summaries: {}
    });
const n = text;

// [兜底] 模板引用但无来源的符号
const _ = { value: undefined };
import { ref } from 'vue';

// [setup 还原] 原组件 setup 里初值不依赖 IPC 的声明
function l(e) {
  let t = o(e);
  return `${String(t.getMonth() + 1).padStart(2, `0`)}.${String(t.getDate()).padStart(2, `0`)}`;
}
function u(e) {
  return i(`weekDays.${o(e).getDay()}`);
}
let counter = ref(0);
function C(e, t) {
  let n = m(e);
  return n <= 0 ? {
    height: `2px`,
    background: `var(--heatmap-empty)`
  } : {
    height: `max(3px, ${n / g.value * 100}%)`,
    background: t === _.value ? `var(--heatmap-4)` : `var(--heatmap-2)`
  };
}
</script>

<style>
/* 从原应用 CSS 恢复（data-v-0440f53a） */
[data-v-0440f53a]{container-type:inline-size}
[data-v-0440f53a]{flex-direction:column;gap:12px}
[data-v-0440f53a]{border-left:0;flex-direction:row;justify-content:space-between;width:auto;padding-left:0}
</style>
