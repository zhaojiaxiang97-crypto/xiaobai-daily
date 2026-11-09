import { V as e, a as t, c as n, ct as r, d as i, f as a, i as o, j as s, l as c, m as l, o as u, p as d, s as f, u as p, yt as m } from "./Switch.js";
import { An as h, Cn as g, Ct as _, Gt as v, Kt as y, Qt as b, S as x, Sn as S, Wt as C, Yt as w, b as T, bn as E, et as D, gt as O, hn as k, j as A, nr as j, nt as M, sn as N, v as P } from "../chunks/vue-i18n.runtime.js";
import { r as F } from "./icons/lucide-icons.js";
import { n as I, r as L } from "./Collection.js";
var R = F(`chevron-down`, [[`path`, {
    d: `m6 9 6 6 6-6`,
    key: `qrunsl`
  }]]),
  z = 0;
function B() {
  v(fn => {
    if (!r) return;
    let selectorAll = document.querySelectorAll(`[data-reka-focus-guard]`);
    document.body.insertAdjacentElement(`afterbegin`, selectorAll[0] ?? V()), document.body.insertAdjacentElement(`beforeend`, selectorAll[1] ?? V()), z++, fn(() => {
      z === 1 && document.querySelectorAll(`[data-reka-focus-guard]`).forEach(item => item.remove()), z--;
    });
  });
}
function V() {
  let element = document.createElement(`span`);
  return element.setAttribute(`data-reka-focus-guard`, ``), element.tabIndex = 0, element.style.outline = `none`, element.style.opacity = `0`, element.style.position = `fixed`, element.style.pointerEvents = `none`, element;
}
var [H, U] = m(`PopperRoot`),
  W = A({
    inheritAttrs: false,
    __name: `PopperRoot`,
    setup(props) {
      let t = E();
      return U({
        anchor: t,
        onAnchorChange: e => t.value = e
      }), (e, t) => _(e.$slots, `default`);
    }
  }),
  G = A({
    __name: `PopperAnchor`,
    props: {
      reference: {
        type: null,
        required: false
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
    setup(props) {
      let propsAlias = props,
        {
          forwardRef: r,
          currentElement: i
        } = e(),
        a = H();
      return y(() => {
        a.onAnchorChange(propsAlias.reference ?? i.value);
      }), (e, t) => (O(), T(h(s), {
        ref: h(r),
        as: e.as,
        "as-child": e.asChild
      }, {
        default: w(() => [_(e.$slots, `default`)]),
        _: 3
      }, 8, [`as`, `as-child`]));
    }
  });
function K(e) {
  return e !== null;
}
function ee(e) {
  return {
    name: `transformOrigin`,
    options: e,
    fn(t) {
      let {
          placement: n,
          rects: r,
          middlewareData: i
        } = t,
        a = i.arrow?.centerOffset !== 0,
        o = a ? 0 : e.arrowWidth,
        s = a ? 0 : e.arrowHeight,
        [c, l] = q(n),
        u = {
          start: e.dir === `rtl` ? `100%` : `0%`,
          center: `50%`,
          end: e.dir === `rtl` ? `0%` : `100%`
        }[l],
        d = {
          start: `0%`,
          center: `50%`,
          end: `100%`
        }[l],
        f = (i.arrow?.x ?? 0) + o / 2,
        p = (i.arrow?.y ?? 0) + s / 2,
        m = ``,
        h = ``;
      return c === `bottom` ? (m = a ? u : `${f}px`, h = `${-s}px`) : c === `top` ? (m = a ? u : `${f}px`, h = `${r.floating.height + s}px`) : c === `right` ? (m = `${-s}px`, h = a ? d : `${p}px`) : c === `left` && (m = `${r.floating.width + s}px`, h = a ? d : `${p}px`), {
        data: {
          x: m,
          y: h
        }
      };
    }
  };
}
function q(text) {
  let [t, n = `center`] = text.split(`-`);
  return [t, n];
}
function J(e) {
  return typeof e == `object` && !!e && `$el` in e;
}
function Y(e) {
  if (J(e)) {
    let t = e.$el;
    return l(t) && d(t) === `#comment` ? null : t;
  }
  return e;
}
function X(fn) {
  return typeof fn == `function` ? fn() : h(fn);
}
function te(e) {
  return {
    name: `arrow`,
    options: e,
    fn(t) {
      let n = Y(X(e.element));
      return n == null ? {} : o({
        element: n,
        padding: e.padding
      }).fn(t);
    }
  };
}
function Z(e) {
  return typeof window > `u` ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function Q(e, t) {
  let n = Z(e);
  return Math.round(t * n) / n;
}
function ne(e, t, n) {
  n === undefined && (n = {});
  let whileElementsMounted = n.whileElementsMounted,
    i = P(() => X(n.open) ?? true),
    a = P(() => X(n.middleware)),
    o = P(() => X(n.placement) ?? `bottom`),
    s = P(() => X(n.strategy) ?? `absolute`),
    c = P(() => X(n.transform) ?? true),
    l = P(() => Y(e.value)),
    d = P(() => Y(t.value)),
    f = E(0),
    p = E(0),
    m = E(s.value),
    h = E(o.value),
    _ = g({}),
    v = E(false),
    y = P(() => {
      let options = {
        position: m.value,
        left: `0`,
        top: `0`
      };
      if (!d.value) return options;
      let t = Q(d.value, f.value),
        n = Q(d.value, p.value);
      return c.value ? {
        ...options,
        transform: `translate(` + t + `px, ` + n + `px)`,
        ...(Z(d.value) >= 1.5 && {
          willChange: `transform`
        })
      } : {
        position: m.value,
        left: t + `px`,
        top: n + `px`
      };
    }),
    b;
  function x() {
    if (l.value == null || d.value == null) return;
    let e = i.value;
    u(l.value, d.value, {
      middleware: a.value,
      placement: o.value,
      strategy: s.value
    }).then(result => {
      f.value = result.x, p.value = result.y, m.value = result.strategy, h.value = result.placement, _.value = result.middlewareData, v.value = e !== false;
    });
  }
  function w() {
    typeof b == `function` && (b(), b = undefined);
  }
  function T() {
    if (w(), whileElementsMounted === undefined) {
      x();
      return;
    }
    if (l.value != null && d.value != null) {
      b = whileElementsMounted(l.value, d.value, x);
      return;
    }
  }
  function D() {
    i.value || (v.value = false);
  }
  return C([a, o, s, i], x, {
    flush: `sync`
  }), C([l, d], T, {
    flush: `sync`
  }), C(i, D, {
    flush: `sync`
  }), N() && k(w), {
    x: S(f),
    y: S(p),
    strategy: S(m),
    placement: S(h),
    middlewareData: S(_),
    isPositioned: S(v),
    floatingStyles: y,
    update: x
  };
}
var re = [`dir`],
  options = {
    side: `bottom`,
    sideOffset: 0,
    sideFlip: true,
    align: `center`,
    alignOffset: 0,
    alignFlip: true,
    arrowPadding: 0,
    hideShiftedArrow: true,
    avoidCollisions: true,
    collisionBoundary: () => [],
    collisionPadding: 0,
    sticky: `partial`,
    hideWhenDetached: false,
    positionStrategy: `fixed`,
    updatePositionStrategy: `optimized`,
    prioritizePosition: false
  },
  [ie, ae] = m(`PopperContent`),
  oe = A({
    inheritAttrs: false,
    __name: `PopperContent`,
    props: D({
      memoDependencies: {
        type: Array,
        required: false
      },
      side: {
        type: null,
        required: false
      },
      sideOffset: {
        type: Number,
        required: false
      },
      sideFlip: {
        type: Boolean,
        required: false
      },
      align: {
        type: null,
        required: false
      },
      alignOffset: {
        type: Number,
        required: false
      },
      alignFlip: {
        type: Boolean,
        required: false
      },
      avoidCollisions: {
        type: Boolean,
        required: false
      },
      collisionBoundary: {
        type: null,
        required: false
      },
      collisionPadding: {
        type: [Number, Object],
        required: false
      },
      arrowPadding: {
        type: Number,
        required: false
      },
      hideShiftedArrow: {
        type: Boolean,
        required: false
      },
      sticky: {
        type: String,
        required: false
      },
      hideWhenDetached: {
        type: Boolean,
        required: false
      },
      positionStrategy: {
        type: String,
        required: false
      },
      updatePositionStrategy: {
        type: String,
        required: false
      },
      disableUpdateOnLayoutShift: {
        type: Boolean,
        required: false
      },
      prioritizePosition: {
        type: Boolean,
        required: false
      },
      reference: {
        type: null,
        required: false
      },
      dir: {
        type: String,
        required: false
      },
      asChild: {
        type: Boolean,
        required: false
      },
      as: {
        type: null,
        required: false
      }
    }, {
      ...options
    }),
    emits: [`placed`],
    setup(props, {
      emit: emit
    }) {
      let propsAlias = props,
        emitAlias = emit,
        d = H(),
        {
          forwardRef: m,
          currentElement: g
        } = e(),
        S = L(P(() => propsAlias.dir)),
        C = E(),
        D = E(),
        {
          width: k,
          height: A
        } = I(D),
        N = P(() => propsAlias.side + (propsAlias.align === `center` ? `` : `-${propsAlias.align}`)),
        F = P(() => typeof propsAlias.collisionPadding == `number` ? propsAlias.collisionPadding : {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          ...propsAlias.collisionPadding
        }),
        R = P(() => Array.isArray(propsAlias.collisionBoundary) ? propsAlias.collisionBoundary : [propsAlias.collisionBoundary]),
        z = P(() => ({
          padding: F.value,
          boundary: R.value.filter(K),
          altBoundary: R.value.length > 0
        })),
        B = P(() => ({
          mainAxis: propsAlias.sideFlip,
          crossAxis: propsAlias.alignFlip
        })),
        V = P(() => [p({
          mainAxis: propsAlias.sideOffset + A.value,
          alignmentAxis: propsAlias.alignOffset
        }), propsAlias.prioritizePosition && propsAlias.avoidCollisions && f({
          ...z.value,
          ...B.value
        }), propsAlias.avoidCollisions && i({
          mainAxis: true,
          crossAxis: !!propsAlias.prioritizePosition,
          limiter: propsAlias.sticky === `partial` ? c() : undefined,
          ...z.value
        }), !propsAlias.prioritizePosition && propsAlias.avoidCollisions && f({
          ...z.value,
          ...B.value
        }), a({
          ...z.value,
          apply: ({
            elements: e,
            rects: t,
            availableWidth: n,
            availableHeight: r
          }) => {
            let {
                width: i,
                height: a
              } = t.reference,
              o = e.floating.style;
            o.setProperty(`--reka-popper-available-width`, `${n}px`), o.setProperty(`--reka-popper-available-height`, `${r}px`), o.setProperty(`--reka-popper-anchor-width`, `${i}px`), o.setProperty(`--reka-popper-anchor-height`, `${a}px`);
          }
        }), D.value && te({
          element: D.value,
          padding: propsAlias.arrowPadding
        }), ee({
          arrowWidth: k.value,
          arrowHeight: A.value,
          dir: S.value
        }), propsAlias.hideWhenDetached && n({
          strategy: `referenceHidden`,
          ...z.value
        })]),
        {
          floatingStyles: U,
          placement: W,
          isPositioned: G,
          middlewareData: J,
          update: Y
        } = ne(P(() => propsAlias.reference ?? d.anchor.value), C, {
          strategy: propsAlias.positionStrategy,
          placement: N,
          whileElementsMounted: (...e) => t(...e, {
            layoutShift: !propsAlias.disableUpdateOnLayoutShift,
            animationFrame: propsAlias.updatePositionStrategy === `always`
          }),
          middleware: V
        }),
        X = P(() => q(W.value)[0]),
        Z = P(() => q(W.value)[1]);
      y(() => {
        G.value && emitAlias(`placed`);
      });
      let Q = P(() => {
          let e = J.value.arrow?.centerOffset !== 0;
          return propsAlias.hideShiftedArrow && e;
        }),
        $ = E(``);
      return v(() => {
        g.value && ($.value = window.getComputedStyle(g.value).zIndex);
      }), ae({
        placedSide: X,
        onArrowChange: e => D.value = e,
        arrowX: P(() => J.value.arrow?.x ?? 0),
        arrowY: P(() => J.value.arrow?.y ?? 0),
        shouldHideArrow: Q
      }), (e, t) => (O(), x(`div`, {
        ref_key: `floatingRef`,
        ref: C,
        "data-reka-popper-content-wrapper": ``,
        dir: h(S),
        style: j({
          ...h(U),
          transform: h(G) ? h(U).transform : `translate(0, -200%)`,
          minWidth: `max-content`,
          zIndex: $.value,
          "--reka-popper-transform-origin": [h(J).transformOrigin?.x, h(J).transformOrigin?.y].join(` `),
          ...(h(J).hide?.referenceHidden && {
            visibility: `hidden`,
            pointerEvents: `none`
          })
        })
      }, [propsAlias.memoDependencies ? b([propsAlias.asChild, propsAlias.as, X.value, Z.value, h(G), ...Object.values(e.$attrs), ...propsAlias.memoDependencies], () => (O(), T(h(s), M({
        key: 0,
        ref: h(m)
      }, e.$attrs, {
        "as-child": propsAlias.asChild,
        as: propsAlias.as,
        "data-side": X.value,
        "data-align": Z.value,
        style: {
          animation: h(G) ? undefined : `none`
        }
      }), {
        default: w(() => [_(e.$slots, `default`)]),
        _: 3
      }, 16, [`as-child`, `as`, `data-side`, `data-align`, `style`])), t, 0) : (O(), T(h(s), M({
        key: 1,
        ref: h(m)
      }, e.$attrs, {
        "as-child": propsAlias.asChild,
        as: propsAlias.as,
        "data-side": X.value,
        "data-align": Z.value,
        dir: h(S),
        style: {
          animation: h(G) ? undefined : `none`
        }
      }), {
        default: w(() => [_(e.$slots, `default`)]),
        _: 3
      }, 16, [`as-child`, `as`, `data-side`, `data-align`, `dir`, `style`]))], 12, re));
    }
  });
export { W as a, G as i, oe as n, B as o, ie as r, R as s, options as t };