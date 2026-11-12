<template>
<component :is="i" :ref="I_24" :as="e.as" :as-child="e.asChild" :aria-label="Q" :data-readonly="l_3?``:undefined" :data-disabled="c_2?``:undefined" :data-invalid="Ne?``:undefined" :dir="R_26" />
</template>

<script setup>
import { normalizeClass as u, unref as d, renderSlot as p, createTextVNode as h, createElementBlock as g, renderList as _, watch as y, createBlock as x, Fragment as C, openBlock as w, defineComponent as T, toDisplayString as k, onBeforeMount as ee, computed as M, createCommentVNode as N, createElementVNode as P } from 'vue';
// [符号说明] r~computed, l~computed
import { A as e, at as r, j as i, lt as a, yt as c, z as l } from '../vendor/ui/Switch.js';
import { T as te } from '../vendor/i18n/en-US-player.js';
import { r as F } from '../vendor/ui/icons/lucide-icons.js';
import { u as ne } from '../vendor/i18n/i18n-helper.js';
import { t as re } from '../vendor/chunks/check.js';
import { s as ie } from '../vendor/ui/PopperContent.js';
// [符号说明] fe=useConfigProviderContext
import { A as ae, D as I, E as L, O as R, T as z, _ as B, a as oe, c as se, g as ce, m as ue, p as de, s as fe } from '../vendor/ui/PopoverTrigger.js';
// [符号说明] me=useConfigProviderContext
import { r as me } from '../vendor/ui/Collection.js';

