<template>
<component :is="$" :ref="l_6" :dir="s_4" data-orientation="horizontal" :style="E({'--reka-slider-thumb-transform':!__11.value&&m_8.thumbAlignment.value===`overflow`?`translateX(50%)`:`translateX(-50%)`})" @slidestart="props=>{let t_13=x_12(props,true);i_1_16(`slideStart`,t_13);}" @slidemove="props=>{let t_13=x_12(props);i_1_16(`slideMove`,t_13);}" @slideend="()=>{g_10.value=undefined,h_9.value=undefined,i_1_16(`slideEnd`);}" @stepkeydown="props=>{let t_13=__11.value?`from-left`:`from-right`,includes=G[t_13].includes(props.key);i_1_16(`stepKeyDown`,props,includes?-1:1);}" @endkeydown="props=>i_1_16(`endKeyDown`,props)" @homekeydown="props=>i_1_16(`homeKeyDown`,props)" />
</template>

<script setup>
import { unref as d, renderSlot as f, createElementBlock as h, renderList as g, createBlock as y, Fragment as x, openBlock as S, computed as k } from 'vue';
// [符号说明] e~shallowRef, t~computed, u~computed
import { $ as e, H as t, bt as i, h as a, j as o, lt as s, xt as c, yt as l, z as u } from '../vendor/ui/Switch.js';

const props = defineProps({
  dir: {
    type: String,
    required: false
  },
  min: {
    type: Number,
    required: true
  },
  max: {
    type: Number,
    required: true
  },
  inverted: {
    type: Boolean,
    required: true
  }
});
function B(e, t_13) {
  return n_14 => {
    if (e[0] === e[1] || t_13[0] === t_13[1]) return t_13[0];
    let r_0_15 = (t_13[1] - t_13[0]) / (e[1] - e[0]);
    return t_13[0] + r_0_15 * (n_14 - e[0]);
  };
}
var G = {
  "from-left": [`Home`, `PageDown`, `ArrowDown`, `ArrowLeft`],
  "from-right": [`Home`, `PageDown`, `ArrowDown`, `ArrowRight`],
  "from-bottom": [`Home`, `PageDown`, `ArrowDown`, `ArrowLeft`],
  "from-top": [`Home`, `PageUp`, `ArrowUp`, `ArrowLeft`]
};
let r_0 = e,
  i_1 = t_13,
  {
    max: a_2,
    min: o_3,
    dir: s_4,
    inverted: c_5
  } = p(r_0),
  {
    forwardRef: l_6,
    currentElement: u_7
  } = n_14(),
  m_8 = X(),
  h_9 = b(),
  g_10 = b(),
  __11 = k(() => s_4?.value !== `rtl` && !c_5.value || s_4?.value !== `ltr` && c_5.value);
function x_12(e, t_13) {
  let n_14 = g_10.value || u_7.value.getBoundingClientRect(),
    r_0_15 = [...m_8.thumbElements.value][m_8.valueIndexToChangeRef.value],
    i_1_16 = m_8.thumbAlignment.value === `contain` ? r_0_15.clientWidth : 0;
  !h_9.value && !t_13 && m_8.thumbAlignment.value === `contain` && (h_9.value = e.clientX - r_0_15.getBoundingClientRect().left);
  let s_4 = B([0, n_14.width - i_1_16], __11.value ? [o_3.value, a_2.value] : [a_2.value, o_3.value]);
  return g_10.value = n_14, s_4(t_13 ? e.clientX - n_14.left - i_1_16 / 2 : e.clientX - n_14.left - (h_9.value ?? 0));
}
let t_13 = __11.value ? `from-left` : `from-right`,
  includes = d(G)[t_13].includes(e.key);
let n_14 = g_10.value || u_7.value.getBoundingClientRect(),
  r_0_15 = [...m_8.thumbElements.value][m_8.valueIndexToChangeRef.value],
  i_1_16 = m_8.thumbAlignment.value === `contain` ? r_0_15.clientWidth : 0;
</script>
