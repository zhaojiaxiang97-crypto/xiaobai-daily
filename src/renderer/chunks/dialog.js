import { B as e, _ as t, lt as n, r, xt as i, z as a } from "../ui/Switch.js";
import { $n as o, An as s, Ct as c, O as l, S as u, V as d, Yt as f, b as p, gt as m, j as h, k as g, nt as _, tr as v, x as y, y as b } from "./vue-i18n.runtime.js";
import { t as x } from "../ui/icons/lucide-icons.js";
import { a as S, i as C, n as w, o as T, t as E } from "../ui/DialogTitle.js";
var D = h({
    __name: `DialogPortal`,
    props: {
      to: {
        type: null,
        required: !1
      },
      disabled: {
        type: Boolean,
        required: !1
      },
      defer: {
        type: Boolean,
        required: !1
      },
      forceMount: {
        type: Boolean,
        required: !1
      }
    },
    setup(e) {
      let n = e;
      return (e, r) => (m(), p(s(t), v(d(n)), {
        default: f(() => [c(e.$slots, `default`)]),
        _: 3
      }, 16));
    }
  }),
  O = h({
    __name: `Dialog`,
    props: {
      open: {
        type: Boolean
      },
      defaultOpen: {
        type: Boolean
      },
      modal: {
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
      let n = a(e, t);
      return (e, t) => (m(), p(s(T), _({
        "data-slot": `dialog`
      }, s(n)), {
        default: f(t => [c(e.$slots, `default`, v(d(t)))]),
        _: 3
      }, 16));
    }
  }),
  k = h({
    __name: `DialogOverlay`,
    props: {
      forceMount: {
        type: Boolean
      },
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
        r = n(t, `class`);
      return (e, n) => (m(), p(s(w), _({
        "data-slot": `dialog-overlay`
      }, s(r), {
        class: s(i)(`data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 pointer-events-auto bg-black/10 dark:bg-black/60 duration-100 supports-backdrop-filter:backdrop-blur-xs fixed inset-0 isolate z-50`, t.class),
        style: {
          "-webkit-app-region": `no-drag`
        }
      }), {
        default: f(() => [c(e.$slots, `default`)]),
        _: 3
      }, 16, [`class`]));
    }
  }),
  A = h({
    inheritAttrs: !1,
    __name: `DialogContent`,
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
      showCloseButton: {
        type: Boolean,
        default: !0
      }
    },
    emits: [`escapeKeyDown`, `pointerDownOutside`, `focusOutside`, `interactOutside`, `openAutoFocus`, `closeAutoFocus`],
    setup(e, {
      emit: t
    }) {
      let l = e,
        u = t,
        d = n(l, `class`, `overlayClass`, `showCloseButton`),
        h = a(d, u);
      return (t, n) => (m(), p(s(D), null, {
        default: f(() => [g(k, {
          class: o(l.overlayClass)
        }, null, 8, [`class`]), g(s(C), _({
          "data-slot": `dialog-content`
        }, {
          ...t.$attrs,
          ...s(h)
        }, {
          class: s(i)(`bg-popover text-popover-foreground data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 ring-foreground/10 grid max-w-[calc(100%-2rem)] gap-4 rounded-xl p-4 text-sm ring-1 duration-100 sm:max-w-sm fixed top-1/2 left-1/2 z-50 w-full -translate-x-1/2 -translate-y-1/2 outline-none`, l.class),
          style: {
            "-webkit-app-region": `no-drag`,
            "pointer-events": `auto`
          }
        }), {
          default: f(() => [c(t.$slots, `default`), e.showCloseButton ? (m(), p(s(S), {
            key: 0,
            "data-slot": `dialog-close`,
            "as-child": ``
          }, {
            default: f(() => [g(s(r), {
              variant: `ghost`,
              class: `absolute top-2 right-2 cursor-pointer`,
              size: `icon-sm`
            }, {
              default: f(() => [g(s(x)), n[0] ||= b(`span`, {
                class: `sr-only`
              }, `Close`, -1)]),
              _: 1
            })]),
            _: 1
          })) : y(``, !0)]),
          _: 3
        }, 16, [`class`])]),
        _: 3
      }));
    }
  }),
  j = h({
    __name: `DialogFooter`,
    props: {
      class: {
        type: [Boolean, null, String, Object, Array]
      },
      showCloseButton: {
        type: Boolean,
        default: !1
      }
    },
    setup(e) {
      let t = e;
      return (n, a) => (m(), u(`div`, {
        "data-slot": `dialog-footer`,
        class: o(s(i)(`bg-muted/50 -mx-4 -mb-4 rounded-b-xl border-t p-4 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end`, t.class))
      }, [c(n.$slots, `default`), e.showCloseButton ? (m(), p(s(S), {
        key: 0,
        "as-child": ``
      }, {
        default: f(() => [g(s(r), {
          variant: `outline`
        }, {
          default: f(() => [...(a[0] ||= [l(` Close `, -1)])]),
          _: 1
        })]),
        _: 1
      })) : y(``, !0)], 2));
    }
  }),
  M = h({
    __name: `DialogHeader`,
    props: {
      class: {
        type: [Boolean, null, String, Object, Array]
      }
    },
    setup(e) {
      let t = e;
      return (e, n) => (m(), u(`div`, {
        "data-slot": `dialog-header`,
        class: o(s(i)(`gap-2 flex flex-col`, t.class))
      }, [c(e.$slots, `default`)], 2));
    }
  }),
  N = h({
    __name: `DialogTitle`,
    props: {
      asChild: {
        type: Boolean
      },
      as: {},
      class: {
        type: [Boolean, null, String, Object, Array]
      }
    },
    setup(t) {
      let r = t,
        a = n(r, `class`),
        o = e(a);
      return (e, t) => (m(), p(s(E), _({
        "data-slot": `dialog-title`
      }, s(o), {
        class: s(i)(`text-base leading-none font-medium cn-font-heading`, r.class)
      }), {
        default: f(() => [c(e.$slots, `default`)]),
        _: 3
      }, 16, [`class`]));
    }
  });
export { O as a, A as i, M as n, D as o, j as r, N as t };