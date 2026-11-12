<template>
<section :class="[`flex min-w-0 flex-col transition-opacity`,{'opacity-60':o.value&&s.status===`overdue`&&o.value.fromStatus!==`overdue`}]" @dragenter="e=>x(e,s)" @dragover="e=>x(e,s)" @dragleave="e=>S(e,s)" @drop="e=>C(e,s)"><div><div :class="[`flex h-8 min-w-0 items-center justify-between gap-2 rounded-lg border px-3 text-xs font-semibold`,l(s.status)]"><span>{{ s.label }}</span><span :class="`min-w-0 truncate text-[11px] font-medium opacity-80`" :title="h(s)">{{ h(s) }}</span></div></div><div :class="[`flex min-h-[360px] flex-1 flex-col gap-2 rounded-xl transition-colors`,E(s)?`bg-[#f0fdf4]/70 ring-1 ring-[#86efac]`:``]"><div :class="[`flex h-24 items-center justify-center rounded-lg border border-dashed px-3 text-center text-xs transition-colors`,E(s)?`border-[#86efac] text-[#16a34a]`:`border-[#e5e7eb] text-[#9ca3af]`]">{{ s.status===`done`&&s.earlierDoneCount>0&&!a.value?i(`todo.board.noRecentDone`):i(`todo.view.emptyColumn`) }}</div><button type="button" :class="`inline-flex h-8 shrink-0 items-center justify-center rounded-lg border border-dashed border-[#e5e7eb] text-xs font-medium text-[#6b7280] transition-colors hover:border-[#d1d5db] hover:bg-[#f9fafb] hover:text-[#111827]`" @click="withDirectives(e=>a.value=!a.value,[`stop`])"><span v-text="a.value?i(`todo.board.hideEarlierDone`,{count:s.earlierDoneCount}):i(`todo.board.showEarlierDone`,{count:s.earlierDoneCount})" /></button><button type="button" :class="`inline-flex h-8 shrink-0 items-center justify-center rounded-lg text-xs font-medium text-[#9ca3af] transition-colors hover:bg-[#f9fafb] hover:text-[#16a34a] disabled:cursor-not-allowed disabled:opacity-60`" :disabled="event.loadingMore" @click="withDirectives(e=>r(`loadMore`),[`stop`])"><span v-text="event.loadingMore?i(`todo.loadingMore`):i(`todo.board.unloaded`,{count:s.total-s.loaded})" /></button></div></section>
</template>

<script setup>
import { withDirectives, h } from 'vue';
import xl from './MenuRadioItem.vue';
// [符号说明] l~computed
import { S_xs as xs, S_lg as lg, S_px as px, S_e as e, S_r as r, S_i as i, S_a as a, S_o as o, S_s as s, S_l as l, S_v as v, S_x as x, S_S as S, S_C as C, S_w as w, S_E as E } from '../shared.js';
const event = defineProps({
      tasks: {},
      statusFilter: {},
      sortField: {},
      sortDirection: {},
      selectedTaskId: {},
      counts: {},
      hasMore: {
        type: Boolean
      },
      loadingMore: {
        type: Boolean
      },
      canManage: {
        type: Function
      }
    });
const n = event;
</script>
