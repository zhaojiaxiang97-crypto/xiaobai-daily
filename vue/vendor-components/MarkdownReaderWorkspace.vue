<template>
<component :is="qe" :value="state.value" :class="`gap-1 px-2 text-xs`" :title="state.label" />
</template>

<script setup>
import { normalizeClass as u, unref as d, renderSlot as p, createTextVNode as h, createElementBlock as g, renderList as _, watch as v, createBlock as x, Fragment as C, openBlock as T, defineComponent as E, onUnmounted as O, onMounted as re, toDisplayString as A, onBeforeMount as ae, computed as M, createCommentVNode as N, createElementVNode as P } from 'vue';
import { t as R } from '../vendor/ui/icons/lucide-icons.js';
import { l as ce, s as le, t as ue } from '../vendor/i18n/i18n-helper.js';
import { r as pe } from '../vendor/chunks/purify.es.js';
import { s as he } from '../vendor/ui/PopperContent.js';
import { _ as _e, y as ve } from '../vendor/chunks/screenshot-beautifier.js';
import { t as B } from '../vendor/ui/DropdownMenuItem.js';
import { t as be } from '../vendor/chunks/pen-line.js';
import { t as xe } from '../vendor/pages/ToolboxWorkspaceHeader.js';
import { n as Se, r as we, t as Te } from '../vendor/ui/DropdownMenuTrigger.js';
import { a as Ee, n as De } from '../vendor/ui/TooltipTrigger.js';
import { a as Ae, c as je, i as Me, n as Ne, r as Pe, t as Fe } from '../vendor/ui/alert-dialog.js';
import { n as Ie, t as W } from '../vendor/chunks/alert.js';
import { t as ze } from '../vendor/chunks/useGrowthTelemetry.js';
import { Pn as Ue, Sn as We, Wn as Ge, d as Ke, dn as qe, f as Je, fn as Ye, l as Ze, lt as Qe, n as q, p as tt, pn as nt, s as rt, t as it, u as at, wn as ot } from '../vendor/chunks/main.js';

