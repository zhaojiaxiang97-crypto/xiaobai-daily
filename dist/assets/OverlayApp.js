import { An as e, Cn as t, O as n, S as r, Wt as i, Zt as a, b as o, bn as s, c as ee, gt as c, j as te, k as l, nr as u, ot as ne, rr as d, rt as re, ut as ie, v as f, x as p, y as m } from "./vue-i18n.runtime.js";
import { E as h, w as ae } from "./en-US-player.js";
import { n as oe, t as se } from "./lucide-icons.js";
import { _ as ce, g as le, v as ue, y as de } from "./screenshot-beautifier.js";
import { a as fe, f as pe, g as me, h as he, p as g, r as ge, v as _e, y as ve } from "./compose.js";
import { a as _, i as ye, n as be, r as xe } from "./screenshotTool.js";
var Se = {
    key: 1,
    class: `pointer-events-none absolute left-1/2 top-5 -translate-x-1/2 rounded-full bg-black/75 px-3.5 py-1.5 text-xs text-white shadow-lg`
  },
  Ce = {
    class: `flex flex-col gap-0.5 px-2 py-1.5 tabular-nums`
  },
  we = {
    class: `flex items-center gap-1.5`
  },
  Te = {
    class: `text-white/60`
  },
  Ee = {
    key: 2,
    class: `pointer-events-none absolute left-1/2 top-5 -translate-x-1/2 rounded-full bg-black/80 px-3.5 py-1.5 text-xs text-white shadow-lg`
  },
  De = [`title`, `disabled`],
  Oe = [`title`, `disabled`],
  ke = [`title`, `disabled`],
  Ae = [`title`, `disabled`],
  je = [`title`, `disabled`],
  Me = [`title`, `disabled`],
  v = 4,
  Ne = 4,
  y = 8,
  b = 120,
  Pe = 8,
  x = 40,
  S = 8,
  C = te({
    __name: `OverlayApp`,
    setup(te) {
      let overlay = window.screenshotToolAPI.overlay,
        w = t(null),
        T = s(null),
        Fe = s(null),
        Ie = s(null),
        E = s(null),
        D = s(`idle`),
        O = s(null),
        k = s(null),
        A = s(null),
        j = s({
          width: window.innerWidth,
          height: window.innerHeight
        }),
        M = s(320),
        N = s(false),
        P = s(false),
        F = s(``),
        data = null,
        L = null,
        R = false,
        payload = null,
        B = null,
        V = 0,
        H = null,
        emptyItems = [],
        U = f(() => w.value ? w.value.width / j.value.width : 1),
        W = f(() => w.value ? w.value.height / j.value.height : 1),
        G = f(() => O.value ?? (D.value === `idle` ? k.value : null)),
        Re = f(() => D.value === `selected` && O.value !== null),
        ze = f(() => !!(w.value && A.value && [`idle`, `pending`, `drawing`, `resizing`].includes(D.value))),
        Be = f(() => {
          let e = G.value;
          return e ? `${Math.round(e.width * U.value)} × ${Math.round(e.height * W.value)}` : ``;
        }),
        Ve = f(() => {
          let e = G.value;
          if (!e) return {};
          let t = e.y >= 28 ? e.y - 26 : e.y + 6;
          return {
            left: `${Math.max(4, e.x)}px`,
            top: `${t}px`
          };
        }),
        He = f(() => {
          let e = O.value;
          if (!e) return {};
          let {
              width: t,
              height: n
            } = j.value,
            r = e.y + e.height + S;
          return r + x > n - 4 && (r = e.y - x - S), r < 4 && (r = Math.max(4, e.y + e.height - x - S)), {
            left: `${Math.min(Math.max(4, e.x + e.width - M.value), t - M.value - 4)}px`,
            top: `${r}px`
          };
        }),
        Ue = f(() => {
          let e = A.value;
          if (!e) return {};
          let {
              width: t,
              height: n
            } = j.value,
            r = e.x + 20,
            i = e.y + 20;
          return r + b > t - 4 && (r = e.x - 20 - b), i + 172 > n - 4 && (i = e.y - 20 - 172), {
            left: `${Math.max(4, r)}px`,
            top: `${Math.max(4, i)}px`
          };
        }),
        K = f(() => {
          let e = A.value;
          if (!e || !w.value) return {
            coords: ``,
            color: ``
          };
          let t = Math.min(w.value.width - 1, Math.max(0, Math.floor(e.x * U.value))),
            n = Math.min(w.value.height - 1, Math.max(0, Math.floor(e.y * W.value)));
          return {
            coords: `${t}, ${n}`,
            color: data ? me(data, (n * w.value.width + t) * 4) : ``
          };
        }),
        We = f(() => w.value?.afterCapture === `copy` ? _(`OverlayBeautifyCopy`) : _(`OverlayBeautify`)),
        Ge = xe ? `⌘` : `Ctrl+`;
      function Ke(e) {
        let {
            width: t,
            height: n
          } = j.value,
          r = Math.max(0, Math.min(e.x, t)),
          i = Math.max(0, Math.min(e.y, n));
        return {
          x: r,
          y: i,
          width: Math.max(0, Math.min(e.width, t - r)),
          height: Math.max(0, Math.min(e.height, n - i))
        };
      }
      function qe(e, t) {
        return Ke({
          x: Math.min(e.x, t.x),
          y: Math.min(e.y, t.y),
          width: Math.abs(e.x - t.x),
          height: Math.abs(e.y - t.y)
        });
      }
      function q(e, t) {
        return t.x >= e.x && t.x <= e.x + e.width && t.y >= e.y && t.y <= e.y + e.height;
      }
      function J(e) {
        let found = (w.value?.windows ?? []).find(item => q(item, e));
        return found ? Ke(found) : {
          x: 0,
          y: 0,
          width: j.value.width,
          height: j.value.height
        };
      }
      function Je(e) {
        let t = O.value;
        if (!t) return null;
        let n = Math.abs(e.x - t.x) <= y,
          r = Math.abs(e.x - (t.x + t.width)) <= y,
          i = Math.abs(e.y - t.y) <= y,
          a = Math.abs(e.y - (t.y + t.height)) <= y,
          o = e.x >= t.x - y && e.x <= t.x + t.width + y,
          s = e.y >= t.y - y && e.y <= t.y + t.height + y;
        return i && n ? `nw` : i && r ? `ne` : a && n ? `sw` : a && r ? `se` : i && o ? `n` : a && o ? `s` : n && s ? `w` : r && s ? `e` : null;
      }
      let Ye = f(() => {
        if (N.value) return `progress`;
        if (D.value === `moving`) return `move`;
        if (D.value !== `selected` || !A.value) return `crosshair`;
        let e = Je(A.value);
        return e === `n` || e === `s` ? `ns-resize` : e === `e` || e === `w` ? `ew-resize` : e === `nw` || e === `se` ? `nwse-resize` : e === `ne` || e === `sw` ? `nesw-resize` : O.value && q(O.value, A.value) ? `move` : `crosshair`;
      });
      function Y() {
        V ||= requestAnimationFrame(() => {
          V = 0, Xe(), Ze();
        });
      }
      function Xe() {
        let e = Fe.value;
        if (!e) return;
        let fallbackValue = window.devicePixelRatio || 1,
          {
            width: n,
            height: r
          } = j.value;
        (e.width !== Math.round(n * fallbackValue) || e.height !== Math.round(r * fallbackValue)) && (e.width = Math.round(n * fallbackValue), e.height = Math.round(r * fallbackValue));
        let i = g(e);
        if (i.setTransform(fallbackValue, 0, 0, fallbackValue, 0, 0), i.clearRect(0, 0, n, r), !w.value) return;
        let a = G.value;
        if (i.fillStyle = `rgba(0,0,0,0.42)`, i.beginPath(), i.rect(0, 0, n, r), a && a.width > 0 && a.height > 0 && i.rect(a.x, a.y, a.width, a.height), i.fill(`evenodd`), !(!a || a.width <= 0 || a.height <= 0) && (i.strokeStyle = `#10b981`, i.lineWidth = O.value ? 1.5 : 2, i.strokeRect(a.x + .5, a.y + .5, Math.max(0, a.width - 1), Math.max(0, a.height - 1)), D.value === `selected` || D.value === `moving` || D.value === `resizing`)) {
          let e = [[a.x, a.y], [a.x + a.width / 2, a.y], [a.x + a.width, a.y], [a.x, a.y + a.height / 2], [a.x + a.width, a.y + a.height / 2], [a.x, a.y + a.height], [a.x + a.width / 2, a.y + a.height], [a.x + a.width, a.y + a.height]];
          for (let [t, n] of e) i.fillStyle = `#ffffff`, i.strokeStyle = `#10b981`, i.lineWidth = 1.5, i.beginPath(), i.arc(t, n, 4, 0, Math.PI * 2), i.fill(), i.stroke();
        }
      }
      function Ze() {
        let e = Ie.value,
          t = T.value,
          n = A.value;
        if (!e || !t || !n || !ze.value) return;
        let fallbackValue = window.devicePixelRatio || 1,
          i = Math.round(b * fallbackValue);
        e.width !== i && (e.width = i, e.height = i);
        let a = g(e);
        a.imageSmoothingEnabled = false, a.fillStyle = `#000`, a.fillRect(0, 0, i, i);
        let o = b / Pe * U.value,
          s = n.x * U.value,
          ee = n.y * W.value;
        a.drawImage(t, s - o / 2, ee - o / 2, o, o, 0, 0, i, i), a.strokeStyle = `rgba(16,185,129,0.9)`, a.lineWidth = Math.max(1, fallbackValue), a.beginPath(), a.moveTo(i / 2, 0), a.lineTo(i / 2, i), a.moveTo(0, i / 2), a.lineTo(i, i / 2), a.stroke();
      }
      function X(e) {
        let t = O.value !== null;
        O.value = e, t !== (e !== null) && overlay.selection(e !== null);
      }
      function Z() {
        X(null), D.value = `idle`, A.value && (k.value = J(A.value)), Y();
      }
      function Q(event) {
        return {
          x: event.clientX,
          y: event.clientY
        };
      }
      function Qe(e) {
        if (!w.value || N.value) return;
        let t = Q(e);
        switch (A.value = t, D.value) {
          case `idle`:
            k.value = J(t);
            break;
          case `pending`:
            L && Math.hypot(t.x - L.x, t.y - L.y) > Ne && (D.value = `drawing`, X(qe(L, t)));
            break;
          case `drawing`:
            L && (O.value = qe(L, t));
            break;
          case `moving`:
            if (L && payload) {
              let {
                  width: e,
                  height: n
                } = j.value,
                r = Math.min(Math.max(0, payload.x + t.x - L.x), e - payload.width),
                i = Math.min(Math.max(0, payload.y + t.y - L.y), n - payload.height);
              O.value = {
                ...payload,
                x: r,
                y: i
              };
            }
            break;
          case `resizing`:
            if (payload && B) {
              let e = payload.x,
                n = payload.y,
                r = payload.x + payload.width,
                i = payload.y + payload.height;
              B.includes(`w`) && (e = t.x), B.includes(`e`) && (r = t.x), B.includes(`n`) && (n = t.y), B.includes(`s`) && (i = t.y), O.value = qe({
                x: e,
                y: n
              }, {
                x: r,
                y: i
              });
            }
        }
        Y();
      }
      function $e(event) {
        if (!w.value || N.value || event.button !== 0) return;
        P.value = true;
        let t = Q(event);
        if (A.value = t, event.currentTarget.setPointerCapture(event.pointerId), D.value === `selected` && O.value) {
          let e = Je(t);
          if (e) {
            D.value = `resizing`, B = e, payload = {
              ...O.value
            };
            return;
          }
          if (q(O.value, t)) {
            D.value = `moving`, L = t, payload = {
              ...O.value
            };
            return;
          }
          R = true;
        } else R = false;
        D.value = `pending`, L = t, Y();
      }
      function et(event) {
        if (!w.value || event.button !== 0) return;
        let t = Q(event);
        switch (D.value) {
          case `pending`:
            R && O.value || X(J(t)), D.value = `selected`;
            break;
          case `drawing`:
            !O.value || O.value.width < v || O.value.height < v ? Z() : D.value = `selected`;
            break;
          case `moving`:
          case `resizing`:
            O.value && (O.value.width < v || O.value.height < v) && payload && (O.value = payload), D.value = `selected`;
        }
        L = null, payload = null, B = null, R = false, Y();
      }
      function tt(e) {
        D.value === `selected` && O.value && q(O.value, Q(e)) && $(`beautify`);
      }
      function nt(event) {
        event.preventDefault(), !N.value && (O.value ? Z() : overlay.cancel());
      }
      function rt() {
        N.value || (O.value ? Z() : overlay.cancel());
      }
      function it(e, t, n) {
        let r = O.value;
        if (!r) return;
        let {
          width: i,
          height: a
        } = j.value;
        n ? O.value = Ke({
          ...r,
          width: Math.max(v, r.width + e),
          height: Math.max(v, r.height + t)
        }) : O.value = {
          ...r,
          x: Math.min(Math.max(0, r.x + e), i - r.width),
          y: Math.min(Math.max(0, r.y + t), a - r.height)
        }, Y();
      }
      function at() {
        let color = K.value.color;
        color && (overlay.copyColor(color), F.value = _(`OverlayColorCopied`, {
          color: color
        }), H !== null && window.clearTimeout(H), H = window.setTimeout(() => {
          F.value = ``, H = null;
        }, 1400));
      }
      function ot(event) {
        if (!w.value || N.value || event.isComposing) return;
        let t = event.key;
        if (t === `Escape`) {
          event.preventDefault(), rt();
          return;
        }
        if (t === `Enter`) {
          event.preventDefault(), O.value && $(`beautify`);
          return;
        }
        if (ye(event) && t.toLowerCase() === `c`) {
          event.preventDefault(), O.value && $(`copy`);
          return;
        }
        if (ye(event) && t.toLowerCase() === `s`) {
          event.preventDefault(), O.value && $(`save`);
          return;
        }
        if (!event.ctrlKey && !event.metaKey && !event.altKey && t.toLowerCase() === `c`) {
          event.preventDefault(), at();
          return;
        }
        let n = event.shiftKey ? 10 : 1,
          r = {
            ArrowLeft: [-n, 0],
            ArrowRight: [n, 0],
            ArrowUp: [0, -n],
            ArrowDown: [0, n]
          }[t];
        r && O.value && (event.preventDefault(), it(r[0], r[1], event.altKey));
      }
      function st(e) {
        let t = w.value,
          n = Math.max(0, Math.min(t.width - 1, Math.round(e.x * U.value))),
          r = Math.max(0, Math.min(t.height - 1, Math.round(e.y * W.value)));
        return {
          x: n,
          y: r,
          width: Math.max(1, Math.min(t.width - n, Math.round(e.width * U.value))),
          height: Math.max(1, Math.min(t.height - r, Math.round(e.height * W.value)))
        };
      }
      async function $(e) {
        let t = w.value,
          n = O.value,
          r = T.value;
        if (t && n && r && !N.value) {
          N.value = true;
          try {
            let i = st(n),
              png;
            if (e === `beautify` && t.afterCapture === `copy`) {
              let e = he(r, i.x, i.y, i.width, i.height);
              try {
                let n = t.style.enabled && t.style.balance ? fe(e, t.scale) : null;
                png = (await ge({
                  source: e,
                  scale: t.scale,
                  style: t.style,
                  annotations: [],
                  balance: n
                })).png;
              } finally {
                _e(e);
              }
            }
            let finish = await overlay.finish({
              sessionId: t.sessionId,
              action: e,
              rect: i,
              rendered: png
            });
            finish.ok || console.warn(`[截图美化] 完成截图失败:`, finish.error.message);
          } catch (e) {
            console.warn(`[截图美化] 完成截图失败:`, e);
          } finally {
            N.value = false;
          }
        }
      }
      function ct() {
        w.value = null, data = null, X(null), k.value = null, A.value = null, D.value = `idle`, N.value = false, P.value = false, F.value = ``;
        let e = T.value;
        e && (e.width = 1, e.height = 1), Y();
      }
      async function lt(e) {
        be(e), ct(), j.value = {
          width: window.innerWidth,
          height: window.innerHeight
        }, w.value = e;
        let t = T.value;
        if (t) {
          t.width = e.width, t.height = e.height;
          let n = pe(e.bitmap, e.width, e.height);
          g(t).putImageData(n, 0, 0), data = n.data;
        }
        e.cursor && (A.value = {
          ...e.cursor
        }, k.value = J(e.cursor)), await re(), Xe(), Ze(), requestAnimationFrame(() => requestAnimationFrame(() => {
          w.value === e && overlay.painted(e.sessionId);
        }));
      }
      function ut() {
        j.value = {
          width: window.innerWidth,
          height: window.innerHeight
        }, Y();
      }
      return i(Re, e => {
        e && re(() => {
          E.value?.offsetWidth && (M.value = E.value.offsetWidth);
        });
      }), ie(() => {
        emptyItems.push(overlay.onOpen(e => {
          lt(e);
        }), overlay.onReset(ct), overlay.onClear(() => {
          O.value && X(null), D.value = `idle`, k.value = null, A.value = null, Y();
        }), overlay.onEscape(() => {
          O.value && Z();
        })), window.addEventListener(`keydown`, ot), window.addEventListener(`resize`, ut), window.screenshotToolAPI.ready();
      }), ne(() => {
        for (let e of emptyItems) e();
        window.removeEventListener(`keydown`, ot), window.removeEventListener(`resize`, ut), V && cancelAnimationFrame(V), H !== null && window.clearTimeout(H);
      }), (t, i) => (c(), r(`div`, {
        class: `fixed inset-0 overflow-hidden select-none`,
        style: u({
          cursor: Ye.value
        }),
        onPointermove: Qe,
        onPointerdown: $e,
        onPointerup: et,
        onPointerenter: i[10] ||= t => e(overlay).focus(),
        onDblclick: tt,
        onContextmenu: nt
      }, [m(`canvas`, {
        ref_key: `baseCanvas`,
        ref: T,
        class: `pointer-events-none absolute inset-0 h-full w-full`
      }, null, 512), m(`canvas`, {
        ref_key: `maskCanvas`,
        ref: Fe,
        class: `pointer-events-none absolute inset-0 h-full w-full`
      }, null, 512), w.value ? (c(), r(ee, {
        key: 0
      }, [G.value && Be.value ? (c(), r(`div`, {
        key: 0,
        class: `pointer-events-none absolute rounded-md bg-black/75 px-2 py-0.5 text-[11px] font-medium tabular-nums text-white`,
        style: u(Ve.value)
      }, d(Be.value), 5)) : p(``, true), D.value === `idle` && !P.value ? (c(), r(`div`, Se, d(e(_)(`OverlayHint`)), 1)) : p(``, true), a(m(`div`, {
        class: `pointer-events-none absolute overflow-hidden rounded-lg border border-white/80 bg-black/80 text-[11px] text-white shadow-xl`,
        style: u([Ue.value, {
          width: `${b}px`
        }])
      }, [m(`canvas`, {
        ref_key: `magnifierCanvas`,
        ref: Ie,
        class: `block`,
        style: u({
          width: `${b}px`,
          height: `${b}px`
        })
      }, null, 4), m(`div`, Ce, [m(`span`, null, d(K.value.coords), 1), m(`span`, we, [m(`i`, {
        class: `inline-block size-2.5 rounded-sm border border-white/60`,
        style: u({
          background: K.value.color
        })
      }, null, 4), n(d(K.value.color.toUpperCase()), 1)]), m(`span`, Te, d(e(_)(`OverlayCopyColorHint`)), 1)])], 4), [[ae, ze.value]]), F.value ? (c(), r(`div`, Ee, d(F.value), 1)) : p(``, true), a(m(`div`, {
        ref_key: `toolbarRef`,
        ref: E,
        class: `absolute flex h-10 items-center gap-0.5 rounded-xl border border-black/10 bg-white px-1 text-zinc-700 shadow-[0_8px_28px_rgb(0_0_0/0.28)] dark:border-white/10 dark:bg-zinc-900 dark:text-zinc-200`,
        style: u(He.value),
        onPointerdown: i[6] ||= h(() => {}, [`stop`]),
        onPointerup: i[7] ||= h(() => {}, [`stop`]),
        onDblclick: i[8] ||= h(() => {}, [`stop`]),
        onContextmenu: i[9] ||= h(() => {}, [`stop`, `prevent`])
      }, [m(`button`, {
        type: `button`,
        class: `inline-flex size-8 items-center justify-center rounded-lg hover:bg-black/[0.06] dark:hover:bg-white/10`,
        title: `${e(_)(`OverlayCancel`)} (Esc)`,
        disabled: N.value,
        onClick: i[0] ||= t => e(overlay).cancel()
      }, [l(e(se), {
        size: 17
      })], 8, De), i[11] ||= m(`span`, {
        class: `mx-0.5 h-4 w-px bg-black/10 dark:bg-white/15`
      }, null, -1), m(`button`, {
        type: `button`,
        class: `inline-flex size-8 items-center justify-center rounded-lg hover:bg-black/[0.06] dark:hover:bg-white/10`,
        title: e(_)(`OverlayPin`),
        disabled: N.value,
        onClick: i[1] ||= e => $(`pin`)
      }, [l(e(oe), {
        size: 16
      })], 8, Oe), m(`button`, {
        type: `button`,
        class: `inline-flex size-8 items-center justify-center rounded-lg hover:bg-black/[0.06] dark:hover:bg-white/10`,
        title: e(_)(`OverlayOcr`),
        disabled: N.value,
        onClick: i[2] ||= e => $(`ocr`)
      }, [l(e(ve), {
        size: 16
      })], 8, ke), m(`button`, {
        type: `button`,
        class: `inline-flex size-8 items-center justify-center rounded-lg hover:bg-black/[0.06] dark:hover:bg-white/10`,
        title: `${e(_)(`OverlaySave`)} (${e(Ge)}S)`,
        disabled: N.value,
        onClick: i[3] ||= e => $(`save`)
      }, [l(e(ue), {
        size: 16
      })], 8, Ae), m(`button`, {
        type: `button`,
        class: `inline-flex size-8 items-center justify-center rounded-lg hover:bg-black/[0.06] dark:hover:bg-white/10`,
        title: `${e(_)(`OverlayCopy`)} (${e(Ge)}C)`,
        disabled: N.value,
        onClick: i[4] ||= e => $(`copy`)
      }, [l(e(de), {
        size: 16
      })], 8, je), m(`button`, {
        type: `button`,
        class: `ml-1 inline-flex h-8 items-center gap-1.5 rounded-lg bg-emerald-600 px-3 text-xs font-semibold text-white hover:bg-emerald-700 disabled:opacity-70`,
        title: `${We.value} (Enter)`,
        disabled: N.value,
        onClick: i[5] ||= e => $(`beautify`)
      }, [N.value ? (c(), o(e(ce), {
        key: 0,
        size: 15,
        class: `animate-spin`
      })) : (c(), o(e(le), {
        key: 1,
        size: 15
      })), n(d(We.value), 1)], 8, Me)], 36), [[ae, Re.value]])], 64)) : p(``, true)], 36));
    }
  });
export { C as default };