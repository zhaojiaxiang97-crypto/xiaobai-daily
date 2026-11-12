<template>
<div ref="cn" :class="`no-scrollbar flex h-0 min-h-0 w-full flex-1 flex-col gap-3.5 overflow-y_2-auto overflow-x-hidden px-7 pb-9 pt-1 text-foreground`" @scroll="Hn"><section><span><span v-text="m(me,{size:14})" />{{ ` `+h(handler(`Kicker`)) }}</span><h1>{{ handler(`ToolName`) }}</h1><p><span v-text="handler(`HeroDesc`,{shortcut:mn.value})" /></p></section><section :class="`flex shrink-0 flex-col divide-y_2 divide-border rounded-xl border border-border bg-card`" :aria-busy="T.value"><div><div><strong>{{ handler(`RecordTitle`) }}</strong><small>{{ handler(`RecordDesc`) }}</small></div><span v-text="m(r,{'model-value':G.value,'aria-label':handler(`RecordTitle`),disabled:!C.value||T.value,'onUpdate:modelValue':Sn},null,8,[`model-value`,`aria-label`,`disabled`])" /></div><div><div><strong :class="[`text-[13px] font-semibold`,G.value?``:`text-muted-foreground`]">{{ handler(`ShortcutTitle`) }}</strong><small>{{ M.value }}</small></div><div><button ref="ln" type="button" :class="[`h-[30px] min-w-[132px] rounded-lg border px-3 text-xs font-semibold tracking-wide transition-colors outline-none disabled:cursor-not-allowed disabled:opacity-55`,A.value?`border-primary bg-card text-muted-foreground`:`border-border bg-muted text-foreground hover:border-foreground/25`]" :disabled="!G.value||T.value" :title="handler(`ShortcutChange`)" @click="Rn" @keydown="zn" @blur="$">{{ A.value?j.value||handler(`ShortcutPress`):mn.value }}</button><component :is="n" variant="ghost" size="sm" :class="`text-xs text-muted-foreground`" :disabled="!G.value||T.value" @click="Bn" /></div></div><div><div><strong>{{ h(handler(`TimelineTitle`))+` ` }}<span>{{ handler(`TimelineCloudBadge`) }}</span></strong><small>{{ handler(`TimelineDesc`) }}</small></div><span v-text="m(r,{'model-value':C.value?.syncToTimeline===true,'aria-label':handler(`TimelineTitle`),disabled:!C.value||T.value,'onUpdate:modelValue':Cn},null,8,[`model-value`,`aria-label`,`disabled`])" /></div><div><div><strong>{{ handler(`RetentionTitle`) }}</strong><small>{{ handler(`RetentionDesc`) }}</small></div><div><span v-text="m(Re,{modelValue:gn.value,'onUpdate:modelValue':d[0]||=e=>gn.value=e,options:_n.value,disabled:!C.value||T.value,label:handler(`RetentionTitle`),compact:``},null,8,[`modelValue`,`options`,`disabled`,`label`])" /></div></div></section><section><header><div></div><div><label><span v-text="m(Me,{size:14,class:`shrink-0`})" /><span v-text="ne(v(`input`,{'onUpdate:modelValue':d[1]||=e=>D.value=e,type:`search`,class:`min-w-0 flex-1 bg-transparent text-xs text-foreground outline-none placeholder:text-muted-foreground [&::-webkit-search-cancel-button]:appearance-none`,placeholder:handler(`SearchPlaceholder`)},null,8,vt),[[se,D.value]])" /><button type="button" :class="`inline-flex shrink-0 hover:text-foreground`" :aria-label="handler(`ClearSearch`)" :title="handler(`ClearSearch`)" @mousedown="ce(()=>{},[`prevent`])" @click="e=>D.value=``"><span v-text="m(de,{size:13})" /></button></label><span v-text="m(n,{variant:`outline`,size:`sm`,class:`shrink-0 text-xs`,disabled:!C.value||C.value.historyCount===C.value.pinnedCount,onClick:On},{default:l(()=>[m(i,{size:14}),s(h(handler(`ClearHistory`)),1)]),_:1},8,[`disabled`])" /></div></header><div><span v-text="m(he,{class:`animate-spin`,size:20})" />{{ handler(`Loading`) }}</div></section><span v-text="m(ve,{open:F.value,'onUpdate:open':d[8]||=e=>{e||jn();}},{default:l(()=>[m(ye,{class:`sm:max-w-[480px]`},{default:l(()=>[m(be,null,{default:l(()=>[m(Se,null,{default:l(()=>[s(h(I.value?handler(`PhraseEditorEdit`):handler(`PhraseEditorCreate`)),1)]),_:1})]),_:1}),v(`label`,Gt,[v(`span`,Kt,h(handler(`PhraseTitleLabel`)),1),m(Ne,{modelValue:L.value,'onUpdate:modelValue':d[6]||=e=>L.value=e,type:`text`,class:`h-9 text-sm`,maxlength:60,placeholder:handler(`PhraseTitlePlaceholder`),onKeydown:Nn},null,8,[`modelValue`,`maxlength`,`placeholder`])]),v(`label`,qt,[v(`span`,Jt,h(handler(`PhraseContentLabel`)),1),ne(v(`textarea`,{ref_key:`editorContentRef`,ref:dn,'onUpdate:modelValue':d[7]||=e=>R.value=e,rows:`7`,class:`min-h-36 w-full resize-y_2 rounded-lg border border-input bg-transparent px-2.5 py-2 text-sm leading-relaxed outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-input/30`,maxlength:Fe,placeholder:handler(`PhraseContentPlaceholder`),onKeydown:Nn},null,40,Yt),[[se,R.value]])]),B.value?(p(),c(`p`,Xt,h(B.value),1)):_(``,true),m(xe,{class:`items-center sm:justify-between`},{default:l(()=>[v(`small`,Zt,h(handler(`PhraseSaveHint`,{key:tn?`⌘ + Enter`:`Ctrl + Enter`})),1),v(`div`,Qt,[m(n,{variant:`outline`,disabled:z.value,onClick:jn},{default:l(()=>[s(h(handler(`Cancel`)),1)]),_:1},8,[`disabled`]),m(n,{disabled:z.value||!R.value.trim(),onClick:Mn},{default:l(()=>[z.value?(p(),u(he,{key:0,class:`animate-spin`,size:14})):_(``,true),s(h(handler(`Save`)),1)]),_:1},8,[`disabled`])])]),_:1})]),_:1})]),_:1},8,[`open`])" /><span v-text="m(we,{open:!!N.value,'onUpdate:open':d[11]||=e=>{e||xn(false);}},{default:l(()=>[m(Ce,null,{default:l(()=>[m(Ee,null,{default:l(()=>[m(Oe,null,{default:l(()=>[s(h(vn.value.title),1)]),_:1}),m(Te,{class:`flex flex-col gap-1.5`},{default:l(()=>[(p(true),c(f,null,ee(vn.value.lines,e=>(p(),c(`span`,{key:e},h(e),1))),128))]),_:1})]),_:1}),m(De,null,{default:l(()=>[m(n,{variant:`outline`,onClick:d[9]||=e=>xn(false)},{default:l(()=>[s(h(handler(`Cancel`)),1)]),_:1}),m(n,{variant:vn.value.danger?`destructive`:`default`,onClick:d[10]||=e=>xn(true)},{default:l(()=>[s(h(vn.value.action),1)]),_:1},8,[`variant`])]),_:1})]),_:1})]),_:1},8,[`open`])" /></div>
</template>

