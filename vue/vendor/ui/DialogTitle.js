import { I as e, L as t, N as n, O as r, U as i, V as a, W as o, at as s, j as c, k as l, vt as u, w as d, yt as f } from "./Switch.js";
import { An as p, Ct as m, Dn as h, Wt as g, Yt as _, Zt as v, b as y, bn as b, gt as x, j as S, k as C, nt as w, ut as T, v as E, x as D } from "../chunks/vue-i18n.runtime.js";
import { E as O, w as k } from "../i18n/en-US-player.js";
var [A, j] = f(`DialogRoot`),
  M = S({
    inheritAttrs: false,
    __name: `DialogRoot`,
    props: {
      open: {
        type: Boolean,
        required: false,
        default: undefined
      },
      defaultOpen: {
        type: Boolean,
        required: false,
        default: false
      },
      modal: {
        type: Boolean,
        required: false,
        default: true
      },
      unmountOnHide: {
        type: Boolean,
        required: false,
        default: true
      }
    },
    emits: [`update:open`],
    setup(event, {
      emit: t
    }) {
      let n = event,
        r = s(n, `open`, t, {
          defaultValue: n.defaultOpen,
          passive: n.open === undefined
        }),
        i = b(),
        a = b(),
        {
          modal: o,
          unmountOnHide: c
        } = h(n);
      return j({
        open: r,
        modal: o,
        unmountOnHide: c,
        openModal: () => {
          r.value = true;
        },
        onOpenChange: e => {
          r.value = e;
        },
        onOpenToggle: () => {
          r.value = !r.value;
        },
        contentId: ``,
        titleId: ``,
        descriptionId: ``,
        triggerElement: i,
        contentElement: a
      }), (e, t) => m(e.$slots, `default`, {
        open: p(r),
        close: () => r.value = false
      });
    }
  }),
  N = S({
    __name: `DialogClose`,
    props: {
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
      let t = e;
      a();
      let n = A();
      return (e, r) => (x(), y(p(c), w(t, {
        type: e.as === `button` ? `button` : undefined,
        onClick: r[0] ||= e => p(n).onOpenChange(false)
      }), {
        default: _(() => [m(e.$slots, `default`)]),
        _: 3
      }, 16, [`type`]));
    }
  }),
  P = S({
    __name: `DialogContentImpl`,
    props: {
      forceMount: {
        type: Boolean,
        required: false
      },
      trapFocus: {
        type: Boolean,
        required: false
      },
      disableOutsidePointerEvents: {
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
      },
      present: {
        type: Boolean,
        required: false
      }
    },
    emits: [`escapeKeyDown`, `pointerDownOutside`, `focusOutside`, `interactOutside`, `openAutoFocus`, `closeAutoFocus`],
    setup(t, {
      emit: n
    }) {
      let i = t,
        o = n,
        s = A(),
        {
          forwardRef: c,
          currentElement: f
        } = a();
      return s.titleId ||= e(undefined, `reka-dialog-title`), s.descriptionId ||= e(undefined, `reka-dialog-description`), T(() => {
        s.contentElement = f, u() !== document.body && (s.triggerElement.value = u());
      }), (e, t) => (x(), y(p(r), {
        "as-child": ``,
        loop: ``,
        trapped: i.trapFocus,
        present: i.present,
        onMountAutoFocus: t[5] ||= e => o(`openAutoFocus`, e),
        onUnmountAutoFocus: t[6] ||= e => o(`closeAutoFocus`, e)
      }, {
        default: _(() => [C(p(l), w({
          id: p(s).contentId,
          ref: p(c),
          as: e.as,
          "as-child": e.asChild,
          present: i.present,
          "disable-outside-pointer-events": e.disableOutsidePointerEvents,
          role: `dialog`,
          "aria-describedby": p(s).descriptionId,
          "aria-labelledby": p(s).titleId,
          "data-state": p(d)(p(s).open.value)
        }, e.$attrs, {
          onDismiss: t[0] ||= e => p(s).onOpenChange(false),
          onEscapeKeyDown: t[1] ||= e => o(`escapeKeyDown`, e),
          onFocusOutside: t[2] ||= e => o(`focusOutside`, e),
          onInteractOutside: t[3] ||= e => o(`interactOutside`, e),
          onPointerDownOutside: t[4] ||= e => o(`pointerDownOutside`, e)
        }), {
          default: _(() => [m(e.$slots, `default`)]),
          _: 3
        }, 16, [`id`, `as`, `as-child`, `present`, `disable-outside-pointer-events`, `aria-describedby`, `aria-labelledby`, `data-state`])]),
        _: 3
      }, 8, [`trapped`, `present`]));
    }
  }),
  F = S({
    __name: `DialogContentModal`,
    props: {
      forceMount: {
        type: Boolean,
        required: false
      },
      trapFocus: {
        type: Boolean,
        required: false
      },
      disableOutsidePointerEvents: {
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
      },
      present: {
        type: Boolean,
        required: true
      }
    },
    emits: [`escapeKeyDown`, `pointerDownOutside`, `focusOutside`, `interactOutside`, `openAutoFocus`, `closeAutoFocus`],
    setup(e, {
      emit: n
    }) {
      let r = e,
        o = n,
        s = A(),
        c = i(o),
        {
          forwardRef: l,
          currentElement: u
        } = a(),
        d = E(() => r.present ? u.value : undefined);
      t(d);
      let f = E(() => {
        let {
          present: e,
          ...t
        } = r;
        return t;
      });
      return g(() => r.present, (e, t) => {
        !e && t && s.triggerElement.value?.focus();
      }), (e, t) => (x(), y(P, w({
        ...f.value,
        ...p(c)
      }, {
        ref: p(l),
        present: e.present,
        "trap-focus": p(s).open.value,
        "disable-outside-pointer-events": r.disableOutsidePointerEvents,
        onCloseAutoFocus: t[0] ||= e => {
          e.defaultPrevented || (e.preventDefault(), p(s).triggerElement.value?.focus());
        },
        onPointerDownOutside: t[1] ||= e => {
          let originalEvent = e.detail.originalEvent,
            n = originalEvent.button === 0 && originalEvent.ctrlKey === true;
          (originalEvent.button === 2 || n) && e.preventDefault();
        },
        onFocusOutside: t[2] ||= e => {
          e.preventDefault();
        }
      }), {
        default: _(() => [m(e.$slots, `default`)]),
        _: 3
      }, 16, [`present`, `trap-focus`, `disable-outside-pointer-events`]));
    }
  }),
  I = S({
    __name: `DialogContentNonModal`,
    props: {
      forceMount: {
        type: Boolean,
        required: false
      },
      trapFocus: {
        type: Boolean,
        required: false
      },
      disableOutsidePointerEvents: {
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
      },
      present: {
        type: Boolean,
        required: true
      }
    },
    emits: [`escapeKeyDown`, `pointerDownOutside`, `focusOutside`, `interactOutside`, `openAutoFocus`, `closeAutoFocus`],
    setup(e, {
      emit: t
    }) {
      let n = e,
        r = i(t);
      a();
      let o = A(),
        s = b(false),
        c = b(false),
        l = E(() => {
          let {
            present: e,
            ...t
          } = n;
          return t;
        });
      return g(() => n.present, (e, t) => {
        !e && t && (s.value || o.triggerElement.value?.focus(), s.value = false, c.value = false);
      }), (e, t) => (x(), y(P, w({
        ...l.value,
        ...p(r)
      }, {
        present: e.present,
        "trap-focus": false,
        "disable-outside-pointer-events": false,
        onCloseAutoFocus: t[0] ||= e => {
          e.defaultPrevented || (s.value || p(o).triggerElement.value?.focus(), e.preventDefault()), s.value = false, c.value = false;
        },
        onInteractOutside: t[1] ||= e => {
          e.defaultPrevented || (s.value = true, e.detail.originalEvent.type === `pointerdown` && (c.value = true));
          let target = e.target;
          p(o).triggerElement.value?.contains(target) && e.preventDefault(), e.detail.originalEvent.type === `focusin` && c.value && e.preventDefault();
        }
      }), {
        default: _(() => [m(e.$slots, `default`)]),
        _: 3
      }, 16, [`present`]));
    }
  }),
  L = S({
    __name: `DialogContent`,
    props: {
      forceMount: {
        type: Boolean,
        required: false
      },
      disableOutsidePointerEvents: {
        type: Boolean,
        required: false,
        default: undefined
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
    emits: [`escapeKeyDown`, `pointerDownOutside`, `focusOutside`, `interactOutside`, `openAutoFocus`, `closeAutoFocus`],
    setup(e, {
      emit: t
    }) {
      let r = e,
        o = t,
        s = A(),
        c = i(o),
        {
          forwardRef: l
        } = a();
      return (e, t) => (x(), y(p(n), {
        present: e.forceMount || p(s).open.value,
        "force-mount": e.forceMount || !p(s).unmountOnHide.value
      }, {
        default: _(({
          present: t
        }) => [p(s).modal.value ? v((x(), y(F, w({
          key: 0,
          ref: p(l),
          present: p(s).unmountOnHide.value || t
        }, {
          ...r,
          ...p(c),
          ...e.$attrs
        }), {
          default: _(() => [m(e.$slots, `default`)]),
          _: 2
        }, 1040, [`present`])), [[k, p(s).unmountOnHide.value || t]]) : v((x(), y(I, w({
          key: 1,
          ref: p(l),
          present: p(s).unmountOnHide.value || t
        }, {
          ...r,
          ...p(c),
          ...e.$attrs
        }), {
          default: _(() => [m(e.$slots, `default`)]),
          _: 2
        }, 1040, [`present`])), [[k, p(s).unmountOnHide.value || t]])]),
        _: 3
      }, 8, [`present`, `force-mount`]));
    }
  }),
  R = S({
    __name: `DialogDescription`,
    props: {
      asChild: {
        type: Boolean,
        required: false
      },
      as: {
        type: null,
        required: false,
        default: `p`
      }
    },
    setup(e) {
      let t = e;
      a();
      let n = A();
      return (e, r) => (x(), y(p(c), w(t, {
        id: p(n).descriptionId
      }), {
        default: _(() => [m(e.$slots, `default`)]),
        _: 3
      }, 16, [`id`]));
    }
  }),
  z = S({
    __name: `DialogOverlayImpl`,
    props: {
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
    setup(e) {
      let t = e,
        n = A(),
        r = o(t.present);
      return g(() => t.present, e => r.value = e), a(), (e, t) => (x(), y(p(c), {
        as: e.as,
        "as-child": e.asChild,
        "data-state": p(n).open.value ? `open` : `closed`,
        style: {
          "pointer-events": `auto`
        },
        onPointerdown: t[0] ||= O(() => {}, [`left`, `self`, `prevent`])
      }, {
        default: _(() => [m(e.$slots, `default`)]),
        _: 3
      }, 8, [`as`, `as-child`, `data-state`]));
    }
  }),
  B = S({
    __name: `DialogOverlay`,
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
      let t = A(),
        {
          forwardRef: r
        } = a();
      return (e, i) => p(t)?.modal.value ? (x(), y(p(n), {
        key: 0,
        present: e.forceMount || p(t).open.value,
        "force-mount": e.forceMount || !p(t).unmountOnHide.value
      }, {
        default: _(({
          present: n
        }) => [v(C(z, w(e.$attrs, {
          ref: p(r),
          as: e.as,
          "as-child": e.asChild,
          present: p(t).unmountOnHide.value || n
        }), {
          default: _(() => [m(e.$slots, `default`)]),
          _: 2
        }, 1040, [`as`, `as-child`, `present`]), [[k, p(t).unmountOnHide.value || n]])]),
        _: 3
      }, 8, [`present`, `force-mount`])) : D(`v-if`, true);
    }
  }),
  V = S({
    __name: `DialogTitle`,
    props: {
      asChild: {
        type: Boolean,
        required: false
      },
      as: {
        type: null,
        required: false,
        default: `h2`
      }
    },
    setup(e) {
      let t = e,
        n = A();
      return a(), (e, r) => (x(), y(p(c), w(t, {
        id: p(n).titleId
      }), {
        default: _(() => [m(e.$slots, `default`)]),
        _: 3
      }, 16, [`id`]));
    }
  });
export { N as a, L as i, B as n, M as o, R as r, A as s, V as t };