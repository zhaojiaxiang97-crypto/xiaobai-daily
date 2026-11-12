<template>
<component :is="$" :ref="l_6" data-orientation="vertical" :style="E({'--reka-slider-thumb-transform':!g_10.value&&c_5.thumbAlignment.value===`overflow`?`translateY(-50%)`:`translateY(50%)`})" @slidestart="props=>{let t_12=__11(props,true);i_1_15(`slideStart`,t_12);}" @slidemove="props=>{let t_12=__11(props);i_1_15(`slideMove`,t_12);}" @slideend="()=>{h_9.value=undefined,m_8.value=undefined,i_1_15(`slideEnd`);}" @stepkeydown="props=>{let t_12=g_10.value?`from-bottom`:`from-top`,includesResult=G[t_12].includes(props.key);i_1_15(`stepKeyDown`,props,includesResult?-1:1);}" @endkeydown="props=>i_1_15(`endKeyDown`,props)" @homekeydown="props=>i_1_15(`homeKeyDown`,props)" />
</template>

<script setup>
import { unref as d, renderSlot as f, createElementBlock as h, renderList as g, createBlock as y, openBlock as S, computed as k } from 'vue';
// [符号说明] e~shallowRef, t~computed, u~computed
import { $ as e, H as t, bt as i, h as a, j as o, xt as c, yt as l, z as u } from '../vendor/ui/Switch.js';

const props = defineProps({
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
function B(e, t_12) {
  return n_13 => {
    if (e[0] === e[1] || t_12[0] === t_12[1]) return t_12[0];
    let r_0_14 = (t_12[1] - t_12[0]) / (e[1] - e[0]);
    return t_12[0] + r_0_14 * (n_13 - e[0]);
  };
}
var G = {
  "from-left": [`Home`, `PageDown`, `ArrowDown`, `ArrowLeft`],
  "from-right": [`Home`, `PageDown`, `ArrowDown`, `ArrowRight`],
  "from-bottom": [`Home`, `PageDown`, `ArrowDown`, `ArrowLeft`],
  "from-top": [`Home`, `PageUp`, `ArrowUp`, `ArrowLeft`]
};
let r_0 = e,
  i_1 = t_12,
  {
    max: a_2,
    min: o_3,
    inverted: s_4
  } = p(r_0),
  c_5 = X(),
  {
    forwardRef: l_6,
    currentElement: u_7
  } = n_13(),
  m_8 = b(),
  h_9 = b(),
  g_10 = k(() => !s_4.value);
function __11(e, t_12) {
  let n_13 = h_9.value || u_7.value.getBoundingClientRect(),
    r_0_14 = [...c_5.thumbElements.value][c_5.valueIndexToChangeRef.value],
    i_1_15 = c_5.thumbAlignment.value === `contain` ? r_0_14.clientHeight : 0;
  !m_8.value && !t_12 && c_5.thumbAlignment.value === `contain` && (m_8.value = e.clientY - r_0_14.getBoundingClientRect().top);
  let s_4 = B([0, n_13.height - i_1_15], g_10.value ? [a_2.value, o_3.value] : [o_3.value, a_2.value]),
    l_6 = t_12 ? e.clientY - n_13.top - i_1_15 / 2 : e.clientY - n_13.top - (m_8.value ?? 0);
  return h_9.value = n_13, s_4(l_6);
}
let t_12 = g_10.value ? `from-bottom` : `from-top`,
  includesResult = d(G)[t_12].includes(e.key);
let n_13 = h_9.value || u_7.value.getBoundingClientRect(),
  r_0_14 = [...c_5.thumbElements.value][c_5.valueIndexToChangeRef.value],
  i_1_15 = c_5.thumbAlignment.value === `contain` ? r_0_14.clientHeight : 0;
</script>
