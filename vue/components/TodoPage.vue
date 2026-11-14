<template>
<div data-v-e54dc82c :class="`todo-page todo-theme-scope relative flex h-full min-h-0 flex-col overflow-hidden p-6 px-7`" @click="Go"><div><div><div :class="`relative shrink-0`" @click="withDirectives(()=>{},[`stop`])"><div><button ref="n" type="button" :class="`inline-flex items-center gap-1.5 whitespace-nowrap rounded-l-lg pl-3 pr-2.5 text-xs font-semibold transition-colors hover:bg-[#15803d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#86efac]`" @click="Qo"><component :is="a" :size="15" :stroke-width="2" />{{ ` `+toDisplayString(o(`todo.action.create`)) }}</button><button type="button" :class="[`inline-flex w-7 items-center justify-center rounded-r-lg transition-colors hover:bg-[#15803d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#86efac]`,oe===`create`?`bg-[#15803d]`:``]" :aria-label="o(`todo.action.createMenu`)" :aria-expanded="oe===`create`" aria-haspopup="menu" @click="e=>Zo(`create`)"><component :is="un" :size="14" :stroke-width="2" /></button></div><div><button type="button" role="menuitem" :class="`flex h-9 w-full items-center gap-2 rounded-md px-3 text-left text-sm text-[#111827] transition-colors hover:bg-[#f3f4f6]`" @click="Qo"><component :is="a" :size="15" :stroke-width="1.8" :class="`shrink-0 text-[#6b7280]`" /><span>{{ o(`todo.action.create`) }}</span></button><button type="button" role="menuitem" :class="`flex h-9 w-full items-center gap-2 rounded-md px-3 text-left text-sm text-[#111827] transition-colors hover:bg-[#f3f4f6]`" data-credit-feature="todo_extract" data-credit-action="entry" @click="$o"><component :is="Bn" :size="15" :stroke-width="1.8" :class="`shrink-0 text-[#16a34a]`" /><span>{{ o(`todo.action.extractTimeline`) }}</span></button></div></div><component :is="By" :modelValue="M?.value" @update:modelvalue="e=>M.value=e" :open="ws(`scope`)" @update:open="e=>Es(`scope`,e)" /><component :is="By" :modelValue="te?.value" @update:modelvalue="e=>te.value=e" :open="ws(`status-filter`)" @update:open="e=>Es(`status-filter`,e)" /><div :class="`relative shrink-0`" @click="withDirectives(()=>{},[`stop`])"><button type="button" :class="[`inline-flex h-8 w-[104px] items-center justify-between gap-1 rounded-lg border border-[#e5e7eb] bg-white px-2 text-xs font-medium text-[#111827] outline-none transition-colors hover:border-[#d1d5db] focus:border-[#86efac]`,ae?`border-[#86efac]`:``]" @click="Xo"><span>{{ jr.value.label }}</span><span><component :is="ga" :size="13" :stroke-width="2" :class="`text-[#16a34a]`" /></span></button><div></div></div><div :class="`shrink-0`" @click="withDirectives(()=>{},[`stop`])"><span><button type="button" :class="[`todo-toolbar-optional-action relative inline-flex h-8 items-center justify-center gap-1.5 rounded-lg border bg-white px-2.5 text-xs font-medium transition-colors hover:border-[#d1d5db]`,ve?.value||ii?.value>0?`border-[#86efac] text-[#16a34a]`:`border-[#e5e7eb] text-[#111827]`]" :aria-label="o(`todo.filter.title`)" @click="is"><component :is="nee" :size="14" :stroke-width="1.8" /><span>{{ o(`todo.filter.tooltip`) }}</span><span>{{ ii?.value }}</span></button><span>{{ o(`todo.filter.tooltip`) }}</span></span><div><div><p>{{ o(`todo.filter.title`) }}</p><button :class="`text-xs font-medium text-[#111827] hover:text-[#16a34a]`" @click="as">{{ o(`todo.filter.clear`) }}</button></div><div><span>{{ o(`todo.filter.labelRow`) }}</span><div><button type="button" :class="[`inline-flex h-6 items-center rounded-md border px-2 text-xs font-medium transition-colors`,ti?.value===null?`border-[#86efac] bg-[#f0fdf4] text-[#16a34a]`:`border-[#e5e7eb] bg-white text-[#374151] hover:bg-[#f9fafb]`]" @click="e=>ac(null)">{{ o(`todo.filter.allLabels`) }}</button></div></div><div></div><div><button :class="`h-8 rounded-md border border-[#d1d5db] bg-white px-3 text-sm text-[#111827] transition-colors hover:bg-[#f9fafb]`" @click="cs">{{ o(`todo.filter.addCondition`) }}</button></div></div></div><div><div><component :is="Cs" :size="15" :class="`pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#6b7280]`" /><span v-text="Xe(createElementVNode(`input`,{ref_key:`todoSearchInput`,ref:le,'onUpdate:modelValue':t[14]||=e=>ce=e,type:`text`,role:`searchbox`,'aria-label':o(`todo.searchPlaceholder`),placeholder:o(`todo.searchPlaceholder`),class:`h-8 w-full rounded-lg border border-[#e5e7eb] bg-white pl-9 pr-8 text-xs text-[#111827] outline-none transition-colors placeholder:text-[#9ca3af] hover:border-[#d1d5db] focus:border-[#86efac]`,onKeydown:xt(withDirectives(ue,[`stop`,`prevent`]),[`esc`])},null,40,J_e),[[yt,ce]])" /><button type="button" :class="`absolute right-1 top-1/2 inline-flex size-6 -translate-y-1/2 cursor-pointer items-center justify-center rounded-md text-[#6b7280] transition-colors hover:bg-[#f3f4f6] hover:text-[#111827] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#86efac]`" :aria-label="o(`todo.clearSearch`)" :title="o(`todo.clearSearch`)" @click="withDirectives(ue,[`stop`])"><component :is="Nt" :size="14" aria-hidden="true" /></button></div><div :class="`relative shrink-0`" @click="withDirectives(()=>{},[`stop`])"><span><button type="button" :class="[`todo-view-trigger inline-flex h-8 w-[120px] items-center gap-1.5 rounded-lg border bg-white px-2.5 text-xs font-medium text-[#111827] transition-colors hover:border-[#d1d5db] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#86efac]`,oe===`view`?`border-[#86efac]`:`border-[#e5e7eb]`]" :aria-label="o(`todo.view.switch`)" :aria-expanded="oe===`view`" aria-haspopup="menu" @click="e=>Zo(`view`)"><component :is="Be(Pr[Fr.value.value])" :size="15" :stroke-width="1.8" :class="`shrink-0`" /><span>{{ Fr.value.label }}</span><component :is="un" :size="14" :stroke-width="1.8" :class="`shrink-0 text-[#6b7280]`" /></button><span>{{ Fr.value.label }}</span></span><div></div></div><div :class="`relative`" @click="withDirectives(()=>{},[`stop`])"><span><button type="button" :class="[`inline-flex size-8 items-center justify-center rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#86efac]`,oe===`more`?`bg-[#f3f4f6] text-[#111827]`:`text-[#6b7280] hover:bg-[#f3f4f6] hover:text-[#111827]`]" :aria-label="o(`todo.action.more`)" :aria-expanded="oe===`more`" aria-haspopup="menu" @click="e=>Zo(`more`)"><component :is="tn" :size="17" :stroke-width="1.8" /></button><span></span><span>{{ o(`todo.action.more`) }}</span></span><div><button type="button" role="menuitem" :class="`flex h-9 w-full items-center gap-2 rounded-md px-3 text-left text-sm text-[#111827] transition-colors hover:bg-[#f3f4f6]`" @click="Hc"><component :is="tc" :size="15" :stroke-width="1.8" :class="`shrink-0 text-[#6b7280]`" /><span>{{ o(`todo.friendDialog.button`) }}</span><span>{{ _f>99?`99+`:_f }}</span></button><button type="button" role="menuitemcheckbox" :aria-checked="ie.enabled" :class="`flex h-9 w-full items-center gap-2 rounded-md px-3 text-left text-sm text-[#111827] transition-colors hover:bg-[#f3f4f6]`" @click="es"><component :is="sa" :size="15" :stroke-width="1.8" :class="`shrink-0 text-[#6b7280]`" /><span>{{ o(`todo.floating.entry`) }}</span><component :is="an" :size="15" :stroke-width="2" :class="`shrink-0 text-[#16a34a]`" /></button></div></div></div></div><div><div :class="[`flex h-10 items-center gap-2 rounded-lg border bg-white pl-3 pr-1.5 transition-colors`,Dt?`border-[#86efac]`:`border-[#e5e7eb] hover:border-[#d1d5db]`]"><component :is="zn" :size="15" :stroke-width="1.8" :class="`shrink-0 animate-spin text-[#16a34a]`" /><span v-text="Xe(createElementVNode(`input`,{ref_key:`quickAddInputRef`,ref:kt,'onUpdate:modelValue':t[19]||=e=>St=e,maxlength:X_,disabled:Ot,'aria-label':o(`todo.quickAdd.label`),class:`h-full min-w-0 flex-1 bg-transparent text-sm text-[#111827] outline-none placeholder:text-[#9ca3af] disabled:opacity-60`,placeholder:o(`todo.quickAdd.placeholder`),onFocus:gl,onBlur:t[20]||=e=>Dt=false,onInput:yl,onKeydown:[xt(bl,[`enter`]),t[21]||=xt(withDirectives(e=>vl(true),[`prevent`]),[`esc`])]},null,40,pve),[[yt,St]])" /><button type="button" :class="`inline-flex h-7 shrink-0 items-center gap-1 rounded-md px-2 text-xs font-medium text-[#6b7280] transition-colors hover:bg-[#f3f4f6] hover:text-[#111827]`" :title="o(`todo.quickAdd.expandHint`)" @mousedown="withDirectives(()=>{},[`prevent`])" @click="withDirectives(xl,[`stop`])"><component :is="Ko" :size="13" :stroke-width="1.8" />{{ ` `+toDisplayString(o(`todo.quickAdd.expand`)) }}</button></div><div><span :class="[`inline-flex h-6 items-center gap-1 rounded-md px-1.5`,pl.value.schedule?`bg-[#f0fdf4] text-[#15803d]`:`bg-[#f3f4f6] text-[#6b7280]`]" :title="pl.value.schedule?o(`todo.quickAdd.recognized`,{text:pl.value.scheduleText}):o(`todo.quickAdd.defaultSchedule`)"><component :is="Ft" :size="12" :stroke-width="1.8" :class="`shrink-0`" /><span>{{ tl(ml?.value) }}</span><button type="button" :class="`-mr-0.5 flex size-4 items-center justify-center rounded opacity-70 transition-opacity hover:opacity-100`" :aria-label="o(`todo.quickAdd.ignore`,{text:pl.value.scheduleText})" @mousedown="withDirectives(()=>{},[`prevent`])" @click="e=>_l(`schedule`)"><component :is="Nt" :size="11" :stroke-width="2" /></button></span><span :class="[`inline-flex h-6 max-w-[240px] items-center gap-1 rounded-md px-1.5`,hl.value.length?`bg-[#f0fdf4] text-[#15803d]`:`bg-[#f3f4f6] text-[#6b7280]`]"><component :is="nc" :size="12" :stroke-width="1.8" :class="`shrink-0`" /><span>{{ hl.value.length?Ea(hl?.value):_a(Ir?.value) }}</span><button type="button" :class="`-mr-0.5 flex size-4 shrink-0 items-center justify-center rounded opacity-70 transition-opacity hover:opacity-100`" :aria-label="o(`todo.quickAdd.ignore`,{text:pl.value.peopleText.join(` `)})" @mousedown="withDirectives(()=>{},[`prevent`])" @click="e=>_l(`people`)"><component :is="Nt" :size="11" :stroke-width="2" /></button></span><span><component :is="_o" :size="12" :stroke-width="1.8" :class="`shrink-0`" /><span>{{ pl.value.project }}</span><button type="button" :class="`-mr-0.5 flex size-4 shrink-0 items-center justify-center rounded opacity-70 transition-opacity hover:opacity-100`" :aria-label="o(`todo.quickAdd.ignore`,{text:pl.value.projectText})" @mousedown="withDirectives(()=>{},[`prevent`])" @click="e=>_l(`project`)"><component :is="Nt" :size="11" :stroke-width="2" /></button></span><span><component :is="Ar" :size="12" fill="currentColor" :stroke-width="1.6" :class="[`shrink-0`,nf(pl.value.priority)]" />{{ ` `+toDisplayString(ef(pl.value.priority))+` ` }}<button type="button" :class="`-mr-0.5 flex size-4 shrink-0 items-center justify-center rounded opacity-70 transition-opacity hover:opacity-100`" :aria-label="o(`todo.quickAdd.ignore`,{text:pl.value.priorityText})" @mousedown="withDirectives(()=>{},[`prevent`])" @click="e=>_l(`priority`)"><component :is="Nt" :size="11" :stroke-width="2" /></button></span><span>{{ o(`todo.quickAdd.keyHint`) }}</span></div><p>{{ Tt }}</p></div><component :is="Qe" to="body" /><component :is="Qe" to="body" /></div><div><section :class="[`task-list-scroll h-full min-h-0`,[ne?.value===`gantt`||ne?.value===`calendar`||ne?.value===`matrix`?`flex flex-col overflow-hidden pr-0`:ne?.value===`board`?`board-task-scroll overflow-auto pr-0`:`overflow-y-auto pr-1`,{'is-scrolling':yn}]]" @scroll="pf"><component :is="Mpe" :tasks="ri" :selected-task-id="li?.value?.id??null" :can-manage="ma" :loading="Nn" :truncated="uo" :error="Xn" @select="Bo" @reschedule="Nu" @create="Pu" @rangechange="vo" /><div><button type="button" :class="`inline-flex h-8 items-center justify-center rounded-lg border border-[#e5e7eb] bg-white px-4 font-medium text-[#4b5563] transition-colors hover:border-[#bbf7d0] hover:bg-[#f0fdf4] hover:text-[#16a34a] disabled:cursor-not-allowed disabled:opacity-60`" :disabled="Pn" @click="withDirectives(So,[`stop`])">{{ Pn?o(`todo.loadingMore`):o(`todo.loadMore`) }}</button></div></section><component :is="Qe" to="body" /><component :is="Qe" to="body" /></div></div>
</template>

