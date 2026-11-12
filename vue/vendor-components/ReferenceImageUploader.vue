<template>
<article :class="[`grid h-[78px] w-[250px] min-w-0 shrink-0 grid-cols-[48px_minmax(0,1fr)_26px] items-center gap-2 rounded-[10px] border bg-card p_2-[7px]`,row.error?`border-destructive/45`:`border-border`]"><div><component :is="e" :size="24" /><span>{{ o+1 }}</span><span><span v-text="u(y,{size:18,class:`animate-spin`})" /></span></div><div><strong>{{ row.name }}</strong><span>{{ row.error }}</span></div><button type="button" :class="`inline-flex size-[26px] items-center justify-center rounded-[7px] text-muted-foreground transition-colors hover:bg-muted hover:text-destructive`" :aria-label="p_2(`toolboxNative.removeReferenceImage`)" @click="e=>result_1.remove(row.id)"><span v-text="u(_,{size:14})" /></button></article>
</template>

<script setup>
import { normalizeClass as t, unref as n, createElementBlock as r, renderList as i, createBlock as a, Fragment as s, openBlock as c, defineComponent as l, toDisplayString as f, computed as p, createCommentVNode as h, createElementVNode as g } from 'vue';
import { At as e } from '../vendor/ui/Switch.js';
import { t as _ } from '../vendor/ui/icons/lucide-icons.js';
import { t as v } from '../vendor/i18n/i18n-helper.js';
import { _ as y } from '../vendor/chunks/screenshot-beautifier.js';
import { Ht as b } from '../vendor/chunks/main.js';
import { t as x } from '../vendor/pages/ToolDropzone.js';

const l_0 = defineProps({
  items: {},
  error: {},
  maxMb: {},
  addFiles: {
    type: Function
  },
  remove: {
    type: Function
  }
});
const result = l_0;
var S = {
  class: `flex flex-wrap items-stretch gap-2`
};
var C = {
  class: `relative flex size-12 items-center justify-center overflow-hidden rounded-lg bg-muted text-muted-foreground`
};
var w = [`src`, `alt`, `onError`];
var T = {
  class: `absolute left-[3px] top-[3px] inline-flex h-4 min-w-4 items-center justify-center rounded-[5px] bg-slate-900/70 px-1 text-[8px] font-bold text-white`
};
var E = {
  key: 2,
  class: `absolute inset-0 flex items-center justify-center bg-slate-900/50 text-white`
};
var D = {
  class: `min-w-0`
};
var O = {
  class: `block truncate text-[10px] font-semibold`
};
var k = {
  key: 0,
  class: `mt-1 block truncate text-[9px] text-destructive`
};
var A = {
  key: 1,
  class: `mt-1 block truncate text-[9px] text-muted-foreground`
};
var j = [`aria-label`, `onClick`];
var M = {
  key: 0,
  class: `mt-2 text-[11px] text-destructive`
};
let result_1 = l_0,
  {
    t: p_2
  } = v(),
  m_3 = o(null);
</script>
