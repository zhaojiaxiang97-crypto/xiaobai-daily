<template>
<div><span v-text="D(We,{size:14,class:`shrink-0 text-muted-foreground`})" /><input ref="o" type="text" :class="`h_3-7 w-44 min-w-0 bg-transparent text-xs text-foreground outline-none placeholder:text-muted-foreground`" :placeholder="a(`toolboxNative.markdownFindPlaceholder`)" :aria-label="a(`toolboxNative.markdownFindPlaceholder`)" @input="l" @compositionstart="e=>f_0(true)" @compositionend="p_1" @blur="e=>f_0(false)" @keydown="m_2" /><span :class="[`min-w-9 shrink-0 text-right text-xs tabular-nums`,props.query&&!props.hasMatches?`text-destructive`:`text-muted-foreground`]">{{ props.summary }}</span><span v-text="D(wt,{size:`xs`,label:a(`toolboxNative.markdownFindPrevious`),shortcut:`⇧Enter`,disabled:!props.hasMatches,onClick:t[2]||=e=>i(`previous`)},{default:y(()=>[D(ge,{size:14})]),_:1},8,[`label`,`disabled`])" /><span v-text="D(wt,{size:`xs`,label:a(`toolboxNative.markdownFindNext`),shortcut:`Enter`,disabled:!props.hasMatches,onClick:t[3]||=e=>i(`next`)},{default:y(()=>[D(he,{size:14})]),_:1},8,[`label`,`disabled`])" /><span v-text="D(wt,{size:`xs`,label:a(`toolboxNative.markdownFindClose`),shortcut:`Esc`,onClick:t[4]||=e=>i(`close`)},{default:y(()=>[D(R,{size:14})]),_:1},8,[`label`])" /></div>
</template>

<script setup>
import { normalizeClass as u, unref as d, renderSlot as p, createTextVNode as h, createElementBlock as g, renderList as _, watch as v, openBlock as T, toDisplayString as A, onBeforeMount as ae, createElementVNode as P } from 'vue';
import { B as e, C as t, T as n, U as r, V as i, at as a, lt as o, xt as c, z as l } from '../vendor/ui/Switch.js';
import { t as R } from '../vendor/ui/icons/lucide-icons.js';
import { t as ue } from '../vendor/i18n/i18n-helper.js';
import { s as he } from '../vendor/ui/PopperContent.js';
import { t as ge } from '../vendor/chunks/chevron-up.js';
import { Sn as We } from '../vendor/chunks/main.js';

const props = defineProps({
  query: {},
  summary: {},
  hasMatches: {
    type: Boolean
  }
});
var Kn = {
  class: `flex items-center gap-1 rounded-lg border border-border bg-popover p-1 pl-2.5 text-popover-foreground shadow-[0_8px_24px_rgb(20_28_23/0.10)] animate-in fade-in-0 slide-in-from-top-1`,
  role: `search`
};
var qn = [`placeholder`, `aria-label`];
function f_0(e) {
  s = e;
}
function p_1() {
  s = false, c();
}
function m_2(e) {
  e.isComposing || e.keyCode === 229 || (e.key === `Enter` ? (e.preventDefault(), e.shiftKey ? i(`previous`) : i(`next`)) : e.key === `Escape` && (e.preventDefault(), e.stopPropagation(), i(`close`)));
}
function h_3() {
  ie(() => {
    o.value?.focus(), o.value?.select();
  });
}
</script>
