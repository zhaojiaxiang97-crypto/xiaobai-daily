<template>
<component :is="ol" />
</template>

<script setup>
import { normalizeClass as t, defineAsyncComponent as r, unref as i, renderSlot as u, createElementVNode as x, createBlock as F, openBlock as L } from 'vue';

function Vn(e) {
  var payload,
    flag,
    r = ``;
  if (typeof e == `string` || typeof e == `number`) r += e;else if (typeof e == `object`) {
    if (Array.isArray(e)) {
      var i = e.length;
      for (payload = 0; payload < i; payload++) e[payload] && (flag = Vn(e[payload])) && (r && (r += ` `), r += flag);
    } else for (flag in e) e[flag] && (r && (r += ` `), r += flag);
  }
  return r;
}
function Hn() {
  for (var e, t, n = 0, r = ``, i = arguments.length; n < i; n++) (e = arguments[n]) && (t = Vn(e)) && (r && (r += ` `), r += t);
  return r;
}
var Kn = (e, t) => {
  let n = Array(e.length + t.length);
  for (let t = 0; t < e.length; t++) n[t] = e[t];
  for (let r = 0; r < t.length; r++) n[e.length + r] = t[r];
  return n;
};
var qn = (e, t) => ({
  classGroupId: e,
  validator: t
});
var Jn = (e = new Map(), t = null, n) => ({
  nextPart: e,
  validators: t,
  classGroupId: n
});
var Yn = `-`;
var Xn = [];
var Zn = `arbitrary..`;
var Qn = e => {
  let t = tr(e),
    {
      conflictingClassGroups: n,
      conflictingClassGroupModifiers: r
    } = e;
  return {
    getClassGroupId: e => {
      if (e.startsWith(`[`) && e.endsWith(`]`)) return er(e);
      let n = e.split(Yn);
      return $n(n, +(n[0] === `` && n.length > 1), t);
    },
    getConflictingClassGroupIds: (e, t) => {
      if (t) {
        let t = r[e],
          i = n[e];
        return t ? i ? Kn(i, t) : t : i || Xn;
      }
      return n[e] || Xn;
    }
  };
};
var $n = (e, t, n) => {
  if (e.length - t === 0) return n.classGroupId;
  let r = e[t],
    i = n.nextPart.get(r);
  if (i) {
    let n = $n(e, t + 1, i);
    if (n) return n;
  }
  let validators = n.validators;
  if (validators === null) return;
  let o = t === 0 ? e.join(Yn) : e.slice(t).join(Yn),
    length = validators.length;
  for (let e = 0; e < length; e++) {
    let t = validators[e];
    if (t.validator(o)) return t.classGroupId;
  }
};
var er = e => e.slice(1, -1).indexOf(`:`) === -1 ? undefined : (() => {
  let t = e.slice(1, -1),
    n = t.indexOf(`:`),
    r = t.slice(0, n);
  return r ? Zn + r : undefined;
})();
var tr = e => {
  let {
    theme: t,
    classGroups: n
  } = e;
  return nr(n, t);
};
var nr = (e, t) => {
  let n = Jn();
  for (let get in e) {
    let i = e[get];
    rr(i, n, get, t);
  }
  return n;
};
var rr = (e, t, n, r) => {
  let length = e.length;
  for (let a = 0; a < length; a++) {
    let i = e[a];
    ir(i, t, n, r);
  }
};
var ir = (e, t, n, r) => {
  if (typeof e == `string`) {
    ar(e, t, n);
    return;
  }
  if (typeof e == `function`) {
    or(e, t, n, r);
    return;
  }
  sr(e, t, n, r);
};
var ar = (e, t, n) => {
  let r = e === `` ? t : cr(t, e);
  r.classGroupId = n;
};
var or = (e, t, n, r) => {
  if (lr(e)) {
    rr(e(r), t, n, r);
    return;
  }
  t.validators === null && (t.validators = []), t.validators.push(qn(n, e));
};
var sr = (e, t, n, r) => {
  let i = Object.entries(e),
    length = i.length;
  for (let e = 0; e < length; e++) {
    let [a, o] = i[e];
    rr(o, cr(t, a), n, r);
  }
};
var cr = (e, t) => {
  let n = e,
    r = t.split(Yn),
    length = r.length;
  for (let e = 0; e < length; e++) {
    let t = r[e],
      i = n.nextPart.get(t);
    i || (i = Jn(), n.nextPart.set(t, i)), n = i;
  }
  return n;
};
var lr = e => `isThemeGetter` in e && e.isThemeGetter === true;
var ur = e => {
  if (e < 1) return {
    get: () => undefined,
    set: () => {}
  };
  let t = 0,
    n = Object.create(null),
    r = Object.create(null),
    handler = (i, a) => {
      n[i] = a, t++, t > e && (t = 0, r = n, n = Object.create(null));
    };
  return {
    get(e) {
      let t = n[e];
      if (t !== undefined) return t;
      if ((t = r[e]) !== undefined) return handler(e, t), t;
    },
    set(e, t) {
      e in n ? n[e] = t : handler(e, t);
    }
  };
};
var dr = `!`;
var fr = `:`;
var pr = [];
var mr = (e, t, n, r, i) => ({
  modifiers: e,
  hasImportantModifier: t,
  baseClassName: n,
  maybePostfixModifierPosition: r,
  isExternal: i
});
var hr = e => {
  let {
      prefix: t,
      experimentalParseClassName: n
    } = e,
    r = e => {
      let emptyItems = [],
        n = 0,
        r = 0,
        i = 0,
        proxy,
        length = e.length;
      for (let s = 0; s < length; s++) {
        let o = e[s];
        if (n === 0 && r === 0) {
          if (o === fr) {
            emptyItems.push(e.slice(i, s)), i = s + 1;
            continue;
          }
          if (o === `/`) {
            proxy = s;
            continue;
          }
        }
        o === `[` ? n++ : o === `]` ? n-- : o === `(` ? r++ : o === `)` && r--;
      }
      let s = emptyItems.length === 0 ? e : e.slice(i),
        c = s,
        l = false;
      s.endsWith(dr) ? (c = s.slice(0, -1), l = true) : s.startsWith(dr) && (c = s.slice(1), l = true);
      let u = proxy && proxy > i ? proxy - i : undefined;
      return mr(emptyItems, l, c, u);
    };
  if (t) {
    let e = t + fr,
      n = r;
    r = t => t.startsWith(e) ? n(t.slice(e.length)) : mr(pr, false, t, undefined, true);
  }
  if (n) {
    let e = r;
    r = t => n({
      className: t,
      parseClassName: e
    });
  }
  return r;
};
var gr = e => {
  let t = new Map();
  return e.orderSensitiveModifiers.forEach((item, n) => {
    t.set(item, 1e6 + n);
  }), e => {
    let arrow = [],
      r = [];
    for (let i = 0; i < e.length; i++) {
      let a = e[i],
        o = a[0] === `[`,
        s = t.has(a);
      o || s ? (r.length > 0 && (r.sort(), arrow.push(...r), r = []), arrow.push(a)) : r.push(a);
    }
    return r.length > 0 && (r.sort(), arrow.push(...r)), arrow;
  };
};
var _r = e => ({
  cache: ur(e.cacheSize),
  parseClassName: hr(e),
  sortModifiers: gr(e),
  postfixLookupClassGroupIds: vr(e),
  ...Qn(e)
});
var vr = e => {
  let t = Object.create(null),
    postfixLookupClassGroups = e.postfixLookupClassGroups;
  if (postfixLookupClassGroups) for (let e = 0; e < postfixLookupClassGroups.length; e++) t[postfixLookupClassGroups[e]] = true;
  return t;
};
var yr = /\s+/;
var br = (e, t) => {
  let {
      parseClassName: n,
      getClassGroupId: r,
      getConflictingClassGroupIds: i,
      sortModifiers: a,
      postfixLookupClassGroupIds: o
    } = t,
    count = [],
    c = e.trim().split(yr),
    l = ``;
  for (let e = c.length - 1; e >= 0; --e) {
    let t = c[e],
      {
        isExternal: u,
        modifiers: d,
        hasImportantModifier: f,
        baseClassName: p,
        maybePostfixModifierPosition: m
      } = n(t);
    if (u) {
      l = t + (l.length > 0 ? ` ` + l : l);
      continue;
    }
    let h = !!m,
      g;
    if (h) {
      g = r(p.substring(0, m));
      let e = g && o[g] ? r(p) : undefined;
      e && e !== g && (g = e, h = false);
    } else g = r(p);
    if (!g) {
      if (!h) {
        l = t + (l.length > 0 ? ` ` + l : l);
        continue;
      }
      if (g = r(p), !g) {
        l = t + (l.length > 0 ? ` ` + l : l);
        continue;
      }
      h = false;
    }
    let _ = d.length === 0 ? `` : d.length === 1 ? d[0] : a(d).join(`:`),
      v = f ? _ + dr : _,
      y = v + g;
    if (count.indexOf(y) > -1) continue;
    count.push(y);
    let b = i(g, h);
    for (let e = 0; e < b.length; ++e) {
      let t = b[e];
      count.push(v + t);
    }
    l = t + (l.length > 0 ? ` ` + l : l);
  }
  return l;
};
var xr = (...e) => {
  let t = 0,
    n,
    r,
    i = ``;
  for (; t < e.length;) (n = e[t++]) && (r = Sr(n)) && (i && (i += ` `), i += r);
  return i;
};
var Sr = e => {
  if (typeof e == `string`) return e;
  let namespaceURI,
    n = ``;
  for (let r = 0; r < e.length; r++) e[r] && (namespaceURI = Sr(e[r])) && (n && (n += ` `), n += namespaceURI);
  return n;
};
var Cr = (e, ...t) => {
  let n,
    r,
    total,
    diff,
    o = o => (n = _r(t.reduce((acc, cur) => cur(acc), e())), r = n.cache.get, total = n.cache.set, diff = s, s(o)),
    s = e => {
      let t = r(e);
      if (t) return t;
      let a = br(e, n);
      return total(e, a), a;
    };
  return diff = o, (...e) => diff(xr(...e));
};
var wr = [];
var H = e => {
  let t = t => t[e] || wr;
  return t.isThemeGetter = true, t.themeKey = e, t;
};
var Tr = /^\[(?:(\w[\w-]*):)?(.+)\]$/i;
var Er = /^\((?:(\w[\w-]*):)?(.+)\)$/i;
var Dr = /^\d+(?:\.\d+)?\/\d+(?:\.\d+)?$/;
var Or = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/;
var kr = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/;
var Ar = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix|color|light-dark)\(.+\)$/;
var jr = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/;
var Mr = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/;
var Nr = e => Dr.test(e);
var U = e => !!e && !Number.isNaN(Number(e));
var Pr = e => !!e && Number.isInteger(Number(e));
var Fr = e => e.endsWith(`%`) && U(e.slice(0, -1));
var Ir = e => Or.test(e);
var Lr = () => true;
var Rr = e => kr.test(e) && !Ar.test(e);
var zr = () => false;
var Br = e => jr.test(e);
var Vr = e => Mr.test(e);
var Hr = e => !W(e) && !G(e);
var Ur = e => e.startsWith(`@container`) && (e[10] === `/` && e[11] !== undefined || e[11] === `s` && e[16] !== undefined && e.startsWith(`-size/`, 10) || e[11] === `n` && e[18] !== undefined && e.startsWith(`-normal/`, 10));
var Wr = e => ai(e, li, zr);
var W = e => Tr.test(e);
var Gr = e => ai(e, ui, Rr);
var Kr = e => ai(e, di, U);
var qr = e => ai(e, pi, Lr);
var Jr = e => ai(e, fi, zr);
var Yr = e => ai(e, si, zr);
var Xr = e => ai(e, ci, Vr);
var Zr = e => ai(e, mi, Br);
var G = e => Er.test(e);
var Qr = e => oi(e, ui);
var $r = e => oi(e, fi);
var ei = e => oi(e, si);
var ti = e => oi(e, li);
var ni = e => oi(e, ci);
var ri = e => oi(e, mi, true);
var ii = e => oi(e, pi, true);
var ai = (e, t, n) => {
  let r = Tr.exec(e);
  return r ? r[1] ? t(r[1]) : n(r[2]) : false;
};
var oi = (e, t, n = false) => {
  let r = Er.exec(e);
  return r ? r[1] ? t(r[1]) : n : false;
};
var si = e => e === `position` || e === `percentage`;
var ci = e => e === `image` || e === `url`;
var li = e => e === `length` || e === `size` || e === `bg-size`;
var ui = e => e === `length`;
var di = e => e === `number`;
var fi = e => e === `family-name`;
var pi = e => e === `number` || e === `weight`;
var mi = e => e === `shadow`;
var hi = Cr(() => {
  let e = H(`color`),
    t = H(`font`),
    n = H(`text`),
    r = H(`font-weight`),
    i = H(`tracking`),
    a = H(`leading`),
    o = H(`breakpoint`),
    s = H(`container`),
    c = H(`spacing`),
    l = H(`radius`),
    u = H(`shadow`),
    d = H(`inset-shadow`),
    f = H(`text-shadow`),
    p = H(`drop-shadow`),
    m = H(`blur`),
    h = H(`perspective`),
    g = H(`aspect`),
    _ = H(`ease`),
    v = H(`animate`),
    y = () => [`auto`, `avoid`, `all`, `avoid-page`, `page`, `left`, `right`, `column`],
    b = () => [`center`, `top`, `bottom`, `left`, `right`, `top-left`, `left-top`, `top-right`, `right-top`, `bottom-right`, `right-bottom`, `bottom-left`, `left-bottom`],
    x = () => [...b(), G, W],
    S = () => [`auto`, `hidden`, `clip`, `visible`, `scroll`],
    C = () => [`auto`, `contain`, `none`],
    w = () => [G, W, c],
    T = () => [Nr, `full`, `auto`, ...w()],
    E = () => [Pr, `none`, `subgrid`, G, W],
    ee = () => [`auto`, {
      span: [`full`, Pr, G, W]
    }, Pr, G, W],
    te = () => [Pr, `auto`, G, W],
    ne = () => [`auto`, `min`, `max`, `fr`, G, W],
    re = () => [`start`, `end`, `center`, `between`, `around`, `evenly`, `stretch`, `baseline`, `center-safe`, `end-safe`],
    D = () => [`start`, `end`, `center`, `stretch`, `center-safe`, `end-safe`],
    O = () => [`auto`, ...w()],
    ie = () => [Nr, `auto`, `full`, `dvw`, `dvh`, `lvw`, `lvh`, `svw`, `svh`, `min`, `max`, `fit`, ...w()],
    ae = () => [s, Nr, `screen`, `full`, `dvw`, `lvw`, `svw`, `min`, `max`, `fit`, ...w()],
    oe = () => [Nr, `screen`, `full`, `lh`, `dvh`, `lvh`, `svh`, `min`, `max`, `fit`, ...w()],
    k = () => [e, G, W],
    A = () => [...b(), ei, Yr, {
      position: [G, W]
    }],
    se = () => [`no-repeat`, {
      repeat: [``, `x`, `y`, `space`, `round`]
    }],
    ce = () => [`auto`, `cover`, `contain`, ti, Wr, {
      size: [G, W]
    }],
    le = () => [Fr, Qr, Gr],
    j = () => [``, `none`, `full`, l, G, W],
    M = () => [``, U, Qr, Gr],
    ue = () => [`solid`, `dashed`, `dotted`, `double`],
    de = () => [`normal`, `multiply`, `screen`, `overlay`, `darken`, `lighten`, `color-dodge`, `color-burn`, `hard-light`, `soft-light`, `difference`, `exclusion`, `hue`, `saturation`, `color`, `luminosity`],
    N = () => [U, Fr, ei, Yr],
    fe = () => [``, `none`, m, G, W],
    pe = () => [`none`, U, G, W],
    me = () => [`none`, U, G, W],
    he = () => [U, G, W],
    ge = () => [Nr, `full`, ...w()];
  return {
    cacheSize: 500,
    theme: {
      animate: [`spin`, `ping`, `pulse`, `bounce`],
      aspect: [`video`],
      blur: [Ir],
      breakpoint: [Ir],
      color: [Lr],
      container: [Ir],
      "drop-shadow": [Ir],
      ease: [`in`, `out`, `in-out`],
      font: [Hr],
      "font-weight": [`thin`, `extralight`, `light`, `normal`, `medium`, `semibold`, `bold`, `extrabold`, `black`],
      "inset-shadow": [Ir],
      leading: [`none`, `tight`, `snug`, `normal`, `relaxed`, `loose`],
      perspective: [`dramatic`, `near`, `normal`, `midrange`, `distant`, `none`],
      radius: [Ir],
      shadow: [Ir],
      spacing: [`px`, U],
      text: [Ir],
      "text-shadow": [Ir],
      tracking: [`tighter`, `tight`, `normal`, `wide`, `wider`, `widest`]
    },
    classGroups: {
      aspect: [{
        aspect: [`auto`, `square`, Nr, W, G, g]
      }],
      container: [`container`],
      "container-type": [{
        "@container": [``, `normal`, `size`, G, W]
      }],
      "container-named": [Ur],
      columns: [{
        columns: [U, `auto`, W, G, s]
      }],
      "break-after": [{
        "break-after": y()
      }],
      "break-before": [{
        "break-before": y()
      }],
      "break-inside": [{
        "break-inside": [`auto`, `avoid`, `avoid-page`, `avoid-column`]
      }],
      "box-decoration": [{
        "box-decoration": [`slice`, `clone`]
      }],
      box: [{
        box: [`border`, `content`]
      }],
      display: [`block`, `inline-block`, `inline`, `flex`, `inline-flex`, `table`, `inline-table`, `table-caption`, `table-cell`, `table-column`, `table-column-group`, `table-footer-group`, `table-header-group`, `table-row-group`, `table-row`, `flow-root`, `grid`, `inline-grid`, `contents`, `list-item`, `hidden`],
      sr: [`sr-only`, `not-sr-only`],
      float: [{
        float: [`right`, `left`, `none`, `start`, `end`]
      }],
      clear: [{
        clear: [`left`, `right`, `both`, `none`, `start`, `end`]
      }],
      isolation: [`isolate`, `isolation-auto`],
      "object-fit": [{
        object: [`contain`, `cover`, `fill`, `none`, `scale-down`]
      }],
      "object-position": [{
        object: x()
      }],
      overflow: [{
        overflow: S()
      }],
      "overflow-x": [{
        "overflow-x": S()
      }],
      "overflow-y": [{
        "overflow-y": S()
      }],
      overscroll: [{
        overscroll: C()
      }],
      "overscroll-x": [{
        "overscroll-x": C()
      }],
      "overscroll-y": [{
        "overscroll-y": C()
      }],
      position: [`static`, `fixed`, `absolute`, `relative`, `sticky`],
      inset: [{
        inset: T()
      }],
      "inset-x": [{
        "inset-x": T()
      }],
      "inset-y": [{
        "inset-y": T()
      }],
      start: [{
        "inset-s": T(),
        start: T()
      }],
      end: [{
        "inset-e": T(),
        end: T()
      }],
      "inset-bs": [{
        "inset-bs": T()
      }],
      "inset-be": [{
        "inset-be": T()
      }],
      top: [{
        top: T()
      }],
      right: [{
        right: T()
      }],
      bottom: [{
        bottom: T()
      }],
      left: [{
        left: T()
      }],
      visibility: [`visible`, `invisible`, `collapse`],
      z: [{
        z: [Pr, `auto`, G, W]
      }],
      basis: [{
        basis: [Nr, `full`, `auto`, s, ...w()]
      }],
      "flex-direction": [{
        flex: [`row`, `row-reverse`, `col`, `col-reverse`]
      }],
      "flex-wrap": [{
        flex: [`nowrap`, `wrap`, `wrap-reverse`]
      }],
      flex: [{
        flex: [U, Nr, `auto`, `initial`, `none`, W]
      }],
      grow: [{
        grow: [``, U, G, W]
      }],
      shrink: [{
        shrink: [``, U, G, W]
      }],
      order: [{
        order: [Pr, `first`, `last`, `none`, G, W]
      }],
      "grid-cols": [{
        "grid-cols": E()
      }],
      "col-start-end": [{
        col: ee()
      }],
      "col-start": [{
        "col-start": te()
      }],
      "col-end": [{
        "col-end": te()
      }],
      "grid-rows": [{
        "grid-rows": E()
      }],
      "row-start-end": [{
        row: ee()
      }],
      "row-start": [{
        "row-start": te()
      }],
      "row-end": [{
        "row-end": te()
      }],
      "grid-flow": [{
        "grid-flow": [`row`, `col`, `dense`, `row-dense`, `col-dense`]
      }],
      "auto-cols": [{
        "auto-cols": ne()
      }],
      "auto-rows": [{
        "auto-rows": ne()
      }],
      gap: [{
        gap: w()
      }],
      "gap-x": [{
        "gap-x": w()
      }],
      "gap-y": [{
        "gap-y": w()
      }],
      "justify-content": [{
        justify: [...re(), `normal`]
      }],
      "justify-items": [{
        "justify-items": [...D(), `normal`]
      }],
      "justify-self": [{
        "justify-self": [`auto`, ...D()]
      }],
      "align-content": [{
        content: [`normal`, ...re()]
      }],
      "align-items": [{
        items: [...D(), {
          baseline: [``, `last`]
        }]
      }],
      "align-self": [{
        self: [`auto`, ...D(), {
          baseline: [``, `last`]
        }]
      }],
      "place-content": [{
        "place-content": re()
      }],
      "place-items": [{
        "place-items": [...D(), `baseline`]
      }],
      "place-self": [{
        "place-self": [`auto`, ...D()]
      }],
      p: [{
        p: w()
      }],
      px: [{
        px: w()
      }],
      py: [{
        py: w()
      }],
      ps: [{
        ps: w()
      }],
      pe: [{
        pe: w()
      }],
      pbs: [{
        pbs: w()
      }],
      pbe: [{
        pbe: w()
      }],
      pt: [{
        pt: w()
      }],
      pr: [{
        pr: w()
      }],
      pb: [{
        pb: w()
      }],
      pl: [{
        pl: w()
      }],
      m: [{
        m: O()
      }],
      mx: [{
        mx: O()
      }],
      my: [{
        my: O()
      }],
      ms: [{
        ms: O()
      }],
      me: [{
        me: O()
      }],
      mbs: [{
        mbs: O()
      }],
      mbe: [{
        mbe: O()
      }],
      mt: [{
        mt: O()
      }],
      mr: [{
        mr: O()
      }],
      mb: [{
        mb: O()
      }],
      ml: [{
        ml: O()
      }],
      "space-x": [{
        "space-x": w()
      }],
      "space-x-reverse": [`space-x-reverse`],
      "space-y": [{
        "space-y": w()
      }],
      "space-y-reverse": [`space-y-reverse`],
      size: [{
        size: ie()
      }],
      "inline-size": [{
        inline: [`auto`, ...ae()]
      }],
      "min-inline-size": [{
        "min-inline": [`auto`, ...ae()]
      }],
      "max-inline-size": [{
        "max-inline": [`none`, ...ae()]
      }],
      "block-size": [{
        block: [`auto`, ...oe()]
      }],
      "min-block-size": [{
        "min-block": [`auto`, ...oe()]
      }],
      "max-block-size": [{
        "max-block": [`none`, ...oe()]
      }],
      w: [{
        w: [s, `screen`, ...ie()]
      }],
      "min-w": [{
        "min-w": [s, `screen`, `none`, ...ie()]
      }],
      "max-w": [{
        "max-w": [s, `screen`, `none`, `prose`, {
          screen: [o]
        }, ...ie()]
      }],
      h: [{
        h: [`screen`, `lh`, ...ie()]
      }],
      "min-h": [{
        "min-h": [`screen`, `lh`, `none`, ...ie()]
      }],
      "max-h": [{
        "max-h": [`screen`, `lh`, `none`, ...ie()]
      }],
      "font-size": [{
        text: [`base`, n, Qr, Gr]
      }],
      "font-smoothing": [`antialiased`, `subpixel-antialiased`],
      "font-style": [`italic`, `not-italic`],
      "font-weight": [{
        font: [r, ii, qr]
      }],
      "font-stretch": [{
        "font-stretch": [`ultra-condensed`, `extra-condensed`, `condensed`, `semi-condensed`, `normal`, `semi-expanded`, `expanded`, `extra-expanded`, `ultra-expanded`, Fr, W]
      }],
      "font-family": [{
        font: [$r, Jr, t]
      }],
      "font-features": [{
        "font-features": [W]
      }],
      "fvn-normal": [`normal-nums`],
      "fvn-ordinal": [`ordinal`],
      "fvn-slashed-zero": [`slashed-zero`],
      "fvn-figure": [`lining-nums`, `oldstyle-nums`],
      "fvn-spacing": [`proportional-nums`, `tabular-nums`],
      "fvn-fraction": [`diagonal-fractions`, `stacked-fractions`],
      tracking: [{
        tracking: [i, G, W]
      }],
      "line-clamp": [{
        "line-clamp": [U, `none`, G, Kr]
      }],
      leading: [{
        leading: [`none`, a, ...w()]
      }],
      "list-image": [{
        "list-image": [`none`, G, W]
      }],
      "list-style-position": [{
        list: [`inside`, `outside`]
      }],
      "list-style-type": [{
        list: [`disc`, `decimal`, `none`, G, W]
      }],
      "text-alignment": [{
        text: [`left`, `center`, `right`, `justify`, `start`, `end`]
      }],
      "placeholder-color": [{
        placeholder: k()
      }],
      "text-color": [{
        text: k()
      }],
      "text-decoration": [`underline`, `overline`, `line-through`, `no-underline`],
      "text-decoration-style": [{
        decoration: [...ue(), `wavy`]
      }],
      "text-decoration-thickness": [{
        decoration: [U, `from-font`, `auto`, G, Gr]
      }],
      "text-decoration-color": [{
        decoration: k()
      }],
      "underline-offset": [{
        "underline-offset": [U, `auto`, G, W]
      }],
      "text-transform": [`uppercase`, `lowercase`, `capitalize`, `normal-case`],
      "text-overflow": [`truncate`, `text-ellipsis`, `text-clip`],
      "text-wrap": [{
        text: [`wrap`, `nowrap`, `balance`, `pretty`]
      }],
      indent: [{
        indent: w()
      }],
      "tab-size": [{
        tab: [Pr, G, W]
      }],
      "vertical-align": [{
        align: [`baseline`, `top`, `middle`, `bottom`, `text-top`, `text-bottom`, `sub`, `super`, G, W]
      }],
      whitespace: [{
        whitespace: [`normal`, `nowrap`, `pre`, `pre-line`, `pre-wrap`, `break-spaces`]
      }],
      break: [{
        break: [`normal`, `words`, `all`, `keep`]
      }],
      wrap: [{
        wrap: [`break-word`, `anywhere`, `normal`]
      }],
      hyphens: [{
        hyphens: [`none`, `manual`, `auto`]
      }],
      content: [{
        content: [`none`, G, W]
      }],
      "bg-attachment": [{
        bg: [`fixed`, `local`, `scroll`]
      }],
      "bg-clip": [{
        "bg-clip": [`border`, `padding`, `content`, `text`]
      }],
      "bg-origin": [{
        "bg-origin": [`border`, `padding`, `content`]
      }],
      "bg-position": [{
        bg: A()
      }],
      "bg-repeat": [{
        bg: se()
      }],
      "bg-size": [{
        bg: ce()
      }],
      "bg-image": [{
        bg: [`none`, {
          linear: [{
            to: [`t`, `tr`, `r`, `br`, `b`, `bl`, `l`, `tl`]
          }, Pr, G, W],
          radial: [``, G, W],
          conic: [``, Pr, G, W]
        }, ni, Xr]
      }],
      "bg-color": [{
        bg: k()
      }],
      "gradient-from-pos": [{
        from: le()
      }],
      "gradient-via-pos": [{
        via: le()
      }],
      "gradient-to-pos": [{
        to: le()
      }],
      "gradient-from": [{
        from: k()
      }],
      "gradient-via": [{
        via: k()
      }],
      "gradient-to": [{
        to: k()
      }],
      rounded: [{
        rounded: j()
      }],
      "rounded-s": [{
        "rounded-s": j()
      }],
      "rounded-e": [{
        "rounded-e": j()
      }],
      "rounded-t": [{
        "rounded-t": j()
      }],
      "rounded-r": [{
        "rounded-r": j()
      }],
      "rounded-b": [{
        "rounded-b": j()
      }],
      "rounded-l": [{
        "rounded-l": j()
      }],
      "rounded-ss": [{
        "rounded-ss": j()
      }],
      "rounded-se": [{
        "rounded-se": j()
      }],
      "rounded-ee": [{
        "rounded-ee": j()
      }],
      "rounded-es": [{
        "rounded-es": j()
      }],
      "rounded-tl": [{
        "rounded-tl": j()
      }],
      "rounded-tr": [{
        "rounded-tr": j()
      }],
      "rounded-br": [{
        "rounded-br": j()
      }],
      "rounded-bl": [{
        "rounded-bl": j()
      }],
      "border-w": [{
        border: M()
      }],
      "border-w-x": [{
        "border-x": M()
      }],
      "border-w-y": [{
        "border-y": M()
      }],
      "border-w-s": [{
        "border-s": M()
      }],
      "border-w-e": [{
        "border-e": M()
      }],
      "border-w-bs": [{
        "border-bs": M()
      }],
      "border-w-be": [{
        "border-be": M()
      }],
      "border-w-t": [{
        "border-t": M()
      }],
      "border-w-r": [{
        "border-r": M()
      }],
      "border-w-b": [{
        "border-b": M()
      }],
      "border-w-l": [{
        "border-l": M()
      }],
      "divide-x": [{
        "divide-x": M()
      }],
      "divide-x-reverse": [`divide-x-reverse`],
      "divide-y": [{
        "divide-y": M()
      }],
      "divide-y-reverse": [`divide-y-reverse`],
      "border-style": [{
        border: [...ue(), `hidden`, `none`]
      }],
      "divide-style": [{
        divide: [...ue(), `hidden`, `none`]
      }],
      "border-color": [{
        border: k()
      }],
      "border-color-x": [{
        "border-x": k()
      }],
      "border-color-y": [{
        "border-y": k()
      }],
      "border-color-s": [{
        "border-s": k()
      }],
      "border-color-e": [{
        "border-e": k()
      }],
      "border-color-bs": [{
        "border-bs": k()
      }],
      "border-color-be": [{
        "border-be": k()
      }],
      "border-color-t": [{
        "border-t": k()
      }],
      "border-color-r": [{
        "border-r": k()
      }],
      "border-color-b": [{
        "border-b": k()
      }],
      "border-color-l": [{
        "border-l": k()
      }],
      "divide-color": [{
        divide: k()
      }],
      "outline-style": [{
        outline: [...ue(), `none`, `hidden`]
      }],
      "outline-offset": [{
        "outline-offset": [U, G, W]
      }],
      "outline-w": [{
        outline: [``, U, Qr, Gr]
      }],
      "outline-color": [{
        outline: k()
      }],
      shadow: [{
        shadow: [``, `inner`, `none`, u, ri, Zr]
      }],
      "shadow-color": [{
        shadow: k()
      }],
      "inset-shadow": [{
        "inset-shadow": [`none`, d, ri, Zr]
      }],
      "inset-shadow-color": [{
        "inset-shadow": k()
      }],
      "ring-w": [{
        ring: M()
      }],
      "ring-w-inset": [`ring-inset`],
      "ring-color": [{
        ring: k()
      }],
      "ring-offset-w": [{
        "ring-offset": [U, Gr]
      }],
      "ring-offset-color": [{
        "ring-offset": k()
      }],
      "inset-ring-w": [{
        "inset-ring": M()
      }],
      "inset-ring-color": [{
        "inset-ring": k()
      }],
      "text-shadow": [{
        "text-shadow": [`none`, f, ri, Zr]
      }],
      "text-shadow-color": [{
        "text-shadow": k()
      }],
      opacity: [{
        opacity: [U, G, W]
      }],
      "mix-blend": [{
        "mix-blend": [...de(), `plus-darker`, `plus-lighter`]
      }],
      "bg-blend": [{
        "bg-blend": de()
      }],
      "mask-clip": [{
        "mask-clip": [`border`, `padding`, `content`, `fill`, `stroke`, `view`]
      }, `mask-no-clip`],
      "mask-composite": [{
        mask: [`add`, `subtract`, `intersect`, `exclude`]
      }],
      "mask-image-linear-pos": [{
        "mask-linear": [U]
      }],
      "mask-image-linear-from-pos": [{
        "mask-linear-from": N()
      }],
      "mask-image-linear-to-pos": [{
        "mask-linear-to": N()
      }],
      "mask-image-linear-from-color": [{
        "mask-linear-from": k()
      }],
      "mask-image-linear-to-color": [{
        "mask-linear-to": k()
      }],
      "mask-image-t-from-pos": [{
        "mask-t-from": N()
      }],
      "mask-image-t-to-pos": [{
        "mask-t-to": N()
      }],
      "mask-image-t-from-color": [{
        "mask-t-from": k()
      }],
      "mask-image-t-to-color": [{
        "mask-t-to": k()
      }],
      "mask-image-r-from-pos": [{
        "mask-r-from": N()
      }],
      "mask-image-r-to-pos": [{
        "mask-r-to": N()
      }],
      "mask-image-r-from-color": [{
        "mask-r-from": k()
      }],
      "mask-image-r-to-color": [{
        "mask-r-to": k()
      }],
      "mask-image-b-from-pos": [{
        "mask-b-from": N()
      }],
      "mask-image-b-to-pos": [{
        "mask-b-to": N()
      }],
      "mask-image-b-from-color": [{
        "mask-b-from": k()
      }],
      "mask-image-b-to-color": [{
        "mask-b-to": k()
      }],
      "mask-image-l-from-pos": [{
        "mask-l-from": N()
      }],
      "mask-image-l-to-pos": [{
        "mask-l-to": N()
      }],
      "mask-image-l-from-color": [{
        "mask-l-from": k()
      }],
      "mask-image-l-to-color": [{
        "mask-l-to": k()
      }],
      "mask-image-x-from-pos": [{
        "mask-x-from": N()
      }],
      "mask-image-x-to-pos": [{
        "mask-x-to": N()
      }],
      "mask-image-x-from-color": [{
        "mask-x-from": k()
      }],
      "mask-image-x-to-color": [{
        "mask-x-to": k()
      }],
      "mask-image-y-from-pos": [{
        "mask-y-from": N()
      }],
      "mask-image-y-to-pos": [{
        "mask-y-to": N()
      }],
      "mask-image-y-from-color": [{
        "mask-y-from": k()
      }],
      "mask-image-y-to-color": [{
        "mask-y-to": k()
      }],
      "mask-image-radial": [{
        "mask-radial": [G, W]
      }],
      "mask-image-radial-from-pos": [{
        "mask-radial-from": N()
      }],
      "mask-image-radial-to-pos": [{
        "mask-radial-to": N()
      }],
      "mask-image-radial-from-color": [{
        "mask-radial-from": k()
      }],
      "mask-image-radial-to-color": [{
        "mask-radial-to": k()
      }],
      "mask-image-radial-shape": [{
        "mask-radial": [`circle`, `ellipse`]
      }],
      "mask-image-radial-size": [{
        "mask-radial": [{
          closest: [`side`, `corner`],
          farthest: [`side`, `corner`]
        }]
      }],
      "mask-image-radial-pos": [{
        "mask-radial-at": b()
      }],
      "mask-image-conic-pos": [{
        "mask-conic": [U]
      }],
      "mask-image-conic-from-pos": [{
        "mask-conic-from": N()
      }],
      "mask-image-conic-to-pos": [{
        "mask-conic-to": N()
      }],
      "mask-image-conic-from-color": [{
        "mask-conic-from": k()
      }],
      "mask-image-conic-to-color": [{
        "mask-conic-to": k()
      }],
      "mask-mode": [{
        mask: [`alpha`, `luminance`, `match`]
      }],
      "mask-origin": [{
        "mask-origin": [`border`, `padding`, `content`, `fill`, `stroke`, `view`]
      }],
      "mask-position": [{
        mask: A()
      }],
      "mask-repeat": [{
        mask: se()
      }],
      "mask-size": [{
        mask: ce()
      }],
      "mask-type": [{
        "mask-type": [`alpha`, `luminance`]
      }],
      "mask-image": [{
        mask: [`none`, G, W]
      }],
      filter: [{
        filter: [``, `none`, G, W]
      }],
      blur: [{
        blur: fe()
      }],
      brightness: [{
        brightness: [U, G, W]
      }],
      contrast: [{
        contrast: [U, G, W]
      }],
      "drop-shadow": [{
        "drop-shadow": [``, `none`, p, ri, Zr]
      }],
      "drop-shadow-color": [{
        "drop-shadow": k()
      }],
      grayscale: [{
        grayscale: [``, U, G, W]
      }],
      "hue-rotate": [{
        "hue-rotate": [U, G, W]
      }],
      invert: [{
        invert: [``, U, G, W]
      }],
      saturate: [{
        saturate: [U, G, W]
      }],
      sepia: [{
        sepia: [``, U, G, W]
      }],
      "backdrop-filter": [{
        "backdrop-filter": [``, `none`, G, W]
      }],
      "backdrop-blur": [{
        "backdrop-blur": fe()
      }],
      "backdrop-brightness": [{
        "backdrop-brightness": [U, G, W]
      }],
      "backdrop-contrast": [{
        "backdrop-contrast": [U, G, W]
      }],
      "backdrop-grayscale": [{
        "backdrop-grayscale": [``, U, G, W]
      }],
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [U, G, W]
      }],
      "backdrop-invert": [{
        "backdrop-invert": [``, U, G, W]
      }],
      "backdrop-opacity": [{
        "backdrop-opacity": [U, G, W]
      }],
      "backdrop-saturate": [{
        "backdrop-saturate": [U, G, W]
      }],
      "backdrop-sepia": [{
        "backdrop-sepia": [``, U, G, W]
      }],
      "border-collapse": [{
        border: [`collapse`, `separate`]
      }],
      "border-spacing": [{
        "border-spacing": w()
      }],
      "border-spacing-x": [{
        "border-spacing-x": w()
      }],
      "border-spacing-y": [{
        "border-spacing-y": w()
      }],
      "table-layout": [{
        table: [`auto`, `fixed`]
      }],
      caption: [{
        caption: [`top`, `bottom`]
      }],
      transition: [{
        transition: [``, `all`, `colors`, `opacity`, `shadow`, `transform`, `none`, G, W]
      }],
      "transition-behavior": [{
        transition: [`normal`, `discrete`]
      }],
      duration: [{
        duration: [U, `initial`, G, W]
      }],
      ease: [{
        ease: [`linear`, `initial`, _, G, W]
      }],
      delay: [{
        delay: [U, G, W]
      }],
      animate: [{
        animate: [`none`, v, G, W]
      }],
      backface: [{
        backface: [`hidden`, `visible`]
      }],
      perspective: [{
        perspective: [h, G, W]
      }],
      "perspective-origin": [{
        "perspective-origin": x()
      }],
      rotate: [{
        rotate: pe()
      }],
      "rotate-x": [{
        "rotate-x": pe()
      }],
      "rotate-y": [{
        "rotate-y": pe()
      }],
      "rotate-z": [{
        "rotate-z": pe()
      }],
      scale: [{
        scale: me()
      }],
      "scale-x": [{
        "scale-x": me()
      }],
      "scale-y": [{
        "scale-y": me()
      }],
      "scale-z": [{
        "scale-z": me()
      }],
      "scale-3d": [`scale-3d`],
      skew: [{
        skew: he()
      }],
      "skew-x": [{
        "skew-x": he()
      }],
      "skew-y": [{
        "skew-y": he()
      }],
      transform: [{
        transform: [G, W, ``, `none`, `gpu`, `cpu`]
      }],
      "transform-origin": [{
        origin: x()
      }],
      "transform-style": [{
        transform: [`3d`, `flat`]
      }],
      translate: [{
        translate: ge()
      }],
      "translate-x": [{
        "translate-x": ge()
      }],
      "translate-y": [{
        "translate-y": ge()
      }],
      "translate-z": [{
        "translate-z": ge()
      }],
      "translate-none": [`translate-none`],
      zoom: [{
        zoom: [Pr, G, W]
      }],
      accent: [{
        accent: k()
      }],
      appearance: [{
        appearance: [`none`, `auto`]
      }],
      "caret-color": [{
        caret: k()
      }],
      "color-scheme": [{
        scheme: [`normal`, `dark`, `light`, `light-dark`, `only-dark`, `only-light`]
      }],
      cursor: [{
        cursor: [`auto`, `default`, `pointer`, `wait`, `text`, `move`, `help`, `not-allowed`, `none`, `context-menu`, `progress`, `cell`, `crosshair`, `vertical-text`, `alias`, `copy`, `no-drop`, `grab`, `grabbing`, `all-scroll`, `col-resize`, `row-resize`, `n-resize`, `e-resize`, `s-resize`, `w-resize`, `ne-resize`, `nw-resize`, `se-resize`, `sw-resize`, `ew-resize`, `ns-resize`, `nesw-resize`, `nwse-resize`, `zoom-in`, `zoom-out`, G, W]
      }],
      "field-sizing": [{
        "field-sizing": [`fixed`, `content`]
      }],
      "pointer-events": [{
        "pointer-events": [`auto`, `none`]
      }],
      resize: [{
        resize: [`none`, ``, `y`, `x`]
      }],
      "scroll-behavior": [{
        scroll: [`auto`, `smooth`]
      }],
      "scrollbar-thumb-color": [{
        "scrollbar-thumb": k()
      }],
      "scrollbar-track-color": [{
        "scrollbar-track": k()
      }],
      "scrollbar-gutter": [{
        "scrollbar-gutter": [`auto`, `stable`, `both`]
      }],
      "scrollbar-w": [{
        scrollbar: [`auto`, `thin`, `none`]
      }],
      "scroll-m": [{
        "scroll-m": w()
      }],
      "scroll-mx": [{
        "scroll-mx": w()
      }],
      "scroll-my": [{
        "scroll-my": w()
      }],
      "scroll-ms": [{
        "scroll-ms": w()
      }],
      "scroll-me": [{
        "scroll-me": w()
      }],
      "scroll-mbs": [{
        "scroll-mbs": w()
      }],
      "scroll-mbe": [{
        "scroll-mbe": w()
      }],
      "scroll-mt": [{
        "scroll-mt": w()
      }],
      "scroll-mr": [{
        "scroll-mr": w()
      }],
      "scroll-mb": [{
        "scroll-mb": w()
      }],
      "scroll-ml": [{
        "scroll-ml": w()
      }],
      "scroll-p": [{
        "scroll-p": w()
      }],
      "scroll-px": [{
        "scroll-px": w()
      }],
      "scroll-py": [{
        "scroll-py": w()
      }],
      "scroll-ps": [{
        "scroll-ps": w()
      }],
      "scroll-pe": [{
        "scroll-pe": w()
      }],
      "scroll-pbs": [{
        "scroll-pbs": w()
      }],
      "scroll-pbe": [{
        "scroll-pbe": w()
      }],
      "scroll-pt": [{
        "scroll-pt": w()
      }],
      "scroll-pr": [{
        "scroll-pr": w()
      }],
      "scroll-pb": [{
        "scroll-pb": w()
      }],
      "scroll-pl": [{
        "scroll-pl": w()
      }],
      "snap-align": [{
        snap: [`start`, `end`, `center`, `align-none`]
      }],
      "snap-stop": [{
        snap: [`normal`, `always`]
      }],
      "snap-type": [{
        snap: [`none`, `x`, `y`, `both`]
      }],
      "snap-strictness": [{
        snap: [`mandatory`, `proximity`]
      }],
      touch: [{
        touch: [`auto`, `none`, `manipulation`]
      }],
      "touch-x": [{
        "touch-pan": [`x`, `left`, `right`]
      }],
      "touch-y": [{
        "touch-pan": [`y`, `up`, `down`]
      }],
      "touch-pz": [`touch-pinch-zoom`],
      select: [{
        select: [`none`, `text`, `all`, `auto`]
      }],
      "will-change": [{
        "will-change": [`auto`, `scroll`, `contents`, `transform`, G, W]
      }],
      fill: [{
        fill: [`none`, ...k()]
      }],
      "stroke-w": [{
        stroke: [U, Qr, Gr, Kr]
      }],
      stroke: [{
        stroke: [`none`, ...k()]
      }],
      "forced-color-adjust": [{
        "forced-color-adjust": [`auto`, `none`]
      }]
    },
    conflictingClassGroups: {
      "container-named": [`container-type`],
      overflow: [`overflow-x`, `overflow-y`],
      overscroll: [`overscroll-x`, `overscroll-y`],
      inset: [`inset-x`, `inset-y`, `inset-bs`, `inset-be`, `start`, `end`, `top`, `right`, `bottom`, `left`],
      "inset-x": [`start`, `end`, `right`, `left`],
      "inset-y": [`inset-bs`, `inset-be`, `top`, `bottom`],
      flex: [`basis`, `grow`, `shrink`],
      gap: [`gap-x`, `gap-y`],
      p: [`px`, `py`, `ps`, `pe`, `pbs`, `pbe`, `pt`, `pr`, `pb`, `pl`],
      px: [`ps`, `pe`, `pr`, `pl`],
      py: [`pbs`, `pbe`, `pt`, `pb`],
      m: [`mx`, `my`, `ms`, `me`, `mbs`, `mbe`, `mt`, `mr`, `mb`, `ml`],
      mx: [`ms`, `me`, `mr`, `ml`],
      my: [`mbs`, `mbe`, `mt`, `mb`],
      size: [`w`, `h`],
      "font-size": [`leading`],
      "fvn-normal": [`fvn-ordinal`, `fvn-slashed-zero`, `fvn-figure`, `fvn-spacing`, `fvn-fraction`],
      "fvn-ordinal": [`fvn-normal`],
      "fvn-slashed-zero": [`fvn-normal`],
      "fvn-figure": [`fvn-normal`],
      "fvn-spacing": [`fvn-normal`],
      "fvn-fraction": [`fvn-normal`],
      "line-clamp": [`display`, `overflow`],
      rounded: [`rounded-s`, `rounded-e`, `rounded-t`, `rounded-r`, `rounded-b`, `rounded-l`, `rounded-ss`, `rounded-se`, `rounded-ee`, `rounded-es`, `rounded-tl`, `rounded-tr`, `rounded-br`, `rounded-bl`],
      "rounded-s": [`rounded-ss`, `rounded-es`],
      "rounded-e": [`rounded-se`, `rounded-ee`],
      "rounded-t": [`rounded-tl`, `rounded-tr`],
      "rounded-r": [`rounded-tr`, `rounded-br`],
      "rounded-b": [`rounded-br`, `rounded-bl`],
      "rounded-l": [`rounded-tl`, `rounded-bl`],
      "border-spacing": [`border-spacing-x`, `border-spacing-y`],
      "border-w": [`border-w-x`, `border-w-y`, `border-w-s`, `border-w-e`, `border-w-bs`, `border-w-be`, `border-w-t`, `border-w-r`, `border-w-b`, `border-w-l`],
      "border-w-x": [`border-w-s`, `border-w-e`, `border-w-r`, `border-w-l`],
      "border-w-y": [`border-w-bs`, `border-w-be`, `border-w-t`, `border-w-b`],
      "border-color": [`border-color-x`, `border-color-y`, `border-color-s`, `border-color-e`, `border-color-bs`, `border-color-be`, `border-color-t`, `border-color-r`, `border-color-b`, `border-color-l`],
      "border-color-x": [`border-color-s`, `border-color-e`, `border-color-r`, `border-color-l`],
      "border-color-y": [`border-color-bs`, `border-color-be`, `border-color-t`, `border-color-b`],
      translate: [`translate-x`, `translate-y`, `translate-none`],
      "translate-none": [`translate`, `translate-x`, `translate-y`, `translate-z`],
      "scroll-m": [`scroll-mx`, `scroll-my`, `scroll-ms`, `scroll-me`, `scroll-mbs`, `scroll-mbe`, `scroll-mt`, `scroll-mr`, `scroll-mb`, `scroll-ml`],
      "scroll-mx": [`scroll-ms`, `scroll-me`, `scroll-mr`, `scroll-ml`],
      "scroll-my": [`scroll-mbs`, `scroll-mbe`, `scroll-mt`, `scroll-mb`],
      "scroll-p": [`scroll-px`, `scroll-py`, `scroll-ps`, `scroll-pe`, `scroll-pbs`, `scroll-pbe`, `scroll-pt`, `scroll-pr`, `scroll-pb`, `scroll-pl`],
      "scroll-px": [`scroll-ps`, `scroll-pe`, `scroll-pr`, `scroll-pl`],
      "scroll-py": [`scroll-pbs`, `scroll-pbe`, `scroll-pt`, `scroll-pb`],
      touch: [`touch-x`, `touch-y`, `touch-pz`],
      "touch-x": [`touch`],
      "touch-y": [`touch`],
      "touch-pz": [`touch`]
    },
    conflictingClassGroupModifiers: {
      "font-size": [`leading`]
    },
    postfixLookupClassGroups: [`container-type`],
    orderSensitiveModifiers: [`*`, `**`, `after`, `backdrop`, `before`, `details-content`, `file`, `first-letter`, `first-line`, `marker`, `placeholder`, `selection`]
  };
});
function gi(...e) {
  return hi(Hn(e));
}
function Ki(e) {
  return Ge(e) ? Ft(new Proxy({}, {
    get(t, n, r) {
      return i(Reflect.get(e.value, n, r));
    },
    set(t, n, r) {
      return Ge(e.value[n]) && !Ge(r) ? e.value[n].value = r : e.value[n] = r, true;
    },
    deleteProperty(t, n) {
      return Reflect.deleteProperty(e.value, n);
    },
    has(t, n) {
      return Reflect.has(e.value, n);
    },
    ownKeys() {
      return Object.keys(e.value);
    },
    getOwnPropertyDescriptor() {
      return {
        enumerable: true,
        configurable: true
      };
    }
  })) : Ft(e);
}
function qi(e) {
  return Ki(B(e));
}
function Ji(e, ...t) {
  let n = t.flat(),
    r = n[0];
  return qi(() => Object.fromEntries(typeof r == `function` ? Object.entries(f(e)).filter(([e, t]) => !r(A(t), e)) : Object.entries(f(e)).filter(item => !n.includes(item[0]))));
}
function Xa(e) {
  let t = V(),
    n = t?.type.emits,
    r = {};
  return n?.length || console.warn(`No emitted event found. Please check component: ${t?.type.__name}`), n?.forEach(t => {
    r[et(ae(t))] = (...n) => e(t, ...n);
  }), r;
}
function $a(e) {
  let t = V(),
    n = Object.keys(t?.type.props ?? {}).reduce((acc, cur) => {
      let r = (t?.type.props[cur]).default;
      return r !== undefined && (acc[cur] = r), acc;
    }, {}),
    r = h(e);
  return B(() => {
    let e = {},
      i = t?.vnode.props ?? {};
    return Object.keys(i).forEach(item => {
      e[ae(item)] = i[item];
    }), Object.keys({
      ...n,
      ...e
    }).reduce((acc, cur) => (r.value[cur] !== undefined && (acc[cur] = r.value[cur]), acc), {});
  });
}
function eo(e, t) {
  let n = $a(e),
    r = t ? Xa(t) : {};
  return B(() => ({
    ...n.value,
    ...r
  }));
}
</script>
