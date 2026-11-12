<template>
<div><div><p>{{ t(`settings.networkProxy.title`) }}</p><p>{{ t(`settings.networkProxy.desc`) }}</p><p :class="`truncate text-xs text-muted-foreground`" :title="v.value">{{ v.value }}</p><p :class="`truncate text-xs text-muted-foreground`" :title="y.value">{{ y.value }}</p></div><div><component :is="P" size="sm" variant="outline" :class="`h-7 text-xs`" :disabled="event.disabled||a||c.value" @click="e=>m()" /><component :is="Te" :model-value="n.networkProxyEnabled" :disabled="event.disabled||a||c.value" :aria-label="t(`settings.networkProxy.enable`)" @update:modelvalue="_" /></div></div>
</template>

<script setup>
// [符号说明] n~computed
import { S_is as is, S_xs as xs, S_sm as sm, S_e as e, S_t as t, S_n as n, S_a as a, S_c as c, S_p as p, S_m as m, S__ as _, S_v as v, S_y as y, S_P as P, S_Te as Te } from '../shared.js';
const event = defineProps({
      disabled: {
        type: Boolean
      }
    });
</script>
