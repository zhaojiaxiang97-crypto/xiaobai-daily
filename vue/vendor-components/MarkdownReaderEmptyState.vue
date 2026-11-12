<template>
<div><div><img :src="o.value" alt="" :class="`mb-3 size-[120px] object-contain`" draggable="false" @error="props=>o.value=G" /><h2>{{ i(`toolboxNative.markdownEmptyTitle`) }}</h2><p>{{ i(`toolboxNative.markdownReaderWelcome`) }}</p><div><span v-text="D(s,{size:`sm`,class:`gap-1.5 text-xs`,onClick:t[1]||=props=>r(`open`)},{default:y(()=>[D(ce,{size:14}),h(A(i(`toolboxNative.markdownOpenFile`)),1)]),_:1})" /><span v-text="D(s,{size:`sm`,variant:`outline`,class:`gap-1.5 text-xs`,onClick:t[2]||=props=>r(`create`)},{default:y(()=>[D(pt,{size:14}),h(A(i(`toolboxNative.createMarkdownDocument`)),1)]),_:1})" /></div><p><span v-text="i(`toolboxNative.markdownEmptyHint`,{open:`${props.modifierLabel}O`,create:`${props.modifierLabel}N`})" /></p></div></div>
</template>

<script setup>
import { h, normalizeClass as u, unref as d, renderSlot as p, createElementBlock as g, renderList as _, watch as v, openBlock as T, onUnmounted as O, toDisplayString as A, onBeforeMount as ae, createCommentVNode as N, createElementVNode as P } from 'vue';
// [符号说明] e~computed, a~computed
import { B as e, C as t, T as n, U as r, V as i, at as a, lt as o, r as s } from '../vendor/ui/Switch.js';
import { l as ce, t as ue } from '../vendor/i18n/i18n-helper.js';
import { t as Re } from '../vendor/chunks/useAuth.js';
import { g as G, mt as et } from '../vendor/chunks/main.js';

const props = defineProps({
  modifierLabel: {}
});
var pt = L(`file-plus-corner`, [[`path`, {
  d: `M11.35 22H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v5.35`,
  key: `17jvcc`
}], [`path`, {
  d: `M14 2v5a1 1 0 0 0 1 1h5`,
  key: `wfsgrz`
}], [`path`, {
  d: `M14 19h6`,
  key: `bvotb8`
}], [`path`, {
  d: `M17 16v6`,
  key: `18yu1i`
}]]);
var Rn = {
  class: `flex flex-1 items-center justify-center overflow-y-auto p-8`
};
var zn = {
  class: `flex max-w-[480px] flex-col items-center text-center`
};
var Bn = [`src`];
var Vn = {
  class: `text-sm font-medium text-foreground`
};
var Hn = {
  class: `mt-1 text-xs leading-relaxed text-muted-foreground`
};
var Un = {
  class: `mt-5 flex flex-wrap justify-center gap-2`
};
var Wn = {
  class: `mt-4 text-xs text-muted-foreground/80`
};
</script>
