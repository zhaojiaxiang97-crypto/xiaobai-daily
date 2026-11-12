<template>
<component :is="F" />
</template>

<script setup>
import { unref as d, renderSlot as f, createElementBlock as h, renderList as g, createBlock as y, Fragment as x, openBlock as S, defineComponent as C, onUnmounted as T, onBeforeMount as O, computed as k, createCommentVNode as A } from 'vue';
import { H as t, yt as l, z as u } from '../vendor/ui/Switch.js';
import { n as j, r as ee, t as M } from '../vendor/ui/Collection.js';

function N(event = [], t, n_18) {
  let el = [...event];
  return el[n_18] = t, el.sort((left, right) => left - right);
}
function I(e, t) {
  if (e.length === 1) return 0;
  let n_18 = e.map(item => Math.abs(item - t)),
    r_14 = Math.min(...n_18);
  return n_18.indexOf(r_14);
}
function R(e) {
  return e.slice(0, -1).map((item, n_18) => e[n_18 + 1] - item);
}
function z(e, t) {
  if (t > 0) {
    let n_18 = R_13(e);
    return Math.min(...n_18) >= t;
  }
  return true;
}
function V(e) {
  return (String(e).split(`.`)[1] || ``).length;
}
function H(e, t) {
  let n_18 = 10 ** t;
  return Math.round(e * n_18) / n_18;
}
var U = [`PageUp`, `PageDown`];
var W = [`ArrowUp`, `ArrowDown`, `ArrowLeft`, `ArrowRight`];
let s_0 = e,
  c_1 = o_16,
  {
    min: l_2,
    max: u_3,
    step: h_4,
    minStepsBetweenThumbs: g_5,
    orientation: x_6,
    disabled: C_7,
    thumbAlignment: w_8,
    dir: T_9
  } = p(s_0),
  E_10 = ee(T_9),
  {
    forwardRef: O_11,
    currentElement: j_12
  } = n_18(),
  P = t(j_12),
  {
    CollectionSlot: F
  } = M({
    isProvider: true
  }),
  L = r_14(s_0, `modelValue`, c_1, {
    defaultValue: s_0.defaultValue,
    passive: s_0.modelValue === undefined
  }),
  R_13 = k(() => Array.isArray(L.value) ? [...L.value] : []),
  B = b(0),
  G = b(R_13.value);
let r_14 = V(h_4.value),
  a_15 = H(Math.round((e - l_2.value) / h_4.value) * h_4.value + l_2.value, r_14),
  o_16 = i_19(a_15, l_2.value, u_3.value),
  s_0_17 = N(R_13.value, o_16, t);
let n_18 = d(U).includes(e.key) || e.shiftKey && d(W).includes(e.key) ? 10 : 1,
  value = B.value,
  i_19 = R_13.value[value];
</script>
