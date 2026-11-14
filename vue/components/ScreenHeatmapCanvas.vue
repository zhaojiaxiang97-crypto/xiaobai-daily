<template>
<div ref="a" :class="`w-full min-w-0`"><canvas ref="o" :class="`block cursor-crosshair`" role="img" :aria-label="event.label" :style="at({width:`${f.value.width}px`,height:`${f.value.height}px`})" @pointermove="_" @pointerleave="v"></canvas></div>
</template>

<script setup>
import { S_px as px, S_a as a, S_o as o, S_w as w, S_at as at } from '../shared.js';
const event = defineProps({
      displays: {},
      grids: {},
      theme: {},
      labels: {},
      markers: {},
      label: {}
    });
const r = event;

// [兜底] 模板引用但无来源的符号
const f = { value: undefined };

// [setup 还原] 原组件 setup 里初值不依赖 IPC 的声明
function _(e) {
  let value = o.value;
  if (!value) return;
  let n = value.getBoundingClientRect(),
    r = iyt(f.value, e.clientX - n.left, e.clientY - n.top);
  c.value = r, i(`hover`, r ? {
    ...r,
    clientX: e.clientX,
    clientY: e.clientY
  } : null);
}
function v() {
  c.value = null, i(`hover`, null);
}
</script>
