<template>
<component :is="fe" :ref="o" :data-state="r.hasThumb?`visible`:`hidden`" :style="({width:`var(--reka-scroll-area-thumb-width)`,height:`var(--reka-scroll-area-thumb-height)`})" :as-child="t.asChild" :as="e.as" @pointerdown="i" @pointerup="a" />
</template>

<script setup>
import { S_is as is, S_as as as, S_state as state, S_e as e, S_r as r, S_i as i, S_a as a, S_o as o, S_fe as fe } from '../shared.js';
const event = defineProps({
      asChild: {
        type: Boolean,
        required: false
      },
      as: {
        type: null,
        required: false
      }
    });
const t = event;
</script>
