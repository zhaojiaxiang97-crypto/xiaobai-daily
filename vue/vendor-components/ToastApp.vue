<template>
<div :class="`fixed inset-0 p-3`" @mouseenter="t=>toast.hover(true)" @mouseleave="t=>toast.hover(false)"><div><button type="button" :class="`flex min-h-0 flex-1 items-center justify-center bg-zinc-100 px-3 pt-3 dark:bg-zinc-800`" :title="_(`ToastCardEdit`)" @click="t=>toast.action(`edit`)"><img :src="A.value.thumbnail" alt="" draggable="false" :class="`max-h-full max-w-full rounded-md object-contain shadow-sm`" /></button><div><span><span v-text="o(h,{size:14,class:`shrink-0 text-emerald-600`})" /><span>{{ M.value }}</span></span><div><button type="button" :class="`inline-flex h-7 items-center gap-1 rounded-md px-2 text-xs hover:bg-black/[0.06] dark:hover:bg-white/10`" @click="t=>toast.action(`edit`)"><span v-text="o(g,{size:13})" />{{ _(`ToastCardEdit`) }}</button><button type="button" :class="`inline-flex size-7 items-center justify-center rounded-md hover:bg-black/[0.06] dark:hover:bg-white/10`" :title="_(`ToastCardPin`)" @click="t=>toast.action(`pin`)"><span v-text="o(p,{size:13})" /></button><button type="button" :class="`inline-flex size-7 items-center justify-center rounded-md text-zinc-500 hover:bg-black/[0.06] dark:hover:bg-white/10`" :title="_(`ToastCardClose`)" @click="t=>toast.action(`close`)"><span v-text="o(m,{size:13})" /></button></div></div></div></div>
</template>

<script setup>
import { unref as e, createTextVNode as n, createElementBlock as r, openBlock as i, defineComponent as a, onMounted as s, toDisplayString as c, onBeforeMount as l, computed as u, createCommentVNode as d, createElementVNode as f } from 'vue';
import { n as p, t as m } from '../vendor/ui/icons/lucide-icons.js';
import { t as h } from '../vendor/chunks/check.js';
import { t as g } from '../vendor/chunks/pen-line.js';
import { a as _, n as v, t as y } from '../vendor/chunks/screenshotTool.js';

var b = {
  key: 0,
  class: `flex h-full flex-col overflow-hidden rounded-xl border border-black/10 bg-white text-zinc-800 shadow-[0_10px_30px_rgb(0_0_0/0.22)] dark:border-white/10 dark:bg-zinc-900 dark:text-zinc-100`
};
var x = [`title`];
var S = [`src`];
var C = {
  class: `flex h-12 shrink-0 items-center justify-between gap-2 px-3`
};
var w = {
  class: `flex min-w-0 items-center gap-1.5 text-xs font-medium`
};
var T = {
  class: `truncate`
};
var E = {
  class: `flex shrink-0 items-center gap-0.5`
};
var D = [`title`];
var O = [`title`];
let toast = window.screenshotToolAPI.toast,
  A = t(null),
  emptyItems = [],
  M = u(() => A.value?.kind === `saved` ? _(`ToastCardSaved`) : _(`ToastCardCopied`));
</script>
