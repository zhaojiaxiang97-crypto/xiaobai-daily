import { $n as vueN, An as vueAn, S as vueS, Wt as vueWt, Zt as vueZt, bn as vueBn, gt as vueGt, j as vueJ, nr as vueNr, ot as vueOt, rr as vueRr, rt as vueRt, ut as vueUt, v as vueV, x as vueX, y as vueY } from "../chunks/vue-i18n.runtime.js";
import { w as playerW } from "../i18n/en-US-player.js";
import { M as mainM, N as mainN, P as mainP, V as mainV, X as mainX, v as g } from "../chunks/main.js";
var defineProperty = Object.defineProperty,
  getOwnPropertySymbols = Object.getOwnPropertySymbols,
  hasOwnProperty = Object.prototype.hasOwnProperty,
  propertyIsEnumerable = Object.prototype.propertyIsEnumerable,
  handler = (e, t, n) => t in e ? defineProperty(e, t, {
    enumerable: true,
    configurable: true,
    writable: true,
    value: n
  }) : e[t] = n,
  S = (e, t) => {
    for (var n in t ||= {}) hasOwnProperty.call(t, n) && handler(e, n, t[n]);
    if (getOwnPropertySymbols) for (var n of getOwnPropertySymbols(t)) propertyIsEnumerable.call(t, n) && handler(e, n, t[n]);
    return e;
  },
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
  oe = [`data-markstream-mode`],
  se = {
    key: 0,
    class: `d2-block-header flex justify-between items-center border-b`
  },
  ce = {
    class: `d2-header-actions flex items-center`
  },
  le = {
    key: 0,
    class: `d2-mode-toggle flex items-center gap-0.5`
  },
  ue = [`aria-label`],
  options = {
    key: 0,
    xmlns: `http://www.w3.org/2000/svg`,
    "aria-hidden": `true`,
    role: `img`,
    width: `1em`,
    height: `1em`,
    viewBox: `0 0 24 24`,
    class: `action-icon`
  },
  de = {
    key: 1,
    xmlns: `http://www.w3.org/2000/svg`,
    "aria-hidden": `true`,
    role: `img`,
    width: `1em`,
    height: `1em`,
    viewBox: `0 0 24 24`,
    class: `action-icon`
  },
  fe = [`aria-label`],
  pe = [`aria-pressed`],
  me = {
    key: 0,
    class: `d2-source`
  },
  he = {
    class: `d2-code`
  },
  ge = {
    key: 0,
    class: `d2-error mt-2 text-xs`
  },
  _e = {
    key: 1
  },
  ve = {
    key: 0,
    class: `d2-source`
  },
  ye = {
    class: `d2-code`
  },
  be = {
    key: 0,
    class: `d2-error mt-2 text-xs`
  },
  xe = [`innerHTML`],
  T = {
    key: 0,
    class: `d2-error px-4 pb-3 text-xs`
  },
  E = g(vueJ({
    __name: `D2BlockNode`,
    props: {
      node: {},
      maxHeight: {
        default: undefined
      },
      loading: {
        type: Boolean,
        default: true
      },
      isDark: {
        type: Boolean
      },
      progressiveRender: {
        type: Boolean,
        default: true
      },
      progressiveIntervalMs: {
        default: 700
      },
      themeId: {},
      darkThemeId: {},
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
      showCollapseButton: {
        type: Boolean,
        default: true
      }
    },
    setup(props) {
      let propsAlias = props,
        {
          t: translate
        } = mainP(),
        v = vueBn(false),
        y = vueBn(false),
        b = vueBn(false),
        x = vueBn(false),
        E = vueBn(null),
        D = vueBn(false),
        O = vueBn(``),
        k = vueBn(0),
        A = vueBn(null),
        j = vueBn(null),
        M = vueBn(null),
        Se = mainX(),
        N = vueBn(null),
        P = vueBn(typeof window > `u`),
        F = vueV(() => propsAlias.node.code ?? ``),
        Ce = vueV(() => `${propsAlias.isDark ? `dark` : `light`}:${F.value}`),
        I = vueV(() => b.value || !x.value || !O.value),
        we = vueV(() => !!O.value),
        Te = vueV(() => {
          if (I.value && j.value) return {
            minHeight: `${j.value}px`
          };
        }),
        Ee = vueV(() => propsAlias.maxHeight === `none` ? {
          maxHeight: `none`
        } : propsAlias.maxHeight == null ? undefined : {
          maxHeight: typeof propsAlias.maxHeight == `number` ? `${propsAlias.maxHeight}px` : String(propsAlias.maxHeight)
        }),
        L = typeof window < `u`,
        R = null,
        z = false,
        B = false,
        V = 0,
        H = null,
        U = false,
        W = null,
        G = ``;
      typeof window < `u` && vueWt(() => M.value, e => {
        var payload;
        if ((payload = N.value) == null || payload.destroy(), N.value = null, !e) return void (P.value = false);
        let n = Se(e, {
          rootMargin: `160px`
        });
        N.value = n, P.value = n.isVisible.value, n.whenVisible.then(() => {
          P.value = true;
        });
      }, {
        immediate: true
      });
      let De = {
        N1: `#E5E7EB`,
        N2: `#CBD5E1`,
        N3: `#94A3B8`,
        N4: `#64748B`,
        N5: `#475569`,
        N6: `#334155`,
        N7: `#0B1220`,
        B1: `#60A5FA`,
        B2: `#3B82F6`,
        B3: `#2563EB`,
        B4: `#1D4ED8`,
        B5: `#1E40AF`,
        B6: `#111827`,
        AA2: `#22D3EE`,
        AA4: `#0EA5E9`,
        AA5: `#0284C7`,
        AB4: `#FBBF24`,
        AB5: `#F59E0B`
      };
      function K(e) {
        return !e || e.disabled;
      }
      function q(event, t, n = `top`) {
        if (K(event.currentTarget)) return;
        let eventAlias = event,
          i = eventAlias?.clientX != null && eventAlias?.clientY != null ? {
            x: eventAlias.clientX,
            y: eventAlias.clientY
          } : undefined;
        mainN(event.currentTarget, t, n, false, i, propsAlias.isDark);
      }
      function J() {
        mainV();
      }
      function Y(event) {
        if (K(event.currentTarget)) return;
        let t = v.value ? translate(`common.copied`) || `Copied` : translate(`common.copy`) || `Copy`,
          eventAlias = event,
          r = eventAlias?.clientX != null && eventAlias?.clientY != null ? {
            x: eventAlias.clientX,
            y: eventAlias.clientY
          } : undefined;
        mainN(event.currentTarget, t, `top`, false, r, propsAlias.isDark);
      }
      function Oe() {
        return C(this, null, function* () {
          try {
            let e = F.value;
            typeof navigator < `u` && navigator.clipboard && typeof navigator.clipboard.writeText == `function` && (yield navigator.clipboard.writeText(e)), v.value = true, setTimeout(() => {
              v.value = false;
            }, 1e3);
          } catch (e) {
            console.error(`Copy failed:`, e);
          }
        });
      }
      function ke() {
        y.value = !y.value;
      }
      function X(e) {
        b.value = e === `source`;
      }
      let Ae = [/javascript:/i, /expression\s*\(/i, /url\s*\(\s*javascript:/i, /@import/i],
        je = /^(?:https?:|mailto:|tel:|#|\/|data:image\/(?:png|gif|jpe?g|webp);)/i;
      function Me(text) {
        if (!text) return ``;
        let trimmed = text.trim();
        return je.test(trimmed) ? trimmed : ``;
      }
      function Z() {
        O.value = ``;
      }
      function Ne() {
        return C(this, null, function* () {
          if (!L || B || !P.value || propsAlias.loading && !propsAlias.progressiveRender) return;
          let e = Ce.value;
          if (e === G && !E.value && O.value) return x.value = true, void (propsAlias.loading && (b.value = false));
          let t = F.value;
          if (!t) return Z(), E.value = null, void (G = ``);
          let n = ++k.value;
          D.value = true, E.value = null;
          try {
            let r = yield function () {
              return C(this, null, function* () {
                if (R) return R;
                let e = yield mainM();
                if (!e) return null;
                if (typeof e == `function`) {
                  let t = new e();
                  return t && typeof t.compile == `function` ? R = t : typeof e.compile == `function` && (R = e), R;
                }
                return e?.D2 && typeof e.D2 == `function` ? (R = new e.D2(), R) : (typeof e.compile == `function` && (R = e), R);
              });
            }();
            if (!r) return x.value = false, b.value = true, Z(), void (E.value = `D2 is not available.`);
            if (typeof r.compile != `function` || typeof r.render != `function`) throw TypeError(`D2 instance is missing compile/render methods.`);
            x.value = true;
            let i = yield r.compile(t);
            if (n !== k.value) return;
            let fallbackValue = i?.diagram ?? i,
              o = i?.renderOptions ?? i?.options ?? {},
              s = propsAlias.themeId ?? o.themeID,
              c = propsAlias.darkThemeId ?? o.darkThemeID,
              l = S({}, o);
            if (l.themeID = propsAlias.isDark && c != null ? c : s, l.darkThemeID = null, l.darkThemeOverrides = null, propsAlias.isDark) {
              let e = o.themeOverrides && typeof o.themeOverrides == `object` ? o.themeOverrides : null;
              l.themeOverrides = S(S({}, De), e || {});
            }
            let u = yield r.render(fallbackValue, l);
            if (n !== k.value) return;
            let d = function (e) {
              return e ? typeof e == `string` ? e : typeof e.svg == `string` ? e.svg : typeof e.data == `string` ? e.data : `` : ``;
            }(u);
            if (!d) throw Error(`D2 render returned empty output.`);
            (function (el) {
              let t = function (e) {
                if (typeof window > `u` || typeof DOMParser > `u` || !e) return ``;
                let replaced = e.replace(/["']\s*javascript:/gi, `#`).replace(/\bjavascript:/gi, `#`).replace(/["']\s*vbscript:/gi, `#`).replace(/\bvbscript:/gi, `#`).replace(/\bdata:text\/html/gi, `#`),
                  documentElement = new DOMParser().parseFromString(replaced, `image/svg+xml`).documentElement;
                if (!documentElement || documentElement.nodeName.toLowerCase() !== `svg`) return ``;
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
                          if (Ae.some(item => item.test(r))) {
                            value.removeAttribute(n);
                            continue;
                          }
                        }
                        if ((n === `href` || n === `xlink:href`) && payload.value) {
                          let r = Me(payload.value);
                          if (!r) {
                            value.removeAttribute(n);
                            continue;
                          }
                          r !== payload.value && value.setAttribute(n, r);
                        }
                      }
                    }
                  }
                }(documentElementAlias), documentElementAlias.classList.add(`markstream-d2-root-svg`), documentElementAlias.outerHTML;
              }(el);
              O.value = t || ``;
            })(d), G = e, propsAlias.loading && (b.value = false), E.value = null;
          } catch (e) {
            if (n !== k.value) return;
            let t = e?.message ? String(e.message) : `D2 render failed.`;
            propsAlias.loading || (E.value = t), G = ``, t.includes(`@terrastruct/d2`) && (x.value = false, b.value = true);
          } finally {
            n === k.value && (D.value = false, U && (U = false, Q()));
          }
        });
      }
      function Q(e = false) {
        if (z || !L || B) return;
        if (D.value) return void (U = true);
        let t = Math.max(120, Number(propsAlias.progressiveIntervalMs) || 0),
          n = Date.now() - V;
        if (!e && n < t) return U = true, void (H == null && (H = window.setTimeout(() => {
          H = null, U && (U = false, Q(true));
        }, Math.max(0, t - n))));
        z = true;
        let r = () => {
          z = false, V = Date.now(), Ne();
        };
        typeof window < `u` && typeof window.requestAnimationFrame == `function` ? window.requestAnimationFrame(r) : setTimeout(r, 0);
      }
      function Pe() {
        if (O.value) try {
          let blob = new Blob([O.value], {
              type: `image/svg+xml;charset=utf-8`
            }),
            objectURL = URL.createObjectURL(blob);
          if (typeof document < `u`) {
            let element = document.createElement(`a`);
            element.href = objectURL, element.download = `d2-diagram-${Date.now()}.svg`, document.body.appendChild(element), element.click(), document.body.removeChild(element);
          }
          URL.revokeObjectURL(objectURL);
        } catch (e) {
          console.error(`Failed to export SVG:`, e);
        }
      }
      function $() {
        let e = A.value;
        if (!e) return;
        let t = e.getBoundingClientRect().height;
        t > 0 && (j.value = t);
      }
      return vueWt(() => [propsAlias.node.code, propsAlias.loading, propsAlias.isDark], () => {
        Q();
      }, {
        immediate: true
      }), vueWt(() => propsAlias.loading, (e, t) => {
        t && !e && Q(true);
      }), vueWt(() => P.value, e => {
        e && Q(true);
      }), vueWt(() => [I.value, O.value, F.value], () => {
        vueRt(() => {
          $();
        });
      }), vueUt(() => {
        vueRt(() => {
          $();
        }), typeof ResizeObserver < `u` && (W = new ResizeObserver(() => {
          $();
        }), A.value && W.observe(A.value));
      }), vueOt(() => {
        var value;
        B = true, G = ``, (value = N.value) == null || value.destroy(), N.value = null, H != null && (clearTimeout(H), H = null), W?.disconnect(), W = null;
      }), (r, renderCache) => (vueGt(), vueS(`div`, {
        ref_key: `viewportTarget`,
        ref: M,
        class: vueN([`d2-block-container rounded-lg border overflow-hidden`, {
          dark: propsAlias.isDark
        }]),
        "data-markstream-d2": `1`,
        "data-markstream-mode": I.value ? `fallback` : `preview`
      }, [propsAlias.showHeader ? (vueGt(), vueS(`div`, se, [renderCache[16] ||= vueY(`div`, {
        class: `flex items-center gap-x-2`
      }, [vueY(`span`, {
        class: `d2-label font-medium font-mono`
      }, `D2`)], -1), vueY(`div`, ce, [propsAlias.showModeToggle ? (vueGt(), vueS(`div`, le, [vueY(`button`, {
        type: `button`,
        class: vueN([`mode-btn px-2 py-0.5 rounded`, b.value ? `` : `is-active`]),
        onClick: renderCache[0] ||= e => X(`preview`),
        onMouseenter: renderCache[1] ||= e => q(e, vueAn(translate)(`common.preview`) || `Preview`),
        onFocus: renderCache[2] ||= e => q(e, vueAn(translate)(`common.preview`) || `Preview`),
        onMouseleave: J,
        onBlur: J
      }, vueRr(vueAn(translate)(`common.preview`) || `Preview`), 35), vueY(`button`, {
        type: `button`,
        class: vueN([`mode-btn px-2 py-0.5 rounded`, b.value ? `is-active` : ``]),
        onClick: renderCache[3] ||= e => X(`source`),
        onMouseenter: renderCache[4] ||= e => q(e, vueAn(translate)(`common.source`) || `Source`),
        onFocus: renderCache[5] ||= e => q(e, vueAn(translate)(`common.source`) || `Source`),
        onMouseleave: J,
        onBlur: J
      }, vueRr(vueAn(translate)(`common.source`) || `Source`), 35)])) : vueX(``, true), propsAlias.showCopyButton ? (vueGt(), vueS(`button`, {
        key: 1,
        type: `button`,
        class: `d2-action-btn p-[var(--ms-action-btn-padding)] rounded-md`,
        "aria-label": v.value ? vueAn(translate)(`common.copied`) || `Copied` : vueAn(translate)(`common.copy`) || `Copy`,
        onClick: Oe,
        onMouseenter: renderCache[6] ||= e => Y(e),
        onFocus: renderCache[7] ||= e => Y(e),
        onMouseleave: J,
        onBlur: J
      }, [v.value ? (vueGt(), vueS(`svg`, de, [...(renderCache[13] ||= [vueY(`path`, {
        fill: `none`,
        stroke: `currentColor`,
        "stroke-linecap": `round`,
        "stroke-linejoin": `round`,
        "stroke-width": `2`,
        d: `M20 6L9 17l-5-5`
      }, null, -1)])])) : (vueGt(), vueS(`svg`, options, [...(renderCache[12] ||= [vueY(`g`, {
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
      })], -1)])]))], 40, ue)) : vueX(``, true), propsAlias.showExportButton && O.value ? (vueGt(), vueS(`button`, {
        key: 2,
        type: `button`,
        class: `d2-action-btn p-[var(--ms-action-btn-padding)] rounded-md`,
        "aria-label": vueAn(translate)(`common.export`) || `Export`,
        onClick: Pe,
        onMouseenter: renderCache[8] ||= e => q(e, vueAn(translate)(`common.export`) || `Export`),
        onFocus: renderCache[9] ||= e => q(e, vueAn(translate)(`common.export`) || `Export`),
        onMouseleave: J,
        onBlur: J
      }, [...(renderCache[14] ||= [vueY(`svg`, {
        xmlns: `http://www.w3.org/2000/svg`,
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
        d: `M12 3v12m0-12l-4 4m4-4l4 4M4 14v4a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4`
      })], -1)])], 40, fe)) : vueX(``, true), propsAlias.showCollapseButton ? (vueGt(), vueS(`button`, {
        key: 3,
        type: `button`,
        class: `d2-action-btn p-[var(--ms-action-btn-padding)] rounded-md`,
        "aria-pressed": y.value,
        onClick: ke,
        onMouseenter: renderCache[10] ||= e => q(e, y.value ? vueAn(translate)(`common.expand`) || `Expand` : vueAn(translate)(`common.collapse`) || `Collapse`),
        onFocus: renderCache[11] ||= e => q(e, y.value ? vueAn(translate)(`common.expand`) || `Expand` : vueAn(translate)(`common.collapse`) || `Collapse`),
        onMouseleave: J,
        onBlur: J
      }, [(vueGt(), vueS(`svg`, {
        style: vueNr({
          rotate: y.value ? `0deg` : `90deg`
        }),
        xmlns: `http://www.w3.org/2000/svg`,
        "aria-hidden": `true`,
        role: `img`,
        width: `1em`,
        height: `1em`,
        viewBox: `0 0 24 24`,
        class: `action-icon`
      }, [...(renderCache[15] ||= [vueY(`path`, {
        fill: `none`,
        stroke: `currentColor`,
        "stroke-linecap": `round`,
        "stroke-linejoin": `round`,
        "stroke-width": `2`,
        d: `m9 18l6-6l-6-6`
      }, null, -1)])], 4))], 40, pe)) : vueX(``, true)])])) : vueX(``, true), vueZt(vueY(`div`, {
        ref_key: `bodyRef`,
        ref: A,
        class: `d2-block-body`,
        style: vueNr(Te.value)
      }, [propsAlias.loading && !we.value ? (vueGt(), vueS(`div`, me, [vueY(`pre`, he, [vueY(`code`, null, vueRr(F.value), 1)]), E.value ? (vueGt(), vueS(`p`, ge, vueRr(E.value), 1)) : vueX(``, true)])) : (vueGt(), vueS(`div`, _e, [I.value ? (vueGt(), vueS(`div`, ve, [vueY(`pre`, ye, [vueY(`code`, null, vueRr(F.value), 1)]), E.value ? (vueGt(), vueS(`p`, be, vueRr(E.value), 1)) : vueX(``, true)])) : (vueGt(), vueS(`div`, {
        key: 1,
        class: `d2-render`,
        style: vueNr(Ee.value)
      }, [vueY(`div`, {
        class: `d2-svg`,
        innerHTML: O.value
      }, null, 8, xe), E.value ? (vueGt(), vueS(`p`, T, vueRr(E.value), 1)) : vueX(``, true)], 4))]))], 4), [[playerW, !y.value]])], 10, oe));
    }
  }), [[`__scopeId`, `data-v-9be36d9c`]]);
E.install = e => {
  e.component(E.__name, E);
};
export { E as default };