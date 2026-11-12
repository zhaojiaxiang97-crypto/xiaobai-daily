<template>
<article :id="`milestone-card-${event.item.id}`" :class="`relative grid grid-cols-[68px_minmax(0,1fr)] gap-x-5`"><span :class="[`pointer-events-none absolute left-[78px] w_6-px -translate-x-1/2 bg-border`,[event.first?`top-[18px]`:`top-0`,event.last?`h-[18px]`:`bottom-0`]]" :style="x(event.first&&event.last?`display: none`:undefined)"></span><div><strong :class="[`block text-[13px] font-semibold leading-5 tabular-nums`,O_9.value?`text-primary`:`text-foreground`]">{{ T_7.value.day }}</strong><span>{{ T_7.value.weekday }}</span><span>{{ E_8.value }}</span><span :class="[`absolute -right-[15px] top-[13.5px] z-[1] size-2.5 rounded-full border-2`,P_14.value]"></span></div><div><div :class="[`cursor-pointer rounded-[10px] border bg-card transition-[border-color,box-shadow]`,event.highlighted?`border-primary/60 ring-3 ring-primary/10`:`border-border hover:border-foreground/15`]" @click="oe"><header><button type="button" :class="[`mt-0.5 grid size-4 shrink-0 place-items-center rounded-full border transition-colors disabled:cursor-default`,y_4.value?`border-primary bg-primary text-primary-foreground`:`border-muted-foreground/40 text-transparent hover:border-primary hover:text-primary`]" :disabled="S_5.value||event.toggling" :title="S_5.value?options(`milestoneTool.card.autoCompleted`):y_4.value?options(`milestoneTool.card.markIncomplete`):options(`milestoneTool.card.markComplete`)" :aria-label="y_4.value?options(`milestoneTool.card.markIncomplete`):options(`milestoneTool.card.markComplete`)" :aria-pressed="y_4.value" @click="e=>f_2(`toggleComplete`)"><component :is="re" :size="10" :class="`animate-spin text-current`" /></button><button type="button" :class="[`min-w_6-0 flex-1 text-left text-sm font-medium leading-5 outline-none focus-visible:underline`,y_4.value?`text-muted-foreground`:`text-foreground`]" :aria-expanded="event.expanded" :title="event.expanded?options(`milestoneTool.card.collapse`):options(`milestoneTool.card.expand`)" @click="e=>f_2(`toggleExpand`)"><span>{{ event.item.title }}</span></button><span :class="[`mt-px shrink-0 rounded-md px-1.5 text-[11px] font-medium leading-[18px]`,N_13.value.className]">{{ N_13.value.label }}</span><span v-text="b(W,null,{default:p(()=>[b(ae,{'as-child':``},{default:p(()=>[A(`button`,{type:`button`,class:`-mr-1.5 grid size-6 shrink-0 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground`,title:options(`milestoneTool.card.more`),'aria-label':options(`milestoneTool.card.more`)},[b(I,{size:15})],8,st)]),_:1}),b(U,{align:`end`,class:`min-w_6-36`},{default:p(()=>[b(H,{class:`text-xs`,onSelect:c_0_1[2]||=e=>f_2(`edit`)},{default:p(()=>[b(t),l(C(options(`milestoneTool.card.edit`)),1)]),_:1}),w_6.value&&!S_5.value?(v(),h(H,{key:0,class:`text-xs`,disabled:event.toggling,onSelect:c_0_1[3]||=e=>f_2(`toggleComplete`)},{default:p(()=>[y_4.value?(v(),h(n,{key:0})):(v(),h(Fe,{key:1})),l(` `+C(y_4.value?options(`milestoneTool.card.markIncomplete`):options(`milestoneTool.card.markComplete`)),1)]),_:1},8,[`disabled`])):k(``,true),b(Ue),b(H,{variant:`destructive`,class:`text-xs`,onSelect:c_0_1[4]||=e=>f_2(`delete`)},{default:p(()=>[b(i),l(C(options(`milestoneTool.card.delete`)),1)]),_:1})]),_:1})]),_:1})" /></header><p :class="[`mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground`,te_10.value]">{{ event.item.contentSummary }}</p><div data-no-toggle="" :class="[`mt-1.5 cursor-auto`,te_10.value]"><div><span v-text="b(re,{size:13,class:`animate-spin`})" />{{ options(`milestoneTool.loading`) }}</div></div><div :class="[`mt-2 flex items-center gap-3 text-[11px] text-muted-foreground`,te_10.value]"><span><span v-text="b(Re,{'model-value':M_12.value,class:`h-1 max-w_6-[160px]`},null,8,[`model-value`])" /><span><span v-text="options(`milestoneTool.card.todoProgress`,{done:event.item.completedTodoCount,total:event.item.todoCount})" /></span></span><span :class="`ml-auto inline-flex shrink-0 items-center gap-1 tabular-nums`" :title="options(`milestoneTool.card.attachments`,{count:event.item.attachmentCount})"><span v-text="b(Se,{size:11})" />{{ event.item.attachmentCount }}</span></div><div data-no-toggle="" :class="[`mt-2.5 cursor-auto space-y_4-2.5`,te_10.value]"><ul></ul><ul></ul><div><span v-text="b(r,{variant:`ghost`,size:`xs`,class:`text-muted-foreground`,onClick:c_0_1[5]||=e=>f_2(`toggleExpand`)},{default:p(()=>[b(R),l(C(options(`milestoneTool.card.collapse`)),1)]),_:1})" /><span v-text="b(r,{variant:`ghost`,size:`xs`,class:`text-muted-foreground`,onClick:c_0_1[6]||=e=>f_2(`edit`)},{default:p(()=>[b(t),l(C(options(`milestoneTool.card.edit`)),1)]),_:1})" /></div></div><div data-no-toggle="" :class="[`-mt-0.5 cursor-auto space-y_4-1 border-t border-border py-2 text-xs`,te_10.value]"><div><span v-text="b(re,{size:13,class:`shrink-0 animate-spin`})" /><span><span v-text="options(`milestoneTool.card.uploading`,{count:F_15.value.length,percent:V_17.value})" /></span><button type="button" :class="`shrink-0 font-medium hover:text-foreground`" @click="e=>f_2(`cancelUploads`)">{{ options(`milestoneTool.card.cancelUpload`) }}</button></div></div></div></div></article>
</template>

