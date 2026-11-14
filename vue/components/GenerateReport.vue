<template>
<div data-v-deb9e671 ref="n" :class="`generate-report-theme-scope flex flex-col gap-4 p-6 px-7 h-full`"><div><div><h1><component :is="Bn" :size="22" :class="`text-primary`" />{{ ` `+toDisplayString(r(`generateReport.reportConfig`)) }}</h1><p>{{ r(`generateReport.configTip`) }}</p></div><div><component :is="P" variant="outline" size="sm" :class="`relative h-8 text-xs gap-1.5 cursor-pointer`" @click="Ni" /><component :is="P" variant="outline" size="sm" :class="`relative h-8 text-xs gap-1.5 cursor-pointer`" @click="un" /><component :is="P" size="sm" :class="`h-8 text-xs gap-1.5 cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90`" :disabled="mn" data-credit-feature="report" data-credit-action="entry" @click="ki" /></div></div><div><div><section><div><div><p>{{ r(`generateReport.reportType`) }}</p><p>{{ r(`generateReport.reportTypeDesc`) }}</p><div></div></div><div><p>{{ r(`generateReport.dateRange`) }}</p><p>{{ r(`generateReport.dateRangeDesc`) }}</p><div><component :is="P$" :modelValue="p" @update:modelvalue="e=>p=e" :label="r(`generateReport.selectStartDateTime`)" align="start" /><span>{{ r(`generateReport.to`) }}</span><component :is="P$" :modelValue="m" @update:modelvalue="e=>m=e" :label="r(`generateReport.selectEndDateTime`)" end-boundary="" align="end" /></div></div></div></section><section><div><div><div><component :is="uo" :size="13" :class="`text-primary`" /></div><h2>{{ r(`generateReport.selectReportTemplate`) }}</h2></div><div><component :is="P" variant="outline" size="sm" :class="`relative h-7 text-xs gap-1 cursor-pointer`" @click="et" /><component :is="P" variant="outline" size="sm" :class="`h-7 text-xs gap-1 cursor-pointer`" @click="Gt" /><component :is="P" variant="outline" size="sm" :class="`h-7 text-xs gap-1 cursor-pointer`" data-credit-feature="ai_template" data-credit-action="entry" @click="ya" /></div></div><p>{{ r(`generateReport.selectTemplateHint`) }}</p><div><button :class="`flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-black/16 p-4 text-center cursor-pointer hover:border-primary/40 hover:bg-primary/[0.02] transition-colors min-w-[160px] max-w-[220px] flex-1`" @click="Gt"><component :is="a" :size="20" :stroke-width="1.5" :class="`text-[#ccc]`" /><span>{{ r(`generateReport.createTemplate`) }}</span></button></div></section></div><div :class="[`shrink-0 h-full overflow-hidden transition-[width] duration-300 ease-out motion-reduce:transition-none`,Lt?`w-[320px]`:`w-0`]" :aria-hidden="!Lt" :inert="!Lt"><div><div><h3>{{ r(`generateReport.templatePreview`) }}</h3><button :class="`-my-1 w-6 h-6 rounded flex items-center justify-center text-[#999] hover:text-primary hover:bg-primary/10 cursor-pointer`" :title="r(`common.close`)" :aria-label="r(`common.close`)" @click="e=>Lt=false"><component :is="Nt" :size="14" /></button></div><div><div><div><component :is="uo" :size="18" :class="`text-primary`" /></div><div><div><span>{{ It.value.name }}</span><span>{{ It.value.tag }}</span></div><p>{{ toDisplayString(r(`generateReport.dateRange`))+`：`+toDisplayString(H$(p))+` `+toDisplayString(r(`generateReport.to`))+` `+toDisplayString(H$(m,true)) }}</p></div></div><div><div></div></div><p>{{ r(`generateReport.previewAutoGenerateHint`) }}</p></div></div></div></div><component :is="OW" :open="C" @update:open="e=>C=e" /><component :is="gM" :open="N" @update:open="e=>N=e" @balancechanged="Ze" /><component :is="ui" :open="fe" @update:open="e=>fe=e" /><component :is="_i" :open="me" @update:open="e=>me=e" /><component :is="_i" :open="_e" @update:open="e=>_e=e" /><component :is="ui" :open="Vt" @update:open="e=>Vt=e" /><component :is="ui" :open="sn" @update:open="e=>sn=e" /><component :is="Vp" :open="Yr" @update:open="e=>Yr=e" :preferred-name-fallback="Or?.nickname||``" :onboarding="Xr" @saved="Pi" @skipped="Pi" /><component :is="ui" :open="Hr" @update:open="e=>Hr=e" /><component :is="_i" :open="ti" @update:open="e=>ti=e" /><component :is="ui" :open="ni" @update:open="e=>ni=e" /><component :is="M$" :open="ri" @update:open="e=>ri=e" :summary="pn?.factSummary??null" /><component :is="ui" :open="Rt" @update:open="e=>Rt=e" /><component :is="_i" :open="Yt" @update:open="e=>Yt=e" /><component :is="ui" :open="Nn" @update:open="e=>Nn=e" /><component :is="gM" :open="Sn" @update:open="e=>Sn=e" @balancechanged="e=>yn=e" /><component :is="ui" :open="lr" @update:open="e=>lr=e" /><component :is="ui" :open="Gi" @update:open="e=>Gi=e" /><component :is="ui" :open="ea" @update:open="e=>ea=e" /><component :is="gM" :open="ta" @update:open="e=>ta=e" @balancechanged="Sa" /><component :is="ui" :open="Ki" @update:open="e=>Ki=e" /></div>
</template>

