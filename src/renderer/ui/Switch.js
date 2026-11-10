import { $ as e, $n as t, $t as n, A as r, An as i, At as a, B as o, Bt as s, C as c, Cn as l, Ct as u, D as d, Dn as f, Dt as p, E as m, En as h, Et as g, F as _, Ft as v, G as y, Gt as b, H as x, Ht as S, I as C, It as w, J as T, Jt as E, K as ee, Kt as te, L as ne, Lt as re, M as D, Mt as O, N as ie, Nn as ae, Nt as oe, O as k, On as A, Ot as se, P as ce, Pn as le, Pt as j, Q as M, Qt as ue, R as de, Rt as N, S as fe, Sn as pe, St as me, T as he, Tn as ge, Tt as _e, U as ve, Ut as ye, V as be, Vt as xe, W as Se, Wt as P, X as Ce, Xt as we, Y as Te, Yt as Ee, Z as De, Zt as Oe, _ as ke, _n as Ae, _t as je, a as Me, an as Ne, at as Pe, b as F, bn as I, bt as Fe, c as Ie, cn as Le, ct as Re, d as ze, dn as Be, dt as Ve, en as He, et as Ue, f as We, fn as Ge, ft as Ke, g as qe, gn as Je, gt as L, h as Ye, hn as Xe, ht as Ze, i as Qe, in as $e, ir as et, it as tt, j as R, jt as nt, k as rt, kn as it, kt as at, l as ot, ln as st, lt as ct, m as lt, mn as ut, mt as dt, nn as ft, nr as pt, nt as mt, o as ht, on as gt, ot as _t, p as vt, pn as yt, pt as bt, q as xt, qt as St, r as Ct, rn as wt, rr as Tt, rt as z, s as Et, sn as Dt, st as Ot, tn as kt, tr as At, tt as jt, u as Mt, un as Nt, ut as Pt, v as B, vn as Ft, vt as It, w as Lt, wn as Rt, wt as zt, x as Bt, xn as Vt, xt as Ht, y as Ut, yn as Wt, yt as Gt, z as V, zt as Kt } from "../chunks/vue-i18n.runtime.js";
import { C as qt, E as Jt, S as Yt, T as Xt, _ as Zt, a as Qt, b as $t, c as en, d as tn, f as nn, g as rn, h as an, i as on, l as sn, m as cn, o as ln, p as un, r as dn, s as fn, u as pn, v as mn, w as hn, x as gn, y as _n } from "../i18n/en-US-player.js";
import { r as vn } from "./icons/lucide-icons.js";
var yn = Object.create,
  bn = Object.defineProperty,
  xn = Object.getOwnPropertyDescriptor,
  Sn = Object.getOwnPropertyNames,
  Cn = Object.getPrototypeOf,
  wn = Object.prototype.hasOwnProperty,
  Tn = (e, t) => () => (t || (e((t = {
    exports: {}
  }).exports, t), e = null), t.exports),
  En = (e, t) => {
    let resolvedValue = {};
    for (var r in e) bn(resolvedValue, r, {
      get: e[r],
      enumerable: true
    });
    return t || bn(resolvedValue, Symbol.toStringTag, {
      value: `Module`
    }), resolvedValue;
  },
  Dn = (e, t, n, r) => {
    if (t && typeof t == `object` || typeof t == `function`) for (var i = Sn(t), a = 0, o = i.length, s; a < o; a++) s = i[a], !wn.call(e, s) && s !== n && bn(e, s, {
      get: (e => t[e]).bind(null, s),
      enumerable: !(r = xn(t, s)) || r.enumerable
    });
    return e;
  },
  On = (e, t, n) => (n = e == null ? {} : yn(Cn(e)), Dn(t || !e || !e.__esModule || !wn.call(e, `default`) ? bn(n, `default`, {
    value: e,
    enumerable: true
  }) : n, e)),
  kn = (e => typeof require < `u` ? require : typeof Proxy < `u` ? new Proxy(e, {
    get: (e, t) => (typeof require < `u` ? require : e)[t]
  }) : e)(function (e) {
    if (typeof require < `u`) return require.apply(this, arguments);
    throw Error("Calling `require` for \"" + e + "\" in an environment that doesn't expose the `require` function. See https://rolldown.rs/in-depth/bundling-cjs#require-external-modules for more details.");
  }),
  An = En({
    BaseTransition: () => Ct,
    BaseTransitionPropsValidators: () => Qe,
    Comment: () => Me,
    DeprecationTypes: () => null,
    EffectScope: () => He,
    ErrorCodes: () => ht,
    ErrorTypeStrings: () => Et,
    Fragment: () => Ie,
    KeepAlive: () => ot,
    ReactiveEffect: () => kt,
    Static: () => Mt,
    Suspense: () => ze,
    Teleport: () => We,
    Text: () => vt,
    TrackOpTypes: () => ft,
    Transition: () => dn,
    TransitionGroup: () => on,
    TriggerOpTypes: () => wt,
    VueElement: () => Qt,
    assertNumber: () => lt,
    callWithAsyncErrorHandling: () => Ye,
    callWithErrorHandling: () => qe,
    camelize: () => ae,
    capitalize: () => le,
    cloneVNode: () => ke,
    compatUtils: () => null,
    compile: () => jn,
    computed: () => B,
    createApp: () => ln,
    createBlock: () => F,
    createCommentVNode: () => Bt,
    createElementBlock: () => fe,
    createElementVNode: () => Ut,
    createHydrationRenderer: () => c,
    createPropsRestProxy: () => Lt,
    createRenderer: () => he,
    createSSRApp: () => fn,
    createSlots: () => m,
    createStaticVNode: () => d,
    createTextVNode: () => k,
    createVNode: () => rt,
    customRef: () => $e,
    defineAsyncComponent: () => r,
    defineComponent: () => R,
    defineCustomElement: () => en,
    defineEmits: () => D,
    defineExpose: () => ie,
    defineModel: () => ce,
    defineOptions: () => _,
    defineProps: () => C,
    defineSSRCustomElement: () => sn,
    defineSlots: () => ne,
    devtools: () => de,
    effect: () => Ne,
    effectScope: () => gt,
    getCurrentInstance: () => V,
    getCurrentScope: () => Dt,
    getCurrentWatcher: () => Le,
    getTransitionRawChildren: () => o,
    guardReactiveProps: () => be,
    h: () => x,
    handleError: () => ve,
    hasInjectionContext: () => Se,
    hydrate: () => pn,
    hydrateOnIdle: () => y,
    hydrateOnInteraction: () => ee,
    hydrateOnMediaQuery: () => xt,
    hydrateOnVisible: () => T,
    initCustomFormatter: () => Te,
    initDirectivesForSSR: () => tn,
    inject: () => Ce,
    isMemoSame: () => De,
    isProxy: () => st,
    isReactive: () => Nt,
    isReadonly: () => Be,
    isRef: () => Ge,
    isRuntimeOnly: () => M,
    isShallow: () => yt,
    isVNode: () => e,
    markRaw: () => ut,
    mergeDefaults: () => Ue,
    mergeModels: () => jt,
    mergeProps: () => mt,
    nextTick: () => z,
    nodeOps: () => nn,
    normalizeClass: () => t,
    normalizeProps: () => At,
    normalizeStyle: () => pt,
    onActivated: () => tt,
    onBeforeMount: () => Pe,
    onBeforeUnmount: () => _t,
    onBeforeUpdate: () => Ot,
    onDeactivated: () => Re,
    onErrorCaptured: () => ct,
    onMounted: () => Pt,
    onRenderTracked: () => Ve,
    onRenderTriggered: () => Ke,
    onScopeDispose: () => Xe,
    onServerPrefetch: () => bt,
    onUnmounted: () => dt,
    onUpdated: () => Ze,
    onWatcherCleanup: () => Je,
    openBlock: () => L,
    patchProp: () => un,
    popScopeId: () => je,
    provide: () => It,
    proxyRefs: () => Ae,
    pushScopeId: () => Gt,
    queuePostFlushCb: () => Fe,
    reactive: () => Ft,
    readonly: () => Wt,
    ref: () => I,
    registerRuntimeCompiler: () => Ht,
    render: () => cn,
    renderList: () => me,
    renderSlot: () => u,
    resolveComponent: () => zt,
    resolveDirective: () => _e,
    resolveDynamicComponent: () => g,
    resolveFilter: () => null,
    resolveTransitionHooks: () => p,
    setBlockTracking: () => se,
    setDevtoolsHook: () => at,
    setTransitionHooks: () => a,
    shallowReactive: () => Vt,
    shallowReadonly: () => pe,
    shallowRef: () => l,
    ssrContextKey: () => nt,
    ssrUtils: () => O,
    stop: () => Rt,
    toDisplayString: () => Tt,
    toHandlerKey: () => et,
    toHandlers: () => oe,
    toRaw: () => ge,
    toRef: () => h,
    toRefs: () => f,
    toValue: () => A,
    transformVNodeArgs: () => j,
    triggerRef: () => it,
    unref: () => i,
    useAttrs: () => v,
    useCssModule: () => an,
    useCssVars: () => rn,
    useHost: () => Zt,
    useId: () => w,
    useModel: () => re,
    useSSRContext: () => N,
    useShadowRoot: () => mn,
    useSlots: () => Kt,
    useTemplateRef: () => s,
    useTransitionState: () => xe,
    vModelCheckbox: () => _n,
    vModelDynamic: () => $t,
    vModelRadio: () => gn,
    vModelSelect: () => Yt,
    vModelText: () => qt,
    vShow: () => hn,
    version: () => S,
    warn: () => ye,
    watch: () => P,
    watchEffect: () => b,
    watchPostEffect: () => te,
    watchSyncEffect: () => St,
    withAsyncContext: () => E,
    withCtx: () => Ee,
    withDefaults: () => we,
    withDirectives: () => Oe,
    withKeys: () => Xt,
    withMemo: () => ue,
    withModifiers: () => Jt,
    withScopeId: () => n
  }),
  jn = () => {},
  Mn = vn(`circle`, [[`circle`, {
    cx: `12`,
    cy: `12`,
    r: `10`,
    key: `1mglay`
  }]]),
  Nn = vn(`image-plus`, [[`path`, {
    d: `M16 5h6`,
    key: `1vod17`
  }], [`path`, {
    d: `M19 2v6`,
    key: `4bpg5p`
  }], [`path`, {
    d: `M21 11.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7.5`,
    key: `1ue2ih`
  }], [`path`, {
    d: `m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21`,
    key: `1xmnt7`
  }], [`circle`, {
    cx: `9`,
    cy: `9`,
    r: `2`,
    key: `af1f0g`
  }]]),
  Pn = vn(`minus`, [[`path`, {
    d: `M5 12h14`,
    key: `1ays0h`
  }]]),
  Fn = vn(`pencil`, [[`path`, {
    d: `M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z`,
    key: `1a8usu`
  }], [`path`, {
    d: `m15 5 4 4`,
    key: `1mk7zo`
  }]]),
  In = vn(`plus`, [[`path`, {
    d: `M5 12h14`,
    key: `1ays0h`
  }], [`path`, {
    d: `M12 5v14`,
    key: `s699le`
  }]]),
  Ln = vn(`send`, [[`path`, {
    d: `M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z`,
    key: `1ffxy3`
  }], [`path`, {
    d: `m21.854 2.147-10.94 10.939`,
    key: `12cjpa`
  }]]),
  Rn = vn(`square`, [[`rect`, {
    width: `18`,
    height: `18`,
    x: `3`,
    y: `3`,
    rx: `2`,
    key: `afitv7`
  }]]),
  zn = vn(`trash-2`, [[`path`, {
    d: `M10 11v6`,
    key: `nco0om`
  }], [`path`, {
    d: `M14 11v6`,
    key: `outv1u`
  }], [`path`, {
    d: `M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6`,
    key: `miytrc`
  }], [`path`, {
    d: `M3 6h18`,
    key: `d0wm0j`
  }], [`path`, {
    d: `M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2`,
    key: `e791ji`
  }]]),
  Bn = vn(`type`, [[`path`, {
    d: `M12 4v16`,
    key: `1654pz`
  }], [`path`, {
    d: `M4 7V5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2`,
    key: `e0r10z`
  }], [`path`, {
    d: `M9 20h6`,
    key: `s66wpe`
  }]]);
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
var Un = e => typeof e == `boolean` ? `${e}` : e === 0 ? `0` : e,
  Wn = Hn,
  Gn = (e, t) => n => {
    if (t?.variants == null) return Wn(e, n?.class, n?.className);
    let {
        variants: r,
        defaultVariants: i
      } = t,
      a = Object.keys(r).map(item => {
        let t = n?.[item],
          a = i?.[item];
        if (t === null) return null;
        let o = Un(t) || Un(a);
        return r[item][o];
      }),
      o = n && Object.entries(n).reduce((acc, cur) => {
        let [n, r] = cur;
        return r === undefined || (acc[n] = r), acc;
      }, {});
    return Wn(e, a, t?.compoundVariants?.reduce((e, t) => {
      let {
        class: n,
        className: r,
        ...a
      } = t;
      return Object.entries(a).every(item => {
        let [t, n] = item;
        return Array.isArray(n) ? n.includes({
          ...i,
          ...o
        }[t]) : {
          ...i,
          ...o
        }[t] === n;
      }) ? [...e, n, r] : e;
    }, []), n?.class, n?.className);
  },
  Kn = (e, t) => {
    let n = Array(e.length + t.length);
    for (let t = 0; t < e.length; t++) n[t] = e[t];
    for (let r = 0; r < t.length; r++) n[e.length + r] = t[r];
    return n;
  },
  qn = (e, t) => ({
    classGroupId: e,
    validator: t
  }),
  Jn = (e = new Map(), t = null, n) => ({
    nextPart: e,
    validators: t,
    classGroupId: n
  }),
  Yn = `-`,
  Xn = [],
  Zn = `arbitrary..`,
  Qn = e => {
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
  },
  $n = (e, t, n) => {
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
  },
  er = e => e.slice(1, -1).indexOf(`:`) === -1 ? undefined : (() => {
    let t = e.slice(1, -1),
      n = t.indexOf(`:`),
      r = t.slice(0, n);
    return r ? Zn + r : undefined;
  })(),
  tr = e => {
    let {
      theme: t,
      classGroups: n
    } = e;
    return nr(n, t);
  },
  nr = (e, t) => {
    let n = Jn();
    for (let get in e) {
      let i = e[get];
      rr(i, n, get, t);
    }
    return n;
  },
  rr = (e, t, n, r) => {
    let length = e.length;
    for (let a = 0; a < length; a++) {
      let i = e[a];
      ir(i, t, n, r);
    }
  },
  ir = (e, t, n, r) => {
    if (typeof e == `string`) {
      ar(e, t, n);
      return;
    }
    if (typeof e == `function`) {
      or(e, t, n, r);
      return;
    }
    sr(e, t, n, r);
  },
  ar = (e, t, n) => {
    let r = e === `` ? t : cr(t, e);
    r.classGroupId = n;
  },
  or = (e, t, n, r) => {
    if (lr(e)) {
      rr(e(r), t, n, r);
      return;
    }
    t.validators === null && (t.validators = []), t.validators.push(qn(n, e));
  },
  sr = (e, t, n, r) => {
    let i = Object.entries(e),
      length = i.length;
    for (let e = 0; e < length; e++) {
      let [a, o] = i[e];
      rr(o, cr(t, a), n, r);
    }
  },
  cr = (e, t) => {
    let n = e,
      r = t.split(Yn),
      length = r.length;
    for (let e = 0; e < length; e++) {
      let t = r[e],
        i = n.nextPart.get(t);
      i || (i = Jn(), n.nextPart.set(t, i)), n = i;
    }
    return n;
  },
  lr = e => `isThemeGetter` in e && e.isThemeGetter === true,
  ur = e => {
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
  },
  dr = `!`,
  fr = `:`,
  pr = [],
  mr = (e, t, n, r, i) => ({
    modifiers: e,
    hasImportantModifier: t,
    baseClassName: n,
    maybePostfixModifierPosition: r,
    isExternal: i
  }),
  hr = e => {
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
  },
  gr = e => {
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
  },
  _r = e => ({
    cache: ur(e.cacheSize),
    parseClassName: hr(e),
    sortModifiers: gr(e),
    postfixLookupClassGroupIds: vr(e),
    ...Qn(e)
  }),
  vr = e => {
    let t = Object.create(null),
      postfixLookupClassGroups = e.postfixLookupClassGroups;
    if (postfixLookupClassGroups) for (let e = 0; e < postfixLookupClassGroups.length; e++) t[postfixLookupClassGroups[e]] = true;
    return t;
  },
  yr = /\s+/,
  br = (e, t) => {
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
  },
  xr = (...e) => {
    let t = 0,
      n,
      r,
      i = ``;
    for (; t < e.length;) (n = e[t++]) && (r = Sr(n)) && (i && (i += ` `), i += r);
    return i;
  },
  Sr = e => {
    if (typeof e == `string`) return e;
    let namespaceURI,
      n = ``;
    for (let r = 0; r < e.length; r++) e[r] && (namespaceURI = Sr(e[r])) && (n && (n += ` `), n += namespaceURI);
    return n;
  },
  Cr = (e, ...t) => {
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
  },
  wr = [],
  H = e => {
    let t = t => t[e] || wr;
    return t.isThemeGetter = true, t.themeKey = e, t;
  },
  Tr = /^\[(?:(\w[\w-]*):)?(.+)\]$/i,
  Er = /^\((?:(\w[\w-]*):)?(.+)\)$/i,
  Dr = /^\d+(?:\.\d+)?\/\d+(?:\.\d+)?$/,
  Or = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,
  kr = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,
  Ar = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix|color|light-dark)\(.+\)$/,
  jr = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,
  Mr = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/,
  Nr = e => Dr.test(e),
  U = e => !!e && !Number.isNaN(Number(e)),
  Pr = e => !!e && Number.isInteger(Number(e)),
  Fr = e => e.endsWith(`%`) && U(e.slice(0, -1)),
  Ir = e => Or.test(e),
  Lr = () => true,
  Rr = e => kr.test(e) && !Ar.test(e),
  zr = () => false,
  Br = e => jr.test(e),
  Vr = e => Mr.test(e),
  Hr = e => !W(e) && !G(e),
  Ur = e => e.startsWith(`@container`) && (e[10] === `/` && e[11] !== undefined || e[11] === `s` && e[16] !== undefined && e.startsWith(`-size/`, 10) || e[11] === `n` && e[18] !== undefined && e.startsWith(`-normal/`, 10)),
  Wr = e => ai(e, li, zr),
  W = e => Tr.test(e),
  Gr = e => ai(e, ui, Rr),
  Kr = e => ai(e, di, U),
  qr = e => ai(e, pi, Lr),
  Jr = e => ai(e, fi, zr),
  Yr = e => ai(e, si, zr),
  Xr = e => ai(e, ci, Vr),
  Zr = e => ai(e, mi, Br),
  G = e => Er.test(e),
  Qr = e => oi(e, ui),
  $r = e => oi(e, fi),
  ei = e => oi(e, si),
  ti = e => oi(e, li),
  ni = e => oi(e, ci),
  ri = e => oi(e, mi, true),
  ii = e => oi(e, pi, true),
  ai = (e, t, n) => {
    let r = Tr.exec(e);
    return r ? r[1] ? t(r[1]) : n(r[2]) : false;
  },
  oi = (e, t, n = false) => {
    let r = Er.exec(e);
    return r ? r[1] ? t(r[1]) : n : false;
  },
  si = e => e === `position` || e === `percentage`,
  ci = e => e === `image` || e === `url`,
  li = e => e === `length` || e === `size` || e === `bg-size`,
  ui = e => e === `length`,
  di = e => e === `number`,
  fi = e => e === `family-name`,
  pi = e => e === `number` || e === `weight`,
  mi = e => e === `shadow`,
  hi = Cr(() => {
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
function _i(e, t = -1 / 0, n = 1 / 0) {
  return Math.min(n, Math.max(t, e));
}
function vi(e, t) {
  let n = typeof e == `string` && !t ? `${e}Context` : t,
    r = Symbol(n);
  return [t => {
    let n = Ce(r, t);
    if (n || n === null) return n;
    throw Error(`Injection \`${r.toString()}\` not found. Component must be used within ${Array.isArray(e) ? `one of the following components: ${e.join(`, `)}` : `\`${e}\``}`);
  }, e => (It(r, e), e)];
}
function K() {
  let activeElement = document.activeElement;
  if (activeElement == null) return null;
  for (; activeElement != null && activeElement.shadowRoot != null && activeElement.shadowRoot.activeElement != null;) activeElement = activeElement.shadowRoot.activeElement;
  return activeElement;
}
function yi(e, t, n) {
  let target = n.originalEvent.target,
    i = new CustomEvent(e, {
      bubbles: false,
      cancelable: true,
      detail: n
    });
  t && target.addEventListener(e, t, {
    once: true
  }), target.dispatchEvent(i);
}
function bi(e) {
  return e == null;
}
function xi(e, t, n = {}) {
  let r,
    set,
    a,
    o = true,
    s = () => {
      o = true, a();
    };
  P(e, s, {
    flush: `sync`,
    ...n
  });
  let c = typeof t == `function` ? t : t.get,
    l = typeof t == `function` ? undefined : t.set,
    u = $e((e, t) => (set = e, a = t, {
      get() {
        return o &&= (r = c(r), false), set(), r;
      },
      set(e) {
        l?.(e);
      }
    }));
  return u.trigger = s, u;
}
function q(e, t) {
  return Dt() ? (Xe(e, t), true) : false;
}
function Si() {
  let e = new Set(),
    t = t => {
      e.delete(t);
    };
  return {
    on: n => {
      e.add(n);
      let r = () => t(n);
      return q(r), {
        off: r
      };
    },
    off: t,
    trigger: (...t) => Promise.all(Array.from(e).map(item => item(...t))),
    clear: () => {
      e.clear();
    }
  };
}
function Ci(e) {
  let t = false,
    n,
    r = gt(true);
  return (...i) => (t ||= (n = r.run(() => e(...i)), true), n);
}
var wi = new WeakMap(),
  Ti = (...e) => {
    let t = e[0],
      n = V()?.proxy ?? Dt();
    if (n == null && !Se()) throw Error(`injectLocal must be called in setup`);
    return n && wi.has(n) && t in wi.get(n) ? wi.get(n)[t] : Ce(...e);
  },
  J = typeof window < `u` && typeof document < `u`;
typeof WorkerGlobalScope < `u` && globalThis instanceof WorkerGlobalScope;
var Ei = e => e !== undefined,
  Di = e => e != null,
  Oi = Object.prototype.toString,
  ki = e => Oi.call(e) === `[object Object]`,
  Y = () => {},
  Ai = ji();
function ji() {
  var parentElement, ownerDocument;
  return J && !!((parentElement = window) != null && (parentElement = parentElement.navigator) != null && parentElement.userAgent) && (/iP(?:ad|hone|od)/.test(window.navigator.userAgent) || ((ownerDocument = window) == null || (ownerDocument = ownerDocument.navigator) == null ? undefined : ownerDocument.maxTouchPoints) > 2 && /iPad|Macintosh/.test(window?.navigator.userAgent));
}
function Mi(...e) {
  if (e.length !== 1) return h(...e);
  let t = e[0];
  return typeof t == `function` ? Wt($e(() => ({
    get: t,
    set: Y
  }))) : I(t);
}
function Ni(e, t) {
  function n(...n) {
    return new Promise((r, i) => {
      Promise.resolve(e(() => t.apply(this, n), {
        fn: t,
        thisArg: this,
        args: n
      })).then(r).catch(i);
    });
  }
  return `cancel` in e && Object.assign(n, {
    cancel: e.cancel,
    flush: e.flush,
    isPending: e.isPending
  }), n;
}
var Pi = e => e();
function Fi(e, t = {}) {
  let n,
    r,
    i = Y,
    a = Y,
    o = l(false),
    s = e => {
      clearTimeout(e), i(), i = Y;
    },
    c;
  return Object.assign(l => {
    let u = A(e),
      d = A(t.maxWait);
    return n && s(n), u <= 0 || d !== undefined && d <= 0 ? (r &&= (s(r), undefined), o.value = false, Promise.resolve(l())) : (o.value = true, new Promise((e, f) => {
      i = t.rejectOnCancel ? f : e, a = e, c = l, d && !r && (r = setTimeout(() => {
        n && s(n), r = undefined, o.value = false, e(c());
      }, d)), n = setTimeout(() => {
        r && s(r), r = undefined, o.value = false, e(l());
      }, u);
    }));
  }, {
    cancel: () => {
      n &&= (s(n), undefined), r &&= (s(r), undefined), o.value = false, a = Y;
    },
    flush: () => {
      if (o.value) {
        n &&= (clearTimeout(n), undefined), r &&= (clearTimeout(r), undefined), o.value = false;
        let e = a;
        i = Y, a = Y, e(c());
      }
    },
    isPending: pe(o)
  });
}
function Ii(...e) {
  let t = 0,
    n,
    r = true,
    i = Y,
    a,
    o,
    s,
    c,
    offsetLeft;
  !Ge(e[0]) && typeof e[0] == `object` ? {
    delay: o,
    trailing: s = true,
    leading: c = true,
    rejectOnCancel: offsetLeft = false
  } = e[0] : [o, s = true, c = true, offsetLeft = false] = e;
  let u = () => {
    n && (clearTimeout(n), n = undefined, i(), i = Y);
  };
  return e => {
    let d = A(o),
      f = Date.now() - t,
      p = () => a = e();
    return u(), d <= 0 ? (t = Date.now(), p()) : (f > d ? (t = Date.now(), (c || !r) && p()) : s && (a = new Promise((e, a) => {
      i = offsetLeft ? a : e, n = setTimeout(() => {
        t = Date.now(), r = true, e(p()), u();
      }, Math.max(0, d - f));
    })), !c && !n && (n = setTimeout(() => r = true, d)), r = false, a);
  };
}
function Li(e = Pi, t = {}) {
  let {
      initialState: n = `active`
    } = t,
    r = Mi(n === `active`);
  function i() {
    r.value = false;
  }
  function a() {
    r.value = true;
  }
  return {
    isActive: pe(r),
    pause: i,
    resume: a,
    eventFilter: (...t) => {
      r.value && e(...t);
    }
  };
}
function Ri(e) {
  return e.endsWith(`rem`) ? Number.parseFloat(e) * 16 : Number.parseFloat(e);
}
function zi(e) {
  return Array.isArray(e) ? e : [e];
}
function Bi(e) {
  let t = Object.create(null);
  return n => t[n] || (t[n] = e(n));
}
var Vi = /-(\w)/g,
  Hi = Bi(e => e.replace(Vi, (e, t) => t ? t.toUpperCase() : ``));
function Ui(e) {
  return e || V();
}
function Wi(e) {
  if (!J) return e;
  let t = 0,
    n,
    r,
    i = () => {
      --t, r && t <= 0 && (r.stop(), n = undefined, r = undefined);
    };
  return (...a) => (t += 1, r || (r = gt(true), n = r.run(() => e(...a))), q(i), n);
}
function Gi(e, t) {
  if (typeof Symbol < `u`) {
    let n = {
      ...e
    };
    return Object.defineProperty(n, Symbol.iterator, {
      enumerable: false,
      value() {
        let e = 0;
        return {
          next: () => ({
            value: t[e++],
            done: e > t.length
          })
        };
      }
    }), n;
  }
  return Object.assign([...t], e);
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
function Yi(e, t = 1e4) {
  return $e((n, r) => {
    let i = A(e),
      a,
      o = () => setTimeout(() => {
        i = A(e), r();
      }, A(t));
    return q(() => {
      clearTimeout(a);
    }), {
      get() {
        return n(), i;
      },
      set(e) {
        i = e, r(), clearTimeout(a), a = o();
      }
    };
  });
}
function Xi(e, t = 200, n = {}) {
  return Ni(Fi(t, n), e);
}
function Zi(e, t = 200, n = false, r = true, i = false) {
  return Ni(Ii(t, n, r, i), e);
}
function Qi(e, t, n = {}) {
  let {
    eventFilter: r = Pi,
    ...i
  } = n;
  return P(e, Ni(r, t), i);
}
function $i(e, t, n = {}) {
  let {
      eventFilter: r,
      initialState: i = `active`,
      ...a
    } = n,
    {
      eventFilter: o,
      pause: s,
      resume: c,
      isActive: l
    } = Li(r, {
      initialState: i
    });
  return {
    stop: Qi(e, t, {
      ...a,
      eventFilter: o
    }),
    pause: s,
    resume: c,
    isActive: l
  };
}
function ea(e, t) {
  Ui(t) && _t(e, t);
}
function ta(e, t = true, n) {
  Ui(n) ? Pt(e, n) : t ? e() : z(e);
}
function na(e, t = 1e3, n = {}) {
  let {
      immediate: r = true,
      immediateCallback: i = false
    } = n,
    a = null,
    o = l(false);
  function s() {
    a &&= (clearInterval(a), null);
  }
  function c() {
    o.value = false, s();
  }
  function u() {
    let n = A(t);
    n <= 0 || (o.value = true, i && e(), s(), o.value && (a = setInterval(e, n)));
  }
  return r && J && u(), (Ge(t) || typeof t == `function`) && q(P(t, () => {
    o.value && J && u();
  })), q(c), {
    isActive: pe(o),
    pause: c,
    resume: u
  };
}
function ra(e, t, n = {}) {
  let {
      immediate: r = true,
      immediateCallback: i = false
    } = n,
    a = l(false),
    o;
  function s() {
    o &&= (clearTimeout(o), undefined);
  }
  function c() {
    a.value = false, s();
  }
  function u(...n) {
    i && e(), s(), a.value = true, o = setTimeout(() => {
      a.value = false, o = undefined, e(...n);
    }, A(t));
  }
  return r && (a.value = true, J && u()), q(c), {
    isPending: pe(a),
    start: u,
    stop: c
  };
}
function ia(e, t, n) {
  return P(e, t, {
    ...n,
    immediate: true
  });
}
function aa(e, t, n) {
  return P(e, t, {
    ...n,
    once: true
  });
}
function oa(e = {}) {
  let {
      inheritAttrs: t = true,
      name: n = `ReusableTemplate`
    } = e,
    r = l(),
    i = R({
      name: `${n}.define`,
      setup(e, {
        slots: t
      }) {
        return () => {
          r.value = t.default;
        };
      }
    }),
    a = R({
      inheritAttrs: t,
      name: `${n}.reuse`,
      props: e.props,
      setup(n, {
        attrs: i,
        slots: a
      }) {
        return () => {
          if (!r.value) throw Error(`[VueUse] Failed to find the definition of reusable template`);
          let o = r.value?.call(r, {
            ...(e.props == null ? sa(i) : n),
            $slots: a
          });
          return t && o?.length === 1 ? o[0] : o;
        };
      }
    });
  return Gi({
    define: i,
    reuse: a
  }, [i, a]);
}
function sa(e) {
  let t = {};
  for (let n in e) t[Hi(n)] = e[n];
  return t;
}
var X = J ? window : undefined;
J && window.document, J && window.navigator, J && window.location;
function Z(e) {
  let t = A(e);
  return t?.$el ?? t;
}
function ca(...e) {
  let t = (e, t, n, r) => (e.addEventListener(t, n, r), () => e.removeEventListener(t, n, r)),
    n = B(() => {
      let t = zi(A(e[0])).filter(item => item != null);
      return t.every(item => typeof item != `string`) ? t : undefined;
    });
  return ia(() => [n.value?.map(e => Z(e)) ?? [X].filter(item => item != null), zi(A(n.value ? e[1] : e[0])), zi(i(n.value ? e[2] : e[1])), A(n.value ? e[3] : e[2])], ([e, n, r, i], a, o) => {
    if (!e?.length || !n?.length || !r?.length) return;
    let s = ki(i) ? {
        ...i
      } : i,
      c = e.flatMap(item => n.flatMap(n => r.map(r => t(item, n, r, s))));
    o(() => {
      c.forEach(item => item());
    });
  }, {
    flush: `post`
  });
}
function la() {
  let e = l(false),
    t = V();
  return t && Pt(() => {
    e.value = true;
  }, t), e;
}
function ua(e) {
  let t = la();
  return B(() => (t.value, !!e()));
}
function da(e, t, n = {}) {
  let {
      window: r = X,
      ...i
    } = n,
    a,
    o = ua(() => r && `MutationObserver` in r),
    s = () => {
      a &&= (a.disconnect(), undefined);
    },
    c = P(B(() => {
      let t = zi(A(e)).map(Z).filter(Di);
      return new Set(t);
    }), e => {
      s(), o.value && e.size && (a = new MutationObserver(t), e.forEach(item => a.observe(item, i)));
    }, {
      immediate: true,
      flush: `post`
    }),
    l = () => a?.takeRecords(),
    u = () => {
      c(), s();
    };
  return q(u), {
    isSupported: o,
    stop: u,
    takeRecords: l
  };
}
function fa(e) {
  return typeof e == `function` ? e : typeof e == `string` ? t => t.key === e : Array.isArray(e) ? t => e.includes(t.key) : () => true;
}
function pa(...e) {
  let t,
    n,
    r = {};
  e.length === 3 ? (t = e[0], n = e[1], r = e[2]) : e.length === 2 ? typeof e[1] == `object` ? (t = true, n = e[0], r = e[1]) : (t = e[0], n = e[1]) : (t = true, n = e[0]);
  let {
      target: i = X,
      eventName: a = `keydown`,
      passive: o = false,
      dedupe: s = false
    } = r,
    c = fa(t);
  return ca(i, a, e => {
    e.repeat && A(s) || c(e) && n(e);
  }, o);
}
function ma(e, t = {}) {
  let {
      immediate: n = true,
      fpsLimit: r = null,
      window: i = X,
      once: a = false
    } = t,
    o = l(false),
    s = B(() => {
      let e = A(r);
      return e ? 1e3 / e : null;
    }),
    c = 0,
    offsetTop = null;
  function d(t) {
    if (!o.value || !i) return;
    c ||= t;
    let n = t - c;
    if (s.value && n < s.value) {
      offsetTop = i.requestAnimationFrame(d);
      return;
    }
    if (c = t, e({
      delta: n,
      timestamp: t
    }), a) {
      o.value = false, offsetTop = null;
      return;
    }
    offsetTop = i.requestAnimationFrame(d);
  }
  function f() {
    !o.value && i && (o.value = true, c = 0, offsetTop = i.requestAnimationFrame(d));
  }
  function p() {
    o.value = false, offsetTop != null && i && (i.cancelAnimationFrame(offsetTop), offsetTop = null);
  }
  return n && f(), q(p), {
    isActive: pe(o),
    pause: p,
    resume: f
  };
}
var ha = Symbol(`vueuse-ssr-width`);
function ga() {
  let e = Se() ? Ti(ha, null) : null;
  return typeof e == `number` ? e : undefined;
}
function _a(e, t = {}) {
  let {
      window: n = X,
      ssrWidth: r = ga()
    } = t,
    i = ua(() => n && `matchMedia` in n && typeof n.matchMedia == `function`),
    a = l(typeof r == `number`),
    o = l(),
    s = l(false);
  return b(() => {
    if (a.value) {
      a.value = !i.value;
      let t = A(e).split(`,`);
      s.value = t.some(item => {
        let includes = item.includes(`not all`),
          n = item.match(/\(\s*min-width:\s*(-?\d+(?:\.\d*)?[a-z]+\s*)\)/),
          i = item.match(/\(\s*max-width:\s*(-?\d+(?:\.\d*)?[a-z]+\s*)\)/),
          a = !!(n || i);
        return n && a && (a = r >= Ri(n[1])), i && a && (a = r <= Ri(i[1])), includes ? !a : a;
      });
      return;
    }
    i.value && (o.value = n.matchMedia(A(e)), s.value = o.value.matches);
  }), ca(o, `change`, e => {
    s.value = e.matches;
  }, {
    passive: true
  }), B(() => s.value);
}
function va(e) {
  return JSON.parse(JSON.stringify(e));
}
var ya = typeof globalThis < `u` ? globalThis : typeof window < `u` ? window : typeof global < `u` ? global : typeof self < `u` ? self : {},
  ba = `__vueuse_ssr_handlers__`,
  xa = Sa();
function Sa() {
  return ba in ya || (ya[ba] = ya[ba] || {}), ya[ba];
}
function Ca(e, t) {
  return xa[e] || t;
}
function wa(e) {
  return e == null ? `any` : e instanceof Set ? `set` : e instanceof Map ? `map` : e instanceof Date ? `date` : typeof e == `boolean` ? `boolean` : typeof e == `string` ? `string` : typeof e == `object` ? `object` : Number.isNaN(e) ? `any` : `number`;
}
var Ta = {
    boolean: {
      read: e => e === `true`,
      write: e => String(e)
    },
    object: {
      read: e => JSON.parse(e),
      write: e => JSON.stringify(e)
    },
    number: {
      read: e => Number.parseFloat(e),
      write: e => String(e)
    },
    any: {
      read: e => e,
      write: e => String(e)
    },
    string: {
      read: e => e,
      write: e => String(e)
    },
    map: {
      read: e => new Map(JSON.parse(e)),
      write: e => JSON.stringify(Array.from(e.entries()))
    },
    set: {
      read: e => new Set(JSON.parse(e)),
      write: e => JSON.stringify(Array.from(e))
    },
    date: {
      read: e => new Date(e),
      write: e => e.toISOString()
    }
  },
  Ea = `vueuse-storage`;
function Da(e, t, n, r = {}) {
  let {
      flush: i = `pre`,
      deep: a = true,
      listenToStorageChanges: o = true,
      writeDefaults: s = true,
      mergeDefaults: c = false,
      shallow: u,
      window: d = X,
      eventFilter: f,
      onError: p = e => {
        console.error(e);
      },
      initOnMounted: m
    } = r,
    h = (u ? l : I)(typeof t == `function` ? t() : t),
    g = B(() => A(e));
  if (!n) try {
    n = Ca(`getDefaultStorage`, () => X?.localStorage)();
  } catch (e) {
    p(e);
  }
  if (!n) return h;
  let _ = A(t),
    v = wa(_),
    y = r.serializer ?? Ta[v],
    {
      pause: b,
      resume: x
    } = $i(h, e => w(e), {
      flush: i,
      deep: a,
      eventFilter: f
    });
  P(g, () => E(), {
    flush: i
  });
  let S = false;
  d && o && (n instanceof Storage ? ca(d, `storage`, e => {
    (!m || S) && E(e);
  }, {
    passive: true
  }) : ca(d, Ea, e => {
    (!m || S) && ee(e);
  })), m ? ta(() => {
    S = true, E();
  }) : E();
  function C(e, t) {
    if (d) {
      let options = {
        key: g.value,
        oldValue: e,
        newValue: t,
        storageArea: n
      };
      d.dispatchEvent(n instanceof Storage ? new StorageEvent(`storage`, options) : new CustomEvent(Ea, {
        detail: options
      }));
    }
  }
  function w(e) {
    try {
      let item = n.getItem(g.value);
      if (e == null) C(item, null), n.removeItem(g.value);else {
        let r = y.write(e);
        item !== r && (n.setItem(g.value, r), C(item, r));
      }
    } catch (e) {
      p(e);
    }
  }
  function T(e) {
    let t = e ? e.newValue : n.getItem(g.value);
    if (t == null) return s && _ != null && n.setItem(g.value, y.write(_)), _;
    if (!e && c) {
      let e = y.read(t);
      return typeof c == `function` ? c(e, _) : v === `object` && !Array.isArray(e) ? {
        ..._,
        ...e
      } : e;
    }
    return typeof t == `string` ? y.read(t) : t;
  }
  function E(e) {
    if (!(e && e.storageArea !== n)) {
      if (e && e.key == null) {
        h.value = _;
        return;
      }
      if (!(e && e.key !== g.value)) {
        b();
        try {
          let t = y.write(h.value);
          (e === undefined || e?.newValue !== t) && (h.value = T(e));
        } catch (e) {
          p(e);
        } finally {
          e ? z(x) : x();
        }
      }
    }
  }
  function ee(e) {
    E(e.detail);
  }
  return h;
}
function Oa(e) {
  let t = V(),
    n = xi(() => null, () => e ? Z(e) : t.proxy.$el);
  return Ze(n.trigger), Pt(n.trigger), n;
}
function ka(e, t, n = {}) {
  let {
      window: r = X,
      ...i
    } = n,
    a,
    o = ua(() => r && `ResizeObserver` in r),
    s = () => {
      a &&= (a.disconnect(), undefined);
    },
    c = P(B(() => {
      let t = A(e);
      return Array.isArray(t) ? t.map(item => Z(item)) : [Z(t)];
    }), e => {
      if (s(), o.value && r) {
        a = new ResizeObserver(t);
        for (let t of e) t && a.observe(t, i);
      }
    }, {
      immediate: true,
      flush: `post`
    }),
    l = () => {
      s(), c();
    };
  return q(l), {
    isSupported: o,
    stop: l
  };
}
function Aa(e, t = {
  width: 0,
  height: 0
}, n = {}) {
  let {
      window: r = X,
      box: i = `content-box`
    } = n,
    a = B(() => {
      var t;
      return (t = Z(e)) == null || (t = t.namespaceURI) == null ? undefined : t.includes(`svg`);
    }),
    o = l(t.width),
    s = l(t.height),
    {
      stop: c
    } = ka(e, ([t]) => {
      let n = i === `border-box` ? t.borderBoxSize : i === `content-box` ? t.contentBoxSize : t.devicePixelContentBoxSize;
      if (r && a.value) {
        let t = Z(e);
        if (t) {
          let boundingClientRect = t.getBoundingClientRect();
          o.value = boundingClientRect.width, s.value = boundingClientRect.height;
        }
      } else if (n) {
        let e = zi(n);
        o.value = e.reduce((acc, {
          inlineSize: t
        }) => acc + t, 0), s.value = e.reduce((acc, {
          blockSize: t
        }) => acc + t, 0);
      } else o.value = t.contentRect.width, s.value = t.contentRect.height;
    }, n);
  ta(() => {
    let n = Z(e);
    if (n && `offsetWidth` in n) {
      if (i === `content-box` && r) {
        let computedStyle = r.getComputedStyle(n),
          t = Number.parseFloat(computedStyle.paddingLeft) + Number.parseFloat(computedStyle.paddingRight),
          i = Number.parseFloat(computedStyle.paddingTop) + Number.parseFloat(computedStyle.paddingBottom),
          a = Number.parseFloat(computedStyle.borderLeftWidth) + Number.parseFloat(computedStyle.borderRightWidth),
          c = Number.parseFloat(computedStyle.borderTopWidth) + Number.parseFloat(computedStyle.borderBottomWidth);
        o.value = n.offsetWidth - t - a, s.value = n.offsetHeight - i - c;
      } else o.value = n.offsetWidth, s.value = n.offsetHeight;
    } else n && (o.value = t.width, s.value = t.height);
  });
  let u = P(() => Z(e), e => {
    o.value = e ? t.width : 0, s.value = e ? t.height : 0;
  });
  function d() {
    c(), u();
  }
  return {
    width: o,
    height: s,
    stop: d
  };
}
var ja = new Map();
function Ma(e) {
  function t(t) {
    let n = ja.get(e) || new Set();
    n.add(t), ja.set(e, n);
    let i = () => r(t);
    return q(i), i;
  }
  function n(e) {
    function n(...t) {
      r(n), e(...t);
    }
    return t(n);
  }
  function r(t) {
    let n = ja.get(e);
    n && (n.delete(t), n.size || i());
  }
  function i() {
    ja.delete(e);
  }
  function a(t, n) {
    var r;
    (r = ja.get(e)) == null || r.forEach(item => item(t, n));
  }
  return {
    on: t,
    once: n,
    off: r,
    emit: a,
    reset: i
  };
}
var Na = 1;
function Pa(e, t = {}) {
  let {
      throttle: n = 0,
      idle: r = 200,
      onStop: i = Y,
      onScroll: a = Y,
      offset: o = {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
      },
      observe: s = {
        mutation: false
      },
      eventListenerOptions: c = {
        capture: false,
        passive: true
      },
      behavior: u = `auto`,
      window: d = X,
      onError: f = e => {
        console.error(e);
      }
    } = t,
    p = typeof s == `boolean` ? {
      mutation: s
    } : s,
    m = l(0),
    h = l(0),
    g = B({
      get() {
        return m.value;
      },
      set(e) {
        v(e, undefined);
      }
    }),
    _ = B({
      get() {
        return h.value;
      },
      set(e) {
        v(undefined, e);
      }
    });
  function v(t, n) {
    var r, i;
    if (!d) return;
    let a = A(e);
    if (!a) return;
    (r = a instanceof Document ? d.document.body : a) == null || r.scrollTo({
      top: A(n) ?? _.value,
      left: A(t) ?? g.value,
      behavior: A(u)
    });
    let o = (a == null || (i = a.document) == null ? undefined : i.documentElement) || a?.documentElement || a;
    g != null && (m.value = o.scrollLeft), _ != null && (h.value = o.scrollTop);
  }
  let y = l(false),
    b = Ft({
      left: true,
      right: false,
      top: true,
      bottom: false
    }),
    x = Ft({
      left: false,
      right: false,
      top: false,
      bottom: false
    }),
    S = e => {
      y.value && (y.value = false, x.left = false, x.right = false, x.top = false, x.bottom = false, i(e));
    },
    C = Xi(S, n + r),
    w = e => {
      var t;
      if (!d) return;
      let n = (e == null || (t = e.document) == null ? undefined : t.documentElement) || e?.documentElement || Z(e),
        {
          display: r,
          flexDirection: i,
          direction: a
        } = d.getComputedStyle(n),
        s = a === `rtl` ? -1 : 1,
        scrollLeft = n.scrollLeft;
      x.left = scrollLeft < m.value, x.right = scrollLeft > m.value;
      let l = Math.abs(scrollLeft * s) <= (o.left || 0),
        u = Math.abs(scrollLeft * s) + n.clientWidth >= n.scrollWidth - (o.right || 0) - Na;
      r === `flex` && i === `row-reverse` ? (b.left = u, b.right = l) : (b.left = l, b.right = u), m.value = scrollLeft;
      let scrollTop = n.scrollTop;
      e === d.document && !scrollTop && (scrollTop = d.document.body.scrollTop), x.top = scrollTop < h.value, x.bottom = scrollTop > h.value;
      let p = Math.abs(scrollTop) <= (o.top || 0),
        g = Math.abs(scrollTop) + n.clientHeight >= n.scrollHeight - (o.bottom || 0) - Na;
      r === `flex` && i === `column-reverse` ? (b.top = g, b.bottom = p) : (b.top = p, b.bottom = g), h.value = scrollTop;
    },
    T = e => {
      if (!d) return;
      let t = e.target.documentElement ?? e.target;
      w(t), y.value = true, C(e), a(e);
    };
  return ca(e, `scroll`, n ? Zi(T, n, true, false) : T, c), ta(() => {
    try {
      let t = A(e);
      if (!t) return;
      w(t);
    } catch (e) {
      f(e);
    }
  }), p?.mutation && e != null && e !== d && e !== document && da(e, () => {
    let t = A(e);
    t && w(t);
  }, {
    attributes: true,
    childList: true,
    subtree: true
  }), ca(e, `scrollend`, S, c), {
    x: g,
    y: _,
    isScrolling: y,
    arrivedState: b,
    directions: x,
    measure() {
      let t = A(e);
      d && t && w(t);
    }
  };
}
function Fa(e) {
  if (`interval` in e || `immediate` in e) {
    let {
      interval: t = `requestAnimationFrame`,
      immediate: n = true
    } = e;
    return t === `requestAnimationFrame` ? e => ma(e, {
      immediate: n
    }) : n => na(n, t, e);
  }
  return ma;
}
function Ia(e = {}) {
  let {
      controls: t = false,
      scheduler: n = Fa(e)
    } = e,
    r = l(new Date()),
    i = n(() => r.value = new Date());
  return t ? {
    now: r,
    ...i
  } : r;
}
function La(e) {
  let t = _a(`(prefers-reduced-motion: reduce)`, e);
  return B(() => t.value ? `reduce` : `no-preference`);
}
function Ra(e, t, n, r = {}) {
  var i, a;
  let {
      clone: o = false,
      passive: s = false,
      eventName: c,
      deep: l = false,
      defaultValue: u,
      shouldEmit: d
    } = r,
    f = V(),
    p = n || f?.emit || (f == null || (i = f.$emit) == null ? undefined : i.bind(f)) || (f == null || (a = f.proxy) == null || (a = a.$emit) == null ? undefined : a.bind(f?.proxy)),
    m = c;
  t ||= `modelValue`, m ||= `update:${t.toString()}`;
  let h = e => o ? typeof o == `function` ? o(e) : va(e) : e,
    g = () => Ei(e[t]) ? h(e[t]) : u,
    _ = e => {
      d ? d(e) && p(m, e) : p(m, e);
    };
  if (s) {
    let n = I(g()),
      r = false;
    return P(() => e[t], e => {
      r || (r = true, n.value = h(e), z(() => r = false));
    }), P(n, n => {
      !r && (n !== e[t] || l) && _(n);
    }, {
      deep: l
    }), n;
  }
  return B({
    get() {
      return g();
    },
    set(e) {
      _(e);
    }
  });
}
function za(e) {
  return e ? e.flatMap(item => item.type === Ie ? za(item.children) : [item]) : [];
}
var [Ba, Va] = vi(`ConfigProvider`),
  Q = Ft({
    layersRoot: new Set(),
    layersWithOutsidePointerEventsDisabled: new Set(),
    originalBodyPointerEvents: undefined,
    branches: new Set()
  });
function Ha(e) {
  if (typeof e != `object` || !e) return false;
  let prototypeOf = Object.getPrototypeOf(e);
  return prototypeOf !== null && prototypeOf !== Object.prototype && Object.getPrototypeOf(prototypeOf) !== null || Symbol.iterator in e ? false : Symbol.toStringTag in e ? Object.prototype.toString.call(e) === `[object Module]` : true;
}
function Ua(e, t, n = `.`, r) {
  if (!Ha(t)) return Ua(e, {}, n, r);
  let i = {
    ...t
  };
  for (let t of Object.keys(e)) {
    if (t === `__proto__` || t === `constructor`) continue;
    let a = e[t];
    a != null && (r && r(i, t, a, n) || (i[t] = Array.isArray(a) && Array.isArray(i[t]) ? [...a, ...i[t]] : Ha(a) && Ha(i[t]) ? Ua(a, i[t], (n ? `${n}.` : ``) + t.toString(), r) : a));
  }
  return i;
}
function Wa(e) {
  return (...t) => t.reduce((acc, cur) => Ua(acc, cur, ``, e), {});
}
var Ga = Wa(),
  Ka = Wi(() => {
    let e = I(new Map()),
      t = I(),
      n = B(() => {
        for (let t of e.value.values()) if (t) return true;
        return false;
      }),
      r = Ba({
        scrollBody: I(true)
      }),
      i = null,
      a = () => {
        document.body.style.paddingRight = ``, document.body.style.marginRight = ``, Q.layersWithOutsidePointerEventsDisabled.size === 0 && (document.body.style.pointerEvents = ``), document.documentElement.style.removeProperty(`--scrollbar-width`), document.body.style.overflow = t.value ?? ``, Ai && i?.(), t.value = undefined;
      };
    return P(n, (e, o) => {
      if (!J) return;
      if (!e) {
        o && a();
        return;
      }
      t.value === undefined && (t.value = document.body.style.overflow);
      let s = window.innerWidth - document.documentElement.clientWidth,
        c = {
          padding: s,
          margin: 0
        },
        l = r.scrollBody?.value ? typeof r.scrollBody.value == `object` ? Ga({
          padding: r.scrollBody.value.padding === true ? s : r.scrollBody.value.padding,
          margin: r.scrollBody.value.margin === true ? s : r.scrollBody.value.margin
        }, c) : c : {
          padding: 0,
          margin: 0
        };
      s > 0 && (document.body.style.paddingRight = typeof l.padding == `number` ? `${l.padding}px` : String(l.padding), document.body.style.marginRight = typeof l.margin == `number` ? `${l.margin}px` : String(l.margin), document.documentElement.style.setProperty(`--scrollbar-width`, `${s}px`), document.body.style.overflow = `hidden`), Ai && (i = ca(document, `touchmove`, e => Ya(e), {
        passive: false
      })), z(() => {
        n.value && (document.body.style.pointerEvents = `none`, document.body.style.overflow = `hidden`);
      });
    }, {
      immediate: true,
      flush: `sync`
    }), e;
  });
function qa(e) {
  let substring = Math.random().toString(36).substring(2, 7),
    n = Ka();
  n.value.set(substring, e ?? false);
  let r = B({
    get: () => n.value.get(substring) ?? false,
    set: e => n.value.set(substring, e)
  });
  return ea(() => {
    n.value.delete(substring);
  }), r;
}
function Ja(e) {
  let computedStyleResult = window.getComputedStyle(e);
  if (computedStyleResult.overflowX === `scroll` || computedStyleResult.overflowY === `scroll` || computedStyleResult.overflowX === `auto` && e.clientWidth < e.scrollWidth || computedStyleResult.overflowY === `auto` && e.clientHeight < e.scrollHeight) return true;
  {
    let parentNode = e.parentNode;
    return !(parentNode instanceof Element) || parentNode.tagName === `BODY` ? false : Ja(parentNode);
  }
}
function Ya(e) {
  let t = e || window.event,
    target = t.target;
  return target instanceof Element && Ja(target) ? false : t.touches.length > 1 || (t.preventDefault && t.cancelable && t.preventDefault(), false);
}
function Xa(e) {
  let t = V(),
    n = t?.type.emits,
    r = {};
  return n?.length || console.warn(`No emitted event found. Please check component: ${t?.type.__name}`), n?.forEach(t => {
    r[et(ae(t))] = (...n) => e(t, ...n);
  }), r;
}
function Za(e) {
  return B(() => !A(e) || !!Z(e)?.closest(`form`));
}
function Qa() {
  let e = V(),
    t = I(),
    n = B(() => r());
  Ze(() => {
    n.value !== r() && it(t);
  });
  function r() {
    return t.value && `$el` in t.value && [`#text`, `#comment`].includes(t.value.$el.nodeName) ? t.value.$el.nextElementSibling : Z(t);
  }
  let i = Object.assign({}, e.exposed),
    a = {};
  for (let t in e.props) Object.defineProperty(a, t, {
    enumerable: true,
    configurable: true,
    get: () => e.props[t]
  });
  if (Object.keys(i).length > 0) for (let e in i) Object.defineProperty(a, e, {
    enumerable: true,
    configurable: true,
    get: () => i[e]
  });
  Object.defineProperty(a, "$el", {
    enumerable: true,
    configurable: true,
    get: () => e.vnode.el
  }), e.exposed = a;
  function o(n) {
    if (t.value = n, n && (Object.defineProperty(a, "$el", {
      enumerable: true,
      configurable: true,
      get: () => n instanceof Element ? n : n.$el
    }), !(n instanceof Element) && !Object.hasOwn(n, `$el`))) {
      let exposed = n.$.exposed,
        r = Object.assign({}, a);
      for (let e in exposed) Object.defineProperty(r, e, {
        enumerable: true,
        configurable: true,
        get: () => exposed[e]
      });
      e.exposed = r;
    }
  }
  return {
    forwardRef: o,
    currentRef: t,
    currentElement: n
  };
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
function to() {
  let e = V()?.vnode?.scopeId;
  return e ? {
    [e]: ``
  } : {};
}
var no = function (e) {
    return typeof document > `u` ? null : (Array.isArray(e) ? e[0] : e).ownerDocument.body;
  },
  ro = new WeakMap(),
  io = new WeakMap(),
  ao = {},
  oo = 0,
  so = function (e) {
    return e && (e.host || so(e.parentNode));
  },
  co = function (e, t) {
    return t.map(function (item) {
      if (e.contains(item)) return item;
      var n = so(item);
      return n && e.contains(n) ? n : (console.error(`aria-hidden`, item, `in not contained inside`, e, `. Doing nothing`), null);
    }).filter(function (item) {
      return !!item;
    });
  },
  lo = function (e, t, n, r) {
    var i = co(t, Array.isArray(e) ? e : [e]);
    ao[n] || (ao[n] = new WeakMap());
    var a = ao[n],
      o = [],
      s = new Set(),
      c = new Set(i),
      l = function (e) {
        e && !s.has(e) && (s.add(e), l(e.parentNode));
      };
    i.forEach(l);
    var u = function (e) {
      e && !c.has(e) && Array.prototype.forEach.call(e.children, function (e) {
        if (s.has(e)) u(e);else try {
          var t = e.getAttribute(r),
            i = t !== null && t !== `false`,
            c = (ro.get(e) || 0) + 1,
            l = (a.get(e) || 0) + 1;
          ro.set(e, c), a.set(e, l), o.push(e), c === 1 && i && io.set(e, true), l === 1 && e.setAttribute(n, `true`), i || e.setAttribute(r, `true`);
        } catch (t) {
          console.error(`aria-hidden: cannot operate on `, e, t);
        }
      });
    };
    return u(t), s.clear(), oo++, function () {
      o.forEach(function (item) {
        var t = ro.get(item) - 1,
          i = a.get(item) - 1;
        ro.set(item, t), a.set(item, i), t || (io.has(item) || item.removeAttribute(r), io.delete(item)), i || item.removeAttribute(n);
      }), oo--, oo || (ro = new WeakMap(), ro = new WeakMap(), io = new WeakMap(), ao = {});
    };
  },
  uo = function (e, t, n) {
    n === undefined && (n = `data-aria-hidden`);
    var r = Array.from(Array.isArray(e) ? e : [e]),
      i = t || no(e);
    return i ? (r.push.apply(r, Array.from(i.querySelectorAll(`[aria-live], script`))), lo(r, i, n, `aria-hidden`)) : function () {
      return null;
    };
  };
function fo(e) {
  let t;
  P(() => Z(e), e => {
    let n = false;
    try {
      n = !!e?.closest(`[popover]:not(:popover-open)`);
    } catch {}
    e && !n ? t = uo(e) : t && t();
  }), dt(() => {
    t && t();
  });
}
var po = 0;
function mo(e, t = `reka`) {
  if (e) return e;
  let n,
    r = Ba({
      useId: undefined
    });
  return n = r.useId ? r.useId() : `useId` in An ? w?.() : `${++po}`, t ? `${t}-${n}` : n;
}
function ho(e, t) {
  let n = I(e);
  function r(e) {
    return t[n.value][e] ?? n.value;
  }
  return {
    state: n,
    dispatch: e => {
      n.value = r(e);
    }
  };
}
function go(e) {
  let t = Yi(``, 1e3);
  return {
    search: t,
    handleTypeaheadSearch: (n, r) => {
      if (t.value += n, e) e(n);else {
        let e = K(),
          n = r.map(item => ({
            ...item,
            textValue: item.value?.textValue ?? item.ref.textContent?.trim() ?? ``
          })),
          i = n.find(item => item.ref === e),
          a = vo(n.map(item => item.textValue), t.value, i?.textValue),
          o = n.find(item => item.textValue === a);
        return o && o.ref.focus(), o?.ref;
      }
    },
    resetTypeahead: () => {
      t.value = ``;
    }
  };
}
function _o(e, t) {
  return e.map((item, r) => e[(t + r) % e.length]);
}
function vo(e, t, n) {
  let r = t.length > 1 && Array.from(t).every(item => item === t[0]) ? t[0] : t,
    i = n ? e.indexOf(n) : -1,
    a = _o(e, Math.max(i, 0));
  r.length === 1 && (a = a.filter(item => item !== n));
  let o = a.find(item => item.toLowerCase().startsWith(r.toLowerCase()));
  return o === n ? undefined : o;
}
function yo(e, t) {
  let n = I({}),
    r = I(`none`),
    i = I(e),
    a = e.value ? `mounted` : `unmounted`,
    o,
    s = t.value?.ownerDocument.defaultView ?? X,
    {
      state: c,
      dispatch: l
    } = ho(a, {
      mounted: {
        UNMOUNT: `unmounted`,
        ANIMATION_OUT: `unmountSuspended`
      },
      unmountSuspended: {
        MOUNT: `mounted`,
        ANIMATION_END: `unmounted`
      },
      unmounted: {
        MOUNT: `mounted`
      }
    }),
    u = e => {
      if (J) {
        let n = new CustomEvent(e, {
          bubbles: false,
          cancelable: false
        });
        t.value?.dispatchEvent(n);
      }
    };
  P(e, async (e, i) => {
    let a = i !== e;
    if (await z(), a) {
      let value = r.value,
        o = bo(t.value);
      e ? (l(`MOUNT`), u(`enter`), o === `none` && u(`after-enter`)) : o === `none` || o === `undefined` || n.value?.display === `none` ? (l(`UNMOUNT`), u(`leave`), u(`after-leave`)) : i && value !== o ? (l(`ANIMATION_OUT`), u(`leave`)) : (l(`UNMOUNT`), u(`after-leave`));
    }
  }, {
    immediate: true
  });
  let d = e => {
      if (e.target !== t.value) return;
      let n = bo(t.value),
        includesResult = n.includes(CSS.escape(e.animationName)),
        a = c.value === `mounted` ? `enter` : `leave`;
      if (includesResult && (u(`after-${a}`), l(`ANIMATION_END`), !i.value)) {
        let animationFillMode = t.value.style.animationFillMode;
        t.value.style.animationFillMode = `forwards`, o = s?.setTimeout(() => {
          t.value?.style.animationFillMode === `forwards` && (t.value.style.animationFillMode = animationFillMode);
        });
      }
      n === `none` && l(`ANIMATION_END`);
    },
    f = e => {
      e.target === t.value && (r.value = bo(t.value));
    },
    p = P(t, (e, t) => {
      e ? (n.value = getComputedStyle(e), e.addEventListener(`animationstart`, f), e.addEventListener(`animationcancel`, d), e.addEventListener(`animationend`, d)) : (l(`ANIMATION_END`), o !== undefined && s?.clearTimeout(o), t?.removeEventListener(`animationstart`, f), t?.removeEventListener(`animationcancel`, d), t?.removeEventListener(`animationend`, d));
    }, {
      immediate: true
    }),
    m = P(c, () => {
      let e = bo(t.value);
      r.value = c.value === `mounted` ? e : `none`;
    });
  return dt(() => {
    p(), m(), t.value && (t.value.removeEventListener(`animationstart`, f), t.value.removeEventListener(`animationcancel`, d), t.value.removeEventListener(`animationend`, d)), o !== undefined && s?.clearTimeout(o);
  }), {
    isPresent: B(() => [`mounted`, `unmountSuspended`].includes(c.value))
  };
}
function bo(e) {
  return e && getComputedStyle(e).animationName || `none`;
}
var xo = R({
    name: `Presence`,
    props: {
      present: {
        type: Boolean,
        required: true
      },
      forceMount: {
        type: Boolean
      }
    },
    slots: {},
    setup(e, {
      slots: t,
      expose: n
    }) {
      let {
          present: r,
          forceMount: i
        } = f(e),
        a = I(),
        {
          isPresent: o
        } = yo(r, a);
      n({
        present: o
      });
      let s = t.default({
        present: o.value
      });
      s = za(s || []);
      let c = V();
      if (s && s?.length > 1) {
        let e = c?.parent?.type.name ? `<${c.parent.type.name} />` : `component`;
        throw Error([`Detected an invalid children for \`${e}\` for  \`Presence\` component.`, ``, "Note: Presence works similarly to `v-if` directly, but it waits for animation/transition to finished before unmounting. So it expect only one direct child of valid VNode type.", `You can apply a few solutions:`, ["Provide a single child element so that `presence` directive attach correctly.", `Ensure the first child is an actual element instead of a raw text node or comment node.`].map(item => `  - ${item}`).join(`
`)].join(`
`));
      }
      return () => i.value || r.value || o.value ? x(t.default({
        present: o.value
      })[0], {
        ref: e => {
          let t = Z(e);
          return t?.hasAttribute === undefined || (t?.hasAttribute(`data-reka-popper-content-wrapper`) ? a.value = t.firstElementChild : a.value = t), t;
        }
      }) : null;
    }
  }),
  So = R({
    name: `PrimitiveSlot`,
    inheritAttrs: false,
    setup(e, {
      attrs: t,
      slots: n
    }) {
      return () => {
        if (!n.default) return null;
        let e = za(n.default()),
          index = e.findIndex(item => item.type !== Me);
        if (index === -1) return e;
        let i = e[index];
        delete i.props?.ref;
        let a = i.props ? mt(t, i.props) : t,
          o = ke({
            ...i,
            props: {}
          }, a);
        return e.length === 1 ? o : (e[index] = o, e);
      };
    }
  }),
  Co = [`area`, `img`, `input`],
  wo = R({
    name: `Primitive`,
    inheritAttrs: false,
    props: {
      asChild: {
        type: Boolean,
        default: false
      },
      as: {
        type: [String, Object],
        default: `div`
      }
    },
    setup(e, {
      attrs: t,
      slots: n
    }) {
      let r = e.asChild ? `template` : e.as;
      return typeof r == `string` && Co.includes(r) ? () => x(r, t) : r === `template` ? () => x(So, t, {
        default: n.default
      }) : () => x(e.as, t, {
        default: n.default
      });
    }
  });
function To() {
  let e = I();
  return {
    primitiveElement: e,
    currentElement: B(() => [`#text`, `#comment`].includes(e.value?.$el.nodeName) ? e.value?.$el.nextElementSibling : Z(e))
  };
}
var Eo = `dismissableLayer.pointerDownOutside`,
  Do = `dismissableLayer.focusOutside`;
function Oo(e, t) {
  if (!(t instanceof Element)) return false;
  let n = t.closest(`[data-dismissable-layer]`),
    r = e.dataset.dismissableLayer === `` ? e : e.querySelector(`[data-dismissable-layer]`),
    i = Array.from(e.ownerDocument.querySelectorAll(`[data-dismissable-layer]`));
  return !!(n && (r === n || i.indexOf(r) < i.indexOf(n)));
}
function ko(e, t, n = true) {
  let r = t?.value?.ownerDocument ?? globalThis?.document,
    i = I(false),
    a = I(() => {});
  return b(o => {
    if (!J || !A(n)) return;
    let s = async n => {
        let target = n.target;
        if (t?.value && target) {
          if (Oo(t.value, target)) {
            i.value = false;
            return;
          }
          if (n.target && !i.value) {
            let t = {
              originalEvent: n
            };
            function i() {
              yi(Eo, e, t);
            }
            n.pointerType === `touch` ? (r.removeEventListener(`click`, a.value), a.value = i, r.addEventListener(`click`, a.value, {
              once: true
            })) : i();
          } else r.removeEventListener(`click`, a.value);
          i.value = false;
        }
      },
      c = window.setTimeout(() => {
        r.addEventListener(`pointerdown`, s);
      }, 0);
    o(() => {
      window.clearTimeout(c), r.removeEventListener(`pointerdown`, s), r.removeEventListener(`click`, a.value);
    });
  }), {
    onPointerDownCapture: () => {
      A(n) && (i.value = true);
    }
  };
}
function Ao(e, t, n = true) {
  let r = t?.value?.ownerDocument ?? globalThis?.document,
    i = I(false);
  return b(a => {
    if (!J || !A(n)) return;
    let o = async n => {
      if (!t?.value) return;
      await z(), await z();
      let target = n.target;
      t.value && target && !Oo(t.value, target) && n.target && !i.value && yi(Do, e, {
        originalEvent: n
      });
    };
    r.addEventListener(`focusin`, o), a(() => r.removeEventListener(`focusin`, o));
  }), {
    onFocusCapture: () => {
      A(n) && (i.value = true);
    },
    onBlurCapture: () => {
      A(n) && (i.value = false);
    }
  };
}
var jo = R({
    __name: `DismissableLayer`,
    props: {
      disableOutsidePointerEvents: {
        type: Boolean,
        required: false,
        default: false
      },
      asChild: {
        type: Boolean,
        required: false
      },
      as: {
        type: null,
        required: false
      },
      present: {
        type: Boolean,
        required: false,
        default: true
      }
    },
    emits: [`escapeKeyDown`, `pointerDownOutside`, `focusOutside`, `interactOutside`, `dismiss`],
    setup(e, {
      emit: t
    }) {
      let n = e,
        r = t,
        {
          forwardRef: a,
          currentElement: o
        } = Qa(),
        s = B(() => o.value?.ownerDocument ?? globalThis.document),
        c = B(() => Q.layersRoot),
        l = B(() => o.value ? Array.from(c.value).indexOf(o.value) : -1),
        d = B(() => Q.layersWithOutsidePointerEventsDisabled.size > 0),
        f = B(() => {
          let e = Array.from(c.value),
            [t] = [...Q.layersWithOutsidePointerEventsDisabled].slice(-1),
            n = e.indexOf(t);
          return l.value >= n;
        }),
        p = ko(async e => {
          let t = [...Q.branches].some(item => item?.contains(e.target));
          n.present && f.value && !t && (r(`pointerDownOutside`, e), r(`interactOutside`, e), await z(), e.defaultPrevented || r(`dismiss`));
        }, o, () => n.present),
        m = Ao(e => {
          let t = [...Q.branches].some(item => item?.contains(e.target));
          n.present && !t && (r(`focusOutside`, e), r(`interactOutside`, e), e.defaultPrevented || r(`dismiss`));
        }, o);
      return pa(`Escape`, e => {
        n.present && l.value === c.value.size - 1 && (r(`escapeKeyDown`, e), e.defaultPrevented || r(`dismiss`));
      }), P([o, () => n.disableOutsidePointerEvents, () => n.present], ([e, t, n], r, i) => {
        e && n && t && (Q.layersWithOutsidePointerEventsDisabled.size === 0 && (Q.originalBodyPointerEvents = s.value.body.style.pointerEvents, s.value.body.style.pointerEvents = `none`), Q.layersWithOutsidePointerEventsDisabled.add(e), i(() => {
          Q.layersWithOutsidePointerEventsDisabled.delete(e), Q.layersWithOutsidePointerEventsDisabled.size === 0 && !bi(Q.originalBodyPointerEvents) && (s.value.body.style.pointerEvents = Q.originalBodyPointerEvents);
        }));
      }, {
        immediate: true
      }), P([o, () => n.present], ([e, t], n, r) => {
        e && t && (c.value.add(e), r(() => {
          c.value.delete(e);
        }));
      }, {
        immediate: true
      }), b(e => {
        e(() => {
          o.value && (c.value.delete(o.value), Q.layersWithOutsidePointerEventsDisabled.delete(o.value));
        });
      }), (e, t) => (L(), F(i(wo), {
        ref: i(a),
        "as-child": e.asChild,
        as: e.as,
        "data-dismissable-layer": ``,
        style: pt({
          pointerEvents: d.value ? f.value ? `auto` : `none` : undefined
        }),
        onFocusCapture: i(m).onFocusCapture,
        onBlurCapture: i(m).onBlurCapture,
        onPointerdownCapture: i(p).onPointerDownCapture
      }, {
        default: Ee(() => [u(e.$slots, `default`)]),
        _: 3
      }, 8, [`as-child`, `as`, `style`, `onFocusCapture`, `onBlurCapture`, `onPointerdownCapture`]));
    }
  }),
  Mo = Ci(() => I([]));
function No() {
  let e = Mo();
  return {
    add(t) {
      let n = e.value[0];
      t !== n && n?.pause(), e.value = Po(e.value, t), e.value.unshift(t);
    },
    remove(t) {
      e.value = Po(e.value, t), e.value[0]?.resume();
    }
  };
}
function Po(e, t) {
  let n = [...e],
    r = n.indexOf(t);
  return r !== -1 && n.splice(r, 1), n;
}
var Fo = `focusScope.autoFocusOnMount`,
  Io = `focusScope.autoFocusOnUnmount`,
  Lo = {
    bubbles: false,
    cancelable: true
  };
function Ro(e, {
  select: t = false
} = {}) {
  let n = K();
  for (let r of e) if (Wo(r, {
    select: t
  }), K() !== n) return true;
}
function zo(e) {
  let t = Bo(e);
  return [Vo(t, e), Vo(t.reverse(), e)];
}
function Bo(e) {
  let t = [],
    treeWalker = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
      acceptNode: e => {
        let t = e.tagName === `INPUT` && e.type === `hidden`;
        return e.disabled || e.hidden || t ? NodeFilter.FILTER_SKIP : e.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
      }
    });
  for (; treeWalker.nextNode();) t.push(treeWalker.currentNode);
  return t;
}
function Vo(e, t) {
  for (let n of e) if (!Ho(n, {
    upTo: t
  })) return n;
}
function Ho(e, {
  upTo: t
}) {
  if (getComputedStyle(e).visibility === `hidden`) return true;
  for (; e;) {
    if (t !== undefined && e === t) return false;
    if (getComputedStyle(e).display === `none`) return true;
    e = e.parentElement;
  }
  return false;
}
function Uo(e) {
  return e instanceof HTMLInputElement && `select` in e;
}
function Wo(e, {
  select: t = false
} = {}) {
  if (e && e.focus) {
    let n = K();
    e.focus({
      preventScroll: true
    }), e !== n && Uo(e) && t && e.select();
  }
}
var Go = R({
    __name: `FocusScope`,
    props: {
      loop: {
        type: Boolean,
        required: false,
        default: false
      },
      trapped: {
        type: Boolean,
        required: false,
        default: false
      },
      present: {
        type: Boolean,
        required: false,
        default: true
      },
      asChild: {
        type: Boolean,
        required: false
      },
      as: {
        type: null,
        required: false
      }
    },
    emits: [`mountAutoFocus`, `unmountAutoFocus`],
    setup(e, {
      emit: t
    }) {
      let n = e,
        r = t,
        {
          currentRef: a,
          currentElement: o
        } = Qa(),
        s = I(null),
        c = No(),
        l = Ft({
          paused: false,
          pause() {
            this.paused = true;
          },
          resume() {
            this.paused = false;
          }
        });
      b(e => {
        if (!J) return;
        let value = o.value;
        if (!n.trapped) return;
        function r(e) {
          if (l.paused || !value) return;
          let target = e.target;
          value.contains(target) ? s.value = target : Wo(s.value, {
            select: true
          });
        }
        function i(e) {
          if (l.paused || !value) return;
          let relatedTarget = e.relatedTarget;
          relatedTarget !== null && (value.contains(relatedTarget) || Wo(s.value, {
            select: true
          }));
        }
        function a(e) {
          let n = s.value;
          if (n === null || !e.some(item => item.removedNodes.length > 0)) return;
          let r = K();
          r && value.contains(r) || value.contains(n) || Wo(value);
        }
        document.addEventListener(`focusin`, r), document.addEventListener(`focusout`, i);
        let c = new MutationObserver(a);
        value && c.observe(value, {
          childList: true,
          subtree: true
        }), e(() => {
          document.removeEventListener(`focusin`, r), document.removeEventListener(`focusout`, i), c.disconnect();
        });
      });
      function d(e, t) {
        let n = new CustomEvent(Fo, Lo),
          i = e => r(`mountAutoFocus`, e);
        e.addEventListener(Fo, i), e.dispatchEvent(n), e.removeEventListener(Fo, i), n.defaultPrevented || (Ro(Bo(e), {
          select: true
        }), K() === t && Wo(e));
      }
      b(async e => {
        let value = o.value;
        if (await z(), !value) return;
        n.present !== false && c.add(l);
        let i = K();
        !value.contains(i) && n.present !== false && d(value, i), e(() => {
          let e = new CustomEvent(Io, Lo),
            n = e => {
              r(`unmountAutoFocus`, e);
            };
          value.addEventListener(Io, n), value.dispatchEvent(e), value.setAttribute(`data-focus-scope-unmounting`, ``), setTimeout(() => {
            e.defaultPrevented || Wo(i ?? document.body, {
              select: true
            }), value.removeEventListener(Io, n), c.remove(l), value.removeAttribute(`data-focus-scope-unmounting`);
          }, 0);
        });
      }), P(() => n.present, async (e, t) => {
        if (!J) return;
        if (e === false && t === true) {
          c.remove(l);
          return;
        }
        if (e !== true || t !== false) return;
        c.add(l), await z();
        let value = o.value;
        if (!value) return;
        let r = K();
        value.contains(r) || d(value, r);
      });
      function f(e) {
        if (!n.loop && !n.trapped || l.paused) return;
        let t = e.key === `Tab` && !e.altKey && !e.ctrlKey && !e.metaKey,
          r = K();
        if (t && r) {
          let currentTarget = e.currentTarget,
            [i, a] = zo(currentTarget);
          i && a ? !e.shiftKey && r === a ? (e.preventDefault(), n.loop && Wo(i, {
            select: true
          })) : e.shiftKey && r === i && (e.preventDefault(), n.loop && Wo(a, {
            select: true
          })) : r === currentTarget && e.preventDefault();
        }
      }
      return (e, t) => (L(), F(i(wo), {
        ref_key: `currentRef`,
        ref: a,
        tabindex: `-1`,
        "as-child": e.asChild,
        as: e.as,
        onKeydown: f
      }, {
        default: Ee(() => [u(e.$slots, `default`)]),
        _: 3
      }, 8, [`as-child`, `as`]));
    }
  }),
  Ko = `menu.itemSelect`,
  qo = [`Enter`, ` `],
  Jo = [`ArrowDown`, `PageUp`, `Home`],
  Yo = [`ArrowUp`, `PageDown`, `End`],
  Xo = [...Jo, ...Yo];
[...qo], [...qo];
function Zo(e) {
  return e ? `open` : `closed`;
}
function Qo(e) {
  return e === `indeterminate`;
}
function $o(e) {
  return Qo(e) ? `indeterminate` : e ? `checked` : `unchecked`;
}
function es(e) {
  let t = K();
  for (let n of e) if (n === t || (n.focus(), K() !== t)) return;
}
function ts(e, t) {
  let {
      x: n,
      y: r
    } = e,
    i = false;
  for (let e = 0, a = t.length - 1; e < t.length; a = e++) {
    let o = t[e].x,
      s = t[e].y,
      c = t[a].x,
      l = t[a].y;
    s > r != l > r && n < (c - o) * (r - s) / (l - s) + o && (i = !i);
  }
  return i;
}
function ns(e, t) {
  return t ? ts({
    x: e.clientX,
    y: e.clientY
  }, t) : false;
}
function rs(e) {
  return e.pointerType === `mouse`;
}
var is = R({
    __name: `Teleport`,
    props: {
      to: {
        type: null,
        required: false
      },
      disabled: {
        type: Boolean,
        required: false
      },
      defer: {
        type: Boolean,
        required: false
      },
      forceMount: {
        type: Boolean,
        required: false
      }
    },
    setup(e) {
      let t = e,
        n = Ba({}),
        r = B(() => t.to ?? n.teleportTo?.value ?? `body`),
        a = la();
      return (e, t) => i(a) || e.forceMount ? (L(), F(We, {
        key: 0,
        to: r.value,
        disabled: e.disabled,
        defer: e.defer
      }, [u(e.$slots, `default`)], 8, [`to`, `disabled`, `defer`])) : Bt(`v-if`, true);
    }
  }),
  as = R({
    __name: `VisuallyHidden`,
    props: {
      feature: {
        type: String,
        required: false,
        default: `focusable`
      },
      asChild: {
        type: Boolean,
        required: false
      },
      as: {
        type: null,
        required: false,
        default: `span`
      }
    },
    setup(e) {
      return (e, t) => (L(), F(i(wo), {
        as: e.as,
        "as-child": e.asChild,
        "aria-hidden": e.feature === `focusable` || e.feature === `fully-hidden` ? `true` : undefined,
        "data-hidden": e.feature === `fully-hidden` ? `` : undefined,
        tabindex: e.feature === `fully-hidden` ? `-1` : undefined,
        style: {
          position: `absolute`,
          border: 0,
          width: `1px`,
          height: `1px`,
          padding: 0,
          margin: `-1px`,
          overflow: `hidden`,
          clip: `rect(0, 0, 0, 0)`,
          clipPath: `inset(50%)`,
          whiteSpace: `nowrap`,
          wordWrap: `normal`,
          top: `-1px`,
          left: `-1px`
        }
      }, {
        default: Ee(() => [u(e.$slots, `default`)]),
        _: 3
      }, 8, [`as`, `as-child`, `aria-hidden`, `data-hidden`, `tabindex`]));
    }
  }),
  os = R({
    inheritAttrs: false,
    __name: `VisuallyHiddenInputBubble`,
    props: {
      name: {
        type: String,
        required: true
      },
      value: {
        type: null,
        required: true
      },
      checked: {
        type: Boolean,
        required: false,
        default: undefined
      },
      required: {
        type: Boolean,
        required: false
      },
      disabled: {
        type: Boolean,
        required: false
      },
      feature: {
        type: String,
        required: false,
        default: `fully-hidden`
      }
    },
    setup(e) {
      let t = e,
        {
          primitiveElement: n,
          currentElement: r
        } = To(),
        i = B(() => t.checked ?? t.value);
      return P(i, (e, t) => {
        if (!r.value) return;
        let value = r.value,
          prototype = window.HTMLInputElement.prototype,
          a = Object.getOwnPropertyDescriptor(prototype, `value`).set;
        if (a && e !== t) {
          let t = new Event(`input`, {
              bubbles: true
            }),
            r = new Event(`change`, {
              bubbles: true
            });
          a.call(value, e), value.dispatchEvent(t), value.dispatchEvent(r);
        }
      }), (e, r) => (L(), F(as, mt({
        ref_key: `primitiveElement`,
        ref: n
      }, {
        ...t,
        ...e.$attrs
      }, {
        as: `input`
      }), null, 16));
    }
  }),
  ss = R({
    inheritAttrs: false,
    __name: `VisuallyHiddenInput`,
    props: {
      name: {
        type: String,
        required: true
      },
      value: {
        type: null,
        required: true
      },
      checked: {
        type: Boolean,
        required: false,
        default: undefined
      },
      required: {
        type: Boolean,
        required: false
      },
      disabled: {
        type: Boolean,
        required: false
      },
      feature: {
        type: String,
        required: false,
        default: `fully-hidden`
      }
    },
    setup(e) {
      let t = e,
        n = B(() => typeof t.value == `object` && Array.isArray(t.value) && t.value.length === 0 && t.required),
        r = B(() => typeof t.value == `string` || typeof t.value == `number` || typeof t.value == `boolean` || t.value === null || t.value === undefined ? [{
          name: t.name,
          value: t.value
        }] : typeof t.value == `object` && Array.isArray(t.value) ? t.value.flatMap((item, n) => typeof item == `object` ? Object.entries(item).map(([e, r]) => ({
          name: `${t.name}[${n}][${e}]`,
          value: r
        })) : {
          name: `${t.name}[${n}]`,
          value: item
        }) : t.value !== null && typeof t.value == `object` && !Array.isArray(t.value) ? Object.entries(t.value).map(([e, n]) => ({
          name: `${t.name}[${e}]`,
          value: n
        })) : []);
      return (e, i) => (L(), fe(Ie, null, [Bt(` We render single input if it's required `), n.value ? (L(), F(os, mt({
        key: e.name
      }, {
        ...t,
        ...e.$attrs
      }, {
        name: e.name,
        value: e.value
      }), null, 16, [`name`, `value`])) : (L(true), fe(Ie, {
        key: 1
      }, me(r.value, n => (L(), F(os, mt({
        key: n.name
      }, {
        ref_for: true
      }, {
        ...t,
        ...e.$attrs
      }, {
        name: n.name,
        value: n.value
      }), null, 16, [`name`, `value`]))), 128))], 2112));
    }
  }),
  cs = [`top`, `right`, `bottom`, `left`],
  ls = Math.min,
  us = Math.max,
  ds = Math.round,
  fs = Math.floor,
  ps = e => ({
    x: e,
    y: e
  }),
  ms = {
    left: `right`,
    right: `left`,
    bottom: `top`,
    top: `bottom`
  };
function hs(e, t, n) {
  return us(e, ls(t, n));
}
function gs(e, t) {
  return typeof e == `function` ? e(t) : e;
}
function _s(e) {
  return e.split(`-`)[0];
}
function vs(e) {
  return e.split(`-`)[1];
}
function ys(e) {
  return e === `x` ? `y` : `x`;
}
function bs(e) {
  return e === `y` ? `height` : `width`;
}
function xs(e) {
  let t = e[0];
  return t === `t` || t === `b` ? `y` : `x`;
}
function Ss(e) {
  return ys(xs(e));
}
function Cs(e, t, n) {
  n === undefined && (n = false);
  let r = vs(e),
    i = Ss(e),
    a = bs(i),
    o = i === `x` ? r === (n ? `end` : `start`) ? `right` : `left` : r === `start` ? `bottom` : `top`;
  return t.reference[a] > t.floating[a] && (o = Ms(o)), [o, Ms(o)];
}
function ws(e) {
  let t = Ms(e);
  return [Ts(e), t, Ts(t)];
}
function Ts(e) {
  return e.includes(`start`) ? e.replace(`start`, `end`) : e.replace(`end`, `start`);
}
var Es = [`left`, `right`],
  Ds = [`right`, `left`],
  Os = [`top`, `bottom`],
  ks = [`bottom`, `top`];
function As(e, t, n) {
  switch (e) {
    case `top`:
    case `bottom`:
      return n ? t ? Ds : Es : t ? Es : Ds;
    case `left`:
    case `right`:
      return t ? Os : ks;
    default:
      return [];
  }
}
function js(e, t, n, r) {
  let i = vs(e),
    a = As(_s(e), n === `start`, r);
  return i && (a = a.map(item => item + `-` + i), t && (a = a.concat(a.map(Ts)))), a;
}
function Ms(e) {
  let t = _s(e);
  return ms[t] + e.slice(t.length);
}
function Ns(e) {
  return {
    top: e.top ?? 0,
    right: e.right ?? 0,
    bottom: e.bottom ?? 0,
    left: e.left ?? 0
  };
}
function Ps(e) {
  return typeof e == `number` ? {
    top: e,
    right: e,
    bottom: e,
    left: e
  } : Ns(e);
}
function Fs(e) {
  let {
    x: t,
    y: n,
    width: r,
    height: i
  } = e;
  return {
    width: r,
    height: i,
    top: n,
    left: t,
    right: t + r,
    bottom: n + i,
    x: t,
    y: n
  };
}
function Is(e, t, n) {
  let {
      reference: r,
      floating: i
    } = e,
    a = xs(t),
    o = Ss(t),
    s = bs(o),
    c = _s(t),
    l = a === `y`,
    u = r.x + r.width / 2 - i.width / 2,
    d = r.y + r.height / 2 - i.height / 2,
    f = r[s] / 2 - i[s] / 2,
    p;
  switch (c) {
    case `top`:
      p = {
        x: u,
        y: r.y - i.height
      };
      break;
    case `bottom`:
      p = {
        x: u,
        y: r.y + r.height
      };
      break;
    case `right`:
      p = {
        x: r.x + r.width,
        y: d
      };
      break;
    case `left`:
      p = {
        x: r.x - i.width,
        y: d
      };
      break;
    default:
      p = {
        x: r.x,
        y: r.y
      };
  }
  let m = vs(t);
  return m && (p[o] += f * (m === `end` ? 1 : -1) * (n && l ? -1 : 1)), p;
}
async function Ls(e, t) {
  t === undefined && (t = {});
  let {
      x: n,
      y: r,
      platform: i,
      rects: a,
      elements: o,
      strategy: s
    } = e,
    {
      boundary: c = `clippingAncestors`,
      rootBoundary: l = `viewport`,
      elementContext: u = `floating`,
      altBoundary: d = false,
      padding: f = 0
    } = gs(t, e),
    p = Ps(f),
    m = o[d ? u === `floating` ? `reference` : `floating` : u],
    h = Fs(await i.getClippingRect({
      element: (await (i.isElement == null ? undefined : i.isElement(m))) ?? true ? m : m.contextElement || (await (i.getDocumentElement == null ? undefined : i.getDocumentElement(o.floating))),
      boundary: c,
      rootBoundary: l,
      strategy: s
    })),
    g = u === `floating` ? {
      x: n,
      y: r,
      width: a.floating.width,
      height: a.floating.height
    } : a.reference,
    _ = await (i.getOffsetParent == null ? undefined : i.getOffsetParent(o.floating)),
    v = (await (i.isElement == null ? undefined : i.isElement(_))) && (await (i.getScale == null ? undefined : i.getScale(_))) || {
      x: 1,
      y: 1
    },
    y = Fs(i.convertOffsetParentRelativeRectToViewportRelativeRect ? await i.convertOffsetParentRelativeRectToViewportRelativeRect({
      elements: o,
      rect: g,
      offsetParent: _,
      strategy: s
    }) : g);
  return {
    top: (h.top - y.top + p.top) / v.y,
    bottom: (y.bottom - h.bottom + p.bottom) / v.y,
    left: (h.left - y.left + p.left) / v.x,
    right: (y.right - h.right + p.right) / v.x
  };
}
var Rs = 50,
  zs = async (e, t, n) => {
    let {
        placement: r = `bottom`,
        strategy: i = `absolute`,
        middleware: a = [],
        platform: o
      } = n,
      s = o.detectOverflow ? o : {
        ...o,
        detectOverflow: Ls
      },
      c = await (o.isRTL == null ? undefined : o.isRTL(t)),
      elementRects = await o.getElementRects({
        reference: e,
        floating: t,
        strategy: i
      }),
      {
        x: u,
        y: d
      } = Is(elementRects, r, c),
      f = r,
      p = 0,
      m = {};
    for (let n = 0; n < a.length; n++) {
      let h = a[n];
      if (!h) continue;
      let {
          name: g,
          fn: _
        } = h,
        {
          x: v,
          y,
          data: b,
          reset: x
        } = await _({
          x: u,
          y: d,
          initialPlacement: r,
          placement: f,
          strategy: i,
          middlewareData: m,
          rects: elementRects,
          platform: s,
          elements: {
            reference: e,
            floating: t
          }
        });
      u = v ?? u, d = y ?? d, m[g] = {
        ...m[g],
        ...b
      }, x && p < Rs && (p++, typeof x == `object` && (x.placement && (f = x.placement), x.rects && (elementRects = x.rects === true ? await o.getElementRects({
        reference: e,
        floating: t,
        strategy: i
      }) : x.rects), {
        x: u,
        y: d
      } = Is(elementRects, f, c)), n = -1);
    }
    return {
      x: u,
      y: d,
      placement: f,
      strategy: i,
      middlewareData: m
    };
  },
  Bs = e => ({
    name: `arrow`,
    options: e,
    async fn(t) {
      let {
          x: n,
          y: r,
          placement: i,
          rects: a,
          platform: o,
          elements: s,
          middlewareData: c
        } = t,
        {
          element: l,
          padding: u = 0
        } = gs(e, t) || {};
      if (l == null) return {};
      let d = Ps(u),
        f = {
          x: n,
          y: r
        },
        p = Ss(i),
        m = bs(p),
        dimensions = await o.getDimensions(l),
        g = p === `y`,
        _ = g ? `top` : `left`,
        v = g ? `bottom` : `right`,
        y = g ? `clientHeight` : `clientWidth`,
        b = a.reference[m] + a.reference[p] - f[p] - a.floating[m],
        x = f[p] - a.reference[p],
        S = await (o.getOffsetParent == null ? undefined : o.getOffsetParent(l)),
        C = S ? S[y] : 0;
      (!C || !(await (o.isElement == null ? undefined : o.isElement(S)))) && (C = s.floating[y] || a.floating[m]);
      let w = b / 2 - x / 2,
        T = C / 2 - dimensions[m] / 2 - 1,
        E = ls(d[_], T),
        ee = ls(d[v], T),
        te = C - dimensions[m] - ee,
        ne = C / 2 - dimensions[m] / 2 + w,
        re = hs(E, ne, te),
        D = !c.arrow && vs(i) != null && ne !== re && a.reference[m] / 2 - (ne < E ? E : ee) - dimensions[m] / 2 < 0,
        O = D ? ne < E ? ne - E : ne - te : 0;
      return {
        [p]: f[p] + O,
        data: {
          [p]: re,
          centerOffset: ne - re - O,
          ...(D && {
            alignmentOffset: O
          })
        },
        reset: D
      };
    }
  }),
  Vs = function (e) {
    return e === undefined && (e = {}), {
      name: `flip`,
      options: e,
      async fn(t) {
        var n;
        let {
            placement: r,
            middlewareData: i,
            rects: a,
            initialPlacement: o,
            platform: s,
            elements: c
          } = t,
          {
            mainAxis: l = true,
            crossAxis: u = true,
            fallbackPlacements: d,
            fallbackStrategy: f = `bestFit`,
            fallbackAxisSideDirection: p = `none`,
            flipAlignment: m = true,
            ...h
          } = gs(e, t);
        if ((n = i.arrow) != null && n.alignmentOffset) return {};
        let g = _s(r),
          _ = xs(o),
          v = _s(o) === o,
          y = await (s.isRTL == null ? undefined : s.isRTL(c.floating)),
          b = d || (v || !m ? [Ms(o)] : ws(o)),
          x = p !== `none`;
        !d && x && b.push(...js(o, m, p, y));
        let S = [o, ...b],
          C = await s.detectOverflow(t, h),
          w = [],
          T = i.flip?.overflows || [];
        if (l && w.push(C[g]), u) {
          let e = Cs(r, a, y);
          w.push(C[e[0]], C[e[1]]);
        }
        if (T = [...T, {
          placement: r,
          overflows: w
        }], !w.every(item => item <= 0)) {
          let e = (i.flip?.index || 0) + 1,
            t = S[e];
          if (t && (u !== `alignment` || _ === xs(t) || T.every(item => xs(item.placement) !== _ || item.overflows[0] > 0))) return {
            data: {
              index: e,
              overflows: T
            },
            reset: {
              placement: t
            }
          };
          let n = T.filter(item => item.overflows[0] <= 0).sort((left, right) => left.overflows[1] - right.overflows[1])[0]?.placement;
          if (!n) switch (f) {
            case `bestFit`:
              {
                let e = T.filter(item => {
                  if (x) {
                    let t = xs(item.placement);
                    return t === _ || t === `y`;
                  }
                  return true;
                }).map(item => [item.placement, item.overflows.filter(e => e > 0).reduce((acc, cur) => acc + cur, 0)]).sort((left, right) => left[1] - right[1])[0]?.[0];
                e && (n = e);
                break;
              }
            case `initialPlacement`:
              n = o;
          }
          if (r !== n) return {
            reset: {
              placement: n
            }
          };
        }
        return {};
      }
    };
  };
function Hs(e, t) {
  return {
    top: e.top - t.height,
    right: e.right - t.width,
    bottom: e.bottom - t.height,
    left: e.left - t.width
  };
}
function Us(e) {
  return cs.some(item => e[item] >= 0);
}
var Ws = function (e) {
    return e === undefined && (e = {}), {
      name: `hide`,
      options: e,
      async fn(t) {
        let {
            rects: n,
            platform: r
          } = t,
          {
            strategy: i = `referenceHidden`,
            ...a
          } = gs(e, t);
        switch (i) {
          case `referenceHidden`:
            {
              let e = Hs(await r.detectOverflow(t, {
                ...a,
                elementContext: `reference`
              }), n.reference);
              return {
                data: {
                  referenceHiddenOffsets: e,
                  referenceHidden: Us(e)
                }
              };
            }
          case `escaped`:
            {
              let e = Hs(await r.detectOverflow(t, {
                ...a,
                altBoundary: true
              }), n.floating);
              return {
                data: {
                  escapedOffsets: e,
                  escaped: Us(e)
                }
              };
            }
          default:
            return {};
        }
      }
    };
  },
  Gs = new Set([`left`, `top`]);
async function Ks(e, t) {
  let {
      placement: n,
      platform: r,
      elements: i
    } = e,
    a = await (r.isRTL == null ? undefined : r.isRTL(i.floating)),
    o = _s(n),
    s = vs(n),
    c = xs(n) === `y`,
    l = Gs.has(o) ? -1 : 1,
    u = a && c ? -1 : 1,
    d = gs(t, e),
    {
      mainAxis: f,
      crossAxis: p,
      alignmentAxis: m
    } = typeof d == `number` ? {
      mainAxis: d,
      crossAxis: 0,
      alignmentAxis: null
    } : {
      mainAxis: d.mainAxis || 0,
      crossAxis: d.crossAxis || 0,
      alignmentAxis: d.alignmentAxis
    };
  return s && typeof m == `number` && (p = s === `end` ? m * -1 : m), c ? {
    x: p * u,
    y: f * l
  } : {
    x: f * l,
    y: p * u
  };
}
var qs = function (e) {
    return e === undefined && (e = 0), {
      name: `offset`,
      options: e,
      async fn(t) {
        var n;
        let {
            x: r,
            y: i,
            placement: a,
            middlewareData: o
          } = t,
          s = await Ks(t, e);
        return a === o.offset?.placement && (n = o.arrow) != null && n.alignmentOffset ? {} : {
          x: r + s.x,
          y: i + s.y,
          data: {
            ...s,
            placement: a
          }
        };
      }
    };
  },
  Js = function (e) {
    return e === undefined && (e = {}), {
      name: `shift`,
      options: e,
      async fn(t) {
        let {
            x: n,
            y: r,
            placement: i,
            platform: a
          } = t,
          {
            mainAxis: o = true,
            crossAxis: s = false,
            limiter: c = {
              fn: e => {
                let {
                  x: t,
                  y: n
                } = e;
                return {
                  x: t,
                  y: n
                };
              }
            },
            ...l
          } = gs(e, t),
          u = {
            x: n,
            y: r
          },
          d = await a.detectOverflow(t, l),
          f = xs(i),
          p = ys(f),
          m = u[p],
          h = u[f],
          g = (e, t) => hs(t + d[e === `y` ? `top` : `left`], t, t - d[e === `y` ? `bottom` : `right`]);
        o && (m = g(p, m)), s && (h = g(f, h));
        let _ = c.fn({
          ...t,
          [p]: m,
          [f]: h
        });
        return {
          ..._,
          data: {
            x: _.x - n,
            y: _.y - r,
            enabled: {
              [p]: o,
              [f]: s
            }
          }
        };
      }
    };
  },
  Ys = function (e) {
    return e === undefined && (e = {}), {
      options: e,
      fn(t) {
        let {
            x: n,
            y: r,
            placement: i,
            rects: a,
            middlewareData: o
          } = t,
          {
            offset: s = 0,
            mainAxis: c = true,
            crossAxis: l = true
          } = gs(e, t),
          u = {
            x: n,
            y: r
          },
          d = xs(i),
          f = ys(d),
          p = u[f],
          m = u[d],
          h = gs(s, t),
          g = typeof h == `number` ? {
            mainAxis: h,
            crossAxis: 0
          } : {
            mainAxis: h.mainAxis ?? 0,
            crossAxis: h.crossAxis ?? 0
          };
        if (c) {
          let e = f === `y` ? `height` : `width`,
            t = a.reference[f] - a.floating[e] + g.mainAxis,
            n = a.reference[f] + a.reference[e] - g.mainAxis;
          p < t ? p = t : p > n && (p = n);
        }
        if (l) {
          let e = f === `y` ? `width` : `height`,
            t = Gs.has(_s(i)),
            n = a.reference[d] - a.floating[e] + (t && o.offset?.[d] || 0) + (t ? 0 : g.crossAxis),
            r = a.reference[d] + a.reference[e] + (t ? 0 : o.offset?.[d] || 0) - (t ? g.crossAxis : 0);
          m < n ? m = n : m > r && (m = r);
        }
        return {
          [f]: p,
          [d]: m
        };
      }
    };
  },
  Xs = function (e) {
    return e === undefined && (e = {}), {
      name: `size`,
      options: e,
      async fn(t) {
        let {
            placement: n,
            rects: r,
            platform: i,
            elements: a
          } = t,
          {
            apply: o = () => {},
            ...s
          } = gs(e, t),
          c = await i.detectOverflow(t, s),
          l = _s(n),
          u = vs(n),
          d = xs(n) === `y`,
          {
            width: f,
            height: p
          } = r.floating,
          m,
          h;
        l === `top` || l === `bottom` ? (m = l, h = u === ((await (i.isRTL == null ? undefined : i.isRTL(a.floating))) ? `start` : `end`) ? `left` : `right`) : (h = l, m = u === `end` ? `top` : `bottom`);
        let g = p - c.top - c.bottom,
          _ = f - c.left - c.right,
          v = ls(p - c[m], g),
          y = ls(f - c[h], _),
          shift = t.middlewareData.shift,
          x = !shift,
          S = v,
          C = y;
        shift != null && shift.enabled.x && (C = _), shift != null && shift.enabled.y && (S = g), x && !u && (d ? C = f - 2 * us(c.left, c.right) : S = p - 2 * us(c.top, c.bottom)), await o({
          ...t,
          availableWidth: C,
          availableHeight: S
        });
        let dimensions = await i.getDimensions(a.floating);
        return f !== dimensions.width || p !== dimensions.height ? {
          reset: {
            rects: true
          }
        } : {};
      }
    };
  };
function Zs() {
  return typeof window < `u`;
}
function Qs(e) {
  return ec(e) ? (e.nodeName || ``).toLowerCase() : `#document`;
}
function $(e) {
  var t;
  return (e == null || (t = e.ownerDocument) == null ? undefined : t.defaultView) || window;
}
function $s(e) {
  return ((ec(e) ? e.ownerDocument : e.document) || window.document)?.documentElement;
}
function ec(e) {
  return Zs() ? e instanceof Node || e instanceof $(e).Node : false;
}
function tc(e) {
  return Zs() ? e instanceof Element || e instanceof $(e).Element : false;
}
function nc(e) {
  return Zs() ? e instanceof HTMLElement || e instanceof $(e).HTMLElement : false;
}
function rc(e) {
  return !Zs() || typeof ShadowRoot > `u` ? false : e instanceof ShadowRoot || e instanceof $(e).ShadowRoot;
}
function ic(e) {
  let {
    overflow: t,
    overflowX: n,
    overflowY: r,
    display: i
  } = hc(e);
  return /auto|scroll|overlay|hidden|clip/.test(t + r + n) && i !== `inline` && i !== `contents`;
}
function ac(e) {
  return /^(table|td|th)$/.test(Qs(e));
}
function oc(e) {
  try {
    if (e.matches(`:popover-open`)) return true;
  } catch {}
  try {
    return e.matches(`:modal`);
  } catch {
    return false;
  }
}
var sc = /transform|translate|scale|rotate|perspective|filter/,
  cc = /paint|layout|strict|content/,
  lc = e => !!e && e !== `none`,
  uc;
function dc(e) {
  let t = tc(e) ? hc(e) : e;
  return lc(t.transform) || lc(t.translate) || lc(t.scale) || lc(t.rotate) || lc(t.perspective) || !pc() && (lc(t.backdropFilter) || lc(t.filter)) || sc.test(t.willChange || ``) || cc.test(t.contain || ``);
}
function fc(e) {
  let t = _c(e);
  for (; nc(t) && !mc(t);) {
    if (dc(t)) return t;
    if (oc(t)) return null;
    t = _c(t);
  }
  return null;
}
function pc() {
  return uc ??= typeof CSS < `u` && CSS.supports && CSS.supports(`-webkit-backdrop-filter`, `none`), uc;
}
function mc(e) {
  return /^(html|body|#document)$/.test(Qs(e));
}
function hc(e) {
  return $(e).getComputedStyle(e);
}
function gc(e) {
  return tc(e) ? {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  } : {
    scrollLeft: e.scrollX,
    scrollTop: e.scrollY
  };
}
function _c(e) {
  if (Qs(e) === `html`) return e;
  let t = e.assignedSlot || e.parentNode || rc(e) && e.host || $s(e);
  return rc(t) ? t.host : t;
}
function vc(e) {
  let t = _c(e);
  return mc(t) ? (e.ownerDocument || e).body : nc(t) && ic(t) ? t : vc(t);
}
function yc(e, t, n) {
  t === undefined && (t = []), n === undefined && (n = true);
  let r = vc(e),
    i = r === e.ownerDocument?.body,
    a = $(r);
  if (i) {
    let e = bc(a);
    return t.concat(a, a.visualViewport || [], ic(r) ? r : [], e && n ? yc(e) : []);
  }
  return t.concat(r, yc(r, [], n));
}
function bc(e) {
  return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
function xc(e) {
  let t = hc(e),
    n = parseFloat(t.width) || 0,
    r = parseFloat(t.height) || 0,
    i = nc(e),
    a = i ? e.offsetWidth : n,
    o = i ? e.offsetHeight : r,
    s = ds(n) !== a || ds(r) !== o;
  return s && (n = a, r = o), {
    width: n,
    height: r,
    $: s
  };
}
function Sc(e) {
  return tc(e) ? e : e.contextElement;
}
function Cc(e) {
  let t = Sc(e);
  if (!nc(t)) return ps(1);
  let boundingClientRectResult = t.getBoundingClientRect(),
    {
      width: r,
      height: i,
      $: a
    } = xc(t),
    o = (a ? ds(boundingClientRectResult.width) : boundingClientRectResult.width) / r,
    s = (a ? ds(boundingClientRectResult.height) : boundingClientRectResult.height) / i;
  return (!o || !Number.isFinite(o)) && (o = 1), (!s || !Number.isFinite(s)) && (s = 1), {
    x: o,
    y: s
  };
}
var wc = ps(0);
function Tc(e) {
  let t = $(e);
  return !pc() || !t.visualViewport ? wc : {
    x: t.visualViewport.offsetLeft,
    y: t.visualViewport.offsetTop
  };
}
function Ec(e, t, n) {
  return t === undefined && (t = false), !!n && t && n === $(e);
}
function Dc(e, t, n, r) {
  t === undefined && (t = false), n === undefined && (n = false);
  let i = e.getBoundingClientRect(),
    a = Sc(e),
    o = ps(1);
  t && (r ? tc(r) && (o = Cc(r)) : o = Cc(e));
  let s = Ec(a, n, r) ? Tc(a) : ps(0),
    c = (i.left + s.x) / o.x,
    l = (i.top + s.y) / o.y,
    u = i.width / o.x,
    d = i.height / o.y;
  if (a && r) {
    let e = $(a),
      t = tc(r) ? $(r) : r,
      n = e,
      i = bc(n);
    for (; i && t !== n;) {
      let e = Cc(i),
        t = i.getBoundingClientRect(),
        r = hc(i),
        a = t.left + (i.clientLeft + parseFloat(r.paddingLeft)) * e.x,
        o = t.top + (i.clientTop + parseFloat(r.paddingTop)) * e.y;
      c *= e.x, l *= e.y, u *= e.x, d *= e.y, c += a, l += o, n = $(i), i = bc(n);
    }
  }
  return Fs({
    width: u,
    height: d,
    x: c,
    y: l
  });
}
function Oc(e, t) {
  let scrollLeft = gc(e).scrollLeft;
  return t ? t.left + scrollLeft : Dc($s(e)).left + scrollLeft;
}
function kc(e, t) {
  let n = e.getBoundingClientRect();
  return {
    x: n.left + t.scrollLeft - Oc(e, n),
    y: n.top + t.scrollTop
  };
}
function Ac(e) {
  let {
      elements: t,
      rect: n,
      offsetParent: r,
      strategy: i
    } = e,
    a = i === `fixed`,
    o = $s(r),
    s = t ? oc(t.floating) : false;
  if (r === o || s && a) return n;
  let c = {
      scrollLeft: 0,
      scrollTop: 0
    },
    l = ps(1),
    u = ps(0),
    d = nc(r);
  if ((d || !a) && ((Qs(r) !== `body` || ic(o)) && (c = gc(r)), d)) {
    let e = Dc(r);
    l = Cc(r), u.x = e.x + r.clientLeft, u.y = e.y + r.clientTop;
  }
  let f = o && !d && !a ? kc(o, c) : ps(0);
  return {
    width: n.width * l.x,
    height: n.height * l.y,
    x: n.x * l.x - c.scrollLeft * l.x + u.x + f.x,
    y: n.y * l.y - c.scrollTop * l.y + u.y + f.y
  };
}
function jc(e) {
  return e.getClientRects ? Array.from(e.getClientRects()) : [];
}
function Mc(e) {
  let t = gc(e),
    body = e.ownerDocument.body,
    r = us(e.scrollWidth, e.clientWidth, body.scrollWidth, body.clientWidth),
    i = us(e.scrollHeight, e.clientHeight, body.scrollHeight, body.clientHeight),
    a = -t.scrollLeft + Oc(e),
    o = -t.scrollTop;
  return hc(body).direction === `rtl` && (a += us(e.clientWidth, body.clientWidth) - r), {
    width: r,
    height: i,
    x: a,
    y: o
  };
}
var Nc = 25;
function Pc(e, t, n) {
  n === undefined && (n = `viewport`);
  let r = n === `layoutViewport`,
    i = $(e),
    a = $s(e),
    visualViewport = i.visualViewport,
    clientWidth = a.clientWidth,
    clientHeight = a.clientHeight,
    l = 0,
    u = 0;
  if (visualViewport) {
    let e = !pc() || t === `fixed`;
    r ? e || (l = -visualViewport.offsetLeft, u = -visualViewport.offsetTop) : (clientWidth = visualViewport.width, clientHeight = visualViewport.height, e && (l = visualViewport.offsetLeft, u = visualViewport.offsetTop));
  }
  if (Oc(a) <= 0) {
    let ownerDocument = a.ownerDocument,
      body = ownerDocument.body,
      n = getComputedStyle(body),
      r = ownerDocument.compatMode === `CSS1Compat` && parseFloat(n.marginLeft) + parseFloat(n.marginRight) || 0,
      i = Math.abs(a.clientWidth - body.clientWidth - r),
      o = getComputedStyle(a).scrollbarGutter === `stable both-edges` ? i / 2 : i;
    o <= Nc && (clientWidth -= o);
  }
  return {
    width: clientWidth,
    height: clientHeight,
    x: l,
    y: u
  };
}
function Fc(e, t) {
  let n = Dc(e, true, t === `fixed`),
    r = n.top + e.clientTop,
    i = n.left + e.clientLeft,
    a = Cc(e);
  return {
    width: e.clientWidth * a.x,
    height: e.clientHeight * a.y,
    x: i * a.x,
    y: r * a.y
  };
}
function Ic(e, t, n) {
  let r;
  if (t === `viewport` || t === `layoutViewport`) r = Pc(e, n, t);else if (t === `document`) r = Mc($s(e));else if (tc(t)) r = Fc(t, n);else {
    let n = Tc(e);
    r = {
      x: t.x - n.x,
      y: t.y - n.y,
      width: t.width,
      height: t.height
    };
  }
  return Fs(r);
}
function Lc(e, t) {
  let n = t.get(e);
  if (n) return n;
  let r = yc(e, [], false).filter(item => tc(item) && Qs(item) !== `body`),
    i = null,
    a = hc(e).position === `fixed`,
    o = a ? _c(e) : e;
  for (; tc(o) && !mc(o);) {
    let e = hc(o),
      t = dc(o),
      n = i ? i.position : a ? `fixed` : ``;
    !t && (n === `fixed` || n === `absolute` && e.position === `static`) ? r = r.filter(item => item !== o) : i = e, o = _c(o);
  }
  return t.set(e, r), r;
}
function Rc(e) {
  let {
      element: t,
      boundary: n,
      rootBoundary: r,
      strategy: i
    } = e,
    a = [...(n === `clippingAncestors` ? oc(t) ? [] : Lc(t, this._c) : [].concat(n)), r],
    o = Ic(t, a[0], i),
    s = o.top,
    right = o.right,
    bottom = o.bottom,
    left = o.left;
  for (let e = 1; e < a.length; e++) {
    let n = Ic(t, a[e], i);
    s = us(n.top, s), right = ls(n.right, right), bottom = ls(n.bottom, bottom), left = us(n.left, left);
  }
  return {
    width: right - left,
    height: bottom - s,
    x: left,
    y: s
  };
}
function zc(e) {
  let {
    width: t,
    height: n
  } = xc(e);
  return {
    width: t,
    height: n
  };
}
function Bc(e, t, n) {
  let r = nc(t),
    i = $s(t),
    a = n === `fixed`,
    o = Dc(e, true, a, t),
    s = {
      scrollLeft: 0,
      scrollTop: 0
    },
    c = ps(0);
  if ((r || !a) && ((Qs(t) !== `body` || ic(i)) && (s = gc(t)), r)) {
    let e = Dc(t, true, a, t);
    c.x = e.x + t.clientLeft, c.y = e.y + t.clientTop;
  }
  !r && i && (c.x = Oc(i));
  let l = i && !r && !a ? kc(i, s) : ps(0);
  return {
    x: o.left + s.scrollLeft - c.x - l.x,
    y: o.top + s.scrollTop - c.y - l.y,
    width: o.width,
    height: o.height
  };
}
function Vc(e) {
  return hc(e).position === `static`;
}
function Hc(e, t) {
  if (!nc(e) || hc(e).position === `fixed`) return null;
  if (t) return t(e);
  let offsetParent = e.offsetParent;
  return $s(e) === offsetParent && (offsetParent = offsetParent.ownerDocument.body), offsetParent;
}
function Uc(e, t) {
  let n = $(e);
  if (oc(e)) return n;
  if (!nc(e)) {
    let t = _c(e);
    for (; t && !mc(t);) {
      if (tc(t) && !Vc(t)) return t;
      t = _c(t);
    }
    return n;
  }
  let r = Hc(e, t);
  for (; r && ac(r) && Vc(r);) r = Hc(r, t);
  return r && mc(r) && Vc(r) && !dc(r) ? n : r || fc(e) || n;
}
var Wc = async function (e) {
  let t = this.getOffsetParent || Uc,
    getDimensions = this.getDimensions,
    dimensions = await getDimensions(e.floating);
  return {
    reference: Bc(e.reference, await t(e.floating), e.strategy),
    floating: {
      x: 0,
      y: 0,
      width: dimensions.width,
      height: dimensions.height
    }
  };
};
function Gc(e) {
  return hc(e).direction === `rtl`;
}
var Kc = {
  convertOffsetParentRelativeRectToViewportRelativeRect: Ac,
  getDocumentElement: $s,
  getClippingRect: Rc,
  getOffsetParent: Uc,
  getElementRects: Wc,
  getClientRects: jc,
  getDimensions: zc,
  getScale: Cc,
  isElement: tc,
  isRTL: Gc
};
function qc(e, t) {
  return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height;
}
function Jc(e, t, n) {
  let r = null,
    i,
    a = $s(e);
  function o() {
    var e;
    clearTimeout(i), (e = r) == null || e.disconnect(), r = null;
  }
  function s(n, c) {
    n === undefined && (n = false), c === undefined && (c = 1), o();
    let l = e.getBoundingClientRect(),
      {
        left: u,
        top: d,
        width: f,
        height: p
      } = l;
    if (n || t(), !f || !p) return;
    let m = fs(d),
      h = fs(a.clientWidth - (u + f)),
      g = fs(a.clientHeight - (d + p)),
      _ = fs(u),
      v = {
        rootMargin: -m + `px ` + -h + `px ` + -g + `px ` + -_ + `px`,
        threshold: us(0, ls(1, c)) || 1
      },
      y = true;
    function b(t) {
      let intersectionRatio = t[0].intersectionRatio;
      if (!qc(l, e.getBoundingClientRect())) return s();
      if (intersectionRatio !== c) {
        if (!y) return s();
        intersectionRatio ? s(false, intersectionRatio) : i = setTimeout(() => {
          s(false, 1e-7);
        }, 1e3);
      }
      y = false;
    }
    try {
      r = new IntersectionObserver(b, {
        ...v,
        root: a.ownerDocument
      });
    } catch {
      r = new IntersectionObserver(b, v);
    }
    r.observe(e);
  }
  let c = $(e),
    l = () => s(n);
  return c.addEventListener(`resize`, l), s(true), () => {
    c.removeEventListener(`resize`, l), o();
  };
}
function Yc(e, t, n, r) {
  r === undefined && (r = {});
  let {
      ancestorScroll: i = true,
      ancestorResize: a = true,
      elementResize: o = typeof ResizeObserver == `function`,
      layoutShift: s = typeof IntersectionObserver == `function`,
      animationFrame: c = false
    } = r,
    l = Sc(e),
    u = i || a ? [...(l ? yc(l) : []), ...(t ? yc(t) : [])] : [];
  u.forEach(item => {
    i && item.addEventListener(`scroll`, n), a && item.addEventListener(`resize`, n);
  });
  let d = l && s ? Jc(l, n, a) : null,
    f = -1,
    p = null;
  o && (p = new ResizeObserver(e => {
    let [r] = e;
    r && r.target === l && p && t && (p.unobserve(t), cancelAnimationFrame(f), f = requestAnimationFrame(() => {
      var e;
      (e = p) == null || e.observe(t);
    })), n();
  }), l && !c && p.observe(l), t && p.observe(t));
  let m,
    h = c ? Dc(e) : null;
  c && g();
  function g() {
    let t = Dc(e);
    h && !qc(h, t) && n(), h = t, m = requestAnimationFrame(g);
  }
  return n(), () => {
    var e;
    u.forEach(item => {
      i && item.removeEventListener(`scroll`, n), a && item.removeEventListener(`resize`, n);
    }), d?.(), (e = p) == null || e.disconnect(), p = null, c && cancelAnimationFrame(m);
  };
}
var Xc = qs,
  Zc = Js,
  Qc = Vs,
  $c = Xs,
  el = Ws,
  tl = Bs,
  nl = Ys,
  rl = (e, t, n) => {
    let r = new Map(),
      i = n ?? {},
      a = {
        ...Kc,
        ...i.platform,
        _c: r
      };
    return zs(e, t, {
      ...i,
      platform: a
    });
  },
  [il, al] = vi(`SwitchRoot`),
  ol = R({
    inheritAttrs: false,
    __name: `SwitchRoot`,
    props: {
      defaultValue: {
        type: null,
        required: false
      },
      modelValue: {
        type: null,
        required: false,
        default: undefined
      },
      disabled: {
        type: Boolean,
        required: false
      },
      id: {
        type: String,
        required: false
      },
      value: {
        type: String,
        required: false,
        default: `on`
      },
      trueValue: {
        type: null,
        required: false,
        default: () => true
      },
      falseValue: {
        type: null,
        required: false,
        default: () => false
      },
      asChild: {
        type: Boolean,
        required: false
      },
      as: {
        type: null,
        required: false,
        default: `button`
      },
      name: {
        type: String,
        required: false
      },
      required: {
        type: Boolean,
        required: false
      }
    },
    emits: [`update:modelValue`],
    setup(e, {
      emit: t
    }) {
      let n = e,
        r = t,
        {
          disabled: a
        } = f(n),
        o = Ra(n, `modelValue`, r, {
          defaultValue: n.defaultValue ?? n.falseValue,
          passive: n.modelValue === undefined
        }),
        s = B(() => o.value === n.trueValue);
      function c() {
        a.value || (o.value = s.value ? n.falseValue : n.trueValue);
      }
      let {
          forwardRef: l,
          currentElement: d
        } = Qa(),
        p = Za(d),
        m = to(),
        h = B(() => n.id && d.value ? document.querySelector(`[for="${n.id}"]`)?.innerText : undefined);
      return al({
        checked: s,
        toggleCheck: c,
        disabled: a
      }), (e, t) => (L(), fe(Ie, null, [rt(i(wo), mt({
        id: e.id,
        ref: i(l),
        role: `switch`,
        type: e.as === `button` ? `button` : undefined,
        value: e.value,
        "aria-label": e.$attrs[`aria-label`] || h.value,
        "aria-checked": s.value,
        "aria-required": e.required,
        "data-state": s.value ? `checked` : `unchecked`,
        "data-disabled": i(a) ? `` : undefined,
        "as-child": e.asChild,
        as: e.as,
        disabled: i(a)
      }, {
        ...i(m),
        ...e.$attrs
      }, {
        onClick: c,
        onKeydown: Xt(Jt(c, [`prevent`]), [`enter`])
      }), {
        default: Ee(() => [u(e.$slots, `default`, {
          modelValue: i(o),
          checked: s.value
        })]),
        _: 3
      }, 16, [`id`, `type`, `value`, `aria-label`, `aria-checked`, `aria-required`, `data-state`, `data-disabled`, `as-child`, `as`, `disabled`, `onKeydown`]), i(p) && e.name ? (L(), F(i(ss), mt({
        key: 0,
        type: `checkbox`,
        name: e.name,
        disabled: i(a),
        required: e.required,
        value: e.value,
        checked: s.value
      }, i(m)), null, 16, [`name`, `disabled`, `required`, `value`, `checked`])) : Bt(`v-if`, true)], 64));
    }
  }),
  sl = R({
    __name: `SwitchThumb`,
    props: {
      asChild: {
        type: Boolean,
        required: false
      },
      as: {
        type: null,
        required: false,
        default: `span`
      }
    },
    setup(e) {
      let t = il();
      return Qa(), (e, n) => (L(), F(i(wo), {
        "data-state": i(t).checked.value ? `checked` : `unchecked`,
        "data-disabled": i(t).disabled.value ? `` : undefined,
        "as-child": e.asChild,
        as: e.as
      }, {
        default: Ee(() => [u(e.$slots, `default`)]),
        _: 3
      }, 8, [`data-state`, `data-disabled`, `as-child`, `as`]));
    }
  }),
  cl = R({
    __name: `Button`,
    props: {
      variant: {},
      size: {},
      class: {
        type: [Boolean, null, String, Object, Array]
      },
      asChild: {
        type: Boolean
      },
      as: {
        default: `button`
      }
    },
    setup(e) {
      let n = e;
      return (r, a) => (L(), F(i(wo), {
        "data-slot": `button`,
        "data-variant": e.variant,
        "data-size": e.size,
        as: e.as,
        "as-child": e.asChild,
        class: t(i(gi)(i(ll)({
          variant: e.variant,
          size: e.size
        }), n.class))
      }, {
        default: Ee(() => [u(r.$slots, `default`)]),
        _: 3
      }, 8, [`data-variant`, `data-size`, `as`, `as-child`, `class`]));
    }
  }),
  ll = Gn(`focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 rounded-lg border border-transparent bg-clip-padding text-sm font-medium focus-visible:ring-3 aria-invalid:ring-3 active:not-aria-[haspopup]:translate-y-px [&_svg:not([class*=size-])]:size-4 group/button inline-flex shrink-0 items-center justify-center whitespace-nowrap transition-all outline-none select-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0`, {
    variants: {
      variant: {
        default: `bg-primary text-primary-foreground [a]:hover:bg-primary/80`,
        outline: `border-border bg-background hover:bg-muted hover:text-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 aria-expanded:bg-muted aria-expanded:text-foreground`,
        secondary: `bg-secondary text-secondary-foreground hover:bg-secondary/80 aria-expanded:bg-secondary aria-expanded:text-secondary-foreground`,
        ghost: `hover:bg-muted hover:text-foreground dark:hover:bg-muted/50 aria-expanded:bg-muted aria-expanded:text-foreground`,
        destructive: `bg-destructive/10 hover:bg-destructive/20 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/20 text-destructive focus-visible:border-destructive/40 dark:hover:bg-destructive/30`,
        link: `text-primary underline-offset-4 hover:underline`
      },
      size: {
        default: `h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2`,
        xs: `h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*=size-])]:size-3`,
        sm: `h-7 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*=size-])]:size-3.5`,
        lg: `h-9 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2`,
        icon: `size-8`,
        "icon-xs": `size-6 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*=size-])]:size-3`,
        "icon-sm": `size-7 rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-lg`,
        "icon-lg": `size-9`
      }
    },
    defaultVariants: {
      variant: `default`,
      size: `default`
    }
  }),
  ul = R({
    __name: `Switch`,
    props: {
      defaultValue: {},
      modelValue: {},
      disabled: {
        type: Boolean
      },
      id: {},
      value: {},
      trueValue: {},
      falseValue: {},
      asChild: {
        type: Boolean
      },
      as: {},
      name: {},
      required: {
        type: Boolean
      },
      class: {
        type: [Boolean, null, String, Object, Array]
      },
      size: {
        default: `default`
      }
    },
    emits: [`update:modelValue`],
    setup(e, {
      emit: t
    }) {
      let n = e,
        r = t,
        a = eo(Ji(n, `class`, `size`), r);
      return (t, r) => (L(), F(i(ol), mt({
        "data-slot": `switch`,
        "data-size": e.size
      }, i(a), {
        class: i(gi)(`data-checked:bg-primary data-unchecked:bg-input focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 dark:data-unchecked:bg-input/80 shrink-0 rounded-full border border-transparent focus-visible:ring-3 aria-invalid:ring-3 data-[size=default]:h-[18.4px] data-[size=default]:w-[32px] data-[size=sm]:h-[14px] data-[size=sm]:w-[24px] peer group/switch relative inline-flex items-center transition-all outline-none after:absolute after:-inset-x-3 after:-inset-y-2 data-disabled:cursor-not-allowed data-disabled:opacity-50`, n.class)
      }), {
        default: Ee(e => [rt(i(sl), {
          "data-slot": `switch-thumb`,
          class: `bg-background dark:data-unchecked:bg-foreground dark:data-checked:bg-primary-foreground rounded-full group-data-[size=default]/switch:size-4 group-data-[size=sm]/switch:size-3 group-data-[size=default]/switch:data-checked:translate-x-[calc(100%-2px)] group-data-[size=sm]/switch:data-checked:translate-x-[calc(100%-2px)] group-data-[size=default]/switch:data-unchecked:translate-x-0 group-data-[size=sm]/switch:data-unchecked:translate-x-0 pointer-events-none block ring-0 transition-transform`
        }, {
          default: Ee(() => [u(t.$slots, `thumb`, At(be(e)))]),
          _: 2
        }, 1024)]),
        _: 3
      }, 16, [`data-size`, `class`]));
    }
  });
export { la as $, To as A, Nn as At, $a as B, $o as C, Bn as Ct, ns as D, In as Dt, rs as E, Ln as Et, ho as F, On as Ft, Ga as G, Za as H, mo as I, Z as J, Ba as K, fo as L, So as M, Tn as Mt, xo as N, En as Nt, Go as O, Fn as Ot, go as P, kn as Pt, ca as Q, to as R, es as S, Gn as St, Qo as T, Rn as Tt, Xa as U, Qa as V, qa as W, Aa as X, Oa as Y, Ma as Z, is as _, yi as _t, Yc as a, Ra as at, Yo as b, _i as bt, el as c, J as ct, Zc as d, q as dt, Ia as et, $c as f, Xi as ft, as as g, bi as gt, ss as h, aa as ht, tl as i, Da as it, wo as j, Mn as jt, jo as k, Pn as kt, nl as l, Ji as lt, ec as m, ra as mt, ll as n, ka as nt, rl as o, Si as ot, Qs as p, na as pt, oa as q, cl as r, Pa as rt, Qc as s, Wi as st, ul as t, La as tt, Xc as u, Yi as ut, Xo as v, K as vt, Zo as w, zn as wt, qo as x, gi as xt, Ko as y, vi as yt, eo as z };