<script setup>
import { h, normalizeClass as a, unref as o, createTextVNode as l, createElementBlock as u, renderList as d, watch as f, Fragment as _, openBlock as v, defineComponent as y, onMounted as S, toDisplayString as C, onBeforeMount as E, computed as D, createCommentVNode as k, createElementVNode as A } from 'vue';
import { Dt as e, Ot as t, jt as n, r, wt as i } from '../vendor/ui/Switch.js';
import { C as te, T as M, r as N } from '../vendor/i18n/en-US-player.js';
import { t as ne } from '../vendor/ui/icons/lucide-icons.js';
import { i as P, n as F, r as I } from '../vendor/chunks/purify.es.js';
import { t as L } from '../vendor/chunks/check.js';
import { t as R } from '../vendor/chunks/chevron-up.js';
import { _ as re, v as z } from '../vendor/chunks/screenshot-beautifier.js';
import { n as V, t as H } from '../vendor/ui/DropdownMenuItem.js';
import { t as ie } from '../vendor/pages/ToolboxWorkspaceHeader.js';
import { n as U, r as W, t as ae } from '../vendor/ui/DropdownMenuTrigger.js';
import { a as oe } from '../vendor/chunks/dialog.js';
import { At as K, Bt as q, Cn as xe, Dn as Se, Gt as Y, Lt as De, Mt as Oe, Ot as Ae, Rt as Me, Tt as Z, Vn as Fe, ct as Re, kt as He, lt as Ue, vn as Ke } from '../vendor/chunks/main.js';
import { t as $ } from '../vendor/pages/ToolDropzone.js';

