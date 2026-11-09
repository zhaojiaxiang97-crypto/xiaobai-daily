import { A as uiSwitchA, B as uiSwitchB, Q as uiSwitchQ, at as uiSwitchAt, j as uiSwitchJ, lt as uiSwitchLt, n as uiSwitchN, xt as uiSwitchXt, yt as uiSwitchYt, z as uiSwitchZ } from "../ui/Switch.js";
import { $n as vueN, An as vueAn, Cn as vueCn, Ct as vueCt, Dn as vueDn, O as vueO, S as vueS, St as vueSt, V as vueV, Wt as vueWt, Yt as vueYt, b as vueB, bn as vueBn, c as vueC, gt as vueGt, j as vueJ, k as vueK, n as D, nt as vueNt, rr as vueRr, rt as vueRt, tr as vueTr, ut as vueUt, v as M, x as vueX, y as vueY } from "./vue-i18n.runtime.js";
import { T as playerT } from "../i18n/en-US-player.js";
import { r as lucideR } from "../ui/icons/lucide-icons.js";
import { u as i18nU } from "../i18n/i18n-helper.js";
import { t as checkT } from "./check.js";
import { s as PopperContentS } from "../ui/PopperContent.js";
import { A as popoverA, D as popoverD, E as popoverE, O as popoverO, T as popoverT, _ as popover, a as oe, b as popoverB, c as popoverC, f as popoverF, g as popoverG, h as popoverH, k as popoverK, m as popoverM, n as popoverN, p as popoverP, r as popoverR, s as popoverS, t as K, v as popoverV, w as popoverW, x as popoverX, y as popoverY } from "../ui/PopoverTrigger.js";
import { r as CollectionR } from "../ui/Collection.js";
var X = lucideR(`arrow-up-right`, [[`path`, {
    d: `M7 7h10v10`,
    key: `1tivn9`
  }], [`path`, {
    d: `M7 17 17 7`,
    key: `1vkiza`
  }]]),
  Z = lucideR(`calendar-days`, [[`path`, {
    d: `M8 2v4`,
    key: `1cmpym`
  }], [`path`, {
    d: `M16 2v4`,
    key: `4m81vk`
  }], [`rect`, {
    width: `18`,
    height: `18`,
    x: `3`,
    y: `4`,
    rx: `2`,
    key: `1hopcy`
  }], [`path`, {
    d: `M3 10h18`,
    key: `8toen8`
  }], [`path`, {
    d: `M8 14h.01`,
    key: `6423bh`
  }], [`path`, {
    d: `M12 14h.01`,
    key: `1etili`
  }], [`path`, {
    d: `M16 14h.01`,
    key: `1gbofw`
  }], [`path`, {
    d: `M8 18h.01`,
    key: `lrp35t`
  }], [`path`, {
    d: `M12 18h.01`,
    key: `mhygvu`
  }], [`path`, {
    d: `M16 18h.01`,
    key: `kzsmim`
  }]]),
  he = lucideR(`hard-drive`, [[`path`, {
    d: `M10 16h.01`,
    key: `1bzywj`
  }], [`path`, {
    d: `M2.212 11.577a2 2 0 0 0-.212.896V18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5.527a2 2 0 0 0-.212-.896L18.55 5.11A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z`,
    key: `18tbho`
  }], [`path`, {
    d: `M21.946 12.013H2.054`,
    key: `zqlbp7`
  }], [`path`, {
    d: `M6 16h.01`,
    key: `1pmjb7`
  }]]);
