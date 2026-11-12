<template>
<div><span v-text="b(ie,{tool:props.tool,user:props.user,'credits-balance':props.creditsBalance,'voice-tool':false,'show-history':false,'show-balance':false,onBack:i[0]||=e=>s_1(`back`)},null,8,[`tool`,`user`,`credits-balance`])" /><div ref="T_5" :class="`min-h-0 flex-1 overflow-y_3-auto overflow-x_4-hidden overscroll-y_3-contain px-7 pb-10 pt-1`"><div><span v-text="b(Ke,{size:14,class:`mt-px shrink-0`})" /><span>{{ L_10.value }}</span><button type="button" :class="`shrink-0 font-medium hover:underline`" @click="e=>$({quiet:O_6.value.length>0})">{{ c_2(`milestoneTool.retry`) }}</button><button type="button" :class="`grid size-4 shrink-0 place-items-center opacity-70 hover:opacity-100`" :aria-label="c_2(`milestoneTool.dismiss`)" @click="e=>L_10.value=``"><span v-text="b(ne,{size:12})" /></button></div><p>{{ G_20.value.campaignText }}</p><section><div><span v-text="b(We,null,{default:p(()=>[(v(true),u(_,null,d(Le_40.value,state=>(v(),h(r,{key:state.value,size:`sm`,variant:V_13.value===state.value?`default`:`outline`,class:`text-xs`,'aria-pressed':V_13.value===state.value,onClick:props=>V_13.value=state.value},{default:p(()=>[l(C(state.label)+` `,1),A(`span`,Zn,C(state.count),1)]),_:2},1032,[`variant`,`aria-pressed`,`onClick`]))),128))]),_:1})" /><div><label><component :is="re" :size="13" :class="`shrink-0 animate-spin`" /><span v-text="m(A(`input`,{'onUpdate:modelValue':i[3]||=e=>H_14.value=e,type:`text`,class:`min-w-0 flex-1 bg-transparent text-xs text-foreground outline-none placeholder:text-muted-foreground`,placeholder:c_2(`milestoneTool.searchPlaceholder`),'aria-label':c_2(`milestoneTool.searchPlaceholder`),onInput:nt,onKeydown:i[4]||=M(j(e=>rt(),[`prevent`]),[`esc`])},null,40,er),[[te,H_14.value]])" /><button type="button" :class="`grid size-4 shrink-0 place-items-center rounded text-muted-foreground hover:text-foreground`" :aria-label="c_2(`milestoneTool.clearSearch`)" @click="e=>rt()"><span v-text="b(ne,{size:12})" /></button></label><span v-text="b(r,{size:`sm`,class:`text-xs`,disabled:!G_20.value.createEnabled,title:G_20.value.createEnabled?undefined:c_2(`milestoneTool.createDisabled`),onClick:ot},{default:p(()=>[b(e),l(C(c_2(`milestoneTool.add`)),1)]),_:1},8,[`disabled`,`title`])" /></div></div></section><p><span v-text="c_2(`milestoneTool.todoRate`,{total:Be_43.value.total,done:Be_43.value.done,rate:Be_43.value.rate})" /></p><section><span v-text="b(re,{class:`animate-spin`,size:16})" />{{ c_2(`milestoneTool.loading`) }}</section></div><span v-text="b(N,{'enter-active-class':`transition duration-150 ease-out`,'enter-from-class':`translate-y_3-2 opacity-0`,'leave-active-class':`transition duration-100 ease-in`,'leave-to-class':`translate-y_3-2 opacity-0`},{default:p(()=>[q_25.value?(v(),u(`div`,pr,[A(`span`,mr,C(q_25.value.text),1),q_25.value.undo?(v(),u(`button`,{key:0,type:`button`,class:`shrink-0 font-semibold text-primary hover:underline`,onClick:at},C(c_2(`milestoneTool.notice.undo`)),1)):k(``,true)])):k(``,true)]),_:1})" /><span v-text="b(zn,{open:ce_21.value,'onUpdate:open':i[8]||=e=>ce_21.value=e,'milestone-id':le_22.value,user:props.user,config:G_20.value,uploads:He_45.value,onSaved:ct,onDelete:lt,onDownload:mt,onCancelUpload:Z_37.cancel},null,8,[`open`,`milestone-id`,`user`,`config`,`uploads`,`onCancelUpload`])" /><span v-text="b(de,{open:!!K_23.value,'onUpdate:open':ut},{default:p(()=>[b(ue,{size:`sm`},{default:p(()=>[b(pe,null,{default:p(()=>[b(_e,null,{default:p(()=>[l(C(c_2(`milestoneTool.confirm.deleteTitle`)),1)]),_:1}),b(fe,{class:`break-words`},{default:p(()=>[l(C(c_2(`milestoneTool.confirm.deleteText`,{title:K_23.value?.title??``})),1)]),_:1})]),_:1}),b(he,null,{default:p(()=>[b(me,null,{default:p(()=>[l(C(c_2(`milestoneTool.confirm.cancel`)),1)]),_:1}),b(ge,{variant:`destructive`,onClick:dt},{default:p(()=>[l(C(c_2(`milestoneTool.confirm.delete`)),1)]),_:1})]),_:1})]),_:1})]),_:1},8,[`open`])" /><span v-text="b(de,{open:be_24.value,'onUpdate:open':_t},{default:p(()=>[b(ue,{size:`sm`},{default:p(()=>[b(pe,null,{default:p(()=>[b(_e,null,{default:p(()=>[l(C(c_2(`milestoneTool.confirm.leaveTitle`)),1)]),_:1}),b(fe,null,{default:p(()=>[l(C(c_2(`milestoneTool.confirm.leaveText`)),1)]),_:1})]),_:1}),b(he,null,{default:p(()=>[b(me,{onClick:i[9]||=e=>gt(false)},{default:p(()=>[l(C(c_2(`milestoneTool.confirm.stay`)),1)]),_:1}),b(ge,{variant:`destructive`,onClick:i[10]||=e=>gt(true)},{default:p(()=>[l(C(c_2(`milestoneTool.confirm.leave`)),1)]),_:1})]),_:1})]),_:1})]),_:1},8,[`open`])" /></div>
</template>

