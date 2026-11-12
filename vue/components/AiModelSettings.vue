<template>
<div></div><div :class="`flex flex-col gap-3`" :data-model-purpose="e"><div><div><div><p>{{ b(e) }}</p><component :is="H_" :title="b(e)" :description="i(`settings.modelConfiguration.${e}Hint`)" event-name="settings_view_loaded" panel="model_connection" :disabled="n.disabled" /></div><p><span v-text="i(`settings.modelConfiguration.${e}Hint`)" /></p></div><component :is="By" :model-value="undefined" :disabled="n.disabled||u" @update:modelvalue="t=>O(e,t)" /></div><div><p :class="`min-w-0 truncate text-xs text-muted-foreground`" :title="w(e)">{{ w(e) }}</p><div><component :is="P" size="sm" variant="outline" :disabled="n.disabled||n.testing||u" data-credit-feature="model_diagnosis" data-credit-action="test" @click="t=>r(`test`,e,`manual`)" /><component :is="P" size="sm" variant="outline" :disabled="n.disabled||u" @click="t=>D(e)" /></div></div><component :is="fV" :purpose="e" :open="p.value[e]" @update:open="t=>p.value[e]=t" /></div>
</template>

<script setup>
import H_ from './FeatureInfoDialog.vue';
import By from './Select.vue';
import fV from './SubscriptionModelSettings.vue';
// [符号说明] u=useConfigProviderContext, D=useConfigProviderContext
import { S_is as is, S_xs as xs, S_sm as sm, S_t as t, S_r as r, S_i as i, S_u as u, S_p as p, S_v as v, S_b as b, S_w as w, S_D as D, S_O as O, S_P as P } from '../shared.js';
const e = defineProps({
      disabled: {
        type: Boolean
      },
      testing: {
        type: Boolean
      }
    });
const n = e;
</script>