<script setup>
import { createElementVNode, toDisplayString, withDirectives } from 'vue';
import tl from './CalendarCellTrigger.vue';
import gl from './CheckboxRoot.vue';
import _l from './CheckboxIndicator.vue';
import bl from './MenuRadioGroup.vue';
import xl from './MenuRadioItem.vue';
import md from './BaseSeparator.vue';
import Mpe from './TodoCalendarView.vue';
import By from './Select.vue';

// [兜底] 模板引用但无来源的符号
// [符号说明] n~computed, l~computed
import { S_sa as sa, S_ga as ga, S_to as to, S__o as _o, S_Ko as Ko, S_xs as xs, S_Cs as Cs, S_nee as nee, S_tc as tc, S_nc as nc, S__f as _f, S_sm as sm, S_lg as lg, S_X_ as X_, S_J_e as J_e, S_pve as pve, S_px as px, S_e as e, S_t as t, S_n as n, S_r as r, S_a as a, S_o as o, S_l as l, S_p as p, S_v as v, S_y as y, S_w as w, S_Be as Be, S_Xe as Xe, S_Qe as Qe, S_yt as yt, S_xt as xt, S_Nt as Nt, S_Ft as Ft, S_tn as tn, S_an as an, S_un as un, S_zn as zn, S_Bn as Bn, S_pr as pr, S_mr as mr, S_Ar as Ar, S_Pr as Pr } from '../shared.js';
const jr = { value: undefined };
const ii = { value: undefined };
const Fr = { value: undefined };
const ml = { value: undefined };
const hl = { value: undefined };
const Ir = { value: undefined };
const pl = { value: undefined };
const M = { value: undefined };
const te = { value: undefined };
const ve = { value: undefined };
const ti = { value: undefined };
const ne = { value: undefined };
const li = { value: undefined };
import { ref, computed } from 'vue';