var ut = L_16(`corner-up-left`, [[`path`, {
  d: `M20 20v-7a4 4 0 0 0-4-4H4`,
  key: `1nkjon`
}], [`path`, {
  d: `M9 14 4 9l5-5`,
  key: `102s5s`
}]]);
var dt = L_16(`file-code-corner`, [[`path`, {
  d: `M4 12.15V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2h-3.35`,
  key: `1wthlu`
}], [`path`, {
  d: `M14 2v5a1 1 0 0 0 1 1h5`,
  key: `wfsgrz`
}], [`path`, {
  d: `m5 16-3 3 3 3`,
  key: `331omg`
}], [`path`, {
  d: `m9 22 3-3-3-3`,
  key: `lsp7cz`
}]]);
var ft = L_16(`file-output`, [[`path`, {
  d: `M4.226 20.925A2 2 0 0 0 6 22h12a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v3.127`,
  key: `wfxp4w`
}], [`path`, {
  d: `M14 2v5a1 1 0 0 0 1 1h5`,
  key: `wfsgrz`
}], [`path`, {
  d: `m5 11-3 3`,
  key: `1dgrs4`
}], [`path`, {
  d: `m5 17-3-3h10`,
  key: `1mvvaf`
}]]);
var pt = L_16(`file-plus-corner`, [[`path`, {
  d: `M11.35 22H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v5.35`,
  key: `17jvcc`
}], [`path`, {
  d: `M14 2v5a1 1 0 0 0 1 1h5`,
  key: `wfsgrz`
}], [`path`, {
  d: `M14 19h6`,
  key: `bvotb8`
}], [`path`, {
  d: `M17 16v6`,
  key: `18yu1i`
}]]);
var ht = L_16(`panel-left-close`, [[`rect`, {
  width: `18`,
  height: `18`,
  x: `3`,
  y: `3`,
  rx: `2`,
  key: `afitv7`
}], [`path`, {
  d: `M9 3v18`,
  key: `fh3hqa`
}], [`path`, {
  d: `m16 15-3-3 3-3`,
  key: `14y99z`
}]]);
var gt = L_16(`panel-left-open`, [[`rect`, {
  width: `18`,
  height: `18`,
  x: `3`,
  y: `3`,
  rx: `2`,
  key: `afitv7`
}], [`path`, {
  d: `M9 3v18`,
  key: `fh3hqa`
}], [`path`, {
  d: `m14 9 3 3-3 3`,
  key: `8010ee`
}]]);
var vt = L_16(`square-split-horizontal`, [[`path`, {
  d: `M8 19H5c-1 0-2-1-2-2V7c0-1 1-2 2-2h3`,
  key: `lubmu8`
}], [`path`, {
  d: `M16 5h3c1 0 2 1 2 2v10c0 1-1 2-2 2h-3`,
  key: `1ag34g`
}], [`line`, {
  x1: `12`,
  x2: `12`,
  y1: `4`,
  y2: `20`,
  key: `1tx1rr`
}]]);
function It(items, t) {
  let n_68 = items[t];
  return n_68 !== ` ` && n_68 !== `x` && n_68 !== `X` || items[t - 1] !== `[` || items[t + 1] !== `]` ? null : `${items.slice(0, t)}${n_68 === ` ` ? `x` : ` `}${items.slice(t + 1)}`;
}
var Rt = 6e4;
var Y = text => new Set(text.split(/\s+/).filter(Boolean));
var X = Y_43(`true false null undefined nil None True False NaN Infinity`);
var zt = Y_43(`
  async await break case catch class const continue debugger default delete do else enum export extends
  finally for from function get if implements import in instanceof interface let new of package private
  protected public readonly return set static super switch this throw try type typeof var void while with
  yield as declare keyof namespace abstract satisfies
`);
var Bt = Y_43(`
  and as assert async await break class continue def del elif else except finally for from global if import
  in is lambda nonlocal not or pass raise return try while with yield match case self print
`);
var Vt = Y_43(`
  if then else elif fi for in do done while until case esac function return export local readonly unset
  echo cd source alias sudo exit set shift trap eval exec cat grep sed awk curl wget npm npx pnpm yarn node
  git brew apt pip python python3 mkdir rm cp mv ls chmod chown touch
`);
var Z = Y_43(`
  select from where and or not insert into values update set delete create table alter drop index view
  join left right inner outer full on group by order having limit offset as distinct union all case when
  then else end is null like in between exists primary key foreign references default unique begin commit
  rollback transaction with returning desc asc count sum avg min max
`);
var Ht = Y_43(`
  abstract break case catch class const continue default defer do else enum export extends extern final
  finally fn for func go goto if impl implements import in interface let loop match mod module mut namespace
  new package private protected pub public return select static struct super switch this throw throws
  trait try type typedef union unsafe use using var virtual void volatile where while yield val fun when
  object override lateinit suspend guard protocol extension self Self int long short char float double bool
  boolean string byte uint usize isize i32 i64 u32 u64 f32 f64 map chan range defer require include define
  echo function foreach elseif endif endforeach def end unless until module puts require_relative
`);
var Ut = Y_43(`important media import supports keyframes from to and not only screen print root`);
var Wt = {
  lineComments: [`//`],
  blockComments: [[`/*`, `*/`]]
};
var Gt = {
  javascript: {
    keywords: zt_45,
    literals: X_44,
    ...Wt_51,
    quotes: [`'`, `"`, "`"]
  },
  python: {
    keywords: Bt_46,
    literals: X_44,
    lineComments: [`#`],
    blockComments: [],
    quotes: [`'`, `"`],
    tripleQuotes: true
  },
  shell: {
    keywords: Vt_47,
    literals: Y_43(`true false`),
    lineComments: [`#`],
    blockComments: [],
    quotes: [`'`, `"`],
    shellVariables: true,
    hashNeedsBoundary: true,
    apostropheInWords: true
  },
  sql: {
    keywords: Z_48,
    literals: Y_43(`true false null`),
    lineComments: [`--`],
    blockComments: [[`/*`, `*/`]],
    quotes: [`'`, `"`, "`"],
    caseInsensitive: true
  },
  json: {
    keywords: new Set(),
    literals: Y_43(`true false null`),
    lineComments: [`//`],
    blockComments: [[`/*`, `*/`]],
    quotes: [`"`],
    jsonKeys: true
  },
  css: {
    keywords: Ut_50,
    literals: new Set(),
    ...Wt_51,
    quotes: [`'`, `"`]
  },
  clike: {
    keywords: Ht_49,
    literals: X_44,
    ...Wt_51,
    quotes: [`'`, `"`, "`"],
    apostropheInWords: true
  },
  ruby: {
    keywords: Ht_49,
    literals: X_44,
    lineComments: [`#`],
    blockComments: [],
    quotes: [`'`, `"`],
    apostropheInWords: true
  }
};
var Kt = {
  js: `javascript`,
  jsx: `javascript`,
  mjs: `javascript`,
  cjs: `javascript`,
  javascript: `javascript`,
  ts: `javascript`,
  tsx: `javascript`,
  typescript: `javascript`,
  vue: `markup`,
  py: `python`,
  python: `python`,
  python3: `python`,
  sh: `shell`,
  bash: `shell`,
  zsh: `shell`,
  shell: `shell`,
  console: `shell`,
  terminal: `shell`,
  fish: `shell`,
  ps1: `shell`,
  powershell: `shell`,
  sql: `sql`,
  mysql: `sql`,
  postgresql: `sql`,
  postgres: `sql`,
  sqlite: `sql`,
  json: `json`,
  jsonc: `json`,
  json5: `json`,
  css: `css`,
  scss: `css`,
  less: `css`,
  sass: `css`,
  html: `markup`,
  xml: `markup`,
  svg: `markup`,
  htm: `markup`,
  xhtml: `markup`,
  plist: `markup`,
  yaml: `yaml`,
  yml: `yaml`,
  toml: `yaml`,
  ini: `yaml`,
  env: `yaml`,
  properties: `yaml`,
  diff: `diff`,
  patch: `diff`,
  go: `clike`,
  golang: `clike`,
  java: `clike`,
  kotlin: `clike`,
  kt: `clike`,
  swift: `clike`,
  c: `clike`,
  h: `clike`,
  cpp: `clike`,
  "c++": `clike`,
  cc: `clike`,
  hpp: `clike`,
  cs: `clike`,
  csharp: `clike`,
  rust: `clike`,
  rs: `clike`,
  php: `clike`,
  dart: `clike`,
  scala: `clike`,
  groovy: `clike`,
  objc: `clike`,
  "objective-c": `clike`,
  rb: `ruby`,
  ruby: `ruby`,
  perl: `ruby`,
  r: `ruby`
};
function qt(text) {
  return Kt_53[text.trim().toLowerCase()] || null;
}
function Jt(e_69, t) {
  let n_68 = qt_54(t);
  return !n_68 || e_69.length > Rt_42 ? [{
    text: e_69
  }] : n_68 === `markup` ? Qt_59(e_69) : n_68 === `yaml` ? $t_60(e_69) : n_68 === `diff` ? en_61(e_69) : Zt_58(e_69, Gt_52[n_68]);
}
var Yt = class {
  tokens = [];
  plain = ``;
  push(e_69, t) {
    if (e_69) {
      if (!t) {
        this.plain += e_69;
        return;
      }
      this.flush(), this.tokens.push({
        text: e_69,
        type: t
      });
    }
  }
  flush() {
    this.plain &&= (this.tokens.push({
      text: this.plain
    }), ``);
  }
  result() {
    return this.flush(), this.tokens;
  }
};
function Xt(text, t, n_68) {
  let r_0 = t + n_68.length;
  for (; r_0 < text.length;) {
    let t = text[r_0];
    if (t === `\\`) {
      r_0 += 2;
      continue;
    }
    if (text.startsWith(n_68, r_0)) return r_0 + n_68.length;
    if (t === `
` && n_68.length === 1 && n_68 !== "`") return r_0;
    r_0 += 1;
  }
  return text.length;
}
function Zt(items, t) {
  let n_68 = new Yt_56(),
    r_0 = 0;
  for (; r_0 < items.length;) {
    let i_1 = items[r_0],
      a_2 = r_0 > 0 ? items[r_0 - 1] : `
`,
      o = t.blockComments.find(([t]) => items.startsWith(t, r_0));
    if (o) {
      let t = items.indexOf(o[1], r_0 + o[0].length),
        i_1 = t < 0 ? items.length : t + o[1].length;
      n_68.push(items.slice(r_0, i_1), `comment`), r_0 = i_1;
      continue;
    }
    let s = t.lineComments.find(item => items.startsWith(item, r_0));
    if (s && (!(t.hashNeedsBoundary && s === `#`) || /\s/.test(a_2))) {
      let t = items.indexOf(`
`, r_0),
        i_1 = t < 0 ? items.length : t;
      n_68.push(items.slice(r_0, i_1), `comment`), r_0 = i_1;
      continue;
    }
    if (t.tripleQuotes && (items.startsWith(`"""`, r_0) || items.startsWith(`'''`, r_0))) {
      let t = items.slice(r_0, r_0 + 3),
        i_1 = items.indexOf(t, r_0 + 3),
        a_2 = i_1 < 0 ? items.length : i_1 + 3;
      n_68.push(items.slice(r_0, a_2), `string`), r_0 = a_2;
      continue;
    }
    if (t.quotes.includes(i_1) && !(i_1 === `'` && t.apostropheInWords && /[A-Za-z0-9]/.test(a_2))) {
      let a_2 = Xt_57(items, r_0, i_1),
        o = items.slice(r_0, a_2),
        s = t.jsonKeys && /^\s*:/.test(items.slice(a_2, a_2 + 20));
      n_68.push(o, s ? `key` : `string`), r_0 = a_2;
      continue;
    }
    if (t.shellVariables && i_1 === `$`) {
      let t = /^\$(?:\{[^}\n]*\}|[A-Za-z_][\w]*|[0-9@#?*!$-])/.exec(items.slice(r_0));
      if (t) {
        n_68.push(t[0], `variable`), r_0 += t[0].length;
        continue;
      }
    }
    if (/[0-9]/.test(i_1) && !/[\w$]/.test(a_2)) {
      let t = /^(?:0[xX][\da-fA-F_]+|0[bB][01_]+|\d[\d_]*(?:\.\d[\d_]*)?(?:[eE][+-]?\d+)?)[a-zA-Z%]*/.exec(items.slice(r_0));
      if (t) {
        n_68.push(t[0], `number`), r_0 += t[0].length;
        continue;
      }
    }
    if (/[A-Za-z_$@]/.test(i_1)) {
      let i_1 = /^[A-Za-z_$@][\w$-]*/.exec(items.slice(r_0));
      if (i_1) {
        let e_69 = i_1[0];
        !t.shellVariables && t !== Gt_52.css && (e_69 = e_69.replace(/-.*$/, ``));
        let a_2 = t.caseInsensitive ? e_69.toLowerCase() : e_69,
          o = a_2.replace(/^@/, ``);
        t.literals.has(a_2) ? n_68.push(e_69, `literal`) : t.keywords.has(a_2) || t.keywords.has(o) ? n_68.push(e_69, `keyword`) : n_68.push(e_69), r_0 += e_69.length;
        continue;
      }
    }
    n_68.push(i_1), r_0 += 1;
  }
  return n_68.result();
}
function Qt(items) {
  let t = new Yt_56(),
    n_68 = 0;
  for (; n_68 < items.length;) {
    if (items.startsWith(`<!--`, n_68)) {
      let r_0 = items.indexOf(`-->`, n_68 + 4),
        i_1 = r_0 < 0 ? items.length : r_0 + 3;
      t.push(items.slice(n_68, i_1), `comment`), n_68 = i_1;
      continue;
    }
    let r_0 = /^<\/?[A-Za-z][\w:.-]*/.exec(items.slice(n_68));
    if (r_0) {
      for (t.push(r_0[0], `tag`), n_68 += r_0[0].length; n_68 < items.length && items[n_68] !== `>` && items[n_68] !== `<`;) {
        let r_0 = items[n_68];
        if (r_0 === `"` || r_0 === `'`) {
          let i_1 = Xt_57(items, n_68, r_0);
          t.push(items.slice(n_68, i_1), `string`), n_68 = i_1;
          continue;
        }
        let i_1 = /^[A-Za-z_:@#][\w:.@#-]*/.exec(items.slice(n_68));
        if (i_1) {
          t.push(i_1[0], `attr`), n_68 += i_1[0].length;
          continue;
        }
        t.push(r_0), n_68 += 1;
      }
      items[n_68] === `>` && (t.push(`>`, `tag`), n_68 += 1);
      continue;
    }
    t.push(items[n_68]), n_68 += 1;
  }
  return t.result();
}
function $t(text) {
  let t = new Yt_56();
  for (let [n_68, r_0] of text.split(`
`).entries()) {
    n_68 > 0 && t.push(`
`);
    let e_69 = /(^|\s)#/.exec(r_0),
      i_1 = e_69 ? r_0.slice(0, e_69.index + e_69[1].length) : r_0,
      a_2 = /^(\s*(?:-\s+)?)([^\s:#][^:#]*?)(\s*[:=])(?=\s|$)/.exec(i_1),
      o = i_1;
    a_2 ? (t.push(a_2[1]), t.push(a_2[2], `key`), t.push(a_2[3]), o = i_1.slice(a_2[0].length)) : /^\s*\[.*\]\s*$/.test(i_1) && (t.push(i_1, `meta`), o = ``);
    for (let e_69 of Zt_58(o, {
      keywords: new Set(),
      literals: Y_43(`true false null yes no on off ~`),
      lineComments: [],
      blockComments: [],
      quotes: [`'`, `"`]
    })) t.push(e_69.text, e_69.type);
    e_69 && t.push(r_0.slice(e_69.index + e_69[1].length), `comment`);
  }
  return t.result();
}
function en(text) {
  let t = new Yt_56();
  for (let [n_68, r_0] of text.split(`
`).entries()) n_68 > 0 && t.push(`
`), /^(\+\+\+|---|diff |index )/.test(r_0) || r_0.startsWith(`@@`) ? t.push(r_0, `meta`) : r_0.startsWith(`+`) ? t.push(r_0, `addition`) : r_0.startsWith(`-`) ? t.push(r_0, `deletion`) : t.push(r_0);
  return t.result();
}
var tn = `a.abbr.b.blockquote.br.code.dd.del.details.div.dl.dt.em.figcaption.figure.h1.h2.h3.h4.h5.h6.hr.i.img.input.kbd.li.mark.ol.p.pre.s.small.span.strike.strong.sub.summary.sup.table.tbody.td.th.thead.tr.u.ul`.split(`.`);
var nn = [`align`, `alt`, `checked`, `class`, `colspan`, `disabled`, `href`, `id`, `open`, `rowspan`, `src`, `start`, `title`, `type`];
var rn = `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="9" y="9" width="10" height="10" rx="2"></rect><path d="M15 9V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"></path></svg>`;
var an = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 12 4 4 8-8"></path></svg>`;
var on = /[^\p{L}\p{M}\p{N}\p{Pc}\- ]/gu;
function sn(text) {
  return text.trim().toLowerCase().replace(on_66, ``).replace(/ /g, `-`);
}
var cn = class {
  occurrences = new Map();
  slug(e_69) {
    let t = sn_67(e_69) || `section`,
      n_68 = t;
    for (; this.occurrences.has(n_68);) {
      let e_69 = (this.occurrences.get(t) ?? 0) + 1;
      this.occurrences.set(t, e_69), n_68 = `${t}-${e_69}`;
    }
    return this.occurrences.set(n_68, 0), n_68;
  }
};
function ln(e_69) {
  let t = 2166136261;
  for (let n_68 = 0; n_68 < e_69.length; n_68 += 1) t ^= e_69.charCodeAt(n_68), t = Math.imul(t, 16777619);
  return (t >>> 0).toString(36);
}
function un(e_69) {
  return e_69.replace(/&/g, `&amp;`).replace(/"/g, `&quot;`).replace(/</g, `&lt;`);
}
function dn(e_69) {
  return e_69.replace(/&/g, `&amp;`).replace(/</g, `&lt;`).replace(/>/g, `&gt;`).replace(/"/g, `&quot;`);
}
function fn(items) {
  let t = [0];
  for (let n_68 = items.indexOf(`
`); n_68 >= 0; n_68 = items.indexOf(`
`, n_68 + 1)) t.push(n_68 + 1);
  return t;
}
function pn(e_69, t) {
  let n_68 = 0,
    r_0 = e_69.length - 1;
  for (; n_68 < r_0;) {
    let i_1 = n_68 + r_0 + 1 >> 1;
    e_69[i_1] <= t ? n_68 = i_1 : r_0 = i_1 - 1;
  }
  return n_68;
}
function mn(e_69) {
  return /^https?:\/\//i.test(e_69);
}
function hn(e_69) {
  return /^data:image\/(png|jpeg|gif|webp|bmp);base64,/i.test(e_69);
}
function gn(text, t) {
  let emptyItems = [],
    r_0 = text.split(`
`),
    i_1 = 0,
    resolvedValue = null;
  for (let [e_69, o] of r_0.entries()) {
    let s = /^\s*(?:>\s?)*\s*(`{3,}|~{3,})/.exec(o);
    if (s) {
      let e_69 = s[1][0];
      resolvedValue ? resolvedValue === e_69 && (resolvedValue = null) : resolvedValue = e_69;
    } else if (!resolvedValue) {
      let a_2 = t(o, r_0[e_69 + 1]);
      a_2 !== null && emptyItems.push(i_1 + a_2);
    }
    i_1 += o.length + 1;
  }
  return emptyItems;
}
function _n(text) {
  return gn(text, (e_69, t) => /^\s{0,3}(?:>\s?)*\s{0,3}#{1,6}(?:\s|$)/.test(e_69) || /<h[1-6][\s>]/i.test(e_69) || e_69.trim() && t !== undefined && /^\s{0,3}(?:>\s?)*\s{0,3}(?:=+|-{2,})\s*$/.test(t) ? 0 : null);
}
var vn = /^(\s*(?:>\s?)*\s*(?:[-*+]|\d+[.)])\s+\[)([ xX])\]/;
function yn(e_69) {
  return gn(e_69, e_69 => {
    let t = vn.exec(e_69);
    return t ? t[1].length : null;
  });
}
var bn = /\*\*(?=[^\s*])([^*\n]*?[^\s*])\*\*/g;
function xn(el) {
  let ownerDocument = el.ownerDocument,
    treeWalker = ownerDocument.createTreeWalker(el, NodeFilter.SHOW_TEXT),
    count = [];
  for (; treeWalker.nextNode();) {
    let currentNode = treeWalker.currentNode;
    currentNode.data.includes(`**`) && !currentNode.parentElement?.closest(`code, pre, kbd`) && count.push(currentNode);
  }
  for (let e_69 of count) {
    let data = e_69.data,
      r_0 = Array.from(data.matchAll(bn));
    if (!r_0.length) continue;
    let documentFragment = ownerDocument.createDocumentFragment(),
      a_2 = 0;
    for (let e_69 of r_0) {
      let r_0 = e_69.index ?? 0;
      documentFragment.append(data.slice(a_2, r_0));
      let element = ownerDocument.createElement(`strong`);
      element.textContent = e_69[1], documentFragment.append(element), a_2 = r_0 + e_69[0].length;
    }
    documentFragment.append(data.slice(a_2)), e_69.replaceWith(documentFragment);
  }
}
function Sn(el, t) {
  let ownerDocument = el.ownerDocument;
  for (let length of Array.from(el.querySelectorAll(`pre > code`))) {
    let parentElement = length.parentElement;
    if (!parentElement) continue;
    let i_1 = Array.from(length.classList).find(text => text.startsWith(`language-`))?.slice(9) || ``,
      a_2 = length.textContent || ``;
    length.textContent = ``;
    for (let e_69 of Jt_55(a_2, i_1)) {
      if (!e_69.type) {
        length.append(e_69.text);
        continue;
      }
      let elementResult = ownerDocument.createElement(`span`);
      elementResult.className = `hl-${e_69.type}`, elementResult.textContent = e_69.text, length.append(elementResult);
    }
    parentElement.classList.add(`markdown-code-block`);
    let o = ownerDocument.createElement(`div`);
    o.className = `markdown-code-shell`;
    let s = ownerDocument.createElement(`div`);
    if (s.className = `markdown-code-toolbar`, i_1) {
      let e_69 = ownerDocument.createElement(`span`);
      e_69.className = `markdown-code-language`, e_69.textContent = i_1, s.append(e_69);
    }
    let c_3 = ownerDocument.createElement(`button`);
    c_3.type = `button`, c_3.className = `markdown-copy-code`, c_3.setAttribute(`data-copy-code`, ``), c_3.title = t, c_3.setAttribute(`aria-label`, t), c_3.innerHTML = rn_64, s.append(c_3), parentElement.replaceWith(o), o.append(parentElement, s);
  }
}
function Cn(el, t, n_68) {
  let r_0 = t.parser([el]),
    sanitize = me_19.sanitize(r_0, {
      ALLOWED_TAGS: tn_62,
      ALLOWED_ATTR: nn_63,
      ALLOW_DATA_ATTR: false,
      ALLOW_UNKNOWN_PROTOCOLS: false
    }),
    fromString = new DOMParser().parseFromString(`<body>${String(sanitize)}</body>`, `text/html`),
    body = fromString.body,
    s = el.type === `heading` ? [0] : _n(el.raw),
    flag = [];
  for (let [e_69, t] of Array.from(body.querySelectorAll(`h1, h2, h3, h4, h5, h6`)).entries()) t.removeAttribute(`id`), t.setAttribute(`data-heading-slot`, String(e_69)), flag.push({
    text: t.textContent?.trim() || ``,
    level: Number(t.tagName.slice(1)),
    offset: s[e_69] ?? 0
  });
  for (let e_69 of Array.from(body.querySelectorAll(`a`))) {
    let t = e_69.getAttribute(`href`)?.trim() || ``;
    if (!t || /^(javascript|vbscript|data|file):/i.test(t)) {
      e_69.removeAttribute(`href`);
      continue;
    }
    e_69.setAttribute(`rel`, `noreferrer noopener`);
  }
  for (let e_69 of Array.from(body.querySelectorAll(`img`))) {
    let t = e_69.getAttribute(`src`)?.trim() || ``;
    if (e_69.classList.add(`markdown-image`), e_69.setAttribute(`decoding`, `async`), e_69.setAttribute(`referrerpolicy`, `no-referrer`), !(mn(t) || hn(t))) {
      if (e_69.removeAttribute(`src`), !t || t.startsWith(`//`) || /^[a-z][a-z\d+.-]*:/i.test(t)) {
        e_69.classList.add(`is-unavailable`);
        continue;
      }
      e_69.setAttribute(`data-markdown-src`, t), e_69.classList.add(`is-loading`);
    }
  }
  let l_4 = Array.from(body.querySelectorAll(`input[type="checkbox"]`)),
    u = yn(el.raw),
    d = l_4.length > 0 && l_4.length === u.length;
  for (let [e_69, t] of l_4.entries()) t.classList.add(`markdown-task-checkbox`), t.closest(`li`)?.classList.add(`markdown-task-item`), d ? (t.removeAttribute(`disabled`), t.setAttribute(`data-task-index`, String(e_69))) : t.setAttribute(`disabled`, ``);
  for (let e_69 of Array.from(body.querySelectorAll(`table`))) {
    let t = fromString.createElement(`div`);
    t.className = `markdown-table-wrap`, e_69.replaceWith(t), t.append(e_69);
  }
  return Sn(body, n_68.copyLabel), xn(body), {
    html: body.innerHTML,
    headings: flag,
    taskOffsets: d ? u : []
  };
}
var wn = class {
  softParser = new $e_37({
    gfm: true,
    breaks: true
  });
  strictParser = new $e_37({
    gfm: true,
    breaks: false
  });
  cache = new Map();
  render(items, t) {
    let n_68 = t.softBreaks ? this.softParser : this.strictParser,
      r_0 = n_68.lexer(items),
      i_1 = `${+!!t.softBreaks}null${t.copyLabel}null${JSON.stringify(r_0.links || {})}null`,
      a_2 = fn(items),
      o = new cn(),
      s = new Map(),
      c_3 = new Set(),
      l_4 = [],
      u = [],
      d = 0;
    for (let f of r_0) {
      let r_0 = f.raw || ``,
        p_5 = items.startsWith(r_0, d) ? d : items.indexOf(r_0, d);
      if (p_5 < 0 && (p_5 = d), d = p_5 + r_0.length, f.type === `space` || f.type === `def` || !r_0.trim()) continue;
      let m = i_1 + r_0,
        h = this.cache.get(m);
      h || (h = Cn(f, n_68, t), this.cache.set(m, h)), c_3.add(m);
      let html = h.html;
      for (let [e_69, t] of h.headings.entries()) {
        let n_68 = o.slug(t.text);
        html = html.replace(`data-heading-slot="${e_69}"`, `id="${un(n_68)}"`), u.push({
          id: n_68,
          text: t.text,
          level: t.level,
          line: pn(a_2, p_5 + t.offset)
        });
      }
      let _ = ln(r_0),
        ee_6 = s.get(_) ?? 0;
      s.set(_, ee_6 + 1), l_4.push({
        key: `${_}-${ee_6}`,
        html: html,
        line: pn(a_2, p_5),
        offset: p_5,
        taskPositions: h.taskOffsets.map(item => p_5 + item)
      });
    }
    if (this.cache.size > c_3.size * 2 + 200) for (let e_69 of Array.from(this.cache.keys())) c_3.has(e_69) || this.cache.delete(e_69);
    return {
      blocks: l_4,
      headings: u
    };
  }
};
function Tn(el, t) {
  let n_68 = t;
  try {
    n_68 = decodeURIComponent(t);
  } catch {}
  for (let diff of [t, n_68, sn_67(n_68)]) {
    if (!diff) continue;
    let selector = el.querySelector(`#${CSS.escape(diff)}`);
    if (selector) return selector;
  }
  return null;
}
async function En(el, t) {
  let body = new DOMParser().parseFromString(`<body>${el.map(item => item.html).join(`
`)}</body>`, `text/html`).body;
  for (let e_69 of Array.from(body.querySelectorAll(`.markdown-code-toolbar`))) e_69.remove();
  for (let e_69 of Array.from(body.querySelectorAll(`input[type="checkbox"]`))) e_69.setAttribute(`disabled`, ``), e_69.removeAttribute(`data-task-index`);
  return await Promise.all(Array.from(body.querySelectorAll(`img[data-markdown-src]`)).map(async item => {
    let n_68 = item.getAttribute(`data-markdown-src`) || ``;
    item.removeAttribute(`data-markdown-src`), item.classList.remove(`is-loading`);
    let r_0 = n_68 ? await t(n_68).catch(() => null) : null;
    r_0 ? item.setAttribute(`src`, r_0) : item.remove();
  })), body.innerHTML;
}
function Dn(e_69, t, n_68) {
  return `<!doctype html>
<html lang="${un(n_68)}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${dn(t)}</title>
<style>${On}</style>
</head>
<body>
<article class="markdown-body">
${e_69}
</article>
</body>
</html>
`;
}
var On = `
:root { color-scheme: light; }
* { box-sizing: border-box; }
body { margin: 0; background: #fff; }
.markdown-body { max-width: 820px; margin: 0 auto; padding: 40px 32px 64px; color: #1a1a1a; font: 15px/1.8 -apple-system, BlinkMacSystemFont, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Segoe UI", sans-serif; overflow-wrap: anywhere; }
.markdown-body > :first-child { margin-top: 0; }
.markdown-body h1, .markdown-body h2, .markdown-body h3, .markdown-body h4, .markdown-body h5, .markdown-body h6 { color: #111; font-weight: 600; line-height: 1.35; }
.markdown-body h1 { font-size: 1.35em; margin: 1.25em 0 0.6em; }
.markdown-body h2 { font-size: 1.2em; margin: 1.1em 0 0.5em; }
.markdown-body h3 { font-size: 1.05em; margin: 1em 0 0.45em; }
.markdown-body h4, .markdown-body h5, .markdown-body h6 { font-size: 1em; margin: 1em 0 0.4em; }
.markdown-body p { margin: 0.75em 0; }
.markdown-body a { color: #16a34a; text-decoration: none; }
.markdown-body ul { list-style: disc; padding-left: 1.8em; margin: 0.6em 0; }
.markdown-body ol { list-style: decimal; padding-left: 1.5em; margin: 0.6em 0; }
.markdown-body li { margin: 0.35em 0; }
.markdown-body ul > li::marker { color: rgba(0, 0, 0, 0.35); font-size: 0.85em; }
.markdown-body li.markdown-task-item { list-style: none; }
.markdown-body li.markdown-task-item > input { margin: 0 0.5em 0 -1.3em; vertical-align: -0.1em; accent-color: #16a34a; }
.markdown-body strong { font-weight: 600; }
.markdown-body code, .markdown-body kbd { font-family: "SF Mono", Menlo, Consolas, "Liberation Mono", monospace; font-size: 0.875em; background: rgba(0, 0, 0, 0.06); padding: 0.15em 0.4em; border-radius: 4px; }
.markdown-body pre { background: rgba(0, 0, 0, 0.04); border-radius: 8px; padding: 1em 1.1em; overflow-x: auto; margin: 0.9em 0; line-height: 1.65; }
.markdown-body pre code { background: none; padding: 0; border-radius: 0; font-size: 0.8em; }
.markdown-body blockquote { border-left: 3px solid rgba(0, 0, 0, 0.15); padding-left: 0.75em; margin: 0.75em 0; color: #666; }
.markdown-body table { border-collapse: collapse; width: 100%; margin: 0.75em 0; font-size: 0.875em; }
.markdown-body th, .markdown-body td { border: 1px solid rgba(0, 0, 0, 0.1); padding: 0.4em 0.75em; vertical-align: top; }
.markdown-body th:not([align]), .markdown-body td:not([align]) { text-align: left; }
.markdown-body th { background: rgba(0, 0, 0, 0.03); font-weight: 500; }
.markdown-body hr { border: none; border-top: 1px solid rgba(0, 0, 0, 0.08); margin: 1em 0; }
.markdown-body img { display: block; max-width: 100%; margin: 0.75em auto; border-radius: 8px; }
.markdown-body mark { background: rgba(250, 204, 21, 0.35); color: inherit; border-radius: 3px; padding: 0 0.15em; }
.markdown-body details { border: 1px solid rgba(0, 0, 0, 0.1); border-radius: 8px; padding: 0.6em 0.9em; margin: 0.75em 0; }
.markdown-body summary { font-weight: 600; cursor: pointer; }
.markdown-body .markdown-table-wrap { overflow-x: auto; }
.markdown-body .markdown-code-shell { position: relative; }
.hl-comment { color: #8a8a8a; }
.hl-keyword, .hl-tag { font-weight: 600; }
.hl-string { color: #15803d; }
.hl-number, .hl-literal, .hl-variable { color: #0f766e; }
.hl-attr, .hl-meta { color: #666; }
.hl-key { color: #111; font-weight: 500; }
.hl-addition { color: #15803d; background: rgba(22, 163, 74, 0.08); }
.hl-deletion { color: #b91c1c; background: rgba(220, 38, 38, 0.08); }
@media print {
  .markdown-body { max-width: none; padding: 0; }
  pre, blockquote, table, img, .markdown-code-shell { break-inside: avoid; }
  h1, h2, h3, h4 { break-after: avoid; }
}
`;
var Yn = new Map();
var Xn = 300;
function Zn(e_69, t) {
  return `${e_69}\n${t}`;
}
function Qn(e_69, t) {
  let n_68 = Zn(e_69, t),
    r_0 = Yn.get(n_68);
  if (r_0) return r_0;
  let i_1 = q.readAsset({
    documentPath: e_69,
    source: t
  }).then(result => result.dataUrl);
  if (i_1.catch(() => Yn.delete(n_68)), Yn.size >= Xn) {
    let value = Yn.keys().next().value;
    value !== undefined && Yn.delete(value);
  }
  return Yn.set(n_68, i_1), i_1;
}
var $ = new Map();
function $n(e_69, t, n_68) {
  if ($.set(Zn(e_69, t), n_68), $.size > Xn) {
    let value = $.keys().next().value;
    value !== undefined && $.delete(value);
  }
}
function er(e_69, t) {
  return $.get(Zn(e_69, t));
}
function tr(e_69) {
  for (let t of [Yn, $]) {
    if (!e_69) {
      t.clear();
      continue;
    }
    for (let n_68 of Array.from(t.keys())) n_68.startsWith(`${e_69}\n`) && t.delete(n_68);
  }
}
var nr = [`data-block-index`, `data-source-line`, `innerHTML`];
var rr = [`aria-label`];
var ir = [`src`, `alt`];
var ar = [`aria-label`];
var or = Le_29(E_9({
  __name: `MarkdownReaderRenderer`,
  props: {
    blocks: {},
    documentPath: {},
    epoch: {}
  },
  emits: [`toggleTask`, `openLink`],
  setup(event, {
    expose: t,
    emit: n_68
  }) {
    let r_0 = event,
      i_1 = n_68,
      {
        t: a_2
      } = ue(),
      o = S(null),
      s = S(null),
      c_3 = new Map();
    function l_4(el, t) {
      el.classList.remove(`is-loading`), el.classList.add(`is-unavailable`), el.alt ||= a_2(`toolboxNative.markdownImageLoadFailed`, {
        source: t
      });
    }
    function u() {
      let value = o.value;
      if (!value) return;
      let documentPath = r_0.documentPath;
      for (let n_68 of Array.from(value.querySelectorAll(`img[data-markdown-src]:not([data-hydrated])`))) {
        n_68.setAttribute(`data-hydrated`, ``);
        let e_69 = n_68.getAttribute(`data-markdown-src`) || ``;
        if (!documentPath || !e_69) {
          l_4(n_68, e_69);
          continue;
        }
        let r_0 = er(documentPath, e_69);
        if (r_0) {
          n_68.src = r_0, n_68.classList.remove(`is-loading`);
          continue;
        }
        Qn(documentPath, e_69).then(result => {
          $n(documentPath, e_69, result), n_68.isConnected && (n_68.src = result, n_68.classList.remove(`is-loading`));
        }).catch(() => l_4(n_68, e_69));
      }
    }
    function f(el, t) {
      let n_68 = a_2(t ? `toolboxNative.copiedCode` : `toolboxNative.copyCode`);
      el.innerHTML = t ? an_65 : rn_64, el.classList.toggle(`is-copied`, t), el.title = n_68, el.setAttribute(`aria-label`, n_68);
    }
    async function p_5(e_69) {
      let t = e_69.closest(`.markdown-code-shell`)?.querySelector(`code`)?.textContent || ``;
      try {
        await navigator.clipboard.writeText(t), f(e_69, true), window.clearTimeout(c_3.get(e_69)), c_3.set(e_69, window.setTimeout(() => {
          c_3.delete(e_69), f(e_69, false);
        }, 1200));
      } catch {
        W(a_2(`toolboxNative.markdownCodeCopyFailed`));
      }
    }
    function m(e_69) {
      o.value && e_69 && Tn(o.value, e_69)?.scrollIntoView({
        behavior: `smooth`,
        block: `start`
      });
    }
    function h(e_69) {
      let target = e_69.target,
        n_68 = target.closest(`[data-copy-code]`);
      if (n_68) {
        p_5(n_68);
        return;
      }
      let r_0 = target.closest(`a[href]`);
      if (!r_0) {
        let e_69 = target.closest(`img.markdown-image`);
        e_69?.currentSrc && (s.value = {
          src: e_69.currentSrc,
          alt: e_69.alt,
          name: y(e_69.getAttribute(`data-markdown-src`) || ``)
        });
        return;
      }
      e_69.preventDefault();
      let o = r_0.getAttribute(`href`) || ``;
      if (o.startsWith(`#`)) {
        m(o.slice(1));
        return;
      }
      if (/^(https?:|mailto:)/i.test(o)) {
        q.openExternal(o).catch(() => W(a_2(`toolboxNative.markdownErrorInvalidLink`)));
        return;
      }
      i_1(`openLink`, o);
    }
    function ee_6(e_69) {
      let target = e_69.target;
      if (!target.matches(`input.markdown-task-checkbox[data-task-index]`)) return;
      let n_68 = target.closest(`[data-block-index]`),
        a_2 = (n_68 ? r_0.blocks[Number(n_68.dataset.blockIndex)] : undefined)?.taskPositions[Number(target.dataset.taskIndex)];
      if (a_2 === undefined) {
        target.checked = !target.checked;
        return;
      }
      i_1(`toggleTask`, a_2);
    }
    function y(text) {
      let t = text.split(/[?#]/)[0].split(/[\\/]/).pop() || ``;
      try {
        return decodeURIComponent(t) || `image`;
      } catch {
        return t || `image`;
      }
    }
    function b_7() {
      let value = s.value;
      if (value && /^(data|blob):/i.test(value.src)) return () => Xe_36(value.src, value.name);
    }
    function w(e_69) {
      e_69.key === `Escape` && (e_69.stopPropagation(), s.value = null);
    }
    return v(s, e_69 => {
      e_69 ? window.addEventListener(`keydown`, w, true) : window.removeEventListener(`keydown`, w, true);
    }), v(() => [r_0.blocks, r_0.epoch], u, {
      flush: `post`,
      immediate: true
    }), re(() => {
      window.removeEventListener(`keydown`, w, true);
      for (let e_69 of c_3.values()) window.clearTimeout(e_69);
    }), t({
      root: () => o.value,
      scrollToAnchor: m
    }), (e_69, t) => (T(), g(C, null, [P(`article`, {
      ref_key: `rootRef`,
      ref: o,
      class: `markdown-reader-rendered text-[15px] leading-[1.8] text-[#1a1a1a] dark:text-foreground`,
      onClick: h,
      onChange: ee_6
    }, [(T(true), g(C, null, _(r_0.blocks, (e_69, t) => (T(), g(`div`, {
      key: `${r_0.epoch}:${e_69.key}`,
      class: `markdown-block`,
      "data-block-index": t,
      "data-source-line": e_69.line,
      innerHTML: e_69.html
    }, null, 8, nr))), 128))], 544), (T(), x(te_8, {
      to: `body`
    }, [s.value ? (T(), g(`div`, {
      key: 0,
      class: `fixed inset-0 z-[90] flex cursor-zoom-out items-center justify-center bg-black/75 p-8 animate-in fade-in-0`,
      role: `dialog`,
      "aria-modal": `true`,
      "aria-label": s.value.alt || d(a_2)(`toolboxNative.markdownImagePreview`),
      onClick: t[2] ||= e_69 => s.value = null
    }, [P(`img`, {
      src: s.value.src,
      alt: s.value.alt,
      class: `max-h-full max-w-full rounded-lg object-contain shadow-2xl`,
      onContextmenu: t[0] ||= e_69 => d(K_35)(e_69, b_7())
    }, null, 40, ir), P(`button`, {
      type: `button`,
      class: `absolute right-5 top-5 inline-flex size-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20`,
      "aria-label": d(a_2)(`toolboxNative.markdownCloseImagePreview`),
      onClick: t[1] ||= I_14(e_69 => s.value = null, [`stop`])
    }, [D(d(R), {
      size: 18
    })], 8, ar)], 8, rr)) : N(``, true)]))], 64));
  }
}), [[`__scopeId`, `data-v-d17fed93`]]);
var Tr = 2e3;
function Er() {
  let highlights = CSS.highlights,
    highlight = window.Highlight;
  return highlights && highlight ? {
    registry: highlights,
    Highlight: highlight
  } : null;
}
function Dr(el) {
  let t = S(false),
    n_68 = S(``),
    r_0 = S(0),
    i_1 = S(0),
    a_2 = [],
    o = [],
    s = f([]),
    c_3 = false,
    l_4 = M(() => i_1.value ? `${r_0.value + 1}/${i_1.value}` : `0/0`);
  function u() {
    let e_69 = Er();
    e_69?.registry.delete(`markdown-find`), e_69?.registry.delete(`markdown-find-current`);
  }
  function d(e_69, t) {
    let n_68 = [],
      treeWalkerResult = document.createTreeWalker(e_69, NodeFilter.SHOW_TEXT, {
        acceptNode: e_69 => e_69.parentElement?.closest(`.markdown-code-toolbar`) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT
      });
    for (; treeWalkerResult.nextNode() && n_68.length < Tr;) {
      let currentNode = treeWalkerResult.currentNode,
        toLocaleLowerCaseResult = currentNode.data.toLocaleLowerCase();
      for (let r_0 = toLocaleLowerCaseResult.indexOf(t); r_0 >= 0 && n_68.length < Tr; r_0 = toLocaleLowerCaseResult.indexOf(t, r_0 + t.length)) {
        let range = document.createRange();
        range.setStart(currentNode, r_0), range.setEnd(currentNode, Math.min(currentNode.length, r_0 + t.length)), n_68.push(range);
      }
    }
    return n_68;
  }
  function p_5(t = true) {
    if (!i_1.value) {
      u();
      return;
    }
    if (c_3) {
      let n_68 = Er(),
        i_1 = a_2[r_0.value];
      if (n_68 && i_1 && (n_68.registry.set(`markdown-find`, new n_68.Highlight(...a_2)), n_68.registry.set(`markdown-find-current`, new n_68.Highlight(i_1))), !t) return;
      let previewScroller = el.previewScroller();
      if (i_1 && previewScroller) {
        let e_69 = i_1.getBoundingClientRect(),
          t = previewScroller.getBoundingClientRect();
        (e_69.top < t.top + 24 || e_69.bottom > t.bottom - 24) && (previewScroller.scrollTop += e_69.top - t.top - previewScroller.clientHeight / 3);
      }
      return;
    }
    let n_68 = o[r_0.value];
    t && n_68 && el.selectSource(n_68.start, n_68.end);
  }
  function m(t = false) {
    let l_4 = n_68.value.toLocaleLowerCase(),
      previewRoot = el.previewRoot();
    if (c_3 = !!previewRoot, a_2 = [], o = [], !l_4) {
      i_1.value = 0, r_0.value = 0, s.value = [], u();
      return;
    }
    if (previewRoot) a_2 = d(previewRoot, l_4), i_1.value = a_2.length;else {
      let t = el.sourceText().toLocaleLowerCase();
      for (let e_69 = t.indexOf(l_4); e_69 >= 0 && o.length < Tr; e_69 = t.indexOf(l_4, e_69 + l_4.length)) o.push({
        start: e_69,
        end: e_69 + l_4.length
      });
      i_1.value = o.length;
    }
    s.value = o, r_0.value = t ? Math.min(r_0.value, Math.max(0, i_1.value - 1)) : 0, p_5(!t);
  }
  function h(e_69) {
    i_1.value && (r_0.value = (r_0.value + e_69 + i_1.value) % i_1.value, p_5());
  }
  function g(e_69) {
    t.value = true, e_69 && (n_68.value = e_69), m();
  }
  function _() {
    t.value = false, u(), a_2 = [], o = [], s.value = [];
  }
  function ee_6() {
    t.value && m(true);
  }
  return {
    open: t,
    query: n_68,
    summary: l_4,
    matchCount: i_1,
    currentIndex: r_0,
    sourceHighlights: s,
    show: g,
    close: _,
    search: m,
    refresh: ee_6,
    next: () => h(1),
    previous: () => h(-1)
  };
}
var Or = {
  class: `flex min-w-0 items-center gap-1`
};
var kr = {
  key: 0,
  class: `shrink-0 text-sm text-muted-foreground/50`
};
var Ar = [`title`];
var jr = {
  key: 2,
  class: `flex shrink-0 items-center gap-1 text-xs text-muted-foreground`
};
var Mr = {
  key: 3,
  class: `shrink-0 text-xs text-muted-foreground animate-in fade-in-0`
};
var Nr = {
  key: 0
};
var Pr = {
  class: `inline-flex h-7 shrink-0 items-stretch rounded-lg border border-border bg-background text-xs text-foreground`
};
var Fr = [`title`];
var Ir = {
  key: 0
};
var Lr = [`aria-label`];
var Rr = {
  class: `min-w-0 flex-1 truncate`
};
var zr = {
  class: `max-w-[72px] shrink-0 truncate text-muted-foreground`
};
var Br = {
  key: 2
};
var Vr = {
  class: `relative flex min-h-0 flex-1 gap-3 px-3 pb-3`
};
var Hr = {
  class: `relative flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden`
};
var Ur = {
  key: 0,
  class: `mb-2 flex shrink-0 flex-wrap items-center gap-x-3 gap-y-1.5 rounded-lg bg-amber-500/10 px-3 py-2 text-xs text-amber-900 dark:text-amber-200`,
  role: `status`
};
var Wr = {
  class: `min-w-0 flex-1`
};
var Gr = [`aria-valuenow`, `aria-label`, `title`];
var Kr = {
  key: 0,
  class: `py-16 text-center text-xs text-muted-foreground`
};
var qr = {
  key: 4,
  class: `flex h-6 shrink-0 items-center justify-end gap-3 px-4 text-xs tabular-nums text-muted-foreground`
};
var Jr = {
  key: 5,
  class: `absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 bg-background/70 text-xs text-muted-foreground animate-in fade-in-0`
};
var Yr = {
  key: 2,
  class: `pointer-events-none absolute inset-x-3 bottom-3 top-0 z-40 flex items-center justify-center rounded-[10px] border-2 border-dashed border-primary/50 bg-primary/[0.04] text-sm font-medium text-primary`
};
var Xr = 880;
var Zr = 760;
var Qr = 9;
var $r = 300;
var ei = 320;
var ti = 36;
let value = j_12.value;
let r_0 = event,
  i_1 = n_68,
  a_2 = [`.md`, `.markdown`, `.mdown`, `.mkd`, `.mkdn`, `.mdwn`, `.txt`],
  options = {
    FILE_ACCESS_DENIED: `markdownErrorAccessDenied`,
    FILE_NOT_FOUND: `markdownErrorFileNotFound`,
    INVALID_FILE: `markdownErrorFileNotFound`,
    FILE_TOO_LARGE: `markdownErrorFileTooLarge`,
    UNSUPPORTED_FILE: `markdownErrorUnsupportedFile`,
    INVALID_LINK: `markdownErrorInvalidLink`,
    INVALID_LOCAL_PATH: `markdownErrorInvalidLink`,
    LOCAL_FILE_NOT_FOUND: `markdownErrorLinkedFileMissing`,
    LOCAL_FILE_OPEN_FAILED: `markdownErrorLinkedFileOpenFailed`,
    EXPORT_TOO_LARGE: `markdownErrorExportTooLarge`
  },
  {
    locale: c_3,
    t: l_4
  } = ue(),
  {
    captureGrowthObservation: p_5
  } = ze(),
  ee_6 = /Mac|iPhone|iPad/i.test(navigator.platform),
  b_7 = ee_6 ? `⌘` : `Ctrl+`,
  te_8 = ee_6 ? `⇧` : `Shift+`,
  E_9 = new wn(),
  O_10 = oe(at()),
  k_11 = S(O_10.mode),
  j_12 = S(null),
  F_13 = S(false),
  I_14 = S(``),
  se_15 = S(``),
  L_16 = S([]),
  de_17 = f({
    blocks: [],
    headings: []
  }),
  fe_18 = S(0),
  me_19 = S(``),
  z_20 = S(false),
  ge_21 = S(false),
  ye_22 = S(false),
  Ce_23 = S(false),
  V_24 = S(null),
  H_25 = S([]),
  Oe_26 = S(false),
  ke_27 = S(1200),
  U_28 = S(false),
  Le_29 = S(false),
  Re_30 = S(false),
  Be_31 = S(`discard`),
  Ve_32 = S(null),
  He_33 = S(null),
  G_34 = S(null),
  K_35 = S(null),
  Xe_36 = S(null),
  $e_37 = S(null),
  et_38 = null,
  st_39 = null,
  ct_40 = 0,
  lt_41 = null,
  mt = null,
  _t = null,
  yt = null,
  bt = null,
  xt = null,
  J = null,
  Tt = null,
  Et = null,
  Dt = 0,
  Ot = 0,
  kt = null,
  At = null,
  jt = null,
  Mt = 0,
  Nt = false,
  Pt = M(() => c_3?.value || `zh-CN`),
  Ft = M(() => I_14.value !== se_15.value),
  Lt = M(() => de_17.value.headings),
  Rt_42 = M(() => j_12.value?.name || l_4(`toolboxNative.untitledMarkdownDocument`)),
  Y_43 = M(() => ke_27.value < Zr),
  X_44 = M(() => ke_27.value >= Xr),
  zt_45 = M(() => X_44.value ? O_10.panelVisible : U_28.value),
  Bt_46 = M(() => ke_27.value - 24 - (X_44.value && O_10.panelVisible ? 260 : 0)),
  Vt_47 = M(() => Bt_46.value >= 629),
  Z_48 = M(() => k_11.value === `split` && !Vt_47.value ? `edit` : k_11.value),
  Ht_49 = M(() => I_14.value ? I_14.value.split(`
`).length : 0),
  Ut_50 = M(() => Array.from(I_14.value.replace(/\s+/g, ``)).length),
  Wt_51 = M(() => L_16.value.filter(item => item.exists).slice(0, 5)),
  Gt_52 = M(() => [{
    value: `preview`,
    icon: Ge,
    label: l_4(`toolboxNative.readMode`)
  }, {
    value: `edit`,
    icon: be,
    label: l_4(`toolboxNative.editMode`)
  }, ...(Vt_47.value ? [{
    value: `split`,
    icon: vt,
    label: l_4(`toolboxNative.splitMode`)
  }] : [])]),
  Kt_53 = M(() => Z_48.value === `split` ? {
    gridTemplateColumns: `minmax(${$r}px, ${`${(O_10.splitRatio * 100).toFixed(3)}%`}) ${Qr}px minmax(${ei}px, 1fr)`
  } : {
    gridTemplateColumns: `minmax(0, 1fr)`
  }),
  qt_54 = M(() => Be_31.value === `discard` ? l_4(`toolboxNative.markdownDiscardChangesTitle`, {
    name: Rt_42.value
  }) : l_4(`toolboxNative.markdownOverwriteChangesTitle`)),
  Jt_55 = M(() => l_4(Be_31.value === `discard` ? `toolboxNative.markdownUnsavedChangesConfirm` : `toolboxNative.markdownFileChangedConfirm`)),
  {
    open: Yt_56,
    query: Xt_57,
    summary: Zt_58,
    matchCount: Qt_59,
    currentIndex: $t_60,
    sourceHighlights: en_61,
    show: tn_62,
    close: nn_63,
    search: rn_64,
    refresh: an_65,
    next: on_66,
    previous: sn_67
  } = Dr({
    previewRoot: () => Z_48.value === `edit` ? null : Xe_36.value?.root() ?? null,
    previewScroller: () => G_34.value,
    sourceText: () => I_14.value,
    selectSource: (e_69, t) => K_35.value?.selectRange(e_69, t, false)
  });
let n_68 = j_12.value?.filePath === e_69.filePath;
let e_69 = await mn(`discard`);
</script>