<script setup>
import { h, normalizeClass as a, unref as o, createTextVNode as s, createElementBlock as c, renderList as ee, watch as te, createBlock as u, Fragment as f, openBlock as p, defineComponent as re, onMounted as ie, onBeforeMount as oe, computed as g, createCommentVNode as _, createElementVNode as v } from 'vue';
import { Dt as e, r as n, t as r, wt as i } from '../vendor/ui/Switch.js';
import { C as se, E as ce } from '../vendor/i18n/en-US-player.js';
import { n as le, t as de } from '../vendor/ui/icons/lucide-icons.js';
import { t as fe } from '../vendor/i18n/i18n-helper.js';
import { t as pe } from '../vendor/chunks/check.js';
import { t as me } from '../vendor/chunks/clipboard-list.js';
import { _ as he, y as ge } from '../vendor/chunks/screenshot-beautifier.js';
import { t as _e } from '../vendor/pages/ToolboxWorkspaceHeader.js';
import { a as ve, i as ye, n as be, r as xe, t as Se } from '../vendor/chunks/dialog.js';
import { a as Ce, c as we, i as Te, n as Ee, r as De, t as Oe } from '../vendor/ui/alert-dialog.js';
import { n as ke, t as Ae } from '../vendor/chunks/alert.js';
import { En as je, Sn as Me, un as Ne, ut as Pe } from '../vendor/chunks/main.js';
import { n as Fe, t as Ie } from '../vendor/chunks/clipboard-assistant-page.js';
import { t as Le } from '../vendor/chunks/shortcut-label.js';
import { t as Re } from '../vendor/pages/ToolboxSelect.js';

