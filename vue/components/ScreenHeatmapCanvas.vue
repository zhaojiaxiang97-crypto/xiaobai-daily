<template>
<div ref="a" :class="`w-full min-w-0`"><canvas ref="o" :class="`block cursor-crosshair`" role="img" :aria-label="event.label" :style="at({width:`${f.value.width}px`,height:`${f.value.height}px`})" @pointermove="_" @pointerleave="v"></canvas></div>
</template>

<script setup>
import { S_px as px, S_a as a, S_o as o, S_f as f, S__ as _, S_v as v, S_w as w, S_at as at } from '../shared.js';
const event = defineProps({
      displays: {},
      grids: {},
      theme: {},
      labels: {},
      markers: {},
      label: {}
    });
const r = event;
</script>
