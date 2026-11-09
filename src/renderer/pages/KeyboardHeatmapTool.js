import { r as uiSwitchR } from "../ui/Switch.js";
import { An as vueAn, E as vueE, Et as vueEt, O as vueO, S as vueS, St as vueSt, Yt as vueYt, b as vueB, c as vueC, fn as vueFn, gt as vueGt, j as vueJ, k as vueK, nr as vueNr, rr as vueRr, v as vueV, x as vueX, y as vueY } from "../chunks/vue-i18n.runtime.js";
import { r as lucideR } from "../ui/icons/lucide-icons.js";
import { l as heatRangeL, s as heatRangeS } from "../chunks/HeatMapRangePicker.js";
import { t as i18nT } from "../i18n/i18n-helper.js";
import { O as motivatorO } from "../chunks/work-motivator.js";
import { r as toolIconR } from "../chunks/tool-icons.js";
import { t as useAuthT } from "../chunks/useAuth.js";
import { c as toolSettingsC, o as toolSettingsO } from "../chunks/toolSettingsContext.js";
import { $ as main, et as mainEt, h as mainH } from "../chunks/main.js";
import { t as DesktopWidgetPageT } from "./DesktopWidgetPage.js";
var M = lucideR(`hash`, [[`line`, {
    x1: `4`,
    x2: `20`,
    y1: `9`,
    y2: `9`,
    key: `4lhtct`
  }], [`line`, {
    x1: `4`,
    x2: `20`,
    y1: `15`,
    y2: `15`,
    key: `vyu0kd`
  }], [`line`, {
    x1: `10`,
    x2: `8`,
    y1: `3`,
    y2: `21`,
    key: `1ggp8o`
  }], [`line`, {
    x1: `16`,
    x2: `14`,
    y1: `3`,
    y2: `21`,
    key: `weycgp`
  }]]),
  N = {
    class: `grid gap-5 rounded-xl border border-border bg-card p-5 @3xl:grid-cols-[minmax(0,1fr)_280px] @3xl:items-center`
  },
  P = {
    class: `relative min-w-0`
  },
  F = {
    class: `flex flex-col gap-1 rounded-xl border border-border/60 bg-background/55 p-3 shadow-sm`,
    "aria-hidden": `true`
  },
  I = {
    class: `absolute -top-2 left-3 rounded-full border border-border bg-card px-2 text-[10px] leading-4 text-muted-foreground`
  },
  L = {
    class: `flex flex-col gap-4`
  },
  R = {
    class: `flex flex-col gap-1`
  },
  z = {
    class: `text-sm font-semibold`
  },
  B = {
    class: `text-xs leading-relaxed text-muted-foreground`
  },
  V = {
    class: `flex flex-col gap-3`
  },
  H = {
    class: `inline-flex size-7 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary`
  },
  U = {
    class: `flex min-w-0 flex-col gap-0.5`
  },
  W = {
    class: `text-xs font-semibold`
  },
  G = {
    class: `text-[11px] leading-snug text-muted-foreground`
  },
  K = vueJ({
    __name: `KeyboardHeatmapPreview`,
    props: {
      enableDisabled: {
        type: Boolean
      }
    },
    emits: [`enable`],
    setup(props, {
      emit: emit
    }) {
      let emitAlias = emit,
        {
          t: g
        } = i18nT(),
        options = {
          Space: 4,
          E: 4,
          "⌫": 4,
          T: 3,
          A: 3,
          O: 3,
          I: 3,
          N: 3,
          S: 3,
          R: 3,
          H: 2,
          L: 2,
          D: 2,
          C: 2,
          U: 2,
          M: 2,
          Enter: 2,
          Ctrl: 2,
          "⌘": 2,
          W: 1,
          Y: 1,
          P: 1,
          F: 1,
          G: 1,
          B: 1,
          V: 1,
          K: 1,
          Shift: 1,
          "⇧": 1,
          Tab: 1,
          ",": 1,
          ".": 1,
          1: 1,
          2: 1,
          0: 1
        },
        y = toolSettingsO.value ? [{
          label: `fn`
        }, {
          label: `⌃`
        }, {
          label: `⌥`,
          width: 1.25
        }, {
          label: `⌘`,
          width: 1.5
        }, {
          label: `Space`,
          width: 6.5
        }, {
          label: `⌘`,
          width: 1.5
        }, {
          label: `⌥`,
          width: 1.25
        }, {
          label: `⌃`
        }] : [{
          label: `Ctrl`,
          width: 1.5
        }, {
          label: `Win`,
          width: 1.25
        }, {
          label: `Alt`,
          width: 1.25
        }, {
          label: `Space`,
          width: 7
        }, {
          label: `Alt`,
          width: 1.25
        }, {
          label: `Fn`,
          width: 1.25
        }, {
          label: `Ctrl`,
          width: 1.5
        }],
        b = toolSettingsO.value ? `⇧` : `Shift`,
        handler = e => [...e].map(item => ({
          label: item
        })),
        T = [[...handler("`1234567890-="), {
          label: `⌫`,
          width: 2
        }], [{
          label: `Tab`,
          width: 1.5
        }, ...handler(`QWERTYUIOP[]`), {
          label: `\\`,
          width: 1.5
        }], [{
          label: `Caps`,
          width: 1.75
        }, ...handler(`ASDFGHJKL;'`), {
          label: `Enter`,
          width: 2.25
        }], [{
          label: b,
          width: 2.25
        }, ...handler(`ZXCVBNM,./`), {
          label: b,
          width: 2.75
        }], y];
      function E(e) {
        let fallbackValue = options[e] ?? 0;
        return fallbackValue > 0 ? `var(--heatmap-${fallbackValue})` : `var(--heatmap-empty)`;
      }
      let O = [{
        icon: M,
        title: `toolboxNative.keyboardHeatmapPointCountTitle`,
        desc: `toolboxNative.keyboardHeatmapPointCountDesc`
      }, {
        icon: motivatorO,
        title: `toolboxNative.keyboardHeatmapPointPrivacyTitle`,
        desc: `toolboxNative.keyboardHeatmapPointPrivacyDesc`
      }, {
        icon: heatRangeS,
        title: `toolboxNative.keyboardHeatmapPointLocalTitle`,
        desc: `toolboxNative.keyboardHeatmapPointLocalDesc`
      }];
      return (ctx, renderCache) => (vueGt(), vueS(`section`, N, [vueY(`div`, P, [vueY(`div`, F, [(vueGt(), vueS(vueC, null, vueSt(T, (e, t) => vueY(`div`, {
        key: t,
        class: `flex gap-1`
      }, [(vueGt(true), vueS(vueC, null, vueSt(e, (e, t) => (vueGt(), vueS(`span`, {
        key: t,
        class: `flex h-7 min-w-0 items-center justify-center overflow-hidden rounded-[5px] border border-border/70 text-[10px] leading-none text-foreground/70`,
        style: vueNr({
          flex: `${e.width ?? 1} 1 0`,
          background: E(e.label)
        })
      }, vueRr(e.label === `Space` ? `` : e.label), 5))), 128))])), 64))]), vueY(`span`, I, vueRr(vueAn(g)(`toolboxNative.keyboardHeatmapSample`)), 1)]), vueY(`div`, L, [vueY(`div`, R, [vueY(`strong`, z, vueRr(vueAn(g)(`toolboxNative.keyboardHeatmapPreviewTitle`)), 1), vueY(`small`, B, vueRr(vueAn(g)(`toolboxNative.keyboardHeatmapPreviewDesc`)), 1)]), vueY(`ul`, V, [(vueGt(), vueS(vueC, null, vueSt(O, e => vueY(`li`, {
        key: e.title,
        class: `flex gap-2.5`
      }, [vueY(`span`, H, [(vueGt(), vueB(vueEt(e.icon), {
        size: 14
      }))]), vueY(`span`, U, [vueY(`strong`, W, vueRr(vueAn(g)(e.title)), 1), vueY(`small`, G, vueRr(vueAn(g)(e.desc)), 1)])])), 64))]), vueK(vueAn(uiSwitchR), {
        size: `sm`,
        class: `self-start`,
        disabled: props.enableDisabled,
        onClick: renderCache[0] ||= e => emitAlias(`enable`)
      }, {
        default: vueYt(() => [vueO(vueRr(vueAn(g)(`toolboxNative.keyboardHeatmapEnableAction`)), 1)]),
        _: 1
      }, 8, [`disabled`])])]));
    }
  }),
  q = {
    key: 0,
    class: `text-muted-foreground`
  },
  J = {
    key: 1,
    class: `text-amber-600 dark:text-amber-400`
  },
  Y = {
    key: 2,
    class: `flex items-center justify-between gap-3 rounded-lg bg-destructive/[0.06] px-3 py-2 text-destructive`
  },
  X = {
    key: 0,
    class: `flex flex-col gap-3 rounded-xl border border-border bg-card p-4`
  },
  Z = {
    class: `flex flex-wrap items-center justify-between gap-2`
  },
  Q = {
    class: `text-[13px] font-semibold`
  },
  ee = {
    class: `flex items-center gap-1.5`
  },
  $ = `toolbox-keyboard-heatmap-range`,
  te = vueJ({
    __name: `KeyboardHeatmapTool`,
    props: {
      tool: {},
      user: {},
      creditsBalance: {},
      creditsPolicy: {},
      active: {
        type: Boolean
      },
      openRequest: {}
    },
    emits: [`back`, `recharge`],
    setup(props, {
      emit: emit
    }) {
      let propsAlias = props,
        emitAlias = emit,
        {
          t: translate
        } = i18nT(),
        {
          settings: y
        } = toolIconR(),
        {
          isLoggedIn: x
        } = useAuthT(),
        {
          controlsDisabled: C,
          navigate: M,
          keyboardHeatmapState: N,
          keyboardHeatmapConsentInfo: P,
          showKeyboardHeatmapConsent: F,
          isChangingKeyboardHeatmap: I,
          keyboardHeatmapBusy: L,
          handleKeyboardHeatmapToggle: R,
          enableKeyboardHeatmap: z,
          retryKeyboardHeatmap: B
        } = main(),
        V = vueV(() => y.value.enableKeyboardHeatmap),
        H = vueV(() => C.value || L.value || I.value || !x.value && !V.value),
        U = vueV(() => V.value && (N.value?.status === `error` || N.value?.status === `revoked`)),
        W = vueV(() => V.value ? `` : toolSettingsC.value ? translate(`settings.keyboardHeatmapWindowsNote`) : toolSettingsO.value ? translate(`settings.keyboardHeatmapMacNote`) : ``),
        G = vueV(() => !!W.value || !x.value || U.value);
      return (ctx, renderCache) => (vueGt(), vueB(DesktopWidgetPageT, {
        tool: propsAlias.tool,
        user: propsAlias.user,
        "credits-balance": propsAlias.creditsBalance,
        description: vueAn(translate)(`toolboxNative.keyboardHeatmapToolIntro`),
        enabled: V.value,
        "toggle-disabled": H.value,
        "status-text": V.value && vueAn(N)?.running ? vueAn(translate)(`settings.keyboardHeatmapRunning`) : undefined,
        "requires-accessibility": ``,
        onToggle: vueAn(R),
        onBack: renderCache[3] ||= e => emitAlias(`back`)
      }, vueE({
        default: vueYt(() => [V.value ? (vueGt(), vueS(`section`, X, [vueY(`header`, Z, [vueY(`strong`, Q, vueRr(vueAn(translate)(`toolboxNative.keyboardHeatmapDataTitle`)), 1), vueY(`div`, ee, [vueY(`div`, {
          id: $,
          class: `flex items-center`
        }), vueK(vueAn(uiSwitchR), {
          variant: `ghost`,
          size: `sm`,
          class: `h-7 gap-1 px-2 text-xs text-muted-foreground`,
          onClick: renderCache[0] ||= e => vueAn(M)(`heat-map-keyboard`)
        }, {
          default: vueYt(() => [vueO(vueRr(vueAn(translate)(`toolboxNative.keyboardHeatmapOpenPage`)), 1), vueK(vueAn(heatRangeL), {
            size: 14
          })]),
          _: 1
        })])]), propsAlias.active ? (vueGt(), vueB(mainH, {
          key: 0,
          "refresh-key": 0,
          "range-picker-target": `#${$}`,
          "hide-tracking-error": ``,
          onNavigate: vueAn(M)
        }, null, 8, [`range-picker-target`, `onNavigate`])) : vueX(``, true)])) : (vueGt(), vueB(K, {
          key: 1,
          "enable-disabled": H.value,
          onEnable: renderCache[1] ||= e => vueAn(R)(true)
        }, null, 8, [`enable-disabled`])), vueK(mainEt, {
          open: vueAn(F),
          "onUpdate:open": renderCache[2] ||= e => vueFn(F) ? F.value = e : null,
          "consent-info": vueAn(P),
          onConfirm: vueAn(z)
        }, null, 8, [`open`, `consent-info`, `onConfirm`])]),
        _: 2
      }, [G.value ? {
        name: `notes`,
        fn: vueYt(() => [W.value ? (vueGt(), vueS(`p`, q, vueRr(W.value), 1)) : vueX(``, true), vueAn(x) ? vueX(``, true) : (vueGt(), vueS(`p`, J, vueRr(vueAn(translate)(`settings.keyboardHeatmapLoginRequired`)), 1)), U.value ? (vueGt(), vueS(`div`, Y, [vueY(`span`, null, vueRr(vueAn(N)?.errorMessage || vueAn(translate)(`settings.keyboardHeatmapFailed`)), 1), vueK(vueAn(uiSwitchR), {
          variant: `outline`,
          size: `sm`,
          class: `h-7 shrink-0 text-xs`,
          disabled: vueAn(I),
          onClick: vueAn(B)
        }, {
          default: vueYt(() => [vueO(vueRr(vueAn(translate)(`common.retry`)), 1)]),
          _: 1
        }, 8, [`disabled`, `onClick`])])) : vueX(``, true)]),
        key: `0`
      } : undefined]), 1032, [`tool`, `user`, `credits-balance`, `description`, `enabled`, `toggle-disabled`, `status-text`, `onToggle`]));
    }
  });
export { te as default };