<template>
<div ref="a" :class="`w-full min-w-0`"><canvas ref="o" :class="[`block`,{'cursor-pointer':event.selectable&&c.value!==null}]" role="img" :aria-label="event.label" :style="at({width:`${f.value.width}px`,height:`${f.value.height}px`})" @pointermove="g" @pointerleave="_" @click="v"></canvas></div>
</template>

<script setup>
import { S_px as px, S_a as a, S_o as o, S_c as c, S_f as f, S_g as g, S__ as _, S_v as v, S_w as w, S_at as at } from '../shared.js';
const event = defineProps({
      result: {},
      colors: {},
      theme: {},
      label: {},
      layout: {
        default: `strip`
      },
      compact: {
        type: Boolean,
        default: false
      },
      highlight: {
        default: null
      },
      dayLabels: {
        default: undefined
      },
      emphasizedDay: {
        default: null
      },
      monthMarks: {
        default: undefined
      },
      centerTitle: {
        default: undefined
      },
      centerSubtitle: {
        default: undefined
      },
      nowMinute: {
        default: null
      },
      bucketRange: {
        default: null
      },
      selectable: {
        type: Boolean,
        default: false
      }
    });
const r = event;
</script>
