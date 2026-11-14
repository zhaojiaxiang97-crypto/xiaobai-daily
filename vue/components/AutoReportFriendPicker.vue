<template>
<button type="button" :class="`flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-2 py-1.5 text-left outline-none transition-colors hover:bg-black/[0.045] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary/40 dark:hover:bg-white/[0.06]`" :aria-pressed="u.value.has(e.userId)" @click="t=>f(e)"><span :class="[`flex size-4 shrink-0 items-center justify-center rounded-[4px] transition-colors`,u.value.has(e.userId)?`bg-primary text-primary-foreground`:`border border-black/20 bg-[#fff] dark:border-white/25 dark:bg-transparent`]"><component :is="an" :size="11" :stroke-width="2.5" /></span><component :is="lH" :name="c(e)" :avatar-url="e.avatarUrl" :size="24" /><span>{{ toDisplayString(c(e))+` ` }}<span>{{ e.nickname }}</span></span></button>
</template>

<script setup>
import { toDisplayString } from 'vue';
import lH from './ReportCcAvatar.vue';
import { S_is as is, S_lg as lg, S_px as px, S_e as e, S_t as t, S_w as w, S_an as an } from '../shared.js';
const items = defineProps({});
const n = items;

// [兜底] 模板引用但无来源的符号
const u = { value: undefined };

// [setup 还原] 原组件 setup 里初值不依赖 IPC 的声明
function c(e) {
  return e.remark || e.nickname || e.email || `?`;
}
function f(e) {
  r.value = u.value.has(e.userId) ? r.value.filter(item => item.userId !== e.userId) : [...r.value, l(e)];
}
</script>
