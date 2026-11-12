<template>
<div><div ref="w" :class="`relative select-none overflow-hidden`" :style="d({height:`${Ve.value}px`})"><canvas ref="T" :class="[`block h-full w-full`,k.value?`cursor-grabbing`:`cursor-grab`]" :style="d(qe.value&&!k.value?{cursor:`pointer`}:undefined)" @pointermove="en" @pointerleave="tn" @pointerdown="nn" @click="an" @dblclick="e_3_4=>Ht(true)"></canvas><span v-text="We.value?(c_15(true),n_6(s_14,{key:0},r_7(l_0.rows,(event,t_5)=>a_9_12((c_15(),n_6(`div`,{key:event.key,class:`pointer-events-none absolute -translate-x_1_2-full -translate-y-1/2 text-right`,style:d({left:`${E.value[t_5]?.x??0}px`,top:`${E.value[t_5]?.y??0}px`})},[g(`span`,ve,p(event.label),1),event.summary?(c_15(),n_6(`div`,ye,p(event.summary),1)):ee(``,true)],4)),[[te,E.value[t_5]?.visible]])),128)):undefined" /><div :class="`pointer-events-none absolute z-10 whitespace-nowrap rounded-md bg-[#1f2328]/90 px-2 py-1 text-xs text-white shadow-sm dark:bg-black/80`" :style="d(Je.value)">{{ Ke.value }}</div></div><p ref="Be" :class="`mt-1.5 text-right text-xs text-[#bbb] leading-none dark:text-muted-foreground/70`">{{ l_0.hint??Le(`todayWork.heatmap3dHint`) }}</p></div>
</template>

<script setup>
import { normalizeClass as e, unref as t, createElementBlock as n, renderList as r, watch as i, Fragment as s, openBlock as c, defineComponent as l, onMounted as f, toDisplayString as p, onBeforeMount as m, computed as h, createCommentVNode as ee, createElementVNode as g } from 'vue';
import { w as te } from '../vendor/i18n/en-US-player.js';
import { C as ne, E as _, S as v, T as re, a as ie, h as ae, i as oe, l as se, m as ce, n as le, p as ue, r as de, s as y, t as fe, u as pe, v as me, x as he, y as ge } from '../vendor/vendors/OrbitControls.js';

