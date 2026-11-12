<template>
<component :is="c" :as="props.as" :as-child="props.asChild" :data-state="n.open.value?`open`:`closed`" :style="({'pointer-events':`auto`})" @pointerdown="O(()=>{},[`left`,`self`,`prevent`])" />
</template>

<script setup>
import { unref as p, renderSlot as m, watch as g, createBlock as y, openBlock as x } from 'vue';
import { I as e, N as n, V as a, W as o, j as c } from '../vendor/ui/Switch.js';
import { E as O } from '../vendor/i18n/en-US-player.js';

const props = defineProps({
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
    required: false,
    default: true
  }
});
</script>
