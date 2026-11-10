import { r as e } from "../ui/Switch.js";
import { An as t, E as n, Et as r, O as i, S as a, St as o, Yt as s, b as c, c as l, fn as u, gt as d, j as f, k as p, nr as m, rr as h, v as g, x as _, y as v } from "../chunks/vue-i18n.runtime.js";
import { l as y, s as b } from "../chunks/HeatMapRangePicker.js";
import { t as x } from "../i18n/i18n-helper.js";
import { O as S } from "../chunks/work-motivator.js";
import { x as C } from "../chunks/tool-icons.js";
import { t as w } from "../chunks/toolSettingsContext.js";
import { Q as T, Z as E, m as D } from "../chunks/main.js";
import { t as O } from "./DesktopWidgetPage.js";
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
  H = f({
    __name: `MouseHeatmapPreview`,
    props: {
      enableDisabled: {
        type: Boolean
      }
    },
    emits: [`enable`],
    setup(n, {
      emit: u
    }) {
      let f = u,
        {
          t: g
        } = x(),
        _ = [{
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
        }].map(e => `radial-gradient(circle at ${e.x}% ${e.y}%, rgba(22, 163, 74, ${e.alpha}) 0, rgba(22, 163, 74, 0) ${e.size}%)`).join(`, `),
        y = [{
          icon: C,
          title: `toolboxNative.mouseHeatmapPointCountTitle`,
          desc: `toolboxNative.mouseHeatmapPointCountDesc`
        }, {
          icon: S,
          title: `toolboxNative.mouseHeatmapPointPrivacyTitle`,
          desc: `toolboxNative.mouseHeatmapPointPrivacyDesc`
        }, {
          icon: b,
          title: `toolboxNative.mouseHeatmapPointLocalTitle`,
          desc: `toolboxNative.mouseHeatmapPointLocalDesc`
        }];
      return (u, b) => (d(), a(`section`, k, [v(`div`, A, [v(`div`, j, [v(`div`, {
        class: `aspect-[16/9] w-full rounded-lg border border-border/70 bg-[#f1f1ef] dark:bg-[#22262a]`,
        style: m({
          backgroundImage: t(_)
        })
      }, null, 4)]), v(`span`, M, h(t(g)(`toolboxNative.mouseHeatmapSample`)), 1)]), v(`div`, N, [v(`div`, P, [v(`strong`, F, h(t(g)(`toolboxNative.mouseHeatmapPreviewTitle`)), 1), v(`small`, I, h(t(g)(`toolboxNative.mouseHeatmapPreviewDesc`)), 1)]), v(`ul`, L, [(d(), a(l, null, o(y, e => v(`li`, {
        key: e.title,
        class: `flex gap-2.5`
      }, [v(`span`, R, [(d(), c(r(e.icon), {
        size: 14
      }))]), v(`span`, z, [v(`strong`, B, h(t(g)(e.title)), 1), v(`small`, V, h(t(g)(e.desc)), 1)])])), 64))]), p(t(e), {
        size: `sm`,
        class: `self-start`,
        disabled: n.enableDisabled,
        onClick: b[0] ||= e => f(`enable`)
      }, {
        default: s(() => [i(h(t(g)(`toolboxNative.mouseHeatmapEnableAction`)), 1)]),
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
  Y = f({
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
    setup(r, {
      emit: o
    }) {
      let l = r,
        f = o,
        {
          t: m
        } = x(),
        {
          controlsDisabled: b,
          navigate: S
        } = w(),
        {
          mouseHeatmapEnabled: C,
          mouseHeatmapAppUsageOff: k,
          showMouseHeatmapConsent: A,
          isChangingMouseHeatmap: j,
          handleMouseHeatmapToggle: M,
          enableMouseHeatmap: N
        } = E(`toolbox`),
        P = g(() => b.value || j.value),
        F = g(() => C.value && !k.value ? m(`settings.mouseHeatmapRunning`) : undefined),
        I = g(() => C.value && k.value);
      return (r, o) => (d(), c(O, {
        tool: l.tool,
        user: l.user,
        "credits-balance": l.creditsBalance,
        description: t(m)(`toolboxNative.mouseHeatmapToolIntro`),
        enabled: t(C),
        "toggle-disabled": P.value,
        "status-text": F.value,
        onToggle: t(M),
        onBack: o[4] ||= e => f(`back`)
      }, n({
        default: s(() => [t(C) ? (d(), a(`section`, W, [v(`header`, G, [v(`strong`, K, h(t(m)(`toolboxNative.mouseHeatmapDataTitle`)), 1), v(`div`, q, [v(`div`, {
          id: J,
          class: `flex items-center`
        }), p(t(e), {
          variant: `ghost`,
          size: `sm`,
          class: `h-7 gap-1 px-2 text-xs text-muted-foreground`,
          onClick: o[1] ||= e => t(S)(`heat-map-mouse`)
        }, {
          default: s(() => [i(h(t(m)(`toolboxNative.mouseHeatmapOpenPage`)), 1), p(t(y), {
            size: 14
          })]),
          _: 1
        })])]), l.active ? (d(), c(D, {
          key: 0,
          "refresh-key": 0,
          "range-picker-target": `#${J}`,
          embedded: ``,
          onNavigate: t(S)
        }, null, 8, [`range-picker-target`, `onNavigate`])) : _(``, true)])) : (d(), c(H, {
          key: 1,
          "enable-disabled": P.value,
          onEnable: o[2] ||= e => t(M)(true)
        }, null, 8, [`enable-disabled`])), p(T, {
          open: t(A),
          "onUpdate:open": o[3] ||= e => u(A) ? A.value = e : null,
          onConfirm: t(N)
        }, null, 8, [`open`, `onConfirm`])]),
        _: 2
      }, [I.value ? {
        name: `notes`,
        fn: s(() => [v(`div`, U, [v(`span`, null, h(t(m)(`settings.mouseHeatmapAppUsageOff`)), 1), p(t(e), {
          variant: `outline`,
          size: `sm`,
          class: `h-7 shrink-0 text-xs`,
          onClick: o[0] ||= e => t(S)(`settings-app-usage-tracking`)
        }, {
          default: s(() => [i(h(t(m)(`settings.mouseHeatmapOpenAppUsage`)), 1)]),
          _: 1
        })])]),
        key: `0`
      } : undefined]), 1032, [`tool`, `user`, `credits-balance`, `description`, `enabled`, `toggle-disabled`, `status-text`, `onToggle`]));
    }
  });
export { Y as default };