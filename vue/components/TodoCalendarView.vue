<template>
<div ref="y" :class="`todo-calendar relative flex h-full min-h-0 flex-1 flex-col overflow-hidden rounded-lg border border-[#e5e7eb] bg-white`"><div :class="`flex h-11 shrink-0 items-center justify-between gap-3 border-b border-[#e5e7eb] px-3`" @click="withDirectives(()=>{},[`stop`])"><div><span>{{ f.value }}</span><component :is="zn" :size="14" :class="`shrink-0 animate-spin text-[#9ca3af] motion-reduce:animate-none`" aria-hidden="true" /><span :class="`truncate text-xs text-[#ef4444]`" :title="event.error">{{ event.error }}</span></div><div><span>{{ r(`todo.calendar.createHint`) }}</span><div><button type="button" :class="`flex h-full w-7 items-center justify-center text-[#6b7280] transition-colors hover:bg-[#f9fafb] hover:text-[#111827]`" :aria-label="r(`todo.gantt.prev`)" :title="r(`todo.gantt.prev`)" @click="e=>m(-1)"><component :is="Qt" :size="14" :stroke-width="2" /></button><button type="button" :class="[`h-full border-x border-[#e5e7eb] px-2.5 text-xs font-medium transition-colors hover:bg-[#f9fafb] hover:text-[#111827]`,p.value?`text-[#9ca3af]`:`text-[#4b5563]`]" @click="h">{{ r(`todo.gantt.today`) }}</button><button type="button" :class="`flex h-full w-7 items-center justify-center text-[#6b7280] transition-colors hover:bg-[#f9fafb] hover:text-[#111827]`" :aria-label="r(`todo.gantt.next`)" :title="r(`todo.gantt.next`)" @click="e=>m(1)"><component :is="dn" :size="14" :stroke-width="2" /></button></div><div :class="`inline-flex h-7 items-center rounded-md border border-[#e5e7eb] bg-[#f9fafb] p-0.5`" role="radiogroup" :aria-label="r(`todo.calendar.modeLabel`)"></div></div></div><component :is="cpe" :tasks="event.tasks" :start-day="l.value.startDay" :anchor-day="c.value" :today-day="s.value" :now="o.value" :selected-task-id="event.selectedTaskId" :can-manage="event.canManage" @select="e=>n(`select`,e)" @reschedule="e=>n(`reschedule`,e)" @create="e=>n(`create`,e)" @openweek="_" @contextmenu="x" /><div data-calendar-context-menu="" role="menu" :class="`absolute z-50 flex flex-col rounded-lg border border-[#e5e7eb] bg-white p-1 shadow-[0_10px_28px_rgba(15,23,42,0.14)]`" :style="at({left:`${b.value.left}px`,top:`${b.value.top}px`,width:`${dy}px`})" @click="withDirectives(()=>{},[`stop`])" @contextmenu="withDirectives(()=>{},[`prevent`,`stop`])"><button type="button" role="menuitem" :class="`flex h-8 items-center gap-2 rounded-md px-2.5 text-left text-xs font-medium text-[#111827] transition-colors hover:bg-[#f3f4f6]`" @click="C"><component :is="Na" :size="14" :stroke-width="1.8" :class="`shrink-0 text-[#6b7280]`" />{{ ` `+toDisplayString(r(`todo.calendar.newEvent`)) }}</button></div></div>
</template>

<script setup>
import { toDisplayString, withDirectives } from 'vue';
import md from './BaseSeparator.vue';
import cpe from './TodoCalendarMonth.vue';
import { S_Na as Na, S_is as is, S_xs as xs, S_lg as lg, S_dy as dy, S_px as px, S_e as e, S_n as n, S_r as r, S_o as o, S_s as s, S_c as c, S_l as l, S_f as f, S_p as p, S_m as m, S__ as _, S_y as y, S_b as b, S_x as x, S_C as C, S_w as w, S_at as at, S_Qt as Qt, S_dn as dn, S_zn as zn } from '../shared.js';
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
</script>
