<template>
<div data-v-0a4d4bbf ref="n" :class="`generate-report-theme-scope history-theme-scope flex flex-col gap-5 p-6 px-7`"><div><div><button type="button" :class="[`inline-flex items-center gap-1.5 rounded-md px-4 py-1.5 font-medium transition-colors`,Te===`mine`?`bg-white text-(--foreground) shadow-sm dark:bg-background`:`text-[#999] hover:text-(--foreground)`]" @click="e=>Te=`mine`">{{ r(`reportCc.segmentMine`) }}</button><button type="button" :class="[`inline-flex items-center gap-1.5 rounded-md px-4 py-1.5 font-medium transition-colors`,Te===`sent`?`bg-white text-(--foreground) shadow-sm dark:bg-background`:`text-[#999] hover:text-(--foreground)`]" @click="e=>Te=`sent`">{{ toDisplayString(r(`reportCc.segmentSent`))+` ` }}<span :class="`size-1.5 rounded-full bg-red-500`" :title="r(`reportCc.newActivity`)"></span></button><button type="button" :class="[`inline-flex items-center gap-1.5 rounded-md px-4 py-1.5 font-medium transition-colors`,Te===`received`?`bg-white text-(--foreground) shadow-sm dark:bg-background`:`text-[#999] hover:text-(--foreground)`]" @click="e=>Te=`received`">{{ toDisplayString(r(`reportCc.segmentReceived`))+` ` }}<span>{{ Oe?.value>99?`99+`:Oe?.value }}</span></button></div><p>{{ Te===`mine`?r(`history.desc`):Te===`sent`?r(`reportCc.sentDesc`):r(`reportCc.receivedDesc`) }}</p></div><section><div><component :is="cw" /><div><div><component :is="Cs" :size="13" :class="`absolute left-2.5 top-1/2 -translate-y-1/2 text-[#bbb]`" /><component :is="Lp" :modelValue="E" @update:modelvalue="e=>E=e" :placeholder="r(`history.searchPlaceholder`)" :class="`h-7 w-[180px] pl-8 text-xs`" /></div><component :is="P" size="icon-sm" variant="ghost" :title="r(`common.refresh`)" :disabled="d" @click="wn" /></div></div><div><div><span>{{ r(`history.date`) }}</span><component :is="cw" /><component :is="P" size="sm" variant="ghost" :class="`h-7 gap-1 text-xs text-[#999]`" @click="ne" /></div><div><component :is="CP" :modelValue="O" @update:modelvalue="e=>O=e" :label="r(`common.selectStartDate`)" mode="date" align="end" /><span>{{ r(`generateReport.to`) }}</span><component :is="CP" :modelValue="k" @update:modelvalue="e=>k=e" :label="r(`common.selectEndDate`)" mode="date" align="end" /></div></div></section><section><div><div><component :is="uo" :size="14" :stroke-width="1.5" :class="`text-[#999]`" /><h2>{{ r(`history.reportList`) }}</h2><component :is="zn" :size="12" :class="`text-blue-500 animate-spin`" /></div><span><span v-text="r(`history.totalCount`,{n:u})" /></span></div><div>{{ r(`history.loadingReports`) }}</div></section><component :is="OW" :open="xe" @update:open="e=>xe=e" /><component :is="M$" :open="Se" @update:open="e=>Se=e" :summary="Ce?.factSummary??null" /><component :is="ui" :open="Et" @update:open="e=>Et=e" /><component :is="_i" :open="vt" @update:open="e=>vt=e" /><component :is="_i" :open="mt" @update:open="e=>mt=e" /><component :is="v5" :open="Me" @update:open="e=>Me=e" :report-id="Ne.id" :title="Ne.title" @changed="Ve" /></div>
</template>

<script setup>
import { toDisplayString } from 'vue';
import md from './BaseSeparator.vue';
import cw from './ButtonGroup.vue';
import CP from './DateTimePickerField.vue';
import OW from './Sheet.vue';
import M$ from './ReportGenerationBasisDialog.vue';
import v5 from './ReportCcShareDialog.vue';
// [符号说明] n~computed, u=useConfigProviderContext
import { S_to as to, S_uo as uo, S_is as is, S_xs as xs, S_Cs as Cs, S_sm as sm, S_px as px, S_h2 as h2, S_e as e, S_n as n, S_r as r, S_u as u, S_d as d, S_p as p, S_v as v, S_y as y, S_w as w, S_P as P, S_zn as zn, S_ui as ui, S__i as _i } from '../shared.js';
const items = defineProps({
      refreshKey: {}
    });

// [兜底] 模板引用但无来源的符号
const Oe = { value: undefined };
const Lp = { value: undefined };
import { ref } from 'vue';

// [setup 还原] 原组件 setup 里初值不依赖 IPC 的声明
let E = ref(``);
let O = ref(``);
let k = ref(``);
function ne() {
  O.value = ``, k.value = ``, A.value = null;
}
let xe = ref(false);
let Se = ref(false);
let Ce = ref(null);
let Te = ref(`mine`);
let Me = ref(false);
let Ne = ref(null);
function Ve(e) {
  let t = Ne.value?.id;
  if (!t) return;
  let n = je.value[t],
    r = {
      ...je.value
    };
  e.docId && e.recipients.length ? r[t] = {
    docId: e.docId,
    recipientCount: e.recipients.length,
    readCount: e.recipients.filter(item => item.readAt).length,
    likeCount: n?.likeCount ?? 0,
    commentCount: n?.commentCount ?? 0,
    newActivity: n?.newActivity ?? false
  } : delete r[t], je.value = r;
}
let mt = ref(false);
let vt = ref(false);
let Et = ref(false);
async function wn() {
  Cn.value = true;
  let e = Date.now();
  try {
    await Promise.all([f(ce()), De()]), await Ie();
  } finally {
    let t = 500 - (Date.now() - e);
    t > 0 && (await new Promise(e => setTimeout(e, t))), Cn.value = false;
  }
}
</script>

<style>
/* 从原应用 CSS 恢复（data-v-0a4d4bbf） */
[data-v-0a4d4bbf]{container:history-report/inline-size}
[data-v-0a4d4bbf]{padding-right:52px}
[data-v-0a4d4bbf]{padding-right:136px}
[data-v-0a4d4bbf]{pointer-events:none;width:64px;height:64px;display:block;position:absolute;top:16px;right:56px}
[data-v-0a4d4bbf]{padding-right:52px}
[data-v-0a4d4bbf]{display:none}
</style>