<script setup>
import { h, normalizeClass as a, unref as o, createTextVNode as l, createElementBlock as u, renderList as d, watch as f, Fragment as _, openBlock as v, defineComponent as y, onMounted as S, toDisplayString as C, onBeforeMount as E, computed as D, createCommentVNode as k, createElementVNode as A } from 'vue';
import { Dt as e, Ot as t, r, wt as i } from '../vendor/ui/Switch.js';
import { C as te, E as j, T as M, r as N } from '../vendor/i18n/en-US-player.js';
import { t as ne } from '../vendor/ui/icons/lucide-icons.js';
import { t as L } from '../vendor/chunks/check.js';
import { _ as re } from '../vendor/chunks/screenshot-beautifier.js';
import { t as B } from '../vendor/chunks/flag.js';
import { n as V, t as H } from '../vendor/ui/DropdownMenuItem.js';
import { t as ie } from '../vendor/pages/ToolboxWorkspaceHeader.js';
import { n as G, r as ce, t as le } from '../vendor/chunks/dialog.js';
import { a as ue, c as de, i as fe, n as pe, o as me, r as he, s as ge, t as _e } from '../vendor/ui/alert-dialog.js';
import { a as ve } from '../vendor/chunks/useAuth.js';
import { t as ye } from '../vendor/chunks/useGrowthTelemetry.js';
import { At as K, Bn as be, Bt as q, Ft as we, It as Te, Pt as X, Rt as Me, Sn as Ne, St as Pe, Tt as Z, Vt as Q, bt as Le, gn as Be, kt as He, pt as We, un as Ge, vn as Ke, vt as qe, wt as Je, xt as Ye, yt as Xe, zt as Ze } from '../vendor/chunks/main.js';
import { t as $ } from '../vendor/pages/ToolDropzone.js';

