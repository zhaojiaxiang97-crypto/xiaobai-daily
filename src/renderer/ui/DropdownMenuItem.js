import { B as uiSwitchB, U as uiSwitchU, V as uiSwitchV, lt as uiSwitchLt, xt as uiSwitchXt } from "./Switch.js";
import { An as vueAn, Ct as vueCt, V as vueV, Yt as vueYt, b as vueB, gt as vueGt, j as vueJ, nt as vueNt, tr as vueTr } from "../chunks/vue-i18n.runtime.js";
import { r as lucideR } from "./icons/lucide-icons.js";
import { o as DropdownMenuTriggerO } from "./DropdownMenuTrigger.js";
var g = lucideR(`list-ordered`, [[`path`, {
    d: `M11 5h10`,
    key: `1cz7ny`
  }], [`path`, {
    d: `M11 12h10`,
    key: `1438ji`
  }], [`path`, {
    d: `M11 19h10`,
    key: `11t30w`
  }], [`path`, {
    d: `M4 4h1v5`,
    key: `10yrso`
  }], [`path`, {
    d: `M4 9h2`,
    key: `r1h2o0`
  }], [`path`, {
    d: `M6.5 20H3.4c0-1 2.6-1.925 2.6-3.5a1.5 1.5 0 0 0-2.6-1.02`,
    key: `xtkcd5`
  }]]),
  _ = vueJ({
    __name: `DropdownMenuItem`,
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
    setup(props, {
      emit: emit
    }) {
      let propsAlias = props,
        d = uiSwitchU(emit);
      return uiSwitchV(), (e, t) => (vueGt(), vueB(vueAn(DropdownMenuTriggerO), vueTr(vueV({
        ...propsAlias,
        ...vueAn(d)
      })), {
        default: vueYt(() => [vueCt(e.$slots, `default`)]),
        _: 3
      }, 16));
    }
  }),
  v = vueJ({
    __name: `DropdownMenuItem`,
    props: {
      disabled: {
        type: Boolean
      },
      textValue: {},
      asChild: {
        type: Boolean
      },
      as: {},
      class: {
        type: [Boolean, null, String, Object, Array]
      },
      inset: {
        type: Boolean
      },
      variant: {
        default: `default`
      }
    },
    setup(props) {
      let propsAlias = props,
        s = uiSwitchLt(propsAlias, `inset`, `variant`, `class`),
        d = uiSwitchB(s);
      return (ctx, renderCache) => (vueGt(), vueB(vueAn(_), vueNt({
        "data-slot": `dropdown-menu-item`,
        "data-inset": props.inset ? `` : undefined,
        "data-variant": props.variant
      }, vueAn(d), {
        class: vueAn(uiSwitchXt)(`focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:text-destructive not-data-[variant=destructive]:focus:**:text-accent-foreground gap-1.5 rounded-md px-1.5 py-1 text-sm data-inset:pl-7 [&_svg:not([class*=size-])]:size-4 group/dropdown-menu-item relative flex cursor-default items-center outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0`, propsAlias.class)
      }), {
        default: vueYt(() => [vueCt(ctx.$slots, `default`)]),
        _: 3
      }, 16, [`data-inset`, `data-variant`, `class`]));
    }
  });
export { g as n, v as t };