<template>
<div ref="f_4" :class="`relative h_6-full w-full select-none overflow-hidden`"><canvas ref="m_5" :class="[`block h_6-full w-full`,t_0_19.compact?`pointer-events-none`:g_7.value?`cursor-grabbing`:`cursor-grab`]" @pointerdown="ce" @click="le"></canvas><span v-text="c(w(`div`,Dt,[(p(true),i_20(d,null,a_21(__8.value,(e,t_0_19)=>(p(),i_20(`span`,{key:e,ref_for:true,ref:e=>re(e,t_0_19),class:`absolute left-0 top-0 whitespace-nowrap text-xs leading-none text-[#bbb] dark:text-muted-foreground/70`,style:{visibility:`hidden`}},y(e)+`:00`,1))),128)),w(`span`,{ref_key:`currentLabelRef`,ref:h_6,class:`absolute left-0 top-0 whitespace-nowrap rounded-md bg-white/90 px-2 py-1 text-xs font-medium leading-none text-[#333] shadow-sm ring-1 ring-black/5 dark:bg-black/60 dark:text-foreground dark:ring-white/10`,style:{visibility:`hidden`}},y(t_0_19.currentLabel),513)],512),[[D,!t_0_19.compact]])" /></div>
</template>

<script setup>
import { normalizeClass as e, unref as t, createTextVNode as r, createElementBlock as i, renderList as a, watch as o, createBlock as l, Fragment as d, openBlock as p, defineComponent as m, onMounted as v, toDisplayString as y, onBeforeMount as b, computed as x, createCommentVNode as C, createElementVNode as w } from 'vue';
import { w as D } from '../vendor/i18n/en-US-player.js';
import { t as re } from '../vendor/ui/icons/icon-minimize.js';
import { t as ie } from '../vendor/ui/icons/icon-pause.js';
import { n as ae, t as oe } from '../vendor/chunks/alert.js';
import { t as se } from '../vendor/chunks/_plugin-vue_export-helper.js';
import { t as ce } from '../vendor/chunks/useAuth.js';
import { $t as A, Cn as le, Jt as ue, Qt as de } from '../vendor/chunks/main.js';
import { E as N } from '../vendor/vendors/OrbitControls.js';
import { t as R } from '../vendor/vendors/three-stage.js';

