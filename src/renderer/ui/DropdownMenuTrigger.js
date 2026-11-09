import { B as uiSwitchB, D as uiSwitchD, E as uiSwitchE, I as uiSwitchI, L as uiSwitchL, N as uiSwitchN, O as uiSwitchO, P as uiSwitchP, Q as uiSwitchQ, S as uiSwitchS, V as uiSwitchV, W as uiSwitchW, _ as uiSwitch, at as uiSwitchAt, b as m, j as uiSwitchJ, k as uiSwitchK, lt as uiSwitchLt, st as uiSwitchSt, v as y, vt as uiSwitchVt, w as ee, x as uiSwitchX, xt as uiSwitchXt, y as uiSwitchY, yt as uiSwitchYt, z as uiSwitchZ } from "./Switch.js";
import { An as vueAn, Ct as vueCt, Dn as vueDn, V as vueV, Wt as vueWt, Yt as vueYt, b as vueB, bn as vueBn, et as vueEt, fn as vueFn, gt as vueGt, j as vueJ, k as vueK, mt as vueMt, nt as vueNt, rt as vueRt, tr as vueTr, ut as vueUt, v as V } from "../chunks/vue-i18n.runtime.js";
import { E as playerE, T as playerT } from "../i18n/en-US-player.js";
import { a as PopperContentA, i as PopperContentI, n as PopperContentN, o as PopperContentO, t as PopperContentT } from "./PopperContent.js";
import { r as CollectionR, t as CollectionT } from "./Collection.js";
import { t as RovingFocusGroupT } from "./RovingFocusGroup.js";
var ce = [`INPUT`, `TEXTAREA`];
function J(event, t, n, r = {}) {
  if (!t || r.enableIgnoredElement && ce.includes(t.nodeName)) return null;
  let {
      arrowKeyOptions: i = `both`,
      attributeName: a = `[data-reka-collection-item]`,
      itemsArray: o = [],
      loop: s = true,
      dir: c = `ltr`,
      preventScroll: l = true,
      focus: u = false
    } = r,
    [d, f, p, m, h, g] = [event.key === `ArrowRight`, event.key === `ArrowLeft`, event.key === `ArrowUp`, event.key === `ArrowDown`, event.key === `Home`, event.key === `End`],
    _ = p || m,
    fallbackValue = d || f;
  if (!h && !g && (!_ && !fallbackValue || i === `vertical` && fallbackValue || i === `horizontal` && _)) return null;
  let y = n ? Array.from(n.querySelectorAll(a)) : o;
  if (!y.length) return null;
  l && event.preventDefault();
  let b = null;
  return fallbackValue || _ ? b = Y(y, t, {
    goForward: _ ? m : c === `ltr` ? d : f,
    loop: s
  }) : h ? b = y.at(0) || null : g && (b = y.at(-1) || null), u && b?.focus(), b;
}
function Y(items, t, n, r = items.includes(t) ? items.length : items.length + 1) {
  if (--r === 0) return null;
  let i = items.indexOf(t),
    resolvedValue;
  if (resolvedValue = i === -1 ? n.goForward ? 0 : items.length - 1 : n.goForward ? i + 1 : i - 1, !n.loop && (resolvedValue < 0 || resolvedValue >= items.length)) return null;
  let o = items[(resolvedValue + items.length) % items.length];
  return o ? o.hasAttribute(`disabled`) && o.getAttribute(`disabled`) !== `false` ? Y(items, o, n, r) : o : null;
}
var X = vueJ({
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
  setup(props) {
    let propsAlias = props;
    return (ctx, renderCache) => (vueGt(), vueB(vueAn(PopperContentI), vueTr(vueV(propsAlias)), {
      default: vueYt(() => [vueCt(ctx.$slots, `default`)]),
      _: 3
    }, 16));
  }
});
function le() {
  let e = vueBn(false);
  return vueUt(() => {
    uiSwitchQ(`keydown`, () => {
      e.value = true;
    }, {
      capture: true,
      passive: true
    }), uiSwitchQ([`pointerdown`, `pointermove`], () => {
      e.value = false;
    }, {
      capture: true,
      passive: true
    });
  }), e;
}
var ue = uiSwitchSt(le),
  [Z, de] = uiSwitchYt([`MenuRoot`, `MenuSub`], `MenuContext`),
  [Q, fe] = uiSwitchYt(`MenuRoot`),
  pe = vueJ({
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
    setup(props, {
      emit: emit
    }) {
      let propsAlias = props,
        emitAlias = emit,
        {
          modal: i,
          dir: a
        } = vueDn(propsAlias),
        o = CollectionR(a),
        s = uiSwitchAt(propsAlias, `open`, emitAlias),
        c = vueBn(),
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
      }), (e, t) => (vueGt(), vueB(vueAn(PopperContentA), null, {
        default: vueYt(() => [vueCt(e.$slots, `default`)]),
        _: 3
      }));
    }
  }),
  [me, he] = uiSwitchYt(`MenuContent`),
  ge = vueJ({
    __name: `MenuContentImpl`,
    props: vueEt({
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
      ...PopperContentT
    }),
    emits: [`escapeKeyDown`, `pointerDownOutside`, `focusOutside`, `interactOutside`, `entryFocus`, `openAutoFocus`, `closeAutoFocus`, `dismiss`],
    setup(event, {
      emit: emit
    }) {
      let eventAlias = event,
        emitAlias = emit,
        c = Z(),
        f = Q(),
        {
          trapFocus: p,
          disableOutsidePointerEvents: h,
          loop: _
        } = vueDn(eventAlias);
      PopperContentO(), uiSwitchW(h.value);
      let v = vueBn(``),
        x = vueBn(0),
        te = vueBn(0),
        S = vueBn(null),
        C = vueBn(`right`),
        w = vueBn(0),
        O = vueBn(null),
        N = vueBn(),
        {
          forwardRef: ne,
          currentElement: F
        } = uiSwitchV(),
        {
          handleTypeaheadSearch: L
        } = uiSwitchP(),
        R = vueBn();
      function z(e) {
        let t = J(e, R.value || uiSwitchVt(), F.value, {
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
      let V = vueBn(),
        H = vueBn();
      vueWt(R, e => {
        if (H.value && (e === undefined || e !== H.value.trigger.value)) {
          if (e === undefined) return;
          H.value.onOpenChange(false), H.value = undefined;
        }
      }), vueWt(F, e => {
        c.onContentChange(e);
      }), vueMt(() => {
        window.clearTimeout(x.value);
      });
      function U(e) {
        return C.value === S.value?.side && uiSwitchD(e, S.value?.area);
      }
      async function ie(e) {
        emitAlias(`openAutoFocus`, e), !e.defaultPrevented && (e.preventDefault(), F.value?.focus({
          preventScroll: true
        }));
      }
      function W(e) {
        if (e.defaultPrevented) return;
        let t = e.target,
          n = t.closest(`[data-reka-menu-content]`) === e.currentTarget,
          includesResult = [`input`, `textarea`].includes(t.tagName.toLowerCase()),
          fallbackValue = e.ctrlKey || e.altKey || e.metaKey,
          a = e.key.length === 1,
          o = J(e, uiSwitchVt(), F.value, {
            loop: _.value,
            arrowKeyOptions: `vertical`,
            dir: f?.dir.value,
            focus: true,
            attributeName: `[data-reka-collection-item]:not([data-disabled])`
          });
        if (o) return o?.focus();
        if (e.code === `Space`) return;
        let s = N.value?.getItems() ?? [];
        if (n && (e.key === `Tab` && f.modal.value && e.preventDefault(), !fallbackValue && a && !includesResult && L(e.key, s)), e.target !== F.value || !y.includes(e.key)) return;
        e.preventDefault();
        let c = [...s.map(item => item.ref)];
        m.includes(e.key) && c.reverse(), uiSwitchS(c);
      }
      function G(e) {
        e?.currentTarget?.contains?.(e.target) || (window.clearTimeout(x.value), v.value = ``);
      }
      function K(e) {
        if (!uiSwitchE(e)) return;
        let t = e.target,
          r = w.value !== e.clientX;
        if (e?.currentTarget?.contains(t) && r) {
          let t = e.clientX > w.value ? `right` : `left`;
          C.value = t, w.value = e.clientX;
        }
      }
      function q(e) {
        uiSwitchE(e) && V.value && V.value.focus();
      }
      return he({
        onItemEnter: e => !!U(e),
        onItemLeave: e => U(e) ? true : ([`INPUT`, `TEXTAREA`].includes(uiSwitchVt()?.tagName || ``) || F.value?.focus(), O.value = null, false),
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
      }), (e, renderCache) => (vueGt(), vueB(vueAn(uiSwitchO), {
        "as-child": ``,
        trapped: vueAn(p),
        onMountAutoFocus: ie,
        onUnmountAutoFocus: renderCache[7] ||= e => emitAlias(`closeAutoFocus`, e)
      }, {
        default: vueYt(() => [vueK(vueAn(uiSwitchK), {
          "as-child": ``,
          "disable-outside-pointer-events": vueAn(h),
          onEscapeKeyDown: renderCache[2] ||= e => emitAlias(`escapeKeyDown`, e),
          onPointerDownOutside: renderCache[3] ||= e => emitAlias(`pointerDownOutside`, e),
          onFocusOutside: renderCache[4] ||= e => emitAlias(`focusOutside`, e),
          onInteractOutside: renderCache[5] ||= e => emitAlias(`interactOutside`, e),
          onDismiss: renderCache[6] ||= e => emitAlias(`dismiss`)
        }, {
          default: vueYt(() => [vueK(vueAn(RovingFocusGroupT), {
            ref_key: `rovingFocusGroupRef`,
            ref: N,
            "current-tab-stop-id": O.value,
            "onUpdate:currentTabStopId": renderCache[0] ||= e => O.value = e,
            "as-child": ``,
            orientation: `vertical`,
            dir: vueAn(f).dir.value,
            loop: vueAn(_),
            onEntryFocus: renderCache[1] ||= e => {
              emitAlias(`entryFocus`, e), vueAn(f).isUsingKeyboardRef.value || e.preventDefault();
            }
          }, {
            default: vueYt(() => [vueK(vueAn(PopperContentN), {
              ref: vueAn(ne),
              role: `menu`,
              as: e.as,
              "as-child": e.asChild,
              "aria-orientation": `vertical`,
              "data-reka-menu-content": ``,
              "data-state": vueAn(ee)(vueAn(c).open.value),
              dir: vueAn(f).dir.value,
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
              default: vueYt(() => [vueCt(e.$slots, `default`)]),
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
  _e = vueJ({
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
    setup(event) {
      let eventAlias = event,
        r = me(),
        {
          forwardRef: i,
          currentElement: a
        } = uiSwitchV(),
        {
          CollectionItem: o
        } = CollectionT(),
        s = vueBn(false),
        c = V(() => s.value || a.value != null && r.highlightedElement.value === a.value);
      async function l(e) {
        if (!e.defaultPrevented && uiSwitchE(e)) {
          if (eventAlias.disabled) r.onItemLeave(e);else if (!r.onItemEnter(e)) {
            let t = e.currentTarget;
            r.highlightedElement.value = t, [`INPUT`, `TEXTAREA`].includes(uiSwitchVt()?.tagName || ``) || t.focus({
              preventScroll: true
            });
          }
        }
      }
      async function d(e) {
        await vueRt(), !e.defaultPrevented && uiSwitchE(e) && r.highlightedElement.value === a.value && !r.onItemLeave(e) && r.highlightedElement.value === a.value && (r.highlightedElement.value = undefined);
      }
      return (ctx, renderCache) => (vueGt(), vueB(vueAn(o), {
        value: {
          textValue: ctx.textValue
        }
      }, {
        default: vueYt(() => [vueK(vueAn(uiSwitchJ), vueNt({
          ref: vueAn(i),
          role: `menuitem`,
          tabindex: `-1`
        }, ctx.$attrs, {
          as: ctx.as,
          "as-child": ctx.asChild,
          "aria-disabled": ctx.disabled || undefined,
          "data-disabled": ctx.disabled ? `` : undefined,
          "data-highlighted": c.value ? `` : undefined,
          onPointermove: l,
          onPointerleave: d,
          onFocus: renderCache[0] ||= async t => {
            await vueRt(), !(t.defaultPrevented || ctx.disabled) && (s.value = true, vueAn(r).highlightedElement.value = t.currentTarget);
          },
          onBlur: renderCache[1] ||= async e => {
            await vueRt(), !e.defaultPrevented && (s.value = false);
          }
        }), {
          default: vueYt(() => [vueCt(ctx.$slots, `default`)]),
          _: 3
        }, 16, [`as`, `as-child`, `aria-disabled`, `data-disabled`, `data-highlighted`])]),
        _: 3
      }, 8, [`value`]));
    }
  }),
  ve = vueJ({
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
    setup(event, {
      emit: emit
    }) {
      let eventAlias = event,
        emitAlias = emit,
        {
          forwardRef: i,
          currentElement: a
        } = uiSwitchV(),
        o = Q(),
        s = me(),
        c = vueBn(false);
      async function l() {
        let e = a.value;
        if (!eventAlias.disabled && e) {
          let customEvent = new CustomEvent(uiSwitchY, {
            bubbles: true,
            cancelable: true
          });
          emitAlias(`select`, customEvent), await vueRt(), customEvent.defaultPrevented ? c.value = false : o.onClose();
        }
      }
      return (ctx, renderCache) => (vueGt(), vueB(_e, vueNt(eventAlias, {
        ref: vueAn(i),
        onClick: l,
        onPointerdown: renderCache[0] ||= () => {
          c.value = true;
        },
        onPointerup: renderCache[1] ||= async e => {
          await vueRt(), !e.defaultPrevented && (c.value || e.currentTarget?.click());
        },
        onKeydown: renderCache[2] ||= async t => {
          let n = vueAn(s).searchRef.value !== ``;
          ctx.disabled || n && t.key === ` ` || vueAn(uiSwitchX).includes(t.key) && (t.currentTarget?.click(), t.preventDefault());
        }
      }), {
        default: vueYt(() => [vueCt(ctx.$slots, `default`)]),
        _: 3
      }, 16));
    }
  }),
  ye = vueJ({
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
    setup(props, {
      emit: emit
    }) {
      let propsAlias = props,
        emitAlias = emit,
        a = uiSwitchZ(propsAlias, emitAlias),
        o = Z(),
        {
          forwardRef: s,
          currentElement: c
        } = uiSwitchV();
      return uiSwitchL(c), (e, t) => (vueGt(), vueB(ge, vueNt(vueAn(a), {
        ref: vueAn(s),
        "trap-focus": vueAn(o).open.value,
        "disable-outside-pointer-events": vueAn(o).open.value,
        "disable-outside-scroll": true,
        onDismiss: t[0] ||= e => vueAn(o).onOpenChange(false),
        onFocusOutside: t[1] ||= playerE(e => emitAlias(`focusOutside`, e), [`prevent`])
      }), {
        default: vueYt(() => [vueCt(e.$slots, `default`)]),
        _: 3
      }, 16, [`trap-focus`, `disable-outside-pointer-events`]));
    }
  }),
  be = vueJ({
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
    setup(props, {
      emit: emit
    }) {
      let n = uiSwitchZ(props, emit),
        r = Z();
      return (ctx, renderCache) => (vueGt(), vueB(ge, vueNt(vueAn(n), {
        "trap-focus": false,
        "disable-outside-pointer-events": false,
        "disable-outside-scroll": false,
        onDismiss: renderCache[0] ||= e => vueAn(r).onOpenChange(false)
      }), {
        default: vueYt(() => [vueCt(ctx.$slots, `default`)]),
        _: 3
      }, 16));
    }
  }),
  $ = vueJ({
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
    setup(props, {
      emit: emit
    }) {
      let n = uiSwitchZ(props, emit),
        r = Z(),
        i = Q();
      return (ctx, renderCache) => (vueGt(), vueB(vueAn(uiSwitchN), {
        present: ctx.forceMount || vueAn(r).open.value
      }, {
        default: vueYt(() => [vueAn(i).modal.value ? (vueGt(), vueB(ye, vueTr(vueNt({
          key: 0
        }, {
          ...ctx.$attrs,
          ...vueAn(n)
        })), {
          default: vueYt(() => [vueCt(ctx.$slots, `default`)]),
          _: 3
        }, 16)) : (vueGt(), vueB(be, vueTr(vueNt({
          key: 1
        }, {
          ...ctx.$attrs,
          ...vueAn(n)
        })), {
          default: vueYt(() => [vueCt(ctx.$slots, `default`)]),
          _: 3
        }, 16))]),
        _: 3
      }, 8, [`present`]));
    }
  }),
  xe = vueJ({
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
    setup(props) {
      let propsAlias = props;
      return (ctx, renderCache) => (vueGt(), vueB(vueAn(uiSwitch), vueTr(vueV(propsAlias)), {
        default: vueYt(() => [vueCt(ctx.$slots, `default`)]),
        _: 3
      }, 16));
    }
  }),
  [Se, Ce] = uiSwitchYt(`DropdownMenuRoot`),
  we = vueJ({
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
    setup(props, {
      emit: emit
    }) {
      let propsAlias = props,
        emitAlias = emit;
      uiSwitchV();
      let i = uiSwitchAt(propsAlias, `open`, emitAlias, {
          defaultValue: propsAlias.defaultOpen,
          passive: propsAlias.open === undefined
        }),
        a = vueBn(),
        {
          modal: o,
          dir: s
        } = vueDn(propsAlias),
        c = CollectionR(s);
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
      }), (e, t) => (vueGt(), vueB(vueAn(pe), {
        open: vueAn(i),
        "onUpdate:open": t[0] ||= e => vueFn(i) ? i.value = e : null,
        dir: vueAn(c),
        modal: vueAn(o)
      }, {
        default: vueYt(() => [vueCt(e.$slots, `default`, {
          open: vueAn(i)
        })]),
        _: 3
      }, 8, [`open`, `dir`, `modal`]));
    }
  }),
  Te = vueJ({
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
    setup(event, {
      emit: emit
    }) {
      let n = uiSwitchZ(event, emit);
      uiSwitchV();
      let i = Se(),
        a = vueBn(false);
      function o(e) {
        e.defaultPrevented || (a.value || setTimeout(() => {
          i.triggerElement.value?.focus();
        }, 0), a.value = false, e.preventDefault());
      }
      return i.contentId ||= uiSwitchI(undefined, `reka-dropdown-menu-content`), (e, t) => (vueGt(), vueB(vueAn($), vueNt(vueAn(n), {
        id: vueAn(i).contentId,
        "aria-labelledby": vueAn(i)?.triggerId,
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
            fallbackValue = originalEvent.button === 2 || n;
          (!vueAn(i).modal.value || fallbackValue) && (a.value = true), vueAn(i).triggerElement.value?.contains(e.target) && e.preventDefault();
        }
      }), {
        default: vueYt(() => [vueCt(e.$slots, `default`)]),
        _: 3
      }, 16, [`id`, `aria-labelledby`]));
    }
  }),
  Ee = vueJ({
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
    setup(props) {
      let propsAlias = props;
      return (ctx, renderCache) => (vueGt(), vueB(vueAn(xe), vueTr(vueV(propsAlias)), {
        default: vueYt(() => [vueCt(ctx.$slots, `default`)]),
        _: 3
      }, 16));
    }
  }),
  De = vueJ({
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
    setup(props) {
      let propsAlias = props,
        n = Se(),
        {
          forwardRef: i,
          currentElement: a
        } = uiSwitchV();
      return vueUt(() => {
        n.triggerElement = a;
      }), n.triggerId ||= uiSwitchI(undefined, `reka-dropdown-menu-trigger`), (e, r) => (vueGt(), vueB(vueAn(X), {
        "as-child": ``
      }, {
        default: vueYt(() => [vueK(vueAn(uiSwitchJ), {
          id: vueAn(n).triggerId,
          ref: vueAn(i),
          type: e.as === `button` ? `button` : undefined,
          "as-child": propsAlias.asChild,
          as: e.as,
          "aria-haspopup": `menu`,
          "aria-expanded": vueAn(n).open.value,
          "aria-controls": vueAn(n).open.value ? vueAn(n).contentId : undefined,
          "data-disabled": e.disabled ? `` : undefined,
          disabled: e.disabled,
          "data-state": vueAn(n).open.value ? `open` : `closed`,
          onClick: r[0] ||= async event => {
            !e.disabled && event.button === 0 && event.ctrlKey === false && (vueAn(n)?.onOpenToggle(), await vueRt(), vueAn(n).open.value && event.preventDefault());
          },
          onKeydown: r[1] ||= playerT(event => {
            e.disabled || ([`Enter`, ` `].includes(event.key) && vueAn(n).onOpenToggle(), event.key === `ArrowDown` && vueAn(n).onOpenChange(true), [`Enter`, ` `, `ArrowDown`].includes(event.key) && event.preventDefault());
          }, [`enter`, `space`, `arrow-down`])
        }, {
          default: vueYt(() => [vueCt(e.$slots, `default`)]),
          _: 3
        }, 8, [`id`, `type`, `as-child`, `as`, `aria-expanded`, `aria-controls`, `data-disabled`, `disabled`, `data-state`])]),
        _: 3
      }));
    }
  }),
  Oe = vueJ({
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
    setup(props, {
      emit: emit
    }) {
      let n = uiSwitchZ(props, emit);
      return (ctx, renderCache) => (vueGt(), vueB(vueAn(we), vueNt({
        "data-slot": `dropdown-menu`
      }, vueAn(n)), {
        default: vueYt(t => [vueCt(ctx.$slots, `default`, vueTr(vueV(t)))]),
        _: 3
      }, 16));
    }
  }),
  ke = vueJ({
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
    setup(props, {
      emit: emit
    }) {
      let propsAlias = props,
        emitAlias = emit,
        i = uiSwitchLt(propsAlias, `class`),
        a = uiSwitchZ(i, emitAlias);
      return (ctx, renderCache) => (vueGt(), vueB(vueAn(Ee), null, {
        default: vueYt(() => [vueK(vueAn(Te), vueNt({
          "data-slot": `dropdown-menu-content`
        }, {
          ...ctx.$attrs,
          ...vueAn(a)
        }, {
          class: vueAn(uiSwitchXt)(`data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 ring-foreground/10 bg-popover text-popover-foreground min-w-32 rounded-lg p-1 shadow-md ring-1 duration-100 cn-menu-translucent z-50 max-h-(--reka-dropdown-menu-content-available-height) w-(--reka-dropdown-menu-trigger-width) origin-(--reka-dropdown-menu-content-transform-origin) overflow-x-hidden overflow-y-auto data-[state=closed]:overflow-hidden`, propsAlias.class),
          style: {
            "-webkit-app-region": `no-drag`,
            "pointer-events": `auto`
          }
        }), {
          default: vueYt(() => [vueCt(ctx.$slots, `default`)]),
          _: 3
        }, 16, [`class`])]),
        _: 3
      }));
    }
  }),
  Ae = vueJ({
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
    setup(props) {
      let n = uiSwitchB(props);
      return (ctx, renderCache) => (vueGt(), vueB(vueAn(De), vueNt({
        "data-slot": `dropdown-menu-trigger`
      }, vueAn(n)), {
        default: vueYt(() => [vueCt(ctx.$slots, `default`)]),
        _: 3
      }, 16));
    }
  });
export { $ as a, X as c, xe as i, J as l, ke as n, ve as o, Oe as r, pe as s, Ae as t };