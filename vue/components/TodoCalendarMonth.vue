<template>
<div :class="[`relative flex min-h-0 min-w-0 flex-col gap-0.5 border-b border-r border-[#edf0f3] px-1 pb-1 pt-1 transition-colors [&:nth-child(7n)]:border-r-0 [&:nth-last-child(-n+7)]:border-b-0`,w(e)]" @dragover="t=>A(t,e)" @dragleave="t=>j(t,e)" @drop="t=>ee(t,e)" @dblclick="t=>M(t,e)" @contextmenu="t=>ne(t,e)"><div><button type="button" data-calendar-day="" :class="[`flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-xs font-medium tabular-nums transition-colors`,T(e)]" :title="i(`todo.calendar.openWeek`)" @click="withDirectives(t=>r(`openWeek`,e.day),[`stop`])">{{ e.date }}</button></div><button type="button" data-calendar-more="" :class="`h-5 shrink-0 rounded px-1 text-left text-[11px] font-medium text-[#6b7280] transition-colors hover:bg-[#f3f4f6] hover:text-[#111827]`" @click="withDirectives(t=>u.value=u.value===e.day?null:e.day,[`stop`])"><span v-text="i(`todo.calendar.more`,{count:e.hidden})" /></button><div data-calendar-popover="" :class="[`absolute z-30 flex w-[240px] flex-col rounded-lg border border-[#e5e7eb] bg-white p-2 shadow-[0_10px_28px_rgba(15,23,42,0.12)]`,E(e)]" @click="withDirectives(()=>{},[`stop`])" @dblclick="withDirectives(()=>{},[`stop`])" @contextmenu="withDirectives(()=>{},[`stop`,`prevent`])"><div><span><span v-text="i(`todo.calendar.dayTasks`,{date:g(e.day),count:e.items.length})" /></span><button type="button" :class="`flex size-5 items-center justify-center rounded text-[#9ca3af] transition-colors hover:bg-[#f3f4f6] hover:text-[#111827]`" :aria-label="i(`common.close`)" @click="e=>u.value=null"><component :is="Nt" :size="12" :stroke-width="2" /></button></div><div></div></div></div>
</template>

<script setup>
import { withDirectives } from 'vue';
// [符号说明] u=useConfigProviderContext
import { S_is as is, S_xs as xs, S_lg as lg, S_pb as pb, S_px as px, S_e as e, S_t as t, S_r as r, S_i as i, S_u as u, S_p as p, S_g as g, S_v as v, S_b as b, S_w as w, S_T as T, S_E as E, S_A as A, S_j as j, S_ee as ee, S_M as M, S_ne as ne, S_Nt as Nt } from '../shared.js';
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
</script>
