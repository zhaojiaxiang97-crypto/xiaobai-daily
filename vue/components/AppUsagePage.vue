<template>
<div ref="r" :class="`generate-report-theme-scope app-usage-theme-scope p-6`"><div><div><p>{{ i(`appUsage.desc`) }}</p></div><div><button :class="[`px-3 py-1.5 text-xs rounded-md border transition-colors`,j===`today`?`bg-black/[0.06] border-black/10 text-foreground`:`border-black/5 text-[#999] hover:bg-black/[0.03]`]" @click="e=>j=`today`">{{ i(`appUsage.today`) }}</button><button :class="[`px-3 py-1.5 text-xs rounded-md border transition-colors`,j===`week`?`bg-black/[0.06] border-black/10 text-foreground`:`border-black/5 text-[#999] hover:bg-black/[0.03]`]" @click="e=>j=`week`">{{ i(`appUsage.week`) }}</button><button :class="[`px-3 py-1.5 text-xs rounded-md border transition-colors`,j===`month`?`bg-black/[0.06] border-black/10 text-foreground`:`border-black/5 text-[#999] hover:bg-black/[0.03]`]" @click="e=>j=`month`">{{ i(`appUsage.month`) }}</button><button :class="[`px-3 py-1.5 text-xs rounded-md border transition-colors`,j===`custom`?`bg-black/[0.06] border-black/10 text-foreground`:`border-black/5 text-[#999] hover:bg-black/[0.03]`]" @click="e=>j=`custom`">{{ i(`appUsage.custom`) }}</button></div></div><div><component :is="CP" :modelValue="ee" @update:modelvalue="e=>ee=e" :label="i(`generateReport.selectStartDateTime`)" precision="minute" :minute-step="5" value-format="local" align="start" /><span>{{ i(`generateReport.to`) }}</span><component :is="CP" :modelValue="te" @update:modelvalue="e=>te=e" :label="i(`generateReport.selectEndDateTime`)" precision="minute" :minute-step="5" value-format="local" align="start" /><button :class="`px-3 py-1.5 text-xs rounded-md bg-primary text-primary-foreground hover:bg-primary/90`" @click="ie">{{ i(`appUsage.query`) }}</button></div><div><div><div>{{ i(`appUsage.totalApps`) }}</div><div>{{ oe }}</div></div><div><div>{{ i(`appUsage.totalDuration`) }}</div><div>{{ pe(se) }}</div></div><div><div>{{ i(`appUsage.idleDuration`) }}</div><div>{{ pe(h.idleDurationSec) }}</div></div><div><div>{{ i(`appUsage.avgDuration`) }}</div><div>{{ pe(le) }}</div></div><div><div>{{ i(`appUsage.switchCount`) }}</div><div>{{ h.switchCount }}</div></div><div><div>{{ i(`appUsage.longestFocus`) }}</div><div>{{ pe(ce) }}</div></div></div><div><div><div>{{ i(`appUsage.distribution`) }}</div><div><span v-text="D===`switch`?undefined:Xe((openBlock(),createElementBlock(`select`,{key:0,'onUpdate:modelValue':t[6]||=e=>O=e,class:`rounded-md border border-black/10 bg-transparent px-2 py-1 text-xs outline-none`},[createElementVNode(`option`,jTt,toDisplayString(i(`appUsage.activeDuration`)),1),createElementVNode(`option`,MTt,toDisplayString(i(`appUsage.occupiedDuration`)),1)],512)),[[bt,O]])" /><span v-text="Xe(createElementVNode(`select`,{'onUpdate:modelValue':t[7]||=e=>k=e,class:`rounded-md border border-black/10 bg-transparent px-2 py-1 text-xs outline-none`},[t[14]||=createElementVNode(`option`,{value:`10`},`Top 10`,-1),t[15]||=createElementVNode(`option`,{value:`20`},`Top 20`,-1),createElementVNode(`option`,NTt,toDisplayString(i(`appUsage.allApps`)),1)],512),[[bt,k]])" /><div><button :class="[`px-2.5 py-1 text-xs rounded transition-colors`,D===`period`?`bg-black/[0.06] text-foreground`:`text-[#999] hover:bg-black/[0.03]`]" @click="e=>D=`period`">{{ i(`appUsage.periodFlow`) }}</button><button :class="[`px-2.5 py-1 text-xs rounded transition-colors`,D===`switch`?`bg-black/[0.06] text-foreground`:`text-[#999] hover:bg-black/[0.03]`]" @click="e=>D=`switch`">{{ i(`appUsage.switchFlow`) }}</button><button :class="[`px-2.5 py-1 text-xs rounded transition-colors`,D===`bar`?`bg-black/[0.06] text-foreground`:`text-[#999] hover:bg-black/[0.03]`]" @click="e=>D=`bar`">{{ i(`appUsage.barChart`) }}</button><button :class="[`px-2.5 py-1 text-xs rounded transition-colors`,D===`pie`?`bg-black/[0.06] text-foreground`:`text-[#999] hover:bg-black/[0.03]`]" @click="e=>D=`pie`">{{ i(`appUsage.pieChart`) }}</button></div></div></div><div><component :is="zn" :size="18" :class="`animate-spin`" /><span>{{ i(`common.loading`) }}</span></div></div><div><div>{{ i(`appUsage.detailList`) }}</div><div><component :is="zn" :size="18" :class="`animate-spin`" /><span>{{ i(`common.loading`) }}</span></div></div><component :is="ui" :open="v" @update:open="e=>v=e" /><div><div><div>{{ i(`appUsage.sessionTimeline`) }}</div><span v-text="Xe(createElementVNode(`select`,{'onUpdate:modelValue':t[13]||=e=>A=e,class:`rounded-md border border-black/10 bg-transparent px-2 py-1 text-xs outline-none`},[createElementVNode(`option`,SDt,toDisplayString(i(`appUsage.filterAll`)),1),createElementVNode(`option`,CDt,toDisplayString(i(`appUsage.filterActive`)),1),createElementVNode(`option`,wDt,toDisplayString(i(`appUsage.filterIdle`)),1),createElementVNode(`option`,TDt,toDisplayString(i(`appUsage.filterUnknown`)),1),createElementVNode(`option`,EDt,toDisplayString(i(`appUsage.filterExcluded`)),1),createElementVNode(`option`,DDt,toDisplayString(i(`appUsage.filterLocked`)),1),createElementVNode(`option`,ODt,toDisplayString(i(`appUsage.filterSuspended`)),1)],512),[[bt,A]])" /></div><div><component :is="zn" :size="18" :class="`animate-spin`" /><span>{{ i(`common.loading`) }}</span></div><div><button :class="`flex items-center gap-2 rounded-md border border-black/10 px-4 py-1.5 text-xs text-[#666] transition-colors hover:bg-black/[0.03] disabled:cursor-not-allowed disabled:opacity-60`" :disabled="f" @click="ae"><component :is="zn" :size="14" :class="`animate-spin`" />{{ ` `+toDisplayString(f?i(`common.loading`):i(`appUsage.loadMore`)) }}</button></div></div></div>
</template>

