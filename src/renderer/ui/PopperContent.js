import { V as uiSwitchV, a as uiSwitchA, c as uiSwitchC, ct as uiSwitchCt, d as uiSwitchD, f as uiSwitchF, i as uiSwitchI, j as uiSwitchJ, l as uiSwitchL, m as uiSwitchM, o as uiSwitchO, p as uiSwitchP, s as uiSwitchS, u as uiSwitchU, yt as uiSwitchYt } from "./Switch.js";
import { An as vueAn, Cn as vueCn, Ct as vueCt, Gt as vueGt, Kt as vueKt, Qt as vueQt, S as vueS, Sn as vueSn, Wt as vueWt, Yt as vueYt, b as vueB, bn as vueBn, et as vueEt, gt as O, hn as vueHn, j as vueJ, nr as vueNr, nt as vueNt, sn as N, v as vueV } from "../chunks/vue-i18n.runtime.js";
import { r as lucideR } from "./icons/lucide-icons.js";
import { n as CollectionN, r as CollectionR } from "./Collection.js";
var R = lucideR(`chevron-down`, [[`path`, {
    d: `m6 9 6 6 6-6`,
    key: `qrunsl`
  }]]),
  z = 0;
function B() {
  vueGt(fn => {
    if (!uiSwitchCt) return;
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
var [H, U] = uiSwitchYt(`PopperRoot`),
  W = vueJ({
    inheritAttrs: false,
    __name: `PopperRoot`,
    setup(props) {
      let t = vueBn();
      return U({
        anchor: t,
        onAnchorChange: e => t.value = e
      }), (e, t) => vueCt(e.$slots, `default`);
    }
  }),
  G = vueJ({
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
        } = uiSwitchV(),
        a = H();
      return vueKt(() => {
        a.onAnchorChange(propsAlias.reference ?? i.value);
      }), (e, t) => (O(), vueB(vueAn(uiSwitchJ), {
        ref: vueAn(r),
        as: e.as,
        "as-child": e.asChild
      }, {
        default: vueYt(() => [vueCt(e.$slots, `default`)]),
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
    return uiSwitchM(t) && uiSwitchP(t) === `#comment` ? null : t;
  }
  return e;
}
function X(fn) {
  return typeof fn == `function` ? fn() : vueAn(fn);
}
function te(e) {
  return {
    name: `arrow`,
    options: e,
    fn(t) {
      let n = Y(X(e.element));
      return n == null ? {} : uiSwitchI({
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
    i = vueV(() => X(n.open) ?? true),
    a = vueV(() => X(n.middleware)),
    o = vueV(() => X(n.placement) ?? `bottom`),
    s = vueV(() => X(n.strategy) ?? `absolute`),
    c = vueV(() => X(n.transform) ?? true),
    l = vueV(() => Y(e.value)),
    d = vueV(() => Y(t.value)),
    f = vueBn(0),
    p = vueBn(0),
    m = vueBn(s.value),
    h = vueBn(o.value),
    _ = vueCn({}),
    v = vueBn(false),
    y = vueV(() => {
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
    uiSwitchO(l.value, d.value, {
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
  return vueWt([a, o, s, i], x, {
    flush: `sync`
  }), vueWt([l, d], T, {
    flush: `sync`
  }), vueWt(i, D, {
    flush: `sync`
  }), N() && vueHn(w), {
    x: vueSn(f),
    y: vueSn(p),
    strategy: vueSn(m),
    placement: vueSn(h),
    middlewareData: vueSn(_),
    isPositioned: vueSn(v),
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
  [ie, ae] = uiSwitchYt(`PopperContent`),
  oe = vueJ({
    inheritAttrs: false,
    __name: `PopperContent`,
    props: vueEt({
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
        } = uiSwitchV(),
        S = CollectionR(vueV(() => propsAlias.dir)),
        C = vueBn(),
        D = vueBn(),
        {
          width: k,
          height: A
        } = CollectionN(D),
        N = vueV(() => propsAlias.side + (propsAlias.align === `center` ? `` : `-${propsAlias.align}`)),
        F = vueV(() => typeof propsAlias.collisionPadding == `number` ? propsAlias.collisionPadding : {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          ...propsAlias.collisionPadding
        }),
        R = vueV(() => Array.isArray(propsAlias.collisionBoundary) ? propsAlias.collisionBoundary : [propsAlias.collisionBoundary]),
        z = vueV(() => ({
          padding: F.value,
          boundary: R.value.filter(K),
          altBoundary: R.value.length > 0
        })),
        B = vueV(() => ({
          mainAxis: propsAlias.sideFlip,
          crossAxis: propsAlias.alignFlip
        })),
        V = vueV(() => [uiSwitchU({
          mainAxis: propsAlias.sideOffset + A.value,
          alignmentAxis: propsAlias.alignOffset
        }), propsAlias.prioritizePosition && propsAlias.avoidCollisions && uiSwitchS({
          ...z.value,
          ...B.value
        }), propsAlias.avoidCollisions && uiSwitchD({
          mainAxis: true,
          crossAxis: !!propsAlias.prioritizePosition,
          limiter: propsAlias.sticky === `partial` ? uiSwitchL() : undefined,
          ...z.value
        }), !propsAlias.prioritizePosition && propsAlias.avoidCollisions && uiSwitchS({
          ...z.value,
          ...B.value
        }), uiSwitchF({
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
        }), propsAlias.hideWhenDetached && uiSwitchC({
          strategy: `referenceHidden`,
          ...z.value
        })]),
        {
          floatingStyles: U,
          placement: W,
          isPositioned: G,
          middlewareData: J,
          update: Y
        } = ne(vueV(() => propsAlias.reference ?? d.anchor.value), C, {
          strategy: propsAlias.positionStrategy,
          placement: N,
          whileElementsMounted: (...e) => uiSwitchA(...e, {
            layoutShift: !propsAlias.disableUpdateOnLayoutShift,
            animationFrame: propsAlias.updatePositionStrategy === `always`
          }),
          middleware: V
        }),
        X = vueV(() => q(W.value)[0]),
        Z = vueV(() => q(W.value)[1]);
      vueKt(() => {
        G.value && emitAlias(`placed`);
      });
      let Q = vueV(() => {
          let e = J.value.arrow?.centerOffset !== 0;
          return propsAlias.hideShiftedArrow && e;
        }),
        $ = vueBn(``);
      return vueGt(() => {
        g.value && ($.value = window.getComputedStyle(g.value).zIndex);
      }), ae({
        placedSide: X,
        onArrowChange: e => D.value = e,
        arrowX: vueV(() => J.value.arrow?.x ?? 0),
        arrowY: vueV(() => J.value.arrow?.y ?? 0),
        shouldHideArrow: Q
      }), (e, t) => (O(), vueS(`div`, {
        ref_key: `floatingRef`,
        ref: C,
        "data-reka-popper-content-wrapper": ``,
        dir: vueAn(S),
        style: vueNr({
          ...vueAn(U),
          transform: vueAn(G) ? vueAn(U).transform : `translate(0, -200%)`,
          minWidth: `max-content`,
          zIndex: $.value,
          "--reka-popper-transform-origin": [vueAn(J).transformOrigin?.x, vueAn(J).transformOrigin?.y].join(` `),
          ...(vueAn(J).hide?.referenceHidden && {
            visibility: `hidden`,
            pointerEvents: `none`
          })
        })
      }, [propsAlias.memoDependencies ? vueQt([propsAlias.asChild, propsAlias.as, X.value, Z.value, vueAn(G), ...Object.values(e.$attrs), ...propsAlias.memoDependencies], () => (O(), vueB(vueAn(uiSwitchJ), vueNt({
        key: 0,
        ref: vueAn(m)
      }, e.$attrs, {
        "as-child": propsAlias.asChild,
        as: propsAlias.as,
        "data-side": X.value,
        "data-align": Z.value,
        style: {
          animation: vueAn(G) ? undefined : `none`
        }
      }), {
        default: vueYt(() => [vueCt(e.$slots, `default`)]),
        _: 3
      }, 16, [`as-child`, `as`, `data-side`, `data-align`, `style`])), t, 0) : (O(), vueB(vueAn(uiSwitchJ), vueNt({
        key: 1,
        ref: vueAn(m)
      }, e.$attrs, {
        "as-child": propsAlias.asChild,
        as: propsAlias.as,
        "data-side": X.value,
        "data-align": Z.value,
        dir: vueAn(S),
        style: {
          animation: vueAn(G) ? undefined : `none`
        }
      }), {
        default: vueYt(() => [vueCt(e.$slots, `default`)]),
        _: 3
      }, 16, [`as-child`, `as`, `data-side`, `data-align`, `dir`, `style`]))], 12, re));
    }
  });
export { W as a, G as i, oe as n, B as o, ie as r, R as s, options as t };