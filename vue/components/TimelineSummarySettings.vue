<template>
<div><div><label>{{ n(`settings.timelineSummary.title`) }}</label><p><span v-text="s?.value?n(`settings.timelineSummary.description`,{count:hV(r)}):n(`settings.timelineSummary.unavailable`)" /></p></div><div><component :is="P" size="sm" variant="outline" :disabled="t.disabled||a" @click="f" /><component :is="Te" id="enable-timeline-summary" :model-value="c?.value" :disabled="!s?.value||t.disabled||a" aria-describedby="timeline-summary-description" @update:modelvalue="e=>i({enableTimelineSummary:e})" /></div></div>
</template>

<script setup>
// [符号说明] n~computed
import { S_is as is, S_sm as sm, S_hV as hV, S_n as n, S_r as r, S_i as i, S_a as a, S_p as p, S_v as v, S_P as P, S_Te as Te } from '../shared.js';
const e = defineProps({
      disabled: {
        type: Boolean
      }
    });
const t = e;

// [兜底] 模板引用但无来源的符号
const s = { value: undefined };
const c = { value: undefined };

// [setup 还原] 原组件 setup 里初值不依赖 IPC 的声明
function f() {
  counter.value = hV(r.value), d.value = ``, l.value = true;
}
</script>
