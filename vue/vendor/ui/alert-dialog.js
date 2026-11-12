import { U as e, V as t, _ as n, lt as r, n as i, xt as a, yt as o, z as s } from "./Switch.js";
import { $n as c, An as l, Ct as u, S as d, V as f, Yt as p, b as m, bn as h, gt as g, j as _, k as v, nt as y, rt as b, tr as x, ut as S } from "../chunks/vue-i18n.runtime.js";
import { E as C } from "../i18n/en-US-player.js";
import { a as w, i as T, n as E, o as D, r as O, t as k } from "./DialogTitle.js";
var A = _({
    __name: `AlertDialogAction`,
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
      let n = e;
      return t(), (e, t) => (g(), m(l(w), x(f(n)), {
        default: p(() => [u(e.$slots, `default`)]),
        _: 3
      }, 16));
    }
  }),
  [j, M] = o(`AlertDialogContent`),
  N = _({
    __name: `AlertDialogContent`,
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
    setup(n, {
      emit: r
    }) {
      let i = n,
        a = e(r);
      t();
      let o = h();
      return M({
        onCancelElementChange: e => {
          o.value = e;
        }
      }), (e, t) => (g(), m(l(T), y({
        ...i,
        ...l(a)
      }, {
        role: `alertdialog`,
        onPointerDownOutside: t[0] ||= C(() => {}, [`prevent`]),
        onInteractOutside: t[1] ||= C(() => {}, [`prevent`]),
        onOpenAutoFocus: t[2] ||= () => {
          b(() => {
            o.value?.focus({
              preventScroll: true
            });
          });
        }
      }), {
        default: p(() => [u(e.$slots, `default`)]),
        _: 3
      }, 16));
    }
  }),
  P = _({
    __name: `AlertDialogCancel`,
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
      let n = e,
        r = j(),
        {
          forwardRef: i,
          currentElement: a
        } = t();
      return S(() => {
        r.onCancelElementChange(a.value);
      }), (e, t) => (g(), m(l(w), y(n, {
        ref: l(i)
      }), {
        default: p(() => [u(e.$slots, `default`)]),
        _: 3
      }, 16));
    }
  }),
  F = _({
    __name: `AlertDialogDescription`,
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
      let n = e;
      return t(), (e, t) => (g(), m(l(O), x(f(n)), {
        default: p(() => [u(e.$slots, `default`)]),
        _: 3
      }, 16));
    }
  }),
  I = _({
    __name: `AlertDialogOverlay`,
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
      let n = e;
      return t(), (e, t) => (g(), m(l(E), x(f(n)), {
        default: p(() => [u(e.$slots, `default`)]),
        _: 3
      }, 16));
    }
  }),
  L = _({
    __name: `AlertDialogPortal`,
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
      return (e, r) => (g(), m(l(n), x(f(t)), {
        default: p(() => [u(e.$slots, `default`)]),
        _: 3
      }, 16));
    }
  }),
  R = _({
    __name: `AlertDialogRoot`,
    props: {
      open: {
        type: Boolean,
        required: false
      },
      defaultOpen: {
        type: Boolean,
        required: false
      },
      unmountOnHide: {
        type: Boolean,
        required: false
      }
    },
    emits: [`update:open`],
    setup(e, {
      emit: n
    }) {
      let r = s(e, n);
      return t(), (e, t) => (g(), m(l(D), y(l(r), {
        modal: true
      }), {
        default: p(t => [u(e.$slots, `default`, x(f(t)))]),
        _: 3
      }, 16));
    }
  }),
  z = _({
    __name: `AlertDialogTitle`,
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
      let n = e;
      return t(), (e, t) => (g(), m(l(k), x(f(n)), {
        default: p(() => [u(e.$slots, `default`)]),
        _: 3
      }, 16));
    }
  }),
  B = _({
    __name: `AlertDialog`,
    props: {
      open: {
        type: Boolean
      },
      defaultOpen: {
        type: Boolean
      },
      unmountOnHide: {
        type: Boolean
      }
    },
    emits: [`update:open`],
    setup(e, {
      emit: t
    }) {
      let n = s(e, t);
      return (e, t) => (g(), m(l(R), y({
        "data-slot": `alert-dialog`
      }, l(n)), {
        default: p(t => [u(e.$slots, `default`, x(f(t)))]),
        _: 3
      }, 16));
    }
  }),
  V = _({
    __name: `AlertDialogAction`,
    props: {
      asChild: {
        type: Boolean
      },
      as: {},
      class: {
        type: [Boolean, null, String, Object, Array]
      },
      variant: {
        default: `default`
      },
      size: {
        default: `default`
      }
    },
    setup(e) {
      let t = e,
        n = r(t, `class`, `variant`, `size`);
      return (r, o) => (g(), m(l(A), y({
        "data-slot": `alert-dialog-action`
      }, l(n), {
        class: l(a)(``, l(i)({
          variant: e.variant,
          size: e.size
        }), t.class)
      }), {
        default: p(() => [u(r.$slots, `default`)]),
        _: 3
      }, 16, [`class`]));
    }
  }),
  H = _({
    __name: `AlertDialogCancel`,
    props: {
      asChild: {
        type: Boolean
      },
      as: {},
      class: {
        type: [Boolean, null, String, Object, Array]
      },
      variant: {
        default: `outline`
      },
      size: {
        default: `default`
      }
    },
    setup(e) {
      let t = e,
        n = r(t, `class`, `variant`, `size`);
      return (r, o) => (g(), m(l(P), y({
        "data-slot": `alert-dialog-cancel`
      }, l(n), {
        class: l(a)(``, l(i)({
          variant: e.variant,
          size: e.size
        }), t.class)
      }), {
        default: p(() => [u(r.$slots, `default`)]),
        _: 3
      }, 16, [`class`]));
    }
  }),
  U = _({
    inheritAttrs: false,
    __name: `AlertDialogContent`,
    props: {
      forceMount: {
        type: Boolean
      },
      disableOutsidePointerEvents: {
        type: Boolean
      },
      asChild: {
        type: Boolean
      },
      as: {},
      class: {
        type: [Boolean, null, String, Object, Array]
      },
      overlayClass: {
        type: [Boolean, null, String, Object, Array]
      },
      size: {
        default: `default`
      }
    },
    emits: [`escapeKeyDown`, `pointerDownOutside`, `focusOutside`, `interactOutside`, `openAutoFocus`, `closeAutoFocus`],
    setup(e, {
      emit: t
    }) {
      let n = e,
        i = t,
        o = r(n, `class`, `size`, `overlayClass`),
        d = s(o, i);
      return (t, r) => (g(), m(l(L), null, {
        default: p(() => [v(l(I), {
          "data-slot": `alert-dialog-overlay`,
          class: c(l(a)(`data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 bg-black/10 dark:bg-black/60 duration-100 supports-backdrop-filter:backdrop-blur-xs fixed inset-0 z-50`, n.overlayClass)),
          style: {
            "-webkit-app-region": `no-drag`
          }
        }, null, 8, [`class`]), v(l(N), y({
          "data-slot": `alert-dialog-content`,
          "data-size": e.size
        }, {
          ...t.$attrs,
          ...l(d)
        }, {
          class: l(a)(`data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 bg-popover text-popover-foreground ring-foreground/10 gap-4 rounded-xl p-4 ring-1 duration-100 data-[size=default]:max-w-xs data-[size=sm]:max-w-xs data-[size=default]:sm:max-w-sm group/alert-dialog-content fixed top-1/2 left-1/2 z-50 grid w-full -translate-x-1/2 -translate-y-1/2 outline-none`, n.class),
          style: {
            "-webkit-app-region": `no-drag`,
            "pointer-events": `auto`
          }
        }), {
          default: p(() => [u(t.$slots, `default`)]),
          _: 3
        }, 16, [`data-size`, `class`])]),
        _: 3
      }));
    }
  }),
  W = _({
    __name: `AlertDialogDescription`,
    props: {
      asChild: {
        type: Boolean
      },
      as: {},
      class: {
        type: [Boolean, null, String, Object, Array]
      }
    },
    setup(e) {
      let t = e,
        n = r(t, `class`);
      return (e, r) => (g(), m(l(F), y({
        "data-slot": `alert-dialog-description`
      }, l(n), {
        class: l(a)(`text-muted-foreground *:[a]:hover:text-foreground text-sm text-balance md:text-pretty *:[a]:underline *:[a]:underline-offset-3`, t.class)
      }), {
        default: p(() => [u(e.$slots, `default`)]),
        _: 3
      }, 16, [`class`]));
    }
  }),
  G = _({
    __name: `AlertDialogFooter`,
    props: {
      class: {
        type: [Boolean, null, String, Object, Array]
      }
    },
    setup(e) {
      let t = e;
      return (e, n) => (g(), d(`div`, {
        "data-slot": `alert-dialog-footer`,
        class: c(l(a)(`bg-muted/50 -mx-4 -mb-4 rounded-b-xl border-t p-4 flex flex-col-reverse gap-2 group-data-[size=sm]/alert-dialog-content:grid group-data-[size=sm]/alert-dialog-content:grid-cols-2 sm:flex-row sm:justify-end`, t.class))
      }, [u(e.$slots, `default`)], 2));
    }
  }),
  K = _({
    __name: `AlertDialogHeader`,
    props: {
      class: {
        type: [Boolean, null, String, Object, Array]
      }
    },
    setup(e) {
      let t = e;
      return (e, n) => (g(), d(`div`, {
        "data-slot": `alert-dialog-header`,
        class: c(l(a)(`grid grid-rows-[auto_1fr] place-items-center gap-1.5 text-center has-data-[slot=alert-dialog-media]:grid-rows-[auto_auto_1fr] has-data-[slot=alert-dialog-media]:gap-x-4 sm:group-data-[size=default]/alert-dialog-content:place-items-start sm:group-data-[size=default]/alert-dialog-content:text-left sm:group-data-[size=default]/alert-dialog-content:has-data-[slot=alert-dialog-media]:grid-rows-[auto_1fr]`, t.class))
      }, [u(e.$slots, `default`)], 2));
    }
  }),
  q = _({
    __name: `AlertDialogTitle`,
    props: {
      asChild: {
        type: Boolean
      },
      as: {},
      class: {
        type: [Boolean, null, String, Object, Array]
      }
    },
    setup(e) {
      let t = e,
        n = r(t, `class`);
      return (e, r) => (g(), m(l(z), y({
        "data-slot": `alert-dialog-title`
      }, l(n), {
        class: l(a)(`text-base font-medium sm:group-data-[size=default]/alert-dialog-content:group-has-data-[slot=alert-dialog-media]/alert-dialog-content:col-start-2 cn-font-heading`, t.class)
      }), {
        default: p(() => [u(e.$slots, `default`)]),
        _: 3
      }, 16, [`class`]));
    }
  });
export { U as a, B as c, W as i, K as n, H as o, G as r, V as s, q as t };