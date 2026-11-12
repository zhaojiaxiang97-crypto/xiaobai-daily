import { $n as e, An as t, S as n, St as r, Wt as i, Zt as a, bn as o, c as s, gt as c, j as l, n as u, nr as d, ot as f, rr as p, ut as m, v as h, x as ee, y as g } from "./vue-i18n.runtime.js";
import { w as te } from "../i18n/en-US-player.js";
import { C as ne, E as _, S as v, T as re, a as ie, h as ae, i as oe, l as se, m as ce, n as le, p as ue, r as de, s as y, t as fe, u as pe, v as me, x as he, y as ge } from "../vendors/OrbitControls.js";
var b = new _();
function x(el, t, items, r, i, a) {
  let o = 2 * Math.PI * i / 4,
    s = Math.max(a - 2 * i, 0),
    c = Math.PI / 4;
  b.copy(t), b[r] = 0, b.normalize();
  let l = .5 * o / (o + s),
    u = 1 - b.angleTo(el) / c;
  return Math.sign(b[items]) === 1 ? u * l : s / (o + s) + l + l * (1 - u);
}
var _e = class e extends ie {
    constructor(e = 1, t = 1, n = 1, r = 2, i = .1) {
      let a = r * 2 + 1;
      if (i = Math.min(e / 2, t / 2, n / 2, i), super(1, 1, 1, a, a, a), this.type = `RoundedBoxGeometry`, this.parameters = {
        width: e,
        height: t,
        depth: n,
        segments: r,
        radius: i
      }, a === 1) return;
      let toNonIndexed = this.toNonIndexed();
      this.index = null, this.attributes.position = toNonIndexed.attributes.position, this.attributes.normal = toNonIndexed.attributes.normal, this.attributes.uv = toNonIndexed.attributes.uv;
      let s = new _(),
        c = new _(),
        subScalar = new _(e, t, n).divideScalar(2).subScalar(i),
        array = this.attributes.position.array,
        d = this.attributes.normal.array,
        f = this.attributes.uv.array,
        p = array.length / 6,
        m = new _(),
        h = .5 / a;
      for (let r = 0, a = 0; r < array.length; r += 3, a += 2) switch (s.fromArray(array, r), c.copy(s), c.x -= Math.sign(c.x) * h, c.y -= Math.sign(c.y) * h, c.z -= Math.sign(c.z) * h, c.normalize(), array[r + 0] = subScalar.x * Math.sign(s.x) + c.x * i, array[r + 1] = subScalar.y * Math.sign(s.y) + c.y * i, array[r + 2] = subScalar.z * Math.sign(s.z) + c.z * i, d[r + 0] = c.x, d[r + 1] = c.y, d[r + 2] = c.z, Math.floor(r / p)) {
        case 0:
          m.set(1, 0, 0), f[a + 0] = x(m, c, `z`, `y`, i, n), f[a + 1] = 1 - x(m, c, `y`, `z`, i, t);
          break;
        case 1:
          m.set(-1, 0, 0), f[a + 0] = 1 - x(m, c, `z`, `y`, i, n), f[a + 1] = 1 - x(m, c, `y`, `z`, i, t);
          break;
        case 2:
          m.set(0, 1, 0), f[a + 0] = 1 - x(m, c, `x`, `z`, i, e), f[a + 1] = x(m, c, `z`, `x`, i, n);
          break;
        case 3:
          m.set(0, -1, 0), f[a + 0] = 1 - x(m, c, `x`, `z`, i, e), f[a + 1] = 1 - x(m, c, `z`, `x`, i, n);
          break;
        case 4:
          m.set(0, 0, 1), f[a + 0] = 1 - x(m, c, `x`, `y`, i, e), f[a + 1] = 1 - x(m, c, `y`, `x`, i, t);
          break;
        case 5:
          m.set(0, 0, -1), f[a + 0] = x(m, c, `x`, `y`, i, e), f[a + 1] = 1 - x(m, c, `y`, `x`, i, t);
      }
    }
    static fromJSON(t) {
      return new e(t.width, t.height, t.depth, t.segments, t.radius);
    }
  },
  ve = {
    class: `text-xs text-[#555] font-medium leading-none whitespace-nowrap dark:text-foreground`
  },
  ye = {
    key: 0,
    class: `text-xs text-[#bbb] leading-none mt-0.5 whitespace-nowrap dark:text-muted-foreground`
  },
  be = .74,
  xe = .12,
  Se = 2,
  Ce = .16,
  S = .04,
  we = 520,
  Te = 420,
  Ee = .94,
  De = .98,
  Oe = .22,
  ke = 200,
  Ae = 440,
  je = `500 12px`,
  Me = 8,
  Ne = 12,
  Pe = 22,
  Fe = 36,
  Ie = 4,
  C = l({
    __name: `HeatmapBars3D`,
    props: {
      rows: {},
      columnLabels: {},
      rowPitch: {
        default: 1.3
      },
      hint: {},
      clickable: {
        type: Boolean,
        default: false
      }
    },
    emits: [`unavailable`, `cell-hover`, `cell-click`],
    setup(l, {
      expose: ie,
      emit: b
    }) {
      let x = l,
        C = b,
        {
          t: Le
        } = u(),
        Re = [`--heatmap-empty`, `--heatmap-1`, `--heatmap-2`, `--heatmap-3`, `--heatmap-4`],
        ze = [.45, .65, .85, 1],
        w = o(null),
        T = o(null),
        Be = o(null),
        Ve = o(260),
        E = o([]),
        D = o([]),
        O = o(null),
        k = o(false),
        He = h(() => Math.max(1, ...x.rows.map(item => item.cells.length))),
        Ue = h(() => Math.max(3, He.value * .125)),
        We = h(() => x.rows.some(item => item.label)),
        Ge = h(() => x.rows.some(item => item.summary)),
        emptyItems = [],
        Ke = h(() => {
          if (!O.value) return ``;
          let e = emptyItems[O.value.index];
          return e ? X(e)?.tooltip ?? `` : ``;
        }),
        qe = o(false),
        Je = h(() => {
          if (!O.value) return {};
          let e = w.value?.clientWidth ?? 0;
          return {
            left: `${Math.min(Math.max(O.value.x, 72), Math.max(72, e - 72))}px`,
            top: `${O.value.y}px`,
            transform: O.value.y < 40 ? `translate(-50%, 16px)` : `translate(-50%, calc(-100% - 10px))`
          };
        }),
        j = new ne(),
        M = new ge(14, 1, .5, 600),
        N = new ge(),
        translate = new _e(be, 1, be, Se, xe).translate(0, .5, 0),
        P = new me();
      P.onBeforeCompile = e => {
        e.vertexShader = e.vertexShader.replace(`#include <common>`, `#include <common>
attribute float barHeight;`).replace(`#include <beginnormal_vertex>`, `#include <beginnormal_vertex>
      float barShapeHeight = max(barHeight, ${(xe * 2).toFixed(3)});
      float barSquash = barHeight / barShapeHeight;
      objectNormal.y /= max(barSquash, 0.001);`).replace(`#include <begin_vertex>`, `#include <begin_vertex>
      transformed.y += step(0.5, position.y) * (barShapeHeight - 1.0);
      transformed.y *= barSquash;`);
      }, P.customProgramCacheKey = () => `heatmap-rounded-bar`;
      let Xe = new he(),
        Ze = new re(),
        F = new _(),
        Qe = new ae(),
        $e = new oe(),
        et = new _(),
        tt = new y(),
        nt = new y(),
        setFromSphericalCoords = new _().setFromSphericalCoords(1, De, Oe),
        I = null,
        L = null,
        R = null,
        it = new Float32Array(),
        at = new Float32Array(),
        z = new Float32Array(),
        B = null,
        V = [],
        ot = [],
        H = -1,
        U = false,
        payload = null,
        G = 0,
        st = 0,
        K = false,
        q = false,
        ct = false,
        J = null,
        lt = null,
        ut = null,
        Y = null,
        dt = 0,
        ft = .45,
        pt = .3,
        mt = .55;
      j.add(new de(16777215, .34 * Math.PI));
      let ht = new se(16777215, .74 * Math.PI);
      ht.position.set(.35, 1, .55);
      let gt = new se(16777215, .2 * Math.PI);
      gt.position.set(-1, .25, -.4), j.add(ht, gt);
      function X(e) {
        return x.rows[e.row]?.cells[e.column] ?? null;
      }
      function _t(e) {
        return e - (He.value - 1) / 2;
      }
      function vt(e) {
        return (e - (x.rows.length - 1) / 2) * x.rowPitch;
      }
      function yt() {
        return He.value / 2;
      }
      function bt() {
        return Math.max(1, x.rows.length) * x.rowPitch / 2;
      }
      function xt() {
        return {
          left: -yt() - dt,
          right: yt(),
          back: -bt(),
          front: bt() + pt
        };
      }
      function St() {
        let {
          left: e,
          right: t,
          back: n,
          front: r
        } = xt();
        return new _((e + t) / 2, Ue.value * .3, (n + r) / 2);
      }
      function Ct() {
        let {
            left: e,
            right: t,
            back: n,
            front: r
          } = xt(),
          i = [];
        for (let count of [e, t]) for (let value of [0, Ue.value]) for (let t of [n, r]) i.push(new _(count, value, t));
        return i;
      }
      function wt() {
        if (!We.value) return 0;
        if (Y ??= document.createElement(`canvas`).getContext(`2d`), !Y) return 64;
        let fontFamily = getComputedStyle(w.value ?? document.body).fontFamily;
        Y.font = `${je} ${fontFamily}`;
        let t = 0;
        for (let e of x.rows) t = Math.max(t, Y.measureText(e.label).width), e.summary && (t = Math.max(t, Y.measureText(e.summary).width));
        return Math.ceil(t) + 4;
      }
      function Tt(e) {
        let t = wt(),
          n = Math.max(4, (e * Ee - t - Me) / He.value),
          r = n * Math.cos(De);
        ft = Me / n, dt = t ? t / n + ft : 0, mt = Ne / r, pt = x.columnLabels.length ? Pe / r : .3;
      }
      function Et(e, t, n, r) {
        e.fillStyle = `#ffffff`, e.fillStyle = t.getPropertyValue(`--background`).trim() || `#ffffff`, e.fillRect(0, 0, 1, 1), e.fillStyle = r, e.fillStyle = t.getPropertyValue(n).trim() || r, e.fillRect(0, 0, 1, 1);
        let [i = 0, a = 0, o = 0] = e.getImageData(0, 0, 1, 1).data;
        return new y().setRGB(i / 255, a / 255, o / 255, v);
      }
      function Dt() {
        let element = document.createElement(`canvas`);
        element.width = 1, element.height = 1;
        let context = element.getContext(`2d`, {
          willReadFrequently: true
        });
        if (!context) {
          V = Re.map(() => new y(1483594));
          return;
        }
        let computedStyle = getComputedStyle(document.documentElement);
        V = Re.map(item => Et(context, computedStyle, item, `#16a34a`)), tt.copy(Et(context, computedStyle, `--foreground`, `#333333`));
      }
      let options = {
          r: 0,
          g: 0,
          b: 0
        },
        Q = {
          r: 0,
          g: 0,
          b: 0
        };
      function Ot() {
        let e = V[0];
        ot = x.rows.map(item => !item.color || !e ? null : (e.getRGB(options, v), new y(item.color).getRGB(Q, v), [e, ...ze.map(e => new y().setRGB(options.r + (Q.r - options.r) * e, options.g + (Q.g - options.g) * e, options.b + (Q.b - options.b) * e, v))]));
      }
      function kt(e, t) {
        if (e <= 0) return 0;
        let n = e / t;
        return n <= .25 ? 1 : n <= .5 ? 2 : n <= .75 ? 3 : 4;
      }
      function At() {
        let e = 1;
        for (let t of x.rows) for (let n of t.cells) n && n.value > e && (e = n.value);
        return e;
      }
      function jt(e, t) {
        let n = emptyItems[e],
          r = n ? (ot[n.row] ?? V)[kt(X(n)?.value ?? 0, t)] : undefined;
        R && r && R.setColorAt(e, e === H ? nt.copy(r).lerp(tt, .28) : r);
      }
      function Mt() {
        if (!R) return;
        let e = At();
        for (let t = 0; t < emptyItems.length; t++) jt(t, e);
        R.instanceColor && (R.instanceColor.needsUpdate = true);
      }
      function Nt(e) {
        if (e === H) return;
        let t = H;
        if (H = e, !R) return;
        let n = At();
        jt(t, n), jt(e, n), R.instanceColor && (R.instanceColor.needsUpdate = true), $();
      }
      function Pt() {
        R && (j.remove(R), R.geometry.dispose(), R.dispose(), R = null, B = null);
      }
      function Ft() {
        if (Pt(), emptyItems = [], x.rows.forEach((item, t) => {
          item.cells.forEach((e, n) => {
            e && emptyItems.push({
              row: t,
              column: n
            });
          });
        }), it = new Float32Array(emptyItems.length).fill(S), at = new Float32Array(emptyItems.length).fill(S), z = new Float32Array(emptyItems.length).fill(S), H = -1, O.value = null, !emptyItems.length) return;
        let e = translate.clone();
        B = new ue(z, 1), B.setUsage(pe), e.setAttribute(`barHeight`, B), R = new ce(e, P, emptyItems.length), R.frustumCulled = false, emptyItems.forEach((item, t) => {
          Qe.makeTranslation(_t(item.column), 0, vt(item.row)), R?.setMatrixAt(t, Qe);
        }), R.instanceMatrix.needsUpdate = true, j.add(R);
      }
      function It() {
        let e = At(),
          value = Ue.value;
        emptyItems.forEach((item, r) => {
          let i = X(item)?.value ?? 0;
          it[r] = z[r] ?? S, at[r] = i > 0 ? Ce + i / e * (value - Ce) : S;
        }), Mt(), st = performance.now(), K = true, $();
      }
      function Lt(e) {
        let t = Math.min(1, Math.max(0, (e - st) / we)),
          n = 1 - (1 - t) ** 3;
        for (let e = 0; e < emptyItems.length; e++) {
          let t = it[e] ?? S;
          z[e] = t + ((at[e] ?? S) - t) * n;
        }
        return B && (B.needsUpdate = true), t < 1;
      }
      function Rt(e) {
        N.copy(M), N.aspect = e, N.far = 1e5, N.updateProjectionMatrix();
      }
      function zt(e, t) {
        N.position.copy(e).addScaledVector(setFromSphericalCoords, t), N.lookAt(e), N.updateMatrixWorld();
      }
      function Bt(e) {
        let t = St(),
          n = Ct();
        Rt(e);
        let r = 2,
          i = 5e3;
        for (let e = 0; e < 24; e++) {
          let e = (r + i) / 2;
          zt(t, e), n.every(item => (F.copy(item).project(N), F.z < 1 && Math.abs(F.x) <= Ee && Math.abs(F.y) <= Ee)) ? i = e : r = e;
        }
        return i;
      }
      function Vt(e) {
        let t = St(),
          n = Ct(),
          r = Bt(1);
        Rt(1), zt(t, r);
        let i = 1 / 0,
          a = -1 / 0,
          o = 1 / 0,
          s = -1 / 0;
        for (let e of n) F.copy(e).project(N), i = Math.min(i, F.x), a = Math.max(a, F.x), o = Math.min(o, F.y), s = Math.max(s, F.y);
        let c = e * ((s - o) / Math.max(.01, a - i));
        return Math.round(Math.min(Ae, Math.max(ke, c)));
      }
      function Ht(e) {
        if (!L) return;
        let t = St(),
          n = Bt(M.aspect),
          scaledVector = t.clone().addScaledVector(setFromSphericalCoords, n);
        L.minDistance = n * .35, L.maxDistance = n * 1.8, M.far = Math.max(600, n * 3), M.updateProjectionMatrix(), q = false, ct = true, e ? J = {
          fromPosition: M.position.clone(),
          toPosition: scaledVector,
          fromTarget: L.target.clone(),
          toTarget: t,
          startedAt: performance.now()
        } : (J = null, L.target.copy(t), M.position.copy(scaledVector), L.update()), $();
      }
      function Ut(e) {
        if (!J || !L) return false;
        let t = Math.min(1, Math.max(0, (e - J.startedAt) / Te)),
          n = 1 - (1 - t) ** 3;
        return M.position.lerpVectors(J.fromPosition, J.toPosition, n), L.target.lerpVectors(J.fromTarget, J.toTarget, n), t >= 1 && (J = null), t < 1;
      }
      function Wt(e, t, n, r, i) {
        return F.set(e, t, n).project(M), {
          x: (F.x + 1) / 2 * r,
          y: (1 - F.y) / 2 * i,
          visible: F.z < 1 && Math.abs(F.x) <= 1.02 && Math.abs(F.y) <= 1.02
        };
      }
      let Gt = {
        x: 0,
        y: 0,
        visible: false
      };
      function Kt() {
        let value = T.value;
        if (!value) return;
        let clientWidth = value.clientWidth,
          clientHeight = value.clientHeight,
          r = x.rows.map((item, r) => item.label ? Wt(-yt() - ft, 0, vt(r), clientWidth, clientHeight) : Gt),
          i = Ge.value ? 28 : 14,
          a = 1 / 0;
        for (let e = r.length - 1; e >= 0; e--) {
          let t = r[e];
          t?.visible && (a - t.y < i ? r[e] = Gt : a = t.y);
        }
        E.value = r;
        let o = -1 / 0;
        D.value = x.columnLabels.map(item => {
          let r = Wt(_t(item.index), 0, bt() + mt, clientWidth, clientHeight);
          return !r.visible || r.x - o < Fe ? Gt : (o = r.x, r);
        });
      }
      function qt(e) {
        if (G = 0, !I || !L) return;
        let t = Ut(e);
        K && (K = Lt(e), t ||= K), L.update(), I.render(j, M), Kt(), t && $();
      }
      function $() {
        I && ct && !G && (G = requestAnimationFrame(qt));
      }
      function Jt() {
        let value = w.value;
        if (!I || !value) return false;
        let clientWidth = value.clientWidth,
          clientHeight = value.clientHeight;
        return !clientWidth || !clientHeight ? false : (I.setPixelRatio(Math.min(window.devicePixelRatio, 2)), I.setSize(clientWidth, clientHeight, false), M.aspect = clientWidth / clientHeight, M.updateProjectionMatrix(), true);
      }
      function Yt(e) {
        let value = w.value;
        if (!I || !value || !value.clientWidth) return;
        Tt(value.clientWidth);
        let n = Vt(value.clientWidth);
        if (Math.abs(n - Ve.value) > 1) {
          Ve.value = n, e && (q = false);
          return;
        }
        Jt() && (q && !e ? $() : Ht(false));
      }
      function Xt() {
        Yt(false);
      }
      async function Zt(e) {
        let value = T.value;
        if (!I || !value || !ct) return null;
        K &&= Lt(1 / 0), Ut(1 / 0), L?.update(), I.setPixelRatio(e), I.render(j, M);
        let toDataURL = value.toDataURL(`image/png`);
        Jt(), I.render(j, M), Kt();
        let r = new Image();
        r.className = `block h-full w-full`, r.src = toDataURL, await r.decode(), value.style.display = `none`, value.after(r);
        let i = Be.value;
        return i && (i.style.display = `none`), () => {
          r.remove(), value.style.display = ``, i && (i.style.display = ``);
        };
      }
      ie({
        freezeForExport: Zt
      });
      function Qt(event) {
        let value = T.value;
        if (!value || !emptyItems.length) return -1;
        let boundingClientRect = value.getBoundingClientRect();
        Ze.set((event.clientX - boundingClientRect.left) / boundingClientRect.width * 2 - 1, -((event.clientY - boundingClientRect.top) / boundingClientRect.height) * 2 + 1), Xe.setFromCamera(Ze, M);
        let r = be / 2,
          i = -1,
          a = 1 / 0;
        return emptyItems.forEach((item, t) => {
          let n = _t(item.column),
            o = vt(item.row);
          if ($e.min.set(n - r, 0, o - r), $e.max.set(n + r, z[t] ?? S, o + r), !Xe.ray.intersectBox($e, et)) return;
          let distanceToSquared = et.distanceToSquared(Xe.ray.origin);
          distanceToSquared < a && (a = distanceToSquared, i = t);
        }), i;
      }
      function $t(e) {
        let t = emptyItems[e],
          n = t ? X(t) : null,
          r = t ? x.rows[t.row] : undefined;
        return t && n && r ? {
          rowKey: r.key,
          cellKey: n.key
        } : null;
      }
      function en(event) {
        if (k.value) return;
        let t = Qt(event),
          n = T.value?.getBoundingClientRect();
        O.value = t >= 0 && n ? {
          index: t,
          x: event.clientX - n.left,
          y: event.clientY - n.top
        } : null;
        let r = $t(t);
        qe.value = x.clickable && t >= 0 && (X(emptyItems[t])?.value ?? 0) > 0, r ? (C(`cell-hover`, {
          ...r,
          event: event
        }), U = true) : U &&= (C(`cell-hover`, null), false), Nt(t);
      }
      function tn() {
        O.value = null, qe.value = false, U &&= (C(`cell-hover`, null), false), Nt(-1);
      }
      function nn(event) {
        k.value = true, payload = {
          x: event.clientX,
          y: event.clientY
        }, tn();
      }
      function rn() {
        k.value = false;
      }
      function an(event) {
        if (!payload) return;
        let t = Math.hypot(event.clientX - payload.x, event.clientY - payload.y);
        if (payload = null, t > Ie) return;
        let n = Qt(event),
          r = $t(n),
          value = T.value;
        if (!r || !value) return;
        let boundingClientRectResult = value.getBoundingClientRect(),
          o = event.clientX - boundingClientRectResult.left,
          s = event.clientY - boundingClientRectResult.top;
        C(`cell-click`, {
          ...r,
          value: X(emptyItems[n])?.value ?? 0,
          anchor: {
            getBoundingClientRect: () => {
              let e = value.getBoundingClientRect();
              return new DOMRect(e.left + o, e.top + s, 1, 1);
            }
          }
        });
      }
      function on(event) {
        L && (L.enableZoom = event.ctrlKey || event.metaKey);
      }
      function sn() {
        Dt(), Ot(), Mt(), $();
      }
      let cn = h(() => x.rows.map(item => item.cells.map(e => +!!e).join(``)).join(`|`)),
        ln = h(() => x.rows.map(state => state.cells.map(item => item?.value ?? ``).join(`,`)).join(`|`)),
        un = h(() => x.rows.map(item => item.color ?? ``).join(`|`));
      return i([cn, ln, un], ([e, t], [n, r]) => {
        I && (Ot(), e !== n && (Ft(), Yt(true)), e !== n || t !== r ? It() : (Mt(), $()));
      }), m(() => {
        let value = T.value,
          t = w.value;
        if (value && t) {
          try {
            I = new le({
              canvas: value,
              alpha: true,
              antialias: window.devicePixelRatio < 2,
              powerPreference: `low-power`,
              failIfMajorPerformanceCaveat: true
            });
          } catch {
            C(`unavailable`);
            return;
          }
          I.setClearColor(0, 0), value.addEventListener(`webglcontextrestored`, $), L = new fe(M, value), L.enableDamping = true, L.dampingFactor = .12, L.enablePan = false, L.enableZoom = false, L.rotateSpeed = .7, L.minPolarAngle = .1, L.maxPolarAngle = 1.36, L.minAzimuthAngle = -Math.PI / 3, L.maxAzimuthAngle = Math.PI / 3, L.addEventListener(`change`, $), L.addEventListener(`start`, () => {
            q = true, J = null;
          }), Dt(), Ot(), Ft(), It(), t.addEventListener(`wheel`, on, {
            capture: true,
            passive: true
          }), window.addEventListener(`pointerup`, rn), window.addEventListener(`pointercancel`, rn), lt = new ResizeObserver(Xt), lt.observe(t), ut = new MutationObserver(sn), ut.observe(document.documentElement, {
            attributes: true,
            attributeFilter: [`class`]
          });
        }
      }), f(() => {
        G && cancelAnimationFrame(G), G = 0, lt?.disconnect(), ut?.disconnect(), w.value?.removeEventListener(`wheel`, on, {
          capture: true
        }), T.value?.removeEventListener(`webglcontextrestored`, $), window.removeEventListener(`pointerup`, rn), window.removeEventListener(`pointercancel`, rn), U && C(`cell-hover`, null), L?.dispose(), L = null, Pt(), emptyItems = [], translate.dispose(), P.dispose(), I?.dispose(), I?.forceContextLoss(), I = null;
      }), (i, o) => (c(), n(`div`, null, [g(`div`, {
        ref_key: `containerRef`,
        ref: w,
        class: `relative select-none overflow-hidden`,
        style: d({
          height: `${Ve.value}px`
        })
      }, [g(`canvas`, {
        ref_key: `canvasRef`,
        ref: T,
        class: e([`block h-full w-full`, k.value ? `cursor-grabbing` : `cursor-grab`]),
        style: d(qe.value && !k.value ? {
          cursor: `pointer`
        } : undefined),
        onPointermove: en,
        onPointerleave: tn,
        onPointerdown: nn,
        onClick: an,
        onDblclick: o[0] ||= e => Ht(true)
      }, null, 38), We.value ? (c(true), n(s, {
        key: 0
      }, r(l.rows, (event, t) => a((c(), n(`div`, {
        key: event.key,
        class: `pointer-events-none absolute -translate-x-full -translate-y-1/2 text-right`,
        style: d({
          left: `${E.value[t]?.x ?? 0}px`,
          top: `${E.value[t]?.y ?? 0}px`
        })
      }, [g(`span`, ve, p(event.label), 1), event.summary ? (c(), n(`div`, ye, p(event.summary), 1)) : ee(``, true)], 4)), [[te, E.value[t]?.visible]])), 128)) : ee(``, true), (c(true), n(s, null, r(l.columnLabels, (e, t) => a((c(), n(`span`, {
        key: `${e.index}-${e.text}`,
        class: `pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 text-xs text-[#bbb] leading-none whitespace-nowrap dark:text-muted-foreground/70`,
        style: d({
          left: `${D.value[t]?.x ?? 0}px`,
          top: `${D.value[t]?.y ?? 0}px`
        })
      }, p(e.text), 5)), [[te, D.value[t]?.visible]])), 128)), O.value && Ke.value ? (c(), n(`div`, {
        key: 1,
        class: `pointer-events-none absolute z-10 whitespace-nowrap rounded-md bg-[#1f2328]/90 px-2 py-1 text-xs text-white shadow-sm dark:bg-black/80`,
        style: d(Je.value)
      }, p(Ke.value), 5)) : ee(``, true)], 4), g(`p`, {
        ref_key: `hintRef`,
        ref: Be,
        class: `mt-1.5 text-right text-xs text-[#bbb] leading-none dark:text-muted-foreground/70`
      }, p(l.hint ?? t(Le)(`todayWork.heatmap3dHint`)), 513)]));
    }
  });
export { C as default };