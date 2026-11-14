<template>
<div data-v-ca590cef :class="[`group/row grid w-full cursor-pointer grid-cols-[16px_minmax(0,1fr)_24px] items-start gap-2.5 rounded-lg border border-transparent px-2.5 py-2 text-left transition-colors hover:bg-[#f9fafb]`,{'bg-[#f9fafb]':A?.taskId===e.id}]" role="button" tabindex="0" @click="t=>gt(e)" @keydown="xt(withDirectives(t=>gt(e),[`prevent`]),[`enter`])"><button type="button" role="checkbox" :class="[`mt-0.5 flex size-4 items-center justify-center rounded-[4px] border transition-colors disabled:cursor-wait`,av(e.status===`done`)]" :disabled="nt(e.id)" :aria-checked="e.status===`done`" :title="e.status===`done`?r(`todo.floating.markPending`):r(`todo.floating.markDone`)" @click="withDirectives(t=>Jt(e),[`stop`])"><component :is="zn" :size="10" :class="[`animate-spin`,e.status===`done`?`text-white`:`text-[#9ca3af]`]" /></button><span><span :class="[`line-clamp-2 break-words text-sm font-semibold leading-5`,e.status===`done`?`text-[#9ca3af] line-through`:`text-[#111827]`]" :title="e.title">{{ e.title }}</span><span><span :class="[`inline-flex items-center gap-1 py-0.5`,Qe(e)]"><component :is="Ft" :size="13" :stroke-width="1.8" />{{ ` `+toDisplayString(Ze(e)) }}</span><button type="button" :class="[`rounded-md border border-transparent px-2 py-0.5 font-medium transition-colors disabled:cursor-wait`,tv(e.status)]" :disabled="nt(e.id)" @click="withDirectives(t=>dt(`status`,e,t),[`stop`])">{{ ev(o,e.status) }}</button><button type="button" :class="[`inline-flex items-center gap-1 rounded-md border border-transparent px-1 py-0.5 font-medium transition-colors hover:border-[#e5e7eb] hover:bg-white disabled:cursor-wait`,Z_(e.priority)]" :disabled="nt(e.id)" @click="withDirectives(t=>dt(`priority`,e,t),[`stop`])"><component :is="Ar" :size="13" fill="currentColor" :stroke-width="1.6" />{{ ` `+toDisplayString(Q_(o,e.priority))+` ` }}<component :is="un" :size="12" :stroke-width="1.8" /></button><button type="button" :class="[`inline-flex items-center gap-1 rounded-md border border-transparent px-1 py-0.5 font-medium text-[#6b7280] transition-colors hover:border-[#e5e7eb] hover:bg-white`,{'bg-white':x[e.id]}]" :title="r(`todo.detail.subtasks`)" :aria-expanded="!!x[e.id]" @click="withDirectives(t=>ft(e.id),[`stop`])"><component :is="Io" :size="13" :stroke-width="1.8" />{{ ` `+toDisplayString(mt(e))+`/`+toDisplayString(e.subtasks.length)+` ` }}<component :is="un" :size="12" :stroke-width="1.8" :class="[`transition-transform`,{'rotate-180':x[e.id]}]" /></button></span><span :class="`mt-1.5 block space-y-1`" @click="withDirectives(()=>{},[`stop`])"></span></span><button type="button" :class="[`flex size-6 items-center justify-center rounded-md text-[#6b7280] transition-opacity hover:bg-[#f3f4f6] focus-visible:opacity-100 group-hover/row:opacity-100`,A?.taskId===e.id&&A.kind===`more`?`opacity-100`:`opacity-0`]" :aria-label="r(`todo.floating.moreActions`)" @click="withDirectives(t=>dt(`more`,e,t),[`stop`])"><component :is="tn" :size="16" :stroke-width="1.8" /></button></div>
</template>

<script setup>
import { toDisplayString, withDirectives } from 'vue';
import md from './BaseSeparator.vue';
import { ref } from 'vue';

// [setup 还原] 原组件 setup 里初值不依赖 IPC 的声明
let t = {
  status: 112,
  priority: 128,
  more: 148
};
let x = ref({});
let A = ref(null);
function Ze(e) {
  return pv(e, be.value);
}
function Qe(e) {
  return e.status === `done` ? `text-[#9ca3af]` : e.status === `overdue` || $v(e) ? `text-[#ef4444]` : `text-[#16a34a]`;
}
function nt(e) {
  return _.value.includes(e);
}
function dt(e, n, r) {
  if (A.value?.kind === e && A.value.taskId === n.id) {
    lt();
    return;
  }
  let i = r.currentTarget.getBoundingClientRect(),
    a = e === `status` ? Me.value.length : e === `priority` ? Ne.value.length : 2,
    o = t[e],
    s = a * I2t + 10,
    c = i.bottom + 4;
  c + s > window.innerHeight - 8 && (c = i.top - 4 - s), c = Math.max(8, Math.min(c, window.innerHeight - s - 8));
  let l = e === `more` ? i.right - o : i.left,
    u = Math.min(Math.max(8, l), window.innerWidth - o - 8);
  A.value = {
    kind: e,
    taskId: n.id,
    top: c,
    left: u,
    width: o
  };
}
function ft(e) {
  x.value = {
    ...x.value,
    [e]: !x.value[e]
  };
}
function mt(e) {
  return e.subtasks.filter(item => item.done).length;
}
function gt(e) {
  lt(), v.value = e.id, y.value = e;
}
function Jt(e) {
  let t = $v(e) ? `overdue` : `todo`;
  qt(e, e.status === `done` ? t : `done`);
}
import { S_Io as Io, S_is as is, S_sm as sm, S_lg as lg, S_Z_ as Z_, S_Q_ as Q_, S_ev as ev, S_tv as tv, S_av as av, S_px as px, S_e as e, S_r as r, S_o as o, S_y as y, S_w as w, S_xt as xt, S_Ft as Ft, S_tn as tn, S_un as un, S_zn as zn, S_Ar as Ar } from '../shared.js';
</script>

<style>
/* 从原应用 CSS 恢复（data-v-ca590cef） */
[data-v-ca590cef],.todo-floating-window-root[data-v-ca590cef]:focus,.todo-floating-window-root[data-v-ca590cef]:focus-visible{box-shadow:none!important;border:0!important;outline:0!important}
[data-v-ca590cef]{font-variant-numeric:tabular-nums}
[data-v-ca590cef]::-webkit-scrollbar{width:5px}
[data-v-ca590cef]::-webkit-scrollbar-thumb{background:#6b728047;border-radius:999px}
[data-v-ca590cef]{isolation:isolate;transform-origin:50%;width:calc(100% - 24px);height:calc(100% - 24px);margin:12px;transition:opacity .12s,transform .14s ease-out;box-shadow:0 12px 32px -12px #11182738}
[data-v-ca590cef]{width:calc(100% - 8px);height:calc(100% - 8px);box-shadow:none;margin:4px}
[data-v-ca590cef]{clip-path:inset(0 round 16px);border-radius:16px}
[data-v-ca590cef]{width:100%;height:100%;box-shadow:none;margin:0;transition:none}
[data-v-ca590cef]{opacity:0;transform:translateY(4px)scale(.985)}
[data-v-ca590cef],.todo-floating-panel-native-shadow.todo-floating-panel-hidden[data-v-ca590cef]{opacity:1;transform:none}
</style>
