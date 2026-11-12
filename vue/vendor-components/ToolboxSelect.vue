<template>
<component :is="x" :value="r.value" :disabled="r.disabled" :class="[T.value,r.description?`flex-col items-start gap-0.5 py-1.5`:`py-1.5`]" />
</template>

<script setup>
import { normalizeClass as e, unref as t, createTextVNode as i, createElementBlock as a, renderList as o, createBlock as c, Fragment as l, openBlock as u, toDisplayString as p, computed as h, createElementVNode as g } from 'vue';
import { _t as _, bt as v, vt as y, xt as b, yt as x } from '../vendor/chunks/main.js';

var S = {
  class: `text-[11px] font-normal text-muted-foreground`
};
let m_0 = options,
  C = r(options, `modelValue`),
  w = h(() => m_0.compact ? `w-full data-[size=default]:h-7 text-xs text-muted-foreground` : m_0.comfortable ? `w-full data-[size=default]:h-9 text-sm` : `w-full data-[size=default]:h-9 text-xs font-medium`),
  T = h(() => m_0.comfortable ? `text-sm` : `text-xs`);
</script>
