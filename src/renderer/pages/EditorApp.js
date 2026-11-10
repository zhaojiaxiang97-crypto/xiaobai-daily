import { At as e, Ct as t, Dt as n, Et as r, Ot as i, Tt as a, jt as o, kt as s, r as c, t as l, wt as u } from "../ui/Switch.js";
import { $n as d, An as f, Cn as p, Et as m, O as h, S as g, St as _, Wt as v, Yt as y, Zt as b, b as x, bn as S, c as C, gt as w, j as T, k as E, nr as D, ot as O, rr as k, rt as ee, ut as A, v as j, x as M, y as N } from "../chunks/vue-i18n.runtime.js";
import { C as P, E as F, r as te, w as ne } from "../i18n/en-US-player.js";
import { n as re, r as I, t as L } from "../ui/icons/lucide-icons.js";
import { t as ie } from "../chunks/check.js";
import { s as ae } from "../ui/PopperContent.js";
import { _ as R, a as oe, d as se, f as z, g as ce, i as le, m as ue, n as de, o as fe, p as B, r as pe, t as me, u as V, v as he, y as ge } from "../chunks/screenshot-beautifier.js";
import { n as _e, t as ve } from "../ui/DropdownMenuItem.js";
import { n as ye, t as be } from "../chunks/undo-2.js";
import { _ as xe, a as Se, c as Ce, d as we, i as Te, l as H, m as Ee, n as De, o as Oe, p as ke, r as Ae, s as je, t as Me, u as U, v as Ne, y as Pe } from "../chunks/compose.js";
import { n as Fe, r as Ie, t as Le } from "../ui/DropdownMenuTrigger.js";
import { t as W } from "../ui/Slider.js";
import { a as G, i as Re, n as ze, r as Be, t as Ve } from "../chunks/screenshotTool.js";
var He = I(`grid-3x3`, [[`rect`, {
    width: `18`,
    height: `18`,
    x: `3`,
    y: `3`,
    rx: `2`,
    key: `afitv7`
  }], [`path`, {
    d: `M3 9h18`,
    key: `1pudct`
  }], [`path`, {
    d: `M3 15h18`,
    key: `5xshup`
  }], [`path`, {
    d: `M9 3v18`,
    key: `fh3hqa`
  }], [`path`, {
    d: `M15 3v18`,
    key: `14nvp0`
  }]]),
  Ue = I(`highlighter`, [[`path`, {
    d: `m9 11-6 6v3h9l3-3`,
    key: `1a3l36`
  }], [`path`, {
    d: `m22 12-4.6 4.6a2 2 0 0 1-2.8 0l-5.2-5.2a2 2 0 0 1 0-2.8L14 4`,
    key: `14a9rk`
  }]]),
  We = I(`move-up-right`, [[`path`, {
    d: `M13 5H19V11`,
    key: `1n1gyv`
  }], [`path`, {
    d: `M19 5L5 19`,
    key: `72u4yj`
  }]]),
  Ge = I(`redo-2`, [[`path`, {
    d: `m15 14 5-5-5-5`,
    key: `12vg1m`
  }], [`path`, {
    d: `M20 9H9.5A5.5 5.5 0 0 0 4 14.5A5.5 5.5 0 0 0 9.5 20H13`,
    key: `6uklza`
  }]]),
  K = {
    class: `flex h-full min-h-0 flex-col gap-3 px-4 pb-4 pt-4`
  },
  Ke = {
    class: `text-[11px] leading-relaxed text-muted-foreground`
  },
  qe = {
    key: 1,
    class: `rounded-md bg-destructive/10 px-2.5 py-2 text-[11px] leading-relaxed text-destructive`
  },
  Je = {
    key: 0,
    class: `text-xs text-muted-foreground`
  },
  Ye = T({
    __name: `OcrPanel`,
    props: {
      sessionId: {},
      supported: {
        type: Boolean
      },
      autoRun: {
        type: Boolean
      }
    },
    emits: [`toast`],
    setup(e, {
      expose: t,
      emit: n
    }) {
      let r = e,
        i = n,
        editor = window.screenshotToolAPI.editor,
        o = S(false),
        s = S(``),
        l = S(``),
        u = S(false),
        d = S(false),
        p = 0,
        m = null;
      async function _() {
        if (!r.supported || o.value || !r.sessionId) return;
        let e = ++p;
        o.value = true, l.value = ``;
        try {
          let t = await editor.ocr({
            id: r.sessionId
          });
          if (e !== p) return;
          if (!t.ok) {
            l.value = t.error.message;
            return;
          }
          s.value = t.data.text, u.value = true;
        } catch (t) {
          e === p && (l.value = t instanceof Error ? t.message : String(t));
        } finally {
          e === p && (o.value = false);
        }
      }
      async function T() {
        if (s.value) try {
          await navigator.clipboard.writeText(s.value), d.value = true, i(`toast`, G(`OcrCopied`)), m !== null && window.clearTimeout(m), m = window.setTimeout(() => {
            d.value = false, m = null;
          }, 1400);
        } catch {
          i(`toast`, G(`ActionFailed`));
        }
      }
      return v(() => r.sessionId, () => {
        p += 1, o.value = false, s.value = ``, l.value = ``, u.value = false, r.autoRun && _();
      }, {
        immediate: true
      }), t({
        run: _
      }), (t, n) => (w(), g(`div`, K, [N(`p`, Ke, k(e.supported ? f(G)(`OcrHint`) : f(G)(`OcrUnsupported`)), 1), e.supported ? (w(), x(f(c), {
        key: 0,
        variant: `outline`,
        size: `sm`,
        class: `w-full text-xs`,
        disabled: o.value,
        onClick: _
      }, {
        default: y(() => [o.value ? (w(), x(f(R), {
          key: 0,
          size: 14,
          class: `animate-spin`
        })) : (w(), x(f(Pe), {
          key: 1,
          size: 14
        })), h(` ` + k(o.value ? f(G)(`OcrRunning`) : u.value ? f(G)(`OcrRerun`) : f(G)(`OcrRun`)), 1)]),
        _: 1
      }, 8, [`disabled`])) : M(``, true), l.value ? (w(), g(`p`, qe, k(l.value), 1)) : M(``, true), u.value && !l.value ? (w(), g(C, {
        key: 2
      }, [s.value ? (w(), g(C, {
        key: 1
      }, [b(N(`textarea`, {
        "onUpdate:modelValue": n[0] ||= e => s.value = e,
        class: `min-h-0 flex-1 resize-none rounded-lg border border-input bg-background p-2.5 text-[13px] leading-relaxed outline-none focus:border-ring`,
        spellcheck: `false`,
        onKeydown: n[1] ||= F(() => {}, [`stop`])
      }, null, 544), [[P, s.value]]), E(f(c), {
        size: `sm`,
        class: `w-full text-xs`,
        onClick: T
      }, {
        default: y(() => [d.value ? (w(), x(f(ie), {
          key: 0,
          size: 14
        })) : (w(), x(f(ge), {
          key: 1,
          size: 14
        })), h(k(f(G)(`OcrCopy`)), 1)]),
        _: 1
      })], 64)) : (w(), g(`p`, Je, k(f(G)(`OcrEmpty`)), 1))], 64)) : M(``, true)]));
    }
  }),
  q = {
    class: `flex flex-col gap-5 px-4 pb-6 pt-4 text-[13px]`
  },
  J = {
    class: `flex items-center justify-between gap-3`
  },
  Xe = {
    class: `flex min-w-0 flex-col gap-0.5`
  },
  Ze = {
    class: `text-[13px] font-semibold`
  },
  Qe = {
    class: `text-[11px] text-muted-foreground`
  },
  Y = {
    class: `flex flex-col gap-2`
  },
  X = {
    class: `flex items-center justify-between`
  },
  $e = {
    class: `text-xs font-semibold text-muted-foreground`
  },
  et = {
    key: 0,
    class: `flex items-center gap-1.5`
  },
  tt = [`maxlength`, `placeholder`],
  nt = [`disabled`, `title`],
  rt = [`title`],
  it = {
    class: `grid grid-cols-3 gap-2`
  },
  at = [`title`, `onClick`],
  ot = {
    class: `relative flex h-11 items-center justify-center overflow-hidden rounded-md border border-black/5 dark:border-white/10`
  },
  st = {
    class: `relative h-5 w-9 rounded-[3px] bg-white shadow-[0_2px_6px_rgb(0_0_0/0.25)] dark:bg-zinc-200`
  },
  ct = {
    class: `truncate px-0.5 text-[11px] text-muted-foreground`
  },
  lt = [`title`, `onClick`],
  Z = {
    class: `flex flex-col gap-2`
  },
  ut = {
    class: `text-xs font-semibold text-muted-foreground`
  },
  dt = {
    class: `grid grid-cols-5 gap-0.5 rounded-lg bg-muted p-0.5`
  },
  Q = [`onClick`],
  ft = {
    key: 0,
    class: `flex flex-col gap-2`
  },
  pt = {
    class: `flex items-center justify-end`
  },
  mt = [`disabled`],
  ht = [`disabled`],
  gt = {
    key: 0,
    class: `flex h-16 items-center justify-center text-[11px] text-muted-foreground`
  },
  _t = {
    key: 1,
    class: `grid max-h-72 grid-cols-3 gap-2 overflow-y-auto p-0.5`
  },
  vt = [`disabled`, `title`, `onClick`],
  yt = [`src`, `alt`],
  bt = {
    key: 2,
    class: `text-center text-[11px] text-muted-foreground`
  },
  xt = {
    key: 3,
    class: `text-[11px] text-muted-foreground`
  },
  St = {
    key: 4,
    class: `text-[11px] text-muted-foreground`,
    role: `status`
  },
  Ct = {
    key: 1,
    class: `flex flex-wrap gap-1.5`
  },
  wt = [`title`, `onClick`],
  Tt = [`title`],
  Et = [`value`],
  Dt = {
    key: 2,
    class: `flex flex-wrap gap-1.5`
  },
  Ot = [`onClick`],
  kt = {
    key: 3,
    class: `text-[11px] text-muted-foreground`
  },
  At = {
    key: 4,
    class: `text-[11px] text-muted-foreground`
  },
  $ = {
    class: `flex flex-col gap-3.5`
  },
  jt = {
    class: `flex flex-col gap-2`
  },
  Mt = {
    class: `flex items-center justify-between text-xs`
  },
  Nt = {
    class: `font-semibold text-muted-foreground`
  },
  Pt = {
    class: `tabular-nums text-muted-foreground`
  },
  Ft = {
    class: `flex flex-col gap-2`
  },
  It = {
    class: `flex items-center justify-between text-xs`
  },
  Lt = {
    class: `font-semibold text-muted-foreground`
  },
  Rt = {
    class: `tabular-nums text-muted-foreground`
  },
  zt = {
    class: `flex flex-col gap-2`
  },
  Bt = {
    class: `flex items-center justify-between text-xs`
  },
  Vt = {
    class: `font-semibold text-muted-foreground`
  },
  Ht = {
    class: `tabular-nums text-muted-foreground`
  },
  Ut = {
    class: `flex flex-col gap-2`
  },
  Wt = {
    class: `text-xs font-semibold text-muted-foreground`
  },
  Gt = {
    class: `grid grid-cols-3 gap-1.5`
  },
  Kt = [`title`, `onClick`],
  qt = {
    class: `relative h-7 w-full overflow-hidden rounded-[4px] border border-black/10 bg-white dark:border-white/15 dark:bg-zinc-200`
  },
  Jt = {
    class: `w-full truncate text-center text-[10px] text-muted-foreground`
  },
  Yt = {
    class: `flex flex-col gap-2`
  },
  Xt = {
    class: `text-xs font-semibold text-muted-foreground`
  },
  Zt = {
    class: `grid grid-cols-6 gap-0.5 rounded-lg bg-muted p-0.5`
  },
  Qt = [`onClick`],
  $t = {
    class: `flex items-center justify-between gap-3`
  },
  en = {
    class: `flex min-w-0 flex-col gap-0.5`
  },
  tn = {
    class: `text-[13px] font-semibold`
  },
  nn = {
    class: `text-[11px] text-muted-foreground`
  },
  rn = `repeating-conic-gradient(#e4e4e7 0% 25%, #ffffff 0% 50%) 50% / 10px 10px`,
  an = T({
    __name: `StylePanel`,
    props: {
      current: {},
      presets: {},
      backgroundLibrary: {},
      thumbnail: {},
      savingPreset: {
        type: Boolean
      }
    },
    emits: [`update:style`, `savePreset`, `deletePreset`],
    setup(result, {
      emit: r
    }) {
      let i = result,
        a = r,
        o = S(false),
        s = S(``),
        c = S(null),
        u = {
          image: `BackgroundImage`,
          blur: `BackgroundBlur`,
          solid: `BackgroundSolid`,
          gradient: `BackgroundGradient`,
          transparent: `BackgroundTransparent`
        },
        p = {
          none: `FrameNone`,
          "mac-light": `FrameMacLight`,
          "mac-dark": `FrameMacDark`,
          "browser-light": `FrameBrowserLight`,
          "browser-dark": `FrameBrowserDark`
        },
        m = j(() => !B.includes(i.current.backgroundColor)),
        y = j(() => [...le.map(item => ({
          id: `builtin:${item.id}`,
          name: G(`Preset${item.id}`),
          style: item.style,
          builtin: true
        })), ...i.presets.map(item => ({
          ...item,
          builtin: false
        }))]);
      function T(e) {
        a(`update:style`, {
          ...i.current,
          ...e
        });
      }
      let O = S(false),
        A = S(``),
        F = S([]),
        te = S(``);
      async function ne(e) {
        let background = await window.screenshotToolAPI.editor.loadBackground(e.id);
        if (!background.ok) throw Error(background.error.message);
        te.value = e.id, T({
          backgroundKind: `image`,
          backgroundImage: background.data,
          backgroundImageSource: e.file ?? ``
        });
      }
      function re() {
        let e = i.current.backgroundImageSource.trim();
        if (!e) {
          te.value = ``;
          return;
        }
        let t = F.value.find(item => item.file === e);
        te.value = t?.id ?? ``;
      }
      v(() => i.backgroundLibrary, e => {
        F.value = [...e], re();
      }, {
        immediate: true
      }), v(() => i.current.backgroundImageSource, () => re());
      async function I(e) {
        if (!O.value) {
          O.value = true, A.value = ``;
          try {
            await ne(e);
          } catch (e) {
            A.value = e instanceof Error ? e.message : G(`BackgroundImageFailed`);
          } finally {
            O.value = false;
          }
        }
      }
      async function ae() {
        if (!O.value) {
          O.value = true, A.value = ``;
          try {
            let e = await window.screenshotToolAPI.editor.backgrounds(`system`);
            if (!e.ok) throw Error(e.error.message);
            e.data.length ? (F.value = e.data, re()) : (F.value = [], A.value = G(`BackgroundSystemEmpty`));
          } catch (e) {
            A.value = e instanceof Error ? e.message : G(`BackgroundImageFailed`);
          } finally {
            O.value = false;
          }
        }
      }
      async function R() {
        if (!O.value) {
          O.value = true, A.value = ``;
          try {
            let e = await window.screenshotToolAPI.editor.backgrounds(`custom`);
            if (!e.ok) throw Error(e.error.message);
            if (!e.data.length) return;
            F.value = e.data, e.data[0] && (await ne(e.data[0]));
          } catch (e) {
            A.value = e instanceof Error ? e.message : G(`BackgroundImageFailed`);
          } finally {
            O.value = false;
          }
        }
      }
      function ce(e, t) {
        return JSON.stringify(e) === JSON.stringify(t);
      }
      function me(e) {
        let t = fe.find(item => item.id === e) ?? fe[0];
        return `linear-gradient(135deg, ${t.stops[0]}, ${t.stops[1]})`;
      }
      function he(e) {
        switch (e.backgroundKind) {
          case `image`:
            return {
              backgroundImage: `url(${e.backgroundImage})`,
              backgroundSize: `cover`,
              backgroundPosition: `center`
            };
          case `solid`:
            return {
              background: e.backgroundColor
            };
          case `gradient`:
            return {
              background: me(e.gradientId)
            };
          case `transparent`:
            return {
              background: rn
            };
          default:
            return i.thumbnail ? {
              backgroundImage: `url(${i.thumbnail})`,
              backgroundSize: `cover`,
              backgroundPosition: `center`,
              filter: `blur(3px) saturate(1.15)`,
              transform: `scale(1.3)`
            } : {
              background: `linear-gradient(135deg, #e4e4e7, #a1a1aa)`
            };
        }
      }
      function ge(e) {
        return e && typeof e[0] == `number` ? e[0] : null;
      }
      function _e(event) {
        T({
          backgroundKind: `solid`,
          backgroundColor: ue(event.target.value, i.current.backgroundColor)
        });
      }
      function ve() {
        s.value = ``, o.value = true, ee(() => c.value?.focus());
      }
      function ye() {
        let e = s.value.trim();
        e && (a(`savePreset`, e), o.value = false);
      }
      function be(event) {
        event.stopPropagation(), event.key === `Enter` && !event.isComposing ? (event.preventDefault(), ye()) : event.key === `Escape` && (event.preventDefault(), o.value = false);
      }
      return (r, i) => (w(), g(`div`, q, [N(`div`, J, [N(`div`, Xe, [N(`strong`, Ze, k(f(G)(`StyleEnabled`)), 1), N(`small`, Qe, k(f(G)(`StyleEnabledDesc`)), 1)]), E(f(l), {
        "model-value": result.current.enabled,
        "aria-label": f(G)(`StyleEnabled`),
        "onUpdate:modelValue": i[0] ||= e => T({
          enabled: !!e
        })
      }, null, 8, [`model-value`, `aria-label`])]), N(`div`, {
        class: d([result.current.enabled ? `` : `pointer-events-none opacity-45`, `flex flex-col gap-5`])
      }, [N(`section`, Y, [N(`div`, X, [N(`span`, $e, k(f(G)(`Presets`)), 1), !o.value && result.presets.length < f(12) ? (w(), g(`button`, {
        key: 0,
        type: `button`,
        class: `inline-flex items-center gap-1 text-[11px] font-medium text-primary hover:underline`,
        onClick: ve
      }, [E(f(n), {
        size: 12
      }), h(k(f(G)(`PresetSave`)), 1)])) : M(``, true)]), o.value ? (w(), g(`div`, et, [b(N(`input`, {
        ref_key: `presetInput`,
        ref: c,
        "onUpdate:modelValue": i[1] ||= e => s.value = e,
        maxlength: f(20),
        class: `h-7 min-w-0 flex-1 rounded-md border border-input bg-background px-2 text-xs outline-none focus:border-ring`,
        placeholder: f(G)(`PresetNamePlaceholder`),
        onKeydown: be
      }, null, 40, tt), [[P, s.value]]), N(`button`, {
        type: `button`,
        class: `inline-flex size-7 items-center justify-center rounded-md bg-primary text-primary-foreground disabled:opacity-50`,
        disabled: !s.value.trim() || result.savingPreset,
        title: f(G)(`PresetSaveConfirm`),
        onClick: ye
      }, [E(f(ie), {
        size: 14
      })], 8, nt), N(`button`, {
        type: `button`,
        class: `inline-flex size-7 items-center justify-center rounded-md text-muted-foreground hover:bg-muted`,
        title: f(G)(`Cancel`),
        onClick: i[2] ||= e => o.value = false
      }, [E(f(L), {
        size: 14
      })], 8, rt)])) : M(``, true), N(`div`, it, [(w(true), g(C, null, _(y.value, el => (w(), g(`div`, {
        key: el.id,
        class: `group relative`
      }, [N(`button`, {
        type: `button`,
        class: d([`flex w-full flex-col items-stretch gap-1 rounded-lg p-1 text-left transition-colors hover:bg-muted`, ce(el.style, result.current) ? `bg-primary/[0.07] ring-1 ring-primary/50` : ``]),
        title: el.name,
        onClick: t => a(`update:style`, {
          ...el.style,
          enabled: true
        })
      }, [N(`span`, ot, [N(`span`, {
        class: `absolute inset-0`,
        style: D(he(el.style))
      }, null, 4), N(`span`, st, [el.style.frame === `none` ? M(``, true) : (w(), g(`span`, {
        key: 0,
        class: d([`absolute inset-x-0 top-0 h-1.5 rounded-t-[3px]`, el.style.frame.endsWith(`dark`) ? `bg-zinc-700` : `bg-zinc-200 dark:bg-zinc-300`])
      }, null, 2))])]), N(`span`, ct, k(el.name), 1)], 10, at), el.builtin ? M(``, true) : (w(), g(`button`, {
        key: 0,
        type: `button`,
        class: `absolute -right-1 -top-1 hidden size-4 items-center justify-center rounded-full bg-zinc-700 text-white group-hover:inline-flex`,
        title: f(G)(`PresetDelete`),
        onClick: t => a(`deletePreset`, el.id)
      }, [E(f(L), {
        size: 10
      })], 8, lt))]))), 128))])]), N(`section`, Z, [N(`span`, ut, k(f(G)(`Background`)), 1), N(`div`, dt, [(w(true), g(C, null, _(f(pe), e => (w(), g(`button`, {
        key: e,
        type: `button`,
        class: d([`h-7 rounded-md text-xs transition-colors`, result.current.backgroundKind === e ? `bg-background font-semibold text-foreground shadow-[0_1px_3px_rgb(0_0_0/0.08)]` : `text-muted-foreground hover:text-foreground`]),
        onClick: t => T({
          backgroundKind: e
        })
      }, k(f(G)(u[e])), 11, Q))), 128))]), result.current.backgroundKind === `image` ? (w(), g(`div`, ft, [N(`div`, pt, [N(`button`, {
        type: `button`,
        class: `text-[11px] text-muted-foreground hover:text-foreground disabled:opacity-50`,
        disabled: O.value,
        onClick: ae
      }, k(O.value ? f(G)(`BackgroundLoading`) : f(G)(`BackgroundLoadSystem`)), 9, mt)]), N(`button`, {
        type: `button`,
        class: `flex w-full items-center justify-center gap-1.5 rounded-md border border-border bg-background py-2 text-xs font-medium hover:bg-muted disabled:opacity-50`,
        disabled: O.value,
        onClick: R
      }, [E(f(e), {
        size: 14
      }), h(` ` + k(f(G)(`BackgroundChooseImage`)), 1)], 8, ht), O.value && !F.value.length && !result.current.backgroundImage ? (w(), g(`div`, gt, k(f(G)(`BackgroundLoading`)), 1)) : F.value.length ? (w(), g(`div`, _t, [(w(true), g(C, null, _(F.value, e => (w(), g(`button`, {
        key: e.id,
        type: `button`,
        class: d([`relative h-12 overflow-hidden rounded-md border border-border disabled:opacity-50`, te.value === e.id ? `ring-2 ring-primary` : ``]),
        disabled: O.value,
        title: e.name,
        onClick: t => I(e)
      }, [N(`img`, {
        src: e.thumbnail,
        alt: e.name,
        loading: `lazy`,
        class: `size-full object-cover`
      }, null, 8, yt)], 10, vt))), 128))])) : M(``, true), !O.value && !F.value.length && !result.current.backgroundImage ? (w(), g(`p`, bt, k(f(G)(`BackgroundImageEmptyHint`)), 1)) : M(``, true), O.value ? M(``, true) : (w(), g(`p`, xt, k(f(G)(`BackgroundImageDesc`)), 1)), A.value ? (w(), g(`p`, St, k(A.value), 1)) : M(``, true)])) : result.current.backgroundKind === `solid` ? (w(), g(`div`, Ct, [(w(true), g(C, null, _(f(B), e => (w(), g(`button`, {
        key: e,
        type: `button`,
        class: d([`size-7 rounded-md border border-black/10 dark:border-white/15`, result.current.backgroundColor === e ? `ring-2 ring-primary ring-offset-1 ring-offset-background` : ``]),
        style: D({
          background: e
        }),
        title: e,
        onClick: t => T({
          backgroundColor: e
        })
      }, null, 14, wt))), 128)), N(`label`, {
        class: d([`relative inline-flex size-7 cursor-pointer items-center justify-center overflow-hidden rounded-md border border-dashed border-black/25 text-muted-foreground dark:border-white/25`, m.value ? `ring-2 ring-primary ring-offset-1 ring-offset-background` : ``]),
        style: D(m.value ? {
          background: result.current.backgroundColor,
          borderStyle: `solid`
        } : {}),
        title: f(G)(`CustomColor`)
      }, [m.value ? M(``, true) : (w(), x(f(n), {
        key: 0,
        size: 13
      })), N(`input`, {
        type: `color`,
        class: `absolute inset-0 cursor-pointer opacity-0`,
        value: result.current.backgroundColor,
        onInput: _e
      }, null, 40, Et)], 14, Tt)])) : result.current.backgroundKind === `gradient` ? (w(), g(`div`, Dt, [(w(true), g(C, null, _(f(fe), e => (w(), g(`button`, {
        key: e.id,
        type: `button`,
        class: d([`size-7 rounded-md border border-black/10 dark:border-white/15`, result.current.gradientId === e.id ? `ring-2 ring-primary ring-offset-1 ring-offset-background` : ``]),
        style: D({
          background: me(e.id)
        }),
        onClick: t => T({
          gradientId: e.id
        })
      }, null, 14, Ot))), 128))])) : result.current.backgroundKind === `blur` ? (w(), g(`p`, kt, k(f(G)(`BackgroundBlurDesc`)), 1)) : (w(), g(`p`, At, k(f(G)(`BackgroundTransparentDesc`)), 1))]), N(`section`, $, [N(`div`, jt, [N(`span`, Mt, [N(`span`, Nt, k(f(G)(`Padding`)), 1), N(`span`, Pt, k(result.current.padding), 1)]), E(f(W), {
        "model-value": [result.current.padding],
        min: f(V).min,
        max: f(V).max,
        step: 4,
        "onUpdate:modelValue": i[3] ||= e => {
          let t = ge(e);
          t !== null && T({
            padding: t
          });
        }
      }, null, 8, [`model-value`, `min`, `max`])]), N(`div`, Ft, [N(`span`, It, [N(`span`, Lt, k(f(G)(`Radius`)), 1), N(`span`, Rt, k(result.current.radius), 1)]), E(f(W), {
        "model-value": [result.current.radius],
        min: f(se).min,
        max: f(se).max,
        step: 1,
        "onUpdate:modelValue": i[4] ||= e => {
          let t = ge(e);
          t !== null && T({
            radius: t
          });
        }
      }, null, 8, [`model-value`, `min`, `max`])]), N(`div`, zt, [N(`span`, Bt, [N(`span`, Vt, k(f(G)(`Shadow`)), 1), N(`span`, Ht, k(result.current.shadow), 1)]), E(f(W), {
        "model-value": [result.current.shadow],
        min: f(z).min,
        max: f(z).max,
        step: 5,
        "onUpdate:modelValue": i[5] ||= e => {
          let t = ge(e);
          t !== null && T({
            shadow: t
          });
        }
      }, null, 8, [`model-value`, `min`, `max`])])]), N(`section`, Ut, [N(`span`, Wt, k(f(G)(`Frame`)), 1), N(`div`, Gt, [(w(true), g(C, null, _(f(oe), text => (w(), g(`button`, {
        key: text,
        type: `button`,
        class: d([`flex flex-col items-center gap-1 rounded-lg p-1 transition-colors hover:bg-muted`, result.current.frame === text ? `bg-primary/[0.07] ring-1 ring-primary/50` : ``]),
        title: f(G)(p[text]),
        onClick: t => T({
          frame: text
        })
      }, [N(`span`, qt, [text === `none` ? M(``, true) : (w(), g(`span`, {
        key: 0,
        class: d([`absolute inset-x-0 top-0 flex h-2 items-center gap-[2px] px-[3px]`, text.endsWith(`dark`) ? `bg-zinc-700` : `bg-zinc-200`])
      }, [i[7] ||= N(`i`, {
        class: `size-[3px] rounded-full bg-[#ff5f57]`
      }, null, -1), i[8] ||= N(`i`, {
        class: `size-[3px] rounded-full bg-[#febc2e]`
      }, null, -1), i[9] ||= N(`i`, {
        class: `size-[3px] rounded-full bg-[#28c840]`
      }, null, -1), text.startsWith(`browser`) ? (w(), g(`i`, {
        key: 0,
        class: d([`ml-[2px] h-[3px] flex-1 rounded-full`, text.endsWith(`dark`) ? `bg-zinc-500` : `bg-white`])
      }, null, 2)) : M(``, true)], 2))]), N(`span`, Jt, k(f(G)(p[text])), 1)], 10, Kt))), 128))])]), N(`section`, Yt, [N(`span`, Xt, k(f(G)(`Ratio`)), 1), N(`div`, Zt, [(w(true), g(C, null, _(f(de), e => (w(), g(`button`, {
        key: e,
        type: `button`,
        class: d([`h-7 rounded-md text-[11px] tabular-nums transition-colors`, result.current.ratio === e ? `bg-background font-semibold text-foreground shadow-[0_1px_3px_rgb(0_0_0/0.08)]` : `text-muted-foreground hover:text-foreground`]),
        onClick: t => T({
          ratio: e
        })
      }, k(e === `auto` ? f(G)(`RatioAuto`) : e), 11, Qt))), 128))])]), N(`div`, $t, [N(`div`, en, [N(`strong`, tn, k(f(G)(`Balance`)), 1), N(`small`, nn, k(f(G)(`BalanceDesc`)), 1)]), E(f(l), {
        "model-value": result.current.balance,
        "aria-label": f(G)(`Balance`),
        "onUpdate:modelValue": i[6] ||= e => T({
          balance: !!e
        })
      }, null, 8, [`model-value`, `aria-label`])])], 2)]));
    }
  }),
  on = {
    v: `select`,
    r: `rect`,
    o: `ellipse`,
    a: `arrow`,
    l: `line`,
    p: `pen`,
    h: `highlighter`,
    t: `text`,
    n: `number`,
    m: `mosaic`
  },
  sn = [`#ef4444`, `#f97316`, `#eab308`, `#10b981`, `#3b82f6`, `#18181b`, `#ffffff`],
  cn = {
    stroke: {
      s: 2,
      m: 4,
      l: 7
    },
    highlighter: {
      s: 3,
      m: 5,
      l: 8
    },
    text: {
      s: 16,
      m: 22,
      l: 32
    },
    number: {
      s: 11,
      m: 14,
      l: 19
    },
    mosaic: {
      s: 6,
      m: 10,
      l: 16
    }
  };
