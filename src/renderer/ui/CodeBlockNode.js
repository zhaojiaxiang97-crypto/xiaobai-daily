import { $n as e, An as t, Ct as n, E as r, S as i, Wt as a, Yt as o, Zt as s, b as c, bn as l, f as u, gt as d, j as f, k as p, mt as ee, nr as te, ot as ne, rr as re, rt as ie, ut as m, v as h, x as ae, y as g, z as oe } from "../chunks/vue-i18n.runtime.js";
import { E as se, w as ce } from "../i18n/en-US-player.js";
import { D as le, E as ue, F as de, I as fe, J as pe, K as me, N as he, P as ge, R as _e, V as ve, W as ye, X as be, q as xe, v as Se, y as _, z as Ce } from "../chunks/main.js";
var defineProperty = Object.defineProperty,
  Te = Object.defineProperties,
  getOwnPropertyDescriptors = Object.getOwnPropertyDescriptors,
  Ee = Object.getOwnPropertySymbols,
  De = Object.prototype.hasOwnProperty,
  propertyIsEnumerable = Object.prototype.propertyIsEnumerable,
  handler = (e, t, n) => t in e ? defineProperty(e, t, {
    enumerable: true,
    configurable: true,
    writable: true,
    value: n
  }) : e[t] = n,
  x = (e, t) => {
    for (var n in t ||= {}) De.call(t, n) && handler(e, n, t[n]);
    if (Ee) for (var n of Ee(t)) propertyIsEnumerable.call(t, n) && handler(e, n, t[n]);
    return e;
  },
  S = (e, t) => Te(e, getOwnPropertyDescriptors(t)),
  C = (e, t, n) => new Promise((fn, i) => {
    var a = e => {
        try {
          s(n.next(e));
        } catch (e) {
          i(e);
        }
      },
      o = e => {
        try {
          s(n.throw(e));
        } catch (e) {
          i(e);
        }
      },
      s = e => e.done ? fn(e.value) : Promise.resolve(e.value).then(a, o);
    s((n = n.apply(e, t)).next());
  }),
  Oe = {
    class: `html-preview-frame__header`
  },
  w = {
    class: `html-preview-frame__title`
  },
  T = {
    class: `html-preview-frame__label`
  },
  E = [`sandbox`, `srcdoc`],
  ke = Se(f({
    __name: `HtmlPreviewFrame`,
    props: {
      code: {},
      isDark: {
        type: Boolean
      },
      htmlPreviewAllowScripts: {
        type: Boolean
      },
      htmlPreviewSandbox: {},
      onClose: {
        type: Function
      },
      title: {}
    },
    setup(n) {
      let r = n,
        {
          t: i
        } = ge(),
        a = h(() => {
          let fallbackValue = r.code || ``,
            lowercased = fallbackValue.trim().toLowerCase();
          return lowercased.startsWith(`<!doctype`) || lowercased.startsWith(`<html`) || lowercased.startsWith(`<body`) ? fallbackValue : `<!doctype html>\n<html lang="en">\n  <head>\n    <meta charset="utf-8" />\n    <meta name="viewport" content="width=device-width, initial-scale=1" />\n    <style>\n      html, body {\n        margin: 0;\n        padding: 0;\n        height: 100%;\n        background-color: ${r.isDark ? `#020617` : `#ffffff`};\n        color: ${r.isDark ? `#e5e7eb` : `#020617`};\n      }\n      body {\n        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', ui-sans-serif, sans-serif;\n      }\n    </style>\n  </head>\n  <body>\n    ${fallbackValue}\n  </body>\n</html>`;
        }),
        o = h(() => {
          return htmlPreviewSandbox = r.htmlPreviewSandbox, payload = r.htmlPreviewAllowScripts, typeof htmlPreviewSandbox == `string` ? htmlPreviewSandbox : htmlPreviewSandbox === undefined && true === payload ? `allow-scripts` : ``;
          var htmlPreviewSandbox, payload;
        });
      function s(event) {
        var payload;
        event.key !== `Escape` && event.key !== `Esc` || (payload = r.onClose) == null || payload.call(r);
      }
      return m(() => {
        typeof window < `u` && window.addEventListener(`keydown`, s);
      }), ee(() => {
        typeof window < `u` && window.removeEventListener(`keydown`, s);
      }), (n, s) => (d(), c(u, {
        to: `body`
      }, [g(`div`, {
        class: e([`markstream-vue`, {
          dark: r.isDark
        }])
      }, [g(`div`, {
        class: `html-preview-frame__backdrop`,
        onClick: s[2] ||= e => r.onClose?.call(r)
      }, [g(`div`, {
        class: `html-preview-frame`,
        onClick: s[1] ||= se(() => {}, [`stop`])
      }, [g(`div`, Oe, [g(`div`, w, [s[3] ||= g(`span`, {
        class: `html-preview-frame__dot`
      }, null, -1), g(`span`, T, re(r.title || t(i)(`common.preview`) || `Preview`), 1)]), g(`button`, {
        type: `button`,
        class: `html-preview-frame__close`,
        onClick: s[0] ||= e => r.onClose?.call(r)
      }, ` × `)]), g(`iframe`, {
        class: `html-preview-frame__iframe`,
        sandbox: o.value,
        referrerpolicy: `no-referrer`,
        srcdoc: a.value
      }, null, 8, E)])])], 2)]));
    }
  }), [[`__scopeId`, `data-v-24e66176`]]),
  Ae = null,
  je = null,
  Me = null,
  D = null,
  Ne = null,
  Pe = null,
  Fe = new WeakMap(),
  Ie = 0,
  Le = [`data-markstream-enhanced`],
  Re = {
    class: `code-header-main`
  },
  ze = [`innerHTML`],
  Be = {
    class: `code-header-copy`
  },
  Ve = {
    class: `code-header-title`
  },
  He = {
    key: 0,
    class: `code-header-caption`
  },
  Ue = {
    class: `code-editor-layer`
  },
  We = `__markstreamMonacoPassiveTouchState__`,
  O = Se(f({
    __name: `CodeBlockNode`,
    props: {
      node: {},
      isDark: {
        type: Boolean,
        default: false
      },
      loading: {
        type: Boolean,
        default: true
      },
      stream: {
        type: Boolean,
        default: true
      },
      theme: {},
      darkTheme: {
        default: `vitesse-dark`
      },
      lightTheme: {
        default: `vitesse-light`
      },
      isShowPreview: {
        type: Boolean,
        default: true
      },
      monacoOptions: {},
      enableFontSizeControl: {
        type: Boolean,
        default: true
      },
      minWidth: {
        default: undefined
      },
      maxWidth: {
        default: undefined
      },
      themes: {},
      showHeader: {
        type: Boolean,
        default: true
      },
      showCopyButton: {
        type: Boolean,
        default: true
      },
      showExpandButton: {
        type: Boolean,
        default: true
      },
      showPreviewButton: {
        type: Boolean,
        default: true
      },
      showCollapseButton: {
        type: Boolean,
        default: true
      },
      showFontSizeButtons: {
        type: Boolean,
        default: true
      },
      showTooltips: {
        type: Boolean
      },
      htmlPreviewAllowScripts: {
        type: Boolean
      },
      htmlPreviewSandbox: {},
      customId: {},
      estimatedHeightPx: {},
      estimatedContentHeightPx: {}
    },
    emits: [`previewCode`, `copy`],
    setup(u, {
      emit: f
    }) {
      let m = u,
        se = f,
        Se = oe(),
        we = h(() => {
          let e = Se?.vnode.props;
          return !(!e || !e.onPreviewCode && !e.onPreviewCode);
        }),
        {
          t: Te
        } = ge(),
        v = l(null),
        Ee = l(null),
        De = l(false),
        y = l(pe(m.node.language)),
        b = h(() => xe(y.value)),
        Oe = h(() => b.value === `plaintext`),
        w = l(false),
        T = l(false),
        E = l(false),
        O = l(false),
        Ge = l(false),
        k = false,
        Ke = null,
        A = l(null),
        j = l(null),
        qe = 0,
        Je = 0,
        Ye = be(),
        Xe = l(null),
        M = l(typeof window > `u`);
      typeof window < `u` && a(() => Ee.value, e => {
        var payload;
        if ((payload = Xe.value) == null || payload.destroy(), Xe.value = null, !e) return void (M.value = false);
        let n = Ye(e, {
          rootMargin: `400px`
        });
        Xe.value = n, M.value = n.isVisible.value, n.whenVisible.then(() => {
          M.value = true;
        });
      }, {
        immediate: true
      }), ne(() => {
        var htmlPreviewSandbox;
        k = true, (htmlPreviewSandbox = Xe.value) == null || htmlPreviewSandbox.destroy(), Xe.value = null;
      });
      let N = null,
        Ze = null,
        Qe = () => {},
        $e = () => {},
        et = () => null,
        P = () => ({
          getModel: () => ({
            getLineCount: () => 1
          }),
          getOption: () => 14,
          updateOptions: () => {}
        }),
        F = () => ({
          getModel: () => ({
            getLineCount: () => 1
          }),
          getOption: () => 14,
          updateOptions: () => {}
        }),
        tt = () => {},
        nt = () => {},
        rt = () => {},
        I = null,
        it = () => String(m.node.language ?? `plaintext`),
        at = () => C(null, null, function* () {}),
        emptyItems = [],
        ot = [],
        R = null,
        z = h(() => m.node.diff),
        B = l({
          removed: 0,
          added: 0
        }),
        st = h(() => `-${B.value.removed} +${B.value.added}`),
        ct = Object.freeze({
          enabled: false
        }),
        lt = Object.freeze({
          enabled: true,
          contextLineCount: 2,
          minimumLineCount: 4,
          revealLineCount: 5
        });
      function ut(e) {
        var payload;
        if (typeof e == `boolean`) return e;
        if (e && typeof e == `object`) {
          let n = e;
          return S(x(x({}, lt), n), {
            enabled: (payload = n.enabled) == null || payload
          });
        }
        return x({}, lt);
      }
      function dt(e, t) {
        return {
          original: String(e ?? ``),
          updated: String(t ?? ``)
        };
      }
      let V = h(() => {
          var htmlPreviewSandbox;
          let t = m.monacoOptions ? x({}, m.monacoOptions) : {};
          if (!z.value) return t;
          let n = t.diffHideUnchangedRegions === undefined ? x({}, lt) : ut(t.diffHideUnchangedRegions),
            r = t.hideUnchangedRegions === undefined ? undefined : ut(t.hideUnchangedRegions),
            i = false !== m.stream && false !== m.loading,
            a = i ? x({}, ct) : n,
            o = i ? x({}, ct) : r,
            s = x({}, t.experimental ?? {}),
            fallbackValue = t.diffUnchangedRegionStyle ?? `line-info`;
          return S(x(S(x(x({}, {
            maxComputationTime: 0,
            diffAlgorithm: `legacy`,
            ignoreTrimWhitespace: false,
            renderIndicators: true,
            diffUpdateThrottleMs: 120,
            renderLineHighlight: `none`,
            renderLineHighlightOnlyWhenFocus: true,
            selectionHighlight: false,
            occurrencesHighlight: `off`,
            matchBrackets: `never`,
            lineDecorationsWidth: 4,
            lineNumbersMinChars: 2,
            glyphMargin: false,
            renderOverviewRuler: false,
            overviewRulerBorder: false,
            hideCursorInOverviewRuler: true,
            scrollBeyondLastLine: false,
            diffHideUnchangedRegions: a,
            useInlineViewWhenSpaceIsLimited: (htmlPreviewSandbox = t.useInlineViewWhenSpaceIsLimited) != null && htmlPreviewSandbox,
            diffLineStyle: `background`,
            diffAppearance: `auto`,
            diffUnchangedRegionStyle: fallbackValue,
            diffHunkActionsOnHover: false,
            experimental: s
          }), t), {
            experimental: s
          }), o === undefined ? {} : {
            hideUnchangedRegions: o
          }), {
            diffHideUnchangedRegions: a
          });
        }),
        ft = h(() => z.value ? `diff` : `single`),
        pt = l(ft.value),
        mt = l(false),
        H = l(false),
        ht = l(false),
        gt = h(() => {
          let e = m.monacoOptions?.wordWrap;
          return e == null || String(e) !== `off`;
        }),
        _t = h(() => !(mt.value || !ht.value && (de() || H.value))),
        vt = l(false);
      typeof window < `u` && C(null, null, function* () {
        try {
          let e = yield Ce();
          if (k) return;
          if (!e) return void (mt.value = true);
          let useMonaco = e.useMonaco,
            detectLanguage = e.detectLanguage;
          if (typeof detectLanguage == `function` && (it = detectLanguage), typeof useMonaco == `function`) {
            let e = pn();
            if (e && m.themes && Array.isArray(m.themes) && !m.themes.includes(e)) throw Error(`Preferred theme not in provided themes array`);
            R = _n();
            let useMonacoResult = useMonaco(R);
            N = useMonacoResult.createEditor || N, Ze = useMonacoResult.createDiffEditor || Ze, Qe = useMonacoResult.updateCode || Qe, $e = useMonacoResult.updateDiff || $e, et = useMonacoResult.getEditor || et, P = useMonacoResult.getEditorView || P, F = useMonacoResult.getDiffEditorView || F, tt = useMonacoResult.cleanupEditor || tt, nt = useMonacoResult.safeClean || useMonacoResult.cleanupEditor || nt, rt = useMonacoResult.refreshDiffPresentation || rt, at = useMonacoResult.setTheme || at, Ge.value = true, !k && v.value && (yield ln(v.value));
          }
        } catch {
          if (k) return;
          mt.value = true;
        }
      });
      let U = l(typeof m.monacoOptions?.fontSize == `number` ? m.monacoOptions.fontSize : NaN),
        W = l(U.value),
        yt = h(() => {
          let e = U.value,
            t = W.value;
          return typeof e == `number` && Number.isFinite(e) && e > 0 && typeof t == `number` && Number.isFinite(t) && t > 0;
        }),
        bt = h(() => {
          let e = m.monacoOptions?.fontSize;
          if (typeof e == `number` && Number.isFinite(e) && e > 0) return e;
          let t = W.value;
          return typeof t == `number` && Number.isFinite(t) && t > 0 ? t : 14;
        }),
        xt = h(() => {
          let e = m.monacoOptions?.lineHeight;
          return typeof e == `number` && Number.isFinite(e) && e > 0 ? e : Math.max(12, Math.round(1.35 * bt.value));
        }),
        St = h(() => {
          let e = m.monacoOptions?.tabSize;
          return typeof e == `number` && Number.isFinite(e) && e > 0 ? e : 4;
        }),
        Ct = h(() => {
          let e = m.monacoOptions?.padding;
          return {
            top: typeof e?.top == `number` && Number.isFinite(e.top) && e.top > 0 ? e.top : 0,
            bottom: typeof e?.bottom == `number` && Number.isFinite(e.bottom) && e.bottom > 0 ? e.bottom : 0
          };
        }),
        G = h(() => {
          let estimatedContentHeightPx = m.estimatedContentHeightPx;
          return typeof estimatedContentHeightPx == `number` && Number.isFinite(estimatedContentHeightPx) && estimatedContentHeightPx > 0 ? estimatedContentHeightPx : null;
        }),
        wt = h(() => {
          let estimatedHeightPx = m.estimatedHeightPx;
          return typeof estimatedHeightPx == `number` && Number.isFinite(estimatedHeightPx) && estimatedHeightPx > 0 ? estimatedHeightPx : null;
        }),
        Tt = h(() => {
          let e = m.monacoOptions?.fontFamily;
          return x(x({
            fontSize: `${bt.value}px`,
            lineHeight: `${xt.value}px`,
            tabSize: St.value,
            boxSizing: `border-box`,
            maxHeight: `${Jt()}px`,
            overflow: `auto`,
            paddingTop: `${Ct.value.top}px`,
            paddingBottom: `${Ct.value.bottom}px`
          }, G.value == null ? {} : {
            height: `${G.value}px`,
            minHeight: `${G.value}px`
          }), typeof e == `string` && e.trim() ? {
            "--markstream-code-font-family": e.trim()
          } : {});
        }),
        Et = h(() => G.value != null && (!H.value || K() != null)),
        Dt = h(() => {
          if (Et.value) return {
            minHeight: `${G.value}px`
          };
        }),
        Ot = l(null);
      function K() {
        let e = Ot.value;
        return typeof e == `number` && Number.isFinite(e) && e > 0 ? Math.round(e) : null;
      }
      function kt(e, t = false) {
        let n = Math.ceil(e),
          r = K();
        return r == null ? n : n >= r ? (t && O.value && (Ot.value = null), n) : r;
      }
      function At() {
        return new Promise(e => {
          _(() => e());
        });
      }
      function jt() {
        var htmlPreviewSandbox;
        try {
          let t = z.value ? (htmlPreviewSandbox = F())?.getModifiedEditor?.call(htmlPreviewSandbox) ?? F() : P(),
            n = et()?.EditorOption?.fontInfo;
          if (t && n != null) {
            let e = t.getOption?.call(t, n)?.fontSize;
            if (typeof e == `number` && Number.isFinite(e) && e > 0) return e;
          }
        } catch {}
        try {
          let e = v.value;
          if (e) {
            let selector = e.querySelector(`.view-lines .view-line`);
            if (selector) try {
              if (typeof window < `u` && typeof window.getComputedStyle == `function`) {
                let fontSize = window.getComputedStyle(selector).fontSize,
                  n = fontSize && fontSize.match(/^(\d+(?:\.\d+)?)/);
                if (n) return Number.parseFloat(n[1]);
              }
            } catch {}
          }
        } catch {}
        return null;
      }
      function Mt(el) {
        try {
          let t = et()?.EditorOption?.lineHeight;
          if (t != null) {
            let n = el?.getOption?.call(el, t);
            if (typeof n == `number` && n > 0) return n;
          }
        } catch {}
        let t = function () {
          try {
            let e = v.value;
            if (!e) return null;
            let selector = e.querySelector(`.view-lines .view-line`);
            if (selector) {
              let e = Math.ceil(selector.getBoundingClientRect().height);
              if (e > 0) return e;
            }
          } catch {}
          return null;
        }();
        if (t && t > 0) return t;
        let n = Number.isFinite(W.value) && W.value > 0 ? W.value : 14;
        return Math.max(12, Math.round(1.35 * n));
      }
      function Nt(e) {
        try {
          let t = et()?.EditorOption?.padding;
          if (t != null) {
            let n = e?.getOption?.call(e, t),
              r = typeof n?.top == `number` ? n.top : 0,
              i = typeof n?.bottom == `number` ? n.bottom : 0;
            if (r > 0 || i > 0) return r + i;
          }
        } catch {}
        let t = V.value?.padding,
          n = typeof t?.top == `number` ? t.top : 0,
          r = typeof t?.bottom == `number` ? t.bottom : 0;
        return n > 0 || r > 0 ? n + r : z.value ? 24 : 0;
      }
      function Pt(e, t) {
        return typeof e != `number` || typeof t != `number` || e < 1 || t < e ? 0 : t - e + 1;
      }
      function Ft(text) {
        if (!text) return [];
        let parts = text.split(/\r?\n/);
        return parts.length === 1 && parts[0] === `` ? [] : parts;
      }
      function It() {
        z.value ? B.value = function (e, t) {
          let n = Ft(e),
            r = Ft(t),
            i = 0,
            a = n.length - 1,
            o = r.length - 1;
          for (; i <= a && i <= o && n[i] === r[i];) i++;
          for (; a >= i && o >= i && n[a] === r[o];) a--, o--;
          return {
            removed: Math.max(0, a - i + 1),
            added: Math.max(0, o - i + 1)
          };
        }(String(m.node.originalCode ?? ``), String(m.node.updatedCode ?? ``)) : B.value = {
          removed: 0,
          added: 0
        };
      }
      function Lt() {
        if (z.value) try {
          let e = F(),
            t = e?.getLineChanges?.call(e);
          if (!Array.isArray(t)) return void It();
          let n = 0,
            r = 0;
          for (let htmlPreviewSandbox of t) n += Pt(htmlPreviewSandbox.originalStartLineNumber, htmlPreviewSandbox.originalEndLineNumber), r += Pt(htmlPreviewSandbox.modifiedStartLineNumber, htmlPreviewSandbox.modifiedEndLineNumber);
          B.value = {
            removed: n,
            added: r
          };
        } catch {
          It();
        } else B.value = {
          removed: 0,
          added: 0
        };
      }
      function Rt() {
        if (Number.isFinite(W.value) && W.value > 0 && Number.isFinite(U.value)) return W.value;
        let e = jt();
        return typeof m.monacoOptions?.fontSize == `number` ? (U.value = m.monacoOptions.fontSize, W.value = m.monacoOptions.fontSize, W.value) : e && e > 0 ? (U.value = e, W.value = e, e) : (U.value = 12, W.value = 12, 12);
      }
      function zt() {
        let e = Rt(),
          t = Math.min(36, e + 1);
        W.value = t;
      }
      function Bt() {
        let e = Rt(),
          t = Math.max(10, e - 1);
        W.value = t;
      }
      function Vt() {
        Rt(), Number.isFinite(U.value) && (W.value = U.value);
      }
      function Ht() {
        var htmlPreviewSandbox, payload, n, parentElement, i;
        try {
          let a = z.value ? F() : null,
            o = z.value ? a : P();
          if (!o) return null;
          if (a?.getOriginalEditor && a?.getModifiedEditor) {
            let i = a.getOriginalEditor?.call(a),
              o = a.getModifiedEditor?.call(a);
            (htmlPreviewSandbox = i?.layout) == null || htmlPreviewSandbox.call(i), (payload = o?.layout) == null || payload.call(o);
            let fallbackValue = i?.getContentHeight?.call(i) || 0,
              c = o?.getContentHeight?.call(o) || 0,
              l = Math.max(fallbackValue, c);
            if (l > 0) return Math.ceil(l + 1);
            let u = (n = i?.getModel?.call(i))?.getLineCount?.call(n) || 1,
              d = (parentElement = o?.getModel?.call(o))?.getLineCount?.call(parentElement) || 1,
              f = Math.max(u, d),
              p = Math.max(Mt(i), Mt(o));
            return Math.ceil(f * (p + 1.5) + 0 + 1);
          }
          if (o?.getContentHeight) {
            (i = o?.layout) == null || i.call(o);
            let contentHeight = o.getContentHeight();
            if (contentHeight > 0) return Math.ceil(contentHeight + 1);
          }
          let s = o?.getModel?.call(o),
            c = 1;
          s && typeof s.getLineCount == `function` && (c = s.getLineCount());
          let l = Mt(o);
          return Math.ceil(c * (l + 1.5) + 0 + 1);
        } catch {
          return null;
        }
      }
      function Ut(items) {
        let trimmed = String(items ?? ``).trim(),
          n = trimmed.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i)?.[1];
        if (n) {
          let e = n.length === 3 ? n.split(``).map(item => `${item}${item}`).join(``) : n;
          return .2126 * Number.parseInt(e.slice(0, 2), 16) + .7152 * Number.parseInt(e.slice(2, 4), 16) + .0722 * Number.parseInt(e.slice(4, 6), 16);
        }
        let r = trimmed.match(/\d+(?:\.\d+)?/g);
        if (!r || r.length < 3) return null;
        let [i, a, o] = r.slice(0, 3).map(Number);
        return .2126 * i + .7152 * a + .0722 * o;
      }
      function Wt() {
        let e = v.value,
          t = Ee.value;
        if (!e || !t) return;
        let n = e,
          fallbackValue = e.querySelector(`.monaco-editor`) || e,
          fallbackValueValue = fallbackValue.querySelector(`.monaco-editor-background`) || fallbackValue,
          a = fallbackValue.querySelector(`.view-lines`) || fallbackValue,
          o = null,
          resolvedValue = null,
          c = null;
        try {
          typeof window < `u` && typeof window.getComputedStyle == `function` && (o = window.getComputedStyle(fallbackValue), resolvedValue = fallbackValueValue === fallbackValue ? o : window.getComputedStyle(fallbackValueValue), c = a === fallbackValue ? o : window.getComputedStyle(a));
        } catch {
          o = null, resolvedValue = null, c = null;
        }
        let trimmed = String(o?.getPropertyValue(`--vscode-editor-foreground`) ?? ``).trim(),
          u = String(o?.getPropertyValue(`--vscode-editor-background`) ?? ``).trim(),
          d = String(o?.getPropertyValue(`--vscode-editor-selectionBackground`) ?? o?.getPropertyValue(`--vscode-editor-hoverHighlightBackground`) ?? ``).trim(),
          trimmedValue = trimmed || String(c?.color ?? o?.color ?? ``).trim(),
          p = u || String(resolvedValue?.backgroundColor ?? o?.backgroundColor ?? ``).trim();
        z.value ? (trimmedValue ? (t.style.setProperty(`--markstream-diff-editor-fg`, trimmedValue), n.style.setProperty(`--vscode-editor-foreground`, trimmedValue), n.style.setProperty(`--stream-monaco-editor-fg`, trimmedValue)) : (t.style.removeProperty(`--markstream-diff-editor-fg`), n.style.removeProperty(`--vscode-editor-foreground`), n.style.removeProperty(`--stream-monaco-editor-fg`)), p ? (t.style.setProperty(`--markstream-diff-editor-bg`, p), t.style.setProperty(`--markstream-diff-panel-bg`, p), t.style.setProperty(`--markstream-diff-panel-bg-soft`, p), t.style.setProperty(`--markstream-diff-panel-bg-strong`, p), n.style.setProperty(`--vscode-editor-background`, p), n.style.setProperty(`--stream-monaco-editor-bg`, p), n.style.setProperty(`--stream-monaco-fixed-editor-bg`, p), n.style.setProperty(`--stream-monaco-panel-bg`, p), n.style.setProperty(`--stream-monaco-panel-bg-soft`, p), n.style.setProperty(`--stream-monaco-panel-bg-strong`, p), n.style.backgroundColor = p) : (t.style.removeProperty(`--markstream-diff-editor-bg`), t.style.removeProperty(`--markstream-diff-panel-bg`), t.style.removeProperty(`--markstream-diff-panel-bg-soft`), t.style.removeProperty(`--markstream-diff-panel-bg-strong`), n.style.removeProperty(`--vscode-editor-background`), n.style.removeProperty(`--stream-monaco-editor-bg`), n.style.removeProperty(`--stream-monaco-fixed-editor-bg`), n.style.removeProperty(`--stream-monaco-panel-bg`), n.style.removeProperty(`--stream-monaco-panel-bg-soft`), n.style.removeProperty(`--stream-monaco-panel-bg-strong`), n.style.backgroundColor = ``), d ? n.style.setProperty(`--vscode-editor-selectionBackground`, d) : n.style.removeProperty(`--vscode-editor-selectionBackground`)) : function (e, t, n) {
          if (!Oe.value) return false;
          let r = Ut(e),
            i = Ut(t);
          return n ? r != null && r > 170 || i != null && i < 110 : r != null && r < 85 || i != null && i > 190;
        }(p, trimmedValue, t.classList.contains(`is-dark`)) ? (n.style.removeProperty(`--vscode-editor-foreground`), n.style.removeProperty(`--vscode-editor-background`), n.style.removeProperty(`--vscode-editor-selectionBackground`)) : (trimmedValue && n.style.setProperty(`--vscode-editor-foreground`, trimmedValue), p && n.style.setProperty(`--vscode-editor-background`, p), d && n.style.setProperty(`--vscode-editor-selectionBackground`, d));
      }
      let Gt = /auto|scroll|overlay/i;
      function q(el, t, n) {
        if (typeof window > `u` || z.value) return;
        let r = Math.ceil(n) - Math.ceil(t);
        if (!r) return;
        let i = function (e) {
          if (typeof window > `u`) return null;
          let documentValue = e?.ownerDocument ?? document,
            fallbackValue = documentValue.scrollingElement || documentValue.documentElement || documentValue.body,
            r = e?.parentElement ?? null;
          for (; r && r !== documentValue.body && r !== fallbackValue;) {
            let computedStyle = window.getComputedStyle(r),
              lowercased = (computedStyle.overflowY || ``).toLowerCase(),
              toLowerCase = (computedStyle.overflow || ``).toLowerCase();
            if (Gt.test(lowercased) || Gt.test(toLowerCase)) return r;
            r = r.parentElement;
          }
          return fallbackValue;
        }(el);
        if (!i) return;
        let documentValue = el.ownerDocument ?? document,
          fallbackValue = i === documentValue.body || i === documentValue.documentElement || i === documentValue.scrollingElement,
          s = fallbackValue ? 0 : i.getBoundingClientRect().top;
        el.getBoundingClientRect().top - s >= 0 || (fallbackValue && typeof window.scrollBy == `function` ? window.scrollBy(0, r) : i.scrollTop += r);
      }
      function Kt() {
        try {
          let e = v.value;
          if (!e) return;
          let t = e.getBoundingClientRect().height,
            n = Ht();
          if (n != null && n > 0) {
            let r = kt(n, true),
              i = K();
            e.style.minHeight = i == null ? `0px` : `${i}px`, e.style.height = `${r}px`, e.style.maxHeight = `none`, e.style.overflow = `visible`, q(e, t, r);
            return;
          }
          let r = K();
          r != null && (e.style.minHeight = `${r}px`, e.style.height = `${r}px`, e.style.maxHeight = `none`, e.style.overflow = `visible`, q(e, t, r));
        } catch {}
      }
      function qt() {
        for (var htmlPreviewSandbox, payload; emptyItems.length > 0;) try {
          (payload = (htmlPreviewSandbox = emptyItems.pop())?.dispose) == null || payload.call(htmlPreviewSandbox);
        } catch {}
        Ke != null && (le(Ke), Ke = null);
      }
      function J() {
        for (var htmlPreviewSandbox; ot.length > 0;) try {
          (htmlPreviewSandbox = ot.pop()) == null || htmlPreviewSandbox();
        } catch {}
      }
      function Y(e = false) {
        T.value || (w.value ? Kt() : function () {
          try {
            let e = v.value;
            if (!e) return;
            let t = e.getBoundingClientRect().height,
              n = Jt(),
              r = Math.ceil(e.getBoundingClientRect?.call(e).height || 0),
              i = z.value ? function () {
                var htmlPreviewSandbox, payload;
                try {
                  let n = F(),
                    r = n?.getOriginalEditor?.call(n),
                    i = n?.getModifiedEditor?.call(n);
                  if (!r || !i) return null;
                  let fallbackValue = (htmlPreviewSandbox = r.getModel?.call(r))?.getLineCount?.call(htmlPreviewSandbox) || 1,
                    o = (payload = i.getModel?.call(i))?.getLineCount?.call(payload) || 1,
                    s = Math.max(fallbackValue, o),
                    c = Math.max(Mt(r), Mt(i)),
                    l = Math.max(Nt(r), Nt(i));
                  return Math.ceil(s * (c + 1.5) + l + 0 + 1);
                } catch {
                  return null;
                }
              }() : null,
              a = z.value && function (el) {
                if (typeof window > `u`) return false;
                let selectorAll = el.querySelectorAll(`.editor.modified .diff-hidden-lines .center, .stream-monaco-diff-unchanged-bridge`);
                for (let htmlPreviewSandbox of Array.from(selectorAll)) {
                  if (!(htmlPreviewSandbox instanceof HTMLElement)) continue;
                  let computedStyle = window.getComputedStyle(htmlPreviewSandbox);
                  if (computedStyle.display === `none` || computedStyle.visibility === `hidden` || Number.parseFloat(computedStyle.opacity || `1`) <= .01) continue;
                  let boundingClientRect = htmlPreviewSandbox.getBoundingClientRect();
                  if (!(boundingClientRect.width <= 0 || boundingClientRect.height <= 0)) return true;
                }
                return false;
              }(e);
            if (a || (j.value = null), Je > 0 && (Je--, A.value != null)) return void q(e, t, Q(e, A.value, n));
            let o = z.value ? function (el) {
                if (typeof window > `u`) return null;
                try {
                  let boundingClientRect = el.getBoundingClientRect();
                  if (boundingClientRect.height <= 0) return null;
                  let n = [`.editor.original .view-lines .view-line`, `.editor.modified .view-lines .view-line`, `.editor.original .view-zones > div`, `.editor.modified .view-zones > div`, `.editor.original .margin-view-zones > div`, `.editor.modified .margin-view-zones > div`, `.editor.original .diff-hidden-lines`, `.editor.modified .diff-hidden-lines`, `.stream-monaco-diff-unchanged-bridge`],
                    r = 0;
                  for (let i of Array.from(el.querySelectorAll(n.join(`,`)))) {
                    if (!(i instanceof HTMLElement)) continue;
                    let computedStyle = window.getComputedStyle(i);
                    if (computedStyle.display === `none` || computedStyle.visibility === `hidden` || Number.parseFloat(computedStyle.opacity || `1`) <= .01) continue;
                    let boundingClientRectResult = i.getBoundingClientRect();
                    boundingClientRectResult.height <= 0 || boundingClientRectResult.bottom <= boundingClientRect.top || (r = Math.max(r, boundingClientRectResult.bottom - boundingClientRect.top));
                  }
                  if (r > 0) return Math.ceil(r + 1);
                  let selector = el.querySelector(`.monaco-diff-editor`),
                    fallbackValue = selector?.getBoundingClientRect?.call(selector).height ?? 0;
                  return fallbackValue > 0 ? Math.ceil(fallbackValue + 1) : null;
                } catch {
                  return null;
                }
              }(e) : null,
              s = z.value ? a ? o : Math.max(o ?? 0, i ?? 0) || null : Ht();
            if (s != null && s > 0) {
              let i = j.value != null && Date.now() < qe && s >= n - 1,
                o = a && r > 0 && r < n - 1 && s >= n - 1,
                c = Q(e, i ? j.value : o ? r : s, n, {
                  clearEstimatedFloor: true
                });
              a && c < n - 1 && (j.value = c, qe = Date.now() + 160), q(e, t, c);
              return;
            }
            if (A.value != null) return void q(e, t, Q(e, A.value, n));
            let c = a ? r : Math.max(r, i != null && i > 0 ? i : 0);
            if (c > 0) {
              let i = j.value != null && Date.now() < qe && c >= n - 1,
                o = a && r > 0 && r < n - 1 && c >= n - 1,
                s = Q(e, i ? j.value : o ? r : c, n);
              a && s < n - 1 && (j.value = s, qe = Date.now() + 160), q(e, t, s);
              return;
            }
            let l = K();
            if (l != null) return void q(e, t, Q(e, l, n));
            let float = Number.parseFloat(e.style.height);
            !Number.isNaN(float) && float > 0 ? q(e, t, Q(e, float, n)) : z.value || q(e, t, Q(e, n, n));
          } catch {}
        }());
      }
      function X() {
        if (!z.value) return void J();
        let e = v.value;
        if (!e) return void J();
        let selector = e.querySelector(`.monaco-diff-editor`);
        if (!selector || selector.classList.contains(`side-by-side`)) return void J();
        let n = Array.from(selector.querySelectorAll(`.editor.original .diff-hidden-lines`)),
          r = Array.from(selector.querySelectorAll(`.editor.modified .diff-hidden-lines`)),
          i = Math.min(n.length, r.length);
        for (let e = 0; e < i; e++) {
          let t = r[e],
            selectorResult = t.querySelector(`a`),
            i = t.querySelector(`.center > div:first-child`),
            a = t.querySelector(`.center`);
          if (!selectorResult || !i || !a || a.querySelector(`.markstream-inline-fold-proxy`)) continue;
          let element = document.createElement(`button`);
          element.type = `button`, element.className = `markstream-inline-fold-proxy`, element.dataset.markstreamInlineFoldProxy = `true`;
          let fallbackValue = selectorResult.getAttribute(`title`) || `Show Unchanged Region`;
          element.title = fallbackValue, element.setAttribute(`aria-label`, fallbackValue);
          let c = event => {
              event.preventDefault(), event.stopPropagation();
            },
            l = event => {
              event.preventDefault(), event.stopPropagation(), selectorResult.click(), _(() => Z());
            },
            u = event => {
              event.key !== `Enter` && event.key !== ` ` || (event.preventDefault(), event.stopPropagation(), selectorResult.click(), _(() => Z()));
            };
          element.addEventListener(`mousedown`, c), element.addEventListener(`click`, l), element.addEventListener(`keydown`, u), a.appendChild(element), ot.push(() => {
            element.removeEventListener(`mousedown`, c), element.removeEventListener(`click`, l), element.removeEventListener(`keydown`, u), element.parentElement === a && a.removeChild(element);
          });
        }
      }
      function Z(e = false) {
        Ke ??= _(() => {
          Ke = null, _(() => {
            X(), Y(e);
          });
        });
      }
      function Q(el, t, n, r = {}) {
        let i = kt(Math.min(t, n), true === r.clearEstimatedFloor),
          a = K();
        if (el.style.minHeight = a == null ? `0px` : `${Math.min(a, Math.ceil(n))}px`, el.style.height = `${i}px`, el.style.maxHeight = `${Math.ceil(n)}px`, z.value) el.style.overflow = `hidden`;else {
          let r = t > n + 1;
          el.style.overflow = r ? `auto` : `hidden`;
        }
        return i;
      }
      function Jt() {
        let fallbackValue = m.monacoOptions?.MAX_HEIGHT ?? 500;
        if (typeof fallbackValue == `number`) return fallbackValue;
        let t = String(fallbackValue).match(/^(\d+(?:\.\d+)?)/);
        return t ? Number.parseFloat(t[1]) : 500;
      }
      let Yt = h(() => m.isShowPreview && (y.value === `html` || y.value === `svg`));
      a(() => m.node.language, e => {
        y.value = pe(e);
      }), a(() => [m.node.originalCode, m.node.updatedCode, z.value], () => {
        It(), _(() => Lt());
      }, {
        immediate: true
      }), a(() => [m.node.originalCode, m.node.updatedCode, b.value, z.value], e => C(null, [e], function* ([e, t, n, r]) {
        if (false === m.stream || !r) return;
        if (N && !E.value && v.value) try {
          yield ln(v.value);
        } catch {}
        let i = dt(String(e ?? ``), String(t ?? ``)),
          a = false === m.loading;
        if (a && vn(), yield $e(i.original, i.updated, b.value), a) {
          if (k || !z.value) return;
          rt(), X(), Lt(), Z();
        }
        w.value && _(() => Kt());
      })), a(() => m.node.code, e => C(null, null, function* () {
        if (false !== m.stream && (y.value ||= pe(it(e)), !z.value)) {
          if (N && !E.value && v.value) try {
            yield ln(v.value);
          } catch {}
          Qe(e, b.value), w.value && _(() => Kt());
        }
      }));
      let Xt = h(() => {
          let e = y.value;
          return e ? ye[e] || e.charAt(0).toUpperCase() + e.slice(1) : ye[``] || `Plain Text`;
        }),
        Zt = h(() => function (items) {
          let t = function (e) {
            let fallbackValue = String(e ?? ``).split(/\r?\n/, 1)[0]?.trim() ?? ``;
            if (fallbackValue.length < 3) return ``;
            let n = fallbackValue[0];
            if (n !== "`" && n !== `~` || fallbackValue[1] !== n || fallbackValue[2] !== n) return ``;
            let r = 3;
            for (; fallbackValue[r] === n;) r += 1;
            return fallbackValue.slice(r).trim();
          }(items);
          if (!t) return ``;
          let filtered = t.split(/\s+/).filter(Boolean);
          if (!filtered.length) return ``;
          let r = filtered[0] === `diff` ? filtered.slice(1) : filtered;
          for (let htmlPreviewSandbox of r) {
            let t = htmlPreviewSandbox.includes(`:`) ? htmlPreviewSandbox.slice(htmlPreviewSandbox.indexOf(`:`) + 1) : htmlPreviewSandbox;
            if (t && /[./\\-]/.test(t)) return t;
          }
          return ``;
        }(String(m.node.raw ?? ``))),
        Qt = h(() => Zt.value || Xt.value),
        $t = h(() => Zt.value ? z.value ? `Diff / ${Xt.value}` : Xt.value : ``),
        en = h(() => (me.value, ue(y.value || ``))),
        tn = h(() => {
          let e = {},
            t = e => {
              if (e != null) return typeof e == `number` ? `${e}px` : String(e);
            },
            n = t(m.minWidth),
            r = t(m.maxWidth);
          return n && (e.minWidth = n), r && (e.maxWidth = r), Et.value && (e.minHeight = `${wt.value ?? G.value}px`), z.value || (e.color = `var(--vscode-editor-foreground, var(--markstream-code-fallback-fg))`, e.backgroundColor = `var(--vscode-editor-background, var(--markstream-code-fallback-bg))`, e.borderColor = `var(--markstream-code-border-color)`), e;
        }),
        nn = h(() => false !== m.showTooltips);
      function rn() {
        return C(this, null, function* () {
          try {
            typeof navigator < `u` && navigator.clipboard && typeof navigator.clipboard.writeText == `function` && (yield navigator.clipboard.writeText(m.node.code)), De.value = true, se(`copy`, m.node.code), setTimeout(() => {
              De.value = false;
            }, 1e3);
          } catch (e) {
            console.error(`复制失败:`, e);
          }
        });
      }
      function an(event) {
        if (w.value = !w.value, event && nn.value) {
          let t = function (e) {
            let fallbackValue = e.currentTarget || e.target;
            return !fallbackValue || fallbackValue.disabled ? null : fallbackValue;
          }(event);
          if (t) {
            let e = w.value ? Te(`common.collapse`) || `Collapse` : Te(`common.expand`) || `Expand`;
            he(t, e, `top`, false, undefined, m.isDark);
          }
        }
        let t = z.value ? F() : P(),
          n = v.value;
        t && n && (w.value ? (cn(true), n.style.maxHeight = `none`, n.style.overflow = `visible`, Y(true)) : (cn(false), n.style.overflow = z.value ? `hidden` : `auto`, Y(true)));
      }
      function on() {
        var htmlPreviewSandbox, payload;
        if (T.value = !T.value, T.value) {
          if (v.value) {
            let t = Math.ceil((htmlPreviewSandbox = v.value).getBoundingClientRect?.call(htmlPreviewSandbox).height || 0);
            t > 0 && (A.value = t);
          }
          cn(false);
        } else {
          w.value && cn(true), v.value && A.value != null && (v.value.style.height = `${A.value}px`);
          let e = z.value ? F() : P();
          try {
            (payload = e?.layout) == null || payload.call(e);
          } catch {}
          Je = 2, _(() => {
            Y(true);
          });
        }
      }
      function sn() {
        if (!Yt.value) return;
        let e = y.value;
        if (we.value) {
          let t = e === `html` ? `text/html` : `image/svg+xml`,
            n = e === `html` ? Te(`artifacts.htmlPreviewTitle`) || `HTML Preview` : Te(`artifacts.svgPreviewTitle`) || `SVG Preview`;
          se(`previewCode`, {
            node: m.node,
            artifactType: t,
            artifactTitle: n,
            id: `temp-${e}-${Date.now()}`
          });
          return;
        }
        e === `html` && (vt.value = !vt.value);
      }
      function cn(e) {
        var payload, n;
        try {
          if (z.value) {
            let n = F();
            (payload = n?.updateOptions) == null || payload.call(n, {
              automaticLayout: e
            });
          } else {
            let t = P();
            (n = t?.updateOptions) == null || n.call(t, {
              automaticLayout: e
            });
          }
        } catch {}
      }
      function ln(e) {
        if (!N || k) return null;
        if (I) return I;
        if (E.value && O.value) return Promise.resolve();
        E.value = true;
        let t = C(null, null, function* () {
          yield function (e) {
            return C(this, null, function* () {
              if (typeof window > `u`) return yield e();
              try {
                let t = window.Element?.prototype,
                  n = t?.addEventListener;
                if (!t || !n) return yield e();
                let r = function () {
                  let windowAlias = window,
                    t = windowAlias[We];
                  if (t) return t;
                  let n = {
                    depth: 0,
                    original: null
                  };
                  return windowAlias[We] = n, n;
                }();
                r.depth === 0 && (r.original = n, t.addEventListener = function (e, t, i) {
                  let fallbackValue = r.original ?? n;
                  return e === `touchstart` && function (e, t) {
                    if (!e) return false;
                    let n = e;
                    return !(typeof n.closest != `function` || !n.closest(`.monaco-editor, .monaco-diff-editor`) || t && typeof t == `object` && `passive` in t);
                  }(this, i) ? fallbackValue.call(this, e, t, function (e) {
                    return e == null ? {
                      passive: true
                    } : typeof e == `boolean` ? {
                      capture: e,
                      passive: true
                    } : typeof e == `object` ? `passive` in e ? e : S(x({}, e), {
                      passive: true
                    }) : {
                      passive: true
                    };
                  }(i)) : fallbackValue.call(this, e, t, i);
                }), r.depth++;
                try {
                  return yield e();
                } finally {
                  r.depth = Math.max(0, r.depth - 1), r.depth === 0 && r.original && t.addEventListener !== r.original && (t.addEventListener = r.original, r.original = null);
                }
              } catch {
                return yield e();
              }
            });
          }(() => function (e) {
            return C(this, null, function* () {
              if (!N || k || (ht.value = false, H.value = false, function () {
                let e = G.value;
                Ot.value = O.value || e == null ? null : e;
              }(), qt(), J(), function (e) {
                e.replaceChildren();
              }(e), k)) return;
              if (z.value) {
                nt();
                let t = dt(String(m.node.originalCode ?? ``), String(m.node.updatedCode ?? ``));
                Ze ? yield Ze(e, t.original, t.updated, b.value) : yield N(e, m.node.code, b.value);
              } else yield N(e, m.node.code, b.value);
              if (k) return;
              let t = z.value ? F() : P();
              if (typeof m.monacoOptions?.fontSize == `number`) t?.updateOptions({
                fontSize: m.monacoOptions.fontSize,
                automaticLayout: false
              }), U.value = m.monacoOptions.fontSize, W.value = m.monacoOptions.fontSize;else {
                let e = jt();
                e && e > 0 ? (U.value = e, W.value = e) : (U.value = 12, W.value = 12);
              }
              w.value || T.value || Y(false), yield function () {
                return C(this, null, function* () {
                  K() != null && (X(), Y(false), yield ie(), yield At(), X(), Y(false), yield At(), X(), Y(false));
                });
              }(), k || (O.value = true, function () {
                if (qt(), z.value) {
                  let e = F(),
                    t = e?.getOriginalEditor?.call(e),
                    n = e?.getModifiedEditor?.call(e),
                    r = (e, t) => {
                      try {
                        let n = e?.[t];
                        if (typeof n != `function`) return;
                        let r = n.call(e, () => Z());
                        r && emptyItems.push(r);
                      } catch {}
                    };
                  try {
                    let t = e?.onDidUpdateDiff?.call(e, () => {
                      Z(), _(() => Lt());
                    });
                    t && emptyItems.push(t);
                  } catch {}
                  r(t, `onDidContentSizeChange`), r(n, `onDidContentSizeChange`), r(t, `onDidLayoutChange`), r(n, `onDidLayoutChange`);
                  return;
                }
                let e = P();
                try {
                  let t = e?.onDidContentSizeChange?.call(e, () => Z());
                  t && emptyItems.push(t);
                } catch {}
                try {
                  let t = e?.onDidLayoutChange?.call(e, () => Z());
                  t && emptyItems.push(t);
                } catch {}
              }(), Wt(), X(), Lt(), Z(), yield function () {
                return C(this, null, function* () {
                  X(), Y(false), yield ie(), yield At(), X(), Y(false), yield At(), X(), Y(false);
                });
              }(), k || (H.value = true));
            });
          }(e));
        }).finally(() => {
          I === t && (I = null);
        });
        return I = t, t;
      }
      a(nn, e => {
        e || ve();
      }), a(() => W.value, (e, t) => {
        let n = z.value ? F() : P();
        n && typeof e == `number` && Number.isFinite(e) && e > 0 && (n.updateOptions({
          fontSize: e
        }), T.value || Y(true));
      }, {
        flush: `post`,
        immediate: false
      });
      let un = a(() => [v.value, z.value, m.stream, m.loading, Ge.value, M.value], e => C(null, [e], function* ([e, t, n, r, i, a]) {
        if (!e || !N || !a || false === n && false !== r) return;
        let o = ln(e);
        if (o) {
          try {
            yield o;
          } catch {
            O.value = false, H.value = false, ht.value = true;
          }
          un();
        }
      }));
      function dn(e) {
        return !!e && typeof e == `object` && `light` in e && `dark` in e;
      }
      function $(e) {
        return typeof e == `string` ? e : e && typeof e == `object` && `name` in e ? String(e.name) : null;
      }
      function fn(e, t) {
        if (e === t) return true;
        let n = $(e),
          r = $(t);
        return !!n && n === r;
      }
      function pn() {
        let e = function () {
            if (m.theme !== undefined) {
              let theme = m.theme;
              return dn(theme) ? m.isDark ? theme.dark : theme.light : theme;
            }
            return m.isDark ? m.darkTheme : m.lightTheme;
          }(),
          t = V.value?.theme,
          fallbackValue = e ?? t;
        if (typeof fallbackValue == `object` && fallbackValue) return fallbackValue;
        let r = Array.isArray(m.themes) ? m.themes : [];
        if (!r.length || fallbackValue == null) return fallbackValue;
        let i = $(fallbackValue),
          filtered = r.map(item => $(item)).filter(item => !!item);
        if (!i || filtered.includes(i)) return fallbackValue;
        let o = $(t);
        return t != null && o && filtered.includes(o) ? t : r[0];
      }
      a(ft, (e, t) => C(null, null, function* () {
        if (e === t || (pt.value = e, !N || !v.value) || !E.value || false === m.stream && false !== m.loading || !M.value) return;
        let n = I;
        if (n) {
          try {
            yield n;
          } catch {}
          if (k || !v.value) return;
        }
        try {
          O.value = false, H.value = false, E.value = false, qt(), J(), nt(), yield ie(), yield ln(v.value);
        } catch {
          O.value = false, H.value = false, ht.value = true;
        }
      }));
      let mn = h(() => (m.theme === undefined ? fn(m.darkTheme, m.lightTheme) : !dn(m.theme)) ? function (e) {
          if (e && typeof e == `object` && e.colors?.[`editor.background`]) {
            let t = Ut(e.colors[`editor.background`]);
            if (t != null) return t < 128;
          }
          let lowercased = ($(e) ?? ``).toLowerCase();
          return lowercased ? [`dark`, `night`, `moon`, `black`, `dracula`, `mocha`, `frappe`, `macchiato`, `palenight`, `ocean`, `poimandres`, `monokai`, `laserwave`, `tokyo`, `slack-dark`, `rose-pine`, `github-dark`, `material-theme`, `one-dark`, `catppuccin-mocha`, `catppuccin-frappe`, `catppuccin-macchiato`].some(item => lowercased.includes(item)) && ![`light`, `latte`, `dawn`, `lotus`].some(item => lowercased.includes(item)) : !!m.isDark;
        }(pn()) : !!m.isDark),
        hn = h(() => {
          if (!z.value) return mn.value ? `dark` : `light`;
          let e = V.value?.diffAppearance;
          return e === `light` || e === `dark` ? e : mn.value ? `dark` : `light`;
        }),
        gn = h(() => z.value ? hn.value === `dark` : mn.value);
      function _n() {
        return S(x(S(x({
          wordWrap: `on`,
          wrappingIndent: `same`,
          themes: m.themes
        }, V.value || {}), {
          theme: pn()
        }), z.value ? {
          diffAppearance: hn.value
        } : {}), {
          onThemeChange() {
            Wt();
          }
        });
      }
      function vn() {
        let e = _n();
        if (!R) return R = e, R;
        for (let payload of Object.keys(R)) payload in e || delete R[payload];
        return Object.assign(R, e), R;
      }
      let yn = h(() => {
        var htmlPreviewSandbox, payload, n, parentElement, i;
        return JSON.stringify({
          diffLineStyle: V.value?.diffLineStyle ?? `background`,
          diffUnchangedRegionStyle: V.value?.diffUnchangedRegionStyle ?? `line-info`,
          diffHideUnchangedRegions: m.monacoOptions?.diffHideUnchangedRegions === undefined ? x({}, lt) : ut(m.monacoOptions.diffHideUnchangedRegions),
          renderSideBySide: (htmlPreviewSandbox = V.value?.renderSideBySide) == null || htmlPreviewSandbox,
          useInlineViewWhenSpaceIsLimited: (payload = V.value?.useInlineViewWhenSpaceIsLimited) == null || payload,
          enableSplitViewResizing: (n = V.value?.enableSplitViewResizing) == null || n,
          ignoreTrimWhitespace: (parentElement = V.value?.ignoreTrimWhitespace) == null || parentElement,
          originalEditable: (i = V.value?.originalEditable) != null && i
        });
      });
      return a(() => [m.monacoOptions, M.value], () => {
        var htmlPreviewSandbox;
        if (vn(), !N || !M.value) return;
        let t = z.value ? F() : P(),
          n = typeof m.monacoOptions?.fontSize == `number` ? m.monacoOptions.fontSize : Number.isFinite(W.value) ? W.value : undefined;
        typeof n == `number` && Number.isFinite(n) && n > 0 && ((htmlPreviewSandbox = t?.updateOptions) == null || htmlPreviewSandbox.call(t, {
          fontSize: n
        })), Y(false);
      }, {
        deep: true
      }), a(() => [pn(), hn.value, Ge.value, E.value, M.value], ([e], t) => {
        Ge.value && E.value && M.value && function (e = {}) {
          if (e.appearanceOnly) return;
          vn();
          let t = pn(),
            n = () => {
              z.value && rt(), _(() => {
                Wt(), Z();
              });
            };
          t ? function (e, t) {
            let n = function (e) {
              if (e == null) return null;
              if (typeof e == `string`) return e;
              if (typeof e == `object` && `name` in e) return String(e.name);
              if (typeof e == `object`) {
                let t = Fe.get(e);
                if (t) return t;
                try {
                  let serialized = JSON.stringify(e);
                  if (serialized) return Fe.set(e, serialized), serialized;
                } catch {}
                let n = `__theme_` + ++Ie;
                return Fe.set(e, n), n;
              }
              return String(e);
            }(t);
            return n ? (Pe = e, Ae || Ne !== n ? Ae ? (D === n || je === n || (Me = t, D = n), Ae) : (Me = t, D = n, Ae = C(null, null, function* () {
              for (; D && Me != null;) {
                let t = Me,
                  n = D;
                if (Me = null, D = null, Ne !== n) try {
                  je = n, yield (Pe ?? e)(t), Ne = n;
                } catch {}
              }
            }).finally(() => {
              Ae = null, je = null;
            }), Ae) : Promise.resolve()) : Promise.resolve();
          }(at, t).then(n).catch(err => {}) : n();
        }({
          appearanceOnly: t != null && fn(e, t[0])
        });
      }, {
        flush: `post`
      }), a(() => [yn.value, Ge.value, M.value], (e, t) => C(null, [e, t], function* ([e, t, n], [r]) {
        if (vn(), !t || !n || !N || !v.value || !E.value || e === r || false === m.stream && false !== m.loading) return;
        let i = I;
        if (i) {
          try {
            yield i;
          } catch {}
          if (k || !v.value) return;
        }
        try {
          O.value = false, H.value = false, E.value = false, qt(), J(), nt(), yield ie(), yield ln(v.value);
        } catch {
          O.value = false, H.value = false, ht.value = true;
        }
      }), {
        flush: `post`
      }), a(() => [m.loading, M.value], (e, t) => C(null, [e, t], function* ([e, t], n) {
        if (!t || e) return;
        let r = n?.[0],
          i = r !== undefined && false !== r;
        yield ie(), _(() => {
          C(null, null, function* () {
            try {
              if (i && E.value) {
                if (z.value && v.value) {
                  let e = I;
                  if (e) try {
                    yield e;
                  } catch {}
                  vn();
                  let t = dt(String(m.node.originalCode ?? ``), String(m.node.updatedCode ?? ``));
                  if (yield $e(t.original, t.updated, b.value), k || !z.value) return;
                  rt(), X(), Lt();
                } else Qe(String(m.node.code ?? ``), b.value);
              }
              Y(false);
            } catch {}
          });
        });
      }), {
        immediate: true,
        flush: `post`
      }), ee(() => {
        qt(), J(), tt();
      }), (a, l) => mt.value ? (d(), c(t(fe), {
        key: 0,
        node: m.node,
        loading: m.loading
      }, null, 8, [`node`, `loading`])) : (d(), i(`div`, {
        key: 1,
        ref_key: `container`,
        ref: Ee,
        style: te(tn.value),
        class: e([`code-block-container rounded-lg border`, [{
          dark: m.isDark,
          "is-rendering": m.loading,
          "is-dark": gn.value,
          "is-diff": z.value,
          "is-plain-text": Oe.value
        }]]),
        "data-markstream-code-block": `1`,
        "data-markstream-enhanced": H.value && !mt.value ? `true` : `false`
      }, [p(_e, {
        "show-header": m.showHeader,
        "show-collapse-button": m.showCollapseButton,
        "show-font-size-buttons": m.showFontSizeButtons,
        "enable-font-size-control": m.enableFontSizeControl,
        "show-copy-button": m.showCopyButton,
        "show-expand-button": m.showExpandButton,
        "show-preview-button": m.showPreviewButton,
        "show-tooltips": m.showTooltips,
        "is-dark": m.isDark,
        loading: m.loading,
        stream: u.stream,
        "is-collapsed": T.value,
        "is-expanded": w.value,
        "copy-text": De.value,
        "is-previewable": Yt.value,
        "code-font-size": W.value,
        "code-font-min": 10,
        "code-font-max": 36,
        "default-code-font-size": U.value,
        "font-baseline-ready": yt.value,
        "diff-stats": z.value ? B.value : null,
        "diff-stats-aria-label": st.value,
        onToggleCollapse: on,
        onDecreaseFont: Bt,
        onResetFont: Vt,
        onIncreaseFont: zt,
        onCopy: rn,
        onToggleExpand: an,
        onPreview: sn
      }, r({
        "header-left": o(() => [n(a.$slots, `header-left`, {}, () => [g(`div`, Re, [g(`span`, {
          class: `icon-slot h-4 w-4 flex-shrink-0`,
          innerHTML: en.value
        }, null, 8, ze), g(`div`, Be, [g(`div`, Ve, re(Qt.value), 1), $t.value ? (d(), i(`div`, He, re($t.value), 1)) : ae(``, true)])])], true)]),
        loading: o(() => [n(a.$slots, `loading`, {
          loading: u.loading,
          stream: u.stream
        }, () => [l[0] ||= g(`div`, {
          class: `loading-skeleton`
        }, [g(`div`, {
          class: `skeleton-line`
        }), g(`div`, {
          class: `skeleton-line`
        }), g(`div`, {
          class: `skeleton-line short`
        })], -1)], true)]),
        default: o(() => [s(g(`div`, Ue, [g(`div`, {
          ref_key: `codeEditor`,
          ref: v,
          class: e([`code-editor-container`, [u.stream ? `` : `code-height-placeholder`, {
            "is-hidden": _t.value
          }]]),
          style: te(Dt.value)
        }, null, 6), _t.value ? (d(), c(t(fe), {
          key: 0,
          class: e([`code-pre-fallback`, {
            "is-wrap": gt.value
          }]),
          style: te(Tt.value),
          node: m.node
        }, null, 8, [`class`, `style`, `node`])) : ae(``, true)], 512), [[ce, !(T.value || !u.stream && u.loading)]]), vt.value && !we.value && Yt.value && y.value === `html` ? (d(), c(ke, {
          key: 0,
          code: m.node.code,
          "html-preview-allow-scripts": m.htmlPreviewAllowScripts,
          "html-preview-sandbox": m.htmlPreviewSandbox,
          "is-dark": m.isDark,
          "on-close": () => vt.value = false
        }, null, 8, [`code`, `html-preview-allow-scripts`, `html-preview-sandbox`, `is-dark`, `on-close`])) : ae(``, true)]),
        _: 2
      }, [a.$slots[`header-right`] ? {
        name: `header-right`,
        fn: o(() => [n(a.$slots, `header-right`, {}, undefined, true)]),
        key: `0`
      } : undefined]), 1032, [`show-header`, `show-collapse-button`, `show-font-size-buttons`, `enable-font-size-control`, `show-copy-button`, `show-expand-button`, `show-preview-button`, `show-tooltips`, `is-dark`, `loading`, `stream`, `is-collapsed`, `is-expanded`, `copy-text`, `is-previewable`, `code-font-size`, `default-code-font-size`, `font-baseline-ready`, `diff-stats`, `diff-stats-aria-label`])], 14, Le));
    }
  }), [[`__scopeId`, `data-v-b7ce948c`]]);
export { O as default };