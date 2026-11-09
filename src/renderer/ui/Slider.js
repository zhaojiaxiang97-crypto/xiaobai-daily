import { $ as uiSwitch, H as uiSwitchH, V as uiSwitchV, at as uiSwitchAt, bt as uiSwitchBt, h as a, j as uiSwitchJ, lt as uiSwitchLt, xt as uiSwitchXt, yt as uiSwitchYt, z as uiSwitchZ } from "./Switch.js";
import { An as vueAn, Ct as vueCt, Dn as vueDn, Et as vueEt, S as vueS, St as vueSt, Tn as vueTn, Yt as vueYt, b as vueB, bn as vueBn, c as vueC, gt as vueGt, j as vueJ, k as vueK, mt as vueMt, nr as vueNr, nt as vueNt, ut as vueUt, v as vueV, x as vueX } from "../chunks/vue-i18n.runtime.js";
import { n as CollectionN, r as CollectionR, t as CollectionT } from "./Collection.js";
function N(e = [], t, n) {
  let r = [...e];
  return r[n] = t, r.sort((left, right) => left - right);
}
function P(e, t, n) {
  let r = 100 / (n - t) * (e - t);
  return uiSwitchBt(r, 0, 100);
}
function F(e, t) {
  if (t > 2) return `Value ${e + 1} of ${t}`;
  if (t === 2) return [`Minimum`, `Maximum`][e];
}
function I(items, t) {
  if (items.length === 1) return 0;
  let mapped = items.map(item => Math.abs(item - t)),
    r = Math.min(...mapped);
  return mapped.indexOf(r);
}
function L(e, t, n) {
  let r = e / 2;
  return (r - B([0, 50], [0, r])(t) * n) * n;
}
function R(items) {
  return items.slice(0, -1).map((item, n) => items[n + 1] - item);
}
function z(e, t) {
  if (t > 0) {
    let n = R(e);
    return Math.min(...n) >= t;
  }
  return true;
}
function B(e, t) {
  return n => {
    if (e[0] === e[1] || t[0] === t[1]) return t[0];
    let r = (t[1] - t[0]) / (e[1] - e[0]);
    return t[0] + r * (n - e[0]);
  };
}
function V(e) {
  return (String(e).split(`.`)[1] || ``).length;
}
function H(e, t) {
  let n = 10 ** t;
  return Math.round(e * n) / n;
}
var U = [`PageUp`, `PageDown`],
  W = [`ArrowUp`, `ArrowDown`, `ArrowLeft`, `ArrowRight`],
  options = {
    "from-left": [`Home`, `PageDown`, `ArrowDown`, `ArrowLeft`],
    "from-right": [`Home`, `PageDown`, `ArrowDown`, `ArrowRight`],
    "from-bottom": [`Home`, `PageDown`, `ArrowDown`, `ArrowLeft`],
    "from-top": [`Home`, `PageUp`, `ArrowUp`, `ArrowLeft`]
  },
  [K, q] = uiSwitchYt([`SliderVertical`, `SliderHorizontal`]),
  J = vueJ({
    __name: `SliderHorizontal`,
    props: {
      dir: {
        type: String,
        required: false
      },
      min: {
        type: Number,
        required: true
      },
      max: {
        type: Number,
        required: true
      },
      inverted: {
        type: Boolean,
        required: true
      }
    },
    emits: [`slideEnd`, `slideStart`, `slideMove`, `homeKeyDown`, `endKeyDown`, `stepKeyDown`],
    setup(event, {
      emit: emit
    }) {
      let eventAlias = event,
        emitAlias = emit,
        {
          max: a,
          min: o,
          dir: s,
          inverted: c
        } = vueDn(eventAlias),
        {
          forwardRef: l,
          currentElement: u
        } = uiSwitchV(),
        m = X(),
        h = vueBn(),
        g = vueBn(),
        _ = vueV(() => s?.value !== `rtl` && !c.value || s?.value !== `ltr` && c.value);
      function x(e, t) {
        let fallbackValue = g.value || u.value.getBoundingClientRect(),
          r = [...m.thumbElements.value][m.valueIndexToChangeRef.value],
          i = m.thumbAlignment.value === `contain` ? r.clientWidth : 0;
        !h.value && !t && m.thumbAlignment.value === `contain` && (h.value = e.clientX - r.getBoundingClientRect().left);
        let s = B([0, fallbackValue.width - i], _.value ? [o.value, a.value] : [a.value, o.value]);
        return g.value = fallbackValue, s(t ? e.clientX - fallbackValue.left - i / 2 : e.clientX - fallbackValue.left - (h.value ?? 0));
      }
      return q({
        startEdge: vueV(() => _.value ? `left` : `right`),
        endEdge: vueV(() => _.value ? `right` : `left`),
        direction: vueV(() => _.value ? 1 : -1),
        size: `width`
      }), (e, renderCache) => (vueGt(), vueB($, {
        ref: vueAn(l),
        dir: vueAn(s),
        "data-orientation": `horizontal`,
        style: vueNr({
          "--reka-slider-thumb-transform": !_.value && vueAn(m).thumbAlignment.value === `overflow` ? `translateX(50%)` : `translateX(-50%)`
        }),
        onSlideStart: renderCache[0] ||= e => {
          let t = x(e, true);
          emitAlias(`slideStart`, t);
        },
        onSlideMove: renderCache[1] ||= e => {
          let t = x(e);
          emitAlias(`slideMove`, t);
        },
        onSlideEnd: renderCache[2] ||= () => {
          g.value = undefined, h.value = undefined, emitAlias(`slideEnd`);
        },
        onStepKeyDown: renderCache[3] ||= e => {
          let t = _.value ? `from-left` : `from-right`,
            includesResult = vueAn(options)[t].includes(e.key);
          emitAlias(`stepKeyDown`, e, includesResult ? -1 : 1);
        },
        onEndKeyDown: renderCache[4] ||= e => emitAlias(`endKeyDown`, e),
        onHomeKeyDown: renderCache[5] ||= e => emitAlias(`homeKeyDown`, e)
      }, {
        default: vueYt(() => [vueCt(e.$slots, `default`)]),
        _: 3
      }, 8, [`dir`, `style`]));
    }
  }),
  Y = vueJ({
    __name: `SliderVertical`,
    props: {
      min: {
        type: Number,
        required: true
      },
      max: {
        type: Number,
        required: true
      },
      inverted: {
        type: Boolean,
        required: true
      }
    },
    emits: [`slideEnd`, `slideStart`, `slideMove`, `homeKeyDown`, `endKeyDown`, `stepKeyDown`],
    setup(event, {
      emit: emit
    }) {
      let eventAlias = event,
        emitAlias = emit,
        {
          max: a,
          min: o,
          inverted: s
        } = vueDn(eventAlias),
        c = X(),
        {
          forwardRef: l,
          currentElement: u
        } = uiSwitchV(),
        m = vueBn(),
        h = vueBn(),
        g = vueV(() => !s.value);
      function _(e, t) {
        let fallbackValue = h.value || u.value.getBoundingClientRect(),
          r = [...c.thumbElements.value][c.valueIndexToChangeRef.value],
          i = c.thumbAlignment.value === `contain` ? r.clientHeight : 0;
        !m.value && !t && c.thumbAlignment.value === `contain` && (m.value = e.clientY - r.getBoundingClientRect().top);
        let s = B([0, fallbackValue.height - i], g.value ? [a.value, o.value] : [o.value, a.value]),
          l = t ? e.clientY - fallbackValue.top - i / 2 : e.clientY - fallbackValue.top - (m.value ?? 0);
        return h.value = fallbackValue, s(l);
      }
      return q({
        startEdge: vueV(() => g.value ? `bottom` : `top`),
        endEdge: vueV(() => g.value ? `top` : `bottom`),
        direction: vueV(() => g.value ? 1 : -1),
        size: `height`
      }), (e, t) => (vueGt(), vueB($, {
        ref: vueAn(l),
        "data-orientation": `vertical`,
        style: vueNr({
          "--reka-slider-thumb-transform": !g.value && vueAn(c).thumbAlignment.value === `overflow` ? `translateY(-50%)` : `translateY(50%)`
        }),
        onSlideStart: t[0] ||= e => {
          let t = _(e, true);
          emitAlias(`slideStart`, t);
        },
        onSlideMove: t[1] ||= e => {
          let t = _(e);
          emitAlias(`slideMove`, t);
        },
        onSlideEnd: t[2] ||= () => {
          h.value = undefined, m.value = undefined, emitAlias(`slideEnd`);
        },
        onStepKeyDown: t[3] ||= e => {
          let t = g.value ? `from-bottom` : `from-top`,
            includesResult = vueAn(options)[t].includes(e.key);
          emitAlias(`stepKeyDown`, e, includesResult ? -1 : 1);
        },
        onEndKeyDown: t[4] ||= e => emitAlias(`endKeyDown`, e),
        onHomeKeyDown: t[5] ||= e => emitAlias(`homeKeyDown`, e)
      }, {
        default: vueYt(() => [vueCt(e.$slots, `default`)]),
        _: 3
      }, 8, [`style`]));
    }
  }),
  [X, Z] = uiSwitchYt(`SliderRoot`),
  Q = vueJ({
    inheritAttrs: false,
    __name: `SliderRoot`,
    props: {
      defaultValue: {
        type: Array,
        required: false,
        default: () => [0]
      },
      modelValue: {
        type: [Array, null],
        required: false
      },
      disabled: {
        type: Boolean,
        required: false,
        default: false
      },
      orientation: {
        type: String,
        required: false,
        default: `horizontal`
      },
      dir: {
        type: String,
        required: false
      },
      inverted: {
        type: Boolean,
        required: false,
        default: false
      },
      min: {
        type: Number,
        required: false,
        default: 0
      },
      max: {
        type: Number,
        required: false,
        default: 100
      },
      step: {
        type: Number,
        required: false,
        default: 1
      },
      minStepsBetweenThumbs: {
        type: Number,
        required: false,
        default: 0
      },
      thumbAlignment: {
        type: String,
        required: false,
        default: `contain`
      },
      asChild: {
        type: Boolean,
        required: false
      },
      as: {
        type: null,
        required: false,
        default: `span`
      },
      name: {
        type: String,
        required: false
      },
      required: {
        type: Boolean,
        required: false
      }
    },
    emits: [`update:modelValue`, `valueCommit`],
    setup(event, {
      emit: emit
    }) {
      let eventAlias = event,
        emitAlias = emit,
        {
          min: l,
          max: u,
          step: h,
          minStepsBetweenThumbs: g,
          orientation: x,
          disabled: C,
          thumbAlignment: w,
          dir: T
        } = vueDn(eventAlias),
        E = CollectionR(T),
        {
          forwardRef: O,
          currentElement: j
        } = uiSwitchV(),
        uiSwitchHResult = uiSwitchH(j),
        {
          CollectionSlot: F
        } = CollectionT({
          isProvider: true
        }),
        uiSwitchAtResult = uiSwitchAt(eventAlias, `modelValue`, emitAlias, {
          defaultValue: eventAlias.defaultValue,
          passive: eventAlias.modelValue === undefined
        }),
        R = vueV(() => Array.isArray(uiSwitchAtResult.value) ? [...uiSwitchAtResult.value] : []),
        B = vueBn(0),
        G = vueBn(R.value);
      function K(e) {
        Q(e, I(R.value, e));
      }
      function q(e) {
        Q(e, B.value);
      }
      function X() {
        let e = G.value[B.value];
        R.value[B.value] !== e && emitAlias(`valueCommit`, vueTn(R.value));
      }
      function Q(e, t, {
        commit: n
      } = {
        commit: false
      }) {
        let r = V(h.value),
          a = H(Math.round((e - l.value) / h.value) * h.value + l.value, r),
          uiSwitchBtResult = uiSwitchBt(a, l.value, u.value),
          s = N(R.value, uiSwitchBtResult, t);
        if (z(s, g.value * h.value)) {
          B.value = s.indexOf(uiSwitchBtResult);
          let e = String(s) !== String(uiSwitchAtResult.value);
          e && n && emitAlias(`valueCommit`, s), e && ($.value[B.value]?.focus(), uiSwitchAtResult.value = s);
        }
      }
      let $ = vueBn([]);
      return Z({
        modelValue: uiSwitchAtResult,
        currentModelValue: R,
        valueIndexToChangeRef: B,
        thumbElements: $,
        orientation: x,
        min: l,
        max: u,
        disabled: C,
        thumbAlignment: w
      }), (e, t) => (vueGt(), vueB(vueAn(F), null, {
        default: vueYt(() => [(vueGt(), vueB(vueEt(vueAn(x) === `horizontal` ? J : Y), vueNt(e.$attrs, {
          ref: vueAn(O),
          "as-child": e.asChild,
          as: e.as,
          min: vueAn(l),
          max: vueAn(u),
          dir: vueAn(E),
          inverted: e.inverted,
          "aria-disabled": vueAn(C),
          "data-disabled": vueAn(C) ? `` : undefined,
          onPointerdown: t[0] ||= () => {
            vueAn(C) || (G.value = R.value);
          },
          onSlideStart: t[1] ||= e => !vueAn(C) && K(e),
          onSlideMove: t[2] ||= e => !vueAn(C) && q(e),
          onSlideEnd: t[3] ||= e => !vueAn(C) && X(),
          onHomeKeyDown: t[4] ||= e => !vueAn(C) && Q(vueAn(l), 0, {
            commit: true
          }),
          onEndKeyDown: t[5] ||= e => !vueAn(C) && Q(vueAn(u), R.value.length - 1, {
            commit: true
          }),
          onStepKeyDown: t[6] ||= (e, t) => {
            if (!vueAn(C)) {
              let n = vueAn(U).includes(e.key) || e.shiftKey && vueAn(W).includes(e.key) ? 10 : 1,
                r = B.value,
                i = R.value[r];
              Q(i + vueAn(h) * n * t, r, {
                commit: true
              });
            }
          }
        }), {
          default: vueYt(() => [vueCt(e.$slots, `default`, {
            modelValue: vueAn(uiSwitchAtResult)
          }), vueAn(uiSwitchHResult) && e.name ? (vueGt(), vueB(vueAn(a), {
            key: 0,
            type: `number`,
            value: vueAn(uiSwitchAtResult),
            name: e.name,
            required: e.required,
            disabled: vueAn(C),
            step: vueAn(h)
          }, null, 8, [`value`, `name`, `required`, `disabled`, `step`])) : vueX(`v-if`, true)]),
          _: 3
        }, 16, [`as-child`, `as`, `min`, `max`, `dir`, `inverted`, `aria-disabled`, `data-disabled`]))]),
        _: 3
      }));
    }
  }),
  $ = vueJ({
    __name: `SliderImpl`,
    props: {
      asChild: {
        type: Boolean,
        required: false
      },
      as: {
        type: null,
        required: false,
        default: `span`
      }
    },
    emits: [`slideStart`, `slideMove`, `slideEnd`, `homeKeyDown`, `endKeyDown`, `stepKeyDown`],
    setup(event, {
      emit: emit
    }) {
      let eventAlias = event,
        emitAlias = emit,
        i = X();
      return (ctx, renderCache) => (vueGt(), vueB(vueAn(uiSwitchJ), vueNt({
        "data-slider-impl": ``
      }, eventAlias, {
        onKeydown: renderCache[0] ||= e => {
          e.key === `Home` ? (emitAlias(`homeKeyDown`, e), e.preventDefault()) : e.key === `End` ? (emitAlias(`endKeyDown`, e), e.preventDefault()) : vueAn(U).concat(vueAn(W)).includes(e.key) && (emitAlias(`stepKeyDown`, e), e.preventDefault());
        },
        onPointerdown: renderCache[1] ||= e => {
          let t = e.target;
          t.setPointerCapture(e.pointerId), e.preventDefault(), vueAn(i).thumbElements.value.includes(t) ? t.focus() : emitAlias(`slideStart`, e);
        },
        onPointermove: renderCache[2] ||= e => {
          e.target.hasPointerCapture(e.pointerId) && emitAlias(`slideMove`, e);
        },
        onPointerup: renderCache[3] ||= e => {
          let t = e.target;
          t.hasPointerCapture(e.pointerId) && (t.releasePointerCapture(e.pointerId), emitAlias(`slideEnd`, e));
        }
      }), {
        default: vueYt(() => [vueCt(ctx.$slots, `default`)]),
        _: 3
      }, 16));
    }
  }),
  te = vueJ({
    __name: `SliderRange`,
    props: {
      asChild: {
        type: Boolean,
        required: false
      },
      as: {
        type: null,
        required: false,
        default: `span`
      }
    },
    setup(props) {
      let t = X(),
        r = K();
      uiSwitchV();
      let i = vueV(() => t.currentModelValue.value.map(item => P(item, t.min.value, t.max.value))),
        a = vueV(() => t.currentModelValue.value.length > 1 ? Math.min(...i.value) : 0),
        s = vueV(() => 100 - Math.max(...i.value, 0));
      return (ctx, renderCache) => (vueGt(), vueB(vueAn(uiSwitchJ), {
        "data-disabled": vueAn(t).disabled.value ? `` : undefined,
        "data-orientation": vueAn(t).orientation.value,
        "as-child": ctx.asChild,
        as: ctx.as,
        style: vueNr({
          [vueAn(r).startEdge.value]: `${a.value}%`,
          [vueAn(r).endEdge.value]: `${s.value}%`
        })
      }, {
        default: vueYt(() => [vueCt(ctx.$slots, `default`)]),
        _: 3
      }, 8, [`data-disabled`, `data-orientation`, `as-child`, `as`, `style`]));
    }
  }),
  ne = vueJ({
    inheritAttrs: false,
    __name: `SliderThumbImpl`,
    props: {
      index: {
        type: Number,
        required: true
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
      let propsAlias = props,
        i = X(),
        a = K(),
        {
          forwardRef: s,
          currentElement: c
        } = uiSwitchV(),
        {
          CollectionItem: l
        } = CollectionT(),
        u = vueV(() => i.modelValue?.value?.[propsAlias.index]),
        p = vueV(() => u.value === undefined ? 0 : P(u.value, i.min.value ?? 0, i.max.value ?? 100)),
        m = vueV(() => F(propsAlias.index, i.modelValue?.value?.length ?? 0)),
        h = CollectionN(c),
        g = vueV(() => h[a.size].value),
        _ = vueV(() => i.thumbAlignment.value === `overflow` || !g.value ? 0 : L(g.value, p.value, a.direction.value)),
        uiSwitchResult = uiSwitch();
      return vueUt(() => {
        i.thumbElements.value.push(c.value);
      }), vueMt(() => {
        let fallbackValue = i.thumbElements.value.findIndex(item => item === c.value) ?? -1;
        i.thumbElements.value.splice(fallbackValue, 1);
      }), (e, t) => (vueGt(), vueB(vueAn(l), null, {
        default: vueYt(() => [vueK(vueAn(uiSwitchJ), vueNt(e.$attrs, {
          ref: vueAn(s),
          role: `slider`,
          tabindex: vueAn(i).disabled.value ? undefined : 0,
          "aria-label": e.$attrs[`aria-label`] || m.value,
          "data-disabled": vueAn(i).disabled.value ? `` : undefined,
          "data-orientation": vueAn(i).orientation.value,
          "aria-valuenow": u.value,
          "aria-valuemin": vueAn(i).min.value,
          "aria-valuemax": vueAn(i).max.value,
          "aria-orientation": vueAn(i).orientation.value,
          "as-child": e.asChild,
          as: e.as,
          style: {
            transform: `var(--reka-slider-thumb-transform)`,
            position: `absolute`,
            [vueAn(a).startEdge.value]: `calc(${p.value}% + ${_.value}px)`,
            display: !vueAn(uiSwitchResult) && u.value === undefined ? `none` : undefined
          },
          onFocus: t[0] ||= () => {
            vueAn(i).valueIndexToChangeRef.value = e.index;
          }
        }), {
          default: vueYt(() => [vueCt(e.$slots, `default`)]),
          _: 3
        }, 16, [`tabindex`, `aria-label`, `data-disabled`, `data-orientation`, `aria-valuenow`, `aria-valuemin`, `aria-valuemax`, `aria-orientation`, `as-child`, `as`, `style`])]),
        _: 3
      }));
    }
  }),
  re = vueJ({
    __name: `SliderThumb`,
    props: {
      asChild: {
        type: Boolean,
        required: false
      },
      as: {
        type: null,
        required: false,
        default: `span`
      }
    },
    setup(props) {
      let propsAlias = props,
        {
          getItems: r
        } = CollectionT(),
        {
          forwardRef: i,
          currentElement: a
        } = uiSwitchV(),
        o = vueV(() => a.value ? r(true).findIndex(item => item.ref === a.value) : -1);
      return (ctx, renderCache) => (vueGt(), vueB(ne, vueNt({
        ref: vueAn(i)
      }, propsAlias, {
        index: o.value
      }), {
        default: vueYt(() => [vueCt(ctx.$slots, `default`)]),
        _: 3
      }, 16, [`index`]));
    }
  }),
  ie = vueJ({
    __name: `SliderTrack`,
    props: {
      asChild: {
        type: Boolean,
        required: false
      },
      as: {
        type: null,
        required: false,
        default: `span`
      }
    },
    setup(props) {
      let t = X();
      return uiSwitchV(), (e, n) => (vueGt(), vueB(vueAn(uiSwitchJ), {
        "as-child": e.asChild,
        as: e.as,
        "data-disabled": vueAn(t).disabled.value ? `` : undefined,
        "data-orientation": vueAn(t).orientation.value
      }, {
        default: vueYt(() => [vueCt(e.$slots, `default`)]),
        _: 3
      }, 8, [`as-child`, `as`, `data-disabled`, `data-orientation`]));
    }
  }),
  ae = vueJ({
    __name: `Slider`,
    props: {
      defaultValue: {},
      modelValue: {},
      disabled: {
        type: Boolean
      },
      orientation: {},
      dir: {},
      inverted: {
        type: Boolean
      },
      min: {},
      max: {},
      step: {},
      minStepsBetweenThumbs: {},
      thumbAlignment: {},
      asChild: {
        type: Boolean
      },
      as: {},
      name: {},
      required: {
        type: Boolean
      },
      class: {
        type: [Boolean, null, String, Object, Array]
      }
    },
    emits: [`update:modelValue`, `valueCommit`],
    setup(props, {
      emit: emit
    }) {
      let propsAlias = props,
        emitAlias = emit,
        uiSwitchLtResult = uiSwitchLt(propsAlias, `class`),
        uiSwitchZResult = uiSwitchZ(uiSwitchLtResult, emitAlias);
      return (ctx, renderCache) => (vueGt(), vueB(vueAn(Q), vueNt({
        "data-slot": `slider`,
        "data-vertical": propsAlias.orientation === `vertical` ? `` : undefined,
        class: vueAn(uiSwitchXt)(`data-vertical:min-h-40 relative flex w-full touch-none items-center select-none data-disabled:opacity-50 data-vertical:h-full data-vertical:w-auto data-vertical:flex-col`, propsAlias.class)
      }, vueAn(uiSwitchZResult)), {
        default: vueYt(({
          modelValue: e
        }) => [vueK(vueAn(ie), {
          "data-slot": `slider-track`,
          "data-horizontal": propsAlias.orientation === `vertical` ? undefined : ``,
          "data-vertical": propsAlias.orientation === `vertical` ? `` : undefined,
          class: `bg-muted rounded-full data-horizontal:h-1 data-vertical:w-1 relative grow overflow-hidden data-horizontal:w-full data-vertical:h-full`
        }, {
          default: vueYt(() => [vueK(vueAn(te), {
            "data-slot": `slider-range`,
            "data-horizontal": propsAlias.orientation === `vertical` ? undefined : ``,
            "data-vertical": propsAlias.orientation === `vertical` ? `` : undefined,
            class: `bg-primary absolute select-none data-horizontal:h-full data-vertical:w-full`
          }, null, 8, [`data-horizontal`, `data-vertical`])]),
          _: 1
        }, 8, [`data-horizontal`, `data-vertical`]), (vueGt(true), vueS(vueC, null, vueSt(e, (e, t) => (vueGt(), vueB(vueAn(re), {
          key: t,
          "data-slot": `slider-thumb`,
          "data-vertical": propsAlias.orientation === `vertical` ? `` : undefined,
          class: `border-ring ring-ring/50 relative size-3 rounded-full border bg-white transition-[color,box-shadow] after:absolute after:-inset-2 hover:ring-3 focus-visible:ring-3 focus-visible:outline-hidden active:ring-3 block shrink-0 select-none disabled:pointer-events-none disabled:opacity-50`
        }, null, 8, [`data-vertical`]))), 128))]),
        _: 1
      }, 16, [`data-vertical`, `class`]));
    }
  });
export { ae as t };