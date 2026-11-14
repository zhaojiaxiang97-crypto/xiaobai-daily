<template>
<div ref="y" :class="`todo-calendar relative flex h-full min-h-0 flex-1 flex-col overflow-hidden rounded-lg border border-[#e5e7eb] bg-white`"><div :class="`flex h-11 shrink-0 items-center justify-between gap-3 border-b border-[#e5e7eb] px-3`" @click="withDirectives(()=>{},[`stop`])"><div><span>{{ f?.value }}</span><component :is="zn" :size="14" :class="`shrink-0 animate-spin text-[#9ca3af] motion-reduce:animate-none`" aria-hidden="true" /><span :class="`truncate text-xs text-[#ef4444]`" :title="event.error">{{ event.error }}</span></div><div><span>{{ r(`todo.calendar.createHint`) }}</span><div><button type="button" :class="`flex h-full w-7 items-center justify-center text-[#6b7280] transition-colors hover:bg-[#f9fafb] hover:text-[#111827]`" :aria-label="r(`todo.gantt.prev`)" :title="r(`todo.gantt.prev`)" @click="e=>m(-1)"><component :is="Qt" :size="14" :stroke-width="2" /></button><button type="button" :class="[`h-full border-x border-[#e5e7eb] px-2.5 text-xs font-medium transition-colors hover:bg-[#f9fafb] hover:text-[#111827]`,p?.value?`text-[#9ca3af]`:`text-[#4b5563]`]" @click="h">{{ r(`todo.gantt.today`) }}</button><button type="button" :class="`flex h-full w-7 items-center justify-center text-[#6b7280] transition-colors hover:bg-[#f9fafb] hover:text-[#111827]`" :aria-label="r(`todo.gantt.next`)" :title="r(`todo.gantt.next`)" @click="e=>m(1)"><component :is="dn" :size="14" :stroke-width="2" /></button></div><div :class="`inline-flex h-7 items-center rounded-md border border-[#e5e7eb] bg-[#f9fafb] p-0.5`" role="radiogroup" :aria-label="r(`todo.calendar.modeLabel`)"></div></div></div><component :is="cpe" :tasks="event.tasks" :start-day="l.value.startDay" :anchor-day="c?.value" :today-day="s?.value" :now="o?.value" :selected-task-id="event.selectedTaskId" :can-manage="event.canManage" @select="e=>n(`select`,e)" @reschedule="e=>n(`reschedule`,e)" @create="e=>n(`create`,e)" @openweek="_" @contextmenu="x" /><div data-calendar-context-menu="" role="menu" :class="`absolute z-50 flex flex-col rounded-lg border border-[#e5e7eb] bg-white p-1 shadow-[0_10px_28px_rgba(15,23,42,0.14)]`" :style="at({left:`${b.left}px`,top:`${b.top}px`,width:`${dy}px`})" @click="withDirectives(()=>{},[`stop`])" @contextmenu="withDirectives(()=>{},[`prevent`,`stop`])"><button type="button" role="menuitem" :class="`flex h-8 items-center gap-2 rounded-md px-2.5 text-left text-xs font-medium text-[#111827] transition-colors hover:bg-[#f3f4f6]`" @click="C"><component :is="Na" :size="14" :stroke-width="1.8" :class="`shrink-0 text-[#6b7280]`" />{{ ` `+toDisplayString(r(`todo.calendar.newEvent`)) }}</button></div></div>
</template>

<script setup>
import { toDisplayString, withDirectives } from 'vue';
import md from './BaseSeparator.vue';
import cpe from './TodoCalendarMonth.vue';
// [符号说明] n~computed
import { S_Na as Na, S_is as is, S_xs as xs, S_lg as lg, S_dy as dy, S_px as px, S_e as e, S_n as n, S_r as r, S_p as p, S_y as y, S_w as w, S_at as at, S_Qt as Qt, S_dn as dn, S_zn as zn } from '../shared.js';
const event = defineProps({
      tasks: {},
      selectedTaskId: {},
      canManage: {
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

// [兜底] 模板引用但无来源的符号
const f = { value: undefined };
const l = { value: undefined };
const c = { value: undefined };
const s = { value: undefined };
const o = { value: undefined };
import { ref } from 'vue';

// [setup 还原] 原组件 setup 里初值不依赖 IPC 的声明
function m(e) {
  if (a.value === `week`) {
    c.value += e * 7;
    return;
  }
  let t = Iv(c.value);
  c.value = Fv(t.year, t.month + e, 1);
}
function h() {
  c.value = s.value;
}
function _(e) {
  c.value = e, a.value = `week`;
}
let b = ref(null);
function x(e) {
  let value = y.value;
  if (!value) return;
  let n = value.getBoundingClientRect();
  b.value = {
    left: Math.max(4, Math.min(e.clientX - n.left, value.clientWidth - dy - 4)),
    top: Math.max(4, Math.min(e.clientY - n.top, value.clientHeight - jpe - 4)),
    start: e.start,
    end: e.end
  };
}
function C() {
  let value = b.value;
  S(), value && n(`create`, {
    start: value.start,
    end: value.end
  });
}
</script>
