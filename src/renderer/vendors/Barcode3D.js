import { $n as vueN, An as vueAn, Cn as vueCn, S as vueS, St as vueSt, Wt as vueWt, bn as vueBn, c as vueC, gt as vueGt, j as vueJ, n as u, nr as vueNr, ot as vueOt, rr as vueRr, ut as vueUt, v as vueV, y as vueY } from "../chunks/vue-i18n.runtime.js";
import "../chunks/main.js";
import { E as OrbitControlsE, a as OrbitControlsA, b as OrbitControlsB, c as OrbitControlsC, d as OrbitControlsD, f as OrbitControlsF, g as OrbitControlsG, h as OrbitControlsH, i as OrbitControlsI, m as OrbitControlsM, o as OrbitControlsO, p as OrbitControlsP, s as OrbitControlsS, v as OrbitControlsV } from "./OrbitControls.js";
import { a as threestageA, i as threestageI, n as threestageN, o as threestageO, r as threestageR, t as threestageT } from "./three-stage.js";
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
    constructor(constructor) {
      this.uniforms.uGrow.value = constructor;
    }
    start(e, t) {
      if (!e) {
        this.uniforms.uTime.value = 1e7, this.endsAt = 0;
        return;
      }
      this.startedAt = performance.now(), this.endsAt = t + this.uniforms.uGrow.value, this.uniforms.uTime.value = 0;
    }
    step(e) {
      if (!this.endsAt) return false;
      let t = Number.isFinite(e) ? e - this.startedAt : 1 / 0;
      return t >= this.endsAt ? (this.uniforms.uTime.value = 1e7, this.endsAt = 0, false) : (this.uniforms.uTime.value = Math.max(0, t), true);
    }
  },
  L = class {
    fullPending = false;
    meshes;
    constructor(constructor) {
      this.meshes = constructor;
    }
    markAll() {
      this.fullPending = true;
      for (let count of this.meshes) count.instanceColor && (count.instanceColor.clearUpdateRanges(), count.instanceColor.needsUpdate = true);
    }
    markOne(mark, oneValue) {
      !mark.instanceColor || oneValue < 0 || (this.fullPending || mark.instanceColor.addUpdateRange(oneValue * 3, 3), mark.instanceColor.needsUpdate = true);
    }
    frameStarted() {
      this.fullPending = false;
    }
  },
  R = 288,
  z = R / 2,
  B = 3.2,
  V = .35,
  H = .12,
  U = .3,
  W = .3,
  G = .78,
  K = .28,
  te = -.03,
  ne = .12,
  q = 520,
  re = 700,
  J = 260;
