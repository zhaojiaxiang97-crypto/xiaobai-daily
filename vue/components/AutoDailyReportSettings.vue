<template>
<div><div><div><div><p>{{ t(`settings.autoReport.title`) }}</p><component :is="H_" :title="t(`settings.autoReport.title`)" :description="t(`settings.autoReport.desc`)" event-name="settings_view_loaded" panel="report_automation" :disabled="s||!c||!!i" /></div><p>{{ t(`settings.autoReport.desc`) }}</p></div><div><component :is="P" variant="outline" size="sm" :class="`h-7 gap-1 text-xs`" :disabled="s||S?.value" @click="e=>E()" /><component :is="Te" data-credit-feature="report" data-credit-action="enable" :modelValue="u" @update:modelvalue="e=>u=e" :disabled="s" /></div></div><component :is="wt" enter-active-class="transition duration-300 ease-out" enter-from-class="opacity-0 max-h-0 overflow-hidden" enter-to-class="opacity-100 max-h-[1600px] overflow-hidden" leave-active-class="transition duration-200 ease-in" leave-from-class="opacity-100 max-h-[1600px] overflow-hidden" leave-to-class="opacity-0 max-h-0 overflow-hidden" /><component :is="zAe" :open="d" @update:open="e=>d=e" :task="f" :preset="p" :saving="m" @save="O" /><component :is="_i" :open="h" @update:open="e=>h=e" /></div>
</template>

<script setup>
import H_ from './FeatureInfoDialog.vue';
import zAe from './AutoReportTaskDialog.vue';

// [兜底] 模板引用但无来源的符号
import { S_to as to, S_is as is, S_xs as xs, S_sm as sm, S_out as out, S_e as e, S_t as t, S_i as i, S_s as s, S_c as c, S_P as P, S_Te as Te, S_wt as wt, S__i as _i } from '../shared.js';
const S = { value: undefined };
import { ref } from 'vue';

// [setup 还原] 原组件 setup 里初值不依赖 IPC 的声明
let u = ref(false);
let d = ref(false);
let f = ref(null);
let p = ref(null);
let m = ref(false);
let h = ref(false);
function E(e) {
  if (S.value) {
    Ai(t(`settings.autoReport.limitReached`, {
      count: 20
    }));
    return;
  }
  f.value = null, p.value = e ?? null, d.value = true;
}
async function O(e, t) {
  m.value = true;
  try {
    if (!(await T(y.value.some(item => item.id === e.id) ? y.value.map(item => item.id === e.id ? e : item) : [...y.value, e]))) return;
    d.value = false, t && (await te(e));
  } finally {
    m.value = false;
  }
}
</script>
