import { r as e } from "../ui/Switch.js";
import { An as t, E as n, Et as r, O as i, S as a, St as o, Yt as s, b as c, c as l, fn as u, gt as d, j as f, k as p, nr as m, rr as h, v as g, x as _, y as v } from "../chunks/vue-i18n.runtime.js";
import { r as y } from "../ui/icons/lucide-icons.js";
import { l as b, s as x } from "../chunks/HeatMapRangePicker.js";
import { t as S } from "../i18n/i18n-helper.js";
import { O as C } from "../chunks/work-motivator.js";
import { r as w } from "../chunks/tool-icons.js";
import { t as T } from "../chunks/useAuth.js";
import { c as E, o as D } from "../chunks/toolSettingsContext.js";
import { $ as O, et as k, h as A } from "../chunks/main.js";
import { t as j } from "./DesktopWidgetPage.js";
var M = y(`hash`, [[`line`, {
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
  K = f({
    __name: `KeyboardHeatmapPreview`,
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
        } = S(),
        _ = {
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
        y = D.value ? [{
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
        b = D.value ? `⇧` : `Shift`,
        w = e => [...e].map(e => ({
          label: e
        })),
        T = [[...w("`1234567890-="), {
          label: `⌫`,
          width: 2
        }], [{
          label: `Tab`,
          width: 1.5
        }, ...w(`QWERTYUIOP[]`), {
          label: `\\`,
          width: 1.5
        }], [{
          label: `Caps`,
          width: 1.75
        }, ...w(`ASDFGHJKL;'`), {
          label: `Enter`,
          width: 2.25
        }], [{
          label: b,
          width: 2.25
        }, ...w(`ZXCVBNM,./`), {
          label: b,
          width: 2.75
        }], y];
      function E(e) {
        let t = _[e] ?? 0;
        return t > 0 ? `var(--heatmap-${t})` : `var(--heatmap-empty)`;
      }
      let O = [{
        icon: M,
        title: `toolboxNative.keyboardHeatmapPointCountTitle`,
        desc: `toolboxNative.keyboardHeatmapPointCountDesc`
      }, {
        icon: C,
        title: `toolboxNative.keyboardHeatmapPointPrivacyTitle`,
        desc: `toolboxNative.keyboardHeatmapPointPrivacyDesc`
      }, {
        icon: x,
        title: `toolboxNative.keyboardHeatmapPointLocalTitle`,
        desc: `toolboxNative.keyboardHeatmapPointLocalDesc`
      }];
      return (u, _) => (d(), a(`section`, N, [v(`div`, P, [v(`div`, F, [(d(), a(l, null, o(T, (e, t) => v(`div`, {
        key: t,
        class: `flex gap-1`
      }, [(d(true), a(l, null, o(e, (e, t) => (d(), a(`span`, {
        key: t,
        class: `flex h-7 min-w-0 items-center justify-center overflow-hidden rounded-[5px] border border-border/70 text-[10px] leading-none text-foreground/70`,
        style: m({
          flex: `${e.width ?? 1} 1 0`,
          background: E(e.label)
        })
      }, h(e.label === `Space` ? `` : e.label), 5))), 128))])), 64))]), v(`span`, I, h(t(g)(`toolboxNative.keyboardHeatmapSample`)), 1)]), v(`div`, L, [v(`div`, R, [v(`strong`, z, h(t(g)(`toolboxNative.keyboardHeatmapPreviewTitle`)), 1), v(`small`, B, h(t(g)(`toolboxNative.keyboardHeatmapPreviewDesc`)), 1)]), v(`ul`, V, [(d(), a(l, null, o(O, e => v(`li`, {
        key: e.title,
        class: `flex gap-2.5`
      }, [v(`span`, H, [(d(), c(r(e.icon), {
        size: 14
      }))]), v(`span`, U, [v(`strong`, W, h(t(g)(e.title)), 1), v(`small`, G, h(t(g)(e.desc)), 1)])])), 64))]), p(t(e), {
        size: `sm`,
        class: `self-start`,
        disabled: n.enableDisabled,
        onClick: _[0] ||= e => f(`enable`)
      }, {
        default: s(() => [i(h(t(g)(`toolboxNative.keyboardHeatmapEnableAction`)), 1)]),
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
  te = f({
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
    setup(r, {
      emit: o
    }) {
      let l = r,
        f = o,
        {
          t: m
        } = S(),
        {
          settings: y
        } = w(),
        {
          isLoggedIn: x
        } = T(),
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
        } = O(),
        V = g(() => y.value.enableKeyboardHeatmap),
        H = g(() => C.value || L.value || I.value || !x.value && !V.value),
        U = g(() => V.value && (N.value?.status === `error` || N.value?.status === `revoked`)),
        W = g(() => V.value ? `` : E.value ? m(`settings.keyboardHeatmapWindowsNote`) : D.value ? m(`settings.keyboardHeatmapMacNote`) : ``),
        G = g(() => !!W.value || !x.value || U.value);
      return (r, o) => (d(), c(j, {
        tool: l.tool,
        user: l.user,
        "credits-balance": l.creditsBalance,
        description: t(m)(`toolboxNative.keyboardHeatmapToolIntro`),
        enabled: V.value,
        "toggle-disabled": H.value,
        "status-text": V.value && t(N)?.running ? t(m)(`settings.keyboardHeatmapRunning`) : undefined,
        "requires-accessibility": ``,
        onToggle: t(R),
        onBack: o[3] ||= e => f(`back`)
      }, n({
        default: s(() => [V.value ? (d(), a(`section`, X, [v(`header`, Z, [v(`strong`, Q, h(t(m)(`toolboxNative.keyboardHeatmapDataTitle`)), 1), v(`div`, ee, [v(`div`, {
          id: $,
          class: `flex items-center`
        }), p(t(e), {
          variant: `ghost`,
          size: `sm`,
          class: `h-7 gap-1 px-2 text-xs text-muted-foreground`,
          onClick: o[0] ||= e => t(M)(`heat-map-keyboard`)
        }, {
          default: s(() => [i(h(t(m)(`toolboxNative.keyboardHeatmapOpenPage`)), 1), p(t(b), {
            size: 14
          })]),
          _: 1
        })])]), l.active ? (d(), c(A, {
          key: 0,
          "refresh-key": 0,
          "range-picker-target": `#${$}`,
          "hide-tracking-error": ``,
          onNavigate: t(M)
        }, null, 8, [`range-picker-target`, `onNavigate`])) : _(``, true)])) : (d(), c(K, {
          key: 1,
          "enable-disabled": H.value,
          onEnable: o[1] ||= e => t(R)(true)
        }, null, 8, [`enable-disabled`])), p(k, {
          open: t(F),
          "onUpdate:open": o[2] ||= e => u(F) ? F.value = e : null,
          "consent-info": t(P),
          onConfirm: t(z)
        }, null, 8, [`open`, `consent-info`, `onConfirm`])]),
        _: 2
      }, [G.value ? {
        name: `notes`,
        fn: s(() => [W.value ? (d(), a(`p`, q, h(W.value), 1)) : _(``, true), t(x) ? _(``, true) : (d(), a(`p`, J, h(t(m)(`settings.keyboardHeatmapLoginRequired`)), 1)), U.value ? (d(), a(`div`, Y, [v(`span`, null, h(t(N)?.errorMessage || t(m)(`settings.keyboardHeatmapFailed`)), 1), p(t(e), {
          variant: `outline`,
          size: `sm`,
          class: `h-7 shrink-0 text-xs`,
          disabled: t(I),
          onClick: t(B)
        }, {
          default: s(() => [i(h(t(m)(`common.retry`)), 1)]),
          _: 1
        }, 8, [`disabled`, `onClick`])])) : _(``, true)]),
        key: `0`
      } : undefined]), 1032, [`tool`, `user`, `credits-balance`, `description`, `enabled`, `toggle-disabled`, `status-text`, `onToggle`]));
    }
  });
export { te as default };