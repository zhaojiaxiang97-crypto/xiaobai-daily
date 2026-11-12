import { $n as e, An as t, Ct as n, S as r, Wt as i, Yt as ee, Zt as te, b as a, bn as o, f as ne, gt as s, j as c, k as re, nr as l, ot as ie, rr as u, rt as d, ut as ae, v as f, x as p, y as m } from "../chunks/vue-i18n.runtime.js";
import { E as oe, r as se, w as ce } from "../i18n/en-US-player.js";
import { t as le } from "../chunks/preload-helper.js";
import { N as ue, P as de, V as fe, X as pe, _ as h, k as me, v as g, x as he } from "../chunks/main.js";
var _ = (event, t, n) => new Promise((r, i) => {
    var handler = e => {
        try {
          a(n.next(e));
        } catch (e) {
          i(e);
        }
      },
      te = e => {
        try {
          a(n.throw(e));
        } catch (e) {
          i(e);
        }
      },
      a = e => e.done ? r(e.value) : Promise.resolve(e.value).then(handler, te);
    a((n = n.apply(event, t)).next());
  }),
  ge = () => le(() => import(`../chunks/infographic_markstream-vue.js`), [], import.meta.url),
  v = null,
  _e = ge;
function ve() {
  return _e !== null;
}
var ye = [`data-markstream-mode`],
  be = {
    key: 0,
    class: `infographic-block-header flex justify-between items-center border-b`
  },
  xe = {
    key: 0
  },
  Se = {
    key: 1,
    class: `flex items-center gap-x-2 overflow-hidden`
  },
  Ce = [`innerHTML`],
  we = {
    key: 2
  },
  Te = {
    key: 3,
    class: `infographic-mode-toggle flex items-center gap-0.5`
  },
  Ee = {
    class: `flex items-center gap-x-1`
  },
  De = {
    class: `flex items-center gap-x-1`
  },
  Oe = {
    key: 4
  },
  ke = {
    key: 5,
    class: `infographic-header-actions flex items-center`
  },
  Ae = [`aria-pressed`],
  je = {
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
  Me = {
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
  Ne = [`disabled`],
  Pe = [`disabled`],
  Fe = {
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
  Ie = {
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
  Le = {
    key: 0,
    class: `infographic-source`
  },
  Re = {
    class: `infographic-source-code text-sm font-mono whitespace-pre-wrap`
  },
  ze = {
    key: 1,
    class: `relative`
  },
  Be = {
    key: 0,
    class: `absolute top-2 right-2 z-10 rounded-lg`
  },
  Ve = {
    class: `flex items-center gap-2 backdrop-blur rounded-lg`
  },
  He = {
    class: `dialog-panel infographic-modal-panel relative w-full h-full max-w-full max-h-full rounded overflow-hidden`
  },
  Ue = {
    class: `absolute top-6 right-6 z-50 flex items-center gap-2`
  },
  y = `infographic-action-btn p-[var(--ms-action-btn-padding)] rounded`,
  b = g(c({
    __name: `InfographicBlockNode`,
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
      showCollapseButton: {
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
      showZoomControls: {
        type: Boolean,
        default: true
      }
    },
    emits: [`copy`, `export`, `openModal`],
    setup(c, {
      emit: le
    }) {
      let g = c,
        {
          t: b
        } = de(),
        We = pe(),
        x = o(false),
        S = o(false),
        Ge = o(),
        C = o(),
        Ke = typeof window < `u` && ve(),
        w = o(!Ke),
        qe = o(false),
        T = o(false),
        E = o(),
        D = o(null),
        O = o(false),
        k = o(null),
        A = o(typeof window > `u`);
      typeof window < `u` && i(() => Ge.value, e => {
        var value;
        if ((value = k.value) == null || value.destroy(), k.value = null, !e) return void (A.value = false);
        let n = We(e, {
          rootMargin: `160px`
        });
        k.value = n, A.value = n.isVisible.value, n.whenVisible.then(() => {
          A.value = true;
        });
      }, {
        immediate: true
      });
      let j = f(() => g.node.code),
        M = f(() => function (e) {
          if (g.maxHeight === `none`) return he(e, undefined, null);
          let t = h(g.maxHeight);
          return he(e, undefined, t);
        }(h(g.estimatedPreviewHeightPx) ?? me(j.value))),
        N = o(`${M.value}px`);
      function Je() {
        if (!C.value) return;
        let scrollHeight = C.value.scrollHeight;
        if (scrollHeight > 0) {
          let scrollHeightValue = h(function (e) {
            if (g.maxHeight === `none`) return `${e}px`;
            if (g.maxHeight != null) {
              let float = Number.parseFloat(String(g.maxHeight));
              if (Number.isFinite(float)) return `${Math.min(e, float)}px`;
            }
            let value = C.value;
            if (value) {
              let n = getComputedStyle(value).getPropertyValue(`--ms-size-code-max-height`).trim(),
                floatResult = Number.parseFloat(n);
              if (Number.isFinite(floatResult)) return `${Math.min(e, floatResult)}px`;
            }
            return `${Math.min(e, 500)}px`;
          }(scrollHeight)) ?? scrollHeight;
          N.value = `${Math.max(scrollHeightValue, M.value)}px`;
        }
      }
      let P = o(1),
        F = o(0),
        I = o(0),
        L = o(false),
        R = o({
          x: 0,
          y: 0
        }),
        Ye = f(() => j.value);
      function Xe(e) {
        return !e || e.disabled;
      }
      function z(e, t, n = `top`) {
        if (Xe(e.currentTarget)) return;
        let r = e,
          i = r?.clientX != null && r?.clientY != null ? {
            x: r.clientX,
            y: r.clientY
          } : undefined;
        ue(e.currentTarget, t, n, false, i, g.isDark);
      }
      function B() {
        fe();
      }
      function Ze(e) {
        if (Xe(e.currentTarget)) return;
        let t = x.value ? b(`common.copied`) || `Copied` : b(`common.copy`) || `Copy`,
          n = e,
          r = n?.clientX != null && n?.clientY != null ? {
            x: n.clientX,
            y: n.clientY
          } : undefined;
        ue(e.currentTarget, t, `top`, false, r, g.isDark);
      }
      function Qe() {
        return _(this, null, function* () {
          try {
            let value = j.value;
            typeof navigator < `u` && navigator.clipboard && typeof navigator.clipboard.writeText == `function` && (yield navigator.clipboard.writeText(value)), x.value = true, setTimeout(() => {
              x.value = false;
            }, 1e3);
          } catch (e) {
            console.error(`Failed to copy:`, e);
          }
        });
      }
      function $e(e) {
        qe.value = true, w.value = e === `source`;
      }
      function et() {
        let e = C.value?.querySelector(`svg`);
        e ? function (e) {
          _(this, null, function* () {
            try {
              let toString = new XMLSerializer().serializeToString(e),
                n = new Blob([toString], {
                  type: `image/svg+xml;charset=utf-8`
                }),
                objectURL = URL.createObjectURL(n);
              if (typeof document < `u`) {
                let element = document.createElement(`a`);
                element.href = objectURL, element.download = `infographic-${Date.now()}.svg`;
                try {
                  document.body.appendChild(element), element.click(), document.body.removeChild(element);
                } catch {}
                URL.revokeObjectURL(objectURL);
              }
            } catch (e) {
              console.error(`Failed to export SVG:`, e);
            }
          });
        }(e) : console.error(`SVG element not found`);
      }
      function V(e) {
        e.key === `Escape` && T.value && H();
      }
      function H() {
        if (T.value = false, E.value && (E.value.innerHTML = ``), D.value = null, typeof document < `u`) try {
          document.body.style.overflow = ``;
        } catch {}
        if (typeof window < `u`) try {
          window.removeEventListener(`keydown`, V);
        } catch {}
      }
      function tt() {
        (function () {
          if (T.value = true, typeof document < `u`) try {
            document.body.style.overflow = `hidden`;
          } catch {}
          if (typeof window < `u`) try {
            window.addEventListener(`keydown`, V);
          } catch {}
          d(() => {
            if (C.value && E.value) {
              E.value.innerHTML = ``;
              let elementResult = document.createElement(`div`);
              elementResult.style.transition = `transform 0.1s ease`, elementResult.style.transformOrigin = `center center`, elementResult.style.width = `100%`, elementResult.style.height = `100%`, elementResult.style.display = `flex`, elementResult.style.alignItems = `center`, elementResult.style.justifyContent = `center`;
              let cloneNode = C.value.cloneNode(true);
              cloneNode.classList.add(`fullscreen`), cloneNode.style.height = `auto`, elementResult.appendChild(cloneNode), E.value.appendChild(elementResult), D.value = elementResult, elementResult.style.transform = `translate(${F.value}px, ${I.value}px) scale(${P.value})`;
            }
          });
        })();
      }
      function nt() {
        P.value < 3 && (P.value += .1);
      }
      function rt() {
        P.value > .5 && (P.value -= .1);
      }
      function it() {
        P.value = 1, F.value = 0, I.value = 0;
      }
      function U(e) {
        L.value = true, e instanceof MouseEvent ? R.value = {
          x: e.clientX - F.value,
          y: e.clientY - I.value
        } : R.value = {
          x: e.touches[0].clientX - F.value,
          y: e.touches[0].clientY - I.value
        };
      }
      function W(e) {
        if (!L.value) return;
        let clientX, clientY;
        e instanceof MouseEvent ? (clientX = e.clientX, clientY = e.clientY) : (clientX = e.touches[0].clientX, clientY = e.touches[0].clientY), F.value = clientX - R.value.x, I.value = clientY - R.value.y;
      }
      function G() {
        L.value = false;
      }
      let closable = null,
        q = false,
        J = false,
        Y = false,
        X = ``;
      function at(e = false) {
        return _(this, null, function* () {
          var destroy, n;
          if (!A.value || !C.value) return;
          if (q) return J = true, void (Y ||= e);
          let value = Ye.value;
          if (e || value !== X || !O.value) {
            q = true;
            try {
              let e = yield function () {
                return _(this, null, function* () {
                  if (v) return v;
                  let e = _e;
                  if (!e) return null;
                  let t;
                  try {
                    t = yield e();
                  } catch (t) {
                    throw e === ge ? Error(`Optional dependency "@antv/infographic" is not installed. Please install it to enable infographic diagrams.`) : t;
                  }
                  if (!t) return null;
                  let n = t && t.default ? t.default : t;
                  return v = typeof n == `function` && n.prototype && n.prototype.render ? n : t.Infographic ? t.Infographic : n && n.Infographic ? n.Infographic : n, v;
                });
              }();
              if (!e) return void console.warn(`Infographic library failed to load.`);
              closable &&= ((destroy = closable.destroy) == null || destroy.call(closable), null), C.value.innerHTML = ``, closable = new e({
                container: C.value,
                width: `100%`,
                height: `100%`
              });
              let i = ``;
              if ((n = closable.on) == null || n.call(closable, `error`, e => {
                i = (Array.isArray(e) ? e : [e]).map(item => item instanceof Error ? item.message : typeof item == `string` ? item : String(item && typeof item == `object` && `message` in item ? item.message ?? `` : item ?? ``)).filter(Boolean).join(`; `);
              }), closable.render(j.value), i) throw Error(i);
              if (!C.value.childNodes.length) throw Error(`Infographic render returned empty output.`);
              O.value = true, X = value, d(() => {
                Je();
              });
            } catch (e) {
              console.error(`Failed to render infographic:`, e), O.value = false, X = ``, C.value && (C.value.innerHTML = `<div style="padding: var(--ms-inset-panel-body); color: hsl(var(--ms-destructive))">Failed to render infographic: ${e instanceof Error ? e.message : `Unknown error`}</div>`);
            } finally {
              if (q = false, J) {
                let e = Y;
                J = false, Y = false, d(() => {
                  at(e);
                });
              }
            }
          }
        });
      }
      function Z(e = false) {
        !A.value || w.value || S.value || d(() => {
          at(e);
        });
      }
      i(() => j.value, () => {
        Z(true);
      }), i(() => w.value, e => {
        e || Z(true);
      }), i(() => S.value, e => {
        e || Z();
      }), i(() => g.maxHeight, () => {
        d(() => {
          Je();
        });
      }), i([() => g.estimatedPreviewHeightPx, () => j.value], () => {
        O.value || w.value || (N.value = `${M.value}px`);
      }), i(() => A.value, e => {
        !e || w.value || S.value || Z();
      }), ae(() => {
        !qe.value && ve() && (w.value = false), Z();
      }), ie(() => {
        var e, t;
        if ((e = k.value) == null || e.destroy(), k.value = null, closable &&= ((t = closable.destroy) == null || t.call(closable), null), X = ``, typeof window < `u`) try {
          window.removeEventListener(`keydown`, V);
        } catch {}
      });
      let Q = f(() => w.value || S.value),
        ot = f(() => w.value ? `fallback` : O.value ? `preview` : `pending`),
        $ = f(() => ({
          transform: `translate(${F.value}px, ${I.value}px) scale(${P.value})`
        }));
      return i($, e => {
        T.value && D.value && (D.value.style.transform = e.transform);
      }), (i, o) => (s(), r(`div`, {
        ref_key: `viewportTarget`,
        ref: Ge,
        class: e([`infographic-block-container rounded-lg border overflow-hidden`, [{
          "is-rendering": g.loading,
          dark: g.isDark
        }]]),
        "data-markstream-infographic": `1`,
        "data-markstream-mode": ot.value
      }, [g.showHeader ? (s(), r(`div`, be, [i.$slots[`header-left`] ? (s(), r(`div`, xe, [n(i.$slots, `header-left`, {}, undefined, true)])) : (s(), r(`div`, Se, [m(`span`, {
        class: `icon-slot action-icon shrink-0`,
        innerHTML: t(`<svg width="15.52" height="16" viewBox="0 0 291 300" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M140.904 239.376C128.83 239.683 119.675 239.299 115.448 243.843C110.902 248.07 111.288 257.227 110.979 269.302C111.118 274.675 111.118 279.478 111.472 283.52C111.662 285.638 111.95 287.547 112.406 289.224C112.411 289.243 112.416 289.259 112.422 289.28C112.462 289.419 112.496 289.558 112.539 289.691C113.168 291.787 114.088 293.491 115.446 294.758C116.662 296.064 118.283 296.963 120.264 297.59C120.36 297.614 120.464 297.646 120.555 297.675C120.56 297.68 120.56 297.68 120.566 297.68C120.848 297.768 121.142 297.846 121.443 297.923C121.454 297.923 121.464 297.928 121.478 297.934C122.875 298.272 124.424 298.507 126.11 298.678C126.326 298.696 126.542 298.718 126.763 298.739C130.79 299.086 135.558 299.088 140.904 299.222C152.974 298.912 162.128 299.302 166.36 294.758C170.904 290.526 170.515 281.371 170.824 269.302C170.515 257.227 170.907 248.07 166.36 243.843C162.131 239.299 152.974 239.683 140.904 239.376Z" fill="#FF6376"></path><path d="M21.2155 128.398C12.6555 128.616 6.16484 128.339 3.16751 131.56C-0.0538222 134.56 0.218178 141.054 -0.000488281 149.608C0.218178 158.168 -0.0538222 164.659 3.16751 167.656C6.16484 170.878 12.6555 170.606 21.2155 170.824C25.0262 170.726 28.4288 170.726 31.2955 170.475C32.7968 170.342 34.1488 170.136 35.3382 169.814C35.3542 169.811 35.3648 169.806 35.3782 169.803C35.4768 169.774 35.5755 169.747 35.6688 169.718C37.1568 169.272 38.3648 168.622 39.2635 167.656C40.1915 166.795 40.8262 165.646 41.2715 164.243C41.2875 164.174 41.3115 164.102 41.3328 164.035C41.3328 164.035 41.3355 164.032 41.3355 164.027C41.3968 163.827 41.4529 163.622 41.5062 163.406C41.5062 163.398 41.5115 163.392 41.5142 163.382C41.7542 162.392 41.9222 161.294 42.0422 160.096C42.0555 159.944 42.0715 159.792 42.0848 159.635C42.3328 156.779 42.3328 153.398 42.4262 149.608C42.2075 141.054 42.4848 134.56 39.2635 131.56C36.2635 128.339 29.7728 128.616 21.2155 128.398Z" fill="#FFCCCC"></path><path d="M81.0595 184.171C70.8568 184.433 63.1208 184.102 59.5475 187.942C55.7075 191.518 56.0328 199.254 55.7742 209.454C56.0328 219.657 55.7075 227.393 59.5475 230.963C63.1208 234.803 70.8568 234.478 81.0595 234.739C85.6008 234.622 89.6595 234.622 93.0728 234.323C94.8648 234.163 96.4755 233.921 97.8942 233.534C97.9102 233.529 97.9235 233.526 97.9422 233.521C98.0568 233.486 98.1742 233.457 98.2888 233.422C100.06 232.889 101.5 232.113 102.569 230.963C103.676 229.937 104.433 228.566 104.964 226.894C104.985 226.811 105.012 226.726 105.036 226.646C105.041 226.643 105.041 226.643 105.041 226.638C105.116 226.401 105.18 226.153 105.244 225.897C105.244 225.889 105.249 225.881 105.254 225.867C105.54 224.689 105.74 223.379 105.881 221.953C105.9 221.771 105.916 221.59 105.934 221.403C106.228 218.001 106.228 213.969 106.342 209.454C106.081 199.254 106.412 191.518 102.572 187.942C98.9955 184.102 91.2568 184.433 81.0595 184.171Z" fill="#FF939F"></path><path d="M260.591 151.87C215.652 151.87 203.02 164.523 203.02 209.462H198.476C198.476 164.523 185.836 151.881 140.895 151.881V147.337C185.836 147.337 198.487 134.705 198.487 89.7659H203.02C203.02 134.705 215.652 147.337 260.591 147.337V151.87ZM286.052 124.158C281.82 119.614 272.66 120.001 260.591 119.689C248.521 119.385 239.361 119.771 235.129 115.227C230.585 110.995 230.983 101.846 230.671 89.7659C230.513 83.7312 230.535 78.4272 230.023 74.1019C229.513 69.7659 228.481 66.4219 226.209 64.3046C221.967 59.7606 212.817 60.1472 200.748 59.8459C188.681 60.1472 179.519 59.7606 175.287 64.3046C170.753 68.5366 171.129 77.6966 170.828 89.7659C170.516 101.835 170.9 110.995 166.356 115.227C162.124 119.771 152.985 119.374 140.905 119.689C138.873 119.739 136.924 119.771 135.071 119.811C119.313 118.697 106.337 112.318 106.337 89.7659C106.212 84.6699 106.233 80.1792 105.807 76.5206C105.367 72.8726 104.492 70.0379 102.575 68.2566C99.0013 64.4112 91.2573 64.7446 81.0653 64.4832C70.86 64.7446 63.1186 64.4112 59.5533 68.2566C55.708 71.8299 56.0306 79.5632 55.7693 89.7659C56.0306 99.9686 55.708 107.702 59.5533 111.278C63.1186 115.113 70.86 114.79 81.0653 115.049C103.617 115.049 109.996 128.035 111.1 143.803C111.068 145.659 111.028 147.587 110.975 149.619C111.121 154.987 111.121 159.79 111.476 163.835C111.663 165.95 111.945 167.857 112.404 169.534C112.412 169.555 112.412 169.566 112.423 169.598C112.465 169.734 112.497 169.867 112.537 170.003C113.164 172.099 114.092 173.809 115.447 175.07C116.665 176.371 118.281 177.278 120.271 177.905C120.364 177.934 120.46 177.955 120.564 177.987C120.855 178.081 121.145 178.153 121.439 178.238C121.46 178.238 121.471 178.238 121.479 178.249C122.876 178.582 124.42 178.822 126.108 178.987C126.327 179.009 126.545 179.03 126.764 179.051C130.788 179.395 135.559 179.395 140.905 179.529C152.975 179.843 162.124 179.457 166.356 184.001C170.9 188.233 170.516 197.371 170.828 209.451C171.129 221.529 170.743 230.681 175.287 234.91C179.519 239.454 188.681 239.07 200.748 239.371C206.127 239.235 210.921 239.235 214.975 238.881C217.079 238.694 218.985 238.403 220.676 237.955C220.695 237.945 220.705 237.934 220.727 237.934C220.873 237.891 220.999 237.859 221.135 237.819C223.228 237.193 224.937 236.265 226.209 234.91C227.511 233.691 228.409 232.065 229.044 230.097C229.065 230.003 229.095 229.899 229.127 229.803V229.793C229.22 229.513 229.295 229.222 229.367 228.918C229.367 228.897 229.377 228.897 229.377 228.878C229.721 227.481 229.951 225.937 230.127 224.249C230.137 224.03 230.169 223.811 230.191 223.593C230.535 219.571 230.535 214.798 230.671 209.451C230.972 197.371 230.585 188.233 235.129 184.001C239.361 179.457 248.511 179.843 260.591 179.529C272.66 179.227 281.82 179.614 286.052 175.07C290.596 170.838 290.209 161.689 290.511 149.619C290.209 137.539 290.596 128.379 286.052 124.158Z" fill="#FF356A"></path><path d="M112.405 49.848C112.411 49.8694 112.416 49.8827 112.421 49.904C112.461 50.0427 112.499 50.1814 112.539 50.3147C113.171 52.4134 114.088 54.1147 115.448 55.384C116.661 56.6907 118.283 57.5894 120.264 58.2134C120.36 58.24 120.464 58.2694 120.555 58.3014C120.56 58.3067 120.56 58.3067 120.565 58.3067C120.848 58.3947 121.141 58.4694 121.443 58.5467C121.453 58.5467 121.464 58.552 121.48 58.5574C122.875 58.896 124.424 59.1334 126.112 59.3014C126.325 59.3227 126.541 59.3414 126.763 59.3627C130.789 59.712 135.56 59.712 140.904 59.8454C152.973 59.5387 162.128 59.928 166.36 55.384C170.907 51.152 170.515 41.9947 170.824 29.9254C170.517 17.8507 170.907 8.69602 166.363 4.46935C162.131 -0.0746511 152.973 0.309349 140.904 1.52588e-05C128.829 0.309349 119.675 -0.0746511 115.448 4.46935C110.904 8.69602 111.288 17.8507 110.979 29.9254C111.117 35.3014 111.117 40.1014 111.472 44.144C111.661 46.2614 111.949 48.1707 112.405 49.848Z" fill="#FF6376"></path></g></svg>
`)
      }, null, 8, Ce), o[21] ||= m(`span`, {
        class: `infographic-label font-medium font-mono truncate`
      }, `Infographic`, -1)])), i.$slots[`header-center`] ? (s(), r(`div`, we, [n(i.$slots, `header-center`, {}, undefined, true)])) : g.showModeToggle ? (s(), r(`div`, Te, [m(`button`, {
        class: e([`infographic-mode-btn px-2 py-0.5 rounded transition-colors`, [w.value ? `` : `is-active`]]),
        onClick: o[0] ||= () => $e(`preview`),
        onMouseenter: o[1] ||= e => z(e, t(b)(`common.preview`) || `Preview`),
        onFocus: o[2] ||= e => z(e, t(b)(`common.preview`) || `Preview`),
        onMouseleave: B,
        onBlur: B
      }, [m(`div`, Ee, [o[22] ||= m(`svg`, {
        xmlns: `http://www.w3.org/2000/svg`,
        "xmlns:xlink": `http://www.w3.org/1999/xlink`,
        "aria-hidden": `true`,
        role: `img`,
        width: `1em`,
        height: `1em`,
        viewBox: `0 0 24 24`,
        class: `action-icon`
      }, [m(`g`, {
        fill: `none`,
        stroke: `currentColor`,
        "stroke-linecap": `round`,
        "stroke-linejoin": `round`,
        "stroke-width": `2`
      }, [m(`path`, {
        d: `M2.062 12.348a1 1 0 0 1 0-.696a10.75 10.75 0 0 1 19.876 0a1 1 0 0 1 0 .696a10.75 10.75 0 0 1-19.876 0`
      }), m(`circle`, {
        cx: `12`,
        cy: `12`,
        r: `3`
      })])], -1), m(`span`, null, u(t(b)(`common.preview`) || `Preview`), 1)])], 34), m(`button`, {
        class: e([`infographic-mode-btn px-2 py-0.5 rounded transition-colors`, [w.value ? `is-active` : ``]]),
        onClick: o[3] ||= () => $e(`source`),
        onMouseenter: o[4] ||= e => z(e, t(b)(`common.source`) || `Source`),
        onFocus: o[5] ||= e => z(e, t(b)(`common.source`) || `Source`),
        onMouseleave: B,
        onBlur: B
      }, [m(`div`, De, [o[23] ||= m(`svg`, {
        xmlns: `http://www.w3.org/2000/svg`,
        "xmlns:xlink": `http://www.w3.org/1999/xlink`,
        "aria-hidden": `true`,
        role: `img`,
        width: `1em`,
        height: `1em`,
        viewBox: `0 0 24 24`,
        class: `action-icon`
      }, [m(`path`, {
        fill: `none`,
        stroke: `currentColor`,
        "stroke-linecap": `round`,
        "stroke-linejoin": `round`,
        "stroke-width": `2`,
        d: `m16 18l6-6l-6-6M8 6l-6 6l6 6`
      })], -1), m(`span`, null, u(t(b)(`common.source`) || `Source`), 1)])], 34)])) : p(``, true), i.$slots[`header-right`] ? (s(), r(`div`, Oe, [n(i.$slots, `header-right`, {}, undefined, true)])) : (s(), r(`div`, ke, [g.showCollapseButton ? (s(), r(`button`, {
        key: 0,
        class: e(y),
        "aria-pressed": S.value,
        onClick: o[6] ||= e => S.value = !S.value,
        onMouseenter: o[7] ||= e => z(e, S.value ? t(b)(`common.expand`) || `Expand` : t(b)(`common.collapse`) || `Collapse`),
        onFocus: o[8] ||= e => z(e, S.value ? t(b)(`common.expand`) || `Expand` : t(b)(`common.collapse`) || `Collapse`),
        onMouseleave: B,
        onBlur: B
      }, [(s(), r(`svg`, {
        style: l({
          rotate: S.value ? `0deg` : `90deg`
        }),
        xmlns: `http://www.w3.org/2000/svg`,
        "xmlns:xlink": `http://www.w3.org/1999/xlink`,
        "aria-hidden": `true`,
        role: `img`,
        width: `1em`,
        height: `1em`,
        viewBox: `0 0 24 24`,
        class: `action-icon`
      }, [...(o[24] ||= [m(`path`, {
        fill: `none`,
        stroke: `currentColor`,
        "stroke-linecap": `round`,
        "stroke-linejoin": `round`,
        "stroke-width": `2`,
        d: `m9 18l6-6l-6-6`
      }, null, -1)])], 4))], 40, Ae)) : p(``, true), g.showCopyButton ? (s(), r(`button`, {
        key: 1,
        class: e(y),
        onClick: Qe,
        onMouseenter: o[9] ||= e => Ze(e),
        onFocus: o[10] ||= e => Ze(e),
        onMouseleave: B,
        onBlur: B
      }, [x.value ? (s(), r(`svg`, Me, [...(o[26] ||= [m(`path`, {
        fill: `none`,
        stroke: `currentColor`,
        "stroke-linecap": `round`,
        "stroke-linejoin": `round`,
        "stroke-width": `2`,
        d: `M20 6L9 17l-5-5`
      }, null, -1)])])) : (s(), r(`svg`, je, [...(o[25] ||= [m(`g`, {
        fill: `none`,
        stroke: `currentColor`,
        "stroke-linecap": `round`,
        "stroke-linejoin": `round`,
        "stroke-width": `2`
      }, [m(`rect`, {
        width: `14`,
        height: `14`,
        x: `8`,
        y: `8`,
        rx: `2`,
        ry: `2`
      }), m(`path`, {
        d: `M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2`
      })], -1)])]))], 32)) : p(``, true), g.showExportButton ? (s(), r(`button`, {
        key: 2,
        class: e(`${y} ${Q.value ? `opacity-50 cursor-not-allowed` : ``}`),
        disabled: Q.value,
        onClick: et,
        onMouseenter: o[11] ||= e => z(e, t(b)(`common.export`) || `Export`),
        onFocus: o[12] ||= e => z(e, t(b)(`common.export`) || `Export`),
        onMouseleave: B,
        onBlur: B
      }, [...(o[27] ||= [m(`svg`, {
        xmlns: `http://www.w3.org/2000/svg`,
        "xmlns:xlink": `http://www.w3.org/1999/xlink`,
        "aria-hidden": `true`,
        role: `img`,
        width: `1em`,
        height: `1em`,
        viewBox: `0 0 24 24`,
        class: `action-icon`
      }, [m(`g`, {
        fill: `none`,
        stroke: `currentColor`,
        "stroke-linecap": `round`,
        "stroke-linejoin": `round`,
        "stroke-width": `2`
      }, [m(`path`, {
        d: `M12 15V3m9 12v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4`
      }), m(`path`, {
        d: `m7 10l5 5l5-5`
      })])], -1)])], 42, Ne)) : p(``, true), g.showFullscreenButton ? (s(), r(`button`, {
        key: 3,
        class: e(`${y} ${Q.value ? `opacity-50 cursor-not-allowed` : ``}`),
        disabled: Q.value,
        onClick: tt,
        onMouseenter: o[13] ||= e => z(e, T.value ? t(b)(`common.minimize`) || `Minimize` : t(b)(`common.open`) || `Open`),
        onFocus: o[14] ||= e => z(e, T.value ? t(b)(`common.minimize`) || `Minimize` : t(b)(`common.open`) || `Open`),
        onMouseleave: B,
        onBlur: B
      }, [T.value ? (s(), r(`svg`, Ie, [...(o[29] ||= [m(`path`, {
        fill: `none`,
        stroke: `currentColor`,
        "stroke-linecap": `round`,
        "stroke-linejoin": `round`,
        "stroke-width": `2`,
        d: `m14 10l7-7m-1 7h-6V4M3 21l7-7m-6 0h6v6`
      }, null, -1)])])) : (s(), r(`svg`, Fe, [...(o[28] ||= [m(`path`, {
        fill: `none`,
        stroke: `currentColor`,
        "stroke-linecap": `round`,
        "stroke-linejoin": `round`,
        "stroke-width": `2`,
        d: `M15 3h6v6m0-6l-7 7M3 21l7-7m-1 7H3v-6`
      }, null, -1)])]))], 42, Pe)) : p(``, true)]))])) : p(``, true), te(m(`div`, null, [w.value ? (s(), r(`div`, Le, [m(`pre`, Re, u(j.value), 1)])) : (s(), r(`div`, ze, [g.showZoomControls ? (s(), r(`div`, Be, [m(`div`, Ve, [m(`button`, {
        class: `infographic-action-btn p-[var(--ms-action-btn-padding)] rounded`,
        onClick: nt,
        onMouseenter: o[15] ||= e => z(e, t(b)(`common.zoomIn`) || `Zoom in`),
        onFocus: o[16] ||= e => z(e, t(b)(`common.zoomIn`) || `Zoom in`),
        onMouseleave: B,
        onBlur: B
      }, [...(o[30] ||= [m(`svg`, {
        xmlns: `http://www.w3.org/2000/svg`,
        "xmlns:xlink": `http://www.w3.org/1999/xlink`,
        "aria-hidden": `true`,
        role: `img`,
        width: `1em`,
        height: `1em`,
        viewBox: `0 0 24 24`,
        class: `action-icon`
      }, [m(`g`, {
        fill: `none`,
        stroke: `currentColor`,
        "stroke-linecap": `round`,
        "stroke-linejoin": `round`,
        "stroke-width": `2`
      }, [m(`circle`, {
        cx: `11`,
        cy: `11`,
        r: `8`
      }), m(`path`, {
        d: `m21 21l-4.35-4.35M11 8v6m-3-3h6`
      })])], -1)])], 32), m(`button`, {
        class: `infographic-action-btn p-[var(--ms-action-btn-padding)] rounded`,
        onClick: rt,
        onMouseenter: o[17] ||= e => z(e, t(b)(`common.zoomOut`) || `Zoom out`),
        onFocus: o[18] ||= e => z(e, t(b)(`common.zoomOut`) || `Zoom out`),
        onMouseleave: B,
        onBlur: B
      }, [...(o[31] ||= [m(`svg`, {
        xmlns: `http://www.w3.org/2000/svg`,
        "xmlns:xlink": `http://www.w3.org/1999/xlink`,
        "aria-hidden": `true`,
        role: `img`,
        width: `1em`,
        height: `1em`,
        viewBox: `0 0 24 24`,
        class: `action-icon`
      }, [m(`g`, {
        fill: `none`,
        stroke: `currentColor`,
        "stroke-linecap": `round`,
        "stroke-linejoin": `round`,
        "stroke-width": `2`
      }, [m(`circle`, {
        cx: `11`,
        cy: `11`,
        r: `8`
      }), m(`path`, {
        d: `m21 21l-4.35-4.35M8 11h6`
      })])], -1)])], 32), m(`button`, {
        class: `infographic-action-btn p-[var(--ms-action-btn-padding)] rounded`,
        onClick: it,
        onMouseenter: o[19] ||= e => z(e, t(b)(`common.resetZoom`) || `Reset zoom`),
        onFocus: o[20] ||= e => z(e, t(b)(`common.resetZoom`) || `Reset zoom`),
        onMouseleave: B,
        onBlur: B
      }, u(Math.round(100 * P.value)) + `% `, 33)])])) : p(``, true), m(`div`, {
        class: `infographic-preview relative transition-all overflow-hidden block`,
        style: l({
          height: N.value
        }),
        onMousedown: U,
        onMousemove: W,
        onMouseup: G,
        onMouseleave: G,
        onTouchstartPassive: U,
        onTouchmovePassive: W,
        onTouchendPassive: G
      }, [m(`div`, {
        class: e([`absolute inset-0 cursor-grab`, {
          "cursor-grabbing": L.value
        }]),
        style: l($.value)
      }, [m(`div`, {
        ref_key: `infographicContainer`,
        ref: C,
        class: `w-full text-center flex items-center justify-center min-h-full`
      }, null, 512)], 6)], 36)]))], 512), [[ce, !S.value]]), (s(), a(ne, {
        to: `body`
      }, [m(`div`, {
        class: e([`markstream-vue`, {
          dark: g.isDark
        }])
      }, [re(se, {
        name: `infographic-dialog`,
        appear: ``
      }, {
        default: ee(() => [T.value ? (s(), r(`div`, {
          key: 0,
          class: `infographic-modal-overlay fixed inset-0 z-50 flex items-center justify-center p-4`,
          onClick: oe(H, [`self`])
        }, [m(`div`, He, [m(`div`, Ue, [m(`button`, {
          class: `infographic-action-btn p-[var(--ms-action-btn-padding)] rounded`,
          onClick: nt
        }, [...(o[32] ||= [m(`svg`, {
          xmlns: `http://www.w3.org/2000/svg`,
          "xmlns:xlink": `http://www.w3.org/1999/xlink`,
          "aria-hidden": `true`,
          role: `img`,
          width: `1em`,
          height: `1em`,
          viewBox: `0 0 24 24`,
          class: `action-icon`
        }, [m(`g`, {
          fill: `none`,
          stroke: `currentColor`,
          "stroke-linecap": `round`,
          "stroke-linejoin": `round`,
          "stroke-width": `2`
        }, [m(`circle`, {
          cx: `11`,
          cy: `11`,
          r: `8`
        }), m(`path`, {
          d: `m21 21l-4.35-4.35M11 8v6m-3-3h6`
        })])], -1)])]), m(`button`, {
          class: `infographic-action-btn p-[var(--ms-action-btn-padding)] rounded`,
          onClick: rt
        }, [...(o[33] ||= [m(`svg`, {
          xmlns: `http://www.w3.org/2000/svg`,
          "xmlns:xlink": `http://www.w3.org/1999/xlink`,
          "aria-hidden": `true`,
          role: `img`,
          width: `1em`,
          height: `1em`,
          viewBox: `0 0 24 24`,
          class: `action-icon`
        }, [m(`g`, {
          fill: `none`,
          stroke: `currentColor`,
          "stroke-linecap": `round`,
          "stroke-linejoin": `round`,
          "stroke-width": `2`
        }, [m(`circle`, {
          cx: `11`,
          cy: `11`,
          r: `8`
        }), m(`path`, {
          d: `m21 21l-4.35-4.35M8 11h6`
        })])], -1)])]), m(`button`, {
          class: `infographic-action-btn p-[var(--ms-action-btn-padding)] rounded`,
          onClick: it
        }, u(Math.round(100 * P.value)) + `% `, 1), m(`button`, {
          class: `infographic-action-btn inline-flex items-center justify-center p-[var(--ms-action-btn-padding)] rounded`,
          onClick: H
        }, [...(o[34] ||= [m(`svg`, {
          xmlns: `http://www.w3.org/2000/svg`,
          "xmlns:xlink": `http://www.w3.org/1999/xlink`,
          "aria-hidden": `true`,
          role: `img`,
          width: `1em`,
          height: `1em`,
          viewBox: `0 0 24 24`,
          class: `action-icon`
        }, [m(`path`, {
          fill: `none`,
          stroke: `currentColor`,
          "stroke-linecap": `round`,
          "stroke-linejoin": `round`,
          "stroke-width": `2`,
          d: `M18 6L6 18M6 6l12 12`
        })], -1)])])]), m(`div`, {
          ref_key: `modalContent`,
          ref: E,
          class: e([`w-full h-full flex items-center justify-center p-4 overflow-hidden`, {
            "cursor-grab": !L.value,
            "cursor-grabbing": L.value
          }]),
          onMousedown: U,
          onMousemove: W,
          onMouseup: G,
          onMouseleave: G,
          onTouchstartPassive: U,
          onTouchmovePassive: W,
          onTouchendPassive: G
        }, null, 34)])])) : p(``, true)]),
        _: 1
      })], 2)]))], 10, ye));
    }
  }), [[`__scopeId`, `data-v-86a0b19d`]]);
b.install = e => {
  e.component(b.__name, b);
};
export { b as default };