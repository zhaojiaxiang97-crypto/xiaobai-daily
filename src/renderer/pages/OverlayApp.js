import { An as vueAn, Cn as vueCn, O as vueO, S as vueS, Wt as vueWt, Zt as vueZt, b as vueB, bn as vueBn, c as vueC, gt as vueGt, j as vueJ, k as vueK, nr as vueNr, ot as vueOt, rr as vueRr, rt as vueRt, ut as vueUt, v as vueV, x as vueX, y as vueY } from "../chunks/vue-i18n.runtime.js";
import { E as playerE, w as playerW } from "../i18n/en-US-player.js";
import { n as lucideN, t as lucideT } from "../ui/icons/lucide-icons.js";
import { _ as beautifier, g as beautifierG, v as beautifierV, y as beautifierY } from "../chunks/screenshot-beautifier.js";
import { a as composeA, f as composeF, g as composeG, h as composeH, p as composeP, r as composeR, v as composeV, y as composeY } from "../chunks/compose.js";
import { a as screenshotToolA, i as screenshotToolI, n as screenshotToolN, r as screenshotToolR } from "../chunks/screenshotTool.js";
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
  C = vueJ({
    __name: `OverlayApp`,
    setup(props) {
      let overlay = window.screenshotToolAPI.overlay,
        w = vueCn(null),
        T = vueBn(null),
        Fe = vueBn(null),
        Ie = vueBn(null),
        E = vueBn(null),
        D = vueBn(`idle`),
        O = vueBn(null),
        k = vueBn(null),
        A = vueBn(null),
        j = vueBn({
          width: window.innerWidth,
          height: window.innerHeight
        }),
        M = vueBn(320),
        N = vueBn(false),
        P = vueBn(false),
        F = vueBn(``),
        data = null,
        L = null,
        R = false,
        payload = null,
        B = null,
        V = 0,
        H = null,
        emptyItems = [],
        U = vueV(() => w.value ? w.value.width / j.value.width : 1),
        W = vueV(() => w.value ? w.value.height / j.value.height : 1),
        G = vueV(() => O.value ?? (D.value === `idle` ? k.value : null)),
        Re = vueV(() => D.value === `selected` && O.value !== null),
        ze = vueV(() => !!(w.value && A.value && [`idle`, `pending`, `drawing`, `resizing`].includes(D.value))),
        Be = vueV(() => {
          let e = G.value;
          return e ? `${Math.round(e.width * U.value)} × ${Math.round(e.height * W.value)}` : ``;
        }),
        Ve = vueV(() => {
          let e = G.value;
          if (!e) return {};
          let t = e.y >= 28 ? e.y - 26 : e.y + 6;
          return {
            left: `${Math.max(4, e.x)}px`,
            top: `${t}px`
          };
        }),
        He = vueV(() => {
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
        Ue = vueV(() => {
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
        K = vueV(() => {
          let e = A.value;
          if (!e || !w.value) return {
            coords: ``,
            color: ``
          };
          let t = Math.min(w.value.width - 1, Math.max(0, Math.floor(e.x * U.value))),
            n = Math.min(w.value.height - 1, Math.max(0, Math.floor(e.y * W.value)));
          return {
            coords: `${t}, ${n}`,
            color: data ? composeG(data, (n * w.value.width + t) * 4) : ``
          };
        }),
        We = vueV(() => w.value?.afterCapture === `copy` ? screenshotToolA(`OverlayBeautifyCopy`) : screenshotToolA(`OverlayBeautify`)),
        Ge = screenshotToolR ? `⌘` : `Ctrl+`;
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
      let Ye = vueV(() => {
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
        let composePResult = composeP(e);
        if (composePResult.setTransform(fallbackValue, 0, 0, fallbackValue, 0, 0), composePResult.clearRect(0, 0, n, r), !w.value) return;
        let a = G.value;
        if (composePResult.fillStyle = `rgba(0,0,0,0.42)`, composePResult.beginPath(), composePResult.rect(0, 0, n, r), a && a.width > 0 && a.height > 0 && composePResult.rect(a.x, a.y, a.width, a.height), composePResult.fill(`evenodd`), !(!a || a.width <= 0 || a.height <= 0) && (composePResult.strokeStyle = `#10b981`, composePResult.lineWidth = O.value ? 1.5 : 2, composePResult.strokeRect(a.x + .5, a.y + .5, Math.max(0, a.width - 1), Math.max(0, a.height - 1)), D.value === `selected` || D.value === `moving` || D.value === `resizing`)) {
          let e = [[a.x, a.y], [a.x + a.width / 2, a.y], [a.x + a.width, a.y], [a.x, a.y + a.height / 2], [a.x + a.width, a.y + a.height / 2], [a.x, a.y + a.height], [a.x + a.width / 2, a.y + a.height], [a.x + a.width, a.y + a.height]];
          for (let [t, n] of e) composePResult.fillStyle = `#ffffff`, composePResult.strokeStyle = `#10b981`, composePResult.lineWidth = 1.5, composePResult.beginPath(), composePResult.arc(t, n, 4, 0, Math.PI * 2), composePResult.fill(), composePResult.stroke();
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
        let composePResult = composeP(e);
        composePResult.imageSmoothingEnabled = false, composePResult.fillStyle = `#000`, composePResult.fillRect(0, 0, i, i);
        let o = b / Pe * U.value,
          s = n.x * U.value,
          ee = n.y * W.value;
        composePResult.drawImage(t, s - o / 2, ee - o / 2, o, o, 0, 0, i, i), composePResult.strokeStyle = `rgba(16,185,129,0.9)`, composePResult.lineWidth = Math.max(1, fallbackValue), composePResult.beginPath(), composePResult.moveTo(i / 2, 0), composePResult.lineTo(i / 2, i), composePResult.moveTo(0, i / 2), composePResult.lineTo(i, i / 2), composePResult.stroke();
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
        color && (overlay.copyColor(color), F.value = screenshotToolA(`OverlayColorCopied`, {
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
        if (screenshotToolI(event) && t.toLowerCase() === `c`) {
          event.preventDefault(), O.value && $(`copy`);
          return;
        }
        if (screenshotToolI(event) && t.toLowerCase() === `s`) {
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
              let composeHResult = composeH(r, i.x, i.y, i.width, i.height);
              try {
                let n = t.style.enabled && t.style.balance ? composeA(composeHResult, t.scale) : null;
                png = (await composeR({
                  source: composeHResult,
                  scale: t.scale,
                  style: t.style,
                  annotations: [],
                  balance: n
                })).png;
              } finally {
                composeV(composeHResult);
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
        screenshotToolN(e), ct(), j.value = {
          width: window.innerWidth,
          height: window.innerHeight
        }, w.value = e;
        let t = T.value;
        if (t) {
          t.width = e.width, t.height = e.height;
          let composeFResult = composeF(e.bitmap, e.width, e.height);
          composeP(t).putImageData(composeFResult, 0, 0), data = composeFResult.data;
        }
        e.cursor && (A.value = {
          ...e.cursor
        }, k.value = J(e.cursor)), await vueRt(), Xe(), Ze(), requestAnimationFrame(() => requestAnimationFrame(() => {
          w.value === e && overlay.painted(e.sessionId);
        }));
      }
      function ut() {
        j.value = {
          width: window.innerWidth,
          height: window.innerHeight
        }, Y();
      }
      return vueWt(Re, e => {
        e && vueRt(() => {
          E.value?.offsetWidth && (M.value = E.value.offsetWidth);
        });
      }), vueUt(() => {
        emptyItems.push(overlay.onOpen(e => {
          lt(e);
        }), overlay.onReset(ct), overlay.onClear(() => {
          O.value && X(null), D.value = `idle`, k.value = null, A.value = null, Y();
        }), overlay.onEscape(() => {
          O.value && Z();
        })), window.addEventListener(`keydown`, ot), window.addEventListener(`resize`, ut), window.screenshotToolAPI.ready();
      }), vueOt(() => {
        for (let e of emptyItems) e();
        window.removeEventListener(`keydown`, ot), window.removeEventListener(`resize`, ut), V && cancelAnimationFrame(V), H !== null && window.clearTimeout(H);
      }), (t, renderCache) => (vueGt(), vueS(`div`, {
        class: `fixed inset-0 overflow-hidden select-none`,
        style: vueNr({
          cursor: Ye.value
        }),
        onPointermove: Qe,
        onPointerdown: $e,
        onPointerup: et,
        onPointerenter: renderCache[10] ||= t => vueAn(overlay).focus(),
        onDblclick: tt,
        onContextmenu: nt
      }, [vueY(`canvas`, {
        ref_key: `baseCanvas`,
        ref: T,
        class: `pointer-events-none absolute inset-0 h-full w-full`
      }, null, 512), vueY(`canvas`, {
        ref_key: `maskCanvas`,
        ref: Fe,
        class: `pointer-events-none absolute inset-0 h-full w-full`
      }, null, 512), w.value ? (vueGt(), vueS(vueC, {
        key: 0
      }, [G.value && Be.value ? (vueGt(), vueS(`div`, {
        key: 0,
        class: `pointer-events-none absolute rounded-md bg-black/75 px-2 py-0.5 text-[11px] font-medium tabular-nums text-white`,
        style: vueNr(Ve.value)
      }, vueRr(Be.value), 5)) : vueX(``, true), D.value === `idle` && !P.value ? (vueGt(), vueS(`div`, Se, vueRr(vueAn(screenshotToolA)(`OverlayHint`)), 1)) : vueX(``, true), vueZt(vueY(`div`, {
        class: `pointer-events-none absolute overflow-hidden rounded-lg border border-white/80 bg-black/80 text-[11px] text-white shadow-xl`,
        style: vueNr([Ue.value, {
          width: `${b}px`
        }])
      }, [vueY(`canvas`, {
        ref_key: `magnifierCanvas`,
        ref: Ie,
        class: `block`,
        style: vueNr({
          width: `${b}px`,
          height: `${b}px`
        })
      }, null, 4), vueY(`div`, Ce, [vueY(`span`, null, vueRr(K.value.coords), 1), vueY(`span`, we, [vueY(`i`, {
        class: `inline-block size-2.5 rounded-sm border border-white/60`,
        style: vueNr({
          background: K.value.color
        })
      }, null, 4), vueO(vueRr(K.value.color.toUpperCase()), 1)]), vueY(`span`, Te, vueRr(vueAn(screenshotToolA)(`OverlayCopyColorHint`)), 1)])], 4), [[playerW, ze.value]]), F.value ? (vueGt(), vueS(`div`, Ee, vueRr(F.value), 1)) : vueX(``, true), vueZt(vueY(`div`, {
        ref_key: `toolbarRef`,
        ref: E,
        class: `absolute flex h-10 items-center gap-0.5 rounded-xl border border-black/10 bg-white px-1 text-zinc-700 shadow-[0_8px_28px_rgb(0_0_0/0.28)] dark:border-white/10 dark:bg-zinc-900 dark:text-zinc-200`,
        style: vueNr(He.value),
        onPointerdown: renderCache[6] ||= playerE(() => {}, [`stop`]),
        onPointerup: renderCache[7] ||= playerE(() => {}, [`stop`]),
        onDblclick: renderCache[8] ||= playerE(() => {}, [`stop`]),
        onContextmenu: renderCache[9] ||= playerE(() => {}, [`stop`, `prevent`])
      }, [vueY(`button`, {
        type: `button`,
        class: `inline-flex size-8 items-center justify-center rounded-lg hover:bg-black/[0.06] dark:hover:bg-white/10`,
        title: `${vueAn(screenshotToolA)(`OverlayCancel`)} (Esc)`,
        disabled: N.value,
        onClick: renderCache[0] ||= t => vueAn(overlay).cancel()
      }, [vueK(vueAn(lucideT), {
        size: 17
      })], 8, De), renderCache[11] ||= vueY(`span`, {
        class: `mx-0.5 h-4 w-px bg-black/10 dark:bg-white/15`
      }, null, -1), vueY(`button`, {
        type: `button`,
        class: `inline-flex size-8 items-center justify-center rounded-lg hover:bg-black/[0.06] dark:hover:bg-white/10`,
        title: vueAn(screenshotToolA)(`OverlayPin`),
        disabled: N.value,
        onClick: renderCache[1] ||= e => $(`pin`)
      }, [vueK(vueAn(lucideN), {
        size: 16
      })], 8, Oe), vueY(`button`, {
        type: `button`,
        class: `inline-flex size-8 items-center justify-center rounded-lg hover:bg-black/[0.06] dark:hover:bg-white/10`,
        title: vueAn(screenshotToolA)(`OverlayOcr`),
        disabled: N.value,
        onClick: renderCache[2] ||= e => $(`ocr`)
      }, [vueK(vueAn(composeY), {
        size: 16
      })], 8, ke), vueY(`button`, {
        type: `button`,
        class: `inline-flex size-8 items-center justify-center rounded-lg hover:bg-black/[0.06] dark:hover:bg-white/10`,
        title: `${vueAn(screenshotToolA)(`OverlaySave`)} (${vueAn(Ge)}S)`,
        disabled: N.value,
        onClick: renderCache[3] ||= e => $(`save`)
      }, [vueK(vueAn(beautifierV), {
        size: 16
      })], 8, Ae), vueY(`button`, {
        type: `button`,
        class: `inline-flex size-8 items-center justify-center rounded-lg hover:bg-black/[0.06] dark:hover:bg-white/10`,
        title: `${vueAn(screenshotToolA)(`OverlayCopy`)} (${vueAn(Ge)}C)`,
        disabled: N.value,
        onClick: renderCache[4] ||= e => $(`copy`)
      }, [vueK(vueAn(beautifierY), {
        size: 16
      })], 8, je), vueY(`button`, {
        type: `button`,
        class: `ml-1 inline-flex h-8 items-center gap-1.5 rounded-lg bg-emerald-600 px-3 text-xs font-semibold text-white hover:bg-emerald-700 disabled:opacity-70`,
        title: `${We.value} (Enter)`,
        disabled: N.value,
        onClick: renderCache[5] ||= e => $(`beautify`)
      }, [N.value ? (vueGt(), vueB(vueAn(beautifier), {
        key: 0,
        size: 15,
        class: `animate-spin`
      })) : (vueGt(), vueB(vueAn(beautifierG), {
        key: 1,
        size: 15
      })), vueO(vueRr(We.value), 1)], 8, Me)], 36), [[playerW, Re.value]])], 64)) : vueX(``, true)], 36));
    }
  });
export { C as default };