function ie(e) {
  return e > 62 ? {
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
function ae(e) {
  let orbitControlsV = new OrbitControlsV();
  return orbitControlsV.onBeforeCompile = t => {
    t.uniforms.uTime = e.uniforms.uTime, t.uniforms.uGrow = e.uniforms.uGrow, t.vertexShader = t.vertexShader.replace(`#include <common>`, `#include <common>
attribute float aHeight;
attribute float aDelay;
attribute float aDim;
uniform float uTime;
uniform float uGrow;`).replace(`#include <begin_vertex>`, `#include <begin_vertex>
float barcodeGrowth = clamp((uTime - aDelay) / uGrow, 0.0, 1.0);
barcodeGrowth = 1.0 - pow(1.0 - barcodeGrowth, 3.0);
transformed.y *= max(aHeight * mix(1.0, ${W.toFixed(2)}, aDim) * barcodeGrowth, 0.001);`);
  }, orbitControlsV.customProgramCacheKey = () => `barcode-city-building`, orbitControlsV;
}
var oe = class {
    root = new OrbitControlsF();
    framing;
    labels;
    set;
    layout;
    heights;
    dims;
    dimAttribute;
    clock = new I(q);
    maxDelay;
    buildingGeometry;
    buildingMaterial;
    buildings;
    trackGeometry;
    trackMaterial = new OrbitControlsV();
    tracks;
    colorSync;
    baseColors = [];
    groundColor = new OrbitControlsS();
    hoverColor = new OrbitControlsS();
    scratchColor = new OrbitControlsS();
    hitBox = new OrbitControlsI();
    hitPoint = new OrbitControlsE();
    hovered = -1;
    constructor(constructor, constructorValue) {
      this.set = threestageR(constructor), this.layout = ie(this.set.dayCount);
      let {
          blocks: n
        } = this.set,
        r = n.length;
      this.heights = new Float32Array(r), this.dims = new Float32Array(r);
      let float32Array = new Float32Array(r),
        orbitControlsH = new OrbitControlsH(),
        orbitControlsE = new OrbitControlsE(),
        orbitControlsB = new OrbitControlsB(),
        c = new OrbitControlsE();
      this.buildingGeometry = new OrbitControlsA(1, 1, 1).translate(0, .5, 0), this.buildingGeometry.setAttribute(`aHeight`, new OrbitControlsP(this.heights, 1)), this.buildingGeometry.setAttribute(`aDelay`, new OrbitControlsP(float32Array, 1)), this.dimAttribute = new OrbitControlsP(this.dims, 1), this.buildingGeometry.setAttribute(`aDim`, this.dimAttribute), this.buildingMaterial = ae(this.clock), this.buildings = new OrbitControlsM(this.buildingGeometry, this.buildingMaterial, r), this.buildings.instanceColor = new OrbitControlsP(new Float32Array(r * 3), 3), this.buildings.frustumCulled = false;
      let l = 0,
        u = 4;
      n.forEach((item, t) => {
        let n = Math.max(U, item.end - item.start - H),
          r = threestageO(item) ? V : B * threestageI(item);
        this.heights[t] = r, u = Math.max(u, r), float32Array[t] = threestageA(item, this.set.dayCount, re, J), l = Math.max(l, float32Array[t]), orbitControlsE.set((item.start + item.end) / 2 - z, 0, this.rowZ(item.dayIndex)), c.set(n, 1, this.layout.buildingDepth), orbitControlsH.compose(orbitControlsE, orbitControlsB, c), this.buildings.setMatrixAt(t, orbitControlsH);
      }), this.buildings.instanceMatrix.needsUpdate = true, this.maxDelay = l, this.trackGeometry = new OrbitControlsA(1, 1, 1).translate(0, -.5, 0), this.tracks = new OrbitControlsM(this.trackGeometry, this.trackMaterial, this.set.dayCount);
      for (let e = 0; e < this.set.dayCount; e += 1) orbitControlsE.set(0, te, this.rowZ(e)), c.set(R + 1, ne, this.layout.trackDepth), orbitControlsH.compose(orbitControlsE, orbitControlsB, c), this.tracks.setMatrixAt(e, orbitControlsH);
      this.tracks.instanceMatrix.needsUpdate = true, this.root.add(this.tracks, this.buildings), this.colorSync = new L([this.buildings]);
      let d = this.set.dayCount * this.layout.rowPitch / 2,
        f = -z - this.layout.leftLabelSpace,
        p = z + 1,
        m = -d,
        h = d + 8,
        emptyItems = [];
      for (let count of [f, p]) for (let t of [0, u]) for (let n of [m, h]) emptyItems.push(new OrbitControlsE(count, t, n));
      this.framing = {
        target: new OrbitControlsE((f + p) / 2, u * .2, (m + h) / 2),
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
      }, this.labels = this.buildLabels(constructorValue, d);
    }
    rowZ(e) {
      return (e - (this.set.dayCount - 1) / 2) * this.layout.rowPitch;
    }
    buildLabels(labels, labelsValue) {
      let emptyItems = [];
      for (let e = 0; e <= 24; e += 3) emptyItems.push({
        key: `hour-${e}`,
        text: `${e}:00`,
        kind: `hour`,
        position: new OrbitControlsE(e / 24 * R - z, 0, labelsValue + 4)
      });
      let r = -z - 3;
      if (this.set.dayCount > 62) for (let count of labels.monthMarks) emptyItems.push({
        key: `month-${count.dayIndex}`,
        text: count.label,
        kind: `side`,
        position: new OrbitControlsE(r, 0, this.rowZ(count.dayIndex))
      });else labels.dayLabels.forEach((item, t) => {
        item && emptyItems.push({
          key: `day-${t}`,
          text: item,
          kind: `side`,
          position: new OrbitControlsE(r, 0, this.rowZ(t))
        });
      });
      return emptyItems;
    }
    paint(e) {
      let t = this.baseColors[e];
      t && (this.scratchColor.copy(t), this.dims[e] && this.scratchColor.lerp(this.groundColor, G), e === this.hovered && this.scratchColor.lerp(this.hoverColor, K), this.buildings.setColorAt(e, this.scratchColor));
    }
    paintAll() {
      for (let e = 0; e < this.baseColors.length; e += 1) this.paint(e);
      this.colorSync.markAll();
    }
    setColors(colors, colorsValue) {
      this.baseColors = this.set.blocks.map(item => new OrbitControlsS(threestageN(item, colors, colorsValue))), this.groundColor.set(colorsValue.ground), this.hoverColor.set(colorsValue.textPrimary), this.trackMaterial.color.set(colorsValue.ground), this.paintAll();
    }
    setHighlight(highlight) {
      this.set.blocks.forEach((item, n) => {
        this.dims[n] = highlight && !highlight.has(item.value) ? 1 : 0;
      }), this.dimAttribute.needsUpdate = true, this.paintAll();
    }
    setHovered(hoveredValue) {
      if (hoveredValue === this.hovered) return;
      let hovered = this.hovered;
      this.hovered = hoveredValue, this.paint(hovered), this.paint(hoveredValue), this.colorSync.markOne(this.buildings, hovered), this.colorSync.markOne(this.buildings, hoveredValue);
    }
    startGrowth(growth) {
      this.clock.start(growth, this.maxDelay);
    }
    stepGrowth(step) {
      return this.colorSync.frameStarted(), this.clock.step(step);
    }
    pick(e) {
      let {
        blocks: t,
        dayOffsets: n,
        dayCount: r
      } = this.set;
      if (t.length === 0) return null;
      let reduced = this.framing.corners.reduce((acc, cur) => Math.max(acc, cur.y), 0),
        {
          origin: a,
          direction: o
        } = e,
        s = 0,
        c = 1e7;
      if (Math.abs(o.y) > 1e-9) {
        let e = -a.y / o.y,
          t = (reduced - a.y) / o.y;
        if (s = Math.max(0, Math.min(e, t)), c = Math.max(e, t), c < s) return null;
      } else if (a.y < 0 || a.y > reduced) return null;
      let l = a.z + o.z * s,
        u = a.z + o.z * c,
        d = this.rowZ(0),
        rowPitch = this.layout.rowPitch,
        p = Math.max(0, Math.floor((Math.min(l, u) - d) / rowPitch) - 1),
        m = Math.min(r - 1, Math.ceil((Math.max(l, u) - d) / rowPitch) + 1),
        h = this.layout.buildingDepth / 2,
        g = -1,
        _ = 1 / 0,
        v = 0;
      for (let r = p; r <= m; r += 1) {
        let i = this.rowZ(r);
        for (let o = n[r]; o < n[r + 1]; o += 1) {
          let n = t[o],
            r = Math.max(U, n.end - n.start - H) / 2,
            s = (n.start + n.end) / 2 - z,
            c = this.heights[o] * (this.dims[o] ? W : 1);
          if (this.hitBox.min.set(s - r, 0, i - h), this.hitBox.max.set(s + r, c, i + h), !e.intersectBox(this.hitBox, this.hitPoint)) continue;
          let distanceToSquared = this.hitPoint.distanceToSquared(a);
          distanceToSquared < _ && (_ = distanceToSquared, g = o, v = this.hitPoint.x);
        }
      }
      if (g < 0) return null;
      let y = t[g],
        b = Math.min(y.end - 1, Math.max(y.start, Math.floor(v + z)));
      return {
        blockIndex: g,
        dayIndex: y.dayIndex,
        bucket: b
      };
    }
    dispose() {
      this.buildings.dispose(), this.tracks.dispose(), this.buildingGeometry.dispose(), this.trackGeometry.dispose(), this.buildingMaterial.dispose(), this.trackMaterial.dispose();
    }
  },
  Y = 288,
  X = Math.PI * 2,
  Z = 24,
  Q = 3,
  se = 2.4,
  ce = 1.2,
  le = .3,
  ue = .78,
  de = .28,
  fe = 2.6,
  pe = .78,
  me = 160,
  he = 600,
  ge = 1e3,
  _e = -.05,
  ve = .4,
  $ = [{
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
function ye(e) {
  let emptyItems = [],
    n = [],
    count = [],
    handler = (e, r, i, a, o, s) => (emptyItems.push(e, r, i), n.push(a, o, s), emptyItems.length / 3 - 1),
    a = [],
    o = [],
    s = [],
    ratio = [],
    l = [],
    u = [];
  for (let t = 0; t <= e; t += 1) {
    let n = t / e;
    a.push(handler(n, 1, 0, 0, 1, 0)), o.push(handler(n, 1, 1, 0, 1, 0)), s.push(handler(n, 0, 1, 0, 0, 1)), ratio.push(handler(n, 1, 1, 0, 0, 1)), l.push(handler(n, 0, 0, 0, 0, -1)), u.push(handler(n, 1, 0, 0, 0, -1));
  }
  for (let t = 0; t < e; t += 1) {
    let e = t + 1;
    count.push(a[t], a[e], o[e], a[t], o[e], o[t]), count.push(s[t], ratio[t], ratio[e], s[t], ratio[e], s[e]), count.push(l[t], u[e], u[t], l[t], l[e], u[e]);
  }
  let d = handler(0, 0, 0, -1, 0, 0),
    f = handler(0, 1, 0, -1, 0, 0),
    p = handler(0, 1, 1, -1, 0, 0),
    m = handler(0, 0, 1, -1, 0, 0);
  count.push(d, f, p, d, p, m);
  let h = handler(1, 0, 0, 1, 0, 0),
    g = handler(1, 0, 1, 1, 0, 0),
    _ = handler(1, 1, 1, 1, 0, 0),
    v = handler(1, 1, 0, 1, 0, 0);
  count.push(h, g, _, h, _, v);
  let orbitControlsO = new OrbitControlsO();
  return orbitControlsO.setAttribute(`position`, new OrbitControlsD(emptyItems, 3)), orbitControlsO.setAttribute(`normal`, new OrbitControlsD(n, 3)), orbitControlsO.setIndex(count), orbitControlsO;
}
function be(e) {
  let orbitControlsV = new OrbitControlsV();
  return orbitControlsV.onBeforeCompile = t => {
    t.uniforms.uTime = e.uniforms.uTime, t.uniforms.uGrow = e.uniforms.uGrow, t.vertexShader = t.vertexShader.replace(`#include <common>`, `#include <common>
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
  }, orbitControlsV.customProgramCacheKey = () => `barcode-tower-arc`, orbitControlsV;
}
var xe = class {
    root = new OrbitControlsF();
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
    clock = new I(he);
    maxDelay;
    maxRadius;
    baseGeometry;
    baseMaterial = new OrbitControlsV();
    colorSync;
    dimmed;
    baseColors = [];
    groundColor = new OrbitControlsS();
    hoverColor = new OrbitControlsS();
    scratchColor = new OrbitControlsS();
    hovered = -1;
    constructor(constructor, constructorValue) {
      this.set = threestageR(constructor);
      let {
          blocks: n,
          dayCount: r
        } = this.set,
        i = r > 62,
        a = i ? me / Math.max(1, r) : fe;
      this.layout = {
        layerPitch: a,
        layerHeight: i ? a : a * pe
      }, this.outerRadii = new Float32Array(n.length), this.tierOf = new Uint8Array(n.length), this.instanceOf = new Int32Array(n.length), this.dimmed = new Uint8Array(n.length), this.cellBlocks = new Int32Array(r * Y).fill(-1);
      let mapped = $.map(() => 0),
        s = 29;
      n.forEach((item, t) => {
        let n = threestageO(item) ? ce : Q + se * threestageI(item);
        this.outerRadii[t] = Z + n, s = Math.max(s, this.outerRadii[t]);
        let r = item.end - item.start,
          indexResult = $.findIndex(e => r <= e.maxSpan);
        this.tierOf[t] = indexResult, this.instanceOf[t] = mapped[indexResult], mapped[indexResult] += 1, this.cellBlocks.fill(t, item.dayIndex * Y + item.start, item.dayIndex * Y + item.end);
      }), this.maxRadius = s, this.material = be(this.clock);
      let c = 0;
      $.forEach((item, t) => {
        let i = mapped[t];
        if (i === 0) return;
        let a = ye(item.segments),
          float32Array = new Float32Array(i * 2),
          l = new Float32Array(i * 2),
          u = new Float32Array(i * 2),
          d = new Float32Array(i),
          f = new Float32Array(i),
          int32Array = new Int32Array(i);
        n.forEach((e, n) => {
          if (this.tierOf[n] !== t) return;
          let i = this.instanceOf[n];
          int32Array[i] = n, float32Array[i * 2] = e.start / Y * X, float32Array[i * 2 + 1] = e.end / Y * X, l[i * 2] = Z, l[i * 2 + 1] = this.outerRadii[n], u[i * 2] = this.layerBottom(e.dayIndex), u[i * 2 + 1] = this.layout.layerHeight, d[i] = threestageA(e, r, ge, 0), c = Math.max(c, d[i]);
        }), a.setAttribute(`aArc`, new OrbitControlsP(float32Array, 2)), a.setAttribute(`aRadius`, new OrbitControlsP(l, 2)), a.setAttribute(`aLayer`, new OrbitControlsP(u, 2)), a.setAttribute(`aDelay`, new OrbitControlsP(d, 1));
        let orbitControlsP = new OrbitControlsP(f, 1);
        a.setAttribute(`aDim`, orbitControlsP);
        let orbitControlsM = new OrbitControlsM(a, this.material, i);
        orbitControlsM.instanceColor = new OrbitControlsP(new Float32Array(i * 3), 3), orbitControlsM.frustumCulled = false, this.tiers[t] = {
          mesh: orbitControlsM,
          geometry: a,
          blockIndexes: int32Array,
          dims: f,
          dimAttribute: orbitControlsP
        }, this.root.add(orbitControlsM);
      }), this.maxDelay = c, this.colorSync = new L(this.tiers.filter(Boolean).map(item => item.mesh)), this.baseGeometry = new OrbitControlsC(s + 4, s + 4, ve, 96);
      let orbitControlsG = new OrbitControlsG(this.baseGeometry, this.baseMaterial);
      orbitControlsG.position.y = _e - ve / 2, this.root.add(orbitControlsG);
      let u = this.layerBottom(Math.max(0, r - 1)) + this.layout.layerHeight,
        d = s + 12,
        emptyItems = [];
      for (let count of [-d, d]) for (let t of [0, u]) for (let n of [-d, d]) emptyItems.push(new OrbitControlsE(count, t, n));
      this.framing = {
        target: new OrbitControlsE(0, u * .45, 0),
        corners: emptyItems,
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
      }, this.labels = this.buildLabels(constructorValue, u);
    }
    layerBottom(layer) {
      return layer * this.layout.layerPitch;
    }
    buildLabels(labels, labelsValue) {
      let emptyItems = [],
        r = this.maxRadius + 6;
      for (let e = 0; e < 24; e += 3) {
        let i = e / 24 * X,
          orbitControlsE = new OrbitControlsE(Math.sin(i), 0, -Math.cos(i));
        emptyItems.push({
          key: `hour-${e}`,
          text: `${e}:00`,
          kind: `hour`,
          position: orbitControlsE.clone().multiplyScalar(r).setY(labelsValue + .5),
          facing: orbitControlsE
        });
      }
      let orbitControlsE = new OrbitControlsE(-1, 0, 0),
        handler = e => new OrbitControlsE(-(this.maxRadius + 3), this.layerBottom(e) + this.layout.layerHeight / 2, 0);
      if (this.set.dayCount > 62) for (let count of labels.monthMarks) emptyItems.push({
        key: `month-${count.dayIndex}`,
        text: count.label,
        kind: `side`,
        position: handler(count.dayIndex),
        facing: orbitControlsE
      });else labels.dayLabels.forEach((item, t) => {
        item && emptyItems.push({
          key: `day-${t}`,
          text: item,
          kind: `side`,
          position: handler(t),
          facing: orbitControlsE
        });
      });
      return emptyItems;
    }
    paint(e) {
      let t = this.baseColors[e],
        n = this.tiers[this.tierOf[e]];
      t && n && (this.scratchColor.copy(t), this.dimmed[e] && this.scratchColor.lerp(this.groundColor, ue), e === this.hovered && this.scratchColor.lerp(this.hoverColor, de), n.mesh.setColorAt(this.instanceOf[e], this.scratchColor));
    }
    paintAll() {
      for (let e = 0; e < this.baseColors.length; e += 1) this.paint(e);
      this.colorSync.markAll();
    }
    setColors(colors, colorsValue) {
      this.baseColors = this.set.blocks.map(item => new OrbitControlsS(threestageN(item, colors, colorsValue))), this.groundColor.set(colorsValue.ground), this.hoverColor.set(colorsValue.textPrimary), this.baseMaterial.color.set(colorsValue.ground), this.paintAll();
    }
    setHighlight(highlight) {
      this.set.blocks.forEach((item, n) => {
        let r = highlight && !highlight.has(item.value) ? 1 : 0;
        this.dimmed[n] = r;
        let i = this.tiers[this.tierOf[n]];
        i && (i.dims[this.instanceOf[n]] = r);
      });
      for (let count of this.tiers) count && (count.dimAttribute.needsUpdate = true);
      this.paintAll();
    }
    setHovered(hoveredValue) {
      if (hoveredValue === this.hovered) return;
      let hovered = this.hovered;
      this.hovered = hoveredValue;
      for (let n of [hovered, hoveredValue]) {
        if (n < 0) continue;
        this.paint(n);
        let e = this.tiers[this.tierOf[n]];
        e && this.colorSync.markOne(e.mesh, this.instanceOf[n]);
      }
    }
    startGrowth(growth) {
      this.clock.start(growth, this.maxDelay);
    }
    stepGrowth(step) {
      return this.colorSync.frameStarted(), this.clock.step(step);
    }
    pick(e) {
      let {
          dayCount: t
        } = this.set,
        {
          origin: n,
          direction: r
        } = e,
        i = r.x * r.x + r.z * r.z,
        a = 2 * (n.x * r.x + n.z * r.z),
        o = n.x * n.x + n.z * n.z - this.maxRadius * this.maxRadius,
        s = 0,
        c = 1e7;
      if (i > 1e-12) {
        let e = a * a - 4 * i * o;
        if (e < 0) return null;
        let t = Math.sqrt(e);
        if (s = Math.max(0, (-a - t) / (2 * i)), c = (-a + t) / (2 * i), c < s) return null;
      } else if (o > 0) return null;
      let l = 1 / 0,
        u = -1,
        d = 0;
      for (let e = 0; e < t; e += 1) {
        let layerBottom = this.layerBottom(e),
          a = layerBottom + this.layout.layerHeight,
          o = s,
          f = c;
        if (Math.abs(r.y) > 1e-9) {
          let e = (layerBottom - n.y) / r.y,
            i = (a - n.y) / r.y;
          o = Math.max(o, Math.min(e, i)), f = Math.min(f, Math.max(e, i));
        } else if (n.y < layerBottom || n.y > a) continue;
        if (f < o || o >= l) continue;
        let p = Math.sqrt(i) * (f - o),
          m = Math.min(64, Math.max(2, Math.ceil(p / .5)));
        for (let t = 0; t <= m; t += 1) {
          let i = o + (f - o) * t / m;
          if (i >= l) break;
          let a = n.x + r.x * i,
            s = n.z + r.z * i,
            c = Math.hypot(a, s);
          if (c < Z) continue;
          let p = Math.atan2(a, -s);
          p < 0 && (p += X);
          let h = Math.min(Y - 1, Math.floor(p / X * Y)),
            g = this.cellBlocks[e * Y + h];
          if (!(g < 0) && !(c > (this.dimmed[g] ? Z + (this.outerRadii[g] - Z) * le : this.outerRadii[g]))) {
            l = i, u = g, d = h;
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
      for (let count of this.tiers) count && (count.mesh.dispose(), count.geometry.dispose());
      this.material.dispose(), this.baseGeometry.dispose(), this.baseMaterial.dispose();
    }
  },
  Se = [`aria-label`],
  Ce = {
    class: `pointer-events-none absolute inset-0`
  },
  we = {
    class: `absolute right-2 top-2 flex gap-1`,
    "data-share-exclude": ``
  },
  Te = {
    class: `mt-1.5 text-right text-xs leading-none text-[#bbb] dark:text-muted-foreground/70`,
    "data-share-exclude": ``
  },
  Ee = 14,
  De = 18,
  Oe = 14,
  ke = .3,
  Ae = 4,
  je = 260,
  Me = vueJ({
    __name: `Barcode3D`,
    props: {
      result: {},
      colors: {},
      theme: {},
      shape: {},
      label: {},
      highlight: {},
      dayLabels: {},
      monthMarks: {}
    },
    emits: [`hover`, `unavailable`, `select`],
    setup(l, {
      expose: v,
      emit: y
    }) {
      let b = l,
        x = y,
        {
          t: S
        } = u(),
        C = vueBn(null),
        w = vueBn(null),
        T = vueBn(false),
        E = vueCn([]),
        emptyItems = [],
        O = vueV(() => b.shape === `tower` ? 500 : b.result.days.length > 62 ? 480 : 420),
        k = null,
        resolvedValue = null,
        j = null,
        M = false,
        N = 0,
        P = null,
        F = -1,
        I = false,
        payload = null,
        R = null,
        z = typeof window.matchMedia == `function` && window.matchMedia(`(prefers-reduced-motion: reduce)`).matches,
        orbitControlsE = new OrbitControlsE();
      function V(e, t) {
        emptyItems[t] = e instanceof HTMLElement ? e : null;
      }
      function H() {
        return b.highlight ? new Set(b.highlight) : null;
      }
      function U(e) {
        if (!k) return;
        resolvedValue && (k.scene.remove(resolvedValue.root), resolvedValue.dispose());
        let t = {
          dayLabels: b.dayLabels,
          monthMarks: b.monthMarks
        };
        resolvedValue = b.shape === `tower` ? new xe(b.result, t) : new oe(b.result, t), resolvedValue.setColors(b.colors, b.theme), resolvedValue.setHighlight(H()), k.scene.add(resolvedValue.root), k.setFraming(resolvedValue.framing), F = -1, emptyItems.length = 0, E.value = resolvedValue.labels, resolvedValue.startGrowth(e && !z);
      }
      function W() {
        let e = C.value;
        if (!k || !e) return;
        let clientWidth = e.clientWidth,
          clientHeight = e.clientHeight,
          r = 1 / 0;
        for (let e = E.value.length - 1; e >= 0; --e) {
          let i = E.value[e],
            a = emptyItems[e];
          if (!i || !a) continue;
          let o = k.project(i.position, clientWidth, clientHeight),
            visible = o.visible;
          visible && i.kind === `side` && (Math.abs(r - o.y) < Oe ? visible = false : r = o.y);
          let c = 1;
          i.facing && (orbitControlsE.copy(k.camera.position).sub(i.position), orbitControlsE.dot(i.facing) < 0 && (c = ke)), a.style.visibility = visible ? `visible` : `hidden`, a.style.opacity = String(c), a.style.transform = `translate(${o.x}px, ${o.y}px) translate(${i.kind === `side` ? `-100%` : `-50%`}, -50%)`;
        }
      }
      function G(e) {
        e ? (I = true, x(`hover`, e)) : I && (I = false, x(`hover`, null));
      }
      function K(e) {
        resolvedValue && e !== F && (F = e, resolvedValue.setHovered(e), k?.requestRender());
      }
      function te() {
        N = 0;
        let e = P;
        if (!e || !k || !resolvedValue || T.value) return;
        let t = resolvedValue.pick(k.rayFromEvent(e));
        K(t?.blockIndex ?? -1), G(t ? {
          dayIndex: t.dayIndex,
          bucket: t.bucket,
          clientX: e.clientX,
          clientY: e.clientY
        } : null);
      }
      function ne(e) {
        T.value || (P = e, N ||= requestAnimationFrame(te));
      }
      function q() {
        P = null, N && cancelAnimationFrame(N), N = 0, K(-1), G(null);
      }
      function re(event) {
        T.value = true, payload = {
          x: event.clientX,
          y: event.clientY
        }, q();
      }
      function J() {
        T.value = false;
      }
      function ie(event) {
        if (!payload || !k || !resolvedValue) return;
        let t = Math.hypot(event.clientX - payload.x, event.clientY - payload.y);
        if (payload = null, t > Ae) return;
        let n = resolvedValue.pick(k.rayFromEvent(event));
        R && clearTimeout(R), R = null, !(!n || event.detail > 1) && (R = setTimeout(() => {
          R = null, x(`select`, n.dayIndex);
        }, je));
      }
      function ae() {
        R && clearTimeout(R), R = null, Z();
      }
      function Y(event) {
        k && (k.controls.enableZoom = event.ctrlKey || event.metaKey);
      }
      function X() {
        let e = C.value;
        k && e && k.resize(e.clientWidth, e.clientHeight) && (M ? k.refit() : (M = true, k.flyIn(!z)));
      }
      function Z() {
        k?.resetHome(true);
      }
      function Q(e) {
        k?.flyToView(e);
      }
      async function se(e) {
        return k ? k.freezeForExport(e) : null;
      }
      return v({
        freezeForExport: se
      }), vueWt(() => b.result, () => {
        k && (q(), U(true), k.resetHome(true));
      }), vueWt([() => b.colors, () => b.theme], () => {
        resolvedValue?.setColors(b.colors, b.theme), k?.requestRender();
      }), vueWt(() => b.highlight, () => {
        resolvedValue?.setHighlight(H()), k?.requestRender();
      }), vueUt(() => {
        let e = w.value,
          t = C.value;
        if (e && t) {
          if (k = threestageT.create(e, b.shape === `tower` ? De : Ee, {
            onFrame: e => resolvedValue?.stepGrowth(e) ?? false,
            onRendered: W
          }), !k) {
            x(`unavailable`);
            return;
          }
          U(true), t.addEventListener(`wheel`, Y, {
            capture: true,
            passive: true
          }), window.addEventListener(`pointerup`, J), window.addEventListener(`pointercancel`, J), j = new ResizeObserver(X), j.observe(t);
        }
      }), vueOt(() => {
        N && cancelAnimationFrame(N), N = 0, R && clearTimeout(R), R = null, j?.disconnect(), j = null, C.value?.removeEventListener(`wheel`, Y, {
          capture: true
        }), window.removeEventListener(`pointerup`, J), window.removeEventListener(`pointercancel`, J), I && x(`hover`, null), resolvedValue?.dispose(), resolvedValue = null, k?.dispose(), k = null;
      }), (n, renderCache) => (vueGt(), vueS(`div`, null, [vueY(`div`, {
        ref_key: `containerRef`,
        ref: C,
        class: `relative select-none overflow-hidden`,
        style: vueNr({
          height: `${O.value}px`
        })
      }, [vueY(`canvas`, {
        ref_key: `canvasRef`,
        ref: w,
        class: vueN([`block h-full w-full`, T.value ? `cursor-grabbing` : `cursor-grab`]),
        role: `img`,
        "aria-label": l.label,
        onPointermove: ne,
        onPointerleave: q,
        onPointerdown: re,
        onClick: ie,
        onDblclick: ae
      }, null, 42, Se), vueY(`div`, Ce, [(vueGt(true), vueS(vueC, null, vueSt(E.value, (event, n) => (vueGt(), vueS(`span`, {
        key: event.key,
        ref_for: true,
        ref: e => V(e, n),
        class: vueN([`absolute left-0 top-0 whitespace-nowrap text-xs leading-none`, event.kind === `hour` ? `text-[#bbb] dark:text-muted-foreground/70` : `font-medium text-[#888] dark:text-muted-foreground`]),
        style: {
          visibility: `hidden`
        }
      }, vueRr(event.text), 3))), 128))]), vueY(`div`, we, [vueY(`button`, {
        type: `button`,
        class: `h-6 rounded-md bg-white/85 px-2 text-xs text-[#666] shadow-sm ring-1 ring-black/5 transition-colors hover:bg-white hover:text-[#222] dark:bg-black/40 dark:text-muted-foreground dark:ring-white/10 dark:hover:text-foreground`,
        onClick: renderCache[0] ||= e => Q(`home`)
      }, vueRr(vueAn(S)(`appBarcode.viewTilt`)), 1), vueY(`button`, {
        type: `button`,
        class: `h-6 rounded-md bg-white/85 px-2 text-xs text-[#666] shadow-sm ring-1 ring-black/5 transition-colors hover:bg-white hover:text-[#222] dark:bg-black/40 dark:text-muted-foreground dark:ring-white/10 dark:hover:text-foreground`,
        onClick: renderCache[1] ||= e => Q(`top`)
      }, vueRr(vueAn(S)(`appBarcode.viewTop`)), 1)])], 4), vueY(`p`, Te, vueRr(vueAn(S)(`todayWork.heatmap3dHint`)), 1)]));
    }
  });
export { Me as default };