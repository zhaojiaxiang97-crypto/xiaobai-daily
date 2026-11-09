import { Dt as uiSwitchDt } from "../ui/Switch.js";
import { $n as vueN, An as vueAn, Ct as vueCt, S as vueS, c as vueC, gt as vueGt, j as vueJ, k as vueK, rr as vueRr, v as vueV, x as vueX, y as vueY } from "../chunks/vue-i18n.runtime.js";
import { r as lucideR } from "../ui/icons/lucide-icons.js";
import { c as i18nC, d as i18nD, l as i18nL, o as i18nO, s as i18nS, t as i18nT, u as i18nU } from "../i18n/i18n-helper.js";
var x = lucideR(`save-all`, [[`path`, {
    d: `M10 2v3a1 1 0 0 0 1 1h5`,
    key: `1xspal`
  }], [`path`, {
    d: `M18 18v-6a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v6`,
    key: `1ra60u`
  }], [`path`, {
    d: `M18 22H4a2 2 0 0 1-2-2V6`,
    key: `pblm9e`
  }], [`path`, {
    d: `M8 18a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9.172a2 2 0 0 1 1.414.586l2.828 2.828A2 2 0 0 1 22 6.828V16a2 2 0 0 1-2.01 2z`,
    key: `1yve0x`
  }]]),
  S = {
    class: `sticky top-0 z-[15] flex h-[38px] shrink-0 items-center justify-between gap-3 rounded-t-[var(--toolbox-window-corner-radius,10px)] bg-background pl-[calc(16px+var(--toolbox-left-controls-width,0px))] pr-[calc(16px+var(--toolbox-window-controls-width,0px))] before:absolute before:inset-y-0 before:left-[var(--toolbox-left-controls-width,0px)] before:right-[var(--toolbox-window-controls-width,0px)] before:z-0 before:content-[''] before:[-webkit-app-region:drag]`
  },
  C = {
    class: `relative z-[1] flex min-w-0 items-center gap-1 [-webkit-app-region:no-drag]`
  },
  w = [`aria-label`, `title`],
  T = {
    class: `min-w-0 truncate text-sm font-medium text-muted-foreground`
  },
  E = {
    class: `relative z-[1] flex min-w-0 items-center justify-end gap-1.5 [-webkit-app-region:no-drag]`
  },
  D = [`aria-label`, `title`],
  O = [`aria-label`, `title`],
  k = [`aria-label`, `title`],
  A = [`aria-label`, `title`],
  j = [`aria-label`, `title`],
  M = [`aria-label`, `title`],
  N = [`title`],
  P = {
    class: `text-[13px] font-semibold text-primary`
  },
  F = `inline-flex h-8 items-center justify-center gap-1.5 whitespace-nowrap rounded-lg px-2.5 text-[11px] text-muted-foreground transition-[background-color,color,transform] focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-primary/40 active:scale-[0.97]`,
  I = vueJ({
    __name: `ToolboxWorkspaceHeader`,
    props: {
      tool: {},
      user: {},
      creditsBalance: {},
      voiceTool: {
        type: Boolean
      },
      localTool: {
        type: Boolean,
        default: false
      },
      showBalance: {
        type: Boolean,
        default: true
      },
      showHistory: {
        type: Boolean,
        default: true
      },
      historyLabel: {},
      whiteboardTool: {
        type: Boolean,
        default: false
      }
    },
    emits: [`back`, `history`, `voiceLibrary`, `voiceActivity`, `recharge`, `whiteboardOpen`, `whiteboardSave`, `whiteboardSaveAs`],
    setup(props, {
      emit: emit
    }) {
      let propsAlias = props,
        emitAlias = emit,
        {
          t: R
        } = i18nT(),
        z = vueV(() => propsAlias.localTool || propsAlias.tool.price > 0 ? !propsAlias.localTool : Object.values(propsAlias.tool.priceOptions || {}).some(item => Number(item) > 0) || Object.values(propsAlias.tool.characterPriceOptions || {}).some(item => Number(item) > 0) ? true : Object.values(propsAlias.tool.tokenRateOptions || {}).some(item => Number(item?.withVideo) > 0 || Number(item?.withoutVideo) > 0)),
        B = `${F} hover:bg-muted hover:text-foreground`,
        V = `${F} hover:bg-primary/10`;
      return (ctx, renderCache) => (vueGt(), vueS(`header`, S, [vueY(`div`, C, [vueY(`button`, {
        type: `button`,
        class: `inline-flex size-7 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-[background-color,color,transform] hover:bg-muted hover:text-foreground active:scale-[0.96]`,
        "aria-label": vueAn(R)(`toolboxNative.backToToolbox`),
        title: vueAn(R)(`toolboxNative.backToToolbox`),
        onClick: renderCache[0] ||= e => emitAlias(`back`)
      }, [vueK(vueAn(i18nU), {
        size: 18
      })], 8, w), vueCt(ctx.$slots, `title`, {}, () => [vueY(`strong`, T, vueRr(props.tool.name), 1)])]), vueY(`div`, E, [vueCt(ctx.$slots, `actions`), props.whiteboardTool ? (vueGt(), vueS(vueC, {
        key: 0
      }, [vueY(`button`, {
        type: `button`,
        class: vueN(B),
        "aria-label": vueAn(R)(`toolboxNative.whiteboardOpen`),
        title: vueAn(R)(`toolboxNative.whiteboardOpen`),
        onClick: renderCache[1] ||= e => emitAlias(`whiteboardOpen`)
      }, [vueK(vueAn(i18nL), {
        size: 15
      }), vueY(`span`, null, vueRr(vueAn(R)(`toolboxNative.whiteboardOpenShort`)), 1)], 8, D), vueY(`button`, {
        type: `button`,
        class: vueN(B),
        "aria-label": vueAn(R)(`toolboxNative.whiteboardSave`),
        title: vueAn(R)(`toolboxNative.whiteboardSave`),
        onClick: renderCache[2] ||= e => emitAlias(`whiteboardSave`)
      }, [vueK(vueAn(i18nS), {
        size: 15
      }), vueY(`span`, null, vueRr(vueAn(R)(`toolboxNative.whiteboardSaveShort`)), 1)], 8, O), vueY(`button`, {
        type: `button`,
        class: vueN(B),
        "aria-label": vueAn(R)(`toolboxNative.whiteboardSaveAs`),
        title: vueAn(R)(`toolboxNative.whiteboardSaveAs`),
        onClick: renderCache[3] ||= e => emitAlias(`whiteboardSaveAs`)
      }, [vueK(vueAn(x), {
        size: 15
      }), vueY(`span`, null, vueRr(vueAn(R)(`toolboxNative.whiteboardSaveAsShort`)), 1)], 8, k)], 64)) : vueX(``, true), props.voiceTool ? (vueGt(), vueS(vueC, {
        key: 1
      }, [vueY(`button`, {
        type: `button`,
        class: vueN(B),
        "aria-label": vueAn(R)(`toolboxNative.myVoiceLibrary`),
        title: vueAn(R)(`toolboxNative.myVoiceLibrary`),
        onClick: renderCache[4] ||= e => emitAlias(`voiceLibrary`)
      }, [vueK(vueAn(i18nD), {
        size: 15
      }), vueY(`span`, null, vueRr(vueAn(R)(`toolboxNative.myVoiceLibrary`)), 1)], 8, A), vueY(`button`, {
        type: `button`,
        class: vueN(B),
        "aria-label": vueAn(R)(`toolboxNative.voiceActivity`),
        title: vueAn(R)(`toolboxNative.voiceActivity`),
        onClick: renderCache[5] ||= e => emitAlias(`voiceActivity`)
      }, [vueK(vueAn(i18nC), {
        size: 15
      }), vueY(`span`, null, vueRr(vueAn(R)(`toolboxNative.voiceActivity`)), 1)], 8, j)], 64)) : props.showHistory && !props.localTool ? (vueGt(), vueS(`button`, {
        key: 2,
        type: `button`,
        class: vueN(B),
        "aria-label": props.historyLabel || vueAn(R)(`toolboxNative.generationHistory`),
        title: props.historyLabel || vueAn(R)(`toolboxNative.generationHistory`),
        onClick: renderCache[6] ||= e => emitAlias(`history`)
      }, [vueK(vueAn(i18nC), {
        size: 15
      }), vueY(`span`, null, vueRr(props.historyLabel || vueAn(R)(`toolboxNative.generationHistory`)), 1)], 8, M)) : vueX(``, true), props.user && props.showBalance && z.value ? (vueGt(), vueS(`button`, {
        key: 3,
        type: `button`,
        class: vueN(V),
        title: `${vueAn(R)(`toolboxNative.balance`)} ${props.creditsBalance.toLocaleString()}`,
        onClick: renderCache[7] ||= e => emitAlias(`recharge`)
      }, [vueK(vueAn(i18nO), {
        size: 15
      }), vueY(`span`, null, vueRr(vueAn(R)(`toolboxNative.balance`)), 1), vueY(`strong`, P, vueRr(props.creditsBalance.toLocaleString()), 1), vueK(vueAn(uiSwitchDt), {
        size: 13
      })], 8, N)) : vueX(``, true)])]));
    }
  });
export { I as t };