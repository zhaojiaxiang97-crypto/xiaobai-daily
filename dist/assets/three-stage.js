import { rn as e } from "./main.js";
import { C as t, E as n, T as r, l as i, n as a, r as o, t as s, w as c, x as l, y as u } from "./OrbitControls.js";
function d(t) {
  let n = [],
    r = new Int32Array(t.days.length + 1);
  return t.days.forEach((t, i) => {
    r[i] = n.length;
    for (let r of e(t.cells)) n.push({
      dayIndex: i,
      start: r.start,
      end: r.end,
      value: r.value
    });
  }), r[t.days.length] = n.length, {
    blocks: n,
    dayOffsets: r,
    dayCount: t.days.length
  };
}
function f(e) {
  return e.value === -2;
}
function p(e) {
  return Math.sqrt(e.end - e.start);
}
function m(e, t, n, r) {
  return (t > 1 ? e.dayIndex / (t - 1) : 0) * n + e.start / 288 * r;
}
function h(e, t, n) {
  return e.value === -2 ? n.idle : t[e.value] ?? n.other;
}
var g = .92,
  _ = 2,
  v = 1200,
  y = 520,
  b = .001;
function x(e) {
  return e < .5 ? 4 * e ** 3 : 1 - (-2 * e + 2) ** 3 / 2;
}
function S(e, t) {
  let n = (t - e) % (Math.PI * 2);
  return n > Math.PI && (n -= Math.PI * 2), n < -Math.PI && (n += Math.PI * 2), n;
}
var C = class e {
  scene = new t();
  camera;
  renderer;
  controls;
  viewTouched = false;
  canvas;
  callbacks;
  manual;
  framing = null;
  tween = null;
  frameId = 0;
  hasView = false;
  disposed = false;
  probe = new u();
  projected = new n();
  offset = new n();
  spherical = new c();
  raycaster = new l();
  pointer = new r();
  static create(t, n, r, i = {}) {
    try {
      return new e(t, n, r, i);
    } catch {
      return null;
    }
  }
  constructor(e, t, n, r) {
    this.canvas = e, this.callbacks = n, this.manual = r.manual ?? false, this.renderer = new a({
      canvas: e,
      alpha: true,
      antialias: r.antialias ?? window.devicePixelRatio < 2,
      powerPreference: `low-power`,
      failIfMajorPerformanceCaveat: true
    }), this.renderer.setClearColor(0, 0), this.camera = new u(t, 1, .5, 2e3), this.scene.add(new o(16777215, .34 * Math.PI));
    let c = new i(16777215, .74 * Math.PI);
    c.position.set(.35, 1, .55);
    let l = new i(16777215, .2 * Math.PI);
    l.position.set(-1, .25, -.4), this.scene.add(c, l), this.controls = new s(this.camera, e), this.controls.enableDamping = true, this.controls.dampingFactor = .12, this.controls.enablePan = false, this.controls.enableZoom = false, this.controls.rotateSpeed = .7, this.controls.addEventListener(`change`, this.requestRender), this.controls.addEventListener(`start`, () => {
      this.viewTouched = true, this.tween = null;
    }), e.addEventListener(`webglcontextrestored`, this.requestRender);
  }
  get isCameraTweening() {
    return this.tween !== null;
  }
  requestRender = () => {
    this.manual || this.disposed || !this.hasView || this.frameId || (this.frameId = requestAnimationFrame(this.renderFrame));
  };
  renderNow(e) {
    this.disposed || (this.stepTween(e), this.callbacks.onFrame?.(e), this.controls.update(), this.renderer.render(this.scene, this.camera), this.callbacks.onRendered?.());
  }
  renderFrame = e => {
    if (this.frameId = 0, this.disposed) return;
    let t = this.stepTween(e);
    this.callbacks.onFrame?.(e) && (t = true), this.controls.update(), this.renderer.render(this.scene, this.camera), this.callbacks.onRendered?.(), t && this.requestRender();
  };
  setFraming(e) {
    this.framing = e;
    let {
      limits: t
    } = e;
    this.controls.minPolarAngle = t.minPolar, this.controls.maxPolarAngle = t.maxPolar, this.controls.minAzimuthAngle = t.azimuthRange === null ? -1 / 0 : -t.azimuthRange, this.controls.maxAzimuthAngle = t.azimuthRange === null ? 1 / 0 : t.azimuthRange, this.controls.target.copy(e.target), this.updateDistanceLimits();
  }
  resize(e, t, n) {
    return !e || !t ? false : (this.renderer.setPixelRatio(n ?? Math.min(window.devicePixelRatio || 1, _)), this.renderer.setSize(e, t, false), this.camera.aspect = e / t, this.camera.updateProjectionMatrix(), this.updateDistanceLimits(), this.tween && (this.tween.to.distance = this.fitDistance(this.tween.toView)), true);
  }
  flyIn(e) {
    if (!this.framing) return;
    if (!e) {
      this.jumpTo(this.framing.homeView);
      return;
    }
    let t = this.framing.topView;
    this.placeCamera({
      ...t,
      distance: this.fitDistance(t)
    }), this.startTween(this.framing.homeView, v);
  }
  resetHome(e) {
    this.framing && (e && this.hasView ? this.startTween(this.framing.homeView, y) : this.jumpTo(this.framing.homeView), this.viewTouched = false);
  }
  flyToView(e) {
    this.framing && this.startTween(e === `top` ? this.framing.topView : this.framing.homeView, y);
  }
  refit() {
    this.framing && (!this.tween && !this.viewTouched ? this.jumpTo(this.framing.homeView) : this.requestRender());
  }
  rayFromEvent(e) {
    let t = this.canvas.getBoundingClientRect();
    return this.pointer.set((e.clientX - t.left) / Math.max(1, t.width) * 2 - 1, -((e.clientY - t.top) / Math.max(1, t.height)) * 2 + 1), this.raycaster.setFromCamera(this.pointer, this.camera), this.raycaster.ray;
  }
  project(e, t, n) {
    return this.projected.copy(e).project(this.camera), {
      x: (this.projected.x + 1) / 2 * t,
      y: (1 - this.projected.y) / 2 * n,
      visible: this.projected.z < 1 && Math.abs(this.projected.x) <= 1.02 && Math.abs(this.projected.y) <= 1.02
    };
  }
  async freezeForExport(e) {
    if (this.disposed || !this.hasView) return null;
    this.stepTween(1 / 0), this.callbacks.onFrame?.(1 / 0), this.controls.update(), this.renderer.setPixelRatio(e), this.renderer.render(this.scene, this.camera);
    let t = this.canvas.toDataURL(`image/png`);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, _)), this.renderer.render(this.scene, this.camera), this.callbacks.onRendered?.();
    let n = new Image();
    return n.className = `block h-full w-full`, n.src = t, await n.decode(), this.canvas.style.display = `none`, this.canvas.after(n), () => {
      n.remove(), this.canvas.style.display = ``;
    };
  }
  dispose() {
    this.disposed = true, this.frameId && cancelAnimationFrame(this.frameId), this.frameId = 0, this.canvas.removeEventListener(`webglcontextrestored`, this.requestRender), this.controls.dispose(), this.renderer.dispose(), this.renderer.forceContextLoss();
  }
  direction(e) {
    return new n().setFromSphericalCoords(1, Math.max(b, e.polar), e.azimuth);
  }
  fitDistance(e) {
    let t = this.framing;
    if (!t) return 100;
    this.probe.copy(this.camera), this.probe.far = 1e7, this.probe.updateProjectionMatrix();
    let n = this.direction(e),
      r = 1,
      i = 1e5;
    for (let e = 0; e < 26; e += 1) {
      let e = (r + i) / 2;
      this.probe.position.copy(t.target).addScaledVector(n, e), this.probe.lookAt(t.target), this.probe.updateMatrixWorld(), t.corners.every(e => (this.projected.copy(e).project(this.probe), this.projected.z < 1 && Math.abs(this.projected.x) <= g && Math.abs(this.projected.y) <= g)) ? i = e : r = e;
    }
    return i;
  }
  updateDistanceLimits() {
    if (!this.framing) return;
    let e = this.fitDistance(this.framing.homeView),
      t = this.fitDistance(this.framing.topView),
      n = Math.max(e, t);
    this.controls.minDistance = Math.min(e, t) * .3, this.controls.maxDistance = n * 1.8, this.camera.near = Math.max(.1, Math.min(e, t) * .02), this.camera.far = n * 6, this.camera.updateProjectionMatrix();
  }
  currentPose() {
    let e = this.framing?.target ?? this.controls.target;
    return this.offset.copy(this.camera.position).sub(e), this.spherical.setFromVector3(this.offset), {
      polar: this.spherical.phi,
      azimuth: this.spherical.theta,
      distance: this.spherical.radius
    };
  }
  placeCamera(e) {
    this.framing && (this.spherical.set(e.distance, Math.max(b, e.polar), e.azimuth), this.camera.position.setFromSpherical(this.spherical).add(this.framing.target), this.controls.target.copy(this.framing.target), this.camera.lookAt(this.framing.target), this.hasView = true);
  }
  jumpTo(e) {
    this.tween = null, this.placeCamera({
      ...e,
      distance: this.fitDistance(e)
    }), this.controls.update(), this.requestRender();
  }
  startTween(e, t) {
    if (!this.hasView) {
      this.jumpTo(e);
      return;
    }
    let n = this.currentPose();
    this.tween = {
      from: n,
      to: {
        polar: e.polar,
        azimuth: n.azimuth + S(n.azimuth, e.azimuth),
        distance: this.fitDistance(e)
      },
      toView: e,
      startedAt: performance.now(),
      duration: t
    }, this.requestRender();
  }
  stepTween(e) {
    let t = this.tween;
    if (!t) return false;
    let n = Math.min(1, Math.max(0, (e - t.startedAt) / t.duration)),
      r = x(n);
    return this.placeCamera({
      polar: t.from.polar + (t.to.polar - t.from.polar) * r,
      azimuth: t.from.azimuth + (t.to.azimuth - t.from.azimuth) * r,
      distance: t.from.distance + (t.to.distance - t.from.distance) * r
    }), n >= 1 && (this.tween = null), n < 1;
  }
};
export { m as a, p as i, h as n, f as o, d as r, C as t };