const l_0 = defineProps({
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
});
const x = l_0;
var b = new _();
function x_1(el, t_5, items, r_7, i_8_11, a_9_12) {
  let o_10_13 = 2 * Math.PI * i_8_11 / 4,
    s_14 = Math.max(a_9_12 - 2 * i_8_11, 0),
    c_15 = Math.PI / 4;
  b.copy(t_5), b[r_7] = 0, b.normalize();
  let l_0 = .5 * o_10_13 / (o_10_13 + s_14),
    u = 1 - b.angleTo(el) / c_15;
  return Math.sign(b[items]) === 1 ? u * l_0 : s_14 / (o_10_13 + s_14) + l_0 + l_0 * (1 - u);
}
var _e = class e_3_4 extends ie {
  constructor(e_3_4 = 1, t_5 = 1, n_6 = 1, r_7 = 2, i_8_11 = .1) {
    let a_9_12 = r_7 * 2 + 1;
    if (i_8_11 = Math.min(e_3_4 / 2, t_5 / 2, n_6 / 2, i_8_11), super(1, 1, 1, a_9_12, a_9_12, a_9_12), this.type = `RoundedBoxGeometry`, this.parameters = {
      width: e_3_4,
      height: t_5,
      depth: n_6,
      segments: r_7,
      radius: i_8_11
    }, a_9_12 === 1) return;
    let toNonIndexed = this.toNonIndexed();
    this.index = null, this.attributes.position = toNonIndexed.attributes.position, this.attributes.normal = toNonIndexed.attributes.normal, this.attributes.uv = toNonIndexed.attributes.uv;
    let s_14 = new _(),
      c_15 = new _(),
      subScalar = new _(e_3_4, t_5, n_6).divideScalar(2).subScalar(i_8_11),
      array = this.attributes.position.array,
      d = this.attributes.normal.array,
      f = this.attributes.uv.array,
      p = array.length / 6,
      m = new _(),
      h = .5 / a_9_12;
    for (let r_7 = 0, a_9_12 = 0; r_7 < array.length; r_7 += 3, a_9_12 += 2) switch (s_14.fromArray(array, r_7), c_15.copy(s_14), c_15.x -= Math.sign(c_15.x) * h, c_15.y -= Math.sign(c_15.y) * h, c_15.z -= Math.sign(c_15.z) * h, c_15.normalize(), array[r_7 + 0] = subScalar.x * Math.sign(s_14.x) + c_15.x * i_8_11, array[r_7 + 1] = subScalar.y * Math.sign(s_14.y) + c_15.y * i_8_11, array[r_7 + 2] = subScalar.z * Math.sign(s_14.z) + c_15.z * i_8_11, d[r_7 + 0] = c_15.x, d[r_7 + 1] = c_15.y, d[r_7 + 2] = c_15.z, Math.floor(r_7 / p)) {
      case 0:
        m.set(1, 0, 0), f[a_9_12 + 0] = x_1_2(m, c_15, `z`, `y`, i_8_11, n_6), f[a_9_12 + 1] = 1 - x_1_2(m, c_15, `y`, `z`, i_8_11, t_5);
        break;
      case 1:
        m.set(-1, 0, 0), f[a_9_12 + 0] = 1 - x_1_2(m, c_15, `z`, `y`, i_8_11, n_6), f[a_9_12 + 1] = 1 - x_1_2(m, c_15, `y`, `z`, i_8_11, t_5);
        break;
      case 2:
        m.set(0, 1, 0), f[a_9_12 + 0] = 1 - x_1_2(m, c_15, `x`, `z`, i_8_11, e_3_4), f[a_9_12 + 1] = x_1_2(m, c_15, `z`, `x`, i_8_11, n_6);
        break;
      case 3:
        m.set(0, -1, 0), f[a_9_12 + 0] = 1 - x_1_2(m, c_15, `x`, `z`, i_8_11, e_3_4), f[a_9_12 + 1] = 1 - x_1_2(m, c_15, `z`, `x`, i_8_11, n_6);
        break;
      case 4:
        m.set(0, 0, 1), f[a_9_12 + 0] = 1 - x_1_2(m, c_15, `x`, `y`, i_8_11, e_3_4), f[a_9_12 + 1] = 1 - x_1_2(m, c_15, `y`, `x`, i_8_11, t_5);
        break;
      case 5:
        m.set(0, 0, -1), f[a_9_12 + 0] = x_1_2(m, c_15, `x`, `y`, i_8_11, e_3_4), f[a_9_12 + 1] = 1 - x_1_2(m, c_15, `y`, `x`, i_8_11, t_5);
    }
  }
  static fromJSON(t_5) {
    return new e_3_4(t_5.width, t_5.height, t_5.depth, t_5.segments, t_5.radius);
  }
};
var ve = {
  class: `text-xs text-[#555] font-medium leading-none whitespace-nowrap dark:text-foreground`
};
var ye = {
  key: 0,
  class: `text-xs text-[#bbb] leading-none mt-0.5 whitespace-nowrap dark:text-muted-foreground`
};
var be = .74;
var xe = .12;
var Se = 2;
var Ce = .16;
var S = .04;
var we = 520;
var Te = 420;
var Ee = .94;
var De = .98;
var Oe = .22;
var ke = 200;
var Ae = 440;
var je = `500 12px`;
var Me = 8;
var Ne = 12;
var Pe = 22;
var Fe = 36;
var Ie = 4;
let x_1_2 = l_0,
  C = b,
  {
    t: Le
  } = u(),
  Re = [`--heatmap-empty`, `--heatmap-1`, `--heatmap-2`, `--heatmap-3`, `--heatmap-4`],
  ze = [.45, .65, .85, 1],
  w = o_10_13(null),
  T = o_10_13(null),
  Be = o_10_13(null),
  Ve = o_10_13(260),
  E = o_10_13([]),
  D = o_10_13([]),
  O = o_10_13(null),
  k = o_10_13(false),
  He = h(() => Math.max(1, ...x_1_2.rows.map(item => item.cells.length))),
  Ue = h(() => Math.max(3, He.value * .125)),
  We = h(() => x_1_2.rows.some(item => item.label)),
  Ge = h(() => x_1_2.rows.some(item => item.summary)),
  emptyItems = [],
  Ke = h(() => {
    if (!O.value) return ``;
    let e_3_4 = emptyItems[O.value.index];
    return e_3_4 ? X(e_3_4)?.tooltip ?? `` : ``;
  }),
  qe = o_10_13(false),
  Je = h(() => {
    if (!O.value) return {};
    let e_3_4 = w.value?.clientWidth ?? 0;
    return {
      left: `${Math.min(Math.max(O.value.x, 72), Math.max(72, e_3_4 - 72))}px`,
      top: `${O.value.y}px`,
      transform: O.value.y < 40 ? `translate(-50%, 16px)` : `translate(-50%, calc(-100% - 10px))`
    };
  }),
  j = new ne(),
  M = new ge(14, 1, .5, 600),
  N = new ge(),
  translate = new _e(be, 1, be, Se, xe).translate(0, .5, 0),
  P = new me();
