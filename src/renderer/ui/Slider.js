import { $ as e, H as t, V as n, at as r, bt as i, h as a, j as o, lt as s, xt as c, yt as l, z as u } from "./Switch.js";
import { An as d, Ct as f, Dn as p, Et as m, S as h, St as g, Tn as _, Yt as v, b as y, bn as b, c as x, gt as S, j as C, k as w, mt as T, nr as E, nt as D, ut as O, v as k, x as A } from "../chunks/vue-i18n.runtime.js";
import { n as j, r as ee, t as M } from "./Collection.js";
function N(e = [], t, n) {
  let r = [...e];
  return r[n] = t, r.sort((left, right) => left - right);
}
function P(e, t, n) {
  let r = 100 / (n - t) * (e - t);
  return i(r, 0, 100);
}
function F(e, t) {
  if (t > 2) return `Value ${e + 1} of ${t}`;
  if (t === 2) return [`Minimum`, `Maximum`][e];
}
function I(e, t) {
  if (e.length === 1) return 0;
  let n = e.map(item => Math.abs(item - t)),
    r = Math.min(...n);
  return n.indexOf(r);
}
function L(e, t, n) {
  let r = e / 2;
  return (r - B([0, 50], [0, r])(t) * n) * n;
}
function R(e) {
  return e.slice(0, -1).map((item, n) => e[n + 1] - item);
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
  G = {
    "from-left": [`Home`, `PageDown`, `ArrowDown`, `ArrowLeft`],
    "from-right": [`Home`, `PageDown`, `ArrowDown`, `ArrowRight`],
    "from-bottom": [`Home`, `PageDown`, `ArrowDown`, `ArrowLeft`],
    "from-top": [`Home`, `PageUp`, `ArrowUp`, `ArrowLeft`]
  },
  [K, q] = l([`SliderVertical`, `SliderHorizontal`]),
  J = C({
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
    setup(e, {
      emit: t
    }) {
      let r = e,
        i = t,
        {
          max: a,
          min: o,
          dir: s,
          inverted: c
        } = p(r),
        {
          forwardRef: l,
          currentElement: u
        } = n(),
        m = X(),
        h = b(),
        g = b(),
        _ = k(() => s?.value !== `rtl` && !c.value || s?.value !== `ltr` && c.value);
      function x(e, t) {
        let n = g.value || u.value.getBoundingClientRect(),
          r = [...m.thumbElements.value][m.valueIndexToChangeRef.value],
          i = m.thumbAlignment.value === `contain` ? r.clientWidth : 0;
        !h.value && !t && m.thumbAlignment.value === `contain` && (h.value = e.clientX - r.getBoundingClientRect().left);
        let s = B([0, n.width - i], _.value ? [o.value, a.value] : [a.value, o.value]);
        return g.value = n, s(t ? e.clientX - n.left - i / 2 : e.clientX - n.left - (h.value ?? 0));
      }
      return q({
        startEdge: k(() => _.value ? `left` : `right`),
        endEdge: k(() => _.value ? `right` : `left`),
        direction: k(() => _.value ? 1 : -1),
        size: `width`
      }), (e, t) => (S(), y($, {
        ref: d(l),
        dir: d(s),
        "data-orientation": `horizontal`,
        style: E({
          "--reka-slider-thumb-transform": !_.value && d(m).thumbAlignment.value === `overflow` ? `translateX(50%)` : `translateX(-50%)`
        }),
        onSlideStart: t[0] ||= e => {
          let t = x(e, true);
          i(`slideStart`, t);
        },
        onSlideMove: t[1] ||= e => {
          let t = x(e);
          i(`slideMove`, t);
        },
        onSlideEnd: t[2] ||= () => {
          g.value = undefined, h.value = undefined, i(`slideEnd`);
        },
        onStepKeyDown: t[3] ||= e => {
          let t = _.value ? `from-left` : `from-right`,
            n = d(G)[t].includes(e.key);
          i(`stepKeyDown`, e, n ? -1 : 1);
        },
        onEndKeyDown: t[4] ||= e => i(`endKeyDown`, e),
        onHomeKeyDown: t[5] ||= e => i(`homeKeyDown`, e)
      }, {
        default: v(() => [f(e.$slots, `default`)]),
        _: 3
      }, 8, [`dir`, `style`]));
    }
  }),
  Y = C({
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
    setup(e, {
      emit: t
    }) {
      let r = e,
        i = t,
        {
          max: a,
          min: o,
          inverted: s
        } = p(r),
        c = X(),
        {
          forwardRef: l,
          currentElement: u
        } = n(),
        m = b(),
        h = b(),
        g = k(() => !s.value);
      function _(e, t) {
        let n = h.value || u.value.getBoundingClientRect(),
          r = [...c.thumbElements.value][c.valueIndexToChangeRef.value],
          i = c.thumbAlignment.value === `contain` ? r.clientHeight : 0;
        !m.value && !t && c.thumbAlignment.value === `contain` && (m.value = e.clientY - r.getBoundingClientRect().top);
        let s = B([0, n.height - i], g.value ? [a.value, o.value] : [o.value, a.value]),
          l = t ? e.clientY - n.top - i / 2 : e.clientY - n.top - (m.value ?? 0);
        return h.value = n, s(l);
      }
      return q({
        startEdge: k(() => g.value ? `bottom` : `top`),
        endEdge: k(() => g.value ? `top` : `bottom`),
        direction: k(() => g.value ? 1 : -1),
        size: `height`
      }), (e, t) => (S(), y($, {
        ref: d(l),
        "data-orientation": `vertical`,
        style: E({
          "--reka-slider-thumb-transform": !g.value && d(c).thumbAlignment.value === `overflow` ? `translateY(-50%)` : `translateY(50%)`
        }),
        onSlideStart: t[0] ||= e => {
          let t = _(e, true);
          i(`slideStart`, t);
        },
        onSlideMove: t[1] ||= e => {
          let t = _(e);
          i(`slideMove`, t);
        },
        onSlideEnd: t[2] ||= () => {
          h.value = undefined, m.value = undefined, i(`slideEnd`);
        },
        onStepKeyDown: t[3] ||= e => {
          let t = g.value ? `from-bottom` : `from-top`,
            n = d(G)[t].includes(e.key);
          i(`stepKeyDown`, e, n ? -1 : 1);
        },
        onEndKeyDown: t[4] ||= e => i(`endKeyDown`, e),
        onHomeKeyDown: t[5] ||= e => i(`homeKeyDown`, e)
      }, {
        default: v(() => [f(e.$slots, `default`)]),
        _: 3
      }, 8, [`style`]));
    }
  }),
  [X, Z] = l(`SliderRoot`),
  Q = C({
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
    setup(e, {
      emit: o
    }) {
      let s = e,
        c = o,
        {
          min: l,
          max: u,
          step: h,
          minStepsBetweenThumbs: g,
          orientation: x,
          disabled: C,
          thumbAlignment: w,
          dir: T
        } = p(s),
        E = ee(T),
        {
          forwardRef: O,
          currentElement: j
        } = n(),
        P = t(j),
        {
          CollectionSlot: F
        } = M({
          isProvider: true
        }),
        L = r(s, `modelValue`, c, {
          defaultValue: s.defaultValue,
          passive: s.modelValue === undefined
        }),
        R = k(() => Array.isArray(L.value) ? [...L.value] : []),
        B = b(0),
        G = b(R.value);
      function K(e) {
        Q(e, I(R.value, e));
      }
      function q(e) {
        Q(e, B.value);
      }
      function X() {
        let e = G.value[B.value];
        R.value[B.value] !== e && c(`valueCommit`, _(R.value));
      }
      function Q(e, t, {
        commit: n
      } = {
        commit: false
      }) {
        let r = V(h.value),
          a = H(Math.round((e - l.value) / h.value) * h.value + l.value, r),
          o = i(a, l.value, u.value),
          s = N(R.value, o, t);
        if (z(s, g.value * h.value)) {
          B.value = s.indexOf(o);
          let e = String(s) !== String(L.value);
          e && n && c(`valueCommit`, s), e && ($.value[B.value]?.focus(), L.value = s);
        }
      }
      let $ = b([]);
      return Z({
        modelValue: L,
        currentModelValue: R,
        valueIndexToChangeRef: B,
        thumbElements: $,
        orientation: x,
        min: l,
        max: u,
        disabled: C,
        thumbAlignment: w
      }), (e, t) => (S(), y(d(F), null, {
        default: v(() => [(S(), y(m(d(x) === `horizontal` ? J : Y), D(e.$attrs, {
          ref: d(O),
          "as-child": e.asChild,
          as: e.as,
          min: d(l),
          max: d(u),
          dir: d(E),
          inverted: e.inverted,
          "aria-disabled": d(C),
          "data-disabled": d(C) ? `` : undefined,
          onPointerdown: t[0] ||= () => {
            d(C) || (G.value = R.value);
          },
          onSlideStart: t[1] ||= e => !d(C) && K(e),
          onSlideMove: t[2] ||= e => !d(C) && q(e),
          onSlideEnd: t[3] ||= e => !d(C) && X(),
          onHomeKeyDown: t[4] ||= e => !d(C) && Q(d(l), 0, {
            commit: true
          }),
          onEndKeyDown: t[5] ||= e => !d(C) && Q(d(u), R.value.length - 1, {
            commit: true
          }),
          onStepKeyDown: t[6] ||= (e, t) => {
            if (!d(C)) {
              let n = d(U).includes(e.key) || e.shiftKey && d(W).includes(e.key) ? 10 : 1,
                value = B.value,
                i = R.value[value];
              Q(i + d(h) * n * t, value, {
                commit: true
              });
            }
          }
        }), {
          default: v(() => [f(e.$slots, `default`, {
            modelValue: d(L)
          }), d(P) && e.name ? (S(), y(d(a), {
            key: 0,
            type: `number`,
            value: d(L),
            name: e.name,
            required: e.required,
            disabled: d(C),
            step: d(h)
          }, null, 8, [`value`, `name`, `required`, `disabled`, `step`])) : A(`v-if`, true)]),
          _: 3
        }, 16, [`as-child`, `as`, `min`, `max`, `dir`, `inverted`, `aria-disabled`, `data-disabled`]))]),
        _: 3
      }));
    }
  }),
  $ = C({
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
    setup(e, {
      emit: t
    }) {
      let n = e,
        r = t,
        i = X();
      return (e, t) => (S(), y(d(o), D({
        "data-slider-impl": ``
      }, n, {
        onKeydown: t[0] ||= e => {
          e.key === `Home` ? (r(`homeKeyDown`, e), e.preventDefault()) : e.key === `End` ? (r(`endKeyDown`, e), e.preventDefault()) : d(U).concat(d(W)).includes(e.key) && (r(`stepKeyDown`, e), e.preventDefault());
        },
        onPointerdown: t[1] ||= e => {
          let target = e.target;
          target.setPointerCapture(e.pointerId), e.preventDefault(), d(i).thumbElements.value.includes(target) ? target.focus() : r(`slideStart`, e);
        },
        onPointermove: t[2] ||= e => {
          e.target.hasPointerCapture(e.pointerId) && r(`slideMove`, e);
        },
        onPointerup: t[3] ||= e => {
          let target = e.target;
          target.hasPointerCapture(e.pointerId) && (target.releasePointerCapture(e.pointerId), r(`slideEnd`, e));
        }
      }), {
        default: v(() => [f(e.$slots, `default`)]),
        _: 3
      }, 16));
    }
  }),
  te = C({
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
    setup(e) {
      let t = X(),
        r = K();
      n();
      let i = k(() => t.currentModelValue.value.map(item => P(item, t.min.value, t.max.value))),
        a = k(() => t.currentModelValue.value.length > 1 ? Math.min(...i.value) : 0),
        s = k(() => 100 - Math.max(...i.value, 0));
      return (e, n) => (S(), y(d(o), {
        "data-disabled": d(t).disabled.value ? `` : undefined,
        "data-orientation": d(t).orientation.value,
        "as-child": e.asChild,
        as: e.as,
        style: E({
          [d(r).startEdge.value]: `${a.value}%`,
          [d(r).endEdge.value]: `${s.value}%`
        })
      }, {
        default: v(() => [f(e.$slots, `default`)]),
        _: 3
      }, 8, [`data-disabled`, `data-orientation`, `as-child`, `as`, `style`]));
    }
  }),
  ne = C({
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
    setup(t) {
      let r = t,
        i = X(),
        a = K(),
        {
          forwardRef: s,
          currentElement: c
        } = n(),
        {
          CollectionItem: l
        } = M(),
        u = k(() => i.modelValue?.value?.[r.index]),
        p = k(() => u.value === undefined ? 0 : P(u.value, i.min.value ?? 0, i.max.value ?? 100)),
        m = k(() => F(r.index, i.modelValue?.value?.length ?? 0)),
        h = j(c),
        g = k(() => h[a.size].value),
        _ = k(() => i.thumbAlignment.value === `overflow` || !g.value ? 0 : L(g.value, p.value, a.direction.value)),
        b = e();
      return O(() => {
        i.thumbElements.value.push(c.value);
      }), T(() => {
        let e = i.thumbElements.value.findIndex(item => item === c.value) ?? -1;
        i.thumbElements.value.splice(e, 1);
      }), (e, t) => (S(), y(d(l), null, {
        default: v(() => [w(d(o), D(e.$attrs, {
          ref: d(s),
          role: `slider`,
          tabindex: d(i).disabled.value ? undefined : 0,
          "aria-label": e.$attrs[`aria-label`] || m.value,
          "data-disabled": d(i).disabled.value ? `` : undefined,
          "data-orientation": d(i).orientation.value,
          "aria-valuenow": u.value,
          "aria-valuemin": d(i).min.value,
          "aria-valuemax": d(i).max.value,
          "aria-orientation": d(i).orientation.value,
          "as-child": e.asChild,
          as: e.as,
          style: {
            transform: `var(--reka-slider-thumb-transform)`,
            position: `absolute`,
            [d(a).startEdge.value]: `calc(${p.value}% + ${_.value}px)`,
            display: !d(b) && u.value === undefined ? `none` : undefined
          },
          onFocus: t[0] ||= () => {
            d(i).valueIndexToChangeRef.value = e.index;
          }
        }), {
          default: v(() => [f(e.$slots, `default`)]),
          _: 3
        }, 16, [`tabindex`, `aria-label`, `data-disabled`, `data-orientation`, `aria-valuenow`, `aria-valuemin`, `aria-valuemax`, `aria-orientation`, `as-child`, `as`, `style`])]),
        _: 3
      }));
    }
  }),
  re = C({
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
    setup(e) {
      let t = e,
        {
          getItems: r
        } = M(),
        {
          forwardRef: i,
          currentElement: a
        } = n(),
        o = k(() => a.value ? r(true).findIndex(item => item.ref === a.value) : -1);
      return (e, n) => (S(), y(ne, D({
        ref: d(i)
      }, t, {
        index: o.value
      }), {
        default: v(() => [f(e.$slots, `default`)]),
        _: 3
      }, 16, [`index`]));
    }
  }),
  ie = C({
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
    setup(e) {
      let t = X();
      return n(), (e, n) => (S(), y(d(o), {
        "as-child": e.asChild,
        as: e.as,
        "data-disabled": d(t).disabled.value ? `` : undefined,
        "data-orientation": d(t).orientation.value
      }, {
        default: v(() => [f(e.$slots, `default`)]),
        _: 3
      }, 8, [`as-child`, `as`, `data-disabled`, `data-orientation`]));
    }
  }),
  ae = C({
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
    setup(e, {
      emit: t
    }) {
      let n = e,
        r = t,
        i = s(n, `class`),
        a = u(i, r);
      return (e, t) => (S(), y(d(Q), D({
        "data-slot": `slider`,
        "data-vertical": n.orientation === `vertical` ? `` : undefined,
        class: d(c)(`data-vertical:min-h-40 relative flex w-full touch-none items-center select-none data-disabled:opacity-50 data-vertical:h-full data-vertical:w-auto data-vertical:flex-col`, n.class)
      }, d(a)), {
        default: v(({
          modelValue: e
        }) => [w(d(ie), {
          "data-slot": `slider-track`,
          "data-horizontal": n.orientation === `vertical` ? undefined : ``,
          "data-vertical": n.orientation === `vertical` ? `` : undefined,
          class: `bg-muted rounded-full data-horizontal:h-1 data-vertical:w-1 relative grow overflow-hidden data-horizontal:w-full data-vertical:h-full`
        }, {
          default: v(() => [w(d(te), {
            "data-slot": `slider-range`,
            "data-horizontal": n.orientation === `vertical` ? undefined : ``,
            "data-vertical": n.orientation === `vertical` ? `` : undefined,
            class: `bg-primary absolute select-none data-horizontal:h-full data-vertical:w-full`
          }, null, 8, [`data-horizontal`, `data-vertical`])]),
          _: 1
        }, 8, [`data-horizontal`, `data-vertical`]), (S(true), h(x, null, g(e, (e, t) => (S(), y(d(re), {
          key: t,
          "data-slot": `slider-thumb`,
          "data-vertical": n.orientation === `vertical` ? `` : undefined,
          class: `border-ring ring-ring/50 relative size-3 rounded-full border bg-white transition-[color,box-shadow] after:absolute after:-inset-2 hover:ring-3 focus-visible:ring-3 focus-visible:outline-hidden active:ring-3 block shrink-0 select-none disabled:pointer-events-none disabled:opacity-50`
        }, null, 8, [`data-vertical`]))), 128))]),
        _: 1
      }, 16, [`data-vertical`, `class`]));
    }
  });
export { ae as t };