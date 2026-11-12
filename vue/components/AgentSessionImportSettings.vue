<template>
<div><div><div><p>{{ n(`settings.agentSessionImport.title`) }}</p><component :is="Pp" variant="outline" :class="`border-amber-200 bg-amber-50 px-1.5 py-0 text-[11px] font-normal text-amber-700`" /></div><p><span v-text="_.value?n(`settings.agentSessionImport.descriptionEnabled`,{minutes:i.agentSessionImportIntervalMinutes,count:v.value}):n(`settings.agentSessionImport.descriptionDisabled`)" /></p><p>{{ n(`settings.agentSessionImport.experimentalNote`) }}</p></div><div><component :is="P" size="sm" variant="outline" :class="`h-7 text-xs`" :disabled="t.disabled" @click="E" /><component :is="Te" :model-value="_.value" :disabled="t.disabled||o" @update:modelvalue="w" /></div></div>
</template>

<script setup>
import Pp from './Badge.vue';
// [符号说明] n~computed
import { S_is as is, S_xs as xs, S_sm as sm, S_px as px, S_n as n, S_i as i, S_o as o, S_p as p, S__ as _, S_v as v, S_w as w, S_E as E, S_P as P, S_Te as Te } from '../shared.js';
const e = defineProps({
      disabled: {
        type: Boolean
      }
    });
const t = e;
</script>