let e_3 = emptyItems[O.value.index];
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
let {
  left: e_3_4,
  right: t_5,
  back: n_6,
  front: r_7
} = xt();
let value;
let [i_8 = 0, a_9 = 0, o_10 = 0] = e_3.getImageData(0, 0, 1, 1).data;
let i_8_11 = 1 / 0,
  a_9_12 = -1 / 0,
  o_10_13 = 1 / 0,
  s_14 = -1 / 0;
let c_15 = e_3 * ((s_14 - o_10) / Math.max(.01, a_9 - i_8));
function Ht(e_3) {
  if (!L) return;
  let t_5 = St(),
    n_6 = Bt(M.aspect),
    scaledVector = t_5.clone().addScaledVector(setFromSphericalCoords, n_6);
  L.minDistance = n_6 * .35, L.maxDistance = n_6 * 1.8, M.far = Math.max(600, n_6 * 3), M.updateProjectionMatrix(), q = false, ct = true, e_3 ? J = {
    fromPosition: M.position.clone(),
    toPosition: scaledVector,
    fromTarget: L.target.clone(),
    toTarget: t_5,
    startedAt: performance.now()
  } : (J = null, L.target.copy(t_5), M.position.copy(scaledVector), L.update()), $();
}
function $() {
  I && ct && !G && (G = requestAnimationFrame(qt));
}
function en(event) {
  if (k.value) return;
  let t_5 = Qt(event),
    n_6 = T.value?.getBoundingClientRect();
  O.value = t_5 >= 0 && n_6 ? {
    index: t_5,
    x: event.clientX - n_6.left,
    y: event.clientY - n_6.top
  } : null;
  let r_7 = $t(t_5);
  qe.value = x_1.clickable && t_5 >= 0 && (X(emptyItems[t_5])?.value ?? 0) > 0, r_7 ? (C(`cell-hover`, {
    ...r_7,
    event: event
  }), U = true) : U &&= (C(`cell-hover`, null), false), Nt(t_5);
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
function an(event) {
  if (!payload) return;
  let t_5 = Math.hypot(event.clientX - payload.x, event.clientY - payload.y);
  if (payload = null, t_5 > Ie) return;
  let n_6 = Qt(event),
    r_7 = $t(n_6),
    value = T.value;
  if (!r_7 || !value) return;
  let boundingClientRectResult = value.getBoundingClientRect(),
    o_10 = event.clientX - boundingClientRectResult.left,
    s_14 = event.clientY - boundingClientRectResult.top;
  C(`cell-click`, {
    ...r_7,
    value: X(emptyItems[n_6])?.value ?? 0,
    anchor: {
      getBoundingClientRect: () => {
        let e_3 = value.getBoundingClientRect();
        return new DOMRect(e_3.left + o_10, e_3.top + s_14, 1, 1);
      }
    }
  });
}
function X(e_3) {
  return x_1.rows[e_3.row]?.cells[e_3.column] ?? null;
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
    left: e_3,
    right: t_5,
    back: n_6,
    front: r_7
  } = xt();
  return new _((e_3 + t_5) / 2, Ue.value * .3, (n_6 + r_7) / 2);
}
function Nt(e_3) {
  if (e_3 === H) return;
  let t_5 = H;
  if (H = e_3, !R) return;
  let n_6 = At();
  jt(t_5, n_6), jt(e_3, n_6), R.instanceColor && (R.instanceColor.needsUpdate = true), $();
}
function Bt(e_3) {
  let t_5 = St(),
    n_6 = Ct();
  Rt(e_3);
  let r_7 = 2,
    i_8 = 5e3;
  for (let e_3 = 0; e_3 < 24; e_3++) {
    let e_3 = (r_7 + i_8) / 2;
    zt(t_5, e_3), n_6.every(item => (F.copy(item).project(N), F.z < 1 && Math.abs(F.x) <= Ee && Math.abs(F.y) <= Ee)) ? i_8 = e_3 : r_7 = e_3;
  }
  return i_8;
}
function qt(e_3) {
  if (G = 0, !I || !L) return;
  let t_5 = Ut(e_3);
  K && (K = Lt(e_3), t_5 ||= K), L.update(), I.render(j, M), Kt(), t_5 && $();
}
function Qt(event) {
  let value = T.value;
  if (!value || !emptyItems.length) return -1;
  let boundingClientRect = value.getBoundingClientRect();
  Ze.set((event.clientX - boundingClientRect.left) / boundingClientRect.width * 2 - 1, -((event.clientY - boundingClientRect.top) / boundingClientRect.height) * 2 + 1), Xe.setFromCamera(Ze, M);
  let r_7 = be / 2,
    i_8 = -1,
    a_9 = 1 / 0;
  return emptyItems.forEach((item, t_5) => {
    let n_6 = _t(item.column),
      o_10 = vt(item.row);
    if ($e.min.set(n_6 - r_7, 0, o_10 - r_7), $e.max.set(n_6 + r_7, z[t_5] ?? S, o_10 + r_7), !Xe.ray.intersectBox($e, et)) return;
    let distanceToSquared = et.distanceToSquared(Xe.ray.origin);
    distanceToSquared < a_9 && (a_9 = distanceToSquared, i_8 = t_5);
  }), i_8;
}
function $t(e_3) {
  let t_5 = emptyItems[e_3],
    n_6 = t_5 ? X(t_5) : null,
    r_7 = t_5 ? x_1.rows[t_5.row] : undefined;
  return t_5 && n_6 && r_7 ? {
    rowKey: r_7.key,
    cellKey: n_6.key
  } : null;
}
function _t(e_3) {
  return e_3 - (He.value - 1) / 2;
}
function vt(e_3) {
  return (e_3 - (x_1.rows.length - 1) / 2) * x_1.rowPitch;
}
function yt() {
  return He.value / 2;
}
function bt() {
  return Math.max(1, x_1.rows.length) * x_1.rowPitch / 2;
}
function Ct() {
  let {
      left: e_3,
      right: t_5,
      back: n_6,
      front: r_7
    } = xt(),
    i_8 = [];
  for (let count of [e_3, t_5]) for (let value of [0, Ue.value]) for (let t_5 of [n_6, r_7]) i_8.push(new _(count, value, t_5));
  return i_8;
}
function At() {
  let e_3 = 1;
  for (let t_5 of x_1.rows) for (let n_6 of t_5.cells) n_6 && n_6.value > e_3 && (e_3 = n_6.value);
  return e_3;
}
function jt(e_3, t_5) {
  let n_6 = emptyItems[e_3],
    r_7 = n_6 ? (ot[n_6.row] ?? V)[kt(X(n_6)?.value ?? 0, t_5)] : undefined;
  R && r_7 && R.setColorAt(e_3, e_3 === H ? nt.copy(r_7).lerp(tt, .28) : r_7);
}
function Lt(e_3) {
  let t_5 = Math.min(1, Math.max(0, (e_3 - st) / we)),
    n_6 = 1 - (1 - t_5) ** 3;
  for (let e_3 = 0; e_3 < emptyItems.length; e_3++) {
    let t_5 = it[e_3] ?? S;
    z[e_3] = t_5 + ((at[e_3] ?? S) - t_5) * n_6;
  }
  return B && (B.needsUpdate = true), t_5 < 1;
}
function Rt(e_3) {
  N.copy(M), N.aspect = e_3, N.far = 1e5, N.updateProjectionMatrix();
}
function zt(e_3, t_5) {
  N.position.copy(e_3).addScaledVector(setFromSphericalCoords, t_5), N.lookAt(e_3), N.updateMatrixWorld();
}
function Ut(e_3) {
  if (!J || !L) return false;
  let t_5 = Math.min(1, Math.max(0, (e_3 - J.startedAt) / Te)),
    n_6 = 1 - (1 - t_5) ** 3;
  return M.position.lerpVectors(J.fromPosition, J.toPosition, n_6), L.target.lerpVectors(J.fromTarget, J.toTarget, n_6), t_5 >= 1 && (J = null), t_5 < 1;
}
function Kt() {
  let value = T.value;
  if (!value) return;
  let clientWidth = value.clientWidth,
    clientHeight = value.clientHeight,
    r_7 = x_1.rows.map((item, r_7) => item.label ? Wt(-yt() - ft, 0, vt(r_7), clientWidth, clientHeight) : Gt),
    i_8 = Ge.value ? 28 : 14,
    a_9 = 1 / 0;
  for (let e_3 = r_7.length - 1; e_3 >= 0; e_3--) {
    let t_5 = r_7[e_3];
    t_5?.visible && (a_9 - t_5.y < i_8 ? r_7[e_3] = Gt : a_9 = t_5.y);
  }
  E.value = r_7;
  let o_10 = -1 / 0;
  D.value = x_1.columnLabels.map(item => {
    let r_7 = Wt(_t(item.index), 0, bt() + mt, clientWidth, clientHeight);
    return !r_7.visible || r_7.x - o_10 < Fe ? Gt : (o_10 = r_7.x, r_7);
  });
}
function kt(e_3, t_5) {
  if (e_3 <= 0) return 0;
  let n_6 = e_3 / t_5;
  return n_6 <= .25 ? 1 : n_6 <= .5 ? 2 : n_6 <= .75 ? 3 : 4;
}
function Wt(e_3, t_5, n_6, r_7, i_8) {
  return F.set(e_3, t_5, n_6).project(M), {
    x: (F.x + 1) / 2 * r_7,
    y: (1 - F.y) / 2 * i_8,
    visible: F.z < 1 && Math.abs(F.x) <= 1.02 && Math.abs(F.y) <= 1.02
  };
}
let Gt = {
  x: 0,
  y: 0,
  visible: false
};
</script>
