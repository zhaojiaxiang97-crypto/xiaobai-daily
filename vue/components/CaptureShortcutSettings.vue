<template>
<div><div><p>{{ n(`settings.captureShortcutTitle`) }}</p><p>{{ n(`settings.captureShortcutDesc`) }}</p></div><component :is="P" size="sm" variant="outline" :class="`h-7 shrink-0 text-xs`" :disabled="event.disabled||s" @click="_" /></div>
</template>

<script setup>
// [符号说明] n~computed
import { S_is as is, S_xs as xs, S_sm as sm, S_n as n, S_p as p, S_P as P } from '../shared.js';
const event = defineProps({
      disabled: {
        type: Boolean
      }
    });
const t = event;
import { ref } from 'vue';

// [setup 还原] 原组件 setup 里初值不依赖 IPC 的声明
let s = ref(false);
async function _() {
  if (!(t.disabled || s.value)) {
    s.value = true;
    try {
      await Er.setCaptureShortcutEditing(true), u.value = r.value.captureShortcut, l.value = r.value.enableCaptureShortcut, d.value = ``, b(), o.value = true;
    } catch (e) {
      Ai(e instanceof Error ? e.message : String(e));
    } finally {
      s.value = false;
    }
  }
}
</script>
