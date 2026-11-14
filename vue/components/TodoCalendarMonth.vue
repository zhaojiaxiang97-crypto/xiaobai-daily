<template>
<div :class="[`relative flex min-h-0 min-w-0 flex-col gap-0.5 border-b border-r border-[#edf0f3] px-1 pb-1 pt-1 transition-colors [&:nth-child(7n)]:border-r-0 [&:nth-last-child(-n+7)]:border-b-0`,w(e)]" @dragover="t=>A(t,e)" @dragleave="t=>j(t,e)" @drop="t=>ee(t,e)" @dblclick="t=>M(t,e)" @contextmenu="t=>ne(t,e)"><div><button type="button" data-calendar-day="" :class="[`flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-xs font-medium tabular-nums transition-colors`,T(e)]" :title="i(`todo.calendar.openWeek`)" @click="withDirectives(t=>r(`openWeek`,e.day),[`stop`])">{{ e.date }}</button></div><button type="button" data-calendar-more="" :class="`h-5 shrink-0 rounded px-1 text-left text-[11px] font-medium text-[#6b7280] transition-colors hover:bg-[#f3f4f6] hover:text-[#111827]`" @click="withDirectives(t=>u=u===e.day?null:e.day,[`stop`])"><span v-text="i(`todo.calendar.more`,{count:e.hidden})" /></button><div data-calendar-popover="" :class="[`absolute z-30 flex w-[240px] flex-col rounded-lg border border-[#e5e7eb] bg-white p-2 shadow-[0_10px_28px_rgba(15,23,42,0.12)]`,E(e)]" @click="withDirectives(()=>{},[`stop`])" @dblclick="withDirectives(()=>{},[`stop`])" @contextmenu="withDirectives(()=>{},[`stop`,`prevent`])"><div><span><span v-text="i(`todo.calendar.dayTasks`,{date:g(e.day),count:e.items.length})" /></span><button type="button" :class="`flex size-5 items-center justify-center rounded text-[#9ca3af] transition-colors hover:bg-[#f3f4f6] hover:text-[#111827]`" :aria-label="i(`common.close`)" @click="e=>u=null"><component :is="Nt" :size="12" :stroke-width="2" /></button></div><div></div></div></div>
</template>

<script setup>
import { withDirectives } from 'vue';
import { S_is as is, S_xs as xs, S_lg as lg, S_pb as pb, S_px as px, S_e as e, S_t as t, S_r as r, S_i as i, S_p as p, S_v as v, S_b as b, S_Nt as Nt } from '../shared.js';
const event = defineProps({
      tasks: {},
      startDay: {},
      anchorDay: {},
      todayDay: {},
      now: {},
      selectedTaskId: {},
      canManage: {
        type: Function
      }
    });
const n = event;
import { ref } from 'vue';

// [setup 还原] 原组件 setup 里初值不依赖 IPC 的声明
let u = ref(null);
function g(e) {
  let t = Iv(e);
  return i(`todo.date.monthDay`, {
    month: t.month,
    day: t.day
  });
}
function w(e) {
  return l.value === e.day ? `bg-[#f0fdf4]` : e.inMonth ? `` : `bg-[#fafafa]`;
}
function T(e) {
  return e.isToday ? `bg-[#16a34a] text-white` : e.inMonth ? `text-[#374151] hover:bg-[#f3f4f6]` : `text-[#c0c4cc] hover:bg-[#f3f4f6]`;
}
function E(e) {
  return [e.index % 7 >= 5 ? `right-1` : `left-1`, Math.floor(e.index / 7) >= 3 ? `bottom-1` : `top-1`];
}
function A(e, t) {
  c.value !== null && (e.preventDefault(), e.dataTransfer && (e.dataTransfer.dropEffect = `move`), l.value = t.day);
}
function j(e, t) {
  let currentTarget = e.currentTarget,
    relatedTarget = e.relatedTarget;
  currentTarget && relatedTarget instanceof Node && currentTarget.contains(relatedTarget) || l.value === t.day && (l.value = null);
}
function ee(e, t) {
  if (c.value === null) return;
  e.preventDefault();
  let n = O(c.value);
  if (D(), !n) return;
  let i = (t.day - n.dueDay) * Nv;
  if (!i) return;
  let a = n.schedule.due + i,
    o = Uv(n.schedule.start) === n.dueDay || n.schedule.start > a ? n.schedule.start + i : n.schedule.start;
  r(`reschedule`, {
    taskId: n.task.id,
    start: Gv(o),
    end: Gv(a)
  });
}
function M(e, t) {
  e.target?.closest(`[data-calendar-chip], [data-calendar-more], [data-calendar-day], [data-calendar-popover]`) || r(`create`, te(t.day));
}
function ne(e, t) {
  e.preventDefault(), u.value = null, r(`contextMenu`, {
    clientX: e.clientX,
    clientY: e.clientY,
    ...te(t.day)
  });
}
</script>
