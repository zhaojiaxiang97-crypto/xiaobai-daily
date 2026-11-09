import { r as uiSwitchR } from "../ui/Switch.js";
import { An as vueAn, E as vueE, Et as vueEt, O as vueO, S as vueS, St as vueSt, Yt as vueYt, b as vueB, c as vueC, fn as vueFn, gt as vueGt, j as vueJ, k as vueK, nr as vueNr, rr as vueRr, v as vueV, x as vueX, y as vueY } from "../chunks/vue-i18n.runtime.js";
import { l as heatRangeL, s as heatRangeS } from "../chunks/HeatMapRangePicker.js";
import { t as i18nT } from "../i18n/i18n-helper.js";
import { O as motivatorO } from "../chunks/work-motivator.js";
import { x as toolIconX } from "../chunks/tool-icons.js";
import { t as toolSettingsT } from "../chunks/toolSettingsContext.js";
import { Q as mainQ, Z as mainZ, m as mainM } from "../chunks/main.js";
import { t as DesktopWidgetPageT } from "./DesktopWidgetPage.js";
var k = {
    class: `grid gap-5 rounded-xl border border-border bg-card p-5 @3xl:grid-cols-[minmax(0,1fr)_280px] @3xl:items-center`
  },
  A = {
    class: `relative min-w-0`
  },
  j = {
    class: `rounded-xl border border-border/60 bg-background/55 p-3 shadow-sm`,
    "aria-hidden": `true`
  },
  M = {
    class: `absolute -top-2 left-3 rounded-full border border-border bg-card px-2 text-[10px] leading-4 text-muted-foreground`
  },
  N = {
    class: `flex flex-col gap-4`
  },
  P = {
    class: `flex flex-col gap-1`
  },
  F = {
    class: `text-sm font-semibold`
  },
  I = {
    class: `text-xs leading-relaxed text-muted-foreground`
  },
  L = {
    class: `flex flex-col gap-3`
  },
  R = {
    class: `inline-flex size-7 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary`
  },
  z = {
    class: `flex min-w-0 flex-col gap-0.5`
  },
  B = {
    class: `text-xs font-semibold`
  },
  V = {
    class: `text-[11px] leading-snug text-muted-foreground`
  },
  H = vueJ({
    __name: `MouseHeatmapPreview`,
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
        joined = [{
          x: 14,
          y: 18,
          size: 26,
          alpha: .42
        }, {
          x: 44,
          y: 46,
          size: 34,
          alpha: .5
        }, {
          x: 58,
          y: 40,
          size: 22,
          alpha: .36
        }, {
          x: 32,
          y: 62,
          size: 20,
          alpha: .28
        }, {
          x: 50,
          y: 94,
          size: 30,
          alpha: .62
        }, {
          x: 95,
          y: 6,
          size: 12,
          alpha: .4
        }, {
          x: 80,
          y: 70,
          size: 16,
          alpha: .22
        }].map(count => `radial-gradient(circle at ${count.x}% ${count.y}%, rgba(22, 163, 74, ${count.alpha}) 0, rgba(22, 163, 74, 0) ${count.size}%)`).join(`, `),
        y = [{
          icon: toolIconX,
          title: `toolboxNative.mouseHeatmapPointCountTitle`,
          desc: `toolboxNative.mouseHeatmapPointCountDesc`
        }, {
          icon: motivatorO,
          title: `toolboxNative.mouseHeatmapPointPrivacyTitle`,
          desc: `toolboxNative.mouseHeatmapPointPrivacyDesc`
        }, {
          icon: heatRangeS,
          title: `toolboxNative.mouseHeatmapPointLocalTitle`,
          desc: `toolboxNative.mouseHeatmapPointLocalDesc`
        }];
      return (ctx, renderCache) => (vueGt(), vueS(`section`, k, [vueY(`div`, A, [vueY(`div`, j, [vueY(`div`, {
        class: `aspect-[16/9] w-full rounded-lg border border-border/70 bg-[#f1f1ef] dark:bg-[#22262a]`,
        style: vueNr({
          backgroundImage: vueAn(joined)
        })
      }, null, 4)]), vueY(`span`, M, vueRr(vueAn(g)(`toolboxNative.mouseHeatmapSample`)), 1)]), vueY(`div`, N, [vueY(`div`, P, [vueY(`strong`, F, vueRr(vueAn(g)(`toolboxNative.mouseHeatmapPreviewTitle`)), 1), vueY(`small`, I, vueRr(vueAn(g)(`toolboxNative.mouseHeatmapPreviewDesc`)), 1)]), vueY(`ul`, L, [(vueGt(), vueS(vueC, null, vueSt(y, e => vueY(`li`, {
        key: e.title,
        class: `flex gap-2.5`
      }, [vueY(`span`, R, [(vueGt(), vueB(vueEt(e.icon), {
        size: 14
      }))]), vueY(`span`, z, [vueY(`strong`, B, vueRr(vueAn(g)(e.title)), 1), vueY(`small`, V, vueRr(vueAn(g)(e.desc)), 1)])])), 64))]), vueK(vueAn(uiSwitchR), {
        size: `sm`,
        class: `self-start`,
        disabled: props.enableDisabled,
        onClick: renderCache[0] ||= e => emitAlias(`enable`)
      }, {
        default: vueYt(() => [vueO(vueRr(vueAn(g)(`toolboxNative.mouseHeatmapEnableAction`)), 1)]),
        _: 1
      }, 8, [`disabled`])])]));
    }
  }),
  U = {
    class: `flex items-center justify-between gap-3 rounded-lg bg-amber-500/[0.08] px-3 py-2 text-amber-700 dark:text-amber-300`
  },
  W = {
    key: 0,
    class: `flex flex-col gap-3 rounded-xl border border-border bg-card p-4`
  },
  G = {
    class: `flex flex-wrap items-center justify-between gap-2`
  },
  K = {
    class: `text-[13px] font-semibold`
  },
  q = {
    class: `flex items-center gap-1.5`
  },
  J = `toolbox-mouse-heatmap-range`,
  Y = vueJ({
    __name: `MouseHeatmapTool`,
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
          controlsDisabled: b,
          navigate: S
        } = toolSettingsT(),
        {
          mouseHeatmapEnabled: C,
          mouseHeatmapAppUsageOff: k,
          showMouseHeatmapConsent: A,
          isChangingMouseHeatmap: j,
          handleMouseHeatmapToggle: M,
          enableMouseHeatmap: N
        } = mainZ(`toolbox`),
        P = vueV(() => b.value || j.value),
        F = vueV(() => C.value && !k.value ? translate(`settings.mouseHeatmapRunning`) : undefined),
        I = vueV(() => C.value && k.value);
      return (ctx, renderCache) => (vueGt(), vueB(DesktopWidgetPageT, {
        tool: propsAlias.tool,
        user: propsAlias.user,
        "credits-balance": propsAlias.creditsBalance,
        description: vueAn(translate)(`toolboxNative.mouseHeatmapToolIntro`),
        enabled: vueAn(C),
        "toggle-disabled": P.value,
        "status-text": F.value,
        onToggle: vueAn(M),
        onBack: renderCache[4] ||= e => emitAlias(`back`)
      }, vueE({
        default: vueYt(() => [vueAn(C) ? (vueGt(), vueS(`section`, W, [vueY(`header`, G, [vueY(`strong`, K, vueRr(vueAn(translate)(`toolboxNative.mouseHeatmapDataTitle`)), 1), vueY(`div`, q, [vueY(`div`, {
          id: J,
          class: `flex items-center`
        }), vueK(vueAn(uiSwitchR), {
          variant: `ghost`,
          size: `sm`,
          class: `h-7 gap-1 px-2 text-xs text-muted-foreground`,
          onClick: renderCache[1] ||= e => vueAn(S)(`heat-map-mouse`)
        }, {
          default: vueYt(() => [vueO(vueRr(vueAn(translate)(`toolboxNative.mouseHeatmapOpenPage`)), 1), vueK(vueAn(heatRangeL), {
            size: 14
          })]),
          _: 1
        })])]), propsAlias.active ? (vueGt(), vueB(mainM, {
          key: 0,
          "refresh-key": 0,
          "range-picker-target": `#${J}`,
          embedded: ``,
          onNavigate: vueAn(S)
        }, null, 8, [`range-picker-target`, `onNavigate`])) : vueX(``, true)])) : (vueGt(), vueB(H, {
          key: 1,
          "enable-disabled": P.value,
          onEnable: renderCache[2] ||= e => vueAn(M)(true)
        }, null, 8, [`enable-disabled`])), vueK(mainQ, {
          open: vueAn(A),
          "onUpdate:open": renderCache[3] ||= e => vueFn(A) ? A.value = e : null,
          onConfirm: vueAn(N)
        }, null, 8, [`open`, `onConfirm`])]),
        _: 2
      }, [I.value ? {
        name: `notes`,
        fn: vueYt(() => [vueY(`div`, U, [vueY(`span`, null, vueRr(vueAn(translate)(`settings.mouseHeatmapAppUsageOff`)), 1), vueK(vueAn(uiSwitchR), {
          variant: `outline`,
          size: `sm`,
          class: `h-7 shrink-0 text-xs`,
          onClick: renderCache[0] ||= e => vueAn(S)(`settings-app-usage-tracking`)
        }, {
          default: vueYt(() => [vueO(vueRr(vueAn(translate)(`settings.mouseHeatmapOpenAppUsage`)), 1)]),
          _: 1
        })])]),
        key: `0`
      } : undefined]), 1032, [`tool`, `user`, `credits-balance`, `description`, `enabled`, `toggle-disabled`, `status-text`, `onToggle`]));
    }
  });
export { Y as default };