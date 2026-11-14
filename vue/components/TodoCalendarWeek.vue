<template>
<div data-v-a24468f0 :class="`todo-calendar-week flex min-h-0 flex-1 flex-col`" :data-drag-mode="u?.active?u.mode:undefined" @clickcapture="le"><div :class="`flex shrink-0 border-b border-[#edf0f3]`" :style="at({paddingRight:`${counter}px`})"><div :class="`shrink-0`" :style="at({width:`${cy}px`})"></div><div></div></div><div :class="`flex shrink-0 border-b border-[#edf0f3]`" :style="at({paddingRight:`${counter}px`})"><div :class="`flex shrink-0 flex-col items-end gap-0.5 px-1.5 py-1 text-[11px] text-[#9ca3af]`" :style="at({width:`${cy}px`})"><span>{{ i(`todo.calendar.multiDay`) }}</span><button type="button" :class="`rounded px-1 font-medium text-[#6b7280] transition-colors hover:bg-[#f3f4f6] hover:text-[#111827]`" @click="withDirectives(e=>l=!l,[`stop`])"><span v-text="l?i(`todo.calendar.collapse`):`+${y?.value}`" /></button></div><div :class="`relative min-w-0 flex-1`" :style="at({height:`${_?.value*ly+8}px`})" @contextmenu="me"></div></div><div ref="o" :class="`week-scroll relative min-h-0 flex-1 overflow-y-auto`"><div :class="`relative flex`" :style="at({height:`1056px`})"><div :class="`relative shrink-0`" :style="at({width:`${cy}px`})" aria-hidden="true"></div><div ref="s" :class="`grid min-w-0 flex-1 grid-cols-7`"></div></div></div></div>
</template>

<script setup>
import { withDirectives } from 'vue';

// [兜底] 模板引用但无来源的符号
import { S_cy as cy, S_ly as ly, S_px as px, S_e as e, S_i as i, S_o as o, S_s as s, S_v as v, S_y as y, S_b as b, S_w as w, S_at as at } from '../shared.js';
const _ = { value: undefined };
import { ref } from 'vue';

// [setup 还原] 原组件 setup 里初值不依赖 IPC 的声明
let counter = ref(0);
let l = ref(false);
let u = ref(null);
function le(e) {
  j && (j = false, e.stopPropagation());
}
function me(e) {
  e.preventDefault();
  let t = e.currentTarget.getBoundingClientRect(),
    i = Math.min(6, Math.max(0, Math.floor((e.clientX - t.left) / (t.width / 7)))),
    a = ey(n.startDay + i);
  r(`contextMenu`, {
    clientX: e.clientX,
    clientY: e.clientY,
    start: `${a}T09:30`,
    end: `${a}T18:30`
  });
}
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
