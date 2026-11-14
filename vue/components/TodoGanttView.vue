<template>
<div data-v-8f46fbd1 ref="f" :class="`todo-gantt relative flex h-full min-h-0 flex-1 flex-col overflow-hidden rounded-lg border border-[#e5e7eb] bg-white`" :data-drag-mode="Be"><div :class="`flex h-11 shrink-0 items-center justify-between gap-3 border-b border-[#e5e7eb] px-3`" @click="withDirectives(()=>{},[`stop`])"><div><span>{{ i(`todo.view.ganttTask`) }}</span><span><span v-text="i(`todo.loadedCount`,{count:M.value.length})" /></span></div><div><div><span><span :class="[`size-2 rounded-full border-2`,Se(`created`)]"></span>{{ ` `+toDisplayString(i(`todo.gantt.created`)) }}</span><span>{{ ` `+toDisplayString(i(`todo.gantt.legendRescheduled`)) }}</span><span>{{ ` `+toDisplayString(i(`todo.gantt.legendActual`)) }}</span><span><span><component :is="ts" :size="8" :stroke-width="2.4" /></span>{{ ` `+toDisplayString(i(`todo.gantt.legendComments`)) }}</span><span><span><component :is="an" :size="8" :stroke-width="3.5" /></span>{{ ` `+toDisplayString(i(`todo.gantt.completed`)) }}</span></div><button type="button" :class="[`inline-flex h-7 items-center rounded-md border px-2 text-xs font-medium transition-colors`,u?.value?`border-[#bbf7d0] bg-[#f0fdf4] text-[#16a34a] hover:bg-[#dcfce7]`:`border-[#e5e7eb] bg-white text-[#4b5563] hover:bg-[#f9fafb]`]" :aria-pressed="u?.value" :title="i(`todo.gantt.timePointsHint`)" @click="e=>u.value=!u?.value">{{ i(`todo.view.ganttLegend`) }}</button><div :class="`inline-flex h-7 items-center rounded-md border border-[#e5e7eb] bg-[#f9fafb] p-0.5`" role="radiogroup" :aria-label="i(`todo.gantt.zoom`)"></div><div><button type="button" :class="`flex h-full w-7 items-center justify-center text-[#6b7280] transition-colors hover:bg-[#f9fafb] hover:text-[#111827]`" :aria-label="i(`todo.gantt.prev`)" :title="i(`todo.gantt.prev`)" @click="e=>Ue(-1)"><component :is="Qt" :size="14" :stroke-width="2" /></button><button type="button" :class="`h-full border-x border-[#e5e7eb] px-2.5 text-xs font-medium text-[#4b5563] transition-colors hover:bg-[#f9fafb] hover:text-[#111827]`" @click="He">{{ i(`todo.gantt.today`) }}</button><button type="button" :class="`flex h-full w-7 items-center justify-center text-[#6b7280] transition-colors hover:bg-[#f9fafb] hover:text-[#111827]`" :aria-label="i(`todo.gantt.next`)" :title="i(`todo.gantt.next`)" @click="e=>Ue(1)"><component :is="dn" :size="14" :stroke-width="2" /></button></div></div></div><div ref="p" :class="[`todo-gantt-scroll min-h-0 flex-1 overflow-auto`,{'is-panning':v}]" @scroll="Ke"><div :style="at({width:`${ie?.value}px`})"><div :class="`sticky top-0 z-40 flex border-b border-[#e5e7eb] bg-white`" :style="at({height:`${yfe}px`})"><div :class="`sticky left-0 z-10 flex shrink-0 items-center border-r border-[#e5e7eb] bg-white px-3 text-xs font-semibold text-[#111827]`" :style="at({width:`${qv}px`})">{{ je?.value }}</div><div :class="`relative shrink-0`" :style="at({width:`${re?.value}px`})" @wheel="qe"><span :class="`pointer-events-none absolute inset-y-0 z-10 w-px bg-[#16a34a]`" :style="at({left:`${ae?.value}px`})"></span></div></div><div><div :class="`pointer-events-none absolute inset-y-0`" :style="at({left:`${qv}px`,width:`${re?.value}px`})" aria-hidden="true"><span :class="`absolute inset-y-0 z-[6] w-px bg-[#16a34a]/80`" :style="at({left:`${ae?.value}px`})"></span></div></div><div :class="`sticky left-0 flex h-14 items-center justify-center text-xs text-[#9ca3af]`" :style="at({width:`${counter}px`})"><button type="button" :class="`inline-flex h-8 items-center justify-center rounded-lg border border-[#e5e7eb] bg-white px-4 font-medium text-[#4b5563] transition-colors hover:border-[#bbf7d0] hover:bg-[#f0fdf4] hover:text-[#16a34a] disabled:cursor-not-allowed disabled:opacity-60`" :disabled="event.loadingMore" @click="withDirectives(e=>r(`loadMore`),[`stop`])">{{ event.loadingMore?i(`todo.loadingMore`):i(`todo.loadMore`) }}</button></div></div></div><div ref="m" :class="[`pointer-events-none absolute z-50 w-[264px] rounded-lg border border-[#e5e7eb] bg-white p-3 text-xs shadow-[0_10px_28px_rgba(15,23,42,0.12)]`,x?`opacity-100`:`opacity-0`]" :style="at(ze)" role="tooltip"><div>{{ Ne.value.title }}</div><div><span :class="[`size-1.5 shrink-0 rounded-full`,xe(Ne.value.status)]"></span><span>{{ ye(Ne.value.status) }}</span><span>{{ Ne.value.progress }}</span></div><div><component :is="Ys" :size="13" :stroke-width="2.2" :class="`mt-0.5 shrink-0`" /><span>{{ i(`todo.gantt.invalidRangeHint`) }}</span></div><dl></dl><div><div>{{ i(`todo.gantt.recentActivity`) }}</div></div><div>{{ Ne.value.overdue }}</div><div>{{ i(`todo.gantt.dragHint`) }}</div></div></div>
</template>