const t_0 = defineProps({
  street: {},
  span: {},
  colors: {},
  theme: {},
  minute: {},
  following: {
    type: Boolean
  },
  overview: {
    type: Boolean
  },
  currentLabel: {},
  compact: {
    type: Boolean
  },
  playing: {
    type: Boolean
  }
});
const s_1 = t_0_19;
var ot = 95;
var st = 1.05;
var ct = .42;
var lt = 10;
var ut = 240;
var dt = class {
  stage;
  scene;
  lastTime = 0;
  target = new N();
  position = new N();
  offset = new N();
  constructor(e, t_0_19) {
    this.stage = e, this.scene = t_0_19;
  }
  reset() {
    this.lastTime = 0;
  }
  update(e, t_0_19) {
    let {
        stage: n_22
      } = this,
      r = this.lastTime ? Math.min(100, e - this.lastTime) : 16;
    this.lastTime = e;
    let {
        minDistance: i_20,
        maxDistance: a_21
      } = n_22.controls,
      o = Math.min(a_21 * .98, Math.max(ot, i_20 * 1.05));
    this.offset.setFromSphericalCoords(o, st, ct), this.target.set(this.scene.minuteToX(t_0_19) + lt, this.scene.maxHeight * .3, 0), this.position.copy(this.target).add(this.offset);
    let s_1_2 = Number.isFinite(e) ? 1 - Math.exp(-r / ut) : 1;
    return n_22.controls.target.lerp(this.target, s_1_2), n_22.camera.position.lerp(this.position, s_1_2), n_22.camera.position.distanceToSquared(this.position) > .01 || n_22.controls.target.distanceToSquared(this.target) > .01;
  }
};
var ft = 288;
var pt = 12;
var mt = 10;
var ht = 3.6;
var gt = .4;
var _t = .03;
var Y = .12;
var vt = 8;
var yt = .82;
var bt = -.03;
var xt = .2;
var X = .35;
var St = `#10b981`;
var Ct = .32;
var wt = .8;
function Tt(e) {
  let t_0_19 = new Ae();
  return t_0_19.onBeforeCompile = t_0_19 => {
    t_0_19.uniforms.uPlayhead = e.uPlayhead, t_0_19.uniforms.uGround = e.uGround, t_0_19.vertexShader = t_0_19.vertexShader.replace(`#include <common>`, `#include <common>
attribute vec2 aSpan;
attribute float aKind;
uniform float uPlayhead;
varying float vReplayFuture;`).replace(`#include <begin_vertex>`, `#include <begin_vertex>
float replaySpan = max(aSpan.y - aSpan.x, 0.0001);
float replayElapsed = clamp(uPlayhead - aSpan.x, 0.0, replaySpan);
float replayStarted = step(0.0001, replayElapsed);
float replayHeight = aKind > 0.5 ? ${ht.toFixed(2)} * sqrt(max(replayElapsed, 0.0001)) : ${gt.toFixed(2)};
transformed.x *= mix(1.0, replayElapsed / replaySpan, replayStarted);
transformed.y *= mix(${_t.toFixed(2)}, replayHeight, replayStarted);
vReplayFuture = 1.0 - replayStarted;`), t_0_19.fragmentShader = t_0_19.fragmentShader.replace(`#include <common>`, `#include <common>
uniform vec3 uGround;
varying float vReplayFuture;`).replace(`#include <color_fragment>`, `#include <color_fragment>
diffuseColor.rgb = mix(diffuseColor.rgb, uGround, vReplayFuture * ${yt.toFixed(2)});`);
  }, t_0_19.customProgramCacheKey = () => `day-replay-building`, t_0_19;
}
var Et = class {
  root = new F();
  framing;
  maxHeight;
  blocks;
  hourMarks;
  centerBucket;
  cellBlocks = new Int32Array(ft).fill(-1);
  uniforms = {
    uPlayhead: {
      value: 0
    },
    uGround: {
      value: new ke()
    }
  };
  buildingGeometry;
  buildingMaterial;
  buildings;
  trackGeometry;
  trackMaterial = new Ae();
  beamGeometry;
  beamMaterial;
  beam;
  hitBox = new I();
  hitPoint = new N();
  constructor(e, t_0_19) {
    this.blocks = Ne(e).blocks, this.centerBucket = (t_0_19.startBucket + t_0_19.endBucket) / 2;
    let n_22 = (t_0_19.endBucket - t_0_19.startBucket) / 2,
      r = (t_0_19.endBucket - t_0_19.startBucket) / pt,
      i_20 = Math.max(1, Math.ceil(r / mt));
    this.hourMarks = [];
    for (let e = Math.ceil(t_0_19.startBucket / pt); e * pt <= t_0_19.endBucket; e += i_20) this.hourMarks.push(e);
    let length = this.blocks.length,
      o = new Float32Array(length * 2),
      s_1_2 = new Float32Array(length),
      c = new De(),
      l_3 = new N(),
      u = new Te(),
      d = new N();
    this.buildingGeometry = new P(1, 1, 1).translate(.5, .5, 0), this.buildingGeometry.setAttribute(`aSpan`, new L(o, 2)), this.buildingGeometry.setAttribute(`aKind`, new L(s_1_2, 1)), this.buildingMaterial = Tt(this.uniforms), this.buildings = new Oe(this.buildingGeometry, this.buildingMaterial, length), this.buildings.instanceColor = new L(new Float32Array(length * 3), 3), this.buildings.frustumCulled = false;
    let f_4 = 6;
    this.blocks.forEach((item, t_0_19) => {
      o[t_0_19 * 2] = item.start, o[t_0_19 * 2 + 1] = item.end, s_1_2[t_0_19] = +!Me(item), Me(item) || (f_4 = Math.max(f_4, ht * Math.sqrt(item.end - item.start))), this.cellBlocks.fill(t_0_19, item.start, item.end), l_3.set(this.bucketToX(item.start) + Y / 2, 0, 0), d.set(Math.max(.3, item.end - item.start - Y), 1, vt), c.compose(l_3, u, d), this.buildings.setMatrixAt(t_0_19, c);
    }), this.buildings.instanceMatrix.needsUpdate = true, this.maxHeight = f_4, this.trackGeometry = new P(n_22 * 2 + 2, xt, 14).translate(0, -.2 / 2, 0);
    let p = new Ee(this.trackGeometry, this.trackMaterial);
    p.position.y = bt, this.beamGeometry = new P(X, 1, 16).translate(0, .5, 0), this.beamMaterial = new we({
      color: St,
      transparent: true,
      opacity: Ct,
      depthWrite: false
    }), this.beam = new Ee(this.beamGeometry, this.beamMaterial), this.beam.scale.y = f_4 * 1.25, this.beam.renderOrder = 1, this.root.add(p, this.buildings, this.beam);
    let emptyItems = [];
    for (let count of [-n_22 - 2, n_22 + 2]) for (let t_0_19 of [0, f_4]) for (let total of [-7, 13]) emptyItems.push(new N(count, t_0_19, total));
    this.framing = {
      target: new N(0, f_4 * .25, 0),
      corners: emptyItems,
      homeView: {
        polar: 1.02,
        azimuth: .3
      },
      topView: {
        polar: 0,
        azimuth: 0
      },
      limits: {
        minPolar: 0,
        maxPolar: 1.42,
        azimuthRange: Math.PI / 2
      }
    };
  }
  bucketToX(e) {
    return e - this.centerBucket;
  }
  minuteToX(e) {
    return this.bucketToX(e / 5);
  }
  setColors(e, t_0_19) {
    let n_22 = new ke();
    this.blocks.forEach((item, i_20) => {
      this.buildings.setColorAt(i_20, n_22.set(je(item, e, t_0_19)));
    }), this.buildings.instanceColor && (this.buildings.instanceColor.needsUpdate = true), this.uniforms.uGround.value.set(t_0_19.ground), this.trackMaterial.color.set(t_0_19.ground);
  }
  setPlayhead(e) {
    let t_0_19 = e / 5;
    this.uniforms.uPlayhead.value = t_0_19, this.beam.position.x = this.bucketToX(t_0_19);
  }
  currentHeight(e) {
    let t_0_19 = this.blocks[e];
    if (!t_0_19) return 0;
    let n_22 = Math.min(t_0_19.end - t_0_19.start, Math.max(0, this.uniforms.uPlayhead.value - t_0_19.start));
    return n_22 <= 0 ? _t : Me(t_0_19) ? gt : ht * Math.sqrt(n_22);
  }
  anchorAt(e, t_0_19) {
    let n_22 = Math.min(ft - 1, Math.max(0, Math.floor(e / 5))),
      r = this.cellBlocks[n_22],
      i_20 = r >= 0 ? this.currentHeight(r) : 0;
    return t_0_19.set(this.minuteToX(e), i_20 + 2.5, 0);
  }
  blockIndexAt(e) {
    let t_0_19 = Math.min(ft - 1, Math.max(0, Math.floor(e / 5)));
    return this.cellBlocks[t_0_19];
  }
  pick(e) {
    let t_0_19 = -1,
      n_22 = 1 / 0;
    return this.blocks.forEach((item, i_20) => {
      let a_21 = this.bucketToX(item.start) + Y / 2,
        o = a_21 + Math.max(.3, item.end - item.start - Y);
      if (this.hitBox.min.set(a_21, 0, -4), this.hitBox.max.set(o, Math.max(wt, this.currentHeight(i_20)), vt / 2), !e.intersectBox(this.hitBox, this.hitPoint)) return;
      let distanceToSquared = this.hitPoint.distanceToSquared(e.origin);
      distanceToSquared < n_22 && (n_22 = distanceToSquared, t_0_19 = i_20);
    }), t_0_19 < 0 ? null : {
      blockIndex: t_0_19,
      minute: this.blocks[t_0_19].start * 5
    };
  }
  dispose() {
    this.buildings.dispose(), this.buildingGeometry.dispose(), this.buildingMaterial.dispose(), this.trackGeometry.dispose(), this.trackMaterial.dispose(), this.beamGeometry.dispose(), this.beamMaterial.dispose();
  }
};
var Dt = {
  class: `pointer-events-none absolute inset-0`
};
var Ot = 4;
let s_1_2 = t_0_19,
  l_3 = r,
  f_4 = u(null),
  m_5 = u(null),
  h_6 = u(null),
  g_7 = u(false),
  __8 = n_22([]),
  x_9 = [],
  S_10 = null,
  C_11 = null,
  T_12 = null,
  E_13 = null,
  O_14 = false,
  k_15 = null,
  ee_16 = typeof window.matchMedia == `function` && window.matchMedia(`(prefers-reduced-motion: reduce)`).matches,
  te_17 = new N(),
  ne_18 = new N();
let value = f_4.value,
  t_0_19 = S_10;
let clientWidth = value.clientWidth,
  clientHeight = value.clientHeight,
  i_20 = C_11;
let a_21 = t_0.project(C_11.anchorAt(s_1.minute, te_17), clientWidth, clientHeight);
let n_22 = C_11.pick(S_10.rayFromEvent(event));
</script>
