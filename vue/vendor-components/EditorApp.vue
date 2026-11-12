<template>
<div><header :class="`screenshot-drag-region flex h-12 shrink-0 items-center gap-3 border-b border-border bg-[#fafafa] dark:bg-[#18181b]`" :style="D({paddingLeft:Be?`84px`:`14px`,paddingRight:Be?`14px`:`150px`})"><div><span v-text="E(ce,{size:15,class:`text-primary`})" />{{ G(`EditorTitle`) }}</div><div><button type="button" :class="`inline-flex size-8 items-center justify-center rounded-lg text-foreground/75 hover:bg-black/[0.05] disabled:opacity-35 dark:hover:bg-white/10`" :disabled="!K.canUndo.value" :title="`${G(`Undo`)} (${ct}Z)`" @mousedown="F(()=>{},[`prevent`])" @click="e=>{K.undo(),Q();}"><span v-text="E(be,{size:16})" /></button><button type="button" :class="`inline-flex size-8 items-center justify-center rounded-lg text-foreground/75 hover:bg-black/[0.05] disabled:opacity-35 dark:hover:bg-white/10`" :disabled="!K.canRedo.value" :title="`${G(`Redo`)} (${ct}${Be?`⇧Z`:`Y`})`" @mousedown="F(()=>{},[`prevent`])" @click="e=>{K.redo(),Q();}"><span v-text="E(Ge,{size:16})" /></button><button type="button" :class="`inline-flex size-8 items-center justify-center rounded-lg text-foreground/75 hover:bg-black/[0.05] hover:text-destructive disabled:opacity-35 dark:hover:bg-white/10`" :disabled="!K.selectedId.value" :title="`${G(`Delete`)} (Delete)`" @mousedown="F(()=>{},[`prevent`])" @click="e=>{K.deleteSelected(),Q();}"><span v-text="E(u,{size:16})" /></button></div></header><div><main><div ref="items" :class="`relative flex min-h-0 flex-1 items-center justify-center overflow-hidden bg-[#ececee] dark:bg-[#0e0e10]`"><div :class="`relative shadow-[0_0_0_1px_rgb(0_0_0/0.04)]`" :style="D({width:`${X.value.width}px`,height:`${X.value.height}px`,...(at.value?{background:`repeating-conic-gradient(#e4e4e7 0% 25%, #ffffff 0% 50%) 50% / 16px 16px`}:{})})"><canvas ref="ue_8" :class="`block h-full w-full touch-none`" :style="D({cursor:nt.value})" @pointerdown="gt" @pointermove="_t" @pointerup="vt" @pointercancel="vt" @pointerleave="e=>H_15.value=``" @dblclick="yt"></canvas><textarea ref="de_9" :class="`absolute m-0 resize-none overflow-hidden whitespace-pre border-0 bg-transparent p-0 outline-none [field-sizing:content]`" :style="D(tt.value)" :value="et.value.text" :placeholder="G(`TextPlaceholder`)" rows="1" spellcheck="false" @input="e=>K.updateEditingText(e.target.value)" @keydown="xt" @blur="St"></textarea></div><span v-text="E(te,{'enter-from-class':`opacity-0 translate-y-1`,'leave-to-class':`opacity-0`,'enter-active-class':`transition duration-150`,'leave-active-class':`transition duration-150`},{default:y(()=>[U_16.value?(w(),g(`div`,Dn,[N(`span`,null,k(U_16.value.message),1),U_16.value.action?(w(),g(`button`,{key:0,type:`button`,class:`font-semibold text-emerald-300 hover:underline dark:text-emerald-700`,onClick:t[11]||=e=>U_16.value.action.run()},k(U_16.value.action.label),1)):M(``,true)])):M(``,true)]),_:1})" /></div><footer><div><component :is="ie" :size="14" :class="`shrink-0 text-primary`" /><span>{{ rt.value }}</span><span>{{ `· `+k(it.value) }}</span></div><div><span v-text="E(c,{variant:`ghost`,size:`sm`,class:`text-xs`,disabled:!l_0.value||B_11.value!==null,onClick:kt},{default:y(()=>[E(re,{size:14}),h(k(G(`ActionPin`)),1)]),_:1},8,[`disabled`])" /><span v-text="E(c,{variant:`ghost`,size:`sm`,class:`text-xs`,disabled:!l_0.value||B_11.value!==null,onClick:At},{default:y(()=>[B_11.value===`bot`?(w(),x(R,{key:0,size:14,class:`animate-spin`})):(w(),x(r,{key:1,size:14})),h(k(G(`ActionSendToBot`)),1)]),_:1},8,[`disabled`])" /><div><span v-text="E(c,{variant:`outline`,size:`sm`,class:`rounded-r-none text-xs`,disabled:!l_0.value||B_11.value!==null,title:`${ct}S`,onClick:t[12]||=e=>Ot(false)},{default:y(()=>[B_11.value===`save`?(w(),x(R,{key:0,size:14,class:`animate-spin`})):(w(),x(he,{key:1,size:14})),h(k(G(`ActionSave`)),1)]),_:1},8,[`disabled`,`title`])" /><span v-text="E(Ie,null,{default:y(()=>[E(Le,{'as-child':``},{default:y(()=>[E(c,{variant:`outline`,size:`icon-sm`,class:`-ml-px rounded-l_0-none`,disabled:!l_0.value||B_11.value!==null,'aria-label':G(`ActionSaveAs`)},{default:y(()=>[E(ae,{size:14})]),_:1},8,[`disabled`,`aria-label`])]),_:1}),E(Fe,{align:`end`,class:`min-w-36`},{default:y(()=>[E(ve,{class:`text-xs`,onSelect:t[13]||=e=>Ot(false)},{default:y(()=>[h(k(G(`ActionSaveToFolder`)),1)]),_:1}),E(ve,{class:`text-xs`,onSelect:t[14]||=e=>Ot(true)},{default:y(()=>[h(k(G(`ActionSaveAs`)),1)]),_:1})]),_:1})]),_:1})" /></div><span v-text="E(c,{size:`sm`,class:`min-w-24 text-xs`,disabled:!l_0.value||B_11.value!==null,title:G(`ActionCopyHint`),onClick:t[15]||=e=>Dt(true)},{default:y(()=>[B_11.value===`copy`?(w(),x(R,{key:0,size:14,class:`animate-spin`})):(w(),x(ge,{key:1,size:14})),h(k(G(`ActionCopy`)),1)]),_:1},8,[`disabled`,`title`])" /></div></footer></main><aside><div><button type="button" :class="[`inline-flex h-7 flex-1 items-center justify-center gap-1.5 rounded-md text-xs transition-colors`,z_7.value===`style`?`bg-muted font-semibold text-foreground`:`text-muted-foreground hover:text-foreground`]" @click="e=>z_7.value=`style`"><span v-text="E(ce,{size:13})" />{{ G(`TabStyle`) }}</button><button type="button" :class="[`inline-flex h-7 flex-1 items-center justify-center gap-1.5 rounded-md text-xs transition-colors`,z_7.value===`text`?`bg-muted font-semibold text-foreground`:`text-muted-foreground hover:text-foreground`]" @click="e=>z_7.value=`text`"><span v-text="E(Pe,{size:13})" />{{ G(`TabText`) }}</button></div><div><span v-text="b(E(an,{current:I_3.value,presets:L_4.value,'background-library':oe_5.value,thumbnail:se_6.value,'saving-preset':pe_12.value,'onUpdate:style':t[18]||=e=>I_3.value=e,onSavePreset:Nt,onDeletePreset:Pt},null,8,[`current`,`presets`,`background-library`,`thumbnail`,`saving-preset`]),[[ne,z_7.value===`style`]])" /><span v-text="l_0.value?b((w(),x(Ye,{key:0,'session-id':l_0.value.id,supported:l_0.value.ocrSupported,'auto-run':l_0.value.runOcr,onToast:Z},null,8,[`session-id`,`supported`,`auto-run`])),[[ne,z_7.value===`text`]]):undefined" /></div></aside></div></div>
</template>