function ln(e, t, n) {
  return Math.round(cn[e === `text` ? `text` : e === `number` ? `number` : e === `mosaic` ? `mosaic` : e === `highlighter` ? `highlighter` : `stroke`][t] * n * 10) / 10;
}
function un(e, t) {
  let n = [`s`, `m`, `l`],
    r = `m`,
    i = 1 / 0;
  for (let a of n) {
    let n = Math.abs(ln(e.kind, a, t) - e.size);
    n < i && (i = n, r = a);
  }
  return r;
}
function dn() {
  return `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;
}
var fn = 100;
function pn(e) {
  let t = p([]),
    n = p(null),
    r = S(null),
    i = S(null),
    a = S(`arrow`),
    o = S(sn[0]),
    s = S(`m`),
    c = p([]),
    l = p([]),
    u = null,
    d = null,
    f = j(() => t.value.find(item => item.id === r.value) ?? null),
    m = j(() => c.value.length > 0),
    h = j(() => l.value.length > 0),
    g = j(() => n.value ? [...t.value, n.value] : t.value);
  function _() {
    return JSON.stringify(t.value);
  }
  function v(e) {
    c.value = [...c.value, e].slice(-100), l.value = [];
  }
  function y(e) {
    v(_()), t.value = e;
  }
  function b(e, n) {
    t.value = t.value.map(item => item.id === e ? n : item);
  }
  function x(e) {
    t.value = e, n.value = null, r.value = null, i.value = null, c.value = [], l.value = [], u = null, d = null;
  }
  function C() {
    F();
    let e = c.value.at(-1);
    e !== undefined && (l.value = [_(), ...l.value].slice(0, fn), c.value = c.value.slice(0, -1), t.value = JSON.parse(e), r.value && !t.value.some(item => item.id === r.value) && (r.value = null));
  }
  function w() {
    F();
    let e = l.value[0];
    e !== undefined && (c.value = [...c.value, _()].slice(-100), l.value = l.value.slice(1), t.value = JSON.parse(e), r.value && !t.value.some(item => item.id === r.value) && (r.value = null));
  }
  function T() {
    let value = r.value;
    return value ? (y(t.value.filter(item => item.id !== value)), r.value = null, true) : false;
  }
  function E(e) {
    F(), a.value = e, e !== `select` && (r.value = null);
  }
  function D(e) {
    o.value = e;
    let value = f.value;
    value && value.kind !== `mosaic` && value.color !== e && (v(_()), b(value.id, {
      ...value,
      color: e
    }));
  }
  function O(t) {
    s.value = t;
    let value = f.value;
    if (!value) return;
    let r = ln(value.kind, t, e());
    value.size !== r && (v(_()), b(value.id, {
      ...value,
      size: r
    }));
  }
  function k(e, n) {
    for (let r = t.value.length - 1; r >= 0; --r) {
      let i = t.value[r];
      if (H(i, e.x, e.y, n)) return i;
    }
    return null;
  }
  function ee(e, t) {
    let value = f.value;
    return value ? Ce(value).find(item => Math.hypot(item.x - e.x, item.y - e.y) <= t * 1.4)?.handle ?? null : null;
  }
  function A(t) {
    r.value = t?.id ?? null, t && (t.kind !== `mosaic` && (o.value = t.color), s.value = un(t, e()));
  }
  function M() {
    return t.value.reduce((acc, state) => state.kind === `number` ? Math.max(acc, state.value) : acc, 0) + 1;
  }
  function N(e) {
    d = _(), r.value = e.id, i.value = e.id;
  }
  function P(e) {
    let value = i.value,
      r = t.value.find(item => item.id === value);
    r && r.kind === `text` && b(r.id, {
      ...r,
      text: e
    });
  }
  function F() {
    let value = i.value;
    if (!value) return;
    i.value = null;
    let n = t.value.find(item => item.id === value),
      a = d;
    d = null, n?.kind === `text` && !n.text.trim() && (t.value = t.value.filter(item => item.id !== value), r.value === value && (r.value = null)), a !== null && a !== _() && v(a);
  }
  function te(e, t, n, r) {
    if (!r) return t;
    let i = t.x - e.x,
      a = t.y - e.y;
    if (n === `arrow` || n === `line`) {
      let t = Math.round(Math.atan2(a, i) / (Math.PI / 4)) * (Math.PI / 4),
        n = Math.hypot(i, a);
      return {
        x: e.x + Math.cos(t) * n,
        y: e.y + Math.sin(t) * n
      };
    }
    let o = Math.max(Math.abs(i), Math.abs(a));
    return {
      x: e.x + Math.sign(i || 1) * o,
      y: e.y + Math.sign(a || 1) * o
    };
  }
  function ne(c, l) {
    F();
    let p = e(),
      m = ee(c, l);
    if (m && f.value) return u = {
      type: `resize`,
      id: f.value.id,
      handle: m,
      original: f.value,
      before: _()
    }, true;
    if (a.value === `select`) {
      let e = k(c, l);
      return A(e), e && (u = {
        type: `move`,
        id: e.id,
        startX: c.x,
        startY: c.y,
        original: e,
        before: _()
      }), true;
    }
    if (a.value === `text`) {
      let e = k(c, l);
      if (e?.kind === `text`) return A(e), N(e), true;
      let n = ln(`text`, s.value, p),
        a = {
          id: dn(),
          kind: `text`,
          color: o.value,
          size: n,
          x: c.x,
          y: c.y - n * .65,
          text: ``
        };
      return d = _(), t.value = [...t.value, a], r.value = a.id, i.value = a.id, true;
    }
    if (a.value === `number`) {
      let e = {
        id: dn(),
        kind: `number`,
        color: o.value,
        size: ln(`number`, s.value, p),
        x: c.x,
        y: c.y,
        value: M()
      };
      return y([...t.value, e]), r.value = e.id, true;
    }
    let value = a.value,
      g = {
        id: dn(),
        color: o.value,
        size: ln(value, s.value, p)
      },
      v;
    return v = value === `rect` || value === `ellipse` || value === `mosaic` ? {
      ...g,
      kind: value,
      x: c.x,
      y: c.y,
      width: 0,
      height: 0
    } : value === `arrow` || value === `line` ? {
      ...g,
      kind: value,
      x1: c.x,
      y1: c.y,
      x2: c.x,
      y2: c.y
    } : {
      ...g,
      kind: value,
      points: [c.x, c.y]
    }, r.value = null, n.value = v, u = {
      type: `draw`,
      annotation: v,
      startX: c.x,
      startY: c.y
    }, true;
  }
  function re(e, t) {
    let r = u;
    if (!r) return;
    if (r.type === `draw`) {
      let value = n.value;
      if (!value) return;
      let a = {
          x: r.startX,
          y: r.startY
        },
        o = te(a, e, value.kind, t);
      if (value.kind === `rect` || value.kind === `ellipse` || value.kind === `mosaic`) n.value = {
        ...value,
        x: a.x,
        y: a.y,
        width: o.x - a.x,
        height: o.y - a.y
      };else if (value.kind === `arrow` || value.kind === `line`) n.value = {
        ...value,
        x2: o.x,
        y2: o.y
      };else if (value.kind === `pen` || value.kind === `highlighter`) {
        let points = value.points,
          r = points[points.length - 2],
          a = points[points.length - 1];
        Math.hypot(e.x - r, e.y - a) >= Math.max(1, value.size * .35) && (n.value = {
          ...value,
          points: [...points, e.x, e.y]
        });
      }
      return;
    }
    if (r.type === `move`) {
      b(r.id, U(r.original, e.x - r.startX, e.y - r.startY));
      return;
    }
    let i = e;
    (r.original.kind === `arrow` || r.original.kind === `line`) && t && (i = te(r.handle === `start` ? {
      x: r.original.x2,
      y: r.original.y2
    } : {
      x: r.original.x1,
      y: r.original.y1
    }, e, r.original.kind, true)), b(r.id, we(r.original, r.handle, i.x, i.y));
  }
  function I() {
    let i = u;
    if (u = null, i) {
      if (i.type === `draw`) {
        let value = n.value;
        if (n.value = null, !value) return;
        let a = je(value),
          o = e();
        if (value.kind !== `pen` && value.kind !== `highlighter` && (value.kind === `arrow` || value.kind === `line` ? Math.hypot(a.width, a.height) < 4 * o : a.width < 3 * o || a.height < 3 * o)) return;
        let s = value.kind === `rect` || value.kind === `ellipse` || value.kind === `mosaic` ? {
          ...value,
          ...a
        } : value;
        y([...t.value, s]), r.value = s.id;
        return;
      }
      i.before !== _() && v(i.before);
    }
  }
  function L(e, t) {
    let n = k(e, t);
    n?.kind === `text` && N(n);
  }
  function ie() {
    return n.value ? (n.value = null, u = null, true) : false;
  }
  function ae() {
    return u !== null;
  }
  return {
    annotations: t,
    visibleAnnotations: g,
    draft: n,
    selected: f,
    selectedId: r,
    editingTextId: i,
    tool: a,
    color: o,
    level: s,
    canUndo: m,
    canRedo: h,
    load: x,
    undo: C,
    redo: w,
    deleteSelected: T,
    setTool: E,
    setColor: D,
    setLevel: O,
    select: A,
    handleAt: ee,
    topHit: k,
    pointerDown: ne,
    pointerMove: re,
    pointerUp: I,
    doubleClick: L,
    updateEditingText: P,
    finishTextEditing: F,
    cancelDraft: ie,
    isInteracting: ae
  };
}
var mn = {
    class: `flex h-full flex-col bg-background text-foreground`
  },
  hn = {
    class: `flex shrink-0 items-center gap-1.5 text-[13px] font-semibold`
  },
  gn = {
    class: `mx-auto flex min-w-0 items-center gap-0.5`,
    "data-no-drag": ``
  },
  _n = [`title`, `aria-label`, `aria-pressed`, `onClick`],
  vn = [`title`, `onClick`],
  yn = [`title`, `onClick`],
  bn = [`disabled`, `title`],
  xn = [`disabled`, `title`],
  Sn = [`disabled`, `title`],
  Cn = {
    class: `flex min-h-0 flex-1`
  },
  wn = {
    class: `flex min-w-0 flex-1 flex-col`
  },
  Tn = [`value`, `placeholder`],
  En = {
    key: 1,
    class: `flex items-center gap-2 text-xs text-muted-foreground`
  },
  Dn = {
    key: 0,
    class: `absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-3 rounded-full bg-zinc-900/90 px-4 py-2 text-xs text-white shadow-lg dark:bg-zinc-100/95 dark:text-zinc-900`
  },
  On = {
    class: `flex h-14 shrink-0 items-center justify-between gap-3 border-t border-border px-4`
  },
  kn = {
    class: `flex min-w-0 items-center gap-2 text-xs text-muted-foreground`
  },
  An = {
    class: `truncate`
  },
  jn = {
    key: 2,
    class: `shrink-0 tabular-nums text-muted-foreground/70`
  },
  Mn = {
    class: `flex shrink-0 items-center gap-1.5`
  },
  Nn = {
    class: `flex items-center`
  },
  Pn = {
    class: `flex w-[300px] shrink-0 flex-col border-l border-border bg-background`
  },
  Fn = {
    class: `flex shrink-0 items-center gap-0.5 border-b border-border p-2`
  },
  In = {
    class: `min-h-0 flex-1 overflow-y-auto`
  },
  Ln = 400,
  Rn = 48,
  zn = T({
    __name: `EditorApp`,
    setup(event) {
      let editor = window.screenshotToolAPI.editor,
        l = p(null),
        T = p(null),
        P = p(null),
        I = S({
          ...me
        }),
        L = S([]),
        oe = S([]),
        se = S(``),
        z = S(`style`),
        le = S(null),
        ue = S(null),
        de = S(null),
        fe = S({
          width: 0,
          height: 0
        }),
        B = S(null),
        pe = S(false),
        V = S(0),
        we = S(-1),
        H = S(``),
        U = S(null),
        W = j(() => Math.max(1, l.value?.scale ?? 1)),
        K = pn(() => W.value),
        Ke = De(),
        qe = false,
        Je = false,
        q = null,
        J = null,
        Xe = 0,
        Ze = null,
        Qe = [],
        Y = j(() => T.value ? Me({
          source: T.value,
          scale: W.value,
          style: I.value,
          balance: P.value
        }) : null),
        X = j(() => {
          let value = Y.value;
          if (!value) return null;
          let t = Math.max(40, fe.value.width - Rn),
            n = Math.max(40, fe.value.height - Rn),
            r = Math.min(t / value.width, n / value.height, 1 / W.value);
          return {
            width: Math.max(1, Math.round(value.width * r)),
            height: Math.max(1, Math.round(value.height * r))
          };
        }),
        $e = j(() => Y.value && X.value ? Y.value.width / X.value.width : 1),
        et = j(() => {
          let value = K.editingTextId.value,
            t = K.annotations.value.find(item => item.id === value);
          return t?.kind === `text` ? t : null;
        }),
        tt = j(() => {
          let value = et.value,
            t = Y.value;
          if (!value || !t) return null;
          let n = 1 / $e.value,
            r = value.size * n;
          return {
            left: `${(t.origin.x + value.x) * n}px`,
            top: `${(t.origin.y + value.y) * n}px`,
            fontSize: `${r}px`,
            lineHeight: `1.3`,
            color: value.color,
            fontFamily: Oe,
            fontWeight: `600`,
            minWidth: `${Math.max(24, r * 2)}px`
          };
        }),
        nt = j(() => H.value ? H.value : K.tool.value === `select` ? `default` : K.tool.value === `text` ? `text` : `crosshair`),
        rt = j(() => B.value ? G(`StatusExporting`) : we.value === V.value ? G(`StatusCopied`) : we.value >= 0 ? G(`StatusChanged`) : G(`StatusIdle`)),
        it = j(() => Y.value ? `${Y.value.width} × ${Y.value.height}` : ``),
        at = j(() => I.value.enabled && I.value.backgroundKind === `transparent`),
        ot = j(() => [{
          tool: `select`,
          icon: ye,
          label: G(`ToolSelect`),
          key: `V`
        }, {
          tool: `rect`,
          icon: a,
          label: G(`ToolRect`),
          key: `R`
        }, {
          tool: `ellipse`,
          icon: o,
          label: G(`ToolEllipse`),
          key: `O`
        }, {
          tool: `arrow`,
          icon: We,
          label: G(`ToolArrow`),
          key: `A`
        }, {
          tool: `line`,
          icon: s,
          label: G(`ToolLine`),
          key: `L`
        }, {
          tool: `pen`,
          icon: i,
          label: G(`ToolPen`),
          key: `P`
        }, {
          tool: `highlighter`,
          icon: Ue,
          label: G(`ToolHighlighter`),
          key: `H`
        }, {
          tool: `text`,
          icon: t,
          label: G(`ToolText`),
          key: `T`
        }, {
          tool: `number`,
          icon: _e,
          label: G(`ToolNumber`),
          key: `N`
        }, {
          tool: `mosaic`,
          icon: He,
          label: G(`ToolMosaic`),
          key: `M`
        }]),
        st = [{
          level: `s`,
          dot: 4,
          label: `SizeSmall`
        }, {
          level: `m`,
          dot: 7,
          label: `SizeMedium`
        }, {
          level: `l`,
          dot: 10,
          label: `SizeLarge`
        }],
        ct = Be ? `⌘` : `Ctrl+`;
      function lt() {
        return JSON.parse(JSON.stringify(I.value));
      }
      function Z(e, t) {
        U.value = {
          message: e,
          action: t
        }, J !== null && window.clearTimeout(J), J = window.setTimeout(() => {
          U.value = null, J = null;
        }, t ? 4200 : 2200);
      }
      function ut(e) {
        return e instanceof Error && e.message ? e.message : String(e);
      }
      function dt() {
        if (!qe && T.value && I.value.balance) {
          qe = true;
          try {
            P.value = Se(T.value, W.value);
          } catch {
            P.value = null;
          }
        }
      }
      function Q() {
        Xe ||= requestAnimationFrame(() => {
          Xe = 0, ft();
        });
      }
      function ft() {
        let value = ue.value,
          t = Y.value,
          n = T.value,
          r = X.value;
        if (!value || !t || !n || !r) return;
        let i = window.devicePixelRatio || 1,
          a = Math.min(1, r.width * i / t.width),
          o = Math.max(1, Math.round(t.width * a)),
          s = Math.max(1, Math.round(t.height * a));
        (value.width !== o || value.height !== s) && (value.width = o, value.height = s);
        let c = ke(value);
        c.setTransform(1, 0, 0, 1, 0, 0), Te(c, {
          source: n,
          scale: W.value,
          style: I.value,
          annotations: K.visibleAnnotations.value,
          balance: P.value,
          onBackgroundLoaded: Q,
          hiddenAnnotationId: K.editingTextId.value
        }, t, a, Ke), pt(c, a);
      }
      function pt(e, t) {
        let value = Y.value,
          r = K.selected.value;
        if (!value || !r || K.editingTextId.value === r.id) return;
        let i = e => e * $e.value,
          a = je(r),
          o = i(4);
        e.save(), e.setTransform(t, 0, 0, t, value.origin.x * t, value.origin.y * t), e.setLineDash([i(4), i(3)]), e.lineWidth = i(1), e.strokeStyle = `#10b981`, e.strokeRect(a.x - o, a.y - o, a.width + o * 2, a.height + o * 2), e.setLineDash([]);
        for (let t of Ce(r)) e.beginPath(), e.arc(t.x, t.y, i(5), 0, Math.PI * 2), e.fillStyle = `#ffffff`, e.fill(), e.lineWidth = i(1.5), e.stroke();
        e.restore();
      }
      function mt(e) {
        let value = ue.value,
          n = Y.value;
        if (!value || !n) return null;
        let r = value.getBoundingClientRect();
        return r.width <= 0 || r.height <= 0 ? null : {
          x: (e.clientX - r.left) / r.width * n.width - n.origin.x,
          y: (e.clientY - r.top) / r.height * n.height - n.origin.y
        };
      }
      function ht() {
        return 6 * $e.value;
      }
      function gt(e) {
        if (e.button !== 0 || !l.value) return;
        let t = mt(e);
        t && (ue.value?.setPointerCapture(e.pointerId), K.pointerDown(t, ht()), Q(), K.editingTextId.value && bt());
      }
      function _t(e) {
        let t = mt(e);
        if (t) {
          if (K.isInteracting()) {
            K.pointerMove(t, e.shiftKey), Q();
            return;
          }
          K.handleAt(t, ht()) ? H.value = `grab` : K.tool.value === `select` && K.topHit(t, ht()) ? H.value = `move` : H.value = ``;
        }
      }
      function vt() {
        K.pointerUp(), Q();
      }
      function yt(e) {
        let t = mt(e);
        t && (K.doubleClick(t, ht()), Q(), K.editingTextId.value && bt());
      }
      async function bt() {
        await ee();
        let value = de.value;
        value && (value.focus(), value.setSelectionRange(value.value.length, value.value.length));
      }
      function xt(e) {
        e.stopPropagation(), !e.isComposing && (e.key === `Enter` && !e.shiftKey || e.key === `Escape`) && (e.preventDefault(), K.finishTextEditing(), Q());
      }
      function St() {
        K.finishTextEditing(), Q();
      }
      function Ct(e) {
        K.setTool(e), Q();
      }
      async function wt() {
        K.finishTextEditing();
        let value = T.value;
        if (!value) throw Error(G(`ActionFailed`));
        let {
          png: t
        } = await Ae({
          source: value,
          scale: W.value,
          style: I.value,
          annotations: K.annotations.value,
          balance: P.value
        });
        return t;
      }
      async function Tt(e, t) {
        let value = l.value;
        if (value && !B.value) {
          B.value = e;
          try {
            let r = V.value;
            await t(await wt(), value.id), e === `copy` && (we.value = r);
          } catch (e) {
            Z(G(`ToastFailed`, {
              reason: ut(e)
            }));
          } finally {
            B.value = null;
          }
        }
      }
      function Et(result) {
        if (!result.ok) throw Error(result.error.message);
        return result.data;
      }
      async function Dt(e, t = false) {
        await Tt(`copy`, async (r, i) => {
          Et(await editor.copy({
            id: i,
            image: r
          })), e ? Mt() : t || Z(G(`ToastCopied`));
        });
      }
      async function Ot(e) {
        await Tt(`save`, async (t, r) => {
          let i = Et(await editor.save({
            id: r,
            image: t,
            saveAs: e
          }));
          if (!i) return;
          let a = i.filePath.split(/[\\/]/).pop() || i.filePath;
          Z(G(`ToastSaved`, {
            name: a
          }), {
            label: G(`ToastReveal`),
            run: () => editor.revealFile(i.filePath)
          });
        });
      }
      async function kt() {
        await Tt(`pin`, async (e, t) => {
          Et(await editor.pin({
            id: t,
            image: e
          })), Z(G(`ToastPinned`));
        });
      }
      async function At() {
        await Tt(`bot`, async (e, t) => {
          $(), Et(await editor.sendToBot({
            id: t,
            image: e
          }));
        });
      }
      function $() {
        q !== null && (window.clearTimeout(q), q = null);
        let value = l.value;
        value && editor.updateState({
          id: value.id,
          style: lt(),
          annotations: JSON.parse(JSON.stringify(K.annotations.value))
        });
      }
      function jt() {
        q !== null && window.clearTimeout(q), q = window.setTimeout($, Ln);
      }
      function Mt() {
        K.finishTextEditing(), $(), editor.close();
      }
      async function Nt(e) {
        if (!pe.value) {
          pe.value = true;
          try {
            L.value = Et(await editor.savePreset({
              name: e,
              style: lt()
            })), Z(G(`PresetSaved`));
          } catch (e) {
            Z(G(`ToastFailed`, {
              reason: ut(e)
            }));
          } finally {
            pe.value = false;
          }
        }
      }
      async function Pt(e) {
        try {
          L.value = Et(await editor.deletePreset({
            id: e
          }));
        } catch (e) {
          Z(G(`ToastFailed`, {
            reason: ut(e)
          }));
        }
      }
      function Ft(e) {
        if (!l.value || e.isComposing) return;
        let target = e.target;
        if (target && (target.tagName === `INPUT` || target.tagName === `TEXTAREA` || target.isContentEditable)) return;
        let n = e.key.toLowerCase(),
          r = Re(e);
        if (e.key === `Escape`) {
          e.preventDefault(), K.cancelDraft() ? Q() : K.selectedId.value ? (K.select(null), Q()) : Mt();
          return;
        }
        if (e.key === `Enter`) {
          e.preventDefault(), Dt(true);
          return;
        }
        if (r && n === `c`) {
          e.preventDefault(), Dt(false);
          return;
        }
        if (r && n === `s`) {
          e.preventDefault(), Ot(e.shiftKey);
          return;
        }
        if (r && n === `z`) {
          e.preventDefault(), e.shiftKey ? K.redo() : K.undo(), Q();
          return;
        }
        if (r && n === `y`) {
          e.preventDefault(), K.redo(), Q();
          return;
        }
        if ((e.key === `Delete` || e.key === `Backspace`) && K.selectedId.value) {
          e.preventDefault(), K.deleteSelected(), Q();
          return;
        }
        !r && !e.altKey && !e.ctrlKey && !e.metaKey && on[n] && (e.preventDefault(), Ct(on[n]));
      }
      function It(e) {
        let t = Math.min(1, 96 / Math.max(e.width, e.height)),
          n = Ee(e.width * t, e.height * t);
        ke(n).drawImage(e, 0, 0, n.width, n.height);
        let r = n.toDataURL(`image/jpeg`, .7);
        return Ne(n), r;
      }
      async function Lt(el) {
        $(), ze(el);
        let t;
        try {
          t = await xe(el.image);
        } catch (e) {
          Z(G(`ToastFailed`, {
            reason: ut(e)
          }));
          return;
        }
        Je = true, Ne(T.value), T.value = t, l.value = el, I.value = {
          ...el.style
        }, L.value = el.presets, oe.value = el.backgroundLibrary ?? [], P.value = null, qe = false, Ke.key = ``, dt(), K.load(el.annotations), K.setTool(el.annotations.length > 0 ? `select` : K.tool.value), se.value = It(t), z.value = el.runOcr ? `text` : `style`, U.value = null, await ee(), Je = false, V.value = 0, we.value = -1, ft(), el.autoCopy && Dt(false, true);
      }
      function Rt() {
        K.finishTextEditing(), $(), l.value = null, Ne(T.value), T.value = null, P.value = null, qe = false, Ke.key = ``, Ne(Ke.canvas), Ke.canvas = null, K.load([]), se.value = ``, U.value = null;
      }
      return v(I, () => {
        dt(), !Je && (V.value += 1, jt(), Q());
      }, {
        deep: true
      }), v(() => [I.value.backgroundKind, I.value.backgroundImage, I.value.backgroundImageSource], () => {
        Je || $();
      }), v(() => K.annotations.value, () => {
        Je || (V.value += 1, jt(), Q());
      }), v([() => K.selectedId.value, () => K.draft.value, () => K.editingTextId.value, X], () => Q()), A(() => {
        let screenshotToolAPI = window.screenshotToolAPI;
        Qe.push(editor.onOpen(e => {
          Lt(e);
        }), editor.onReset(Rt), screenshotToolAPI.onTheme(({
          dark: e
        }) => Ve(e))), window.addEventListener(`keydown`, Ft), window.addEventListener(`beforeunload`, $), le.value && (Ze = new ResizeObserver(e => {
          let t = e[0]?.contentRect;
          t && (fe.value = {
            width: t.width,
            height: t.height
          });
        }), Ze.observe(le.value)), screenshotToolAPI.ready();
      }), O(() => {
        for (let e of Qe) e();
        window.removeEventListener(`keydown`, Ft), window.removeEventListener(`beforeunload`, $), Ze?.disconnect(), Xe && cancelAnimationFrame(Xe), J !== null && window.clearTimeout(J), $();
      }), (e, t) => (w(), g(`div`, mn, [N(`header`, {
        class: `screenshot-drag-region flex h-12 shrink-0 items-center gap-3 border-b border-border bg-[#fafafa] dark:bg-[#18181b]`,
        style: D({
          paddingLeft: f(Be) ? `84px` : `14px`,
          paddingRight: f(Be) ? `14px` : `150px`
        })
      }, [N(`div`, hn, [E(f(ce), {
        size: 15,
        class: `text-primary`
      }), h(k(f(G)(`EditorTitle`)), 1)]), N(`div`, gn, [(w(true), g(C, null, _(ot.value, e => (w(), g(`button`, {
        key: e.tool,
        type: `button`,
        class: d([`inline-flex size-8 items-center justify-center rounded-lg transition-colors`, f(K).tool.value === e.tool ? `bg-primary/12 text-primary` : `text-foreground/75 hover:bg-black/[0.05] dark:hover:bg-white/10`]),
        title: `${e.label} (${e.key})`,
        "aria-label": e.label,
        "aria-pressed": f(K).tool.value === e.tool,
        onMousedown: t[0] ||= F(() => {}, [`prevent`]),
        onClick: t => Ct(e.tool)
      }, [(w(), x(m(e.icon), {
        size: 16
      }))], 42, _n))), 128)), t[19] ||= N(`span`, {
        class: `mx-1.5 h-5 w-px bg-border`
      }, null, -1), (w(true), g(C, null, _(f(sn), e => (w(), g(`button`, {
        key: e,
        type: `button`,
        class: `inline-flex size-6 items-center justify-center rounded-full`,
        title: e,
        onMousedown: t[1] ||= F(() => {}, [`prevent`]),
        onClick: t => {
          f(K).setColor(e), Q();
        }
      }, [N(`span`, {
        class: d([`size-4 rounded-full border border-black/15 dark:border-white/20`, f(K).color.value === e ? `ring-2 ring-primary ring-offset-1 ring-offset-[#fafafa] dark:ring-offset-[#18181b]` : ``]),
        style: D({
          background: e
        })
      }, null, 6)], 40, vn))), 128)), t[20] ||= N(`span`, {
        class: `mx-1.5 h-5 w-px bg-border`
      }, null, -1), (w(), g(C, null, _(st, e => N(`button`, {
        key: e.level,
        type: `button`,
        class: d([`inline-flex size-7 items-center justify-center rounded-lg transition-colors`, f(K).level.value === e.level ? `bg-primary/12 text-primary` : `text-foreground/70 hover:bg-black/[0.05] dark:hover:bg-white/10`]),
        title: f(G)(e.label),
        onMousedown: t[2] ||= F(() => {}, [`prevent`]),
        onClick: t => {
          f(K).setLevel(e.level), Q();
        }
      }, [N(`span`, {
        class: `rounded-full bg-current`,
        style: D({
          width: `${e.dot}px`,
          height: `${e.dot}px`
        })
      }, null, 4)], 42, yn)), 64)), t[21] ||= N(`span`, {
        class: `mx-1.5 h-5 w-px bg-border`
      }, null, -1), N(`button`, {
        type: `button`,
        class: `inline-flex size-8 items-center justify-center rounded-lg text-foreground/75 hover:bg-black/[0.05] disabled:opacity-35 dark:hover:bg-white/10`,
        disabled: !f(K).canUndo.value,
        title: `${f(G)(`Undo`)} (${f(ct)}Z)`,
        onMousedown: t[3] ||= F(() => {}, [`prevent`]),
        onClick: t[4] ||= e => {
          f(K).undo(), Q();
        }
      }, [E(f(be), {
        size: 16
      })], 40, bn), N(`button`, {
        type: `button`,
        class: `inline-flex size-8 items-center justify-center rounded-lg text-foreground/75 hover:bg-black/[0.05] disabled:opacity-35 dark:hover:bg-white/10`,
        disabled: !f(K).canRedo.value,
        title: `${f(G)(`Redo`)} (${f(ct)}${f(Be) ? `⇧Z` : `Y`})`,
        onMousedown: t[5] ||= F(() => {}, [`prevent`]),
        onClick: t[6] ||= e => {
          f(K).redo(), Q();
        }
      }, [E(f(Ge), {
        size: 16
      })], 40, xn), N(`button`, {
        type: `button`,
        class: `inline-flex size-8 items-center justify-center rounded-lg text-foreground/75 hover:bg-black/[0.05] hover:text-destructive disabled:opacity-35 dark:hover:bg-white/10`,
        disabled: !f(K).selectedId.value,
        title: `${f(G)(`Delete`)} (Delete)`,
        onMousedown: t[7] ||= F(() => {}, [`prevent`]),
        onClick: t[8] ||= e => {
          f(K).deleteSelected(), Q();
        }
      }, [E(f(u), {
        size: 16
      })], 40, Sn)])], 4), N(`div`, Cn, [N(`main`, wn, [N(`div`, {
        ref_key: `stageRef`,
        ref: le,
        class: `relative flex min-h-0 flex-1 items-center justify-center overflow-hidden bg-[#ececee] dark:bg-[#0e0e10]`
      }, [X.value ? (w(), g(`div`, {
        key: 0,
        class: `relative shadow-[0_0_0_1px_rgb(0_0_0/0.04)]`,
        style: D({
          width: `${X.value.width}px`,
          height: `${X.value.height}px`,
          ...(at.value ? {
            background: `repeating-conic-gradient(#e4e4e7 0% 25%, #ffffff 0% 50%) 50% / 16px 16px`
          } : {})
        })
      }, [N(`canvas`, {
        ref_key: `canvasRef`,
        ref: ue,
        class: `block h-full w-full touch-none`,
        style: D({
          cursor: nt.value
        }),
        onPointerdown: gt,
        onPointermove: _t,
        onPointerup: vt,
        onPointercancel: vt,
        onPointerleave: t[9] ||= e => H.value = ``,
        onDblclick: yt
      }, null, 36), et.value && tt.value ? (w(), g(`textarea`, {
        key: 0,
        ref_key: `textareaRef`,
        ref: de,
        class: `absolute m-0 resize-none overflow-hidden whitespace-pre border-0 bg-transparent p-0 outline-none [field-sizing:content]`,
        style: D(tt.value),
        value: et.value.text,
        placeholder: f(G)(`TextPlaceholder`),
        rows: `1`,
        spellcheck: `false`,
        onInput: t[10] ||= e => f(K).updateEditingText(e.target.value),
        onKeydown: xt,
        onBlur: St
      }, null, 44, Tn)) : M(``, true)], 4)) : (w(), g(`div`, En, [E(f(R), {
        size: 16,
        class: `animate-spin`
      }), h(k(f(G)(`EditorLoading`)), 1)])), E(te, {
        "enter-from-class": `opacity-0 translate-y-1`,
        "leave-to-class": `opacity-0`,
        "enter-active-class": `transition duration-150`,
        "leave-active-class": `transition duration-150`
      }, {
        default: y(() => [U.value ? (w(), g(`div`, Dn, [N(`span`, null, k(U.value.message), 1), U.value.action ? (w(), g(`button`, {
          key: 0,
          type: `button`,
          class: `font-semibold text-emerald-300 hover:underline dark:text-emerald-700`,
          onClick: t[11] ||= e => U.value.action.run()
        }, k(U.value.action.label), 1)) : M(``, true)])) : M(``, true)]),
        _: 1
      })], 512), N(`footer`, On, [N(`div`, kn, [we.value === V.value && !B.value ? (w(), x(f(ie), {
        key: 0,
        size: 14,
        class: `shrink-0 text-primary`
      })) : B.value ? (w(), x(f(R), {
        key: 1,
        size: 14,
        class: `shrink-0 animate-spin`
      })) : M(``, true), N(`span`, An, k(rt.value), 1), it.value ? (w(), g(`span`, jn, `· ` + k(it.value), 1)) : M(``, true)]), N(`div`, Mn, [E(f(c), {
        variant: `ghost`,
        size: `sm`,
        class: `text-xs`,
        disabled: !l.value || B.value !== null,
        onClick: kt
      }, {
        default: y(() => [E(f(re), {
          size: 14
        }), h(k(f(G)(`ActionPin`)), 1)]),
        _: 1
      }, 8, [`disabled`]), E(f(c), {
        variant: `ghost`,
        size: `sm`,
        class: `text-xs`,
        disabled: !l.value || B.value !== null,
        onClick: At
      }, {
        default: y(() => [B.value === `bot` ? (w(), x(f(R), {
          key: 0,
          size: 14,
          class: `animate-spin`
        })) : (w(), x(f(r), {
          key: 1,
          size: 14
        })), h(k(f(G)(`ActionSendToBot`)), 1)]),
        _: 1
      }, 8, [`disabled`]), N(`div`, Nn, [E(f(c), {
        variant: `outline`,
        size: `sm`,
        class: `rounded-r-none text-xs`,
        disabled: !l.value || B.value !== null,
        title: `${f(ct)}S`,
        onClick: t[12] ||= e => Ot(false)
      }, {
        default: y(() => [B.value === `save` ? (w(), x(f(R), {
          key: 0,
          size: 14,
          class: `animate-spin`
        })) : (w(), x(f(he), {
          key: 1,
          size: 14
        })), h(k(f(G)(`ActionSave`)), 1)]),
        _: 1
      }, 8, [`disabled`, `title`]), E(f(Ie), null, {
        default: y(() => [E(f(Le), {
          "as-child": ``
        }, {
          default: y(() => [E(f(c), {
            variant: `outline`,
            size: `icon-sm`,
            class: `-ml-px rounded-l-none`,
            disabled: !l.value || B.value !== null,
            "aria-label": f(G)(`ActionSaveAs`)
          }, {
            default: y(() => [E(f(ae), {
              size: 14
            })]),
            _: 1
          }, 8, [`disabled`, `aria-label`])]),
          _: 1
        }), E(f(Fe), {
          align: `end`,
          class: `min-w-36`
        }, {
          default: y(() => [E(f(ve), {
            class: `text-xs`,
            onSelect: t[13] ||= e => Ot(false)
          }, {
            default: y(() => [h(k(f(G)(`ActionSaveToFolder`)), 1)]),
            _: 1
          }), E(f(ve), {
            class: `text-xs`,
            onSelect: t[14] ||= e => Ot(true)
          }, {
            default: y(() => [h(k(f(G)(`ActionSaveAs`)), 1)]),
            _: 1
          })]),
          _: 1
        })]),
        _: 1
      })]), E(f(c), {
        size: `sm`,
        class: `min-w-24 text-xs`,
        disabled: !l.value || B.value !== null,
        title: f(G)(`ActionCopyHint`),
        onClick: t[15] ||= e => Dt(true)
      }, {
        default: y(() => [B.value === `copy` ? (w(), x(f(R), {
          key: 0,
          size: 14,
          class: `animate-spin`
        })) : (w(), x(f(ge), {
          key: 1,
          size: 14
        })), h(k(f(G)(`ActionCopy`)), 1)]),
        _: 1
      }, 8, [`disabled`, `title`])])])]), N(`aside`, Pn, [N(`div`, Fn, [N(`button`, {
        type: `button`,
        class: d([`inline-flex h-7 flex-1 items-center justify-center gap-1.5 rounded-md text-xs transition-colors`, z.value === `style` ? `bg-muted font-semibold text-foreground` : `text-muted-foreground hover:text-foreground`]),
        onClick: t[16] ||= e => z.value = `style`
      }, [E(f(ce), {
        size: 13
      }), h(k(f(G)(`TabStyle`)), 1)], 2), N(`button`, {
        type: `button`,
        class: d([`inline-flex h-7 flex-1 items-center justify-center gap-1.5 rounded-md text-xs transition-colors`, z.value === `text` ? `bg-muted font-semibold text-foreground` : `text-muted-foreground hover:text-foreground`]),
        onClick: t[17] ||= e => z.value = `text`
      }, [E(f(Pe), {
        size: 13
      }), h(k(f(G)(`TabText`)), 1)], 2)]), N(`div`, In, [b(E(an, {
        current: I.value,
        presets: L.value,
        "background-library": oe.value,
        thumbnail: se.value,
        "saving-preset": pe.value,
        "onUpdate:style": t[18] ||= e => I.value = e,
        onSavePreset: Nt,
        onDeletePreset: Pt
      }, null, 8, [`current`, `presets`, `background-library`, `thumbnail`, `saving-preset`]), [[ne, z.value === `style`]]), l.value ? b((w(), x(Ye, {
        key: 0,
        "session-id": l.value.id,
        supported: l.value.ocrSupported,
        "auto-run": l.value.runOcr,
        onToast: Z
      }, null, 8, [`session-id`, `supported`, `auto-run`])), [[ne, z.value === `text`]]) : M(``, true)])])])]));
    }
  });
export { zn as default };