import { B as uiSwitchB, C as uiSwitchC, G as uiSwitchG, I as uiSwitchI, N as uiSwitchN, Q as uiSwitchQ, T as uiSwitchT, V as uiSwitchV, _ as uiSwitch, at as uiSwitchAt, dt as uiSwitchDt, g as d, j as uiSwitchJ, k as uiSwitchK, lt as uiSwitchLt, mt as uiSwitchMt, ot as uiSwitchOt, ut as uiSwitchUt, xt as uiSwitchXt, yt as uiSwitchYt, z as uiSwitchZ } from "./Switch.js";
import { An as vueAn, Ct as vueCt, Dn as vueDn, Et as vueEt, Gt as vueGt, Nt as vueNt, O as vueO, S as vueS, V as vueV, Wt as vueWt, Yt as vueYt, b as vueB, bn as vueBn, gt as A, j as vueJ, k as vueK, nr as vueNr, nt as N, rr as vueRr, tr as vueTr, ut as vueUt, v as I, x as vueX } from "../chunks/vue-i18n.runtime.js";
import { E as playerE } from "../i18n/en-US-player.js";
import { a as PopperContentA, i as PopperContentI, n as PopperContentN, r as PopperContentR } from "./PopperContent.js";
function U(event, el) {
  let uiSwitchUtResult = uiSwitchUt(false, 300);
  uiSwitchDt(() => {
    uiSwitchUtResult.value = false;
  });
  let r = vueBn(null),
    uiSwitchOtResult = uiSwitchOt();
  function a() {
    r.value = null, uiSwitchUtResult.value = false;
  }
  function o(e, t) {
    if (!t) return;
    let i = e.currentTarget,
      a = {
        x: e.clientX,
        y: e.clientY
      },
      o = G(a, W(a, i.getBoundingClientRect()), 1),
      s = K(t.getBoundingClientRect()),
      c = J([...o, ...s]);
    r.value = c, uiSwitchUtResult.value = true;
  }
  return vueGt(fn => {
    if (event.value && el.value) {
      let handler = e => o(e, el.value),
        i = t => o(t, event.value);
      event.value.addEventListener(`pointerleave`, handler), el.value.addEventListener(`pointerleave`, i), fn(() => {
        event.value?.removeEventListener(`pointerleave`, handler), el.value?.removeEventListener(`pointerleave`, i);
      });
    }
  }), vueGt(n => {
    if (r.value) {
      let handler = n => {
        if (!r.value || !(n.target instanceof Element)) return;
        let o = n.target,
          s = {
            x: n.clientX,
            y: n.clientY
          },
          fallbackValue = event.value?.contains(o) || el.value?.contains(o),
          l = !q(s, r.value),
          u = !!o.closest(`[data-grace-area-trigger]`);
        fallbackValue ? a() : (l || u) && (a(), uiSwitchOtResult.trigger());
      };
      event.value?.ownerDocument.addEventListener(`pointermove`, handler), n(() => event.value?.ownerDocument.removeEventListener(`pointermove`, handler));
    }
  }), {
    isPointerInTransit: uiSwitchUtResult,
    onPointerExit: uiSwitchOtResult.on
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
  le = vueJ({
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
    setup(props) {
      let propsAlias = props;
      return uiSwitchV(), (e, n) => (A(), vueB(vueAn(uiSwitchJ), N(propsAlias, {
        width: e.width,
        height: e.height,
        viewBox: e.asChild ? undefined : `0 0 12 6`,
        preserveAspectRatio: e.asChild ? undefined : `none`
      }), {
        default: vueYt(() => [vueCt(e.$slots, `default`, {}, () => [e.rounded ? (A(), vueS(`path`, ce)) : (A(), vueS(`path`, se))])]),
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
  de = vueJ({
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
    setup(props) {
      let {
          forwardRef: t
        } = uiSwitchV(),
        n = PopperContentR(),
        r = I(() => options[n.placedSide.value]);
      return (ctx, renderCache) => (A(), vueS(`span`, {
        ref: e => {
          vueAn(n).onArrowChange(e ?? undefined);
        },
        style: vueNr({
          position: `absolute`,
          left: vueAn(n).arrowX?.value ? `${vueAn(n).arrowX?.value}px` : undefined,
          top: vueAn(n).arrowY?.value ? `${vueAn(n).arrowY?.value}px` : undefined,
          [r.value]: 0,
          transformOrigin: {
            top: ``,
            right: `0 0`,
            bottom: `center 0`,
            left: `100% 0`
          }[vueAn(n).placedSide.value],
          transform: {
            top: `translateY(100%)`,
            right: `translateY(50%) rotate(90deg) translateX(-50%)`,
            bottom: `rotate(180deg)`,
            left: `translateY(50%) rotate(-90deg) translateX(50%)`
          }[vueAn(n).placedSide.value],
          visibility: vueAn(n).shouldHideArrow.value ? `hidden` : undefined
        })
      }, [vueK(le, N(ctx.$attrs, {
        ref: vueAn(t),
        style: {
          display: `block`
        },
        as: ctx.as,
        "as-child": ctx.asChild,
        rounded: ctx.rounded,
        width: ctx.width,
        height: ctx.height
      }), {
        default: vueYt(() => [vueCt(ctx.$slots, `default`)]),
        _: 3
      }, 16, [`as`, `as-child`, `rounded`, `width`, `height`])], 4));
    }
  }),
  [fe, pe] = uiSwitchYt([`MenuCheckboxItem`, `MenuRadioItem`], `MenuItemIndicatorContext`),
  me = vueJ({
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
    setup(props) {
      let n = fe({
        modelValue: vueBn(false)
      });
      return (ctx, renderCache) => (A(), vueB(vueAn(uiSwitchN), {
        present: ctx.forceMount || vueAn(uiSwitchT)(vueAn(n).modelValue.value) || vueAn(n).modelValue.value === true
      }, {
        default: vueYt(() => [vueK(vueAn(uiSwitchJ), {
          as: ctx.as,
          "as-child": ctx.asChild,
          "data-state": vueAn(uiSwitchC)(vueAn(n).modelValue.value)
        }, {
          default: vueYt(() => [vueCt(ctx.$slots, `default`)]),
          _: 3
        }, 8, [`as`, `as-child`, `data-state`])]),
        _: 3
      }, 8, [`present`]));
    }
  }),
  [he, ge] = uiSwitchYt(`MenuGroup`),
  _e = vueJ({
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
    setup(props) {
      let propsAlias = props,
        uiSwitchIResult = uiSwitchI(undefined, `reka-menu-group`);
      return ge({
        id: uiSwitchIResult
      }), (e, r) => (A(), vueB(vueAn(uiSwitchJ), N({
        role: `group`
      }, propsAlias, {
        "aria-labelledby": vueAn(uiSwitchIResult)
      }), {
        default: vueYt(() => [vueCt(e.$slots, `default`)]),
        _: 3
      }, 16, [`aria-labelledby`]));
    }
  }),
  ve = vueJ({
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
    setup(props) {
      let propsAlias = props,
        n = he({
          id: ``
        });
      return (ctx, renderCache) => (A(), vueB(vueAn(uiSwitchJ), N(propsAlias, {
        id: vueAn(n).id || undefined
      }), {
        default: vueYt(() => [vueCt(ctx.$slots, `default`)]),
        _: 3
      }, 16, [`id`]));
    }
  }),
  ye = vueJ({
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
    setup(props) {
      let propsAlias = props;
      return uiSwitchV(), (e, n) => (A(), vueB(vueAn(me), vueTr(vueV(propsAlias)), {
        default: vueYt(() => [vueCt(e.$slots, `default`)]),
        _: 3
      }, 16));
    }
  }),
  be = vueJ({
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
    setup(props) {
      let propsAlias = props;
      return uiSwitchV(), (e, n) => (A(), vueB(vueAn(ve), vueTr(vueV(propsAlias)), {
        default: vueYt(() => [vueCt(e.$slots, `default`)]),
        _: 3
      }, 16));
    }
  }),
  xe = vueJ({
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
    setup(props) {
      let propsAlias = props;
      return uiSwitchV(), (e, n) => (A(), vueB(vueAn(de), vueTr(vueV(propsAlias)), {
        default: vueYt(() => [vueCt(e.$slots, `default`)]),
        _: 3
      }, 16));
    }
  }),
  [Y, Se] = uiSwitchYt(`TooltipProvider`),
  Ce = vueJ({
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
    setup(props) {
      let {
        delayDuration: t,
        skipDelayDuration: n,
        disableHoverableContent: r,
        disableClosingTrigger: i,
        ignoreNonKeyboardFocus: a,
        disabled: o,
        content: c
      } = vueDn(props);
      uiSwitchV();
      let l = vueBn(true),
        u = vueBn(false),
        {
          start: d,
          stop: f
        } = uiSwitchMt(() => {
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
      }), (e, t) => vueCt(e.$slots, `default`);
    }
  }),
  X = `tooltip.open`,
  [Z, we] = uiSwitchYt(`TooltipRoot`),
  Te = vueJ({
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
    setup(props, {
      emit: emit
    }) {
      let propsAlias = props,
        emitAlias = emit;
      uiSwitchV();
      let i = Y(),
        a = I(() => propsAlias.disableHoverableContent ?? i.disableHoverableContent.value),
        o = I(() => propsAlias.disableClosingTrigger ?? i.disableClosingTrigger.value),
        c = I(() => propsAlias.disabled ?? i.disabled.value),
        u = I(() => propsAlias.delayDuration ?? i.delayDuration.value),
        d = I(() => propsAlias.ignoreNonKeyboardFocus ?? i.ignoreNonKeyboardFocus.value),
        uiSwitchAtResult = uiSwitchAt(propsAlias, `open`, emitAlias, {
          defaultValue: propsAlias.defaultOpen,
          passive: propsAlias.open === undefined
        });
      vueWt(uiSwitchAtResult, e => {
        i.onClose && (e ? (i.onOpen(), document.dispatchEvent(new CustomEvent(X))) : i.onClose());
      });
      let p = vueBn(false),
        m = vueBn(),
        g = I(() => uiSwitchAtResult.value ? p.value ? `delayed-open` : `instant-open` : `closed`),
        {
          start: _,
          stop: v
        } = uiSwitchMt(() => {
          p.value = true, uiSwitchAtResult.value = true;
        }, u, {
          immediate: false
        });
      function y() {
        v(), p.value = false, uiSwitchAtResult.value = true;
      }
      function b() {
        v(), uiSwitchAtResult.value = false;
      }
      function C() {
        _();
      }
      return we({
        contentId: ``,
        open: uiSwitchAtResult,
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
      }), (e, t) => (A(), vueB(vueAn(PopperContentA), null, {
        default: vueYt(() => [vueCt(e.$slots, `default`, {
          open: vueAn(uiSwitchAtResult)
        })]),
        _: 3
      }));
    }
  }),
  Q = vueJ({
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
      emit: emit
    }) {
      let eventAlias = event,
        emitAlias = emit,
        o = Z(),
        c = Y(),
        {
          forwardRef: l,
          currentElement: u
        } = uiSwitchV(),
        f = I(() => eventAlias.ariaLabel || u.value?.textContent),
        m = I(() => {
          let {
            ariaLabel: e,
            ...t
          } = eventAlias;
          return uiSwitchG(t, c.content.value ?? {}, {
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
      return vueUt(() => {
        uiSwitchQ(window, `scroll`, e => {
          e.target?.contains(o.trigger.value) && o.onClose();
        }, {
          capture: true
        }), uiSwitchQ(document, X, o.onClose);
      }), (e, renderCache) => (A(), vueB(vueAn(uiSwitchK), {
        "as-child": ``,
        "disable-outside-pointer-events": false,
        onEscapeKeyDown: renderCache[0] ||= e => emitAlias(`escapeKeyDown`, e),
        onPointerDownOutside: renderCache[1] ||= e => {
          vueAn(o).disableClosingTrigger.value && vueAn(o).trigger.value?.contains(e.target) && e.preventDefault(), emitAlias(`pointerDownOutside`, e);
        },
        onFocusOutside: renderCache[2] ||= playerE(() => {}, [`prevent`]),
        onDismiss: renderCache[3] ||= e => vueAn(o).onClose()
      }, {
        default: vueYt(() => [vueK(vueAn(PopperContentN), N({
          ref: vueAn(l),
          "data-state": vueAn(o).stateAttribute.value
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
          default: vueYt(() => [vueCt(e.$slots, `default`), vueK(vueAn(d), {
            id: vueAn(o).contentId,
            role: `tooltip`
          }, {
            default: vueYt(() => [vueO(vueRr(f.value), 1)]),
            _: 1
          }, 8, [`id`])]),
          _: 3
        }, 16, [`data-state`])]),
        _: 3
      }));
    }
  }),
  Ee = vueJ({
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
    setup(props) {
      let uiSwitchBResult = uiSwitchB(props),
        {
          forwardRef: r,
          currentElement: i
        } = uiSwitchV(),
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
      }), (e, t) => (A(), vueB(Q, N({
        ref: vueAn(r)
      }, vueAn(uiSwitchBResult)), {
        default: vueYt(() => [vueCt(e.$slots, `default`)]),
        _: 3
      }, 16));
    }
  }),
  De = vueJ({
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
    setup(props, {
      emit: emit
    }) {
      let propsAlias = props,
        emitAlias = emit,
        a = Z(),
        uiSwitchZResult = uiSwitchZ(propsAlias, emitAlias),
        {
          forwardRef: c
        } = uiSwitchV();
      return (ctx, renderCache) => (A(), vueB(vueAn(uiSwitchN), {
        present: ctx.forceMount || vueAn(a).open.value
      }, {
        default: vueYt(() => [(A(), vueB(vueEt(vueAn(a).disableHoverableContent.value ? Q : Ee), N({
          ref: vueAn(c)
        }, vueAn(uiSwitchZResult)), {
          default: vueYt(() => [vueCt(ctx.$slots, `default`)]),
          _: 3
        }, 16))]),
        _: 3
      }, 8, [`present`]));
    }
  }),
  $ = vueJ({
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
    setup(props) {
      let propsAlias = props;
      return (ctx, renderCache) => (A(), vueB(vueAn(uiSwitch), vueTr(vueV(propsAlias)), {
        default: vueYt(() => [vueCt(ctx.$slots, `default`)]),
        _: 3
      }, 16));
    }
  }),
  Oe = vueJ({
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
      n.contentId ||= uiSwitchI(undefined, `reka-tooltip-content`);
      let {
          forwardRef: a,
          currentElement: o
        } = uiSwitchV(),
        c = vueBn(false),
        l = vueBn(false),
        u = I(() => n.disabled.value ? {} : {
          click: v,
          focus: g,
          pointermove: m,
          pointerleave: h,
          pointerdown: p,
          blur: _
        });
      vueUt(() => {
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
      return (ctx, renderCache) => (A(), vueB(vueAn(PopperContentI), {
        "as-child": ``,
        reference: ctx.reference
      }, {
        default: vueYt(() => [vueK(vueAn(uiSwitchJ), N({
          ref: vueAn(a),
          "aria-describedby": vueAn(n).open.value ? vueAn(n).contentId : undefined,
          "data-state": vueAn(n).stateAttribute.value,
          as: ctx.as,
          "as-child": eventAlias.asChild,
          "data-grace-area-trigger": ``
        }, vueNt(u.value)), {
          default: vueYt(() => [vueCt(ctx.$slots, `default`)]),
          _: 3
        }, 16, [`aria-describedby`, `data-state`, `as`, `as-child`])]),
        _: 3
      }, 8, [`reference`]));
    }
  }),
  ke = vueJ({
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
    setup(props) {
      let propsAlias = props,
        uiSwitchLtResult = uiSwitchLt(propsAlias, `class`, `inset`),
        uiSwitchBResult = uiSwitchB(uiSwitchLtResult);
      return (ctx, renderCache) => (A(), vueB(vueAn(be), N({
        "data-slot": `dropdown-menu-label`,
        "data-inset": props.inset ? `` : undefined
      }, vueAn(uiSwitchBResult), {
        class: vueAn(uiSwitchXt)(`text-muted-foreground px-1.5 py-1 text-xs font-medium data-inset:pl-7`, propsAlias.class)
      }), {
        default: vueYt(() => [vueCt(ctx.$slots, `default`)]),
        _: 3
      }, 16, [`data-inset`, `class`]));
    }
  }),
  Ae = vueJ({
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
    setup(props, {
      emit: emit
    }) {
      let uiSwitchZResult = uiSwitchZ(props, emit);
      return (ctx, renderCache) => (A(), vueB(vueAn(Te), N({
        "data-slot": `tooltip`
      }, vueAn(uiSwitchZResult)), {
        default: vueYt(t => [vueCt(ctx.$slots, `default`, vueTr(vueV(t)))]),
        _: 3
      }, 16));
    }
  }),
  je = vueJ({
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
    setup(props, {
      emit: emit
    }) {
      let propsAlias = props,
        emitAlias = emit,
        uiSwitchLtResult = uiSwitchLt(propsAlias, `class`, `hideArrow`),
        uiSwitchZResult = uiSwitchZ(uiSwitchLtResult, emitAlias);
      return (ctx, renderCache) => (A(), vueB(vueAn($), null, {
        default: vueYt(() => [vueK(vueAn(De), N({
          "data-slot": `tooltip-content`
        }, {
          ...vueAn(uiSwitchZResult),
          ...ctx.$attrs
        }, {
          class: vueAn(uiSwitchXt)(`data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-[state=delayed-open]:animate-in data-[state=delayed-open]:fade-in-0 data-[state=delayed-open]:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs has-data-[slot=kbd]:pr-1.5 **:data-[slot=kbd]:relative **:data-[slot=kbd]:isolate **:data-[slot=kbd]:z-50 **:data-[slot=kbd]:rounded-sm bg-foreground text-background z-50 w-fit max-w-xs origin-(--reka-tooltip-content-transform-origin)`, propsAlias.class)
        }), {
          default: vueYt(() => [vueCt(ctx.$slots, `default`), propsAlias.hideArrow ? vueX(``, true) : (A(), vueB(vueAn(xe), {
            key: 0,
            class: `size-2.5 rotate-45 rounded-[2px] bg-foreground fill-foreground z-50 translate-y-[calc(-50%_-_2px)]`
          }))]),
          _: 3
        }, 16, [`class`])]),
        _: 3
      }));
    }
  }),
  Me = vueJ({
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
    setup(props) {
      let propsAlias = props;
      return (ctx, renderCache) => (A(), vueB(vueAn(Ce), vueTr(vueV(propsAlias)), {
        default: vueYt(() => [vueCt(ctx.$slots, `default`)]),
        _: 3
      }, 16));
    }
  }),
  Ne = vueJ({
    __name: `TooltipTrigger`,
    props: {
      reference: {},
      asChild: {
        type: Boolean
      },
      as: {}
    },
    setup(props) {
      let propsAlias = props;
      return (ctx, renderCache) => (A(), vueB(vueAn(Oe), N({
        "data-slot": `tooltip-trigger`
      }, propsAlias), {
        default: vueYt(() => [vueCt(ctx.$slots, `default`)]),
        _: 3
      }, 16));
    }
  });
export { ke as a, pe as c, Ae as i, Me as n, ye as o, je as r, _e as s, Ne as t };