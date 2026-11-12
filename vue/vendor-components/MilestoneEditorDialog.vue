<template>
<li :class="[`flex items-center gap-2 rounded-lg border px-2 py-1.5`,e.error?`border-destructive/30 bg-destructive/5`:`border-border`]"><span>{{ Ce(e.file.name) }}</span><span><span>{{ e.file.name }}</span><span :class="[`block truncate text-xs`,e.error?`text-destructive`:`text-muted-foreground`]"><span v-text="e.error||`${Ae(e.file.size)} · ${S_3(`milestoneTool.editor.waitingUpload`)}`" /></span></span><button type="button" :class="`grid size-7 shrink-0 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground`" :title="S_3(`milestoneTool.editor.removePending`)" :aria-label="S_3(`milestoneTool.editor.removePending`)" @click="t=>et(e.id)"><span v-text="b(ne,{size:14})" /></button></li>
</template>

<script setup>
import { normalizeClass as a, unref as o, createTextVNode as l, createElementBlock as u, renderList as d, watch as f, createBlock as h, Fragment as _, openBlock as v, defineComponent as y, onMounted as S, toDisplayString as C, onBeforeMount as E, computed as D, createCommentVNode as k, createElementVNode as A } from 'vue';
import { Dt as e, Ot as t } from '../vendor/ui/Switch.js';
import { t as ne } from '../vendor/ui/icons/lucide-icons.js';
import { _ as re, v as z } from '../vendor/chunks/screenshot-beautifier.js';
import { a as oe, i as se, n as G, r as ce, t as le } from '../vendor/chunks/dialog.js';
import { a as ue, c as de, i as fe, n as pe, o as me, r as he, s as ge, t as _e } from '../vendor/ui/alert-dialog.js';
import { At as K, Bn as be, Cn as xe, Dt as Ce, Et as J, Kt as Ee, Ot as Ae, Pt as X, Rn as je, Rt as Me, St as Pe, Tt as Z, Vn as Fe, Vt as Q, _t as Ie, bt as Le, ct as Re, dt as ze, gn as Be, jt as Ve, kt as He, lt as Ue, pt as We, un as Ge, vn as Ke, vt as qe, wt as Je, xt as Ye, yt as Xe, zt as Ze } from '../vendor/chunks/main.js';
import { t as $ } from '../vendor/pages/ToolDropzone.js';