var ze = ue_0(`grip-vertical`, [[`circle`, {
  cx: `9`,
  cy: `12`,
  r: `1`,
  key: `1vctgf`
}], [`circle`, {
  cx: `9`,
  cy: `5`,
  r: `1`,
  key: `hp0tcf`
}], [`circle`, {
  cx: `9`,
  cy: `19`,
  r: `1`,
  key: `fkjjf6`
}], [`circle`, {
  cx: `15`,
  cy: `12`,
  r: `1`,
  key: `1tmaij`
}], [`circle`, {
  cx: `15`,
  cy: `5`,
  r: `1`,
  key: `19l28e`
}], [`circle`, {
  cx: `15`,
  cy: `19`,
  r: `1`,
  key: `f4zoj3`
}]]);
function y(result) {
  if (!result.ok) throw Error(result.error.message);
  return result.data;
}
var b = {
  async getState() {
    return y_2(await window.electronAPI.clipboardAssistant.getState());
  },
  async updateSettings(row) {
    return y_2(await window.electronAPI.clipboardAssistant.updateSettings(row));
  },
  async setShortcutEditing(e) {
    y_2(await window.electronAPI.clipboardAssistant.setShortcutEditing(e));
  },
  async listHistory(e) {
    return y_2(await window.electronAPI.clipboardAssistant.listHistory(e));
  },
  async copyHistory(e) {
    y_2(await window.electronAPI.clipboardAssistant.copyHistory({
      id: e
    }));
  },
  async pinHistory(e, t) {
    y_2(await window.electronAPI.clipboardAssistant.pinHistory({
      id: e,
      pinned: t
    }));
  },
  async deleteHistory(e) {
    y_2(await window.electronAPI.clipboardAssistant.deleteHistory({
      id: e
    }));
  },
  async clearHistory() {
    return y_2(await window.electronAPI.clipboardAssistant.clearHistory()).removed;
  },
  async listPhrases() {
    return y_2(await window.electronAPI.clipboardAssistant.listPhrases());
  },
  async savePhrase(e) {
    return y_2(await window.electronAPI.clipboardAssistant.savePhrase(e));
  },
  async deletePhrase(e) {
    y_2(await window.electronAPI.clipboardAssistant.deletePhrase({
      id: e
    }));
  },
  async reorderPhrases(e) {
    return y_2(await window.electronAPI.clipboardAssistant.reorderPhrases({
      ids: e
    }));
  },
  async copyPhrase(e) {
    y_2(await window.electronAPI.clipboardAssistant.copyPhrase({
      id: e
    }));
  },
  onChanged(e) {
    let t = window.electronAPI.clipboardAssistant?.onChanged;
    return typeof t == `function` ? t(e) : () => {};
  }
};
var Be = {
  class: `flex shrink-0 flex-col gap-1.5`
};
var Ve = {
  class: `inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground`
};
var He = {
  class: `text-[22px] font-bold leading-tight tracking-tight`
};
var Ue = {
  class: `max-w-[720px] text-[13px] leading-relaxed text-muted-foreground`
};
var We = [`aria-busy`];
var Ge = {
  class: `flex min-h-[62px] items-center justify-between gap-5 px-4 py-3`
};
var Ke = {
  class: `flex min-w-0 flex-col gap-[3px]`
};
var qe = {
  class: `text-[13px] font-semibold`
};
var Je = {
  class: `text-xs leading-normal text-muted-foreground`
};
var Ye = {
  class: `flex min-h-[62px] items-center justify-between gap-5 px-4 py-3`
};
var Xe = {
  class: `flex min-w-0 flex-col gap-[3px]`
};
var Ze = {
  key: 0,
  class: `text-xs leading-normal text-destructive`
};
var Qe = {
  key: 1,
  class: `text-xs leading-normal text-destructive`
};
var $e = {
  key: 2,
  class: `text-xs leading-normal text-muted-foreground`
};
var et = {
  class: `flex shrink-0 items-center gap-2`
};
var tt = [`disabled`, `title`];
var nt = {
  class: `flex min-h-[62px] items-center justify-between gap-5 px-4 py-3`
};
var rt = {
  class: `flex min-w-0 flex-col gap-[3px]`
};
var it = {
  class: `inline-flex items-center gap-2 text-[13px] font-semibold`
};
var at = {
  key: 0,
  class: `rounded-full bg-amber-500/15 px-1.5 py-px text-[11px] font-semibold text-amber-700 dark:text-amber-300`
};
var ot = {
  class: `text-xs leading-normal text-muted-foreground`
};
var st = {
  class: `flex min-h-[62px] items-center justify-between gap-5 px-4 py-3`
};
var ct = {
  class: `flex min-w-0 flex-col gap-[3px]`
};
var lt = {
  class: `text-[13px] font-semibold`
};
var ut = {
  class: `text-xs leading-normal text-muted-foreground`
};
var dt = {
  class: `w-[132px] shrink-0`
};
var ft = {
  class: `flex shrink-0 flex-col rounded-xl border border-border bg-card`
};
var pt = {
  class: `flex flex-wrap items-center justify-between gap-3 border-b border-border px-3 py-2.5`
};
var mt = {
  class: `flex items-center gap-0.5 rounded-lg bg-muted p-0.5`,
  role: `tablist`
};
var ht = [`aria-selected`, `onClick`];
var gt = {
  key: 0,
  class: `flex flex-1 items-center justify-end gap-2`
};
var _t = {
  class: `flex h-8 w-full max-w-[260px] items-center gap-1.5 rounded-lg border border-input bg-background px-2 text-muted-foreground focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50`
};
var vt = [`placeholder`];
var yt = [`aria-label`, `title`];
var bt = {
  key: 1,
  class: `flex flex-1 items-center justify-end`
};
var xt = {
  key: 0,
  class: `flex min-h-[180px] items-center justify-center gap-2 text-xs text-muted-foreground`
};
var St = {
  key: 1,
  class: `flex min-h-[180px] flex-col items-center justify-center gap-2 px-6 text-center text-muted-foreground`
};
var Ct = {
  class: `text-[13px] font-semibold text-foreground`
};
var wt = {
  key: 0,
  class: `text-xs`
};
var Tt = {
  key: 2,
  class: `flex flex-col p-1.5`
};
var Et = [`title`, `onClick`];
var Dt = {
  class: `line-clamp-3 whitespace-pre-wrap break-words text-[13px] leading-relaxed`
};
var Ot = {
  class: `flex items-center gap-1 text-[11px] text-muted-foreground`
};
var kt = {
  key: 1
};
var At = {
  key: 2,
  class: `not-italic`
};
var jt = [`datetime`];
var Mt = {
  class: `flex shrink-0 items-center gap-0.5 py-1.5 pr-1.5 opacity-0 transition-opacity group-hover:opacity-100 focus-within:opacity-100`
};
var Nt = {
  key: 0,
  class: `flex items-center justify-center gap-1.5 py-3 text-xs text-muted-foreground`
};
var Pt = {
  key: 0,
  class: `flex min-h-[180px] items-center justify-center gap-2 text-xs text-muted-foreground`
};
var Ft = {
  key: 1,
  class: `flex min-h-[180px] flex-col items-center justify-center gap-2 px-6 text-center text-muted-foreground`
};
var It = {
  class: `text-[13px] font-semibold text-foreground`
};
var Lt = {
  class: `text-xs`
};
var Rt = {
  key: 2,
  class: `flex flex-col p-1.5`
};
var zt = [`onDragover`];
var Bt = [`title`, `aria-label`, `onDragstart`];
var Vt = [`title`, `onClick`];
var Ht = {
  key: 0,
  class: `truncate text-[13px] font-semibold`
};
var Ut = {
  class: `flex items-center gap-1 text-[11px] text-muted-foreground`
};
var Wt = {
  class: `flex shrink-0 items-center gap-0.5 py-1.5 pr-1.5 opacity-0 transition-opacity group-hover:opacity-100 focus-within:opacity-100`
};
var Gt = {
  class: `flex flex-col gap-1.5`
};
var Kt = {
  class: `text-xs font-semibold text-muted-foreground`
};
var qt = {
  class: `flex flex-col gap-1.5`
};
var Jt = {
  class: `text-xs font-semibold text-muted-foreground`
};
var Yt = [`maxlength`, `placeholder`];
var Xt = {
  key: 0,
  class: `text-xs text-destructive`,
  role: `alert`
};
var Zt = {
  class: `text-[11px] text-muted-foreground`
};
var Qt = {
  class: `flex gap-2`
};
var $t = 50;
var en = 160;
let ue_0 = re,
  {
    t: _e_1,
    locale: y_2
  } = fe(),
  handler = (e, t = {}) => _e_1(`toolboxNative.clipboardAssistant${e}`, t),
  S = window.electronAPI?.platform || `win32`,
  tn = S === `darwin`,
  C = d(null),
  w = d(`history`),
  T = d(false),
  E = d([]),
  nn = d(true),
  rn = d(false),
  an = d(false),
  on = d(null),
  D = d(``),
  O = d([]),
  sn = d(true),
  k = d(``),
  cn = d(null),
  A = d(false),
  j = d(``),
  M = d(``),
  ln = d(null),
  N = d(null),
  P = null,
  un = null,
  F = d(false),
  I = d(null),
  L = d(``),
  R = d(``),
  z = d(false),
  B = d(``),
  dn = d(null),
  V = d(null),
  H = false,
  fn = 0,
  U = null,
  W = null,
  pn = null,
  G = g(() => C.value?.enabled === true),
  mn = g(() => Le(C.value?.effectiveShortcut || ``, S)),
  hn = g(() => !C.value?.shortcut),
  gn = g({
    get: () => String(C.value?.retentionDays ?? 0),
    set: e => {
      X({
        retentionDays: Number(e)
      });
    }
  }),
  _n = g(() => Ie.map(item => ({
    value: String(item),
    label: item === 0 ? handler(`RetentionForever`) : item === 365 ? handler(`RetentionYear`) : handler(`RetentionDays`, {
      n: item
    })
  }))),
  vn = g(() => {
    switch (N.value) {
      case `enable-recording`:
        return {
          title: handler(`ConfirmEnableTitle`),
          lines: [handler(`ConfirmEnableDesc`)],
          action: handler(`ConfirmEnableAction`),
          danger: false
        };
      case `enable-timeline`:
        return {
          title: handler(`ConfirmTimelineTitle`),
          lines: [handler(`ConfirmTimelineDesc1`), handler(`ConfirmTimelineDesc2`), handler(`ConfirmTimelineDesc3`)],
          action: handler(`ConfirmTimelineAction`),
          danger: true
        };
      case `clear-history`:
        return {
          title: handler(`ConfirmClearTitle`),
          lines: [handler(`ConfirmClearDesc`)],
          action: handler(`ConfirmClearAction`),
          danger: true
        };
      case `delete-phrase`:
        return {
          title: handler(`ConfirmDeletePhraseTitle`),
          lines: [handler(`ConfirmDeletePhraseDesc`)],
          action: handler(`ConfirmDeleteAction`),
          danger: true
        };
      default:
        return {
          title: ``,
          lines: [],
          action: ``,
          danger: false
        };
    }
  }),
  yn = g(() => D.value.trim() ? handler(`HistoryNoMatch`) : handler(`HistoryEmpty`)),
  bn = g(() => [{
    value: `history`,
    label: handler(`TabHistory`),
    count: C.value?.historyCount ?? 0
  }, {
    value: `phrases`,
    label: handler(`TabPhrases`),
    count: C.value?.phraseCount ?? 0
  }]);
