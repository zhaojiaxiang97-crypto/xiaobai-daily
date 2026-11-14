<template>
<div><div><div><p>{{ n(`appLock.enable`) }}</p><component :is="H_" :title="n(`appLock.enable`)" :description="n(`appLock.enableDesc`)" event-name="settings_view_loaded" panel="app_lock" :disabled="!o||a" /><span>{{ n(`appLock.enabled`) }}</span></div><p>{{ n(`appLock.enableDesc`) }}</p></div><div><component :is="P" size="sm" variant="outline" :class="`h-7 gap-1.5 text-xs`" @click="ae" /><component :is="P" size="sm" variant="outline" :class="`h-7 gap-1.5 text-xs`" @click="de" /><component :is="Te" :model-value="i.enabled" :disabled="a||s" @update:modelvalue="N" /></div></div>
</template>

<script setup>
import H_ from './FeatureInfoDialog.vue';
import { ref } from 'vue';

// [setup 还原] 原组件 setup 里初值不依赖 IPC 的声明
let i = ref({
  configured: false,
  enabled: false,
  locked: false,
  retryAfterSeconds: 0,
  recoveryMode: `wordSelection`
});
let a = ref(true);
let o = ref(false);
let s = ref(false);
function N(e) {
  if (e === true) {
    i.value.configured ? re() : ne();
    return;
  }
  O.value = ``, D.value = true;
}
function ae() {
  h.value = `password`, g.value = ``, _.value = ``, v.value = ``, y.value = null, counter.value = 0, x.value = [], S.value = ``, m.value = true;
}
async function de() {
  E.value = false, await fe();
}
// [符号说明] n~computed
import { S_is as is, S_xs as xs, S_sm as sm, S_n as n, S_p as p, S_P as P, S_Te as Te } from '../shared.js';
</script>
