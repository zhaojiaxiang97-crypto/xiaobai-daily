<template>
<section :class="[`flex min-w-0 flex-col transition-opacity`,{'opacity-60':o&&s.status===`overdue`&&o.fromStatus!==`overdue`}]" @dragenter="e=>x(e,s)" @dragover="e=>x(e,s)" @dragleave="e=>S(e,s)" @drop="e=>C(e,s)"><div><div :class="[`flex h-8 min-w-0 items-center justify-between gap-2 rounded-lg border px-3 text-xs font-semibold`,l(s.status)]"><span>{{ s.label }}</span><span :class="`min-w-0 truncate text-[11px] font-medium opacity-80`" :title="h(s)">{{ h(s) }}</span></div></div><div :class="[`flex min-h-[360px] flex-1 flex-col gap-2 rounded-xl transition-colors`,E(s)?`bg-[#f0fdf4]/70 ring-1 ring-[#86efac]`:``]"><div :class="[`flex h-24 items-center justify-center rounded-lg border border-dashed px-3 text-center text-xs transition-colors`,E(s)?`border-[#86efac] text-[#16a34a]`:`border-[#e5e7eb] text-[#9ca3af]`]">{{ s.status===`done`&&s.earlierDoneCount>0&&!a?i(`todo.board.noRecentDone`):i(`todo.view.emptyColumn`) }}</div><button type="button" :class="`inline-flex h-8 shrink-0 items-center justify-center rounded-lg border border-dashed border-[#e5e7eb] text-xs font-medium text-[#6b7280] transition-colors hover:border-[#d1d5db] hover:bg-[#f9fafb] hover:text-[#111827]`" @click="withDirectives(e=>a=!a,[`stop`])"><span v-text="a?i(`todo.board.hideEarlierDone`,{count:s.earlierDoneCount}):i(`todo.board.showEarlierDone`,{count:s.earlierDoneCount})" /></button><button type="button" :class="`inline-flex h-8 shrink-0 items-center justify-center rounded-lg text-xs font-medium text-[#9ca3af] transition-colors hover:bg-[#f9fafb] hover:text-[#16a34a] disabled:cursor-not-allowed disabled:opacity-60`" :disabled="event.loadingMore" @click="withDirectives(e=>r(`loadMore`),[`stop`])"><span v-text="event.loadingMore?i(`todo.loadingMore`):i(`todo.board.unloaded`,{count:s.total-s.loaded})" /></button></div></section>
</template>

<script setup>
import { withDirectives, h } from 'vue';
import xl from './MenuRadioItem.vue';
import { S_xs as xs, S_lg as lg, S_px as px, S_e as e, S_r as r, S_i as i, S_s as s, S_v as v, S_w as w } from '../shared.js';
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
import { ref } from 'vue';

// [setup 还原] 原组件 setup 里初值不依赖 IPC 的声明
let a = ref(false);
let o = ref(null);
function l(e) {
  return e === `in-progress` ? `border-[#fed7aa] bg-[#fff7ed] text-[#d97706]` : e === `done` ? `border-[#bbf7d0] bg-[#f0fdf4] text-[#16a34a]` : e === `overdue` ? `border-[#fecaca] bg-[#fef2f2] text-[#ef4444]` : `border-[#e5e7eb] bg-[#f9fafb] text-[#4b5563]`;
}
function x(e, t) {
  let value = o.value;
  if (value) {
    if (!m(t.status)) {
      value.overStatus === t.status && (value.overStatus = null, value.dropIndex = null);
      return;
    }
    e.preventDefault(), e.dataTransfer && (e.dataTransfer.dropEffect = `move`), value.overStatus = t.status, value.dropIndex = s.value ? _(e, t, value) : null;
  }
}
function S(e, t) {
  let currentTarget = e.currentTarget,
    relatedTarget = e.relatedTarget;
  if (currentTarget && relatedTarget instanceof Node && currentTarget.contains(relatedTarget)) return;
  let value = o.value;
  value?.overStatus === t.status && (value.overStatus = null, value.dropIndex = null);
}
function C(e, t) {
  let value = o.value;
  if (!value || !m(t.status)) return;
  e.preventDefault(), e.stopPropagation();
  let a = s.value ? _(e, t, value) : null,
    c = n.tasks.find(item => item.id === value.taskId),
    l = v(value, t, a);
  if (o.value = null, !c || l) return;
  let cost = [];
  if (a !== null) {
    let e = g(t, value),
      length = e.filter(item => Qv(item)).length;
    cost = Ofe(value.pinned ? e.slice(0, length) : e.slice(length), value.pinned ? a : a - length, c, n.sortDirection);
  }
  r(`move`, {
    taskId: c.id,
    status: t.status,
    sortOrders: cost
  });
}
function E(e) {
  return o.value?.overStatus === e.status;
}
</script>
