<template>
<div><span v-text="p(C,{tool:B_1.tool,user:B_1.user,'credits-balance':B_1.creditsBalance,'voice-tool':false,'local-tool':``,'show-history':false,'show-balance':false,onBack:f_0[0]||=e=>V(`back`)},null,8,[`tool`,`user`,`credits-balance`])" /><div><section><div><span :class="[`inline-flex size-12 shrink-0 items-center justify-center rounded-xl transition-colors`,B_1.enabled?`bg-primary/10 text-primary`:`bg-muted text-muted-foreground`]"><component :is="a(q.value)" :size="24" :stroke-width="1.8" /></span><div><div><h1>{{ B_1.tool.name }}</h1><span :class="[`inline-flex items-center gap-1 rounded-full px-2 py-px text-[11px] font-medium`,B_1.enabled?`bg-primary/10 text-primary`:`bg-muted text-muted-foreground`]"><span :class="[`size-1.5 rounded-full`,B_1.enabled?`bg-primary`:`bg-muted-foreground/50`]"></span>{{ ` `+m(B_1.statusText||(B_1.enabled?H(`toolboxNative.desktopWidgetsOn`):H(`toolboxNative.desktopWidgetsOff`))) }}</span></div><p>{{ B_1.description }}</p></div><div><slot name="actions" /><span v-text="p(t,{'model-value':B_1.enabled,disabled:B_1.toggleDisabled,'aria-label':B_1.tool.name,'onUpdate:modelValue':f_0[1]||=e=>V(`toggle`,e)},null,8,[`model-value`,`disabled`,`aria-label`])" /></div></div><div><slot name="notes" /><div><span><span v-text="p(w,{size:15,class:`shrink-0`})" />{{ H(`toolboxNative.desktopWidgetsMacAccessibility`) }}</span><span v-text="p(e,{variant:`outline`,size:`sm`,class:`h-7 shrink-0 text-xs`,onClick:G},{default:l(()=>[o(m(H(`toolboxNative.desktopWidgetsGrantAccess`)),1)]),_:1},8,[`onClick`])" /></div></div></section><slot /><p><span v-text="p(b,{size:13,class:`mt-0.5 shrink-0`})" />{{ B_1.footnote||H(`toolboxNative.desktopWidgetsSyncNote`) }}</p></div></div>
</template>

<script setup>
import { normalizeClass as n, unref as r, renderSlot as i, createTextVNode as o, createElementBlock as s, watch as c, createBlock as u, openBlock as d, defineComponent as f, toDisplayString as m, onBeforeMount as h, computed as g, createCommentVNode as _, createElementVNode as v } from 'vue';
import { r as e, t } from '../vendor/ui/Switch.js';
import { t as y } from '../vendor/i18n/i18n-helper.js';
import { C as b, n as x, t as S } from '../vendor/chunks/tool-icons.js';
import { t as C } from '../vendor/pages/ToolboxWorkspaceHeader.js';
import { t as w } from '../vendor/chunks/shield-alert.js';
import { _n as T } from '../vendor/chunks/main.js';

const f_0 = defineProps({
  tool: {},
  user: {},
  creditsBalance: {},
  description: {},
  enabled: {
    type: Boolean
  },
  toggleDisabled: {
    type: Boolean
  },
  statusText: {},
  requiresAccessibility: {
    type: Boolean
  },
  footnote: {}
});
const B = f_0;
var E = {
  class: `min-h-full bg-background`
};
var D = {
  class: `@container flex max-w-[1080px] flex-col gap-3.5 px-7 pt-1 pb-9 text-foreground`
};
var O = {
  class: `rounded-xl border border-border bg-card`
};
var k = {
  class: `flex items-center gap-4 p-4`
};
var A = {
  class: `min-w-0 flex-1`
};
var j = {
  class: `flex flex-wrap items-center gap-2`
};
var M = {
  class: `text-[17px] font-semibold leading-tight tracking-tight`
};
var N = {
  class: `mt-1 max-w-[640px] text-xs leading-relaxed text-muted-foreground`
};
var P = {
  class: `flex shrink-0 items-center gap-3`
};
var F = {
  key: 0,
  class: `flex flex-col gap-2 border-t border-border px-4 py-3 text-xs leading-relaxed`
};
var I = {
  key: 0,
  class: `flex items-center justify-between gap-3 rounded-lg bg-amber-500/[0.08] px-3 py-2 text-amber-700 dark:text-amber-300`
};
var L = {
  class: `flex items-center gap-2`
};
var R = {
  class: `flex items-start gap-1.5 px-1 text-[11px] leading-relaxed text-muted-foreground`
};
let B_1 = f_0,
  V = z,
  {
    t: H
  } = y(),
  {
    status: U,
    check: W,
    request: G
  } = x(),
  K = g(() => !!(B_1.requiresAccessibility && B_1.enabled && U.value?.required && !U.value.granted)),
  q = g(() => S[B_1.tool.icon] || T);
</script>
