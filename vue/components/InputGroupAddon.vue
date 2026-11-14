<template>
<div role="group" data-slot="input-group-addon" :data-align="t.align" :class="je(bFt({align:t.align}),t.class)" @click="n"><slot /></div>
</template>

<script setup>
import { S_bFt as bFt, S_je as je } from '../shared.js';
const event = defineProps({
      align: {
        default: `inline-start`
      },
      class: {
        type: [Boolean, null, String, Object, Array]
      }
    });
const t = event;

// [setup 还原] 原组件 setup 里初值不依赖 IPC 的声明
function n(e) {
  let currentTarget = e.currentTarget,
    target = e.target;
  target && target.closest(`button`) || currentTarget && currentTarget?.parentElement && currentTarget.parentElement?.querySelector(`input`)?.focus();
}
</script>
