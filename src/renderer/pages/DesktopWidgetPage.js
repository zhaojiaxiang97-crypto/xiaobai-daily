import { r as e, t } from "../ui/Switch.js";
import { $n as n, An as r, Ct as i, Et as a, O as o, S as s, Wt as c, Yt as l, b as u, gt as d, j as f, k as p, rr as m, ut as h, v as g, x as _, y as v } from "../chunks/vue-i18n.runtime.js";
import { t as y } from "../i18n/i18n-helper.js";
import { C as b, n as x, t as S } from "../chunks/tool-icons.js";
import { t as C } from "./ToolboxWorkspaceHeader.js";
import { t as w } from "../chunks/shield-alert.js";
import { _n as T } from "../chunks/main.js";
var E = {
    class: `min-h-full bg-background`
  },
  D = {
    class: `@container flex max-w-[1080px] flex-col gap-3.5 px-7 pt-1 pb-9 text-foreground`
  },
  O = {
    class: `rounded-xl border border-border bg-card`
  },
  k = {
    class: `flex items-center gap-4 p-4`
  },
  A = {
    class: `min-w-0 flex-1`
  },
  j = {
    class: `flex flex-wrap items-center gap-2`
  },
  M = {
    class: `text-[17px] font-semibold leading-tight tracking-tight`
  },
  N = {
    class: `mt-1 max-w-[640px] text-xs leading-relaxed text-muted-foreground`
  },
  P = {
    class: `flex shrink-0 items-center gap-3`
  },
  F = {
    key: 0,
    class: `flex flex-col gap-2 border-t border-border px-4 py-3 text-xs leading-relaxed`
  },
  I = {
    key: 0,
    class: `flex items-center justify-between gap-3 rounded-lg bg-amber-500/[0.08] px-3 py-2 text-amber-700 dark:text-amber-300`
  },
  L = {
    class: `flex items-center gap-2`
  },
  R = {
    class: `flex items-start gap-1.5 px-1 text-[11px] leading-relaxed text-muted-foreground`
  },
  z = f({
    __name: `DesktopWidgetPage`,
    props: {
      tool: {},
      user: {},
      creditsBalance: {},
      description: {},
      enabled: {
        type: Boolean
      },
      toggleDisabled: {
        type: Boolean
      },
      statusText: {},
      requiresAccessibility: {
        type: Boolean
      },
      footnote: {}
    },
    emits: [`back`, `toggle`],
    setup(props, {
      emit: emit
    }) {
      let propsAlias = props,
        emitAlias = emit,
        {
          t: H
        } = y(),
        {
          status: U,
          check: W,
          request: G
        } = x(),
        K = g(() => !!(propsAlias.requiresAccessibility && propsAlias.enabled && U.value?.required && !U.value.granted)),
        q = g(() => S[propsAlias.tool.icon] || T);
      return h(() => {
        propsAlias.requiresAccessibility && W();
      }), c(() => propsAlias.enabled, e => {
        e && propsAlias.requiresAccessibility && W();
      }), (c, f) => (d(), s(`div`, E, [p(C, {
        tool: propsAlias.tool,
        user: propsAlias.user,
        "credits-balance": propsAlias.creditsBalance,
        "voice-tool": false,
        "local-tool": ``,
        "show-history": false,
        "show-balance": false,
        onBack: f[0] ||= e => emitAlias(`back`)
      }, null, 8, [`tool`, `user`, `credits-balance`]), v(`div`, D, [v(`section`, O, [v(`div`, k, [v(`span`, {
        class: n([`inline-flex size-12 shrink-0 items-center justify-center rounded-xl transition-colors`, propsAlias.enabled ? `bg-primary/10 text-primary` : `bg-muted text-muted-foreground`])
      }, [(d(), u(a(q.value), {
        size: 24,
        "stroke-width": 1.8
      }))], 2), v(`div`, A, [v(`div`, j, [v(`h1`, M, m(propsAlias.tool.name), 1), v(`span`, {
        class: n([`inline-flex items-center gap-1 rounded-full px-2 py-px text-[11px] font-medium`, propsAlias.enabled ? `bg-primary/10 text-primary` : `bg-muted text-muted-foreground`])
      }, [v(`span`, {
        class: n([`size-1.5 rounded-full`, propsAlias.enabled ? `bg-primary` : `bg-muted-foreground/50`])
      }, null, 2), o(` ` + m(propsAlias.statusText || (propsAlias.enabled ? r(H)(`toolboxNative.desktopWidgetsOn`) : r(H)(`toolboxNative.desktopWidgetsOff`))), 1)], 2)]), v(`p`, N, m(propsAlias.description), 1)]), v(`div`, P, [i(c.$slots, `actions`), p(r(t), {
        "model-value": propsAlias.enabled,
        disabled: propsAlias.toggleDisabled,
        "aria-label": propsAlias.tool.name,
        "onUpdate:modelValue": f[1] ||= e => emitAlias(`toggle`, e)
      }, null, 8, [`model-value`, `disabled`, `aria-label`])])]), c.$slots.notes || K.value ? (d(), s(`div`, F, [i(c.$slots, `notes`), K.value ? (d(), s(`div`, I, [v(`span`, L, [p(r(w), {
        size: 15,
        class: `shrink-0`
      }), o(m(r(H)(`toolboxNative.desktopWidgetsMacAccessibility`)), 1)]), p(r(e), {
        variant: `outline`,
        size: `sm`,
        class: `h-7 shrink-0 text-xs`,
        onClick: r(G)
      }, {
        default: l(() => [o(m(r(H)(`toolboxNative.desktopWidgetsGrantAccess`)), 1)]),
        _: 1
      }, 8, [`onClick`])])) : _(``, true)])) : _(``, true)]), i(c.$slots, `default`), v(`p`, R, [p(r(b), {
        size: 13,
        class: `mt-0.5 shrink-0`
      }), o(m(propsAlias.footnote || r(H)(`toolboxNative.desktopWidgetsSyncNote`)), 1)])])]));
    }
  });
export { z as t };