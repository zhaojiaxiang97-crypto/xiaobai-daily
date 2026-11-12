<template>
<button type="button" :class="[`flex h-7 items-center justify-between gap-1 rounded-md px-2 text-left text-xs transition-colors hover:bg-black/[0.04]`,O_3.value===e?`font-medium text-[#111]`:`text-[#666]`]" @click="t=>F(e)">{{ k(i(`heatMap.rangePresets.${e}`))+` ` }}<component :is="re" :size="13" :class="`shrink-0 text-primary`" /></button>
</template>

<script setup>
import { normalizeClass as u, unref as d, renderSlot as p, createTextVNode as h, createElementBlock as g, renderList as _, watch as y, createBlock as x, Fragment as C, openBlock as w, defineComponent as T, toDisplayString as k, onBeforeMount as ee, computed as M, createCommentVNode as N, createElementVNode as P } from 'vue';
// [符号说明] t~computed, l~computed
import { A as e, B as t, j as i, lt as a, yt as c, z as l } from '../vendor/ui/Switch.js';
import { T as te } from '../vendor/i18n/en-US-player.js';
import { r as F } from '../vendor/ui/icons/lucide-icons.js';
import { t as re } from '../vendor/chunks/check.js';
import { s as ie } from '../vendor/ui/PopperContent.js';
import { D as I, O as R, T as z, n as W, r as G, t as K, x as pe } from '../vendor/ui/PopoverTrigger.js';

var Z = F(`calendar-days`, [[`path`, {
  d: `M8 2v4`,
  key: `1cmpym`
}], [`path`, {
  d: `M16 2v4`,
  key: `4m81vk`
}], [`rect`, {
  width: `18`,
  height: `18`,
  x: `3`,
  y: `4`,
  rx: `2`,
  key: `1hopcy`
}], [`path`, {
  d: `M3 10h18`,
  key: `8toen8`
}], [`path`, {
  d: `M8 14h.01`,
  key: `6423bh`
}], [`path`, {
  d: `M12 14h.01`,
  key: `1etili`
}], [`path`, {
  d: `M16 14h.01`,
  key: `1gbofw`
}], [`path`, {
  d: `M8 18h.01`,
  key: `lrp35t`
}], [`path`, {
  d: `M12 18h.01`,
  key: `mhygvu`
}], [`path`, {
  d: `M16 18h.01`,
  key: `kzsmim`
}]]);
var qe = [`today`, `last7`, `last14`, `last30`, `thisMonth`, `lastMonth`];
function $(e) {
  return `${e.getFullYear()}-${String(e.getMonth() + 1).padStart(2, `0`)}-${String(e.getDate()).padStart(2, `0`)}`;
}
function Ye(e, t = new Date()) {
  let n = $(t);
  if (e === `thisMonth`) return {
    start: $(new Date(t.getFullYear(), t.getMonth(), 1)),
    end: n
  };
  if (e === `lastMonth`) return {
    start: $(new Date(t.getFullYear(), t.getMonth() - 1, 1)),
    end: $(new Date(t.getFullYear(), t.getMonth(), 0))
  };
  let r = e === `today` ? 1 : e === `last7` ? 7 : e === `last14` ? 14 : 30;
  return {
    start: $(new Date(t.getFullYear(), t.getMonth(), t.getDate() - r + 1)),
    end: n
  };
}
function Xe(e, t) {
  return qe.find(item => {
    let r = Ye(item);
    return r.start === e && r.end === t;
  }) ?? null;
}
var Ze = [`aria-label`, `title`];
var Qe = {
  key: 0
};
var $e = {
  class: `flex gap-2.5`
};
var et = {
  class: `flex w-[104px] shrink-0 flex-col gap-0.5 border-r border-black/5 pr-2.5`
};
var tt = [`onClick`];
var nt = {
  class: `flex flex-col`
};
var rt = {
  class: `px-1 pt-1 text-[11px] leading-tight text-[#aaa]`
};
let m_0 = e => `${e.year}-${String(e.month).padStart(2, `0`)}-${String(e.day).padStart(2, `0`)}`,
  v_1 = R(I()),
  T_2 = f({
    start: undefined,
    end: undefined
  }),
  O_3 = M(() => Xe(n.start, n.end));
</script>
