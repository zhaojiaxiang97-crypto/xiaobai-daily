import { $n as e, An as t, E as n, Lt as r, O as i, S as a, St as o, Yt as s, b as c, c as l, gt as u, j as d, k as f, rr as p, tt as m, v as h, y as g } from "../chunks/vue-i18n.runtime.js";
import { _t as _, bt as v, vt as y, xt as b, yt as x } from "../chunks/main.js";
var S = {
    class: `text-[11px] font-normal text-muted-foreground`
  },
  C = d({
    __name: `ToolboxSelect`,
    props: m({
      options: {},
      disabled: {
        type: Boolean
      },
      label: {},
      placeholder: {},
      compact: {
        type: Boolean
      },
      comfortable: {
        type: Boolean
      },
      regular: {
        type: Boolean
      }
    }, {
      modelValue: {
        required: true
      },
      modelModifiers: {}
    }),
    emits: [`update:modelValue`],
    setup(options) {
      let optionsAlias = options,
        C = r(options, `modelValue`),
        w = h(() => optionsAlias.compact ? `w-full data-[size=default]:h-7 text-xs text-muted-foreground` : optionsAlias.comfortable ? `w-full data-[size=default]:h-9 text-sm` : `w-full data-[size=default]:h-9 text-xs font-medium`),
        T = h(() => optionsAlias.comfortable ? `text-sm` : `text-xs`);
      function E(e) {
        typeof e == `string` && (C.value = e);
      }
      return (ctx, renderCache) => (u(), c(t(b), {
        "model-value": C.value,
        disabled: options.disabled,
        "onUpdate:modelValue": E
      }, {
        default: s(() => [f(t(y), {
          class: e(w.value),
          "aria-label": options.label
        }, {
          default: s(() => [f(t(_), {
            placeholder: options.placeholder
          }, null, 8, [`placeholder`])]),
          _: 1
        }, 8, [`class`, `aria-label`]), f(t(v), {
          position: `popper`,
          align: `start`,
          class: e(options.compact ? `min-w-[220px] max-w-[300px]` : undefined)
        }, {
          default: s(() => [(u(true), a(l, null, o(options.options, r => (u(), c(t(x), {
            key: r.value,
            value: r.value,
            disabled: r.disabled,
            class: e([T.value, r.description ? `flex-col items-start gap-0.5 py-1.5` : `py-1.5`])
          }, n({
            default: s(() => [i(p(r.label) + ` `, 1)]),
            _: 2
          }, [r.description ? {
            name: `extra`,
            fn: s(() => [g(`small`, S, p(r.description), 1)]),
            key: `0`
          } : undefined]), 1032, [`value`, `disabled`, `class`]))), 128))]),
          _: 1
        }, 8, [`class`])]),
        _: 1
      }, 8, [`model-value`, `disabled`]));
    }
  });
export { C as t };