import { I as uiSwitchI, L as uiSwitchL, N as uiSwitchN, O as uiSwitchO, U as uiSwitchU, V as uiSwitchV, W as uiSwitchW, at as uiSwitchAt, j as uiSwitchJ, k as uiSwitchK, vt as uiSwitchVt, w as d, yt as uiSwitchYt } from "./Switch.js";
import { An as vueAn, Ct as vueCt, Dn as vueDn, Wt as vueWt, Yt as vueYt, Zt as vueZt, b as vueB, bn as vueBn, gt as vueGt, j as vueJ, k as vueK, nt as vueNt, ut as vueUt, v as vueV, x as vueX } from "../chunks/vue-i18n.runtime.js";
import { E as playerE, w as playerW } from "../i18n/en-US-player.js";
var [A, j] = uiSwitchYt(`DialogRoot`),
  M = vueJ({
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
    setup(props, {
      emit: emit
    }) {
      let propsAlias = props,
        uiSwitchAtResult = uiSwitchAt(propsAlias, `open`, emit, {
          defaultValue: propsAlias.defaultOpen,
          passive: propsAlias.open === undefined
        }),
        i = vueBn(),
        a = vueBn(),
        {
          modal: o,
          unmountOnHide: c
        } = vueDn(propsAlias);
      return j({
        open: uiSwitchAtResult,
        modal: o,
        unmountOnHide: c,
        openModal: () => {
          uiSwitchAtResult.value = true;
        },
        onOpenChange: e => {
          uiSwitchAtResult.value = e;
        },
        onOpenToggle: () => {
          uiSwitchAtResult.value = !uiSwitchAtResult.value;
        },
        contentId: ``,
        titleId: ``,
        descriptionId: ``,
        triggerElement: i,
        contentElement: a
      }), (e, t) => vueCt(e.$slots, `default`, {
        open: vueAn(uiSwitchAtResult),
        close: () => uiSwitchAtResult.value = false
      });
    }
  }),
  N = vueJ({
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
    setup(props) {
      let propsAlias = props;
      uiSwitchV();
      let n = A();
      return (ctx, renderCache) => (vueGt(), vueB(vueAn(uiSwitchJ), vueNt(propsAlias, {
        type: ctx.as === `button` ? `button` : undefined,
        onClick: renderCache[0] ||= e => vueAn(n).onOpenChange(false)
      }), {
        default: vueYt(() => [vueCt(ctx.$slots, `default`)]),
        _: 3
      }, 16, [`type`]));
    }
  }),
  P = vueJ({
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
    setup(props, {
      emit: emit
    }) {
      let propsAlias = props,
        emitAlias = emit,
        s = A(),
        {
          forwardRef: c,
          currentElement: f
        } = uiSwitchV();
      return s.titleId ||= uiSwitchI(undefined, `reka-dialog-title`), s.descriptionId ||= uiSwitchI(undefined, `reka-dialog-description`), vueUt(() => {
        s.contentElement = f, uiSwitchVt() !== document.body && (s.triggerElement.value = uiSwitchVt());
      }), (e, renderCache) => (vueGt(), vueB(vueAn(uiSwitchO), {
        "as-child": ``,
        loop: ``,
        trapped: propsAlias.trapFocus,
        present: propsAlias.present,
        onMountAutoFocus: renderCache[5] ||= e => emitAlias(`openAutoFocus`, e),
        onUnmountAutoFocus: renderCache[6] ||= e => emitAlias(`closeAutoFocus`, e)
      }, {
        default: vueYt(() => [vueK(vueAn(uiSwitchK), vueNt({
          id: vueAn(s).contentId,
          ref: vueAn(c),
          as: e.as,
          "as-child": e.asChild,
          present: propsAlias.present,
          "disable-outside-pointer-events": e.disableOutsidePointerEvents,
          role: `dialog`,
          "aria-describedby": vueAn(s).descriptionId,
          "aria-labelledby": vueAn(s).titleId,
          "data-state": vueAn(d)(vueAn(s).open.value)
        }, e.$attrs, {
          onDismiss: renderCache[0] ||= e => vueAn(s).onOpenChange(false),
          onEscapeKeyDown: renderCache[1] ||= e => emitAlias(`escapeKeyDown`, e),
          onFocusOutside: renderCache[2] ||= e => emitAlias(`focusOutside`, e),
          onInteractOutside: renderCache[3] ||= e => emitAlias(`interactOutside`, e),
          onPointerDownOutside: renderCache[4] ||= e => emitAlias(`pointerDownOutside`, e)
        }), {
          default: vueYt(() => [vueCt(e.$slots, `default`)]),
          _: 3
        }, 16, [`id`, `as`, `as-child`, `present`, `disable-outside-pointer-events`, `aria-describedby`, `aria-labelledby`, `data-state`])]),
        _: 3
      }, 8, [`trapped`, `present`]));
    }
  }),
  F = vueJ({
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
    setup(event, {
      emit: emit
    }) {
      let eventAlias = event,
        emitAlias = emit,
        s = A(),
        uiSwitchUResult = uiSwitchU(emitAlias),
        {
          forwardRef: l,
          currentElement: u
        } = uiSwitchV(),
        d = vueV(() => eventAlias.present ? u.value : undefined);
      uiSwitchL(d);
      let f = vueV(() => {
        let {
          present: e,
          ...t
        } = eventAlias;
        return t;
      });
      return vueWt(() => eventAlias.present, (e, t) => {
        !e && t && s.triggerElement.value?.focus();
      }), (e, t) => (vueGt(), vueB(P, vueNt({
        ...f.value,
        ...vueAn(uiSwitchUResult)
      }, {
        ref: vueAn(l),
        present: e.present,
        "trap-focus": vueAn(s).open.value,
        "disable-outside-pointer-events": eventAlias.disableOutsidePointerEvents,
        onCloseAutoFocus: t[0] ||= e => {
          e.defaultPrevented || (e.preventDefault(), vueAn(s).triggerElement.value?.focus());
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
        default: vueYt(() => [vueCt(e.$slots, `default`)]),
        _: 3
      }, 16, [`present`, `trap-focus`, `disable-outside-pointer-events`]));
    }
  }),
  I = vueJ({
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
    setup(event, {
      emit: emit
    }) {
      let eventAlias = event,
        uiSwitchUResult = uiSwitchU(emit);
      uiSwitchV();
      let o = A(),
        s = vueBn(false),
        c = vueBn(false),
        l = vueV(() => {
          let {
            present: e,
            ...t
          } = eventAlias;
          return t;
        });
      return vueWt(() => eventAlias.present, (e, t) => {
        !e && t && (s.value || o.triggerElement.value?.focus(), s.value = false, c.value = false);
      }), (e, t) => (vueGt(), vueB(P, vueNt({
        ...l.value,
        ...vueAn(uiSwitchUResult)
      }, {
        present: e.present,
        "trap-focus": false,
        "disable-outside-pointer-events": false,
        onCloseAutoFocus: t[0] ||= e => {
          e.defaultPrevented || (s.value || vueAn(o).triggerElement.value?.focus(), e.preventDefault()), s.value = false, c.value = false;
        },
        onInteractOutside: t[1] ||= e => {
          e.defaultPrevented || (s.value = true, e.detail.originalEvent.type === `pointerdown` && (c.value = true));
          let t = e.target;
          vueAn(o).triggerElement.value?.contains(t) && e.preventDefault(), e.detail.originalEvent.type === `focusin` && c.value && e.preventDefault();
        }
      }), {
        default: vueYt(() => [vueCt(e.$slots, `default`)]),
        _: 3
      }, 16, [`present`]));
    }
  }),
  L = vueJ({
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
    setup(props, {
      emit: emit
    }) {
      let propsAlias = props,
        emitAlias = emit,
        s = A(),
        uiSwitchUResult = uiSwitchU(emitAlias),
        {
          forwardRef: l
        } = uiSwitchV();
      return (ctx, renderCache) => (vueGt(), vueB(vueAn(uiSwitchN), {
        present: ctx.forceMount || vueAn(s).open.value,
        "force-mount": ctx.forceMount || !vueAn(s).unmountOnHide.value
      }, {
        default: vueYt(({
          present: t
        }) => [vueAn(s).modal.value ? vueZt((vueGt(), vueB(F, vueNt({
          key: 0,
          ref: vueAn(l),
          present: vueAn(s).unmountOnHide.value || t
        }, {
          ...propsAlias,
          ...vueAn(uiSwitchUResult),
          ...ctx.$attrs
        }), {
          default: vueYt(() => [vueCt(ctx.$slots, `default`)]),
          _: 2
        }, 1040, [`present`])), [[playerW, vueAn(s).unmountOnHide.value || t]]) : vueZt((vueGt(), vueB(I, vueNt({
          key: 1,
          ref: vueAn(l),
          present: vueAn(s).unmountOnHide.value || t
        }, {
          ...propsAlias,
          ...vueAn(uiSwitchUResult),
          ...ctx.$attrs
        }), {
          default: vueYt(() => [vueCt(ctx.$slots, `default`)]),
          _: 2
        }, 1040, [`present`])), [[playerW, vueAn(s).unmountOnHide.value || t]])]),
        _: 3
      }, 8, [`present`, `force-mount`]));
    }
  }),
  R = vueJ({
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
    setup(props) {
      let propsAlias = props;
      uiSwitchV();
      let n = A();
      return (ctx, renderCache) => (vueGt(), vueB(vueAn(uiSwitchJ), vueNt(propsAlias, {
        id: vueAn(n).descriptionId
      }), {
        default: vueYt(() => [vueCt(ctx.$slots, `default`)]),
        _: 3
      }, 16, [`id`]));
    }
  }),
  z = vueJ({
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
    setup(props) {
      let propsAlias = props,
        n = A(),
        uiSwitchWResult = uiSwitchW(propsAlias.present);
      return vueWt(() => propsAlias.present, e => uiSwitchWResult.value = e), uiSwitchV(), (e, t) => (vueGt(), vueB(vueAn(uiSwitchJ), {
        as: e.as,
        "as-child": e.asChild,
        "data-state": vueAn(n).open.value ? `open` : `closed`,
        style: {
          "pointer-events": `auto`
        },
        onPointerdown: t[0] ||= playerE(() => {}, [`left`, `self`, `prevent`])
      }, {
        default: vueYt(() => [vueCt(e.$slots, `default`)]),
        _: 3
      }, 8, [`as`, `as-child`, `data-state`]));
    }
  }),
  B = vueJ({
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
    setup(props) {
      let t = A(),
        {
          forwardRef: r
        } = uiSwitchV();
      return (ctx, renderCache) => vueAn(t)?.modal.value ? (vueGt(), vueB(vueAn(uiSwitchN), {
        key: 0,
        present: ctx.forceMount || vueAn(t).open.value,
        "force-mount": ctx.forceMount || !vueAn(t).unmountOnHide.value
      }, {
        default: vueYt(({
          present: n
        }) => [vueZt(vueK(z, vueNt(ctx.$attrs, {
          ref: vueAn(r),
          as: ctx.as,
          "as-child": ctx.asChild,
          present: vueAn(t).unmountOnHide.value || n
        }), {
          default: vueYt(() => [vueCt(ctx.$slots, `default`)]),
          _: 2
        }, 1040, [`as`, `as-child`, `present`]), [[playerW, vueAn(t).unmountOnHide.value || n]])]),
        _: 3
      }, 8, [`present`, `force-mount`])) : vueX(`v-if`, true);
    }
  }),
  V = vueJ({
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
    setup(props) {
      let propsAlias = props,
        n = A();
      return uiSwitchV(), (e, r) => (vueGt(), vueB(vueAn(uiSwitchJ), vueNt(propsAlias, {
        id: vueAn(n).titleId
      }), {
        default: vueYt(() => [vueCt(e.$slots, `default`)]),
        _: 3
      }, 16, [`id`]));
    }
  });
export { N as a, L as i, B as n, M as o, R as r, A as s, V as t };