<script setup>
import { h, normalizeClass as d, unref as f, createElementBlock as g, renderList as _, watch as v, createBlock as x, Fragment as C, openBlock as w, defineComponent as T, onMounted as O, toDisplayString as k, onBeforeMount as A, computed as j, createCommentVNode as M, createElementVNode as N } from 'vue';
import { At as e, Ct as t, Et as r, r as c, t as l, wt as u } from '../vendor/ui/Switch.js';
import { E as F, r as te, w as ne } from '../vendor/i18n/en-US-player.js';
import { n as re, r as I, t as L } from '../vendor/ui/icons/lucide-icons.js';
import { t as ie } from '../vendor/chunks/check.js';
import { s as ae } from '../vendor/ui/PopperContent.js';
import { _ as R, a as oe, d as se, f as z, g as ce, m as ue, n as de, p as B, r as pe, v as he, y as ge } from '../vendor/chunks/screenshot-beautifier.js';
import { n as _e, t as ve } from '../vendor/ui/DropdownMenuItem.js';
import { n as ye, t as be } from '../vendor/chunks/undo-2.js';
import { _ as xe, a as Se, c as Ce, i as Te, l as H, m as Ee, n as De, o as Oe, p as ke, r as Ae, s as je, t as Me, u as U, v as Ne, y as Pe } from '../vendor/chunks/compose.js';
import { n as Fe, r as Ie, t as Le } from '../vendor/ui/DropdownMenuTrigger.js';
import { a as G, i as Re, n as ze, r as Be, t as Ve } from '../vendor/chunks/screenshotTool.js';

