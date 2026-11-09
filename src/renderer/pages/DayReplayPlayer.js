const __vite__mapDeps = (items, m = __vite__mapDeps, d = m.f || (m.f = ["../ui/icons/matrix-math.js", "../ui/Switch.js", "../chunks/vue-i18n.runtime.js", "../i18n/en-US-player.js", "../ui/icons/lucide-icons.js"])) => items.map(item => d[item]);
import { $n as vueN, An as vueAn, Cn as vueCn, O as vueO, S as vueS, St as vueSt, Wt as vueWt, Yt as vueYt, Zt as vueZt, b as vueB, bn as vueBn, c as vueC, f as vueF, gt as vueGt, j as vueJ, k as vueK, n as g, nr as vueNr, ot as vueOt, rr as vueRr, ut as vueUt, v as vueV, vn as vueVn, x as vueX, y as vueY } from "../chunks/vue-i18n.runtime.js";
import { E as playerE, r as playerR, w as playerW } from "../i18n/en-US-player.js";
import { t as preloadT } from "../chunks/preload-helper.js";
import { r as lucideR, t as lucideT } from "../ui/icons/lucide-icons.js";
import { t as iconclapperboardT } from "../ui/icons/icon-clapperboard.js";
import { _ as beautifier } from "../chunks/screenshot-beautifier.js";
import { t as iconminimizeT } from "../ui/icons/icon-minimize.js";
import { t as iconpauseT } from "../ui/icons/icon-pause.js";
import { n as alertN, t as alertT } from "../chunks/alert.js";
import { t as pluginvueexporthelperT } from "../chunks/_plugin-vue_export-helper.js";
import { t as useAuthT } from "../chunks/useAuth.js";
import { $t as mainT, Cn as mainCn, Jt as mainJt, Qt as mainQt, Tn as mainTn, Xt as mainXt, Yt as mainYt, Zt as mainZt, an as mainAn, en as mainEn, hn as mainHn, in as mainIn, kn as mainKn, nn as mainNn, on as mainOn, rn as mainRn, sn as mainSn, tn as Ce } from "../chunks/main.js";
import { E as OrbitControlsE, _ as OrbitControls, a as OrbitControlsA, b as OrbitControlsB, f as OrbitControlsF, g as OrbitControlsG, h as OrbitControlsH, i as OrbitControlsI, m as OrbitControlsM, p as OrbitControlsP, s as OrbitControlsS, v as OrbitControlsV } from "../vendors/OrbitControls.js";
import { n as threestageN, o as threestageO, r as threestageR, t as threestageT } from "../vendors/three-stage.js";
var Pe = lucideR(`crosshair`, [[`circle`, {
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
  Fe = lucideR(`film`, [[`rect`, {
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
    async thumbnails(thumbnails, thumbnailsValue) {
      return z(await window.electronAPI.dayReplay.thumbnails({
        paths: thumbnails,
        ...(thumbnailsValue ? {
          width: thumbnailsValue
        } : {})
      }));
    },
    async saveVideo(video, videoValue, videoInput) {
      return z(await window.electronAPI.dayReplay.saveVideo({
        data: video,
        fileName: videoValue,
        extension: videoInput
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
  options = {
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
  return Math.round(ze[e.resolution] * t * options[e.screenshots]);
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
    let parsed = JSON.parse(localStorage.getItem(Be) ?? `null`);
    return {
      screenshots: K(B, parsed?.screenshots, e.screenshots),
      pace: K(V, parsed?.pace, e.pace),
      speed: K(H, parsed?.speed, e.speed),
      resolution: K(Le, parsed?.resolution, e.resolution),
      frameRate: K(U, parsed?.frameRate, e.frameRate)
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
  nt = vueJ({
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
      emit: emit
    }) {
      let stateAlias = state,
        emitAlias = emit,
        {
          t: translate
        } = g(),
        l = vueVn({
          ...stateAlias.options
        }),
        u = vueV(() => ({
          ...l,
          screenshots: stateAlias.hasScreenshots ? l.screenshots : `none`
        })),
        f = {
          720: `720p`,
          1080: `1080p`,
          1440: `2K`
        },
        m = {
          none: `dayReplay.exportScreenshotNone`,
          corner: `dayReplay.exportScreenshotCorner`,
          main: `dayReplay.exportScreenshotMain`
        },
        h = {
          timelapse: `dayReplay.exportPaceTimelapse`,
          hold: `dayReplay.exportPaceHold`
        },
        _ = vueV(() => [{
          key: `screenshots`,
          label: translate(`dayReplay.exportScreenshots`),
          choices: B.map(item => ({
            value: item,
            label: translate(m[item]),
            disabled: item !== `none` && !stateAlias.hasScreenshots
          })),
          hint: stateAlias.hasScreenshots ? undefined : translate(`dayReplay.exportNoScreenshots`)
        }, {
          key: `pace`,
          label: translate(`dayReplay.exportPace`),
          choices: V.map(item => ({
            value: item,
            label: translate(h[item])
          })),
          disabled: u.value.screenshots === `none`
        }, {
          key: `speed`,
          label: translate(`dayReplay.exportSpeed`),
          choices: H.map(item => ({
            value: item,
            label: `${item}×`
          }))
        }, {
          key: `resolution`,
          label: translate(`dayReplay.exportResolution`),
          choices: Le.map(item => ({
            value: item,
            label: f[item]
          }))
        }, {
          key: `frameRate`,
          label: translate(`dayReplay.exportFrameRate`),
          choices: U.map(item => ({
            value: item,
            label: translate(`dayReplay.exportFrameRateValue`, {
              fps: item
            })
          }))
        }]),
        v = vueV(() => {
          let e = u.value,
            t = q(e.resolution),
            n = Ue(stateAlias.timelineDurationMs, e) / 1024 / 1024;
          return translate(`dayReplay.exportEstimate`, {
            seconds: Math.ceil(He(stateAlias.timelineDurationMs, e.speed) / 1e3),
            width: t.width,
            height: t.height,
            size: n < 10 ? n.toFixed(1) : Math.round(n)
          });
        });
      function b(e, t) {
        l[e] = t;
      }
      function T() {
        emitAlias(`confirm`, {
          ...l
        });
      }
      return (ctx, renderCache) => (vueGt(), vueS(`div`, Ke, [vueY(`h3`, qe, vueRr(vueAn(translate)(`dayReplay.exportVideo`)), 1), vueY(`div`, Je, [(vueGt(true), vueS(vueC, null, vueSt(_.value, event => (vueGt(), vueS(vueC, {
        key: event.key
      }, [vueY(`span`, {
        class: vueN([`pt-1.5 text-xs text-[#888] dark:text-muted-foreground`, event.disabled ? `opacity-50` : ``])
      }, vueRr(event.label), 3), vueY(`div`, null, [vueY(`div`, {
        class: `inline-flex flex-wrap items-center gap-0.5 rounded-md bg-black/[0.03] p-0.5 dark:bg-white/5`,
        role: `radiogroup`,
        "aria-label": event.label,
        "aria-disabled": event.disabled || undefined
      }, [(vueGt(true), vueS(vueC, null, vueSt(event.choices, n => (vueGt(), vueS(`button`, {
        key: String(n.value),
        type: `button`,
        role: `radio`,
        "aria-checked": u.value[event.key] === n.value,
        class: vueN([`h-6 min-w-10 rounded-[5px] px-2 text-xs tabular-nums transition-colors disabled:cursor-not-allowed disabled:opacity-40`, u.value[event.key] === n.value ? `bg-white text-[#111] shadow-sm dark:bg-white/15 dark:text-foreground` : `text-[#888] hover:text-[#333] dark:text-muted-foreground dark:hover:text-foreground`]),
        disabled: event.disabled || n.disabled,
        onClick: e => b(event.key, n.value)
      }, vueRr(n.label), 11, Xe))), 128))], 8, Ye), event.hint ? (vueGt(), vueS(`p`, Ze, vueRr(event.hint), 1)) : vueX(``, true)])], 64))), 128))]), vueY(`div`, Qe, [vueY(`p`, $e, vueRr(v.value), 1), u.value.screenshots === `none` ? vueX(``, true) : (vueGt(), vueS(`p`, et, vueRr(vueAn(translate)(`dayReplay.exportPrivacyHint`)), 1))]), vueY(`div`, tt, [vueY(`button`, {
        type: `button`,
        class: `h-8 rounded-md px-3 text-xs text-[#666] transition-colors hover:bg-black/[0.05] dark:text-muted-foreground dark:hover:bg-white/5`,
        onClick: renderCache[0] ||= e => emitAlias(`cancel`)
      }, vueRr(vueAn(translate)(`dayReplay.exportCancel`)), 1), vueY(`button`, {
        type: `button`,
        class: `h-8 rounded-md bg-[#111] px-3 text-xs text-white transition-colors hover:bg-[#333] dark:bg-foreground dark:text-background dark:hover:bg-foreground/85`,
        onClick: T
      }, vueRr(vueAn(translate)(`dayReplay.exportStart`)), 1)])]));
    }
  }),
  rt = vueJ({
    __name: `ReplayScreenshotView`,
    props: {
      bitmap: {}
    },
    setup(props) {
      let propsAlias = props,
        n = vueBn(null),
        r = vueBn(null),
        payload = null,
        s = 0;
      function c() {
        s = 0;
        let e = r.value,
          i = n.value;
        if (!e || !i) return;
        let clientWidth = i.clientWidth,
          clientHeight = i.clientHeight;
        if (!clientWidth || !clientHeight) return;
        let c = Math.min(window.devicePixelRatio || 1, 2),
          l = Math.round(clientWidth * c),
          u = Math.round(clientHeight * c);
        (e.width !== l || e.height !== u) && (e.width = l, e.height = u);
        let context = e.getContext(`2d`);
        if (!context) return;
        context.clearRect(0, 0, l, u);
        let bitmap = propsAlias.bitmap;
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
      return vueWt(() => propsAlias.bitmap, l), vueUt(() => {
        n.value && (payload = new ResizeObserver(l), payload.observe(n.value)), l();
      }), vueOt(() => {
        payload?.disconnect(), s && cancelAnimationFrame(s);
      }), (e, t) => (vueGt(), vueS(`div`, {
        ref_key: `containerRef`,
        ref: n,
        class: `relative h-full w-full`
      }, [vueY(`canvas`, {
        ref_key: `canvasRef`,
        ref: r,
        class: `absolute inset-0 block h-full w-full`
      }, null, 512)], 512));
    }
  }),
  it = [`aria-label`, `aria-valuenow`],
  at = vueJ({
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
      emit: emit
    }) {
      let eventAlias = event,
        emitAlias = emit,
        a = vueBn(null),
        o = vueBn(false),
        s = vueV(() => ({
          start: eventAlias.startMinute / 5,
          end: eventAlias.endMinute / 5
        }));
      function c(e) {
        let t = a.value?.getBoundingClientRect();
        if (!t || t.width <= 0) return eventAlias.minute;
        let r = Math.min(1, Math.max(0, (e.clientX - t.left) / t.width));
        return eventAlias.startMinute + r * (eventAlias.endMinute - eventAlias.startMinute);
      }
      function l(e) {
        e.button === 0 && (o.value = true, e.currentTarget.setPointerCapture(e.pointerId), emitAlias(`scrub-start`), emitAlias(`seek`, c(e)));
      }
      function d(e) {
        o.value && emitAlias(`seek`, c(e));
      }
      function f(e) {
        o.value && (o.value = false, e.currentTarget.releasePointerCapture(e.pointerId), emitAlias(`scrub-end`));
      }
      return (ctx, renderCache) => (vueGt(), vueS(`div`, {
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
      }, [vueK(mainEn, {
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
    target = new OrbitControlsE();
    position = new OrbitControlsE();
    offset = new OrbitControlsE();
    constructor(constructor, constructorValue) {
      this.stage = constructor, this.scene = constructorValue;
    }
    reset() {
      this.lastTime = 0;
    }
    update(update, updateValue) {
      let {
          stage: n
        } = this,
        r = this.lastTime ? Math.min(100, update - this.lastTime) : 16;
      this.lastTime = update;
      let {
          minDistance: i,
          maxDistance: a
        } = n.controls,
        o = Math.min(a * .98, Math.max(ot, i * 1.05));
      this.offset.setFromSphericalCoords(o, st, ct), this.target.set(this.scene.minuteToX(updateValue) + lt, this.scene.maxHeight * .3, 0), this.position.copy(this.target).add(this.offset);
      let s = Number.isFinite(update) ? 1 - Math.exp(-r / ut) : 1;
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
  let t = new OrbitControlsV();
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
    root = new OrbitControlsF();
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
        value: new OrbitControlsS()
      }
    };
    buildingGeometry;
    buildingMaterial;
    buildings;
    trackGeometry;
    trackMaterial = new OrbitControlsV();
    beamGeometry;
    beamMaterial;
    beam;
    hitBox = new OrbitControlsI();
    hitPoint = new OrbitControlsE();
    constructor(constructor, constructorValue) {
      this.blocks = threestageR(constructor).blocks, this.centerBucket = (constructorValue.startBucket + constructorValue.endBucket) / 2;
      let n = (constructorValue.endBucket - constructorValue.startBucket) / 2,
        r = (constructorValue.endBucket - constructorValue.startBucket) / pt,
        i = Math.max(1, Math.ceil(r / mt));
      this.hourMarks = [];
      for (let e = Math.ceil(constructorValue.startBucket / pt); e * pt <= constructorValue.endBucket; e += i) this.hourMarks.push(e);
      let a = this.blocks.length,
        float32Array = new Float32Array(a * 2),
        s = new Float32Array(a),
        c = new OrbitControlsH(),
        l = new OrbitControlsE(),
        u = new OrbitControlsB(),
        d = new OrbitControlsE();
      this.buildingGeometry = new OrbitControlsA(1, 1, 1).translate(.5, .5, 0), this.buildingGeometry.setAttribute(`aSpan`, new OrbitControlsP(float32Array, 2)), this.buildingGeometry.setAttribute(`aKind`, new OrbitControlsP(s, 1)), this.buildingMaterial = Tt(this.uniforms), this.buildings = new OrbitControlsM(this.buildingGeometry, this.buildingMaterial, a), this.buildings.instanceColor = new OrbitControlsP(new Float32Array(a * 3), 3), this.buildings.frustumCulled = false;
      let f = 6;
      this.blocks.forEach((item, t) => {
        float32Array[t * 2] = item.start, float32Array[t * 2 + 1] = item.end, s[t] = +!threestageO(item), threestageO(item) || (f = Math.max(f, ht * Math.sqrt(item.end - item.start))), this.cellBlocks.fill(t, item.start, item.end), l.set(this.bucketToX(item.start) + Y / 2, 0, 0), d.set(Math.max(.3, item.end - item.start - Y), 1, vt), c.compose(l, u, d), this.buildings.setMatrixAt(t, c);
      }), this.buildings.instanceMatrix.needsUpdate = true, this.maxHeight = f, this.trackGeometry = new OrbitControlsA(n * 2 + 2, xt, 14).translate(0, -.2 / 2, 0);
      let p = new OrbitControlsG(this.trackGeometry, this.trackMaterial);
      p.position.y = bt, this.beamGeometry = new OrbitControlsA(X, 1, 16).translate(0, .5, 0), this.beamMaterial = new OrbitControls({
        color: St,
        transparent: true,
        opacity: Ct,
        depthWrite: false
      }), this.beam = new OrbitControlsG(this.beamGeometry, this.beamMaterial), this.beam.scale.y = f * 1.25, this.beam.renderOrder = 1, this.root.add(p, this.buildings, this.beam);
      let emptyItems = [];
      for (let count of [-n - 2, n + 2]) for (let t of [0, f]) for (let total of [-7, 13]) emptyItems.push(new OrbitControlsE(count, t, total));
      this.framing = {
        target: new OrbitControlsE(0, f * .25, 0),
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
    bucketToX(bucket) {
      return bucket - this.centerBucket;
    }
    minuteToX(minute) {
      return this.bucketToX(minute / 5);
    }
    setColors(colors, colorsValue) {
      let n = new OrbitControlsS();
      this.blocks.forEach((item, i) => {
        this.buildings.setColorAt(i, n.set(threestageN(item, colors, colorsValue)));
      }), this.buildings.instanceColor && (this.buildings.instanceColor.needsUpdate = true), this.uniforms.uGround.value.set(colorsValue.ground), this.trackMaterial.color.set(colorsValue.ground);
    }
    setPlayhead(playhead) {
      let t = playhead / 5;
      this.uniforms.uPlayhead.value = t, this.beam.position.x = this.bucketToX(t);
    }
    currentHeight(current) {
      let t = this.blocks[current];
      if (!t) return 0;
      let n = Math.min(t.end - t.start, Math.max(0, this.uniforms.uPlayhead.value - t.start));
      return n <= 0 ? _t : threestageO(t) ? gt : ht * Math.sqrt(n);
    }
    anchorAt(anchor, anchorValue) {
      let n = Math.min(ft - 1, Math.max(0, Math.floor(anchor / 5))),
        r = this.cellBlocks[n],
        i = r >= 0 ? this.currentHeight(r) : 0;
      return anchorValue.set(this.minuteToX(anchor), i + 2.5, 0);
    }
    blockIndexAt(block) {
      let t = Math.min(ft - 1, Math.max(0, Math.floor(block / 5)));
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
  kt = vueJ({
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
    setup(props, {
      emit: emit
    }) {
      let propsAlias = props,
        emitAlias = emit,
        f = vueBn(null),
        m = vueBn(null),
        h = vueBn(null),
        g = vueBn(false),
        _ = vueCn([]),
        emptyItems = [],
        S = null,
        C = null,
        T = null,
        E = null,
        O = false,
        payload = null,
        ee = typeof window.matchMedia == `function` && window.matchMedia(`(prefers-reduced-motion: reduce)`).matches,
        te = new OrbitControlsE(),
        ne = new OrbitControlsE();
      function re(e, t) {
        emptyItems[t] = e instanceof HTMLElement ? e : null;
      }
      function ie(e) {
        if (!S || !E || !propsAlias.following || propsAlias.overview || S.isCameraTweening) return E?.reset(), false;
        let t = E.update(e, propsAlias.minute);
        return !propsAlias.playing && t;
      }
      function ae(el, t) {
        el && (el.style.visibility = t.visible ? `visible` : `hidden`, el.style.transform = `translate(${t.x}px, ${t.y}px) translate(-50%, -50%)`);
      }
      function oe() {
        let e = f.value,
          t = S;
        if (!t || !C || !e || propsAlias.compact) return;
        let clientWidth = e.clientWidth,
          clientHeight = e.clientHeight,
          i = C;
        _.value.forEach((item, a) => {
          ne.set(i.minuteToX(item * 60), 0, 10), ae(emptyItems[a] ?? null, t.project(ne, clientWidth, clientHeight));
        });
        let a = t.project(C.anchorAt(propsAlias.minute, te), clientWidth, clientHeight);
        ae(h.value, {
          ...a,
          visible: a.visible && !!propsAlias.currentLabel
        });
      }
      function se() {
        let e = f.value;
        S && e && S.resize(e.clientWidth, e.clientHeight) && (O ? propsAlias.following && !propsAlias.overview ? S.requestRender() : S.refit() : (O = true, S.flyIn(!ee)));
      }
      function ce(event) {
        g.value = true, payload = {
          x: event.clientX,
          y: event.clientY
        };
      }
      function A() {
        g.value = false;
      }
      function le(event) {
        if (!payload || !S || !C) return;
        let t = Math.hypot(event.clientX - payload.x, event.clientY - payload.y);
        if (payload = null, t > Ot) return;
        let n = C.pick(S.rayFromEvent(event));
        n && emitAlias(`seek`, n.minute);
      }
      function ue(event) {
        S && (S.controls.enableZoom = event.ctrlKey || event.metaKey);
      }
      function de() {
        propsAlias.following && emitAlias(`update:following`, false);
      }
      return vueWt(() => propsAlias.minute, e => {
        C?.setPlayhead(e), S?.requestRender();
      }), vueWt([() => propsAlias.colors, () => propsAlias.theme], () => {
        C?.setColors(propsAlias.colors, propsAlias.theme), S?.requestRender();
      }), vueWt(() => propsAlias.following, e => {
        e && S && (S.viewTouched = false, E?.reset(), S.requestRender());
      }), vueWt(() => propsAlias.overview, e => {
        S && (e ? S.resetHome(true) : S.requestRender());
      }), vueWt(() => propsAlias.currentLabel, () => S?.requestRender()), vueWt(() => propsAlias.compact, () => S?.requestRender()), vueWt(() => propsAlias.playing, e => {
        e || S?.requestRender();
      }), vueUt(() => {
        let e = m.value,
          t = f.value;
        if (e && t) {
          if (S = threestageT.create(e, 30, {
            onFrame: ie,
            onRendered: oe
          }), !S) {
            emitAlias(`unavailable`);
            return;
          }
          C = new Et(propsAlias.street, propsAlias.span), _.value = C.hourMarks, C.setColors(propsAlias.colors, propsAlias.theme), C.setPlayhead(propsAlias.minute), S.scene.add(C.root), S.setFraming(C.framing), E = new dt(S, C), S.controls.addEventListener(`start`, de), t.addEventListener(`wheel`, ue, {
            capture: true,
            passive: true
          }), window.addEventListener(`pointerup`, A), window.addEventListener(`pointercancel`, A), T = new ResizeObserver(se), T.observe(t);
        }
      }), vueOt(() => {
        T?.disconnect(), T = null, f.value?.removeEventListener(`wheel`, ue, {
          capture: true
        }), window.removeEventListener(`pointerup`, A), window.removeEventListener(`pointercancel`, A), S?.controls.removeEventListener(`start`, de), C?.dispose(), C = null, S?.dispose(), S = null;
      }), (n, r) => (vueGt(), vueS(`div`, {
        ref_key: `containerRef`,
        ref: f,
        class: `relative h-full w-full select-none overflow-hidden`
      }, [vueY(`canvas`, {
        ref_key: `canvasRef`,
        ref: m,
        class: vueN([`block h-full w-full`, props.compact ? `pointer-events-none` : g.value ? `cursor-grabbing` : `cursor-grab`]),
        onPointerdown: ce,
        onClick: le
      }, null, 34), vueZt(vueY(`div`, Dt, [(vueGt(true), vueS(vueC, null, vueSt(_.value, (e, t) => (vueGt(), vueS(`span`, {
        key: e,
        ref_for: true,
        ref: e => re(e, t),
        class: `absolute left-0 top-0 whitespace-nowrap text-xs leading-none text-[#bbb] dark:text-muted-foreground/70`,
        style: {
          visibility: `hidden`
        }
      }, vueRr(e) + `:00`, 1))), 128)), vueY(`span`, {
        ref_key: `currentLabelRef`,
        ref: h,
        class: `absolute left-0 top-0 whitespace-nowrap rounded-md bg-white/90 px-2 py-1 text-xs font-medium leading-none text-[#333] shadow-sm ring-1 ring-black/5 dark:bg-black/60 dark:text-foreground dark:ring-white/10`,
        style: {
          visibility: `hidden`
        }
      }, vueRr(props.currentLabel), 513)], 512), [[playerW, !props.compact]])], 512));
    }
  });
function At() {
  let {
    t: e,
    duration: t,
    cellName: n
  } = mainT();
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
      value: r.firstMinute !== null && r.lastMinute !== null ? `${mainIn(r.firstMinute)} – ${r.lastMinute >= 1440 ? `24:00` : mainIn(r.lastMinute)}` : `--`,
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
  Gt = vueJ({
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
      emit: emit
    }) {
      let eventAlias = event,
        emitAlias = emit,
        {
          t: c,
          summaryItems: l,
          topItems: u
        } = At(),
        f = vueV(() => l(eventAlias.summary, eventAlias.street)),
        m = vueV(() => u(eventAlias.summary, eventAlias.street, eventAlias.colors));
      return (ctx, renderCache) => (vueGt(), vueS(`div`, jt, [vueY(`div`, Mt, [vueY(`h3`, Nt, vueRr(vueAn(c)(`dayReplay.summaryTitle`)), 1), vueY(`span`, Pt, vueRr(event.dateLabel), 1)]), vueY(`div`, Ft, [(vueGt(true), vueS(vueC, null, vueSt(f.value, state => (vueGt(), vueS(`div`, {
        key: state.label,
        class: `min-w-0`
      }, [vueY(`div`, It, vueRr(state.value), 1), vueY(`div`, Lt, [vueO(vueRr(state.label), 1), state.detail ? (vueGt(), vueS(vueC, {
        key: 0
      }, [vueO(` · ` + vueRr(state.detail), 1)], 64)) : vueX(``, true)])]))), 128))]), m.value.length ? (vueGt(), vueS(`div`, Rt, [vueY(`div`, zt, vueRr(vueAn(c)(`dayReplay.summaryTop`)), 1), vueY(`div`, Bt, [(vueGt(true), vueS(vueC, null, vueSt(m.value, e => (vueGt(), vueS(`div`, {
        key: e.key,
        class: `flex items-center gap-2 text-xs`
      }, [vueY(`span`, {
        class: `size-2.5 shrink-0 rounded-[3px]`,
        style: vueNr({
          background: e.color
        })
      }, null, 4), vueY(`span`, Vt, vueRr(e.name), 1), vueY(`span`, Ht, vueRr(e.duration), 1)]))), 128))])])) : vueX(``, true), event.hasScreenshots ? vueX(``, true) : (vueGt(), vueS(`p`, Ut, vueRr(vueAn(c)(`dayReplay.noScreenshotHint`)), 1)), vueY(`div`, Wt, [vueY(`button`, {
        type: `button`,
        class: `h-8 rounded-md px-3 text-xs text-[#666] transition-colors hover:bg-black/[0.04] dark:text-muted-foreground dark:hover:bg-white/5`,
        onClick: renderCache[0] ||= e => emitAlias(`close`)
      }, vueRr(vueAn(c)(`dayReplay.close`)), 1), vueY(`button`, {
        type: `button`,
        class: `flex h-8 items-center gap-1.5 rounded-md bg-[#111] px-3 text-xs text-white transition-colors hover:bg-[#333] dark:bg-foreground dark:text-background dark:hover:bg-foreground/85`,
        onClick: renderCache[1] ||= e => emitAlias(`replay`)
      }, [vueK(vueAn(mainCn), {
        size: 13
      }), vueO(` ` + vueRr(vueAn(c)(`dayReplay.replay`)), 1)])])]));
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
  let trimmed = e.screenshotPath.trim();
  if (!trimmed.startsWith(`[`)) return trimmed;
  try {
    let parsed = JSON.parse(trimmed);
    return Array.isArray(parsed) && typeof parsed[0] == `string` ? parsed[0] : null;
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
  let fallbackValue = t.days[0]?.cells ?? [],
    uint8Array = new Uint8Array(Kt);
  fallbackValue.forEach((item, t) => {
    item !== -1 && (uint8Array[t] = 1);
  });
  for (let count of items) {
    let t = Math.floor(count.startMinute / Z),
      n = Math.max(t + 1, Math.ceil(Math.max(count.endMinute, count.startMinute + Qt) / Z));
    uint8Array.fill(1, Math.min(Kt - 1, t), Math.min(Kt, n));
  }
  let a = uint8Array.indexOf(1);
  if (a < 0) return null;
  let lastIndexOf = uint8Array.lastIndexOf(1),
    s = Math.floor(a / $t) * $t,
    c = Math.min(Kt, Math.ceil((lastIndexOf + 1) / $t) * $t);
  c - s < en && (c = Math.min(Kt, s + en), s = Math.max(0, c - en));
  let l = c - s,
    u = new Float32Array(l).fill(1),
    d = -1;
  for (let e = 0; e <= l; e += 1) {
    let t = e < l && !uint8Array[s + e];
    t && d < 0 && (d = e), !t && d >= 0 && (e - d >= qt && u.fill(Jt, d, e), d = -1);
  }
  let float64Array = new Float64Array(l + 1);
  for (let e = 0; e < l; e += 1) float64Array[e + 1] = float64Array[e] + u[e];
  let p = Math.min(Zt, Math.max(Xt, float64Array[l] * Yt));
  return {
    date: e,
    street: t,
    records: items,
    startBucket: s,
    endBucket: c,
    cumulative: float64Array,
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
    fallbackValue = n[n.length - 1] || 1,
    a = Math.min(1, Math.max(0, t)) * fallbackValue,
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
  let fallbackValue = text.split(/[\\/]/).pop() ?? ``,
    r = pn.exec(fallbackValue);
  return r ? Number(r[1]) * 60 + Number(r[2]) + Number(r[3]) / 60 : e.endMinute;
}
function hn(e) {
  let t = new Set(),
    emptyItems = [];
  for (let total of e) {
    let screenshotPath = total.screenshotPath;
    screenshotPath && !t.has(screenshotPath) && (t.add(screenshotPath), emptyItems.push({
      minute: mn(total, screenshotPath),
      path: screenshotPath
    }));
  }
  return emptyItems.sort((left, right) => left.minute - right.minute);
}
function gn(count, t) {
  let n = 0,
    r = count.length - 1,
    i = -1;
  for (; n <= r;) {
    let a = n + r >> 1;
    count[a].minute <= t ? (i = a, n = a + 1) : r = a - 1;
  }
  return i < 0 || t - count[i].minute > fn ? -1 : i;
}
function _n(e, t) {
  let n = Math.min(Kt - 1, Math.max(0, Math.floor(t / Z)));
  return e.street.days[0]?.cells[n] ?? -1;
}
function vn(e) {
  let t = e.street.days[0],
    fallbackValue = t?.cells ?? [],
    total = null,
    diff = null,
    payload = null;
  for (let count of mainRn(fallbackValue)) {
    if (count.value < 0) continue;
    total === null && (total = count.start * Z), diff = count.end * Z;
    let t = (count.end - count.start) * Z;
    (!payload || t > payload.minutes) && (payload = {
      value: count.value,
      minutes: t
    });
  }
  return {
    activeSec: t?.activeSec ?? 0,
    firstMinute: total,
    lastMinute: diff,
    longest: payload,
    top: e.street.series.map((item, t) => ({
      value: t,
      activeSec: item.activeSec
    })).slice(0, 3),
    recordCount: e.records.length
  };
}
function yn(e, t, r) {
  let i = vueCn(e()),
    a = 0,
    count = null;
  function c() {
    count && clearTimeout(count), count = null, i.value = e(), a = performance.now();
  }
  return vueWt(e, e => {
    if (Object.is(e, i.value)) {
      count && clearTimeout(count), count = null;
      return;
    }
    let n = r() ? 0 : t - (performance.now() - a);
    n <= 0 ? c() : count ||= setTimeout(c, n);
  }), vueWt(r, e => {
    e && count && c();
  }), vueOt(() => {
    count && clearTimeout(count), count = null;
  }), i;
}
var bn = 100,
  xn = [.5, 1, 2];
function Sn(state, t) {
  let n = vueBn(0),
    r = vueBn(false),
    i = vueBn(1),
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
  return document.addEventListener(`visibilitychange`, p), vueOt(() => {
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
  let e = vueBn(0),
    t = vueBn(0),
    n = vueBn(0),
    emptyItems = [],
    diff = [],
    a = new Map(),
    o = new Set(),
    s = 0,
    c = false;
  function l() {
    for (let count of a.values()) count.close();
    a.clear(), o.clear();
  }
  async function d(items) {
    let o = ++s;
    l(), emptyItems = items, diff = Array(items.length), e.value = items.length, t.value = 0;
    for (let e = 0; e < items.length; e += Cn) {
      let part = items.slice(e, e + Cn),
        l;
      try {
        l = await Ie.thumbnails(part.map(item => item.path));
      } catch (e) {
        console.warn(`[DayReplay] 截图缩略图读取失败:`, e), l = part.map(() => null);
      }
      if (c || o !== s) return;
      l.forEach((item, n) => {
        diff[e + n] = item ? new Blob([item], {
          type: `image/jpeg`
        }) : null;
      }), t.value = e + part.length, n.value += 1;
    }
  }
  function f(e) {
    let t = a.get(e);
    t && (a.delete(e), a.set(e, t));
  }
  function p() {
    for (; a.size > wn;) {
      let e = a.keys().next().value;
      if (e === undefined) break;
      a.get(e)?.close(), a.delete(e);
    }
  }
  function m(e) {
    if (a.has(e) || o.has(e)) return;
    let t = diff[e];
    if (!t) return;
    let r = s;
    o.add(e), createImageBitmap(t).then(result => {
      if (o.delete(e), c || r !== s) {
        result.close();
        return;
      }
      a.set(e, result), p(), n.value += 1;
    }).catch(() => {
      o.delete(e), !(c || r !== s) && (diff[e] = null, n.value += 1);
    });
  }
  function h(e) {
    if (e < 0 || e >= emptyItems.length) return null;
    let t = Math.min(emptyItems.length, e + Tn);
    for (let n = e; n < t; n += 1) m(n);
    for (let t = e; t >= 0 && t > e - En; --t) {
      let e = a.get(t);
      if (e) return f(t), e;
    }
    return null;
  }
  function g(e) {
    return diff[e] instanceof Blob;
  }
  return vueOt(() => {
    c = true, s += 1, l(), diff = [];
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
  let fallbackValue = items.match(/[⺀-鿿　-〿＀-￯]|[^\s⺀-鿿　-〿＀-￯]+|\s+/g) ?? [],
    emptyItems = [],
    o = ``,
    s = false,
    handler = () => {
      emptyItems.push(o.trimEnd()), o = ``;
    };
  for (let count of fallbackValue) if (!/^\s+$/.test(count) || o) {
    if (e.measureText(o + count).width <= n) {
      o += count;
      continue;
    }
    if (o && handler(), emptyItems.length >= r) {
      s = true;
      break;
    }
    if (!Un.test(count) && e.measureText(count).width > n) {
      for (let diff of count) {
        if (e.measureText(o + diff).width > n && o && (handler(), emptyItems.length >= r)) {
          s = true;
          break;
        }
        o += diff;
      }
      if (s) break;
    } else o = count.trimStart();
  }
  if (!s && o && (emptyItems.length >= r ? s = true : handler()), s && emptyItems.length > 0) {
    let t = emptyItems[emptyItems.length - 1];
    for (; t && e.measureText(`${t}…`).width > n;) t = t.slice(0, -1);
    emptyItems[emptyItems.length - 1] = `${t}…`;
  }
  return emptyItems.slice(0, r);
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
    joined = [t.clock, o, t.fastForward ? a.fastForward : ``].filter(Boolean).join(` · `);
  e.fillText(joined, Q / 2, kn), t.record && (e.font = `15px ${i}`, e.fillStyle = r.textPrimary, Wn(e, t.record.summary, An, 2).forEach((item, n) => {
    e.fillText(item, Q / 2, 554 + n * jn);
  }));
}
function Qn(e, t, n) {
  e.save(), e.translate(Mn, Pn), mainNn(e, {
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
    o = a.topItems.length,
    s = (o > 0 ? 210 : 176) + o * 26,
    c = 56 + Math.max(12, (464 - s) / 2);
  if (e.save(), e.globalAlpha = state * .78, e.fillStyle = r.surface, e.fillRect(0, 56, Q, 464), e.globalAlpha = state, e.fillStyle = r.dark ? `#1b1f23` : `#ffffff`, e.strokeStyle = r.grid, e.lineWidth = 1, e.beginPath(), e.roundRect(380, c, 520, s, 12), e.fill(), e.stroke(), e.textBaseline = `alphabetic`, e.textAlign = `left`, e.fillStyle = r.textPrimary, e.font = `600 16px ${i}`, e.fillText(a.summaryTitle, 408, c + 40), e.textAlign = `right`, e.fillStyle = r.textMuted, e.font = `13px ${i}`, e.fillText(a.dateLabel, 872, c + 40), a.summaryItems.slice(0, 4).forEach((item, n) => {
    let a = 408 + n % 2 * 232,
      o = c + 82 + Math.floor(n / 2) * 52;
    e.textAlign = `left`, e.fillStyle = r.textPrimary, e.font = `600 20px ${i}`, e.fillText(item.value, a, o), e.fillStyle = r.textMuted, e.font = `12px ${i}`, e.fillText(item.detail ? `${item.label} · ${item.detail}` : item.label, a, o + 20);
  }), o > 0) {
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
    constructor(constructor, constructorValue) {
      this.frames = constructor, this.width = constructorValue;
    }
    async load(e, t) {
      let n = this.frames.length;
      for (let r = 0; r < n; r += tr) {
        if (e.aborted) throw rr();
        let part = this.frames.slice(r, r + tr),
          payload;
        try {
          payload = await Ie.thumbnails(part.map(item => item.path), this.width);
        } catch (e) {
          console.warn(`[DayReplay] 导出用截图读取失败:`, e), payload = part.map(() => null);
        }
        if (e.aborted) throw rr();
        payload.forEach(item => {
          this.blobs.push(item ? new Blob([item], {
            type: `image/jpeg`
          }) : null);
        }), t(Math.min(1, (r + part.length) / n));
      }
    }
    decode(decode) {
      if (decode < 0 || this.decoded.has(decode)) return Promise.resolve();
      let t = this.decoding.get(decode);
      if (t) return t;
      let n = this.blobs[decode];
      if (!n) return Promise.resolve();
      let r = createImageBitmap(n).then(result => {
        if (this.disposed) {
          result.close();
          return;
        }
        this.decoded.set(decode, result), this.evict();
      }).catch(() => {
        this.blobs[decode] = null;
      }).finally(() => {
        this.decoding.delete(decode);
      });
      return this.decoding.set(decode, r), r;
    }
    imageFor(image) {
      let t = this.decoded.get(image);
      return t ? (this.shownIndex = image, t) : this.decoded.get(this.shownIndex) ?? null;
    }
    lastShown() {
      return this.decoded.get(this.shownIndex) ?? null;
    }
    evict() {
      for (let count of this.decoded.keys()) {
        if (this.decoded.size <= nr) break;
        count !== this.shownIndex && (this.decoded.get(count)?.close(), this.decoded.delete(count));
      }
    }
    dispose() {
      this.disposed = true;
      for (let count of this.decoded.values()) count.close();
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
    constructor(constructor) {
      super(constructor), this.code = constructor;
    }
  };
function mr(e) {
  return new Promise(t => {
    let image = new Image();
    image.onload = () => t(image), image.onerror = () => t(null), image.src = e;
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
    f = threestageT.create(element, 30, {}, {
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
  let context = elementResult.getContext(`2d`);
  if (!context) throw p.dispose(), f.dispose(), o?.dispose(), new pr(`RECORDER_FAILED`);
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
    b = new OrbitControlsE(),
    x = new OrbitControlsE(),
    S = null,
    C = -1 / 0,
    w = ``,
    T = -1 / 0,
    E = -1,
    D = -1 / 0,
    O = 0,
    k = 0,
    handler = (e, t) => {
      let n = gn(r.frames, t);
      return i.pace === `timelapse` ? n : (n !== E && e - D >= 1e3 && (E = n, D = e), E);
    };
  return {
    canvas: elementResult,
    renderAt: async (t, n) => {
      let i = Math.min(y, Math.max(0, t - 900)),
        a = sn(r, i / y),
        count = null;
      if (o) {
        let e = handler(t, a);
        n ? await o.decode(e) : o.decode(e), e >= 0 ? count = o.imageFor(e) : l === `corner` && (count = o.lastShown());
        let r = Math.max(0, t - k) / lr;
        O = Math.min(1, Math.max(0, O + (e >= 0 && count ? r : -r)));
      }
      k = t, p.setPlayhead(a), t >= 900 && _.update(t, a), f.renderNow(t);
      let c = dn(r, a);
      c !== S && t - C >= sr && (S = c, C = t);
      let m = _n(r, a),
        h = m === -1 ? `` : e.cellName(m);
      h !== w && t - T >= cr && (w = h, T = t);
      let E = {
        minute: a,
        clock: mainIn(Math.min(a, 1439)),
        fastForward: t >= 900 && i < y && ln(r, a),
        record: S,
        label: t >= 900 ? w : ``,
        labelPoint: f.project(p.anchorAt(a, b), u.width, u.height),
        hourPoints: p.hourMarks.map(item => ({
          text: `${item}:00`,
          point: f.project(x.set(p.minuteToX(item * 60), 0, 10), u.width, u.height)
        })),
        endCard: Math.min(1, Math.max(0, (t - 900 - y) / or)),
        screenshot: count,
        screenshotAlpha: l === `corner` ? O : 1
      };
      er(context, element, E, v);
    },
    dispose: () => {
      p.dispose(), f.dispose(), o?.dispose();
    }
  };
}
async function yr(e, t, n, r, i) {
  if (typeof VideoEncoder > `u`) return null;
  let payload;
  try {
    payload = await preloadT(() => import(`./matrix-math.js`), __vite__mapDeps([0, 1, 2, 3, 4]), import.meta.url);
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
    } = payload,
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
    mediaRecorder = new MediaRecorder(stream, {
      mimeType: a.mimeType,
      videoBitsPerSecond: J(t)
    }),
    emptyItems = [];
  mediaRecorder.ondataavailable = e => {
    e.data.size > 0 && emptyItems.push(e.data);
  };
  let promise = new Promise((e, t) => {
    mediaRecorder.onstop = () => e(), mediaRecorder.onerror = () => t(new pr(`RECORDER_FAILED`));
  });
  promise.catch(() => undefined), mediaRecorder.start(1e3);
  let d = 0,
    f = performance.now(),
    p = 0,
    m = -1 / 0,
    h = null;
  try {
    return await new Promise((t, a) => {
      let handler = () => a(hr());
      i.addEventListener(`abort`, handler, {
        once: true
      });
      let l = a => {
        if (d = 0, !(i.aborted || p)) {
          if (a - m >= 1e3 / o - 1) {
            m = a;
            let o = Math.min(n, a - f);
            if (e.renderAt(o, false), r(o / n), o >= n) {
              i.removeEventListener(`abort`, handler), t();
              return;
            }
          }
          d = requestAnimationFrame(l);
        }
      };
      h = () => {
        document.hidden ? !p && mediaRecorder.state === `recording` && (p = performance.now(), mediaRecorder.pause()) : p && (f += performance.now() - p, p = 0, mediaRecorder.resume(), d ||= requestAnimationFrame(l));
      }, document.addEventListener(`visibilitychange`, h), d = requestAnimationFrame(l);
    }), mediaRecorder.stop(), await promise, {
      blob: new Blob(emptyItems, {
        type: a.mimeType.split(`;`)[0]
      }),
      extension: a.extension
    };
  } finally {
    d && cancelAnimationFrame(d), h && document.removeEventListener(`visibilitychange`, h), mediaRecorder.state !== `inactive` && mediaRecorder.stop(), stream.getTracks().forEach(item => item.stop());
  }
}
async function xr(e, t, n) {
  let {
      options: r,
      timeline: i
    } = e,
    a = r.screenshots !== `none` && i.frames.length > 0 ? ur : 0,
    o = await vr(e, n, e => t(e * a, `screenshots`)),
    handler = e => t(a + e * (1 - a), `encoding`);
  try {
    if (n.aborted) throw hr();
    let e = He(i.durationMs, r.speed);
    return (await yr(o, r, e, handler, n)) ?? (await br(o, r, e, handler, n));
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
  mi = pluginvueexporthelperT(vueJ({
    __name: `DayReplayPlayer`,
    props: {
      date: {},
      source: {}
    },
    emits: [`close`],
    setup(props, {
      emit: emit
    }) {
      let propsAlias = props,
        emitAlias = emit,
        {
          t: D,
          locale: O,
          dayLabel: k,
          cellName: se
        } = mainT(),
        handler = e => mainJt(e, O.value),
        _e = mainXt(),
        be = vueV(() => mainZt(_e.value)),
        M = Dn(),
        {
          summaryItems: Ce,
          topItems: N
        } = At(),
        {
          user: we
        } = useAuthT(),
        P = vueBn(false),
        Te = vueBn(We()),
        F = vueBn(false),
        Ee = vueBn(0),
        De = vueBn(`encoding`),
        I = vueCn(null),
        Oe = null,
        L = false,
        ke = vueV(() => Math.round(Ee.value * 100)),
        Ae = vueV(() => z.value && I.value ? Math.ceil(He(z.value.durationMs, I.value.speed) / 1e3) : 0),
        je = vueV(() => {
          let fallbackValue = I.value?.resolution ?? 1080;
          return fallbackValue === 1440 ? `2K` : `${fallbackValue}p`;
        }),
        Me = vueBn(null),
        Ne = vueBn(true),
        R = vueBn(``),
        z = vueCn(null),
        B = vueBn(true),
        V = vueBn(false),
        H = vueBn(false),
        Le = vueBn(false),
        U = vueCn(null),
        Re = false,
        W = Sn(vueV(() => z.value?.durationMs ?? 2e4), () => {
          V.value = true, mainHn(`feature_map_heat_click`, {
            entry: `day_replay_finished`
          });
        }),
        {
          progress: ze,
          playing: G,
          speed: Be
        } = W,
        K = vueV(() => z.value?.street ?? null),
        q = vueV(() => K.value ? mainQt(K.value, be.value) : []),
        J = vueV(() => z.value ? sn(z.value, ze.value) : 0),
        Ve = vueV(() => mainIn(Math.min(J.value, 1439))),
        Ue = vueV(() => (z.value?.startBucket ?? 0) * 5),
        Ke = vueV(() => (z.value?.endBucket ?? 288) * 5),
        qe = vueV(() => z.value ? _n(z.value, J.value) : -1),
        Je = vueV(() => K.value && qe.value !== -1 ? se(K.value, qe.value) : ``),
        Ye = vueV(() => z.value ? ln(z.value, J.value) : false),
        Xe = vueV(() => z.value && V.value ? vn(z.value) : null),
        Ze = vueV(() => k(propsAlias.date)),
        Qe = vueV(() => z.value ? dn(z.value, J.value) : null),
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
          let [e, t] = await Promise.all([mainYt.list({
              ...it(propsAlias.date),
              excludeSummary: true
            }), mainOn.barcode({
              startDate: propsAlias.date,
              endDate: propsAlias.date,
              colorBy: `app`
            })]),
            n = t;
          if (!mainAn(n)) {
            let barcode = await mainOn.barcode({
              startDate: propsAlias.date,
              endDate: propsAlias.date,
              colorBy: `category`
            });
            mainAn(barcode) && (n = barcode);
          }
          z.value = on(propsAlias.date, n, an(propsAlias.date, e)), z.value?.frames.length && M.load(z.value.frames);
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
        V.value = false, B.value = true, W.seek(0), W.play(), mainHn(`feature_map_heat_click`, {
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
        Y(), W.pause(), emitAlias(`close`);
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
        let t = z.value,
          n = K.value;
        if (!t || !n || F.value) return;
        W.pause();
        let abortController = new AbortController();
        Oe = abortController, F.value = true, Ee.value = 0, De.value = `encoding`, I.value = e, mainHn(`feature_map_heat_click`, {
          entry: `day_replay_export_start`,
          ...e
        });
        try {
          let diff = null;
          if (we.value?.avatarUrl) {
            let imageAsBase64 = await window.electronAPI.fetchImageAsBase64(we.value.avatarUrl);
            imageAsBase64.success && imageAsBase64.dataUrl && (diff = imageAsBase64.dataUrl);
          }
          let a = vn(t),
            replaced = new Date().toLocaleDateString(undefined, {
              year: `numeric`,
              month: `2-digit`,
              day: `2-digit`
            }).replace(/\//g, `.`),
            s = await xr({
              timeline: t,
              options: e,
              colors: q.value,
              theme: be.value,
              fontFamily: getComputedStyle(document.body).fontFamily || `system-ui, sans-serif`,
              logoUrl: mainSn,
              avatarDataUrl: diff,
              cellName: e => se(n, e),
              texts: {
                title: D(`dayReplay.title`),
                dateLabel: Ze.value,
                brand: D(`heatMap.brandWatermark`),
                footer: D(`heatMap.footerText`, {
                  date: replaced
                }),
                userName: we.value?.nickname,
                fastForward: D(`dayReplay.fastForward`),
                categoryLabel: handler,
                noScreenshot: D(`dayReplay.noFrameNow`),
                summaryTitle: D(`dayReplay.summaryTitle`),
                summaryItems: Ce(a, n),
                topLabel: D(`dayReplay.summaryTop`),
                topItems: N(a, n, q.value)
              }
            }, (e, t) => {
              Ee.value = e, De.value = t;
            }, abortController.signal),
            uint8Array = new Uint8Array(await s.blob.arrayBuffer()),
            date = new Date(),
            joined = [date.getHours(), date.getMinutes(), date.getSeconds()].map(item => String(item).padStart(2, `0`)).join(``);
          (await Ie.saveVideo(uint8Array, `${D(`dayReplay.videoFileName`)}_${propsAlias.date}_${joined}`, s.extension)).cancelled || (alertN(D(`dayReplay.exportSaved`)), mainHn(`feature_map_heat_click`, {
            entry: `day_replay_export_saved_${s.extension}`
          }));
        } catch (t) {
          if (t instanceof DOMException && t.name === `AbortError`) return;
          console.warn(`[DayReplay] 导出视频失败:`, t, e), alertT(D(t instanceof pr && t.code === `UNSUPPORTED` ? `dayReplay.exportUnsupported` : `dayReplay.exportFailed`));
        } finally {
          Oe === abortController && (Oe = null), F.value = false;
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
      let yt = vueV(() => !!z.value?.frames.length),
        bt = vueV(() => z.value ? gn(z.value.frames, J.value) : -1),
        xt = vueV(() => M.loaded.value < M.total.value),
        X = vueV(() => Le.value && yt.value && !V.value),
        St = vueV(() => !X.value && !V.value && bt.value >= 0),
        Ct = vueV(() => bt.value >= 0 && xt.value ? D(`dayReplay.preparingFrames`, {
          loaded: M.loaded.value,
          total: M.total.value
        }) : D(`dayReplay.noFrameNow`));
      vueWt([bt, M.version], ([e]) => {
        if (e < 0) {
          U.value = null;
          return;
        }
        let bitmapAt = M.bitmapAt(e);
        (bitmapAt || !M.isLoaded(e)) && (U.value = bitmapAt);
      });
      function wt(e) {
        Le.value = e, e && (B.value = true), mainHn(`feature_map_heat_click`, {
          entry: e ? `day_replay_screenshot_main` : `day_replay_street_main`
        });
      }
      return vueUt(() => {
        window.addEventListener(`keydown`, vt), Me.value?.focus(), mainHn(`feature_map_heat_click`, {
          entry: `day_replay_open_${propsAlias.source}`
        }), ot();
      }), vueOt(() => {
        Y(), window.removeEventListener(`keydown`, vt);
      }), (n, renderCache) => (vueGt(), vueB(vueF, {
        to: `body`
      }, [vueY(`div`, {
        ref_key: `rootRef`,
        ref: Me,
        class: `fixed inset-0 z-[70] flex flex-col bg-[#fbfbfa] outline-none dark:bg-background`,
        style: {
          "-webkit-app-region": `no-drag`
        },
        role: `dialog`,
        "aria-modal": `true`,
        "aria-label": vueAn(D)(`dayReplay.title`),
        tabindex: `-1`
      }, [vueY(`header`, Cr, [vueY(`div`, wr, [vueY(`h2`, Tr, vueRr(vueAn(D)(`dayReplay.title`)), 1), vueY(`span`, Er, vueRr(Ze.value), 1)]), vueY(`div`, Dr, [vueY(`button`, {
        type: `button`,
        class: `flex h-8 items-center gap-1.5 rounded-md px-2.5 text-xs text-[#555] transition-colors hover:bg-black/[0.05] hover:text-[#111] disabled:cursor-not-allowed disabled:opacity-40 dark:text-muted-foreground dark:hover:bg-white/5 dark:hover:text-foreground`,
        disabled: !z.value || F.value || H.value,
        onClick: mt
      }, [vueK(vueAn(iconclapperboardT), {
        size: 14
      }), vueO(` ` + vueRr(vueAn(D)(`dayReplay.exportVideo`)), 1)], 8, Or), vueY(`button`, {
        type: `button`,
        class: `flex size-8 items-center justify-center rounded-md text-[#888] transition-colors hover:bg-black/[0.05] hover:text-[#222] dark:text-muted-foreground dark:hover:bg-white/5 dark:hover:text-foreground`,
        "aria-label": vueAn(D)(`dayReplay.close`),
        onClick: pt
      }, [vueK(vueAn(lucideT), {
        size: 16
      })], 8, kr)])]), vueY(`div`, Ar, [Ne.value ? (vueGt(), vueS(`div`, jr, [vueK(vueAn(beautifier), {
        size: 20,
        class: `animate-spin`
      }), vueO(` ` + vueRr(vueAn(D)(`dayReplay.loading`)), 1)])) : R.value ? (vueGt(), vueS(`div`, Mr, vueRr(R.value), 1)) : !z.value || !K.value ? (vueGt(), vueS(`div`, Nr, [vueY(`div`, Pr, [vueK(vueAn(Fe), {
        size: 18,
        class: `text-[#bbb] dark:text-muted-foreground`
      })]), vueY(`div`, Fr, [vueY(`p`, Ir, vueRr(vueAn(D)(`dayReplay.empty`)), 1), vueY(`p`, Lr, vueRr(vueAn(D)(`dayReplay.emptyDesc`)), 1)])])) : (vueGt(), vueS(vueC, {
        key: 3
      }, [H.value ? (vueGt(), vueS(`div`, Br, [vueY(`span`, Vr, vueRr(Ve.value), 1), vueY(`span`, Hr, vueRr(vueAn(tt)), 1)])) : (vueGt(), vueS(`div`, {
        key: 0,
        class: vueN(X.value ? `absolute right-5 top-5 z-10 aspect-[16/10] w-[min(320px,34%)] overflow-hidden rounded-[10px] border border-black/8 bg-[#fbfbfa] shadow-sm dark:border-border dark:bg-background` : `absolute inset-0`)
      }, [vueK(kt, {
        following: B.value,
        "onUpdate:following": renderCache[0] ||= e => B.value = e,
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
        playing: vueAn(G),
        compact: X.value,
        "current-label": vueAn(tt),
        onSeek: lt,
        onUnavailable: renderCache[1] ||= e => H.value = true
      }, null, 8, [`following`, `street`, `span`, `colors`, `theme`, `minute`, `overview`, `playing`, `compact`, `current-label`]), X.value ? (vueGt(), vueS(`button`, {
        key: 0,
        type: `button`,
        class: `group absolute inset-0 flex cursor-pointer items-end justify-end p-2`,
        "aria-label": vueAn(D)(`dayReplay.screenshotCollapse`),
        title: vueAn(D)(`dayReplay.screenshotCollapse`),
        onClick: renderCache[2] ||= e => wt(false)
      }, [vueY(`span`, zr, [vueK(vueAn(mainKn), {
        size: 12
      })])], 8, Rr)) : vueX(``, true)], 2)), X.value ? (vueGt(), vueS(`div`, Ur, [vueK(rt, {
        bitmap: U.value
      }, null, 8, [`bitmap`]), U.value ? vueX(``, true) : (vueGt(), vueS(`p`, Wr, vueRr(Ct.value), 1)), vueY(`button`, {
        type: `button`,
        class: `absolute left-5 top-5 flex h-7 items-center gap-1.5 rounded-md bg-white/90 px-2.5 text-xs text-[#555] shadow-sm ring-1 ring-black/5 transition-colors hover:text-[#111] dark:bg-black/50 dark:text-muted-foreground dark:ring-white/10 dark:hover:text-foreground`,
        onClick: renderCache[3] ||= e => wt(false)
      }, [vueK(vueAn(iconminimizeT), {
        size: 13
      }), vueO(` ` + vueRr(vueAn(D)(`dayReplay.screenshotCollapse`)), 1)])])) : vueX(``, true), !B.value && !H.value && !V.value && !X.value ? (vueGt(), vueS(`button`, {
        key: 3,
        type: `button`,
        class: `absolute left-5 top-5 flex h-7 items-center gap-1.5 rounded-md bg-white/90 px-2.5 text-xs text-[#555] shadow-sm ring-1 ring-black/5 transition-colors hover:text-[#111] dark:bg-black/50 dark:text-muted-foreground dark:ring-white/10 dark:hover:text-foreground`,
        onClick: renderCache[4] ||= e => B.value = true
      }, [vueK(vueAn(Pe), {
        size: 13
      }), vueO(` ` + vueRr(vueAn(D)(`dayReplay.follow`)), 1)])) : vueX(``, true), vueK(playerR, {
        name: `replay-fade`
      }, {
        default: vueYt(() => [St.value ? (vueGt(), vueS(`button`, {
          key: 0,
          type: `button`,
          class: `group absolute right-5 top-5 aspect-[16/10] w-[min(320px,34%)] cursor-pointer overflow-hidden rounded-[10px] border border-black/8 bg-white shadow-sm dark:border-border dark:bg-card`,
          "aria-label": vueAn(D)(`dayReplay.screenshotExpand`),
          title: vueAn(D)(`dayReplay.screenshotExpand`),
          onClick: renderCache[5] ||= e => wt(true)
        }, [vueK(rt, {
          bitmap: U.value
        }, null, 8, [`bitmap`]), U.value ? vueX(``, true) : (vueGt(), vueS(`span`, Kr, vueRr(Ct.value), 1)), vueY(`span`, qr, [vueK(vueAn(mainKn), {
          size: 12
        })])], 8, Gr)) : vueX(``, true)]),
        _: 1
      }), V.value && Xe.value ? (vueGt(), vueS(`div`, Jr, [vueK(Gt, {
        summary: Xe.value,
        street: K.value,
        colors: q.value,
        "date-label": Ze.value,
        "has-screenshots": z.value.hasScreenshots,
        onReplay: ct,
        onClose: pt
      }, null, 8, [`summary`, `street`, `colors`, `date-label`, `has-screenshots`])])) : vueX(``, true)], 64))]), z.value && K.value ? (vueGt(), vueS(`div`, Yr, [vueY(`div`, Xr, [vueY(`div`, Zr, [vueO(vueRr(Ve.value), 1), Ye.value ? (vueGt(), vueS(vueC, {
        key: 0
      }, [vueO(` · ` + vueRr(vueAn(D)(`dayReplay.fastForward`)), 1)], 64)) : vueX(``, true)]), vueY(`div`, Qr, [vueK(playerR, {
        name: `replay-fade`
      }, {
        default: vueYt(() => [vueAn(et) ? (vueGt(), vueS(`p`, {
          key: vueAn(et).id,
          class: `absolute inset-x-0 top-0 line-clamp-2 text-center text-sm leading-[22px] text-[#333] dark:text-foreground`
        }, [vueAn(et).category ? (vueGt(), vueS(`span`, $r, vueRr(handler(vueAn(et).category)) + ` · `, 1)) : vueX(``, true), vueO(vueRr(vueAn(et).summary), 1)])) : vueX(``, true)]),
        _: 1
      })])]), vueY(`div`, ei, [vueY(`button`, {
        type: `button`,
        class: `flex size-9 shrink-0 items-center justify-center rounded-full bg-[#111] text-white transition-colors hover:bg-[#333] dark:bg-foreground dark:text-background dark:hover:bg-foreground/85`,
        "aria-label": vueAn(G) ? vueAn(D)(`dayReplay.pause`) : vueAn(D)(`dayReplay.play`),
        onClick: st
      }, [vueAn(G) ? (vueGt(), vueB(vueAn(iconpauseT), {
        key: 0,
        size: 15
      })) : (vueGt(), vueB(vueAn(mainTn), {
        key: 1,
        size: 15,
        class: `translate-x-px`
      }))], 8, ti), vueK(at, {
        class: `flex-1`,
        street: K.value,
        colors: q.value,
        theme: be.value,
        minute: J.value,
        "start-minute": Ue.value,
        "end-minute": Ke.value,
        label: vueAn(D)(`dayReplay.progress`),
        onSeek: lt,
        onScrubStart: ut,
        onScrubEnd: dt
      }, null, 8, [`street`, `colors`, `theme`, `minute`, `start-minute`, `end-minute`, `label`]), vueY(`div`, ni, [(vueGt(true), vueS(vueC, null, vueSt(vueAn(xn), n => (vueGt(), vueS(`button`, {
        key: n,
        type: `button`,
        class: vueN([`h-6 min-w-9 rounded-[5px] px-1.5 text-xs tabular-nums transition-colors`, vueAn(Be) === n ? `bg-white text-[#111] shadow-sm dark:bg-white/15 dark:text-foreground` : `text-[#888] hover:text-[#333] dark:text-muted-foreground dark:hover:text-foreground`]),
        onClick: e => ft(n)
      }, vueRr(n) + `× `, 11, ri))), 128))])]), vueY(`p`, ii, vueRr(vueAn(D)(`dayReplay.shortcutHint`)), 1)])) : vueX(``, true), P.value && z.value ? (vueGt(), vueS(`div`, {
        key: 1,
        class: `absolute inset-0 z-20 flex items-center justify-center bg-[#fbfbfa]/80 backdrop-blur-[2px] dark:bg-background/80`,
        onClick: playerE(ht, [`self`])
      }, [vueK(nt, {
        options: Te.value,
        "has-screenshots": yt.value,
        "timeline-duration-ms": z.value.durationMs,
        onConfirm: gt,
        onCancel: ht
      }, null, 8, [`options`, `has-screenshots`, `timeline-duration-ms`])])) : vueX(``, true), F.value ? (vueGt(), vueS(`div`, ai, [vueY(`div`, oi, [vueY(`div`, si, [vueK(vueAn(beautifier), {
        size: 15,
        class: `animate-spin text-[#999]`
      }), vueO(` ` + vueRr(vueAn(D)(`dayReplay.exporting`)), 1)]), vueY(`p`, ci, vueRr(De.value === `screenshots` ? vueAn(D)(`dayReplay.exportPreparingScreenshots`) : vueAn(D)(`dayReplay.exportHint`, {
        seconds: Ae.value,
        quality: je.value,
        fps: I.value?.frameRate ?? 60
      })), 1), vueY(`div`, li, [vueY(`div`, {
        class: `h-full rounded-full bg-[#10b981] transition-[width] duration-200`,
        style: vueNr({
          width: `${ke.value}%`
        })
      }, null, 4)]), vueY(`div`, ui, [vueY(`span`, di, vueRr(ke.value) + `%`, 1), vueY(`button`, {
        type: `button`,
        class: `h-7 rounded-md px-2.5 text-xs text-[#666] transition-colors hover:bg-black/[0.05] dark:text-muted-foreground dark:hover:bg-white/5`,
        onClick: Y
      }, vueRr(vueAn(D)(`dayReplay.exportCancel`)), 1)])])])) : vueX(``, true)], 8, Sr)]));
    }
  }), [[`__scopeId`, `data-v-499495b2`]]);
export { mi as default };