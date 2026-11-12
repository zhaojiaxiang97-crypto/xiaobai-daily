<template>
<button type="button" :disabled="s_0.disabled" :class="e(`flex w-full rounded-[10px] border border-dashed transition-colors disabled:cursor-not-allowed disabled:opacity-60`,w.value,T.value,x_1.class)" @click="e=>S(`select`)" @dragenter="p(e=>C.value=!s_0.disabled,[`prevent`])" @dragover="p(e=>C.value=!s_0.disabled,[`prevent`])" @dragleave="p(e=>C.value=false,[`prevent`])" @drop="p(E,[`prevent`])"><span><slot name="icon" /></span><span :class="[`min-w-0`,s_0.layout===`column`?``:`flex-1`]"><strong>{{ s_0.title }}</strong><small>{{ s_0.hint }}</small></span><em>{{ s_0.note }}</em></button>
</template>

<script setup>
import { normalizeClass as t, unref as n, renderSlot as r, createElementBlock as i, openBlock as o, defineComponent as s, toDisplayString as l, computed as u, createCommentVNode as d, createElementVNode as f } from 'vue';
import { xt as e } from '../vendor/ui/Switch.js';
import { E as p } from '../vendor/i18n/en-US-player.js';
import { Ln as m } from '../vendor/chunks/main.js';

const s_0 = defineProps({
  title: {},
  hint: {},
  note: {},
  layout: {},
  disabled: {
    type: Boolean
  },
  selected: {
    type: Boolean
  },
  class: {
    type: [Boolean, null, String, Object, Array]
  }
});
const x = s_0;
var h = [`disabled`];
var g = {
  class: `inline-flex size-8 shrink-0 items-center justify-center rounded-lg bg-background text-primary`
};
var _ = {
  class: `block truncate text-xs font-semibold text-foreground`
};
var v = {
  key: 0,
  class: `mt-0.5 block text-[11px] leading-snug text-muted-foreground`
};
var y = {
  key: 0,
  class: `text-[10px] not-italic text-muted-foreground`
};
let x_1 = s_0,
  S = b,
  C = a(false),
  w = u(() => x_1.layout === `column` ? `min-h-24 flex-col items-center justify-center gap-1.5 px-4 py-5 text-center` : `min-h-[60px] items-center gap-3 px-3.5 py-3 text-left`),
  T = u(() => C.value ? `border-primary bg-primary/10` : x_1.selected ? `border-primary/40 bg-primary/[0.05] hover:border-primary hover:bg-primary/[0.08]` : `border-primary/35 bg-primary/[0.03] hover:border-primary hover:bg-primary/[0.07]`);
function E(e) {
  C.value = false, !x_1.disabled && S(`drop`, Array.from(e.dataTransfer?.files || []));
}
</script>