let openRequest = a_0.openRequest;
const props = defineProps({
  tool: {},
  user: {},
  creditsBalance: {},
  creditsPolicy: {},
  active: {
    type: Boolean
  },
  openRequest: {}
});
function Bn(e) {
  let t = g([]),
    n = false,
    r = D(() => t.value.some(item => item.status !== `failed`));
  function i(e) {
    t.value = t.value.filter(item => item.id !== e);
  }
  function a_0(e) {
    return t.value.filter(item => item.milestoneId === e);
  }
  async function o() {
    if (!n) {
      n = true;
      try {
        for (;;) {
          let n = t.value.find(item => item.status === `queued`);
          if (!n) break;
          let csrfToken = e.csrfToken();
          if (!csrfToken) {
            t.value.forEach(item => {
              item.status === `queued` && (item.status = `failed`, item.error = e.errorMessage(null));
            });
            break;
          }
          n.status = `uploading`, n.progress = 0, n.error = ``;
          try {
            await Q.uploadFile(csrfToken, n.milestoneId, n.file, e => {
              n.progress = e;
            }, () => n.cancelRequested), i(n.id), e.onUploaded(n.milestoneId);
          } catch (t) {
            n.cancelRequested || J_29(t) === `UPLOAD_CANCELLED` ? i(n.id) : (n.status = `failed`, n.error = e.errorMessage(t));
          }
        }
      } finally {
        n = false;
      }
    }
  }
  function s_1(e, items) {
    items.length && (t.value = [...t.value, ...items.map(item => ({
      id: crypto.randomUUID(),
      milestoneId: e,
      file: item,
      progress: 0,
      status: `queued`,
      error: ``,
      cancelRequested: false
    }))], o());
  }
  function c_2(e) {
    let n = t.value.find(item => item.id === e);
    n && (n.status === `uploading` ? n.cancelRequested = true : i(e));
  }
  function l(e) {
    let n = t.value.find(item => item.id === e);
    n && n.status === `failed` && (n.status = `queued`, n.error = ``, n.progress = 0, n.cancelRequested = false, o());
  }
  function u(e) {
    a_0(e).forEach(item => c_2(item.id));
  }
  function d() {
    t.value.forEach(item => {
      item.cancelRequested = true;
    }), t.value = t.value.filter(item => item.status === `uploading`);
  }
  return {
    tasks: t,
    busy: r,
    tasksFor: a_0,
    enqueue: s_1,
    cancel: c_2,
    retry: l,
    dismiss: i,
    cancelFor: u,
    cancelAll: d
  };
}
var Vn = {
  class: `relative flex h-full min-h-0 flex-col overflow-hidden bg-background text-foreground`
};
var Hn = {
  key: 0,
  class: `flex min-h-[220px] flex-1 flex-col items-center justify-center gap-3 p-7 text-center`
};
var Un = {
  class: `grid size-11 place-items-center rounded-[10px] bg-muted text-muted-foreground`
};
var Wn = {
  class: `text-sm text-muted-foreground`
};
var Gn = {
  key: 0,
  class: `mb-3 flex items-start gap-2 rounded-[10px] bg-destructive/5 px-3 py-2 text-xs leading-relaxed text-destructive`
};
var Kn = {
  class: `min-w-0 flex-1`
};
var qn = [`aria-label`];
var Jn = {
  key: 1,
  class: `mb-3 rounded-[10px] bg-black/[0.02] px-3 py-2 text-xs text-muted-foreground dark:bg-white/[0.03]`
};
var Yn = {
  class: `rounded-[10px] bg-black/[0.02] p-3 dark:bg-white/[0.03]`
};
var Xn = {
  class: `flex flex-wrap items-center gap-2`
};
var Zn = {
  class: `tabular-nums opacity-70`
};
var Qn = {
  class: `ml-auto flex min-w-0 items-center gap-2`
};
var $n = {
  class: `flex h-7 w-[200px] min-w-0 items-center gap-1.5 rounded-lg border border-input bg-background px-2 text-muted-foreground transition-colors focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50 dark:bg-input/30`
};
var er = [`placeholder`, `aria-label`];
var tr = [`aria-label`];
var nr = {
  key: 0,
  class: `mt-2 px-1 text-xs text-muted-foreground`
};
var rr = {
  key: 3,
  class: `flex min-h-[260px] items-center justify-center gap-2 text-xs text-muted-foreground`
};
var ir = {
  key: 4,
  class: `flex min-h-[320px] flex-col items-center justify-center gap-2 p-7 text-center`
};
var ar = {
  class: `mb-1 grid size-11 place-items-center rounded-[10px] bg-muted text-muted-foreground`
};
var or = {
  class: `text-sm font-semibold text-foreground`
};
var sr = {
  class: `mb-2 max-w-[360px] text-xs leading-relaxed text-muted-foreground`
};
var cr = {
  key: 5,
  class: `flex min-h-[220px] flex-col items-center justify-center gap-2.5 text-center`
};
var lr = {
  class: `text-xs text-muted-foreground`
};
var ur = {
  key: 0,
  class: `mb-1 text-[13px] font-semibold text-foreground`
};
var dr = {
  class: `sticky top-0 z-[2] bg-background py-1.5 text-xs font-medium text-muted-foreground`
};
var fr = {
  key: 0,
  class: `mt-4 text-center text-xs text-muted-foreground`
};
var pr = {
  key: 0,
  class: `absolute bottom-5 left-1/2 z-[70] flex max-w-[calc(100%-48px)] -translate-x-1/2 items-center gap-3 rounded-full bg-foreground px-4 py-2 text-xs text-background shadow-lg`,
  role: `status`
};
var mr = {
  class: `min-w-0 truncate`
};
var hr = 3e4;
let a_0 = t,
  s_1 = i,
  {
    t: c_2,
    locale: y_3
  } = ee(),
  {
    captureGrowthObservation: x_4
  } = ye(),
  T_5 = g(null),
  O_6 = g([]),
  P_7 = g(false),
  F_8 = g(false),
  I_9 = g(false),
  L_10 = g(``),
  R_11 = g(false),
  z_12 = g(X()),
  V_13 = g(`all`),
  H_14 = g(``),
  U_15 = g(``),
  W_16 = g(new Set()),
  ae_17 = g(new Set()),
  oe_18 = g(new Set()),
  se_19 = g(null),
  G_20 = g(Me()),
  ce_21 = g(false),
  le_22 = g(null),
  K_23 = g(null),
  be_24 = g(false),
  q_25 = g(null),
  xe_26 = 0,
  Se_27 = null,
  Ce_28 = 0,
  J_29 = null,
  Y_30 = null,
  Ee_31 = null,
  De_32 = 0,
  Oe_33 = null,
  ke_34 = null,
  Ae_35,
  je_36 = null;
