import { Dt as e, Ot as t, r as n, t as r, wt as i } from "./Switch.js";
import { $n as a, An as o, O as s, S as c, St as ee, Wt as te, Yt as l, Zt as ne, b as u, bn as d, c as f, gt as p, j as re, k as m, ot as ie, rr as h, rt as ae, ut as oe, v as g, x as _, y as v } from "./vue-i18n.runtime.js";
import { C as se, E as ce } from "./en-US-player.js";
import { n as le, r as ue, t as de } from "./lucide-icons.js";
import { t as fe } from "./i18n-helper.js";
import { t as pe } from "./check.js";
import { t as me } from "./clipboard-list.js";
import { _ as he, y as ge } from "./screenshot-beautifier.js";
import { t as _e } from "./ToolboxWorkspaceHeader.js";
import { a as ve, i as ye, n as be, r as xe, t as Se } from "./dialog.js";
import { a as Ce, c as we, i as Te, n as Ee, r as De, t as Oe } from "./alert-dialog.js";
import { n as ke, t as Ae } from "./alert.js";
import { En as je, Sn as Me, un as Ne, ut as Pe } from "./main.js";
import { n as Fe, t as Ie } from "./clipboard-assistant-page.js";
import { t as Le } from "./shortcut-label.js";
import { t as Re } from "./ToolboxSelect.js";
var ze = ue(`grip-vertical`, [[`circle`, {
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
  x = re({
    __name: `ClipboardAssistantWorkspace`,
    props: {
      active: {
        type: Boolean
      }
    },
    setup(re) {
      let ue = re,
        {
          t: _e,
          locale: y
        } = fe(),
        handler = (e, t = {}) => _e(`toolboxNative.clipboardAssistant${e}`, t),
        fallbackValue = window.electronAPI?.platform || `win32`,
        tn = fallbackValue === `darwin`,
        C = d(null),
        w = d(`history`),
        T = d(false),
        E = d([]),
        nn = d(true),
        rn = d(false),
        an = d(false),
        on = d(null),
        D = d(``),
        O = d([]),
        sn = d(true),
        k = d(``),
        cn = d(null),
        A = d(false),
        j = d(``),
        M = d(``),
        ln = d(null),
        N = d(null),
        P = null,
        un = null,
        F = d(false),
        I = d(null),
        L = d(``),
        R = d(``),
        z = d(false),
        B = d(``),
        dn = d(null),
        V = d(null),
        H = false,
        fn = 0,
        U = null,
        W = null,
        pn = null,
        G = g(() => C.value?.enabled === true),
        mn = g(() => Le(C.value?.effectiveShortcut || ``, fallbackValue)),
        hn = g(() => !C.value?.shortcut),
        gn = g({
          get: () => String(C.value?.retentionDays ?? 0),
          set: e => {
            X({
              retentionDays: Number(e)
            });
          }
        }),
        _n = g(() => Ie.map(item => ({
          value: String(item),
          label: item === 0 ? handler(`RetentionForever`) : item === 365 ? handler(`RetentionYear`) : handler(`RetentionDays`, {
            n: item
          })
        }))),
        vn = g(() => {
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
        yn = g(() => D.value.trim() ? handler(`HistoryNoMatch`) : handler(`HistoryEmpty`)),
        bn = g(() => [{
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
        t ? Ae(e) : ke(e);
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
        I.value = e?.id ?? null, L.value = e?.title ?? ``, R.value = e?.content ?? ``, B.value = ``, F.value = true, ae(() => dn.value?.focus());
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
        let value = V.value;
        if (!value || (event.preventDefault(), value === e.id)) return;
        let r = [...O.value],
          indexResult = r.findIndex(item => item.id === value),
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
          j.value = ``, M.value = ``, A.value = true, ae(() => ln.value?.focus());
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
        if (j.value = Le([joined, i].filter(Boolean).join(`+`), fallbackValue), includesResult) {
          M.value = ``;
          return;
        }
        let a = Pe([joined, i].filter(Boolean).join(`+`));
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
        let currentTarget = event.currentTarget;
        currentTarget.scrollHeight - currentTarget.scrollTop - currentTarget.clientHeight <= en && Z({
          append: true
        });
      }
      return te(D, () => {
        U !== null && window.clearTimeout(U), U = window.setTimeout(() => {
          U = null, cn.value?.scrollTo({
            top: 0
          }), Z({
            silent: true
          });
        }, 220);
      }), te(() => ue.active, e => {
        if (!e) {
          $();
          return;
        }
        Y(), Z({
          silent: true
        }), Q();
      }), oe(() => {
        pn = b.onChanged(e => {
          ue.active && (e.reasons.includes(`history`) && Z({
            silent: true
          }), e.reasons.includes(`phrases`) && !F.value && !V.value && Q(), Y());
        }), Y(), Z(), Q();
      }), ie(() => {
        $(), P?.(false), P = null, pn?.();
        for (let e of [U, W]) e !== null && window.clearTimeout(e);
      }), (te, d) => (p(), c(`div`, {
        ref_key: `scrollRef`,
        ref: cn,
        class: `no-scrollbar flex h-0 min-h-0 w-full flex-1 flex-col gap-3.5 overflow-y-auto overflow-x-hidden px-7 pb-9 pt-1 text-foreground`,
        onScroll: Hn
      }, [v(`section`, Be, [v(`span`, Ve, [m(o(me), {
        size: 14
      }), s(` ` + h(handler(`Kicker`)), 1)]), v(`h1`, He, h(handler(`ToolName`)), 1), v(`p`, Ue, h(handler(`HeroDesc`, {
        shortcut: mn.value
      })), 1)]), v(`section`, {
        class: `flex shrink-0 flex-col divide-y divide-border rounded-xl border border-border bg-card`,
        "aria-busy": T.value
      }, [v(`div`, Ge, [v(`div`, Ke, [v(`strong`, qe, h(handler(`RecordTitle`)), 1), v(`small`, Je, h(handler(`RecordDesc`)), 1)]), m(o(r), {
        "model-value": G.value,
        "aria-label": handler(`RecordTitle`),
        disabled: !C.value || T.value,
        "onUpdate:modelValue": Sn
      }, null, 8, [`model-value`, `aria-label`, `disabled`])]), v(`div`, Ye, [v(`div`, Xe, [v(`strong`, {
        class: a([`text-[13px] font-semibold`, G.value ? `` : `text-muted-foreground`])
      }, h(handler(`ShortcutTitle`)), 3), M.value ? (p(), c(`small`, Ze, h(M.value), 1)) : G.value && C.value?.shortcutError ? (p(), c(`small`, Qe, h(handler(`ShortcutInactive`, {
        reason: C.value.shortcutError
      })), 1)) : (p(), c(`small`, $e, h(G.value ? handler(`ShortcutDesc`) : handler(`ShortcutDisabledHint`)), 1))]), v(`div`, et, [v(`button`, {
        ref_key: `shortcutButtonRef`,
        ref: ln,
        type: `button`,
        class: a([`h-[30px] min-w-[132px] rounded-lg border px-3 text-xs font-semibold tracking-wide transition-colors outline-none disabled:cursor-not-allowed disabled:opacity-55`, A.value ? `border-primary bg-card text-muted-foreground` : `border-border bg-muted text-foreground hover:border-foreground/25`]),
        disabled: !G.value || T.value,
        title: handler(`ShortcutChange`),
        onClick: Rn,
        onKeydown: zn,
        onBlur: $
      }, h(A.value ? j.value || handler(`ShortcutPress`) : mn.value), 43, tt), hn.value ? _(``, true) : (p(), u(o(n), {
        key: 0,
        variant: `ghost`,
        size: `sm`,
        class: `text-xs text-muted-foreground`,
        disabled: !G.value || T.value,
        onClick: Bn
      }, {
        default: l(() => [s(h(handler(`ShortcutReset`)), 1)]),
        _: 1
      }, 8, [`disabled`]))])]), v(`div`, nt, [v(`div`, rt, [v(`strong`, it, [s(h(handler(`TimelineTitle`)) + ` `, 1), C.value?.syncToTimeline ? (p(), c(`span`, at, h(handler(`TimelineCloudBadge`)), 1)) : _(``, true)]), v(`small`, ot, h(handler(`TimelineDesc`)), 1)]), m(o(r), {
        "model-value": C.value?.syncToTimeline === true,
        "aria-label": handler(`TimelineTitle`),
        disabled: !C.value || T.value,
        "onUpdate:modelValue": Cn
      }, null, 8, [`model-value`, `aria-label`, `disabled`])]), v(`div`, st, [v(`div`, ct, [v(`strong`, lt, h(handler(`RetentionTitle`)), 1), v(`small`, ut, h(handler(`RetentionDesc`)), 1)]), v(`div`, dt, [m(Re, {
        modelValue: gn.value,
        "onUpdate:modelValue": d[0] ||= e => gn.value = e,
        options: _n.value,
        disabled: !C.value || T.value,
        label: handler(`RetentionTitle`),
        compact: ``
      }, null, 8, [`modelValue`, `options`, `disabled`, `label`])])])], 8, We), v(`section`, ft, [v(`header`, pt, [v(`div`, mt, [(p(true), c(f, null, ee(bn.value, state => (p(), c(`button`, {
        key: state.value,
        type: `button`,
        role: `tab`,
        "aria-selected": w.value === state.value,
        class: a([`inline-flex h-7 items-center gap-1.5 rounded-md px-2.5 text-xs transition-colors`, w.value === state.value ? `bg-card font-semibold text-foreground shadow-[0_1px_3px_rgb(0_0_0/0.08)]` : `text-muted-foreground hover:text-foreground`]),
        onClick: t => w.value = state.value
      }, [s(h(state.label), 1), v(`span`, {
        class: a([`rounded-full px-1.5 text-[10px] leading-4`, w.value === state.value ? `bg-primary/10 text-primary` : `bg-foreground/[0.06]`])
      }, h(state.count), 3)], 10, ht))), 128))]), w.value === `history` ? (p(), c(`div`, gt, [v(`label`, _t, [m(o(Me), {
        size: 14,
        class: `shrink-0`
      }), ne(v(`input`, {
        "onUpdate:modelValue": d[1] ||= e => D.value = e,
        type: `search`,
        class: `min-w-0 flex-1 bg-transparent text-xs text-foreground outline-none placeholder:text-muted-foreground [&::-webkit-search-cancel-button]:appearance-none`,
        placeholder: handler(`SearchPlaceholder`)
      }, null, 8, vt), [[se, D.value]]), D.value ? (p(), c(`button`, {
        key: 0,
        type: `button`,
        class: `inline-flex shrink-0 hover:text-foreground`,
        "aria-label": handler(`ClearSearch`),
        title: handler(`ClearSearch`),
        onMousedown: d[2] ||= ce(() => {}, [`prevent`]),
        onClick: d[3] ||= e => D.value = ``
      }, [m(o(de), {
        size: 13
      })], 40, yt)) : _(``, true)]), m(o(n), {
        variant: `outline`,
        size: `sm`,
        class: `shrink-0 text-xs`,
        disabled: !C.value || C.value.historyCount === C.value.pinnedCount,
        onClick: On
      }, {
        default: l(() => [m(o(i), {
          size: 14
        }), s(h(handler(`ClearHistory`)), 1)]),
        _: 1
      }, 8, [`disabled`])])) : (p(), c(`div`, bt, [m(o(n), {
        variant: `outline`,
        size: `sm`,
        class: `border-primary/30 text-xs text-primary hover:bg-primary/10 hover:text-primary`,
        onClick: d[4] ||= e => An()
      }, {
        default: l(() => [m(o(e), {
          size: 14
        }), s(h(handler(`NewPhrase`)), 1)]),
        _: 1
      })]))]), w.value === `history` ? (p(), c(f, {
        key: 0
      }, [nn.value ? (p(), c(`div`, xt, [m(o(he), {
        class: `animate-spin`,
        size: 20
      }), s(h(handler(`Loading`)), 1)])) : E.value.length === 0 ? (p(), c(`div`, St, [m(o(me), {
        size: 26
      }), v(`strong`, Ct, h(yn.value), 1), D.value.trim() ? _(``, true) : (p(), c(`small`, wt, h(G.value ? handler(`HistoryEmptyDesc`) : handler(`HistoryDisabledDesc`)), 1))])) : (p(), c(`div`, Tt, [(p(true), c(f, null, ee(E.value, e => (p(), c(`article`, {
        key: e.id,
        class: a([`group flex items-start gap-1 rounded-lg transition-colors hover:bg-muted/60`, e.isPinned ? `bg-primary/[0.04]` : ``])
      }, [v(`button`, {
        type: `button`,
        class: `flex min-w-0 flex-1 flex-col gap-1 px-2.5 py-2 text-left`,
        title: handler(`Copy`),
        onClick: t => Tn(e)
      }, [v(`p`, Dt, h(e.preview), 1), v(`span`, Ot, [e.isPinned ? (p(), u(o(le), {
        key: 0,
        size: 11,
        class: `text-primary`
      })) : _(``, true), v(`span`, null, h(handler(`Characters`, {
        n: e.characterCount.toLocaleString()
      })), 1), d[12] ||= v(`i`, {
        class: `not-italic`
      }, `·`, -1), e.copyCount > 1 ? (p(), c(`span`, kt, h(handler(`CopyCount`, {
        n: e.copyCount
      })), 1)) : _(``, true), e.copyCount > 1 ? (p(), c(`i`, At, `·`)) : _(``, true), v(`time`, {
        datetime: e.copiedAt
      }, h(Vn(e.copiedAt)), 9, jt)])], 8, Et), v(`div`, Mt, [m(o(n), {
        variant: `ghost`,
        size: `icon-sm`,
        class: a(k.value === `history:${e.id}` ? `text-primary` : `text-muted-foreground`),
        title: handler(`Copy`),
        "aria-label": handler(`Copy`),
        onClick: t => Tn(e)
      }, {
        default: l(() => [k.value === `history:${e.id}` ? (p(), u(o(pe), {
          key: 0,
          size: 15
        })) : (p(), u(o(ge), {
          key: 1,
          size: 15
        }))]),
        _: 2
      }, 1032, [`class`, `title`, `aria-label`, `onClick`]), m(o(n), {
        variant: `ghost`,
        size: `icon-sm`,
        class: a(e.isPinned ? `text-primary` : `text-muted-foreground`),
        title: e.isPinned ? handler(`Unpin`) : handler(`Pin`),
        "aria-label": e.isPinned ? handler(`Unpin`) : handler(`Pin`),
        onClick: t => En(e)
      }, {
        default: l(() => [e.isPinned ? (p(), u(o(je), {
          key: 0,
          size: 15
        })) : (p(), u(o(le), {
          key: 1,
          size: 15
        }))]),
        _: 2
      }, 1032, [`class`, `title`, `aria-label`, `onClick`]), m(o(n), {
        variant: `ghost`,
        size: `icon-sm`,
        class: `text-muted-foreground hover:text-destructive`,
        title: handler(`Delete`),
        "aria-label": handler(`Delete`),
        onClick: t => Dn(e)
      }, {
        default: l(() => [m(o(i), {
          size: 15
        })]),
        _: 1
      }, 8, [`title`, `aria-label`, `onClick`])])], 2))), 128)), rn.value ? (p(), c(`div`, Nt, [m(o(he), {
        class: `animate-spin`,
        size: 15
      }), s(h(handler(`LoadingMore`)), 1)])) : _(``, true)]))], 64)) : (p(), c(f, {
        key: 1
      }, [sn.value ? (p(), c(`div`, Pt, [m(o(he), {
        class: `animate-spin`,
        size: 20
      }), s(h(handler(`Loading`)), 1)])) : O.value.length === 0 ? (p(), c(`div`, Ft, [m(o(me), {
        size: 26
      }), v(`strong`, It, h(handler(`PhrasesEmpty`)), 1), v(`small`, Lt, h(handler(`PhrasesEmptyDesc`)), 1)])) : (p(), c(`div`, Rt, [(p(true), c(f, null, ee(O.value, e => (p(), c(`article`, {
        key: e.id,
        class: a([`group flex items-start gap-1 rounded-lg transition-colors hover:bg-muted/60`, V.value === e.id ? `opacity-50` : ``]),
        onDragover: t => In(e, t),
        onDrop: d[5] ||= ce(() => {}, [`prevent`])
      }, [v(`span`, {
        class: `mt-2.5 grid size-6 shrink-0 cursor-grab place-items-center rounded text-muted-foreground opacity-40 transition-opacity active:cursor-grabbing group-hover:opacity-100`,
        draggable: `true`,
        title: handler(`DragToSort`),
        "aria-label": handler(`DragToSort`),
        onDragstart: t => Fn(e, t),
        onDragend: Ln
      }, [m(o(ze), {
        size: 14
      })], 40, Bt), v(`button`, {
        type: `button`,
        class: `flex min-w-0 flex-1 flex-col gap-1 px-1 py-2 text-left`,
        title: handler(`Copy`),
        onClick: t => kn(e)
      }, [e.title ? (p(), c(`strong`, Ht, h(e.title), 1)) : _(``, true), v(`p`, {
        class: a([`line-clamp-3 whitespace-pre-wrap break-words text-[13px] leading-relaxed`, e.title ? `text-muted-foreground` : ``])
      }, h(e.content), 3), v(`span`, Ut, [v(`span`, null, h(handler(`Characters`, {
        n: e.content.length.toLocaleString()
      })), 1), e.useCount > 0 ? (p(), c(f, {
        key: 0
      }, [d[13] ||= v(`i`, {
        class: `not-italic`
      }, `·`, -1), v(`span`, null, h(handler(`UseCount`, {
        n: e.useCount
      })), 1)], 64)) : _(``, true)])], 8, Vt), v(`div`, Wt, [m(o(n), {
        variant: `ghost`,
        size: `icon-sm`,
        class: a(k.value === `phrase:${e.id}` ? `text-primary` : `text-muted-foreground`),
        title: handler(`Copy`),
        "aria-label": handler(`Copy`),
        onClick: t => kn(e)
      }, {
        default: l(() => [k.value === `phrase:${e.id}` ? (p(), u(o(pe), {
          key: 0,
          size: 15
        })) : (p(), u(o(ge), {
          key: 1,
          size: 15
        }))]),
        _: 2
      }, 1032, [`class`, `title`, `aria-label`, `onClick`]), m(o(n), {
        variant: `ghost`,
        size: `icon-sm`,
        class: `text-muted-foreground`,
        title: handler(`Edit`),
        "aria-label": handler(`Edit`),
        onClick: t => An(e)
      }, {
        default: l(() => [m(o(t), {
          size: 15
        })]),
        _: 1
      }, 8, [`title`, `aria-label`, `onClick`]), m(o(n), {
        variant: `ghost`,
        size: `icon-sm`,
        class: `text-muted-foreground hover:text-destructive`,
        title: handler(`Delete`),
        "aria-label": handler(`Delete`),
        onClick: t => Pn(e)
      }, {
        default: l(() => [m(o(i), {
          size: 15
        })]),
        _: 1
      }, 8, [`title`, `aria-label`, `onClick`])])], 42, zt))), 128))]))], 64))]), m(o(ve), {
        open: F.value,
        "onUpdate:open": d[8] ||= e => {
          e || jn();
        }
      }, {
        default: l(() => [m(o(ye), {
          class: `sm:max-w-[480px]`
        }, {
          default: l(() => [m(o(be), null, {
            default: l(() => [m(o(Se), null, {
              default: l(() => [s(h(I.value ? handler(`PhraseEditorEdit`) : handler(`PhraseEditorCreate`)), 1)]),
              _: 1
            })]),
            _: 1
          }), v(`label`, Gt, [v(`span`, Kt, h(handler(`PhraseTitleLabel`)), 1), m(o(Ne), {
            modelValue: L.value,
            "onUpdate:modelValue": d[6] ||= e => L.value = e,
            type: `text`,
            class: `h-9 text-sm`,
            maxlength: o(60),
            placeholder: handler(`PhraseTitlePlaceholder`),
            onKeydown: Nn
          }, null, 8, [`modelValue`, `maxlength`, `placeholder`])]), v(`label`, qt, [v(`span`, Jt, h(handler(`PhraseContentLabel`)), 1), ne(v(`textarea`, {
            ref_key: `editorContentRef`,
            ref: dn,
            "onUpdate:modelValue": d[7] ||= e => R.value = e,
            rows: `7`,
            class: `min-h-36 w-full resize-y rounded-lg border border-input bg-transparent px-2.5 py-2 text-sm leading-relaxed outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-input/30`,
            maxlength: o(Fe),
            placeholder: handler(`PhraseContentPlaceholder`),
            onKeydown: Nn
          }, null, 40, Yt), [[se, R.value]])]), B.value ? (p(), c(`p`, options, h(B.value), 1)) : _(``, true), m(o(xe), {
            class: `items-center sm:justify-between`
          }, {
            default: l(() => [v(`small`, Zt, h(handler(`PhraseSaveHint`, {
              key: tn ? `⌘ + Enter` : `Ctrl + Enter`
            })), 1), v(`div`, Qt, [m(o(n), {
              variant: `outline`,
              disabled: z.value,
              onClick: jn
            }, {
              default: l(() => [s(h(handler(`Cancel`)), 1)]),
              _: 1
            }, 8, [`disabled`]), m(o(n), {
              disabled: z.value || !R.value.trim(),
              onClick: Mn
            }, {
              default: l(() => [z.value ? (p(), u(o(he), {
                key: 0,
                class: `animate-spin`,
                size: 14
              })) : _(``, true), s(h(handler(`Save`)), 1)]),
              _: 1
            }, 8, [`disabled`])])]),
            _: 1
          })]),
          _: 1
        })]),
        _: 1
      }, 8, [`open`]), m(o(we), {
        open: !!N.value,
        "onUpdate:open": d[11] ||= e => {
          e || xn(false);
        }
      }, {
        default: l(() => [m(o(Ce), null, {
          default: l(() => [m(o(Ee), null, {
            default: l(() => [m(o(Oe), null, {
              default: l(() => [s(h(vn.value.title), 1)]),
              _: 1
            }), m(o(Te), {
              class: `flex flex-col gap-1.5`
            }, {
              default: l(() => [(p(true), c(f, null, ee(vn.value.lines, e => (p(), c(`span`, {
                key: e
              }, h(e), 1))), 128))]),
              _: 1
            })]),
            _: 1
          }), m(o(De), null, {
            default: l(() => [m(o(n), {
              variant: `outline`,
              onClick: d[9] ||= e => xn(false)
            }, {
              default: l(() => [s(h(handler(`Cancel`)), 1)]),
              _: 1
            }), m(o(n), {
              variant: vn.value.danger ? `destructive` : `default`,
              onClick: d[10] ||= e => xn(true)
            }, {
              default: l(() => [s(h(vn.value.action), 1)]),
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
  tn = re({
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
    setup(e, {
      emit: t
    }) {
      let n = e,
        r = t;
      return (e, t) => (p(), c(`div`, S, [m(_e, {
        tool: n.tool,
        user: n.user,
        "credits-balance": n.creditsBalance,
        "voice-tool": false,
        "show-history": false,
        "local-tool": ``,
        "show-balance": false,
        onBack: t[0] ||= e => r(`back`),
        onRecharge: t[1] ||= e => r(`recharge`)
      }, null, 8, [`tool`, `user`, `credits-balance`]), m(x, {
        active: n.active
      }, null, 8, [`active`])]));
    }
  });
export { tn as default };