// [setup 还原] 原组件 setup 里初值不依赖 IPC 的声明
let ie = ref({
  enabled: false,
  mode: `ball`,
  lockedOpen: false,
  hoverExpand: true,
  language: `zh-CN`
});
let ae = ref(false);
let oe = ref(null);
let ce = ref(``);
let le = ref(null);
function ue() {
  ce.value = ``, le.value?.focus();
}
let de = ref(null);
let St = ref(``);
let Tt = ref(``);
let Dt = ref(false);
let Ot = ref(false);
let kt = ref(null);
let yn = ref(false);
let Nn = ref(false);
let Pn = ref(false);
let Xn = ref(``);
let gr = ref([]);
function ei(state) {
  return state.field === `label` && state.operator === `is` && !!state.value.trim();
}
let ri = computed(() => gr.value);
function ma(e) {
  return !!(e && (da(e) || fa(e) || pa(e)));
}
function _a(e) {
  let t = oa(e);
  return t ? gv(t, Ve.value) : o(`todo.assigneeDialog.unassigned`);
}
function Ea(e) {
  return e.length <= 2 ? wa(e) : s.value === `en-US` ? `${e.length} people` : `等${e.length}人`;
}
let uo = ref(false);
function vo(e) {
  lo.value = e;
}
function So() {
  yo({
    append: true
  });
}
function Bo(e) {
  kd(), Tc(), Rd(), Vd(), _e.value = null, qt.value = null, Jt.value = null, Ts(), ae.value = false, oe.value = null, ve.value = false, ln.value = null, Oe.value = false, Ne.value = false, Eo(), Mt.value = false, Pt.value = null, de.value = e;
}
function Go() {
  kd(), Wo(), _e.value = null, Ts(), ae.value = false, oe.value = null, ve.value = false, ln.value = null, Ne.value = false, Eo(), Ke.value && Fl(), qt.value = null, Jt.value = null;
}
function Xo() {
  Ts(), ve.value = false, oe.value = null, ln.value = null, ae.value = !ae.value;
}
function Zo(e) {
  let t = oe.value === e ? null : e;
  Fs(), ve.value = false, ln.value = null, oe.value = t;
}
function Qo() {
  oe.value = null, Xc();
}
function $o() {
  oe.value = null, Kd();
}
function es() {
  oe.value = null, gf();
}
function is() {
  Ts(), ae.value = false, oe.value = null, ve.value = !ve.value, ln.value = null;
}
function as() {
  cn.value = [os()], ln.value = null;
}
function cs() {
  cn.value.push(os());
}
function ws(e) {
  return se.value === e;
}
function Es(e, t) {
  if (t) {
    ae.value = false, oe.value = null, ln.value = null, se.value = e;
    return;
  }
  se.value === e && (se.value = null);
}
function ac(e) {
  let t = e !== null && ti.value === e,
    n = cn.value.filter(item => !ei(item));
  if (e === null || t) {
    cn.value = n.length > 0 ? n : [os()];
    return;
  }
  let r = {
      ...os(),
      field: `label`,
      operator: `is`,
      value: e
    },
    i = n.length === 1 && !n[0].value.trim() && n[0].field === `title`;
  cn.value = i ? [r] : [...n, r];
}
function Hc() {
  Fs(), ve.value = false, ae.value = false, We.value = true;
}
function vl(e = false) {
  St.value = ``, Ct.value = [], Tt.value = ``, e && kt.value?.blur();
}
function yl() {
  Tt.value = ``, St.value.trim() || (Ct.value = []);
}
async function Nu(e) {
  let t = gr.value.find(item => item.id === e.taskId);
  if (!t || !ma(t) || !Yy(e)) return;
  let n = qa(t),
    r = qa(t);
  r.startAt = `${e.start.replace(`T`, ` `)}:00`, r.dueDate = e.end.slice(0, 10), r.dueTime = e.end.slice(11, 16), r.group = Xl(r.dueDate), r.status = Zl(r, r.status);
  let i = wu(r);
  to(r), Zn.value = ``;
  try {
    to(await Y_.update(Ga(r))), i && (Qn.value = i), await Co();
  } catch (e) {
    to(n), Zn.value = e instanceof Error ? e.message : o(`todo.error.syncFailed`);
  }
}
function Pu(e) {
  Xc(), Qc(e);
}
function ef(e) {
  return Q_(o, e);
}
function nf(e) {
  return Z_(e);
}
function pf(e) {
  ne.value !== `board` && (yn.value = true, rr && clearTimeout(rr), rr = setTimeout(() => {
    yn.value = false;
  }, 700));
  let currentTarget = e.currentTarget;
  currentTarget && currentTarget.scrollHeight - currentTarget.scrollTop - currentTarget.clientHeight <= 240 && So();
}
</script>

