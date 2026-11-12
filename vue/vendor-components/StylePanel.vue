<template>
<div><div><div><strong>{{ G(`StyleEnabled`) }}</strong><small>{{ G(`StyleEnabledDesc`) }}</small></div><span v-text="E(l,{'model-value':props.current.enabled,'aria-label':G(`StyleEnabled`),'onUpdate:modelValue':props[0]||=e=>T_8({enabled:!!e})},null,8,[`model-value`,`aria-label`])" /></div><div :class="[props.current.enabled?``:`pointer-events-none opacity-45`,`flex flex-col gap-5`]"><section><div><span>{{ G(`Presets`) }}</span><button type="button" :class="`inline-flex items-center gap-1 text-[11px] font-medium text-primary hover:underline`" @click="ve"><span v-text="E(n,{size:12})" />{{ G(`PresetSave`) }}</button></div><div><span v-text="b(N(`input`,{ref_key:`presetInput`,ref:c_4,'onUpdate:modelValue':props[1]||=e=>s_3.value=e,maxlength:20,class:`h-7 min-w-0 flex-1 rounded-md border border-input bg-background px-2 text-xs outline-none focus:border-ring`,placeholder:G(`PresetNamePlaceholder`),onKeydown:be},null,40,tt),[[P,s_3.value]])" /><button type="button" :class="`inline-flex size-7 items-center justify-center rounded-md bg-primary text-primary-foreground disabled:opacity-50`" :disabled="!s_3.value.trim()||props.savingPreset" :title="G(`PresetSaveConfirm`)" @click="ye"><span v-text="E(ie,{size:14})" /></button><button type="button" :class="`inline-flex size-7 items-center justify-center rounded-md text-muted-foreground hover:bg-muted`" :title="G(`Cancel`)" @click="e=>o_2.value=false"><span v-text="E(L,{size:14})" /></button></div><div></div></section><section><span>{{ G(`Background`) }}</span><div></div><div><div><button type="button" :class="`text-[11px] text-muted-foreground hover:text-foreground disabled:opacity-50`" :disabled="O_9.value" @click="ae">{{ O_9.value?G(`BackgroundLoading`):G(`BackgroundLoadSystem`) }}</button></div><button type="button" :class="`flex w-full items-center justify-center gap-1.5 rounded-md border border-border bg-background py-2 text-xs font-medium hover:bg-muted disabled:opacity-50`" :disabled="O_9.value" @click="R"><span v-text="E(e,{size:14})" />{{ ` `+k(G(`BackgroundChooseImage`)) }}</button><div>{{ G(`BackgroundLoading`) }}</div><p_5>{{ G(`BackgroundImageEmptyHint`) }}</p_5><p_5>{{ G(`BackgroundImageDesc`) }}</p_5><p_5>{{ A_10.value }}</p_5></div></section><section><div><span><span>{{ G(`Padding`) }}</span><span>{{ props.current.padding }}</span></span><span v-text="E(W,{'model-value':[props.current.padding],min:V.min,max:V.max,step:4,'onUpdate:modelValue':props[3]||=e=>{let t=ge(e);t!==null&&T_8({padding:t});}},null,8,[`model-value`,`min`,`max`])" /></div><div><span><span>{{ G(`Radius`) }}</span><span>{{ props.current.radius }}</span></span><span v-text="E(W,{'model-value':[props.current.radius],min:se.min,max:se.max,step:1,'onUpdate:modelValue':props[4]||=e=>{let t=ge(e);t!==null&&T_8({radius:t});}},null,8,[`model-value`,`min`,`max`])" /></div><div><span><span>{{ G(`Shadow`) }}</span><span>{{ props.current.shadow }}</span></span><span v-text="E(W,{'model-value':[props.current.shadow],min:z.min,max:z.max,step:5,'onUpdate:modelValue':props[5]||=e=>{let t=ge(e);t!==null&&T_8({shadow:t});}},null,8,[`model-value`,`min`,`max`])" /></div></section><section><span>{{ G(`Frame`) }}</span><div></div></section><section><span>{{ G(`Ratio`) }}</span><div></div></section><div><div><strong>{{ G(`Balance`) }}</strong><small>{{ G(`BalanceDesc`) }}</small></div><span v-text="E(l,{'model-value':props.current.balance,'aria-label':G(`Balance`),'onUpdate:modelValue':props[6]||=e=>T_8({balance:!!e})},null,8,[`model-value`,`aria-label`])" /></div></div></div>
</template>

