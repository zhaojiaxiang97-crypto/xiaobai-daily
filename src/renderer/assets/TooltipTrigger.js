import { B as e, C as t, G as n, I as r, N as i, Q as a, T as o, V as s, _ as c, at as l, dt as u, g as d, j as f, k as p, lt as m, mt as h, ot as g, ut as _, xt as v, yt as y, z as b } from "./Switch.js";
import { An as x, Ct as S, Dn as C, Et as ee, Gt as w, Nt as te, O as ne, S as T, V as E, Wt as re, Yt as D, b as O, bn as k, gt as A, j, k as M, nr as ie, nt as N, rr as ae, tr as P, ut as F, v as I, x as L } from "./vue-i18n.runtime.js";
import { E as R } from "./en-US-player.js";
import { a as z, i as B, n as V, r as H } from "./PopperContent.js";
function U(event, el) {
  let n = _(false, 300);
  u(() => {
    n.value = false;
  });
  let r = k(null),
    i = g();
  function a() {
    r.value = null, n.value = false;
  }
  function o(e, t) {
    if (!t) return;
    let currentTarget = e.currentTarget,
      a = {
        x: e.clientX,
        y: e.clientY
      },
      o = G(a, W(a, currentTarget.getBoundingClientRect()), 1),
      s = K(t.getBoundingClientRect()),
      c = J([...o, ...s]);
    r.value = c, n.value = true;
  }
  return w(fn => {
    if (event.value && el.value) {
      let handler = e => o(e, el.value),
        i = t => o(t, event.value);
      event.value.addEventListener(`pointerleave`, handler), el.value.addEventListener(`pointerleave`, i), fn(() => {
        event.value?.removeEventListener(`pointerleave`, handler), el.value?.removeEventListener(`pointerleave`, i);
      });
    }
  }), w(n => {
    if (r.value) {
      let handler = n => {
        if (!r.value || !(n.target instanceof Element)) return;
        let target = n.target,
          s = {
            x: n.clientX,
            y: n.clientY
          },
          fallbackValue = event.value?.contains(target) || el.value?.contains(target),
          l = !q(s, r.value),
          u = !!target.closest(`[data-grace-area-trigger]`);
        fallbackValue ? a() : (l || u) && (a(), i.trigger());
      };
      event.value?.ownerDocument.addEventListener(`pointermove`, handler), n(() => event.value?.ownerDocument.removeEventListener(`pointermove`, handler));
    }
  }), {
    isPointerInTransit: n,
    onPointerExit: i.on
  };
}
function W(e, t) {
  let n = Math.abs(t.top - e.y),
    r = Math.abs(t.bottom - e.y),
    i = Math.abs(t.right - e.x),
    a = Math.abs(t.left - e.x);
  switch (Math.min(n, r, i, a)) {
    case a:
      return `left`;
    case i:
      return `right`;
    case n:
      return `top`;
    case r:
      return `bottom`;
    default:
      throw Error(`unreachable`);
  }
}
function G(e, t, n = 5) {
  let emptyItems = [];
  switch (t) {
    case `top`:
      emptyItems.push({
        x: e.x - n,
        y: e.y + n
      }, {
        x: e.x + n,
        y: e.y + n
      });
      break;
    case `bottom`:
      emptyItems.push({
        x: e.x - n,
        y: e.y - n
      }, {
        x: e.x + n,
        y: e.y - n
      });
      break;
    case `left`:
      emptyItems.push({
        x: e.x + n,
        y: e.y - n
      }, {
        x: e.x + n,
        y: e.y + n
      });
      break;
    case `right`:
      emptyItems.push({
        x: e.x - n,
        y: e.y - n
      }, {
        x: e.x - n,
        y: e.y + n
      });
  }
  return emptyItems;
}
function K(e) {
  let {
    top: t,
    right: n,
    bottom: r,
    left: i
  } = e;
  return [{
    x: i,
    y: t
  }, {
    x: n,
    y: t
  }, {
    x: n,
    y: r
  }, {
    x: i,
    y: r
  }];
}
function q(e, count) {
  let {
      x: n,
      y: r
    } = e,
    i = false;
  for (let e = 0, a = count.length - 1; e < count.length; a = e++) {
    let o = count[e].x,
      s = count[e].y,
      c = count[a].x,
      l = count[a].y;
    s > r != l > r && n < (c - o) * (r - s) / (l - s) + o && (i = !i);
  }
  return i;
}
function J(items) {
  let part = items.slice();
  return part.sort((left, right) => left.x < right.x ? -1 : left.x > right.x ? 1 : left.y < right.y ? -1 : +(left.y > right.y)), oe(part);
}
function oe(items) {
  if (items.length <= 1) return items.slice();
  let emptyItems = [];
  for (let n = 0; n < items.length; n++) {
    let r = items[n];
    for (; emptyItems.length >= 2;) {
      let e = emptyItems.at(-1),
        n = emptyItems[emptyItems.length - 2];
      if ((e.x - n.x) * (r.y - n.y) >= (e.y - n.y) * (r.x - n.x)) emptyItems.pop();else break;
    }
    emptyItems.push(r);
  }
  emptyItems.pop();
  let n = [];
  for (let t = items.length - 1; t >= 0; t--) {
    let r = items[t];
    for (; n.length >= 2;) {
      let e = n.at(-1),
        t = n[n.length - 2];
      if ((e.x - t.x) * (r.y - t.y) >= (e.y - t.y) * (r.x - t.x)) n.pop();else break;
    }
    n.push(r);
  }
  return n.pop(), emptyItems.length === 1 && n.length === 1 && emptyItems[0].x === n[0].x && emptyItems[0].y === n[0].y ? emptyItems : emptyItems.concat(n);
}
var se = {
    key: 0,
    d: `M0 0L6 6L12 0`
  },
  ce = {
    key: 1,
    d: `M0 0L4.58579 4.58579C5.36683 5.36683 6.63316 5.36684 7.41421 4.58579L12 0`
  },
  le = j({
    __name: `Arrow`,
    props: {
      width: {
        type: Number,
        required: false,
        default: 10
      },
      height: {
        type: Number,
        required: false,
        default: 5
      },
      rounded: {
        type: Boolean,
        required: false
      },
      asChild: {
        type: Boolean,
        required: false
      },
      as: {
        type: null,
        required: false,
        default: `svg`
      }
    },
    setup(e) {
      let t = e;
      return s(), (e, n) => (A(), O(x(f), N(t, {
        width: e.width,
        height: e.height,
        viewBox: e.asChild ? undefined : `0 0 12 6`,
        preserveAspectRatio: e.asChild ? undefined : `none`
      }), {
        default: D(() => [S(e.$slots, `default`, {}, () => [e.rounded ? (A(), T(`path`, ce)) : (A(), T(`path`, se))])]),
        _: 3
      }, 16, [`width`, `height`, `viewBox`, `preserveAspectRatio`]));
    }
  }),
  options = {
    top: `bottom`,
    right: `left`,
    bottom: `top`,
    left: `right`
  },
  de = j({
    inheritAttrs: false,
    __name: `PopperArrow`,
    props: {
      width: {
        type: Number,
        required: false
      },
      height: {
        type: Number,
        required: false
      },
      rounded: {
        type: Boolean,
        required: false
      },
      asChild: {
        type: Boolean,
        required: false
      },
      as: {
        type: null,
        required: false,
        default: `svg`
      }
    },
    setup(e) {
      let {
          forwardRef: t
        } = s(),
        n = H(),
        r = I(() => options[n.placedSide.value]);
      return (e, i) => (A(), T(`span`, {
        ref: e => {
          x(n).onArrowChange(e ?? undefined);
        },
        style: ie({
          position: `absolute`,
          left: x(n).arrowX?.value ? `${x(n).arrowX?.value}px` : undefined,
          top: x(n).arrowY?.value ? `${x(n).arrowY?.value}px` : undefined,
          [r.value]: 0,
          transformOrigin: {
            top: ``,
            right: `0 0`,
            bottom: `center 0`,
            left: `100% 0`
          }[x(n).placedSide.value],
          transform: {
            top: `translateY(100%)`,
            right: `translateY(50%) rotate(90deg) translateX(-50%)`,
            bottom: `rotate(180deg)`,
            left: `translateY(50%) rotate(-90deg) translateX(50%)`
          }[x(n).placedSide.value],
          visibility: x(n).shouldHideArrow.value ? `hidden` : undefined
        })
      }, [M(le, N(e.$attrs, {
        ref: x(t),
        style: {
          display: `block`
        },
        as: e.as,
        "as-child": e.asChild,
        rounded: e.rounded,
        width: e.width,
        height: e.height
      }), {
        default: D(() => [S(e.$slots, `default`)]),
        _: 3
      }, 16, [`as`, `as-child`, `rounded`, `width`, `height`])], 4));
    }
  }),
  [fe, pe] = y([`MenuCheckboxItem`, `MenuRadioItem`], `MenuItemIndicatorContext`),
  me = j({
    __name: `MenuItemIndicator`,
    props: {
      forceMount: {
        type: Boolean,
        required: false
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
      let n = fe({
        modelValue: k(false)
      });
      return (e, r) => (A(), O(x(i), {
        present: e.forceMount || x(o)(x(n).modelValue.value) || x(n).modelValue.value === true
      }, {
        default: D(() => [M(x(f), {
          as: e.as,
          "as-child": e.asChild,
          "data-state": x(t)(x(n).modelValue.value)
        }, {
          default: D(() => [S(e.$slots, `default`)]),
          _: 3
        }, 8, [`as`, `as-child`, `data-state`])]),
        _: 3
      }, 8, [`present`]));
    }
  }),
  [he, ge] = y(`MenuGroup`),
  _e = j({
    __name: `MenuGroup`,
    props: {
      asChild: {
        type: Boolean,
        required: false
      },
      as: {
        type: null,
        required: false
      }
    },
    setup(e) {
      let t = e,
        n = r(undefined, `reka-menu-group`);
      return ge({
        id: n
      }), (e, r) => (A(), O(x(f), N({
        role: `group`
      }, t, {
        "aria-labelledby": x(n)
      }), {
        default: D(() => [S(e.$slots, `default`)]),
        _: 3
      }, 16, [`aria-labelledby`]));
    }
  }),
  ve = j({
    __name: `MenuLabel`,
    props: {
      asChild: {
        type: Boolean,
        required: false
      },
      as: {
        type: null,
        required: false,
        default: `div`
      }
    },
    setup(e) {
      let t = e,
        n = he({
          id: ``
        });
      return (e, r) => (A(), O(x(f), N(t, {
        id: x(n).id || undefined
      }), {
        default: D(() => [S(e.$slots, `default`)]),
        _: 3
      }, 16, [`id`]));
    }
  }),
  ye = j({
    __name: `DropdownMenuItemIndicator`,
    props: {
      forceMount: {
        type: Boolean,
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
    setup(e) {
      let t = e;
      return s(), (e, n) => (A(), O(x(me), P(E(t)), {
        default: D(() => [S(e.$slots, `default`)]),
        _: 3
      }, 16));
    }
  }),
  be = j({
    __name: `DropdownMenuLabel`,
    props: {
      asChild: {
        type: Boolean,
        required: false
      },
      as: {
        type: null,
        required: false
      }
    },
    setup(e) {
      let t = e;
      return s(), (e, n) => (A(), O(x(ve), P(E(t)), {
        default: D(() => [S(e.$slots, `default`)]),
        _: 3
      }, 16));
    }
  }),
  xe = j({
    __name: `TooltipArrow`,
    props: {
      width: {
        type: Number,
        required: false,
        default: 10
      },
      height: {
        type: Number,
        required: false,
        default: 5
      },
      asChild: {
        type: Boolean,
        required: false
      },
      as: {
        type: null,
        required: false,
        default: `svg`
      }
    },
    setup(e) {
      let t = e;
      return s(), (e, n) => (A(), O(x(de), P(E(t)), {
        default: D(() => [S(e.$slots, `default`)]),
        _: 3
      }, 16));
    }
  }),
  [Y, Se] = y(`TooltipProvider`),
  Ce = j({
    inheritAttrs: false,
    __name: `TooltipProvider`,
    props: {
      delayDuration: {
        type: Number,
        required: false,
        default: 700
      },
      skipDelayDuration: {
        type: Number,
        required: false,
        default: 300
      },
      disableHoverableContent: {
        type: Boolean,
        required: false,
        default: false
      },
      disableClosingTrigger: {
        type: Boolean,
        required: false
      },
      disabled: {
        type: Boolean,
        required: false
      },
      ignoreNonKeyboardFocus: {
        type: Boolean,
        required: false,
        default: false
      },
      content: {
        type: Object,
        required: false
      }
    },
    setup(e) {
      let {
        delayDuration: t,
        skipDelayDuration: n,
        disableHoverableContent: r,
        disableClosingTrigger: i,
        ignoreNonKeyboardFocus: a,
        disabled: o,
        content: c
      } = C(e);
      s();
      let l = k(true),
        u = k(false),
        {
          start: d,
          stop: f
        } = h(() => {
          l.value = true;
        }, n, {
          immediate: false
        });
      return Se({
        isOpenDelayed: l,
        delayDuration: t,
        onOpen() {
          f(), l.value = false;
        },
        onClose() {
          d();
        },
        isPointerInTransitRef: u,
        disableHoverableContent: r,
        disableClosingTrigger: i,
        disabled: o,
        ignoreNonKeyboardFocus: a,
        content: c
      }), (e, t) => S(e.$slots, `default`);
    }
  }),
  X = `tooltip.open`,
  [Z, we] = y(`TooltipRoot`),
  Te = j({
    __name: `TooltipRoot`,
    props: {
      defaultOpen: {
        type: Boolean,
        required: false,
        default: false
      },
      open: {
        type: Boolean,
        required: false,
        default: undefined
      },
      delayDuration: {
        type: Number,
        required: false,
        default: undefined
      },
      disableHoverableContent: {
        type: Boolean,
        required: false,
        default: undefined
      },
      disableClosingTrigger: {
        type: Boolean,
        required: false,
        default: undefined
      },
      disabled: {
        type: Boolean,
        required: false,
        default: undefined
      },
      ignoreNonKeyboardFocus: {
        type: Boolean,
        required: false,
        default: undefined
      }
    },
    emits: [`update:open`],
    setup(e, {
      emit: t
    }) {
      let n = e,
        r = t;
      s();
      let i = Y(),
        a = I(() => n.disableHoverableContent ?? i.disableHoverableContent.value),
        o = I(() => n.disableClosingTrigger ?? i.disableClosingTrigger.value),
        c = I(() => n.disabled ?? i.disabled.value),
        u = I(() => n.delayDuration ?? i.delayDuration.value),
        d = I(() => n.ignoreNonKeyboardFocus ?? i.ignoreNonKeyboardFocus.value),
        f = l(n, `open`, r, {
          defaultValue: n.defaultOpen,
          passive: n.open === undefined
        });
      re(f, e => {
        i.onClose && (e ? (i.onOpen(), document.dispatchEvent(new CustomEvent(X))) : i.onClose());
      });
      let p = k(false),
        m = k(),
        g = I(() => f.value ? p.value ? `delayed-open` : `instant-open` : `closed`),
        {
          start: _,
          stop: v
        } = h(() => {
          p.value = true, f.value = true;
        }, u, {
          immediate: false
        });
      function y() {
        v(), p.value = false, f.value = true;
      }
      function b() {
        v(), f.value = false;
      }
      function C() {
        _();
      }
      return we({
        contentId: ``,
        open: f,
        stateAttribute: g,
        trigger: m,
        onTriggerChange(trigger) {
          m.value = trigger;
        },
        onTriggerEnter() {
          i.isOpenDelayed.value ? C() : y();
        },
        onTriggerLeave() {
          a.value ? b() : v();
        },
        onOpen: y,
        onClose: b,
        disableHoverableContent: a,
        disableClosingTrigger: o,
        disabled: c,
        ignoreNonKeyboardFocus: d
      }), (e, t) => (A(), O(x(z), null, {
        default: D(() => [S(e.$slots, `default`, {
          open: x(f)
        })]),
        _: 3
      }));
    }
  }),
  Q = j({
    __name: `TooltipContentImpl`,
    props: {
      ariaLabel: {
        type: String,
        required: false
      },
      asChild: {
        type: Boolean,
        required: false,
        default: undefined
      },
      as: {
        type: null,
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
      align: {
        type: null,
        required: false
      },
      alignOffset: {
        type: Number,
        required: false
      },
      avoidCollisions: {
        type: Boolean,
        required: false,
        default: undefined
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
      sticky: {
        type: String,
        required: false
      },
      hideWhenDetached: {
        type: Boolean,
        required: false,
        default: undefined
      },
      positionStrategy: {
        type: String,
        required: false
      },
      updatePositionStrategy: {
        type: String,
        required: false
      }
    },
    emits: [`escapeKeyDown`, `pointerDownOutside`],
    setup(event, {
      emit: t
    }) {
      let eventAlias = event,
        i = t,
        o = Z(),
        c = Y(),
        {
          forwardRef: l,
          currentElement: u
        } = s(),
        f = I(() => eventAlias.ariaLabel || u.value?.textContent),
        m = I(() => {
          let {
            ariaLabel: e,
            ...t
          } = eventAlias;
          return n(t, c.content.value ?? {}, {
            side: `top`,
            sideOffset: 0,
            align: `center`,
            avoidCollisions: true,
            collisionBoundary: [],
            collisionPadding: 0,
            arrowPadding: 0,
            sticky: `partial`,
            hideWhenDetached: false
          });
        });
      return F(() => {
        a(window, `scroll`, e => {
          e.target?.contains(o.trigger.value) && o.onClose();
        }, {
          capture: true
        }), a(document, X, o.onClose);
      }), (e, t) => (A(), O(x(p), {
        "as-child": ``,
        "disable-outside-pointer-events": false,
        onEscapeKeyDown: t[0] ||= e => i(`escapeKeyDown`, e),
        onPointerDownOutside: t[1] ||= e => {
          x(o).disableClosingTrigger.value && x(o).trigger.value?.contains(e.target) && e.preventDefault(), i(`pointerDownOutside`, e);
        },
        onFocusOutside: t[2] ||= R(() => {}, [`prevent`]),
        onDismiss: t[3] ||= e => x(o).onClose()
      }, {
        default: D(() => [M(x(V), N({
          ref: x(l),
          "data-state": x(o).stateAttribute.value
        }, {
          ...e.$attrs,
          ...m.value
        }, {
          style: {
            "--reka-tooltip-content-transform-origin": `var(--reka-popper-transform-origin)`,
            "--reka-tooltip-content-available-width": `var(--reka-popper-available-width)`,
            "--reka-tooltip-content-available-height": `var(--reka-popper-available-height)`,
            "--reka-tooltip-trigger-width": `var(--reka-popper-anchor-width)`,
            "--reka-tooltip-trigger-height": `var(--reka-popper-anchor-height)`
          }
        }), {
          default: D(() => [S(e.$slots, `default`), M(x(d), {
            id: x(o).contentId,
            role: `tooltip`
          }, {
            default: D(() => [ne(ae(f.value), 1)]),
            _: 1
          }, 8, [`id`])]),
          _: 3
        }, 16, [`data-state`])]),
        _: 3
      }));
    }
  }),
  Ee = j({
    __name: `TooltipContentHoverable`,
    props: {
      ariaLabel: {
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
      },
      side: {
        type: null,
        required: false
      },
      sideOffset: {
        type: Number,
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
      }
    },
    setup(t) {
      let n = e(t),
        {
          forwardRef: r,
          currentElement: i
        } = s(),
        {
          trigger: a,
          onClose: o
        } = Z(),
        c = Y(),
        {
          isPointerInTransit: l,
          onPointerExit: u
        } = U(a, i);
      return c.isPointerInTransitRef = l, u(() => {
        o();
      }), (e, t) => (A(), O(Q, N({
        ref: x(r)
      }, x(n)), {
        default: D(() => [S(e.$slots, `default`)]),
        _: 3
      }, 16));
    }
  }),
  De = j({
    __name: `TooltipContent`,
    props: {
      forceMount: {
        type: Boolean,
        required: false
      },
      ariaLabel: {
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
      },
      side: {
        type: null,
        required: false
      },
      sideOffset: {
        type: Number,
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
      }
    },
    emits: [`escapeKeyDown`, `pointerDownOutside`],
    setup(e, {
      emit: t
    }) {
      let n = e,
        r = t,
        a = Z(),
        o = b(n, r),
        {
          forwardRef: c
        } = s();
      return (e, t) => (A(), O(x(i), {
        present: e.forceMount || x(a).open.value
      }, {
        default: D(() => [(A(), O(ee(x(a).disableHoverableContent.value ? Q : Ee), N({
          ref: x(c)
        }, x(o)), {
          default: D(() => [S(e.$slots, `default`)]),
          _: 3
        }, 16))]),
        _: 3
      }, 8, [`present`]));
    }
  }),
  $ = j({
    __name: `TooltipPortal`,
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
      let t = e;
      return (e, n) => (A(), O(x(c), P(E(t)), {
        default: D(() => [S(e.$slots, `default`)]),
        _: 3
      }, 16));
    }
  }),
  Oe = j({
    __name: `TooltipTrigger`,
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
        required: false,
        default: `button`
      }
    },
    setup(event) {
      let eventAlias = event,
        n = Z(),
        i = Y();
      n.contentId ||= r(undefined, `reka-tooltip-content`);
      let {
          forwardRef: a,
          currentElement: o
        } = s(),
        c = k(false),
        l = k(false),
        u = I(() => n.disabled.value ? {} : {
          click: v,
          focus: g,
          pointermove: m,
          pointerleave: h,
          pointerdown: p,
          blur: _
        });
      F(() => {
        n.onTriggerChange(o.value);
      });
      function d() {
        setTimeout(() => {
          c.value = false;
        }, 1);
      }
      function p() {
        n.open && !n.disableClosingTrigger.value && n.onClose(), c.value = true, document.addEventListener(`pointerup`, d, {
          once: true
        });
      }
      function m(e) {
        e.pointerType !== `touch` && !l.value && !i.isPointerInTransitRef.value && (n.onTriggerEnter(), l.value = true);
      }
      function h() {
        n.onTriggerLeave(), l.value = false;
      }
      function g(e) {
        c.value || (!n.ignoreNonKeyboardFocus.value || e.target.matches?.(`:focus-visible`)) && n.onOpen();
      }
      function _() {
        n.onClose();
      }
      function v() {
        n.disableClosingTrigger.value || n.onClose();
      }
      return (e, r) => (A(), O(x(B), {
        "as-child": ``,
        reference: e.reference
      }, {
        default: D(() => [M(x(f), N({
          ref: x(a),
          "aria-describedby": x(n).open.value ? x(n).contentId : undefined,
          "data-state": x(n).stateAttribute.value,
          as: e.as,
          "as-child": eventAlias.asChild,
          "data-grace-area-trigger": ``
        }, te(u.value)), {
          default: D(() => [S(e.$slots, `default`)]),
          _: 3
        }, 16, [`aria-describedby`, `data-state`, `as`, `as-child`])]),
        _: 3
      }, 8, [`reference`]));
    }
  }),
  ke = j({
    __name: `DropdownMenuLabel`,
    props: {
      asChild: {
        type: Boolean
      },
      as: {},
      class: {
        type: [Boolean, null, String, Object, Array]
      },
      inset: {
        type: Boolean
      }
    },
    setup(t) {
      let n = t,
        r = m(n, `class`, `inset`),
        i = e(r);
      return (e, r) => (A(), O(x(be), N({
        "data-slot": `dropdown-menu-label`,
        "data-inset": t.inset ? `` : undefined
      }, x(i), {
        class: x(v)(`text-muted-foreground px-1.5 py-1 text-xs font-medium data-inset:pl-7`, n.class)
      }), {
        default: D(() => [S(e.$slots, `default`)]),
        _: 3
      }, 16, [`data-inset`, `class`]));
    }
  }),
  Ae = j({
    __name: `Tooltip`,
    props: {
      defaultOpen: {
        type: Boolean
      },
      open: {
        type: Boolean
      },
      delayDuration: {},
      disableHoverableContent: {
        type: Boolean
      },
      disableClosingTrigger: {
        type: Boolean
      },
      disabled: {
        type: Boolean
      },
      ignoreNonKeyboardFocus: {
        type: Boolean
      }
    },
    emits: [`update:open`],
    setup(e, {
      emit: t
    }) {
      let n = b(e, t);
      return (e, t) => (A(), O(x(Te), N({
        "data-slot": `tooltip`
      }, x(n)), {
        default: D(t => [S(e.$slots, `default`, P(E(t)))]),
        _: 3
      }, 16));
    }
  }),
  je = j({
    inheritAttrs: false,
    __name: `TooltipContent`,
    props: {
      forceMount: {
        type: Boolean
      },
      ariaLabel: {},
      asChild: {
        type: Boolean
      },
      as: {},
      side: {},
      sideOffset: {
        default: 0
      },
      align: {},
      alignOffset: {},
      avoidCollisions: {
        type: Boolean
      },
      collisionBoundary: {},
      collisionPadding: {},
      arrowPadding: {},
      sticky: {},
      hideWhenDetached: {
        type: Boolean
      },
      positionStrategy: {},
      updatePositionStrategy: {},
      class: {
        type: [Boolean, null, String, Object, Array]
      },
      hideArrow: {
        type: Boolean
      }
    },
    emits: [`escapeKeyDown`, `pointerDownOutside`],
    setup(e, {
      emit: t
    }) {
      let n = e,
        r = t,
        i = m(n, `class`, `hideArrow`),
        a = b(i, r);
      return (e, t) => (A(), O(x($), null, {
        default: D(() => [M(x(De), N({
          "data-slot": `tooltip-content`
        }, {
          ...x(a),
          ...e.$attrs
        }, {
          class: x(v)(`data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-[state=delayed-open]:animate-in data-[state=delayed-open]:fade-in-0 data-[state=delayed-open]:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs has-data-[slot=kbd]:pr-1.5 **:data-[slot=kbd]:relative **:data-[slot=kbd]:isolate **:data-[slot=kbd]:z-50 **:data-[slot=kbd]:rounded-sm bg-foreground text-background z-50 w-fit max-w-xs origin-(--reka-tooltip-content-transform-origin)`, n.class)
        }), {
          default: D(() => [S(e.$slots, `default`), n.hideArrow ? L(``, true) : (A(), O(x(xe), {
            key: 0,
            class: `size-2.5 rotate-45 rounded-[2px] bg-foreground fill-foreground z-50 translate-y-[calc(-50%_-_2px)]`
          }))]),
          _: 3
        }, 16, [`class`])]),
        _: 3
      }));
    }
  }),
  Me = j({
    __name: `TooltipProvider`,
    props: {
      delayDuration: {
        default: 0
      },
      skipDelayDuration: {},
      disableHoverableContent: {
        type: Boolean
      },
      disableClosingTrigger: {
        type: Boolean
      },
      disabled: {
        type: Boolean
      },
      ignoreNonKeyboardFocus: {
        type: Boolean
      },
      content: {}
    },
    setup(e) {
      let t = e;
      return (e, n) => (A(), O(x(Ce), P(E(t)), {
        default: D(() => [S(e.$slots, `default`)]),
        _: 3
      }, 16));
    }
  }),
  Ne = j({
    __name: `TooltipTrigger`,
    props: {
      reference: {},
      asChild: {
        type: Boolean
      },
      as: {}
    },
    setup(e) {
      let t = e;
      return (e, n) => (A(), O(x(Oe), N({
        "data-slot": `tooltip-trigger`
      }, t), {
        default: D(() => [S(e.$slots, `default`)]),
        _: 3
      }, 16));
    }
  });
export { ke as a, pe as c, Ae as i, Me as n, ye as o, je as r, _e as s, Ne as t };