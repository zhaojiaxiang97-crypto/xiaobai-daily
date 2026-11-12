<template>
<div :class="`fixed inset-0 cursor-move`" :style="o({padding:`${_}px`})" @pointerdown="D" @pointermove="O" @pointerup="k" @pointercancel="k" @wheel="A" @dblclick="e_0=>closable.close()" @contextmenu="M"><div :class="[`relative h-full w-full overflow-hidden rounded-[3px] transition-shadow`,b.value?`shadow-[0_6px_20px_rgb(0_0_0/0.32),0_0_0_1.5px_rgb(16_185_129/0.9)]`:`shadow-[0_6px_18px_rgb(0_0_0/0.26),0_0_0_1px_rgb(0_0_0/0.1)]`]"><img :src="y.value" alt="" draggable="false" :class="`pointer-events-none block h-full w-full select-none`" @load="E" /><span>{{ x.value }}</span></div></div>
</template>

<script setup>
import { normalizeClass as e, unref as t, createElementBlock as n, openBlock as i, defineComponent as a, onMounted as s, toDisplayString as c, onBeforeMount as u, createCommentVNode as d, createElementVNode as f } from 'vue';
import { n as p, t as m } from '../vendor/chunks/screenshotTool.js';

var h = [`src`];
var g = {
  key: 1,
  class: `pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/70 px-2.5 py-1 text-xs font-medium tabular-nums text-white`
};
var _ = 14;
let closable = window.screenshotToolAPI.pin,
  y = r(``),
  b = r(document.hasFocus()),
  x = r(``),
  S = false,
  C = null,
  emptyItems = [];
function E() {
  requestAnimationFrame(() => requestAnimationFrame(() => closable.painted()));
}
function D(event) {
  event.button === 0 && (S = true, event.currentTarget.setPointerCapture(event.pointerId), closable.dragStart({
    screenX: event.screenX,
    screenY: event.screenY
  }));
}
function O(e_0) {
  S && closable.dragMove({
    screenX: e_0.screenX,
    screenY: e_0.screenY
  });
}
function k() {
  S && (S = false, closable.dragEnd());
}
function A(event) {
  event.preventDefault(), event.deltaY !== 0 && closable.zoom({
    direction: event.deltaY < 0 ? 1 : -1,
    x: event.clientX,
    y: event.clientY
  });
}
function M(event) {
  event.preventDefault(), closable.menu();
}
let e_0;
</script>
