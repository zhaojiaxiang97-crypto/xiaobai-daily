const __vite__mapDeps = (items, m = __vite__mapDeps, d = m.f || (m.f = ["../ui/icons/matrix-math.js", "../ui/Switch.js", "../chunks/vue-i18n.runtime.js", "../i18n/en-US-player.js", "../ui/icons/lucide-icons.js"])) => items.map(item => d[item]);
import { $n as e, An as t, Cn as n, O as r, S as i, St as a, Wt as o, Yt as s, Zt as c, b as l, bn as u, c as d, f, gt as p, j as m, k as h, n as g, nr as _, ot as v, rr as y, ut as b, v as x, vn as S, x as C, y as w } from "../chunks/vue-i18n.runtime.js";
import { E as T, r as E, w as D } from "../i18n/en-US-player.js";
import { t as O } from "../chunks/preload-helper.js";
import { r as k, t as ee } from "../ui/icons/lucide-icons.js";
import { t as te } from "../ui/icons/icon-clapperboard.js";
import { _ as ne } from "../chunks/screenshot-beautifier.js";
import { t as re } from "../ui/icons/icon-minimize.js";
import { t as ie } from "../ui/icons/icon-pause.js";
import { n as ae, t as oe } from "../chunks/alert.js";
import { t as se } from "../chunks/_plugin-vue_export-helper.js";
import { t as ce } from "../chunks/useAuth.js";
import { $t as A, Cn as le, Jt as ue, Qt as de, Tn as fe, Xt as pe, Yt as me, Zt as he, an as ge, en as _e, hn as j, in as ve, kn as ye, nn as be, on as xe, rn as M, sn as Se, tn as Ce } from "../chunks/main.js";
import { E as N, _ as we, a as P, b as Te, f as F, g as Ee, h as De, i as I, m as Oe, p as L, s as ke, v as Ae } from "../vendors/OrbitControls.js";
import { n as je, o as Me, r as Ne, t as R } from "../vendors/three-stage.js";
var Pe = k(`crosshair`, [[`circle`, {
    cx: `12`,
    cy: `12`,
    r: `10`,
    key: `1mglay`
  }], [`line`, {
    x1: `22`,
    x2: `18`,
    y1: `12`,
    y2: `12`,
    key: `l9bcsi`
  }], [`line`, {
    x1: `6`,
    x2: `2`,
    y1: `12`,
    y2: `12`,
    key: `13hhkx`
  }], [`line`, {
    x1: `12`,
    x2: `12`,
    y1: `6`,
    y2: `2`,
    key: `10w3f3`
  }], [`line`, {
    x1: `12`,
    x2: `12`,
    y1: `22`,
    y2: `18`,
    key: `15g9kq`
  }]]),
  Fe = k(`film`, [[`rect`, {
    width: `18`,
    height: `18`,
    x: `3`,
    y: `3`,
    rx: `2`,
    key: `afitv7`
  }], [`path`, {
    d: `M7 3v18`,
    key: `bbkbws`
  }], [`path`, {
    d: `M3 7.5h4`,
    key: `zfgn84`
  }], [`path`, {
    d: `M3 12h18`,
    key: `1i2n21`
  }], [`path`, {
    d: `M3 16.5h4`,
    key: `1230mu`
  }], [`path`, {
    d: `M17 3v18`,
    key: `in4fa5`
  }], [`path`, {
    d: `M17 7.5h4`,
    key: `myr1c1`
  }], [`path`, {
    d: `M17 16.5h4`,
    key: `go4c1d`
  }]]);
function z(result) {
  if (result.ok) return result.data;
  throw Error(result.error.message);
}
var Ie = {
    async thumbnails(event, items) {
      return z(await window.electronAPI.dayReplay.thumbnails({
        paths: event,
        ...(items ? {
          width: items
        } : {})
      }));
    },
    async saveVideo(e, t, n) {
      return z(await window.electronAPI.dayReplay.saveVideo({
        data: e,
        fileName: t,
        extension: n
      }));
    }
  },
  B = [`none`, `corner`, `main`],
  V = [`timelapse`, `hold`],
  H = [.5, 1, 2, 4],
  Le = [720, 1080, 1440],
  U = [30, 60],
  Re = {
    screenshots: `none`,
    pace: `timelapse`,
    speed: 1,
    resolution: 1080,
    frameRate: 60
  },
  W = 2800,
  ze = {
    720: 2e6,
    1080: 35e5,
    1440: 6e6
  },
  G = {
    none: 1,
    corner: 1.4,
    main: 2
  },
  Be = `xiaohei-day-replay-export-options`;
function K(items, t, n) {
  return items.includes(t) ? t : n;
}
function q(e) {
  return {
    width: Math.round(e * 16 / 9),
    height: e
  };
}
function J(e) {
  let t = e.frameRate === 30 ? .65 : 1;
  return Math.round(ze[e.resolution] * t * G[e.screenshots]);
}
function Ve(e, t) {
  return e / t;
}
function He(e, t) {
  return 900 + Ve(e, t) + W;
}
function Ue(e, t) {
  return J(t) / 8 * (He(e, t.speed) / 1e3);
}
function We() {
  let e = Re;
  try {
    let t = JSON.parse(localStorage.getItem(Be) ?? `null`);
    return {
      screenshots: K(B, t?.screenshots, e.screenshots),
      pace: K(V, t?.pace, e.pace),
      speed: K(H, t?.speed, e.speed),
      resolution: K(Le, t?.resolution, e.resolution),
      frameRate: K(U, t?.frameRate, e.frameRate)
    };
  } catch {
    return {
      ...e
    };
  }
}
function Ge(e) {
  try {
    localStorage.setItem(Be, JSON.stringify(e));
  } catch {}
}
var Ke = {
    class: `w-[440px] max-w-[calc(100%-32px)] rounded-[10px] border border-black/8 bg-white p-5 shadow-lg dark:border-border dark:bg-card`
  },
  qe = {
    class: `text-sm font-semibold text-(--foreground)`
  },
  Je = {
    class: `mt-4 grid grid-cols-[auto_1fr] items-start gap-x-3 gap-y-3`
  },
  Ye = [`aria-label`, `aria-disabled`],
  Xe = [`aria-checked`, `disabled`, `onClick`],
  Ze = {
    key: 0,
    class: `mt-1 text-xs text-[#bbb] dark:text-muted-foreground/70`
  },
  Qe = {
    class: `mt-4 border-t border-black/6 pt-3 dark:border-border`
  },
  $e = {
    class: `text-xs tabular-nums text-[#666] dark:text-muted-foreground`
  },
  et = {
    key: 0,
    class: `mt-1 text-xs leading-relaxed text-[#999] dark:text-muted-foreground`
  },
  tt = {
    class: `mt-4 flex items-center justify-end gap-2`
  },
  nt = m({
    __name: `ReplayExportDialog`,
    props: {
      options: {},
      hasScreenshots: {
        type: Boolean
      },
      timelineDurationMs: {}
    },
    emits: [`confirm`, `cancel`],
    setup(state, {
      emit: r
    }) {
      let o = state,
        s = r,
        {
          t: c
        } = g(),
        l = S({
          ...o.options
        }),
        promise = x(() => ({
          ...l,
          screenshots: o.hasScreenshots ? l.screenshots : `none`
        })),
        f = {
          720: `720p`,
          1080: `1080p`,
          1440: `2K`
        },
        options = {
          none: `dayReplay.exportScreenshotNone`,
          corner: `dayReplay.exportScreenshotCorner`,
          main: `dayReplay.exportScreenshotMain`
        },
        h = {
          timelapse: `dayReplay.exportPaceTimelapse`,
          hold: `dayReplay.exportPaceHold`
        },
        _ = x(() => [{
          key: `screenshots`,
          label: c(`dayReplay.exportScreenshots`),
          choices: B.map(item => ({
            value: item,
            label: c(options[item]),
            disabled: item !== `none` && !o.hasScreenshots
          })),
          hint: o.hasScreenshots ? undefined : c(`dayReplay.exportNoScreenshots`)
        }, {
          key: `pace`,
          label: c(`dayReplay.exportPace`),
          choices: V.map(item => ({
            value: item,
            label: c(h[item])
          })),
          disabled: promise.value.screenshots === `none`
        }, {
          key: `speed`,
          label: c(`dayReplay.exportSpeed`),
          choices: H.map(item => ({
            value: item,
            label: `${item}×`
          }))
        }, {
          key: `resolution`,
          label: c(`dayReplay.exportResolution`),
          choices: Le.map(item => ({
            value: item,
            label: f[item]
          }))
        }, {
          key: `frameRate`,
          label: c(`dayReplay.exportFrameRate`),
          choices: U.map(item => ({
            value: item,
            label: c(`dayReplay.exportFrameRateValue`, {
              fps: item
            })
          }))
        }]),
        v = x(() => {
          let value = promise.value,
            t = q(value.resolution),
            n = Ue(o.timelineDurationMs, value) / 1024 / 1024;
          return c(`dayReplay.exportEstimate`, {
            seconds: Math.ceil(He(o.timelineDurationMs, value.speed) / 1e3),
            width: t.width,
            height: t.height,
            size: n < 10 ? n.toFixed(1) : Math.round(n)
          });
        });
      function b(e, t) {
        l[e] = t;
      }
      function T() {
        s(`confirm`, {
          ...l
        });
      }
      return (n, r) => (p(), i(`div`, Ke, [w(`h3`, qe, y(t(c)(`dayReplay.exportVideo`)), 1), w(`div`, Je, [(p(true), i(d, null, a(_.value, event => (p(), i(d, {
        key: event.key
      }, [w(`span`, {
        class: e([`pt-1.5 text-xs text-[#888] dark:text-muted-foreground`, event.disabled ? `opacity-50` : ``])
      }, y(event.label), 3), w(`div`, null, [w(`div`, {
        class: `inline-flex flex-wrap items-center gap-0.5 rounded-md bg-black/[0.03] p-0.5 dark:bg-white/5`,
        role: `radiogroup`,
        "aria-label": event.label,
        "aria-disabled": event.disabled || undefined
      }, [(p(true), i(d, null, a(event.choices, n => (p(), i(`button`, {
        key: String(n.value),
        type: `button`,
        role: `radio`,
        "aria-checked": promise.value[event.key] === n.value,
        class: e([`h-6 min-w-10 rounded-[5px] px-2 text-xs tabular-nums transition-colors disabled:cursor-not-allowed disabled:opacity-40`, promise.value[event.key] === n.value ? `bg-white text-[#111] shadow-sm dark:bg-white/15 dark:text-foreground` : `text-[#888] hover:text-[#333] dark:text-muted-foreground dark:hover:text-foreground`]),
        disabled: event.disabled || n.disabled,
        onClick: e => b(event.key, n.value)
      }, y(n.label), 11, Xe))), 128))], 8, Ye), event.hint ? (p(), i(`p`, Ze, y(event.hint), 1)) : C(``, true)])], 64))), 128))]), w(`div`, Qe, [w(`p`, $e, y(v.value), 1), promise.value.screenshots === `none` ? C(``, true) : (p(), i(`p`, et, y(t(c)(`dayReplay.exportPrivacyHint`)), 1))]), w(`div`, tt, [w(`button`, {
        type: `button`,
        class: `h-8 rounded-md px-3 text-xs text-[#666] transition-colors hover:bg-black/[0.05] dark:text-muted-foreground dark:hover:bg-white/5`,
        onClick: r[0] ||= e => s(`cancel`)
      }, y(t(c)(`dayReplay.exportCancel`)), 1), w(`button`, {
        type: `button`,
        class: `h-8 rounded-md bg-[#111] px-3 text-xs text-white transition-colors hover:bg-[#333] dark:bg-foreground dark:text-background dark:hover:bg-foreground/85`,
        onClick: T
      }, y(t(c)(`dayReplay.exportStart`)), 1)])]));
    }
  }),
  rt = m({
    __name: `ReplayScreenshotView`,
    props: {
      bitmap: {}
    },
    setup(e) {
      let t = e,
        n = u(null),
        r = u(null),
        payload = null,
        s = 0;
      function c() {
        s = 0;
        let value = r.value,
          i = n.value;
        if (!value || !i) return;
        let clientWidth = i.clientWidth,
          clientHeight = i.clientHeight;
        if (!clientWidth || !clientHeight) return;
        let c = Math.min(window.devicePixelRatio || 1, 2),
          l = Math.round(clientWidth * c),
          u = Math.round(clientHeight * c);
        (value.width !== l || value.height !== u) && (value.width = l, value.height = u);
        let context = value.getContext(`2d`);
        if (!context) return;
        context.clearRect(0, 0, l, u);
        let bitmap = t.bitmap;
        if (!bitmap) return;
        let p = Math.min(l / bitmap.width, u / bitmap.height),
          m = bitmap.width * p,
          h = bitmap.height * p;
        context.imageSmoothingQuality = `high`;
        try {
          context.drawImage(bitmap, (l - m) / 2, (u - h) / 2, m, h);
        } catch {}
      }
      function l() {
        s ||= requestAnimationFrame(c);
      }
      return o(() => t.bitmap, l), b(() => {
        n.value && (payload = new ResizeObserver(l), payload.observe(n.value)), l();
      }), v(() => {
        payload?.disconnect(), s && cancelAnimationFrame(s);
      }), (e, t) => (p(), i(`div`, {
        ref_key: `containerRef`,
        ref: n,
        class: `relative h-full w-full`
      }, [w(`canvas`, {
        ref_key: `canvasRef`,
        ref: r,
        class: `absolute inset-0 block h-full w-full`
      }, null, 512)], 512));
    }
  }),
  it = [`aria-label`, `aria-valuenow`],
  at = m({
    __name: `ReplayScrubber`,
    props: {
      street: {},
      colors: {},
      theme: {},
      minute: {},
      startMinute: {},
      endMinute: {},
      label: {}
    },
    emits: [`seek`, `scrub-start`, `scrub-end`],
    setup(event, {
      emit: t
    }) {
      let n = event,
        r = t,
        a = u(null),
        options = u(false),
        s = x(() => ({
          start: n.startMinute / 5,
          end: n.endMinute / 5
        }));
      function c(e) {
        let t = a.value?.getBoundingClientRect();
        if (!t || t.width <= 0) return n.minute;
        let r = Math.min(1, Math.max(0, (e.clientX - t.left) / t.width));
        return n.startMinute + r * (n.endMinute - n.startMinute);
      }
      function l(e) {
        e.button === 0 && (options.value = true, e.currentTarget.setPointerCapture(e.pointerId), r(`scrub-start`), r(`seek`, c(e)));
      }
      function d(e) {
        options.value && r(`seek`, c(e));
      }
      function f(e) {
        options.value && (options.value = false, e.currentTarget.releasePointerCapture(e.pointerId), r(`scrub-end`));
      }
      return (t, n) => (p(), i(`div`, {
        ref_key: `trackRef`,
        ref: a,
        class: `min-w-0 cursor-pointer touch-none`,
        role: `slider`,
        "aria-label": event.label,
        "aria-valuemin": `0`,
        "aria-valuemax": 1440,
        "aria-valuenow": Math.round(event.minute),
        onPointerdown: l,
        onPointermove: d,
        onPointerup: f,
        onPointercancel: f
      }, [h(_e, {
        compact: ``,
        result: event.street,
        colors: event.colors,
        theme: event.theme,
        "now-minute": event.minute,
        "bucket-range": s.value,
        label: event.label
      }, null, 8, [`result`, `colors`, `theme`, `now-minute`, `bucket-range`, `label`])], 40, it));
    }
  }),
  ot = 95,
  st = 1.05,
  ct = .42,
  lt = 10,
  ut = 240,
  dt = class {
    stage;
    scene;
    lastTime = 0;
    target = new N();
    position = new N();
    offset = new N();
    constructor(e, t) {
      this.stage = e, this.scene = t;
    }
    reset() {
      this.lastTime = 0;
    }
    update(e, t) {
      let {
          stage: n
        } = this,
        r = this.lastTime ? Math.min(100, e - this.lastTime) : 16;
      this.lastTime = e;
      let {
          minDistance: i,
          maxDistance: a
        } = n.controls,
        o = Math.min(a * .98, Math.max(ot, i * 1.05));
      this.offset.setFromSphericalCoords(o, st, ct), this.target.set(this.scene.minuteToX(t) + lt, this.scene.maxHeight * .3, 0), this.position.copy(this.target).add(this.offset);
      let s = Number.isFinite(e) ? 1 - Math.exp(-r / ut) : 1;
      return n.controls.target.lerp(this.target, s), n.camera.position.lerp(this.position, s), n.camera.position.distanceToSquared(this.position) > .01 || n.controls.target.distanceToSquared(this.target) > .01;
    }
  },
  ft = 288,
  pt = 12,
  mt = 10,
  ht = 3.6,
  gt = .4,
  _t = .03,
  Y = .12,
  vt = 8,
  yt = .82,
  bt = -.03,
  xt = .2,
  X = .35,
  St = `#10b981`,
  Ct = .32,
  wt = .8;