<script setup>
import { normalizeClass as d, unref as f, createTextVNode as h, createElementBlock as g, renderList as _, watch as v, createBlock as x, Fragment as C, openBlock as w, defineComponent as T, onMounted as O, toDisplayString as k, onBeforeMount as A, computed as j, createCommentVNode as M, createElementVNode as N } from 'vue';
import { At as e, Ct as t, Dt as n, Et as r, Ot as i, jt as o, kt as s, r as c, t as l } from '../vendor/ui/Switch.js';
import { C as P, w as ne } from '../vendor/i18n/en-US-player.js';
import { n as re, r as I, t as L } from '../vendor/ui/icons/lucide-icons.js';
import { t as ie } from '../vendor/chunks/check.js';
import { s as ae } from '../vendor/ui/PopperContent.js';
import { _ as R, a as oe, d as se, f as z, g as ce, m as ue, n as de, o as fe, p as B, r as pe, t as me, u as V, v as he, y as ge } from '../vendor/chunks/screenshot-beautifier.js';
import { n as _e, t as ve } from '../vendor/ui/DropdownMenuItem.js';
import { n as ye, t as be } from '../vendor/chunks/undo-2.js';
import { t as W } from '../vendor/ui/Slider.js';
import { a as G } from '../vendor/chunks/screenshotTool.js';

