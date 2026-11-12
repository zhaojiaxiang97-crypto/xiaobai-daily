<template>
<component :is="fe" :ref="_" :as-child="n.asChild" :as="e.as" :dir="m" :style="at({position:`relative`,'--reka-scroll-area-corner-width':`${counter.value}px`,'--reka-scroll-area-corner-height':`${i.value}px`})" />
</template>

<script setup>
import { S_is as is, S_as as as, S_px as px, S_counter as counter, S_i as i, S_m as m, S__ as _, S_fe as fe, S_at as at } from '../shared.js';
const e = defineProps({
      type: {
        type: String,
        required: false,
        default: `hover`
      },
      dir: {
        type: String,
        required: false
      },
      scrollHideDelay: {
        type: Number,
        required: false,
        default: 600
      },
      asChild: {
        type: Boolean,
        required: false
      },
      as: {
        type: null,
        required: false
      }
    });
const n = e;
</script>
