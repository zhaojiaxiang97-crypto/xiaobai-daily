import { U as uiSwitchU, V as uiSwitchV, _ as uiSwitch, lt as uiSwitchLt, n as uiSwitchN, xt as uiSwitchXt, yt as uiSwitchYt, z as uiSwitchZ } from "./Switch.js";
import { $n as vueN, An as vueAn, Ct as vueCt, S as vueS, V as vueV, Yt as vueYt, b as vueB, bn as vueBn, gt as vueGt, j as vueJ, k as vueK, nt as vueNt, rt as vueRt, tr as vueTr, ut as vueUt } from "../chunks/vue-i18n.runtime.js";
import { E as playerE } from "../i18n/en-US-player.js";
import { a as DialogTitleA, i as DialogTitleI, n as DialogTitleN, o as DialogTitleO, r as DialogTitleR, t as DialogTitleT } from "./DialogTitle.js";
var A = vueJ({
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
    setup(props) {
      let propsAlias = props;
      return uiSwitchV(), (e, t) => (vueGt(), vueB(vueAn(DialogTitleA), vueTr(vueV(propsAlias)), {
        default: vueYt(() => [vueCt(e.$slots, `default`)]),
        _: 3
      }, 16));
    }
  }),
  [j, M] = uiSwitchYt(`AlertDialogContent`),
  N = vueJ({
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
    setup(props, {
      emit: emit
    }) {
      let propsAlias = props,
        a = uiSwitchU(emit);
      uiSwitchV();
      let o = vueBn();
      return M({
        onCancelElementChange: e => {
          o.value = e;
        }
      }), (e, renderCache) => (vueGt(), vueB(vueAn(DialogTitleI), vueNt({
        ...propsAlias,
        ...vueAn(a)
      }, {
        role: `alertdialog`,
        onPointerDownOutside: renderCache[0] ||= playerE(() => {}, [`prevent`]),
        onInteractOutside: renderCache[1] ||= playerE(() => {}, [`prevent`]),
        onOpenAutoFocus: renderCache[2] ||= () => {
          vueRt(() => {
            o.value?.focus({
              preventScroll: true
            });
          });
        }
      }), {
        default: vueYt(() => [vueCt(e.$slots, `default`)]),
        _: 3
      }, 16));
    }
  }),
  P = vueJ({
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
    setup(props) {
      let propsAlias = props,
        r = j(),
        {
          forwardRef: i,
          currentElement: a
        } = uiSwitchV();
      return vueUt(() => {
        r.onCancelElementChange(a.value);
      }), (e, t) => (vueGt(), vueB(vueAn(DialogTitleA), vueNt(propsAlias, {
        ref: vueAn(i)
      }), {
        default: vueYt(() => [vueCt(e.$slots, `default`)]),
        _: 3
      }, 16));
    }
  }),
  F = vueJ({
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
    setup(props) {
      let propsAlias = props;
      return uiSwitchV(), (e, t) => (vueGt(), vueB(vueAn(DialogTitleR), vueTr(vueV(propsAlias)), {
        default: vueYt(() => [vueCt(e.$slots, `default`)]),
        _: 3
      }, 16));
    }
  }),
  I = vueJ({
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
    setup(props) {
      let propsAlias = props;
      return uiSwitchV(), (e, t) => (vueGt(), vueB(vueAn(DialogTitleN), vueTr(vueV(propsAlias)), {
        default: vueYt(() => [vueCt(e.$slots, `default`)]),
        _: 3
      }, 16));
    }
  }),
  L = vueJ({
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
    setup(props) {
      let propsAlias = props;
      return (ctx, renderCache) => (vueGt(), vueB(vueAn(uiSwitch), vueTr(vueV(propsAlias)), {
        default: vueYt(() => [vueCt(ctx.$slots, `default`)]),
        _: 3
      }, 16));
    }
  }),
  R = vueJ({
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
    setup(props, {
      emit: emit
    }) {
      let r = uiSwitchZ(props, emit);
      return uiSwitchV(), (e, t) => (vueGt(), vueB(vueAn(DialogTitleO), vueNt(vueAn(r), {
        modal: true
      }), {
        default: vueYt(t => [vueCt(e.$slots, `default`, vueTr(vueV(t)))]),
        _: 3
      }, 16));
    }
  }),
  z = vueJ({
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
    setup(props) {
      let propsAlias = props;
      return uiSwitchV(), (e, t) => (vueGt(), vueB(vueAn(DialogTitleT), vueTr(vueV(propsAlias)), {
        default: vueYt(() => [vueCt(e.$slots, `default`)]),
        _: 3
      }, 16));
    }
  }),
  B = vueJ({
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
    setup(props, {
      emit: emit
    }) {
      let n = uiSwitchZ(props, emit);
      return (ctx, renderCache) => (vueGt(), vueB(vueAn(R), vueNt({
        "data-slot": `alert-dialog`
      }, vueAn(n)), {
        default: vueYt(t => [vueCt(ctx.$slots, `default`, vueTr(vueV(t)))]),
        _: 3
      }, 16));
    }
  }),
  V = vueJ({
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
    setup(count) {
      let countAlias = count,
        n = uiSwitchLt(countAlias, `class`, `variant`, `size`);
      return (ctx, renderCache) => (vueGt(), vueB(vueAn(A), vueNt({
        "data-slot": `alert-dialog-action`
      }, vueAn(n), {
        class: vueAn(uiSwitchXt)(``, vueAn(uiSwitchN)({
          variant: count.variant,
          size: count.size
        }), countAlias.class)
      }), {
        default: vueYt(() => [vueCt(ctx.$slots, `default`)]),
        _: 3
      }, 16, [`class`]));
    }
  }),
  H = vueJ({
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
    setup(count) {
      let countAlias = count,
        n = uiSwitchLt(countAlias, `class`, `variant`, `size`);
      return (ctx, renderCache) => (vueGt(), vueB(vueAn(P), vueNt({
        "data-slot": `alert-dialog-cancel`
      }, vueAn(n), {
        class: vueAn(uiSwitchXt)(``, vueAn(uiSwitchN)({
          variant: count.variant,
          size: count.size
        }), countAlias.class)
      }), {
        default: vueYt(() => [vueCt(ctx.$slots, `default`)]),
        _: 3
      }, 16, [`class`]));
    }
  }),
  U = vueJ({
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
    setup(count, {
      emit: emit
    }) {
      let countAlias = count,
        emitAlias = emit,
        o = uiSwitchLt(countAlias, `class`, `size`, `overlayClass`),
        d = uiSwitchZ(o, emitAlias);
      return (ctx, renderCache) => (vueGt(), vueB(vueAn(L), null, {
        default: vueYt(() => [vueK(vueAn(I), {
          "data-slot": `alert-dialog-overlay`,
          class: vueN(vueAn(uiSwitchXt)(`data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 bg-black/10 dark:bg-black/60 duration-100 supports-backdrop-filter:backdrop-blur-xs fixed inset-0 z-50`, countAlias.overlayClass)),
          style: {
            "-webkit-app-region": `no-drag`
          }
        }, null, 8, [`class`]), vueK(vueAn(N), vueNt({
          "data-slot": `alert-dialog-content`,
          "data-size": count.size
        }, {
          ...ctx.$attrs,
          ...vueAn(d)
        }, {
          class: vueAn(uiSwitchXt)(`data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 bg-popover text-popover-foreground ring-foreground/10 gap-4 rounded-xl p-4 ring-1 duration-100 data-[size=default]:max-w-xs data-[size=sm]:max-w-xs data-[size=default]:sm:max-w-sm group/alert-dialog-content fixed top-1/2 left-1/2 z-50 grid w-full -translate-x-1/2 -translate-y-1/2 outline-none`, countAlias.class),
          style: {
            "-webkit-app-region": `no-drag`,
            "pointer-events": `auto`
          }
        }), {
          default: vueYt(() => [vueCt(ctx.$slots, `default`)]),
          _: 3
        }, 16, [`data-size`, `class`])]),
        _: 3
      }));
    }
  }),
  W = vueJ({
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
    setup(props) {
      let propsAlias = props,
        n = uiSwitchLt(propsAlias, `class`);
      return (ctx, renderCache) => (vueGt(), vueB(vueAn(F), vueNt({
        "data-slot": `alert-dialog-description`
      }, vueAn(n), {
        class: vueAn(uiSwitchXt)(`text-muted-foreground *:[a]:hover:text-foreground text-sm text-balance md:text-pretty *:[a]:underline *:[a]:underline-offset-3`, propsAlias.class)
      }), {
        default: vueYt(() => [vueCt(ctx.$slots, `default`)]),
        _: 3
      }, 16, [`class`]));
    }
  }),
  G = vueJ({
    __name: `AlertDialogFooter`,
    props: {
      class: {
        type: [Boolean, null, String, Object, Array]
      }
    },
    setup(props) {
      let propsAlias = props;
      return (ctx, renderCache) => (vueGt(), vueS(`div`, {
        "data-slot": `alert-dialog-footer`,
        class: vueN(vueAn(uiSwitchXt)(`bg-muted/50 -mx-4 -mb-4 rounded-b-xl border-t p-4 flex flex-col-reverse gap-2 group-data-[size=sm]/alert-dialog-content:grid group-data-[size=sm]/alert-dialog-content:grid-cols-2 sm:flex-row sm:justify-end`, propsAlias.class))
      }, [vueCt(ctx.$slots, `default`)], 2));
    }
  }),
  K = vueJ({
    __name: `AlertDialogHeader`,
    props: {
      class: {
        type: [Boolean, null, String, Object, Array]
      }
    },
    setup(props) {
      let propsAlias = props;
      return (ctx, renderCache) => (vueGt(), vueS(`div`, {
        "data-slot": `alert-dialog-header`,
        class: vueN(vueAn(uiSwitchXt)(`grid grid-rows-[auto_1fr] place-items-center gap-1.5 text-center has-data-[slot=alert-dialog-media]:grid-rows-[auto_auto_1fr] has-data-[slot=alert-dialog-media]:gap-x-4 sm:group-data-[size=default]/alert-dialog-content:place-items-start sm:group-data-[size=default]/alert-dialog-content:text-left sm:group-data-[size=default]/alert-dialog-content:has-data-[slot=alert-dialog-media]:grid-rows-[auto_1fr]`, propsAlias.class))
      }, [vueCt(ctx.$slots, `default`)], 2));
    }
  }),
  q = vueJ({
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
    setup(props) {
      let propsAlias = props,
        n = uiSwitchLt(propsAlias, `class`);
      return (ctx, renderCache) => (vueGt(), vueB(vueAn(z), vueNt({
        "data-slot": `alert-dialog-title`
      }, vueAn(n), {
        class: vueAn(uiSwitchXt)(`text-base font-medium sm:group-data-[size=default]/alert-dialog-content:group-has-data-[slot=alert-dialog-media]/alert-dialog-content:col-start-2 cn-font-heading`, propsAlias.class)
      }), {
        default: vueYt(() => [vueCt(ctx.$slots, `default`)]),
        _: 3
      }, 16, [`class`]));
    }
  });
export { U as a, B as c, W as i, K as n, H as o, G as r, V as s, q as t };