const props = defineProps({
  current: {},
  presets: {},
  backgroundLibrary: {},
  thumbnail: {},
  savingPreset: {
    type: Boolean
  }
});
var q = {
  class: `flex flex-col gap-5 px-4 pb-6 pt-4 text-[13px]`
};
var J = {
  class: `flex items-center justify-between gap-3`
};
var Xe = {
  class: `flex min-w-0 flex-col gap-0.5`
};
var Ze = {
  class: `text-[13px] font-semibold`
};
var Qe = {
  class: `text-[11px] text-muted-foreground`
};
var Y = {
  class: `flex flex-col gap-2`
};
var X = {
  class: `flex items-center justify-between`
};
var $e = {
  class: `text-xs font-semibold text-muted-foreground`
};
var et = {
  key: 0,
  class: `flex items-center gap-1.5`
};
var tt = [`maxlength`, `placeholder`];
var nt = [`disabled`, `title`];
var rt = [`title`];
var it = {
  class: `grid grid-cols-3 gap-2`
};
var at = [`title`, `onClick`];
var ot = {
  class: `relative flex h-11 items-center justify-center overflow-hidden rounded-md border border-black/5 dark:border-white/10`
};
var st = {
  class: `relative h-5 w-9 rounded-[3px] bg-white shadow-[0_2px_6px_rgb(0_0_0/0.25)] dark:bg-zinc-200`
};
var ct = {
  class: `truncate px-0.5 text-[11px] text-muted-foreground`
};
var lt = [`title`, `onClick`];
var Z = {
  class: `flex flex-col gap-2`
};
var ut = {
  class: `text-xs font-semibold text-muted-foreground`
};
var dt = {
  class: `grid grid-cols-5 gap-0.5 rounded-lg bg-muted p-0.5`
};
var Q = [`onClick`];
var ft = {
  key: 0,
  class: `flex flex-col gap-2`
};
var pt = {
  class: `flex items-center justify-end`
};
var mt = [`disabled`];
var ht = [`disabled`];
var gt = {
  key: 0,
  class: `flex h-16 items-center justify-center text-[11px] text-muted-foreground`
};
var _t = {
  key: 1,
  class: `grid max-h-72 grid-cols-3 gap-2 overflow-y-auto p-0.5`
};
var vt = [`disabled`, `title`, `onClick`];
var yt = [`src`, `alt`];
var bt = {
  key: 2,
  class: `text-center text-[11px] text-muted-foreground`
};
var xt = {
  key: 3,
  class: `text-[11px] text-muted-foreground`
};
var St = {
  key: 4,
  class: `text-[11px] text-muted-foreground`,
  role: `status`
};
var Ct = {
  key: 1,
  class: `flex flex-wrap gap-1.5`
};
var wt = [`title`, `onClick`];
var Tt = [`title`];
var Et = [`value`];
var Dt = {
  key: 2,
  class: `flex flex-wrap gap-1.5`
};
var Ot = [`onClick`];
var kt = {
  key: 3,
  class: `text-[11px] text-muted-foreground`
};
var At = {
  key: 4,
  class: `text-[11px] text-muted-foreground`
};
var $ = {
  class: `flex flex-col gap-3.5`
};
var jt = {
  class: `flex flex-col gap-2`
};
var Mt = {
  class: `flex items-center justify-between text-xs`
};
var Nt = {
  class: `font-semibold text-muted-foreground`
};
var Pt = {
  class: `tabular-nums text-muted-foreground`
};
var Ft = {
  class: `flex flex-col gap-2`
};
var It = {
  class: `flex items-center justify-between text-xs`
};
var Lt = {
  class: `font-semibold text-muted-foreground`
};
var Rt = {
  class: `tabular-nums text-muted-foreground`
};
var zt = {
  class: `flex flex-col gap-2`
};
var Bt = {
  class: `flex items-center justify-between text-xs`
};
var Vt = {
  class: `font-semibold text-muted-foreground`
};
var Ht = {
  class: `tabular-nums text-muted-foreground`
};
var Ut = {
  class: `flex flex-col gap-2`
};
var Wt = {
  class: `text-xs font-semibold text-muted-foreground`
};
var Gt = {
  class: `grid grid-cols-3 gap-1.5`
};
var Kt = [`title`, `onClick`];
var qt = {
  class: `relative h-7 w-full overflow-hidden rounded-[4px] border border-black/10 bg-white dark:border-white/15 dark:bg-zinc-200`
};
var Jt = {
  class: `w-full truncate text-center text-[10px] text-muted-foreground`
};
var Yt = {
  class: `flex flex-col gap-2`
};
var Xt = {
  class: `text-xs font-semibold text-muted-foreground`
};
var Zt = {
  class: `grid grid-cols-6 gap-0.5 rounded-lg bg-muted p-0.5`
};
var Qt = [`onClick`];
var $t = {
  class: `flex items-center justify-between gap-3`
};
var en = {
  class: `flex min-w-0 flex-col gap-0.5`
};
var tn = {
  class: `text-[13px] font-semibold`
};
var nn = {
  class: `text-[11px] text-muted-foreground`
};
var rn = `repeating-conic-gradient(#e4e4e7 0% 25%, #ffffff 0% 50%) 50% / 10px 10px`;
let i_0 = result,
  a_1 = r,
  o_2 = S(false),
  s_3 = S(``),
  c_4 = S(null),
  options = {
    image: `BackgroundImage`,
    blur: `BackgroundBlur`,
    solid: `BackgroundSolid`,
    gradient: `BackgroundGradient`,
    transparent: `BackgroundTransparent`
  },
  p_5 = {
    none: `FrameNone`,
    "mac-light": `FrameMacLight`,
    "mac-dark": `FrameMacDark`,
    "browser-light": `FrameBrowserLight`,
    "browser-dark": `FrameBrowserDark`
  },
  m_6 = j(() => !B.includes(i_0.current.backgroundColor)),
  y_7 = j(() => [...le.map(item => ({
    id: `builtin:${item.id}`,
    name: G(`Preset${item.id}`),
    style: item.style,
    builtin: true
  })), ...i_0.presets.map(item => ({
    ...item,
    builtin: false
  }))]);
function T_8(e) {
  a_1(`update:style`, {
    ...i_0.current,
    ...e
  });
}
let O_9 = S(false),
  A_10 = S(``),
  F_11 = S([]),
  te_12 = S(``);
let background = await window.screenshotToolAPI.editor.loadBackground(e.id);
</script>
