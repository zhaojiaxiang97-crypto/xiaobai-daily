import { $n as vueN, An as vueAn, Ct as vueCt, Nt as vueNt, S as vueS, Wt as vueWt, Yt as vueYt, Zt as vueZt, b as vueB, bn as vueBn, f as vueF, gt as vueGt, j as vueJ, k as vueK, mt as vueMt, nr as vueNr, nt as ae, ot as vueOt, rr as vueRr, rt as vueRt, ut as vueUt, v as vueV, x as vueX, y as vueY } from "../chunks/vue-i18n.runtime.js";
import { E as playerE, r as playerR, w as playerW } from "../i18n/en-US-player.js";
import { A as mainA, B as mainB, C as mainC, N as mainN, P as mainP, T as mainT, U as mainU, V as mainV, X as mainX, Y as mainY, _ as main, b as Se, j as mainJ, v as we, y as Te } from "../chunks/main.js";
var defineProperty = Object.defineProperty,
  defineProperties = Object.defineProperties,
  getOwnPropertyDescriptors = Object.getOwnPropertyDescriptors,
  getOwnPropertySymbols = Object.getOwnPropertySymbols,
  hasOwnProperty = Object.prototype.hasOwnProperty,
  propertyIsEnumerable = Object.prototype.propertyIsEnumerable,
  handler = (e, t, n) => t in e ? defineProperty(e, t, {
    enumerable: true,
    configurable: true,
    writable: true,
    value: n
  }) : e[t] = n,
  Ae = (e, t) => {
    for (var width in t ||= {}) hasOwnProperty.call(t, width) && handler(e, width, t[width]);
    if (getOwnPropertySymbols) for (var width of getOwnPropertySymbols(t)) propertyIsEnumerable.call(t, width) && handler(e, width, t[width]);
    return e;
  },
  y = (e, t, n) => new Promise((fn, i) => {
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
  je = [`data-markstream-mode`],
  Me = {
    key: 0,
    class: `mermaid-block-header flex items-center justify-between border-b px-[var(--ms-inset-panel-x)] py-[var(--ms-inset-panel-y)]`
  },
  Ne = {
    key: 0
  },
  Pe = {
    key: 1,
    class: `flex items-center gap-x-2 overflow-hidden`
  },
  Fe = [`innerHTML`],
  Ie = {
    key: 2
  },
  Le = {
    key: 3,
    class: `mermaid-mode-toggle-group flex items-center gap-0.5`
  },
  Re = {
    class: `flex items-center gap-x-1`
  },
  ze = {
    class: `flex items-center gap-x-1`
  },
  Be = {
    key: 4
  },
  Ve = {
    key: 5,
    class: `mermaid-header-actions flex items-center`
  },
  He = [`aria-pressed`],
  Ue = {
    key: 0,
    xmlns: `http://www.w3.org/2000/svg`,
    "xmlns:xlink": `http://www.w3.org/1999/xlink`,
    "aria-hidden": `true`,
    role: `img`,
    width: `1em`,
    height: `1em`,
    viewBox: `0 0 24 24`,
    class: `action-icon`
  },
  We = {
    key: 1,
    xmlns: `http://www.w3.org/2000/svg`,
    "xmlns:xlink": `http://www.w3.org/1999/xlink`,
    "aria-hidden": `true`,
    role: `img`,
    width: `1em`,
    height: `1em`,
    viewBox: `0 0 24 24`,
    class: `action-icon`
  },
  Ge = [`aria-label`, `disabled`],
  Ke = [`aria-label`, `disabled`],
  options = {
    key: 0,
    xmlns: `http://www.w3.org/2000/svg`,
    "xmlns:xlink": `http://www.w3.org/1999/xlink`,
    "aria-hidden": `true`,
    role: `img`,
    width: `1em`,
    height: `1em`,
    viewBox: `0 0 24 24`,
    class: `action-icon`
  },
  Je = {
    key: 1,
    xmlns: `http://www.w3.org/2000/svg`,
    "xmlns:xlink": `http://www.w3.org/1999/xlink`,
    "aria-hidden": `true`,
    role: `img`,
    width: `1em`,
    height: `1em`,
    viewBox: `0 0 24 24`,
    class: `action-icon`
  },
  Ye = {
    key: 0,
    class: `mermaid-source-panel`
  },
  Xe = {
    class: `mermaid-source-code text-sm font-mono whitespace-pre-wrap`
  },
  Ze = {
    key: 1,
    class: `relative`
  },
  Qe = {
    key: 0,
    class: `absolute top-2 right-2 z-10 rounded-lg`
  },
  $e = {
    class: `flex items-center gap-2 backdrop-blur rounded-lg`
  },
  et = {
    class: `dialog-panel mermaid-modal-panel relative w-full h-full max-w-full max-h-full rounded overflow-hidden`
  },
  tt = {
    class: `absolute top-6 right-6 z-50 flex items-center gap-2`
  },
  nt = `mermaid-action-btn p-[var(--ms-action-btn-padding)] rounded`,
  b = we(vueJ({
    __name: `MermaidBlockNode`,
    props: {
      node: {},
      maxHeight: {
        default: undefined
      },
      estimatedPreviewHeightPx: {},
      loading: {
        type: Boolean,
        default: true
      },
      isDark: {
        type: Boolean
      },
      workerTimeoutMs: {
        default: 1400
      },
      parseTimeoutMs: {
        default: 1800
      },
      renderTimeoutMs: {
        default: 2500
      },
      fullRenderTimeoutMs: {
        default: 4e3
      },
      renderDebounceMs: {
        default: 300
      },
      contentStableDelayMs: {
        default: 500
      },
      previewPollDelayMs: {
        default: 800
      },
      previewPollMaxDelayMs: {
        default: 4e3
      },
      previewPollMaxAttempts: {
        default: 12
      },
      showHeader: {
        type: Boolean,
        default: true
      },
      showModeToggle: {
        type: Boolean,
        default: true
      },
      showCopyButton: {
        type: Boolean,
        default: true
      },
      showExportButton: {
        type: Boolean,
        default: true
      },
      showFullscreenButton: {
        type: Boolean,
        default: true
      },
      showCollapseButton: {
        type: Boolean,
        default: true
      },
      showZoomControls: {
        type: Boolean,
        default: true
      },
      enableWheelZoom: {
        type: Boolean,
        default: false
      },
      isStrict: {
        type: Boolean,
        default: true
      },
      showTooltips: {
        type: Boolean,
        default: true
      },
      onRenderError: {}
    },
    emits: [`copy`, `export`, `openModal`, `toggleMode`],
    setup(props, {
      emit: emit
    }) {
      let propsAlias = props,
        emitAlias = emit,
        Oe = {
          USE_PROFILES: {
            svg: true
          },
          FORBID_TAGS: [`script`],
          FORBID_ATTR: [/^on/i],
          ADD_TAGS: [`style`],
          ADD_ATTR: [`style`],
          SAFE_FOR_TEMPLATES: true
        },
        ke = typeof window < `u` && Se(),
        v = vueBn(ke),
        b = vueV(() => propsAlias.isStrict ? `strict` : `loose`),
        rt = vueV(() => ({
          startOnLoad: false,
          securityLevel: b.value,
          dompurifyConfig: b.value === `strict` ? Oe : undefined,
          flowchart: b.value === `strict` ? {
            htmlLabels: false
          } : undefined
        })),
        it = [/javascript:/i, /expression\s*\(/i, /url\s*\(\s*javascript:/i, /@import/i],
        at = /^(?:https?:|mailto:|tel:|#|\/|data:image\/(?:png|gif|jpe?g|webp);)/i;
      function ot(text) {
        if (!text) return ``;
        let trimmed = text.trim();
        return at.test(trimmed) ? trimmed : ``;
      }
      function x(el) {
        if (el) try {
          el.replaceChildren();
        } catch {
          el.innerHTML = ``;
        }
      }
      function S(el, t) {
        if (!el) return ``;
        if (b.value === `strict`) return function (e, t) {
          if (!e) return ``;
          try {
            e.replaceChildren();
          } catch {
            e.innerHTML = ``;
          }
          let n = function (e) {
            if (typeof window > `u` || typeof DOMParser > `u` || !e) return null;
            let replaced = e.replace(/["']\s*javascript:/gi, `#`).replace(/\bjavascript:/gi, `#`).replace(/["']\s*vbscript:/gi, `#`).replace(/\bvbscript:/gi, `#`).replace(/\bdata:text\/html/gi, `#`),
              documentElement = new DOMParser().parseFromString(replaced, `image/svg+xml`).documentElement;
            if (!documentElement || documentElement.nodeName.toLowerCase() !== `svg`) return null;
            let documentElementAlias = documentElement;
            return function (e) {
              let t = new Set([`script`]),
                n = [e, ...Array.from(e.querySelectorAll(`*`))];
              for (let value of n) {
                if (t.has(value.tagName.toLowerCase())) {
                  value.remove();
                  continue;
                }
                let n = Array.from(value.attributes);
                for (let payload of n) {
                  let n = payload.name;
                  if (/^on/i.test(n)) value.removeAttribute(n);else {
                    if (n === `style` && payload.value) {
                      let r = payload.value;
                      if (it.some(item => item.test(r))) {
                        value.removeAttribute(n);
                        continue;
                      }
                    }
                    if ((n === `href` || n === `xlink:href`) && payload.value) {
                      let r = ot(payload.value);
                      if (!r) {
                        value.removeAttribute(n);
                        continue;
                      }
                      r !== payload.value && value.setAttribute(n, r);
                    }
                  }
                }
              }
            }(documentElementAlias), documentElementAlias;
          }(t);
          return n ? (e.appendChild(n), e.innerHTML) : ``;
        }(el, t);
        try {
          el.replaceChildren();
        } catch {
          el.innerHTML = ``;
        }
        if (t) try {
          el.insertAdjacentHTML(`afterbegin`, t);
        } catch {
          el.innerHTML = t;
        }
        return el.innerHTML;
      }
      function st(count) {
        if (!count || typeof DOMParser > `u`) return !count;
        let documentElement = new DOMParser().parseFromString(count, `image/svg+xml`).documentElement;
        if (!documentElement || documentElement.nodeName.toLowerCase() !== `svg`) return true;
        let attribute = documentElement.getAttribute(`viewBox`);
        if (attribute) {
          let parts = attribute.trim().split(/[\s,]+/);
          if (parts.length === 4) {
            let float = Number.parseFloat(parts[2] || ``),
              floatResult = Number.parseFloat(parts[3] || ``);
            if (!Number.isFinite(float) || !Number.isFinite(floatResult) || float <= 0 || floatResult <= 0) return true;
          }
        }
        let r = [documentElement, ...Array.from(documentElement.querySelectorAll(`*`))];
        for (let value of r) for (let payload of Array.from(value.attributes)) if (/\bNaN\b/i.test(payload.value) || payload.name === `style` && /max-width:\s*0(?:px)?/i.test(payload.value)) return true;
        return false;
      }
      let {
        t: translate
      } = mainP();
      function ct() {
        return y(this, null, function* () {
          try {
            let e = yield mainC();
            return v.value = !!e, e;
          } catch (e) {
            throw v.value = false, e;
          }
        });
      }
      let lt = vueBn(false),
        w = vueBn(false),
        T = vueBn(),
        E = vueBn(),
        D = vueBn(),
        ut = vueBn(null),
        dt = mainX(),
        ft = vueBn(null),
        pt = vueBn(typeof window > `u`),
        mt = vueBn(),
        O = vueV(() => propsAlias.node.code.replace(/\]::([^:])/g, `]:::$1`).replace(/:::subgraphNode$/gm, `::subgraphNode`));
      function ht() {
        return `${function (e) {
          let t = function () {
              let e = T.value ? getComputedStyle(T.value).getPropertyValue(`--ms-size-diagram-min-height`).trim() : ``;
              return main(e) ?? 360;
            }(),
            n = an();
          return mainU(e, t, n);
        }(main(propsAlias.estimatedPreviewHeightPx) ?? mainA(O.value))}px`;
      }
      let k = vueBn(1),
        A = vueBn(0),
        j = vueBn(0),
        gt = vueBn(false),
        _t = vueBn({
          x: 0,
          y: 0
        }),
        M = vueBn(!ke),
        vt = vueBn(false),
        N = vueBn(false),
        yt = vueBn(null),
        bt = vueBn(0),
        xt = vueBn(false),
        St = vueV(() => Math.max(0, propsAlias.renderDebounceMs ?? 300)),
        Ct = vueV(() => Math.max(0, propsAlias.contentStableDelayMs ?? 500)),
        wt = vueV(() => Math.max(120, propsAlias.previewPollDelayMs ?? 800)),
        Tt = vueV(() => Math.max(wt.value, propsAlias.previewPollMaxDelayMs ?? 4e3)),
        Et = vueV(() => Math.max(1, Math.trunc(propsAlias.previewPollMaxAttempts ?? 12))),
        P = vueV(() => false !== propsAlias.loading),
        Dt = null,
        Ot = null,
        kt = null,
        At = 0,
        fallbackValue = globalThis.requestIdleCallback ?? ((e, t) => setTimeout(() => e({
          didTimeout: true
        }), 16));
      function F() {
        return pt.value && !w.value;
      }
      function Mt() {
        kt != null && (globalThis.clearTimeout(kt), kt = null);
      }
      function Nt() {
        Mt(), kt = globalThis.setTimeout(() => {
          kt = null, F() && fallbackValue(() => {
            F() && Cn();
          }, {
            timeout: 500
          });
        }, St.value);
      }
      function Pt() {
        Ot != null && (globalThis.clearTimeout(Ot), Ot = null);
      }
      function Ft(e = 600) {
        if (typeof globalThis > `u`) return;
        let t = Math.max(0, e);
        Pt(), Ot = globalThis.setTimeout(() => {
          Ot = null, propsAlias.loading || N.value || !F() ? Ft(Math.min(1200, Math.max(300, 1.2 * t))) : Nt();
        }, t);
      }
      let I = vueBn(ht()),
        L = null,
        R = vueBn(false),
        It = vueBn(false),
        z = vueBn({}),
        Lt = vueBn(null),
        B = vueBn(``),
        Rt = vueBn(0),
        V = null,
        H = vueBn(false),
        U = vueBn({
          zoom: 1,
          translateX: 0,
          translateY: 0,
          containerHeight: I.value
        }),
        zt = vueV(() => propsAlias.enableWheelZoom ? {
          wheel: hn
        } : {}),
        W = vueV(() => ({
          worker: propsAlias.workerTimeoutMs ?? 1400,
          parse: propsAlias.parseTimeoutMs ?? 1800,
          render: propsAlias.renderTimeoutMs ?? 2500,
          fullRender: propsAlias.fullRenderTimeoutMs ?? 4e3
        })),
        Bt = globalThis.cancelIdleCallback ?? (e => clearTimeout(e)),
        Vt = null,
        Ht = null,
        G = false,
        K = wt.value,
        q = null,
        Ut = 0,
        Wt = true,
        Gt = 0;
      function Kt(e, t) {
        let n = t?.timeoutMs,
          r = t?.signal;
        if (r?.aborted) return Promise.reject(new DOMException(`Aborted`, `AbortError`));
        let i = null,
          a = false,
          o = null;
        return new Promise((t, s) => {
          let c = () => {
            i != null && clearTimeout(i), o && r && r.removeEventListener(`abort`, o);
          };
          n && n > 0 && (i = globalThis.setTimeout(() => {
            a || (a = true, c(), s(Error(`Operation timed out`)));
          }, n)), r && (o = () => {
            a || (a = true, c(), s(new DOMException(`Aborted`, `AbortError`)));
          }, r.addEventListener(`abort`, o)), e().then(result => {
            a || (a = true, c(), t(result));
          }).catch(err => {
            a || (a = true, c(), s(err));
          });
        });
      }
      function qt(e) {
        if (typeof document > `u` || !E.value) return;
        if (typeof propsAlias.onRenderError == `function` && true === propsAlias.onRenderError(e, O.value, E.value)) return H.value = true, void $();
        let element = document.createElement(`div`);
        element.style.padding = `var(--ms-inset-panel-body)`, element.style.color = `hsl(var(--ms-destructive))`, element.textContent = `Failed to render diagram: `;
        let elementResult = document.createElement(`span`);
        elementResult.textContent = e instanceof Error ? e.message : `Unknown error`, element.appendChild(elementResult), x(E.value), E.value.appendChild(element);
        let r = E.value ? getComputedStyle(E.value).getPropertyValue(`--ms-size-diagram-min-height`).trim() : ``;
        I.value = r || `360px`, H.value = true, $();
      }
      typeof window < `u` && vueWt(() => T.value, e => {
        var payload;
        if ((payload = ft.value) == null || payload.destroy(), ft.value = null, !e) return void (pt.value = false);
        let n = dt(e, {
          rootMargin: `400px`
        });
        ft.value = n, pt.value = n.isVisible.value, n.whenVisible.then(() => {
          pt.value = true;
        });
      }, {
        immediate: true
      }), vueOt(() => {
        var value;
        (value = ft.value) == null || value.destroy(), ft.value = null, Mt();
      });
      let Jt = vueV(() => false !== propsAlias.showTooltips);
      function Yt(e) {
        return !e || e.disabled;
      }
      function J(event, t, n = `top`) {
        if (!Jt.value || Yt(event.currentTarget)) return;
        let eventAlias = event,
          i = eventAlias?.clientX != null && eventAlias?.clientY != null ? {
            x: eventAlias.clientX,
            y: eventAlias.clientY
          } : undefined;
        mainN(event.currentTarget, t, n, false, i, propsAlias.isDark);
      }
      function Y() {
        Jt.value && mainV();
      }
      function Xt(event) {
        if (!Jt.value || Yt(event.currentTarget)) return;
        let t = lt.value ? translate(`common.copied`) || `Copied` : translate(`common.copy`) || `Copy`,
          eventAlias = event,
          r = eventAlias?.clientX != null && eventAlias?.clientY != null ? {
            x: eventAlias.clientX,
            y: eventAlias.clientY
          } : undefined;
        mainN(event.currentTarget, t, `top`, false, r, propsAlias.isDark);
      }
      function Zt(e, t) {
        let n = `%%{init: {"theme": "${t === `dark` ? `dark` : `default`}"}}%%\n`;
        return e.trimStart().startsWith(`%%{`) ? e : n + e;
      }
      function Qt() {
        return Wt && !M.value && !R.value && !H.value;
      }
      function $t(text) {
        let trimmed = text.trim();
        return !(!trimmed || trimmed.startsWith(`%%`)) && !/^(?:gantt|title|dateformat|axisformat|tickinterval|excludes|section|todaymarker|topaxis|weekday|weekend|acctitle|accdescr|accdescrmultiline)\b/i.test(trimmed) && trimmed.includes(`:`);
      }
      function en(text) {
        if (mainY(text) === `gantt`) return function (e) {
          let parts = e.split(/\r?\n/);
          for (!/\r?\n$/.test(e) && parts.length > 0 && parts.pop(); parts.length > 0;) {
            let e = parts[parts.length - 1]?.trim();
            if (e && !e.startsWith(`%%`)) {
              if ($t(e)) break;
              parts.pop();
            } else parts.pop();
          }
          return parts.some($t) ? parts.join(`
`) : ``;
        }(text);
        let parts = text.split(/\r?\n/);
        for (; parts.length > 0;) {
          let e = parts[parts.length - 1].trimEnd();
          if (e !== ``) {
            if (!(/^[-=~>|<\s]+$/.test(e.trim()) || /(?:--|==|~~|->|<-|-\||-\)|-x|o-|\|-|\.-)\s*$/.test(e) || /[-|><]$/.test(e) || /(?:graph|flowchart|sequenceDiagram|classDiagram|stateDiagram|erDiagram|gantt)\s*$/i.test(e))) break;
            parts.pop();
          } else parts.pop();
        }
        return parts.join(`
`);
      }
      function tn(e, t, n) {
        return y(this, null, function* () {
          try {
            return yield mainT(e, t, n?.timeoutMs ?? W.value.worker);
          } catch {
            return yield function (e, t, n) {
              return y(this, null, function* () {
                let r = yield ct();
                if (!r) return;
                let i = r,
                  a = Zt(e, t);
                if (typeof i.parse == `function`) return yield Kt(() => i.parse(a), {
                  timeoutMs: n?.timeoutMs ?? W.value.parse,
                  signal: n?.signal
                }), true;
                let o = `mermaid-parse-${Math.random().toString(36).slice(2, 9)}`;
                return yield Kt(() => r.render(o, a), {
                  timeoutMs: n?.timeoutMs ?? W.value.render,
                  signal: n?.signal
                }), true;
              });
            }(e, t, n);
          }
        });
      }
      function nn(e, t, n) {
        return y(this, null, function* () {
          if (mainY(e) === `gantt`) {
            let r = en(e);
            if (!r.trim()) return {
              fullOk: false,
              prefixOk: false
            };
            try {
              if (yield tn(r, t, n)) return r === e ? {
                fullOk: true,
                prefixOk: false
              } : {
                fullOk: false,
                prefixOk: true,
                prefix: r
              };
            } catch (e) {
              if (e?.name === `AbortError`) throw e;
            }
            return {
              fullOk: false,
              prefixOk: false
            };
          }
          try {
            if (yield tn(e, t, n)) return {
              fullOk: true,
              prefixOk: false
            };
          } catch (e) {
            if (e?.name === `AbortError`) throw e;
          }
          let r = en(e);
          if (r && r.trim() && r !== e) try {
            try {
              let i = yield mainJ(e, t, n?.timeoutMs ?? W.value.worker);
              i && i.trim() && (r = i);
            } catch {}
            if (yield tn(r, t, n)) return {
              fullOk: false,
              prefixOk: true,
              prefix: r
            };
          } catch (e) {
            if (e?.name === `AbortError`) throw e;
          }
          return {
            fullOk: false,
            prefixOk: false
          };
        });
      }
      let rn = vueV(() => M.value || N.value || w.value);
      function an() {
        if (propsAlias.maxHeight === `none`) return null;
        if (propsAlias.maxHeight != null) {
          let float = Number.parseFloat(String(propsAlias.maxHeight));
          if (Number.isFinite(float)) return float;
        }
        let e = T.value;
        if (e) {
          let trimmed = getComputedStyle(e).getPropertyValue(`--ms-size-code-max-height`).trim(),
            float = Number.parseFloat(trimmed);
          if (Number.isFinite(float)) return float;
        }
        return 500;
      }
      function on(count) {
        if (!T.value || !E.value) return;
        let selector = E.value.querySelector(`svg`);
        if (!selector) return;
        let n = 0,
          r = 0,
          attribute = selector.getAttribute(`viewBox`),
          attributeResult = selector.getAttribute(`width`),
          o = selector.getAttribute(`height`);
        if (attribute) {
          let parts = attribute.split(` `);
          parts.length === 4 && (n = Number.parseFloat(parts[2]), r = Number.parseFloat(parts[3]));
        }
        if (n && r || attributeResult && o && (n = Number.parseFloat(attributeResult), r = Number.parseFloat(o)), Number.isNaN(n) || Number.isNaN(r) || n <= 0 || r <= 0) try {
          let bBox = selector.getBBox();
          bBox && bBox.width > 0 && bBox.height > 0 && (n = bBox.width, r = bBox.height);
        } catch (e) {
          console.error(`Failed to get SVG BBox:`, e);
          return;
        }
        if (n > 0 && r > 0) {
          let t = r / n,
            countValue = count ?? T.value.clientWidth,
            a = an(),
            o = countValue * t;
          I.value = `${a == null ? o : Math.min(o, a)}px`;
        }
      }
      let X = vueBn(false),
        sn = vueV(() => ({
          transform: `translate(${A.value}px, ${j.value}px) scale(${k.value})`
        }));
      function cn(event) {
        event.key === `Escape` && X.value && ln();
      }
      function ln() {
        if (X.value = false, D.value && x(D.value), ut.value = null, typeof document < `u`) try {
          document.body.style.overflow = ``;
        } catch {}
        if (typeof window < `u`) try {
          window.removeEventListener(`keydown`, cn);
        } catch {}
      }
      function un() {
        k.value < 3 && (k.value += .1);
      }
      function dn() {
        k.value > .5 && (k.value -= .1);
      }
      function fn() {
        k.value = 1, A.value = 0, j.value = 0;
      }
      function pn(event) {
        gt.value = true, event instanceof MouseEvent ? _t.value = {
          x: event.clientX - A.value,
          y: event.clientY - j.value
        } : _t.value = {
          x: event.touches[0].clientX - A.value,
          y: event.touches[0].clientY - j.value
        };
      }
      function mn(event) {
        if (!gt.value) return;
        let payload, width;
        event instanceof MouseEvent ? (payload = event.clientX, width = event.clientY) : (payload = event.touches[0].clientX, width = event.touches[0].clientY), A.value = payload - _t.value.x, j.value = width - _t.value.y;
      }
      function Z() {
        gt.value = false;
      }
      function hn(event) {
        if (propsAlias.enableWheelZoom && (event.ctrlKey || event.metaKey)) {
          if (event.preventDefault(), !T.value) return;
          let boundingClientRect = T.value.getBoundingClientRect(),
            n = event.clientX - boundingClientRect.left,
            r = event.clientY - boundingClientRect.top,
            i = n - boundingClientRect.width / 2,
            a = r - boundingClientRect.height / 2,
            o = (i - A.value) / k.value,
            s = (a - j.value) / k.value,
            c = -event.deltaY * .01,
            l = Math.min(Math.max(k.value + c, .5), 3);
          l !== k.value && (A.value = i - o * l, j.value = a - s * l, k.value = l);
        }
      }
      function gn() {
        return y(this, null, function* () {
          try {
            let e = O.value,
              t = {
                payload: {
                  type: `copy`,
                  text: e
                },
                defaultPrevented: false,
                preventDefault() {
                  this.defaultPrevented = true;
                }
              };
            if (emitAlias(`copy`, t), t.defaultPrevented) return;
            typeof navigator < `u` && navigator.clipboard && typeof navigator.clipboard.writeText == `function` && (yield navigator.clipboard.writeText(e)), lt.value = true, setTimeout(() => {
              lt.value = false;
            }, 1e3);
          } catch (e) {
            console.error(`Failed to copy:`, e);
          }
        });
      }
      function _n() {
        let e = E.value?.querySelector(`svg`);
        if (!e) return void console.error(`SVG element not found`);
        let toStringResult = new XMLSerializer().serializeToString(e),
          n = {
            payload: {
              type: `export`
            },
            defaultPrevented: false,
            preventDefault() {
              this.defaultPrevented = true;
            },
            svgElement: e,
            svgString: toStringResult
          };
        emitAlias(`export`, n), n.defaultPrevented || function (e, t = null) {
          y(this, null, function* () {
            try {
              let n = t ?? new XMLSerializer().serializeToString(e),
                blob = new Blob([n], {
                  type: `image/svg+xml;charset=utf-8`
                }),
                objectURL = URL.createObjectURL(blob);
              if (typeof document < `u`) {
                let element = document.createElement(`a`);
                element.href = objectURL, element.download = `mermaid-diagram-${Date.now()}.svg`;
                try {
                  document.body.appendChild(element), element.click(), document.body.removeChild(element);
                } catch {}
                URL.revokeObjectURL(objectURL);
              }
            } catch (e) {
              console.error(`Failed to export SVG:`, e);
            }
          });
        }(e, toStringResult);
      }
      function vn() {
        let e = E.value?.querySelector(`svg`) ?? null,
          t = {
            payload: {
              type: `open-modal`
            },
            defaultPrevented: false,
            preventDefault() {
              this.defaultPrevented = true;
            },
            svgElement: e,
            svgString: e ? new XMLSerializer().serializeToString(e) : null
          };
        emitAlias(`openModal`, t), t.defaultPrevented || function () {
          if (X.value = true, typeof document < `u`) try {
            document.body.style.overflow = `hidden`;
          } catch {}
          if (typeof window < `u`) try {
            window.addEventListener(`keydown`, cn);
          } catch {}
          vueRt(() => {
            if (T.value && D.value) {
              let cloneNode = T.value.cloneNode(true);
              cloneNode.classList.add(`fullscreen`), cloneNode.style.height = `100%`, cloneNode.style.maxHeight = `100%`;
              let selector = cloneNode.querySelector(`[data-mermaid-wrapper]`);
              selector && (ut.value = selector, selector.style.transform = sn.value.transform), x(D.value), D.value.appendChild(cloneNode);
            }
          });
        }();
      }
      function yn(e) {
        let t = {
          payload: {
            type: `toggle-mode`,
            target: e
          },
          defaultPrevented: false,
          preventDefault() {
            this.defaultPrevented = true;
          }
        };
        emitAlias(`toggleMode`, e, t), t.defaultPrevented || bn(e);
      }
      function bn(e) {
        return y(this, null, function* () {
          let t = mt.value;
          if (!t) return vt.value = true, void (M.value = e === `source`);
          let n = t.getBoundingClientRect().height;
          t.style.height = `${n}px`, t.style.overflow = `hidden`, vt.value = true, M.value = e === `source`, yield vueRt();
          let scrollHeight = t.scrollHeight;
          t.style.transition = `height var(--ms-duration-standard) var(--ms-ease-standard)`, t.offsetHeight, t.style.height = `${scrollHeight}px`;
          let i = () => {
            t.style.transition = ``, t.style.height = ``, t.style.overflow = ``, t.removeEventListener(`transitionend`, a);
          };
          function a() {
            i();
          }
          t.addEventListener(`transitionend`, a), setTimeout(() => i(), 220);
        });
      }
      function xn() {
        return y(this, null, function* () {
          return N.value ? yt.value : E.value || (yield vueRt(), E.value) ? (N.value = true, yt.value = y(null, null, function* () {
            var value, payload, width;
            try {
              let r = yield ct();
              if (!r) return;
              let i = `mermaid-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
              R.value || It.value || (value = r.initialize) == null || value.call(r, (payload = Ae({}, rt.value), width = {
                dompurifyConfig: Ae({}, Oe)
              }, defineProperties(payload, getOwnPropertyDescriptors(width))));
              let a = function (e, t = O.value) {
                  let n = t,
                    r = `%%{init: {"theme": "${e === `dark` ? `dark` : `default`}"}}%%\n`;
                  return n.trim().startsWith(`%%{`) ? n : r + n;
                }(propsAlias.isDark ? `dark` : `light`),
                o = (yield Kt(() => r.render(i, a), {
                  timeoutMs: W.value.fullRender
                }))?.svg;
              if (st(o)) throw Error(`Mermaid produced invalid SVG during preview`);
              if (E.value) {
                let e = S(E.value, o);
                R.value || It.value || (Te(() => on()), R.value = true, U.value = {
                  zoom: k.value,
                  translateX: A.value,
                  translateY: j.value,
                  containerHeight: I.value
                });
                let t = propsAlias.isDark ? `dark` : `light`;
                e && (z.value[t] = e), It.value &&= false, H.value = false, At = 0, Pt();
              }
              return true;
            } catch (e) {
              let t = function (e) {
                  let t = typeof e == `string` ? e : typeof e?.message == `string` ? e.message : ``;
                  return typeof t == `string` && /timed out/i.test(t);
                }(e),
                n = At + 1;
              return t && n <= 3 ? (At = n, Ft(Math.min(1200, 600 * n))) : (At = 0, Pt(), false === propsAlias.loading && console.error(`Failed to render mermaid diagram:`, e), false === propsAlias.loading && qt(e)), false;
            } finally {
              N.value = false, yt.value = null;
            }
          }), yt.value) : void console.warn(`Mermaid container not ready`);
        });
      }
      function Q() {
        return y(this, null, function* () {
          var value;
          let t = O.value;
          if (!t.trim()) return E.value && x(E.value), Lt.value = null, B.value = ``, void (H.value = false);
          if (!v.value || !F()) return;
          let replaced = t.replace(/\s+/g, ``);
          R.value && replaced === B.value && (value = E.value) != null && value.querySelector(`svg`) || (yield xn()) && (B.value = replaced, Lt.value = E.value?.innerHTML ?? null, H.value = false);
        });
      }
      function Sn(e) {
        return y(this, null, function* () {
          if (Qt() && (E.value || (yield vueRt(), E.value)) && !N.value) {
            N.value = true;
            try {
              let t = yield ct();
              if (!t) return;
              let n = `mermaid-partial-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
                r = propsAlias.isDark ? `dark` : `light`,
                i = en(e),
                a = Zt(i && i.trim() ? i : e, r),
                o = (yield Kt(() => t.render(n, a), {
                  timeoutMs: W.value.render
                }))?.svg;
              E.value && o && !st(o) && (S(E.value, o), Te(() => on()));
            } catch {} finally {
              N.value = false;
            }
          }
        });
      }
      function Cn() {
        return y(this, null, function* () {
          let e = Date.now(),
            t = ++Rt.value;
          V && V.abort(), V = new AbortController();
          let signal = V.signal,
            r = propsAlias.isDark ? `dark` : `light`,
            i = O.value,
            replaced = i.replace(/\s+/g, ``);
          if (!i.trim()) return E.value && x(E.value), Lt.value = null, B.value = ``, void (H.value = false);
          if (replaced === B.value) return;
          try {
            let o = yield nn(i, r, {
              signal: signal,
              timeoutMs: W.value.worker
            });
            if (o.fullOk) {
              if (!(yield xn())) return;
              Rt.value === t && (Lt.value = E.value?.innerHTML ?? null, B.value = replaced, H.value = false);
              return;
            }
            let s = Ut && e <= Ut;
            if (o.prefixOk && o.prefix && Qt() && !s) return void (yield Sn(o.prefix));
          } catch (e) {
            if (e?.name === `AbortError`) return;
          }
          if (Rt.value !== t || H.value) return;
          let o = z.value[r];
          o && E.value && S(E.value, o);
        });
      }
      function $() {
        G && (G = false, K = wt.value, Wt = false, q &&= (q.abort(), null), Vt &&= (globalThis.clearTimeout(Vt), null), Ht &&= (Bt(Ht), null), Ut = Date.now());
      }
      function wn() {
        if ($(), Mt(), V) {
          try {
            V.abort();
          } catch {}
          V = null;
        }
        if (q) {
          try {
            q.abort();
          } catch {}
          q = null;
        }
        mainB(), Pt(), At = 0;
      }
      function Tn(e = wt.value) {
        G && (Gt >= Et.value ? $() : (Vt && globalThis.clearTimeout(Vt), Vt = globalThis.setTimeout(() => {
          Ht = fallbackValue(() => y(null, null, function* () {
            if (!G) return;
            if (!F() || M.value || R.value) return void $();
            let e = propsAlias.isDark ? `dark` : `light`,
              t = O.value;
            if (!t.trim()) return false === propsAlias.loading ? void $() : void Tn(K);
            if (Gt++, Gt > Et.value) $();else {
              q && q.abort(), q = new AbortController();
              try {
                let n = yield nn(t, e, {
                  signal: q.signal,
                  timeoutMs: W.value.worker
                });
                if (n.fullOk) {
                  if ((yield xn()) && R.value) return void $();
                } else n.prefixOk && n.prefix && Qt() && (yield Sn(n.prefix));
              } catch {}
              K = Math.min(Math.floor(1.5 * K), Tt.value), Tn(K);
            }
          }), {
            timeout: 500
          });
        }, e)));
      }
      function En() {
        G || P.value && v.value && F() && (M.value || R.value || (G = true, Ut = 0, Wt = true, Gt = 0, K = wt.value, Tn(K)));
      }
      return vueWt(sn, e => {
        X.value && ut.value && (ut.value.style.transform = e.transform);
      }, {
        immediate: true
      }), vueWt(Jt, e => {
        e || mainV();
      }), vueWt(() => O.value, () => {
        if (R.value = false, z.value = {}, !P.value) return $(), void (F() && !M.value && Q());
        F() && Nt(), !M.value && v.value && F() ? En() : $(), function () {
          if (!P.value || !M.value || !v.value) return;
          let e = O.value.length;
          e !== bt.value && (xt.value = true, bt.value = e, Dt && clearTimeout(Dt), Dt = setTimeout(() => {
            xt.value && M.value && O.value.trim() && (xt.value = false, bn(`preview`));
          }, Ct.value));
        }();
      }), vueWt(() => propsAlias.isDark, () => y(null, null, function* () {
        if (!R.value || H.value) return;
        let e = propsAlias.isDark ? `dark` : `light`,
          t = z.value[e];
        if (t) return void (E.value && S(E.value, t));
        let n = {
            zoom: k.value,
            translateX: A.value,
            translateY: j.value,
            containerHeight: I.value
          },
          r = k.value !== 1 || A.value !== 0 || j.value !== 0;
        It.value = true, r && (k.value = 1, A.value = 0, j.value = 0, yield vueRt()), yield xn(), r && (yield vueRt(), k.value = n.zoom, A.value = n.translateX, j.value = n.translateY, I.value = n.containerHeight, U.value = n);
      })), vueWt(() => M.value, e => y(null, null, function* () {
        if (e) $(), R.value && (U.value = {
          zoom: k.value,
          translateX: A.value,
          translateY: j.value,
          containerHeight: I.value
        });else {
          if (H.value) return;
          let e = propsAlias.isDark ? `dark` : `light`;
          if (R.value && z.value[e]) return yield vueRt(), E.value && S(E.value, z.value[e]), k.value = U.value.zoom, A.value = U.value.translateX, j.value = U.value.translateY, void (I.value = U.value.containerHeight);
          if (yield vueRt(), !v.value || !F()) return;
          if (!P.value) return $(), void (yield Q());
          En(), yield Cn();
        }
      })), vueWt(() => propsAlias.loading, (e, t) => y(null, null, function* () {
        if (true === t && false === e) {
          let trimmed = O.value.trim();
          if (!trimmed) return wn();
          let t = propsAlias.isDark ? `dark` : `light`,
            replaced = trimmed.replace(/\s+/g, ``);
          if (R.value && replaced === B.value) return yield vueRt(), E.value && !E.value.querySelector(`svg`) && z.value[t] && S(E.value, z.value[t]), void wn();
          try {
            if (yield tn(trimmed, t, {
              timeoutMs: W.value.worker
            }), !(yield xn())) return;
            B.value = replaced, H.value = false, wn();
          } catch (e) {
            wn(), qt(e);
          }
        }
      })), vueWt(T, count => {
        L && L.disconnect(), count && (L = new ResizeObserver(e => {
          e && e.length > 0 && !M.value && !w.value && Te(() => {
            on(e[0].contentRect.width);
          });
        }), L.observe(count));
      }, {
        immediate: true
      }), vueUt(() => y(null, null, function* () {
        ct().catch(err => {
          v.value = false, console.warn(`[markstream-vue] Failed to initialize mermaid renderer. Call enableMermaid() to configure a loader.`, err);
        }), yield vueRt(), vt.value || (M.value = !v.value), F() && (P.value ? (Nt(), bt.value = O.value.length) : M.value || Q());
      })), vueWt(() => v.value, e => {
        vt.value || (M.value = !e);
      }), vueWt(() => propsAlias.maxHeight, () => {
        vueRt(() => {
          on();
        });
      }), vueWt([() => propsAlias.estimatedPreviewHeightPx, () => O.value], () => {
        R.value || M.value || (I.value = ht());
      }), vueWt(() => pt.value, e => {
        e && (R.value || (P.value ? (Nt(), bt.value = O.value.length) : Q()), propsAlias.loading || R.value || Q(), !M.value && v.value && P.value && En());
      }, {
        immediate: false
      }), vueMt(() => {
        Dt && clearTimeout(Dt), Mt(), L && L.disconnect(), V &&= (V.abort(), null), mainB(), $(), Pt();
      }), vueWt(() => w.value, e => y(null, null, function* () {
        e ? ($(), V && V.abort()) : F() && !R.value && (yield vueRt(), P.value ? (Nt(), En()) : M.value || Q());
      }), {
        immediate: false
      }), (a, renderCache) => (vueGt(), vueS(`div`, {
        class: vueN([`mermaid-block-container rounded-lg border overflow-hidden`, [{
          "is-rendering": propsAlias.loading,
          dark: propsAlias.isDark
        }]]),
        "data-markstream-mermaid": `1`,
        "data-markstream-mode": M.value ? `fallback` : R.value ? `preview` : `pending`
      }, [propsAlias.showHeader ? (vueGt(), vueS(`div`, Me, [a.$slots[`header-left`] ? (vueGt(), vueS(`div`, Ne, [vueCt(a.$slots, `header-left`, {}, undefined, true)])) : (vueGt(), vueS(`div`, Pe, [vueY(`span`, {
        class: `icon-slot action-icon shrink-0`,
        innerHTML: vueAn(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16">
  <path fill="none" stroke="#ca9ee6" stroke-linecap="round" stroke-linejoin="round" d="M1.5 2.5c0 6 2.25 5.75 4 7 .83.67 1.17 2 1 4h3c-.17-2 .17-3.33 1-4 1.75-1.25 4-1 4-7C12 2.5 10 3 8 7 6 3 4 2.5 1.5 2.5" />
</svg>
`)
      }, null, 8, Fe), renderCache[21] ||= vueY(`span`, {
        class: `mermaid-label-text text-[length:var(--ms-text-label)] font-medium font-mono truncate`
      }, `Mermaid`, -1)])), a.$slots[`header-center`] ? (vueGt(), vueS(`div`, Ie, [vueCt(a.$slots, `header-center`, {}, undefined, true)])) : propsAlias.showModeToggle && v.value ? (vueGt(), vueS(`div`, Le, [vueY(`button`, {
        class: vueN([`mermaid-mode-btn px-2 py-0.5 rounded transition-colors`, [M.value ? `` : `is-active`]]),
        onClick: renderCache[0] ||= () => yn(`preview`),
        onMouseenter: renderCache[1] ||= e => J(e, vueAn(translate)(`common.preview`) || `Preview`),
        onFocus: renderCache[2] ||= e => J(e, vueAn(translate)(`common.preview`) || `Preview`),
        onMouseleave: Y,
        onBlur: Y
      }, [vueY(`div`, Re, [renderCache[22] ||= vueY(`svg`, {
        xmlns: `http://www.w3.org/2000/svg`,
        "xmlns:xlink": `http://www.w3.org/1999/xlink`,
        "aria-hidden": `true`,
        role: `img`,
        width: `1em`,
        height: `1em`,
        viewBox: `0 0 24 24`,
        class: `action-icon`
      }, [vueY(`g`, {
        fill: `none`,
        stroke: `currentColor`,
        "stroke-linecap": `round`,
        "stroke-linejoin": `round`,
        "stroke-width": `2`
      }, [vueY(`path`, {
        d: `M2.062 12.348a1 1 0 0 1 0-.696a10.75 10.75 0 0 1 19.876 0a1 1 0 0 1 0 .696a10.75 10.75 0 0 1-19.876 0`
      }), vueY(`circle`, {
        cx: `12`,
        cy: `12`,
        r: `3`
      })])], -1), vueY(`span`, null, vueRr(vueAn(translate)(`common.preview`) || `Preview`), 1)])], 34), vueY(`button`, {
        class: vueN([`mermaid-mode-btn px-2 py-0.5 rounded transition-colors`, [M.value ? `is-active` : ``]]),
        onClick: renderCache[3] ||= () => yn(`source`),
        onMouseenter: renderCache[4] ||= e => J(e, vueAn(translate)(`common.source`) || `Source`),
        onFocus: renderCache[5] ||= e => J(e, vueAn(translate)(`common.source`) || `Source`),
        onMouseleave: Y,
        onBlur: Y
      }, [vueY(`div`, ze, [renderCache[23] ||= vueY(`svg`, {
        xmlns: `http://www.w3.org/2000/svg`,
        "xmlns:xlink": `http://www.w3.org/1999/xlink`,
        "aria-hidden": `true`,
        role: `img`,
        width: `1em`,
        height: `1em`,
        viewBox: `0 0 24 24`,
        class: `action-icon`
      }, [vueY(`path`, {
        fill: `none`,
        stroke: `currentColor`,
        "stroke-linecap": `round`,
        "stroke-linejoin": `round`,
        "stroke-width": `2`,
        d: `m16 18l6-6l-6-6M8 6l-6 6l6 6`
      })], -1), vueY(`span`, null, vueRr(vueAn(translate)(`common.source`) || `Source`), 1)])], 34)])) : vueX(``, true), a.$slots[`header-right`] ? (vueGt(), vueS(`div`, Be, [vueCt(a.$slots, `header-right`, {}, undefined, true)])) : (vueGt(), vueS(`div`, Ve, [propsAlias.showCollapseButton ? (vueGt(), vueS(`button`, {
        key: 0,
        class: vueN(nt),
        "aria-pressed": w.value,
        onClick: renderCache[6] ||= e => w.value = !w.value,
        onMouseenter: renderCache[7] ||= e => J(e, w.value ? vueAn(translate)(`common.expand`) || `Expand` : vueAn(translate)(`common.collapse`) || `Collapse`),
        onFocus: renderCache[8] ||= e => J(e, w.value ? vueAn(translate)(`common.expand`) || `Expand` : vueAn(translate)(`common.collapse`) || `Collapse`),
        onMouseleave: Y,
        onBlur: Y
      }, [(vueGt(), vueS(`svg`, {
        style: vueNr({
          rotate: w.value ? `0deg` : `90deg`
        }),
        xmlns: `http://www.w3.org/2000/svg`,
        "xmlns:xlink": `http://www.w3.org/1999/xlink`,
        "aria-hidden": `true`,
        role: `img`,
        width: `1em`,
        height: `1em`,
        viewBox: `0 0 24 24`,
        class: `action-icon`
      }, [...(renderCache[24] ||= [vueY(`path`, {
        fill: `none`,
        stroke: `currentColor`,
        "stroke-linecap": `round`,
        "stroke-linejoin": `round`,
        "stroke-width": `2`,
        d: `m9 18l6-6l-6-6`
      }, null, -1)])], 4))], 40, He)) : vueX(``, true), propsAlias.showCopyButton ? (vueGt(), vueS(`button`, {
        key: 1,
        class: vueN(nt),
        onClick: gn,
        onMouseenter: renderCache[9] ||= e => Xt(e),
        onFocus: renderCache[10] ||= e => Xt(e),
        onMouseleave: Y,
        onBlur: Y
      }, [lt.value ? (vueGt(), vueS(`svg`, We, [...(renderCache[26] ||= [vueY(`path`, {
        fill: `none`,
        stroke: `currentColor`,
        "stroke-linecap": `round`,
        "stroke-linejoin": `round`,
        "stroke-width": `2`,
        d: `M20 6L9 17l-5-5`
      }, null, -1)])])) : (vueGt(), vueS(`svg`, Ue, [...(renderCache[25] ||= [vueY(`g`, {
        fill: `none`,
        stroke: `currentColor`,
        "stroke-linecap": `round`,
        "stroke-linejoin": `round`,
        "stroke-width": `2`
      }, [vueY(`rect`, {
        width: `14`,
        height: `14`,
        x: `8`,
        y: `8`,
        rx: `2`,
        ry: `2`
      }), vueY(`path`, {
        d: `M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2`
      })], -1)])]))], 32)) : vueX(``, true), propsAlias.showExportButton && v.value ? (vueGt(), vueS(`button`, {
        key: 2,
        class: vueN(`${nt} ${rn.value ? `opacity-50 cursor-not-allowed` : ``}`),
        "aria-label": vueAn(translate)(`common.export`) || `Export`,
        disabled: rn.value,
        onClick: _n,
        onMouseenter: renderCache[11] ||= e => J(e, vueAn(translate)(`common.export`) || `Export`),
        onFocus: renderCache[12] ||= e => J(e, vueAn(translate)(`common.export`) || `Export`),
        onMouseleave: Y,
        onBlur: Y
      }, [...(renderCache[27] ||= [vueY(`svg`, {
        xmlns: `http://www.w3.org/2000/svg`,
        "xmlns:xlink": `http://www.w3.org/1999/xlink`,
        "aria-hidden": `true`,
        role: `img`,
        width: `1em`,
        height: `1em`,
        viewBox: `0 0 24 24`,
        class: `action-icon`
      }, [vueY(`g`, {
        fill: `none`,
        stroke: `currentColor`,
        "stroke-linecap": `round`,
        "stroke-linejoin": `round`,
        "stroke-width": `2`
      }, [vueY(`path`, {
        d: `M12 15V3m9 12v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4`
      }), vueY(`path`, {
        d: `m7 10l5 5l5-5`
      })])], -1)])], 42, Ge)) : vueX(``, true), propsAlias.showFullscreenButton && v.value ? (vueGt(), vueS(`button`, {
        key: 3,
        class: vueN(`${nt} ${rn.value ? `opacity-50 cursor-not-allowed` : ``}`),
        "aria-label": X.value ? vueAn(translate)(`common.minimize`) || `Minimize` : vueAn(translate)(`common.open`) || `Open`,
        disabled: rn.value,
        onClick: vn,
        onMouseenter: renderCache[13] ||= e => J(e, X.value ? vueAn(translate)(`common.minimize`) || `Minimize` : vueAn(translate)(`common.open`) || `Open`),
        onFocus: renderCache[14] ||= e => J(e, X.value ? vueAn(translate)(`common.minimize`) || `Minimize` : vueAn(translate)(`common.open`) || `Open`),
        onMouseleave: Y,
        onBlur: Y
      }, [X.value ? (vueGt(), vueS(`svg`, Je, [...(renderCache[29] ||= [vueY(`path`, {
        fill: `none`,
        stroke: `currentColor`,
        "stroke-linecap": `round`,
        "stroke-linejoin": `round`,
        "stroke-width": `2`,
        d: `m14 10l7-7m-1 7h-6V4M3 21l7-7m-6 0h6v6`
      }, null, -1)])])) : (vueGt(), vueS(`svg`, options, [...(renderCache[28] ||= [vueY(`path`, {
        fill: `none`,
        stroke: `currentColor`,
        "stroke-linecap": `round`,
        "stroke-linejoin": `round`,
        "stroke-width": `2`,
        d: `M15 3h6v6m0-6l-7 7M3 21l7-7m-1 7H3v-6`
      }, null, -1)])]))], 42, Ke)) : vueX(``, true)]))])) : vueX(``, true), vueZt(vueY(`div`, {
        ref_key: `modeContainerRef`,
        ref: mt
      }, [M.value ? (vueGt(), vueS(`div`, Ye, [vueY(`pre`, Xe, vueRr(O.value), 1)])) : (vueGt(), vueS(`div`, Ze, [propsAlias.showZoomControls ? (vueGt(), vueS(`div`, Qe, [vueY(`div`, $e, [vueY(`button`, {
        class: `mermaid-action-btn p-[var(--ms-action-btn-padding)] rounded transition-colors`,
        onClick: un,
        onMouseenter: renderCache[15] ||= e => J(e, vueAn(translate)(`common.zoomIn`) || `Zoom in`),
        onFocus: renderCache[16] ||= e => J(e, vueAn(translate)(`common.zoomIn`) || `Zoom in`),
        onMouseleave: Y,
        onBlur: Y
      }, [...(renderCache[30] ||= [vueY(`svg`, {
        xmlns: `http://www.w3.org/2000/svg`,
        "xmlns:xlink": `http://www.w3.org/1999/xlink`,
        "aria-hidden": `true`,
        role: `img`,
        width: `1em`,
        height: `1em`,
        viewBox: `0 0 24 24`,
        class: `action-icon`
      }, [vueY(`g`, {
        fill: `none`,
        stroke: `currentColor`,
        "stroke-linecap": `round`,
        "stroke-linejoin": `round`,
        "stroke-width": `2`
      }, [vueY(`circle`, {
        cx: `11`,
        cy: `11`,
        r: `8`
      }), vueY(`path`, {
        d: `m21 21l-4.35-4.35M11 8v6m-3-3h6`
      })])], -1)])], 32), vueY(`button`, {
        class: `mermaid-action-btn p-[var(--ms-action-btn-padding)] rounded transition-colors`,
        onClick: dn,
        onMouseenter: renderCache[17] ||= e => J(e, vueAn(translate)(`common.zoomOut`) || `Zoom out`),
        onFocus: renderCache[18] ||= e => J(e, vueAn(translate)(`common.zoomOut`) || `Zoom out`),
        onMouseleave: Y,
        onBlur: Y
      }, [...(renderCache[31] ||= [vueY(`svg`, {
        xmlns: `http://www.w3.org/2000/svg`,
        "xmlns:xlink": `http://www.w3.org/1999/xlink`,
        "aria-hidden": `true`,
        role: `img`,
        width: `1em`,
        height: `1em`,
        viewBox: `0 0 24 24`,
        class: `action-icon`
      }, [vueY(`g`, {
        fill: `none`,
        stroke: `currentColor`,
        "stroke-linecap": `round`,
        "stroke-linejoin": `round`,
        "stroke-width": `2`
      }, [vueY(`circle`, {
        cx: `11`,
        cy: `11`,
        r: `8`
      }), vueY(`path`, {
        d: `m21 21l-4.35-4.35M8 11h6`
      })])], -1)])], 32), vueY(`button`, {
        class: `mermaid-action-btn p-[var(--ms-action-btn-padding)] text-[length:var(--ms-text-label)] rounded transition-colors`,
        onClick: fn,
        onMouseenter: renderCache[19] ||= e => J(e, vueAn(translate)(`common.resetZoom`) || `Reset zoom`),
        onFocus: renderCache[20] ||= e => J(e, vueAn(translate)(`common.resetZoom`) || `Reset zoom`),
        onMouseleave: Y,
        onBlur: Y
      }, vueRr(Math.round(100 * k.value)) + `% `, 33)])])) : vueX(``, true), vueY(`div`, ae({
        ref_key: `mermaidContainer`,
        ref: T,
        class: `mermaid-preview-area relative overflow-hidden block transition-[height] ease-out`,
        style: {
          height: I.value
        }
      }, vueNt(zt.value, true), {
        onMousedown: pn,
        onMousemove: mn,
        onMouseup: Z,
        onMouseleave: Z,
        onTouchstartPassive: pn,
        onTouchmovePassive: mn,
        onTouchendPassive: Z
      }), [vueY(`div`, {
        "data-mermaid-wrapper": ``,
        class: vueN([`absolute inset-0 cursor-grab`, {
          "cursor-grabbing": gt.value
        }]),
        style: vueNr(sn.value)
      }, [vueY(`div`, {
        ref_key: `mermaidContent`,
        ref: E,
        class: `_mermaid w-full text-center flex items-center justify-center min-h-full`
      }, null, 512)], 6)], 16), (vueGt(), vueB(vueF, {
        to: `body`
      }, [vueY(`div`, {
        class: vueN([`markstream-vue`, {
          dark: propsAlias.isDark
        }])
      }, [vueK(playerR, {
        name: `mermaid-dialog`,
        appear: ``
      }, {
        default: vueYt(() => [X.value ? (vueGt(), vueS(`div`, {
          key: 0,
          class: `mermaid-modal-overlay fixed inset-0 z-50 flex items-center justify-center p-4`,
          onClick: playerE(ln, [`self`])
        }, [vueY(`div`, et, [vueY(`div`, tt, [vueY(`button`, {
          class: `mermaid-action-btn p-[var(--ms-action-btn-padding)] rounded transition-colors`,
          onClick: un
        }, [...(renderCache[32] ||= [vueY(`svg`, {
          xmlns: `http://www.w3.org/2000/svg`,
          "xmlns:xlink": `http://www.w3.org/1999/xlink`,
          "aria-hidden": `true`,
          role: `img`,
          width: `1em`,
          height: `1em`,
          viewBox: `0 0 24 24`,
          class: `action-icon`
        }, [vueY(`g`, {
          fill: `none`,
          stroke: `currentColor`,
          "stroke-linecap": `round`,
          "stroke-linejoin": `round`,
          "stroke-width": `2`
        }, [vueY(`circle`, {
          cx: `11`,
          cy: `11`,
          r: `8`
        }), vueY(`path`, {
          d: `m21 21l-4.35-4.35M11 8v6m-3-3h6`
        })])], -1)])]), vueY(`button`, {
          class: `mermaid-action-btn p-[var(--ms-action-btn-padding)] rounded transition-colors`,
          onClick: dn
        }, [...(renderCache[33] ||= [vueY(`svg`, {
          xmlns: `http://www.w3.org/2000/svg`,
          "xmlns:xlink": `http://www.w3.org/1999/xlink`,
          "aria-hidden": `true`,
          role: `img`,
          width: `1em`,
          height: `1em`,
          viewBox: `0 0 24 24`,
          class: `action-icon`
        }, [vueY(`g`, {
          fill: `none`,
          stroke: `currentColor`,
          "stroke-linecap": `round`,
          "stroke-linejoin": `round`,
          "stroke-width": `2`
        }, [vueY(`circle`, {
          cx: `11`,
          cy: `11`,
          r: `8`
        }), vueY(`path`, {
          d: `m21 21l-4.35-4.35M8 11h6`
        })])], -1)])]), vueY(`button`, {
          class: `mermaid-action-btn p-[var(--ms-action-btn-padding)] text-[length:var(--ms-text-label)] rounded transition-colors`,
          onClick: fn
        }, vueRr(Math.round(100 * k.value)) + `% `, 1), vueY(`button`, {
          class: `mermaid-action-btn inline-flex items-center justify-center p-[var(--ms-action-btn-padding)] rounded transition-colors`,
          onClick: ln
        }, [...(renderCache[34] ||= [vueY(`svg`, {
          xmlns: `http://www.w3.org/2000/svg`,
          "xmlns:xlink": `http://www.w3.org/1999/xlink`,
          "aria-hidden": `true`,
          role: `img`,
          width: `1em`,
          height: `1em`,
          viewBox: `0 0 24 24`,
          class: `action-icon`
        }, [vueY(`path`, {
          fill: `none`,
          stroke: `currentColor`,
          "stroke-linecap": `round`,
          "stroke-linejoin": `round`,
          "stroke-width": `2`,
          d: `M18 6L6 18M6 6l12 12`
        })], -1)])])]), vueY(`div`, ae({
          ref_key: `modalContent`,
          ref: D,
          class: `w-full h-full flex items-center justify-center p-4 overflow-hidden`
        }, vueNt(zt.value, true), {
          onMousedown: pn,
          onMousemove: mn,
          onMouseup: Z,
          onMouseleave: Z,
          onTouchstartPassive: pn,
          onTouchmovePassive: mn,
          onTouchendPassive: Z
        }), null, 16)])])) : vueX(``, true)]),
        _: 1
      })], 2)]))]))], 512), [[playerW, !w.value]])], 10, je));
    }
  }), [[`__scopeId`, `data-v-98ae2b05`]]);
b.install = e => {
  e.component(b.__name, b);
};
export { b as default };