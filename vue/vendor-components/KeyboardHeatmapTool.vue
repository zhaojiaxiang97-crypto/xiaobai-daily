<template>
<component :is="j" :tool="l_1_2.tool" :user="l_1_2.user" :credits-balance="l_1_2.creditsBalance" :description="m_4(`toolboxNative.keyboardHeatmapToolIntro`)" :enabled="V.value" :toggle-disabled="H.value" :status-text="V.value&&N?.running?m_4(`settings.keyboardHeatmapRunning`):undefined" requires-accessibility="" @toggle="R" @back="e=>f_3(`back`)" />
</template>

<script setup>
import { unref as t, createTextVNode as i, createElementBlock as a, renderList as o, createBlock as c, Fragment as l, openBlock as d, defineComponent as f, toDisplayString as h, computed as g, createCommentVNode as _, createElementVNode as v } from 'vue';
import { r as e } from '../vendor/ui/Switch.js';
import { r as y } from '../vendor/ui/icons/lucide-icons.js';
import { l as b, s as x } from '../vendor/chunks/HeatMapRangePicker.js';
import { t as S } from '../vendor/i18n/i18n-helper.js';
import { O as C } from '../vendor/chunks/work-motivator.js';
import { r as w } from '../vendor/chunks/tool-icons.js';
import { t as T } from '../vendor/chunks/useAuth.js';
import { c as E, o as D } from '../vendor/chunks/toolSettingsContext.js';
import { $ as O, et as k, h as A } from '../vendor/chunks/main.js';
import { t as j } from '../vendor/pages/DesktopWidgetPage.js';

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
var q = {
  key: 0,
  class: `text-muted-foreground`
};
var J = {
  key: 1,
  class: `text-amber-600 dark:text-amber-400`
};
var Y = {
  key: 2,
  class: `flex items-center justify-between gap-3 rounded-lg bg-destructive/[0.06] px-3 py-2 text-destructive`
};
var X = {
  key: 0,
  class: `flex flex-col gap-3 rounded-xl border border-border bg-card p-4`
};
var Z = {
  class: `flex flex-wrap items-center justify-between gap-2`
};
var Q = {
  class: `text-[13px] font-semibold`
};
var ee = {
  class: `flex items-center gap-1.5`
};
var $ = `toolbox-keyboard-heatmap-range`;
let l_1_2 = r_0,
  f_3 = o,
  {
    t: m_4
  } = S(),
  {
    settings: y_5
  } = w(),
  {
    isLoggedIn: x_6
  } = T(),
  {
    controlsDisabled: C_7,
    navigate: M,
    keyboardHeatmapState: N,
    keyboardHeatmapConsentInfo: P,
    showKeyboardHeatmapConsent: F,
    isChangingKeyboardHeatmap: I,
    keyboardHeatmapBusy: L,
    handleKeyboardHeatmapToggle: R,
    enableKeyboardHeatmap: z,
    retryKeyboardHeatmap: B
  } = O(),
  V = g(() => y_5.value.enableKeyboardHeatmap),
  H = g(() => C_7.value || L.value || I.value || !x_6.value && !V.value),
  U = g(() => V.value && (N.value?.status === `error` || N.value?.status === `revoked`)),
  W = g(() => V.value ? `` : E.value ? m_4(`settings.keyboardHeatmapWindowsNote`) : D.value ? m_4(`settings.keyboardHeatmapMacNote`) : ``),
  G = g(() => !!W.value || !x_6.value || U.value);
</script>
