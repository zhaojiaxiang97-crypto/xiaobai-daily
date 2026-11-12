<template>
<section><div><div></div><span>{{ g_2(`toolboxNative.keyboardHeatmapSample`) }}</span></div><div><div><strong>{{ g_2(`toolboxNative.keyboardHeatmapPreviewTitle`) }}</strong><small>{{ g_2(`toolboxNative.keyboardHeatmapPreviewDesc`) }}</small></div><ul></ul><span v-text="p(e,{size:`sm`,class:`self-start`,disabled:n_0.enableDisabled,onClick:_[0]||=e=>f_1(`enable`)},{default:s(()=>[i(h(g_2(`toolboxNative.keyboardHeatmapEnableAction`)),1)]),_:1},8,[`disabled`])" /></div></section>
</template>

<script setup>
import { h, unref as t, createTextVNode as i, createElementBlock as a, renderList as o, createBlock as c, Fragment as l, openBlock as d, defineComponent as f, computed as g, createCommentVNode as _, createElementVNode as v } from 'vue';
import { r as e } from '../vendor/ui/Switch.js';
import { s as x } from '../vendor/chunks/HeatMapRangePicker.js';
import { t as S } from '../vendor/i18n/i18n-helper.js';
import { O as C } from '../vendor/chunks/work-motivator.js';
import { r as w } from '../vendor/chunks/tool-icons.js';
import { c as E, o as D } from '../vendor/chunks/toolSettingsContext.js';
import { h as A } from '../vendor/chunks/main.js';

const n_0 = defineProps({
  enableDisabled: {
    type: Boolean
  }
});
var M = y_3(`hash`, [[`line`, {
  x1: `4`,
  x2: `20`,
  y1: `9`,
  y2: `9`,
  key: `4lhtct`
}], [`line`, {
  x1: `4`,
  x2: `20`,
  y1: `15`,
  y2: `15`,
  key: `vyu0kd`
}], [`line`, {
  x1: `10`,
  x2: `8`,
  y1: `3`,
  y2: `21`,
  key: `1ggp8o`
}], [`line`, {
  x1: `16`,
  x2: `14`,
  y1: `3`,
  y2: `21`,
  key: `weycgp`
}]]);
var N = {
  class: `grid gap-5 rounded-xl border border-border bg-card p-5 @3xl:grid-cols-[minmax(0,1fr)_280px] @3xl:items-center`
};
var P = {
  class: `relative min-w-0`
};
var F = {
  class: `flex flex-col gap-1 rounded-xl border border-border/60 bg-background/55 p-3 shadow-sm`,
  "aria-hidden": `true`
};
var I = {
  class: `absolute -top-2 left-3 rounded-full border border-border bg-card px-2 text-[10px] leading-4 text-muted-foreground`
};
var L = {
  class: `flex flex-col gap-4`
};
var R = {
  class: `flex flex-col gap-1`
};
var z = {
  class: `text-sm font-semibold`
};
var B = {
  class: `text-xs leading-relaxed text-muted-foreground`
};
var V = {
  class: `flex flex-col gap-3`
};
var H = {
  class: `inline-flex size-7 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary`
};
var U = {
  class: `flex min-w-0 flex-col gap-0.5`
};
var W = {
  class: `text-xs font-semibold`
};
var G = {
  class: `text-[11px] leading-snug text-muted-foreground`
};
let f_1 = u,
  {
    t: g_2
  } = S(),
  options = {
    Space: 4,
    E: 4,
    "⌫": 4,
    T: 3,
    A: 3,
    O: 3,
    I: 3,
    N: 3,
    S: 3,
    R: 3,
    H: 2,
    L: 2,
    D: 2,
    C: 2,
    U: 2,
    M: 2,
    Enter: 2,
    Ctrl: 2,
    "⌘": 2,
    W: 1,
    Y: 1,
    P: 1,
    F: 1,
    G: 1,
    B: 1,
    V: 1,
    K: 1,
    Shift: 1,
    "⇧": 1,
    Tab: 1,
    ",": 1,
    ".": 1,
    1: 1,
    2: 1,
    0: 1
  },
  y_3 = D.value ? [{
    label: `fn`
  }, {
    label: `⌃`
  }, {
    label: `⌥`,
    width: 1.25
  }, {
    label: `⌘`,
    width: 1.5
  }, {
    label: `Space`,
    width: 6.5
  }, {
    label: `⌘`,
    width: 1.5
  }, {
    label: `⌥`,
    width: 1.25
  }, {
    label: `⌃`
  }] : [{
    label: `Ctrl`,
    width: 1.5
  }, {
    label: `Win`,
    width: 1.25
  }, {
    label: `Alt`,
    width: 1.25
  }, {
    label: `Space`,
    width: 7
  }, {
    label: `Alt`,
    width: 1.25
  }, {
    label: `Fn`,
    width: 1.25
  }, {
    label: `Ctrl`,
    width: 1.5
  }],
  b_4 = D.value ? `⇧` : `Shift`,
  handler = e => [...e].map(item => ({
    label: item
  })),
  T_5 = [[...handler("`1234567890-="), {
    label: `⌫`,
    width: 2
  }], [{
    label: `Tab`,
    width: 1.5
  }, ...handler(`QWERTYUIOP[]`), {
    label: `\\`,
    width: 1.5
  }], [{
    label: `Caps`,
    width: 1.75
  }, ...handler(`ASDFGHJKL;'`), {
    label: `Enter`,
    width: 2.25
  }], [{
    label: b_4,
    width: 2.25
  }, ...handler(`ZXCVBNM,./`), {
    label: b_4,
    width: 2.75
  }], y_3];
</script>
