<template>
<div data-v-a24468f0 :class="`todo-calendar-week flex min-h-0 flex-1 flex-col`" :data-drag-mode="u.value?.active?u.value.mode:undefined" @clickcapture="le"><div :class="`flex shrink-0 border-b border-[#edf0f3]`" :style="at({paddingRight:`${counter.value}px`})"><div :class="`shrink-0`" :style="at({width:`${cy}px`})"></div><div></div></div><div :class="`flex shrink-0 border-b border-[#edf0f3]`" :style="at({paddingRight:`${counter.value}px`})"><div :class="`flex shrink-0 flex-col items-end gap-0.5 px-1.5 py-1 text-[11px] text-[#9ca3af]`" :style="at({width:`${cy}px`})"><span>{{ i(`todo.calendar.multiDay`) }}</span><button type="button" :class="`rounded px-1 font-medium text-[#6b7280] transition-colors hover:bg-[#f3f4f6] hover:text-[#111827]`" @click="withDirectives(e=>l.value=!l.value,[`stop`])"><span v-text="l.value?i(`todo.calendar.collapse`):`+${y.value}`" /></button></div><div :class="`relative min-w-0 flex-1`" :style="at({height:`${_.value*ly+8}px`})" @contextmenu="me"></div></div><div ref="o" :class="`week-scroll relative min-h-0 flex-1 overflow-y-auto`"><div :class="`relative flex`" :style="at({height:`1056px`})"><div :class="`relative shrink-0`" :style="at({width:`${cy}px`})" aria-hidden="true"></div><div ref="s" :class="`grid min-w-0 flex-1 grid-cols-7`"></div></div></div></div>
</template>

<script setup>
import { withDirectives } from 'vue';
import { S_cy as cy, S_ly as ly, S_px as px, S_counter as counter, S_e as e, S_i as i, S_o as o, S_s as s, S_l as l, S_u as u, S__ as _, S_v as v, S_y as y, S_b as b, S_w as w, S_le as le, S_me as me, S_at as at } from '../shared.js';
</script>

<style>
/* 从原应用 CSS 恢复（data-v-a24468f0） */
[data-v-a24468f0]{background-image:linear-gradient(#edf0f3 1px,#0000 1px)}
[data-v-a24468f0]{background-color:#fafafa}
[data-v-a24468f0]{background-color:#ecfdf580}
[data-v-a24468f0],.todo-calendar-week[data-drag-mode=move][data-v-a24468f0] *{cursor:grabbing!important}
[data-v-a24468f0],.todo-calendar-week[data-drag-mode=resize][data-v-a24468f0] *{cursor:ns-resize!important}
[data-v-a24468f0]::-webkit-scrollbar{width:8px}
[data-v-a24468f0]::-webkit-scrollbar-track{background:0 0}
[data-v-a24468f0]::-webkit-scrollbar-thumb{background-color:#1118271a;background-clip:padding-box;border:2px solid #0000;border-radius:999px}
[data-v-a24468f0]:hover::-webkit-scrollbar-thumb{background-color:#11182733}
[data-v-a24468f0]{background-image:linear-gradient(to bottom, var(--border) 1px, transparent 1px)}
[data-v-a24468f0]{background-color:#ffffff05}
[data-v-a24468f0]{background-color:#22c55e0f}
[data-v-a24468f0]::-webkit-scrollbar-thumb{background-color:#ffffff1a}
[data-v-a24468f0]:hover::-webkit-scrollbar-thumb{background-color:#fff3}
</style>
