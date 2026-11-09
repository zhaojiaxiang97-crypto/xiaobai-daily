import { r as uiSwitchR, t as uiSwitchT } from "../ui/Switch.js";
import { $n as vueN, An as vueAn, Ct as vueCt, Et as vueEt, O as vueO, S as vueS, Wt as vueWt, Yt as vueYt, b as vueB, gt as vueGt, j as vueJ, k as vueK, rr as vueRr, ut as vueUt, v as vueV, x as vueX, y as vueY } from "../chunks/vue-i18n.runtime.js";
import { t as i18nT } from "../i18n/i18n-helper.js";
import { C as toolIconC, n as toolIconN, t as toolIconT } from "../chunks/tool-icons.js";
import { t as ToolboxWorkspaceHeaderT } from "./ToolboxWorkspaceHeader.js";
import { t as shieldalertT } from "../chunks/shield-alert.js";
import { _n as mainN } from "../chunks/main.js";
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
  z = vueJ({
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
        } = i18nT(),
        {
          status: U,
          check: W,
          request: G
        } = toolIconN(),
        K = vueV(() => !!(propsAlias.requiresAccessibility && propsAlias.enabled && U.value?.required && !U.value.granted)),
        q = vueV(() => toolIconT[propsAlias.tool.icon] || mainN);
      return vueUt(() => {
        propsAlias.requiresAccessibility && W();
      }), vueWt(() => propsAlias.enabled, e => {
        e && propsAlias.requiresAccessibility && W();
      }), (c, renderCache) => (vueGt(), vueS(`div`, E, [vueK(ToolboxWorkspaceHeaderT, {
        tool: propsAlias.tool,
        user: propsAlias.user,
        "credits-balance": propsAlias.creditsBalance,
        "voice-tool": false,
        "local-tool": ``,
        "show-history": false,
        "show-balance": false,
        onBack: renderCache[0] ||= e => emitAlias(`back`)
      }, null, 8, [`tool`, `user`, `credits-balance`]), vueY(`div`, D, [vueY(`section`, O, [vueY(`div`, k, [vueY(`span`, {
        class: vueN([`inline-flex size-12 shrink-0 items-center justify-center rounded-xl transition-colors`, propsAlias.enabled ? `bg-primary/10 text-primary` : `bg-muted text-muted-foreground`])
      }, [(vueGt(), vueB(vueEt(q.value), {
        size: 24,
        "stroke-width": 1.8
      }))], 2), vueY(`div`, A, [vueY(`div`, j, [vueY(`h1`, M, vueRr(propsAlias.tool.name), 1), vueY(`span`, {
        class: vueN([`inline-flex items-center gap-1 rounded-full px-2 py-px text-[11px] font-medium`, propsAlias.enabled ? `bg-primary/10 text-primary` : `bg-muted text-muted-foreground`])
      }, [vueY(`span`, {
        class: vueN([`size-1.5 rounded-full`, propsAlias.enabled ? `bg-primary` : `bg-muted-foreground/50`])
      }, null, 2), vueO(` ` + vueRr(propsAlias.statusText || (propsAlias.enabled ? vueAn(H)(`toolboxNative.desktopWidgetsOn`) : vueAn(H)(`toolboxNative.desktopWidgetsOff`))), 1)], 2)]), vueY(`p`, N, vueRr(propsAlias.description), 1)]), vueY(`div`, P, [vueCt(c.$slots, `actions`), vueK(vueAn(uiSwitchT), {
        "model-value": propsAlias.enabled,
        disabled: propsAlias.toggleDisabled,
        "aria-label": propsAlias.tool.name,
        "onUpdate:modelValue": renderCache[1] ||= e => emitAlias(`toggle`, e)
      }, null, 8, [`model-value`, `disabled`, `aria-label`])])]), c.$slots.notes || K.value ? (vueGt(), vueS(`div`, F, [vueCt(c.$slots, `notes`), K.value ? (vueGt(), vueS(`div`, I, [vueY(`span`, L, [vueK(vueAn(shieldalertT), {
        size: 15,
        class: `shrink-0`
      }), vueO(vueRr(vueAn(H)(`toolboxNative.desktopWidgetsMacAccessibility`)), 1)]), vueK(vueAn(uiSwitchR), {
        variant: `outline`,
        size: `sm`,
        class: `h-7 shrink-0 text-xs`,
        onClick: vueAn(G)
      }, {
        default: vueYt(() => [vueO(vueRr(vueAn(H)(`toolboxNative.desktopWidgetsGrantAccess`)), 1)]),
        _: 1
      }, 8, [`onClick`])])) : vueX(``, true)])) : vueX(``, true)]), vueCt(c.$slots, `default`), vueY(`p`, R, [vueK(vueAn(toolIconC), {
        size: 13,
        class: `mt-0.5 shrink-0`
      }), vueO(vueRr(propsAlias.footnote || vueAn(H)(`toolboxNative.desktopWidgetsSyncNote`)), 1)])])]));
    }
  });
export { z as t };