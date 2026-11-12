<template>
<div ref="n_1" :class="`relative h_6-full w-full`"><canvas ref="r_2" :class="`absolute inset-0 block h_6-full w-full`"></canvas></div>
</template>

<script setup>
import { normalizeClass as e, unref as t, createTextVNode as r, createElementBlock as i, watch as o, createBlock as l, openBlock as p, defineComponent as m, onMounted as v, onBeforeMount as b, createElementVNode as w } from 'vue';

let t_0 = e,
  n_1 = u_9(null),
  r_2 = u_9(null),
  payload = null,
  s_3 = 0;
let p_4 = Math.min(l_8 / bitmap.width, u_9 / bitmap.height),
  m_5 = bitmap.width * p_4,
  h_6 = bitmap.height * p_4;
let c_7 = Math.min(window.devicePixelRatio || 1, 2),
  l_8 = Math.round(clientWidth * c_7),
  u_9 = Math.round(clientHeight * c_7);
let bitmap = t_0.bitmap;
let clientWidth = i_10.clientWidth,
  clientHeight = i_10.clientHeight;
let value = r_2.value,
  i_10 = n_1.value;
</script>