<script setup>
import { toDisplayString, withDirectives } from 'vue';
import md from './BaseSeparator.vue';
// [符号说明] f=useConfigProviderContext
import { S_ts as ts, S_is as is, S_xs as xs, S_Ys as Ys, S_lg as lg, S_qv as qv, S_yfe as yfe, S_px as px, S_e as e, S_r as r, S_i as i, S_f as f, S_p as p, S_m as m, S_w as w, S_at as at, S_mt as mt, S_Qt as Qt, S_an as an, S_dn as dn } from '../shared.js';
const event = defineProps({
      tasks: {},
      selectedTaskId: {},
      hasMore: {
        type: Boolean
      },
      loadingMore: {
        type: Boolean
      },
      showLoadedAll: {
        type: Boolean
      },
      timeOrdered: {
        type: Boolean
      },
      canReschedule: {
        type: Function
      }
    });
const n = event;

// [兜底] 模板引用但无来源的符号
const je = { value: undefined };
const Ne = { value: undefined };
const M = { value: undefined };
const u = { value: undefined };
const ie = { value: undefined };
const re = { value: undefined };
const ae = { value: undefined };
import { ref, computed } from 'vue';

// [setup 还原] 原组件 setup 里初值不依赖 IPC 的声明
let counter = ref(0);
let g = ref(0);
let v = ref(false);
let y = ref(null);
let b = ref(null);
let x = ref(null);
function ye(e) {
  return i(e === `in-progress` ? `todo.status.inProgress` : e === `done` ? `todo.status.done` : e === `overdue` ? `todo.status.overdue` : `todo.status.todo`);
}
function xe(e) {
  return e === `in-progress` ? `bg-[#f59e0b]` : e === `done` ? `bg-[#16a34a]` : e === `overdue` ? `bg-[#ef4444]` : `bg-[#9ca3af]`;
}
function Se(e) {
  return e === `created` ? `border-[#9ca3af] bg-white` : `border-[#3b82f6] bg-white`;
}
let ze = computed(() => x.value ? {
  left: `${x.value.left}px`,
  top: `${x.value.top}px`
} : {
  left: `0px`,
  top: `0px`
});
let Be = computed(() => y.value?.active ? y.value.mode : undefined);
function He() {
  Ve(_.value, 0.3, `smooth`);
}
function Ue(e) {
  p.value?.scrollBy({
    left: e * T.value * 0.8,
    behavior: `smooth`
  });
}
function Ke() {
  let value = p.value;
  value && (g.value = value.scrollLeft, b.value && Xe(), Ge());
}
function qe(e) {
  let value = p.value;
  if (!value || e.ctrlKey) return;
  let n = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
  n && (e.preventDefault(), value.scrollLeft += n);
}
</script>

