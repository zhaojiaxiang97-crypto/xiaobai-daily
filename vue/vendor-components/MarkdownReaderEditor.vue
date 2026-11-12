<template>
<section><div :class="`mx-2 mt-2 flex shrink-0 flex-wrap items-center gap-0.5 rounded-md border border-black/8 bg-black/[0.02] p_8-1 dark:border-white/10 dark:bg-white/[0.03]`" role="toolbar" :aria-label="a_3(`toolboxNative.markdownFormattingTools`)"></div><div :class="[`relative flex min-h-0 min-w_12-0 flex-1`,props.lineNumbers?`[--editor-pad-left:12px]`:`[--editor-pad-left:24px]`]"><div :class="`relative shrink-0 select-none overflow-hidden text-xs tabular-nums text-muted-foreground/60`" :style="ne({width:oe_17.value})" aria-hidden="true"></div><div><div><div :class="`whitespace-pre-wrap pb-24 pr-6 pl-[var(--editor-pad-left)] pt-5 text-sm leading-[1.75] text-transparent [overflow-wrap:break-word] [tab-size:2]`" :style="ne({width:ee_9.value,transform:`translateY(${-l_7.value}px)`})"></div></div><textarea ref="o_4" spellcheck="false" :class="`relative block h-full min-h-0 w_12-full min-w_12-0 resize-none overflow-y-auto border-0 bg-transparent pb-24 pl-[var(--editor-pad-left)] pr-6 pt-5 text-sm leading-[1.75] text-foreground outline-none [caret-color:var(--primary)] [scrollbar-gutter:stable] [tab-size:2] placeholder:text-muted-foreground/70 selection:bg-primary/20`" :placeholder="a_3(`toolboxNative.markdownEditorPlaceholder`)" :aria-label="a_3(`toolboxNative.markdownEditorLabel`)" @input="me" @compositionstart="e=>te_11.value=true" @compositionend="z" @blur="he" @keydown="B" @keyup="le" @mouseup="le" @scroll="be"></textarea></div><div ref="s_5" :class="`pointer-events-none invisible absolute left-0 top-0 whitespace-pre-wrap text-sm leading-[1.75] [overflow-wrap:break-word] [tab-size:2]`" aria-hidden="true"></div></div></section>
</template>

<script setup>
import { normalizeClass as u, unref as d, renderSlot as p, createTextVNode as h, createElementBlock as g, renderList as _, watch as v, createBlock as x, Fragment as C, openBlock as T, defineComponent as E, onMounted as re, toDisplayString as A, onBeforeMount as ae, computed as M, createCommentVNode as N, createElementVNode as P } from 'vue';
// [符号说明] e~computed, a~computed, l~computed
import { B as e, U as r, at as a, lt as o, r as s, z as l } from '../vendor/ui/Switch.js';
import { t as R } from '../vendor/ui/icons/lucide-icons.js';
import { l as ce, s as le, t as ue } from '../vendor/i18n/i18n-helper.js';
import { i as de, n as fe, r as pe, t as me } from '../vendor/chunks/purify.es.js';
import { t as z } from '../vendor/chunks/check.js';
import { s as he } from '../vendor/ui/PopperContent.js';
import { t as ge } from '../vendor/chunks/chevron-up.js';
import { _ as _e, y as ve } from '../vendor/chunks/screenshot-beautifier.js';
import { n as ye, t as B } from '../vendor/ui/DropdownMenuItem.js';
import { t as be } from '../vendor/chunks/pen-line.js';
import { t as xe } from '../vendor/pages/ToolboxWorkspaceHeader.js';
import { n as Se, o as Ce, r as we, t as Te } from '../vendor/ui/DropdownMenuTrigger.js';
import { a as Ee, c as V, i as H, n as De } from '../vendor/ui/TooltipTrigger.js';
import { Fn as Be, Mn as Ve, Nn as He, gt as K, yn as ct } from '../vendor/chunks/main.js';

let modelValue = r_1.modelValue,
  line = [],
  i_0 = 0;
