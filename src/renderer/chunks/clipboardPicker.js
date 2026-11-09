import { $n as vueN, An as vueAn, O as vueO, S as vueS, St as vueSt, Wt as vueWt, Zt as vueZt, bn as vueBn, c as vueC, gt as vueGt, j as vueJ, n as ne, ot as vueOt, rr as vueRr, rt as vueRt, t as vueT, ut as vueUt, v as vueV, x as vueX, y as vueY } from "./vue-i18n.runtime.js";
import { C as playerC, E as playerE, n as playerN, o as playerO, t as playerT } from "../i18n/en-US-player.js";
import { t as pluginvueexporthelperT } from "./_plugin-vue_export-helper.js";
import { r as clipboardassistantpageR } from "./clipboard-assistant-page.js";
import { t as shortcutlabelT } from "./shortcut-label.js";
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
  pluginvueexporthelperTResult = pluginvueexporthelperT(vueJ({
    __name: `ClipboardPickerApp`,
    setup(props) {
      let clipboardPickerAPI = window.clipboardPickerAPI,
        fallbackValue = clipboardPickerAPI?.platform || `win32`,
        _ = fallbackValue === `darwin`,
        {
          t: translate,
          locale: y
        } = ne(),
        handler = (e, t = {}) => translate(`toolboxNative.clipboardPicker${e}`, t),
        x = vueBn([]),
        S = vueBn([]),
        C = vueBn(``),
        w = vueBn(`history`),
        T = vueBn(``),
        E = vueBn(null),
        D = vueBn(0),
        O = vueBn(false),
        k = vueBn(``),
        A = vueBn(null),
        j = vueBn(null),
        M = vueBn(null),
        N = vueBn(null),
        P = new Map(),
        F = null,
        I = null,
        L = null,
        R = 0,
        z = 0,
        B = null,
        V = vueV(() => T.value.trim().toLocaleLowerCase()),
        H = vueV(() => w.value === `history` ? V.value ? E.value ?? [] : x.value : V.value ? S.value.filter(item => `${item.title}\n${item.preview}`.toLocaleLowerCase().includes(V.value)) : S.value),
        Me = vueV(() => V.value ? handler(`NoMatch`) : w.value === `history` ? handler(`EmptyHistory`) : handler(`EmptyPhrases`)),
        Ne = vueV(() => _ ? `⌘1–9` : `Ctrl+1–9`),
        U = vueV(() => H.value[D.value] ?? null),
        W = vueV(() => {
          let e = U.value,
            t = N.value;
          return e && t && t.kind === e.kind && t.id === e.id ? t : null;
        }),
        G = vueV(() => W.value?.title || U.value?.title || ``),
        Pe = vueV(() => W.value?.content ?? U.value?.preview ?? ``),
        Fe = vueV(() => {
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
        x.value = e.history, S.value = e.phrases, C.value = e.shortcut, y.value = e.language === `en-US` ? `en-US` : `zh-CN`, document.documentElement.lang = y.value, document.title = translate(`toolboxNative.clipboardAssistantToolName`), document.documentElement.classList.toggle(`dark`, e.dark), T.value = ``, E.value = null, D.value = 0, O.value = false, k.value = ``, P.clear(), N.value = null, e.tab ? w.value = e.tab : w.value === `phrases` && e.phrases.length === 0 && (w.value = `history`), vueRt(() => {
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
        t !== 0 && (D.value = Math.min(t - 1, Math.max(0, D.value + e)), vueRt(() => {
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
      return vueWt(T, () => {
        if (D.value = 0, w.value === `history`) {
          if (F !== null && window.clearTimeout(F), !T.value.trim()) {
            R += 1, E.value = null;
            return;
          }
          F = window.setTimeout(() => {
            F = null, Y();
          }, 120);
        }
      }), vueWt(w, e => {
        D.value = 0, j.value?.scrollTo({
          top: 0
        }), e === `history` && T.value.trim() && Y();
      }), vueWt(() => U.value ? `${U.value.kind}:${U.value.id}` : ``, () => {
        M.value?.scrollTo({
          top: 0
        }), q();
      }), vueUt(() => {
        B = clipboardPickerAPI?.onOpen(Ie) ?? null, window.addEventListener(`keydown`, $);
      }), vueOt(() => {
        B?.(), window.removeEventListener(`keydown`, $);
        for (let e of [F, I, L]) e !== null && window.clearTimeout(e);
      }), (a, renderCache) => (vueGt(), vueS(`div`, {
        class: vueN([`picker`, {
          "is-mac": _
        }])
      }, [vueY(`header`, ce, [vueY(`div`, le, [renderCache[6] ||= vueY(`svg`, {
        viewBox: `0 0 24 24`,
        "aria-hidden": `true`
      }, [vueY(`circle`, {
        cx: `11`,
        cy: `11`,
        r: `7`
      }), vueY(`path`, {
        d: `m20 20-3.5-3.5`
      })], -1), vueZt(vueY(`input`, {
        ref_key: `inputRef`,
        ref: A,
        "onUpdate:modelValue": renderCache[0] ||= e => T.value = e,
        type: `text`,
        autocomplete: `off`,
        spellcheck: `false`,
        placeholder: w.value === `history` ? handler(`SearchHistory`) : handler(`SearchPhrases`)
      }, null, 8, ue), [[playerC, T.value]]), C.value ? (vueGt(), vueS(`kbd`, de, vueRr(vueAn(shortcutlabelT)(C.value, vueAn(fallbackValue))), 1)) : vueX(``, true)]), vueY(`div`, fe, [vueY(`button`, {
        type: `button`,
        role: `tab`,
        "aria-selected": w.value === `history`,
        class: vueN({
          active: w.value === `history`
        }),
        onMousedown: renderCache[1] ||= playerE(() => {}, [`prevent`]),
        onClick: renderCache[2] ||= e => Q(`history`)
      }, [vueO(vueRr(handler(`TabHistory`)), 1), vueY(`span`, null, vueRr(x.value.length), 1)], 42, pe), vueY(`button`, {
        type: `button`,
        role: `tab`,
        "aria-selected": w.value === `phrases`,
        class: vueN({
          active: w.value === `phrases`
        }),
        onMousedown: renderCache[3] ||= playerE(() => {}, [`prevent`]),
        onClick: renderCache[4] ||= e => Q(`phrases`)
      }, [vueO(vueRr(handler(`TabPhrases`)), 1), vueY(`span`, null, vueRr(S.value.length), 1)], 42, me), vueY(`kbd`, {
        class: `picker__tab-key`,
        title: handler(`HintSwitch`)
      }, `Tab`, 8, he)])]), vueY(`div`, ge, [vueY(`div`, {
        ref_key: `listRef`,
        ref: j,
        class: `picker__list`,
        role: `listbox`
      }, [H.value.length === 0 ? (vueGt(), vueS(`p`, _e, vueRr(Me.value), 1)) : vueX(``, true), (vueGt(true), vueS(vueC, null, vueSt(H.value, (t, n) => (vueGt(), vueS(`button`, {
        key: `${t.kind}:${t.id}`,
        type: `button`,
        role: `option`,
        class: vueN([`picker__item`, {
          selected: n === D.value
        }]),
        "aria-selected": n === D.value,
        "data-index": n,
        onMousedown: renderCache[5] ||= playerE(() => {}, [`prevent`]),
        onMousemove: e => D.value = n,
        onClick: e => X(t)
      }, [vueY(`span`, ye, vueRr(n < 9 ? n + 1 : ``), 1), vueY(`span`, be, [t.title ? (vueGt(), vueS(`strong`, xe, vueRr(t.title), 1)) : vueX(``, true), vueY(`span`, null, vueRr(t.preview), 1)]), vueY(`span`, Se, [t.isPinned ? (vueGt(), vueS(`svg`, Ce, [...(renderCache[7] ||= [vueY(`path`, {
        d: `M12 17v5`
      }, null, -1), vueY(`path`, {
        d: `M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z`
      }, null, -1)])])) : vueX(``, true), t.copiedAt ? (vueGt(), vueS(`time`, {
        key: 1,
        datetime: t.copiedAt
      }, vueRr(K(t.copiedAt)), 9, we)) : vueX(``, true)])], 42, ve))), 128))], 512), vueY(`aside`, {
        class: `picker__preview`,
        "aria-label": handler(`PreviewLabel`)
      }, [U.value ? (vueGt(), vueS(vueC, {
        key: 0
      }, [G.value ? (vueGt(), vueS(`strong`, Ee, vueRr(G.value), 1)) : vueX(``, true), vueY(`div`, {
        ref_key: `previewBodyRef`,
        ref: M,
        class: `picker__preview-body`
      }, vueRr(Pe.value), 513), W.value?.truncated ? (vueGt(), vueS(`p`, De, vueRr(handler(`PreviewTruncated`, {
        n: vueAn(clipboardassistantpageR).toLocaleString()
      })), 1)) : vueX(``, true), vueY(`p`, Oe, vueRr(Fe.value), 1)], 64)) : (vueGt(), vueS(`p`, ke, vueRr(handler(`PreviewEmpty`)), 1))], 8, Te)]), vueY(`footer`, Ae, [k.value ? (vueGt(), vueS(`p`, options, vueRr(k.value), 1)) : (vueGt(), vueS(vueC, {
        key: 1
      }, [vueY(`span`, null, [renderCache[8] ||= vueY(`kbd`, null, `↑↓`, -1), vueO(vueRr(handler(`HintSelect`)), 1)]), vueY(`span`, null, [renderCache[9] ||= vueY(`kbd`, null, `Enter`, -1), vueO(vueRr(handler(`HintCopy`)), 1)]), vueY(`span`, null, [vueY(`kbd`, null, vueRr(Ne.value), 1), vueO(vueRr(handler(`HintQuick`)), 1)]), vueY(`span`, null, [renderCache[10] ||= vueY(`kbd`, null, `Esc`, -1), vueO(vueRr(handler(`HintClose`)), 1)])], 64))])], 2));
    }
  }), [[`__scopeId`, `data-v-784c69ae`]]),
  x = vueT({
    legacy: false,
    locale: `zh-CN`,
    fallbackLocale: `zh-CN`,
    messages: {
      "zh-CN": {
        toolboxNative: playerN
      },
      "en-US": {
        toolboxNative: playerT
      }
    },
    missingWarn: false,
    fallbackWarn: false
  });
playerO(pluginvueexporthelperTResult).use(x).mount(`#app`);