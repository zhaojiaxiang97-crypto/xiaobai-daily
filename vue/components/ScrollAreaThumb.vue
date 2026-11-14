<template>
<component :is="fe" :ref="o" :data-state="r.hasThumb?`visible`:`hidden`" :style="({width:`var(--reka-scroll-area-thumb-width)`,height:`var(--reka-scroll-area-thumb-height)`})" :as-child="t.asChild" :as="e.as" @pointerdown="i" @pointerup="a" />
</template>

<script setup>
import { S_is as is, S_as as as, S_state as state, S_e as e, S_r as r, S_o as o, S_fe as fe } from '../shared.js';
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

// [setup 还原] 原组件 setup 里初值不依赖 IPC 的声明
function i(e) {
  let boundingClientRect = e.target.getBoundingClientRect(),
    n = e.clientX - boundingClientRect.left,
    i = e.clientY - boundingClientRect.top;
  r.handleThumbDown(e, {
    x: n,
    y: i
  });
}
function a(e) {
  r.handleThumbUp(e);
}
</script>
