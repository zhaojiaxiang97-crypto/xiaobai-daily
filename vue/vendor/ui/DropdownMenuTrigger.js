import { B as e, D as t, E as n, I as r, L as i, N as a, O as o, P as s, Q as c, S as l, V as u, W as d, _ as f, at as p, b as m, j as h, k as g, lt as _, st as v, v as y, vt as b, w as ee, x, xt as te, y as S, yt as C, z as w } from "./Switch.js";
import { An as T, Ct as E, Dn as D, V as O, Wt as k, Yt as A, b as j, bn as M, et as N, fn as ne, gt as P, j as F, k as I, mt as re, nt as L, rt as R, tr as z, ut as B, v as V } from "../chunks/vue-i18n.runtime.js";
import { E as H, T as U } from "../i18n/en-US-player.js";
import { a as ie, i as W, n as ae, o as oe, t as G } from "./PopperContent.js";
import { r as K, t as q } from "./Collection.js";
import { t as se } from "./RovingFocusGroup.js";
var ce = [`INPUT`, `TEXTAREA`];
function J(event, t, n, r = {}) {
  if (!t || r.enableIgnoredElement && ce.includes(t.nodeName)) return null;
  let {
      arrowKeyOptions: i = `both`,
      attributeName: a = `[data-reka-collection-item]`,
      itemsArray: el = [],
      loop: items = true,
      dir: c = `ltr`,
      preventScroll: l = true,
      focus: u = false
    } = r,
    [d, f, p, m, h, g] = [event.key === `ArrowRight`, event.key === `ArrowLeft`, event.key === `ArrowUp`, event.key === `ArrowDown`, event.key === `Home`, event.key === `End`],
    _ = p || m,
    v = d || f;
  if (!h && !g && (!_ && !v || i === `vertical` && v || i === `horizontal` && _)) return null;
  let y = n ? Array.from(n.querySelectorAll(a)) : el;
  if (!y.length) return null;
  l && event.preventDefault();
  let b = null;
  return v || _ ? b = Y(y, t, {
    goForward: _ ? m : c === `ltr` ? d : f,
    loop: items
  }) : h ? b = y.at(0) || null : g && (b = y.at(-1) || null), u && b?.focus(), b;
}
function Y(e, t, n, r = e.includes(t) ? e.length : e.length + 1) {
  if (--r === 0) return null;
  let i = e.indexOf(t),
    resolvedValue;
  if (resolvedValue = i === -1 ? n.goForward ? 0 : e.length - 1 : n.goForward ? i + 1 : i - 1, !n.loop && (resolvedValue < 0 || resolvedValue >= e.length)) return null;
  let o = e[(resolvedValue + e.length) % e.length];
  return o ? o.hasAttribute(`disabled`) && o.getAttribute(`disabled`) !== `false` ? Y(e, o, n, r) : o : null;
}
var X = F({
  __name: `MenuAnchor`,
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
  setup(e) {
    let t = e;
    return (e, n) => (P(), j(T(W), z(O(t)), {
      default: A(() => [E(e.$slots, `default`)]),
      _: 3
    }, 16));
  }
});
function le() {
  let e = M(false);
  return B(() => {
    c(`keydown`, () => {
      e.value = true;
    }, {
      capture: true,
      passive: true
    }), c([`pointerdown`, `pointermove`], () => {
      e.value = false;
    }, {
      capture: true,
      passive: true
    });
  }), e;
}
var ue = v(le),
  [Z, de] = C([`MenuRoot`, `MenuSub`], `MenuContext`),
  [Q, fe] = C(`MenuRoot`),
  pe = F({
    __name: `MenuRoot`,
    props: {
      open: {
        type: Boolean,
        required: false,
        default: false
      },
      dir: {
        type: String,
        required: false
      },
      modal: {
        type: Boolean,
        required: false,
        default: true
      }
    },
    emits: [`update:open`],
    setup(e, {
      emit: t
    }) {
      let n = e,
        r = t,
        {
          modal: i,
          dir: a
        } = D(n),
        o = K(a),
        s = p(n, `open`, r),
        c = M(),
        l = ue();
      return de({
        open: s,
        onOpenChange: e => {
          s.value = e;
        },
        content: c,
        onContentChange: e => {
          c.value = e;
        }
      }), fe({
        onClose: () => {
          s.value = false;
        },
        isUsingKeyboardRef: l,
        dir: o,
        modal: i
      }), (e, t) => (P(), j(T(ie), null, {
        default: A(() => [E(e.$slots, `default`)]),
        _: 3
      }));
    }
  }),
  [me, he] = C(`MenuContent`),
  ge = F({
    __name: `MenuContentImpl`,
    props: N({
      loop: {
        type: Boolean,
        required: false
      },
      disableOutsidePointerEvents: {
        type: Boolean,
        required: false
      },
      disableOutsideScroll: {
        type: Boolean,
        required: false
      },
      trapFocus: {
        type: Boolean,
        required: false
      },
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
      asChild: {
        type: Boolean,
        required: false
      },
      as: {
        type: null,
        required: false
      }
    }, {
      ...G
    }),
    emits: [`escapeKeyDown`, `pointerDownOutside`, `focusOutside`, `interactOutside`, `entryFocus`, `openAutoFocus`, `closeAutoFocus`, `dismiss`],
    setup(e, {
      emit: r
    }) {
      let i = e,
        a = r,
        c = Z(),
        f = Q(),
        {
          trapFocus: p,
          disableOutsidePointerEvents: h,
          loop: _
        } = D(i);
      oe(), d(h.value);
      let v = M(``),
        x = M(0),
        te = M(0),
        S = M(null),
        C = M(`right`),
        w = M(0),
        O = M(null),
        N = M(),
        {
          forwardRef: ne,
          currentElement: F
        } = u(),
        {
          handleTypeaheadSearch: L
        } = s(),
        R = M();
      function z(e) {
        let t = J(e, R.value || b(), F.value, {
          loop: _.value,
          arrowKeyOptions: `vertical`,
          dir: f?.dir.value,
          focus: false,
          attributeName: `[data-reka-collection-item]:not([data-disabled])`
        });
        t && (R.value = t, t.scrollIntoView({
          block: `nearest`
        }));
      }
      function B() {
        R.value && R.value.click();
      }
      let V = M(),
        H = M();
      k(R, e => {
        if (H.value && (e === undefined || e !== H.value.trigger.value)) {
          if (e === undefined) return;
          H.value.onOpenChange(false), H.value = undefined;
        }
      }), k(F, e => {
        c.onContentChange(e);
      }), re(() => {
        window.clearTimeout(x.value);
      });
      function U(e) {
        return C.value === S.value?.side && t(e, S.value?.area);
      }
      async function ie(e) {
        a(`openAutoFocus`, e), !e.defaultPrevented && (e.preventDefault(), F.value?.focus({
          preventScroll: true
        }));
      }
      function W(e) {
        if (e.defaultPrevented) return;
        let target = e.target,
          n = target.closest(`[data-reka-menu-content]`) === e.currentTarget,
          includes = [`input`, `textarea`].includes(target.tagName.toLowerCase()),
          i = e.ctrlKey || e.altKey || e.metaKey,
          a = e.key.length === 1,
          o = J(e, b(), F.value, {
            loop: _.value,
            arrowKeyOptions: `vertical`,
            dir: f?.dir.value,
            focus: true,
            attributeName: `[data-reka-collection-item]:not([data-disabled])`
          });
        if (o) return o?.focus();
        if (e.code === `Space`) return;
        let s = N.value?.getItems() ?? [];
        if (n && (e.key === `Tab` && f.modal.value && e.preventDefault(), !i && a && !includes && L(e.key, s)), e.target !== F.value || !y.includes(e.key)) return;
        e.preventDefault();
        let c = [...s.map(item => item.ref)];
        m.includes(e.key) && c.reverse(), l(c);
      }
      function G(e) {
        e?.currentTarget?.contains?.(e.target) || (window.clearTimeout(x.value), v.value = ``);
      }
      function K(e) {
        if (!n(e)) return;
        let target = e.target,
          r = w.value !== e.clientX;
        if (e?.currentTarget?.contains(target) && r) {
          let t = e.clientX > w.value ? `right` : `left`;
          C.value = t, w.value = e.clientX;
        }
      }
      function q(e) {
        n(e) && V.value && V.value.focus();
      }
      return he({
        onItemEnter: e => !!U(e),
        onItemLeave: e => U(e) ? true : ([`INPUT`, `TEXTAREA`].includes(b()?.tagName || ``) || F.value?.focus(), O.value = null, false),
        onTriggerLeave: e => !!U(e),
        searchRef: v,
        highlightedElement: R,
        onKeydownNavigation: z,
        onKeydownEnter: B,
        filterElement: V,
        onFilterElementChange: e => {
          V.value = e;
        },
        activeSubmenuContext: H,
        pointerGraceTimerRef: te,
        onPointerGraceIntentChange: e => {
          S.value = e;
        }
      }), (e, t) => (P(), j(T(o), {
        "as-child": ``,
        trapped: T(p),
        onMountAutoFocus: ie,
        onUnmountAutoFocus: t[7] ||= e => a(`closeAutoFocus`, e)
      }, {
        default: A(() => [I(T(g), {
          "as-child": ``,
          "disable-outside-pointer-events": T(h),
          onEscapeKeyDown: t[2] ||= e => a(`escapeKeyDown`, e),
          onPointerDownOutside: t[3] ||= e => a(`pointerDownOutside`, e),
          onFocusOutside: t[4] ||= e => a(`focusOutside`, e),
          onInteractOutside: t[5] ||= e => a(`interactOutside`, e),
          onDismiss: t[6] ||= e => a(`dismiss`)
        }, {
          default: A(() => [I(T(se), {
            ref_key: `rovingFocusGroupRef`,
            ref: N,
            "current-tab-stop-id": O.value,
            "onUpdate:currentTabStopId": t[0] ||= e => O.value = e,
            "as-child": ``,
            orientation: `vertical`,
            dir: T(f).dir.value,
            loop: T(_),
            onEntryFocus: t[1] ||= e => {
              a(`entryFocus`, e), T(f).isUsingKeyboardRef.value || e.preventDefault();
            }
          }, {
            default: A(() => [I(T(ae), {
              ref: T(ne),
              role: `menu`,
              as: e.as,
              "as-child": e.asChild,
              "aria-orientation": `vertical`,
              "data-reka-menu-content": ``,
              "data-state": T(ee)(T(c).open.value),
              dir: T(f).dir.value,
              side: e.side,
              "side-offset": e.sideOffset,
              align: e.align,
              "align-offset": e.alignOffset,
              "avoid-collisions": e.avoidCollisions,
              "collision-boundary": e.collisionBoundary,
              "collision-padding": e.collisionPadding,
              "arrow-padding": e.arrowPadding,
              "prioritize-position": e.prioritizePosition,
              "position-strategy": e.positionStrategy,
              "update-position-strategy": e.updatePositionStrategy,
              sticky: e.sticky,
              "hide-when-detached": e.hideWhenDetached,
              reference: e.reference,
              onKeydown: W,
              onBlur: G,
              onPointermove: K,
              onPointerenter: q
            }, {
              default: A(() => [E(e.$slots, `default`)]),
              _: 3
            }, 8, [`as`, `as-child`, `data-state`, `dir`, `side`, `side-offset`, `align`, `align-offset`, `avoid-collisions`, `collision-boundary`, `collision-padding`, `arrow-padding`, `prioritize-position`, `position-strategy`, `update-position-strategy`, `sticky`, `hide-when-detached`, `reference`])]),
            _: 3
          }, 8, [`current-tab-stop-id`, `dir`, `loop`])]),
          _: 3
        }, 8, [`disable-outside-pointer-events`])]),
        _: 3
      }, 8, [`trapped`]));
    }
  }),
  _e = F({
    inheritAttrs: false,
    __name: `MenuItemImpl`,
    props: {
      disabled: {
        type: Boolean,
        required: false
      },
      textValue: {
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
    },
    setup(e) {
      let t = e,
        r = me(),
        {
          forwardRef: i,
          currentElement: a
        } = u(),
        {
          CollectionItem: o
        } = q(),
        s = M(false),
        c = V(() => s.value || a.value != null && r.highlightedElement.value === a.value);
      async function l(e) {
        if (!e.defaultPrevented && n(e)) {
          if (t.disabled) r.onItemLeave(e);else if (!r.onItemEnter(e)) {
            let currentTarget = e.currentTarget;
            r.highlightedElement.value = currentTarget, [`INPUT`, `TEXTAREA`].includes(b()?.tagName || ``) || currentTarget.focus({
              preventScroll: true
            });
          }
        }
      }
      async function d(e) {
        await R(), !e.defaultPrevented && n(e) && r.highlightedElement.value === a.value && !r.onItemLeave(e) && r.highlightedElement.value === a.value && (r.highlightedElement.value = undefined);
      }
      return (e, t) => (P(), j(T(o), {
        value: {
          textValue: e.textValue
        }
      }, {
        default: A(() => [I(T(h), L({
          ref: T(i),
          role: `menuitem`,
          tabindex: `-1`
        }, e.$attrs, {
          as: e.as,
          "as-child": e.asChild,
          "aria-disabled": e.disabled || undefined,
          "data-disabled": e.disabled ? `` : undefined,
          "data-highlighted": c.value ? `` : undefined,
          onPointermove: l,
          onPointerleave: d,
          onFocus: t[0] ||= async t => {
            await R(), !(t.defaultPrevented || e.disabled) && (s.value = true, T(r).highlightedElement.value = t.currentTarget);
          },
          onBlur: t[1] ||= async e => {
            await R(), !e.defaultPrevented && (s.value = false);
          }
        }), {
          default: A(() => [E(e.$slots, `default`)]),
          _: 3
        }, 16, [`as`, `as-child`, `aria-disabled`, `data-disabled`, `data-highlighted`])]),
        _: 3
      }, 8, [`value`]));
    }
  }),
  ve = F({
    __name: `MenuItem`,
    props: {
      disabled: {
        type: Boolean,
        required: false
      },
      textValue: {
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
    },
    emits: [`select`],
    setup(e, {
      emit: t
    }) {
      let n = e,
        r = t,
        {
          forwardRef: i,
          currentElement: a
        } = u(),
        o = Q(),
        s = me(),
        c = M(false);
      async function l() {
        let value = a.value;
        if (!n.disabled && value) {
          let e = new CustomEvent(S, {
            bubbles: true,
            cancelable: true
          });
          r(`select`, e), await R(), e.defaultPrevented ? c.value = false : o.onClose();
        }
      }
      return (e, t) => (P(), j(_e, L(n, {
        ref: T(i),
        onClick: l,
        onPointerdown: t[0] ||= () => {
          c.value = true;
        },
        onPointerup: t[1] ||= async e => {
          await R(), !e.defaultPrevented && (c.value || e.currentTarget?.click());
        },
        onKeydown: t[2] ||= async t => {
          let n = T(s).searchRef.value !== ``;
          e.disabled || n && t.key === ` ` || T(x).includes(t.key) && (t.currentTarget?.click(), t.preventDefault());
        }
      }), {
        default: A(() => [E(e.$slots, `default`)]),
        _: 3
      }, 16));
    }
  }),
  ye = F({
    __name: `MenuRootContentModal`,
    props: {
      loop: {
        type: Boolean,
        required: false
      },
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
      asChild: {
        type: Boolean,
        required: false
      },
      as: {
        type: null,
        required: false
      }
    },
    emits: [`escapeKeyDown`, `pointerDownOutside`, `focusOutside`, `interactOutside`, `entryFocus`, `openAutoFocus`, `closeAutoFocus`],
    setup(e, {
      emit: t
    }) {
      let n = e,
        r = t,
        a = w(n, r),
        o = Z(),
        {
          forwardRef: s,
          currentElement: c
        } = u();
      return i(c), (e, t) => (P(), j(ge, L(T(a), {
        ref: T(s),
        "trap-focus": T(o).open.value,
        "disable-outside-pointer-events": T(o).open.value,
        "disable-outside-scroll": true,
        onDismiss: t[0] ||= e => T(o).onOpenChange(false),
        onFocusOutside: t[1] ||= H(e => r(`focusOutside`, e), [`prevent`])
      }), {
        default: A(() => [E(e.$slots, `default`)]),
        _: 3
      }, 16, [`trap-focus`, `disable-outside-pointer-events`]));
    }
  }),
  be = F({
    __name: `MenuRootContentNonModal`,
    props: {
      loop: {
        type: Boolean,
        required: false
      },
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
      asChild: {
        type: Boolean,
        required: false
      },
      as: {
        type: null,
        required: false
      }
    },
    emits: [`escapeKeyDown`, `pointerDownOutside`, `focusOutside`, `interactOutside`, `entryFocus`, `openAutoFocus`, `closeAutoFocus`],
    setup(e, {
      emit: t
    }) {
      let n = w(e, t),
        r = Z();
      return (e, t) => (P(), j(ge, L(T(n), {
        "trap-focus": false,
        "disable-outside-pointer-events": false,
        "disable-outside-scroll": false,
        onDismiss: t[0] ||= e => T(r).onOpenChange(false)
      }), {
        default: A(() => [E(e.$slots, `default`)]),
        _: 3
      }, 16));
    }
  }),
  $ = F({
    __name: `MenuContent`,
    props: {
      forceMount: {
        type: Boolean,
        required: false
      },
      loop: {
        type: Boolean,
        required: false
      },
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
      asChild: {
        type: Boolean,
        required: false
      },
      as: {
        type: null,
        required: false
      }
    },
    emits: [`escapeKeyDown`, `pointerDownOutside`, `focusOutside`, `interactOutside`, `entryFocus`, `openAutoFocus`, `closeAutoFocus`],
    setup(e, {
      emit: t
    }) {
      let n = w(e, t),
        r = Z(),
        i = Q();
      return (e, t) => (P(), j(T(a), {
        present: e.forceMount || T(r).open.value
      }, {
        default: A(() => [T(i).modal.value ? (P(), j(ye, z(L({
          key: 0
        }, {
          ...e.$attrs,
          ...T(n)
        })), {
          default: A(() => [E(e.$slots, `default`)]),
          _: 3
        }, 16)) : (P(), j(be, z(L({
          key: 1
        }, {
          ...e.$attrs,
          ...T(n)
        })), {
          default: A(() => [E(e.$slots, `default`)]),
          _: 3
        }, 16))]),
        _: 3
      }, 8, [`present`]));
    }
  }),
  xe = F({
    __name: `MenuPortal`,
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
      return (e, n) => (P(), j(T(f), z(O(t)), {
        default: A(() => [E(e.$slots, `default`)]),
        _: 3
      }, 16));
    }
  }),
  [Se, Ce] = C(`DropdownMenuRoot`),
  we = F({
    __name: `DropdownMenuRoot`,
    props: {
      defaultOpen: {
        type: Boolean,
        required: false
      },
      open: {
        type: Boolean,
        required: false,
        default: undefined
      },
      dir: {
        type: String,
        required: false
      },
      modal: {
        type: Boolean,
        required: false,
        default: true
      }
    },
    emits: [`update:open`],
    setup(e, {
      emit: t
    }) {
      let n = e,
        r = t;
      u();
      let i = p(n, `open`, r, {
          defaultValue: n.defaultOpen,
          passive: n.open === undefined
        }),
        a = M(),
        {
          modal: o,
          dir: s
        } = D(n),
        c = K(s);
      return Ce({
        open: i,
        onOpenChange: e => {
          i.value = e;
        },
        onOpenToggle: () => {
          i.value = !i.value;
        },
        triggerId: ``,
        triggerElement: a,
        contentId: ``,
        modal: o,
        dir: c
      }), (e, t) => (P(), j(T(pe), {
        open: T(i),
        "onUpdate:open": t[0] ||= e => ne(i) ? i.value = e : null,
        dir: T(c),
        modal: T(o)
      }, {
        default: A(() => [E(e.$slots, `default`, {
          open: T(i)
        })]),
        _: 3
      }, 8, [`open`, `dir`, `modal`]));
    }
  }),
  Te = F({
    __name: `DropdownMenuContent`,
    props: {
      forceMount: {
        type: Boolean,
        required: false
      },
      loop: {
        type: Boolean,
        required: false
      },
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
      asChild: {
        type: Boolean,
        required: false
      },
      as: {
        type: null,
        required: false
      }
    },
    emits: [`escapeKeyDown`, `pointerDownOutside`, `focusOutside`, `interactOutside`, `closeAutoFocus`],
    setup(e, {
      emit: t
    }) {
      let n = w(e, t);
      u();
      let i = Se(),
        a = M(false);
      function o(e) {
        e.defaultPrevented || (a.value || setTimeout(() => {
          i.triggerElement.value?.focus();
        }, 0), a.value = false, e.preventDefault());
      }
      return i.contentId ||= r(undefined, `reka-dropdown-menu-content`), (e, t) => (P(), j(T($), L(T(n), {
        id: T(i).contentId,
        "aria-labelledby": T(i)?.triggerId,
        style: {
          "--reka-dropdown-menu-content-transform-origin": `var(--reka-popper-transform-origin)`,
          "--reka-dropdown-menu-content-available-width": `var(--reka-popper-available-width)`,
          "--reka-dropdown-menu-content-available-height": `var(--reka-popper-available-height)`,
          "--reka-dropdown-menu-trigger-width": `var(--reka-popper-anchor-width)`,
          "--reka-dropdown-menu-trigger-height": `var(--reka-popper-anchor-height)`
        },
        onCloseAutoFocus: o,
        onInteractOutside: t[0] ||= e => {
          if (e.defaultPrevented) return;
          let originalEvent = e.detail.originalEvent,
            n = originalEvent.button === 0 && originalEvent.ctrlKey === true,
            r = originalEvent.button === 2 || n;
          (!T(i).modal.value || r) && (a.value = true), T(i).triggerElement.value?.contains(e.target) && e.preventDefault();
        }
      }), {
        default: A(() => [E(e.$slots, `default`)]),
        _: 3
      }, 16, [`id`, `aria-labelledby`]));
    }
  }),
  Ee = F({
    __name: `DropdownMenuPortal`,
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
      return (e, n) => (P(), j(T(xe), z(O(t)), {
        default: A(() => [E(e.$slots, `default`)]),
        _: 3
      }, 16));
    }
  }),
  De = F({
    __name: `DropdownMenuTrigger`,
    props: {
      disabled: {
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
        default: `button`
      }
    },
    setup(e) {
      let t = e,
        n = Se(),
        {
          forwardRef: i,
          currentElement: a
        } = u();
      return B(() => {
        n.triggerElement = a;
      }), n.triggerId ||= r(undefined, `reka-dropdown-menu-trigger`), (e, r) => (P(), j(T(X), {
        "as-child": ``
      }, {
        default: A(() => [I(T(h), {
          id: T(n).triggerId,
          ref: T(i),
          type: e.as === `button` ? `button` : undefined,
          "as-child": t.asChild,
          as: e.as,
          "aria-haspopup": `menu`,
          "aria-expanded": T(n).open.value,
          "aria-controls": T(n).open.value ? T(n).contentId : undefined,
          "data-disabled": e.disabled ? `` : undefined,
          disabled: e.disabled,
          "data-state": T(n).open.value ? `open` : `closed`,
          onClick: r[0] ||= async t => {
            !e.disabled && t.button === 0 && t.ctrlKey === false && (T(n)?.onOpenToggle(), await R(), T(n).open.value && t.preventDefault());
          },
          onKeydown: r[1] ||= U(t => {
            e.disabled || ([`Enter`, ` `].includes(t.key) && T(n).onOpenToggle(), t.key === `ArrowDown` && T(n).onOpenChange(true), [`Enter`, ` `, `ArrowDown`].includes(t.key) && t.preventDefault());
          }, [`enter`, `space`, `arrow-down`])
        }, {
          default: A(() => [E(e.$slots, `default`)]),
          _: 3
        }, 8, [`id`, `type`, `as-child`, `as`, `aria-expanded`, `aria-controls`, `data-disabled`, `disabled`, `data-state`])]),
        _: 3
      }));
    }
  }),
  Oe = F({
    __name: `DropdownMenu`,
    props: {
      defaultOpen: {
        type: Boolean
      },
      open: {
        type: Boolean
      },
      dir: {},
      modal: {
        type: Boolean
      }
    },
    emits: [`update:open`],
    setup(e, {
      emit: t
    }) {
      let n = w(e, t);
      return (e, t) => (P(), j(T(we), L({
        "data-slot": `dropdown-menu`
      }, T(n)), {
        default: A(t => [E(e.$slots, `default`, z(O(t)))]),
        _: 3
      }, 16));
    }
  }),
  ke = F({
    inheritAttrs: false,
    __name: `DropdownMenuContent`,
    props: {
      forceMount: {
        type: Boolean
      },
      loop: {
        type: Boolean
      },
      memoDependencies: {},
      side: {},
      sideOffset: {
        default: 4
      },
      sideFlip: {
        type: Boolean
      },
      align: {
        default: `start`
      },
      alignOffset: {},
      alignFlip: {
        type: Boolean
      },
      avoidCollisions: {
        type: Boolean
      },
      collisionBoundary: {},
      collisionPadding: {},
      arrowPadding: {},
      hideShiftedArrow: {
        type: Boolean
      },
      sticky: {},
      hideWhenDetached: {
        type: Boolean
      },
      positionStrategy: {},
      updatePositionStrategy: {},
      disableUpdateOnLayoutShift: {
        type: Boolean
      },
      prioritizePosition: {
        type: Boolean
      },
      reference: {},
      asChild: {
        type: Boolean
      },
      as: {},
      class: {
        type: [Boolean, null, String, Object, Array]
      }
    },
    emits: [`escapeKeyDown`, `pointerDownOutside`, `focusOutside`, `interactOutside`, `closeAutoFocus`],
    setup(e, {
      emit: t
    }) {
      let n = e,
        r = t,
        i = _(n, `class`),
        a = w(i, r);
      return (e, t) => (P(), j(T(Ee), null, {
        default: A(() => [I(T(Te), L({
          "data-slot": `dropdown-menu-content`
        }, {
          ...e.$attrs,
          ...T(a)
        }, {
          class: T(te)(`data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 ring-foreground/10 bg-popover text-popover-foreground min-w-32 rounded-lg p-1 shadow-md ring-1 duration-100 cn-menu-translucent z-50 max-h-(--reka-dropdown-menu-content-available-height) w-(--reka-dropdown-menu-trigger-width) origin-(--reka-dropdown-menu-content-transform-origin) overflow-x-hidden overflow-y-auto data-[state=closed]:overflow-hidden`, n.class),
          style: {
            "-webkit-app-region": `no-drag`,
            "pointer-events": `auto`
          }
        }), {
          default: A(() => [E(e.$slots, `default`)]),
          _: 3
        }, 16, [`class`])]),
        _: 3
      }));
    }
  }),
  Ae = F({
    __name: `DropdownMenuTrigger`,
    props: {
      disabled: {
        type: Boolean
      },
      asChild: {
        type: Boolean
      },
      as: {}
    },
    setup(t) {
      let n = e(t);
      return (e, t) => (P(), j(T(De), L({
        "data-slot": `dropdown-menu-trigger`
      }, T(n)), {
        default: A(() => [E(e.$slots, `default`)]),
        _: 3
      }, 16));
    }
  });
export { $ as a, X as c, xe as i, J as l, ke as n, ve as o, Oe as r, pe as s, Ae as t };