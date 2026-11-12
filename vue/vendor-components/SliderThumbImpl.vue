<template>
<component :is="l" />
</template>

<script setup>
import { unref as d, renderSlot as f, createElementBlock as h, renderList as g, createBlock as y, openBlock as S, onUnmounted as T, onBeforeMount as O, computed as k } from 'vue';
import { H as t, V as n, j as o, lt as s, xt as c, yt as l } from '../vendor/ui/Switch.js';
import { n as j, t as M } from '../vendor/ui/Collection.js';

function P(e, t, n) {
  let r = 100 / (n - t) * (e - t);
  return i(r, 0, 100);
}
function F(e, t) {
  if (t > 2) return `Value ${e + 1} of ${t}`;
  if (t === 2) return [`Minimum`, `Maximum`][e];
}
function L(e, t, n) {
  let r = e / 2;
  return (r - B([0, 50], [0, r])(t) * n) * n;
}
function B(e, t) {
  return n => {
    if (e[0] === e[1] || t[0] === t[1]) return t[0];
    let r = (t[1] - t[0]) / (e[1] - e[0]);
    return t[0] + r * (n - e[0]);
  };
}
</script>