function nt() {
  J_29 !== null && window.clearTimeout(J_29), J_29 = window.setTimeout(() => {
    J_29 = null;
    let e = H_14.value.trim();
    e !== U_15.value && (U_15.value = e, F_8.value = true, $({
      quiet: true
    }));
  }, 300);
}
function rt(e = true) {
  J_29 !== null && window.clearTimeout(J_29), J_29 = null, H_14.value = ``, U_15.value && (U_15.value = ``, e && (F_8.value = true, $({
    quiet: true
  })));
}
function at() {
  let e = q_25.value?.undo;
  q_25.value = null, e?.();
}
function ot() {
  a_0.user && G_20.value.createEnabled && (le_22.value = null, ce_21.value = true);
}
async function ct(e) {
  Ye(e.item, true), e.files.length && Z_37.enqueue(e.item.id, e.files), e.warning && (L_10.value = e.warning), await $({
    quiet: true
  }), await ht(e.item.id);
}
function lt(e) {
  ce_21.value = false, K_23.value = e;
}
function ut(e) {
  if (e) return;
  let value = K_23.value;
  queueMicrotask(() => {
    K_23.value === value && (K_23.value = null);
  });
}
let value = K_23.value;
async function dt() {
  let value = K_23.value;
  if (K_23.value = null, value && a_0.user) {
    Z_37.cancelFor(value.id), O_6.value = O_6.value.filter(item => item.id !== value.id), Ge(W_16, value.id, false);
    try {
      await Q.delete(a_0.user.csrfToken, value.id);
    } catch (t) {
      Ye(value, true), L_10.value = Pe(t);
    }
  }
}
function pt(e) {
  ft(e, Fe_38.value.get(e.id) !== `completed`);
}
async function mt(e) {
  try {
    await Q.attachmentDownload(e.id);
  } catch (e) {
    it(Pe(e));
  }
}
function gt(e) {
  let t = Oe_33;
  Oe_33 = null, be_24.value = false, e && Z_37.cancelAll(), t?.(e);
}
function _t(e) {
  e || queueMicrotask(() => {
    Oe_33 && gt(false);
  });
}
let Z_37 = Bn({
    csrfToken: () => a_0.user?.csrfToken ?? null,
    onUploaded: e => {
      $e(e);
    },
    errorMessage: Pe
  }),
  Fe_38 = D(() => new Map(O_6.value.map(item => [item.id, Te(item, z_12.value)]))),
  Ie_39 = D(() => {
    let options = {
      all: 0,
      upcoming: 0,
      overdue: 0,
      completed: 0
    };
    for (let t of Fe_38.value.values()) options.all += 1, we(t, `upcoming`) ? options.upcoming += 1 : t === `overdue` ? options.overdue += 1 : t === `completed` && (options.completed += 1);
    return options;
  }),
  Le_40 = D(() => [`all`, `upcoming`, `overdue`, `completed`].map(item => ({
    value: item,
    label: c_2(`milestoneTool.tabs.${item}`),
    count: Ie_39.value[item]
  }))),
  Re_41 = D(() => O_6.value.filter(item => we(Fe_38.value.get(item.id) ?? `planned`, V_13.value))),
  ze_42 = D(() => Je(Re_41.value, V_13.value, z_12.value, y_3.value)),
  Be_43 = D(() => {
    let e = O_6.value.reduce((acc, cur) => acc + cur.todoCount, 0),
      t = O_6.value.reduce((acc, cur) => acc + cur.completedTodoCount, 0);
    return {
      total: e,
      done: t,
      rate: e ? Math.round(t / e * 100) : 0
    };
  }),
  Ve_44 = D(() => I_9.value && (O_6.value.length > 0 || U_15.value !== ``)),
  He_45 = D(() => le_22.value === null ? [] : Z_37.tasksFor(le_22.value)),
  Ue_46 = D(() => U_15.value ? c_2(`milestoneTool.empty.search`, {
    keyword: U_15.value
  }) : V_13.value === `upcoming` ? c_2(`milestoneTool.empty.upcoming`) : V_13.value === `overdue` ? c_2(`milestoneTool.empty.overdue`) : c_2(`milestoneTool.empty.completed`));
