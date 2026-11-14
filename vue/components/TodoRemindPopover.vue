<template>
<button type="button" :class="`flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm text-[#111827] transition-colors hover:bg-[#f3f4f6]`" @click="e=>s(t)"><span>{{ a(t) }}</span><component :is="an" :size="14" :stroke-width="2" :class="`shrink-0 text-[#16a34a]`" /></button>
</template>

<script setup>
import md from './BaseSeparator.vue';
import { S_is as is, S_sm as sm, S_px as px, S_t as t, S_w as w, S_an as an } from '../shared.js';
const e = defineProps({
      open: {
        type: Boolean
      },
      disabled: {
        type: Boolean
      },
      current: {},
      choices: {}
    });
const n = e;

// [setup 还原] 原组件 setup 里初值不依赖 IPC 的声明
function a(e) {
  return e === 60 ? i(`todo.remind.beforeHour`) : i(`todo.remind.before`, {
    count: e
  });
}
function s(e) {
  r(`select`, e), r(`update:open`, false);
}
</script>