<style>
/* 从原应用 CSS 恢复（data-v-e54dc82c） */
[data-v-e54dc82c]{-webkit-user-select:none;user-select:none;transform-origin:bottom;transition:transform .22s ease-out}
[data-v-e54dc82c]:hover{transform:scale(1.02)}
[data-v-e54dc82c]{align-items:center;gap:8px;min-width:0;height:44px;display:flex}
[data-v-e54dc82c]{object-fit:contain;flex-shrink:0;width:44px;height:44px}
[data-v-e54dc82c]{transition:none}
[data-v-e54dc82c]{background:#fff}
[data-v-e54dc82c]{container-type:inline-size}
[data-v-e54dc82c]{width:178px}
[data-v-e54dc82c]{display:none}
[data-v-e54dc82c]{flex:0 0 32px;gap:0;width:32px;padding-inline:0}
[data-v-e54dc82c]{display:none}
[data-v-e54dc82c]{display:block}
[data-v-e54dc82c]{width:auto}
[data-v-e54dc82c]{width:144px}
[data-v-e54dc82c]{scrollbar-width:none;-ms-overflow-style:none}
[data-v-e54dc82c]::-webkit-scrollbar{width:0;height:0;display:none}
[data-v-e54dc82c]{height:26px;padding:0 3px 0 10px;font-size:12px;font-weight:500;line-height:1.2}
[data-v-e54dc82c]{border-radius:999px;width:20px;height:20px;margin-right:2px}
[data-v-e54dc82c]::-webkit-scrollbar{width:8px;height:8px}
[data-v-e54dc82c]::-webkit-scrollbar{width:8px;height:8px}
[data-v-e54dc82c]::-webkit-scrollbar{width:8px;height:8px}
[data-v-e54dc82c]::-webkit-scrollbar{width:8px;height:8px}
[data-v-e54dc82c]::-webkit-scrollbar{width:8px;height:8px}
[data-v-e54dc82c]:hover::-webkit-scrollbar-thumb{background-color:#11182729!important}
[data-v-e54dc82c]:hover::-webkit-scrollbar-thumb{background-color:#ffffff29!important}
[data-v-e54dc82c]::-webkit-scrollbar-corner{background:0 0}
[data-v-e54dc82c]::-webkit-scrollbar-track{background:0 0}
[data-v-e54dc82c]::-webkit-scrollbar-track{background:0 0}
[data-v-e54dc82c]::-webkit-scrollbar-track{background:0 0}
[data-v-e54dc82c]::-webkit-scrollbar-track{background:0 0}
[data-v-e54dc82c]::-webkit-scrollbar-track{background:0 0}
[data-v-e54dc82c]::-webkit-scrollbar-thumb{background-clip:padding-box;border:2px solid #0000;border-radius:999px;background-color:#0000!important}
[data-v-e54dc82c]:hover::-webkit-scrollbar-thumb{background-clip:padding-box;border:2px solid #0000;border-radius:999px;background-color:#0000!important}
[data-v-e54dc82c]::-webkit-scrollbar-thumb{background-clip:padding-box;border:2px solid #0000;border-radius:999px;background-color:#0000!important}
[data-v-e54dc82c]:hover::-webkit-scrollbar-thumb{background-clip:padding-box;border:2px solid #0000;border-radius:999px;background-color:#0000!important}
[data-v-e54dc82c]::-webkit-scrollbar-thumb{background-color:#1118272e!important}
[data-v-e54dc82c]:hover::-webkit-scrollbar-thumb{background-color:#1118272e!important}
[data-v-e54dc82c]::-webkit-scrollbar-thumb{background-color:#1118272e!important}
[data-v-e54dc82c]:hover::-webkit-scrollbar-thumb{background-color:#1118272e!important}
[data-v-e54dc82c]::-webkit-scrollbar-thumb{background-color:#0000;background-clip:padding-box;border:2px solid #0000;border-radius:999px}
[data-v-e54dc82c]:hover::-webkit-scrollbar-thumb{background-color:#11182729}
[data-v-e54dc82c]::-webkit-scrollbar-thumb{background-color:#11182729;background-clip:padding-box;border:2px solid #0000;border-radius:999px}
[data-v-e54dc82c]::-webkit-scrollbar-thumb{background-color:#0000;background-clip:padding-box;border:2px solid #0000;border-radius:999px}
[data-v-e54dc82c]:hover::-webkit-scrollbar-thumb{background-color:#11182729}
[data-v-e54dc82c]{overflow-wrap:anywhere;white-space:pre-wrap;word-break:break-word;-webkit-user-select:text;user-select:text;max-width:100%}
[data-v-e54dc82c] *{overflow-wrap:anywhere;word-break:break-word;max-width:100%}
[data-v-e54dc82c] pre{white-space:pre-wrap}
[data-v-e54dc82c] ul{padding-left:1.25rem;list-style:outside}
[data-v-e54dc82c] li{margin:.125rem 0}
[data-v-e54dc82c] b,.rich-text-content[data-v-e54dc82c] strong{font-weight:700}
</style>
