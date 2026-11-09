import { $n as vueN, An as vueAn, E as vueE, Lt as vueLt, O as vueO, S as vueS, St as vueSt, Yt as vueYt, b as vueB, c as vueC, gt as vueGt, j as vueJ, k as vueK, rr as vueRr, tt as vueTt, v as vueV, y as vueY } from "../chunks/vue-i18n.runtime.js";
import { _t as mainT, bt as mainBt, vt as mainVt, xt as mainXt, yt as mainYt } from "../chunks/main.js";
var S = {
    class: `text-[11px] font-normal text-muted-foreground`
  },
  C = vueJ({
    __name: `ToolboxSelect`,
    props: vueTt({
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
        C = vueLt(options, `modelValue`),
        w = vueV(() => optionsAlias.compact ? `w-full data-[size=default]:h-7 text-xs text-muted-foreground` : optionsAlias.comfortable ? `w-full data-[size=default]:h-9 text-sm` : `w-full data-[size=default]:h-9 text-xs font-medium`),
        T = vueV(() => optionsAlias.comfortable ? `text-sm` : `text-xs`);
      function E(e) {
        typeof e == `string` && (C.value = e);
      }
      return (ctx, renderCache) => (vueGt(), vueB(vueAn(mainXt), {
        "model-value": C.value,
        disabled: options.disabled,
        "onUpdate:modelValue": E
      }, {
        default: vueYt(() => [vueK(vueAn(mainVt), {
          class: vueN(w.value),
          "aria-label": options.label
        }, {
          default: vueYt(() => [vueK(vueAn(mainT), {
            placeholder: options.placeholder
          }, null, 8, [`placeholder`])]),
          _: 1
        }, 8, [`class`, `aria-label`]), vueK(vueAn(mainBt), {
          position: `popper`,
          align: `start`,
          class: vueN(options.compact ? `min-w-[220px] max-w-[300px]` : undefined)
        }, {
          default: vueYt(() => [(vueGt(true), vueS(vueC, null, vueSt(options.options, r => (vueGt(), vueB(vueAn(mainYt), {
            key: r.value,
            value: r.value,
            disabled: r.disabled,
            class: vueN([T.value, r.description ? `flex-col items-start gap-0.5 py-1.5` : `py-1.5`])
          }, vueE({
            default: vueYt(() => [vueO(vueRr(r.label) + ` `, 1)]),
            _: 2
          }, [r.description ? {
            name: `extra`,
            fn: vueYt(() => [vueY(`small`, S, vueRr(r.description), 1)]),
            key: `0`
          } : undefined]), 1032, [`value`, `disabled`, `class`]))), 128))]),
          _: 1
        }, 8, [`class`])]),
        _: 1
      }, 8, [`model-value`, `disabled`]));
    }
  });
export { C as t };