<template>
<div><div ref="C_10" :class="`relative select-none overflow-hidden`" :style="d({height:`${O_15.value}px`})"><canvas ref="w_11" :class="[`block h-full w_11-full`,T_12.value?`cursor-grabbing`:`cursor-grab`]" role="img" :aria-label="props.label" @pointermove="ne_1" @pointerleave="q_2" @pointerdown="re_3" @click="ie_4" @dblclick="ae_5"></canvas><div></div><div><button type="button" :class="`h-6 rounded-md bg-white/85 px-2 text-xs text-[#666] shadow-sm ring-1 ring-black/5 transition-colors hover:bg-white hover:text-[#222] dark:bg-black/40 dark:text-muted-foreground dark:ring-white/10 dark:hover:text-foreground`" @click="e_0=>Q_6(`home`)">{{ S_9(`appBarcode.viewTilt`) }}</button><button type="button" :class="`h-6 rounded-md bg-white/85 px-2 text-xs text-[#666] shadow-sm ring-1 ring-black/5 transition-colors hover:bg-white hover:text-[#222] dark:bg-black/40 dark:text-muted-foreground dark:ring-white/10 dark:hover:text-foreground`" @click="e_0=>Q_6(`top`)">{{ S_9(`appBarcode.viewTop`) }}</button></div></div><p>{{ S_9(`todayWork.heatmap3dHint`) }}</p></div>
</template>

<script setup>
import { normalizeClass as e, unref as t, createElementBlock as r, renderList as i, watch as a, Fragment as s, openBlock as c, defineComponent as l, onMounted as f, toDisplayString as p, onBeforeMount as m, computed as h, createElementVNode as g } from 'vue';
import { E as _, a as v, b as y, f as S, g as C, h as w, i as T, p as O } from '../vendor/vendors/OrbitControls.js';
import { t as ee } from '../vendor/vendors/three-stage.js';

