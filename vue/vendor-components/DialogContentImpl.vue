<template>
<component :is="r" as-child="" loop="" :trapped="props.trapFocus" :present="props.present" @mountautofocus="e=>o(`openAutoFocus`,e)" @unmountautofocus="e=>o(`closeAutoFocus`,e)" />
</template>

<script setup>
import { unref as p, renderSlot as m, createBlock as y, openBlock as x, onBeforeMount as T } from 'vue';
// [符号说明] e=useConfigProviderContext, o=useConfigProviderContext
import { I as e, L as t, N as n, O as r, U as i, V as a, W as o, j as c, k as l, vt as u, w as d, yt as f } from '../vendor/ui/Switch.js';

const props = defineProps({
  forceMount: {
    type: Boolean,
    required: false
  },
  trapFocus: {
    type: Boolean,
    required: false
  },
  disableOutsidePointerEvents: {
    type: Boolean,
    required: false
  },
  asChild: {
    type: Boolean,
    required: false
  },
  as: {
    type: null,
    required: false
  },
  present: {
    type: Boolean,
    required: false
  }
});
</script>
