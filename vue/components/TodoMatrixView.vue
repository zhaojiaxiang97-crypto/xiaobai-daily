<template>
<article data-v-1d3cef4c :class="[`select-none rounded-lg border p-2.5 text-left transition-colors`,h(n)]" :draggable="event.canManage(n)" @click="withDirectives(e=>r(`select`,n.id),[`stop`])" @dragstart="e=>x(e,n,t.id)" @dragend="b"><div><button type="button" :class="`mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-[4px] border border-[#d1d5db] bg-white text-transparent transition-colors hover:border-[#16a34a] disabled:cursor-not-allowed disabled:opacity-60`" :disabled="!event.canManage(n)" :aria-label="i(`todo.matrix.complete`)" :title="i(`todo.matrix.complete`)" @click="withDirectives(e=>r(`toggleDone`,n),[`stop`])"><component :is="an" :size="12" :stroke-width="3" /></button><div><button type="button" :class="`w-full text-left text-sm font-semibold leading-5 text-[#111827]`" :title="n.title" @click="withDirectives(e=>r(`select`,n.id),[`stop`])"><span>{{ n.title }}</span></button><div><button type="button" :class="[`inline-flex items-center gap-1 rounded-md border border-transparent px-1 py-0.5 transition-colors`,_(n)]" @click="withDirectives(e=>r(`editDue`,n),[`stop`])"><component :is="Ft" :size="13" :stroke-width="1.8" />{{ ` `+toDisplayString(n.dueDateMissing?i(`todo.matrix.noDue`):event.formatDue(n)) }}</button><span :class="[`inline-flex items-center gap-1 font-medium`,y(n.priority)]"><component :is="Ar" :size="12" fill="currentColor" :stroke-width="1.6" />{{ ` `+toDisplayString(v(n.priority)) }}</span><span>{{ i(`todo.status.overdue`) }}</span></div></div></div></article>
</template>

<script setup>
import { toDisplayString, withDirectives, h } from 'vue';
import md from './BaseSeparator.vue';
import { S_is as is, S_sm as sm, S_lg as lg, S_px as px, S_e as e, S_t as t, S_r as r, S_i as i, S_p as p, S__ as _, S_v as v, S_y as y, S_b as b, S_x as x, S_w as w, S_mt as mt, S_Ft as Ft, S_an as an, S_Ar as Ar } from '../shared.js';
const event = defineProps({
      tasks: {},
      selectedTaskId: {},
      canManage: {
        type: Function
      },
      formatDue: {
        type: Function
      },
      loading: {
        type: Boolean
      },
      truncated: {
        type: Boolean
      },
      error: {}
    });
const n = event;
</script>

<style>
/* 从原应用 CSS 恢复（data-v-1d3cef4c） */
[data-v-1d3cef4c]::-webkit-scrollbar{width:6px}
[data-v-1d3cef4c]::-webkit-scrollbar-track{background:0 0}
[data-v-1d3cef4c]::-webkit-scrollbar-thumb{background-color:#0000;border-radius:999px}
[data-v-1d3cef4c]:hover::-webkit-scrollbar-thumb{background-color:#11182729}
[data-v-1d3cef4c]:hover::-webkit-scrollbar-thumb{background-color:#ffffff29}
</style>
