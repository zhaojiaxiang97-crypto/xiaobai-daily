<template>
<div><div><p>{{ t(`settings.networkProxy.title`) }}</p><p>{{ t(`settings.networkProxy.desc`) }}</p><p :class="`truncate text-xs text-muted-foreground`" :title="v?.value">{{ v?.value }}</p><p :class="`truncate text-xs text-muted-foreground`" :title="y?.value">{{ y?.value }}</p></div><div><component :is="P" size="sm" variant="outline" :class="`h-7 text-xs`" :disabled="event.disabled||a||c" @click="e=>m()" /><component :is="Te" :model-value="n.networkProxyEnabled" :disabled="event.disabled||a||c" :aria-label="t(`settings.networkProxy.enable`)" @update:modelvalue="_" /></div></div>
</template>

<script setup>
// [符号说明] n~computed
import { S_is as is, S_xs as xs, S_sm as sm, S_e as e, S_t as t, S_n as n, S_a as a, S_p as p, S_P as P, S_Te as Te } from '../shared.js';
const event = defineProps({
      disabled: {
        type: Boolean
      }
    });

// [兜底] 模板引用但无来源的符号
const v = { value: undefined };
const y = { value: undefined };
import { ref } from 'vue';

// [setup 还原] 原组件 setup 里初值不依赖 IPC 的声明
let c = ref(false);
function m(e = n.value.networkProxyEnabled) {
  f.value = {
    enabled: e,
    mode: n.value.networkProxyMode,
    url: n.value.networkProxyUrl,
    username: n.value.networkProxyUsername,
    password: n.value.networkProxyPassword
  }, l.value = ``, u.value = ``, s.value = true;
}
async function _(e) {
  if (e && !g()) {
    m(true);
    return;
  }
  await r({
    networkProxyEnabled: e
  });
}
</script>