const props = defineProps({
  result: {},
  colors: {},
  theme: {},
  shape: {},
  label: {},
  highlight: {},
  dayLabels: {},
  monthMarks: {}
});
var I = class {
  uniforms = {
    uTime: {
      value: 1e7
    },
    uGrow: {
      value: 500
    }
  };
  startedAt = 0;
  endsAt = 0;
  constructor(event) {
    this.uniforms.uGrow.value = event;
  }
  start(e_0, items) {
    if (!e_0) {
      this.uniforms.uTime.value = 1e7, this.endsAt = 0;
      return;
    }
    this.startedAt = performance.now(), this.endsAt = items + this.uniforms.uGrow.value, this.uniforms.uTime.value = 0;
  }
  step(e_0) {
    if (!this.endsAt) return false;
    let t = Number.isFinite(e_0) ? e_0 - this.startedAt : 1 / 0;
    return t >= this.endsAt ? (this.uniforms.uTime.value = 1e7, this.endsAt = 0, false) : (this.uniforms.uTime.value = Math.max(0, t), true);
  }
};
var L = class {
  fullPending = false;
  meshes;
  constructor(e_0) {
    this.meshes = e_0;
  }
  markAll() {
    this.fullPending = true;
    for (let count of this.meshes) count.instanceColor && (count.instanceColor.clearUpdateRanges(), count.instanceColor.needsUpdate = true);
  }
  markOne(e_0, t) {
    !e_0.instanceColor || t < 0 || (this.fullPending || e_0.instanceColor.addUpdateRange(t * 3, 3), e_0.instanceColor.needsUpdate = true);
  }
  frameStarted() {
    this.fullPending = false;
  }
};
var R = 288;
var z = R_23 / 2;
var B = 3.2;
var V = .35;
var H = .12;
var U = .3;
var W = .3;
var G = .78;
var K = .28;
var te = -.03;
var ne = .12;
var q = 520;
var re = 700;
var J = 260;
function ie(e_0) {
  return e_0 > 62 ? {
    rowPitch: 1.6,
    trackDepth: 1.6,
    buildingDepth: 1.45,
    leftLabelSpace: 14
  } : {
    rowPitch: 6,
    trackDepth: 4.2,
    buildingDepth: 3.4,
    leftLabelSpace: 28
  };
}
function ae(e_0) {
  let t = new A();
  return t.onBeforeCompile = t => {
    t.uniforms.uTime = e_0.uniforms.uTime, t.uniforms.uGrow = e_0.uniforms.uGrow, t.vertexShader = t.vertexShader.replace(`#include <common>`, `#include <common>
attribute float aHeight;
attribute float aDelay;
attribute float aDim;
uniform float uTime;
uniform float uGrow;`).replace(`#include <begin_vertex>`, `#include <begin_vertex>
float barcodeGrowth = clamp((uTime - aDelay) / uGrow, 0.0, 1.0);
barcodeGrowth = 1.0 - pow(1.0 - barcodeGrowth, 3.0);
transformed.y *= max(aHeight * mix(1.0, ${W.toFixed(2)}, aDim) * barcodeGrowth, 0.001);`);
  }, t.customProgramCacheKey = () => `barcode-city-building`, t;
}
var oe = class {
  root = new S_9();
  framing;
  labels;
  set;
  layout;
  heights;
  dims;
  dimAttribute;
  clock = new I_22(q_2);
  maxDelay;
  buildingGeometry;
  buildingMaterial;
  buildings;
  trackGeometry;
  trackMaterial = new A();
  tracks;
  colorSync;
  baseColors = [];
  groundColor = new k_16();
  hoverColor = new k_16();
  scratchColor = new k_16();
  hitBox = new T_12();
  hitPoint = new _();
  hovered = -1;
  constructor(e_0, t) {
    this.set = F_21(e_0), this.layout = ie_4(this.set.dayCount);
    let {
        blocks: n_27
      } = this.set,
      length = n_27.length;
    this.heights = new Float32Array(length), this.dims = new Float32Array(length);
    let i_29 = new Float32Array(length),
      el = new w_11(),
      o_26 = new _(),
      s = new y(),
      c = new _();
    this.buildingGeometry = new v(1, 1, 1).translate(0, .5, 0), this.buildingGeometry.setAttribute(`aHeight`, new O_15(this.heights, 1)), this.buildingGeometry.setAttribute(`aDelay`, new O_15(i_29, 1)), this.dimAttribute = new O_15(this.dims, 1), this.buildingGeometry.setAttribute(`aDim`, this.dimAttribute), this.buildingMaterial = ae_5(this.clock), this.buildings = new E_13(this.buildingGeometry, this.buildingMaterial, length), this.buildings.instanceColor = new O_15(new Float32Array(length * 3), 3), this.buildings.frustumCulled = false;
    let l = 0,
      u = 4;
    n_27.forEach((item, t) => {
      let n_27 = Math.max(U, item.end - item.start - H),
        r_28 = P_20(item) ? V : B_25 * M_18(item);
      this.heights[t] = r_28, u = Math.max(u, r_28), i_29[t] = j_17(item, this.set.dayCount, re_3, J), l = Math.max(l, i_29[t]), o_26.set((item.start + item.end) / 2 - z_24, 0, this.rowZ(item.dayIndex)), c.set(n_27, 1, this.layout.buildingDepth), el.compose(o_26, s, c), this.buildings.setMatrixAt(t, el);
    }), this.buildings.instanceMatrix.needsUpdate = true, this.maxDelay = l, this.trackGeometry = new v(1, 1, 1).translate(0, -.5, 0), this.tracks = new E_13(this.trackGeometry, this.trackMaterial, this.set.dayCount);
    for (let e_0 = 0; e_0 < this.set.dayCount; e_0 += 1) o_26.set(0, te, this.rowZ(e_0)), c.set(R_23 + 1, ne_1, this.layout.trackDepth), el.compose(o_26, s, c), this.tracks.setMatrixAt(e_0, el);
    this.tracks.instanceMatrix.needsUpdate = true, this.root.add(this.tracks, this.buildings), this.colorSync = new L([this.buildings]);
    let d = this.set.dayCount * this.layout.rowPitch / 2,
      f = -z_24 - this.layout.leftLabelSpace,
      p = z_24 + 1,
      m = -d,
      h = d + 8,
      emptyItems = [];
    for (let e_0 of [f, p]) for (let t of [0, u]) for (let n_27 of [m, h]) emptyItems.push(new _(e_0, t, n_27));
    this.framing = {
      target: new _((f + p) / 2, u * .2, (m + h) / 2),
      corners: emptyItems,
      homeView: {
        polar: .98,
        azimuth: .22
      },
      topView: {
        polar: 0,
        azimuth: 0
      },
      limits: {
        minPolar: 0,
        maxPolar: 1.36,
        azimuthRange: Math.PI / 3
      }
    }, this.labels = this.buildLabels(t, d);
  }
  rowZ(e_0) {
    return (e_0 - (this.set.dayCount - 1) / 2) * this.layout.rowPitch;
  }
  buildLabels(e_0, t) {
    let n_27 = [];
    for (let e_0 = 0; e_0 <= 24; e_0 += 3) n_27.push({
      key: `hour-${e_0}`,
      text: `${e_0}:00`,
      kind: `hour`,
      position: new _(e_0 / 24 * R_23 - z_24, 0, t + 4)
    });
    let r_28 = -z_24 - 3;
    if (this.set.dayCount > 62) for (let t of e_0.monthMarks) n_27.push({
      key: `month-${t.dayIndex}`,
      text: t.label,
      kind: `side`,
      position: new _(r_28, 0, this.rowZ(t.dayIndex))
    });else e_0.dayLabels.forEach((item, t) => {
      item && n_27.push({
        key: `day-${t}`,
        text: item,
        kind: `side`,
        position: new _(r_28, 0, this.rowZ(t))
      });
    });
    return n_27;
  }
  paint(e_0) {
    let t = this.baseColors[e_0];
    t && (this.scratchColor.copy(t), this.dims[e_0] && this.scratchColor.lerp(this.groundColor, G), e_0 === this.hovered && this.scratchColor.lerp(this.hoverColor, K), this.buildings.setColorAt(e_0, this.scratchColor));
  }
  paintAll() {
    for (let e_0 = 0; e_0 < this.baseColors.length; e_0 += 1) this.paint(e_0);
    this.colorSync.markAll();
  }
  setColors(e_0, t) {
    this.baseColors = this.set.blocks.map(item => new k_16(N_19(item, e_0, t))), this.groundColor.set(t.ground), this.hoverColor.set(t.textPrimary), this.trackMaterial.color.set(t.ground), this.paintAll();
  }
  setHighlight(e_0) {
    this.set.blocks.forEach((item, n_27) => {
      this.dims[n_27] = e_0 && !e_0.has(item.value) ? 1 : 0;
    }), this.dimAttribute.needsUpdate = true, this.paintAll();
  }
  setHovered(e_0) {
    if (e_0 === this.hovered) return;
    let hovered = this.hovered;
    this.hovered = e_0, this.paint(hovered), this.paint(e_0), this.colorSync.markOne(this.buildings, hovered), this.colorSync.markOne(this.buildings, e_0);
  }
  startGrowth(e_0) {
    this.clock.start(e_0, this.maxDelay);
  }
  stepGrowth(e_0) {
    return this.colorSync.frameStarted(), this.clock.step(e_0);
  }
  pick(e_0) {
    let {
      blocks: t,
      dayOffsets: n_27,
      dayCount: r_28
    } = this.set;
    if (t.length === 0) return null;
    let i_29 = this.framing.corners.reduce((acc, cur) => Math.max(acc, cur.y), 0),
      {
        origin: a_30,
        direction: o_26
      } = e_0,
      s = 0,
      c = 1e7;
    if (Math.abs(o_26.y) > 1e-9) {
      let e_0 = -a_30.y / o_26.y,
        t = (i_29 - a_30.y) / o_26.y;
      if (s = Math.max(0, Math.min(e_0, t)), c = Math.max(e_0, t), c < s) return null;
    } else if (a_30.y < 0 || a_30.y > i_29) return null;
    let l = a_30.z + o_26.z * s,
      u = a_30.z + o_26.z * c,
      d = this.rowZ(0),
      rowPitch = this.layout.rowPitch,
      p = Math.max(0, Math.floor((Math.min(l, u) - d) / rowPitch) - 1),
      m = Math.min(r_28 - 1, Math.ceil((Math.max(l, u) - d) / rowPitch) + 1),
      h = this.layout.buildingDepth / 2,
      g = -1,
      _ = 1 / 0,
      v = 0;
    for (let r_28 = p; r_28 <= m; r_28 += 1) {
      let i_29 = this.rowZ(r_28);
      for (let o_26 = n_27[r_28]; o_26 < n_27[r_28 + 1]; o_26 += 1) {
        let n_27 = t[o_26],
          r_28 = Math.max(U, n_27.end - n_27.start - H) / 2,
          s = (n_27.start + n_27.end) / 2 - z_24,
          c = this.heights[o_26] * (this.dims[o_26] ? W : 1);
        if (this.hitBox.min.set(s - r_28, 0, i_29 - h), this.hitBox.max.set(s + r_28, c, i_29 + h), !e_0.intersectBox(this.hitBox, this.hitPoint)) continue;
        let distanceToSquared = this.hitPoint.distanceToSquared(a_30);
        distanceToSquared < _ && (_ = distanceToSquared, g = o_26, v = this.hitPoint.x);
      }
    }
    if (g < 0) return null;
    let y = t[g],
      b_7 = Math.min(y.end - 1, Math.max(y.start, Math.floor(v + z_24)));
    return {
      blockIndex: g,
      dayIndex: y.dayIndex,
      bucket: b_7
    };
  }
  dispose() {
    this.buildings.dispose(), this.tracks.dispose(), this.buildingGeometry.dispose(), this.trackGeometry.dispose(), this.buildingMaterial.dispose(), this.trackMaterial.dispose();
  }
};
var Y = 288;
var X = Math.PI * 2;
var Z = 24;
var Q = 3;
var se = 2.4;
var ce = 1.2;
var le = .3;
var ue = .78;
var de = .28;
var fe = 2.6;
var pe = .78;
var me = 160;
var he = 600;
var ge = 1e3;
var _e = -.05;
var ve = .4;
var $ = [{
  maxSpan: 4,
  segments: 1
}, {
  maxSpan: 24,
  segments: 4
}, {
  maxSpan: 96,
  segments: 12
}, {
  maxSpan: 1 / 0,
  segments: 32
}];
function ye(e_0) {
  let t = [],
    n_27 = [],
    r_28 = [],
    handler = (e_0, r_28, i_29, a_30, o_26, s) => (t.push(e_0, r_28, i_29), n_27.push(a_30, o_26, s), t.length / 3 - 1),
    a_30 = [],
    o_26 = [],
    s = [],
    ratio = [],
    l = [],
    u = [];
  for (let t = 0; t <= e_0; t += 1) {
    let n_27 = t / e_0;
    a_30.push(handler(n_27, 1, 0, 0, 1, 0)), o_26.push(handler(n_27, 1, 1, 0, 1, 0)), s.push(handler(n_27, 0, 1, 0, 0, 1)), ratio.push(handler(n_27, 1, 1, 0, 0, 1)), l.push(handler(n_27, 0, 0, 0, 0, -1)), u.push(handler(n_27, 1, 0, 0, 0, -1));
  }
  for (let t = 0; t < e_0; t += 1) {
    let e_0 = t + 1;
    r_28.push(a_30[t], a_30[e_0], o_26[e_0], a_30[t], o_26[e_0], o_26[t]), r_28.push(s[t], ratio[t], ratio[e_0], s[t], ratio[e_0], s[e_0]), r_28.push(l[t], u[e_0], u[t], l[t], l[e_0], u[e_0]);
  }
  let d = handler(0, 0, 0, -1, 0, 0),
    f = handler(0, 1, 0, -1, 0, 0),
    p = handler(0, 1, 1, -1, 0, 0),
    m = handler(0, 0, 1, -1, 0, 0);
  r_28.push(d, f, p, d, p, m);
  let h = handler(1, 0, 0, 1, 0, 0),
    g = handler(1, 0, 1, 1, 0, 0),
    _ = handler(1, 1, 1, 1, 0, 0),
    v = handler(1, 1, 0, 1, 0, 0);
  r_28.push(h, g, _, h, _, v);
  let y = new D_14();
  return y.setAttribute(`position`, new x_8(t, 3)), y.setAttribute(`normal`, new x_8(n_27, 3)), y.setIndex(r_28), y;
}
function be(e_0) {
  let t = new A();
  return t.onBeforeCompile = t => {
    t.uniforms.uTime = e_0.uniforms.uTime, t.uniforms.uGrow = e_0.uniforms.uGrow, t.vertexShader = t.vertexShader.replace(`#include <common>`, `#include <common>
attribute vec2 aArc;
attribute vec2 aRadius;
attribute vec2 aLayer;
attribute float aDelay;
attribute float aDim;
uniform float uTime;
uniform float uGrow;`).replace(`#include <beginnormal_vertex>`, `
float barcodeGrowth = clamp((uTime - aDelay) / uGrow, 0.0, 1.0);
barcodeGrowth = 1.0 - pow(1.0 - barcodeGrowth, 3.0);
float barcodeTheta = aArc.x + (aArc.y - aArc.x) * barcodeGrowth * position.x;
float barcodeOuter = mix(aRadius.x, aRadius.y, mix(1.0, ${le.toFixed(2)}, aDim));
float barcodeRadius = mix(aRadius.x, barcodeOuter, position.z);
vec3 barcodeRadial = vec3(sin(barcodeTheta), 0.0, -cos(barcodeTheta));
vec3 barcodeTangent = vec3(cos(barcodeTheta), 0.0, sin(barcodeTheta));
vec3 objectNormal = barcodeTangent * normal.x + vec3(0.0, normal.y, 0.0) + barcodeRadial * normal.z;`).replace(`#include <begin_vertex>`, `
vec3 transformed = barcodeRadial * barcodeRadius + vec3(0.0, aLayer.x + position.y * aLayer.y, 0.0);`);
  }, t.customProgramCacheKey = () => `barcode-tower-arc`, t;
}
var xe = class {
  root = new S_9();
  framing;
  labels;
  set;
  layout;
  outerRadii;
  tierOf;
  instanceOf;
  cellBlocks;
  tiers = [];
  material;
  clock = new I_22(he);
  maxDelay;
  maxRadius;
  baseGeometry;
  baseMaterial = new A();
  colorSync;
  dimmed;
  baseColors = [];
  groundColor = new k_16();
  hoverColor = new k_16();
  scratchColor = new k_16();
  hovered = -1;
  constructor(e_0, t) {
    this.set = F_21(e_0);
    let {
        blocks: n_27,
        dayCount: r_28
      } = this.set,
      i_29 = r_28 > 62,
      a_30 = i_29 ? me / Math.max(1, r_28) : fe;
    this.layout = {
      layerPitch: a_30,
      layerHeight: i_29 ? a_30 : a_30 * pe
    }, this.outerRadii = new Float32Array(n_27.length), this.tierOf = new Uint8Array(n_27.length), this.instanceOf = new Int32Array(n_27.length), this.dimmed = new Uint8Array(n_27.length), this.cellBlocks = new Int32Array(r_28 * Y).fill(-1);
    let o_26 = $.map(() => 0),
      s = 29;
    n_27.forEach((item, t) => {
      let n_27 = P_20(item) ? ce : Q_6 + se * M_18(item);
      this.outerRadii[t] = Z + n_27, s = Math.max(s, this.outerRadii[t]);
      let r_28 = item.end - item.start,
        index = $.findIndex(e_0 => r_28 <= e_0.maxSpan);
      this.tierOf[t] = index, this.instanceOf[t] = o_26[index], o_26[index] += 1, this.cellBlocks.fill(t, item.dayIndex * Y + item.start, item.dayIndex * Y + item.end);
    }), this.maxRadius = s, this.material = be(this.clock);
    let c = 0;
    $.forEach((item, t) => {
      let i_29 = o_26[t];
      if (i_29 === 0) return;
      let a_30 = ye(item.segments),
        s = new Float32Array(i_29 * 2),
        l = new Float32Array(i_29 * 2),
        u = new Float32Array(i_29 * 2),
        d = new Float32Array(i_29),
        f = new Float32Array(i_29),
        p = new Int32Array(i_29);
      n_27.forEach((e_0, n_27) => {
        if (this.tierOf[n_27] !== t) return;
        let i_29 = this.instanceOf[n_27];
        p[i_29] = n_27, s[i_29 * 2] = e_0.start / Y * X, s[i_29 * 2 + 1] = e_0.end / Y * X, l[i_29 * 2] = Z, l[i_29 * 2 + 1] = this.outerRadii[n_27], u[i_29 * 2] = this.layerBottom(e_0.dayIndex), u[i_29 * 2 + 1] = this.layout.layerHeight, d[i_29] = j_17(e_0, r_28, ge, 0), c = Math.max(c, d[i_29]);
      }), a_30.setAttribute(`aArc`, new O_15(s, 2)), a_30.setAttribute(`aRadius`, new O_15(l, 2)), a_30.setAttribute(`aLayer`, new O_15(u, 2)), a_30.setAttribute(`aDelay`, new O_15(d, 1));
      let m = new O_15(f, 1);
      a_30.setAttribute(`aDim`, m);
      let h = new E_13(a_30, this.material, i_29);
      h.instanceColor = new O_15(new Float32Array(i_29 * 3), 3), h.frustumCulled = false, this.tiers[t] = {
        mesh: h,
        geometry: a_30,
        blockIndexes: p,
        dims: f,
        dimAttribute: m
      }, this.root.add(h);
    }), this.maxDelay = c, this.colorSync = new L(this.tiers.filter(Boolean).map(item => item.mesh)), this.baseGeometry = new b_7(s + 4, s + 4, ve, 96);
    let l = new C_10(this.baseGeometry, this.baseMaterial);
    l.position.y = _e - ve / 2, this.root.add(l);
    let u = this.layerBottom(Math.max(0, r_28 - 1)) + this.layout.layerHeight,
      d = s + 12,
      f = [];
    for (let e_0 of [-d, d]) for (let t of [0, u]) for (let n_27 of [-d, d]) f.push(new _(e_0, t, n_27));
    this.framing = {
      target: new _(0, u * .45, 0),
      corners: f,
      homeView: {
        polar: 1.12,
        azimuth: .38
      },
      topView: {
        polar: 0,
        azimuth: 0
      },
      limits: {
        minPolar: 0,
        maxPolar: 1.48,
        azimuthRange: null
      }
    }, this.labels = this.buildLabels(t, u);
  }
  layerBottom(e_0) {
    return e_0 * this.layout.layerPitch;
  }
  buildLabels(e_0, t) {
    let n_27 = [],
      r_28 = this.maxRadius + 6;
    for (let e_0 = 0; e_0 < 24; e_0 += 3) {
      let i_29 = e_0 / 24 * X,
        a_30 = new _(Math.sin(i_29), 0, -Math.cos(i_29));
      n_27.push({
        key: `hour-${e_0}`,
        text: `${e_0}:00`,
        kind: `hour`,
        position: a_30.clone().multiplyScalar(r_28).setY(t + .5),
        facing: a_30
      });
    }
    let i_29 = new _(-1, 0, 0),
      a_30 = e_0 => new _(-(this.maxRadius + 3), this.layerBottom(e_0) + this.layout.layerHeight / 2, 0);
    if (this.set.dayCount > 62) for (let t of e_0.monthMarks) n_27.push({
      key: `month-${t.dayIndex}`,
      text: t.label,
      kind: `side`,
      position: a_30(t.dayIndex),
      facing: i_29
    });else e_0.dayLabels.forEach((item, t) => {
      item && n_27.push({
        key: `day-${t}`,
        text: item,
        kind: `side`,
        position: a_30(t),
        facing: i_29
      });
    });
    return n_27;
  }
  paint(e_0) {
    let t = this.baseColors[e_0],
      n_27 = this.tiers[this.tierOf[e_0]];
    t && n_27 && (this.scratchColor.copy(t), this.dimmed[e_0] && this.scratchColor.lerp(this.groundColor, ue), e_0 === this.hovered && this.scratchColor.lerp(this.hoverColor, de), n_27.mesh.setColorAt(this.instanceOf[e_0], this.scratchColor));
  }
  paintAll() {
    for (let e_0 = 0; e_0 < this.baseColors.length; e_0 += 1) this.paint(e_0);
    this.colorSync.markAll();
  }
  setColors(e_0, t) {
    this.baseColors = this.set.blocks.map(item => new k_16(N_19(item, e_0, t))), this.groundColor.set(t.ground), this.hoverColor.set(t.textPrimary), this.baseMaterial.color.set(t.ground), this.paintAll();
  }
  setHighlight(e_0) {
    this.set.blocks.forEach((item, n_27) => {
      let r_28 = e_0 && !e_0.has(item.value) ? 1 : 0;
      this.dimmed[n_27] = r_28;
      let i_29 = this.tiers[this.tierOf[n_27]];
      i_29 && (i_29.dims[this.instanceOf[n_27]] = r_28);
    });
    for (let e_0 of this.tiers) e_0 && (e_0.dimAttribute.needsUpdate = true);
    this.paintAll();
  }
  setHovered(e_0) {
    if (e_0 === this.hovered) return;
    let hovered = this.hovered;
    this.hovered = e_0;
    for (let n_27 of [hovered, e_0]) {
      if (n_27 < 0) continue;
      this.paint(n_27);
      let e_0 = this.tiers[this.tierOf[n_27]];
      e_0 && this.colorSync.markOne(e_0.mesh, this.instanceOf[n_27]);
    }
  }
  startGrowth(e_0) {
    this.clock.start(e_0, this.maxDelay);
  }
  stepGrowth(e_0) {
    return this.colorSync.frameStarted(), this.clock.step(e_0);
  }
  pick(e_0) {
    let {
        dayCount: t
      } = this.set,
      {
        origin: n_27,
        direction: r_28
      } = e_0,
      i_29 = r_28.x * r_28.x + r_28.z * r_28.z,
      a_30 = 2 * (n_27.x * r_28.x + n_27.z * r_28.z),
      o_26 = n_27.x * n_27.x + n_27.z * n_27.z - this.maxRadius * this.maxRadius,
      s = 0,
      c = 1e7;
    if (i_29 > 1e-12) {
      let e_0 = a_30 * a_30 - 4 * i_29 * o_26;
      if (e_0 < 0) return null;
      let t = Math.sqrt(e_0);
      if (s = Math.max(0, (-a_30 - t) / (2 * i_29)), c = (-a_30 + t) / (2 * i_29), c < s) return null;
    } else if (o_26 > 0) return null;
    let l = 1 / 0,
      u = -1,
      d = 0;
    for (let e_0 = 0; e_0 < t; e_0 += 1) {
      let layerBottom = this.layerBottom(e_0),
        a_30 = layerBottom + this.layout.layerHeight,
        o_26 = s,
        f = c;
      if (Math.abs(r_28.y) > 1e-9) {
        let e_0 = (layerBottom - n_27.y) / r_28.y,
          i_29 = (a_30 - n_27.y) / r_28.y;
        o_26 = Math.max(o_26, Math.min(e_0, i_29)), f = Math.min(f, Math.max(e_0, i_29));
      } else if (n_27.y < layerBottom || n_27.y > a_30) continue;
      if (f < o_26 || o_26 >= l) continue;
      let p = Math.sqrt(i_29) * (f - o_26),
        m = Math.min(64, Math.max(2, Math.ceil(p / .5)));
      for (let t = 0; t <= m; t += 1) {
        let i_29 = o_26 + (f - o_26) * t / m;
        if (i_29 >= l) break;
        let a_30 = n_27.x + r_28.x * i_29,
          s = n_27.z + r_28.z * i_29,
          c = Math.hypot(a_30, s);
        if (c < Z) continue;
        let p = Math.atan2(a_30, -s);
        p < 0 && (p += X);
        let h = Math.min(Y - 1, Math.floor(p / X * Y)),
          g = this.cellBlocks[e_0 * Y + h];
        if (!(g < 0) && !(c > (this.dimmed[g] ? Z + (this.outerRadii[g] - Z) * le : this.outerRadii[g]))) {
          l = i_29, u = g, d = h;
          break;
        }
      }
    }
    return u < 0 ? null : {
      blockIndex: u,
      dayIndex: this.set.blocks[u].dayIndex,
      bucket: d
    };
  }
  dispose() {
    for (let e_0 of this.tiers) e_0 && (e_0.mesh.dispose(), e_0.geometry.dispose());
    this.material.dispose(), this.baseGeometry.dispose(), this.baseMaterial.dispose();
  }
};
var Se = [`aria-label`];
var Ce = {
  class: `pointer-events-none absolute inset-0`
};
var we = {
  class: `absolute right-2 top-2 flex gap-1`,
  "data-share-exclude": ``
};
var Te = {
  class: `mt-1.5 text-right text-xs leading-none text-[#bbb] dark:text-muted-foreground/70`,
  "data-share-exclude": ``
};
var Ee = 14;
var De = 18;
var Oe = 14;
var ke = .3;
var Ae = 4;
var je = 260;
let value = C_10.value;
let e_0 = E_13.value.length - 1;
function ne_1(e_0) {
  T_12.value || (P_20 = e_0, N_19 ||= requestAnimationFrame(te));
}
function q_2() {
  P_20 = null, N_19 && cancelAnimationFrame(N_19), N_19 = 0, K(-1), G(null);
}
function re_3(e_0) {
  T_12.value = true, payload = {
    x: e_0.clientX,
    y: e_0.clientY
  }, q_2();
}
function ie_4(e_0) {
  if (!payload || !k_16 || !resolvedValue) return;
  let t = Math.hypot(e_0.clientX - payload.x, e_0.clientY - payload.y);
  if (payload = null, t > Ae) return;
  let n_27 = resolvedValue.pick(k_16.rayFromEvent(e_0));
  R_23 && clearTimeout(R_23), R_23 = null, !(!n_27 || e_0.detail > 1) && (R_23 = setTimeout(() => {
    R_23 = null, x_8(`select`, n_27.dayIndex);
  }, je));
}
function ae_5() {
  R_23 && clearTimeout(R_23), R_23 = null, Z();
}
function Q_6(e_0) {
  k_16?.flyToView(e_0);
}
let b_7 = l,
  x_8 = y,
  {
    t: S_9
  } = u(),
  C_10 = o_26(null),
  w_11 = o_26(null),
  T_12 = o_26(false),
  E_13 = n_27([]),
  D_14 = [],
  O_15 = h(() => b_7.shape === `tower` ? 500 : b_7.result.days.length > 62 ? 480 : 420),
  k_16 = null,
  resolvedValue = null,
  j_17 = null,
  M_18 = false,
  N_19 = 0,
  P_20 = null,
  F_21 = -1,
  I_22 = false,
  payload = null,
  R_23 = null,
  z_24 = typeof window.matchMedia == `function` && window.matchMedia(`(prefers-reduced-motion: reduce)`).matches,
  B_25 = new _();
let o_26 = k_16.project(i_29.position, clientWidth, clientHeight),
  visible = o_26.visible;
let n_27 = resolvedValue.pick(k_16.rayFromEvent(e_0));
let clientWidth = value.clientWidth,
  clientHeight = value.clientHeight,
  r_28 = 1 / 0;
let i_29 = E_13.value[e_0],
  a_30 = D_14[e_0];
</script>