function ge(event) {
  let t = M(() => event.start.value ? !!event.isDateDisabled(event.start.value) : false),
    n = M(() => event.end.value ? !!event.isDateDisabled(event.end.value) : false),
    r = M(() => !!(t.value || n.value || event.start.value && event.end.value && B(event.end.value, event.start.value))),
    handler = t => event.start.value ? U_30(event.start.value, t) : false,
    a = t => event.end.value ? U_30(event.end.value, t) : false,
    o_0 = t => event.start.value && U_30(event.start.value, t) || event.end.value && U_30(event.end.value, t) ? true : event.end.value && event.start.value ? q_34(t, event.start.value, event.end.value) : false,
    s_1 = t => {
      if (event.isDateDisabled(t)) return true;
      if (event.maximumDays?.value) {
        if (event.start.value && event.end.value) {
          if (event.fixedDate.value) {
            let length = H_28(event.start.value, event.end.value).length;
            if (length <= event.maximumDays.value) {
              let r = event.maximumDays.value - length - 1,
                subtract = event.start.value.subtract({
                  days: r
                }),
                a = event.end.value.add({
                  days: r
                });
              return !q_34(t, subtract, a);
            }
          }
          return false;
        }
        if (event.start.value) {
          let n = event.start.value.add({
              days: event.maximumDays.value
            }),
            subtractResult = event.start.value.subtract({
              days: event.maximumDays.value
            });
          return !q_34(t, subtractResult, n);
        }
      }
      return false;
    },
    c_2 = t => !!event.isDateHighlightable?.(t),
    l_3 = M(() => {
      if (event.start.value && event.end.value && !event.fixedDate.value || !event.start.value || !event.focusedValue.value) return null;
      let t = B(event.start.value, event.focusedValue.value),
        n = t ? event.start.value : event.focusedValue.value,
        r = t ? event.focusedValue.value : event.start.value;
      if (U_30(n, r)) return {
        start: n,
        end: r
      };
      if (event.maximumDays?.value && !event.end.value) {
        let value = event.maximumDays.value,
          n = event.start.value,
          r = event.focusedValue.value;
        return B(r, n) ? {
          start: n.subtract({
            days: value - 1
          }),
          end: n
        } : {
          start: n,
          end: n.add({
            days: value - 1
          })
        };
      }
      return le_29(n, r, event.allowNonContiguousRanges.value ? () => false : event.isDateUnavailable, s_1, event.isDateHighlightable) ? {
        start: n,
        end: r
      } : null;
    }),
    u_4 = e => !l_3.value || !l_3.value.start ? false : U_30(l_3.value.start, e),
    d = e => !l_3.value || !l_3.value.end ? false : U_30(l_3.value.end, e),
    f_5 = M(() => !!(event.start.value || event.end.value)),
    p = M(() => !!(event.start.value && event.isDateDisabled(event.start.value))),
    m = M(() => !!(event.end.value && event.isDateDisabled(event.end.value)));
  return {
    isInvalid: r,
    isSelected: o_0,
    isDateHighlightable: c_2,
    highlightedRange: l_3,
    isSelectionStart: handler,
    isSelectionEnd: a,
    isHighlightedStart: u_4,
    isHighlightedEnd: d,
    isDateDisabled: s_1,
    hasSelectedDate: f_5,
    isSelectedDisabled: M(() => {
      let t = !!event.start.value,
        n = !!event.end.value;
      return !t && !n ? false : t && n ? p.value && m.value : t && p.value || n && m.value;
    }),
    selectedFocusableDate: M(() => {
      if (event.start.value && !p.value) return event.start.value;
      if (event.end.value && !m.value) return event.end.value;
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
};
var ve = {
  role: `heading`,
  "aria-level": `2`
};
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
    locale: V_27,
    placeholder: Z,
    weekStartsOn: H_28,
    fixedWeeks: g_7,
    numberOfMonths: __8,
    minValue: A_15,
    maxValue: O_14,
    disabled: c_2,
    weekdayFormat: h_6,
    pagedNavigation: f_5,
    isDateDisabled: E_12.value,
    isDateUnavailable: C_10.value,
    calendarLabel: D_13,
    nextPage: te_18,
    prevPage: F_19
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
    start: Y_37,
    end: X,
    isDateDisabled: xe,
    isDateUnavailable: Se,
    isDateHighlightable: T_11.value,
    focusedValue: U_30,
    allowNonContiguousRanges: ne_20,
    fixedDate: ie_22,
    maximumDays: ae_23
  });
let o_0 = t,
  s_1 = a,
  {
    disabled: c_2,
    readonly: l_3,
    initialFocus: u_4,
    pagedNavigation: f_5,
    weekdayFormat: h_6,
    fixedWeeks: g_7,
    numberOfMonths: __8,
    preventDeselect: v_9,
    isDateUnavailable: C_10,
    isDateHighlightable: T_11,
    isDateDisabled: E_12,
    calendarLabel: D_13,
    maxValue: O_14,
    minValue: A_15,
    dir: j_16,
    locale: N_17,
    nextPage: te_18,
    prevPage: F_19,
    allowNonContiguousRanges: ne_20,
    disableDaysOutsideCurrentView: re_21,
    fixedDate: ie_22,
    maximumDays: ae_23
  } = m(o_0),
  {
    primitiveElement: I_24,
    currentElement: L_25
  } = e(),
  R_26 = me(j_16),
  V_27 = fe(N_17),
  H_28 = M(() => o_0.weekStartsOn ?? de(V_27.value)),
  le_29 = S(),
  U_30 = S(),
  W_31 = S(false),
  G_32 = r(o_0, `modelValue`, s_1, {
    defaultValue: o_0.defaultValue ?? {
      start: undefined,
      end: undefined
    },
    passive: o_0.modelValue === undefined
  }),
  K_33 = e => e ?? {
    start: undefined,
    end: undefined
  },
  q_34 = M(() => K_33(G_32.value)),
  J_35 = S(K_33(G_32.value));
let pe_36 = ce({
    defaultPlaceholder: o_0.placeholder,
    defaultValue: K_33(G_32.value).start,
    locale: o_0.locale
  }),
  Y_37 = S(K_33(G_32.value).start),
  X = S(K_33(G_32.value).end),
  Z = r(o_0, `placeholder`, s_1, {
    defaultValue: o_0.defaultPlaceholder ?? pe_36.copy(),
    passive: o_0.placeholder === undefined
  });
</script>
