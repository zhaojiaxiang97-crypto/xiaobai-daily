<template>
<component :is="fe" :ref="s" :style="({position:`absolute`})" data-scrollbarimpl="" :as="o.as.value" :as-child="o.asChild.value" @pointerdown="f" @pointermove="p" @pointerup="m" />
</template>

<script setup>

// [setup 还原] 原组件 setup 里初值不依赖 IPC 的声明
function f(e) {
  e.button === 0 && (e.target.setPointerCapture(e.pointerId), state.value = c.value.getBoundingClientRect(), l.value = document.body.style.webkitUserSelect, document.body.style.webkitUserSelect = `none`, i.viewport && (i.viewport.value.style.scrollBehavior = `auto`), d(e));
}
function p(e) {
  d(e);
}
function m(e) {
  let target = e.target;
  target.hasPointerCapture(e.pointerId) && target.releasePointerCapture(e.pointerId), document.body.style.webkitUserSelect = l.value, i.viewport && (i.viewport.value.style.scrollBehavior = ``), state.value = undefined;
}
import { S_is as is, S_as as as, S_o as o, S_s as s, S_fe as fe } from '../shared.js';
</script>