var qt = {
  key: 0,
  class: `flex min-h-[320px] flex-1 items-center justify-center gap-2 text-xs text-muted-foreground`
};
var Jt = {
  key: 1,
  class: `flex min-h-[320px] flex-1 flex-col items-center justify-center gap-3 px-8 text-center`
};
var Yt = {
  class: `text-sm text-muted-foreground`
};
var Xt = {
  key: 2,
  class: `min-h-0 flex-1 overflow-y-auto px-5 py-4`
};
var Zt = {
  key: 0,
  class: `mb-3.5 flex items-start gap-2 rounded-lg bg-destructive/5 px-3 py-2 text-xs leading-relaxed text-destructive`
};
var Qt = {
  class: `min-w-0 flex-1`
};
var $t = {
  class: `block`
};
var en = {
  class: `mb-1.5 flex items-center justify-between text-xs font-medium text-foreground`
};
var tn = {
  key: 0,
  class: `font-normal tabular-nums text-muted-foreground`
};
var nn = {
  class: `mt-4`
};
var rn = {
  class: `mb-1.5 block text-xs font-medium text-foreground`
};
var an = {
  class: `flex flex-wrap items-center gap-2`
};
var on = {
  key: 2,
  class: `text-xs text-muted-foreground`
};
var sn = {
  class: `mt-1.5 flex flex-wrap gap-1`
};
var cn = [`onClick`];
var ln = {
  class: `mt-4`
};
var un = {
  class: `mb-1.5 block text-xs font-medium text-foreground`
};
var dn = {
  class: `mt-4`
};
var fn = {
  class: `flex items-center justify-between gap-3`
};
var pn = {
  class: `text-xs font-medium text-foreground`
};
var mn = {
  key: 0,
  class: `ml-1 font-normal text-muted-foreground`
};
var hn = {
  key: 0,
  class: `mt-2 max-h-[176px] overflow-y-auto rounded-lg border border-border`
};
var gn = [`title`, `aria-label`, `onClick`];
var _n = {
  key: 1,
  class: `mt-1.5 text-xs text-muted-foreground`
};
var vn = {
  class: `mt-4`
};
var yn = {
  class: `flex items-center justify-between gap-3`
};
var bn = {
  class: `text-xs font-medium text-foreground`
};
var xn = {
  class: `ml-1 font-normal tabular-nums text-muted-foreground`
};
var Sn = [`accept`];
var Cn = {
  key: 0,
  class: `mt-2 space-y-1.5`
};
var wn = {
  class: `grid size-7 shrink-0 place-items-center rounded-md bg-muted text-[10px] font-semibold text-muted-foreground`
};
var Tn = {
  class: `min-w-0 flex-1`
};
var En = {
  class: `block text-xs text-muted-foreground`
};
var Dn = [`title`, `aria-label`, `onClick`];
var On = [`title`, `aria-label`, `onClick`];
var kn = {
  class: `grid size-7 shrink-0 place-items-center rounded-md bg-muted text-[10px] font-semibold text-muted-foreground`
};
var An = {
  class: `min-w-0 flex-1`
};
var jn = {
  class: `block truncate text-sm text-foreground`
};
var Mn = [`title`, `aria-label`, `onClick`];
var Nn = {
  class: `grid size-7 shrink-0 place-items-center rounded-md bg-muted text-[10px] font-semibold text-muted-foreground`
};
var Pn = {
  class: `min-w-0 flex-1`
};
var Fn = {
  class: `block truncate text-sm text-foreground`
};
var In = [`title`, `aria-label`, `onClick`];
var Ln = {
  key: 1
};
var Rn = {
  class: `flex items-center gap-2`
};
let m_0 = options,
  y_1 = c(options, `open`),
  x_2 = s,
  {
    t: S_3,
    locale: T_4
  } = ee(),
  E_5 = g(null),
  te_6 = g(null),
  j_7 = g(null),
  M_8 = g(false),
  N_9 = g(``),
  P_10 = g(false),
  F_11 = g(``),
  I_12 = g(false),
  L_13 = g(false),
  R_14 = g(false),
  B_15 = g(false),
  V_16 = O({
    title: ``,
    content: ``,
    date: ``,
    time: ``
  }),
  H_17 = g([]),
  ie_18 = g([]),
  U_19 = g(new Set()),
  W_20 = g([]),
  ae_21 = ``,
  ve_22 = 0,
  ye_23 = D(() => m_0.milestoneId !== null),
  q_24 = D(() => !!window.electronAPI?.todos?.readPendingClipboardAttachment),
  Se_25 = typeof navigator < `u` && /mac/i.test(navigator.platform) ? `⌘↵` : `Ctrl+Enter`,
  we_26 = D(() => H_17.value.filter(item => item.status === `done`).length),
  Y_27 = D(() => ie_18.value.filter(item => !U_19.value.has(item.id)).length + m_0.uploads.filter(item => item.status !== `failed`).length + W_20.value.filter(item => !item.error).length),
  Te_28 = D(() => Y_27.value >= m_0.config.attachmentLimit),
  De_29 = D(() => Array.from(V_16.title).length > 400),
  Oe_30 = D(() => {
    let event = X();
    return [{
      label: S_3(`milestoneTool.editor.quickToday`),
      value: event
    }, {
      label: S_3(`milestoneTool.editor.quickTomorrow`),
      value: Ze(event, {
        days: 1
      })
    }, {
      label: S_3(`milestoneTool.editor.quickNextWeek`),
      value: Ze(event, {
        days: 7
      })
    }, {
      label: S_3(`milestoneTool.editor.quickNextMonth`),
      value: Ze(event, {
        months: 1
      })
    }];
  }),
  ke_31 = D(() => {
    if (!V_16.date) return ``;
    let {
        weekday: e
      } = He(V_16.date, T_4.value),
      t = Z(X(), V_16.date);
    return t === 0 ? `${e} · ${S_3(`milestoneTool.relative.today`)}` : t === 1 ? `${e} · ${S_3(`milestoneTool.relative.tomorrow`)}` : t > 1 ? `${e} · ${S_3(`milestoneTool.relative.daysLeft`, {
      days: t
    })}` : e;
  });
function et(e) {
  W_20.value = W_20.value.filter(item => item.id !== e);
}
</script>