const event = defineProps({
  item: {},
  status: {},
  today: {},
  expanded: {
    type: Boolean
  },
  highlighted: {
    type: Boolean
  },
  detailLoading: {
    type: Boolean
  },
  toggling: {
    type: Boolean
  },
  uploads: {},
  first: {
    type: Boolean
  },
  last: {
    type: Boolean
  }
});
const c_0 = event;
var Qe = [`id`];
var $e = {
  class: `relative pt-2.5 text-right`
};
var et = {
  class: `block text-xs leading-4 text-muted-foreground`
};
var tt = {
  key: 0,
  class: `block text-xs leading-4 tabular-nums text-muted-foreground`
};
var nt = {
  class: `min-w-0 pb-2.5`
};
var rt = {
  class: `flex items-start gap-2.5 px-3.5 pt-2.5`
};
var it = [`disabled`, `title`, `aria-label`, `aria-pressed`];
var at = [`aria-expanded`, `title`];
var ot = {
  class: `line-clamp-2 break-words`
};
var st = [`title`, `aria-label`];
var ct = {
  key: 0,
  class: `flex items-center gap-1.5 text-xs text-muted-foreground`
};
var lt = [`innerHTML`];
var ut = {
  key: 2,
  class: `text-xs text-muted-foreground`
};
var dt = {
  key: 0,
  class: `flex min-w-0 flex-1 items-center gap-2`
};
var ft = {
  class: `shrink-0 tabular-nums`
};
var pt = [`title`];
var mt = {
  key: 0,
  class: `overflow-hidden rounded-lg border border-border`
};
var ht = [`onClick`];
var gt = {
  key: 2,
  class: `max-w-[45%] shrink-0 truncate text-[11px] text-muted-foreground`
};
var _t = {
  key: 1,
  class: `space-y-0.5`
};
var vt = {
  class: `min-w-0 flex-1 truncate`
};
var yt = [`title`, `aria-label`, `onClick`];
var bt = {
  class: `-mx-1.5 flex items-center justify-between`
};
var xt = {
  key: 0,
  class: `flex items-center gap-2 text-muted-foreground`
};
var St = {
  class: `min-w-0 flex-1 truncate`
};
var Ct = [`title`];
var wt = [`onClick`];
var Tt = [`title`, `aria-label`, `onClick`];
let c_0_1 = event,
  f_2 = s,
  {
    t: options,
    locale: g_3
  } = ee(),
  y_4 = D(() => c_0_1.status === `completed`),
  S_5 = D(() => Oe(c_0_1.item) && !c_0_1.item.completedAt),
  w_6 = D(() => q(c_0_1.item)),
  T_7 = D(() => He(c_0_1.item.date, g_3.value)),
  E_8 = D(() => K(c_0_1.item.time)),
  O_9 = D(() => c_0_1.item.date === c_0_1.today),
  te_10 = D(() => w_6.value ? `pl-10 pr-3.5` : `px-3.5`),
  j_11 = D(() => c_0_1.item.content ? Y(Me(c_0_1.item.content)) : ``),
  M_12 = D(() => c_0_1.item.todoCount > 0 ? Math.round(c_0_1.item.completedTodoCount / c_0_1.item.todoCount * 100) : 0),
  N_13 = D(() => {
    let e = De(c_0_1.status);
    if (c_0_1.status === `completed`) return {
      label: options(`milestoneTool.status.completed`),
      className: e
    };
    if (c_0_1.status === `overdue`) return {
      label: options(`milestoneTool.relative.overdueDays`, {
        days: Z(c_0_1.item.date, c_0_1.today)
      }),
      className: e
    };
    let row = Z(c_0_1.today, c_0_1.item.date);
    return row === 0 ? {
      label: options(`milestoneTool.relative.today`),
      className: `bg-foreground/[0.08] font-semibold text-foreground`
    } : row === 1 ? {
      label: options(`milestoneTool.relative.tomorrow`),
      className: e
    } : {
      label: options(`milestoneTool.relative.daysLeft`, {
        days: row
      }),
      className: e
    };
  }),
  P_14 = D(() => c_0_1.status === `completed` ? `border-primary bg-primary` : c_0_1.status === `overdue` ? `border-destructive bg-destructive` : O_9.value ? `border-primary bg-background` : `border-muted-foreground/45 bg-background`),
  F_15 = D(() => c_0_1.uploads.filter(item => item.status !== `failed`)),
  B_16 = D(() => c_0_1.uploads.filter(item => item.status === `failed`)),
  V_17 = D(() => F_15.value.length ? Math.round(F_15.value.reduce((acc, cur) => acc + cur.progress, 0) / F_15.value.length) : 0);
</script>
