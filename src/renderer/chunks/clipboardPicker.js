import { $n as e, An as t, O as n, S as r, St as i, Wt as a, Zt as ee, bn as o, c as s, gt as c, j as te, n as ne, ot as re, rr as l, rt as u, t as d, ut as ie, v as f, x as p, y as m } from "./vue-i18n.runtime.js";
import { C as ae, E as h, n as g, o as _, t as v } from "../i18n/en-US-player.js";
import { t as y } from "./_plugin-vue_export-helper.js";
import { r as oe } from "./clipboard-assistant-page.js";
import { t as se } from "./shortcut-label.js";
var ce = {
    class: `picker__header`
  },
  le = {
    class: `picker__search`
  },
  ue = [`placeholder`],
  de = {
    key: 0
  },
  fe = {
    class: `picker__tabs`,
    role: `tablist`
  },
  pe = [`aria-selected`],
  me = [`aria-selected`],
  he = [`title`],
  ge = {
    class: `picker__body`
  },
  _e = {
    key: 0,
    class: `picker__empty`
  },
  ve = [`aria-selected`, `data-index`, `onMousemove`, `onClick`],
  ye = {
    class: `picker__index`
  },
  be = {
    class: `picker__text`
  },
  xe = {
    key: 0
  },
  Se = {
    class: `picker__meta`
  },
  Ce = {
    key: 0,
    viewBox: `0 0 24 24`,
    "aria-hidden": `true`
  },
  we = [`datetime`],
  Te = [`aria-label`],
  Ee = {
    key: 0,
    class: `picker__preview-title`
  },
  De = {
    key: 1,
    class: `picker__preview-note`
  },
  Oe = {
    class: `picker__preview-meta`
  },
  ke = {
    key: 1,
    class: `picker__preview-empty`
  },
  Ae = {
    class: `picker__footer`
  },
  options = {
    key: 0,
    class: `picker__error`,
    role: `alert`
  },
  b = y(te({
    __name: `ClipboardPickerApp`,
    setup(props) {
      let clipboardPickerAPI = window.clipboardPickerAPI,
        fallbackValue = clipboardPickerAPI?.platform || `win32`,
        _ = fallbackValue === `darwin`,
        {
          t: v,
          locale: y
        } = ne(),
        handler = (e, t = {}) => v(`toolboxNative.clipboardPicker${e}`, t),
        x = o([]),
        S = o([]),
        C = o(``),
        w = o(`history`),
        T = o(``),
        E = o(null),
        D = o(0),
        O = o(false),
        k = o(``),
        A = o(null),
        j = o(null),
        M = o(null),
        N = o(null),
        P = new Map(),
        F = null,
        I = null,
        L = null,
        R = 0,
        z = 0,
        B = null,
        V = f(() => T.value.trim().toLocaleLowerCase()),
        H = f(() => w.value === `history` ? V.value ? E.value ?? [] : x.value : V.value ? S.value.filter(item => `${item.title}\n${item.preview}`.toLocaleLowerCase().includes(V.value)) : S.value),
        Me = f(() => V.value ? handler(`NoMatch`) : w.value === `history` ? handler(`EmptyHistory`) : handler(`EmptyPhrases`)),
        Ne = f(() => _ ? `⌘1–9` : `Ctrl+1–9`),
        U = f(() => H.value[D.value] ?? null),
        W = f(() => {
          let e = U.value,
            t = N.value;
          return e && t && t.kind === e.kind && t.id === e.id ? t : null;
        }),
        G = f(() => W.value?.title || U.value?.title || ``),
        Pe = f(() => W.value?.content ?? U.value?.preview ?? ``),
        Fe = f(() => {
          let e = W.value;
          if (!e) return ``;
          let t = [handler(`Characters`, {
            n: e.characterCount.toLocaleString()
          })];
          return e.kind === `history` ? (e.count > 1 && t.push(handler(`CopyCount`, {
            n: e.count
          })), e.copiedAt && t.push(K(e.copiedAt, true))) : e.count > 0 && t.push(handler(`UseCount`, {
            n: e.count
          })), t.join(` · `);
        });
      function K(e, t = false) {
        if (!e) return ``;
        let date = new Date(e);
        if (Number.isNaN(date.getTime())) return ``;
        let r = new Date(),
          i = new Intl.DateTimeFormat(y.value, {
            hour: `2-digit`,
            minute: `2-digit`,
            hour12: false
          }).format(date),
          time = new Date(r.getFullYear(), r.getMonth(), r.getDate()).getTime();
        return date.getTime() >= time ? i : date.getTime() >= time - 864e5 ? t ? `${handler(`Yesterday`)} ${i}` : handler(`Yesterday`) : new Intl.DateTimeFormat(y.value, {
          ...(t && date.getFullYear() !== r.getFullYear() ? {
            year: `numeric`
          } : {}),
          month: `2-digit`,
          day: `2-digit`,
          ...(t ? {
            hour: `2-digit`,
            minute: `2-digit`,
            hour12: false
          } : {})
        }).format(date);
      }
      function q() {
        let e = U.value;
        L !== null && window.clearTimeout(L), L = null;
        let t = ++z;
        if (!e || !clipboardPickerAPI) {
          N.value = null;
          return;
        }
        let n = `${e.kind}:${e.id}`;
        if (P.has(n)) {
          N.value = P.get(n) ?? null;
          return;
        }
        L = window.setTimeout(async () => {
          L = null;
          try {
            let detail = await clipboardPickerAPI.detail({
                kind: e.kind,
                id: e.id
              }),
              i = detail.ok ? detail.data : null;
            P.set(n, i), t === z && (N.value = i);
          } catch {}
        }, 60);
      }
      function Ie(e) {
        x.value = e.history, S.value = e.phrases, C.value = e.shortcut, y.value = e.language === `en-US` ? `en-US` : `zh-CN`, document.documentElement.lang = y.value, document.title = v(`toolboxNative.clipboardAssistantToolName`), document.documentElement.classList.toggle(`dark`, e.dark), T.value = ``, E.value = null, D.value = 0, O.value = false, k.value = ``, P.clear(), N.value = null, e.tab ? w.value = e.tab : w.value === `phrases` && e.phrases.length === 0 && (w.value = `history`), u(() => {
          j.value?.scrollTo({
            top: 0
          }), A.value?.focus(), q();
        });
      }
      function J(e) {
        k.value = e, I !== null && window.clearTimeout(I), I = window.setTimeout(() => {
          k.value = ``, I = null;
        }, 2400);
      }
      async function Y() {
        let e = ++R,
          trimmed = T.value.trim();
        if (!trimmed || !clipboardPickerAPI) {
          E.value = null;
          return;
        }
        let searchData = await clipboardPickerAPI.search({
          keyword: trimmed
        });
        e === R && (E.value = searchData.ok ? searchData.data : [], D.value = 0);
      }
      async function X(e) {
        if (e && clipboardPickerAPI && !O.value) {
          O.value = true;
          try {
            let t = await clipboardPickerAPI.copy({
              kind: e.kind,
              id: e.id
            });
            t.ok || J(t.error.message || handler(`CopyFailed`));
          } catch {
            J(handler(`CopyFailed`));
          } finally {
            O.value = false;
          }
        }
      }
      function Z(e) {
        let t = H.value.length;
        t !== 0 && (D.value = Math.min(t - 1, Math.max(0, D.value + e)), u(() => {
          j.value?.querySelector(`[data-index="${D.value}"]`)?.scrollIntoView({
            block: `nearest`
          });
        }));
      }
      function Q(e) {
        w.value = e ?? (w.value === `history` ? `phrases` : `history`), A.value?.focus();
      }
      function $(event) {
        if (event.isComposing || event.keyCode === 229) return;
        if (event.key === `Escape`) {
          event.preventDefault(), clipboardPickerAPI?.hide();
          return;
        }
        if (event.key === `ArrowDown` || event.key === `ArrowUp`) {
          event.preventDefault(), Z(event.key === `ArrowDown` ? 1 : -1);
          return;
        }
        if (event.key === `PageDown` || event.key === `PageUp`) {
          event.preventDefault(), Z(event.key === `PageDown` ? 6 : -6);
          return;
        }
        if (event.key === `Enter`) {
          event.preventDefault(), X(H.value[D.value]);
          return;
        }
        if (event.key === `Tab`) {
          event.preventDefault(), Q();
          return;
        }
        let t = event.code.match(/^(?:Digit|Numpad)([1-9])$/)?.[1];
        t && (_ ? event.metaKey : event.ctrlKey) && !event.altKey && !event.shiftKey && (event.preventDefault(), X(H.value[Number(t) - 1]));
      }
      return a(T, () => {
        if (D.value = 0, w.value === `history`) {
          if (F !== null && window.clearTimeout(F), !T.value.trim()) {
            R += 1, E.value = null;
            return;
          }
          F = window.setTimeout(() => {
            F = null, Y();
          }, 120);
        }
      }), a(w, e => {
        D.value = 0, j.value?.scrollTo({
          top: 0
        }), e === `history` && T.value.trim() && Y();
      }), a(() => U.value ? `${U.value.kind}:${U.value.id}` : ``, () => {
        M.value?.scrollTo({
          top: 0
        }), q();
      }), ie(() => {
        B = clipboardPickerAPI?.onOpen(Ie) ?? null, window.addEventListener(`keydown`, $);
      }), re(() => {
        B?.(), window.removeEventListener(`keydown`, $);
        for (let e of [F, I, L]) e !== null && window.clearTimeout(e);
      }), (a, o) => (c(), r(`div`, {
        class: e([`picker`, {
          "is-mac": _
        }])
      }, [m(`header`, ce, [m(`div`, le, [o[6] ||= m(`svg`, {
        viewBox: `0 0 24 24`,
        "aria-hidden": `true`
      }, [m(`circle`, {
        cx: `11`,
        cy: `11`,
        r: `7`
      }), m(`path`, {
        d: `m20 20-3.5-3.5`
      })], -1), ee(m(`input`, {
        ref_key: `inputRef`,
        ref: A,
        "onUpdate:modelValue": o[0] ||= e => T.value = e,
        type: `text`,
        autocomplete: `off`,
        spellcheck: `false`,
        placeholder: w.value === `history` ? handler(`SearchHistory`) : handler(`SearchPhrases`)
      }, null, 8, ue), [[ae, T.value]]), C.value ? (c(), r(`kbd`, de, l(t(se)(C.value, t(fallbackValue))), 1)) : p(``, true)]), m(`div`, fe, [m(`button`, {
        type: `button`,
        role: `tab`,
        "aria-selected": w.value === `history`,
        class: e({
          active: w.value === `history`
        }),
        onMousedown: o[1] ||= h(() => {}, [`prevent`]),
        onClick: o[2] ||= e => Q(`history`)
      }, [n(l(handler(`TabHistory`)), 1), m(`span`, null, l(x.value.length), 1)], 42, pe), m(`button`, {
        type: `button`,
        role: `tab`,
        "aria-selected": w.value === `phrases`,
        class: e({
          active: w.value === `phrases`
        }),
        onMousedown: o[3] ||= h(() => {}, [`prevent`]),
        onClick: o[4] ||= e => Q(`phrases`)
      }, [n(l(handler(`TabPhrases`)), 1), m(`span`, null, l(S.value.length), 1)], 42, me), m(`kbd`, {
        class: `picker__tab-key`,
        title: handler(`HintSwitch`)
      }, `Tab`, 8, he)])]), m(`div`, ge, [m(`div`, {
        ref_key: `listRef`,
        ref: j,
        class: `picker__list`,
        role: `listbox`
      }, [H.value.length === 0 ? (c(), r(`p`, _e, l(Me.value), 1)) : p(``, true), (c(true), r(s, null, i(H.value, (t, n) => (c(), r(`button`, {
        key: `${t.kind}:${t.id}`,
        type: `button`,
        role: `option`,
        class: e([`picker__item`, {
          selected: n === D.value
        }]),
        "aria-selected": n === D.value,
        "data-index": n,
        onMousedown: o[5] ||= h(() => {}, [`prevent`]),
        onMousemove: e => D.value = n,
        onClick: e => X(t)
      }, [m(`span`, ye, l(n < 9 ? n + 1 : ``), 1), m(`span`, be, [t.title ? (c(), r(`strong`, xe, l(t.title), 1)) : p(``, true), m(`span`, null, l(t.preview), 1)]), m(`span`, Se, [t.isPinned ? (c(), r(`svg`, Ce, [...(o[7] ||= [m(`path`, {
        d: `M12 17v5`
      }, null, -1), m(`path`, {
        d: `M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z`
      }, null, -1)])])) : p(``, true), t.copiedAt ? (c(), r(`time`, {
        key: 1,
        datetime: t.copiedAt
      }, l(K(t.copiedAt)), 9, we)) : p(``, true)])], 42, ve))), 128))], 512), m(`aside`, {
        class: `picker__preview`,
        "aria-label": handler(`PreviewLabel`)
      }, [U.value ? (c(), r(s, {
        key: 0
      }, [G.value ? (c(), r(`strong`, Ee, l(G.value), 1)) : p(``, true), m(`div`, {
        ref_key: `previewBodyRef`,
        ref: M,
        class: `picker__preview-body`
      }, l(Pe.value), 513), W.value?.truncated ? (c(), r(`p`, De, l(handler(`PreviewTruncated`, {
        n: t(oe).toLocaleString()
      })), 1)) : p(``, true), m(`p`, Oe, l(Fe.value), 1)], 64)) : (c(), r(`p`, ke, l(handler(`PreviewEmpty`)), 1))], 8, Te)]), m(`footer`, Ae, [k.value ? (c(), r(`p`, options, l(k.value), 1)) : (c(), r(s, {
        key: 1
      }, [m(`span`, null, [o[8] ||= m(`kbd`, null, `↑↓`, -1), n(l(handler(`HintSelect`)), 1)]), m(`span`, null, [o[9] ||= m(`kbd`, null, `Enter`, -1), n(l(handler(`HintCopy`)), 1)]), m(`span`, null, [m(`kbd`, null, l(Ne.value), 1), n(l(handler(`HintQuick`)), 1)]), m(`span`, null, [o[10] ||= m(`kbd`, null, `Esc`, -1), n(l(handler(`HintClose`)), 1)])], 64))])], 2));
    }
  }), [[`__scopeId`, `data-v-784c69ae`]]),
  x = d({
    legacy: false,
    locale: `zh-CN`,
    fallbackLocale: `zh-CN`,
    messages: {
      "zh-CN": {
        toolboxNative: g
      },
      "en-US": {
        toolboxNative: v
      }
    },
    missingWarn: false,
    fallbackWarn: false
  });
_(b).use(x).mount(`#app`);