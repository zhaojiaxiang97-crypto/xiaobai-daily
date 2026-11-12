<template>
<component :is="O" :tool="l_1_2.tool" :user="l_1_2.user" :credits-balance="l_1_2.creditsBalance" :description="m_4(`toolboxNative.mouseHeatmapToolIntro`)" :enabled="C_7" :toggle-disabled="P.value" :status-text="F.value" @toggle="M" @back="e=>f_3(`back`)" />
</template>

<script setup>
import { unref as t, createTextVNode as i, createElementBlock as a, renderList as o, createBlock as c, Fragment as l, openBlock as d, defineComponent as f, toDisplayString as h, computed as g, createCommentVNode as _, createElementVNode as v } from 'vue';
import { r as e } from '../vendor/ui/Switch.js';
import { l as y, s as b } from '../vendor/chunks/HeatMapRangePicker.js';
import { t as x } from '../vendor/i18n/i18n-helper.js';
import { O as S } from '../vendor/chunks/work-motivator.js';
import { x as C } from '../vendor/chunks/tool-icons.js';
import { t as w } from '../vendor/chunks/toolSettingsContext.js';
import { Q as T, Z as E, m as D } from '../vendor/chunks/main.js';
import { t as O } from '../vendor/pages/DesktopWidgetPage.js';

const r_0 = defineProps({
  tool: {},
  user: {},
  creditsBalance: {},
  creditsPolicy: {},
  active: {
    type: Boolean
  },
  openRequest: {}
});
const l_1 = r_0;
var U = {
  class: `flex items-center justify-between gap-3 rounded-lg bg-amber-500/[0.08] px-3 py-2 text-amber-700 dark:text-amber-300`
};
var W = {
  key: 0,
  class: `flex flex-col gap-3 rounded-xl border border-border bg-card p-4`
};
var G = {
  class: `flex flex-wrap items-center justify-between gap-2`
};
var K = {
  class: `text-[13px] font-semibold`
};
var q = {
  class: `flex items-center gap-1.5`
};
var J = `toolbox-mouse-heatmap-range`;
let l_1_2 = r_0,
  f_3 = o,
  {
    t: m_4
  } = x(),
  {
    controlsDisabled: b_5,
    navigate: S_6
  } = w(),
  {
    mouseHeatmapEnabled: C_7,
    mouseHeatmapAppUsageOff: k,
    showMouseHeatmapConsent: A,
    isChangingMouseHeatmap: j,
    handleMouseHeatmapToggle: M,
    enableMouseHeatmap: N
  } = E(`toolbox`),
  P = g(() => b_5.value || j.value),
  F = g(() => C_7.value && !k.value ? m_4(`settings.mouseHeatmapRunning`) : undefined),
  I = g(() => C_7.value && k.value);
</script>