<style>
/* 从原应用 CSS 恢复（data-v-8f46fbd1） */
[data-v-8f46fbd1]{cursor:pointer;background-color:#fff}
[data-v-8f46fbd1]{background-color:#fbfbfb}
[data-v-8f46fbd1]{background-color:#f0fdf4}
[data-v-8f46fbd1]{background-color:#11182705}
[data-v-8f46fbd1]{background-color:#16a34a0d}
[data-v-8f46fbd1]{background-color:#fafafa}
[data-v-8f46fbd1]{background-color:#ecfdf5b3}
[data-v-8f46fbd1]{opacity:.12;background-color:currentColor}
[data-v-8f46fbd1]:after{content:"";opacity:0;background-color:currentColor;border-radius:1px;width:2px;transition:opacity .15s;position:absolute;top:8px;bottom:8px;left:3px}
[data-v-8f46fbd1]:after{opacity:.35}
[data-v-8f46fbd1],.gantt-completed-marker[data-v-8f46fbd1]{box-shadow:0 0 0 2px #fff}
[data-v-8f46fbd1],.todo-gantt[data-drag-mode=move][data-v-8f46fbd1] *{cursor:grabbing!important}
[data-v-8f46fbd1],.todo-gantt[data-drag-mode=start][data-v-8f46fbd1] *,.todo-gantt[data-drag-mode=end][data-v-8f46fbd1],.todo-gantt[data-drag-mode=end][data-v-8f46fbd1] *{cursor:ew-resize!important}
[data-v-8f46fbd1],.todo-gantt-scroll.is-panning[data-v-8f46fbd1] *{-webkit-user-select:none;user-select:none;cursor:grabbing!important}
[data-v-8f46fbd1]::-webkit-scrollbar{width:8px;height:8px}
[data-v-8f46fbd1]::-webkit-scrollbar-track{background:0 0}
[data-v-8f46fbd1]::-webkit-scrollbar-corner{background:0 0}
[data-v-8f46fbd1]::-webkit-scrollbar-thumb{background-color:#1118271a;background-clip:padding-box;border:2px solid #0000;border-radius:999px}
[data-v-8f46fbd1]:hover::-webkit-scrollbar-thumb{background-color:#11182733}
[data-v-8f46fbd1]{background-color:var(--secondary)}
[data-v-8f46fbd1]{background-color:color-mix(in srgb, var(--secondary) 96%, #fff)}
[data-v-8f46fbd1]{background-color:color-mix(in srgb, var(--secondary) 86%, #22c55e)}
[data-v-8f46fbd1]{background-color:#ffffff05}
[data-v-8f46fbd1]{background-color:#22c55e14}
[data-v-8f46fbd1]{background-color:#ffffff05}
[data-v-8f46fbd1]{background-color:#22c55e14}
[data-v-8f46fbd1],.dark .gantt-completed-marker[data-v-8f46fbd1]{box-shadow:0 0 0 2px var(--secondary)}
[data-v-8f46fbd1]::-webkit-scrollbar-thumb{background-color:#ffffff1a}
[data-v-8f46fbd1]:hover::-webkit-scrollbar-thumb{background-color:#fff3}
</style>