function ge(e) {
  let t = M(() => e.start.value ? !!e.isDateDisabled(e.start.value) : false),
    n = M(() => e.end.value ? !!e.isDateDisabled(e.end.value) : false),
    r = M(() => !!(t.value || n.value || e.start.value && e.end.value && popover(e.end.value, e.start.value))),
    handler = t => e.start.value ? popoverK(e.start.value, t) : false,
    a = t => e.end.value ? popoverK(e.end.value, t) : false,
    o = t => e.start.value && popoverK(e.start.value, t) || e.end.value && popoverK(e.end.value, t) ? true : e.end.value && e.start.value ? popoverV(t, e.start.value, e.end.value) : false,
    s = t => {
      if (e.isDateDisabled(t)) return true;
      if (e.maximumDays?.value) {
        if (e.start.value && e.end.value) {
          if (e.fixedDate.value) {
            let n = popoverF(e.start.value, e.end.value).length;
            if (n <= e.maximumDays.value) {
              let r = e.maximumDays.value - n - 1,
                subtract = e.start.value.subtract({
                  days: r
                }),
                a = e.end.value.add({
                  days: r
                });
              return !popoverV(t, subtract, a);
            }
          }
          return false;
        }
        if (e.start.value) {
          let n = e.start.value.add({
              days: e.maximumDays.value
            }),
            subtract = e.start.value.subtract({
              days: e.maximumDays.value
            });
          return !popoverV(t, subtract, n);
        }
      }
      return false;
    },
    c = t => !!e.isDateHighlightable?.(t),
    l = M(() => {
      if (e.start.value && e.end.value && !e.fixedDate.value || !e.start.value || !e.focusedValue.value) return null;
      let t = popover(e.start.value, e.focusedValue.value),
        n = t ? e.start.value : e.focusedValue.value,
        r = t ? e.focusedValue.value : e.start.value;
      if (popoverK(n, r)) return {
        start: n,
        end: r
      };
      if (e.maximumDays?.value && !e.end.value) {
        let t = e.maximumDays.value,
          n = e.start.value,
          r = e.focusedValue.value;
        return popover(r, n) ? {
          start: n.subtract({
            days: t - 1
          }),
          end: n
        } : {
          start: n,
          end: n.add({
            days: t - 1
          })
        };
      }
      return popoverH(n, r, e.allowNonContiguousRanges.value ? () => false : e.isDateUnavailable, s, e.isDateHighlightable) ? {
        start: n,
        end: r
      } : null;
    }),
    u = e => !l.value || !l.value.start ? false : popoverK(l.value.start, e),
    d = e => !l.value || !l.value.end ? false : popoverK(l.value.end, e),
    f = M(() => !!(e.start.value || e.end.value)),
    p = M(() => !!(e.start.value && e.isDateDisabled(e.start.value))),
    m = M(() => !!(e.end.value && e.isDateDisabled(e.end.value)));
  return {
    isInvalid: r,
    isSelected: o,
    isDateHighlightable: c,
    highlightedRange: l,
    isSelectionStart: handler,
    isSelectionEnd: a,
    isHighlightedStart: u,
    isHighlightedEnd: d,
    isDateDisabled: s,
    hasSelectedDate: f,
    isSelectedDisabled: M(() => {
      let t = !!e.start.value,
        n = !!e.end.value;
      return !t && !n ? false : t && n ? p.value && m.value : t && p.value || n && m.value;
    }),
    selectedFocusableDate: M(() => {
      if (e.start.value && !p.value) return e.start.value;
      if (e.end.value && !m.value) return e.end.value;
    })
  };
}
var _e = {
    style: {
      border: `0px`,
      clip: `rect(0px, 0px, 0px, 0px)`,
      "clip-path": `inset(50%)`,
      height: `1px`,
      margin: `-1px`,
      overflow: `hidden`,
      padding: `0px`,
      position: `absolute`,
      "white-space": `nowrap`,
      width: `1px`
    }
  },
  ve = {
    role: `heading`,
    "aria-level": `2`
  },
  [Q, ye] = uiSwitchYt(`RangeCalendarRoot`),
  be = vueJ({
    __name: `RangeCalendarRoot`,
    props: {
      defaultPlaceholder: {
        type: null,
        required: false
      },
      defaultValue: {
        type: Object,
        required: false,
        default: () => ({
          start: undefined,
          end: undefined
        })
      },
      modelValue: {
        type: [Object, null],
        required: false
      },
      placeholder: {
        type: null,
        required: false,
        default: undefined
      },
      allowNonContiguousRanges: {
        type: Boolean,
        required: false,
        default: false
      },
      pagedNavigation: {
        type: Boolean,
        required: false,
        default: false
      },
      preventDeselect: {
        type: Boolean,
        required: false,
        default: false
      },
      maximumDays: {
        type: Number,
        required: false,
        default: undefined
      },
      weekStartsOn: {
        type: Number,
        required: false
      },
      weekdayFormat: {
        type: String,
        required: false,
        default: `narrow`
      },
      calendarLabel: {
        type: String,
        required: false
      },
      fixedWeeks: {
        type: Boolean,
        required: false,
        default: false
      },
      maxValue: {
        type: null,
        required: false
      },
      minValue: {
        type: null,
        required: false
      },
      locale: {
        type: String,
        required: false
      },
      numberOfMonths: {
        type: Number,
        required: false,
        default: 1
      },
      disabled: {
        type: Boolean,
        required: false,
        default: false
      },
      readonly: {
        type: Boolean,
        required: false,
        default: false
      },
      initialFocus: {
        type: Boolean,
        required: false,
        default: false
      },
      isDateDisabled: {
        type: Function,
        required: false,
        default: undefined
      },
      isDateUnavailable: {
        type: Function,
        required: false,
        default: undefined
      },
      isDateHighlightable: {
        type: Function,
        required: false,
        default: undefined
      },
      dir: {
        type: String,
        required: false
      },
      nextPage: {
        type: Function,
        required: false
      },
      prevPage: {
        type: Function,
        required: false
      },
      disableDaysOutsideCurrentView: {
        type: Boolean,
        required: false,
        default: false
      },
      fixedDate: {
        type: String,
        required: false
      },
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
    emits: [`update:modelValue`, `update:validModelValue`, `update:placeholder`, `update:startValue`],
    setup(props, {
      emit: emit
    }) {
      let propsAlias = props,
        emitAlias = emit,
        {
          disabled: c,
          readonly: l,
          initialFocus: u,
          pagedNavigation: f,
          weekdayFormat: h,
          fixedWeeks: g,
          numberOfMonths: _,
          preventDeselect: v,
          isDateUnavailable: C,
          isDateHighlightable: T,
          isDateDisabled: E,
          calendarLabel: D,
          maxValue: O,
          minValue: A,
          dir: j,
          locale: N,
          nextPage: te,
          prevPage: F,
          allowNonContiguousRanges: ne,
          disableDaysOutsideCurrentView: re,
          fixedDate: ie,
          maximumDays: ae
        } = vueDn(propsAlias),
        {
          primitiveElement: I,
          currentElement: L
        } = uiSwitchA(),
        R = CollectionR(j),
        V = popoverS(N),
        H = M(() => propsAlias.weekStartsOn ?? popoverP(V.value)),
        le = vueBn(),
        U = vueBn(),
        W = vueBn(false),
        G = uiSwitchAt(propsAlias, `modelValue`, emitAlias, {
          defaultValue: propsAlias.defaultValue ?? {
            start: undefined,
            end: undefined
          },
          passive: propsAlias.modelValue === undefined
        }),
        handler = e => e ?? {
          start: undefined,
          end: undefined
        },
        q = M(() => handler(G.value)),
        J = vueBn(handler(G.value));
      vueWt(J, e => {
        emitAlias(`update:validModelValue`, e);
      });
      let pe = popoverG({
          defaultPlaceholder: propsAlias.placeholder,
          defaultValue: handler(G.value).start,
          locale: propsAlias.locale
        }),
        Y = vueBn(handler(G.value).start),
        X = vueBn(handler(G.value).end),
        Z = uiSwitchAt(propsAlias, `placeholder`, emitAlias, {
          defaultValue: propsAlias.defaultPlaceholder ?? pe.copy(),
          passive: propsAlias.placeholder === undefined
        });
      function he(e) {
        Z.value = e.copy();
      }
      let {
          fullCalendarLabel: Q,
          headingValue: be,
          isDateDisabled: xe,
          isDateUnavailable: Se,
          isNextButtonDisabled: Ce,
          isPrevButtonDisabled: we,
          grid: Te,
          weekdays: Ee,
          isOutsideVisibleView: De,
          nextPage: Oe,
          prevPage: ke,
          formatter: Ae,
          isPlaceholderFocusable: je,
          firstFocusableDate: Me
        } = oe({
          locale: V,
          placeholder: Z,
          weekStartsOn: H,
          fixedWeeks: g,
          numberOfMonths: _,
          minValue: A,
          maxValue: O,
          disabled: c,
          weekdayFormat: h,
          pagedNavigation: f,
          isDateDisabled: E.value,
          isDateUnavailable: C.value,
          calendarLabel: D,
          nextPage: te,
          prevPage: F
        }),
        {
          isInvalid: Ne,
          isSelected: Pe,
          isDateHighlightable: Fe,
          highlightedRange: Ie,
          isSelectionStart: Le,
          isSelectionEnd: Re,
          isHighlightedStart: ze,
          isHighlightedEnd: Be,
          isDateDisabled: Ve,
          hasSelectedDate: He,
          isSelectedDisabled: Ue,
          selectedFocusableDate: We
        } = ge({
          start: Y,
          end: X,
          isDateDisabled: xe,
          isDateUnavailable: Se,
          isDateHighlightable: T.value,
          focusedValue: U,
          allowNonContiguousRanges: ne,
          fixedDate: ie,
          maximumDays: ae
        });
      vueWt(G, e => {
        let t = handler(e);
        !t.start && !Y.value || t.start && Y.value && popoverT(t.start, Y.value) || (Y.value = t.start?.copy?.()), !t.end && !X.value || t.end && X.value && popoverT(t.end, X.value) || (X.value = t.end?.copy?.());
      }), vueWt(Y, e => {
        e && !popoverT(e, Z.value) && he(e), emitAlias(`update:startValue`, e);
      }), vueWt([Y, X], ([e, t]) => {
        let n = G.value;
        if (!(n && n.start && n.end && e && t && popoverT(n.start, e) && popoverT(n.end, t))) {
          if (W.value = true, t && e) {
            let n = popover(t, e) ? {
              start: t.copy(),
              end: e.copy()
            } : {
              start: e.copy(),
              end: t.copy()
            };
            G.value = {
              start: n.start,
              end: n.end
            }, W.value = false, J.value = {
              start: n.start.copy(),
              end: n.end.copy()
            };
          } else G.value = e ? {
            start: e.copy(),
            end: undefined
          } : {
            start: t?.copy(),
            end: undefined
          };
        }
      });
      let Ge = popoverC();
      return uiSwitchQ(L, `keydown`, event => {
        event.key === Ge.ESCAPE && W.value && (Y.value = J.value.start?.copy(), X.value = J.value.end?.copy());
      }), ye({
        isDateUnavailable: Se,
        isDateHighlightable: Fe,
        startValue: Y,
        endValue: X,
        formatter: Ae,
        modelValue: q,
        placeholder: Z,
        disabled: c,
        initialFocus: u,
        pagedNavigation: f,
        grid: Te,
        weekDays: Ee,
        weekStartsOn: H,
        weekdayFormat: h,
        fixedWeeks: g,
        numberOfMonths: _,
        readonly: l,
        preventDeselect: v,
        fullCalendarLabel: Q,
        headingValue: be,
        isInvalid: Ne,
        isDateDisabled: Ve,
        allowNonContiguousRanges: ne,
        highlightedRange: Ie,
        focusedValue: U,
        lastPressedDateValue: le,
        isSelected: Pe,
        isSelectionEnd: Re,
        isSelectionStart: Le,
        isNextButtonDisabled: Ce,
        isPrevButtonDisabled: we,
        isOutsideVisibleView: De,
        nextPage: Oe,
        prevPage: ke,
        parentElement: L,
        onPlaceholderChange: he,
        locale: V,
        dir: R,
        isHighlightedStart: ze,
        isHighlightedEnd: Be,
        disableDaysOutsideCurrentView: re,
        fixedDate: ie,
        maximumDays: ae,
        minValue: A,
        maxValue: O,
        isPlaceholderFocusable: je,
        firstFocusableDate: Me,
        hasSelectedDate: He,
        isSelectedDisabled: Ue,
        selectedFocusableDate: We
      }), vueUt(() => {
        u.value && popoverM(L.value);
      }), (e, t) => (vueGt(), vueB(vueAn(uiSwitchJ), {
        ref_key: `primitiveElement`,
        ref: I,
        as: e.as,
        "as-child": e.asChild,
        "aria-label": vueAn(Q),
        "data-readonly": vueAn(l) ? `` : undefined,
        "data-disabled": vueAn(c) ? `` : undefined,
        "data-invalid": vueAn(Ne) ? `` : undefined,
        dir: vueAn(R)
      }, {
        default: vueYt(() => [vueY(`div`, _e, [vueY(`div`, ve, vueRr(vueAn(Q)), 1)]), vueCt(e.$slots, `default`, {
          date: vueAn(Z),
          grid: vueAn(Te),
          weekDays: vueAn(Ee),
          weekStartsOn: H.value,
          locale: vueAn(V),
          fixedWeeks: vueAn(g),
          modelValue: q.value
        })]),
        _: 3
      }, 8, [`as`, `as-child`, `aria-label`, `data-readonly`, `data-disabled`, `data-invalid`, `dir`]));
    }
  }),
  xe = vueJ({
    __name: `RangeCalendarCell`,
    props: {
      date: {
        type: null,
        required: true
      },
      asChild: {
        type: Boolean,
        required: false
      },
      as: {
        type: null,
        required: false,
        default: `td`
      }
    },
    setup(props) {
      let t = Q();
      return (ctx, renderCache) => (vueGt(), vueB(vueAn(uiSwitchJ), {
        as: ctx.as,
        "as-child": ctx.asChild,
        role: `gridcell`,
        "aria-selected": vueAn(t).isSelected(ctx.date) ? true : undefined,
        "aria-disabled": vueAn(t).isDateDisabled(ctx.date) || vueAn(t).isDateUnavailable?.(ctx.date) || vueAn(t).disableDaysOutsideCurrentView.value,
        "data-disabled": vueAn(t).isDateDisabled(ctx.date) || vueAn(t).disableDaysOutsideCurrentView.value ? `` : undefined
      }, {
        default: vueYt(() => [vueCt(ctx.$slots, `default`)]),
        _: 3
      }, 8, [`as`, `as-child`, `aria-selected`, `aria-disabled`, `data-disabled`]));
    }
  }),
  Se = vueJ({
    __name: `RangeCalendarCellTrigger`,
    props: {
      day: {
        type: null,
        required: true
      },
      month: {
        type: null,
        required: true
      },
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
        r = Q(),
        a = popoverC(),
        {
          primitiveElement: o,
          currentElement: s
        } = uiSwitchA(),
        c = M(() => r.formatter.custom(popoverB(propsAlias.day), {
          weekday: `long`,
          month: `long`,
          day: `numeric`,
          year: `numeric`
        })),
        l = M(() => r.isDateUnavailable?.(propsAlias.day) ?? false),
        u = M(() => r.isSelected(propsAlias.day)),
        f = M(() => r.isSelectionStart(propsAlias.day)),
        m = M(() => r.isSelectionEnd(propsAlias.day)),
        g = M(() => r.isHighlightedStart(propsAlias.day)),
        _ = M(() => r.isHighlightedEnd(propsAlias.day)),
        v = M(() => r.highlightedRange.value ? popoverY(propsAlias.day, r.highlightedRange.value.start, r.highlightedRange.value.end) : false),
        y = M(() => r.allowNonContiguousRanges.value),
        S = M(() => popoverW(propsAlias.day, popoverD())),
        C = M(() => !popoverE(propsAlias.day, propsAlias.month)),
        T = M(() => r.isOutsideVisibleView(propsAlias.day)),
        E = M(() => r.isDateDisabled(propsAlias.day) || r.disableDaysOutsideCurrentView.value && C.value),
        D = M(() => propsAlias.day.day.toLocaleString(r.locale.value)),
        O = M(() => C.value || E.value ? false : !r.disabled.value && r.isPlaceholderFocusable.value && popoverK(propsAlias.day, r.placeholder.value) ? true : !r.disabled.value && r.selectedFocusableDate.value && !r.isPlaceholderFocusable.value ? popoverK(propsAlias.day, r.selectedFocusableDate.value) : !r.disabled.value && (!r.hasSelectedDate.value || r.isSelectedDisabled.value) && !r.isPlaceholderFocusable.value ? r.firstFocusableDate.value && popoverK(propsAlias.day, r.firstFocusableDate.value) : false);
      function j(event, t) {
        if (!r.readonly.value && !(r.isDateDisabled(t) || r.isDateUnavailable?.(t))) {
          if (r.startValue.value && r.highlightedRange.value === null) {
            if (popoverK(t, r.startValue.value) && !r.preventDeselect.value && !r.endValue.value) {
              r.startValue.value = undefined, r.onPlaceholderChange(t), r.lastPressedDateValue.value = t.copy();
              return;
            }
            if (!r.endValue.value) {
              event.preventDefault(), r.lastPressedDateValue.value && popoverK(r.lastPressedDateValue.value, t) && (r.startValue.value = t.copy()), r.lastPressedDateValue.value = t.copy();
              return;
            }
          }
          if (r.lastPressedDateValue.value = t.copy(), r.startValue.value && r.endValue.value && popoverK(r.startValue.value, r.endValue.value) && popoverK(r.startValue.value, t) && !r.preventDeselect.value) {
            r.startValue.value = undefined, r.endValue.value = undefined, r.onPlaceholderChange(t);
            return;
          }
          r.startValue.value ? r.endValue.value ? r.endValue.value && r.startValue.value && (r.fixedDate.value ? r.fixedDate.value === `start` ? t.compare(r.startValue.value) < 0 ? r.startValue.value = t.copy() : r.endValue.value = t.copy() : r.fixedDate.value === `end` && (t.compare(r.endValue.value) > 0 ? r.endValue.value = t.copy() : r.startValue.value = t.copy()) : (r.endValue.value = undefined, r.startValue.value = t.copy())) : r.endValue.value = t.copy() : r.startValue.value = t.copy();
        }
      }
      function ee(e) {
        E.value || j(e, propsAlias.day);
      }
      function N() {
        E.value || r.isDateUnavailable?.(propsAlias.day) || (r.focusedValue.value = propsAlias.day.copy());
      }
      function P(event) {
        if (E.value || (event.code === a.ENTER || event.code === a.SPACE_CODE) && (event.ctrlKey || event.metaKey || event.altKey)) return;
        event.preventDefault(), event.stopPropagation();
        let t = r.parentElement.value,
          i = r.dir.value === `rtl` ? -1 : 1;
        switch (event.code) {
          case a.ARROW_RIGHT:
            o(propsAlias.day, i);
            break;
          case a.ARROW_LEFT:
            o(propsAlias.day, -i);
            break;
          case a.ARROW_UP:
            o(propsAlias.day, -7);
            break;
          case a.ARROW_DOWN:
            o(propsAlias.day, 7);
            break;
          case a.ENTER:
          case a.SPACE_CODE:
            j(event, propsAlias.day);
        }
        function o(e, n) {
          let i = e.add({
            days: n
          });
          if (r.minValue.value && i.compare(r.minValue.value) < 0 || r.maxValue.value && i.compare(r.maxValue.value) > 0) return;
          let selector = t.querySelector(`[data-value='${i.toString()}']:not([data-outside-view])`);
          if (!selector) {
            if (n > 0) {
              if (r.isNextButtonDisabled()) return;
              r.nextPage();
            } else {
              if (r.isPrevButtonDisabled()) return;
              r.prevPage();
            }
            vueRt(() => {
              o(e, n);
            });
            return;
          }
          if (selector && selector.hasAttribute(`data-disabled`)) return o(i, n);
          r.onPlaceholderChange(i), selector?.focus();
        }
      }
      return (ctx, renderCache) => (vueGt(), vueB(vueAn(uiSwitchJ), {
        ref_key: `primitiveElement`,
        ref: o,
        as: ctx.as,
        "as-child": ctx.asChild,
        role: `button`,
        "aria-label": c.value,
        "data-reka-calendar-cell-trigger": ``,
        "aria-pressed": u.value && (y.value || !l.value) ? true : undefined,
        "aria-disabled": E.value || l.value ? true : undefined,
        "data-highlighted": v.value && (y.value || !l.value) ? `` : undefined,
        "data-selection-start": f.value ? true : undefined,
        "data-selection-end": m.value ? true : undefined,
        "data-highlighted-start": g.value ? true : undefined,
        "data-highlighted-end": _.value ? true : undefined,
        "data-selected": u.value && (y.value || !l.value) ? true : undefined,
        "data-outside-visible-view": T.value ? `` : undefined,
        "data-value": ctx.day.toString(),
        "data-disabled": E.value ? `` : undefined,
        "data-unavailable": l.value ? `` : undefined,
        "data-today": S.value ? `` : undefined,
        "data-outside-view": C.value ? `` : undefined,
        "data-focused": O.value ? `` : undefined,
        tabindex: O.value ? 0 : C.value || E.value ? undefined : -1,
        onClick: ee,
        onFocusin: N,
        onMouseenter: N,
        onKeydown: playerT(P, [`up`, `down`, `left`, `right`, `enter`, `space`])
      }, {
        default: vueYt(() => [vueCt(ctx.$slots, `default`, {
          dayValue: D.value,
          disabled: E.value,
          today: S.value,
          selected: u.value,
          outsideView: C.value,
          outsideVisibleView: T.value,
          unavailable: l.value,
          highlighted: v.value && (y.value || !l.value),
          highlightedStart: g.value,
          highlightedEnd: _.value,
          selectionStart: f.value,
          selectionEnd: m.value
        }, () => [vueO(vueRr(D.value), 1)])]),
        _: 3
      }, 8, [`as`, `as-child`, `aria-label`, `aria-pressed`, `aria-disabled`, `data-highlighted`, `data-selection-start`, `data-selection-end`, `data-highlighted-start`, `data-highlighted-end`, `data-selected`, `data-outside-visible-view`, `data-value`, `data-disabled`, `data-unavailable`, `data-today`, `data-outside-view`, `data-focused`, `tabindex`]));
    }
  }),
  Ce = vueJ({
    __name: `RangeCalendarGrid`,
    props: {
      asChild: {
        type: Boolean,
        required: false
      },
      as: {
        type: null,
        required: false,
        default: `table`
      }
    },
    setup(props) {
      let propsAlias = props,
        n = Q(),
        r = M(() => n.disabled.value ? true : undefined),
        a = M(() => n.readonly.value ? true : undefined);
      return (ctx, renderCache) => (vueGt(), vueB(vueAn(uiSwitchJ), vueNt(propsAlias, {
        tabindex: `-1`,
        role: `application`,
        "aria-readonly": a.value,
        "aria-disabled": r.value,
        "data-readonly": a.value && ``,
        "data-disabled": r.value && ``,
        onMouseleave: renderCache[0] ||= e => vueAn(n).focusedValue.value = undefined
      }), {
        default: vueYt(() => [vueCt(ctx.$slots, `default`)]),
        _: 3
      }, 16, [`aria-readonly`, `aria-disabled`, `data-readonly`, `data-disabled`]));
    }
  }),
  we = vueJ({
    __name: `RangeCalendarGridBody`,
    props: {
      asChild: {
        type: Boolean,
        required: false
      },
      as: {
        type: null,
        required: false,
        default: `tbody`
      }
    },
    setup(props) {
      let propsAlias = props;
      return (ctx, renderCache) => (vueGt(), vueB(vueAn(uiSwitchJ), vueTr(vueV(propsAlias)), {
        default: vueYt(() => [vueCt(ctx.$slots, `default`)]),
        _: 3
      }, 16));
    }
  }),
  Te = vueJ({
    __name: `RangeCalendarGridHead`,
    props: {
      asChild: {
        type: Boolean,
        required: false
      },
      as: {
        type: null,
        required: false,
        default: `thead`
      }
    },
    setup(props) {
      let propsAlias = props;
      return (ctx, renderCache) => (vueGt(), vueB(vueAn(uiSwitchJ), vueNt(propsAlias, {
        "aria-hidden": `true`
      }), {
        default: vueYt(() => [vueCt(ctx.$slots, `default`)]),
        _: 3
      }, 16));
    }
  }),
  Ee = vueJ({
    __name: `RangeCalendarGridRow`,
    props: {
      asChild: {
        type: Boolean,
        required: false
      },
      as: {
        type: null,
        required: false,
        default: `tr`
      }
    },
    setup(props) {
      let propsAlias = props;
      return (ctx, renderCache) => (vueGt(), vueB(vueAn(uiSwitchJ), vueTr(vueV(propsAlias)), {
        default: vueYt(() => [vueCt(ctx.$slots, `default`)]),
        _: 3
      }, 16));
    }
  }),
  De = vueJ({
    __name: `RangeCalendarHeadCell`,
    props: {
      asChild: {
        type: Boolean,
        required: false
      },
      as: {
        type: null,
        required: false,
        default: `th`
      }
    },
    setup(props) {
      let propsAlias = props;
      return (ctx, renderCache) => (vueGt(), vueB(vueAn(uiSwitchJ), vueTr(vueV(propsAlias)), {
        default: vueYt(() => [vueCt(ctx.$slots, `default`)]),
        _: 3
      }, 16));
    }
  }),
  Oe = vueJ({
    __name: `RangeCalendarHeader`,
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
      let propsAlias = props;
      return (ctx, renderCache) => (vueGt(), vueB(vueAn(uiSwitchJ), vueTr(vueV(propsAlias)), {
        default: vueYt(() => [vueCt(ctx.$slots, `default`)]),
        _: 3
      }, 16));
    }
  }),
  ke = vueJ({
    __name: `RangeCalendarHeading`,
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
        n = Q();
      return (ctx, renderCache) => (vueGt(), vueB(vueAn(uiSwitchJ), vueNt(propsAlias, {
        "data-disabled": vueAn(n).disabled.value ? `` : undefined
      }), {
        default: vueYt(() => [vueCt(ctx.$slots, `default`, {
          headingValue: vueAn(n).headingValue.value
        }, () => [vueO(vueRr(vueAn(n).headingValue.value), 1)])]),
        _: 3
      }, 16, [`data-disabled`]));
    }
  }),
  Ae = vueJ({
    __name: `RangeCalendarNext`,
    props: {
      nextPage: {
        type: Function,
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
        n = M(() => r.disabled.value || r.isNextButtonDisabled(propsAlias.nextPage)),
        r = Q();
      function a() {
        n.value || r.nextPage(propsAlias.nextPage);
      }
      return (ctx, renderCache) => (vueGt(), vueB(vueAn(uiSwitchJ), {
        as: propsAlias.as,
        "as-child": propsAlias.asChild,
        "aria-label": `Next page`,
        type: propsAlias.as === `button` ? `button` : undefined,
        "aria-disabled": n.value || undefined,
        "data-disabled": n.value || undefined,
        disabled: n.value,
        onClick: a
      }, {
        default: vueYt(() => [vueCt(ctx.$slots, `default`, {
          disabled: n.value
        }, () => [renderCache[0] ||= vueO(` Next page `)])]),
        _: 3
      }, 8, [`as`, `as-child`, `type`, `aria-disabled`, `data-disabled`, `disabled`]));
    }
  }),
  je = vueJ({
    __name: `RangeCalendarPrev`,
    props: {
      prevPage: {
        type: Function,
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
        n = M(() => r.disabled.value || r.isPrevButtonDisabled(propsAlias.prevPage)),
        r = Q();
      function a() {
        n.value || r.prevPage(propsAlias.prevPage);
      }
      return (ctx, renderCache) => (vueGt(), vueB(vueAn(uiSwitchJ), {
        as: propsAlias.as,
        "as-child": propsAlias.asChild,
        "aria-label": `Previous page`,
        type: propsAlias.as === `button` ? `button` : undefined,
        "aria-disabled": n.value || undefined,
        "data-disabled": n.value || undefined,
        disabled: n.value,
        onClick: a
      }, {
        default: vueYt(() => [vueCt(ctx.$slots, `default`, {
          disabled: n.value
        }, () => [renderCache[0] ||= vueO(` Prev page `)])]),
        _: 3
      }, 8, [`as`, `as-child`, `type`, `aria-disabled`, `data-disabled`, `disabled`]));
    }
  }),
  Me = {
    class: `flex items-center gap-1`
  },
  Ne = {
    class: `flex flex-col gap-y-4 mt-4 sm:flex-row sm:gap-x-4 sm:gap-y-0`
  },
  Pe = vueJ({
    __name: `RangeCalendar`,
    props: {
      defaultPlaceholder: {},
      defaultValue: {},
      modelValue: {},
      placeholder: {},
      allowNonContiguousRanges: {
        type: Boolean
      },
      pagedNavigation: {
        type: Boolean
      },
      preventDeselect: {
        type: Boolean
      },
      maximumDays: {},
      weekStartsOn: {},
      weekdayFormat: {},
      calendarLabel: {},
      fixedWeeks: {
        type: Boolean
      },
      maxValue: {},
      minValue: {},
      locale: {},
      numberOfMonths: {},
      disabled: {
        type: Boolean
      },
      readonly: {
        type: Boolean
      },
      initialFocus: {
        type: Boolean
      },
      isDateDisabled: {
        type: Function
      },
      isDateUnavailable: {
        type: Function
      },
      isDateHighlightable: {
        type: Function
      },
      dir: {},
      nextPage: {
        type: Function
      },
      prevPage: {
        type: Function
      },
      disableDaysOutsideCurrentView: {
        type: Boolean
      },
      fixedDate: {},
      asChild: {
        type: Boolean
      },
      as: {},
      class: {
        type: [Boolean, null, String, Object, Array]
      }
    },
    emits: [`update:modelValue`, `update:validModelValue`, `update:placeholder`, `update:startValue`],
    setup(state, {
      emit: emit
    }) {
      let stateAlias = state,
        emitAlias = emit,
        i = uiSwitchLt(stateAlias, `class`),
        o = uiSwitchZ(i, emitAlias);
      return (ctx, renderCache) => (vueGt(), vueB(vueAn(be), vueNt({
        "data-slot": `range-calendar`,
        class: vueAn(uiSwitchXt)(`p-3`, stateAlias.class)
      }, vueAn(o)), {
        default: vueYt(({
          grid: e,
          weekDays: t
        }) => [vueK(vueAn(He), null, {
          default: vueYt(() => [vueK(vueAn(Ue)), vueY(`div`, Me, [vueK(vueAn(Ge)), vueK(vueAn(We))])]),
          _: 1
        }), vueY(`div`, Ne, [(vueGt(true), vueS(vueC, null, vueSt(e, e => (vueGt(), vueB(vueAn(Le), {
          key: e.value.toString()
        }, {
          default: vueYt(() => [vueK(vueAn(ze), null, {
            default: vueYt(() => [vueK(vueAn(Be), null, {
              default: vueYt(() => [(vueGt(true), vueS(vueC, null, vueSt(t, e => (vueGt(), vueB(vueAn(Ve), {
                key: e
              }, {
                default: vueYt(() => [vueO(vueRr(e), 1)]),
                _: 2
              }, 1024))), 128))]),
              _: 2
            }, 1024)]),
            _: 2
          }, 1024), vueK(vueAn(Re), null, {
            default: vueYt(() => [(vueGt(true), vueS(vueC, null, vueSt(e.rows, (t, n) => (vueGt(), vueB(vueAn(Be), {
              key: `weekDate-${n}`,
              class: `mt-2 w-full`
            }, {
              default: vueYt(() => [(vueGt(true), vueS(vueC, null, vueSt(t, t => (vueGt(), vueB(vueAn(Fe), {
                key: t.toString(),
                date: t
              }, {
                default: vueYt(() => [vueK(vueAn(Ie), {
                  day: t,
                  month: e.value
                }, null, 8, [`day`, `month`])]),
                _: 2
              }, 1032, [`date`]))), 128))]),
              _: 2
            }, 1024))), 128))]),
            _: 2
          }, 1024)]),
          _: 2
        }, 1024))), 128))])]),
        _: 1
      }, 16, [`class`]));
    }
  }),
  Fe = vueJ({
    __name: `RangeCalendarCell`,
    props: {
      date: {},
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
        r = uiSwitchLt(propsAlias, `class`),
        i = uiSwitchB(r);
      return (ctx, renderCache) => (vueGt(), vueB(vueAn(xe), vueNt({
        "data-slot": `range-calendar-cell`,
        class: vueAn(uiSwitchXt)(`relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([data-selected])]:bg-accent first:[&:has([data-selected])]:rounded-l-md last:[&:has([data-selected])]:rounded-r-md [&:has([data-selected][data-selection-end])]:rounded-r-md [&:has([data-selected][data-selection-start])]:rounded-l-md`, propsAlias.class)
      }, vueAn(i)), {
        default: vueYt(() => [vueCt(ctx.$slots, `default`)]),
        _: 3
      }, 16, [`class`]));
    }
  }),
  Ie = vueJ({
    __name: `RangeCalendarCellTrigger`,
    props: {
      day: {},
      month: {},
      asChild: {
        type: Boolean
      },
      as: {
        default: `button`
      },
      class: {
        type: [Boolean, null, String, Object, Array]
      }
    },
    setup(props) {
      let propsAlias = props,
        r = uiSwitchLt(propsAlias, `class`),
        i = uiSwitchB(r);
      return (ctx, renderCache) => (vueGt(), vueB(vueAn(Se), vueNt({
        "data-slot": `range-calendar-trigger`,
        class: vueAn(uiSwitchXt)(vueAn(uiSwitchN)({
          variant: `ghost`
        }), `h-8 w-8 p-0 font-normal data-[selected]:opacity-100`, `[&[data-today]:not([data-selected])]:bg-accent [&[data-today]:not([data-selected])]:text-accent-foreground`, `data-[selection-start]:bg-primary data-[selection-start]:text-primary-foreground data-[selection-start]:hover:bg-primary data-[selection-start]:hover:text-primary-foreground data-[selection-start]:focus:bg-primary data-[selection-start]:focus:text-primary-foreground`, `data-[selection-end]:bg-primary data-[selection-end]:text-primary-foreground data-[selection-end]:hover:bg-primary data-[selection-end]:hover:text-primary-foreground data-[selection-end]:focus:bg-primary data-[selection-end]:focus:text-primary-foreground`, `data-[outside-view]:text-muted-foreground`, `data-[disabled]:text-muted-foreground data-[disabled]:opacity-50`, `data-[unavailable]:text-destructive-foreground data-[unavailable]:line-through`, propsAlias.class)
      }, vueAn(i)), {
        default: vueYt(() => [vueCt(ctx.$slots, `default`)]),
        _: 3
      }, 16, [`class`]));
    }
  }),
  Le = vueJ({
    __name: `RangeCalendarGrid`,
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
        r = uiSwitchLt(propsAlias, `class`),
        i = uiSwitchB(r);
      return (ctx, renderCache) => (vueGt(), vueB(vueAn(Ce), vueNt({
        "data-slot": `range-calendar-grid`,
        class: vueAn(uiSwitchXt)(`w-full border-collapse space-x-1`, propsAlias.class)
      }, vueAn(i)), {
        default: vueYt(() => [vueCt(ctx.$slots, `default`)]),
        _: 3
      }, 16, [`class`]));
    }
  }),
  Re = vueJ({
    __name: `RangeCalendarGridBody`,
    props: {
      asChild: {
        type: Boolean
      },
      as: {}
    },
    setup(props) {
      let propsAlias = props;
      return (ctx, renderCache) => (vueGt(), vueB(vueAn(we), vueNt({
        "data-slot": `range-calendar-grid-body`
      }, propsAlias), {
        default: vueYt(() => [vueCt(ctx.$slots, `default`)]),
        _: 3
      }, 16));
    }
  }),
  ze = vueJ({
    __name: `RangeCalendarGridHead`,
    props: {
      asChild: {
        type: Boolean
      },
      as: {}
    },
    setup(props) {
      let propsAlias = props;
      return (ctx, renderCache) => (vueGt(), vueB(vueAn(Te), vueNt({
        "data-slot": `range-calendar-grid-head`
      }, propsAlias), {
        default: vueYt(() => [vueCt(ctx.$slots, `default`)]),
        _: 3
      }, 16));
    }
  }),
  Be = vueJ({
    __name: `RangeCalendarGridRow`,
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
        r = uiSwitchLt(propsAlias, `class`),
        i = uiSwitchB(r);
      return (ctx, renderCache) => (vueGt(), vueB(vueAn(Ee), vueNt({
        "data-slot": `range-calendar-grid-row`,
        class: vueAn(uiSwitchXt)(`flex`, propsAlias.class)
      }, vueAn(i)), {
        default: vueYt(() => [vueCt(ctx.$slots, `default`)]),
        _: 3
      }, 16, [`class`]));
    }
  }),
  Ve = vueJ({
    __name: `RangeCalendarHeadCell`,
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
        r = uiSwitchLt(propsAlias, `class`),
        i = uiSwitchB(r);
      return (ctx, renderCache) => (vueGt(), vueB(vueAn(De), vueNt({
        "data-slot": `range-calendar-head-cell`,
        class: vueAn(uiSwitchXt)(`w-8 rounded-md text-[0.8rem] font-normal text-muted-foreground`, propsAlias.class)
      }, vueAn(i)), {
        default: vueYt(() => [vueCt(ctx.$slots, `default`)]),
        _: 3
      }, 16, [`class`]));
    }
  }),
  He = vueJ({
    __name: `RangeCalendarHeader`,
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
        r = uiSwitchLt(propsAlias, `class`),
        i = uiSwitchB(r);
      return (ctx, renderCache) => (vueGt(), vueB(vueAn(Oe), vueNt({
        "data-slot": `range-calendar-header`,
        class: vueAn(uiSwitchXt)(`flex justify-center pt-1 relative items-center w-full`, propsAlias.class)
      }, vueAn(i)), {
        default: vueYt(() => [vueCt(ctx.$slots, `default`)]),
        _: 3
      }, 16, [`class`]));
    }
  }),
  Ue = vueJ({
    __name: `RangeCalendarHeading`,
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
        r = uiSwitchLt(propsAlias, `class`),
        i = uiSwitchB(r);
      return (ctx, renderCache) => (vueGt(), vueB(vueAn(ke), vueNt({
        "data-slot": `range-calendar-heading`,
        class: vueAn(uiSwitchXt)(`text-sm font-medium`, propsAlias.class)
      }, vueAn(i)), {
        default: vueYt(({
          headingValue: t
        }) => [vueCt(ctx.$slots, `default`, {
          headingValue: t
        }, () => [vueO(vueRr(t), 1)])]),
        _: 3
      }, 16, [`class`]));
    }
  }),
  We = vueJ({
    __name: `RangeCalendarNextButton`,
    props: {
      nextPage: {
        type: Function
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
        r = uiSwitchLt(propsAlias, `class`),
        i = uiSwitchB(r);
      return (ctx, renderCache) => (vueGt(), vueB(vueAn(Ae), vueNt({
        "data-slot": `range-calendar-next-button`,
        class: vueAn(uiSwitchXt)(vueAn(uiSwitchN)({
          variant: `outline`
        }), `absolute right-1`, `size-7 bg-transparent p-0 opacity-50 hover:opacity-100`, propsAlias.class)
      }, vueAn(i)), {
        default: vueYt(() => [vueCt(ctx.$slots, `default`, {}, () => [vueK(vueAn(popoverA), {
          class: `size-4`
        })])]),
        _: 3
      }, 16, [`class`]));
    }
  }),
  Ge = vueJ({
    __name: `RangeCalendarPrevButton`,
    props: {
      prevPage: {
        type: Function
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
        r = uiSwitchLt(propsAlias, `class`),
        i = uiSwitchB(r);
      return (ctx, renderCache) => (vueGt(), vueB(vueAn(je), vueNt({
        "data-slot": `range-calendar-prev-button`,
        class: vueAn(uiSwitchXt)(vueAn(uiSwitchN)({
          variant: `outline`
        }), `absolute left-1`, `size-7 bg-transparent p-0 opacity-50 hover:opacity-100`, propsAlias.class)
      }, vueAn(i)), {
        default: vueYt(() => [vueCt(ctx.$slots, `default`, {}, () => [vueK(vueAn(i18nU), {
          class: `size-4`
        })])]),
        _: 3
      }, 16, [`class`]));
    }
  }),
  Ke = `#heatmap-panel-actions`,
  qe = [`today`, `last7`, `last14`, `last30`, `thisMonth`, `lastMonth`];
function Je(e) {
  return qe.includes(e);
}
function $(e) {
  return `${e.getFullYear()}-${String(e.getMonth() + 1).padStart(2, `0`)}-${String(e.getDate()).padStart(2, `0`)}`;
}
function Ye(e, t = new Date()) {
  let n = $(t);
  if (e === `thisMonth`) return {
    start: $(new Date(t.getFullYear(), t.getMonth(), 1)),
    end: n
  };
  if (e === `lastMonth`) return {
    start: $(new Date(t.getFullYear(), t.getMonth() - 1, 1)),
    end: $(new Date(t.getFullYear(), t.getMonth(), 0))
  };
  let r = e === `today` ? 1 : e === `last7` ? 7 : e === `last14` ? 14 : 30;
  return {
    start: $(new Date(t.getFullYear(), t.getMonth(), t.getDate() - r + 1)),
    end: n
  };
}
function Xe(e, t) {
  return qe.find(item => {
    let r = Ye(item);
    return r.start === e && r.end === t;
  }) ?? null;
}
var Ze = [`aria-label`, `title`],
  Qe = {
    key: 0
  },
  $e = {
    class: `flex gap-2.5`
  },
  et = {
    class: `flex w-[104px] shrink-0 flex-col gap-0.5 border-r border-black/5 pr-2.5`
  },
  tt = [`onClick`],
  nt = {
    class: `flex flex-col`
  },
  rt = {
    class: `px-1 pt-1 text-[11px] leading-tight text-[#aaa]`
  },
  it = vueJ({
    __name: `HeatMapRangePicker`,
    props: {
      start: {},
      end: {}
    },
    emits: [`change`],
    setup(event, {
      emit: emit
    }) {
      let eventAlias = event,
        emitAlias = emit,
        {
          t: i,
          locale: a
        } = D(),
        o = vueBn(false),
        s = vueBn(null);
      function c(e) {
        let t = e.detail.originalEvent.target;
        t instanceof Node && s.value?.contains(t) && e.preventDefault();
      }
      function l(e) {
        e.preventDefault();
      }
      function p(text) {
        let [t, n, r] = text.split(`-`).map(Number);
        return t && n && r ? new popoverX(t, n, r) : undefined;
      }
      let handler = e => `${e.year}-${String(e.month).padStart(2, `0`)}-${String(e.day).padStart(2, `0`)}`,
        v = popoverO(popoverD()),
        T = vueCn({
          start: undefined,
          end: undefined
        }),
        O = M(() => Xe(eventAlias.start, eventAlias.end));
      function A(text) {
        let [t, n, r] = text.split(`-`);
        return !t || !n || !r ? `--` : Number(t) === new Date().getFullYear() ? `${n}/${r}` : `${t}/${n}/${r}`;
      }
      let j = M(() => eventAlias.start === eventAlias.end ? A(eventAlias.start) : `${A(eventAlias.start)} – ${A(eventAlias.end)}`),
        ee = M(() => `${eventAlias.start.replaceAll(`-`, `/`)} – ${eventAlias.end.replaceAll(`-`, `/`)}`);
      vueWt(o, e => {
        e && (T.value = {
          start: p(eventAlias.start),
          end: p(eventAlias.end)
        });
      });
      function te(e) {
        T.value = e, e.start && e.end && (emitAlias(`change`, {
          start: handler(e.start),
          end: handler(e.end)
        }), o.value = false);
      }
      function F(e) {
        emitAlias(`change`, Ye(e)), o.value = false;
      }
      return (ctx, renderCache) => (vueGt(), vueB(vueAn(popoverR), {
        open: o.value,
        "onUpdate:open": renderCache[0] ||= e => o.value = e
      }, {
        default: vueYt(() => [vueK(vueAn(K), {
          "as-child": ``
        }, {
          default: vueYt(() => [vueY(`button`, {
            ref_key: `triggerRef`,
            ref: s,
            type: `button`,
            class: `flex h-7 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-md bg-black/[0.03] px-2.5 text-xs text-[#666] transition-colors hover:bg-black/[0.06]`,
            "aria-label": vueAn(i)(`heatMap.rangePickerLabel`),
            title: ee.value
          }, [vueK(vueAn(Z), {
            size: 13
          }), O.value ? (vueGt(), vueS(`span`, Qe, vueRr(vueAn(i)(`heatMap.rangePresets.${O.value}`)), 1)) : vueX(``, true), vueY(`span`, {
            class: vueN([`tabular-nums`, {
              "text-[#aaa]": O.value
            }])
          }, vueRr(j.value), 3), vueK(vueAn(PopperContentS), {
            size: 12,
            class: `text-[#aaa]`
          })], 8, Ze)]),
          _: 1
        }), vueK(vueAn(popoverN), {
          align: `end`,
          "side-offset": 6,
          "collision-padding": 12,
          class: `z-[160] w-auto max-w-[calc(100vw-24px)] gap-0 rounded-xl border border-border bg-popover p-2.5 text-popover-foreground shadow-lg`,
          onInteractOutside: c,
          onOpenAutoFocus: l
        }, {
          default: vueYt(() => [vueY(`div`, $e, [vueY(`div`, et, [(vueGt(true), vueS(vueC, null, vueSt(vueAn(qe), e => (vueGt(), vueS(`button`, {
            key: e,
            type: `button`,
            class: vueN([`flex h-7 items-center justify-between gap-1 rounded-md px-2 text-left text-xs transition-colors hover:bg-black/[0.04]`, O.value === e ? `font-medium text-[#111]` : `text-[#666]`]),
            onClick: t => F(e)
          }, [vueO(vueRr(vueAn(i)(`heatMap.rangePresets.${e}`)) + ` `, 1), O.value === e ? (vueGt(), vueB(vueAn(checkT), {
            key: 0,
            size: 13,
            class: `shrink-0 text-primary`
          })) : vueX(``, true)], 10, tt))), 128))]), vueY(`div`, nt, [vueK(vueAn(Pe), {
            "model-value": T.value,
            locale: vueAn(a),
            "max-value": vueAn(v),
            "number-of-months": 1,
            "fixed-weeks": ``,
            "onUpdate:modelValue": te
          }, null, 8, [`model-value`, `locale`, `max-value`]), vueY(`p`, rt, vueRr(vueAn(i)(`heatMap.rangePickerHint`)), 1)])])]),
          _: 1
        })]),
        _: 1
      }, 8, [`open`]));
    }
  });
export { Ye as a, Z as c, Xe as i, X as l, Ke as n, Pe as o, Je as r, he as s, it as t };