function it(e, t) {
  Y_30 !== null && window.clearTimeout(Y_30);
  let n = ++De_32;
  q_25.value = {
    id: n,
    text: e,
    undo: t
  }, Y_30 = window.setTimeout(() => {
    q_25.value?.id === n && (q_25.value = null);
  }, 5e3);
}
async function ft(e, t, n = true) {
  if (!a_0.user || oe_18.value.has(e.id) || e.completedAt === undefined) return;
  let r = e.completedAt ?? null;
  Ge(oe_18, e.id, true), Xe(e.id, {
    completedAt: t ? new Date().toISOString() : null
  });
  try {
    let r = await Q.setCompleted(a_0.user.csrfToken, e.id, t, X()),
      i = O_6.value.find(item => item.id === e.id);
    Ye(i && i.content !== null && r.content === null ? {
      ...r,
      content: i.content
    } : r), n && it(c_2(t ? `milestoneTool.notice.completed` : `milestoneTool.notice.reopened`, {
      title: r.title
    }), () => {
      ft(r, !t, false);
    });
  } catch (t) {
    Xe(e.id, {
      completedAt: r
    }), L_10.value = Pe(t);
  } finally {
    Ge(oe_18, e.id, false);
  }
}
async function ht(e) {
  Se_27 && (await Se_27);
  let t = O_6.value.find(item => item.id === e);
  if (!t && U_15.value && (rt(false), await $({
    quiet: true
  }), t = O_6.value.find(item => item.id === e)), !t) {
    let n = await Q.get(e, X()).catch(() => null);
    if (!n) return;
    Ye(n, true), t = n;
  }
  we(Te(t, z_12.value), V_13.value) || (V_13.value = `all`), W_16.value.has(e) || (Ge(W_16, e, true), qe(t) && et(e)), se_19.value = e, await w(), T_5.value?.querySelector(`#milestone-card-${e}`)?.scrollIntoView({
    behavior: `smooth`,
    block: `center`
  }), Ee_31 !== null && window.clearTimeout(Ee_31), Ee_31 = window.setTimeout(() => {
    se_19.value === e && (se_19.value = null);
  }, 2500);
}
async function $e(e) {
  try {
    let t = await Q.get(e, X());
    return Ye(t), t;
  } catch {
    return null;
  }
}
async function et(e) {
  if (!ae_17.value.has(e)) {
    Ge(ae_17, e, true);
    try {
      await $e(e);
    } finally {
      Ge(ae_17, e, false);
    }
  }
}
</script>
