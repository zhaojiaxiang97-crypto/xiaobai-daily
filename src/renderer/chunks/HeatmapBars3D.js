import { $n as e, An as t, S as n, St as r, Wt as i, Zt as a, bn as o, c as s, gt as c, j as l, n as u, nr as d, ot as f, rr as p, ut as m, v as h, x as ee, y as g } from "./vue-i18n.runtime.js";
import { w as te } from "../i18n/en-US-player.js";
import { C as ne, E as _, S as v, T as re, a as ie, h as ae, i as oe, l as se, m as ce, n as le, p as ue, r as de, s as y, t as fe, u as pe, v as me, x as he, y as ge } from "../vendors/OrbitControls.js";
var b = new _();
function x(e, t, n, r, i, a) {
  let o = 2 * Math.PI * i / 4,
    s = Math.max(a - 2 * i, 0),
    c = Math.PI / 4;
  b.copy(t), b[r] = 0, b.normalize();
  let l = .5 * o / (o + s),
    u = 1 - b.angleTo(e) / c;
  return Math.sign(b[n]) === 1 ? u * l : s / (o + s) + l + l * (1 - u);
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
      let o = this.toNonIndexed();
      this.index = null, this.attributes.position = o.attributes.position, this.attributes.normal = o.attributes.normal, this.attributes.uv = o.attributes.uv;
      let s = new _(),
        c = new _(),
        l = new _(e, t, n).divideScalar(2).subScalar(i),
        array = this.attributes.position.array,
        d = this.attributes.normal.array,
        f = this.attributes.uv.array,
        p = array.length / 6,
        m = new _(),
        h = .5 / a;
      for (let r = 0, a = 0; r < array.length; r += 3, a += 2) switch (s.fromArray(array, r), c.copy(s), c.x -= Math.sign(c.x) * h, c.y -= Math.sign(c.y) * h, c.z -= Math.sign(c.z) * h, c.normalize(), array[r + 0] = l.x * Math.sign(s.x) + c.x * i, array[r + 1] = l.y * Math.sign(s.y) + c.y * i, array[r + 2] = l.z * Math.sign(s.z) + c.z * i, d[r + 0] = c.x, d[r + 1] = c.y, d[r + 2] = c.z, Math.floor(r / p)) {
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
        default: !1
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
        k = o(!1),
        He = h(() => Math.max(1, ...x.rows.map(e => e.cells.length))),
        Ue = h(() => Math.max(3, He.value * .125)),
        We = h(() => x.rows.some(e => e.label)),
        Ge = h(() => x.rows.some(e => e.summary)),
        A = [],
        Ke = h(() => {
          if (!O.value) return ``;
          let e = A[O.value.index];
          return e ? X(e)?.tooltip ?? `` : ``;
        }),
        qe = o(!1),
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
        Ye = new _e(be, 1, be, Se, xe).translate(0, .5, 0),
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
        rt = new _().setFromSphericalCoords(1, De, Oe),
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
        U = !1,
        W = null,
        G = 0,
        st = 0,
        K = !1,
        q = !1,
        ct = !1,
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
        for (let a of [e, t]) for (let e of [0, Ue.value]) for (let t of [n, r]) i.push(new _(a, e, t));
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
        let e = document.createElement(`canvas`);
        e.width = 1, e.height = 1;
        let t = e.getContext(`2d`, {
          willReadFrequently: !0
        });
        if (!t) {
          V = Re.map(() => new y(1483594));
          return;
        }
        let n = getComputedStyle(document.documentElement);
        V = Re.map(e => Et(t, n, e, `#16a34a`)), tt.copy(Et(t, n, `--foreground`, `#333333`));
      }
      let Z = {
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
        ot = x.rows.map(t => !t.color || !e ? null : (e.getRGB(Z, v), new y(t.color).getRGB(Q, v), [e, ...ze.map(e => new y().setRGB(Z.r + (Q.r - Z.r) * e, Z.g + (Q.g - Z.g) * e, Z.b + (Q.b - Z.b) * e, v))]));
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
        let n = A[e],
          r = n ? (ot[n.row] ?? V)[kt(X(n)?.value ?? 0, t)] : void 0;
        R && r && R.setColorAt(e, e === H ? nt.copy(r).lerp(tt, .28) : r);
      }
      function Mt() {
        if (!R) return;
        let e = At();
        for (let t = 0; t < A.length; t++) jt(t, e);
        R.instanceColor && (R.instanceColor.needsUpdate = !0);
      }
      function Nt(e) {
        if (e === H) return;
        let t = H;
        if (H = e, !R) return;
        let n = At();
        jt(t, n), jt(e, n), R.instanceColor && (R.instanceColor.needsUpdate = !0), $();
      }
      function Pt() {
        R && (j.remove(R), R.geometry.dispose(), R.dispose(), R = null, B = null);
      }
      function Ft() {
        if (Pt(), A = [], x.rows.forEach((e, t) => {
          e.cells.forEach((e, n) => {
            e && A.push({
              row: t,
              column: n
            });
          });
        }), it = new Float32Array(A.length).fill(S), at = new Float32Array(A.length).fill(S), z = new Float32Array(A.length).fill(S), H = -1, O.value = null, !A.length) return;
        let e = Ye.clone();
        B = new ue(z, 1), B.setUsage(pe), e.setAttribute(`barHeight`, B), R = new ce(e, P, A.length), R.frustumCulled = !1, A.forEach((e, t) => {
          Qe.makeTranslation(_t(e.column), 0, vt(e.row)), R?.setMatrixAt(t, Qe);
        }), R.instanceMatrix.needsUpdate = !0, j.add(R);
      }
      function It() {
        let e = At(),
          t = Ue.value;
        A.forEach((n, r) => {
          let i = X(n)?.value ?? 0;
          it[r] = z[r] ?? S, at[r] = i > 0 ? Ce + i / e * (t - Ce) : S;
        }), Mt(), st = performance.now(), K = !0, $();
      }
      function Lt(e) {
        let t = Math.min(1, Math.max(0, (e - st) / we)),
          n = 1 - (1 - t) ** 3;
        for (let e = 0; e < A.length; e++) {
          let t = it[e] ?? S;
          z[e] = t + ((at[e] ?? S) - t) * n;
        }
        return B && (B.needsUpdate = !0), t < 1;
      }
      function Rt(e) {
        N.copy(M), N.aspect = e, N.far = 1e5, N.updateProjectionMatrix();
      }
      function zt(e, t) {
        N.position.copy(e).addScaledVector(rt, t), N.lookAt(e), N.updateMatrixWorld();
      }
      function Bt(e) {
        let t = St(),
          n = Ct();
        Rt(e);
        let r = 2,
          i = 5e3;
        for (let e = 0; e < 24; e++) {
          let e = (r + i) / 2;
          zt(t, e), n.every(e => (F.copy(e).project(N), F.z < 1 && Math.abs(F.x) <= Ee && Math.abs(F.y) <= Ee)) ? i = e : r = e;
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
          r = t.clone().addScaledVector(rt, n);
        L.minDistance = n * .35, L.maxDistance = n * 1.8, M.far = Math.max(600, n * 3), M.updateProjectionMatrix(), q = !1, ct = !0, e ? J = {
          fromPosition: M.position.clone(),
          toPosition: r,
          fromTarget: L.target.clone(),
          toTarget: t,
          startedAt: performance.now()
        } : (J = null, L.target.copy(t), M.position.copy(r), L.update()), $();
      }
      function Ut(e) {
        if (!J || !L) return !1;
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
        visible: !1
      };
      function Kt() {
        let e = T.value;
        if (!e) return;
        let clientWidth = e.clientWidth,
          clientHeight = e.clientHeight,
          r = x.rows.map((e, r) => e.label ? Wt(-yt() - ft, 0, vt(r), clientWidth, clientHeight) : Gt),
          i = Ge.value ? 28 : 14,
          a = 1 / 0;
        for (let e = r.length - 1; e >= 0; e--) {
          let t = r[e];
          t?.visible && (a - t.y < i ? r[e] = Gt : a = t.y);
        }
        E.value = r;
        let o = -1 / 0;
        D.value = x.columnLabels.map(e => {
          let r = Wt(_t(e.index), 0, bt() + mt, clientWidth, clientHeight);
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
        let e = w.value;
        if (!I || !e) return !1;
        let clientWidth = e.clientWidth,
          clientHeight = e.clientHeight;
        return !clientWidth || !clientHeight ? !1 : (I.setPixelRatio(Math.min(window.devicePixelRatio, 2)), I.setSize(clientWidth, clientHeight, !1), M.aspect = clientWidth / clientHeight, M.updateProjectionMatrix(), !0);
      }
      function Yt(e) {
        let t = w.value;
        if (!I || !t || !t.clientWidth) return;
        Tt(t.clientWidth);
        let n = Vt(t.clientWidth);
        if (Math.abs(n - Ve.value) > 1) {
          Ve.value = n, e && (q = !1);
          return;
        }
        Jt() && (q && !e ? $() : Ht(!1));
      }
      function Xt() {
        Yt(!1);
      }
      async function Zt(e) {
        let t = T.value;
        if (!I || !t || !ct) return null;
        K &&= Lt(1 / 0), Ut(1 / 0), L?.update(), I.setPixelRatio(e), I.render(j, M);
        let n = t.toDataURL(`image/png`);
        Jt(), I.render(j, M), Kt();
        let r = new Image();
        r.className = `block h-full w-full`, r.src = n, await r.decode(), t.style.display = `none`, t.after(r);
        let i = Be.value;
        return i && (i.style.display = `none`), () => {
          r.remove(), t.style.display = ``, i && (i.style.display = ``);
        };
      }
      ie({
        freezeForExport: Zt
      });
      function Qt(event) {
        let t = T.value;
        if (!t || !A.length) return -1;
        let n = t.getBoundingClientRect();
        Ze.set((event.clientX - n.left) / n.width * 2 - 1, -((event.clientY - n.top) / n.height) * 2 + 1), Xe.setFromCamera(Ze, M);
        let r = be / 2,
          i = -1,
          a = 1 / 0;
        return A.forEach((e, t) => {
          let n = _t(e.column),
            o = vt(e.row);
          if ($e.min.set(n - r, 0, o - r), $e.max.set(n + r, z[t] ?? S, o + r), !Xe.ray.intersectBox($e, et)) return;
          let s = et.distanceToSquared(Xe.ray.origin);
          s < a && (a = s, i = t);
        }), i;
      }
      function $t(e) {
        let t = A[e],
          n = t ? X(t) : null,
          r = t ? x.rows[t.row] : void 0;
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
        qe.value = x.clickable && t >= 0 && (X(A[t])?.value ?? 0) > 0, r ? (C(`cell-hover`, {
          ...r,
          event: event
        }), U = !0) : U &&= (C(`cell-hover`, null), !1), Nt(t);
      }
      function tn() {
        O.value = null, qe.value = !1, U &&= (C(`cell-hover`, null), !1), Nt(-1);
      }
      function nn(event) {
        k.value = !0, W = {
          x: event.clientX,
          y: event.clientY
        }, tn();
      }
      function rn() {
        k.value = !1;
      }
      function an(event) {
        if (!W) return;
        let t = Math.hypot(event.clientX - W.x, event.clientY - W.y);
        if (W = null, t > Ie) return;
        let n = Qt(event),
          r = $t(n),
          i = T.value;
        if (!r || !i) return;
        let a = i.getBoundingClientRect(),
          o = event.clientX - a.left,
          s = event.clientY - a.top;
        C(`cell-click`, {
          ...r,
          value: X(A[n])?.value ?? 0,
          anchor: {
            getBoundingClientRect: () => {
              let e = i.getBoundingClientRect();
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
      let cn = h(() => x.rows.map(e => e.cells.map(e => +!!e).join(``)).join(`|`)),
        ln = h(() => x.rows.map(state => state.cells.map(e => e?.value ?? ``).join(`,`)).join(`|`)),
        un = h(() => x.rows.map(e => e.color ?? ``).join(`|`));
      return i([cn, ln, un], ([e, t], [n, r]) => {
        I && (Ot(), e !== n && (Ft(), Yt(!0)), e !== n || t !== r ? It() : (Mt(), $()));
      }), m(() => {
        let e = T.value,
          t = w.value;
        if (e && t) {
          try {
            I = new le({
              canvas: e,
              alpha: !0,
              antialias: window.devicePixelRatio < 2,
              powerPreference: `low-power`,
              failIfMajorPerformanceCaveat: !0
            });
          } catch {
            C(`unavailable`);
            return;
          }
          I.setClearColor(0, 0), e.addEventListener(`webglcontextrestored`, $), L = new fe(M, e), L.enableDamping = !0, L.dampingFactor = .12, L.enablePan = !1, L.enableZoom = !1, L.rotateSpeed = .7, L.minPolarAngle = .1, L.maxPolarAngle = 1.36, L.minAzimuthAngle = -Math.PI / 3, L.maxAzimuthAngle = Math.PI / 3, L.addEventListener(`change`, $), L.addEventListener(`start`, () => {
            q = !0, J = null;
          }), Dt(), Ot(), Ft(), It(), t.addEventListener(`wheel`, on, {
            capture: !0,
            passive: !0
          }), window.addEventListener(`pointerup`, rn), window.addEventListener(`pointercancel`, rn), lt = new ResizeObserver(Xt), lt.observe(t), ut = new MutationObserver(sn), ut.observe(document.documentElement, {
            attributes: !0,
            attributeFilter: [`class`]
          });
        }
      }), f(() => {
        G && cancelAnimationFrame(G), G = 0, lt?.disconnect(), ut?.disconnect(), w.value?.removeEventListener(`wheel`, on, {
          capture: !0
        }), T.value?.removeEventListener(`webglcontextrestored`, $), window.removeEventListener(`pointerup`, rn), window.removeEventListener(`pointercancel`, rn), U && C(`cell-hover`, null), L?.dispose(), L = null, Pt(), A = [], Ye.dispose(), P.dispose(), I?.dispose(), I?.forceContextLoss(), I = null;
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
        } : void 0),
        onPointermove: en,
        onPointerleave: tn,
        onPointerdown: nn,
        onClick: an,
        onDblclick: o[0] ||= e => Ht(!0)
      }, null, 38), We.value ? (c(!0), n(s, {
        key: 0
      }, r(l.rows, (event, t) => a((c(), n(`div`, {
        key: event.key,
        class: `pointer-events-none absolute -translate-x-full -translate-y-1/2 text-right`,
        style: d({
          left: `${E.value[t]?.x ?? 0}px`,
          top: `${E.value[t]?.y ?? 0}px`
        })
      }, [g(`span`, ve, p(event.label), 1), event.summary ? (c(), n(`div`, ye, p(event.summary), 1)) : ee(``, !0)], 4)), [[te, E.value[t]?.visible]])), 128)) : ee(``, !0), (c(!0), n(s, null, r(l.columnLabels, (e, t) => a((c(), n(`span`, {
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
      }, p(Ke.value), 5)) : ee(``, !0)], 4), g(`p`, {
        ref_key: `hintRef`,
        ref: Be,
        class: `mt-1.5 text-right text-xs text-[#bbb] leading-none dark:text-muted-foreground/70`
      }, p(l.hint ?? t(Le)(`todayWork.heatmap3dHint`)), 513)]));
    }
  });
export { C as default };