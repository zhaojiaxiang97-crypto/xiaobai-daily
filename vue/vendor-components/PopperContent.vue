<template>
<div ref="C_6" data-reka-popper-content-wrapper="" :dir="S_5" :style="j({...U,transform:G?U.transform:`translate(0, -200%)`,minWidth:`max-content`,zIndex:$_19.value,'--reka-popper-transform-origin':[J_12.transformOrigin?.x,J_12.transformOrigin?.y].join(` `),...(J_12.hide?.referenceHidden&&{visibility:`hidden`,pointerEvents:`none`})})"><component :is="s" /></div>
</template>

<script setup>
import { unref as h, renderSlot as _, createElementBlock as x, watch as C, createBlock as T, openBlock as O, defineComponent as A, computed as P } from 'vue';
// [符号说明] n~指令, i~指令, a~指令, o~指令, f~指令, p~指令
import { a as t, c as n, ct as r, d as i, f as a, i as o, j as s, l as c, s as f, u as p, yt as m } from '../vendor/ui/Switch.js';
// [符号说明] L=useConfigProviderContext
import { n as I, r as L } from '../vendor/ui/Collection.js';

function K(e_20) {
  return e_20 !== null;
}
function ee(e_20) {
  return {
    name: `transformOrigin`,
    options: e_20,
    fn(t) {
      let {
          placement: n,
          rects: r,
          middlewareData: i_16
        } = t,
        a_17 = i_16.arrow?.centerOffset !== 0,
        o = a_17 ? 0 : e_20.arrowWidth,
        s = a_17 ? 0 : e_20.arrowHeight,
        [c, l_0] = q(n),
        u_1 = {
          start: e_20.dir === `rtl` ? `100%` : `0%`,
          center: `50%`,
          end: e_20.dir === `rtl` ? `0%` : `100%`
        }[l_0],
        d_2 = {
          start: `0%`,
          center: `50%`,
          end: `100%`
        }[l_0],
        f = (i_16.arrow?.x ?? 0) + o / 2,
        p = (i_16.arrow?.y ?? 0) + s / 2,
        m_3 = ``,
        h = ``;
      return c === `bottom` ? (m_3 = a_17 ? u_1 : `${f}px`, h = `${-s}px`) : c === `top` ? (m_3 = a_17 ? u_1 : `${f}px`, h = `${r.floating.height + s}px`) : c === `right` ? (m_3 = `${-s}px`, h = a_17 ? d_2 : `${p}px`) : c === `left` && (m_3 = `${r.floating.width + s}px`, h = a_17 ? d_2 : `${p}px`), {
        data: {
          x: m_3,
          y: h
        }
      };
    }
  };
}
function q(e_20) {
  let [t, n = `center`] = e_20.split(`-`);
  return [t, n];
}
function J(e_20) {
  return typeof e_20 == `object` && !!e_20 && `$el` in e_20;
}
function Y(e_20) {
  if (J_12(e_20)) {
    let t = e_20.$el;
    return l_0(t) && d_2(t) === `#comment` ? null : t;
  }
  return e_20;
}
function X(e_20) {
  return typeof e_20 == `function` ? e_20() : h(e_20);
}
function te(e_20) {
  return {
    name: `arrow`,
    options: e_20,
    fn(t) {
      let n = Y_13(X_14(e_20.element));
      return n == null ? {} : o({
        element: n,
        padding: e_20.padding
      }).fn(t);
    }
  };
}
function Z(e_20) {
  return typeof window > `u` ? 1 : (e_20.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function Q(e_20, t) {
  let n = Z_15(e_20);
  return Math.round(t * n) / n;
}
function ne(e_20, t, n) {
  n === undefined && (n = {});
  let whileElementsMounted = n.whileElementsMounted,
    i_16 = P(() => X_14(n.open) ?? true),
    a_17 = P(() => X_14(n.middleware)),
    o = P(() => X_14(n.placement) ?? `bottom`),
    s = P(() => X_14(n.strategy) ?? `absolute`),
    c = P(() => X_14(n.transform) ?? true),
    l_0 = P(() => Y_13(e_20.value)),
    d_2 = P(() => Y_13(t.value)),
    f = E(0),
    p = E(0),
    m_3 = E(s.value),
    h = E(o.value),
    _ = g_4({}),
    v = E(false),
    y = P(() => {
      let options = {
        position: m_3.value,
        left: `0`,
        top: `0`
      };
      if (!d_2.value) return options;
      let t = Q_18(d_2.value, f.value),
        n = Q_18(d_2.value, p.value);
      return c.value ? {
        ...options,
        transform: `translate(` + t + `px, ` + n + `px)`,
        ...(Z_15(d_2.value) >= 1.5 && {
          willChange: `transform`
        })
      } : {
        position: m_3.value,
        left: t + `px`,
        top: n + `px`
      };
    }),
    b;
  function x() {
    if (l_0.value == null || d_2.value == null) return;
    let value = i_16.value;
    u_1(l_0.value, d_2.value, {
      middleware: a_17.value,
      placement: o.value,
      strategy: s.value
    }).then(result => {
      f.value = result.x, p.value = result.y, m_3.value = result.strategy, h.value = result.placement, _.value = result.middlewareData, v.value = value !== false;
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
    if (l_0.value != null && d_2.value != null) {
      b = whileElementsMounted(l_0.value, d_2.value, x);
      return;
    }
  }
  function D_7() {
    i_16.value || (v.value = false);
  }
  return C_6([a_17, o, s, i_16], x, {
    flush: `sync`
  }), C_6([l_0, d_2], T, {
    flush: `sync`
  }), C_6(i_16, D_7, {
    flush: `sync`
  }), N_10() && k_8(w), {
    x: S_5(f),
    y: S_5(p),
    strategy: S_5(m_3),
    placement: S_5(h),
    middlewareData: S_5(_),
    isPositioned: S_5(v),
    floatingStyles: y,
    update: x
  };
}
var re = [`dir`];
var $ = {
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
};
let l_0 = r,
  u_1 = o,
  d_2 = H(),
  {
    forwardRef: m_3,
    currentElement: g_4
  } = e_20(),
  S_5 = L(P(() => l_0.dir)),
  C_6 = E(),
  D_7 = E(),
  {
    width: k_8,
    height: A_9
  } = I(D_7),
  N_10 = P(() => l_0.side + (l_0.align === `center` ? `` : `-${l_0.align}`)),
  F_11 = P(() => typeof l_0.collisionPadding == `number` ? l_0.collisionPadding : {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...l_0.collisionPadding
  }),
  R = P(() => Array.isArray(l_0.collisionBoundary) ? l_0.collisionBoundary : [l_0.collisionBoundary]),
  z = P(() => ({
    padding: F_11.value,
    boundary: R.value.filter(K),
    altBoundary: R.value.length > 0
  })),
  B = P(() => ({
    mainAxis: l_0.sideFlip,
    crossAxis: l_0.alignFlip
  })),
  V = P(() => [p({
    mainAxis: l_0.sideOffset + A_9.value,
    alignmentAxis: l_0.alignOffset
  }), l_0.prioritizePosition && l_0.avoidCollisions && f({
    ...z.value,
    ...B.value
  }), l_0.avoidCollisions && i_16({
    mainAxis: true,
    crossAxis: !!l_0.prioritizePosition,
    limiter: l_0.sticky === `partial` ? c() : undefined,
    ...z.value
  }), !l_0.prioritizePosition && l_0.avoidCollisions && f({
    ...z.value,
    ...B.value
  }), a_17({
    ...z.value,
    apply: ({
      elements: e_20,
      rects: t,
      availableWidth: n,
      availableHeight: r
    }) => {
      let {
          width: i_16,
          height: a_17
        } = t.reference,
        style = e_20.floating.style;
      style.setProperty(`--reka-popper-available-width`, `${n}px`), style.setProperty(`--reka-popper-available-height`, `${r}px`), style.setProperty(`--reka-popper-anchor-width`, `${i_16}px`), style.setProperty(`--reka-popper-anchor-height`, `${a_17}px`);
    }
  }), D_7.value && te({
    element: D_7.value,
    padding: l_0.arrowPadding
  }), ee({
    arrowWidth: k_8.value,
    arrowHeight: A_9.value,
    dir: S_5.value
  }), l_0.hideWhenDetached && n({
    strategy: `referenceHidden`,
    ...z.value
  })]),
  {
    floatingStyles: U,
    placement: W,
    isPositioned: G,
    middlewareData: J_12,
    update: Y_13
  } = ne(P(() => l_0.reference ?? d_2.anchor.value), C_6, {
    strategy: l_0.positionStrategy,
    placement: N_10,
    whileElementsMounted: (...e_20) => t(...e_20, {
      layoutShift: !l_0.disableUpdateOnLayoutShift,
      animationFrame: l_0.updatePositionStrategy === `always`
    }),
    middleware: V
  }),
  X_14 = P(() => q(W.value)[0]),
  Z_15 = P(() => q(W.value)[1]);
let {
    width: i_16,
    height: a_17
  } = t.reference,
  style = e_20.floating.style;
let Q_18 = P(() => {
    let e_20 = J_12.value.arrow?.centerOffset !== 0;
    return l_0.hideShiftedArrow && e_20;
  }),
  $_19 = E(``);
let e_20 = J_12.value.arrow?.centerOffset !== 0;
</script>