function xn(e) {
  let t = P;
  P = null, N.value = null, t?.(e);
}
async function Sn() {
  if (!C.value || T.value) return;
  let e = !C.value.enabled;
  (!e || (await J(`enable-recording`))) && (await X({
    enabled: e
  }));
}
async function Cn() {
  if (!C.value || T.value) return;
  let e = !C.value.syncToTimeline;
  (!e || (await J(`enable-timeline`))) && (await X({
    syncToTimeline: e
  }));
}
async function On() {
  if (await J(`clear-history`)) try {
    await b.clearHistory(), await Promise.all([Z({
      silent: true
    }), Y()]);
  } catch (e) {
    q(K(e), true);
  }
}
function jn() {
  z.value || (F.value = false);
}
async function Mn() {
  if (!z.value) {
    if (!R.value.trim()) {
      B.value = handler(`PhraseContentRequired`);
      return;
    }
    z.value = true, B.value = ``;
    try {
      await b.savePhrase({
        ...(I.value ? {
          id: I.value
        } : {}),
        title: L.value,
        content: R.value
      }), F.value = false, await Promise.all([Q(), Y()]);
    } catch (e) {
      B.value = K(e);
    } finally {
      z.value = false;
    }
  }
}
function Nn(event) {
  event.key === `Enter` && (event.ctrlKey || event.metaKey) && !event.isComposing && (event.preventDefault(), Mn());
}
let value = V.value;
async function Rn() {
  if (!(!G.value || T.value || A.value)) {
    try {
      await b.setShortcutEditing(true);
    } catch (e) {
      q(K(e), true);
      return;
    }
    j.value = ``, M.value = ``, A.value = true, ae(() => ln.value?.focus());
  }
}
async function $() {
  if (A.value) {
    A.value = false, j.value = ``;
    try {
      await b.setShortcutEditing(false);
    } catch (e) {
      q(K(e), true);
    }
  }
}
async function zn(event) {
  if (!A.value || (event.preventDefault(), event.stopPropagation(), event.repeat)) return;
  if (event.key === `Escape`) {
    await $();
    return;
  }
  let includes = [`Control`, `Alt`, `AltGraph`, `Shift`, `Meta`, `OS`].includes(event.key),
    n = event.code.match(/^Key([A-Z])$/)?.[1] || (/^[a-z]$/i.test(event.key) ? event.key.toUpperCase() : ``),
    r = [event.ctrlKey && `Ctrl`, event.altKey && `Alt`, event.metaKey && (tn ? `Command` : `Super`), event.shiftKey && `Shift`].filter(Boolean).join(`+`),
    i = includes ? `` : n || (event.key === ` ` ? `Space` : event.key);
  if (j.value = Le([r, i].filter(Boolean).join(`+`), S), includes) {
    M.value = ``;
    return;
  }
  let a = Pe([r, i].filter(Boolean).join(`+`));
  if (!a) {
    M.value = handler(`ShortcutInvalid`);
    return;
  }
  A.value = false, j.value = ``, M.value = ``;
  try {
    await b.setShortcutEditing(false);
  } catch {}
  (await X({
    shortcut: a === C.value?.defaultShortcut ? `` : a
  })) && q(handler(`ShortcutSaved`));
}
async function Bn() {
  hn.value || (await X({
    shortcut: ``
  })) && q(handler(`ShortcutSaved`));
}
function Hn(event) {
  if (w.value !== `history`) return;
  let currentTarget = event.currentTarget;
  currentTarget.scrollHeight - currentTarget.scrollTop - currentTarget.clientHeight <= en && Z({
    append: true
  });
}
function K(e) {
  return e instanceof Error && e.message ? e.message : handler(`OperationFailed`);
}
function q(e, t = false) {
  t ? Ae(e) : ke(e);
}
function J(e) {
  return P?.(false), N.value = e, new Promise(e => {
    P = e;
  });
}
async function Y() {
  try {
    C.value = await b.getState();
  } catch (e) {
    q(K(e), true);
  }
}
async function X(e) {
  if (T.value) return false;
  T.value = true;
  try {
    return C.value = await b.updateSettings(e), true;
  } catch (e) {
    return q(K(e), true), await Y(), false;
  } finally {
    T.value = false;
  }
}
async function Z(e = {}) {
  if (e.append && (rn.value || !an.value || !on.value)) return;
  let t = ++fn;
  e.append ? rn.value = true : e.silent || (nn.value = true);
  try {
    let n = e.append ? $t : Math.min(100, Math.max($t, e.silent ? E.value.length : $t)),
      r = await b.listHistory({
        keyword: D.value.trim() || undefined,
        cursor: e.append ? on.value : null,
        pageSize: n
      });
    if (t !== fn) return;
    if (e.append) {
      let e = new Set(E.value.map(item => item.id));
      E.value = [...E.value, ...r.items.filter(item => !e.has(item.id))];
    } else E.value = r.items;
    an.value = r.hasMore, on.value = r.nextCursor;
  } catch (e) {
    t === fn && q(K(e), true);
  } finally {
    e.append && (rn.value = false), t === fn && (nn.value = false);
  }
}
async function Q() {
  try {
    O.value = await b.listPhrases();
  } catch (e) {
    q(K(e), true);
  } finally {
    sn.value = false;
  }
}
</script>