<script setup>
import { openBlock, createElementBlock, createElementVNode, toDisplayString } from 'vue';
import md from './BaseSeparator.vue';
import pie from './Sidebar.vue';
import CP from './DateTimePickerField.vue';
import { S_to as to, S_is as is, S_xs as xs, S_px as px, S_jTt as jTt, S_MTt as MTt, S_NTt as NTt, S_SDt as SDt, S_CDt as CDt, S_wDt as wDt, S_TDt as TDt, S_EDt as EDt, S_DDt as DDt, S_ODt as ODt, S_e as e, S_t as t, S_r as r, S_i as i, S_Xe as Xe, S_bt as bt, S_zn as zn, S_ui as ui } from '../shared.js';
const text = defineProps({
      refreshKey: {}
    });
const l = text;
import { ref, computed } from 'vue';

// [setup 还原] 原组件 setup 里初值不依赖 IPC 的声明
let f = ref(false);
let p = ref([]);
let h = ref({
  totalApps: 0,
  activeDurationSec: 0,
  idleDurationSec: 0,
  sessionCount: 0,
  switchCount: 0,
  averageSessionDurationSec: 0,
  longestSessionDurationSec: 0,
  dailyAverageActiveDurationSec: 0
});
let v = ref(false);
let D = ref(`period`);
let O = ref(`active`);
let k = ref(`20`);
let A = ref(`all`);
let j = ref(`today`);
let ee = ref(``);
let te = ref(``);
async function ie() {
  let e = n(),
    t = ++M;
  d.value = true, f.value = false, w.value = null, T.value = false, v.value = false, g.value = null, _.value = null, S.value = null, C.value = {};
  try {
    let n = re(),
      [r, a, o, s] = await Promise.all([Og.summary(n), Og.list({
        ...n,
        limit: 50,
        activityState: A.value === `all` ? undefined : A.value
      }), Og.overview(n), Og.flows(n).catch(err => (console.error(i(`errors.loadDataFailed`), err), {
        periods: [],
        switches: []
      }))]);
    if (t !== M) return;
    p.value = r, E.value = s, j.value === `week` && e(`insight_view_loaded`, {
      panel: `app_usage_week`
    }), m.value = a.items, h.value = o, w.value = a.nextCursor, T.value = a.hasMore;
  } catch (e) {
    if (t !== M) return;
    console.error(i(`errors.loadDataFailed`), e);
  } finally {
    t === M && (d.value = false);
  }
}
async function ae() {
  if (f.value || !T.value || !w.value) return;
  let e = M;
  f.value = true;
  try {
    let t = await Og.list({
      ...re(),
      limit: 50,
      cursor: w.value,
      activityState: A.value === `all` ? undefined : A.value
    });
    if (e !== M) return;
    m.value.push(...t.items), w.value = t.nextCursor, T.value = t.hasMore;
  } catch (t) {
    if (e !== M) return;
    console.error(i(`errors.loadDataFailed`), t);
  } finally {
    e === M && (f.value = false);
  }
}
let oe = computed(() => p.value.length);
let se = computed(() => h.value.activeDurationSec);
let ce = computed(() => h.value.longestSessionDurationSec);
let le = computed(() => h.value.dailyAverageActiveDurationSec);
function pe(e) {
  if (e < 60) return i(`appUsage.seconds`, {
    n: e
  });
  let t = e / 60;
  if (t < 60) return i(`appUsage.minutes`, {
    n: t.toFixed(1)
  });
  let n = t / 60;
  return i(`appUsage.hours`, {
    n: n.toFixed(1)
  });
}
</script>