function Tt(e) {
  let t = new Ae();
  return t.onBeforeCompile = t => {
    t.uniforms.uPlayhead = e.uPlayhead, t.uniforms.uGround = e.uGround, t.vertexShader = t.vertexShader.replace(`#include <common>`, `#include <common>
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
vReplayFuture = 1.0 - replayStarted;`), t.fragmentShader = t.fragmentShader.replace(`#include <common>`, `#include <common>
uniform vec3 uGround;
varying float vReplayFuture;`).replace(`#include <color_fragment>`, `#include <color_fragment>
diffuseColor.rgb = mix(diffuseColor.rgb, uGround, vReplayFuture * ${yt.toFixed(2)});`);
  }, t.customProgramCacheKey = () => `day-replay-building`, t;
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
    constructor(e, t) {
      this.blocks = Ne(e).blocks, this.centerBucket = (t.startBucket + t.endBucket) / 2;
      let n = (t.endBucket - t.startBucket) / 2,
        r = (t.endBucket - t.startBucket) / pt,
        i = Math.max(1, Math.ceil(r / mt));
      this.hourMarks = [];
      for (let e = Math.ceil(t.startBucket / pt); e * pt <= t.endBucket; e += i) this.hourMarks.push(e);
      let length = this.blocks.length,
        o = new Float32Array(length * 2),
        s = new Float32Array(length),
        c = new De(),
        l = new N(),
        u = new Te(),
        d = new N();
      this.buildingGeometry = new P(1, 1, 1).translate(.5, .5, 0), this.buildingGeometry.setAttribute(`aSpan`, new L(o, 2)), this.buildingGeometry.setAttribute(`aKind`, new L(s, 1)), this.buildingMaterial = Tt(this.uniforms), this.buildings = new Oe(this.buildingGeometry, this.buildingMaterial, length), this.buildings.instanceColor = new L(new Float32Array(length * 3), 3), this.buildings.frustumCulled = false;
      let f = 6;
      this.blocks.forEach((item, t) => {
        o[t * 2] = item.start, o[t * 2 + 1] = item.end, s[t] = +!Me(item), Me(item) || (f = Math.max(f, ht * Math.sqrt(item.end - item.start))), this.cellBlocks.fill(t, item.start, item.end), l.set(this.bucketToX(item.start) + Y / 2, 0, 0), d.set(Math.max(.3, item.end - item.start - Y), 1, vt), c.compose(l, u, d), this.buildings.setMatrixAt(t, c);
      }), this.buildings.instanceMatrix.needsUpdate = true, this.maxHeight = f, this.trackGeometry = new P(n * 2 + 2, xt, 14).translate(0, -.2 / 2, 0);
      let p = new Ee(this.trackGeometry, this.trackMaterial);
      p.position.y = bt, this.beamGeometry = new P(X, 1, 16).translate(0, .5, 0), this.beamMaterial = new we({
        color: St,
        transparent: true,
        opacity: Ct,
        depthWrite: false
      }), this.beam = new Ee(this.beamGeometry, this.beamMaterial), this.beam.scale.y = f * 1.25, this.beam.renderOrder = 1, this.root.add(p, this.buildings, this.beam);
      let emptyItems = [];
      for (let count of [-n - 2, n + 2]) for (let t of [0, f]) for (let total of [-7, 13]) emptyItems.push(new N(count, t, total));
      this.framing = {
        target: new N(0, f * .25, 0),
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
    setColors(e, t) {
      let n = new ke();
      this.blocks.forEach((item, i) => {
        this.buildings.setColorAt(i, n.set(je(item, e, t)));
      }), this.buildings.instanceColor && (this.buildings.instanceColor.needsUpdate = true), this.uniforms.uGround.value.set(t.ground), this.trackMaterial.color.set(t.ground);
    }
    setPlayhead(e) {
      let t = e / 5;
      this.uniforms.uPlayhead.value = t, this.beam.position.x = this.bucketToX(t);
    }
    currentHeight(e) {
      let t = this.blocks[e];
      if (!t) return 0;
      let n = Math.min(t.end - t.start, Math.max(0, this.uniforms.uPlayhead.value - t.start));
      return n <= 0 ? _t : Me(t) ? gt : ht * Math.sqrt(n);
    }
    anchorAt(e, t) {
      let n = Math.min(ft - 1, Math.max(0, Math.floor(e / 5))),
        r = this.cellBlocks[n],
        i = r >= 0 ? this.currentHeight(r) : 0;
      return t.set(this.minuteToX(e), i + 2.5, 0);
    }
    blockIndexAt(e) {
      let t = Math.min(ft - 1, Math.max(0, Math.floor(e / 5)));
      return this.cellBlocks[t];
    }
    pick(e) {
      let t = -1,
        n = 1 / 0;
      return this.blocks.forEach((item, i) => {
        let a = this.bucketToX(item.start) + Y / 2,
          o = a + Math.max(.3, item.end - item.start - Y);
        if (this.hitBox.min.set(a, 0, -4), this.hitBox.max.set(o, Math.max(wt, this.currentHeight(i)), vt / 2), !e.intersectBox(this.hitBox, this.hitPoint)) return;
        let distanceToSquared = this.hitPoint.distanceToSquared(e.origin);
        distanceToSquared < n && (n = distanceToSquared, t = i);
      }), t < 0 ? null : {
        blockIndex: t,
        minute: this.blocks[t].start * 5
      };
    }
    dispose() {
      this.buildings.dispose(), this.buildingGeometry.dispose(), this.buildingMaterial.dispose(), this.trackGeometry.dispose(), this.trackMaterial.dispose(), this.beamGeometry.dispose(), this.beamMaterial.dispose();
    }
  },
  Dt = {
    class: `pointer-events-none absolute inset-0`
  },
  Ot = 4,
  kt = m({
    __name: `ReplayStreet`,
    props: {
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
    },
    emits: [`unavailable`, `update:following`, `seek`],
    setup(t, {
      emit: r
    }) {
      let s = t,
        l = r,
        f = u(null),
        m = u(null),
        h = u(null),
        g = u(false),
        _ = n([]),
        x = [],
        S = null,
        C = null,
        T = null,
        E = null,
        O = false,
        k = null,
        ee = typeof window.matchMedia == `function` && window.matchMedia(`(prefers-reduced-motion: reduce)`).matches,
        te = new N(),
        ne = new N();
      function re(e, t) {
        x[t] = e instanceof HTMLElement ? e : null;
      }
      function ie(e) {
        if (!S || !E || !s.following || s.overview || S.isCameraTweening) return E?.reset(), false;
        let t = E.update(e, s.minute);
        return !s.playing && t;
      }
      function ae(el, t) {
        el && (el.style.visibility = t.visible ? `visible` : `hidden`, el.style.transform = `translate(${t.x}px, ${t.y}px) translate(-50%, -50%)`);
      }
      function oe() {
        let value = f.value,
          t = S;
        if (!t || !C || !value || s.compact) return;
        let clientWidth = value.clientWidth,
          clientHeight = value.clientHeight,
          i = C;
        _.value.forEach((item, a) => {
          ne.set(i.minuteToX(item * 60), 0, 10), ae(x[a] ?? null, t.project(ne, clientWidth, clientHeight));
        });
        let a = t.project(C.anchorAt(s.minute, te), clientWidth, clientHeight);
        ae(h.value, {
          ...a,
          visible: a.visible && !!s.currentLabel
        });
      }
      function se() {
        let value = f.value;
        S && value && S.resize(value.clientWidth, value.clientHeight) && (O ? s.following && !s.overview ? S.requestRender() : S.refit() : (O = true, S.flyIn(!ee)));
      }
      function ce(event) {
        g.value = true, k = {
          x: event.clientX,
          y: event.clientY
        };
      }
      function A() {
        g.value = false;
      }
      function le(event) {
        if (!k || !S || !C) return;
        let t = Math.hypot(event.clientX - k.x, event.clientY - k.y);
        if (k = null, t > Ot) return;
        let n = C.pick(S.rayFromEvent(event));
        n && l(`seek`, n.minute);
      }
      function ue(event) {
        S && (S.controls.enableZoom = event.ctrlKey || event.metaKey);
      }
      function de() {
        s.following && l(`update:following`, false);
      }
      return o(() => s.minute, e => {
        C?.setPlayhead(e), S?.requestRender();
      }), o([() => s.colors, () => s.theme], () => {
        C?.setColors(s.colors, s.theme), S?.requestRender();
      }), o(() => s.following, e => {
        e && S && (S.viewTouched = false, E?.reset(), S.requestRender());
      }), o(() => s.overview, e => {
        S && (e ? S.resetHome(true) : S.requestRender());
      }), o(() => s.currentLabel, () => S?.requestRender()), o(() => s.compact, () => S?.requestRender()), o(() => s.playing, e => {
        e || S?.requestRender();
      }), b(() => {
        let value = m.value,
          t = f.value;
        if (value && t) {
          if (S = R.create(value, 30, {
            onFrame: ie,
            onRendered: oe
          }), !S) {
            l(`unavailable`);
            return;
          }
          C = new Et(s.street, s.span), _.value = C.hourMarks, C.setColors(s.colors, s.theme), C.setPlayhead(s.minute), S.scene.add(C.root), S.setFraming(C.framing), E = new dt(S, C), S.controls.addEventListener(`start`, de), t.addEventListener(`wheel`, ue, {
            capture: true,
            passive: true
          }), window.addEventListener(`pointerup`, A), window.addEventListener(`pointercancel`, A), T = new ResizeObserver(se), T.observe(t);
        }
      }), v(() => {
        T?.disconnect(), T = null, f.value?.removeEventListener(`wheel`, ue, {
          capture: true
        }), window.removeEventListener(`pointerup`, A), window.removeEventListener(`pointercancel`, A), S?.controls.removeEventListener(`start`, de), C?.dispose(), C = null, S?.dispose(), S = null;
      }), (n, r) => (p(), i(`div`, {
        ref_key: `containerRef`,
        ref: f,
        class: `relative h-full w-full select-none overflow-hidden`
      }, [w(`canvas`, {
        ref_key: `canvasRef`,
        ref: m,
        class: e([`block h-full w-full`, t.compact ? `pointer-events-none` : g.value ? `cursor-grabbing` : `cursor-grab`]),
        onPointerdown: ce,
        onClick: le
      }, null, 34), c(w(`div`, Dt, [(p(true), i(d, null, a(_.value, (e, t) => (p(), i(`span`, {
        key: e,
        ref_for: true,
        ref: e => re(e, t),
        class: `absolute left-0 top-0 whitespace-nowrap text-xs leading-none text-[#bbb] dark:text-muted-foreground/70`,
        style: {
          visibility: `hidden`
        }
      }, y(e) + `:00`, 1))), 128)), w(`span`, {
        ref_key: `currentLabelRef`,
        ref: h,
        class: `absolute left-0 top-0 whitespace-nowrap rounded-md bg-white/90 px-2 py-1 text-xs font-medium leading-none text-[#333] shadow-sm ring-1 ring-black/5 dark:bg-black/60 dark:text-foreground dark:ring-white/10`,
        style: {
          visibility: `hidden`
        }
      }, y(t.currentLabel), 513)], 512), [[D, !t.compact]])], 512));
    }
  });
function At() {
  let {
    t: e,
    duration: t,
    cellName: n
  } = A();
  function r(r, i) {
    let {
      longest: a
    } = r;
    return [{
      label: e(`dayReplay.summaryActive`),
      value: r.activeSec > 0 ? t(r.activeSec) : `--`,
      detail: ``
    }, {
      label: e(`dayReplay.summaryLongest`),
      value: a ? t(a.minutes * 60) : `--`,
      detail: a ? n(i, a.value) : ``
    }, {
      label: e(`dayReplay.summarySpan`),
      value: r.firstMinute !== null && r.lastMinute !== null ? `${ve(r.firstMinute)} – ${r.lastMinute >= 1440 ? `24:00` : ve(r.lastMinute)}` : `--`,
      detail: ``
    }, {
      label: e(`dayReplay.summaryRecords`),
      value: String(r.recordCount),
      detail: ``
    }];
  }
  function i(state, r, i) {
    return state.top.map(item => ({
      key: item.value,
      name: n(r, item.value),
      color: i[item.value] ?? `#999999`,
      duration: t(item.activeSec)
    }));
  }
  return {
    t: e,
    summaryItems: r,
    topItems: i
  };
}
var jt = {
    class: `w-[380px] max-w-[calc(100%-32px)] rounded-[10px] border border-black/8 bg-white p-5 shadow-lg dark:border-border dark:bg-card`
  },
  Mt = {
    class: `flex items-baseline justify-between gap-3`
  },
  Nt = {
    class: `text-sm font-semibold text-(--foreground)`
  },
  Pt = {
    class: `text-xs text-[#999] dark:text-muted-foreground`
  },
  Ft = {
    class: `mt-4 grid grid-cols-2 gap-x-5 gap-y-4`
  },
  It = {
    class: `text-lg font-semibold leading-tight text-(--foreground)`
  },
  Lt = {
    class: `mt-1 truncate text-xs leading-none text-[#999] dark:text-muted-foreground`
  },
  Rt = {
    key: 0,
    class: `mt-4 border-t border-black/6 pt-3 dark:border-border`
  },
  zt = {
    class: `text-xs text-[#999] dark:text-muted-foreground`
  },
  Bt = {
    class: `mt-2 flex flex-col gap-1.5`
  },
  Vt = {
    class: `min-w-0 flex-1 truncate text-[#555] dark:text-foreground`
  },
  Ht = {
    class: `text-[#aaa] dark:text-muted-foreground`
  },
  Ut = {
    key: 1,
    class: `mt-4 text-xs leading-relaxed text-[#aaa] dark:text-muted-foreground`
  },
  Wt = {
    class: `mt-5 flex justify-end gap-2`
  },
  Gt = m({
    __name: `ReplaySummary`,
    props: {
      summary: {},
      street: {},
      colors: {},
      dateLabel: {},
      hasScreenshots: {
        type: Boolean
      }
    },
    emits: [`replay`, `close`],
    setup(event, {
      emit: n
    }) {
      let o = event,
        s = n,
        {
          t: c,
          summaryItems: l,
          topItems: u
        } = At(),
        f = x(() => l(o.summary, o.street)),
        m = x(() => u(o.summary, o.street, o.colors));
      return (n, o) => (p(), i(`div`, jt, [w(`div`, Mt, [w(`h3`, Nt, y(t(c)(`dayReplay.summaryTitle`)), 1), w(`span`, Pt, y(event.dateLabel), 1)]), w(`div`, Ft, [(p(true), i(d, null, a(f.value, state => (p(), i(`div`, {
        key: state.label,
        class: `min-w-0`
      }, [w(`div`, It, y(state.value), 1), w(`div`, Lt, [r(y(state.label), 1), state.detail ? (p(), i(d, {
        key: 0
      }, [r(` · ` + y(state.detail), 1)], 64)) : C(``, true)])]))), 128))]), m.value.length ? (p(), i(`div`, Rt, [w(`div`, zt, y(t(c)(`dayReplay.summaryTop`)), 1), w(`div`, Bt, [(p(true), i(d, null, a(m.value, e => (p(), i(`div`, {
        key: e.key,
        class: `flex items-center gap-2 text-xs`
      }, [w(`span`, {
        class: `size-2.5 shrink-0 rounded-[3px]`,
        style: _({
          background: e.color
        })
      }, null, 4), w(`span`, Vt, y(e.name), 1), w(`span`, Ht, y(e.duration), 1)]))), 128))])])) : C(``, true), event.hasScreenshots ? C(``, true) : (p(), i(`p`, Ut, y(t(c)(`dayReplay.noScreenshotHint`)), 1)), w(`div`, Wt, [w(`button`, {
        type: `button`,
        class: `h-8 rounded-md px-3 text-xs text-[#666] transition-colors hover:bg-black/[0.04] dark:text-muted-foreground dark:hover:bg-white/5`,
        onClick: o[0] ||= e => s(`close`)
      }, y(t(c)(`dayReplay.close`)), 1), w(`button`, {
        type: `button`,
        class: `flex h-8 items-center gap-1.5 rounded-md bg-[#111] px-3 text-xs text-white transition-colors hover:bg-[#333] dark:bg-foreground dark:text-background dark:hover:bg-foreground/85`,
        onClick: o[1] ||= e => s(`replay`)
      }, [h(t(le), {
        size: 13
      }), r(` ` + y(t(c)(`dayReplay.replay`)), 1)])])]));
    }
  }),
  Kt = 288,
  Z = 5,
  qt = 4,
  Jt = .06,
  Yt = 200,
  Xt = 12e3,
  Zt = 36e3,
  Qt = 10,
  $t = 60 / Z,
  en = 2 * $t;
function tn(text) {
  let [t, n, r] = text.split(`-`).map(Number);
  return new Date(t, n - 1, r);
}
function nn(e) {
  return Math.min(1440, Math.max(0, e));
}
function rn(e) {
  if (!e.screenshotPath || e.screenshotExists === false) return null;
  let t = e.screenshotPath.trim();
  if (!t.startsWith(`[`)) return t;
  try {
    let e = JSON.parse(t);
    return Array.isArray(e) && typeof e[0] == `string` ? e[0] : null;
  } catch {
    return null;
  }
}
function an(e, items) {
  let time = tn(e).getTime();
  return items.map(item => {
    let t = nn((Date.parse(item.startedAt) - time) / 6e4),
      r = nn((Date.parse(item.endedAt) - time) / 6e4);
    return {
      id: item.id,
      startMinute: Math.min(t, r),
      endMinute: Math.max(t, r),
      summary: item.summary.trim(),
      category: item.category,
      screenshotPath: rn(item)
    };
  }).filter(item => Number.isFinite(item.startMinute) && item.summary).sort((left, right) => left.startMinute - right.startMinute || left.endMinute - right.endMinute);
}
function on(e, t, items) {
  let r = t.days[0]?.cells ?? [],
    i = new Uint8Array(Kt);
  r.forEach((item, t) => {
    item !== -1 && (i[t] = 1);
  });
  for (let e of items) {
    let t = Math.floor(e.startMinute / Z),
      n = Math.max(t + 1, Math.ceil(Math.max(e.endMinute, e.startMinute + Qt) / Z));
    i.fill(1, Math.min(Kt - 1, t), Math.min(Kt, n));
  }
  let a = i.indexOf(1);
  if (a < 0) return null;
  let lastIndexOf = i.lastIndexOf(1),
    s = Math.floor(a / $t) * $t,
    c = Math.min(Kt, Math.ceil((lastIndexOf + 1) / $t) * $t);
  c - s < en && (c = Math.min(Kt, s + en), s = Math.max(0, c - en));
  let l = c - s,
    u = new Float32Array(l).fill(1),
    d = -1;
  for (let e = 0; e <= l; e += 1) {
    let t = e < l && !i[s + e];
    t && d < 0 && (d = e), !t && d >= 0 && (e - d >= qt && u.fill(Jt, d, e), d = -1);
  }
  let f = new Float64Array(l + 1);
  for (let e = 0; e < l; e += 1) f[e + 1] = f[e] + u[e];
  let p = Math.min(Zt, Math.max(Xt, f[l] * Yt));
  return {
    date: e,
    street: t,
    records: items,
    startBucket: s,
    endBucket: c,
    cumulative: f,
    weights: u,
    durationMs: p,
    hasScreenshots: items.some(item => item.screenshotPath),
    frames: hn(items)
  };
}
function sn(e, t) {
  let {
      cumulative: n,
      startBucket: r
    } = e,
    i = n[n.length - 1] || 1,
    a = Math.min(1, Math.max(0, t)) * i,
    o = 0,
    s = n.length - 2;
  for (; o < s;) {
    let e = Math.ceil((o + s) / 2);
    n[e] <= a ? o = e : s = e - 1;
  }
  let c = n[o + 1] - n[o],
    l = c > 0 ? Math.min(1, (a - n[o]) / c) : 0;
  return (r + o + l) * Z;
}
function cn(e, t) {
  let {
      cumulative: n,
      startBucket: r
    } = e,
    i = n.length - 1,
    a = Math.min(i, Math.max(0, t / Z - r)),
    o = Math.min(i - 1, Math.floor(a));
  return (n[o] + (a - o) * (n[o + 1] - n[o])) / (n[i] || 1);
}
function ln(e, t) {
  let n = Math.floor(t / Z) - e.startBucket;
  return n >= 0 && n < e.weights.length && e.weights[n] < 1;
}
var un = 60;
function dn(e, t) {
  let {
      records: n
    } = e,
    r = 0,
    i = n.length - 1,
    a = -1;
  for (; r <= i;) {
    let e = r + i >> 1;
    n[e].startMinute <= t ? (a = e, r = e + 1) : i = e - 1;
  }
  if (a < 0) return null;
  let o = n[a];
  return t < Math.max(o.endMinute, o.startMinute + Qt) + un ? o : null;
}
var fn = 60,
  pn = /XHD\d{8}(\d{2})(\d{2})(\d{2})/;
function mn(e, text) {
  let n = text.split(/[\\/]/).pop() ?? ``,
    r = pn.exec(n);
  return r ? Number(r[1]) * 60 + Number(r[2]) + Number(r[3]) / 60 : e.endMinute;
}
function hn(e) {
  let t = new Set(),
    n = [];
  for (let diff of e) {
    let screenshotPath = diff.screenshotPath;
    screenshotPath && !t.has(screenshotPath) && (t.add(screenshotPath), n.push({
      minute: mn(diff, screenshotPath),
      path: screenshotPath
    }));
  }
  return n.sort((left, right) => left.minute - right.minute);
}
function gn(e, t) {
  let n = 0,
    r = e.length - 1,
    i = -1;
  for (; n <= r;) {
    let a = n + r >> 1;
    e[a].minute <= t ? (i = a, n = a + 1) : r = a - 1;
  }
  return i < 0 || t - e[i].minute > fn ? -1 : i;
}
function _n(e, t) {
  let n = Math.min(Kt - 1, Math.max(0, Math.floor(t / Z)));
  return e.street.days[0]?.cells[n] ?? -1;
}
function vn(e) {
  let t = e.street.days[0],
    n = t?.cells ?? [],
    product = null,
    dataUrl = null,
    a = null;
  for (let e of M(n)) {
    if (e.value < 0) continue;
    product === null && (product = e.start * Z), dataUrl = e.end * Z;
    let t = (e.end - e.start) * Z;
    (!a || t > a.minutes) && (a = {
      value: e.value,
      minutes: t
    });
  }
  return {
    activeSec: t?.activeSec ?? 0,
    firstMinute: product,
    lastMinute: dataUrl,
    longest: a,
    top: e.street.series.map((item, t) => ({
      value: t,
      activeSec: item.activeSec
    })).slice(0, 3),
    recordCount: e.records.length
  };
}
function yn(e, t, r) {
  let i = n(e()),
    a = 0,
    flag = null;
  function c() {
    flag && clearTimeout(flag), flag = null, i.value = e(), a = performance.now();
  }
  return o(e, e => {
    if (Object.is(e, i.value)) {
      flag && clearTimeout(flag), flag = null;
      return;
    }
    let n = r() ? 0 : t - (performance.now() - a);
    n <= 0 ? c() : flag ||= setTimeout(c, n);
  }), o(r, e => {
    e && flag && c();
  }), v(() => {
    flag && clearTimeout(flag), flag = null;
  }), i;
}
var bn = 100,
  xn = [.5, 1, 2];
function Sn(state, t) {
  let n = u(0),
    r = u(false),
    i = u(1),
    a = 0,
    o = 0;
  function s(c) {
    if (a = 0, !r.value) return;
    o ||= c;
    let l = c - o;
    if (l < 32.333333333333336) {
      a = requestAnimationFrame(s);
      return;
    }
    o = c;
    let u = n.value + Math.min(l, bn) * i.value / Math.max(1, state.value);
    if (u >= 1) {
      n.value = 1, r.value = false, t();
      return;
    }
    n.value = u, a = requestAnimationFrame(s);
  }
  function c() {
    n.value >= 1 && (n.value = 0), r.value = true, o = 0, a ||= requestAnimationFrame(s);
  }
  function l() {
    r.value = false, a && cancelAnimationFrame(a), a = 0;
  }
  function d() {
    r.value ? l() : c();
  }
  function f(e) {
    n.value = Math.min(1, Math.max(0, e)), o = 0;
  }
  function p() {
    document.hidden && l();
  }
  return document.addEventListener(`visibilitychange`, p), v(() => {
    document.removeEventListener(`visibilitychange`, p), l();
  }), {
    progress: n,
    playing: r,
    speed: i,
    play: c,
    pause: l,
    toggle: d,
    seek: f
  };
}
var Cn = 8,
  wn = 12,
  Tn = 6,
  En = 30;
function Dn() {
  let e = u(0),
    t = u(0),
    n = u(0),
    r = [],
    i = [],
    a = new Map(),
    o = new Set(),
    s = 0,
    c = false;
  function l() {
    for (let e of a.values()) e.close();
    a.clear(), o.clear();
  }
  async function d(items) {
    let o = ++s;
    l(), r = items, i = Array(items.length), e.value = items.length, t.value = 0;
    for (let e = 0; e < items.length; e += Cn) {
      let r = items.slice(e, e + Cn),
        l;
      try {
        l = await Ie.thumbnails(r.map(item => item.path));
      } catch (e) {
        console.warn(`[DayReplay] 截图缩略图读取失败:`, e), l = r.map(() => null);
      }
      if (c || o !== s) return;
      l.forEach((item, n) => {
        i[e + n] = item ? new Blob([item], {
          type: `image/jpeg`
        }) : null;
      }), t.value = e + r.length, n.value += 1;
    }
  }
  function f(e) {
    let t = a.get(e);
    t && (a.delete(e), a.set(e, t));
  }
  function p() {
    for (; a.size > wn;) {
      let value = a.keys().next().value;
      if (value === undefined) break;
      a.get(value)?.close(), a.delete(value);
    }
  }
  function m(e) {
    if (a.has(e) || o.has(e)) return;
    let t = i[e];
    if (!t) return;
    let r = s;
    o.add(e), createImageBitmap(t).then(result => {
      if (o.delete(e), c || r !== s) {
        result.close();
        return;
      }
      a.set(e, result), p(), n.value += 1;
    }).catch(() => {
      o.delete(e), !(c || r !== s) && (i[e] = null, n.value += 1);
    });
  }
  function h(e) {
    if (e < 0 || e >= r.length) return null;
    let t = Math.min(r.length, e + Tn);
    for (let n = e; n < t; n += 1) m(n);
    for (let t = e; t >= 0 && t > e - En; --t) {
      let e = a.get(t);
      if (e) return f(t), e;
    }
    return null;
  }
  function g(e) {
    return i[e] instanceof Blob;
  }
  return v(() => {
    c = true, s += 1, l(), i = [];
  }), {
    total: e,
    loaded: t,
    version: n,
    load: d,
    bitmapAt: h,
    isLoaded: g
  };
}
var Q = 1280,
  On = 56,
  kn = 534,
  An = 900,
  jn = 24,
  Mn = 48,
  Nn = 1184,
  Pn = 624,
  Fn = 700,
  In = 32,
  Ln = 320,
  Rn = 200,
  zn = 16,
  Bn = {
    x: 944,
    y: 72,
    width: Ln,
    height: Rn
  },
  $ = {
    x: zn,
    y: 72,
    width: Bn.x - 32,
    height: 432
  };
function Vn(e) {
  return e === `main` ? Bn : {
    x: 0,
    y: 56,
    width: Q,
    height: 464
  };
}
function Hn(e, t) {
  if (e !== `main`) return 1024;
  let n = Math.min($.width, $.height * 16 / 9) * t;
  return Math.min(1600, Math.max(1024, Math.ceil(n / 128) * 128));
}
var Un = /[⺀-鿿　-〿＀-￯]/;
function Wn(e, items, n, r) {
  let i = items.match(/[⺀-鿿　-〿＀-￯]|[^\s⺀-鿿　-〿＀-￯]+|\s+/g) ?? [],
    a = [],
    o = ``,
    s = false,
    handler = () => {
      a.push(o.trimEnd()), o = ``;
    };
  for (let t of i) if (!/^\s+$/.test(t) || o) {
    if (e.measureText(o + t).width <= n) {
      o += t;
      continue;
    }
    if (o && handler(), a.length >= r) {
      s = true;
      break;
    }
    if (!Un.test(t) && e.measureText(t).width > n) {
      for (let i of t) {
        if (e.measureText(o + i).width > n && o && (handler(), a.length >= r)) {
          s = true;
          break;
        }
        o += i;
      }
      if (s) break;
    } else o = t.trimStart();
  }
  if (!s && o && (a.length >= r ? s = true : handler()), s && a.length > 0) {
    let t = a[a.length - 1];
    for (; t && e.measureText(`${t}…`).width > n;) t = t.slice(0, -1);
    a[a.length - 1] = `${t}…`;
  }
  return a.slice(0, r);
}
function Gn(e, t, n, r, i, a) {
  e.save(), e.beginPath(), e.roundRect(n, r, i, i, a), e.clip(), e.drawImage(t, n, r, i, i), e.restore();
}
function Kn(e, t) {
  let {
      theme: n,
      texts: r,
      assets: i,
      fontFamily: a
    } = t,
    o = On / 2;
  e.textBaseline = `middle`, e.font = `500 13px ${a}`, e.fillStyle = n.textMuted, e.textAlign = `left`;
  let s = In;
  if (i.logo && (Gn(e, i.logo, In, 17, 22, 5), s += 30), e.fillText(r.brand, s, o), e.textAlign = `center`, e.fillStyle = n.textPrimary, e.font = `600 15px ${a}`, e.fillText(`${r.title} · ${r.dateLabel}`, Q / 2, o), r.userName) {
    e.textAlign = `right`, e.font = `500 13px ${a}`, e.fillStyle = n.textMuted;
    let t = 1248;
    i.avatar && (e.save(), e.beginPath(), e.arc(t - 11, o, 11, 0, Math.PI * 2), e.clip(), e.drawImage(i.avatar, t - 22, 17, 22, 22), e.restore(), t -= 30), e.fillText(r.userName, t, o);
  }
  e.fillStyle = n.grid, e.fillRect(0, 55, Q, 1);
}
function qn(e, t, n) {
  let r = Math.min(n.width / e, n.height / t),
    i = e * r,
    a = t * r;
  return {
    x: n.x + (n.width - i) / 2,
    y: n.y + (n.height - a) / 2,
    width: i,
    height: a
  };
}
function Jn(e, t, n, r) {
  let {
      theme: i
    } = t,
    {
      x: a,
      y: o,
      width: s,
      height: c
    } = Bn;
  e.save(), e.globalAlpha = n, e.shadowColor = i.dark ? `rgba(0, 0, 0, 0.4)` : `rgba(0, 0, 0, 0.08)`, e.shadowBlur = 12, e.shadowOffsetY = 2, e.fillStyle = i.dark ? `#1b1f23` : `#ffffff`, e.beginPath(), e.roundRect(a, o, s, c, 10), e.fill(), e.shadowColor = `transparent`, e.save(), e.clip(), r(Bn), e.restore(), e.strokeStyle = i.grid, e.lineWidth = 1, e.beginPath(), e.roundRect(a + .5, o + .5, s - 1, c - 1, 10), e.stroke(), e.restore();
}
function Yn(e, t, n) {
  let {
      theme: r,
      fontFamily: i,
      texts: a
    } = n,
    screenshot = t.screenshot;
  if (!screenshot) {
    e.textAlign = `center`, e.textBaseline = `middle`, e.font = `13px ${i}`, e.fillStyle = r.textMuted, e.fillText(a.noScreenshot, $.x + $.width / 2, $.y + $.height / 2);
    return;
  }
  let s = qn(screenshot.width, screenshot.height, $);
  e.save(), e.beginPath(), e.roundRect(s.x, s.y, s.width, s.height, 8), e.clip(), e.drawImage(screenshot, s.x, s.y, s.width, s.height), e.restore(), e.strokeStyle = r.grid, e.lineWidth = 1, e.beginPath(), e.roundRect(s.x + .5, s.y + .5, s.width - 1, s.height - 1, 8), e.stroke();
}
function Xn(e, t, n) {
  let {
    theme: r,
    fontFamily: i
  } = n;
  e.textAlign = `center`, e.textBaseline = `middle`, e.font = `12px ${i}`, e.fillStyle = r.textMuted;
  for (let {
    text: n,
    point: r
  } of t.hourPoints) r.visible && e.fillText(n, r.x, 56 + r.y);
  if (t.label && t.labelPoint?.visible) {
    e.font = `500 12px ${i}`;
    let n = e.measureText(t.label).width + 16,
      a = t.labelPoint.x - n / 2,
      o = 56 + t.labelPoint.y - 11;
    e.fillStyle = r.dark ? `rgba(0, 0, 0, 0.62)` : `rgba(255, 255, 255, 0.92)`, e.beginPath(), e.roundRect(a, o, n, 22, 6), e.fill(), e.fillStyle = r.textPrimary, e.fillText(t.label, t.labelPoint.x, o + 11);
  }
}
function Zn(e, t, n) {
  let {
    theme: r,
    fontFamily: i,
    texts: a
  } = n;
  e.textAlign = `center`, e.textBaseline = `top`, e.font = `12px ${i}`, e.fillStyle = r.textMuted;
  let o = t.record?.category ? a.categoryLabel?.(t.record.category) ?? t.record.category : ``,
    s = [t.clock, o, t.fastForward ? a.fastForward : ``].filter(Boolean).join(` · `);
  e.fillText(s, Q / 2, kn), t.record && (e.font = `15px ${i}`, e.fillStyle = r.textPrimary, Wn(e, t.record.summary, An, 2).forEach((item, n) => {
    e.fillText(item, Q / 2, 554 + n * jn);
  }));
}
function Qn(e, t, n) {
  e.save(), e.translate(Mn, Pn), be(e, {
    result: n.street,
    colors: n.colors,
    theme: n.theme,
    geometry: Ce(Nn, 1, true),
    fontFamily: n.fontFamily,
    nowMinute: t.minute,
    bucketRange: n.bucketRange
  }), e.restore();
}
function $n(e, state, n) {
  let {
      theme: r,
      fontFamily: i,
      texts: a
    } = n,
    length = a.topItems.length,
    s = (length > 0 ? 210 : 176) + length * 26,
    c = 56 + Math.max(12, (464 - s) / 2);
  if (e.save(), e.globalAlpha = state * .78, e.fillStyle = r.surface, e.fillRect(0, 56, Q, 464), e.globalAlpha = state, e.fillStyle = r.dark ? `#1b1f23` : `#ffffff`, e.strokeStyle = r.grid, e.lineWidth = 1, e.beginPath(), e.roundRect(380, c, 520, s, 12), e.fill(), e.stroke(), e.textBaseline = `alphabetic`, e.textAlign = `left`, e.fillStyle = r.textPrimary, e.font = `600 16px ${i}`, e.fillText(a.summaryTitle, 408, c + 40), e.textAlign = `right`, e.fillStyle = r.textMuted, e.font = `13px ${i}`, e.fillText(a.dateLabel, 872, c + 40), a.summaryItems.slice(0, 4).forEach((item, n) => {
    let a = 408 + n % 2 * 232,
      o = c + 82 + Math.floor(n / 2) * 52;
    e.textAlign = `left`, e.fillStyle = r.textPrimary, e.font = `600 20px ${i}`, e.fillText(item.value, a, o), e.fillStyle = r.textMuted, e.font = `12px ${i}`, e.fillText(item.detail ? `${item.label} · ${item.detail}` : item.label, a, o + 20);
  }), length > 0) {
    let t = c + 196;
    e.fillStyle = r.grid, e.fillRect(408, t - 22, 464, 1), e.textAlign = `left`, e.fillStyle = r.textMuted, e.font = `12px ${i}`, e.fillText(a.topLabel, 408, t - 4), a.topItems.forEach((item, a) => {
      let o = t + 18 + a * 26;
      e.fillStyle = item.color, e.beginPath(), e.roundRect(408, o - 9, 10, 10, 3), e.fill(), e.textAlign = `left`, e.fillStyle = r.textSecondary, e.font = `13px ${i}`, e.fillText(item.name, 426, o), e.textAlign = `right`, e.fillStyle = r.textMuted, e.fillText(item.duration, 872, o);
    });
  }
  e.restore();
}
function er(e, t, n, r) {
  let {
    theme: i,
    fontFamily: a,
    texts: o
  } = r;
  if (e.setTransform(r.scale, 0, 0, r.scale, 0, 0), e.imageSmoothingQuality = `high`, e.fillStyle = i.surface, e.fillRect(0, 0, Q, 720), Kn(e, r), r.screenshots === `main`) Yn(e, n, r), Jn(e, r, 1, n => {
    e.fillStyle = i.surface, e.fillRect(n.x, n.y, n.width, n.height), e.drawImage(t, n.x, n.y, n.width, n.height);
  });else {
    e.drawImage(t, 0, 56, Q, 464), Xn(e, n, r);
    let screenshot = n.screenshot;
    r.screenshots === `corner` && screenshot && n.screenshotAlpha > 0 && Jn(e, r, n.screenshotAlpha, t => {
      let n = qn(screenshot.width, screenshot.height, t);
      e.drawImage(screenshot, n.x, n.y, n.width, n.height);
    });
  }
  n.endCard > 0 && $n(e, n.endCard, r), Zn(e, n, r), Qn(e, n, r), e.textAlign = `center`, e.textBaseline = `middle`, e.font = `11px ${a}`, e.fillStyle = i.textMuted, e.fillText(o.footer, Q / 2, Fn);
}
var tr = 8,
  nr = 4;
function rr() {
  return new DOMException(`Aborted`, `AbortError`);
}
var ir = class {
    frames;
    width;
    blobs = [];
    decoded = new Map();
    decoding = new Map();
    shownIndex = -1;
    disposed = false;
    constructor(e, t) {
      this.frames = e, this.width = t;
    }
    async load(e, t) {
      let length = this.frames.length;
      for (let r = 0; r < length; r += tr) {
        if (e.aborted) throw rr();
        let i = this.frames.slice(r, r + tr),
          a;
        try {
          a = await Ie.thumbnails(i.map(item => item.path), this.width);
        } catch (e) {
          console.warn(`[DayReplay] 导出用截图读取失败:`, e), a = i.map(() => null);
        }
        if (e.aborted) throw rr();
        a.forEach(item => {
          this.blobs.push(item ? new Blob([item], {
            type: `image/jpeg`
          }) : null);
        }), t(Math.min(1, (r + i.length) / length));
      }
    }
    decode(e) {
      if (e < 0 || this.decoded.has(e)) return Promise.resolve();
      let t = this.decoding.get(e);
      if (t) return t;
      let n = this.blobs[e];
      if (!n) return Promise.resolve();
      let r = createImageBitmap(n).then(result => {
        if (this.disposed) {
          result.close();
          return;
        }
        this.decoded.set(e, result), this.evict();
      }).catch(() => {
        this.blobs[e] = null;
      }).finally(() => {
        this.decoding.delete(e);
      });
      return this.decoding.set(e, r), r;
    }
    imageFor(e) {
      let t = this.decoded.get(e);
      return t ? (this.shownIndex = e, t) : this.decoded.get(this.shownIndex) ?? null;
    }
    lastShown() {
      return this.decoded.get(this.shownIndex) ?? null;
    }
    evict() {
      for (let e of this.decoded.keys()) {
        if (this.decoded.size <= nr) break;
        e !== this.shownIndex && (this.decoded.get(e)?.close(), this.decoded.delete(e));
      }
    }
    dispose() {
      this.disposed = true;
      for (let e of this.decoded.values()) e.close();
      this.decoded.clear(), this.blobs = [];
    }
  },
  ar = 30,
  or = 400,
  sr = 1600,
  cr = 700,
  lr = 250,
  ur = .2,
  dr = 4,
  fr = [{
    mimeType: `video/mp4;codecs=avc1.42E028`,
    extension: `mp4`
  }, {
    mimeType: `video/mp4;codecs=avc1.4D4028`,
    extension: `mp4`
  }, {
    mimeType: `video/mp4;codecs=avc1`,
    extension: `mp4`
  }, {
    mimeType: `video/mp4`,
    extension: `mp4`
  }, {
    mimeType: `video/webm;codecs=vp9`,
    extension: `webm`
  }, {
    mimeType: `video/webm;codecs=vp8`,
    extension: `webm`
  }, {
    mimeType: `video/webm`,
    extension: `webm`
  }],
  pr = class extends Error {
    code;
    constructor(e) {
      super(e), this.code = e;
    }
  };
function mr(e) {
  return new Promise(t => {
    let n = new Image();
    n.onload = () => t(n), n.onerror = () => t(null), n.src = e;
  });
}
function hr() {
  return new DOMException(`Aborted`, `AbortError`);
}
function gr() {
  return new Promise(e => setTimeout(e, 0));
}
async function _r(e, t, n, r) {
  let {
    options: i,
    timeline: a
  } = e;
  if (i.screenshots === `none` || a.frames.length === 0) return null;
  let o = new ir(a.frames, Hn(i.screenshots, t));
  try {
    await o.load(n, r);
  } catch (e) {
    throw o.dispose(), e;
  }
  return o;
}
async function vr(e, t, n) {
  let {
      timeline: r,
      options: i
    } = e,
    a = i.resolution / 720,
    o = await _r(e, a, t, n),
    [s, c] = await Promise.all([mr(e.logoUrl), e.avatarDataUrl ? mr(e.avatarDataUrl) : Promise.resolve(null)]);
  await document.fonts?.ready;
  let l = o ? i.screenshots : `none`,
    u = Vn(l),
    element = document.createElement(`canvas`),
    f = R.create(element, 30, {}, {
      manual: true,
      antialias: true
    });
  if (!f) throw o?.dispose(), new pr(`WEBGL_UNAVAILABLE`);
  let p = new Et(r.street, {
      startBucket: r.startBucket,
      endBucket: r.endBucket
    }),
    m = q(i.resolution),
    elementResult = document.createElement(`canvas`);
  elementResult.width = m.width, elementResult.height = m.height;
  let contextResult = elementResult.getContext(`2d`);
  if (!contextResult) throw p.dispose(), f.dispose(), o?.dispose(), new pr(`RECORDER_FAILED`);
  p.setColors(e.colors, e.theme), f.scene.add(p.root), f.setFraming(p.framing), f.resize(u.width, u.height, a), f.flyIn(false);
  let _ = new dt(f, p),
    v = {
      scale: a,
      screenshots: l,
      street: r.street,
      bucketRange: {
        start: r.startBucket,
        end: r.endBucket
      },
      colors: e.colors,
      theme: e.theme,
      fontFamily: e.fontFamily,
      texts: e.texts,
      assets: {
        logo: s,
        avatar: c
      }
    },
    y = Ve(r.durationMs, i.speed),
    b = new N(),
    x = new N(),
    S = null,
    C = -1 / 0,
    w = ``,
    T = -1 / 0,
    E = -1,
    D = -1 / 0,
    O = 0,
    k = 0,
    ee = (e, t) => {
      let n = gn(r.frames, t);
      return i.pace === `timelapse` ? n : (n !== E && e - D >= 1e3 && (E = n, D = e), E);
    };
  return {
    canvas: elementResult,
    renderAt: async (t, n) => {
      let i = Math.min(y, Math.max(0, t - 900)),
        a = sn(r, i / y),
        s = null;
      if (o) {
        let e = ee(t, a);
        n ? await o.decode(e) : o.decode(e), e >= 0 ? s = o.imageFor(e) : l === `corner` && (s = o.lastShown());
        let r = Math.max(0, t - k) / lr;
        O = Math.min(1, Math.max(0, O + (e >= 0 && s ? r : -r)));
      }
      k = t, p.setPlayhead(a), t >= 900 && _.update(t, a), f.renderNow(t);
      let c = dn(r, a);
      c !== S && t - C >= sr && (S = c, C = t);
      let m = _n(r, a),
        h = m === -1 ? `` : e.cellName(m);
      h !== w && t - T >= cr && (w = h, T = t);
      let E = {
        minute: a,
        clock: ve(Math.min(a, 1439)),
        fastForward: t >= 900 && i < y && ln(r, a),
        record: S,
        label: t >= 900 ? w : ``,
        labelPoint: f.project(p.anchorAt(a, b), u.width, u.height),
        hourPoints: p.hourMarks.map(item => ({
          text: `${item}:00`,
          point: f.project(x.set(p.minuteToX(item * 60), 0, 10), u.width, u.height)
        })),
        endCard: Math.min(1, Math.max(0, (t - 900 - y) / or)),
        screenshot: s,
        screenshotAlpha: l === `corner` ? O : 1
      };
      er(contextResult, element, E, v);
    },
    dispose: () => {
      p.dispose(), f.dispose(), o?.dispose();
    }
  };
}
async function yr(e, t, n, r, i) {
  if (typeof VideoEncoder > `u`) return null;
  let a;
  try {
    a = await O(() => import(`./matrix-math.js`), __vite__mapDeps([0, 1, 2, 3, 4]), import.meta.url);
  } catch (e) {
    return console.warn(`[DayReplay] 视频封装模块加载失败，改用实时录制:`, e), null;
  }
  let {
      BufferTarget: o,
      CanvasSource: s,
      Mp4OutputFormat: c,
      Output: l,
      Quality: u,
      WebMOutputFormat: d,
      getFirstEncodableVideoCodec: f
    } = a,
    {
      frameRate: p
    } = t,
    m = new u({
      bitrate: J(t)
    }),
    h = await f([`avc`, `vp9`], {
      width: e.canvas.width,
      height: e.canvas.height,
      quality: m,
      frameRate: p
    });
  if (!h) return null;
  let g = h === `avc` ? `mp4` : `webm`,
    _ = new o(),
    v = new l({
      format: g === `mp4` ? new c({
        fastStart: `in-memory`
      }) : new d(),
      target: _
    }),
    y = new s(e.canvas, {
      codec: h,
      quality: m,
      keyFrameInterval: 2
    });
  v.addVideoTrack(y, {
    frameRate: p
  }), await v.start();
  let b = Math.ceil(n / 1e3 * p),
    x = 1 / p;
  try {
    for (let t = 0; t < b; t += 1) {
      if (i.aborted) throw hr();
      await e.renderAt(Math.min(n, t * x * 1e3), true), await y.add(t * x, x), r((t + 1) / b), t % dr === 0 && (await gr());
    }
    await v.finalize();
  } catch (e) {
    throw v.state !== `finalized` && v.state !== `canceled` && (await v.cancel().catch(() => undefined)), e;
  }
  if (!_.buffer) throw new pr(`RECORDER_FAILED`);
  return {
    blob: new Blob([_.buffer], {
      type: g === `mp4` ? `video/mp4` : `video/webm`
    }),
    extension: g
  };
}
async function br(e, t, n, r, i) {
  let a = typeof MediaRecorder > `u` ? null : fr.find(item => MediaRecorder.isTypeSupported(item.mimeType)) ?? null;
  if (!a) throw new pr(`UNSUPPORTED`);
  let o = Math.min(ar, t.frameRate);
  e.renderAt(0, false);
  let stream = e.canvas.captureStream(o),
    c = new MediaRecorder(stream, {
      mimeType: a.mimeType,
      videoBitsPerSecond: J(t)
    }),
    l = [];
  c.ondataavailable = e => {
    e.data.size > 0 && l.push(e.data);
  };
  let u = new Promise((e, t) => {
    c.onstop = () => e(), c.onerror = () => t(new pr(`RECORDER_FAILED`));
  });
  u.catch(() => undefined), c.start(1e3);
  let d = 0,
    f = performance.now(),
    p = 0,
    m = -1 / 0,
    h = null;
  try {
    return await new Promise((t, a) => {
      let s = () => a(hr());
      i.addEventListener(`abort`, s, {
        once: true
      });
      let l = a => {
        if (d = 0, !(i.aborted || p)) {
          if (a - m >= 1e3 / o - 1) {
            m = a;
            let o = Math.min(n, a - f);
            if (e.renderAt(o, false), r(o / n), o >= n) {
              i.removeEventListener(`abort`, s), t();
              return;
            }
          }
          d = requestAnimationFrame(l);
        }
      };
      h = () => {
        document.hidden ? !p && c.state === `recording` && (p = performance.now(), c.pause()) : p && (f += performance.now() - p, p = 0, c.resume(), d ||= requestAnimationFrame(l));
      }, document.addEventListener(`visibilitychange`, h), d = requestAnimationFrame(l);
    }), c.stop(), await u, {
      blob: new Blob(l, {
        type: a.mimeType.split(`;`)[0]
      }),
      extension: a.extension
    };
  } finally {
    d && cancelAnimationFrame(d), h && document.removeEventListener(`visibilitychange`, h), c.state !== `inactive` && c.stop(), stream.getTracks().forEach(item => item.stop());
  }
}
async function xr(e, t, n) {
  let {
      options: r,
      timeline: i
    } = e,
    a = r.screenshots !== `none` && i.frames.length > 0 ? ur : 0,
    o = await vr(e, n, e => t(e * a, `screenshots`)),
    s = e => t(a + e * (1 - a), `encoding`);
  try {
    if (n.aborted) throw hr();
    let e = He(i.durationMs, r.speed);
    return (await yr(o, r, e, s, n)) ?? (await br(o, r, e, s, n));
  } finally {
    o.dispose();
  }
}
var Sr = [`aria-label`],
  Cr = {
    class: `flex h-12 shrink-0 items-center justify-between border-b border-black/6 px-5 dark:border-border`
  },
  wr = {
    class: `flex items-baseline gap-2`
  },
  Tr = {
    class: `text-sm font-semibold text-(--foreground)`
  },
  Er = {
    class: `text-xs text-[#999] dark:text-muted-foreground`
  },
  Dr = {
    class: `flex items-center gap-1`
  },
  Or = [`disabled`],
  kr = [`aria-label`],
  Ar = {
    class: `relative min-h-0 flex-1`
  },
  jr = {
    key: 0,
    class: `absolute inset-0 flex flex-col items-center justify-center gap-2 text-xs text-[#999] dark:text-muted-foreground`
  },
  Mr = {
    key: 1,
    class: `absolute inset-0 flex items-center justify-center text-xs text-destructive`
  },
  Nr = {
    key: 2,
    class: `absolute inset-0 flex flex-col items-center justify-center gap-3`
  },
  Pr = {
    class: `flex size-10 items-center justify-center rounded-full bg-black/5 dark:bg-white/5`
  },
  Fr = {
    class: `text-center`
  },
  Ir = {
    class: `text-sm text-[#999] dark:text-muted-foreground`
  },
  Lr = {
    class: `mt-1 text-xs text-[#bbb] dark:text-muted-foreground/70`
  },
  Rr = [`aria-label`, `title`],
  zr = {
    class: `flex size-6 items-center justify-center rounded-md bg-white/90 text-[#555] opacity-0 shadow-sm ring-1 ring-black/5 transition-opacity group-hover:opacity-100 dark:bg-black/50 dark:text-muted-foreground dark:ring-white/10`
  },
  Br = {
    key: 1,
    class: `absolute inset-0 flex flex-col items-center justify-center gap-2`
  },
  Vr = {
    class: `text-4xl font-semibold tabular-nums text-(--foreground)`
  },
  Hr = {
    class: `text-sm text-[#888] dark:text-muted-foreground`
  },
  Ur = {
    key: 2,
    class: `absolute inset-0 bg-[#fbfbfa] p-5 dark:bg-background`
  },
  Wr = {
    key: 0,
    class: `absolute inset-0 flex items-center justify-center text-xs text-[#999] dark:text-muted-foreground`
  },
  Gr = [`aria-label`, `title`],
  Kr = {
    key: 0,
    class: `absolute inset-0 flex items-center justify-center text-xs text-[#999] dark:text-muted-foreground`
  },
  qr = {
    class: `absolute bottom-2 right-2 flex size-6 items-center justify-center rounded-md bg-white/90 text-[#555] opacity-0 shadow-sm ring-1 ring-black/5 transition-opacity group-hover:opacity-100 dark:bg-black/50 dark:text-muted-foreground dark:ring-white/10`
  },
  Jr = {
    key: 4,
    class: `absolute inset-0 flex items-center justify-center`
  },
  Yr = {
    key: 0,
    class: `shrink-0 border-t border-black/6 dark:border-border`
  },
  Xr = {
    class: `h-[76px] overflow-hidden px-6 pt-3`
  },
  Zr = {
    class: `text-center text-xs leading-4 tabular-nums text-[#999] dark:text-muted-foreground`
  },
  Qr = {
    class: `relative mx-auto mt-1 h-11 max-w-[760px]`
  },
  $r = {
    key: 0,
    class: `text-[#999] dark:text-muted-foreground`
  },
  ei = {
    class: `flex items-center gap-3 px-5 pb-2 pt-2`
  },
  ti = [`aria-label`],
  ni = {
    class: `flex shrink-0 items-center gap-0.5 rounded-md bg-black/[0.03] p-0.5 dark:bg-white/5`
  },
  ri = [`onClick`],
  ii = {
    class: `pb-3 text-center text-xs leading-none text-[#bbb] dark:text-muted-foreground/70`
  },
  ai = {
    key: 2,
    class: `absolute inset-0 z-20 flex items-center justify-center bg-[#fbfbfa]/80 backdrop-blur-[2px] dark:bg-background/80`
  },
  oi = {
    class: `w-[340px] rounded-[10px] border border-black/8 bg-white p-5 shadow-lg dark:border-border dark:bg-card`
  },
  si = {
    class: `flex items-center gap-2 text-sm font-semibold text-(--foreground)`
  },
  ci = {
    class: `mt-1.5 text-xs leading-relaxed text-[#999] dark:text-muted-foreground`
  },
  li = {
    class: `mt-4 h-1.5 overflow-hidden rounded-full bg-black/[0.06] dark:bg-white/10`
  },
  ui = {
    class: `mt-3 flex items-center justify-between`
  },
  di = {
    class: `text-xs tabular-nums text-[#999] dark:text-muted-foreground`
  },
  fi = 1600,
  pi = 700,
  mi = se(m({
    __name: `DayReplayPlayer`,
    props: {
      date: {},
      source: {}
    },
    emits: [`close`],
    setup(c, {
      emit: m
    }) {
      let g = c,
        S = m,
        {
          t: D,
          locale: O,
          dayLabel: k,
          cellName: se
        } = A(),
        le = e => ue(e, O.value),
        _e = pe(),
        be = x(() => he(_e.value)),
        M = Dn(),
        {
          summaryItems: Ce,
          topItems: N
        } = At(),
        {
          user: we
        } = ce(),
        P = u(false),
        Te = u(We()),
        F = u(false),
        Ee = u(0),
        De = u(`encoding`),
        I = n(null),
        Oe = null,
        L = false,
        ke = x(() => Math.round(Ee.value * 100)),
        Ae = x(() => z.value && I.value ? Math.ceil(He(z.value.durationMs, I.value.speed) / 1e3) : 0),
        je = x(() => {
          let e = I.value?.resolution ?? 1080;
          return e === 1440 ? `2K` : `${e}p`;
        }),
        Me = u(null),
        Ne = u(true),
        R = u(``),
        z = n(null),
        B = u(true),
        V = u(false),
        H = u(false),
        Le = u(false),
        U = n(null),
        Re = false,
        W = Sn(x(() => z.value?.durationMs ?? 2e4), () => {
          V.value = true, j(`feature_map_heat_click`, {
            entry: `day_replay_finished`
          });
        }),
        {
          progress: ze,
          playing: G,
          speed: Be
        } = W,
        K = x(() => z.value?.street ?? null),
        q = x(() => K.value ? de(K.value, be.value) : []),
        J = x(() => z.value ? sn(z.value, ze.value) : 0),
        Ve = x(() => ve(Math.min(J.value, 1439))),
        Ue = x(() => (z.value?.startBucket ?? 0) * 5),
        Ke = x(() => (z.value?.endBucket ?? 288) * 5),
        qe = x(() => z.value ? _n(z.value, J.value) : -1),
        Je = x(() => K.value && qe.value !== -1 ? se(K.value, qe.value) : ``),
        Ye = x(() => z.value ? ln(z.value, J.value) : false),
        Xe = x(() => z.value && V.value ? vn(z.value) : null),
        Ze = x(() => k(g.date)),
        Qe = x(() => z.value ? dn(z.value, J.value) : null),
        $e = () => !G.value,
        et = yn(() => Qe.value, fi, $e),
        tt = yn(() => Je.value, pi, $e);
      function it(text) {
        let [t, n, r] = text.split(`-`).map(Number);
        return {
          startedAt: new Date(t, n - 1, r).toISOString(),
          endedAt: new Date(t, n - 1, r + 1).toISOString()
        };
      }
      async function ot() {
        Ne.value = true, R.value = ``;
        try {
          let [e, t] = await Promise.all([me.list({
              ...it(g.date),
              excludeSummary: true
            }), xe.barcode({
              startDate: g.date,
              endDate: g.date,
              colorBy: `app`
            })]),
            n = t;
          if (!ge(n)) {
            let e = await xe.barcode({
              startDate: g.date,
              endDate: g.date,
              colorBy: `category`
            });
            ge(e) && (n = e);
          }
          z.value = on(g.date, n, an(g.date, e)), z.value?.frames.length && M.load(z.value.frames);
        } catch (e) {
          R.value = e instanceof Error ? e.message : D(`errors.loadDataFailed`);
        } finally {
          Ne.value = false;
        }
        z.value && (W.seek(0), W.play());
      }
      function st() {
        V.value ? ct() : W.toggle();
      }
      function ct() {
        V.value = false, B.value = true, W.seek(0), W.play(), j(`feature_map_heat_click`, {
          entry: `day_replay_restart`
        });
      }
      function lt(e) {
        z.value && (V.value = false, W.seek(cn(z.value, e)));
      }
      function ut() {
        Re = G.value, W.pause();
      }
      function dt() {
        Re && W.play(), Re = false;
      }
      function ft(e) {
        Be.value = e;
      }
      function pt() {
        Y(), W.pause(), S(`close`);
      }
      function mt() {
        z.value && !F.value && (L = G.value, W.pause(), P.value = true);
      }
      function ht() {
        P.value = false, L && W.play(), L = false;
      }
      function gt(e) {
        Te.value = e, Ge(e), P.value = false, L = false, _t({
          ...e,
          screenshots: yt.value ? e.screenshots : `none`
        });
      }
      async function _t(e) {
        let value = z.value,
          n = K.value;
        if (!value || !n || F.value) return;
        W.pause();
        let r = new AbortController();
        Oe = r, F.value = true, Ee.value = 0, De.value = `encoding`, I.value = e, j(`feature_map_heat_click`, {
          entry: `day_replay_export_start`,
          ...e
        });
        try {
          let i = null;
          if (we.value?.avatarUrl) {
            let imageAsBase64 = await window.electronAPI.fetchImageAsBase64(we.value.avatarUrl);
            imageAsBase64.success && imageAsBase64.dataUrl && (i = imageAsBase64.dataUrl);
          }
          let a = vn(value),
            o = new Date().toLocaleDateString(undefined, {
              year: `numeric`,
              month: `2-digit`,
              day: `2-digit`
            }).replace(/\//g, `.`),
            s = await xr({
              timeline: value,
              options: e,
              colors: q.value,
              theme: be.value,
              fontFamily: getComputedStyle(document.body).fontFamily || `system-ui, sans-serif`,
              logoUrl: Se,
              avatarDataUrl: i,
              cellName: e => se(n, e),
              texts: {
                title: D(`dayReplay.title`),
                dateLabel: Ze.value,
                brand: D(`heatMap.brandWatermark`),
                footer: D(`heatMap.footerText`, {
                  date: o
                }),
                userName: we.value?.nickname,
                fastForward: D(`dayReplay.fastForward`),
                categoryLabel: le,
                noScreenshot: D(`dayReplay.noFrameNow`),
                summaryTitle: D(`dayReplay.summaryTitle`),
                summaryItems: Ce(a, n),
                topLabel: D(`dayReplay.summaryTop`),
                topItems: N(a, n, q.value)
              }
            }, (e, t) => {
              Ee.value = e, De.value = t;
            }, r.signal),
            c = new Uint8Array(await s.blob.arrayBuffer()),
            l = new Date(),
            u = [l.getHours(), l.getMinutes(), l.getSeconds()].map(item => String(item).padStart(2, `0`)).join(``);
          (await Ie.saveVideo(c, `${D(`dayReplay.videoFileName`)}_${g.date}_${u}`, s.extension)).cancelled || (ae(D(`dayReplay.exportSaved`)), j(`feature_map_heat_click`, {
            entry: `day_replay_export_saved_${s.extension}`
          }));
        } catch (t) {
          if (t instanceof DOMException && t.name === `AbortError`) return;
          console.warn(`[DayReplay] 导出视频失败:`, t, e), oe(D(t instanceof pr && t.code === `UNSUPPORTED` ? `dayReplay.exportUnsupported` : `dayReplay.exportFailed`));
        } finally {
          Oe === r && (Oe = null), F.value = false;
        }
      }
      function Y() {
        Oe?.abort();
      }
      function vt(event) {
        if (event.key === `Escape`) {
          event.preventDefault(), F.value ? Y() : P.value ? ht() : pt();
          return;
        }
        F.value || P.value || (event.key === ` ` || event.code === `Space`) && !(event.target instanceof HTMLButtonElement) && (event.preventDefault(), st());
      }
      let yt = x(() => !!z.value?.frames.length),
        bt = x(() => z.value ? gn(z.value.frames, J.value) : -1),
        xt = x(() => M.loaded.value < M.total.value),
        X = x(() => Le.value && yt.value && !V.value),
        St = x(() => !X.value && !V.value && bt.value >= 0),
        Ct = x(() => bt.value >= 0 && xt.value ? D(`dayReplay.preparingFrames`, {
          loaded: M.loaded.value,
          total: M.total.value
        }) : D(`dayReplay.noFrameNow`));
      o([bt, M.version], ([e]) => {
        if (e < 0) {
          U.value = null;
          return;
        }
        let bitmapAt = M.bitmapAt(e);
        (bitmapAt || !M.isLoaded(e)) && (U.value = bitmapAt);
      });
      function wt(e) {
        Le.value = e, e && (B.value = true), j(`feature_map_heat_click`, {
          entry: e ? `day_replay_screenshot_main` : `day_replay_street_main`
        });
      }
      return b(() => {
        window.addEventListener(`keydown`, vt), Me.value?.focus(), j(`feature_map_heat_click`, {
          entry: `day_replay_open_${g.source}`
        }), ot();
      }), v(() => {
        Y(), window.removeEventListener(`keydown`, vt);
      }), (n, o) => (p(), l(f, {
        to: `body`
      }, [w(`div`, {
        ref_key: `rootRef`,
        ref: Me,
        class: `fixed inset-0 z-[70] flex flex-col bg-[#fbfbfa] outline-none dark:bg-background`,
        style: {
          "-webkit-app-region": `no-drag`
        },
        role: `dialog`,
        "aria-modal": `true`,
        "aria-label": t(D)(`dayReplay.title`),
        tabindex: `-1`
      }, [w(`header`, Cr, [w(`div`, wr, [w(`h2`, Tr, y(t(D)(`dayReplay.title`)), 1), w(`span`, Er, y(Ze.value), 1)]), w(`div`, Dr, [w(`button`, {
        type: `button`,
        class: `flex h-8 items-center gap-1.5 rounded-md px-2.5 text-xs text-[#555] transition-colors hover:bg-black/[0.05] hover:text-[#111] disabled:cursor-not-allowed disabled:opacity-40 dark:text-muted-foreground dark:hover:bg-white/5 dark:hover:text-foreground`,
        disabled: !z.value || F.value || H.value,
        onClick: mt
      }, [h(t(te), {
        size: 14
      }), r(` ` + y(t(D)(`dayReplay.exportVideo`)), 1)], 8, Or), w(`button`, {
        type: `button`,
        class: `flex size-8 items-center justify-center rounded-md text-[#888] transition-colors hover:bg-black/[0.05] hover:text-[#222] dark:text-muted-foreground dark:hover:bg-white/5 dark:hover:text-foreground`,
        "aria-label": t(D)(`dayReplay.close`),
        onClick: pt
      }, [h(t(ee), {
        size: 16
      })], 8, kr)])]), w(`div`, Ar, [Ne.value ? (p(), i(`div`, jr, [h(t(ne), {
        size: 20,
        class: `animate-spin`
      }), r(` ` + y(t(D)(`dayReplay.loading`)), 1)])) : R.value ? (p(), i(`div`, Mr, y(R.value), 1)) : !z.value || !K.value ? (p(), i(`div`, Nr, [w(`div`, Pr, [h(t(Fe), {
        size: 18,
        class: `text-[#bbb] dark:text-muted-foreground`
      })]), w(`div`, Fr, [w(`p`, Ir, y(t(D)(`dayReplay.empty`)), 1), w(`p`, Lr, y(t(D)(`dayReplay.emptyDesc`)), 1)])])) : (p(), i(d, {
        key: 3
      }, [H.value ? (p(), i(`div`, Br, [w(`span`, Vr, y(Ve.value), 1), w(`span`, Hr, y(t(tt)), 1)])) : (p(), i(`div`, {
        key: 0,
        class: e(X.value ? `absolute right-5 top-5 z-10 aspect-[16/10] w-[min(320px,34%)] overflow-hidden rounded-[10px] border border-black/8 bg-[#fbfbfa] shadow-sm dark:border-border dark:bg-background` : `absolute inset-0`)
      }, [h(kt, {
        following: B.value,
        "onUpdate:following": o[0] ||= e => B.value = e,
        class: `absolute inset-0`,
        street: K.value,
        span: {
          startBucket: z.value.startBucket,
          endBucket: z.value.endBucket
        },
        colors: q.value,
        theme: be.value,
        minute: J.value,
        overview: V.value,
        playing: t(G),
        compact: X.value,
        "current-label": t(tt),
        onSeek: lt,
        onUnavailable: o[1] ||= e => H.value = true
      }, null, 8, [`following`, `street`, `span`, `colors`, `theme`, `minute`, `overview`, `playing`, `compact`, `current-label`]), X.value ? (p(), i(`button`, {
        key: 0,
        type: `button`,
        class: `group absolute inset-0 flex cursor-pointer items-end justify-end p-2`,
        "aria-label": t(D)(`dayReplay.screenshotCollapse`),
        title: t(D)(`dayReplay.screenshotCollapse`),
        onClick: o[2] ||= e => wt(false)
      }, [w(`span`, zr, [h(t(ye), {
        size: 12
      })])], 8, Rr)) : C(``, true)], 2)), X.value ? (p(), i(`div`, Ur, [h(rt, {
        bitmap: U.value
      }, null, 8, [`bitmap`]), U.value ? C(``, true) : (p(), i(`p`, Wr, y(Ct.value), 1)), w(`button`, {
        type: `button`,
        class: `absolute left-5 top-5 flex h-7 items-center gap-1.5 rounded-md bg-white/90 px-2.5 text-xs text-[#555] shadow-sm ring-1 ring-black/5 transition-colors hover:text-[#111] dark:bg-black/50 dark:text-muted-foreground dark:ring-white/10 dark:hover:text-foreground`,
        onClick: o[3] ||= e => wt(false)
      }, [h(t(re), {
        size: 13
      }), r(` ` + y(t(D)(`dayReplay.screenshotCollapse`)), 1)])])) : C(``, true), !B.value && !H.value && !V.value && !X.value ? (p(), i(`button`, {
        key: 3,
        type: `button`,
        class: `absolute left-5 top-5 flex h-7 items-center gap-1.5 rounded-md bg-white/90 px-2.5 text-xs text-[#555] shadow-sm ring-1 ring-black/5 transition-colors hover:text-[#111] dark:bg-black/50 dark:text-muted-foreground dark:ring-white/10 dark:hover:text-foreground`,
        onClick: o[4] ||= e => B.value = true
      }, [h(t(Pe), {
        size: 13
      }), r(` ` + y(t(D)(`dayReplay.follow`)), 1)])) : C(``, true), h(E, {
        name: `replay-fade`
      }, {
        default: s(() => [St.value ? (p(), i(`button`, {
          key: 0,
          type: `button`,
          class: `group absolute right-5 top-5 aspect-[16/10] w-[min(320px,34%)] cursor-pointer overflow-hidden rounded-[10px] border border-black/8 bg-white shadow-sm dark:border-border dark:bg-card`,
          "aria-label": t(D)(`dayReplay.screenshotExpand`),
          title: t(D)(`dayReplay.screenshotExpand`),
          onClick: o[5] ||= e => wt(true)
        }, [h(rt, {
          bitmap: U.value
        }, null, 8, [`bitmap`]), U.value ? C(``, true) : (p(), i(`span`, Kr, y(Ct.value), 1)), w(`span`, qr, [h(t(ye), {
          size: 12
        })])], 8, Gr)) : C(``, true)]),
        _: 1
      }), V.value && Xe.value ? (p(), i(`div`, Jr, [h(Gt, {
        summary: Xe.value,
        street: K.value,
        colors: q.value,
        "date-label": Ze.value,
        "has-screenshots": z.value.hasScreenshots,
        onReplay: ct,
        onClose: pt
      }, null, 8, [`summary`, `street`, `colors`, `date-label`, `has-screenshots`])])) : C(``, true)], 64))]), z.value && K.value ? (p(), i(`div`, Yr, [w(`div`, Xr, [w(`div`, Zr, [r(y(Ve.value), 1), Ye.value ? (p(), i(d, {
        key: 0
      }, [r(` · ` + y(t(D)(`dayReplay.fastForward`)), 1)], 64)) : C(``, true)]), w(`div`, Qr, [h(E, {
        name: `replay-fade`
      }, {
        default: s(() => [t(et) ? (p(), i(`p`, {
          key: t(et).id,
          class: `absolute inset-x-0 top-0 line-clamp-2 text-center text-sm leading-[22px] text-[#333] dark:text-foreground`
        }, [t(et).category ? (p(), i(`span`, $r, y(le(t(et).category)) + ` · `, 1)) : C(``, true), r(y(t(et).summary), 1)])) : C(``, true)]),
        _: 1
      })])]), w(`div`, ei, [w(`button`, {
        type: `button`,
        class: `flex size-9 shrink-0 items-center justify-center rounded-full bg-[#111] text-white transition-colors hover:bg-[#333] dark:bg-foreground dark:text-background dark:hover:bg-foreground/85`,
        "aria-label": t(G) ? t(D)(`dayReplay.pause`) : t(D)(`dayReplay.play`),
        onClick: st
      }, [t(G) ? (p(), l(t(ie), {
        key: 0,
        size: 15
      })) : (p(), l(t(fe), {
        key: 1,
        size: 15,
        class: `translate-x-px`
      }))], 8, ti), h(at, {
        class: `flex-1`,
        street: K.value,
        colors: q.value,
        theme: be.value,
        minute: J.value,
        "start-minute": Ue.value,
        "end-minute": Ke.value,
        label: t(D)(`dayReplay.progress`),
        onSeek: lt,
        onScrubStart: ut,
        onScrubEnd: dt
      }, null, 8, [`street`, `colors`, `theme`, `minute`, `start-minute`, `end-minute`, `label`]), w(`div`, ni, [(p(true), i(d, null, a(t(xn), n => (p(), i(`button`, {
        key: n,
        type: `button`,
        class: e([`h-6 min-w-9 rounded-[5px] px-1.5 text-xs tabular-nums transition-colors`, t(Be) === n ? `bg-white text-[#111] shadow-sm dark:bg-white/15 dark:text-foreground` : `text-[#888] hover:text-[#333] dark:text-muted-foreground dark:hover:text-foreground`]),
        onClick: e => ft(n)
      }, y(n) + `× `, 11, ri))), 128))])]), w(`p`, ii, y(t(D)(`dayReplay.shortcutHint`)), 1)])) : C(``, true), P.value && z.value ? (p(), i(`div`, {
        key: 1,
        class: `absolute inset-0 z-20 flex items-center justify-center bg-[#fbfbfa]/80 backdrop-blur-[2px] dark:bg-background/80`,
        onClick: T(ht, [`self`])
      }, [h(nt, {
        options: Te.value,
        "has-screenshots": yt.value,
        "timeline-duration-ms": z.value.durationMs,
        onConfirm: gt,
        onCancel: ht
      }, null, 8, [`options`, `has-screenshots`, `timeline-duration-ms`])])) : C(``, true), F.value ? (p(), i(`div`, ai, [w(`div`, oi, [w(`div`, si, [h(t(ne), {
        size: 15,
        class: `animate-spin text-[#999]`
      }), r(` ` + y(t(D)(`dayReplay.exporting`)), 1)]), w(`p`, ci, y(De.value === `screenshots` ? t(D)(`dayReplay.exportPreparingScreenshots`) : t(D)(`dayReplay.exportHint`, {
        seconds: Ae.value,
        quality: je.value,
        fps: I.value?.frameRate ?? 60
      })), 1), w(`div`, li, [w(`div`, {
        class: `h-full rounded-full bg-[#10b981] transition-[width] duration-200`,
        style: _({
          width: `${ke.value}%`
        })
      }, null, 4)]), w(`div`, ui, [w(`span`, di, y(ke.value) + `%`, 1), w(`button`, {
        type: `button`,
        class: `h-7 rounded-md px-2.5 text-xs text-[#666] transition-colors hover:bg-black/[0.05] dark:text-muted-foreground dark:hover:bg-white/5`,
        onClick: Y
      }, y(t(D)(`dayReplay.exportCancel`)), 1)])])])) : C(``, true)], 8, Sr)]));
    }
  }), [[`__scopeId`, `data-v-499495b2`]]);
export { mi as default };