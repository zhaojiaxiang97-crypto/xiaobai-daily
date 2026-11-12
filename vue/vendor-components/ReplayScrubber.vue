<template>
<div ref="a_3" :class="`min-w-0 cursor-pointer touch-none`" role="slider" :aria-label="event.label" aria-valuemin="0" :aria-valuemax="1440" :aria-valuenow="Math.round(event.minute)" @pointerdown="l_5" @pointermove="d_6" @pointerup="f_7" @pointercancel="f_7"><span v-text="h(_e,{compact:``,result:event.street,colors:event.colors,theme:event.theme,'now-minute':event.minute,'bucket-range':s_4.value,label:event.label},null,8,[`result`,`colors`,`theme`,`now-minute`,`bucket-range`,`label`])" /></div>
</template>

<script setup>
import { h, normalizeClass as e, unref as t, createTextVNode as r, createElementBlock as i, renderList as a, createBlock as l, Fragment as d, openBlock as p, computed as x, createElementVNode as w } from 'vue';
import { en as _e } from '../vendor/chunks/main.js';

const event = defineProps({
  street: {},
  colors: {},
  theme: {},
  minute: {},
  startMinute: {},
  endMinute: {},
  label: {}
});
const n_0 = event;
var it = [`aria-label`, `aria-valuenow`];
let n_0_1 = event,
  r_2 = t_9,
  a_3 = u(null),
  options = u(false),
  s_4 = x(() => ({
    start: n_0_1.startMinute / 5,
    end: n_0_1.endMinute / 5
  }));
function l_5(e) {
  e.button === 0 && (options.value = true, e.currentTarget.setPointerCapture(e.pointerId), r_2(`scrub-start`), r_2(`seek`, c_8(e)));
}
function d_6(e) {
  options.value && r_2(`seek`, c_8(e));
}
function f_7(e) {
  options.value && (options.value = false, e.currentTarget.releasePointerCapture(e.pointerId), r_2(`scrub-end`));
}
function c_8(e) {
  let t_9 = a_3.value?.getBoundingClientRect();
  if (!t_9 || t_9.width <= 0) return n_0.minute;
  let r_2 = Math.min(1, Math.max(0, (e.clientX - t_9.left) / t_9.width));
  return n_0.startMinute + r_2 * (n_0.endMinute - n_0.startMinute);
}
let t_9 = a_3.value?.getBoundingClientRect();
</script>
