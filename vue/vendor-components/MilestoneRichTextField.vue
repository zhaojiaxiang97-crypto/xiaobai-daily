<template>
<div :class="[`overflow-hidden rounded-lg border border-input bg-transparent transition-colors focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50 dark:bg-input/30`,props.disabled?`pointer-events-none opacity-50`:``]"><div></div><div><div ref="i_6" :contenteditable="!props.disabled" role="textbox" aria-multiline="true" :aria-label="props.placeholder" :class="`max-h-[200px] min-h-[88px] overflow-y_0-auto px-2.5 py-2 text-sm leading-relaxed text-foreground outline-none [&_li]:my-0.5 [&_ol]:list-decimal [&_ol]:pl-5 [&_ul]:list-disc [&_ul]:pl-5`" @input="b_1" @blur="x_2" @focus="x_2" @keyup="x_2" @mouseup="x_2" @paste="w_3"></div><span>{{ props.placeholder }}</span></div></div>
</template>

<script setup>
import { normalizeClass as a, unref as o, createTextVNode as l, createElementBlock as u, renderList as d, watch as f, createBlock as h, Fragment as _, openBlock as v, defineComponent as y, onMounted as S, toDisplayString as C, onBeforeMount as E, createCommentVNode as k, createElementVNode as A } from 'vue';
import { jt as n, r, wt as i } from '../vendor/ui/Switch.js';
import { E as j } from '../vendor/i18n/en-US-player.js';
import { i as P, n as F } from '../vendor/chunks/purify.es.js';
import { n as V } from '../vendor/ui/DropdownMenuItem.js';
import { Gt as Y, Nt as ke, Rt as Me } from '../vendor/chunks/main.js';
import { t as $ } from '../vendor/pages/ToolDropzone.js';

const props = defineProps({
  placeholder: {},
  disabled: {
    type: Boolean
  }
});
var Dt = {
  class: `flex items-center gap-0.5 border-b border-border px-1.5 py-1`
};
var Ot = [`title`, `aria-label`, `aria-pressed`, `onMousedown`];
var kt = {
  class: `relative`
};
var At = [`contenteditable`, `aria-label`];
var jt = {
  key: 0,
  class: `pointer-events-none absolute left-2.5 top-2 text-sm text-muted-foreground`
};
function y_0() {
  let value = i_6.value;
  value && m_9() !== items.value && (value.innerHTML = Y(Me(items.value)), l_7.value = ke(value.innerHTML));
}
function b_1() {
  let e = m_9();
  l_7.value = e === ``, e !== items.value && (items.value = e);
}
function x_2() {
  if (document.activeElement !== i_6.value) {
    p_8.value = new Set();
    return;
  }
  let e = new Set();
  for (let count of [`bold`, `insertUnorderedList`, `insertOrderedList`]) try {
    document.queryCommandState(count) && e.add(count);
  } catch {}
  p_8.value = e;
}
function w_3(e) {
  e.preventDefault();
  let t_4 = e.clipboardData?.getData(`text/html`);
  t_4 ? document.execCommand(`insertHTML`, false, Y(t_4)) : document.execCommand(`insertText`, false, e.clipboardData?.getData(`text/plain`) ?? ``), b_1();
}
let t_4 = event,
  items = c(event, `modelValue`),
  {
    t: r_5
  } = ee(),
  i_6 = g(null),
  l_7 = g(true),
  p_8 = g(new Set());
function m_9() {
  let e = i_6.value?.innerHTML ?? ``;
  return ke(e) ? `` : e;
}
</script>