let modifierLabel = r_1.modifierLabel;
const props = defineProps({
  modelValue: {},
  lineNumbers: {
    type: Boolean
  },
  measureLines: {
    type: Boolean
  },
  modifierLabel: {},
  findMatches: {},
  findCurrent: {}
});
var mt = L_21(`link-2`, [[`path`, {
  d: `M9 17H7A5 5 0 0 1 7 7h2`,
  key: `8i5ue5`
}], [`path`, {
  d: `M15 7h2a5 5 0 1 1 0 10h-2`,
  key: `1b9ql8`
}], [`line`, {
  x1: `8`,
  x2: `16`,
  y1: `12`,
  y2: `12`,
  key: `1jonct`
}]]);
var _t = L_21(`quote`, [[`path`, {
  d: `M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z`,
  key: `rib7q0`
}], [`path`, {
  d: `M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z`,
  key: `1ymkrd`
}]]);
var Tt = `  `;
var Et = /^(\s*(?:>\s?)*)(\s*)([-*+]|\d+[.)])(\s+)(\[[ xX]\]\s+)?/;
var Dt = {
  bold: `**`,
  italic: `*`,
  strike: `~~`,
  code: "`"
};
function Ot(items, t_22, n_23) {
  let r_1 = t_22 === 0 ? 0 : items.lastIndexOf(`
`, t_22 - 1) + 1,
    i_0_2 = n_23 > t_22 && items[n_23 - 1] === `
` ? n_23 - 1 : n_23,
    a_3 = items.indexOf(`
`, i_0_2);
  return {
    lineStart: r_1,
    lineEnd: a_3 === -1 ? items.length : a_3
  };
}
function kt(text, items) {
  let {
      text: n_23,
      start: r_1,
      end: i_0_2
    } = text,
    {
      lineStart: a_3,
      lineEnd: o_4
    } = Ot(n_23, r_1, i_0_2),
    s_5 = n_23.slice(a_3, o_4),
    c_6 = s_5.split(`
`),
    l_7 = items.startsWith(`h`) ? Number(items.slice(1)) : 0,
    u = l_7 ? RegExp(`^#{${l_7}}\\s+`) : null,
    d = items === `unordered-list` ? /^[-*+]\s+(?!\[[ xX]\]\s+)/ : items === `ordered-list` ? /^\d+[.)]\s+/ : items === `task-list` ? /^[-*+]\s+\[[ xX]\]\s+/ : null,
    f = c_6.map(item => item.match(/^(\s*)(.*)$/)?.[2] || ``).filter(item => item.trim()),
    p_8 = f.length > 0 && f.every(item => u ? u.test(item) : d ? d.test(item) : items === `quote` && /^>\s?/.test(item)),
    m = 1,
    h = c_6.map(item => {
      let n_23 = item.match(/^(\s*)(.*)$/),
        r_1 = n_23?.[1] || ``,
        i_0_2 = n_23?.[2] || ``;
      if (!i_0_2.trim() && c_6.length > 1) return item;
      let a_3 = i_0_2;
      return a_3 = l_7 ? a_3.replace(/^#{1,6}\s+/, ``) : items === `quote` ? a_3.replace(/^>\s?/, ``) : a_3.replace(/^(?:[-*+]\s+(?:\[[ xX]\]\s+)?|\d+[.)]\s+)/, ``), p_8 ? `${r_1}${a_3}` : l_7 ? `${r_1}${`#`.repeat(l_7)} ${a_3}` : items === `unordered-list` ? `${r_1}- ${a_3}` : items === `task-list` ? `${r_1}- [ ] ${a_3}` : items === `quote` ? `${r_1}> ${a_3}` : `${r_1}${m++}. ${a_3}`;
    }).join(`
`);
  if (r_1 === i_0_2) {
    let e = Math.max(a_3, Math.min(a_3 + h.length, r_1 + h.length - s_5.length));
    return {
      start: a_3,
      end: o_4,
      replacement: h,
      selectionStart: e,
      selectionEnd: e
    };
  }
  return {
    start: a_3,
    end: o_4,
    replacement: h,
    selectionStart: a_3,
    selectionEnd: a_3 + h.length
  };
}
function At(e) {
  return e === `bold` ? /\*\*(?=\S)(.+?)(?<=\S)\*\*/g : e === `strike` ? /~~(?=\S)(.+?)(?<=\S)~~/g : e === `code` ? /`([^`\n]+)`/g : /(?<![*\w])\*(?!\*)(?=\S)(.+?)(?<=[^\s*])\*(?![*\w])|(?<![_\w])_(?=\S)(.+?)(?<=\S)_(?![_\w])/g;
}
function jt(items, t_22, n_23, r_1) {
  let {
    lineStart: i_0_2,
    lineEnd: a_3
  } = Ot(items, t_22, t_22);
  if (n_23 > a_3) return null;
  let o_4 = items.slice(i_0_2, a_3);
  for (let filePath of o_4.matchAll(At(r_1))) {
    let r_1 = i_0_2 + (filePath.index ?? 0),
      a_3 = r_1 + filePath[0].length;
    if (r_1 <= t_22 && n_23 <= a_3) return {
      start: r_1,
      end: a_3
    };
  }
  return null;
}
function Mt(e, t_22) {
  let {
      text: n_23,
      start: r_1,
      end: i_0_2
    } = e,
    a_3 = n_23.slice(r_1, i_0_2);
  if (t_22 === `code` && a_3.includes(`
