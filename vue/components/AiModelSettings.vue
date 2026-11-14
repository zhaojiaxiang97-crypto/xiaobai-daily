<template>
<div></div><div :class="`flex flex-col gap-3`" :data-model-purpose="e"><div><div><div><p>{{ b(e) }}</p><component :is="H_" :title="b(e)" :description="i(`settings.modelConfiguration.${e}Hint`)" event-name="settings_view_loaded" panel="model_connection" :disabled="n.disabled" /></div><p><span v-text="i(`settings.modelConfiguration.${e}Hint`)" /></p></div><component :is="By" :model-value="undefined" :disabled="n.disabled||u" @update:modelvalue="t=>O(e,t)" /></div><div><p :class="`min-w-0 truncate text-xs text-muted-foreground`" :title="w(e)">{{ w(e) }}</p><div><component :is="P" size="sm" variant="outline" :disabled="n.disabled||n.testing||u" data-credit-feature="model_diagnosis" data-credit-action="test" @click="t=>r(`test`,e,`manual`)" /><component :is="P" size="sm" variant="outline" :disabled="n.disabled||u" @click="t=>D(e)" /></div></div><component :is="fV" :purpose="e" :open="p[e]" @update:open="t=>p[e]=t" /></div>
</template>

<script setup>
import H_ from './FeatureInfoDialog.vue';
import By from './Select.vue';
import fV from './SubscriptionModelSettings.vue';
// [符号说明] u=useConfigProviderContext
import { S_is as is, S_xs as xs, S_sm as sm, S_t as t, S_r as r, S_i as i, S_u as u, S_v as v, S_P as P } from '../shared.js';
const e = defineProps({
      disabled: {
        type: Boolean
      },
      testing: {
        type: Boolean
      }
    });
const n = e;
import { ref } from 'vue';

// [setup 还原] 原组件 setup 里初值不依赖 IPC 的声明
let p = ref({
  screenshot: false,
  report: false
});
function b(e) {
  return i(`settings.modelConfiguration.${e}`);
}
function w(e) {
  let value = c.value,
    n = x(e);
  return n === "default" ? i(`settings.modelConfiguration.builtinHint`) : n === `webAccount` ? i(`settings.aiModeWebAccount`) : (n === `subscription` ? e === `screenshot` ? value.subscriptionScreenshotModelId : value.subscriptionReportModelId : n === `custom` ? e === `screenshot` ? value.customScreenshotModelName || value.screenshotModelName : value.customReportModelName || value.reportModelName : e === `screenshot` ? value.localScreenshotModelName || value.screenshotModelName : value.localReportModelName || value.reportModelName) || i(`settings.notConfigured`);
}
function D(e) {
  x(e) === `subscription` ? p.value[e] = true : E(e);
}
async function O(e, t) {
  t !== x(e) && (t === `subscription` ? p.value[e] = true : t === `local` ? E(e) : t === "default" && (await l({
    [F_(e)]: `default`,
    ...(e === `screenshot` && c.value.screenshotIntervalSeconds < 120 ? {
      screenshotIntervalSeconds: 120
    } : {})
  })));
}
</script>
