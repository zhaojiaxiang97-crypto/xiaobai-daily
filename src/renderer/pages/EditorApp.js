import { At as uiSwitchAt, Ct as uiSwitchCt, Dt as uiSwitchDt, Et as uiSwitchEt, Ot as uiSwitchOt, Tt as uiSwitchTt, jt as uiSwitchJt, kt as uiSwitchKt, r as uiSwitchR, t as uiSwitchT, wt as uiSwitchWt } from "../ui/Switch.js";
import { $n as vueN, An as vueAn, Cn as vueCn, Et as vueEt, O as vueO, S as vueS, St as vueSt, Wt as vueWt, Yt as vueYt, Zt as vueZt, b as vueB, bn as vueBn, c as vueC, gt as vueGt, j as vueJ, k as vueK, nr as vueNr, ot as vueOt, rr as vueRr, rt as vueRt, ut as vueUt, v as vueV, x as vueX, y as vueY } from "../chunks/vue-i18n.runtime.js";
import { C as playerC, E as playerE, r as playerR, w as playerW } from "../i18n/en-US-player.js";
import { n as lucideN, r as lucideR, t as lucideT } from "../ui/icons/lucide-icons.js";
import { t as checkT } from "../chunks/check.js";
import { s as PopperContentS } from "../ui/PopperContent.js";
import { _ as beautifier, a as beautifierA, d as beautifierD, f as beautifierF, g as beautifierG, i as beautifierI, m as beautifierM, n as beautifierN, o as beautifierO, p as beautifierP, r as beautifierR, t as beautifierT, u as beautifierU, v as beautifierV, y as beautifierY } from "../chunks/screenshot-beautifier.js";
import { n as DropdownMenuItemN, t as DropdownMenuItemT } from "../ui/DropdownMenuItem.js";
import { n as undo2N, t as undo2T } from "../chunks/undo-2.js";
import { _ as compose, a as composeA, c as composeC, d as composeD, i as composeI, l as composeL, m as composeM, n as composeN, o as composeO, p as composeP, r as composeR, s as composeS, t as composeT, u as composeU, v as composeV, y as composeY } from "../chunks/compose.js";
import { n as DropdownMenuTriggerN, r as DropdownMenuTriggerR, t as DropdownMenuTriggerT } from "../ui/DropdownMenuTrigger.js";
import { t as SliderT } from "../ui/Slider.js";
import { a as screenshotToolA, i as screenshotToolI, n as screenshotToolN, r as screenshotToolR, t as screenshotToolT } from "../chunks/screenshotTool.js";
var He = lucideR(`grid-3x3`, [[`rect`, {
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
  Ue = lucideR(`highlighter`, [[`path`, {
    d: `m9 11-6 6v3h9l3-3`,
    key: `1a3l36`
  }], [`path`, {
    d: `m22 12-4.6 4.6a2 2 0 0 1-2.8 0l-5.2-5.2a2 2 0 0 1 0-2.8L14 4`,
    key: `14a9rk`
  }]]),
  We = lucideR(`move-up-right`, [[`path`, {
    d: `M13 5H19V11`,
    key: `1n1gyv`
  }], [`path`, {
    d: `M19 5L5 19`,
    key: `72u4yj`
  }]]),
  Ge = lucideR(`redo-2`, [[`path`, {
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
  Ye = vueJ({
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
    setup(props, {
      expose: expose,
      emit: emit
    }) {
      let propsAlias = props,
        emitAlias = emit,
        editor = window.screenshotToolAPI.editor,
        o = vueBn(false),
        s = vueBn(``),
        l = vueBn(``),
        u = vueBn(false),
        d = vueBn(false),
        p = 0,
        m = null;
      async function _() {
        if (!propsAlias.supported || o.value || !propsAlias.sessionId) return;
        let e = ++p;
        o.value = true, l.value = ``;
        try {
          let t = await editor.ocr({
            id: propsAlias.sessionId
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
          await navigator.clipboard.writeText(s.value), d.value = true, emitAlias(`toast`, screenshotToolA(`OcrCopied`)), m !== null && window.clearTimeout(m), m = window.setTimeout(() => {
            d.value = false, m = null;
          }, 1400);
        } catch {
          emitAlias(`toast`, screenshotToolA(`ActionFailed`));
        }
      }
      return vueWt(() => propsAlias.sessionId, () => {
        p += 1, o.value = false, s.value = ``, l.value = ``, u.value = false, propsAlias.autoRun && _();
      }, {
        immediate: true
      }), expose({
        run: _
      }), (t, renderCache) => (vueGt(), vueS(`div`, K, [vueY(`p`, Ke, vueRr(props.supported ? vueAn(screenshotToolA)(`OcrHint`) : vueAn(screenshotToolA)(`OcrUnsupported`)), 1), props.supported ? (vueGt(), vueB(vueAn(uiSwitchR), {
        key: 0,
        variant: `outline`,
        size: `sm`,
        class: `w-full text-xs`,
        disabled: o.value,
        onClick: _
      }, {
        default: vueYt(() => [o.value ? (vueGt(), vueB(vueAn(beautifier), {
          key: 0,
          size: 14,
          class: `animate-spin`
        })) : (vueGt(), vueB(vueAn(composeY), {
          key: 1,
          size: 14
        })), vueO(` ` + vueRr(o.value ? vueAn(screenshotToolA)(`OcrRunning`) : u.value ? vueAn(screenshotToolA)(`OcrRerun`) : vueAn(screenshotToolA)(`OcrRun`)), 1)]),
        _: 1
      }, 8, [`disabled`])) : vueX(``, true), l.value ? (vueGt(), vueS(`p`, qe, vueRr(l.value), 1)) : vueX(``, true), u.value && !l.value ? (vueGt(), vueS(vueC, {
        key: 2
      }, [s.value ? (vueGt(), vueS(vueC, {
        key: 1
      }, [vueZt(vueY(`textarea`, {
        "onUpdate:modelValue": renderCache[0] ||= e => s.value = e,
        class: `min-h-0 flex-1 resize-none rounded-lg border border-input bg-background p-2.5 text-[13px] leading-relaxed outline-none focus:border-ring`,
        spellcheck: `false`,
        onKeydown: renderCache[1] ||= playerE(() => {}, [`stop`])
      }, null, 544), [[playerC, s.value]]), vueK(vueAn(uiSwitchR), {
        size: `sm`,
        class: `w-full text-xs`,
        onClick: T
      }, {
        default: vueYt(() => [d.value ? (vueGt(), vueB(vueAn(checkT), {
          key: 0,
          size: 14
        })) : (vueGt(), vueB(vueAn(beautifierY), {
          key: 1,
          size: 14
        })), vueO(vueRr(vueAn(screenshotToolA)(`OcrCopy`)), 1)]),
        _: 1
      })], 64)) : (vueGt(), vueS(`p`, Je, vueRr(vueAn(screenshotToolA)(`OcrEmpty`)), 1))], 64)) : vueX(``, true)]));
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
  an = vueJ({
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
      emit: emit
    }) {
      let resultAlias = result,
        emitAlias = emit,
        o = vueBn(false),
        s = vueBn(``),
        c = vueBn(null),
        options = {
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
        m = vueV(() => !beautifierP.includes(resultAlias.current.backgroundColor)),
        y = vueV(() => [...beautifierI.map(item => ({
          id: `builtin:${item.id}`,
          name: screenshotToolA(`Preset${item.id}`),
          style: item.style,
          builtin: true
        })), ...resultAlias.presets.map(item => ({
          ...item,
          builtin: false
        }))]);
      function T(e) {
        emitAlias(`update:style`, {
          ...resultAlias.current,
          ...e
        });
      }
      let O = vueBn(false),
        A = vueBn(``),
        F = vueBn([]),
        te = vueBn(``);
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
        let trimmed = resultAlias.current.backgroundImageSource.trim();
        if (!trimmed) {
          te.value = ``;
          return;
        }
        let found = F.value.find(item => item.file === trimmed);
        te.value = found?.id ?? ``;
      }
      vueWt(() => resultAlias.backgroundLibrary, e => {
        F.value = [...e], re();
      }, {
        immediate: true
      }), vueWt(() => resultAlias.current.backgroundImageSource, () => re());
      async function I(e) {
        if (!O.value) {
          O.value = true, A.value = ``;
          try {
            await ne(e);
          } catch (e) {
            A.value = e instanceof Error ? e.message : screenshotToolA(`BackgroundImageFailed`);
          } finally {
            O.value = false;
          }
        }
      }
      async function ae() {
        if (!O.value) {
          O.value = true, A.value = ``;
          try {
            let backgrounds = await window.screenshotToolAPI.editor.backgrounds(`system`);
            if (!backgrounds.ok) throw Error(backgrounds.error.message);
            backgrounds.data.length ? (F.value = backgrounds.data, re()) : (F.value = [], A.value = screenshotToolA(`BackgroundSystemEmpty`));
          } catch (e) {
            A.value = e instanceof Error ? e.message : screenshotToolA(`BackgroundImageFailed`);
          } finally {
            O.value = false;
          }
        }
      }
      async function R() {
        if (!O.value) {
          O.value = true, A.value = ``;
          try {
            let backgrounds = await window.screenshotToolAPI.editor.backgrounds(`custom`);
            if (!backgrounds.ok) throw Error(backgrounds.error.message);
            if (!backgrounds.data.length) return;
            F.value = backgrounds.data, backgrounds.data[0] && (await ne(backgrounds.data[0]));
          } catch (e) {
            A.value = e instanceof Error ? e.message : screenshotToolA(`BackgroundImageFailed`);
          } finally {
            O.value = false;
          }
        }
      }
      function ce(e, t) {
        return JSON.stringify(e) === JSON.stringify(t);
      }
      function me(e) {
        let fallbackValue = beautifierO.find(item => item.id === e) ?? beautifierO[0];
        return `linear-gradient(135deg, ${fallbackValue.stops[0]}, ${fallbackValue.stops[1]})`;
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
            return resultAlias.thumbnail ? {
              backgroundImage: `url(${resultAlias.thumbnail})`,
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
          backgroundColor: beautifierM(event.target.value, resultAlias.current.backgroundColor)
        });
      }
      function ve() {
        s.value = ``, o.value = true, vueRt(() => c.value?.focus());
      }
      function ye() {
        let trimmed = s.value.trim();
        trimmed && (emitAlias(`savePreset`, trimmed), o.value = false);
      }
      function be(event) {
        event.stopPropagation(), event.key === `Enter` && !event.isComposing ? (event.preventDefault(), ye()) : event.key === `Escape` && (event.preventDefault(), o.value = false);
      }
      return (ctx, renderCache) => (vueGt(), vueS(`div`, q, [vueY(`div`, J, [vueY(`div`, Xe, [vueY(`strong`, Ze, vueRr(vueAn(screenshotToolA)(`StyleEnabled`)), 1), vueY(`small`, Qe, vueRr(vueAn(screenshotToolA)(`StyleEnabledDesc`)), 1)]), vueK(vueAn(uiSwitchT), {
        "model-value": result.current.enabled,
        "aria-label": vueAn(screenshotToolA)(`StyleEnabled`),
        "onUpdate:modelValue": renderCache[0] ||= e => T({
          enabled: !!e
        })
      }, null, 8, [`model-value`, `aria-label`])]), vueY(`div`, {
        class: vueN([result.current.enabled ? `` : `pointer-events-none opacity-45`, `flex flex-col gap-5`])
      }, [vueY(`section`, Y, [vueY(`div`, X, [vueY(`span`, $e, vueRr(vueAn(screenshotToolA)(`Presets`)), 1), !o.value && result.presets.length < vueAn(12) ? (vueGt(), vueS(`button`, {
        key: 0,
        type: `button`,
        class: `inline-flex items-center gap-1 text-[11px] font-medium text-primary hover:underline`,
        onClick: ve
      }, [vueK(vueAn(uiSwitchDt), {
        size: 12
      }), vueO(vueRr(vueAn(screenshotToolA)(`PresetSave`)), 1)])) : vueX(``, true)]), o.value ? (vueGt(), vueS(`div`, et, [vueZt(vueY(`input`, {
        ref_key: `presetInput`,
        ref: c,
        "onUpdate:modelValue": renderCache[1] ||= e => s.value = e,
        maxlength: vueAn(20),
        class: `h-7 min-w-0 flex-1 rounded-md border border-input bg-background px-2 text-xs outline-none focus:border-ring`,
        placeholder: vueAn(screenshotToolA)(`PresetNamePlaceholder`),
        onKeydown: be
      }, null, 40, tt), [[playerC, s.value]]), vueY(`button`, {
        type: `button`,
        class: `inline-flex size-7 items-center justify-center rounded-md bg-primary text-primary-foreground disabled:opacity-50`,
        disabled: !s.value.trim() || result.savingPreset,
        title: vueAn(screenshotToolA)(`PresetSaveConfirm`),
        onClick: ye
      }, [vueK(vueAn(checkT), {
        size: 14
      })], 8, nt), vueY(`button`, {
        type: `button`,
        class: `inline-flex size-7 items-center justify-center rounded-md text-muted-foreground hover:bg-muted`,
        title: vueAn(screenshotToolA)(`Cancel`),
        onClick: renderCache[2] ||= e => o.value = false
      }, [vueK(vueAn(lucideT), {
        size: 14
      })], 8, rt)])) : vueX(``, true), vueY(`div`, it, [(vueGt(true), vueS(vueC, null, vueSt(y.value, el => (vueGt(), vueS(`div`, {
        key: el.id,
        class: `group relative`
      }, [vueY(`button`, {
        type: `button`,
        class: vueN([`flex w-full flex-col items-stretch gap-1 rounded-lg p-1 text-left transition-colors hover:bg-muted`, ce(el.style, result.current) ? `bg-primary/[0.07] ring-1 ring-primary/50` : ``]),
        title: el.name,
        onClick: t => emitAlias(`update:style`, {
          ...el.style,
          enabled: true
        })
      }, [vueY(`span`, ot, [vueY(`span`, {
        class: `absolute inset-0`,
        style: vueNr(he(el.style))
      }, null, 4), vueY(`span`, st, [el.style.frame === `none` ? vueX(``, true) : (vueGt(), vueS(`span`, {
        key: 0,
        class: vueN([`absolute inset-x-0 top-0 h-1.5 rounded-t-[3px]`, el.style.frame.endsWith(`dark`) ? `bg-zinc-700` : `bg-zinc-200 dark:bg-zinc-300`])
      }, null, 2))])]), vueY(`span`, ct, vueRr(el.name), 1)], 10, at), el.builtin ? vueX(``, true) : (vueGt(), vueS(`button`, {
        key: 0,
        type: `button`,
        class: `absolute -right-1 -top-1 hidden size-4 items-center justify-center rounded-full bg-zinc-700 text-white group-hover:inline-flex`,
        title: vueAn(screenshotToolA)(`PresetDelete`),
        onClick: t => emitAlias(`deletePreset`, el.id)
      }, [vueK(vueAn(lucideT), {
        size: 10
      })], 8, lt))]))), 128))])]), vueY(`section`, Z, [vueY(`span`, ut, vueRr(vueAn(screenshotToolA)(`Background`)), 1), vueY(`div`, dt, [(vueGt(true), vueS(vueC, null, vueSt(vueAn(beautifierR), e => (vueGt(), vueS(`button`, {
        key: e,
        type: `button`,
        class: vueN([`h-7 rounded-md text-xs transition-colors`, result.current.backgroundKind === e ? `bg-background font-semibold text-foreground shadow-[0_1px_3px_rgb(0_0_0/0.08)]` : `text-muted-foreground hover:text-foreground`]),
        onClick: t => T({
          backgroundKind: e
        })
      }, vueRr(vueAn(screenshotToolA)(options[e])), 11, Q))), 128))]), result.current.backgroundKind === `image` ? (vueGt(), vueS(`div`, ft, [vueY(`div`, pt, [vueY(`button`, {
        type: `button`,
        class: `text-[11px] text-muted-foreground hover:text-foreground disabled:opacity-50`,
        disabled: O.value,
        onClick: ae
      }, vueRr(O.value ? vueAn(screenshotToolA)(`BackgroundLoading`) : vueAn(screenshotToolA)(`BackgroundLoadSystem`)), 9, mt)]), vueY(`button`, {
        type: `button`,
        class: `flex w-full items-center justify-center gap-1.5 rounded-md border border-border bg-background py-2 text-xs font-medium hover:bg-muted disabled:opacity-50`,
        disabled: O.value,
        onClick: R
      }, [vueK(vueAn(uiSwitchAt), {
        size: 14
      }), vueO(` ` + vueRr(vueAn(screenshotToolA)(`BackgroundChooseImage`)), 1)], 8, ht), O.value && !F.value.length && !result.current.backgroundImage ? (vueGt(), vueS(`div`, gt, vueRr(vueAn(screenshotToolA)(`BackgroundLoading`)), 1)) : F.value.length ? (vueGt(), vueS(`div`, _t, [(vueGt(true), vueS(vueC, null, vueSt(F.value, e => (vueGt(), vueS(`button`, {
        key: e.id,
        type: `button`,
        class: vueN([`relative h-12 overflow-hidden rounded-md border border-border disabled:opacity-50`, te.value === e.id ? `ring-2 ring-primary` : ``]),
        disabled: O.value,
        title: e.name,
        onClick: t => I(e)
      }, [vueY(`img`, {
        src: e.thumbnail,
        alt: e.name,
        loading: `lazy`,
        class: `size-full object-cover`
      }, null, 8, yt)], 10, vt))), 128))])) : vueX(``, true), !O.value && !F.value.length && !result.current.backgroundImage ? (vueGt(), vueS(`p`, bt, vueRr(vueAn(screenshotToolA)(`BackgroundImageEmptyHint`)), 1)) : vueX(``, true), O.value ? vueX(``, true) : (vueGt(), vueS(`p`, xt, vueRr(vueAn(screenshotToolA)(`BackgroundImageDesc`)), 1)), A.value ? (vueGt(), vueS(`p`, St, vueRr(A.value), 1)) : vueX(``, true)])) : result.current.backgroundKind === `solid` ? (vueGt(), vueS(`div`, Ct, [(vueGt(true), vueS(vueC, null, vueSt(vueAn(beautifierP), e => (vueGt(), vueS(`button`, {
        key: e,
        type: `button`,
        class: vueN([`size-7 rounded-md border border-black/10 dark:border-white/15`, result.current.backgroundColor === e ? `ring-2 ring-primary ring-offset-1 ring-offset-background` : ``]),
        style: vueNr({
          background: e
        }),
        title: e,
        onClick: t => T({
          backgroundColor: e
        })
      }, null, 14, wt))), 128)), vueY(`label`, {
        class: vueN([`relative inline-flex size-7 cursor-pointer items-center justify-center overflow-hidden rounded-md border border-dashed border-black/25 text-muted-foreground dark:border-white/25`, m.value ? `ring-2 ring-primary ring-offset-1 ring-offset-background` : ``]),
        style: vueNr(m.value ? {
          background: result.current.backgroundColor,
          borderStyle: `solid`
        } : {}),
        title: vueAn(screenshotToolA)(`CustomColor`)
      }, [m.value ? vueX(``, true) : (vueGt(), vueB(vueAn(uiSwitchDt), {
        key: 0,
        size: 13
      })), vueY(`input`, {
        type: `color`,
        class: `absolute inset-0 cursor-pointer opacity-0`,
        value: result.current.backgroundColor,
        onInput: _e
      }, null, 40, Et)], 14, Tt)])) : result.current.backgroundKind === `gradient` ? (vueGt(), vueS(`div`, Dt, [(vueGt(true), vueS(vueC, null, vueSt(vueAn(beautifierO), e => (vueGt(), vueS(`button`, {
        key: e.id,
        type: `button`,
        class: vueN([`size-7 rounded-md border border-black/10 dark:border-white/15`, result.current.gradientId === e.id ? `ring-2 ring-primary ring-offset-1 ring-offset-background` : ``]),
        style: vueNr({
          background: me(e.id)
        }),
        onClick: t => T({
          gradientId: e.id
        })
      }, null, 14, Ot))), 128))])) : result.current.backgroundKind === `blur` ? (vueGt(), vueS(`p`, kt, vueRr(vueAn(screenshotToolA)(`BackgroundBlurDesc`)), 1)) : (vueGt(), vueS(`p`, At, vueRr(vueAn(screenshotToolA)(`BackgroundTransparentDesc`)), 1))]), vueY(`section`, $, [vueY(`div`, jt, [vueY(`span`, Mt, [vueY(`span`, Nt, vueRr(vueAn(screenshotToolA)(`Padding`)), 1), vueY(`span`, Pt, vueRr(result.current.padding), 1)]), vueK(vueAn(SliderT), {
        "model-value": [result.current.padding],
        min: vueAn(beautifierU).min,
        max: vueAn(beautifierU).max,
        step: 4,
        "onUpdate:modelValue": renderCache[3] ||= e => {
          let t = ge(e);
          t !== null && T({
            padding: t
          });
        }
      }, null, 8, [`model-value`, `min`, `max`])]), vueY(`div`, Ft, [vueY(`span`, It, [vueY(`span`, Lt, vueRr(vueAn(screenshotToolA)(`Radius`)), 1), vueY(`span`, Rt, vueRr(result.current.radius), 1)]), vueK(vueAn(SliderT), {
        "model-value": [result.current.radius],
        min: vueAn(beautifierD).min,
        max: vueAn(beautifierD).max,
        step: 1,
        "onUpdate:modelValue": renderCache[4] ||= e => {
          let t = ge(e);
          t !== null && T({
            radius: t
          });
        }
      }, null, 8, [`model-value`, `min`, `max`])]), vueY(`div`, zt, [vueY(`span`, Bt, [vueY(`span`, Vt, vueRr(vueAn(screenshotToolA)(`Shadow`)), 1), vueY(`span`, Ht, vueRr(result.current.shadow), 1)]), vueK(vueAn(SliderT), {
        "model-value": [result.current.shadow],
        min: vueAn(beautifierF).min,
        max: vueAn(beautifierF).max,
        step: 5,
        "onUpdate:modelValue": renderCache[5] ||= e => {
          let t = ge(e);
          t !== null && T({
            shadow: t
          });
        }
      }, null, 8, [`model-value`, `min`, `max`])])]), vueY(`section`, Ut, [vueY(`span`, Wt, vueRr(vueAn(screenshotToolA)(`Frame`)), 1), vueY(`div`, Gt, [(vueGt(true), vueS(vueC, null, vueSt(vueAn(beautifierA), text => (vueGt(), vueS(`button`, {
        key: text,
        type: `button`,
        class: vueN([`flex flex-col items-center gap-1 rounded-lg p-1 transition-colors hover:bg-muted`, result.current.frame === text ? `bg-primary/[0.07] ring-1 ring-primary/50` : ``]),
        title: vueAn(screenshotToolA)(p[text]),
        onClick: t => T({
          frame: text
        })
      }, [vueY(`span`, qt, [text === `none` ? vueX(``, true) : (vueGt(), vueS(`span`, {
        key: 0,
        class: vueN([`absolute inset-x-0 top-0 flex h-2 items-center gap-[2px] px-[3px]`, text.endsWith(`dark`) ? `bg-zinc-700` : `bg-zinc-200`])
      }, [renderCache[7] ||= vueY(`i`, {
        class: `size-[3px] rounded-full bg-[#ff5f57]`
      }, null, -1), renderCache[8] ||= vueY(`i`, {
        class: `size-[3px] rounded-full bg-[#febc2e]`
      }, null, -1), renderCache[9] ||= vueY(`i`, {
        class: `size-[3px] rounded-full bg-[#28c840]`
      }, null, -1), text.startsWith(`browser`) ? (vueGt(), vueS(`i`, {
        key: 0,
        class: vueN([`ml-[2px] h-[3px] flex-1 rounded-full`, text.endsWith(`dark`) ? `bg-zinc-500` : `bg-white`])
      }, null, 2)) : vueX(``, true)], 2))]), vueY(`span`, Jt, vueRr(vueAn(screenshotToolA)(p[text])), 1)], 10, Kt))), 128))])]), vueY(`section`, Yt, [vueY(`span`, Xt, vueRr(vueAn(screenshotToolA)(`Ratio`)), 1), vueY(`div`, Zt, [(vueGt(true), vueS(vueC, null, vueSt(vueAn(beautifierN), e => (vueGt(), vueS(`button`, {
        key: e,
        type: `button`,
        class: vueN([`h-7 rounded-md text-[11px] tabular-nums transition-colors`, result.current.ratio === e ? `bg-background font-semibold text-foreground shadow-[0_1px_3px_rgb(0_0_0/0.08)]` : `text-muted-foreground hover:text-foreground`]),
        onClick: t => T({
          ratio: e
        })
      }, vueRr(e === `auto` ? vueAn(screenshotToolA)(`RatioAuto`) : e), 11, Qt))), 128))])]), vueY(`div`, $t, [vueY(`div`, en, [vueY(`strong`, tn, vueRr(vueAn(screenshotToolA)(`Balance`)), 1), vueY(`small`, nn, vueRr(vueAn(screenshotToolA)(`BalanceDesc`)), 1)]), vueK(vueAn(uiSwitchT), {
        "model-value": result.current.balance,
        "aria-label": vueAn(screenshotToolA)(`Balance`),
        "onUpdate:modelValue": renderCache[6] ||= e => T({
          balance: !!e
        })
      }, null, 8, [`model-value`, `aria-label`])])], 2)]));
    }
  }),
  options = {
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
function un(count, t) {
  let n = [`s`, `m`, `l`],
    r = `m`,
    i = 1 / 0;
  for (let a of n) {
    let n = Math.abs(ln(count.kind, a, t) - count.size);
    n < i && (i = n, r = a);
  }
  return r;
}
function dn() {
  return `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;
}
var fn = 100;
function pn(e) {
  let t = vueCn([]),
    n = vueCn(null),
    r = vueBn(null),
    i = vueBn(null),
    a = vueBn(`arrow`),
    o = vueBn(sn[0]),
    s = vueBn(`m`),
    c = vueCn([]),
    l = vueCn([]),
    u = null,
    d = null,
    f = vueV(() => t.value.find(item => item.id === r.value) ?? null),
    m = vueV(() => c.value.length > 0),
    h = vueV(() => l.value.length > 0),
    g = vueV(() => n.value ? [...t.value, n.value] : t.value);
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
    let e = r.value;
    return e ? (y(t.value.filter(item => item.id !== e)), r.value = null, true) : false;
  }
  function E(e) {
    F(), a.value = e, e !== `select` && (r.value = null);
  }
  function D(e) {
    o.value = e;
    let t = f.value;
    t && t.kind !== `mosaic` && t.color !== e && (v(_()), b(t.id, {
      ...t,
      color: e
    }));
  }
  function O(t) {
    s.value = t;
    let n = f.value;
    if (!n) return;
    let r = ln(n.kind, t, e());
    n.size !== r && (v(_()), b(n.id, {
      ...n,
      size: r
    }));
  }
  function k(e, n) {
    for (let r = t.value.length - 1; r >= 0; --r) {
      let i = t.value[r];
      if (composeL(i, e.x, e.y, n)) return i;
    }
    return null;
  }
  function ee(e, t) {
    let n = f.value;
    return n ? composeC(n).find(item => Math.hypot(item.x - e.x, item.y - e.y) <= t * 1.4)?.handle ?? null : null;
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
    let n = i.value,
      found = t.value.find(item => item.id === n);
    found && found.kind === `text` && b(found.id, {
      ...found,
      text: e
    });
  }
  function F() {
    let e = i.value;
    if (!e) return;
    i.value = null;
    let found = t.value.find(item => item.id === e),
      a = d;
    d = null, found?.kind === `text` && !found.text.trim() && (t.value = t.value.filter(item => item.id !== e), r.value === e && (r.value = null)), a !== null && a !== _() && v(a);
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
    let h = a.value,
      entity = {
        id: dn(),
        color: o.value,
        size: ln(h, s.value, p)
      },
      resolvedValue;
    return resolvedValue = h === `rect` || h === `ellipse` || h === `mosaic` ? {
      ...entity,
      kind: h,
      x: c.x,
      y: c.y,
      width: 0,
      height: 0
    } : h === `arrow` || h === `line` ? {
      ...entity,
      kind: h,
      x1: c.x,
      y1: c.y,
      x2: c.x,
      y2: c.y
    } : {
      ...entity,
      kind: h,
      points: [c.x, c.y]
    }, r.value = null, n.value = resolvedValue, u = {
      type: `draw`,
      annotation: resolvedValue,
      startX: c.x,
      startY: c.y
    }, true;
  }
  function re(e, t) {
    let r = u;
    if (!r) return;
    if (r.type === `draw`) {
      let i = n.value;
      if (!i) return;
      let a = {
          x: r.startX,
          y: r.startY
        },
        o = te(a, e, i.kind, t);
      if (i.kind === `rect` || i.kind === `ellipse` || i.kind === `mosaic`) n.value = {
        ...i,
        x: a.x,
        y: a.y,
        width: o.x - a.x,
        height: o.y - a.y
      };else if (i.kind === `arrow` || i.kind === `line`) n.value = {
        ...i,
        x2: o.x,
        y2: o.y
      };else if (i.kind === `pen` || i.kind === `highlighter`) {
        let points = i.points,
          r = points[points.length - 2],
          a = points[points.length - 1];
        Math.hypot(e.x - r, e.y - a) >= Math.max(1, i.size * .35) && (n.value = {
          ...i,
          points: [...points, e.x, e.y]
        });
      }
      return;
    }
    if (r.type === `move`) {
      b(r.id, composeU(r.original, e.x - r.startX, e.y - r.startY));
      return;
    }
    let i = e;
    (r.original.kind === `arrow` || r.original.kind === `line`) && t && (i = te(r.handle === `start` ? {
      x: r.original.x2,
      y: r.original.y2
    } : {
      x: r.original.x1,
      y: r.original.y1
    }, e, r.original.kind, true)), b(r.id, composeD(r.original, r.handle, i.x, i.y));
  }
  function I() {
    let i = u;
    if (u = null, i) {
      if (i.type === `draw`) {
        let i = n.value;
        if (n.value = null, !i) return;
        let a = composeS(i),
          o = e();
        if (i.kind !== `pen` && i.kind !== `highlighter` && (i.kind === `arrow` || i.kind === `line` ? Math.hypot(a.width, a.height) < 4 * o : a.width < 3 * o || a.height < 3 * o)) return;
        let s = i.kind === `rect` || i.kind === `ellipse` || i.kind === `mosaic` ? {
          ...i,
          ...a
        } : i;
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
  zn = vueJ({
    __name: `EditorApp`,
    setup(event) {
      let editor = window.screenshotToolAPI.editor,
        l = vueCn(null),
        T = vueCn(null),
        P = vueCn(null),
        I = vueBn({
          ...beautifierT
        }),
        L = vueBn([]),
        oe = vueBn([]),
        se = vueBn(``),
        z = vueBn(`style`),
        le = vueBn(null),
        ue = vueBn(null),
        de = vueBn(null),
        fe = vueBn({
          width: 0,
          height: 0
        }),
        B = vueBn(null),
        pe = vueBn(false),
        V = vueBn(0),
        we = vueBn(-1),
        H = vueBn(``),
        U = vueBn(null),
        W = vueV(() => Math.max(1, l.value?.scale ?? 1)),
        K = pn(() => W.value),
        Ke = composeN(),
        qe = false,
        Je = false,
        q = null,
        J = null,
        Xe = 0,
        Ze = null,
        emptyItems = [],
        Y = vueV(() => T.value ? composeT({
          source: T.value,
          scale: W.value,
          style: I.value,
          balance: P.value
        }) : null),
        X = vueV(() => {
          let e = Y.value;
          if (!e) return null;
          let t = Math.max(40, fe.value.width - Rn),
            n = Math.max(40, fe.value.height - Rn),
            r = Math.min(t / e.width, n / e.height, 1 / W.value);
          return {
            width: Math.max(1, Math.round(e.width * r)),
            height: Math.max(1, Math.round(e.height * r))
          };
        }),
        $e = vueV(() => Y.value && X.value ? Y.value.width / X.value.width : 1),
        et = vueV(() => {
          let e = K.editingTextId.value,
            found = K.annotations.value.find(item => item.id === e);
          return found?.kind === `text` ? found : null;
        }),
        tt = vueV(() => {
          let e = et.value,
            t = Y.value;
          if (!e || !t) return null;
          let n = 1 / $e.value,
            r = e.size * n;
          return {
            left: `${(t.origin.x + e.x) * n}px`,
            top: `${(t.origin.y + e.y) * n}px`,
            fontSize: `${r}px`,
            lineHeight: `1.3`,
            color: e.color,
            fontFamily: composeO,
            fontWeight: `600`,
            minWidth: `${Math.max(24, r * 2)}px`
          };
        }),
        nt = vueV(() => H.value ? H.value : K.tool.value === `select` ? `default` : K.tool.value === `text` ? `text` : `crosshair`),
        rt = vueV(() => B.value ? screenshotToolA(`StatusExporting`) : we.value === V.value ? screenshotToolA(`StatusCopied`) : we.value >= 0 ? screenshotToolA(`StatusChanged`) : screenshotToolA(`StatusIdle`)),
        it = vueV(() => Y.value ? `${Y.value.width} × ${Y.value.height}` : ``),
        at = vueV(() => I.value.enabled && I.value.backgroundKind === `transparent`),
        ot = vueV(() => [{
          tool: `select`,
          icon: undo2N,
          label: screenshotToolA(`ToolSelect`),
          key: `V`
        }, {
          tool: `rect`,
          icon: uiSwitchTt,
          label: screenshotToolA(`ToolRect`),
          key: `R`
        }, {
          tool: `ellipse`,
          icon: uiSwitchJt,
          label: screenshotToolA(`ToolEllipse`),
          key: `O`
        }, {
          tool: `arrow`,
          icon: We,
          label: screenshotToolA(`ToolArrow`),
          key: `A`
        }, {
          tool: `line`,
          icon: uiSwitchKt,
          label: screenshotToolA(`ToolLine`),
          key: `L`
        }, {
          tool: `pen`,
          icon: uiSwitchOt,
          label: screenshotToolA(`ToolPen`),
          key: `P`
        }, {
          tool: `highlighter`,
          icon: Ue,
          label: screenshotToolA(`ToolHighlighter`),
          key: `H`
        }, {
          tool: `text`,
          icon: uiSwitchCt,
          label: screenshotToolA(`ToolText`),
          key: `T`
        }, {
          tool: `number`,
          icon: DropdownMenuItemN,
          label: screenshotToolA(`ToolNumber`),
          key: `N`
        }, {
          tool: `mosaic`,
          icon: He,
          label: screenshotToolA(`ToolMosaic`),
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
        ct = screenshotToolR ? `⌘` : `Ctrl+`;
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
            P.value = composeA(T.value, W.value);
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
        let e = ue.value,
          t = Y.value,
          n = T.value,
          r = X.value;
        if (!e || !t || !n || !r) return;
        let fallbackValue = window.devicePixelRatio || 1,
          a = Math.min(1, r.width * fallbackValue / t.width),
          o = Math.max(1, Math.round(t.width * a)),
          s = Math.max(1, Math.round(t.height * a));
        (e.width !== o || e.height !== s) && (e.width = o, e.height = s);
        let c = composeP(e);
        c.setTransform(1, 0, 0, 1, 0, 0), composeI(c, {
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
        let n = Y.value,
          r = K.selected.value;
        if (!n || !r || K.editingTextId.value === r.id) return;
        let handler = e => e * $e.value,
          a = composeS(r),
          o = handler(4);
        e.save(), e.setTransform(t, 0, 0, t, n.origin.x * t, n.origin.y * t), e.setLineDash([handler(4), handler(3)]), e.lineWidth = handler(1), e.strokeStyle = `#10b981`, e.strokeRect(a.x - o, a.y - o, a.width + o * 2, a.height + o * 2), e.setLineDash([]);
        for (let t of composeC(r)) e.beginPath(), e.arc(t.x, t.y, handler(5), 0, Math.PI * 2), e.fillStyle = `#ffffff`, e.fill(), e.lineWidth = handler(1.5), e.stroke();
        e.restore();
      }
      function mt(e) {
        let t = ue.value,
          n = Y.value;
        if (!t || !n) return null;
        let boundingClientRect = t.getBoundingClientRect();
        return boundingClientRect.width <= 0 || boundingClientRect.height <= 0 ? null : {
          x: (e.clientX - boundingClientRect.left) / boundingClientRect.width * n.width - n.origin.x,
          y: (e.clientY - boundingClientRect.top) / boundingClientRect.height * n.height - n.origin.y
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
        await vueRt();
        let e = de.value;
        e && (e.focus(), e.setSelectionRange(e.value.length, e.value.length));
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
        let e = T.value;
        if (!e) throw Error(screenshotToolA(`ActionFailed`));
        let {
          png: t
        } = await composeR({
          source: e,
          scale: W.value,
          style: I.value,
          annotations: K.annotations.value,
          balance: P.value
        });
        return t;
      }
      async function Tt(e, t) {
        let n = l.value;
        if (n && !B.value) {
          B.value = e;
          try {
            let r = V.value;
            await t(await wt(), n.id), e === `copy` && (we.value = r);
          } catch (e) {
            Z(screenshotToolA(`ToastFailed`, {
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
          })), e ? Mt() : t || Z(screenshotToolA(`ToastCopied`));
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
          let fallbackValue = i.filePath.split(/[\\/]/).pop() || i.filePath;
          Z(screenshotToolA(`ToastSaved`, {
            name: fallbackValue
          }), {
            label: screenshotToolA(`ToastReveal`),
            run: () => editor.revealFile(i.filePath)
          });
        });
      }
      async function kt() {
        await Tt(`pin`, async (e, t) => {
          Et(await editor.pin({
            id: t,
            image: e
          })), Z(screenshotToolA(`ToastPinned`));
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
        let e = l.value;
        e && editor.updateState({
          id: e.id,
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
            })), Z(screenshotToolA(`PresetSaved`));
          } catch (e) {
            Z(screenshotToolA(`ToastFailed`, {
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
          Z(screenshotToolA(`ToastFailed`, {
            reason: ut(e)
          }));
        }
      }
      function Ft(e) {
        if (!l.value || e.isComposing) return;
        let t = e.target;
        if (t && (t.tagName === `INPUT` || t.tagName === `TEXTAREA` || t.isContentEditable)) return;
        let lowercased = e.key.toLowerCase(),
          r = screenshotToolI(e);
        if (e.key === `Escape`) {
          e.preventDefault(), K.cancelDraft() ? Q() : K.selectedId.value ? (K.select(null), Q()) : Mt();
          return;
        }
        if (e.key === `Enter`) {
          e.preventDefault(), Dt(true);
          return;
        }
        if (r && lowercased === `c`) {
          e.preventDefault(), Dt(false);
          return;
        }
        if (r && lowercased === `s`) {
          e.preventDefault(), Ot(e.shiftKey);
          return;
        }
        if (r && lowercased === `z`) {
          e.preventDefault(), e.shiftKey ? K.redo() : K.undo(), Q();
          return;
        }
        if (r && lowercased === `y`) {
          e.preventDefault(), K.redo(), Q();
          return;
        }
        if ((e.key === `Delete` || e.key === `Backspace`) && K.selectedId.value) {
          e.preventDefault(), K.deleteSelected(), Q();
          return;
        }
        !r && !e.altKey && !e.ctrlKey && !e.metaKey && options[lowercased] && (e.preventDefault(), Ct(options[lowercased]));
      }
      function It(e) {
        let t = Math.min(1, 96 / Math.max(e.width, e.height)),
          n = composeM(e.width * t, e.height * t);
        composeP(n).drawImage(e, 0, 0, n.width, n.height);
        let toDataURL = n.toDataURL(`image/jpeg`, .7);
        return composeV(n), toDataURL;
      }
      async function Lt(el) {
        $(), screenshotToolN(el);
        let t;
        try {
          t = await compose(el.image);
        } catch (e) {
          Z(screenshotToolA(`ToastFailed`, {
            reason: ut(e)
          }));
          return;
        }
        Je = true, composeV(T.value), T.value = t, l.value = el, I.value = {
          ...el.style
        }, L.value = el.presets, oe.value = el.backgroundLibrary ?? [], P.value = null, qe = false, Ke.key = ``, dt(), K.load(el.annotations), K.setTool(el.annotations.length > 0 ? `select` : K.tool.value), se.value = It(t), z.value = el.runOcr ? `text` : `style`, U.value = null, await vueRt(), Je = false, V.value = 0, we.value = -1, ft(), el.autoCopy && Dt(false, true);
      }
      function Rt() {
        K.finishTextEditing(), $(), l.value = null, composeV(T.value), T.value = null, P.value = null, qe = false, Ke.key = ``, composeV(Ke.canvas), Ke.canvas = null, K.load([]), se.value = ``, U.value = null;
      }
      return vueWt(I, () => {
        dt(), !Je && (V.value += 1, jt(), Q());
      }, {
        deep: true
      }), vueWt(() => [I.value.backgroundKind, I.value.backgroundImage, I.value.backgroundImageSource], () => {
        Je || $();
      }), vueWt(() => K.annotations.value, () => {
        Je || (V.value += 1, jt(), Q());
      }), vueWt([() => K.selectedId.value, () => K.draft.value, () => K.editingTextId.value, X], () => Q()), vueUt(() => {
        let screenshotToolAPI = window.screenshotToolAPI;
        emptyItems.push(editor.onOpen(e => {
          Lt(e);
        }), editor.onReset(Rt), screenshotToolAPI.onTheme(({
          dark: e
        }) => screenshotToolT(e))), window.addEventListener(`keydown`, Ft), window.addEventListener(`beforeunload`, $), le.value && (Ze = new ResizeObserver(e => {
          let t = e[0]?.contentRect;
          t && (fe.value = {
            width: t.width,
            height: t.height
          });
        }), Ze.observe(le.value)), screenshotToolAPI.ready();
      }), vueOt(() => {
        for (let e of emptyItems) e();
        window.removeEventListener(`keydown`, Ft), window.removeEventListener(`beforeunload`, $), Ze?.disconnect(), Xe && cancelAnimationFrame(Xe), J !== null && window.clearTimeout(J), $();
      }), (e, t) => (vueGt(), vueS(`div`, mn, [vueY(`header`, {
        class: `screenshot-drag-region flex h-12 shrink-0 items-center gap-3 border-b border-border bg-[#fafafa] dark:bg-[#18181b]`,
        style: vueNr({
          paddingLeft: vueAn(screenshotToolR) ? `84px` : `14px`,
          paddingRight: vueAn(screenshotToolR) ? `14px` : `150px`
        })
      }, [vueY(`div`, hn, [vueK(vueAn(beautifierG), {
        size: 15,
        class: `text-primary`
      }), vueO(vueRr(vueAn(screenshotToolA)(`EditorTitle`)), 1)]), vueY(`div`, gn, [(vueGt(true), vueS(vueC, null, vueSt(ot.value, e => (vueGt(), vueS(`button`, {
        key: e.tool,
        type: `button`,
        class: vueN([`inline-flex size-8 items-center justify-center rounded-lg transition-colors`, vueAn(K).tool.value === e.tool ? `bg-primary/12 text-primary` : `text-foreground/75 hover:bg-black/[0.05] dark:hover:bg-white/10`]),
        title: `${e.label} (${e.key})`,
        "aria-label": e.label,
        "aria-pressed": vueAn(K).tool.value === e.tool,
        onMousedown: t[0] ||= playerE(() => {}, [`prevent`]),
        onClick: t => Ct(e.tool)
      }, [(vueGt(), vueB(vueEt(e.icon), {
        size: 16
      }))], 42, _n))), 128)), t[19] ||= vueY(`span`, {
        class: `mx-1.5 h-5 w-px bg-border`
      }, null, -1), (vueGt(true), vueS(vueC, null, vueSt(vueAn(sn), e => (vueGt(), vueS(`button`, {
        key: e,
        type: `button`,
        class: `inline-flex size-6 items-center justify-center rounded-full`,
        title: e,
        onMousedown: t[1] ||= playerE(() => {}, [`prevent`]),
        onClick: t => {
          vueAn(K).setColor(e), Q();
        }
      }, [vueY(`span`, {
        class: vueN([`size-4 rounded-full border border-black/15 dark:border-white/20`, vueAn(K).color.value === e ? `ring-2 ring-primary ring-offset-1 ring-offset-[#fafafa] dark:ring-offset-[#18181b]` : ``]),
        style: vueNr({
          background: e
        })
      }, null, 6)], 40, vn))), 128)), t[20] ||= vueY(`span`, {
        class: `mx-1.5 h-5 w-px bg-border`
      }, null, -1), (vueGt(), vueS(vueC, null, vueSt(st, e => vueY(`button`, {
        key: e.level,
        type: `button`,
        class: vueN([`inline-flex size-7 items-center justify-center rounded-lg transition-colors`, vueAn(K).level.value === e.level ? `bg-primary/12 text-primary` : `text-foreground/70 hover:bg-black/[0.05] dark:hover:bg-white/10`]),
        title: vueAn(screenshotToolA)(e.label),
        onMousedown: t[2] ||= playerE(() => {}, [`prevent`]),
        onClick: t => {
          vueAn(K).setLevel(e.level), Q();
        }
      }, [vueY(`span`, {
        class: `rounded-full bg-current`,
        style: vueNr({
          width: `${e.dot}px`,
          height: `${e.dot}px`
        })
      }, null, 4)], 42, yn)), 64)), t[21] ||= vueY(`span`, {
        class: `mx-1.5 h-5 w-px bg-border`
      }, null, -1), vueY(`button`, {
        type: `button`,
        class: `inline-flex size-8 items-center justify-center rounded-lg text-foreground/75 hover:bg-black/[0.05] disabled:opacity-35 dark:hover:bg-white/10`,
        disabled: !vueAn(K).canUndo.value,
        title: `${vueAn(screenshotToolA)(`Undo`)} (${vueAn(ct)}Z)`,
        onMousedown: t[3] ||= playerE(() => {}, [`prevent`]),
        onClick: t[4] ||= e => {
          vueAn(K).undo(), Q();
        }
      }, [vueK(vueAn(undo2T), {
        size: 16
      })], 40, bn), vueY(`button`, {
        type: `button`,
        class: `inline-flex size-8 items-center justify-center rounded-lg text-foreground/75 hover:bg-black/[0.05] disabled:opacity-35 dark:hover:bg-white/10`,
        disabled: !vueAn(K).canRedo.value,
        title: `${vueAn(screenshotToolA)(`Redo`)} (${vueAn(ct)}${vueAn(screenshotToolR) ? `⇧Z` : `Y`})`,
        onMousedown: t[5] ||= playerE(() => {}, [`prevent`]),
        onClick: t[6] ||= e => {
          vueAn(K).redo(), Q();
        }
      }, [vueK(vueAn(Ge), {
        size: 16
      })], 40, xn), vueY(`button`, {
        type: `button`,
        class: `inline-flex size-8 items-center justify-center rounded-lg text-foreground/75 hover:bg-black/[0.05] hover:text-destructive disabled:opacity-35 dark:hover:bg-white/10`,
        disabled: !vueAn(K).selectedId.value,
        title: `${vueAn(screenshotToolA)(`Delete`)} (Delete)`,
        onMousedown: t[7] ||= playerE(() => {}, [`prevent`]),
        onClick: t[8] ||= e => {
          vueAn(K).deleteSelected(), Q();
        }
      }, [vueK(vueAn(uiSwitchWt), {
        size: 16
      })], 40, Sn)])], 4), vueY(`div`, Cn, [vueY(`main`, wn, [vueY(`div`, {
        ref_key: `stageRef`,
        ref: le,
        class: `relative flex min-h-0 flex-1 items-center justify-center overflow-hidden bg-[#ececee] dark:bg-[#0e0e10]`
      }, [X.value ? (vueGt(), vueS(`div`, {
        key: 0,
        class: `relative shadow-[0_0_0_1px_rgb(0_0_0/0.04)]`,
        style: vueNr({
          width: `${X.value.width}px`,
          height: `${X.value.height}px`,
          ...(at.value ? {
            background: `repeating-conic-gradient(#e4e4e7 0% 25%, #ffffff 0% 50%) 50% / 16px 16px`
          } : {})
        })
      }, [vueY(`canvas`, {
        ref_key: `canvasRef`,
        ref: ue,
        class: `block h-full w-full touch-none`,
        style: vueNr({
          cursor: nt.value
        }),
        onPointerdown: gt,
        onPointermove: _t,
        onPointerup: vt,
        onPointercancel: vt,
        onPointerleave: t[9] ||= e => H.value = ``,
        onDblclick: yt
      }, null, 36), et.value && tt.value ? (vueGt(), vueS(`textarea`, {
        key: 0,
        ref_key: `textareaRef`,
        ref: de,
        class: `absolute m-0 resize-none overflow-hidden whitespace-pre border-0 bg-transparent p-0 outline-none [field-sizing:content]`,
        style: vueNr(tt.value),
        value: et.value.text,
        placeholder: vueAn(screenshotToolA)(`TextPlaceholder`),
        rows: `1`,
        spellcheck: `false`,
        onInput: t[10] ||= e => vueAn(K).updateEditingText(e.target.value),
        onKeydown: xt,
        onBlur: St
      }, null, 44, Tn)) : vueX(``, true)], 4)) : (vueGt(), vueS(`div`, En, [vueK(vueAn(beautifier), {
        size: 16,
        class: `animate-spin`
      }), vueO(vueRr(vueAn(screenshotToolA)(`EditorLoading`)), 1)])), vueK(playerR, {
        "enter-from-class": `opacity-0 translate-y-1`,
        "leave-to-class": `opacity-0`,
        "enter-active-class": `transition duration-150`,
        "leave-active-class": `transition duration-150`
      }, {
        default: vueYt(() => [U.value ? (vueGt(), vueS(`div`, Dn, [vueY(`span`, null, vueRr(U.value.message), 1), U.value.action ? (vueGt(), vueS(`button`, {
          key: 0,
          type: `button`,
          class: `font-semibold text-emerald-300 hover:underline dark:text-emerald-700`,
          onClick: t[11] ||= e => U.value.action.run()
        }, vueRr(U.value.action.label), 1)) : vueX(``, true)])) : vueX(``, true)]),
        _: 1
      })], 512), vueY(`footer`, On, [vueY(`div`, kn, [we.value === V.value && !B.value ? (vueGt(), vueB(vueAn(checkT), {
        key: 0,
        size: 14,
        class: `shrink-0 text-primary`
      })) : B.value ? (vueGt(), vueB(vueAn(beautifier), {
        key: 1,
        size: 14,
        class: `shrink-0 animate-spin`
      })) : vueX(``, true), vueY(`span`, An, vueRr(rt.value), 1), it.value ? (vueGt(), vueS(`span`, jn, `· ` + vueRr(it.value), 1)) : vueX(``, true)]), vueY(`div`, Mn, [vueK(vueAn(uiSwitchR), {
        variant: `ghost`,
        size: `sm`,
        class: `text-xs`,
        disabled: !l.value || B.value !== null,
        onClick: kt
      }, {
        default: vueYt(() => [vueK(vueAn(lucideN), {
          size: 14
        }), vueO(vueRr(vueAn(screenshotToolA)(`ActionPin`)), 1)]),
        _: 1
      }, 8, [`disabled`]), vueK(vueAn(uiSwitchR), {
        variant: `ghost`,
        size: `sm`,
        class: `text-xs`,
        disabled: !l.value || B.value !== null,
        onClick: At
      }, {
        default: vueYt(() => [B.value === `bot` ? (vueGt(), vueB(vueAn(beautifier), {
          key: 0,
          size: 14,
          class: `animate-spin`
        })) : (vueGt(), vueB(vueAn(uiSwitchEt), {
          key: 1,
          size: 14
        })), vueO(vueRr(vueAn(screenshotToolA)(`ActionSendToBot`)), 1)]),
        _: 1
      }, 8, [`disabled`]), vueY(`div`, Nn, [vueK(vueAn(uiSwitchR), {
        variant: `outline`,
        size: `sm`,
        class: `rounded-r-none text-xs`,
        disabled: !l.value || B.value !== null,
        title: `${vueAn(ct)}S`,
        onClick: t[12] ||= e => Ot(false)
      }, {
        default: vueYt(() => [B.value === `save` ? (vueGt(), vueB(vueAn(beautifier), {
          key: 0,
          size: 14,
          class: `animate-spin`
        })) : (vueGt(), vueB(vueAn(beautifierV), {
          key: 1,
          size: 14
        })), vueO(vueRr(vueAn(screenshotToolA)(`ActionSave`)), 1)]),
        _: 1
      }, 8, [`disabled`, `title`]), vueK(vueAn(DropdownMenuTriggerR), null, {
        default: vueYt(() => [vueK(vueAn(DropdownMenuTriggerT), {
          "as-child": ``
        }, {
          default: vueYt(() => [vueK(vueAn(uiSwitchR), {
            variant: `outline`,
            size: `icon-sm`,
            class: `-ml-px rounded-l-none`,
            disabled: !l.value || B.value !== null,
            "aria-label": vueAn(screenshotToolA)(`ActionSaveAs`)
          }, {
            default: vueYt(() => [vueK(vueAn(PopperContentS), {
              size: 14
            })]),
            _: 1
          }, 8, [`disabled`, `aria-label`])]),
          _: 1
        }), vueK(vueAn(DropdownMenuTriggerN), {
          align: `end`,
          class: `min-w-36`
        }, {
          default: vueYt(() => [vueK(vueAn(DropdownMenuItemT), {
            class: `text-xs`,
            onSelect: t[13] ||= e => Ot(false)
          }, {
            default: vueYt(() => [vueO(vueRr(vueAn(screenshotToolA)(`ActionSaveToFolder`)), 1)]),
            _: 1
          }), vueK(vueAn(DropdownMenuItemT), {
            class: `text-xs`,
            onSelect: t[14] ||= e => Ot(true)
          }, {
            default: vueYt(() => [vueO(vueRr(vueAn(screenshotToolA)(`ActionSaveAs`)), 1)]),
            _: 1
          })]),
          _: 1
        })]),
        _: 1
      })]), vueK(vueAn(uiSwitchR), {
        size: `sm`,
        class: `min-w-24 text-xs`,
        disabled: !l.value || B.value !== null,
        title: vueAn(screenshotToolA)(`ActionCopyHint`),
        onClick: t[15] ||= e => Dt(true)
      }, {
        default: vueYt(() => [B.value === `copy` ? (vueGt(), vueB(vueAn(beautifier), {
          key: 0,
          size: 14,
          class: `animate-spin`
        })) : (vueGt(), vueB(vueAn(beautifierY), {
          key: 1,
          size: 14
        })), vueO(vueRr(vueAn(screenshotToolA)(`ActionCopy`)), 1)]),
        _: 1
      }, 8, [`disabled`, `title`])])])]), vueY(`aside`, Pn, [vueY(`div`, Fn, [vueY(`button`, {
        type: `button`,
        class: vueN([`inline-flex h-7 flex-1 items-center justify-center gap-1.5 rounded-md text-xs transition-colors`, z.value === `style` ? `bg-muted font-semibold text-foreground` : `text-muted-foreground hover:text-foreground`]),
        onClick: t[16] ||= e => z.value = `style`
      }, [vueK(vueAn(beautifierG), {
        size: 13
      }), vueO(vueRr(vueAn(screenshotToolA)(`TabStyle`)), 1)], 2), vueY(`button`, {
        type: `button`,
        class: vueN([`inline-flex h-7 flex-1 items-center justify-center gap-1.5 rounded-md text-xs transition-colors`, z.value === `text` ? `bg-muted font-semibold text-foreground` : `text-muted-foreground hover:text-foreground`]),
        onClick: t[17] ||= e => z.value = `text`
      }, [vueK(vueAn(composeY), {
        size: 13
      }), vueO(vueRr(vueAn(screenshotToolA)(`TabText`)), 1)], 2)]), vueY(`div`, In, [vueZt(vueK(an, {
        current: I.value,
        presets: L.value,
        "background-library": oe.value,
        thumbnail: se.value,
        "saving-preset": pe.value,
        "onUpdate:style": t[18] ||= e => I.value = e,
        onSavePreset: Nt,
        onDeletePreset: Pt
      }, null, 8, [`current`, `presets`, `background-library`, `thumbnail`, `saving-preset`]), [[playerW, z.value === `style`]]), l.value ? vueZt((vueGt(), vueB(Ye, {
        key: 0,
        "session-id": l.value.id,
        supported: l.value.ocrSupported,
        "auto-run": l.value.runOcr,
        onToast: Z
      }, null, 8, [`session-id`, `supported`, `auto-run`])), [[playerW, z.value === `text`]]) : vueX(``, true)])])])]));
    }
  });
export { zn as default };