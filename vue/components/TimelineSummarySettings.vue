<template>
<div><div><label>{{ n(`settings.timelineSummary.title`) }}</label><p><span v-text="s.value?n(`settings.timelineSummary.description`,{count:hV(r)}):n(`settings.timelineSummary.unavailable`)" /></p></div><div><component :is="P" size="sm" variant="outline" :disabled="t.disabled||a" @click="f" /><component :is="Te" id="enable-timeline-summary" :model-value="c.value" :disabled="!s.value||t.disabled||a" aria-describedby="timeline-summary-description" @update:modelvalue="e=>i({enableTimelineSummary:e})" /></div></div>
</template>

<script setup>
// [符号说明] f=useConfigProviderContext
import { S_is as is, S_sm as sm, S_n as n, S_r as r, S_i as i, S_a as a, S_s as s, S_c as c, S_f as f, S_p as p, S_v as v, S_P as P, S_Te as Te } from '../shared.js';
const e = defineProps({
      disabled: {
        type: Boolean
      }
    });
const t = e;
</script>
