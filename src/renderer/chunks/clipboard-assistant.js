import { Dt as uiSwitchDt, Ot as uiSwitchOt, r as uiSwitchR, t as uiSwitchT, wt as uiSwitchWt } from "../ui/Switch.js";
import { $n as vueN, An as vueAn, O as vueO, S as vueS, St as vueSt, Wt as vueWt, Yt as vueYt, Zt as vueZt, b as vueB, bn as vueBn, c as vueC, gt as vueGt, j as vueJ, k as vueK, ot as vueOt, rr as vueRr, rt as vueRt, ut as vueUt, v as vueV, x as vueX, y as vueY } from "./vue-i18n.runtime.js";
import { C as playerC, E as playerE } from "../i18n/en-US-player.js";
import { n as lucideN, r as lucideR, t as lucideT } from "../ui/icons/lucide-icons.js";
import { t as i18nT } from "../i18n/i18n-helper.js";
import { t as checkT } from "./check.js";
import { t as clipListT } from "./clipboard-list.js";
import { _ as beautifier, y as beautifierY } from "./screenshot-beautifier.js";
import { t as ToolboxWorkspaceHeaderT } from "../pages/ToolboxWorkspaceHeader.js";
import { a as dialogA, i as dialogI, n as dialogN, r as dialogR, t as dialogT } from "./dialog.js";
import { a as alertDialogA, c as alertDialogC, i as alertDialogI, n as alertDialogN, r as alertDialogR, t as alertDialogT } from "../ui/alert-dialog.js";
import { n as alertN, t as alertT } from "./alert.js";
import { En as mainEn, Sn as mainSn, un as mainUn, ut as mainUt } from "./main.js";
import { n as clipboardassistantpageN, t as clipboardassistantpageT } from "./clipboard-assistant-page.js";
import { t as shortcutlabelT } from "./shortcut-label.js";
import { t as ToolboxSelectT } from "../pages/ToolboxSelect.js";
var ze = lucideR(`grip-vertical`, [[`circle`, {
  cx: `9`,
  cy: `12`,
  r: `1`,
  key: `1vctgf`
}], [`circle`, {
  cx: `9`,
  cy: `5`,
  r: `1`,
  key: `hp0tcf`
}], [`circle`, {
  cx: `9`,
  cy: `19`,
  r: `1`,
  key: `fkjjf6`
}], [`circle`, {
  cx: `15`,
  cy: `12`,
  r: `1`,
  key: `1tmaij`
}], [`circle`, {
  cx: `15`,
  cy: `5`,
  r: `1`,
  key: `19l28e`
}], [`circle`, {
  cx: `15`,
  cy: `19`,
  r: `1`,
  key: `f4zoj3`
}]]);
function y(result) {
  if (!result.ok) throw Error(result.error.message);
  return result.data;
}
var b = {
    async getState() {
      return y(await window.electronAPI.clipboardAssistant.getState());
    },
    async updateSettings(settings) {
      return y(await window.electronAPI.clipboardAssistant.updateSettings(settings));
    },
    async setShortcutEditing(shortcut) {
      y(await window.electronAPI.clipboardAssistant.setShortcutEditing(shortcut));
    },
    async listHistory(historyValue) {
      return y(await window.electronAPI.clipboardAssistant.listHistory(historyValue));
    },
    async copyHistory(historyValue) {
      y(await window.electronAPI.clipboardAssistant.copyHistory({
        id: historyValue
      }));
    },
    async pinHistory(pinValue, historyValue) {
      y(await window.electronAPI.clipboardAssistant.pinHistory({
        id: pinValue,
        pinned: historyValue
      }));
    },
    async deleteHistory(historyValue) {
      y(await window.electronAPI.clipboardAssistant.deleteHistory({
        id: historyValue
      }));
    },
    async clearHistory() {
      return y(await window.electronAPI.clipboardAssistant.clearHistory()).removed;
    },
    async listPhrases() {
      return y(await window.electronAPI.clipboardAssistant.listPhrases());
    },
    async savePhrase(phrase) {
      return y(await window.electronAPI.clipboardAssistant.savePhrase(phrase));
    },
    async deletePhrase(phrase) {
      y(await window.electronAPI.clipboardAssistant.deletePhrase({
        id: phrase
      }));
    },
    async reorderPhrases(reorder) {
      return y(await window.electronAPI.clipboardAssistant.reorderPhrases({
        ids: reorder
      }));
    },
    async copyPhrase(phrase) {
      y(await window.electronAPI.clipboardAssistant.copyPhrase({
        id: phrase
      }));
    },
    onChanged(changed) {
      let t = window.electronAPI.clipboardAssistant?.onChanged;
      return typeof t == `function` ? t(changed) : () => {};
    }
  },
  Be = {
    class: `flex shrink-0 flex-col gap-1.5`
  },
  Ve = {
    class: `inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground`
  },
  He = {
    class: `text-[22px] font-bold leading-tight tracking-tight`
  },
  Ue = {
    class: `max-w-[720px] text-[13px] leading-relaxed text-muted-foreground`
  },
  We = [`aria-busy`],
  Ge = {
    class: `flex min-h-[62px] items-center justify-between gap-5 px-4 py-3`
  },
  Ke = {
    class: `flex min-w-0 flex-col gap-[3px]`
  },
  qe = {
    class: `text-[13px] font-semibold`
  },
  Je = {
    class: `text-xs leading-normal text-muted-foreground`
  },
  Ye = {
    class: `flex min-h-[62px] items-center justify-between gap-5 px-4 py-3`
  },
  Xe = {
    class: `flex min-w-0 flex-col gap-[3px]`
  },
  Ze = {
    key: 0,
    class: `text-xs leading-normal text-destructive`
  },
  Qe = {
    key: 1,
    class: `text-xs leading-normal text-destructive`
  },
  $e = {
    key: 2,
    class: `text-xs leading-normal text-muted-foreground`
  },
  et = {
    class: `flex shrink-0 items-center gap-2`
  },
  tt = [`disabled`, `title`],
  nt = {
    class: `flex min-h-[62px] items-center justify-between gap-5 px-4 py-3`
  },
  rt = {
    class: `flex min-w-0 flex-col gap-[3px]`
  },
  it = {
    class: `inline-flex items-center gap-2 text-[13px] font-semibold`
  },
  at = {
    key: 0,
    class: `rounded-full bg-amber-500/15 px-1.5 py-px text-[11px] font-semibold text-amber-700 dark:text-amber-300`
  },
  ot = {
    class: `text-xs leading-normal text-muted-foreground`
  },
  st = {
    class: `flex min-h-[62px] items-center justify-between gap-5 px-4 py-3`
  },
  ct = {
    class: `flex min-w-0 flex-col gap-[3px]`
  },
  lt = {
    class: `text-[13px] font-semibold`
  },
  ut = {
    class: `text-xs leading-normal text-muted-foreground`
  },
  dt = {
    class: `w-[132px] shrink-0`
  },
  ft = {
    class: `flex shrink-0 flex-col rounded-xl border border-border bg-card`
  },
  pt = {
    class: `flex flex-wrap items-center justify-between gap-3 border-b border-border px-3 py-2.5`
  },
  mt = {
    class: `flex items-center gap-0.5 rounded-lg bg-muted p-0.5`,
    role: `tablist`
  },
  ht = [`aria-selected`, `onClick`],
  gt = {
    key: 0,
    class: `flex flex-1 items-center justify-end gap-2`
  },
  _t = {
    class: `flex h-8 w-full max-w-[260px] items-center gap-1.5 rounded-lg border border-input bg-background px-2 text-muted-foreground focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50`
  },
  vt = [`placeholder`],
  yt = [`aria-label`, `title`],
  bt = {
    key: 1,
    class: `flex flex-1 items-center justify-end`
  },
  xt = {
    key: 0,
    class: `flex min-h-[180px] items-center justify-center gap-2 text-xs text-muted-foreground`
  },
  St = {
    key: 1,
    class: `flex min-h-[180px] flex-col items-center justify-center gap-2 px-6 text-center text-muted-foreground`
  },
  Ct = {
    class: `text-[13px] font-semibold text-foreground`
  },
  wt = {
    key: 0,
    class: `text-xs`
  },
  Tt = {
    key: 2,
    class: `flex flex-col p-1.5`
  },
  Et = [`title`, `onClick`],
  Dt = {
    class: `line-clamp-3 whitespace-pre-wrap break-words text-[13px] leading-relaxed`
  },
  Ot = {
    class: `flex items-center gap-1 text-[11px] text-muted-foreground`
  },
  kt = {
    key: 1
  },
  At = {
    key: 2,
    class: `not-italic`
  },
  jt = [`datetime`],
  Mt = {
    class: `flex shrink-0 items-center gap-0.5 py-1.5 pr-1.5 opacity-0 transition-opacity group-hover:opacity-100 focus-within:opacity-100`
  },
  Nt = {
    key: 0,
    class: `flex items-center justify-center gap-1.5 py-3 text-xs text-muted-foreground`
  },
  Pt = {
    key: 0,
    class: `flex min-h-[180px] items-center justify-center gap-2 text-xs text-muted-foreground`
  },
  Ft = {
    key: 1,
    class: `flex min-h-[180px] flex-col items-center justify-center gap-2 px-6 text-center text-muted-foreground`
  },
  It = {
    class: `text-[13px] font-semibold text-foreground`
  },
  Lt = {
    class: `text-xs`
  },
  Rt = {
    key: 2,
    class: `flex flex-col p-1.5`
  },
  zt = [`onDragover`],
  Bt = [`title`, `aria-label`, `onDragstart`],
  Vt = [`title`, `onClick`],
  Ht = {
    key: 0,
    class: `truncate text-[13px] font-semibold`
  },
  Ut = {
    class: `flex items-center gap-1 text-[11px] text-muted-foreground`
  },
  Wt = {
    class: `flex shrink-0 items-center gap-0.5 py-1.5 pr-1.5 opacity-0 transition-opacity group-hover:opacity-100 focus-within:opacity-100`
  },
  Gt = {
    class: `flex flex-col gap-1.5`
  },
  Kt = {
    class: `text-xs font-semibold text-muted-foreground`
  },
  qt = {
    class: `flex flex-col gap-1.5`
  },
  Jt = {
    class: `text-xs font-semibold text-muted-foreground`
  },
  Yt = [`maxlength`, `placeholder`],
  options = {
    key: 0,
    class: `text-xs text-destructive`,
    role: `alert`
  },
  Zt = {
    class: `text-[11px] text-muted-foreground`
  },
  Qt = {
    class: `flex gap-2`
  },
  $t = 50,
  en = 160,
  x = vueJ({
    __name: `ClipboardAssistantWorkspace`,
    props: {
      active: {
        type: Boolean
      }
    },
    setup(props) {
      let propsAlias = props,
        {
          t: translate,
          locale: y
        } = i18nT(),
        handler = (e, t = {}) => translate(`toolboxNative.clipboardAssistant${e}`, t),
        fallbackValue = window.electronAPI?.platform || `win32`,
        tn = fallbackValue === `darwin`,
        C = vueBn(null),
        w = vueBn(`history`),
        T = vueBn(false),
        E = vueBn([]),
        nn = vueBn(true),
        rn = vueBn(false),
        an = vueBn(false),
        on = vueBn(null),
        D = vueBn(``),
        O = vueBn([]),
        sn = vueBn(true),
        k = vueBn(``),
        cn = vueBn(null),
        A = vueBn(false),
        j = vueBn(``),
        M = vueBn(``),
        ln = vueBn(null),
        N = vueBn(null),
        P = null,
        un = null,
        F = vueBn(false),
        I = vueBn(null),
        L = vueBn(``),
        R = vueBn(``),
        z = vueBn(false),
        B = vueBn(``),
        dn = vueBn(null),
        V = vueBn(null),
        H = false,
        fn = 0,
        U = null,
        W = null,
        pn = null,
        G = vueV(() => C.value?.enabled === true),
        mn = vueV(() => shortcutlabelT(C.value?.effectiveShortcut || ``, fallbackValue)),
        hn = vueV(() => !C.value?.shortcut),
        gn = vueV({
          get: () => String(C.value?.retentionDays ?? 0),
          set: e => {
            X({
              retentionDays: Number(e)
            });
          }
        }),
        _n = vueV(() => clipboardassistantpageT.map(item => ({
          value: String(item),
          label: item === 0 ? handler(`RetentionForever`) : item === 365 ? handler(`RetentionYear`) : handler(`RetentionDays`, {
            n: item
          })
        }))),
        vn = vueV(() => {
          switch (N.value) {
            case `enable-recording`:
              return {
                title: handler(`ConfirmEnableTitle`),
                lines: [handler(`ConfirmEnableDesc`)],
                action: handler(`ConfirmEnableAction`),
                danger: false
              };
            case `enable-timeline`:
              return {
                title: handler(`ConfirmTimelineTitle`),
                lines: [handler(`ConfirmTimelineDesc1`), handler(`ConfirmTimelineDesc2`), handler(`ConfirmTimelineDesc3`)],
                action: handler(`ConfirmTimelineAction`),
                danger: true
              };
            case `clear-history`:
              return {
                title: handler(`ConfirmClearTitle`),
                lines: [handler(`ConfirmClearDesc`)],
                action: handler(`ConfirmClearAction`),
                danger: true
              };
            case `delete-phrase`:
              return {
                title: handler(`ConfirmDeletePhraseTitle`),
                lines: [handler(`ConfirmDeletePhraseDesc`)],
                action: handler(`ConfirmDeleteAction`),
                danger: true
              };
            default:
              return {
                title: ``,
                lines: [],
                action: ``,
                danger: false
              };
          }
        }),
        yn = vueV(() => D.value.trim() ? handler(`HistoryNoMatch`) : handler(`HistoryEmpty`)),
        bn = vueV(() => [{
          value: `history`,
          label: handler(`TabHistory`),
          count: C.value?.historyCount ?? 0
        }, {
          value: `phrases`,
          label: handler(`TabPhrases`),
          count: C.value?.phraseCount ?? 0
        }]);
      function K(e) {
        return e instanceof Error && e.message ? e.message : handler(`OperationFailed`);
      }
      function q(e, t = false) {
        t ? alertT(e) : alertN(e);
      }
      function J(e) {
        return P?.(false), N.value = e, new Promise(e => {
          P = e;
        });
      }
      function xn(e) {
        let t = P;
        P = null, N.value = null, t?.(e);
      }
      async function Y() {
        try {
          C.value = await b.getState();
        } catch (e) {
          q(K(e), true);
        }
      }
      async function X(e) {
        if (T.value) return false;
        T.value = true;
        try {
          return C.value = await b.updateSettings(e), true;
        } catch (e) {
          return q(K(e), true), await Y(), false;
        } finally {
          T.value = false;
        }
      }
      async function Sn() {
        if (!C.value || T.value) return;
        let e = !C.value.enabled;
        (!e || (await J(`enable-recording`))) && (await X({
          enabled: e
        }));
      }
      async function Cn() {
        if (!C.value || T.value) return;
        let e = !C.value.syncToTimeline;
        (!e || (await J(`enable-timeline`))) && (await X({
          syncToTimeline: e
        }));
      }
      async function Z(e = {}) {
        if (e.append && (rn.value || !an.value || !on.value)) return;
        let t = ++fn;
        e.append ? rn.value = true : e.silent || (nn.value = true);
        try {
          let n = e.append ? $t : Math.min(100, Math.max($t, e.silent ? E.value.length : $t)),
            history = await b.listHistory({
              keyword: D.value.trim() || undefined,
              cursor: e.append ? on.value : null,
              pageSize: n
            });
          if (t !== fn) return;
          if (e.append) {
            let e = new Set(E.value.map(item => item.id));
            E.value = [...E.value, ...history.items.filter(item => !e.has(item.id))];
          } else E.value = history.items;
          an.value = history.hasMore, on.value = history.nextCursor;
        } catch (e) {
          t === fn && q(K(e), true);
        } finally {
          e.append && (rn.value = false), t === fn && (nn.value = false);
        }
      }
      async function Q() {
        try {
          O.value = await b.listPhrases();
        } catch (e) {
          q(K(e), true);
        } finally {
          sn.value = false;
        }
      }
      function wn(e) {
        k.value = e, W !== null && window.clearTimeout(W), W = window.setTimeout(() => {
          k.value = ``, W = null;
        }, 1200), q(handler(`Copied`));
      }
      async function Tn(e) {
        try {
          await b.copyHistory(e.id), wn(`history:${e.id}`);
        } catch (e) {
          q(K(e), true);
        }
      }
      async function En(e) {
        try {
          await b.pinHistory(e.id, !e.isPinned), await Promise.all([Z({
            silent: true
          }), Y()]);
        } catch (e) {
          q(K(e), true);
        }
      }
      async function Dn(e) {
        try {
          await b.deleteHistory(e.id), E.value = E.value.filter(item => item.id !== e.id), Y();
        } catch (e) {
          q(K(e), true);
        }
      }
      async function On() {
        if (await J(`clear-history`)) try {
          await b.clearHistory(), await Promise.all([Z({
            silent: true
          }), Y()]);
        } catch (e) {
          q(K(e), true);
        }
      }
      async function kn(e) {
        try {
          await b.copyPhrase(e.id), e.useCount += 1, wn(`phrase:${e.id}`);
        } catch (e) {
          q(K(e), true);
        }
      }
      function An(e) {
        I.value = e?.id ?? null, L.value = e?.title ?? ``, R.value = e?.content ?? ``, B.value = ``, F.value = true, vueRt(() => dn.value?.focus());
      }
      function jn() {
        z.value || (F.value = false);
      }
      async function Mn() {
        if (!z.value) {
          if (!R.value.trim()) {
            B.value = handler(`PhraseContentRequired`);
            return;
          }
          z.value = true, B.value = ``;
          try {
            await b.savePhrase({
              ...(I.value ? {
                id: I.value
              } : {}),
              title: L.value,
              content: R.value
            }), F.value = false, await Promise.all([Q(), Y()]);
          } catch (e) {
            B.value = K(e);
          } finally {
            z.value = false;
          }
        }
      }
      function Nn(event) {
        event.key === `Enter` && (event.ctrlKey || event.metaKey) && !event.isComposing && (event.preventDefault(), Mn());
      }
      async function Pn(e) {
        un = e;
        let t = await J(`delete-phrase`),
          n = un;
        if (un = null, t && n) try {
          await b.deletePhrase(n.id), O.value = O.value.filter(item => item.id !== n.id), Y();
        } catch (e) {
          q(K(e), true);
        }
      }
      function Fn(e, t) {
        V.value = e.id, H = false, t.dataTransfer?.setData(`text/plain`, e.id), t.dataTransfer && (t.dataTransfer.effectAllowed = `move`);
      }
      function In(e, event) {
        let n = V.value;
        if (!n || (event.preventDefault(), n === e.id)) return;
        let r = [...O.value],
          indexResult = r.findIndex(item => item.id === n),
          a = r.findIndex(item => item.id === e.id);
        if (indexResult < 0 || a < 0) return;
        let [o] = r.splice(indexResult, 1);
        r.splice(a, 0, o), O.value = r, H = true;
      }
      async function Ln() {
        let e = H;
        if (V.value = null, H = false, e) try {
          O.value = await b.reorderPhrases(O.value.map(item => item.id));
        } catch (e) {
          q(K(e), true), await Q();
        }
      }
      async function Rn() {
        if (!(!G.value || T.value || A.value)) {
          try {
            await b.setShortcutEditing(true);
          } catch (e) {
            q(K(e), true);
            return;
          }
          j.value = ``, M.value = ``, A.value = true, vueRt(() => ln.value?.focus());
        }
      }
      async function $() {
        if (A.value) {
          A.value = false, j.value = ``;
          try {
            await b.setShortcutEditing(false);
          } catch (e) {
            q(K(e), true);
          }
        }
      }
      async function zn(event) {
        if (!A.value || (event.preventDefault(), event.stopPropagation(), event.repeat)) return;
        if (event.key === `Escape`) {
          await $();
          return;
        }
        let includesResult = [`Control`, `Alt`, `AltGraph`, `Shift`, `Meta`, `OS`].includes(event.key),
          n = event.code.match(/^Key([A-Z])$/)?.[1] || (/^[a-z]$/i.test(event.key) ? event.key.toUpperCase() : ``),
          joined = [event.ctrlKey && `Ctrl`, event.altKey && `Alt`, event.metaKey && (tn ? `Command` : `Super`), event.shiftKey && `Shift`].filter(Boolean).join(`+`),
          i = includesResult ? `` : n || (event.key === ` ` ? `Space` : event.key);
        if (j.value = shortcutlabelT([joined, i].filter(Boolean).join(`+`), fallbackValue), includesResult) {
          M.value = ``;
          return;
        }
        let a = mainUt([joined, i].filter(Boolean).join(`+`));
        if (!a) {
          M.value = handler(`ShortcutInvalid`);
          return;
        }
        A.value = false, j.value = ``, M.value = ``;
        try {
          await b.setShortcutEditing(false);
        } catch {}
        (await X({
          shortcut: a === C.value?.defaultShortcut ? `` : a
        })) && q(handler(`ShortcutSaved`));
      }
      async function Bn() {
        hn.value || (await X({
          shortcut: ``
        })) && q(handler(`ShortcutSaved`));
      }
      function Vn(e) {
        let date = new Date(e);
        if (Number.isNaN(date.getTime())) return ``;
        let n = new Date(),
          r = new Intl.DateTimeFormat(y.value, {
            hour: `2-digit`,
            minute: `2-digit`,
            hour12: false
          }).format(date),
          time = new Date(n.getFullYear(), n.getMonth(), n.getDate()).getTime();
        if (date.getTime() >= time) return r;
        if (date.getTime() >= time - 864e5) return `${handler(`Yesterday`)} ${r}`;
        let a = date.getFullYear() === n.getFullYear();
        return new Intl.DateTimeFormat(y.value, {
          ...(a ? {} : {
            year: `numeric`
          }),
          month: `2-digit`,
          day: `2-digit`,
          hour: `2-digit`,
          minute: `2-digit`,
          hour12: false
        }).format(date);
      }
      function Hn(event) {
        if (w.value !== `history`) return;
        let t = event.currentTarget;
        t.scrollHeight - t.scrollTop - t.clientHeight <= en && Z({
          append: true
        });
      }
      return vueWt(D, () => {
        U !== null && window.clearTimeout(U), U = window.setTimeout(() => {
          U = null, cn.value?.scrollTo({
            top: 0
          }), Z({
            silent: true
          });
        }, 220);
      }), vueWt(() => propsAlias.active, e => {
        if (!e) {
          $();
          return;
        }
        Y(), Z({
          silent: true
        }), Q();
      }), vueUt(() => {
        pn = b.onChanged(e => {
          propsAlias.active && (e.reasons.includes(`history`) && Z({
            silent: true
          }), e.reasons.includes(`phrases`) && !F.value && !V.value && Q(), Y());
        }), Y(), Z(), Q();
      }), vueOt(() => {
        $(), P?.(false), P = null, pn?.();
        for (let e of [U, W]) e !== null && window.clearTimeout(e);
      }), (te, renderCache) => (vueGt(), vueS(`div`, {
        ref_key: `scrollRef`,
        ref: cn,
        class: `no-scrollbar flex h-0 min-h-0 w-full flex-1 flex-col gap-3.5 overflow-y-auto overflow-x-hidden px-7 pb-9 pt-1 text-foreground`,
        onScroll: Hn
      }, [vueY(`section`, Be, [vueY(`span`, Ve, [vueK(vueAn(clipListT), {
        size: 14
      }), vueO(` ` + vueRr(handler(`Kicker`)), 1)]), vueY(`h1`, He, vueRr(handler(`ToolName`)), 1), vueY(`p`, Ue, vueRr(handler(`HeroDesc`, {
        shortcut: mn.value
      })), 1)]), vueY(`section`, {
        class: `flex shrink-0 flex-col divide-y divide-border rounded-xl border border-border bg-card`,
        "aria-busy": T.value
      }, [vueY(`div`, Ge, [vueY(`div`, Ke, [vueY(`strong`, qe, vueRr(handler(`RecordTitle`)), 1), vueY(`small`, Je, vueRr(handler(`RecordDesc`)), 1)]), vueK(vueAn(uiSwitchT), {
        "model-value": G.value,
        "aria-label": handler(`RecordTitle`),
        disabled: !C.value || T.value,
        "onUpdate:modelValue": Sn
      }, null, 8, [`model-value`, `aria-label`, `disabled`])]), vueY(`div`, Ye, [vueY(`div`, Xe, [vueY(`strong`, {
        class: vueN([`text-[13px] font-semibold`, G.value ? `` : `text-muted-foreground`])
      }, vueRr(handler(`ShortcutTitle`)), 3), M.value ? (vueGt(), vueS(`small`, Ze, vueRr(M.value), 1)) : G.value && C.value?.shortcutError ? (vueGt(), vueS(`small`, Qe, vueRr(handler(`ShortcutInactive`, {
        reason: C.value.shortcutError
      })), 1)) : (vueGt(), vueS(`small`, $e, vueRr(G.value ? handler(`ShortcutDesc`) : handler(`ShortcutDisabledHint`)), 1))]), vueY(`div`, et, [vueY(`button`, {
        ref_key: `shortcutButtonRef`,
        ref: ln,
        type: `button`,
        class: vueN([`h-[30px] min-w-[132px] rounded-lg border px-3 text-xs font-semibold tracking-wide transition-colors outline-none disabled:cursor-not-allowed disabled:opacity-55`, A.value ? `border-primary bg-card text-muted-foreground` : `border-border bg-muted text-foreground hover:border-foreground/25`]),
        disabled: !G.value || T.value,
        title: handler(`ShortcutChange`),
        onClick: Rn,
        onKeydown: zn,
        onBlur: $
      }, vueRr(A.value ? j.value || handler(`ShortcutPress`) : mn.value), 43, tt), hn.value ? vueX(``, true) : (vueGt(), vueB(vueAn(uiSwitchR), {
        key: 0,
        variant: `ghost`,
        size: `sm`,
        class: `text-xs text-muted-foreground`,
        disabled: !G.value || T.value,
        onClick: Bn
      }, {
        default: vueYt(() => [vueO(vueRr(handler(`ShortcutReset`)), 1)]),
        _: 1
      }, 8, [`disabled`]))])]), vueY(`div`, nt, [vueY(`div`, rt, [vueY(`strong`, it, [vueO(vueRr(handler(`TimelineTitle`)) + ` `, 1), C.value?.syncToTimeline ? (vueGt(), vueS(`span`, at, vueRr(handler(`TimelineCloudBadge`)), 1)) : vueX(``, true)]), vueY(`small`, ot, vueRr(handler(`TimelineDesc`)), 1)]), vueK(vueAn(uiSwitchT), {
        "model-value": C.value?.syncToTimeline === true,
        "aria-label": handler(`TimelineTitle`),
        disabled: !C.value || T.value,
        "onUpdate:modelValue": Cn
      }, null, 8, [`model-value`, `aria-label`, `disabled`])]), vueY(`div`, st, [vueY(`div`, ct, [vueY(`strong`, lt, vueRr(handler(`RetentionTitle`)), 1), vueY(`small`, ut, vueRr(handler(`RetentionDesc`)), 1)]), vueY(`div`, dt, [vueK(ToolboxSelectT, {
        modelValue: gn.value,
        "onUpdate:modelValue": renderCache[0] ||= e => gn.value = e,
        options: _n.value,
        disabled: !C.value || T.value,
        label: handler(`RetentionTitle`),
        compact: ``
      }, null, 8, [`modelValue`, `options`, `disabled`, `label`])])])], 8, We), vueY(`section`, ft, [vueY(`header`, pt, [vueY(`div`, mt, [(vueGt(true), vueS(vueC, null, vueSt(bn.value, state => (vueGt(), vueS(`button`, {
        key: state.value,
        type: `button`,
        role: `tab`,
        "aria-selected": w.value === state.value,
        class: vueN([`inline-flex h-7 items-center gap-1.5 rounded-md px-2.5 text-xs transition-colors`, w.value === state.value ? `bg-card font-semibold text-foreground shadow-[0_1px_3px_rgb(0_0_0/0.08)]` : `text-muted-foreground hover:text-foreground`]),
        onClick: t => w.value = state.value
      }, [vueO(vueRr(state.label), 1), vueY(`span`, {
        class: vueN([`rounded-full px-1.5 text-[10px] leading-4`, w.value === state.value ? `bg-primary/10 text-primary` : `bg-foreground/[0.06]`])
      }, vueRr(state.count), 3)], 10, ht))), 128))]), w.value === `history` ? (vueGt(), vueS(`div`, gt, [vueY(`label`, _t, [vueK(vueAn(mainSn), {
        size: 14,
        class: `shrink-0`
      }), vueZt(vueY(`input`, {
        "onUpdate:modelValue": renderCache[1] ||= e => D.value = e,
        type: `search`,
        class: `min-w-0 flex-1 bg-transparent text-xs text-foreground outline-none placeholder:text-muted-foreground [&::-webkit-search-cancel-button]:appearance-none`,
        placeholder: handler(`SearchPlaceholder`)
      }, null, 8, vt), [[playerC, D.value]]), D.value ? (vueGt(), vueS(`button`, {
        key: 0,
        type: `button`,
        class: `inline-flex shrink-0 hover:text-foreground`,
        "aria-label": handler(`ClearSearch`),
        title: handler(`ClearSearch`),
        onMousedown: renderCache[2] ||= playerE(() => {}, [`prevent`]),
        onClick: renderCache[3] ||= e => D.value = ``
      }, [vueK(vueAn(lucideT), {
        size: 13
      })], 40, yt)) : vueX(``, true)]), vueK(vueAn(uiSwitchR), {
        variant: `outline`,
        size: `sm`,
        class: `shrink-0 text-xs`,
        disabled: !C.value || C.value.historyCount === C.value.pinnedCount,
        onClick: On
      }, {
        default: vueYt(() => [vueK(vueAn(uiSwitchWt), {
          size: 14
        }), vueO(vueRr(handler(`ClearHistory`)), 1)]),
        _: 1
      }, 8, [`disabled`])])) : (vueGt(), vueS(`div`, bt, [vueK(vueAn(uiSwitchR), {
        variant: `outline`,
        size: `sm`,
        class: `border-primary/30 text-xs text-primary hover:bg-primary/10 hover:text-primary`,
        onClick: renderCache[4] ||= e => An()
      }, {
        default: vueYt(() => [vueK(vueAn(uiSwitchDt), {
          size: 14
        }), vueO(vueRr(handler(`NewPhrase`)), 1)]),
        _: 1
      })]))]), w.value === `history` ? (vueGt(), vueS(vueC, {
        key: 0
      }, [nn.value ? (vueGt(), vueS(`div`, xt, [vueK(vueAn(beautifier), {
        class: `animate-spin`,
        size: 20
      }), vueO(vueRr(handler(`Loading`)), 1)])) : E.value.length === 0 ? (vueGt(), vueS(`div`, St, [vueK(vueAn(clipListT), {
        size: 26
      }), vueY(`strong`, Ct, vueRr(yn.value), 1), D.value.trim() ? vueX(``, true) : (vueGt(), vueS(`small`, wt, vueRr(G.value ? handler(`HistoryEmptyDesc`) : handler(`HistoryDisabledDesc`)), 1))])) : (vueGt(), vueS(`div`, Tt, [(vueGt(true), vueS(vueC, null, vueSt(E.value, e => (vueGt(), vueS(`article`, {
        key: e.id,
        class: vueN([`group flex items-start gap-1 rounded-lg transition-colors hover:bg-muted/60`, e.isPinned ? `bg-primary/[0.04]` : ``])
      }, [vueY(`button`, {
        type: `button`,
        class: `flex min-w-0 flex-1 flex-col gap-1 px-2.5 py-2 text-left`,
        title: handler(`Copy`),
        onClick: t => Tn(e)
      }, [vueY(`p`, Dt, vueRr(e.preview), 1), vueY(`span`, Ot, [e.isPinned ? (vueGt(), vueB(vueAn(lucideN), {
        key: 0,
        size: 11,
        class: `text-primary`
      })) : vueX(``, true), vueY(`span`, null, vueRr(handler(`Characters`, {
        n: e.characterCount.toLocaleString()
      })), 1), renderCache[12] ||= vueY(`i`, {
        class: `not-italic`
      }, `·`, -1), e.copyCount > 1 ? (vueGt(), vueS(`span`, kt, vueRr(handler(`CopyCount`, {
        n: e.copyCount
      })), 1)) : vueX(``, true), e.copyCount > 1 ? (vueGt(), vueS(`i`, At, `·`)) : vueX(``, true), vueY(`time`, {
        datetime: e.copiedAt
      }, vueRr(Vn(e.copiedAt)), 9, jt)])], 8, Et), vueY(`div`, Mt, [vueK(vueAn(uiSwitchR), {
        variant: `ghost`,
        size: `icon-sm`,
        class: vueN(k.value === `history:${e.id}` ? `text-primary` : `text-muted-foreground`),
        title: handler(`Copy`),
        "aria-label": handler(`Copy`),
        onClick: t => Tn(e)
      }, {
        default: vueYt(() => [k.value === `history:${e.id}` ? (vueGt(), vueB(vueAn(checkT), {
          key: 0,
          size: 15
        })) : (vueGt(), vueB(vueAn(beautifierY), {
          key: 1,
          size: 15
        }))]),
        _: 2
      }, 1032, [`class`, `title`, `aria-label`, `onClick`]), vueK(vueAn(uiSwitchR), {
        variant: `ghost`,
        size: `icon-sm`,
        class: vueN(e.isPinned ? `text-primary` : `text-muted-foreground`),
        title: e.isPinned ? handler(`Unpin`) : handler(`Pin`),
        "aria-label": e.isPinned ? handler(`Unpin`) : handler(`Pin`),
        onClick: t => En(e)
      }, {
        default: vueYt(() => [e.isPinned ? (vueGt(), vueB(vueAn(mainEn), {
          key: 0,
          size: 15
        })) : (vueGt(), vueB(vueAn(lucideN), {
          key: 1,
          size: 15
        }))]),
        _: 2
      }, 1032, [`class`, `title`, `aria-label`, `onClick`]), vueK(vueAn(uiSwitchR), {
        variant: `ghost`,
        size: `icon-sm`,
        class: `text-muted-foreground hover:text-destructive`,
        title: handler(`Delete`),
        "aria-label": handler(`Delete`),
        onClick: t => Dn(e)
      }, {
        default: vueYt(() => [vueK(vueAn(uiSwitchWt), {
          size: 15
        })]),
        _: 1
      }, 8, [`title`, `aria-label`, `onClick`])])], 2))), 128)), rn.value ? (vueGt(), vueS(`div`, Nt, [vueK(vueAn(beautifier), {
        class: `animate-spin`,
        size: 15
      }), vueO(vueRr(handler(`LoadingMore`)), 1)])) : vueX(``, true)]))], 64)) : (vueGt(), vueS(vueC, {
        key: 1
      }, [sn.value ? (vueGt(), vueS(`div`, Pt, [vueK(vueAn(beautifier), {
        class: `animate-spin`,
        size: 20
      }), vueO(vueRr(handler(`Loading`)), 1)])) : O.value.length === 0 ? (vueGt(), vueS(`div`, Ft, [vueK(vueAn(clipListT), {
        size: 26
      }), vueY(`strong`, It, vueRr(handler(`PhrasesEmpty`)), 1), vueY(`small`, Lt, vueRr(handler(`PhrasesEmptyDesc`)), 1)])) : (vueGt(), vueS(`div`, Rt, [(vueGt(true), vueS(vueC, null, vueSt(O.value, e => (vueGt(), vueS(`article`, {
        key: e.id,
        class: vueN([`group flex items-start gap-1 rounded-lg transition-colors hover:bg-muted/60`, V.value === e.id ? `opacity-50` : ``]),
        onDragover: t => In(e, t),
        onDrop: renderCache[5] ||= playerE(() => {}, [`prevent`])
      }, [vueY(`span`, {
        class: `mt-2.5 grid size-6 shrink-0 cursor-grab place-items-center rounded text-muted-foreground opacity-40 transition-opacity active:cursor-grabbing group-hover:opacity-100`,
        draggable: `true`,
        title: handler(`DragToSort`),
        "aria-label": handler(`DragToSort`),
        onDragstart: t => Fn(e, t),
        onDragend: Ln
      }, [vueK(vueAn(ze), {
        size: 14
      })], 40, Bt), vueY(`button`, {
        type: `button`,
        class: `flex min-w-0 flex-1 flex-col gap-1 px-1 py-2 text-left`,
        title: handler(`Copy`),
        onClick: t => kn(e)
      }, [e.title ? (vueGt(), vueS(`strong`, Ht, vueRr(e.title), 1)) : vueX(``, true), vueY(`p`, {
        class: vueN([`line-clamp-3 whitespace-pre-wrap break-words text-[13px] leading-relaxed`, e.title ? `text-muted-foreground` : ``])
      }, vueRr(e.content), 3), vueY(`span`, Ut, [vueY(`span`, null, vueRr(handler(`Characters`, {
        n: e.content.length.toLocaleString()
      })), 1), e.useCount > 0 ? (vueGt(), vueS(vueC, {
        key: 0
      }, [renderCache[13] ||= vueY(`i`, {
        class: `not-italic`
      }, `·`, -1), vueY(`span`, null, vueRr(handler(`UseCount`, {
        n: e.useCount
      })), 1)], 64)) : vueX(``, true)])], 8, Vt), vueY(`div`, Wt, [vueK(vueAn(uiSwitchR), {
        variant: `ghost`,
        size: `icon-sm`,
        class: vueN(k.value === `phrase:${e.id}` ? `text-primary` : `text-muted-foreground`),
        title: handler(`Copy`),
        "aria-label": handler(`Copy`),
        onClick: t => kn(e)
      }, {
        default: vueYt(() => [k.value === `phrase:${e.id}` ? (vueGt(), vueB(vueAn(checkT), {
          key: 0,
          size: 15
        })) : (vueGt(), vueB(vueAn(beautifierY), {
          key: 1,
          size: 15
        }))]),
        _: 2
      }, 1032, [`class`, `title`, `aria-label`, `onClick`]), vueK(vueAn(uiSwitchR), {
        variant: `ghost`,
        size: `icon-sm`,
        class: `text-muted-foreground`,
        title: handler(`Edit`),
        "aria-label": handler(`Edit`),
        onClick: t => An(e)
      }, {
        default: vueYt(() => [vueK(vueAn(uiSwitchOt), {
          size: 15
        })]),
        _: 1
      }, 8, [`title`, `aria-label`, `onClick`]), vueK(vueAn(uiSwitchR), {
        variant: `ghost`,
        size: `icon-sm`,
        class: `text-muted-foreground hover:text-destructive`,
        title: handler(`Delete`),
        "aria-label": handler(`Delete`),
        onClick: t => Pn(e)
      }, {
        default: vueYt(() => [vueK(vueAn(uiSwitchWt), {
          size: 15
        })]),
        _: 1
      }, 8, [`title`, `aria-label`, `onClick`])])], 42, zt))), 128))]))], 64))]), vueK(vueAn(dialogA), {
        open: F.value,
        "onUpdate:open": renderCache[8] ||= e => {
          e || jn();
        }
      }, {
        default: vueYt(() => [vueK(vueAn(dialogI), {
          class: `sm:max-w-[480px]`
        }, {
          default: vueYt(() => [vueK(vueAn(dialogN), null, {
            default: vueYt(() => [vueK(vueAn(dialogT), null, {
              default: vueYt(() => [vueO(vueRr(I.value ? handler(`PhraseEditorEdit`) : handler(`PhraseEditorCreate`)), 1)]),
              _: 1
            })]),
            _: 1
          }), vueY(`label`, Gt, [vueY(`span`, Kt, vueRr(handler(`PhraseTitleLabel`)), 1), vueK(vueAn(mainUn), {
            modelValue: L.value,
            "onUpdate:modelValue": renderCache[6] ||= e => L.value = e,
            type: `text`,
            class: `h-9 text-sm`,
            maxlength: vueAn(60),
            placeholder: handler(`PhraseTitlePlaceholder`),
            onKeydown: Nn
          }, null, 8, [`modelValue`, `maxlength`, `placeholder`])]), vueY(`label`, qt, [vueY(`span`, Jt, vueRr(handler(`PhraseContentLabel`)), 1), vueZt(vueY(`textarea`, {
            ref_key: `editorContentRef`,
            ref: dn,
            "onUpdate:modelValue": renderCache[7] ||= e => R.value = e,
            rows: `7`,
            class: `min-h-36 w-full resize-y rounded-lg border border-input bg-transparent px-2.5 py-2 text-sm leading-relaxed outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-input/30`,
            maxlength: vueAn(clipboardassistantpageN),
            placeholder: handler(`PhraseContentPlaceholder`),
            onKeydown: Nn
          }, null, 40, Yt), [[playerC, R.value]])]), B.value ? (vueGt(), vueS(`p`, options, vueRr(B.value), 1)) : vueX(``, true), vueK(vueAn(dialogR), {
            class: `items-center sm:justify-between`
          }, {
            default: vueYt(() => [vueY(`small`, Zt, vueRr(handler(`PhraseSaveHint`, {
              key: tn ? `⌘ + Enter` : `Ctrl + Enter`
            })), 1), vueY(`div`, Qt, [vueK(vueAn(uiSwitchR), {
              variant: `outline`,
              disabled: z.value,
              onClick: jn
            }, {
              default: vueYt(() => [vueO(vueRr(handler(`Cancel`)), 1)]),
              _: 1
            }, 8, [`disabled`]), vueK(vueAn(uiSwitchR), {
              disabled: z.value || !R.value.trim(),
              onClick: Mn
            }, {
              default: vueYt(() => [z.value ? (vueGt(), vueB(vueAn(beautifier), {
                key: 0,
                class: `animate-spin`,
                size: 14
              })) : vueX(``, true), vueO(vueRr(handler(`Save`)), 1)]),
              _: 1
            }, 8, [`disabled`])])]),
            _: 1
          })]),
          _: 1
        })]),
        _: 1
      }, 8, [`open`]), vueK(vueAn(alertDialogC), {
        open: !!N.value,
        "onUpdate:open": renderCache[11] ||= e => {
          e || xn(false);
        }
      }, {
        default: vueYt(() => [vueK(vueAn(alertDialogA), null, {
          default: vueYt(() => [vueK(vueAn(alertDialogN), null, {
            default: vueYt(() => [vueK(vueAn(alertDialogT), null, {
              default: vueYt(() => [vueO(vueRr(vn.value.title), 1)]),
              _: 1
            }), vueK(vueAn(alertDialogI), {
              class: `flex flex-col gap-1.5`
            }, {
              default: vueYt(() => [(vueGt(true), vueS(vueC, null, vueSt(vn.value.lines, e => (vueGt(), vueS(`span`, {
                key: e
              }, vueRr(e), 1))), 128))]),
              _: 1
            })]),
            _: 1
          }), vueK(vueAn(alertDialogR), null, {
            default: vueYt(() => [vueK(vueAn(uiSwitchR), {
              variant: `outline`,
              onClick: renderCache[9] ||= e => xn(false)
            }, {
              default: vueYt(() => [vueO(vueRr(handler(`Cancel`)), 1)]),
              _: 1
            }), vueK(vueAn(uiSwitchR), {
              variant: vn.value.danger ? `destructive` : `default`,
              onClick: renderCache[10] ||= e => xn(true)
            }, {
              default: vueYt(() => [vueO(vueRr(vn.value.action), 1)]),
              _: 1
            }, 8, [`variant`])]),
            _: 1
          })]),
          _: 1
        })]),
        _: 1
      }, 8, [`open`])], 544));
    }
  }),
  S = {
    class: `flex h-full min-h-0 w-full flex-col overflow-hidden bg-background`
  },
  tn = vueJ({
    __name: `ClipboardAssistantTool`,
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
        emitAlias = emit;
      return (ctx, renderCache) => (vueGt(), vueS(`div`, S, [vueK(ToolboxWorkspaceHeaderT, {
        tool: propsAlias.tool,
        user: propsAlias.user,
        "credits-balance": propsAlias.creditsBalance,
        "voice-tool": false,
        "show-history": false,
        "local-tool": ``,
        "show-balance": false,
        onBack: renderCache[0] ||= e => emitAlias(`back`),
        onRecharge: renderCache[1] ||= e => emitAlias(`recharge`)
      }, null, 8, [`tool`, `user`, `credits-balance`]), vueK(x, {
        active: propsAlias.active
      }, null, 8, [`active`])]));
    }
  });
export { tn as default };