import { r as uiSwitchR } from "../ui/Switch.js";
import { $n as vueN, An as vueAn, E as vueE, O as vueO, S as vueS, St as vueSt, Wt as vueWt, Yt as vueYt, b as vueB, c as vueC, fn as vueFn, gt as vueGt, j as vueJ, k as vueK, rr as vueRr, v as vueV, x as vueX, y as vueY } from "../chunks/vue-i18n.runtime.js";
import { r as lucideR } from "../ui/icons/lucide-icons.js";
import { t as i18nT } from "../i18n/i18n-helper.js";
import { t as checkT } from "../chunks/check.js";
import { r as toolIconR } from "../chunks/tool-icons.js";
import { t as volume2T } from "../chunks/volume-2.js";
import { t as SliderT } from "../ui/Slider.js";
import { c as toolSettingsC } from "../chunks/toolSettingsContext.js";
import { Tn as mainTn, at as mainAt, it as mainIt, nt as mainNt, rt as mainRt, tt as mainTt, un as mainUn } from "../chunks/main.js";
import { t as DesktopWidgetPageT } from "./DesktopWidgetPage.js";
var ge = lucideR(`file-headphone`, [[`path`, {
    d: `M4 6.835V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2h-.343`,
    key: `1vfytu`
  }], [`path`, {
    d: `M14 2v5a1 1 0 0 0 1 1h5`,
    key: `wfsgrz`
  }], [`path`, {
    d: `M2 19a2 2 0 0 1 4 0v1a2 2 0 0 1-4 0v-4a6 6 0 0 1 12 0v4a2 2 0 0 1-4 0v-1a2 2 0 0 1 4 0`,
    key: `1etmh7`
  }]]),
  v = {
    key: 0,
    class: `text-muted-foreground`
  },
  y = {
    key: 1,
    class: `flex items-center justify-between gap-3 rounded-lg bg-destructive/[0.06] px-3 py-2 text-destructive`
  },
  b = {
    class: `rounded-xl border border-border bg-card`
  },
  x = {
    class: `flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 px-4 pt-4`
  },
  S = {
    class: `text-[13px] font-semibold`
  },
  C = {
    class: `text-xs text-muted-foreground`
  },
  w = {
    class: `grid grid-cols-1 gap-2 p-4 @lg:grid-cols-2 @3xl:grid-cols-3 @5xl:grid-cols-4`
  },
  T = [`aria-pressed`, `disabled`, `onClick`],
  E = {
    class: `flex items-center gap-1.5 text-xs font-semibold`
  },
  D = {
    class: `truncate`
  },
  O = {
    class: `truncate text-[11px] text-muted-foreground`
  },
  k = [`aria-label`, `title`, `onClick`],
  A = {
    class: `min-w-0 flex-1`
  },
  j = {
    class: `flex items-center gap-1.5 text-xs font-semibold`
  },
  M = {
    key: 0,
    class: `rounded-full bg-primary/10 px-1.5 text-[10px] font-medium leading-4 text-primary`
  },
  N = [`title`],
  P = {
    class: `mt-0.5 block text-[11px] text-destructive`
  },
  F = {
    class: `block text-[11px] text-muted-foreground`
  },
  I = {
    key: 2,
    class: `mt-0.5 block text-[11px] text-muted-foreground`
  },
  L = {
    class: `flex shrink-0 items-center gap-1.5`
  },
  _e = {
    class: `flex flex-col divide-y divide-border rounded-xl border border-border bg-card`
  },
  ve = {
    class: `flex flex-wrap items-center gap-x-5 gap-y-2 px-4 py-3.5`
  },
  ye = {
    class: `flex w-24 shrink-0 items-center gap-2 text-[13px] font-semibold`
  },
  be = {
    class: `w-10 shrink-0 text-right text-xs tabular-nums text-muted-foreground`
  },
  xe = {
    class: `flex flex-col gap-2.5 px-4 py-3.5`
  },
  Se = {
    class: `flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1`
  },
  Ce = {
    class: `text-[13px] font-semibold`
  },
  we = {
    class: `text-xs text-muted-foreground`
  },
  R = vueJ({
    __name: `KeyboardSoundTool`,
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
        Te = emit,
        {
          t: translate
        } = i18nT(),
        {
          settings: B
        } = toolIconR(),
        {
          controlsDisabled: V,
          enterKeyComponentState: H,
          enterKeyComponentBusy: Ee,
          isChangingMechanicalKeyboard: U,
          showMechanicalKeyboardConsent: W,
          mechanicalKeyboardConsentInfo: De,
          mechanicalKeyboardVolumeDraft: G,
          customKeyboardSoundInfo: K,
          isManagingCustomKeyboardSound: q,
          showDeleteCustomKeyboardSound: J,
          loadCustomKeyboardSoundInfo: Oe,
          importCustomKeyboardSound: ke,
          previewKeyboardSound: Ae,
          previewCustomKeyboardSound: je,
          deleteCustomKeyboardSound: Y,
          handleMechanicalKeyboardToggle: Me,
          confirmEnableMechanicalKeyboard: Ne,
          retryMechanicalKeyboard: Pe,
          changeMechanicalKeyboardSwitch: Fe,
          previewMechanicalKeyboardVolume: Ie,
          saveMechanicalKeyboardVolume: Le
        } = mainRt(),
        Re = vueV(() => mainTt.filter(state => state.value !== `custom`).map(state => {
          let [t, ...n] = translate(state.labelKey).split(` · `);
          return {
            value: state.value,
            name: t,
            description: n.join(` · `)
          };
        })),
        X = vueV(() => V.value || U.value || q.value),
        Z = vueV(() => B.value.mechanicalKeyboardSwitchType === `custom`),
        Q = vueV(() => B.value.enableMechanicalKeyboardSound && H.value?.status === `error`);
      function $(e) {
        Fe(e, {
          alwaysPreview: true
        });
      }
      function ze(e) {
        e.repeat || B.value.enableMechanicalKeyboardSound || mainIt.preview(B.value.mechanicalKeyboardSwitchType).catch(() => undefined);
      }
      return vueWt(() => propsAlias.active, e => {
        e && Oe();
      }), (ne, renderCache) => (vueGt(), vueB(DesktopWidgetPageT, {
        tool: propsAlias.tool,
        user: propsAlias.user,
        "credits-balance": propsAlias.creditsBalance,
        description: vueAn(translate)(`toolboxNative.keyboardSoundToolIntro`),
        enabled: vueAn(B).enableMechanicalKeyboardSound,
        "toggle-disabled": vueAn(V) || vueAn(U) || vueAn(Ee),
        "requires-accessibility": ``,
        onToggle: vueAn(Me),
        onBack: renderCache[4] ||= e => Te(`back`)
      }, vueE({
        default: vueYt(() => [vueY(`section`, b, [vueY(`header`, x, [vueY(`strong`, S, vueRr(vueAn(translate)(`settings.mechanicalKeyboardSwitchType`)), 1), vueY(`small`, C, vueRr(vueAn(translate)(`toolboxNative.keyboardSoundTypesHint`)), 1)]), vueY(`div`, w, [(vueGt(true), vueS(vueC, null, vueSt(Re.value, state => (vueGt(), vueS(`div`, {
          key: state.value,
          class: `relative`
        }, [vueY(`button`, {
          type: `button`,
          class: vueN([`flex w-full min-w-0 flex-col gap-0.5 rounded-lg border py-2.5 pr-11 pl-3 text-left transition-colors disabled:cursor-not-allowed disabled:opacity-60`, vueAn(B).mechanicalKeyboardSwitchType === state.value ? `border-primary bg-primary/[0.05]` : `border-border hover:border-foreground/20 hover:bg-muted/50`]),
          "aria-pressed": vueAn(B).mechanicalKeyboardSwitchType === state.value,
          disabled: X.value,
          onClick: t => $(state.value)
        }, [vueY(`strong`, E, [vueY(`span`, D, vueRr(state.name), 1), vueAn(B).mechanicalKeyboardSwitchType === state.value ? (vueGt(), vueB(vueAn(checkT), {
          key: 0,
          size: 13,
          class: `shrink-0 text-primary`
        })) : vueX(``, true)]), vueY(`small`, O, vueRr(state.description), 1)], 10, T), vueY(`button`, {
          type: `button`,
          class: `absolute top-1/2 right-2 inline-flex size-7 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground`,
          "aria-label": `${vueAn(translate)(`settings.keyboardSoundCustomPreview`)} ${state.name}`,
          title: vueAn(translate)(`settings.keyboardSoundCustomPreview`),
          onClick: t => vueAn(Ae)(state.value)
        }, [vueK(vueAn(mainTn), {
          size: 14
        })], 8, k)]))), 128))]), vueY(`div`, {
          class: vueN([`mx-4 mb-4 flex flex-wrap items-center gap-x-3 gap-y-2 rounded-lg border px-3 py-2.5`, Z.value ? `border-primary bg-primary/[0.05]` : `border-dashed border-border`])
        }, [vueY(`span`, {
          class: vueN([`inline-flex size-8 shrink-0 items-center justify-center rounded-lg`, Z.value ? `bg-primary/10 text-primary` : `bg-muted text-muted-foreground`])
        }, [vueK(vueAn(ge), {
          size: 16
        })], 2), vueY(`div`, A, [vueY(`strong`, j, [vueO(vueRr(vueAn(translate)(`toolboxNative.keyboardSoundCustomTitle`)) + ` `, 1), Z.value && vueAn(K) ? (vueGt(), vueS(`span`, M, vueRr(vueAn(translate)(`toolboxNative.keyboardSoundInUse`)), 1)) : vueX(``, true)]), vueAn(K) ? (vueGt(), vueS(`small`, {
          key: 0,
          class: `mt-0.5 block truncate text-[11px] text-muted-foreground`,
          title: vueAn(K).fileName
        }, vueRr(vueAn(K).fileName) + ` · ` + vueRr(vueAn(mainNt)(vueAn(K).sizeBytes)) + ` · ` + vueRr(vueAn(K).processedDurationMs) + `ms `, 9, N)) : Z.value ? (vueGt(), vueS(vueC, {
          key: 1
        }, [vueY(`small`, P, vueRr(vueAn(translate)(`settings.keyboardSoundCustomMissing`)), 1), vueY(`small`, F, vueRr(vueAn(translate)(`settings.keyboardSoundCustomMissingDesc`)), 1)], 64)) : (vueGt(), vueS(`small`, I, vueRr(vueAn(translate)(`toolboxNative.keyboardSoundCustomHint`)), 1))]), vueY(`div`, L, [vueAn(K) ? (vueGt(), vueS(vueC, {
          key: 0
        }, [vueK(vueAn(uiSwitchR), {
          size: `sm`,
          variant: `ghost`,
          class: `h-7 px-2 text-xs`,
          disabled: vueAn(q),
          onClick: vueAn(je)
        }, {
          default: vueYt(() => [vueO(vueRr(vueAn(translate)(`settings.keyboardSoundCustomPreview`)), 1)]),
          _: 1
        }, 8, [`disabled`, `onClick`]), Z.value ? vueX(``, true) : (vueGt(), vueB(vueAn(uiSwitchR), {
          key: 0,
          size: `sm`,
          variant: `outline`,
          class: `h-7 px-2.5 text-xs`,
          disabled: X.value,
          onClick: renderCache[0] ||= e => $(`custom`)
        }, {
          default: vueYt(() => [vueO(vueRr(vueAn(translate)(`toolboxNative.keyboardSoundCustomUse`)), 1)]),
          _: 1
        }, 8, [`disabled`]))], 64)) : vueX(``, true), vueK(vueAn(uiSwitchR), {
          size: `sm`,
          variant: `outline`,
          class: `h-7 px-2.5 text-xs`,
          disabled: vueAn(q) || vueAn(V),
          onClick: vueAn(ke)
        }, {
          default: vueYt(() => [vueO(vueRr(vueAn(K) ? vueAn(translate)(`settings.keyboardSoundCustomReplace`) : vueAn(translate)(`settings.keyboardSoundCustomSelect`)), 1)]),
          _: 1
        }, 8, [`disabled`, `onClick`]), vueAn(K) ? (vueGt(), vueB(vueAn(uiSwitchR), {
          key: 1,
          size: `sm`,
          variant: `ghost`,
          class: `h-7 px-2 text-xs text-destructive hover:text-destructive`,
          disabled: vueAn(q),
          onClick: renderCache[1] ||= e => J.value = true
        }, {
          default: vueYt(() => [vueO(vueRr(vueAn(translate)(`settings.keyboardSoundCustomDelete`)), 1)]),
          _: 1
        }, 8, [`disabled`])) : vueX(``, true)])], 2)]), vueY(`section`, _e, [vueY(`div`, ve, [vueY(`strong`, ye, [vueK(vueAn(volume2T), {
          size: 15,
          class: `text-muted-foreground`
        }), vueO(vueRr(vueAn(translate)(`settings.mechanicalKeyboardVolume`)), 1)]), vueK(vueAn(SliderT), {
          class: `min-w-[160px] flex-1`,
          "model-value": vueAn(G),
          min: 0,
          max: 100,
          step: 1,
          disabled: X.value,
          "onUpdate:modelValue": vueAn(Ie),
          onValueCommit: vueAn(Le)
        }, null, 8, [`model-value`, `disabled`, `onUpdate:modelValue`, `onValueCommit`]), vueY(`span`, be, vueRr(vueAn(G)[0]) + `%`, 1)]), vueY(`div`, xe, [vueY(`div`, Se, [vueY(`strong`, Ce, vueRr(vueAn(translate)(`toolboxNative.keyboardSoundTryTitle`)), 1), vueY(`small`, we, vueRr(vueAn(translate)(`toolboxNative.keyboardSoundTryHint`)), 1)]), vueK(vueAn(mainUn), {
          class: `h-9 text-sm`,
          placeholder: vueAn(translate)(`toolboxNative.keyboardSoundTryPlaceholder`),
          onKeydown: ze
        }, null, 8, [`placeholder`])])]), vueK(mainAt, {
          "consent-open": vueAn(W),
          "onUpdate:consentOpen": renderCache[2] ||= e => vueFn(W) ? W.value = e : null,
          "delete-open": vueAn(J),
          "onUpdate:deleteOpen": renderCache[3] ||= e => vueFn(J) ? J.value = e : null,
          "consent-info": vueAn(De),
          onConfirmConsent: vueAn(Ne),
          onConfirmDelete: vueAn(Y)
        }, null, 8, [`consent-open`, `delete-open`, `consent-info`, `onConfirmConsent`, `onConfirmDelete`])]),
        _: 2
      }, [Q.value || vueAn(toolSettingsC) && !vueAn(B).enableMechanicalKeyboardSound ? {
        name: `notes`,
        fn: vueYt(() => [vueAn(toolSettingsC) && !vueAn(B).enableMechanicalKeyboardSound ? (vueGt(), vueS(`p`, v, vueRr(vueAn(translate)(`settings.mechanicalKeyboardWindowsNote`)), 1)) : vueX(``, true), Q.value ? (vueGt(), vueS(`div`, y, [vueY(`span`, null, vueRr(vueAn(H)?.errorMessage || vueAn(translate)(`settings.mechanicalKeyboardSoundFailed`)), 1), vueK(vueAn(uiSwitchR), {
          variant: `outline`,
          size: `sm`,
          class: `h-7 shrink-0 text-xs`,
          disabled: vueAn(U),
          onClick: vueAn(Pe)
        }, {
          default: vueYt(() => [vueO(vueRr(vueAn(translate)(`common.retry`)), 1)]),
          _: 1
        }, 8, [`disabled`, `onClick`])])) : vueX(``, true)]),
        key: `0`
      } : undefined]), 1032, [`tool`, `user`, `credits-balance`, `description`, `enabled`, `toggle-disabled`, `onToggle`]));
    }
  });
export { R as default };