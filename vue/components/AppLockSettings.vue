<template>
<div><div><div><p>{{ n(`appLock.enable`) }}</p><component :is="H_" :title="n(`appLock.enable`)" :description="n(`appLock.enableDesc`)" event-name="settings_view_loaded" panel="app_lock" :disabled="!o.value||a.value" /><span>{{ n(`appLock.enabled`) }}</span></div><p>{{ n(`appLock.enableDesc`) }}</p></div><div><component :is="P" size="sm" variant="outline" :class="`h-7 gap-1.5 text-xs`" @click="ae" /><component :is="P" size="sm" variant="outline" :class="`h-7 gap-1.5 text-xs`" @click="de" /><component :is="Te" :model-value="i.value.enabled" :disabled="a.value||s.value" @update:modelvalue="N" /></div></div>
</template>

<script setup>
import H_ from './FeatureInfoDialog.vue';
// [符号说明] n~computed, de~shallowRef
import { S_is as is, S_xs as xs, S_sm as sm, S_n as n, S_i as i, S_a as a, S_o as o, S_s as s, S_p as p, S_N as N, S_ae as ae, S_de as de, S_P as P, S_Te as Te } from '../shared.js';
</script>