var He = I_3(`grid-3x3`, [[`rect`, {
  width: `18`,
  height: `18`,
  x: `3`,
  y: `3`,
  rx: `2`,
  key: `afitv7`
}], [`path`, {
  d: `M3 9h18`,
  key: `1pudct`
}], [`path`, {
  d: `M3 15h18`,
  key: `5xshup`
}], [`path`, {
  d: `M9 3v18`,
  key: `fh3hqa`
}], [`path`, {
  d: `M15 3v18`,
  key: `14nvp0`
}]]);
var Ue = I_3(`highlighter`, [[`path`, {
  d: `m9 11-6 6v3h9l3-3`,
  key: `1a3l36`
}], [`path`, {
  d: `m22 12-4.6 4.6a2 2 0 0 1-2.8 0l-5.2-5.2a2 2 0 0 1 0-2.8L14 4`,
  key: `14a9rk`
}]]);
var We = I_3(`move-up-right`, [[`path`, {
  d: `M13 5H19V11`,
  key: `1n1gyv`
}], [`path`, {
  d: `M19 5L5 19`,
  key: `72u4yj`
}]]);
var Ge = I_3(`redo-2`, [[`path`, {
  d: `m15 14 5-5-5-5`,
  key: `12vg1m`
}], [`path`, {
  d: `M20 9H9.5A5.5 5.5 0 0 0 4 14.5A5.5 5.5 0 0 0 9.5 20H13`,
  key: `6uklza`
}]]);
var on = {
  v: `select`,
  r: `rect`,
  o: `ellipse`,
  a: `arrow`,
  l: `line`,
  p: `pen`,
  h: `highlighter`,
  t: `text`,
  n: `number`,
  m: `mosaic`
};
var sn = [`#ef4444`, `#f97316`, `#eab308`, `#10b981`, `#3b82f6`, `#18181b`, `#ffffff`];
var cn = {
  stroke: {
    s: 2,
    m: 4,
    l: 7
  },
  highlighter: {
    s: 3,
    m: 5,
    l: 8
  },
  text: {
    s: 16,
    m: 22,
    l: 32
  },
  number: {
    s: 11,
    m: 14,
    l: 19
  },
  mosaic: {
    s: 6,
    m: 10,
    l: 16
  }
};
function ln(e, t, n) {
  return Math.round(cn[e === `text` ? `text` : e === `number` ? `number` : e === `mosaic` ? `mosaic` : e === `highlighter` ? `highlighter` : `stroke`][t] * n * 10) / 10;
}
function un(e, t) {
  let n = [`s`, `m`, `l`],
    r = `m`,
    i_18 = 1 / 0;
  for (let a_19 of n) {
    let n = Math.abs(ln(e.kind, a_19, t) - e.size);
    n < i_18 && (i_18 = n, r = a_19);
  }
  return r;
}
function dn() {
  return `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;
}
var fn = 100;
function pn(e) {
  let t = p([]),
    n = p(null),
    r = S(null),
    i_18 = S(null),
    a_19 = S(`arrow`),
    o_20 = S(sn[0]),
    s_21 = S(`m`),
    c = p([]),
    l_0 = p([]),
    u = null,
    d = null,
    f = j(() => t.value.find(item => item.id === r.value) ?? null),
    m = j(() => c.value.length > 0),
    h = j(() => l_0.value.length > 0),
    g = j(() => n.value ? [...t.value, n.value] : t.value);
  function _() {
    return JSON.stringify(t.value);
  }
  function v(e) {
    c.value = [...c.value, e].slice(-100), l_0.value = [];
  }
  function y(e) {
    v(_()), t.value = e;
  }
  function b(e, n) {
    t.value = t.value.map(item => item.id === e ? n : item);
  }
  function x(e) {
    t.value = e, n.value = null, r.value = null, i_18.value = null, c.value = [], l_0.value = [], u = null, d = null;
  }
  function C() {
    F();
    let e = c.value.at(-1);
    e !== undefined && (l_0.value = [_(), ...l_0.value].slice(0, fn), c.value = c.value.slice(0, -1), t.value = JSON.parse(e), r.value && !t.value.some(item => item.id === r.value) && (r.value = null));
  }
  function w() {
    F();
    let e = l_0.value[0];
    e !== undefined && (c.value = [...c.value, _()].slice(-100), l_0.value = l_0.value.slice(1), t.value = JSON.parse(e), r.value && !t.value.some(item => item.id === r.value) && (r.value = null));
  }
  function T_1() {
    let value = r.value;
    return value ? (y(t.value.filter(item => item.id !== value)), r.value = null, true) : false;
  }
  function E(e) {
    F(), a_19.value = e, e !== `select` && (r.value = null);
  }
  function D(e) {
    o_20.value = e;
    let value = f.value;
    value && value.kind !== `mosaic` && value.color !== e && (v(_()), b(value.id, {
      ...value,
      color: e
    }));
  }
  function O(t) {
    s_21.value = t;
    let value = f.value;
    if (!value) return;
    let r = ln(value.kind, t, e());
    value.size !== r && (v(_()), b(value.id, {
      ...value,
      size: r
    }));
  }
  function k(e, n) {
    for (let r = t.value.length - 1; r >= 0; --r) {
      let i_18 = t.value[r];
      if (H_15(i_18, e.x, e.y, n)) return i_18;
    }
    return null;
  }
  function ee(e, t) {
    let value = f.value;
    return value ? Ce(value).find(item => Math.hypot(item.x - e.x, item.y - e.y) <= t * 1.4)?.handle ?? null : null;
  }
  function A(t) {
    r.value = t?.id ?? null, t && (t.kind !== `mosaic` && (o_20.value = t.color), s_21.value = un(t, e()));
  }
  function M() {
    return t.value.reduce((acc, state) => state.kind === `number` ? Math.max(acc, state.value) : acc, 0) + 1;
  }
  function N(e) {
    d = _(), r.value = e.id, i_18.value = e.id;
  }
  function P_2(e) {
    let value = i_18.value,
      r = t.value.find(item => item.id === value);
    r && r.kind === `text` && b(r.id, {
      ...r,
      text: e
    });
  }
  function F() {
    let value = i_18.value;
    if (!value) return;
    i_18.value = null;
    let n = t.value.find(item => item.id === value),
      a_19 = d;
    d = null, n?.kind === `text` && !n.text.trim() && (t.value = t.value.filter(item => item.id !== value), r.value === value && (r.value = null)), a_19 !== null && a_19 !== _() && v(a_19);
  }
  function te(e, t, n, r) {
    if (!r) return t;
    let i_18 = t.x - e.x,
      a_19 = t.y - e.y;
    if (n === `arrow` || n === `line`) {
      let t = Math.round(Math.atan2(a_19, i_18) / (Math.PI / 4)) * (Math.PI / 4),
        n = Math.hypot(i_18, a_19);
      return {
        x: e.x + Math.cos(t) * n,
        y: e.y + Math.sin(t) * n
      };
    }
    let o_20 = Math.max(Math.abs(i_18), Math.abs(a_19));
    return {
      x: e.x + Math.sign(i_18 || 1) * o_20,
      y: e.y + Math.sign(a_19 || 1) * o_20
    };
  }
  function ne(c, l_0) {
    F();
    let p = e(),
      m = ee(c, l_0);
    if (m && f.value) return u = {
      type: `resize`,
      id: f.value.id,
      handle: m,
      original: f.value,
      before: _()
    }, true;
    if (a_19.value === `select`) {
      let e = k(c, l_0);
      return A(e), e && (u = {
        type: `move`,
        id: e.id,
        startX: c.x,
        startY: c.y,
        original: e,
        before: _()
      }), true;
    }
    if (a_19.value === `text`) {
      let e = k(c, l_0);
      if (e?.kind === `text`) return A(e), N(e), true;
      let n = ln(`text`, s_21.value, p),
        a_19 = {
          id: dn(),
          kind: `text`,
          color: o_20.value,
          size: n,
          x: c.x,
          y: c.y - n * .65,
          text: ``
        };
      return d = _(), t.value = [...t.value, a_19], r.value = a_19.id, i_18.value = a_19.id, true;
    }
    if (a_19.value === `number`) {
      let e = {
        id: dn(),
        kind: `number`,
        color: o_20.value,
        size: ln(`number`, s_21.value, p),
        x: c.x,
        y: c.y,
        value: M()
      };
      return y([...t.value, e]), r.value = e.id, true;
    }
    let value = a_19.value,
      g = {
        id: dn(),
        color: o_20.value,
        size: ln(value, s_21.value, p)
      },
      resolvedValue;
    return resolvedValue = value === `rect` || value === `ellipse` || value === `mosaic` ? {
      ...g,
      kind: value,
      x: c.x,
      y: c.y,
      width: 0,
      height: 0
    } : value === `arrow` || value === `line` ? {
      ...g,
      kind: value,
      x1: c.x,
      y1: c.y,
      x2: c.x,
      y2: c.y
    } : {
      ...g,
      kind: value,
      points: [c.x, c.y]
    }, r.value = null, n.value = resolvedValue, u = {
      type: `draw`,
      annotation: resolvedValue,
      startX: c.x,
      startY: c.y
    }, true;
  }
  function re(e, t) {
    let r = u;
    if (!r) return;
    if (r.type === `draw`) {
      let value = n.value;
      if (!value) return;
      let a_19 = {
          x: r.startX,
          y: r.startY
        },
        o_20 = te(a_19, e, value.kind, t);
      if (value.kind === `rect` || value.kind === `ellipse` || value.kind === `mosaic`) n.value = {
        ...value,
        x: a_19.x,
        y: a_19.y,
        width: o_20.x - a_19.x,
        height: o_20.y - a_19.y
      };else if (value.kind === `arrow` || value.kind === `line`) n.value = {
        ...value,
        x2: o_20.x,
        y2: o_20.y
      };else if (value.kind === `pen` || value.kind === `highlighter`) {
        let points = value.points,
          r = points[points.length - 2],
          a_19 = points[points.length - 1];
        Math.hypot(e.x - r, e.y - a_19) >= Math.max(1, value.size * .35) && (n.value = {
          ...value,
          points: [...points, e.x, e.y]
        });
      }
      return;
    }
    if (r.type === `move`) {
      b(r.id, U_16(r.original, e.x - r.startX, e.y - r.startY));
      return;
    }
    let i_18 = e;
    (r.original.kind === `arrow` || r.original.kind === `line`) && t && (i_18 = te(r.handle === `start` ? {
      x: r.original.x2,
      y: r.original.y2
    } : {
      x: r.original.x1,
      y: r.original.y1
    }, e, r.original.kind, true)), b(r.id, we_14(r.original, r.handle, i_18.x, i_18.y));
  }
  function I_3() {
    let i_18 = u;
    if (u = null, i_18) {
      if (i_18.type === `draw`) {
        let value = n.value;
        if (n.value = null, !value) return;
        let a_19 = je(value),
          o_20 = e();
        if (value.kind !== `pen` && value.kind !== `highlighter` && (value.kind === `arrow` || value.kind === `line` ? Math.hypot(a_19.width, a_19.height) < 4 * o_20 : a_19.width < 3 * o_20 || a_19.height < 3 * o_20)) return;
        let s_21 = value.kind === `rect` || value.kind === `ellipse` || value.kind === `mosaic` ? {
          ...value,
          ...a_19
        } : value;
        y([...t.value, s_21]), r.value = s_21.id;
        return;
      }
      i_18.before !== _() && v(i_18.before);
    }
  }
  function L_4(e, t) {
    let n = k(e, t);
    n?.kind === `text` && N(n);
  }
  function ie() {
    return n.value ? (n.value = null, u = null, true) : false;
  }
  function ae() {
    return u !== null;
  }
  return {
    annotations: t,
    visibleAnnotations: g,
    draft: n,
    selected: f,
    selectedId: r,
    editingTextId: i_18,
    tool: a_19,
    color: o_20,
    level: s_21,
    canUndo: m,
    canRedo: h,
    load: x,
    undo: C,
    redo: w,
    deleteSelected: T_1,
    setTool: E,
    setColor: D,
    setLevel: O,
    select: A,
    handleAt: ee,
    topHit: k,
    pointerDown: ne,
    pointerMove: re,
    pointerUp: I_3,
    doubleClick: L_4,
    updateEditingText: P_2,
    finishTextEditing: F,
    cancelDraft: ie,
    isInteracting: ae
  };
}
var mn = {
  class: `flex h-full flex-col bg-background text-foreground`
};
var hn = {
  class: `flex shrink-0 items-center gap-1.5 text-[13px] font-semibold`
};
var gn = {
  class: `mx-auto flex min-w-0 items-center gap-0.5`,
  "data-no-drag": ``
};
var _n = [`title`, `aria-label`, `aria-pressed`, `onClick`];
var vn = [`title`, `onClick`];
var yn = [`title`, `onClick`];
var bn = [`disabled`, `title`];
var xn = [`disabled`, `title`];
var Sn = [`disabled`, `title`];
var Cn = {
  class: `flex min-h-0 flex-1`
};
var wn = {
  class: `flex min-w-0 flex-1 flex-col`
};
var Tn = [`value`, `placeholder`];
var En = {
  key: 1,
  class: `flex items-center gap-2 text-xs text-muted-foreground`
};
var Dn = {
  key: 0,
  class: `absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-3 rounded-full bg-zinc-900/90 px-4 py-2 text-xs text-white shadow-lg dark:bg-zinc-100/95 dark:text-zinc-900`
};
var On = {
  class: `flex h-14 shrink-0 items-center justify-between gap-3 border-t border-border px-4`
};
var kn = {
  class: `flex min-w-0 items-center gap-2 text-xs text-muted-foreground`
};
var An = {
  class: `truncate`
};
var jn = {
  key: 2,
  class: `shrink-0 tabular-nums text-muted-foreground/70`
};
var Mn = {
  class: `flex shrink-0 items-center gap-1.5`
};
var Nn = {
  class: `flex items-center`
};
var Pn = {
  class: `flex w-[300px] shrink-0 flex-col border-l border-border bg-background`
};
var Fn = {
  class: `flex shrink-0 items-center gap-0.5 border-b border-border p-2`
};
var In = {
  class: `min-h-0 flex-1 overflow-y-auto`
};
var Ln = 400;
var Rn = 48;
let editor = window.screenshotToolAPI.editor,
  l_0 = p(null),
  T_1 = p(null),
  P_2 = p(null),
  I_3 = S({
    ...me
  }),
  L_4 = S([]),
  oe_5 = S([]),
  se_6 = S(``),
  z_7 = S(`style`),
  items = S(null),
  ue_8 = S(null),
  de_9 = S(null),
  fe_10 = S({
    width: 0,
    height: 0
  }),
  B_11 = S(null),
  pe_12 = S(false),
  V_13 = S(0),
  we_14 = S(-1),
  H_15 = S(``),
  U_16 = S(null),
  W_17 = j(() => Math.max(1, l_0.value?.scale ?? 1)),
  K = pn(() => W_17.value),
  Ke = De(),
  qe = false,
  Je = false,
  q = null,
  J = null,
  Xe = 0,
  Ze = null,
  emptyItems = [],
  Y = j(() => T_1.value ? Me({
    source: T_1.value,
    scale: W_17.value,
    style: I_3.value,
    balance: P_2.value
  }) : null),
  X = j(() => {
    let value = Y.value;
    if (!value) return null;
    let t = Math.max(40, fe_10.value.width - Rn),
      n = Math.max(40, fe_10.value.height - Rn),
      r = Math.min(t / value.width, n / value.height, 1 / W_17.value);
    return {
      width: Math.max(1, Math.round(value.width * r)),
      height: Math.max(1, Math.round(value.height * r))
    };
  }),
  $e = j(() => Y.value && X.value ? Y.value.width / X.value.width : 1),
  et = j(() => {
    let value = K.editingTextId.value,
      t = K.annotations.value.find(item => item.id === value);
    return t?.kind === `text` ? t : null;
  }),
  tt = j(() => {
    let value = et.value,
      t = Y.value;
    if (!value || !t) return null;
    let n = 1 / $e.value,
      r = value.size * n;
    return {
      left: `${(t.origin.x + value.x) * n}px`,
      top: `${(t.origin.y + value.y) * n}px`,
      fontSize: `${r}px`,
      lineHeight: `1.3`,
      color: value.color,
      fontFamily: Oe,
      fontWeight: `600`,
      minWidth: `${Math.max(24, r * 2)}px`
    };
  }),
  nt = j(() => H_15.value ? H_15.value : K.tool.value === `select` ? `default` : K.tool.value === `text` ? `text` : `crosshair`),
  rt = j(() => B_11.value ? G(`StatusExporting`) : we_14.value === V_13.value ? G(`StatusCopied`) : we_14.value >= 0 ? G(`StatusChanged`) : G(`StatusIdle`)),
  it = j(() => Y.value ? `${Y.value.width} × ${Y.value.height}` : ``),
  at = j(() => I_3.value.enabled && I_3.value.backgroundKind === `transparent`),
  ot = j(() => [{
    tool: `select`,
    icon: ye,
    label: G(`ToolSelect`),
    key: `V`
  }, {
    tool: `rect`,
    icon: a_19,
    label: G(`ToolRect`),
    key: `R`
  }, {
    tool: `ellipse`,
    icon: o_20,
    label: G(`ToolEllipse`),
    key: `O`
  }, {
    tool: `arrow`,
    icon: We,
    label: G(`ToolArrow`),
    key: `A`
  }, {
    tool: `line`,
    icon: s_21,
    label: G(`ToolLine`),
    key: `L`
  }, {
    tool: `pen`,
    icon: i_18,
    label: G(`ToolPen`),
    key: `P`
  }, {
    tool: `highlighter`,
    icon: Ue,
    label: G(`ToolHighlighter`),
    key: `H`
  }, {
    tool: `text`,
    icon: t,
    label: G(`ToolText`),
    key: `T`
  }, {
    tool: `number`,
    icon: _e,
    label: G(`ToolNumber`),
    key: `N`
  }, {
    tool: `mosaic`,
    icon: He,
    label: G(`ToolMosaic`),
    key: `M`
  }]),
  st = [{
    level: `s`,
    dot: 4,
    label: `SizeSmall`
  }, {
    level: `m`,
    dot: 7,
    label: `SizeMedium`
  }, {
    level: `l`,
    dot: 10,
    label: `SizeLarge`
  }],
  ct = Be ? `⌘` : `Ctrl+`;
let value = Y.value;
function Z(e, t) {
  U_16.value = {
    message: e,
    action: t
  }, J !== null && window.clearTimeout(J), J = window.setTimeout(() => {
    U_16.value = null, J = null;
  }, t ? 4200 : 2200);
}
function Q() {
  Xe ||= requestAnimationFrame(() => {
    Xe = 0, ft();
  });
}
function gt(e) {
  if (e.button !== 0 || !l_0.value) return;
  let t = mt(e);
  t && (ue_8.value?.setPointerCapture(e.pointerId), K.pointerDown(t, ht()), Q(), K.editingTextId.value && bt());
}
function _t(e) {
  let t = mt(e);
  if (t) {
    if (K.isInteracting()) {
      K.pointerMove(t, e.shiftKey), Q();
      return;
    }
    K.handleAt(t, ht()) ? H_15.value = `grab` : K.tool.value === `select` && K.topHit(t, ht()) ? H_15.value = `move` : H_15.value = ``;
  }
}
function vt() {
  K.pointerUp(), Q();
}
function yt(e) {
  let t = mt(e);
  t && (K.doubleClick(t, ht()), Q(), K.editingTextId.value && bt());
}
function xt(e) {
  e.stopPropagation(), !e.isComposing && (e.key === `Enter` && !e.shiftKey || e.key === `Escape`) && (e.preventDefault(), K.finishTextEditing(), Q());
}
function St() {
  K.finishTextEditing(), Q();
}
async function Dt(e, t = false) {
  await Tt(`copy`, async (r, i_18) => {
    Et(await editor.copy({
      id: i_18,
      image: r
    })), e ? Mt() : t || Z(G(`ToastCopied`));
  });
}
async function Ot(e) {
  await Tt(`save`, async (t, r) => {
    let i_18 = Et(await editor.save({
      id: r,
      image: t,
      saveAs: e
    }));
    if (!i_18) return;
    let a_19 = i_18.filePath.split(/[\\/]/).pop() || i_18.filePath;
    Z(G(`ToastSaved`, {
      name: a_19
    }), {
      label: G(`ToastReveal`),
      run: () => editor.revealFile(i_18.filePath)
    });
  });
}
async function kt() {
  await Tt(`pin`, async (e, t) => {
    Et(await editor.pin({
      id: t,
      image: e
    })), Z(G(`ToastPinned`));
  });
}
async function At() {
  await Tt(`bot`, async (e, t) => {
    $(), Et(await editor.sendToBot({
      id: t,
      image: e
    }));
  });
}
function $() {
  q !== null && (window.clearTimeout(q), q = null);
  let value = l_0.value;
  value && editor.updateState({
    id: value.id,
    style: lt(),
    annotations: JSON.parse(JSON.stringify(K.annotations.value))
  });
}
async function Nt(e) {
  if (!pe_12.value) {
    pe_12.value = true;
    try {
      L_4.value = Et(await editor.savePreset({
        name: e,
        style: lt()
      })), Z(G(`PresetSaved`));
    } catch (e) {
      Z(G(`ToastFailed`, {
        reason: ut(e)
      }));
    } finally {
      pe_12.value = false;
    }
  }
}
async function Pt(e) {
  try {
    L_4.value = Et(await editor.deletePreset({
      id: e
    }));
  } catch (e) {
    Z(G(`ToastFailed`, {
      reason: ut(e)
    }));
  }
}
let target = e.target;
function lt() {
  return JSON.parse(JSON.stringify(I_3.value));
}
function ut(e) {
  return e instanceof Error && e.message ? e.message : String(e);
}
function ft() {
  let value = ue_8.value,
    t = Y.value,
    n = T_1.value,
    r = X.value;
  if (!value || !t || !n || !r) return;
  let i_18 = window.devicePixelRatio || 1,
    a_19 = Math.min(1, r.width * i_18 / t.width),
    o_20 = Math.max(1, Math.round(t.width * a_19)),
    s_21 = Math.max(1, Math.round(t.height * a_19));
  (value.width !== o_20 || value.height !== s_21) && (value.width = o_20, value.height = s_21);
  let c = ke(value);
  c.setTransform(1, 0, 0, 1, 0, 0), Te(c, {
    source: n,
    scale: W_17.value,
    style: I_3.value,
    annotations: K.visibleAnnotations.value,
    balance: P_2.value,
    onBackgroundLoaded: Q,
    hiddenAnnotationId: K.editingTextId.value
  }, t, a_19, Ke), pt(c, a_19);
}
let i_18 = window.devicePixelRatio || 1,
  a_19 = Math.min(1, r.width * i_18 / t.width),
  o_20 = Math.max(1, Math.round(t.width * a_19)),
  s_21 = Math.max(1, Math.round(t.height * a_19));
function mt(e) {
  let value = ue_8.value,
    n = Y.value;
  if (!value || !n) return null;
  let boundingClientRect = value.getBoundingClientRect();
  return boundingClientRect.width <= 0 || boundingClientRect.height <= 0 ? null : {
    x: (e.clientX - boundingClientRect.left) / boundingClientRect.width * n.width - n.origin.x,
    y: (e.clientY - boundingClientRect.top) / boundingClientRect.height * n.height - n.origin.y
  };
}
function ht() {
  return 6 * $e.value;
}
async function bt() {
  await ee();
  let value = de_9.value;
  value && (value.focus(), value.setSelectionRange(value.value.length, value.value.length));
}
async function Tt(e, t) {
  let value = l_0.value;
  if (value && !B_11.value) {
    B_11.value = e;
    try {
      let r = V_13.value;
      await t(await wt(), value.id), e === `copy` && (we_14.value = r);
    } catch (e) {
      Z(G(`ToastFailed`, {
        reason: ut(e)
      }));
    } finally {
      B_11.value = null;
    }
  }
}
function Et(result) {
  if (!result.ok) throw Error(result.error.message);
  return result.data;
}
function Mt() {
  K.finishTextEditing(), $(), editor.close();
}
function pt(e, t) {
  let value = Y.value,
    r = K.selected.value;
  if (!value || !r || K.editingTextId.value === r.id) return;
  let handler = e => e * $e.value,
    a_19 = je(r),
    o_20 = handler(4);
  e.save(), e.setTransform(t, 0, 0, t, value.origin.x * t, value.origin.y * t), e.setLineDash([handler(4), handler(3)]), e.lineWidth = handler(1), e.strokeStyle = `#10b981`, e.strokeRect(a_19.x - o_20, a_19.y - o_20, a_19.width + o_20 * 2, a_19.height + o_20 * 2), e.setLineDash([]);
  for (let t of Ce(r)) e.beginPath(), e.arc(t.x, t.y, handler(5), 0, Math.PI * 2), e.fillStyle = `#ffffff`, e.fill(), e.lineWidth = handler(1.5), e.stroke();
  e.restore();
}
async function wt() {
  K.finishTextEditing();
  let value = T_1.value;
  if (!value) throw Error(G(`ActionFailed`));
  let {
    png: t
  } = await Ae({
    source: value,
    scale: W_17.value,
    style: I_3.value,
    annotations: K.annotations.value,
    balance: P_2.value
  });
  return t;
}
</script>