<script setup>
import { toDisplayString } from 'vue';
import xl from './MenuRadioItem.vue';
import Vp from './UserProfileDialog.vue';
import gM from './RechargeDialog.vue';
import OW from './Sheet.vue';
import M$ from './ReportGenerationBasisDialog.vue';
import P$ from './ReportDateTimePicker.vue';

// [兜底] 模板引用但无来源的符号
// [符号说明] n~computed
import { S_to as to, S_uo as uo, S_is as is, S_xs as xs, S_sm as sm, S_my as my, S_px as px, S_H$ as H$, S_h1 as h1, S_h2 as h2, S_h3 as h3, S_out as out, S_e as e, S_n as n, S_r as r, S_a as a, S_w as w, S_P as P, S_Nt as Nt, S_pn as pn, S_mn as mn, S_Bn as Bn, S_Or as Or, S_ui as ui, S__i as _i } from '../shared.js';
const It = { value: undefined };
import { ref } from 'vue';

// [setup 还原] 原组件 setup 里初值不依赖 IPC 的声明
let p = ref(``);
let m = ref(``);
let C = ref(false);
let N = ref(false);
let fe = ref(false);
let me = ref(false);
let _e = ref(false);
function Ze(e) {
  yn.value = e, Le.value && (counter.value = e, e >= ae.value && qe());
}
function et() {
  w.value = `browse`, D.value = `all`, O.value = `all`, C.value = true, st();
}
let At = ref([]);
let Lt = ref(false);
let Rt = ref(false);
let Vt = ref(false);
function Gt() {
  Ht.value = {
    id: ``,
    name: ``,
    body: ``,
    customInstruction: ``
  }, Vt.value = true;
}
let Yt = ref(false);
let sn = ref(false);
function un() {
  Kr(`customInstruction`), nn.value = ln() ?? ``, sn.value = true;
}
let yn = ref(0);
let Sn = ref(false);
let Nn = ref(false);
let lr = ref(false);
let Hr = ref(false);
let Yr = ref(false);
let Xr = ref(false);
let ti = ref(false);
let ni = ref(false);
let ri = ref(false);
async function ki() {
  if (!mn.value) {
    trackActionEvent(`report_generate_click`, {
      entry: `generate_report`
    });
    try {
      V$({
        startDate: p.value,
        endDate: m.value
      });
    } catch {
      Ai(r(`generateReport.dateTimeRangeInvalid`));
      return;
    }
    Hr.value = true;
  }
}
function Ni() {
  Kr(`userProfile`), Xr.value = false, Yr.value = true;
}
async function Pi() {
  Xr.value && (Xr.value = false, await Di());
}
let Gi = ref(false);
let Ki = ref(false);
let ea = ref(false);
let ta = ref(false);
function ya() {
  qi.value = {
    referenceReports: ``,
    customRequirements: ``,
    type: l.value
  }, xa();
}
function Sa(e) {
  ia.value = e, yn.value = e;
}
</script>

<style>
/* 从原应用 CSS 恢复（data-v-deb9e671） */
[data-v-deb9e671]{scrollbar-width:none;-ms-overflow-style:none}
[data-v-deb9e671]::-webkit-scrollbar{display:none}
</style>
