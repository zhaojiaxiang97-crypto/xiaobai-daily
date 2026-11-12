<template>
<header><div><button type="button" :class="`inline-flex size-7 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-[background-color,color,transform] hover:bg-muted hover:text-foreground active:scale-[0.96]`" :aria-label="R(`toolboxNative.backToToolbox`)" :title="R(`toolboxNative.backToToolbox`)" @click="e=>L(`back`)"><span v-text="c(b,{size:18})" /></button><slot name="title" /></div><div><slot name="actions" /><button type="button" :class="B" :aria-label="R(`toolboxNative.whiteboardOpen`)" :title="R(`toolboxNative.whiteboardOpen`)" @click="e=>L(`whiteboardOpen`)"><span v-text="c(g,{size:15})" /><span>{{ R(`toolboxNative.whiteboardOpenShort`) }}</span></button><button type="button" :class="B" :aria-label="R(`toolboxNative.whiteboardSave`)" :title="R(`toolboxNative.whiteboardSave`)" @click="e=>L(`whiteboardSave`)"><span v-text="c(v,{size:15})" /><span>{{ R(`toolboxNative.whiteboardSaveShort`) }}</span></button><button type="button" :class="B" :aria-label="R(`toolboxNative.whiteboardSaveAs`)" :title="R(`toolboxNative.whiteboardSaveAs`)" @click="e=>L(`whiteboardSaveAs`)"><span v-text="c(x,{size:15})" /><span>{{ R(`toolboxNative.whiteboardSaveAsShort`) }}</span></button><button type="button" :class="B" :aria-label="R(`toolboxNative.myVoiceLibrary`)" :title="R(`toolboxNative.myVoiceLibrary`)" @click="e=>L(`voiceLibrary`)"><span v-text="c(h,{size:15})" /><span>{{ R(`toolboxNative.myVoiceLibrary`) }}</span></button><button type="button" :class="B" :aria-label="R(`toolboxNative.voiceActivity`)" :title="R(`toolboxNative.voiceActivity`)" @click="e=>L(`voiceActivity`)"><span v-text="c(m,{size:15})" /><span>{{ R(`toolboxNative.voiceActivity`) }}</span></button><button type="button" :class="V" :title="`${R(`toolboxNative.balance`)} ${s_0.creditsBalance.toLocaleString()}`" @click="e=>L(`recharge`)"><span v-text="c(_,{size:15})" /><span>{{ R(`toolboxNative.balance`) }}</span><strong>{{ s_0.creditsBalance.toLocaleString() }}</strong><span v-text="c(e,{size:13})" /></button></div></header>
</template>

<script setup>
import { normalizeClass as t, unref as n, renderSlot as r, createElementBlock as i, Fragment as a, openBlock as o, defineComponent as s, toDisplayString as l, computed as u, createCommentVNode as d, createElementVNode as f } from 'vue';
import { Dt as e } from '../vendor/ui/Switch.js';
import { r as p } from '../vendor/ui/icons/lucide-icons.js';
import { c as m, d as h, l as g, o as _, s as v, t as y, u as b } from '../vendor/i18n/i18n-helper.js';

const s_0 = defineProps({
  tool: {},
  user: {},
  creditsBalance: {},
  voiceTool: {
    type: Boolean
  },
  localTool: {
    type: Boolean,
    default: false
  },
  showBalance: {
    type: Boolean,
    default: true
  },
  showHistory: {
    type: Boolean,
    default: true
  },
  historyLabel: {},
  whiteboardTool: {
    type: Boolean,
    default: false
  }
});
const I = s_0;
var x = p(`save-all`, [[`path`, {
  d: `M10 2v3a1 1 0 0 0 1 1h5`,
  key: `1xspal`
}], [`path`, {
  d: `M18 18v-6a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v6`,
  key: `1ra60u`
}], [`path`, {
  d: `M18 22H4a2 2 0 0 1-2-2V6`,
  key: `pblm9e`
}], [`path`, {
  d: `M8 18a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9.172a2 2 0 0 1 1.414.586l2.828 2.828A2 2 0 0 1 22 6.828V16a2 2 0 0 1-2.01 2z`,
  key: `1yve0x`
}]]);
var S = {
  class: `sticky top-0 z-[15] flex h-[38px] shrink-0 items-center justify-between gap-3 rounded-t-[var(--toolbox-window-corner-radius,10px)] bg-background pl-[calc(16px+var(--toolbox-left-controls-width,0px))] pr-[calc(16px+var(--toolbox-window-controls-width,0px))] before:absolute before:inset-y-0 before:left-[var(--toolbox-left-controls-width,0px)] before:right-[var(--toolbox-window-controls-width,0px)] before:z-0 before:content-[''] before:[-webkit-app-region:drag]`
};
var C = {
  class: `relative z-[1] flex min-w-0 items-center gap-1 [-webkit-app-region:no-drag]`
};
var w = [`aria-label`, `title`];
var T = {
  class: `min-w-0 truncate text-sm font-medium text-muted-foreground`
};
var E = {
  class: `relative z-[1] flex min-w-0 items-center justify-end gap-1.5 [-webkit-app-region:no-drag]`
};
var D = [`aria-label`, `title`];
var O = [`aria-label`, `title`];
var k = [`aria-label`, `title`];
var A = [`aria-label`, `title`];
var j = [`aria-label`, `title`];
var M = [`aria-label`, `title`];
var N = [`title`];
var P = {
  class: `text-[13px] font-semibold text-primary`
};
var F = `inline-flex h-8 items-center justify-center gap-1.5 whitespace-nowrap rounded-lg px-2.5 text-[11px] text-muted-foreground transition-[background-color,color,transform] focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-primary/40 active:scale-[0.97]`;
let I_1 = s_0,
  L = p,
  {
    t: R
  } = y(),
  z = u(() => I_1.localTool || I_1.tool.price > 0 ? !I_1.localTool : Object.values(I_1.tool.priceOptions || {}).some(item => Number(item) > 0) || Object.values(I_1.tool.characterPriceOptions || {}).some(item => Number(item) > 0) ? true : Object.values(I_1.tool.tokenRateOptions || {}).some(item => Number(item?.withVideo) > 0 || Number(item?.withoutVideo) > 0)),
  B = `${F} hover:bg-muted hover:text-foreground`,
  V = `${F} hover:bg-primary/10`;
</script>
