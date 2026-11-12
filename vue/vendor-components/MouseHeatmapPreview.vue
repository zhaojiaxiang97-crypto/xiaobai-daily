<template>
<section><div><div><div :class="`aspect-[16/9] w-full rounded-lg border border-border/70 bg-[#f1f1ef] dark:bg-[#22262a]`" :style="m({backgroundImage:__3})"></div></div><span>{{ g_2(`toolboxNative.mouseHeatmapSample`) }}</span></div><div><div><strong>{{ g_2(`toolboxNative.mouseHeatmapPreviewTitle`) }}</strong><small>{{ g_2(`toolboxNative.mouseHeatmapPreviewDesc`) }}</small></div><ul></ul><span v-text="p(e,{size:`sm`,class:`self-start`,disabled:n_0.enableDisabled,onClick:b[0]||=e=>f_1(`enable`)},{default:s(()=>[i(h(g_2(`toolboxNative.mouseHeatmapEnableAction`)),1)]),__3:1},8,[`disabled`])" /></div></section>
</template>

<script setup>
import { h, unref as t, createTextVNode as i, createElementBlock as a, renderList as o, createBlock as c, Fragment as l, openBlock as d, defineComponent as f, computed as g, createCommentVNode as _, createElementVNode as v } from 'vue';
import { r as e } from '../vendor/ui/Switch.js';
import { s as b } from '../vendor/chunks/HeatMapRangePicker.js';
import { t as x } from '../vendor/i18n/i18n-helper.js';
import { O as S } from '../vendor/chunks/work-motivator.js';
import { x as C } from '../vendor/chunks/tool-icons.js';
import { t as w } from '../vendor/chunks/toolSettingsContext.js';

const n_0 = defineProps({
  enableDisabled: {
    type: Boolean
  }
});
var k = {
  class: `grid gap-5 rounded-xl border border-border bg-card p-5 @3xl:grid-cols-[minmax(0,1fr)_280px] @3xl:items-center`
};
var A = {
  class: `relative min-w-0`
};
var j = {
  class: `rounded-xl border border-border/60 bg-background/55 p-3 shadow-sm`,
  "aria-hidden": `true`
};
var M = {
  class: `absolute -top-2 left-3 rounded-full border border-border bg-card px-2 text-[10px] leading-4 text-muted-foreground`
};
var N = {
  class: `flex flex-col gap-4`
};
var P = {
  class: `flex flex-col gap-1`
};
var F = {
  class: `text-sm font-semibold`
};
var I = {
  class: `text-xs leading-relaxed text-muted-foreground`
};
var L = {
  class: `flex flex-col gap-3`
};
var R = {
  class: `inline-flex size-7 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary`
};
var z = {
  class: `flex min-w-0 flex-col gap-0.5`
};
var B = {
  class: `text-xs font-semibold`
};
var V = {
  class: `text-[11px] leading-snug text-muted-foreground`
};
let f_1 = u,
  {
    t: g_2
  } = x(),
  __3 = [{
    x: 14,
    y: 18,
    size: 26,
    alpha: .42
  }, {
    x: 44,
    y: 46,
    size: 34,
    alpha: .5
  }, {
    x: 58,
    y: 40,
    size: 22,
    alpha: .36
  }, {
    x: 32,
    y: 62,
    size: 20,
    alpha: .28
  }, {
    x: 50,
    y: 94,
    size: 30,
    alpha: .62
  }, {
    x: 95,
    y: 6,
    size: 12,
    alpha: .4
  }, {
    x: 80,
    y: 70,
    size: 16,
    alpha: .22
  }].map(item => `radial-gradient(circle at ${item.x}% ${item.y}%, rgba(22, 163, 74, ${item.alpha}) 0, rgba(22, 163, 74, 0) ${item.size}%)`).join(`, `),
  y_4 = [{
    icon: C,
    title: `toolboxNative.mouseHeatmapPointCountTitle`,
    desc: `toolboxNative.mouseHeatmapPointCountDesc`
  }, {
    icon: S,
    title: `toolboxNative.mouseHeatmapPointPrivacyTitle`,
    desc: `toolboxNative.mouseHeatmapPointPrivacyDesc`
  }, {
    icon: b,
    title: `toolboxNative.mouseHeatmapPointLocalTitle`,
    desc: `toolboxNative.mouseHeatmapPointLocalDesc`
  }];
</script>