`)) {
    if (a_3.startsWith("```") && a_3.trimEnd().endsWith("```")) {
      let e = a_3.replace(/^```[^\n]*\n?/, ``).replace(/\n?```\s*$/, ``);
      return {
        start: r_1,
        end: i_0_2,
        replacement: e,
        selectionStart: r_1,
        selectionEnd: r_1 + e.length
      };
    }
    return {
      start: r_1,
      end: i_0_2,
      replacement: `\`\`\`\n${a_3.replace(/\n$/, ``)}\n\`\`\``,
      selectionStart: r_1 + 4,
      selectionEnd: r_1 + 4 + a_3.replace(/\n$/, ``).length
    };
  }
  let o_4 = Dt[t_22],
    s_5 = jt(n_23, r_1, i_0_2, t_22);
  if (s_5) {
    let e = t_22 === `italic` ? 1 : o_4.length,
      a_3 = n_23.slice(s_5.start + e, s_5.end - e),
      c_6 = Math.min(Math.max(r_1 - s_5.start - e, 0), a_3.length),
      l_7 = Math.min(Math.max(i_0_2 - s_5.start - e, 0), a_3.length);
    return {
      start: s_5.start,
      end: s_5.end,
      replacement: a_3,
      selectionStart: s_5.start + c_6,
      selectionEnd: s_5.start + l_7
    };
  }
  if (a_3.length >= o_4.length * 2 && a_3.startsWith(o_4) && a_3.endsWith(o_4)) {
    let e = a_3.slice(o_4.length, a_3.length - o_4.length);
    return {
      start: r_1,
      end: i_0_2,
      replacement: e,
      selectionStart: r_1,
      selectionEnd: r_1 + e.length
    };
  }
  return {
    start: r_1,
    end: i_0_2,
    replacement: `${o_4}${a_3}${o_4}`,
    selectionStart: r_1 + o_4.length,
    selectionEnd: r_1 + o_4.length + a_3.length
  };
}
function Nt(e) {
  let {
      text: t_22,
      start: n_23,
      end: r_1
    } = e,
    i_0_2 = t_22.slice(n_23, r_1);
  if (/^https?:\/\/\S+$/.test(i_0_2)) return {
    start: n_23,
    end: r_1,
    replacement: `[](${i_0_2})`,
    selectionStart: n_23 + 1,
    selectionEnd: n_23 + 1
  };
  let a_3 = `[${i_0_2}](https://)`;
  if (!i_0_2) return {
    start: n_23,
    end: r_1,
    replacement: a_3,
    selectionStart: n_23 + 1,
    selectionEnd: n_23 + 1
  };
  let o_4 = n_23 + i_0_2.length + 3;
  return {
    start: n_23,
    end: r_1,
    replacement: a_3,
    selectionStart: o_4,
    selectionEnd: o_4 + 8
  };
}
function Pt(items, t_22) {
  let {
      text: n_23,
      start: r_1,
      end: i_0_2
    } = items,
    includes = n_23.slice(r_1, i_0_2).includes(`
`),
    {
      lineStart: o_4,
      lineEnd: s_5
    } = Ot(n_23, r_1, i_0_2),
    c_6 = n_23.slice(o_4, s_5);
  if (!t_22 && !includes && !Et.test(c_6)) return {
    start: r_1,
    end: i_0_2,
    replacement: Tt,
    selectionStart: r_1 + 2,
    selectionEnd: r_1 + 2
  };
  let l_7 = n_23.slice(o_4, s_5).split(`
`),
    u = 0,
    d = 0,
    f = l_7.map((item, n_23) => {
      if (!t_22) return !item.trim() && l_7.length > 1 ? item : (n_23 === 0 && (u = -2), d += 2, `${Tt}${item}`);
      let i_0_2 = item.startsWith(`	`) ? 1 : Math.min(2, item.length - item.trimStart().length);
      return n_23 === 0 && (u = Math.min(i_0_2, r_1 - o_4)), d -= i_0_2, item.slice(i_0_2);
    }).join(`
`);
  return d === 0 ? null : includes ? {
    start: o_4,
    end: s_5,
    replacement: f,
    selectionStart: o_4,
    selectionEnd: o_4 + f.length
  } : {
    start: o_4,
    end: s_5,
    replacement: f,
    selectionStart: Math.max(o_4, r_1 - u),
    selectionEnd: Math.max(o_4, i_0_2 + (t_22 ? -u : 2))
  };
}
function Ft(e) {
  let {
    text: t_22,
    start: n_23,
    end: r_1
  } = e;
  if (n_23 !== r_1) return null;
  let i_0_2 = n_23 === 0 ? 0 : t_22.lastIndexOf(`
`, n_23 - 1) + 1,
    a_3 = t_22.indexOf(`
`, n_23),
    o_4 = a_3 === -1 ? t_22.length : a_3,
    s_5 = t_22.slice(i_0_2, o_4),
    c_6 = t_22.slice(i_0_2, n_23),
    l_7 = Et.exec(s_5);
  if (l_7 && c_6.length >= l_7[0].length) {
    let [e, t_22, a_3, c_6, u, d] = l_7;
    if (!s_5.slice(e.length).trim() && n_23 === o_4) {
      let e = t_22.includes(`>`) ? `${t_22.trimEnd()} ` : ``;
      return {
        start: i_0_2,
        end: o_4,
        replacement: e,
        selectionStart: i_0_2 + e.length,
        selectionEnd: i_0_2 + e.length
      };
    }
    let f = /^(\d+)([.)])$/.exec(c_6),
      p_8 = `\n${t_22}${a_3}${f ? `${Number(f[1]) + 1}${f[2]}` : c_6}${u}${d ? `[ ] ` : ``}`;
    return {
      start: n_23,
      end: r_1,
      replacement: p_8,
      selectionStart: n_23 + p_8.length,
      selectionEnd: n_23 + p_8.length
    };
  }
  let u = /^(\s*(?:>\s?)+)/.exec(s_5);
  if (u && c_6.length >= u[1].length) {
    if (!s_5.slice(u[1].length).trim() && n_23 === o_4) return {
      start: i_0_2,
      end: o_4,
      replacement: ``,
      selectionStart: i_0_2,
      selectionEnd: i_0_2
    };
    let e = `\n${u[1].endsWith(` `) ? u[1] : `${u[1]} `}`;
    return {
      start: n_23,
      end: r_1,
      replacement: e,
      selectionStart: n_23 + e.length,
      selectionEnd: n_23 + e.length
    };
  }
  return null;
}
function Lt(e) {
  let {
      text: t_22,
      start: n_23,
      end: r_1
    } = e,
    i_0_2 = new Set(),
    a_3 = n_23 === 0 ? 0 : t_22.lastIndexOf(`
`, n_23 - 1) + 1,
    o_4 = t_22.indexOf(`
`, a_3),
    s_5 = t_22.slice(a_3, o_4 === -1 ? t_22.length : o_4).replace(/^\s+/, ``),
    c_6 = /^(#{1,3})\s/.exec(s_5);
  c_6 && i_0_2.add(`h${c_6[1].length}`), /^[-*+]\s+\[[ xX]\]\s/.test(s_5) ? i_0_2.add(`task-list`) : /^[-*+]\s/.test(s_5) && i_0_2.add(`unordered-list`), /^\d+[.)]\s/.test(s_5) && i_0_2.add(`ordered-list`), /^>/.test(s_5) && i_0_2.add(`quote`);
  for (let e of [`bold`, `italic`, `strike`, `code`]) jt(t_22, n_23, r_1, e) && i_0_2.add(e);
  return i_0_2;
}
function fn(items) {
  let t_22 = [0];
  for (let n_23 = items.indexOf(`
`); n_23 >= 0; n_23 = items.indexOf(`
`, n_23 + 1)) t_22.push(n_23 + 1);
  return t_22;
}
function pn(e, t_22) {
  let n_23 = 0,
    r_1 = e.length - 1;
  for (; n_23 < r_1;) {
    let i_0_2 = n_23 + r_1 + 1 >> 1;
    e[i_0_2] <= t_22 ? n_23 = i_0_2 : r_1 = i_0_2 - 1;
  }
  return n_23;
}
var kn = {
  class: `flex min-h-0 min-w-0 flex-1 flex-col`
};
var An = [`aria-label`];
var jn = {
  key: 0,
  class: `mx-px h-3.5 w-px shrink-0 bg-black/8 dark:bg-white/10`
};
var Mn = {
  key: 1,
  class: `text-[10px] font-bold`
};
var Nn = {
  class: `relative min-h-0 min-w-0 flex-1`
};
var Pn = {
  key: 0,
  class: `pointer-events-none absolute inset-0 overflow-hidden`,
  "aria-hidden": `true`
};
var Fn = [`placeholder`, `aria-label`];
var Q = 20;
var In = 3e4;
let r_1 = event,
  i_0_2 = n_23,
  {
    t: a_3
  } = ue(),
  o_4 = S(null),
  s_5 = S(null),
  c_6 = f([]),
  l_7 = S(0),
  p_8 = S(0),
  ee_9 = S(`100%`),
  b_10 = S({
    start: 0,
    end: 0
  }),
  te_11 = S(false),
  w_12 = null,
  E_13 = null,
  D_14 = false,
  options = M(() => fn(r_1.modelValue)),
  k_15 = M(() => options.value.length),
  j_16 = M(() => pn(options.value, b_10.value.start)),
  oe_17 = M(() => `${Math.max(2, String(k_15.value).length) * 8 + 20}px`),
  F_18 = M(() => Lt({
    text: r_1.modelValue,
    start: b_10.value.start,
    end: b_10.value.end
  })),
  I_19 = M(() => {
    let e = r_1.findMatches || [];
    if (!e.length) return [];
    let modelValue = r_1.modelValue,
      line = [],
      i_0_2 = 0;
    for (let [a_3, o_4] of e.entries()) o_4.start < i_0_2 || o_4.end > modelValue.length || (o_4.start > i_0_2 && line.push({
      text: modelValue.slice(i_0_2, o_4.start),
      mark: false,
      current: false
    }), line.push({
      text: modelValue.slice(o_4.start, o_4.end),
      mark: true,
      current: a_3 === r_1.findCurrent
    }), i_0_2 = o_4.end);
    return line.push({
      text: `${modelValue.slice(i_0_2)}null`,
      mark: false,
      current: false
    }), line;
  }),
  se_20 = M(() => {
    let modifierLabel = r_1.modifierLabel;
    return [[{
      key: `h1`,
      text: `H1`,
      label: a_3(`toolboxNative.markdownHeading1`)
    }, {
      key: `h2`,
      text: `H2`,
      label: a_3(`toolboxNative.markdownHeading2`)
    }, {
      key: `h3`,
      text: `H3`,
      label: a_3(`toolboxNative.markdownHeading3`)
    }], [{
      key: `bold`,
      icon: de,
      label: a_3(`toolboxNative.markdownBold`),
      shortcut: `${modifierLabel}B`
    }, {
      key: `italic`,
      icon: He,
      label: a_3(`toolboxNative.markdownItalic`),
      shortcut: `${modifierLabel}I`
    }, {
      key: `strike`,
      icon: ct,
      label: a_3(`toolboxNative.markdownStrike`)
    }], [{
      key: `unordered-list`,
      icon: fe,
      label: a_3(`toolboxNative.markdownUnorderedList`)
    }, {
      key: `ordered-list`,
      icon: ye,
      label: a_3(`toolboxNative.markdownOrderedList`)
    }, {
      key: `task-list`,
      icon: Ve,
      label: a_3(`toolboxNative.markdownTaskList`)
    }, {
      key: `quote`,
      icon: _t,
      label: a_3(`toolboxNative.markdownQuote`)
    }], [{
      key: `code`,
      icon: Be,
      label: a_3(`toolboxNative.markdownCode`)
    }, {
      key: `link`,
      icon: mt,
      label: a_3(`toolboxNative.markdownLink`),
      shortcut: `${modifierLabel}K`
    }]];
  }),
  L_21 = M(() => {
    if (!r_1.lineNumbers) return [];
    let value = c_6.value,
      t_22 = R(),
      n_23 = l_7.value - Q - 200,
      i_0_2 = l_7.value + p_8.value + 200,
      total = [];
    if (!value.length) {
      let e = Math.max(0, Math.floor(n_23 / t_22)),
        r_1 = Math.min(k_15.value - 1, Math.ceil(i_0_2 / t_22));
      for (let n_23 = e; n_23 <= r_1; n_23 += 1) total.push({
        line: n_23,
        top: n_23 * t_22 + Q - l_7.value
      });
      return total;
    }
    let o_4 = 0,
      s_5 = value.length - 1;
    for (; o_4 < s_5;) {
      let t_22 = o_4 + s_5 >> 1;
      value[t_22] < n_23 ? o_4 = t_22 + 1 : s_5 = t_22;
    }
    for (let t_22 = Math.max(0, o_4 - 1); t_22 < value.length && value[t_22] <= i_0_2; t_22 += 1) total.push({
      line: t_22,
      top: value[t_22] + Q - l_7.value
    });
    return total;
  });
let value = c_6.value,
  t_22 = R(),
  n_23 = l_7.value - Q - 200,
  i_0_24 = l_7.value + p_8.value + 200,
  total = [];
</script>
