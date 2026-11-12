<template>
<div :class="`relative`"><button type="button" :class="[`flex w-full min-w-0 flex-col gap-0.5 rounded-lg border py-2.5 pr-11 pl-3 text-left transition-colors disabled:cursor-not-allowed disabled:opacity-60`,B.mechanicalKeyboardSwitchType===state.value?`border-primary bg-primary/[0.05]`:`border-border hover:border-foreground/20 hover:bg-muted/50`]" :aria-pressed="B.mechanicalKeyboardSwitchType===state.value" :disabled="X.value" @click="t_0=>$(state.value)"><strong><span>{{ state.name }}</span><component :is="ie" :size="13" :class="`shrink-0 text-primary`" /></strong><small>{{ state.description }}</small></button><button type="button" :class="`absolute top-1/2 right-2 inline-flex size-7 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground`" :aria-label="`${z(`settings.keyboardSoundCustomPreview`)} ${state.name}`" :title="z(`settings.keyboardSoundCustomPreview`)" @click="t_0=>Ae(state.value)"><span v-text="d(ce,{size:14})" /></button></div>
</template>

<script setup>
import { normalizeClass as t, unref as n, createTextVNode as r, createElementBlock as i, renderList as te, watch as ne, createBlock as o, Fragment as s, openBlock as l, defineComponent as u, toDisplayString as f, computed as p, createCommentVNode as m, createElementVNode as h } from 'vue';
import { r as e } from '../vendor/ui/Switch.js';
import { r as g } from '../vendor/ui/icons/lucide-icons.js';
import { t as re } from '../vendor/i18n/i18n-helper.js';
import { t as ie } from '../vendor/chunks/check.js';
import { r as ae } from '../vendor/chunks/tool-icons.js';
import { t as oe } from '../vendor/chunks/volume-2.js';
import { t as se } from '../vendor/ui/Slider.js';
import { c as _ } from '../vendor/chunks/toolSettingsContext.js';
import { Tn as ce, at as le, it as ue, nt as de, rt as fe, tt as pe, un as me } from '../vendor/chunks/main.js';
import { t as he } from '../vendor/pages/DesktopWidgetPage.js';

var ge = g(`file-headphone`, [[`path`, {
  d: `M4 6.835V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2h-.343`,
  key: `1vfytu`
}], [`path`, {
  d: `M14 2v5a1 1 0 0 0 1 1h5`,
  key: `wfsgrz`
}], [`path`, {
  d: `M2 19a2 2 0 0 1 4 0v1a2 2 0 0 1-4 0v-4a6 6 0 0 1 12 0v4a2 2 0 0 1-4 0v-1a2 2 0 0 1 4 0`,
  key: `1etmh7`
}]]);
var v = {
  key: 0,
  class: `text-muted-foreground`
};
var y = {
  key: 1,
  class: `flex items-center justify-between gap-3 rounded-lg bg-destructive/[0.06] px-3 py-2 text-destructive`
};
var b = {
  class: `rounded-xl border border-border bg-card`
};
var x = {
  class: `flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 px-4 pt-4`
};
var S = {
  class: `text-[13px] font-semibold`
};
var C = {
  class: `text-xs text-muted-foreground`
};
var w = {
  class: `grid grid-cols-1 gap-2 p-4 @lg:grid-cols-2 @3xl:grid-cols-3 @5xl:grid-cols-4`
};
var T = [`aria-pressed`, `disabled`, `onClick`];
var E = {
  class: `flex items-center gap-1.5 text-xs font-semibold`
};
var D = {
  class: `truncate`
};
var O = {
  class: `truncate text-[11px] text-muted-foreground`
};
var k = [`aria-label`, `title`, `onClick`];
var A = {
  class: `min-w-0 flex-1`
};
var j = {
  class: `flex items-center gap-1.5 text-xs font-semibold`
};
var M = {
  key: 0,
  class: `rounded-full bg-primary/10 px-1.5 text-[10px] font-medium leading-4 text-primary`
};
var N = [`title`];
var P = {
  class: `mt-0.5 block text-[11px] text-destructive`
};
var F = {
  class: `block text-[11px] text-muted-foreground`
};
var I = {
  key: 2,
  class: `mt-0.5 block text-[11px] text-muted-foreground`
};
var L = {
  class: `flex shrink-0 items-center gap-1.5`
};
var _e = {
  class: `flex flex-col divide-y divide-border rounded-xl border border-border bg-card`
};
var ve = {
  class: `flex flex-wrap items-center gap-x-5 gap-y-2 px-4 py-3.5`
};
var ye = {
  class: `flex w-24 shrink-0 items-center gap-2 text-[13px] font-semibold`
};
var be = {
  class: `w-10 shrink-0 text-right text-xs tabular-nums text-muted-foreground`
};
var xe = {
  class: `flex flex-col gap-2.5 px-4 py-3.5`
};
var Se = {
  class: `flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1`
};
var Ce = {
  class: `text-[13px] font-semibold`
};
var we = {
  class: `text-xs text-muted-foreground`
};
let R = u,
  Te = g,
  {
    t: z
  } = re(),
  {
    settings: B
  } = ae(),
  {
    controlsDisabled: V,
    enterKeyComponentState: H,
    enterKeyComponentBusy: Ee,
    isChangingMechanicalKeyboard: U,
    showMechanicalKeyboardConsent: W,
    mechanicalKeyboardConsentInfo: De,
    mechanicalKeyboardVolumeDraft: G,
    customKeyboardSoundInfo: K,
    isManagingCustomKeyboardSound: q,
    showDeleteCustomKeyboardSound: J,
    loadCustomKeyboardSoundInfo: Oe,
    importCustomKeyboardSound: ke,
    previewKeyboardSound: Ae,
    previewCustomKeyboardSound: je,
    deleteCustomKeyboardSound: Y,
    handleMechanicalKeyboardToggle: Me,
    confirmEnableMechanicalKeyboard: Ne,
    retryMechanicalKeyboard: Pe,
    changeMechanicalKeyboardSwitch: Fe,
    previewMechanicalKeyboardVolume: Ie,
    saveMechanicalKeyboardVolume: Le
  } = fe(),
  Re = p(() => pe.filter(state => state.value !== `custom`).map(state => {
    let [t_0, ...n_1] = z(state.labelKey).split(` · `);
    return {
      value: state.value,
      name: t_0,
      description: n_1.join(` · `)
    };
  })),
  X = p(() => V.value || U.value || q.value),
  Z = p(() => B.value.mechanicalKeyboardSwitchType === `custom`),
  Q = p(() => B.value.enableMechanicalKeyboardSound && H.value?.status === `error`);
let [t_0, ...n_1] = z(state.labelKey).split(` · `);
function $(e) {
  Fe(e, {
    alwaysPreview: true
  });
}
</script>
