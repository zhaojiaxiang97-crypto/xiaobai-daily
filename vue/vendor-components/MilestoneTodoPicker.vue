<template>
<button type="button" :class="`flex w_6-full items-start gap-2.5 rounded-lg px-2.5 py-2 text-left transition-colors hover:bg-muted`" :aria-pressed="x_4.value.has(e.id)" @click="t=>W(e)"><span :class="[`mt-0.5 grid size-4 shrink-0 place-items-center rounded-[5px] border transition-colors`,x_4.value.has(e.id)?`border-primary bg-primary text-primary-foreground`:`border-muted-foreground/40`]"><component :is="L" :size="11" /></span><span><span :class="[`block text-sm leading-snug`,e.status===`done`?`text-muted-foreground line-through`:`text-foreground`]">{{ e.title }}</span><span>{{ z(e) }}</span></span></button>
</template>

<script setup>
import { normalizeClass as a, unref as o, createTextVNode as l, createElementBlock as u, renderList as d, watch as f, createBlock as h, Fragment as _, openBlock as v, defineComponent as y, onMounted as S, toDisplayString as C, onBeforeMount as E, computed as D, createCommentVNode as k, createElementVNode as A } from 'vue';
import { Dt as e, Ot as t } from '../vendor/ui/Switch.js';
import { C as te } from '../vendor/i18n/en-US-player.js';
import { t as ne } from '../vendor/ui/icons/lucide-icons.js';
import { t as L } from '../vendor/chunks/check.js';
import { t as R } from '../vendor/chunks/chevron-up.js';
import { _ as re, v as z } from '../vendor/chunks/screenshot-beautifier.js';
import { t as B } from '../vendor/chunks/flag.js';
import { n as V, t as H } from '../vendor/ui/DropdownMenuItem.js';
import { t as ie } from '../vendor/pages/ToolboxWorkspaceHeader.js';
import { n as U, r as W, t as ae } from '../vendor/ui/DropdownMenuTrigger.js';
import { a as oe, i as se, n as G, r as ce, t as le } from '../vendor/chunks/dialog.js';
import { Sn as Ne, Vt as Q, _t as Ie, bt as Le, gn as Be, vn as Ke, vt as qe, xt as Ye, yt as Xe } from '../vendor/chunks/main.js';
import { t as $ } from '../vendor/pages/ToolDropzone.js';

var Nt = {
  class: `flex items-center gap-2 px-4 pt-3`
};
var Pt = {
  class: `flex h-8 min-w-0 flex-1 items-center gap-2 rounded-lg border border-input bg-transparent px-2.5 text-muted-foreground focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50 dark:bg-input/30`
};
var Ft = [`placeholder`];
var It = [`aria-label`];
var Lt = {
  key: 0,
  class: `mx-4 mt-2.5 flex items-center gap-2 rounded-lg bg-destructive/5 px-2.5 py-2 text-xs text-destructive`
};
var Rt = {
  class: `min-w-0 flex-1`
};
var zt = [`aria-pressed`, `onClick`];
var Bt = {
  class: `min-w-0 flex-1`
};
var Vt = {
  class: `mt-0.5 block truncate text-xs text-muted-foreground`
};
var Ht = {
  key: 0,
  class: `flex items-center justify-center gap-1.5 py-6 text-xs text-muted-foreground`
};
var Ut = {
  key: 1,
  class: `py-10 text-center text-xs text-muted-foreground`
};
var Wt = {
  class: `text-xs text-muted-foreground`
};
var Gt = {
  class: `flex items-center gap-2`
};
let n_0 = event,
  i_1 = c(event, `open`),
  s_2 = t,
  {
    t: y_3
  } = ee(),
  x_4 = g(new Map()),
  S_5 = g([]),
  w_6 = g(false),
  T_7 = g(``),
  E_8 = g(``),
  O_9 = g(``),
  j_10 = g(`open`),
  M_11 = g(1),
  N_12 = g(false),
  P_13 = 0,
  F_14 = null,
  I_15 = D(() => [{
    value: `open`,
    label: y_3(`milestoneTool.todoPicker.filters.open`)
  }, {
    value: `in_progress`,
    label: y_3(`milestoneTool.todoPicker.filters.inProgress`)
  }, {
    value: `done`,
    label: y_3(`milestoneTool.todoPicker.filters.done`)
  }, {
    value: `archived`,
    label: y_3(`milestoneTool.todoPicker.filters.archived`)
  }, {
    value: `all`,
    label: y_3(`milestoneTool.todoPicker.filters.all`)
  }]);
</script>
