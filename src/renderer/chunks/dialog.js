import { B as uiSwitchB, _ as uiSwitch, lt as uiSwitchLt, r as uiSwitchR, xt as uiSwitchXt, z as uiSwitchZ } from "../ui/Switch.js";
import { $n as vueN, An as vueAn, Ct as vueCt, O as vueO, S as vueS, V as vueV, Yt as vueYt, b as vueB, gt as vueGt, j as vueJ, k as vueK, nt as vueNt, tr as vueTr, x as vueX, y as vueY } from "./vue-i18n.runtime.js";
import { t as lucideT } from "../ui/icons/lucide-icons.js";
import { a as DialogTitleA, i as DialogTitleI, n as DialogTitleN, o as DialogTitleO, t as DialogTitleT } from "../ui/DialogTitle.js";
var D = vueJ({
    __name: `DialogPortal`,
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
  O = vueJ({
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
    setup(props, {
      emit: emit
    }) {
      let n = uiSwitchZ(props, emit);
      return (ctx, renderCache) => (vueGt(), vueB(vueAn(DialogTitleO), vueNt({
        "data-slot": `dialog`
      }, vueAn(n)), {
        default: vueYt(t => [vueCt(ctx.$slots, `default`, vueTr(vueV(t)))]),
        _: 3
      }, 16));
    }
  }),
  k = vueJ({
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
    setup(props) {
      let propsAlias = props,
        r = uiSwitchLt(propsAlias, `class`);
      return (ctx, renderCache) => (vueGt(), vueB(vueAn(DialogTitleN), vueNt({
        "data-slot": `dialog-overlay`
      }, vueAn(r), {
        class: vueAn(uiSwitchXt)(`data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 pointer-events-auto bg-black/10 dark:bg-black/60 duration-100 supports-backdrop-filter:backdrop-blur-xs fixed inset-0 isolate z-50`, propsAlias.class),
        style: {
          "-webkit-app-region": `no-drag`
        }
      }), {
        default: vueYt(() => [vueCt(ctx.$slots, `default`)]),
        _: 3
      }, 16, [`class`]));
    }
  }),
  A = vueJ({
    inheritAttrs: false,
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
        default: true
      }
    },
    emits: [`escapeKeyDown`, `pointerDownOutside`, `focusOutside`, `interactOutside`, `openAutoFocus`, `closeAutoFocus`],
    setup(props, {
      emit: emit
    }) {
      let propsAlias = props,
        emitAlias = emit,
        d = uiSwitchLt(propsAlias, `class`, `overlayClass`, `showCloseButton`),
        h = uiSwitchZ(d, emitAlias);
      return (ctx, renderCache) => (vueGt(), vueB(vueAn(D), null, {
        default: vueYt(() => [vueK(k, {
          class: vueN(propsAlias.overlayClass)
        }, null, 8, [`class`]), vueK(vueAn(DialogTitleI), vueNt({
          "data-slot": `dialog-content`
        }, {
          ...ctx.$attrs,
          ...vueAn(h)
        }, {
          class: vueAn(uiSwitchXt)(`bg-popover text-popover-foreground data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 ring-foreground/10 grid max-w-[calc(100%-2rem)] gap-4 rounded-xl p-4 text-sm ring-1 duration-100 sm:max-w-sm fixed top-1/2 left-1/2 z-50 w-full -translate-x-1/2 -translate-y-1/2 outline-none`, propsAlias.class),
          style: {
            "-webkit-app-region": `no-drag`,
            "pointer-events": `auto`
          }
        }), {
          default: vueYt(() => [vueCt(ctx.$slots, `default`), props.showCloseButton ? (vueGt(), vueB(vueAn(DialogTitleA), {
            key: 0,
            "data-slot": `dialog-close`,
            "as-child": ``
          }, {
            default: vueYt(() => [vueK(vueAn(uiSwitchR), {
              variant: `ghost`,
              class: `absolute top-2 right-2 cursor-pointer`,
              size: `icon-sm`
            }, {
              default: vueYt(() => [vueK(vueAn(lucideT)), renderCache[0] ||= vueY(`span`, {
                class: `sr-only`
              }, `Close`, -1)]),
              _: 1
            })]),
            _: 1
          })) : vueX(``, true)]),
          _: 3
        }, 16, [`class`])]),
        _: 3
      }));
    }
  }),
  j = vueJ({
    __name: `DialogFooter`,
    props: {
      class: {
        type: [Boolean, null, String, Object, Array]
      },
      showCloseButton: {
        type: Boolean,
        default: false
      }
    },
    setup(props) {
      let propsAlias = props;
      return (ctx, renderCache) => (vueGt(), vueS(`div`, {
        "data-slot": `dialog-footer`,
        class: vueN(vueAn(uiSwitchXt)(`bg-muted/50 -mx-4 -mb-4 rounded-b-xl border-t p-4 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end`, propsAlias.class))
      }, [vueCt(ctx.$slots, `default`), props.showCloseButton ? (vueGt(), vueB(vueAn(DialogTitleA), {
        key: 0,
        "as-child": ``
      }, {
        default: vueYt(() => [vueK(vueAn(uiSwitchR), {
          variant: `outline`
        }, {
          default: vueYt(() => [...(renderCache[0] ||= [vueO(` Close `, -1)])]),
          _: 1
        })]),
        _: 1
      })) : vueX(``, true)], 2));
    }
  }),
  M = vueJ({
    __name: `DialogHeader`,
    props: {
      class: {
        type: [Boolean, null, String, Object, Array]
      }
    },
    setup(props) {
      let propsAlias = props;
      return (ctx, renderCache) => (vueGt(), vueS(`div`, {
        "data-slot": `dialog-header`,
        class: vueN(vueAn(uiSwitchXt)(`gap-2 flex flex-col`, propsAlias.class))
      }, [vueCt(ctx.$slots, `default`)], 2));
    }
  }),
  N = vueJ({
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
    setup(props) {
      let propsAlias = props,
        a = uiSwitchLt(propsAlias, `class`),
        o = uiSwitchB(a);
      return (ctx, renderCache) => (vueGt(), vueB(vueAn(DialogTitleT), vueNt({
        "data-slot": `dialog-title`
      }, vueAn(o), {
        class: vueAn(uiSwitchXt)(`text-base leading-none font-medium cn-font-heading`, propsAlias.class)
      }), {
        default: vueYt(() => [vueCt(ctx.$slots, `default`)]),
        _: 3
      }, 16, [`class`]));
    }
  });
export { O as a, A as i, M as n, D as o, j as r, N as t };