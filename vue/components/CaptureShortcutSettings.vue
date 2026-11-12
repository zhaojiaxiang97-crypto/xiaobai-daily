<template>
<div><div><p>{{ n(`settings.captureShortcutTitle`) }}</p><p>{{ n(`settings.captureShortcutDesc`) }}</p></div><component :is="P" size="sm" variant="outline" :class="`h-7 shrink-0 text-xs`" :disabled="event.disabled||s.value" @click="_" /></div>
</template>

<script setup>
// [符号说明] n~computed
import { S_is as is, S_xs as xs, S_sm as sm, S_n as n, S_s as s, S_p as p, S__ as _, S_P as P } from '../shared.js';
const event = defineProps({
      disabled: {
        type: Boolean
      }
    });
const t = event;
</script>
