var options = {
    LEFT: 0,
    MIDDLE: 1,
    RIGHT: 2,
    ROTATE: 0,
    DOLLY: 1,
    PAN: 2
  },
  t = {
    ROTATE: 0,
    PAN: 1,
    DOLLY_PAN: 2,
    DOLLY_ROTATE: 3
  },
  n = 1e3,
  r = 1001,
  i = 1002,
  a = 1003,
  o = 1004,
  s = 1005,
  c = 1006,
  l = 1007,
  u = 1008,
  d = 1009,
  f = 1010,
  p = 1011,
  m = 1012,
  h = 1013,
  g = 1014,
  _ = 1015,
  v = 1016,
  y = 1017,
  b = 1018,
  x = 1020,
  S = 35902,
  C = 35899,
  w = 1021,
  T = 1022,
  E = 1023,
  D = 1026,
  O = 1027,
  k = 1028,
  A = 1029,
  j = 1030,
  ee = 1031,
  te = 1033,
  M = 33776,
  N = 33777,
  P = 33778,
  ne = 33779,
  F = 35840,
  re = 35841,
  ie = 35842,
  ae = 35843,
  oe = 36196,
  se = 37492,
  I = 37496,
  L = 37488,
  ce = 37489,
  le = 37490,
  ue = 37491,
  de = 37808,
  fe = 37809,
  pe = 37810,
  me = 37811,
  he = 37812,
  ge = 37813,
  _e = 37814,
  ve = 37815,
  ye = 37816,
  be = 37817,
  xe = 37818,
  Se = 37819,
  Ce = 37820,
  we = 37821,
  Te = 36492,
  Ee = 36494,
  De = 36495,
  Oe = 36283,
  ke = 36284,
  Ae = 36285,
  R = 36286,
  je = 2300,
  z = 2301,
  Me = 2302,
  B = 2303,
  Ne = 2400,
  V = 2401,
  H = 2402,
  Pe = 3200,
  Fe = `srgb`,
  Ie = `srgb-linear`,
  Le = `linear`,
  Re = `srgb`,
  ze = 7680,
  Be = 35044,
  Ve = 35048,
  He = 2e3;
function Ue(count) {
  for (let t = count.length - 1; t >= 0; --t) if (count[t] >= 65535) return true;
  return false;
}
function We(e) {
  return ArrayBuffer.isView(e) && !(e instanceof DataView);
}
function Ge(e) {
  return document.createElementNS(`http://www.w3.org/1999/xhtml`, e);
}
function Ke() {
  let e = Ge(`canvas`);
  return e.style.display = `block`, e;
}
var qe = {};
function Je(...e) {
  let t = `THREE.` + e.shift();
  console.log(t, ...e);
}
function Ye(e) {
  let t = e[0];
  if (typeof t == `string` && t.startsWith(`TSL:`)) {
    let t = e[1];
    t && t.isStackTrace ? e[0] += ` ` + t.getLocation() : e[1] = `Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.`;
  }
  return e;
}
function U(...e) {
  e = Ye(e);
  let t = `THREE.` + e.shift();
  {
    let n = e[0];
    n && n.isStackTrace ? console.warn(n.getError(t)) : console.warn(t, ...e);
  }
}
function W(...e) {
  e = Ye(e);
  let t = `THREE.` + e.shift();
  {
    let n = e[0];
    n && n.isStackTrace ? console.error(n.getError(t)) : console.error(t, ...e);
  }
}
function Xe(...e) {
  let joined = e.join(` `);
  joined in qe || (qe[joined] = true, U(...e));
}
function Ze(e, t, n) {
  return new Promise(function (r, i) {
    function a() {
      switch (e.clientWaitSync(t, e.SYNC_FLUSH_COMMANDS_BIT, 0)) {
        case e.WAIT_FAILED:
          i();
          break;
        case e.TIMEOUT_EXPIRED:
          setTimeout(a, n);
          break;
        default:
          r();
      }
    }
    setTimeout(a, n);
  });
}
var Qe = {
    0: 1,
    2: 6,
    4: 7,
    3: 5,
    1: 0,
    6: 2,
    7: 4,
    5: 3
  },
  $e = class {
    addEventListener(event, listener) {
      this._listeners === undefined && (this._listeners = {});
      let _listeners = this._listeners;
      _listeners[event] === undefined && (_listeners[event] = []), _listeners[event].indexOf(listener) === -1 && _listeners[event].push(listener);
    }
    hasEventListener(event, listener) {
      let _listeners = this._listeners;
      return _listeners !== undefined && _listeners[event] !== undefined && _listeners[event].indexOf(listener) !== -1;
    }
    removeEventListener(event, listener) {
      let _listeners = this._listeners;
      if (_listeners === undefined) return;
      let r = _listeners[event];
      if (r !== undefined) {
        let e = r.indexOf(listener);
        e !== -1 && r.splice(e, 1);
      }
    }
    dispatchEvent(event) {
      let _listeners = this._listeners;
      if (_listeners === undefined) return;
      let n = _listeners[event.type];
      if (n !== undefined) {
        event.target = this;
        let part = n.slice(0);
        for (let n = 0, r = part.length; n < r; n++) part[n].call(this, event);
        event.target = null;
      }
    }
  },
  parts = `00.01.02.03.04.05.06.07.08.09.0a.0b.0c.0d.0e.0f.10.11.12.13.14.15.16.17.18.19.1a.1b.1c.1d.1e.1f.20.21.22.23.24.25.26.27.28.29.2a.2b.2c.2d.2e.2f.30.31.32.33.34.35.36.37.38.39.3a.3b.3c.3d.3e.3f.40.41.42.43.44.45.46.47.48.49.4a.4b.4c.4d.4e.4f.50.51.52.53.54.55.56.57.58.59.5a.5b.5c.5d.5e.5f.60.61.62.63.64.65.66.67.68.69.6a.6b.6c.6d.6e.6f.70.71.72.73.74.75.76.77.78.79.7a.7b.7c.7d.7e.7f.80.81.82.83.84.85.86.87.88.89.8a.8b.8c.8d.8e.8f.90.91.92.93.94.95.96.97.98.99.9a.9b.9c.9d.9e.9f.a0.a1.a2.a3.a4.a5.a6.a7.a8.a9.aa.ab.ac.ad.ae.af.b0.b1.b2.b3.b4.b5.b6.b7.b8.b9.ba.bb.bc.bd.be.bf.c0.c1.c2.c3.c4.c5.c6.c7.c8.c9.ca.cb.cc.cd.ce.cf.d0.d1.d2.d3.d4.d5.d6.d7.d8.d9.da.db.dc.dd.de.df.e0.e1.e2.e3.e4.e5.e6.e7.e8.e9.ea.eb.ec.ed.ee.ef.f0.f1.f2.f3.f4.f5.f6.f7.f8.f9.fa.fb.fc.fd.fe.ff`.split(`.`),
  tt = 1234567,
  nt = Math.PI / 180,
  rt = 180 / Math.PI;
function it() {
  let e = Math.random() * 4294967295 | 0,
    t = Math.random() * 4294967295 | 0,
    n = Math.random() * 4294967295 | 0,
    r = Math.random() * 4294967295 | 0;
  return (parts[e & 255] + parts[e >> 8 & 255] + parts[e >> 16 & 255] + parts[e >> 24 & 255] + `-` + parts[t & 255] + parts[t >> 8 & 255] + `-` + parts[t >> 16 & 15 | 64] + parts[t >> 24 & 255] + `-` + parts[n & 63 | 128] + parts[n >> 8 & 255] + `-` + parts[n >> 16 & 255] + parts[n >> 24 & 255] + parts[r & 255] + parts[r >> 8 & 255] + parts[r >> 16 & 255] + parts[r >> 24 & 255]).toLowerCase();
}
function G(e, t, n) {
  return Math.max(t, Math.min(n, e));
}
function at(e, t) {
  return (e % t + t) % t;
}
function ot(e, t, n, r, i) {
  return r + (e - t) * (i - r) / (n - t);
}
function st(e, t, n) {
  return e === t ? 0 : (n - e) / (t - e);
}
function ct(e, t, n) {
  return (1 - n) * e + n * t;
}
function lt(e, t, n, r) {
  return ct(e, t, 1 - Math.exp(-n * r));
}
function ut(e, t = 1) {
  return t - Math.abs(at(e, t * 2) - t);
}
function dt(e, t, n) {
  return e <= t ? 0 : e >= n ? 1 : (e = (e - t) / (n - t), e * e * (3 - 2 * e));
}
function ft(e, t, n) {
  return e <= t ? 0 : e >= n ? 1 : (e = (e - t) / (n - t), e * e * e * (e * (e * 6 - 15) + 10));
}
function pt(e, t) {
  return e + Math.floor(Math.random() * (t - e + 1));
}
function mt(e, t) {
  return e + Math.random() * (t - e);
}
function ht(e) {
  return e * (.5 - Math.random());
}
function gt(e) {
  e !== undefined && (tt = e);
  let t = tt += 1831565813;
  return t = Math.imul(t ^ t >>> 15, t | 1), t ^= t + Math.imul(t ^ t >>> 7, t | 61), ((t ^ t >>> 14) >>> 0) / 4294967296;
}
function _t(e) {
  return e * nt;
}
function vt(e) {
  return e * rt;
}
function yt(e) {
  return e > 0 && Number.isInteger(e) && 2 ** Math.round(Math.log2(e)) === e;
}
function bt(e) {
  return 2 ** Math.ceil(Math.log(e) / Math.LN2);
}
function xt(e) {
  return 2 ** Math.floor(Math.log(e) / Math.LN2);
}
function St(e, t, n, r, i) {
  let a = Math.cos,
    o = Math.sin,
    s = a(n / 2),
    c = o(n / 2),
    l = a((t + r) / 2),
    u = o((t + r) / 2),
    d = a((t - r) / 2),
    f = o((t - r) / 2),
    p = a((r - t) / 2),
    m = o((r - t) / 2);
  switch (i) {
    case `XYX`:
      e.set(s * u, c * d, c * f, s * l);
      break;
    case `YZY`:
      e.set(c * f, s * u, c * d, s * l);
      break;
    case `ZXZ`:
      e.set(c * d, c * f, s * u, s * l);
      break;
    case `XZX`:
      e.set(s * u, c * m, c * p, s * l);
      break;
    case `YXY`:
      e.set(c * p, s * u, c * m, s * l);
      break;
    case `ZYZ`:
      e.set(c * m, c * p, s * u, s * l);
      break;
    default:
      U(`MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: ` + i);
  }
}
function Ct(e, t) {
  switch (t.constructor) {
    case Float32Array:
      return e;
    case Uint32Array:
      return e / 4294967295;
    case Uint16Array:
      return e / 65535;
    case Uint8Array:
    case Uint8ClampedArray:
      return e / 255;
    case Int32Array:
      return Math.max(e / 2147483647, -1);
    case Int16Array:
      return Math.max(e / 32767, -1);
    case Int8Array:
      return Math.max(e / 127, -1);
    default:
      throw Error(`THREE.MathUtils: Invalid component type.`);
  }
}
function wt(e, t) {
  switch (t.constructor) {
    case Float32Array:
      return e;
    case Uint32Array:
      return Math.round(e * 4294967295);
    case Uint16Array:
      return Math.round(e * 65535);
    case Uint8Array:
    case Uint8ClampedArray:
      return Math.round(e * 255);
    case Int32Array:
      return Math.round(e * 2147483647);
    case Int16Array:
      return Math.round(e * 32767);
    case Int8Array:
      return Math.round(e * 127);
    default:
      throw Error(`THREE.MathUtils: Invalid component type.`);
  }
}
var Tt = {
    DEG2RAD: nt,
    RAD2DEG: rt,
    generateUUID: it,
    clamp: G,
    euclideanModulo: at,
    mapLinear: ot,
    inverseLerp: st,
    lerp: ct,
    damp: lt,
    pingpong: ut,
    smoothstep: dt,
    smootherstep: ft,
    randInt: pt,
    randFloat: mt,
    randFloatSpread: ht,
    seededRandom: gt,
    degToRad: _t,
    radToDeg: vt,
    isPowerOfTwo: yt,
    ceilPowerOfTwo: bt,
    floorPowerOfTwo: xt,
    setQuaternionFromProperEuler: St,
    normalize: wt,
    denormalize: Ct
  },
  K = class e {
    static {
      e.prototype.isVector2 = true;
    }
    constructor(e = 0, t = 0) {
      this.x = e, this.y = t;
    }
    get width() {
      return this.x;
    }
    set width(e) {
      this.x = e;
    }
    get height() {
      return this.y;
    }
    set height(height) {
      this.y = height;
    }
    set(e, t) {
      return this.x = e, this.y = t, this;
    }
    setScalar(scalar) {
      return this.x = scalar, this.y = scalar, this;
    }
    setX(e) {
      return this.x = e, this;
    }
    setY(e) {
      return this.y = e, this;
    }
    setComponent(component, componentValue) {
      switch (component) {
        case 0:
          this.x = componentValue;
          break;
        case 1:
          this.y = componentValue;
          break;
        default:
          throw Error(`THREE.Vector2: index is out of range: ` + component);
      }
      return this;
    }
    getComponent(component) {
      switch (component) {
        case 0:
          return this.x;
        case 1:
          return this.y;
        default:
          throw Error(`THREE.Vector2: index is out of range: ` + component);
      }
    }
    clone() {
      return new this.constructor(this.x, this.y);
    }
    copy(e) {
      return this.x = e.x, this.y = e.y, this;
    }
    add(e) {
      return this.x += e.x, this.y += e.y, this;
    }
    addScalar(scalar) {
      return this.x += scalar, this.y += scalar, this;
    }
    addVectors(vectors, vectorsValue) {
      return this.x = vectors.x + vectorsValue.x, this.y = vectors.y + vectorsValue.y, this;
    }
    addScaledVector(scaled, vector) {
      return this.x += scaled.x * vector, this.y += scaled.y * vector, this;
    }
    sub(e) {
      return this.x -= e.x, this.y -= e.y, this;
    }
    subScalar(sub) {
      return this.x -= sub, this.y -= sub, this;
    }
    subVectors(sub, vectors) {
      return this.x = sub.x - vectors.x, this.y = sub.y - vectors.y, this;
    }
    multiply(multiply) {
      return this.x *= multiply.x, this.y *= multiply.y, this;
    }
    multiplyScalar(multiply) {
      return this.x *= multiply, this.y *= multiply, this;
    }
    divide(divide) {
      return this.x /= divide.x, this.y /= divide.y, this;
    }
    divideScalar(divide) {
      return this.multiplyScalar(1 / divide);
    }
    applyMatrix3(matrix3) {
      let t = this.x,
        n = this.y,
        elements = matrix3.elements;
      return this.x = elements[0] * t + elements[3] * n + elements[6], this.y = elements[1] * t + elements[4] * n + elements[7], this;
    }
    min(e) {
      return this.x = Math.min(this.x, e.x), this.y = Math.min(this.y, e.y), this;
    }
    max(e) {
      return this.x = Math.max(this.x, e.x), this.y = Math.max(this.y, e.y), this;
    }
    clamp(e, t) {
      return this.x = G(this.x, e.x, t.x), this.y = G(this.y, e.y, t.y), this;
    }
    clampScalar(clamp, scalar) {
      return this.x = G(this.x, clamp, scalar), this.y = G(this.y, clamp, scalar), this;
    }
    clampLength(clamp, length) {
      let n = this.length();
      return this.divideScalar(n || 1).multiplyScalar(G(n, clamp, length));
    }
    floor() {
      return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this;
    }
    ceil() {
      return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this;
    }
    round() {
      return this.x = Math.round(this.x), this.y = Math.round(this.y), this;
    }
    roundToZero() {
      return this.x = Math.trunc(this.x), this.y = Math.trunc(this.y), this;
    }
    negate() {
      return this.x = -this.x, this.y = -this.y, this;
    }
    dot(e) {
      return this.x * e.x + this.y * e.y;
    }
    cross(e) {
      return this.x * e.y - this.y * e.x;
    }
    lengthSq() {
      return this.x * this.x + this.y * this.y;
    }
    length() {
      return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    manhattanLength() {
      return Math.abs(this.x) + Math.abs(this.y);
    }
    normalize() {
      return this.divideScalar(this.length() || 1);
    }
    angle() {
      return Math.atan2(-this.y, -this.x) + Math.PI;
    }
    angleTo(angle) {
      let t = Math.sqrt(this.lengthSq() * angle.lengthSq());
      if (t === 0) return Math.PI / 2;
      let n = this.dot(angle) / t;
      return Math.acos(G(n, -1, 1));
    }
    distanceTo(distance) {
      return Math.sqrt(this.distanceToSquared(distance));
    }
    distanceToSquared(distance) {
      let t = this.x - distance.x,
        n = this.y - distance.y;
      return t * t + n * n;
    }
    manhattanDistanceTo(manhattan) {
      return Math.abs(this.x - manhattan.x) + Math.abs(this.y - manhattan.y);
    }
    setLength(length) {
      return this.normalize().multiplyScalar(length);
    }
    lerp(e, t) {
      return this.x += (e.x - this.x) * t, this.y += (e.y - this.y) * t, this;
    }
    lerpVectors(lerp, vectors, vectorsValue) {
      return this.x = lerp.x + (vectors.x - lerp.x) * vectorsValue, this.y = lerp.y + (vectors.y - lerp.y) * vectorsValue, this;
    }
    equals(equals) {
      return equals.x === this.x && equals.y === this.y;
    }
    fromArray(array, t = 0) {
      return this.x = array[t], this.y = array[t + 1], this;
    }
    toArray(e = [], t = 0) {
      return e[t] = this.x, e[t + 1] = this.y, e;
    }
    fromBufferAttribute(buffer, attribute) {
      return this.x = buffer.getX(attribute), this.y = buffer.getY(attribute), this;
    }
    rotateAround(rotate, around) {
      let n = Math.cos(around),
        r = Math.sin(around),
        i = this.x - rotate.x,
        a = this.y - rotate.y;
      return this.x = i * n - a * r + rotate.x, this.y = i * r + a * n + rotate.y, this;
    }
    random() {
      return this.x = Math.random(), this.y = Math.random(), this;
    }
    *[Symbol.iterator]() {
      yield this.x, yield this.y;
    }
  },
  Et = class {
    constructor(e = 0, t = 0, n = 0, r = 1) {
      this.isQuaternion = true, this._x = e, this._y = t, this._z = n, this._w = r;
    }
    static slerpFlat(slerp, flat, flatValue, flatInput, i, a, o) {
      let s = flatValue[flatInput + 0],
        c = flatValue[flatInput + 1],
        l = flatValue[flatInput + 2],
        u = flatValue[flatInput + 3],
        d = i[a + 0],
        f = i[a + 1],
        p = i[a + 2],
        m = i[a + 3];
      if (u !== m || s !== d || c !== f || l !== p) {
        let e = s * d + c * f + l * p + u * m;
        e < 0 && (d = -d, f = -f, p = -p, m = -m, e = -e);
        let t = 1 - o;
        if (e < .9995) {
          let n = Math.acos(e),
            r = Math.sin(n);
          t = Math.sin(t * n) / r, o = Math.sin(o * n) / r, s = s * t + d * o, c = c * t + f * o, l = l * t + p * o, u = u * t + m * o;
        } else {
          s = s * t + d * o, c = c * t + f * o, l = l * t + p * o, u = u * t + m * o;
          let e = 1 / Math.sqrt(s * s + c * c + l * l + u * u);
          s *= e, c *= e, l *= e, u *= e;
        }
      }
      slerp[flat] = s, slerp[flat + 1] = c, slerp[flat + 2] = l, slerp[flat + 3] = u;
    }
    static multiplyQuaternionsFlat(multiply, quaternions, flat, flatValue, flatInput, a) {
      let o = flat[flatValue],
        s = flat[flatValue + 1],
        c = flat[flatValue + 2],
        l = flat[flatValue + 3],
        u = flatInput[a],
        d = flatInput[a + 1],
        f = flatInput[a + 2],
        p = flatInput[a + 3];
      return multiply[quaternions] = o * p + l * u + s * f - c * d, multiply[quaternions + 1] = s * p + l * d + c * u - o * f, multiply[quaternions + 2] = c * p + l * f + o * d - s * u, multiply[quaternions + 3] = l * p - o * u - s * d - c * f, multiply;
    }
    get x() {
      return this._x;
    }
    set x(e) {
      this._x = e, this._onChangeCallback();
    }
    get y() {
      return this._y;
    }
    set y(e) {
      this._y = e, this._onChangeCallback();
    }
    get z() {
      return this._z;
    }
    set z(e) {
      this._z = e, this._onChangeCallback();
    }
    get w() {
      return this._w;
    }
    set w(e) {
      this._w = e, this._onChangeCallback();
    }
    set(e, t, n, r) {
      return this._x = e, this._y = t, this._z = n, this._w = r, this._onChangeCallback(), this;
    }
    clone() {
      return new this.constructor(this._x, this._y, this._z, this._w);
    }
    copy(e) {
      return this._x = e.x, this._y = e.y, this._z = e.z, this._w = e.w, this._onChangeCallback(), this;
    }
    setFromEuler(from, t = true) {
      let n = from._x,
        r = from._y,
        i = from._z,
        _order = from._order,
        o = Math.cos,
        s = Math.sin,
        c = o(n / 2),
        l = o(r / 2),
        u = o(i / 2),
        d = s(n / 2),
        f = s(r / 2),
        p = s(i / 2);
      switch (_order) {
        case `XYZ`:
          this._x = d * l * u + c * f * p, this._y = c * f * u - d * l * p, this._z = c * l * p + d * f * u, this._w = c * l * u - d * f * p;
          break;
        case `YXZ`:
          this._x = d * l * u + c * f * p, this._y = c * f * u - d * l * p, this._z = c * l * p - d * f * u, this._w = c * l * u + d * f * p;
          break;
        case `ZXY`:
          this._x = d * l * u - c * f * p, this._y = c * f * u + d * l * p, this._z = c * l * p + d * f * u, this._w = c * l * u - d * f * p;
          break;
        case `ZYX`:
          this._x = d * l * u - c * f * p, this._y = c * f * u + d * l * p, this._z = c * l * p - d * f * u, this._w = c * l * u + d * f * p;
          break;
        case `YZX`:
          this._x = d * l * u + c * f * p, this._y = c * f * u + d * l * p, this._z = c * l * p - d * f * u, this._w = c * l * u - d * f * p;
          break;
        case `XZY`:
          this._x = d * l * u - c * f * p, this._y = c * f * u - d * l * p, this._z = c * l * p + d * f * u, this._w = c * l * u + d * f * p;
          break;
        default:
          U(`Quaternion: .setFromEuler() encountered an unknown order: ` + _order);
      }
      return t === true && this._onChangeCallback(), this;
    }
    setFromAxisAngle(from, axis) {
      let n = axis / 2,
        r = Math.sin(n);
      return this._x = from.x * r, this._y = from.y * r, this._z = from.z * r, this._w = Math.cos(n), this._onChangeCallback(), this;
    }
    setFromRotationMatrix(from) {
      let elements = from.elements,
        n = elements[0],
        r = elements[4],
        i = elements[8],
        a = elements[1],
        o = elements[5],
        s = elements[9],
        c = elements[2],
        l = elements[6],
        u = elements[10],
        d = n + o + u;
      if (d > 0) {
        let e = .5 / Math.sqrt(d + 1);
        this._w = .25 / e, this._x = (l - s) * e, this._y = (i - c) * e, this._z = (a - r) * e;
      } else if (n > o && n > u) {
        let e = 2 * Math.sqrt(1 + n - o - u);
        this._w = (l - s) / e, this._x = .25 * e, this._y = (r + a) / e, this._z = (i + c) / e;
      } else if (o > u) {
        let e = 2 * Math.sqrt(1 + o - n - u);
        this._w = (i - c) / e, this._x = (r + a) / e, this._y = .25 * e, this._z = (s + l) / e;
      } else {
        let e = 2 * Math.sqrt(1 + u - n - o);
        this._w = (a - r) / e, this._x = (i + c) / e, this._y = (s + l) / e, this._z = .25 * e;
      }
      return this._onChangeCallback(), this;
    }
    setFromUnitVectors(from, unit) {
      let n = from.dot(unit) + 1;
      return n < 1e-8 ? (n = 0, Math.abs(from.x) > Math.abs(from.z) ? (this._x = -from.y, this._y = from.x, this._z = 0, this._w = n) : (this._x = 0, this._y = -from.z, this._z = from.y, this._w = n)) : (this._x = from.y * unit.z - from.z * unit.y, this._y = from.z * unit.x - from.x * unit.z, this._z = from.x * unit.y - from.y * unit.x, this._w = n), this.normalize();
    }
    angleTo(angle) {
      return 2 * Math.acos(Math.abs(G(this.dot(angle), -1, 1)));
    }
    rotateTowards(rotate, towards) {
      let n = this.angleTo(rotate);
      if (n === 0) return this;
      let r = Math.min(1, towards / n);
      return this.slerp(rotate, r), this;
    }
    identity() {
      return this.set(0, 0, 0, 1);
    }
    invert() {
      return this.conjugate();
    }
    conjugate() {
      return this._x *= -1, this._y *= -1, this._z *= -1, this._onChangeCallback(), this;
    }
    dot(e) {
      return this._x * e._x + this._y * e._y + this._z * e._z + this._w * e._w;
    }
    lengthSq() {
      return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w;
    }
    length() {
      return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w);
    }
    normalize() {
      let e = this.length();
      return e === 0 ? (this._x = 0, this._y = 0, this._z = 0, this._w = 1) : (e = 1 / e, this._x *= e, this._y *= e, this._z *= e, this._w *= e), this._onChangeCallback(), this;
    }
    multiply(multiply) {
      return this.multiplyQuaternions(this, multiply);
    }
    premultiply(premultiply) {
      return this.multiplyQuaternions(premultiply, this);
    }
    multiplyQuaternions(multiply, quaternions) {
      let n = multiply._x,
        r = multiply._y,
        i = multiply._z,
        a = multiply._w,
        o = quaternions._x,
        s = quaternions._y,
        c = quaternions._z,
        l = quaternions._w;
      return this._x = n * l + a * o + r * c - i * s, this._y = r * l + a * s + i * o - n * c, this._z = i * l + a * c + n * s - r * o, this._w = a * l - n * o - r * s - i * c, this._onChangeCallback(), this;
    }
    slerp(e, t) {
      let n = e._x,
        r = e._y,
        i = e._z,
        a = e._w,
        o = this.dot(e);
      o < 0 && (n = -n, r = -r, i = -i, a = -a, o = -o);
      let s = 1 - t;
      if (o < .9995) {
        let e = Math.acos(o),
          c = Math.sin(e);
        s = Math.sin(s * e) / c, t = Math.sin(t * e) / c, this._x = this._x * s + n * t, this._y = this._y * s + r * t, this._z = this._z * s + i * t, this._w = this._w * s + a * t, this._onChangeCallback();
      } else this._x = this._x * s + n * t, this._y = this._y * s + r * t, this._z = this._z * s + i * t, this._w = this._w * s + a * t, this.normalize();
      return this;
    }
    slerpQuaternions(slerp, quaternions, quaternionsValue) {
      return this.copy(slerp).slerp(quaternions, quaternionsValue);
    }
    random() {
      let e = 2 * Math.PI * Math.random(),
        t = 2 * Math.PI * Math.random(),
        n = Math.random(),
        r = Math.sqrt(1 - n),
        i = Math.sqrt(n);
      return this.set(r * Math.sin(e), r * Math.cos(e), i * Math.sin(t), i * Math.cos(t));
    }
    equals(equals) {
      return equals._x === this._x && equals._y === this._y && equals._z === this._z && equals._w === this._w;
    }
    fromArray(array, t = 0) {
      return this._x = array[t], this._y = array[t + 1], this._z = array[t + 2], this._w = array[t + 3], this._onChangeCallback(), this;
    }
    toArray(e = [], t = 0) {
      return e[t] = this._x, e[t + 1] = this._y, e[t + 2] = this._z, e[t + 3] = this._w, e;
    }
    fromBufferAttribute(buffer, attribute) {
      return this._x = buffer.getX(attribute), this._y = buffer.getY(attribute), this._z = buffer.getZ(attribute), this._w = buffer.getW(attribute), this._onChangeCallback(), this;
    }
    toJSON() {
      return this.toArray();
    }
    _onChange(e) {
      return this._onChangeCallback = e, this;
    }
    _onChangeCallback() {}
    *[Symbol.iterator]() {
      yield this._x, yield this._y, yield this._z, yield this._w;
    }
  },
  q = class e {
    static {
      e.prototype.isVector3 = true;
    }
    constructor(e = 0, t = 0, n = 0) {
      this.x = e, this.y = t, this.z = n;
    }
    set(e, t, n) {
      return n === undefined && (n = this.z), this.x = e, this.y = t, this.z = n, this;
    }
    setScalar(scalar) {
      return this.x = scalar, this.y = scalar, this.z = scalar, this;
    }
    setX(e) {
      return this.x = e, this;
    }
    setY(e) {
      return this.y = e, this;
    }
    setZ(e) {
      return this.z = e, this;
    }
    setComponent(component, componentValue) {
      switch (component) {
        case 0:
          this.x = componentValue;
          break;
        case 1:
          this.y = componentValue;
          break;
        case 2:
          this.z = componentValue;
          break;
        default:
          throw Error(`THREE.Vector3: index is out of range: ` + component);
      }
      return this;
    }
    getComponent(component) {
      switch (component) {
        case 0:
          return this.x;
        case 1:
          return this.y;
        case 2:
          return this.z;
        default:
          throw Error(`THREE.Vector3: index is out of range: ` + component);
      }
    }
    clone() {
      return new this.constructor(this.x, this.y, this.z);
    }
    copy(e) {
      return this.x = e.x, this.y = e.y, this.z = e.z, this;
    }
    add(e) {
      return this.x += e.x, this.y += e.y, this.z += e.z, this;
    }
    addScalar(scalar) {
      return this.x += scalar, this.y += scalar, this.z += scalar, this;
    }
    addVectors(vectors, vectorsValue) {
      return this.x = vectors.x + vectorsValue.x, this.y = vectors.y + vectorsValue.y, this.z = vectors.z + vectorsValue.z, this;
    }
    addScaledVector(scaled, vector) {
      return this.x += scaled.x * vector, this.y += scaled.y * vector, this.z += scaled.z * vector, this;
    }
    sub(e) {
      return this.x -= e.x, this.y -= e.y, this.z -= e.z, this;
    }
    subScalar(sub) {
      return this.x -= sub, this.y -= sub, this.z -= sub, this;
    }
    subVectors(sub, vectors) {
      return this.x = sub.x - vectors.x, this.y = sub.y - vectors.y, this.z = sub.z - vectors.z, this;
    }
    multiply(multiply) {
      return this.x *= multiply.x, this.y *= multiply.y, this.z *= multiply.z, this;
    }
    multiplyScalar(multiply) {
      return this.x *= multiply, this.y *= multiply, this.z *= multiply, this;
    }
    multiplyVectors(multiply, vectors) {
      return this.x = multiply.x * vectors.x, this.y = multiply.y * vectors.y, this.z = multiply.z * vectors.z, this;
    }
    applyEuler(euler) {
      return this.applyQuaternion(Ot.setFromEuler(euler));
    }
    applyAxisAngle(axis, angle) {
      return this.applyQuaternion(Ot.setFromAxisAngle(axis, angle));
    }
    applyMatrix3(matrix3) {
      let t = this.x,
        n = this.y,
        r = this.z,
        elements = matrix3.elements;
      return this.x = elements[0] * t + elements[3] * n + elements[6] * r, this.y = elements[1] * t + elements[4] * n + elements[7] * r, this.z = elements[2] * t + elements[5] * n + elements[8] * r, this;
    }
    applyNormalMatrix(normal) {
      return this.applyMatrix3(normal).normalize();
    }
    applyMatrix4(matrix4) {
      let t = this.x,
        n = this.y,
        r = this.z,
        elements = matrix4.elements,
        a = 1 / (elements[3] * t + elements[7] * n + elements[11] * r + elements[15]);
      return this.x = (elements[0] * t + elements[4] * n + elements[8] * r + elements[12]) * a, this.y = (elements[1] * t + elements[5] * n + elements[9] * r + elements[13]) * a, this.z = (elements[2] * t + elements[6] * n + elements[10] * r + elements[14]) * a, this;
    }
    applyQuaternion(quaternion) {
      let t = this.x,
        n = this.y,
        r = this.z,
        i = quaternion.x,
        a = quaternion.y,
        o = quaternion.z,
        s = quaternion.w,
        c = 2 * (a * r - o * n),
        l = 2 * (o * t - i * r),
        u = 2 * (i * n - a * t);
      return this.x = t + s * c + a * u - o * l, this.y = n + s * l + o * c - i * u, this.z = r + s * u + i * l - a * c, this;
    }
    project(project) {
      return this.applyMatrix4(project.matrixWorldInverse).applyMatrix4(project.projectionMatrix);
    }
    unproject(unproject) {
      return this.applyMatrix4(unproject.projectionMatrixInverse).applyMatrix4(unproject.matrixWorld);
    }
    transformDirection(transform) {
      let t = this.x,
        n = this.y,
        r = this.z,
        elements = transform.elements;
      return this.x = elements[0] * t + elements[4] * n + elements[8] * r, this.y = elements[1] * t + elements[5] * n + elements[9] * r, this.z = elements[2] * t + elements[6] * n + elements[10] * r, this.normalize();
    }
    divide(divide) {
      return this.x /= divide.x, this.y /= divide.y, this.z /= divide.z, this;
    }
    divideScalar(divide) {
      return this.multiplyScalar(1 / divide);
    }
    min(e) {
      return this.x = Math.min(this.x, e.x), this.y = Math.min(this.y, e.y), this.z = Math.min(this.z, e.z), this;
    }
    max(e) {
      return this.x = Math.max(this.x, e.x), this.y = Math.max(this.y, e.y), this.z = Math.max(this.z, e.z), this;
    }
    clamp(e, t) {
      return this.x = G(this.x, e.x, t.x), this.y = G(this.y, e.y, t.y), this.z = G(this.z, e.z, t.z), this;
    }
    clampScalar(clamp, scalar) {
      return this.x = G(this.x, clamp, scalar), this.y = G(this.y, clamp, scalar), this.z = G(this.z, clamp, scalar), this;
    }
    clampLength(clamp, length) {
      let n = this.length();
      return this.divideScalar(n || 1).multiplyScalar(G(n, clamp, length));
    }
    floor() {
      return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this.z = Math.floor(this.z), this;
    }
    ceil() {
      return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this.z = Math.ceil(this.z), this;
    }
    round() {
      return this.x = Math.round(this.x), this.y = Math.round(this.y), this.z = Math.round(this.z), this;
    }
    roundToZero() {
      return this.x = Math.trunc(this.x), this.y = Math.trunc(this.y), this.z = Math.trunc(this.z), this;
    }
    negate() {
      return this.x = -this.x, this.y = -this.y, this.z = -this.z, this;
    }
    dot(e) {
      return this.x * e.x + this.y * e.y + this.z * e.z;
    }
    lengthSq() {
      return this.x * this.x + this.y * this.y + this.z * this.z;
    }
    length() {
      return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }
    manhattanLength() {
      return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z);
    }
    normalize() {
      return this.divideScalar(this.length() || 1);
    }
    setLength(length) {
      return this.normalize().multiplyScalar(length);
    }
    lerp(e, t) {
      return this.x += (e.x - this.x) * t, this.y += (e.y - this.y) * t, this.z += (e.z - this.z) * t, this;
    }
    lerpVectors(lerp, vectors, vectorsValue) {
      return this.x = lerp.x + (vectors.x - lerp.x) * vectorsValue, this.y = lerp.y + (vectors.y - lerp.y) * vectorsValue, this.z = lerp.z + (vectors.z - lerp.z) * vectorsValue, this;
    }
    cross(e) {
      return this.crossVectors(this, e);
    }
    crossVectors(cross, vectors) {
      let n = cross.x,
        r = cross.y,
        i = cross.z,
        a = vectors.x,
        o = vectors.y,
        s = vectors.z;
      return this.x = r * s - i * o, this.y = i * a - n * s, this.z = n * o - r * a, this;
    }
    projectOnVector(project) {
      let lengthSq = project.lengthSq();
      if (lengthSq === 0) return this.set(0, 0, 0);
      let n = project.dot(this) / lengthSq;
      return this.copy(project).multiplyScalar(n);
    }
    projectOnPlane(project) {
      return Dt.copy(this).projectOnVector(project), this.sub(Dt);
    }
    reflect(reflect) {
      return this.sub(Dt.copy(reflect).multiplyScalar(2 * this.dot(reflect)));
    }
    angleTo(angle) {
      let t = Math.sqrt(this.lengthSq() * angle.lengthSq());
      if (t === 0) return Math.PI / 2;
      let n = this.dot(angle) / t;
      return Math.acos(G(n, -1, 1));
    }
    distanceTo(distance) {
      return Math.sqrt(this.distanceToSquared(distance));
    }
    distanceToSquared(distance) {
      let t = this.x - distance.x,
        n = this.y - distance.y,
        r = this.z - distance.z;
      return t * t + n * n + r * r;
    }
    manhattanDistanceTo(manhattan) {
      return Math.abs(this.x - manhattan.x) + Math.abs(this.y - manhattan.y) + Math.abs(this.z - manhattan.z);
    }
    setFromSpherical(from) {
      return this.setFromSphericalCoords(from.radius, from.phi, from.theta);
    }
    setFromSphericalCoords(from, spherical, coords) {
      let r = Math.sin(spherical) * from;
      return this.x = r * Math.sin(coords), this.y = Math.cos(spherical) * from, this.z = r * Math.cos(coords), this;
    }
    setFromCylindrical(from) {
      return this.setFromCylindricalCoords(from.radius, from.theta, from.y);
    }
    setFromCylindricalCoords(from, cylindrical, coords) {
      return this.x = from * Math.sin(cylindrical), this.y = coords, this.z = from * Math.cos(cylindrical), this;
    }
    setFromMatrixPosition(from) {
      let elements = from.elements;
      return this.x = elements[12], this.y = elements[13], this.z = elements[14], this;
    }
    setFromMatrixScale(from) {
      let t = this.setFromMatrixColumn(from, 0).length(),
        n = this.setFromMatrixColumn(from, 1).length(),
        r = this.setFromMatrixColumn(from, 2).length();
      return this.x = t, this.y = n, this.z = r, this;
    }
    setFromMatrixColumn(from, matrix) {
      return this.fromArray(from.elements, matrix * 4);
    }
    setFromMatrix3Column(from, matrix3) {
      return this.fromArray(from.elements, matrix3 * 3);
    }
    setFromEuler(from) {
      return this.x = from._x, this.y = from._y, this.z = from._z, this;
    }
    setFromColor(from) {
      return this.x = from.r, this.y = from.g, this.z = from.b, this;
    }
    equals(equals) {
      return equals.x === this.x && equals.y === this.y && equals.z === this.z;
    }
    fromArray(array, t = 0) {
      return this.x = array[t], this.y = array[t + 1], this.z = array[t + 2], this;
    }
    toArray(e = [], t = 0) {
      return e[t] = this.x, e[t + 1] = this.y, e[t + 2] = this.z, e;
    }
    fromBufferAttribute(buffer, attribute) {
      return this.x = buffer.getX(attribute), this.y = buffer.getY(attribute), this.z = buffer.getZ(attribute), this;
    }
    random() {
      return this.x = Math.random(), this.y = Math.random(), this.z = Math.random(), this;
    }
    randomDirection() {
      let e = Math.random() * Math.PI * 2,
        t = Math.random() * 2 - 1,
        n = Math.sqrt(1 - t * t);
      return this.x = n * Math.cos(e), this.y = t, this.z = n * Math.sin(e), this;
    }
    *[Symbol.iterator]() {
      yield this.x, yield this.y, yield this.z;
    }
  },
  Dt = new q(),
  Ot = new Et(),
  J = class e {
    static {
      e.prototype.isMatrix3 = true;
    }
    constructor(constructor, constructorValue, constructorInput, r, i, a, o, s, c) {
      this.elements = [1, 0, 0, 0, 1, 0, 0, 0, 1], constructor !== undefined && this.set(constructor, constructorValue, constructorInput, r, i, a, o, s, c);
    }
    set(e, t, n, r, i, a, o, s, c) {
      let elements = this.elements;
      return elements[0] = e, elements[1] = r, elements[2] = o, elements[3] = t, elements[4] = i, elements[5] = s, elements[6] = n, elements[7] = a, elements[8] = c, this;
    }
    identity() {
      return this.set(1, 0, 0, 0, 1, 0, 0, 0, 1), this;
    }
    copy(e) {
      let elements = this.elements,
        n = e.elements;
      return elements[0] = n[0], elements[1] = n[1], elements[2] = n[2], elements[3] = n[3], elements[4] = n[4], elements[5] = n[5], elements[6] = n[6], elements[7] = n[7], elements[8] = n[8], this;
    }
    extractBasis(basis, basisValue, basisInput) {
      return basis.setFromMatrix3Column(this, 0), basisValue.setFromMatrix3Column(this, 1), basisInput.setFromMatrix3Column(this, 2), this;
    }
    setFromMatrix4(from) {
      let elements = from.elements;
      return this.set(elements[0], elements[4], elements[8], elements[1], elements[5], elements[9], elements[2], elements[6], elements[10]), this;
    }
    multiply(multiply) {
      return this.multiplyMatrices(this, multiply);
    }
    premultiply(premultiply) {
      return this.multiplyMatrices(premultiply, this);
    }
    multiplyMatrices(multiply, matrices) {
      let elements = multiply.elements,
        r = matrices.elements,
        i = this.elements,
        a = elements[0],
        o = elements[3],
        s = elements[6],
        c = elements[1],
        l = elements[4],
        u = elements[7],
        d = elements[2],
        f = elements[5],
        p = elements[8],
        m = r[0],
        h = r[3],
        g = r[6],
        _ = r[1],
        v = r[4],
        y = r[7],
        b = r[2],
        x = r[5],
        S = r[8];
      return i[0] = a * m + o * _ + s * b, i[3] = a * h + o * v + s * x, i[6] = a * g + o * y + s * S, i[1] = c * m + l * _ + u * b, i[4] = c * h + l * v + u * x, i[7] = c * g + l * y + u * S, i[2] = d * m + f * _ + p * b, i[5] = d * h + f * v + p * x, i[8] = d * g + f * y + p * S, this;
    }
    multiplyScalar(multiply) {
      let elements = this.elements;
      return elements[0] *= multiply, elements[3] *= multiply, elements[6] *= multiply, elements[1] *= multiply, elements[4] *= multiply, elements[7] *= multiply, elements[2] *= multiply, elements[5] *= multiply, elements[8] *= multiply, this;
    }
    determinant() {
      let elements = this.elements,
        t = elements[0],
        n = elements[1],
        r = elements[2],
        i = elements[3],
        a = elements[4],
        o = elements[5],
        s = elements[6],
        c = elements[7],
        l = elements[8];
      return t * a * l - t * o * c - n * i * l + n * o * s + r * i * c - r * a * s;
    }
    invert() {
      let elements = this.elements,
        t = elements[0],
        n = elements[1],
        r = elements[2],
        i = elements[3],
        a = elements[4],
        o = elements[5],
        s = elements[6],
        c = elements[7],
        l = elements[8],
        u = l * a - o * c,
        d = o * s - l * i,
        f = c * i - a * s,
        p = t * u + n * d + r * f;
      if (p === 0) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0);
      let m = 1 / p;
      return elements[0] = u * m, elements[1] = (r * c - l * n) * m, elements[2] = (o * n - r * a) * m, elements[3] = d * m, elements[4] = (l * t - r * s) * m, elements[5] = (r * i - o * t) * m, elements[6] = f * m, elements[7] = (n * s - c * t) * m, elements[8] = (a * t - n * i) * m, this;
    }
    transpose() {
      let ratio,
        elements = this.elements;
      return ratio = elements[1], elements[1] = elements[3], elements[3] = ratio, ratio = elements[2], elements[2] = elements[6], elements[6] = ratio, ratio = elements[5], elements[5] = elements[7], elements[7] = ratio, this;
    }
    getNormalMatrix(normal) {
      return this.setFromMatrix4(normal).invert().transpose();
    }
    transposeIntoArray(transpose) {
      let elements = this.elements;
      return transpose[0] = elements[0], transpose[1] = elements[3], transpose[2] = elements[6], transpose[3] = elements[1], transpose[4] = elements[4], transpose[5] = elements[7], transpose[6] = elements[2], transpose[7] = elements[5], transpose[8] = elements[8], this;
    }
    setUvTransform(transform, transformValue, transformInput, r, i, a, o) {
      let s = Math.cos(i),
        c = Math.sin(i);
      return this.set(transformInput * s, transformInput * c, -transformInput * (s * a + c * o) + a + transform, -r * c, r * s, -r * (-c * a + s * o) + o + transformValue, 0, 0, 1), this;
    }
    scale(e, t) {
      return Xe(`Matrix3: .scale() is deprecated. Use .makeScale() instead.`), this.premultiply(kt.makeScale(e, t)), this;
    }
    rotate(rotate) {
      return Xe(`Matrix3: .rotate() is deprecated. Use .makeRotation() instead.`), this.premultiply(kt.makeRotation(-rotate)), this;
    }
    translate(translate, translateValue) {
      return Xe(`Matrix3: .translate() is deprecated. Use .makeTranslation() instead.`), this.premultiply(kt.makeTranslation(translate, translateValue)), this;
    }
    makeTranslation(translation, translationValue) {
      return translation.isVector2 ? this.set(1, 0, translation.x, 0, 1, translation.y, 0, 0, 1) : this.set(1, 0, translation, 0, 1, translationValue, 0, 0, 1), this;
    }
    makeRotation(rotation) {
      let t = Math.cos(rotation),
        n = Math.sin(rotation);
      return this.set(t, -n, 0, n, t, 0, 0, 0, 1), this;
    }
    makeScale(scale, scaleValue) {
      return this.set(scale, 0, 0, 0, scaleValue, 0, 0, 0, 1), this;
    }
    equals(equals) {
      let elements = this.elements,
        n = equals.elements;
      for (let e = 0; e < 9; e++) if (elements[e] !== n[e]) return false;
      return true;
    }
    fromArray(array, t = 0) {
      for (let n = 0; n < 9; n++) this.elements[n] = array[n + t];
      return this;
    }
    toArray(e = [], t = 0) {
      let elements = this.elements;
      return e[t] = elements[0], e[t + 1] = elements[1], e[t + 2] = elements[2], e[t + 3] = elements[3], e[t + 4] = elements[4], e[t + 5] = elements[5], e[t + 6] = elements[6], e[t + 7] = elements[7], e[t + 8] = elements[8], e;
    }
    clone() {
      return new this.constructor().fromArray(this.elements);
    }
  },
  kt = new J(),
  At = new J().set(.4123908, .3575843, .1804808, .212639, .7151687, .0721923, .0193308, .1191948, .9505322),
  jt = new J().set(3.2409699, -1.5373832, -.4986108, -.9692436, 1.8759675, .0415551, .0556301, -.203977, 1.0569715);
function Mt() {
  let e = {
      enabled: true,
      workingColorSpace: Ie,
      spaces: {},
      convert: function (e, t, n) {
        return this.enabled === false || t === n || !t || !n ? e : (this.spaces[t].transfer === `srgb` && (e.r = Nt(e.r), e.g = Nt(e.g), e.b = Nt(e.b)), this.spaces[t].primaries !== this.spaces[n].primaries && (e.applyMatrix3(this.spaces[t].toXYZ), e.applyMatrix3(this.spaces[n].fromXYZ)), this.spaces[n].transfer === `srgb` && (e.r = Pt(e.r), e.g = Pt(e.g), e.b = Pt(e.b)), e);
      },
      workingToColorSpace: function (e, t) {
        return this.convert(e, this.workingColorSpace, t);
      },
      colorSpaceToWorking: function (e, t) {
        return this.convert(e, t, this.workingColorSpace);
      },
      getPrimaries: function (e) {
        return this.spaces[e].primaries;
      },
      getTransfer: function (e) {
        return e === `` ? Le : this.spaces[e].transfer;
      },
      getToneMappingMode: function (e) {
        return this.spaces[e].outputColorSpaceConfig.toneMappingMode || `standard`;
      },
      getLuminanceCoefficients: function (e, t = this.workingColorSpace) {
        return e.fromArray(this.spaces[t].luminanceCoefficients);
      },
      define: function (e) {
        Object.assign(this.spaces, e);
      },
      _getMatrix: function (e, t, n) {
        return e.copy(this.spaces[t].toXYZ).multiply(this.spaces[n].fromXYZ);
      },
      _getDrawingBufferColorSpace: function (e) {
        return this.spaces[e].outputColorSpaceConfig.drawingBufferColorSpace;
      },
      _getUnpackColorSpace: function (e = this.workingColorSpace) {
        return this.spaces[e].workingColorSpaceConfig.unpackColorSpace;
      },
      fromWorkingColorSpace: function (t, n) {
        return Xe(`ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace().`), e.workingToColorSpace(t, n);
      },
      toWorkingColorSpace: function (t, n) {
        return Xe(`ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking().`), e.colorSpaceToWorking(t, n);
      }
    },
    t = [.64, .33, .3, .6, .15, .06],
    n = [.2126, .7152, .0722],
    r = [.3127, .329];
  return e.define({
    [Ie]: {
      primaries: t,
      whitePoint: r,
      transfer: Le,
      toXYZ: At,
      fromXYZ: jt,
      luminanceCoefficients: n,
      workingColorSpaceConfig: {
        unpackColorSpace: Fe
      },
      outputColorSpaceConfig: {
        drawingBufferColorSpace: Fe
      }
    },
    [Fe]: {
      primaries: t,
      whitePoint: r,
      transfer: Re,
      toXYZ: At,
      fromXYZ: jt,
      luminanceCoefficients: n,
      outputColorSpaceConfig: {
        drawingBufferColorSpace: Fe
      }
    }
  }), e;
}
var Y = Mt();
function Nt(e) {
  return e < .04045 ? e * .0773993808 : (e * .9478672986 + .0521327014) ** 2.4;
}
function Pt(e) {
  return e < .0031308 ? e * 12.92 : 1.055 * e ** .41666 - .055;
}
var Ft,
  It = class {
    static getDataURL(data, t = `image/png`) {
      if (/^data:/i.test(data.src) || typeof HTMLCanvasElement > `u`) return data.src;
      let count;
      if (data instanceof HTMLCanvasElement) count = data;else {
        Ft === undefined && (Ft = Ge(`canvas`)), Ft.width = data.width, Ft.height = data.height;
        let context = Ft.getContext(`2d`);
        data instanceof ImageData ? context.putImageData(data, 0, 0) : context.drawImage(data, 0, 0, data.width, data.height), count = Ft;
      }
      return count.toDataURL(t);
    }
    static sRGBToLinear(linear) {
      if (typeof HTMLImageElement < `u` && linear instanceof HTMLImageElement || typeof HTMLCanvasElement < `u` && linear instanceof HTMLCanvasElement || typeof ImageBitmap < `u` && linear instanceof ImageBitmap) {
        let t = Ge(`canvas`);
        t.width = linear.width, t.height = linear.height;
        let context = t.getContext(`2d`);
        context.drawImage(linear, 0, 0, linear.width, linear.height);
        let imageData = context.getImageData(0, 0, linear.width, linear.height),
          i = imageData.data;
        for (let e = 0; e < i.length; e++) i[e] = Nt(i[e] / 255) * 255;
        return context.putImageData(imageData, 0, 0), t;
      }
      if (linear.data) {
        let part = linear.data.slice(0);
        for (let e = 0; e < part.length; e++) part instanceof Uint8Array || part instanceof Uint8ClampedArray ? part[e] = Math.floor(Nt(part[e] / 255) * 255) : part[e] = Nt(part[e]);
        return {
          data: part,
          width: linear.width,
          height: linear.height
        };
      }
      return U(`ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied.`), linear;
    }
  },
  Lt = 0,
  Rt = class {
    constructor(e = null) {
      this.isTextureSource = true, Object.defineProperty(this, "id", {
        value: Lt++
      }), this.uuid = it(), this.data = e, this.dataReady = true, this.version = 0;
    }
    getSize(size) {
      let t = this.data;
      return typeof HTMLVideoElement < `u` && t instanceof HTMLVideoElement ? size.set(t.videoWidth, t.videoHeight, 0) : typeof VideoFrame < `u` && t instanceof VideoFrame ? size.set(t.displayWidth, t.displayHeight, 0) : t === null ? size.set(0, 0, 0) : size.set(t.width, t.height, t.depth || 0), size;
    }
    set needsUpdate(needs) {
      needs === true && this.version++;
    }
    toJSON(items) {
      let fallbackValue = items === undefined || typeof items == `string`;
      if (!fallbackValue && items.images[this.uuid] !== undefined) return items.images[this.uuid];
      let request = {
          uuid: this.uuid,
          url: ``
        },
        r = this.data;
      if (r !== null) {
        let ratio;
        if (Array.isArray(r)) {
          ratio = [];
          for (let t = 0, n = r.length; t < n; t++) r[t].isDataTexture ? ratio.push(zt(r[t].image)) : ratio.push(zt(r[t]));
        } else ratio = zt(r);
        request.url = ratio;
      }
      return fallbackValue || (items.images[this.uuid] = request), request;
    }
  };
function zt(e) {
  return typeof HTMLImageElement < `u` && e instanceof HTMLImageElement || typeof HTMLCanvasElement < `u` && e instanceof HTMLCanvasElement || typeof ImageBitmap < `u` && e instanceof ImageBitmap ? It.getDataURL(e) : e.data ? {
    data: Array.from(e.data),
    width: e.width,
    height: e.height,
    type: e.data.constructor.name
  } : (U(`Texture: Unable to serialize Texture.`), {});
}
var Bt = 0,
  Vt = new q(),
  Ht = class e extends $e {
    constructor(t = e.DEFAULT_IMAGE, n = e.DEFAULT_MAPPING, i = r, a = r, o = c, s = u, l = E, f = d, p = e.DEFAULT_ANISOTROPY, m = ``) {
      super(), this.isTexture = true, Object.defineProperty(this, "id", {
        value: Bt++
      }), this.uuid = it(), this.name = ``, this.source = new Rt(t), this.mipmaps = [], this.mapping = n, this.channel = 0, this.wrapS = i, this.wrapT = a, this.magFilter = o, this.minFilter = s, this.anisotropy = p, this.format = l, this.internalFormat = null, this.type = f, this.offset = new K(0, 0), this.repeat = new K(1, 1), this.center = new K(0, 0), this.rotation = 0, this.matrixAutoUpdate = true, this.matrix = new J(), this.generateMipmaps = true, this.premultiplyAlpha = false, this.flipY = true, this.unpackAlignment = 4, this.colorSpace = m, this.userData = {}, this.updateRanges = [], this.version = 0, this.onUpdate = null, this.renderTarget = null, this.isRenderTargetTexture = false, this.isArrayTexture = !!(t && t.depth && t.depth > 1), this.pmremVersion = 0, this.normalized = false;
    }
    get width() {
      return this.source.getSize(Vt).x;
    }
    get height() {
      return this.source.getSize(Vt).y;
    }
    get depth() {
      return this.source.getSize(Vt).z;
    }
    get image() {
      return this.source.data;
    }
    set image(e) {
      this.source.data = e;
    }
    updateMatrix() {
      this.matrix.setUvTransform(this.offset.x, this.offset.y, this.repeat.x, this.repeat.y, this.rotation, this.center.x, this.center.y);
    }
    addUpdateRange(update, range) {
      this.updateRanges.push({
        start: update,
        count: range
      });
    }
    clearUpdateRanges() {
      this.updateRanges.length = 0;
    }
    clone() {
      return new this.constructor().copy(this);
    }
    copy(e) {
      return this.name = e.name, this.source = e.source, this.mipmaps = e.mipmaps.slice(0), this.mapping = e.mapping, this.channel = e.channel, this.wrapS = e.wrapS, this.wrapT = e.wrapT, this.magFilter = e.magFilter, this.minFilter = e.minFilter, this.anisotropy = e.anisotropy, this.format = e.format, this.internalFormat = e.internalFormat, this.type = e.type, this.normalized = e.normalized, this.offset.copy(e.offset), this.repeat.copy(e.repeat), this.center.copy(e.center), this.rotation = e.rotation, this.matrixAutoUpdate = e.matrixAutoUpdate, this.matrix.copy(e.matrix), this.generateMipmaps = e.generateMipmaps, this.premultiplyAlpha = e.premultiplyAlpha, this.flipY = e.flipY, this.unpackAlignment = e.unpackAlignment, this.colorSpace = e.colorSpace, this.renderTarget = e.renderTarget, this.isRenderTargetTexture = e.isRenderTargetTexture, this.isArrayTexture = e.isArrayTexture, this.userData = JSON.parse(JSON.stringify(e.userData)), this.needsUpdate = true, this;
    }
    setValues(values) {
      for (let total in values) {
        let n = values[total];
        if (n === undefined) {
          U(`Texture.setValues(): parameter '${total}' has value of undefined.`);
          continue;
        }
        let r = this[total];
        if (r === undefined) {
          U(`Texture.setValues(): property '${total}' does not exist.`);
          continue;
        }
        r && n && r.isVector2 && n.isVector2 || r && n && r.isVector3 && n.isVector3 || r && n && r.isMatrix3 && n.isMatrix3 ? r.copy(n) : this[total] = n;
      }
    }
    toJSON(e) {
      let fallbackValue = e === undefined || typeof e == `string`;
      if (!fallbackValue && e.textures[this.uuid] !== undefined) return e.textures[this.uuid];
      let n = {
        metadata: {
          version: 4.7,
          type: `Texture`,
          generator: `Texture.toJSON`
        },
        uuid: this.uuid,
        name: this.name,
        image: this.source.toJSON(e).uuid,
        mapping: this.mapping,
        channel: this.channel,
        repeat: [this.repeat.x, this.repeat.y],
        offset: [this.offset.x, this.offset.y],
        center: [this.center.x, this.center.y],
        rotation: this.rotation,
        wrap: [this.wrapS, this.wrapT],
        format: this.format,
        internalFormat: this.internalFormat,
        type: this.type,
        normalized: this.normalized,
        colorSpace: this.colorSpace,
        minFilter: this.minFilter,
        magFilter: this.magFilter,
        anisotropy: this.anisotropy,
        flipY: this.flipY,
        generateMipmaps: this.generateMipmaps,
        premultiplyAlpha: this.premultiplyAlpha,
        unpackAlignment: this.unpackAlignment
      };
      return Object.keys(this.userData).length > 0 && (n.userData = this.userData), fallbackValue || (e.textures[this.uuid] = n), n;
    }
    dispose() {
      this.dispatchEvent({
        type: `dispose`
      });
    }
    transformUv(transform) {
      if (this.mapping !== 300) return transform;
      if (transform.applyMatrix3(this.matrix), transform.x < 0 || transform.x > 1) switch (this.wrapS) {
        case n:
          transform.x -= Math.floor(transform.x);
          break;
        case r:
          transform.x = transform.x < 0 ? 0 : 1;
          break;
        case i:
          Math.abs(Math.floor(transform.x) % 2) === 1 ? transform.x = Math.ceil(transform.x) - transform.x : transform.x -= Math.floor(transform.x);
      }
      if (transform.y < 0 || transform.y > 1) switch (this.wrapT) {
        case n:
          transform.y -= Math.floor(transform.y);
          break;
        case r:
          transform.y = transform.y < 0 ? 0 : 1;
          break;
        case i:
          Math.abs(Math.floor(transform.y) % 2) === 1 ? transform.y = Math.ceil(transform.y) - transform.y : transform.y -= Math.floor(transform.y);
      }
      return this.flipY && (transform.y = 1 - transform.y), transform;
    }
    set needsUpdate(needs) {
      needs === true && (this.version++, this.source.needsUpdate = true);
    }
    set needsPMREMUpdate(needs) {
      needs === true && this.pmremVersion++;
    }
  };
Ht.DEFAULT_IMAGE = null, Ht.DEFAULT_MAPPING = 300, Ht.DEFAULT_ANISOTROPY = 1;
var Ut = class e {
    static {
      e.prototype.isVector4 = true;
    }
    constructor(e = 0, t = 0, n = 0, r = 1) {
      this.x = e, this.y = t, this.z = n, this.w = r;
    }
    get width() {
      return this.z;
    }
    set width(e) {
      this.z = e;
    }
    get height() {
      return this.w;
    }
    set height(height) {
      this.w = height;
    }
    set(e, t, n, r) {
      return this.x = e, this.y = t, this.z = n, this.w = r, this;
    }
    setScalar(scalar) {
      return this.x = scalar, this.y = scalar, this.z = scalar, this.w = scalar, this;
    }
    setX(e) {
      return this.x = e, this;
    }
    setY(e) {
      return this.y = e, this;
    }
    setZ(e) {
      return this.z = e, this;
    }
    setW(e) {
      return this.w = e, this;
    }
    setComponent(component, componentValue) {
      switch (component) {
        case 0:
          this.x = componentValue;
          break;
        case 1:
          this.y = componentValue;
          break;
        case 2:
          this.z = componentValue;
          break;
        case 3:
          this.w = componentValue;
          break;
        default:
          throw Error(`THREE.Vector4: index is out of range: ` + component);
      }
      return this;
    }
    getComponent(component) {
      switch (component) {
        case 0:
          return this.x;
        case 1:
          return this.y;
        case 2:
          return this.z;
        case 3:
          return this.w;
        default:
          throw Error(`THREE.Vector4: index is out of range: ` + component);
      }
    }
    clone() {
      return new this.constructor(this.x, this.y, this.z, this.w);
    }
    copy(e) {
      return this.x = e.x, this.y = e.y, this.z = e.z, this.w = e.w === undefined ? 1 : e.w, this;
    }
    add(e) {
      return this.x += e.x, this.y += e.y, this.z += e.z, this.w += e.w, this;
    }
    addScalar(scalar) {
      return this.x += scalar, this.y += scalar, this.z += scalar, this.w += scalar, this;
    }
    addVectors(vectors, vectorsValue) {
      return this.x = vectors.x + vectorsValue.x, this.y = vectors.y + vectorsValue.y, this.z = vectors.z + vectorsValue.z, this.w = vectors.w + vectorsValue.w, this;
    }
    addScaledVector(scaled, vector) {
      return this.x += scaled.x * vector, this.y += scaled.y * vector, this.z += scaled.z * vector, this.w += scaled.w * vector, this;
    }
    sub(e) {
      return this.x -= e.x, this.y -= e.y, this.z -= e.z, this.w -= e.w, this;
    }
    subScalar(sub) {
      return this.x -= sub, this.y -= sub, this.z -= sub, this.w -= sub, this;
    }
    subVectors(sub, vectors) {
      return this.x = sub.x - vectors.x, this.y = sub.y - vectors.y, this.z = sub.z - vectors.z, this.w = sub.w - vectors.w, this;
    }
    multiply(multiply) {
      return this.x *= multiply.x, this.y *= multiply.y, this.z *= multiply.z, this.w *= multiply.w, this;
    }
    multiplyScalar(multiply) {
      return this.x *= multiply, this.y *= multiply, this.z *= multiply, this.w *= multiply, this;
    }
    applyMatrix4(matrix4) {
      let t = this.x,
        n = this.y,
        r = this.z,
        i = this.w,
        elements = matrix4.elements;
      return this.x = elements[0] * t + elements[4] * n + elements[8] * r + elements[12] * i, this.y = elements[1] * t + elements[5] * n + elements[9] * r + elements[13] * i, this.z = elements[2] * t + elements[6] * n + elements[10] * r + elements[14] * i, this.w = elements[3] * t + elements[7] * n + elements[11] * r + elements[15] * i, this;
    }
    divide(divide) {
      return this.x /= divide.x, this.y /= divide.y, this.z /= divide.z, this.w /= divide.w, this;
    }
    divideScalar(divide) {
      return this.multiplyScalar(1 / divide);
    }
    setAxisAngleFromQuaternion(axis) {
      this.w = 2 * Math.acos(axis.w);
      let t = Math.sqrt(1 - axis.w * axis.w);
      return t < 1e-4 ? (this.x = 1, this.y = 0, this.z = 0) : (this.x = axis.x / t, this.y = axis.y / t, this.z = axis.z / t), this;
    }
    setAxisAngleFromRotationMatrix(axis) {
      let total,
        count,
        r,
        i,
        a = .01,
        o = .1,
        elements = axis.elements,
        c = elements[0],
        l = elements[4],
        u = elements[8],
        d = elements[1],
        f = elements[5],
        p = elements[9],
        m = elements[2],
        h = elements[6],
        g = elements[10];
      if (Math.abs(l - d) < a && Math.abs(u - m) < a && Math.abs(p - h) < a) {
        if (Math.abs(l + d) < o && Math.abs(u + m) < o && Math.abs(p + h) < o && Math.abs(c + f + g - 3) < o) return this.set(1, 0, 0, 0), this;
        total = Math.PI;
        let e = (c + 1) / 2,
          s = (f + 1) / 2,
          _ = (g + 1) / 2,
          v = (l + d) / 4,
          y = (u + m) / 4,
          b = (p + h) / 4;
        return e > s && e > _ ? e < a ? (count = 0, r = .707106781, i = .707106781) : (count = Math.sqrt(e), r = v / count, i = y / count) : s > _ ? s < a ? (count = .707106781, r = 0, i = .707106781) : (r = Math.sqrt(s), count = v / r, i = b / r) : _ < a ? (count = .707106781, r = .707106781, i = 0) : (i = Math.sqrt(_), count = y / i, r = b / i), this.set(count, r, i, total), this;
      }
      let _ = Math.sqrt((h - p) * (h - p) + (u - m) * (u - m) + (d - l) * (d - l));
      return Math.abs(_) < .001 && (_ = 1), this.x = (h - p) / _, this.y = (u - m) / _, this.z = (d - l) / _, this.w = Math.acos((c + f + g - 1) / 2), this;
    }
    setFromMatrixPosition(from) {
      let elements = from.elements;
      return this.x = elements[12], this.y = elements[13], this.z = elements[14], this.w = elements[15], this;
    }
    min(e) {
      return this.x = Math.min(this.x, e.x), this.y = Math.min(this.y, e.y), this.z = Math.min(this.z, e.z), this.w = Math.min(this.w, e.w), this;
    }
    max(e) {
      return this.x = Math.max(this.x, e.x), this.y = Math.max(this.y, e.y), this.z = Math.max(this.z, e.z), this.w = Math.max(this.w, e.w), this;
    }
    clamp(e, t) {
      return this.x = G(this.x, e.x, t.x), this.y = G(this.y, e.y, t.y), this.z = G(this.z, e.z, t.z), this.w = G(this.w, e.w, t.w), this;
    }
    clampScalar(clamp, scalar) {
      return this.x = G(this.x, clamp, scalar), this.y = G(this.y, clamp, scalar), this.z = G(this.z, clamp, scalar), this.w = G(this.w, clamp, scalar), this;
    }
    clampLength(clamp, length) {
      let n = this.length();
      return this.divideScalar(n || 1).multiplyScalar(G(n, clamp, length));
    }
    floor() {
      return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this.z = Math.floor(this.z), this.w = Math.floor(this.w), this;
    }
    ceil() {
      return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this.z = Math.ceil(this.z), this.w = Math.ceil(this.w), this;
    }
    round() {
      return this.x = Math.round(this.x), this.y = Math.round(this.y), this.z = Math.round(this.z), this.w = Math.round(this.w), this;
    }
    roundToZero() {
      return this.x = Math.trunc(this.x), this.y = Math.trunc(this.y), this.z = Math.trunc(this.z), this.w = Math.trunc(this.w), this;
    }
    negate() {
      return this.x = -this.x, this.y = -this.y, this.z = -this.z, this.w = -this.w, this;
    }
    dot(e) {
      return this.x * e.x + this.y * e.y + this.z * e.z + this.w * e.w;
    }
    lengthSq() {
      return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;
    }
    length() {
      return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
    }
    manhattanLength() {
      return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z) + Math.abs(this.w);
    }
    normalize() {
      return this.divideScalar(this.length() || 1);
    }
    setLength(length) {
      return this.normalize().multiplyScalar(length);
    }
    lerp(e, t) {
      return this.x += (e.x - this.x) * t, this.y += (e.y - this.y) * t, this.z += (e.z - this.z) * t, this.w += (e.w - this.w) * t, this;
    }
    lerpVectors(lerp, vectors, vectorsValue) {
      return this.x = lerp.x + (vectors.x - lerp.x) * vectorsValue, this.y = lerp.y + (vectors.y - lerp.y) * vectorsValue, this.z = lerp.z + (vectors.z - lerp.z) * vectorsValue, this.w = lerp.w + (vectors.w - lerp.w) * vectorsValue, this;
    }
    equals(equals) {
      return equals.x === this.x && equals.y === this.y && equals.z === this.z && equals.w === this.w;
    }
    fromArray(array, t = 0) {
      return this.x = array[t], this.y = array[t + 1], this.z = array[t + 2], this.w = array[t + 3], this;
    }
    toArray(e = [], t = 0) {
      return e[t] = this.x, e[t + 1] = this.y, e[t + 2] = this.z, e[t + 3] = this.w, e;
    }
    fromBufferAttribute(buffer, attribute) {
      return this.x = buffer.getX(attribute), this.y = buffer.getY(attribute), this.z = buffer.getZ(attribute), this.w = buffer.getW(attribute), this;
    }
    random() {
      return this.x = Math.random(), this.y = Math.random(), this.z = Math.random(), this.w = Math.random(), this;
    }
    *[Symbol.iterator]() {
      yield this.x, yield this.y, yield this.z, yield this.w;
    }
  },
  Wt = class extends $e {
    constructor(e = 1, t = 1, n = {}) {
      super(), n = Object.assign({
        generateMipmaps: false,
        internalFormat: null,
        minFilter: c,
        depthBuffer: true,
        stencilBuffer: false,
        resolveColorBuffer: true,
        resolveDepthBuffer: true,
        resolveStencilBuffer: true,
        storeMultisampledColorBuffer: true,
        storeMultisampledDepthBuffer: true,
        storeMultisampledStencilBuffer: true,
        depthTexture: null,
        samples: 0,
        count: 1,
        depth: 1,
        multiview: false,
        useArrayDepthTexture: false
      }, n), this.isRenderTarget = true, this.width = e, this.height = t, this.depth = n.depth, this.scissor = new Ut(0, 0, e, t), this.scissorTest = false, this.viewport = new Ut(0, 0, e, t), this.textures = [];
      let r = new Ht({
          width: e,
          height: t,
          depth: n.depth
        }),
        i = n.count;
      for (let e = 0; e < i; e++) this.textures[e] = r.clone(), this.textures[e].isRenderTargetTexture = true, this.textures[e].renderTarget = this;
      this._setTextureOptions(n), this.depthBuffer = n.depthBuffer, this.stencilBuffer = n.stencilBuffer, this.resolveColorBuffer = n.resolveColorBuffer, this.resolveDepthBuffer = n.resolveDepthBuffer, this.resolveStencilBuffer = n.resolveStencilBuffer, this.storeMultisampledColorBuffer = n.storeMultisampledColorBuffer, this.storeMultisampledDepthBuffer = n.storeMultisampledDepthBuffer, this.storeMultisampledStencilBuffer = n.storeMultisampledStencilBuffer, this._depthTexture = null, this.depthTexture = n.depthTexture, this.samples = n.samples, this.multiview = n.multiview, this.useArrayDepthTexture = n.useArrayDepthTexture;
    }
    _setTextureOptions(e = {}) {
      let t = {
        minFilter: c,
        generateMipmaps: false,
        flipY: false,
        internalFormat: null
      };
      e.mapping !== undefined && (t.mapping = e.mapping), e.wrapS !== undefined && (t.wrapS = e.wrapS), e.wrapT !== undefined && (t.wrapT = e.wrapT), e.wrapR !== undefined && (t.wrapR = e.wrapR), e.magFilter !== undefined && (t.magFilter = e.magFilter), e.minFilter !== undefined && (t.minFilter = e.minFilter), e.format !== undefined && (t.format = e.format), e.type !== undefined && (t.type = e.type), e.anisotropy !== undefined && (t.anisotropy = e.anisotropy), e.colorSpace !== undefined && (t.colorSpace = e.colorSpace), e.flipY !== undefined && (t.flipY = e.flipY), e.generateMipmaps !== undefined && (t.generateMipmaps = e.generateMipmaps), e.internalFormat !== undefined && (t.internalFormat = e.internalFormat);
      for (let e = 0; e < this.textures.length; e++) this.textures[e].setValues(t);
    }
    get texture() {
      return this.textures[0];
    }
    set texture(texture) {
      this.textures[0] = texture;
    }
    set depthTexture(depth) {
      this._depthTexture !== null && this._depthTexture.renderTarget === this && (this._depthTexture.renderTarget = null), depth !== null && depth.renderTarget === null && (depth.renderTarget = this), this._depthTexture = depth;
    }
    get depthTexture() {
      return this._depthTexture;
    }
    setSize(size, sizeValue, n = 1) {
      if (this.width !== size || this.height !== sizeValue || this.depth !== n) {
        this.width = size, this.height = sizeValue, this.depth = n;
        for (let r = 0, i = this.textures.length; r < i; r++) this.textures[r].image.width = size, this.textures[r].image.height = sizeValue, this.textures[r].image.depth = n, this.textures[r].isData3DTexture !== true && (this.textures[r].isArrayTexture = this.textures[r].image.depth > 1);
        this.dispose();
      }
      this.viewport.set(0, 0, size, sizeValue), this.scissor.set(0, 0, size, sizeValue);
    }
    clone() {
      return new this.constructor().copy(this);
    }
    copy(e) {
      this.width = e.width, this.height = e.height, this.depth = e.depth, this.scissor.copy(e.scissor), this.scissorTest = e.scissorTest, this.viewport.copy(e.viewport), this.textures.length = 0;
      for (let t = 0, n = e.textures.length; t < n; t++) {
        this.textures[t] = e.textures[t].clone(), this.textures[t].isRenderTargetTexture = true, this.textures[t].renderTarget = this;
        let n = Object.assign({}, e.textures[t].image);
        this.textures[t].source = new Rt(n);
      }
      if (this.depthBuffer = e.depthBuffer, this.stencilBuffer = e.stencilBuffer, this.resolveColorBuffer = e.resolveColorBuffer, this.resolveDepthBuffer = e.resolveDepthBuffer, this.resolveStencilBuffer = e.resolveStencilBuffer, this.storeMultisampledColorBuffer = e.storeMultisampledColorBuffer, this.storeMultisampledDepthBuffer = e.storeMultisampledDepthBuffer, this.storeMultisampledStencilBuffer = e.storeMultisampledStencilBuffer, e.depthTexture !== null) {
        if (e.depthTexture.renderTarget === e) {
          let t = e.depthTexture.clone();
          t.renderTarget = null, this.depthTexture = t;
        } else this.depthTexture = e.depthTexture;
      }
      return this.samples = e.samples, this.multiview = e.multiview, this.useArrayDepthTexture = e.useArrayDepthTexture, this;
    }
    dispose() {
      this.dispatchEvent({
        type: `dispose`
      });
    }
  },
  Gt = class extends Wt {
    constructor(e = 1, t = 1, n = {}) {
      super(e, t, n), this.isWebGLRenderTarget = true;
    }
  },
  Kt = class extends Ht {
    constructor(e = null, t = 1, n = 1, i = 1) {
      super(null), this.isDataArrayTexture = true, this.image = {
        data: e,
        width: t,
        height: n,
        depth: i
      }, this.magFilter = a, this.minFilter = a, this.wrapR = r, this.generateMipmaps = false, this.flipY = false, this.unpackAlignment = 1, this.layerUpdates = new Set();
    }
    copy(e) {
      return super.copy(e), this.wrapR = e.wrapR, this;
    }
    addLayerUpdate(layer) {
      this.layerUpdates.add(layer);
    }
    clearLayerUpdates() {
      this.layerUpdates.clear();
    }
  },
  qt = class extends Ht {
    constructor(e = null, t = 1, n = 1, i = 1) {
      super(null), this.isData3DTexture = true, this.image = {
        data: e,
        width: t,
        height: n,
        depth: i
      }, this.magFilter = a, this.minFilter = a, this.wrapR = r, this.generateMipmaps = false, this.flipY = false, this.unpackAlignment = 1;
    }
    copy(e) {
      return super.copy(e), this.wrapR = e.wrapR, this;
    }
  },
  Jt = class e {
    static {
      e.prototype.isMatrix4 = true;
    }
    constructor(constructor, constructorValue, constructorInput, r, i, a, o, s, c, l, u, d, f, p, m, h) {
      this.elements = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1], constructor !== undefined && this.set(constructor, constructorValue, constructorInput, r, i, a, o, s, c, l, u, d, f, p, m, h);
    }
    set(e, t, n, r, i, a, o, s, c, l, u, d, f, p, m, h) {
      let elements = this.elements;
      return elements[0] = e, elements[4] = t, elements[8] = n, elements[12] = r, elements[1] = i, elements[5] = a, elements[9] = o, elements[13] = s, elements[2] = c, elements[6] = l, elements[10] = u, elements[14] = d, elements[3] = f, elements[7] = p, elements[11] = m, elements[15] = h, this;
    }
    identity() {
      return this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this;
    }
    clone() {
      return new e().fromArray(this.elements);
    }
    copy(e) {
      let elements = this.elements,
        n = e.elements;
      return elements[0] = n[0], elements[1] = n[1], elements[2] = n[2], elements[3] = n[3], elements[4] = n[4], elements[5] = n[5], elements[6] = n[6], elements[7] = n[7], elements[8] = n[8], elements[9] = n[9], elements[10] = n[10], elements[11] = n[11], elements[12] = n[12], elements[13] = n[13], elements[14] = n[14], elements[15] = n[15], this;
    }
    copyPosition(position) {
      let elements = this.elements,
        n = position.elements;
      return elements[12] = n[12], elements[13] = n[13], elements[14] = n[14], this;
    }
    setFromMatrix3(from) {
      let elements = from.elements;
      return this.set(elements[0], elements[3], elements[6], 0, elements[1], elements[4], elements[7], 0, elements[2], elements[5], elements[8], 0, 0, 0, 0, 1), this;
    }
    extractBasis(basis, basisValue, basisInput) {
      return this.determinantAffine() === 0 ? (basis.set(1, 0, 0), basisValue.set(0, 1, 0), basisInput.set(0, 0, 1), this) : (basis.setFromMatrixColumn(this, 0), basisValue.setFromMatrixColumn(this, 1), basisInput.setFromMatrixColumn(this, 2), this);
    }
    makeBasis(basis, basisValue, basisInput) {
      return this.set(basis.x, basisValue.x, basisInput.x, 0, basis.y, basisValue.y, basisInput.y, 0, basis.z, basisValue.z, basisInput.z, 0, 0, 0, 0, 1), this;
    }
    extractRotation(rotation) {
      if (rotation.determinantAffine() === 0) return this.identity();
      let elements = this.elements,
        n = rotation.elements,
        r = 1 / Yt.setFromMatrixColumn(rotation, 0).length(),
        i = 1 / Yt.setFromMatrixColumn(rotation, 1).length(),
        a = 1 / Yt.setFromMatrixColumn(rotation, 2).length();
      return elements[0] = n[0] * r, elements[1] = n[1] * r, elements[2] = n[2] * r, elements[3] = 0, elements[4] = n[4] * i, elements[5] = n[5] * i, elements[6] = n[6] * i, elements[7] = 0, elements[8] = n[8] * a, elements[9] = n[9] * a, elements[10] = n[10] * a, elements[11] = 0, elements[12] = 0, elements[13] = 0, elements[14] = 0, elements[15] = 1, this;
    }
    makeRotationFromEuler(rotation) {
      let elements = this.elements,
        n = rotation.x,
        r = rotation.y,
        i = rotation.z,
        a = Math.cos(n),
        o = Math.sin(n),
        s = Math.cos(r),
        c = Math.sin(r),
        l = Math.cos(i),
        u = Math.sin(i);
      if (rotation.order === `XYZ`) {
        let e = a * l,
          n = a * u,
          r = o * l,
          i = o * u;
        elements[0] = s * l, elements[4] = -s * u, elements[8] = c, elements[1] = n + r * c, elements[5] = e - i * c, elements[9] = -o * s, elements[2] = i - e * c, elements[6] = r + n * c, elements[10] = a * s;
      } else if (rotation.order === `YXZ`) {
        let e = s * l,
          n = s * u,
          r = c * l,
          i = c * u;
        elements[0] = e + i * o, elements[4] = r * o - n, elements[8] = a * c, elements[1] = a * u, elements[5] = a * l, elements[9] = -o, elements[2] = n * o - r, elements[6] = i + e * o, elements[10] = a * s;
      } else if (rotation.order === `ZXY`) {
        let e = s * l,
          n = s * u,
          r = c * l,
          i = c * u;
        elements[0] = e - i * o, elements[4] = -a * u, elements[8] = r + n * o, elements[1] = n + r * o, elements[5] = a * l, elements[9] = i - e * o, elements[2] = -a * c, elements[6] = o, elements[10] = a * s;
      } else if (rotation.order === `ZYX`) {
        let e = a * l,
          n = a * u,
          r = o * l,
          i = o * u;
        elements[0] = s * l, elements[4] = r * c - n, elements[8] = e * c + i, elements[1] = s * u, elements[5] = i * c + e, elements[9] = n * c - r, elements[2] = -c, elements[6] = o * s, elements[10] = a * s;
      } else if (rotation.order === `YZX`) {
        let e = a * s,
          n = a * c,
          r = o * s,
          i = o * c;
        elements[0] = s * l, elements[4] = i - e * u, elements[8] = r * u + n, elements[1] = u, elements[5] = a * l, elements[9] = -o * l, elements[2] = -c * l, elements[6] = n * u + r, elements[10] = e - i * u;
      } else if (rotation.order === `XZY`) {
        let e = a * s,
          n = a * c,
          r = o * s,
          i = o * c;
        elements[0] = s * l, elements[4] = -u, elements[8] = c * l, elements[1] = e * u + i, elements[5] = a * l, elements[9] = n * u - r, elements[2] = r * u - n, elements[6] = o * l, elements[10] = i * u + e;
      }
      return elements[3] = 0, elements[7] = 0, elements[11] = 0, elements[12] = 0, elements[13] = 0, elements[14] = 0, elements[15] = 1, this;
    }
    makeRotationFromQuaternion(rotation) {
      return this.compose(Zt, rotation, Qt);
    }
    lookAt(look, lookValue, lookInput) {
      let elements = this.elements;
      return tn.subVectors(look, lookValue), tn.lengthSq() === 0 && (tn.z = 1), tn.normalize(), $t.crossVectors(lookInput, tn), $t.lengthSq() === 0 && (Math.abs(lookInput.z) === 1 ? tn.x += 1e-4 : tn.z += 1e-4, tn.normalize(), $t.crossVectors(lookInput, tn)), $t.normalize(), en.crossVectors(tn, $t), elements[0] = $t.x, elements[4] = en.x, elements[8] = tn.x, elements[1] = $t.y, elements[5] = en.y, elements[9] = tn.y, elements[2] = $t.z, elements[6] = en.z, elements[10] = tn.z, this;
    }
    multiply(multiply) {
      return this.multiplyMatrices(this, multiply);
    }
    premultiply(premultiply) {
      return this.multiplyMatrices(premultiply, this);
    }
    multiplyMatrices(multiply, matrices) {
      let elements = multiply.elements,
        r = matrices.elements,
        i = this.elements,
        a = elements[0],
        o = elements[4],
        s = elements[8],
        c = elements[12],
        l = elements[1],
        u = elements[5],
        d = elements[9],
        f = elements[13],
        p = elements[2],
        m = elements[6],
        h = elements[10],
        g = elements[14],
        _ = elements[3],
        v = elements[7],
        y = elements[11],
        b = elements[15],
        x = r[0],
        S = r[4],
        C = r[8],
        w = r[12],
        T = r[1],
        E = r[5],
        D = r[9],
        O = r[13],
        k = r[2],
        A = r[6],
        j = r[10],
        ee = r[14],
        te = r[3],
        M = r[7],
        N = r[11],
        P = r[15];
      return i[0] = a * x + o * T + s * k + c * te, i[4] = a * S + o * E + s * A + c * M, i[8] = a * C + o * D + s * j + c * N, i[12] = a * w + o * O + s * ee + c * P, i[1] = l * x + u * T + d * k + f * te, i[5] = l * S + u * E + d * A + f * M, i[9] = l * C + u * D + d * j + f * N, i[13] = l * w + u * O + d * ee + f * P, i[2] = p * x + m * T + h * k + g * te, i[6] = p * S + m * E + h * A + g * M, i[10] = p * C + m * D + h * j + g * N, i[14] = p * w + m * O + h * ee + g * P, i[3] = _ * x + v * T + y * k + b * te, i[7] = _ * S + v * E + y * A + b * M, i[11] = _ * C + v * D + y * j + b * N, i[15] = _ * w + v * O + y * ee + b * P, this;
    }
    multiplyScalar(multiply) {
      let elements = this.elements;
      return elements[0] *= multiply, elements[4] *= multiply, elements[8] *= multiply, elements[12] *= multiply, elements[1] *= multiply, elements[5] *= multiply, elements[9] *= multiply, elements[13] *= multiply, elements[2] *= multiply, elements[6] *= multiply, elements[10] *= multiply, elements[14] *= multiply, elements[3] *= multiply, elements[7] *= multiply, elements[11] *= multiply, elements[15] *= multiply, this;
    }
    determinant() {
      let elements = this.elements,
        t = elements[0],
        n = elements[4],
        r = elements[8],
        i = elements[12],
        a = elements[1],
        o = elements[5],
        s = elements[9],
        c = elements[13],
        l = elements[2],
        u = elements[6],
        d = elements[10],
        f = elements[14],
        p = elements[3],
        m = elements[7],
        h = elements[11],
        g = elements[15],
        _ = s * f - c * d,
        v = o * f - c * u,
        y = o * d - s * u,
        b = a * f - c * l,
        x = a * d - s * l,
        S = a * u - o * l;
      return t * (m * _ - h * v + g * y) - n * (p * _ - h * b + g * x) + r * (p * v - m * b + g * S) - i * (p * y - m * x + h * S);
    }
    determinantAffine() {
      let elements = this.elements,
        t = elements[0],
        n = elements[4],
        r = elements[8],
        i = elements[1],
        a = elements[5],
        o = elements[9],
        s = elements[2],
        c = elements[6],
        l = elements[10];
      return t * (a * l - o * c) - n * (i * l - o * s) + r * (i * c - a * s);
    }
    transpose() {
      let elements = this.elements,
        total;
      return total = elements[1], elements[1] = elements[4], elements[4] = total, total = elements[2], elements[2] = elements[8], elements[8] = total, total = elements[6], elements[6] = elements[9], elements[9] = total, total = elements[3], elements[3] = elements[12], elements[12] = total, total = elements[7], elements[7] = elements[13], elements[13] = total, total = elements[11], elements[11] = elements[14], elements[14] = total, this;
    }
    setPosition(position, positionValue, positionInput) {
      let elements = this.elements;
      return position.isVector3 ? (elements[12] = position.x, elements[13] = position.y, elements[14] = position.z) : (elements[12] = position, elements[13] = positionValue, elements[14] = positionInput), this;
    }
    invert() {
      let elements = this.elements,
        t = elements[0],
        n = elements[1],
        r = elements[2],
        i = elements[3],
        a = elements[4],
        o = elements[5],
        s = elements[6],
        c = elements[7],
        l = elements[8],
        u = elements[9],
        d = elements[10],
        f = elements[11],
        p = elements[12],
        m = elements[13],
        h = elements[14],
        g = elements[15],
        _ = t * o - n * a,
        v = t * s - r * a,
        y = t * c - i * a,
        b = n * s - r * o,
        x = n * c - i * o,
        S = r * c - i * s,
        C = l * m - u * p,
        w = l * h - d * p,
        T = l * g - f * p,
        E = u * h - d * m,
        D = u * g - f * m,
        O = d * g - f * h,
        k = _ * O - v * D + y * E + b * T - x * w + S * C;
      if (k === 0) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
      let A = 1 / k;
      return elements[0] = (o * O - s * D + c * E) * A, elements[1] = (r * D - n * O - i * E) * A, elements[2] = (m * S - h * x + g * b) * A, elements[3] = (d * x - u * S - f * b) * A, elements[4] = (s * T - a * O - c * w) * A, elements[5] = (t * O - r * T + i * w) * A, elements[6] = (h * y - p * S - g * v) * A, elements[7] = (l * S - d * y + f * v) * A, elements[8] = (a * D - o * T + c * C) * A, elements[9] = (n * T - t * D - i * C) * A, elements[10] = (p * x - m * y + g * _) * A, elements[11] = (u * y - l * x - f * _) * A, elements[12] = (o * w - a * E - s * C) * A, elements[13] = (t * E - n * w + r * C) * A, elements[14] = (m * v - p * b - h * _) * A, elements[15] = (l * b - u * v + d * _) * A, this;
    }
    scale(e) {
      let elements = this.elements,
        n = e.x,
        r = e.y,
        i = e.z;
      return elements[0] *= n, elements[4] *= r, elements[8] *= i, elements[1] *= n, elements[5] *= r, elements[9] *= i, elements[2] *= n, elements[6] *= r, elements[10] *= i, elements[3] *= n, elements[7] *= r, elements[11] *= i, this;
    }
    getMaxScaleOnAxis() {
      let elements = this.elements,
        t = elements[0] * elements[0] + elements[1] * elements[1] + elements[2] * elements[2],
        n = elements[4] * elements[4] + elements[5] * elements[5] + elements[6] * elements[6],
        r = elements[8] * elements[8] + elements[9] * elements[9] + elements[10] * elements[10];
      return Math.sqrt(Math.max(t, n, r));
    }
    makeTranslation(translation, translationValue, translationInput) {
      return translation.isVector3 ? this.set(1, 0, 0, translation.x, 0, 1, 0, translation.y, 0, 0, 1, translation.z, 0, 0, 0, 1) : this.set(1, 0, 0, translation, 0, 1, 0, translationValue, 0, 0, 1, translationInput, 0, 0, 0, 1), this;
    }
    makeRotationX(rotation) {
      let t = Math.cos(rotation),
        n = Math.sin(rotation);
      return this.set(1, 0, 0, 0, 0, t, -n, 0, 0, n, t, 0, 0, 0, 0, 1), this;
    }
    makeRotationY(rotation) {
      let t = Math.cos(rotation),
        n = Math.sin(rotation);
      return this.set(t, 0, n, 0, 0, 1, 0, 0, -n, 0, t, 0, 0, 0, 0, 1), this;
    }
    makeRotationZ(rotation) {
      let t = Math.cos(rotation),
        n = Math.sin(rotation);
      return this.set(t, -n, 0, 0, n, t, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this;
    }
    makeRotationAxis(rotation, axis) {
      let n = Math.cos(axis),
        r = Math.sin(axis),
        i = 1 - n,
        a = rotation.x,
        o = rotation.y,
        s = rotation.z,
        c = i * a,
        l = i * o;
      return this.set(c * a + n, c * o - r * s, c * s + r * o, 0, c * o + r * s, l * o + n, l * s - r * a, 0, c * s - r * o, l * s + r * a, i * s * s + n, 0, 0, 0, 0, 1), this;
    }
    makeScale(scale, scaleValue, scaleInput) {
      return this.set(scale, 0, 0, 0, 0, scaleValue, 0, 0, 0, 0, scaleInput, 0, 0, 0, 0, 1), this;
    }
    makeShear(shear, shearValue, shearInput, r, i, a) {
      return this.set(1, shearInput, i, 0, shear, 1, a, 0, shearValue, r, 1, 0, 0, 0, 0, 1), this;
    }
    compose(compose, composeValue, composeInput) {
      let elements = this.elements,
        i = composeValue._x,
        a = composeValue._y,
        o = composeValue._z,
        s = composeValue._w,
        c = i + i,
        l = a + a,
        u = o + o,
        d = i * c,
        f = i * l,
        p = i * u,
        m = a * l,
        h = a * u,
        g = o * u,
        _ = s * c,
        v = s * l,
        y = s * u,
        b = composeInput.x,
        x = composeInput.y,
        S = composeInput.z;
      return elements[0] = (1 - (m + g)) * b, elements[1] = (f + y) * b, elements[2] = (p - v) * b, elements[3] = 0, elements[4] = (f - y) * x, elements[5] = (1 - (d + g)) * x, elements[6] = (h + _) * x, elements[7] = 0, elements[8] = (p + v) * S, elements[9] = (h - _) * S, elements[10] = (1 - (d + m)) * S, elements[11] = 0, elements[12] = compose.x, elements[13] = compose.y, elements[14] = compose.z, elements[15] = 1, this;
    }
    decompose(decompose, decomposeValue, decomposeInput) {
      let elements = this.elements;
      decompose.x = elements[12], decompose.y = elements[13], decompose.z = elements[14];
      let determinantAffine = this.determinantAffine();
      if (determinantAffine === 0) return decomposeInput.set(1, 1, 1), decomposeValue.identity(), this;
      let a = Yt.set(elements[0], elements[1], elements[2]).length(),
        o = Yt.set(elements[4], elements[5], elements[6]).length(),
        s = Yt.set(elements[8], elements[9], elements[10]).length();
      determinantAffine < 0 && (a = -a), Xt.copy(this);
      let c = 1 / a,
        l = 1 / o,
        u = 1 / s;
      return Xt.elements[0] *= c, Xt.elements[1] *= c, Xt.elements[2] *= c, Xt.elements[4] *= l, Xt.elements[5] *= l, Xt.elements[6] *= l, Xt.elements[8] *= u, Xt.elements[9] *= u, Xt.elements[10] *= u, decomposeValue.setFromRotationMatrix(Xt), decomposeInput.x = a, decomposeInput.y = o, decomposeInput.z = s, this;
    }
    makePerspective(perspective, perspectiveValue, perspectiveInput, r, i, a, o = He, s = false) {
      let elements = this.elements,
        l = 2 * i / (perspectiveValue - perspective),
        u = 2 * i / (perspectiveInput - r),
        d = (perspectiveValue + perspective) / (perspectiveValue - perspective),
        f = (perspectiveInput + r) / (perspectiveInput - r),
        ratio,
        m;
      if (s) ratio = i / (a - i), m = a * i / (a - i);else if (o === 2e3) ratio = -(a + i) / (a - i), m = -2 * a * i / (a - i);else if (o === 2001) ratio = -a / (a - i), m = -a * i / (a - i);else throw Error(`THREE.Matrix4.makePerspective(): Invalid coordinate system: ` + o);
      return elements[0] = l, elements[4] = 0, elements[8] = d, elements[12] = 0, elements[1] = 0, elements[5] = u, elements[9] = f, elements[13] = 0, elements[2] = 0, elements[6] = 0, elements[10] = ratio, elements[14] = m, elements[3] = 0, elements[7] = 0, elements[11] = -1, elements[15] = 0, this;
    }
    makeOrthographic(orthographic, orthographicValue, orthographicInput, r, i, a, o = He, s = false) {
      let elements = this.elements,
        l = 2 / (orthographicValue - orthographic),
        u = 2 / (orthographicInput - r),
        d = -(orthographicValue + orthographic) / (orthographicValue - orthographic),
        f = -(orthographicInput + r) / (orthographicInput - r),
        ratio,
        m;
      if (s) ratio = 1 / (a - i), m = a / (a - i);else if (o === 2e3) ratio = -2 / (a - i), m = -(a + i) / (a - i);else if (o === 2001) ratio = -1 / (a - i), m = -i / (a - i);else throw Error(`THREE.Matrix4.makeOrthographic(): Invalid coordinate system: ` + o);
      return elements[0] = l, elements[4] = 0, elements[8] = 0, elements[12] = d, elements[1] = 0, elements[5] = u, elements[9] = 0, elements[13] = f, elements[2] = 0, elements[6] = 0, elements[10] = ratio, elements[14] = m, elements[3] = 0, elements[7] = 0, elements[11] = 0, elements[15] = 1, this;
    }
    equals(equals) {
      let elements = this.elements,
        n = equals.elements;
      for (let e = 0; e < 16; e++) if (elements[e] !== n[e]) return false;
      return true;
    }
    fromArray(array, t = 0) {
      for (let n = 0; n < 16; n++) this.elements[n] = array[n + t];
      return this;
    }
    toArray(e = [], t = 0) {
      let elements = this.elements;
      return e[t] = elements[0], e[t + 1] = elements[1], e[t + 2] = elements[2], e[t + 3] = elements[3], e[t + 4] = elements[4], e[t + 5] = elements[5], e[t + 6] = elements[6], e[t + 7] = elements[7], e[t + 8] = elements[8], e[t + 9] = elements[9], e[t + 10] = elements[10], e[t + 11] = elements[11], e[t + 12] = elements[12], e[t + 13] = elements[13], e[t + 14] = elements[14], e[t + 15] = elements[15], e;
    }
  },
  Yt = new q(),
  Xt = new Jt(),
  Zt = new q(0, 0, 0),
  Qt = new q(1, 1, 1),
  $t = new q(),
  en = new q(),
  tn = new q(),
  nn = new Jt(),
  rn = new Et(),
  an = class e {
    constructor(t = 0, n = 0, r = 0, i = e.DEFAULT_ORDER) {
      this.isEuler = true, this._x = t, this._y = n, this._z = r, this._order = i;
    }
    get x() {
      return this._x;
    }
    set x(e) {
      this._x = e, this._onChangeCallback();
    }
    get y() {
      return this._y;
    }
    set y(e) {
      this._y = e, this._onChangeCallback();
    }
    get z() {
      return this._z;
    }
    set z(e) {
      this._z = e, this._onChangeCallback();
    }
    get order() {
      return this._order;
    }
    set order(e) {
      this._order = e, this._onChangeCallback();
    }
    set(e, t, n, r = this._order) {
      return this._x = e, this._y = t, this._z = n, this._order = r, this._onChangeCallback(), this;
    }
    clone() {
      return new this.constructor(this._x, this._y, this._z, this._order);
    }
    copy(e) {
      return this._x = e._x, this._y = e._y, this._z = e._z, this._order = e._order, this._onChangeCallback(), this;
    }
    setFromRotationMatrix(from, t = this._order, n = true) {
      let elements = from.elements,
        i = elements[0],
        a = elements[4],
        o = elements[8],
        s = elements[1],
        c = elements[5],
        l = elements[9],
        u = elements[2],
        d = elements[6],
        f = elements[10];
      switch (t) {
        case `XYZ`:
          this._y = Math.asin(G(o, -1, 1)), Math.abs(o) < .9999999 ? (this._x = Math.atan2(-l, f), this._z = Math.atan2(-a, i)) : (this._x = Math.atan2(d, c), this._z = 0);
          break;
        case `YXZ`:
          this._x = Math.asin(-G(l, -1, 1)), Math.abs(l) < .9999999 ? (this._y = Math.atan2(o, f), this._z = Math.atan2(s, c)) : (this._y = Math.atan2(-u, i), this._z = 0);
          break;
        case `ZXY`:
          this._x = Math.asin(G(d, -1, 1)), Math.abs(d) < .9999999 ? (this._y = Math.atan2(-u, f), this._z = Math.atan2(-a, c)) : (this._y = 0, this._z = Math.atan2(s, i));
          break;
        case `ZYX`:
          this._y = Math.asin(-G(u, -1, 1)), Math.abs(u) < .9999999 ? (this._x = Math.atan2(d, f), this._z = Math.atan2(s, i)) : (this._x = 0, this._z = Math.atan2(-a, c));
          break;
        case `YZX`:
          this._z = Math.asin(G(s, -1, 1)), Math.abs(s) < .9999999 ? (this._x = Math.atan2(-l, c), this._y = Math.atan2(-u, i)) : (this._x = 0, this._y = Math.atan2(o, f));
          break;
        case `XZY`:
          this._z = Math.asin(-G(a, -1, 1)), Math.abs(a) < .9999999 ? (this._x = Math.atan2(d, c), this._y = Math.atan2(o, i)) : (this._x = Math.atan2(-l, f), this._y = 0);
          break;
        default:
          U(`Euler: .setFromRotationMatrix() encountered an unknown order: ` + t);
      }
      return this._order = t, n === true && this._onChangeCallback(), this;
    }
    setFromQuaternion(from, quaternion, quaternionValue) {
      return nn.makeRotationFromQuaternion(from), this.setFromRotationMatrix(nn, quaternion, quaternionValue);
    }
    setFromVector3(from, t = this._order) {
      return this.set(from.x, from.y, from.z, t);
    }
    reorder(reorder) {
      return rn.setFromEuler(this), this.setFromQuaternion(rn, reorder);
    }
    equals(equals) {
      return equals._x === this._x && equals._y === this._y && equals._z === this._z && equals._order === this._order;
    }
    fromArray(array) {
      return this._x = array[0], this._y = array[1], this._z = array[2], array[3] !== undefined && (this._order = array[3]), this._onChangeCallback(), this;
    }
    toArray(e = [], t = 0) {
      return e[t] = this._x, e[t + 1] = this._y, e[t + 2] = this._z, e[t + 3] = this._order, e;
    }
    _onChange(e) {
      return this._onChangeCallback = e, this;
    }
    _onChangeCallback() {}
    *[Symbol.iterator]() {
      yield this._x, yield this._y, yield this._z, yield this._order;
    }
  };
an.DEFAULT_ORDER = `XYZ`;
var on = class {
    constructor() {
      this.mask = 1;
    }
    set(e) {
      this.mask = (1 << e | 0) >>> 0;
    }
    enable(enable) {
      this.mask |= 1 << enable | 0;
    }
    enableAll() {
      this.mask = -1;
    }
    toggle(ggle) {
      this.mask ^= 1 << ggle | 0;
    }
    disable(disable) {
      this.mask &= ~(1 << disable | 0);
    }
    disableAll() {
      this.mask = 0;
    }
    test(e) {
      return (this.mask & e.mask) !== 0;
    }
    isEnabled(enabled) {
      return !!(this.mask & (1 << enabled | 0));
    }
  },
  sn = 0,
  cn = new q(),
  ln = new Et(),
  un = new Jt(),
  dn = new q(),
  fn = new q(),
  pn = new q(),
  mn = new Et(),
  hn = new q(1, 0, 0),
  gn = new q(0, 1, 0),
  _n = new q(0, 0, 1),
  vn = {
    type: `added`
  },
  yn = {
    type: `removed`
  },
  bn = {
    type: `childadded`,
    child: null
  },
  xn = {
    type: `childremoved`,
    child: null
  },
  Sn = class e extends $e {
    constructor() {
      super(), this.isObject3D = true, Object.defineProperty(this, "id", {
        value: sn++
      }), this.uuid = it(), this.name = ``, this.type = `Object3D`, this.parent = null, this.children = [], this.up = e.DEFAULT_UP.clone();
      let t = new q(),
        n = new an(),
        r = new Et(),
        i = new q(1, 1, 1);
      function a() {
        r.setFromEuler(n, false);
      }
      function o() {
        n.setFromQuaternion(r, undefined, false);
      }
      n._onChange(a), r._onChange(o), Object.defineProperties(this, {
        position: {
          configurable: true,
          enumerable: true,
          value: t
        },
        rotation: {
          configurable: true,
          enumerable: true,
          value: n
        },
        quaternion: {
          configurable: true,
          enumerable: true,
          value: r
        },
        scale: {
          configurable: true,
          enumerable: true,
          value: i
        },
        modelViewMatrix: {
          value: new Jt()
        },
        normalMatrix: {
          value: new J()
        }
      }), this.matrix = new Jt(), this.matrixWorld = new Jt(), this.matrixAutoUpdate = e.DEFAULT_MATRIX_AUTO_UPDATE, this.matrixWorldAutoUpdate = e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE, this.matrixWorldNeedsUpdate = false, this.layers = new on(), this.visible = true, this.castShadow = false, this.receiveShadow = false, this.frustumCulled = true, this.renderOrder = 0, this.animations = [], this.customDepthMaterial = undefined, this.customDistanceMaterial = undefined, this.static = false, this.userData = {}, this.pivot = null;
    }
    onBeforeShadow() {}
    onAfterShadow() {}
    onBeforeRender() {}
    onAfterRender() {}
    applyMatrix4(matrix4) {
      this.matrixAutoUpdate && this.updateMatrix(), this.matrix.premultiply(matrix4), this.matrix.decompose(this.position, this.quaternion, this.scale);
    }
    applyQuaternion(quaternion) {
      return this.quaternion.premultiply(quaternion), this;
    }
    setRotationFromAxisAngle(rotation, from) {
      this.quaternion.setFromAxisAngle(rotation, from);
    }
    setRotationFromEuler(rotation) {
      this.quaternion.setFromEuler(rotation, true);
    }
    setRotationFromMatrix(rotation) {
      this.quaternion.setFromRotationMatrix(rotation);
    }
    setRotationFromQuaternion(rotation) {
      this.quaternion.copy(rotation);
    }
    rotateOnAxis(rotate, axis) {
      return ln.setFromAxisAngle(rotate, axis), this.quaternion.multiply(ln), this;
    }
    rotateOnWorldAxis(rotate, world) {
      return ln.setFromAxisAngle(rotate, world), this.quaternion.premultiply(ln), this;
    }
    rotateX(rotate) {
      return this.rotateOnAxis(hn, rotate);
    }
    rotateY(rotate) {
      return this.rotateOnAxis(gn, rotate);
    }
    rotateZ(rotate) {
      return this.rotateOnAxis(_n, rotate);
    }
    translateOnAxis(translate, axis) {
      return cn.copy(translate).applyQuaternion(this.quaternion), this.position.add(cn.multiplyScalar(axis)), this;
    }
    translateX(translate) {
      return this.translateOnAxis(hn, translate);
    }
    translateY(translate) {
      return this.translateOnAxis(gn, translate);
    }
    translateZ(translate) {
      return this.translateOnAxis(_n, translate);
    }
    localToWorld(local) {
      return this.updateWorldMatrix(true, false), local.applyMatrix4(this.matrixWorld);
    }
    worldToLocal(world) {
      return this.updateWorldMatrix(true, false), world.applyMatrix4(un.copy(this.matrixWorld).invert());
    }
    lookAt(look, lookValue, lookInput) {
      look.isVector3 ? dn.copy(look) : dn.set(look, lookValue, lookInput);
      let r = this.parent;
      this.updateWorldMatrix(true, false), fn.setFromMatrixPosition(this.matrixWorld), this.isCamera || this.isLight ? un.lookAt(fn, dn, this.up) : un.lookAt(dn, fn, this.up), this.quaternion.setFromRotationMatrix(un), r && (un.extractRotation(r.matrixWorld), ln.setFromRotationMatrix(un), this.quaternion.premultiply(ln.invert()));
    }
    add(e) {
      if (arguments.length > 1) {
        for (let e = 0; e < arguments.length; e++) this.add(arguments[e]);
        return this;
      }
      return e === this ? (W(`Object3D.add: object can't be added as a child of itself.`, e), this) : (e && e.isObject3D ? (e.removeFromParent(), e.parent = this, this.children.push(e), e.dispatchEvent(vn), bn.child = e, this.dispatchEvent(bn), bn.child = null) : W(`Object3D.add: object not an instance of THREE.Object3D.`, e), this);
    }
    remove(remove) {
      if (arguments.length > 1) {
        for (let e = 0; e < arguments.length; e++) this.remove(arguments[e]);
        return this;
      }
      let t = this.children.indexOf(remove);
      return t !== -1 && (remove.parent = null, this.children.splice(t, 1), remove.dispatchEvent(yn), xn.child = remove, this.dispatchEvent(xn), xn.child = null), this;
    }
    removeFromParent() {
      let e = this.parent;
      return e !== null && e.remove(this), this;
    }
    clear() {
      return this.remove(...this.children);
    }
    attach(attach) {
      return this.updateWorldMatrix(true, false), un.copy(this.matrixWorld).invert(), attach.parent !== null && (attach.parent.updateWorldMatrix(true, false), un.multiply(attach.parent.matrixWorld)), attach.applyMatrix4(un), attach.removeFromParent(), attach.parent = this, this.children.push(attach), attach.updateWorldMatrix(false, true), attach.dispatchEvent(vn), bn.child = attach, this.dispatchEvent(bn), bn.child = null, this;
    }
    getObjectById(object) {
      return this.getObjectByProperty(`id`, object);
    }
    getObjectByName(object) {
      return this.getObjectByProperty(`name`, object);
    }
    getObjectByProperty(object, property) {
      if (this[object] === property) return this;
      for (let n = 0, r = this.children.length; n < r; n++) {
        let objectByProperty = this.children[n].getObjectByProperty(object, property);
        if (objectByProperty !== undefined) return objectByProperty;
      }
    }
    getObjectsByProperty(objects, property, n = []) {
      this[objects] === property && n.push(this);
      let r = this.children;
      for (let i = 0, a = r.length; i < a; i++) r[i].getObjectsByProperty(objects, property, n);
      return n;
    }
    getWorldPosition(world) {
      return this.updateWorldMatrix(true, false), world.setFromMatrixPosition(this.matrixWorld);
    }
    getWorldQuaternion(world) {
      return this.updateWorldMatrix(true, false), this.matrixWorld.decompose(fn, world, pn), world;
    }
    getWorldScale(world) {
      return this.updateWorldMatrix(true, false), this.matrixWorld.decompose(fn, mn, world), world;
    }
    getWorldDirection(world) {
      this.updateWorldMatrix(true, false);
      let elements = this.matrixWorld.elements;
      return world.set(elements[8], elements[9], elements[10]).normalize();
    }
    raycast() {}
    intersectsFrustum() {}
    traverse(traverse) {
      traverse(this);
      let t = this.children;
      for (let n = 0, r = t.length; n < r; n++) t[n].traverse(traverse);
    }
    traverseVisible(traverse) {
      if (this.visible === false) return;
      traverse(this);
      let t = this.children;
      for (let n = 0, r = t.length; n < r; n++) t[n].traverseVisible(traverse);
    }
    traverseAncestors(traverse) {
      let t = this.parent;
      t !== null && (traverse(t), t.traverseAncestors(traverse));
    }
    updateMatrix() {
      this.matrix.compose(this.position, this.quaternion, this.scale);
      let pivot = this.pivot;
      if (pivot !== null) {
        let t = pivot.x,
          n = pivot.y,
          r = pivot.z,
          elements = this.matrix.elements;
        elements[12] += t - elements[0] * t - elements[4] * n - elements[8] * r, elements[13] += n - elements[1] * t - elements[5] * n - elements[9] * r, elements[14] += r - elements[2] * t - elements[6] * n - elements[10] * r;
      }
      this.matrixWorldNeedsUpdate = true;
    }
    updateMatrixWorld(matrix) {
      this.matrixAutoUpdate && this.updateMatrix(), (this.matrixWorldNeedsUpdate || matrix) && (this.matrixWorldAutoUpdate === true && (this.parent === null ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix)), this.matrixWorldNeedsUpdate = false, matrix = true);
      let t = this.children;
      for (let n = 0, r = t.length; n < r; n++) t[n].updateMatrixWorld(matrix);
    }
    updateWorldMatrix(count, matrix, n = false) {
      let r = this.parent;
      if (count === true && r !== null && r.updateWorldMatrix(true, false), this.matrixAutoUpdate && this.updateMatrix(), (this.matrixWorldNeedsUpdate || n) && (this.matrixWorldAutoUpdate === true && (this.parent === null ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix)), this.matrixWorldNeedsUpdate = false, n = true), matrix === true) {
        let e = this.children;
        for (let t = 0, r = e.length; t < r; t++) e[t].updateWorldMatrix(false, true, n);
      }
    }
    toJSON(e) {
      let fallbackValue = e === undefined || typeof e == `string`,
        n = {};
      fallbackValue && (e = {
        geometries: {},
        materials: {},
        textures: {},
        images: {},
        shapes: {},
        skeletons: {},
        animations: {},
        nodes: {}
      }, n.metadata = {
        version: 4.7,
        type: `Object`,
        generator: `Object3D.toJSON`
      });
      let r = {};
      r.uuid = this.uuid, r.type = this.type, r.name = this.name, r.castShadow = this.castShadow, r.receiveShadow = this.receiveShadow, r.visible = this.visible, r.frustumCulled = this.frustumCulled, r.renderOrder = this.renderOrder, r.static = this.static, r.matrixAutoUpdate = this.matrixAutoUpdate, Object.keys(this.userData).length > 0 && (r.userData = this.userData), r.layers = this.layers.mask, r.matrix = this.matrix.toArray(), r.up = this.up.toArray(), this.pivot !== null && (r.pivot = this.pivot.toArray()), this.morphTargetDictionary !== undefined && (r.morphTargetDictionary = Object.assign({}, this.morphTargetDictionary)), this.morphTargetInfluences !== undefined && (r.morphTargetInfluences = this.morphTargetInfluences.slice()), this.isInstancedMesh && (r.type = `InstancedMesh`, r.count = this.count, r.instanceMatrix = this.instanceMatrix.toJSON(), this.instanceColor !== null && (r.instanceColor = this.instanceColor.toJSON())), this.isBatchedMesh && (r.type = `BatchedMesh`, r.perObjectFrustumCulled = this.perObjectFrustumCulled, r.sortObjects = this.sortObjects, r.drawRanges = this._drawRanges, r.reservedRanges = this._reservedRanges, r.geometryInfo = this._geometryInfo.map(item => ({
        ...item,
        boundingBox: item.boundingBox ? item.boundingBox.toJSON() : undefined,
        boundingSphere: item.boundingSphere ? item.boundingSphere.toJSON() : undefined
      })), r.instanceInfo = this._instanceInfo.map(item => ({
        ...item
      })), r.availableInstanceIds = this._availableInstanceIds.slice(), r.availableGeometryIds = this._availableGeometryIds.slice(), r.nextIndexStart = this._nextIndexStart, r.nextVertexStart = this._nextVertexStart, r.geometryCount = this._geometryCount, r.maxInstanceCount = this._maxInstanceCount, r.maxVertexCount = this._maxVertexCount, r.maxIndexCount = this._maxIndexCount, r.geometryInitialized = this._geometryInitialized, r.matricesTexture = this._matricesTexture.toJSON(e), r.indirectTexture = this._indirectTexture.toJSON(e), this._colorsTexture !== null && (r.colorsTexture = this._colorsTexture.toJSON(e)), this.boundingSphere !== null && (r.boundingSphere = this.boundingSphere.toJSON()), this.boundingBox !== null && (r.boundingBox = this.boundingBox.toJSON()));
      function i(t, n) {
        return t[n.uuid] === undefined && (t[n.uuid] = n.toJSON(e)), n.uuid;
      }
      if (this.isScene) this.background && (this.background.isColor ? r.background = this.background.toJSON() : this.background.isTexture && (r.background = this.background.toJSON(e).uuid)), this.environment && this.environment.isTexture && this.environment.isRenderTargetTexture !== true && (r.environment = this.environment.toJSON(e).uuid);else if (this.isMesh || this.isLine || this.isPoints) {
        r.geometry = i(e.geometries, this.geometry);
        let parameters = this.geometry.parameters;
        if (parameters !== undefined && parameters.shapes !== undefined) {
          let shapes = parameters.shapes;
          if (Array.isArray(shapes)) for (let t = 0, r = shapes.length; t < r; t++) {
            let r = shapes[t];
            i(e.shapes, r);
          } else i(e.shapes, shapes);
        }
      }
      if (this.isSkinnedMesh && (r.bindMode = this.bindMode, r.bindMatrix = this.bindMatrix.toArray(), this.skeleton !== undefined && (i(e.skeletons, this.skeleton), r.skeleton = this.skeleton.uuid)), this.material !== undefined) {
        if (Array.isArray(this.material)) {
          let emptyItems = [];
          for (let n = 0, r = this.material.length; n < r; n++) emptyItems.push(i(e.materials, this.material[n]));
          r.material = emptyItems;
        } else r.material = i(e.materials, this.material);
      }
      if (this.children.length > 0) {
        r.children = [];
        for (let t = 0; t < this.children.length; t++) r.children.push(this.children[t].toJSON(e).object);
      }
      if (this.animations.length > 0) {
        r.animations = [];
        for (let t = 0; t < this.animations.length; t++) {
          let n = this.animations[t];
          r.animations.push(i(e.animations, n));
        }
      }
      if (fallbackValue) {
        let t = a(e.geometries),
          r = a(e.materials),
          i = a(e.textures),
          o = a(e.images),
          s = a(e.shapes),
          c = a(e.skeletons),
          l = a(e.animations),
          u = a(e.nodes);
        t.length > 0 && (n.geometries = t), r.length > 0 && (n.materials = r), i.length > 0 && (n.textures = i), o.length > 0 && (n.images = o), s.length > 0 && (n.shapes = s), c.length > 0 && (n.skeletons = c), l.length > 0 && (n.animations = l), u.length > 0 && (n.nodes = u);
      }
      return n.object = r, n;
      function a(e) {
        let emptyItems = [];
        for (let count in e) {
          let r = e[count];
          delete r.metadata, emptyItems.push(r);
        }
        return emptyItems;
      }
    }
    clone(e) {
      return new this.constructor().copy(this, e);
    }
    copy(e, t = true) {
      if (this.name = e.name, this.up.copy(e.up), this.position.copy(e.position), this.rotation.order = e.rotation.order, this.quaternion.copy(e.quaternion), this.scale.copy(e.scale), this.pivot = e.pivot === null ? null : e.pivot.clone(), this.matrix.copy(e.matrix), this.matrixWorld.copy(e.matrixWorld), this.matrixAutoUpdate = e.matrixAutoUpdate, this.matrixWorldAutoUpdate = e.matrixWorldAutoUpdate, this.matrixWorldNeedsUpdate = e.matrixWorldNeedsUpdate, this.layers.mask = e.layers.mask, this.visible = e.visible, this.castShadow = e.castShadow, this.receiveShadow = e.receiveShadow, this.frustumCulled = e.frustumCulled, this.renderOrder = e.renderOrder, this.static = e.static, this.animations = e.animations.slice(), this.userData = JSON.parse(JSON.stringify(e.userData)), t === true) for (let t = 0; t < e.children.length; t++) {
        let n = e.children[t];
        this.add(n.clone());
      }
      return this;
    }
    dispose() {
      this.dispatchEvent({
        type: `dispose`
      });
    }
  };
Sn.DEFAULT_UP = new q(0, 1, 0), Sn.DEFAULT_MATRIX_AUTO_UPDATE = true, Sn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE = true;
var Cn = class extends Sn {
    constructor() {
      super(), this.isGroup = true, this.type = `Group`;
    }
  },
  wn = {
    type: `move`
  },
  Tn = class {
    constructor() {
      this._targetRay = null, this._grip = null, this._hand = null;
    }
    getHandSpace() {
      return this._hand === null && (this._hand = new Cn(), this._hand.matrixAutoUpdate = false, this._hand.visible = false, this._hand.joints = {}, this._hand.inputState = {
        pinching: false
      }), this._hand;
    }
    getTargetRaySpace() {
      return this._targetRay === null && (this._targetRay = new Cn(), this._targetRay.matrixAutoUpdate = false, this._targetRay.visible = false, this._targetRay.hasLinearVelocity = false, this._targetRay.linearVelocity = new q(), this._targetRay.hasAngularVelocity = false, this._targetRay.angularVelocity = new q()), this._targetRay;
    }
    getGripSpace() {
      return this._grip === null && (this._grip = new Cn(), this._grip.matrixAutoUpdate = false, this._grip.visible = false, this._grip.hasLinearVelocity = false, this._grip.linearVelocity = new q(), this._grip.hasAngularVelocity = false, this._grip.angularVelocity = new q(), this._grip.eventsEnabled = false), this._grip;
    }
    dispatchEvent(event) {
      return this._targetRay !== null && this._targetRay.dispatchEvent(event), this._grip !== null && this._grip.dispatchEvent(event), this._hand !== null && this._hand.dispatchEvent(event), this;
    }
    connect(connect) {
      if (connect && connect.hand) {
        let _hand = this._hand;
        if (_hand) for (let count of connect.hand.values()) this._getHandJoint(_hand, count);
      }
      return this.dispatchEvent({
        type: `connected`,
        data: connect
      }), this;
    }
    disconnect(disconnect) {
      return this.dispatchEvent({
        type: `disconnected`,
        data: disconnect
      }), this._targetRay !== null && (this._targetRay.visible = false), this._grip !== null && (this._grip.visible = false), this._hand !== null && (this._hand.visible = false), this;
    }
    update(update, updateValue, updateInput) {
      let count = null,
        i = null,
        flag = null,
        _targetRay = this._targetRay,
        _grip = this._grip,
        _hand = this._hand;
      if (update && updateValue.session.visibilityState !== `visible-blurred`) {
        if (_hand && update.hand) {
          flag = true;
          for (let r of update.hand.values()) {
            let jointPose = updateValue.getJointPose(r, updateInput),
              i = this._getHandJoint(_hand, r);
            jointPose !== null && (i.matrix.fromArray(jointPose.transform.matrix), i.matrix.decompose(i.position, i.rotation, i.scale), i.matrixWorldNeedsUpdate = true, i.jointRadius = jointPose.radius), i.visible = jointPose !== null;
          }
          let r = _hand.joints[`index-finger-tip`],
            i = _hand.joints[`thumb-tip`],
            distanceTo = r.position.distanceTo(i.position);
          _hand.inputState.pinching && distanceTo > .025 ? (_hand.inputState.pinching = false, this.dispatchEvent({
            type: `pinchend`,
            handedness: update.handedness,
            target: this
          })) : !_hand.inputState.pinching && distanceTo <= .015 && (_hand.inputState.pinching = true, this.dispatchEvent({
            type: `pinchstart`,
            handedness: update.handedness,
            target: this
          }));
        } else _grip !== null && update.gripSpace && (i = updateValue.getPose(update.gripSpace, updateInput), i !== null && (_grip.matrix.fromArray(i.transform.matrix), _grip.matrix.decompose(_grip.position, _grip.rotation, _grip.scale), _grip.matrixWorldNeedsUpdate = true, i.linearVelocity ? (_grip.hasLinearVelocity = true, _grip.linearVelocity.copy(i.linearVelocity)) : _grip.hasLinearVelocity = false, i.angularVelocity ? (_grip.hasAngularVelocity = true, _grip.angularVelocity.copy(i.angularVelocity)) : _grip.hasAngularVelocity = false, _grip.eventsEnabled && _grip.dispatchEvent({
          type: `gripUpdated`,
          data: update,
          target: this
        })));
        _targetRay !== null && (count = updateValue.getPose(update.targetRaySpace, updateInput), count === null && i !== null && (count = i), count !== null && (_targetRay.matrix.fromArray(count.transform.matrix), _targetRay.matrix.decompose(_targetRay.position, _targetRay.rotation, _targetRay.scale), _targetRay.matrixWorldNeedsUpdate = true, count.linearVelocity ? (_targetRay.hasLinearVelocity = true, _targetRay.linearVelocity.copy(count.linearVelocity)) : _targetRay.hasLinearVelocity = false, count.angularVelocity ? (_targetRay.hasAngularVelocity = true, _targetRay.angularVelocity.copy(count.angularVelocity)) : _targetRay.hasAngularVelocity = false, this.dispatchEvent(wn)));
      }
      return _targetRay !== null && (_targetRay.visible = count !== null), _grip !== null && (_grip.visible = i !== null), _hand !== null && (_hand.visible = flag !== null), this;
    }
    _getHandJoint(e, hand) {
      if (e.joints[hand.jointName] === undefined) {
        let n = new Cn();
        n.matrixAutoUpdate = false, n.visible = false, e.joints[hand.jointName] = n, e.add(n);
      }
      return e.joints[hand.jointName];
    }
  },
  En = {
    aliceblue: 15792383,
    antiquewhite: 16444375,
    aqua: 65535,
    aquamarine: 8388564,
    azure: 15794175,
    beige: 16119260,
    bisque: 16770244,
    black: 0,
    blanchedalmond: 16772045,
    blue: 255,
    blueviolet: 9055202,
    brown: 10824234,
    burlywood: 14596231,
    cadetblue: 6266528,
    chartreuse: 8388352,
    chocolate: 13789470,
    coral: 16744272,
    cornflowerblue: 6591981,
    cornsilk: 16775388,
    crimson: 14423100,
    cyan: 65535,
    darkblue: 139,
    darkcyan: 35723,
    darkgoldenrod: 12092939,
    darkgray: 11119017,
    darkgreen: 25600,
    darkgrey: 11119017,
    darkkhaki: 12433259,
    darkmagenta: 9109643,
    darkolivegreen: 5597999,
    darkorange: 16747520,
    darkorchid: 10040012,
    darkred: 9109504,
    darksalmon: 15308410,
    darkseagreen: 9419919,
    darkslateblue: 4734347,
    darkslategray: 3100495,
    darkslategrey: 3100495,
    darkturquoise: 52945,
    darkviolet: 9699539,
    deeppink: 16716947,
    deepskyblue: 49151,
    dimgray: 6908265,
    dimgrey: 6908265,
    dodgerblue: 2003199,
    firebrick: 11674146,
    floralwhite: 16775920,
    forestgreen: 2263842,
    fuchsia: 16711935,
    gainsboro: 14474460,
    ghostwhite: 16316671,
    gold: 16766720,
    goldenrod: 14329120,
    gray: 8421504,
    green: 32768,
    greenyellow: 11403055,
    grey: 8421504,
    honeydew: 15794160,
    hotpink: 16738740,
    indianred: 13458524,
    indigo: 4915330,
    ivory: 16777200,
    khaki: 15787660,
    lavender: 15132410,
    lavenderblush: 16773365,
    lawngreen: 8190976,
    lemonchiffon: 16775885,
    lightblue: 11393254,
    lightcoral: 15761536,
    lightcyan: 14745599,
    lightgoldenrodyellow: 16448210,
    lightgray: 13882323,
    lightgreen: 9498256,
    lightgrey: 13882323,
    lightpink: 16758465,
    lightsalmon: 16752762,
    lightseagreen: 2142890,
    lightskyblue: 8900346,
    lightslategray: 7833753,
    lightslategrey: 7833753,
    lightsteelblue: 11584734,
    lightyellow: 16777184,
    lime: 65280,
    limegreen: 3329330,
    linen: 16445670,
    magenta: 16711935,
    maroon: 8388608,
    mediumaquamarine: 6737322,
    mediumblue: 205,
    mediumorchid: 12211667,
    mediumpurple: 9662683,
    mediumseagreen: 3978097,
    mediumslateblue: 8087790,
    mediumspringgreen: 64154,
    mediumturquoise: 4772300,
    mediumvioletred: 13047173,
    midnightblue: 1644912,
    mintcream: 16121850,
    mistyrose: 16770273,
    moccasin: 16770229,
    navajowhite: 16768685,
    navy: 128,
    oldlace: 16643558,
    olive: 8421376,
    olivedrab: 7048739,
    orange: 16753920,
    orangered: 16729344,
    orchid: 14315734,
    palegoldenrod: 15657130,
    palegreen: 10025880,
    paleturquoise: 11529966,
    palevioletred: 14381203,
    papayawhip: 16773077,
    peachpuff: 16767673,
    peru: 13468991,
    pink: 16761035,
    plum: 14524637,
    powderblue: 11591910,
    purple: 8388736,
    rebeccapurple: 6697881,
    red: 16711680,
    rosybrown: 12357519,
    royalblue: 4286945,
    saddlebrown: 9127187,
    salmon: 16416882,
    sandybrown: 16032864,
    seagreen: 3050327,
    seashell: 16774638,
    sienna: 10506797,
    silver: 12632256,
    skyblue: 8900331,
    slateblue: 6970061,
    slategray: 7372944,
    slategrey: 7372944,
    snow: 16775930,
    springgreen: 65407,
    steelblue: 4620980,
    tan: 13808780,
    teal: 32896,
    thistle: 14204888,
    tomato: 16737095,
    turquoise: 4251856,
    violet: 15631086,
    wheat: 16113331,
    white: 16777215,
    whitesmoke: 16119285,
    yellow: 16776960,
    yellowgreen: 10145074
  },
  Dn = {
    h: 0,
    s: 0,
    l: 0
  },
  On = {
    h: 0,
    s: 0,
    l: 0
  };
function kn(e, t, n) {
  return n < 0 && (n += 1), n > 1 && --n, n < 1 / 6 ? e + (t - e) * 6 * n : n < 1 / 2 ? t : n < 2 / 3 ? e + (t - e) * 6 * (2 / 3 - n) : e;
}
var X = class {
    constructor(constructor, constructorValue, constructorInput) {
      return this.isColor = true, this.r = 1, this.g = 1, this.b = 1, this.set(constructor, constructorValue, constructorInput);
    }
    set(e, t, n) {
      if (t === undefined && n === undefined) {
        let t = e;
        t && t.isColor ? this.copy(t) : typeof t == `number` ? this.setHex(t) : typeof t == `string` && this.setStyle(t);
      } else this.setRGB(e, t, n);
      return this;
    }
    setScalar(scalar) {
      return this.r = scalar, this.g = scalar, this.b = scalar, this;
    }
    setHex(hex, t = Fe) {
      return hex = Math.floor(hex), this.r = (hex >> 16 & 255) / 255, this.g = (hex >> 8 & 255) / 255, this.b = (hex & 255) / 255, Y.colorSpaceToWorking(this, t), this;
    }
    setRGB(e, t, n, r = Y.workingColorSpace) {
      return this.r = e, this.g = t, this.b = n, Y.colorSpaceToWorking(this, r), this;
    }
    setHSL(e, t, n, r = Y.workingColorSpace) {
      if (e = at(e, 1), t = G(t, 0, 1), n = G(n, 0, 1), t === 0) this.r = this.g = this.b = n;else {
        let r = n <= .5 ? n * (1 + t) : n + t - n * t,
          i = 2 * n - r;
        this.r = kn(i, r, e + 1 / 3), this.g = kn(i, r, e), this.b = kn(i, r, e - 1 / 3);
      }
      return Y.colorSpaceToWorking(this, r), this;
    }
    setStyle(count, t = Fe) {
      function n(t) {
        t !== undefined && parseFloat(t) < 1 && U(`Color: Alpha component of ` + count + ` will be ignored.`);
      }
      let r;
      if (r = /^(\w+)\(([^\)]*)\)/.exec(count)) {
        let i,
          a = r[1],
          o = r[2];
        switch (a) {
          case `rgb`:
          case `rgba`:
            if (i = /^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o)) return n(i[4]), this.setRGB(Math.min(255, parseInt(i[1], 10)) / 255, Math.min(255, parseInt(i[2], 10)) / 255, Math.min(255, parseInt(i[3], 10)) / 255, t);
            if (i = /^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o)) return n(i[4]), this.setRGB(Math.min(100, parseInt(i[1], 10)) / 100, Math.min(100, parseInt(i[2], 10)) / 100, Math.min(100, parseInt(i[3], 10)) / 100, t);
            break;
          case `hsl`:
          case `hsla`:
            if (i = /^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o)) return n(i[4]), this.setHSL(parseFloat(i[1]) / 360, parseFloat(i[2]) / 100, parseFloat(i[3]) / 100, t);
            break;
          default:
            U(`Color: Unknown color model ` + count);
        }
      } else if (r = /^\#([A-Fa-f\d]+)$/.exec(count)) {
        let n = r[1],
          i = n.length;
        if (i === 3) return this.setRGB(parseInt(n.charAt(0), 16) / 15, parseInt(n.charAt(1), 16) / 15, parseInt(n.charAt(2), 16) / 15, t);
        if (i === 6) return this.setHex(parseInt(n, 16), t);
        U(`Color: Invalid hex color ` + count);
      } else if (count && count.length > 0) return this.setColorName(count, t);
      return this;
    }
    setColorName(text, t = Fe) {
      let n = En[text.toLowerCase()];
      return n === undefined ? U(`Color: Unknown color ` + text) : this.setHex(n, t), this;
    }
    clone() {
      return new this.constructor(this.r, this.g, this.b);
    }
    copy(e) {
      return this.r = e.r, this.g = e.g, this.b = e.b, this;
    }
    copySRGBToLinear(linear) {
      return this.r = Nt(linear.r), this.g = Nt(linear.g), this.b = Nt(linear.b), this;
    }
    copyLinearToSRGB(linear) {
      return this.r = Pt(linear.r), this.g = Pt(linear.g), this.b = Pt(linear.b), this;
    }
    convertSRGBToLinear() {
      return this.copySRGBToLinear(this), this;
    }
    convertLinearToSRGB() {
      return this.copyLinearToSRGB(this), this;
    }
    getHex(e = Fe) {
      return Y.workingToColorSpace(An.copy(this), e), Math.round(G(An.r * 255, 0, 255)) * 65536 + Math.round(G(An.g * 255, 0, 255)) * 256 + Math.round(G(An.b * 255, 0, 255));
    }
    getHexString(e = Fe) {
      return (`000000` + this.getHex(e).toString(16)).slice(-6);
    }
    getHSL(e, t = Y.workingColorSpace) {
      Y.workingToColorSpace(An.copy(this), t);
      let n = An.r,
        r = An.g,
        i = An.b,
        a = Math.max(n, r, i),
        o = Math.min(n, r, i),
        total,
        c,
        l = (o + a) / 2;
      if (o === a) total = 0, c = 0;else {
        let e = a - o;
        switch (c = l <= .5 ? e / (a + o) : e / (2 - a - o), a) {
          case n:
            total = (r - i) / e + (r < i ? 6 : 0);
            break;
          case r:
            total = (i - n) / e + 2;
            break;
          case i:
            total = (n - r) / e + 4;
        }
        total /= 6;
      }
      return e.h = total, e.s = c, e.l = l, e;
    }
    getRGB(e, t = Y.workingColorSpace) {
      return Y.workingToColorSpace(An.copy(this), t), e.r = An.r, e.g = An.g, e.b = An.b, e;
    }
    getStyle(e = Fe) {
      Y.workingToColorSpace(An.copy(this), e);
      let t = An.r,
        n = An.g,
        r = An.b;
      return e === `srgb` ? `rgb(${Math.round(t * 255)},${Math.round(n * 255)},${Math.round(r * 255)})` : `color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`;
    }
    offsetHSL(offset, offsetValue, offsetInput) {
      return this.getHSL(Dn), this.setHSL(Dn.h + offset, Dn.s + offsetValue, Dn.l + offsetInput);
    }
    add(e) {
      return this.r += e.r, this.g += e.g, this.b += e.b, this;
    }
    addColors(colors, colorsValue) {
      return this.r = colors.r + colorsValue.r, this.g = colors.g + colorsValue.g, this.b = colors.b + colorsValue.b, this;
    }
    addScalar(scalar) {
      return this.r += scalar, this.g += scalar, this.b += scalar, this;
    }
    sub(e) {
      return this.r = Math.max(0, this.r - e.r), this.g = Math.max(0, this.g - e.g), this.b = Math.max(0, this.b - e.b), this;
    }
    multiply(multiply) {
      return this.r *= multiply.r, this.g *= multiply.g, this.b *= multiply.b, this;
    }
    multiplyScalar(multiply) {
      return this.r *= multiply, this.g *= multiply, this.b *= multiply, this;
    }
    lerp(e, t) {
      return this.r += (e.r - this.r) * t, this.g += (e.g - this.g) * t, this.b += (e.b - this.b) * t, this;
    }
    lerpColors(lerp, colors, colorsValue) {
      return this.r = lerp.r + (colors.r - lerp.r) * colorsValue, this.g = lerp.g + (colors.g - lerp.g) * colorsValue, this.b = lerp.b + (colors.b - lerp.b) * colorsValue, this;
    }
    lerpHSL(lerp, lerpValue) {
      this.getHSL(Dn), lerp.getHSL(On);
      let n = ct(Dn.h, On.h, lerpValue),
        r = ct(Dn.s, On.s, lerpValue),
        i = ct(Dn.l, On.l, lerpValue);
      return this.setHSL(n, r, i), this;
    }
    setFromVector3(from) {
      return this.r = from.x, this.g = from.y, this.b = from.z, this;
    }
    applyMatrix3(matrix3) {
      let t = this.r,
        n = this.g,
        r = this.b,
        elements = matrix3.elements;
      return this.r = elements[0] * t + elements[3] * n + elements[6] * r, this.g = elements[1] * t + elements[4] * n + elements[7] * r, this.b = elements[2] * t + elements[5] * n + elements[8] * r, this;
    }
    equals(equals) {
      return equals.r === this.r && equals.g === this.g && equals.b === this.b;
    }
    fromArray(array, t = 0) {
      return this.r = array[t], this.g = array[t + 1], this.b = array[t + 2], this;
    }
    toArray(e = [], t = 0) {
      return e[t] = this.r, e[t + 1] = this.g, e[t + 2] = this.b, e;
    }
    fromBufferAttribute(buffer, attribute) {
      return this.r = buffer.getX(attribute), this.g = buffer.getY(attribute), this.b = buffer.getZ(attribute), this;
    }
    toJSON() {
      return this.getHex();
    }
    *[Symbol.iterator]() {
      yield this.r, yield this.g, yield this.b;
    }
  },
  An = new X();
X.NAMES = En;
var jn = class extends Sn {
    constructor() {
      super(), this.isScene = true, this.type = `Scene`, this.background = null, this.environment = null, this.fog = null, this.backgroundBlurriness = 0, this.backgroundIntensity = 1, this.backgroundRotation = new an(), this.environmentIntensity = 1, this.environmentRotation = new an(), this.overrideMaterial = null, typeof __THREE_DEVTOOLS__ < `u` && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`, {
        detail: this
      }));
    }
    copy(e, t) {
      return super.copy(e, t), e.background !== null && (this.background = e.background.clone()), e.environment !== null && (this.environment = e.environment.clone()), e.fog !== null && (this.fog = e.fog.clone()), this.backgroundBlurriness = e.backgroundBlurriness, this.backgroundIntensity = e.backgroundIntensity, this.backgroundRotation.copy(e.backgroundRotation), this.environmentIntensity = e.environmentIntensity, this.environmentRotation.copy(e.environmentRotation), e.overrideMaterial !== null && (this.overrideMaterial = e.overrideMaterial.clone()), this.matrixAutoUpdate = e.matrixAutoUpdate, this;
    }
    toJSON(e) {
      let t = super.toJSON(e);
      return this.fog !== null && (t.object.fog = this.fog.toJSON()), t.object.backgroundBlurriness = this.backgroundBlurriness, t.object.backgroundIntensity = this.backgroundIntensity, t.object.backgroundRotation = this.backgroundRotation.toArray(), t.object.environmentIntensity = this.environmentIntensity, t.object.environmentRotation = this.environmentRotation.toArray(), t;
    }
  },
  Mn = new q(),
  Nn = new q(),
  Pn = new q(),
  Fn = new q(),
  In = new q(),
  Ln = new q(),
  Rn = new q(),
  zn = new q(),
  Bn = new q(),
  Vn = new q(),
  Hn = new Ut(),
  Un = new Ut(),
  Wn = new Ut(),
  Gn = class e {
    constructor(e = new q(), t = new q(), n = new q()) {
      this.a = e, this.b = t, this.c = n;
    }
    static getNormal(normal, normalValue, normalInput, r) {
      r.subVectors(normalInput, normalValue), Mn.subVectors(normal, normalValue), r.cross(Mn);
      let lengthSq = r.lengthSq();
      return lengthSq > 0 ? r.multiplyScalar(1 / Math.sqrt(lengthSq)) : r.set(0, 0, 0);
    }
    static getBarycoord(barycoord, barycoordValue, barycoordInput, r, i) {
      Mn.subVectors(r, barycoordValue), Nn.subVectors(barycoordInput, barycoordValue), Pn.subVectors(barycoord, barycoordValue);
      let a = Mn.dot(Mn),
        o = Mn.dot(Nn),
        s = Mn.dot(Pn),
        c = Nn.dot(Nn),
        l = Nn.dot(Pn),
        u = a * c - o * o;
      if (u === 0) return i.set(0, 0, 0), null;
      let d = 1 / u,
        f = (c * s - o * l) * d,
        p = (a * l - o * s) * d;
      return i.set(1 - f - p, p, f);
    }
    static containsPoint(contains, point, pointValue, pointInput) {
      return this.getBarycoord(contains, point, pointValue, pointInput, Fn) !== null && Fn.x >= 0 && Fn.y >= 0 && Fn.x + Fn.y <= 1;
    }
    static getInterpolation(interpolation, interpolationValue, interpolationInput, r, i, a, o, s) {
      return this.getBarycoord(interpolation, interpolationValue, interpolationInput, r, Fn) === null ? (s.x = 0, s.y = 0, `z` in s && (s.z = 0), `w` in s && (s.w = 0), null) : (s.setScalar(0), s.addScaledVector(i, Fn.x), s.addScaledVector(a, Fn.y), s.addScaledVector(o, Fn.z), s);
    }
    static getInterpolatedAttribute(interpolated, attribute, attributeValue, attributeInput, i, a) {
      return Hn.setScalar(0), Un.setScalar(0), Wn.setScalar(0), Hn.fromBufferAttribute(interpolated, attribute), Un.fromBufferAttribute(interpolated, attributeValue), Wn.fromBufferAttribute(interpolated, attributeInput), a.setScalar(0), a.addScaledVector(Hn, i.x), a.addScaledVector(Un, i.y), a.addScaledVector(Wn, i.z), a;
    }
    static isFrontFacing(front, facing, facingValue, facingInput) {
      return Mn.subVectors(facingValue, facing), Nn.subVectors(front, facing), Mn.cross(Nn).dot(facingInput) < 0;
    }
    set(e, t, n) {
      return this.a.copy(e), this.b.copy(t), this.c.copy(n), this;
    }
    setFromPointsAndIndices(from, points, and, indices) {
      return this.a.copy(from[points]), this.b.copy(from[and]), this.c.copy(from[indices]), this;
    }
    setFromAttributeAndIndices(from, attribute, and, indices) {
      return this.a.fromBufferAttribute(from, attribute), this.b.fromBufferAttribute(from, and), this.c.fromBufferAttribute(from, indices), this;
    }
    clone() {
      return new this.constructor().copy(this);
    }
    copy(e) {
      return this.a.copy(e.a), this.b.copy(e.b), this.c.copy(e.c), this;
    }
    getArea() {
      return Mn.subVectors(this.c, this.b), Nn.subVectors(this.a, this.b), Mn.cross(Nn).length() * .5;
    }
    getMidpoint(midpoint) {
      return midpoint.addVectors(this.a, this.b).add(this.c).multiplyScalar(1 / 3);
    }
    getNormal(normal) {
      return e.getNormal(this.a, this.b, this.c, normal);
    }
    getPlane(plane) {
      return plane.setFromCoplanarPoints(this.a, this.b, this.c);
    }
    getBarycoord(barycoord, barycoordValue) {
      return e.getBarycoord(barycoord, this.a, this.b, this.c, barycoordValue);
    }
    getInterpolation(interpolation, interpolationValue, interpolationInput, i, a) {
      return e.getInterpolation(interpolation, this.a, this.b, this.c, interpolationValue, interpolationInput, i, a);
    }
    containsPoint(contains) {
      return e.containsPoint(contains, this.a, this.b, this.c);
    }
    isFrontFacing(front) {
      return e.isFrontFacing(this.a, this.b, this.c, front);
    }
    intersectsBox(intersects) {
      return intersects.intersectsTriangle(this);
    }
    closestPointToPoint(point, pointValue) {
      let n = this.a,
        r = this.b,
        i = this.c,
        flag,
        ratio;
      In.subVectors(r, n), Ln.subVectors(i, n), zn.subVectors(point, n);
      let s = In.dot(zn),
        c = Ln.dot(zn);
      if (s <= 0 && c <= 0) return pointValue.copy(n);
      Bn.subVectors(point, r);
      let l = In.dot(Bn),
        u = Ln.dot(Bn);
      if (l >= 0 && u <= l) return pointValue.copy(r);
      let d = s * u - l * c;
      if (d <= 0 && s >= 0 && l <= 0) return flag = s / (s - l), pointValue.copy(n).addScaledVector(In, flag);
      Vn.subVectors(point, i);
      let f = In.dot(Vn),
        p = Ln.dot(Vn);
      if (p >= 0 && f <= p) return pointValue.copy(i);
      let m = f * c - s * p;
      if (m <= 0 && c >= 0 && p <= 0) return ratio = c / (c - p), pointValue.copy(n).addScaledVector(Ln, ratio);
      let h = l * p - f * u;
      if (h <= 0 && u - l >= 0 && f - p >= 0) return Rn.subVectors(i, r), ratio = (u - l) / (u - l + (f - p)), pointValue.copy(r).addScaledVector(Rn, ratio);
      let g = 1 / (h + m + d);
      return flag = m * g, ratio = d * g, pointValue.copy(n).addScaledVector(In, flag).addScaledVector(Ln, ratio);
    }
    equals(equals) {
      return equals.a.equals(this.a) && equals.b.equals(this.b) && equals.c.equals(this.c);
    }
  },
  Kn = class {
    constructor(e = new q(1 / 0, 1 / 0, 1 / 0), t = new q(-1 / 0, -1 / 0, -1 / 0)) {
      this.isBox3 = true, this.min = e, this.max = t;
    }
    set(e, t) {
      return this.min.copy(e), this.max.copy(t), this;
    }
    setFromArray(count) {
      this.makeEmpty();
      for (let t = 0, n = count.length; t < n; t += 3) this.expandByPoint(Jn.fromArray(count, t));
      return this;
    }
    setFromBufferAttribute(from) {
      this.makeEmpty();
      for (let t = 0, n = from.count; t < n; t++) this.expandByPoint(Jn.fromBufferAttribute(from, t));
      return this;
    }
    setFromPoints(count) {
      this.makeEmpty();
      for (let t = 0, n = count.length; t < n; t++) this.expandByPoint(count[t]);
      return this;
    }
    setFromCenterAndSize(from, center) {
      let multiplyScalar = Jn.copy(center).multiplyScalar(.5);
      return this.min.copy(from).sub(multiplyScalar), this.max.copy(from).add(multiplyScalar), this;
    }
    setFromObject(from, t = false) {
      return this.makeEmpty(), this.expandByObject(from, t);
    }
    clone() {
      return new this.constructor().copy(this);
    }
    copy(e) {
      return this.min.copy(e.min), this.max.copy(e.max), this;
    }
    makeEmpty() {
      return this.min.x = this.min.y = this.min.z = 1 / 0, this.max.x = this.max.y = this.max.z = -1 / 0, this;
    }
    isEmpty() {
      return this.max.x < this.min.x || this.max.y < this.min.y || this.max.z < this.min.z;
    }
    getCenter(center) {
      return this.isEmpty() ? center.set(0, 0, 0) : center.addVectors(this.min, this.max).multiplyScalar(.5);
    }
    getSize(size) {
      return this.isEmpty() ? size.set(0, 0, 0) : size.subVectors(this.max, this.min);
    }
    expandByPoint(expand) {
      return this.min.min(expand), this.max.max(expand), this;
    }
    expandByVector(expand) {
      return this.min.sub(expand), this.max.add(expand), this;
    }
    expandByScalar(expand) {
      return this.min.addScalar(-expand), this.max.addScalar(expand), this;
    }
    expandByObject(expand, t = false) {
      expand.updateWorldMatrix(false, false);
      let geometry = expand.geometry;
      if (geometry !== undefined) {
        let attribute = geometry.getAttribute(`position`);
        if (t === true && attribute !== undefined && expand.isInstancedMesh !== true) for (let t = 0, n = attribute.count; t < n; t++) expand.isMesh === true ? expand.getVertexPosition(t, Jn) : Jn.fromBufferAttribute(attribute, t), Jn.applyMatrix4(expand.matrixWorld), this.expandByPoint(Jn);else expand.boundingBox === undefined ? (geometry.boundingBox === null && geometry.computeBoundingBox(), Yn.copy(geometry.boundingBox)) : (expand.boundingBox === null && expand.computeBoundingBox(), Yn.copy(expand.boundingBox)), Yn.applyMatrix4(expand.matrixWorld), this.union(Yn);
      }
      let r = expand.children;
      for (let e = 0, n = r.length; e < n; e++) this.expandByObject(r[e], t);
      return this;
    }
    containsPoint(contains) {
      return contains.x >= this.min.x && contains.x <= this.max.x && contains.y >= this.min.y && contains.y <= this.max.y && contains.z >= this.min.z && contains.z <= this.max.z;
    }
    containsBox(contains) {
      return this.min.x <= contains.min.x && contains.max.x <= this.max.x && this.min.y <= contains.min.y && contains.max.y <= this.max.y && this.min.z <= contains.min.z && contains.max.z <= this.max.z;
    }
    getParameter(parameter, parameterValue) {
      return parameterValue.set((parameter.x - this.min.x) / (this.max.x - this.min.x), (parameter.y - this.min.y) / (this.max.y - this.min.y), (parameter.z - this.min.z) / (this.max.z - this.min.z));
    }
    intersectsBox(intersects) {
      return intersects.max.x >= this.min.x && intersects.min.x <= this.max.x && intersects.max.y >= this.min.y && intersects.min.y <= this.max.y && intersects.max.z >= this.min.z && intersects.min.z <= this.max.z;
    }
    intersectsSphere(intersects) {
      return this.clampPoint(intersects.center, Jn), Jn.distanceToSquared(intersects.center) <= intersects.radius * intersects.radius;
    }
    intersectsPlane(intersects) {
      let total, count;
      return intersects.normal.x > 0 ? (total = intersects.normal.x * this.min.x, count = intersects.normal.x * this.max.x) : (total = intersects.normal.x * this.max.x, count = intersects.normal.x * this.min.x), intersects.normal.y > 0 ? (total += intersects.normal.y * this.min.y, count += intersects.normal.y * this.max.y) : (total += intersects.normal.y * this.max.y, count += intersects.normal.y * this.min.y), intersects.normal.z > 0 ? (total += intersects.normal.z * this.min.z, count += intersects.normal.z * this.max.z) : (total += intersects.normal.z * this.max.z, count += intersects.normal.z * this.min.z), total <= -intersects.constant && count >= -intersects.constant;
    }
    intersectsTriangle(intersects) {
      if (this.isEmpty()) return false;
      this.getCenter(nr), rr.subVectors(this.max, nr), Xn.subVectors(intersects.a, nr), Zn.subVectors(intersects.b, nr), Qn.subVectors(intersects.c, nr), $n.subVectors(Zn, Xn), er.subVectors(Qn, Zn), tr.subVectors(Xn, Qn);
      let t = [0, -$n.z, $n.y, 0, -er.z, er.y, 0, -tr.z, tr.y, $n.z, 0, -$n.x, er.z, 0, -er.x, tr.z, 0, -tr.x, -$n.y, $n.x, 0, -er.y, er.x, 0, -tr.y, tr.x, 0];
      return !or(t, Xn, Zn, Qn, rr) || (t = [1, 0, 0, 0, 1, 0, 0, 0, 1], !or(t, Xn, Zn, Qn, rr)) ? false : (ir.crossVectors($n, er), t = [ir.x, ir.y, ir.z], or(t, Xn, Zn, Qn, rr));
    }
    clampPoint(clamp, point) {
      return point.copy(clamp).clamp(this.min, this.max);
    }
    distanceToPoint(distance) {
      return this.clampPoint(distance, Jn).distanceTo(distance);
    }
    getBoundingSphere(bounding) {
      return this.isEmpty() ? bounding.makeEmpty() : (this.getCenter(bounding.center), bounding.radius = this.getSize(Jn).length() * .5), bounding;
    }
    intersect(intersect) {
      return this.min.max(intersect.min), this.max.min(intersect.max), this.isEmpty() && this.makeEmpty(), this;
    }
    union(e) {
      return this.min.min(e.min), this.max.max(e.max), this;
    }
    applyMatrix4(matrix4) {
      return this.isEmpty() ? this : (qn[0].set(this.min.x, this.min.y, this.min.z).applyMatrix4(matrix4), qn[1].set(this.min.x, this.min.y, this.max.z).applyMatrix4(matrix4), qn[2].set(this.min.x, this.max.y, this.min.z).applyMatrix4(matrix4), qn[3].set(this.min.x, this.max.y, this.max.z).applyMatrix4(matrix4), qn[4].set(this.max.x, this.min.y, this.min.z).applyMatrix4(matrix4), qn[5].set(this.max.x, this.min.y, this.max.z).applyMatrix4(matrix4), qn[6].set(this.max.x, this.max.y, this.min.z).applyMatrix4(matrix4), qn[7].set(this.max.x, this.max.y, this.max.z).applyMatrix4(matrix4), this.setFromPoints(qn), this);
    }
    translate(translate) {
      return this.min.add(translate), this.max.add(translate), this;
    }
    equals(equals) {
      return equals.min.equals(this.min) && equals.max.equals(this.max);
    }
    toJSON() {
      return {
        min: this.min.toArray(),
        max: this.max.toArray()
      };
    }
    fromJSON(e) {
      return this.min.fromArray(e.min), this.max.fromArray(e.max), this;
    }
  },
  qn = [new q(), new q(), new q(), new q(), new q(), new q(), new q(), new q()],
  Jn = new q(),
  Yn = new Kn(),
  Xn = new q(),
  Zn = new q(),
  Qn = new q(),
  $n = new q(),
  er = new q(),
  tr = new q(),
  nr = new q(),
  rr = new q(),
  ir = new q(),
  ar = new q();
function or(count, t, n, r, i) {
  for (let a = 0, o = count.length - 3; a <= o; a += 3) {
    ar.fromArray(count, a);
    let o = i.x * Math.abs(ar.x) + i.y * Math.abs(ar.y) + i.z * Math.abs(ar.z),
      s = t.dot(ar),
      c = n.dot(ar),
      l = r.dot(ar);
    if (Math.max(-Math.max(s, c, l), Math.min(s, c, l)) > o) return false;
  }
  return true;
}
var sr = new q(),
  cr = new K(),
  lr = 0,
  ur = class extends $e {
    constructor(count, constructor, n = false) {
      if (super(), Array.isArray(count)) throw TypeError(`THREE.BufferAttribute: array should be a Typed Array.`);
      this.isBufferAttribute = true, Object.defineProperty(this, "id", {
        value: lr++
      }), this.name = ``, this.array = count, this.itemSize = constructor, this.count = count === undefined ? 0 : count.length / constructor, this.normalized = n, this.usage = Be, this.updateRanges = [], this.gpuType = _, this.version = 0;
    }
    onUploadCallback() {}
    set needsUpdate(needs) {
      needs === true && this.version++;
    }
    setUsage(usage) {
      return this.usage = usage, this;
    }
    addUpdateRange(update, range) {
      this.updateRanges.push({
        start: update,
        count: range
      });
    }
    clearUpdateRanges() {
      this.updateRanges.length = 0;
    }
    copy(e) {
      return this.name = e.name, this.array = new e.array.constructor(e.array), this.itemSize = e.itemSize, this.count = e.count, this.normalized = e.normalized, this.usage = e.usage, this.gpuType = e.gpuType, this;
    }
    copyAt(e, t, n) {
      e *= this.itemSize, n *= t.itemSize;
      for (let r = 0, itemSize = this.itemSize; r < itemSize; r++) this.array[e + r] = t.array[n + r];
      return this;
    }
    copyArray(array) {
      return this.array.set(array), this;
    }
    applyMatrix3(matrix3) {
      if (this.itemSize === 2) for (let t = 0, n = this.count; t < n; t++) cr.fromBufferAttribute(this, t), cr.applyMatrix3(matrix3), this.setXY(t, cr.x, cr.y);else if (this.itemSize === 3) for (let t = 0, n = this.count; t < n; t++) sr.fromBufferAttribute(this, t), sr.applyMatrix3(matrix3), this.setXYZ(t, sr.x, sr.y, sr.z);
      return this;
    }
    applyMatrix4(matrix4) {
      for (let t = 0, n = this.count; t < n; t++) sr.fromBufferAttribute(this, t), sr.applyMatrix4(matrix4), this.setXYZ(t, sr.x, sr.y, sr.z);
      return this;
    }
    applyNormalMatrix(normal) {
      for (let t = 0, n = this.count; t < n; t++) sr.fromBufferAttribute(this, t), sr.applyNormalMatrix(normal), this.setXYZ(t, sr.x, sr.y, sr.z);
      return this;
    }
    transformDirection(transform) {
      for (let t = 0, n = this.count; t < n; t++) sr.fromBufferAttribute(this, t), sr.transformDirection(transform), this.setXYZ(t, sr.x, sr.y, sr.z);
      return this;
    }
    set(e, t = 0) {
      return this.array.set(e, t), this;
    }
    getComponent(component, componentValue) {
      let n = this.array[component * this.itemSize + componentValue];
      return this.normalized && (n = Ct(n, this.array)), n;
    }
    setComponent(component, componentValue, componentInput) {
      return this.normalized && (componentInput = wt(componentInput, this.array)), this.array[component * this.itemSize + componentValue] = componentInput, this;
    }
    getX(e) {
      let t = this.array[e * this.itemSize];
      return this.normalized && (t = Ct(t, this.array)), t;
    }
    setX(e, t) {
      return this.normalized && (t = wt(t, this.array)), this.array[e * this.itemSize] = t, this;
    }
    getY(e) {
      let t = this.array[e * this.itemSize + 1];
      return this.normalized && (t = Ct(t, this.array)), t;
    }
    setY(e, t) {
      return this.normalized && (t = wt(t, this.array)), this.array[e * this.itemSize + 1] = t, this;
    }
    getZ(e) {
      let t = this.array[e * this.itemSize + 2];
      return this.normalized && (t = Ct(t, this.array)), t;
    }
    setZ(e, t) {
      return this.normalized && (t = wt(t, this.array)), this.array[e * this.itemSize + 2] = t, this;
    }
    getW(e) {
      let t = this.array[e * this.itemSize + 3];
      return this.normalized && (t = Ct(t, this.array)), t;
    }
    setW(e, t) {
      return this.normalized && (t = wt(t, this.array)), this.array[e * this.itemSize + 3] = t, this;
    }
    setXY(e, t, n) {
      return e *= this.itemSize, this.normalized && (t = wt(t, this.array), n = wt(n, this.array)), this.array[e + 0] = t, this.array[e + 1] = n, this;
    }
    setXYZ(e, t, n, r) {
      return e *= this.itemSize, this.normalized && (t = wt(t, this.array), n = wt(n, this.array), r = wt(r, this.array)), this.array[e + 0] = t, this.array[e + 1] = n, this.array[e + 2] = r, this;
    }
    setXYZW(e, t, n, r, i) {
      return e *= this.itemSize, this.normalized && (t = wt(t, this.array), n = wt(n, this.array), r = wt(r, this.array), i = wt(i, this.array)), this.array[e + 0] = t, this.array[e + 1] = n, this.array[e + 2] = r, this.array[e + 3] = i, this;
    }
    onUpload(upload) {
      return this.onUploadCallback = upload, this;
    }
    clone() {
      return new this.constructor(this.array, this.itemSize).copy(this);
    }
    toJSON() {
      let e = {
        itemSize: this.itemSize,
        type: this.array.constructor.name,
        array: Array.from(this.array),
        normalized: this.normalized
      };
      return e.name = this.name, e.usage = this.usage, e.gpuType = this.gpuType, e;
    }
    dispose() {
      this.dispatchEvent({
        type: `dispose`
      });
    }
  },
  dr = class extends ur {
    constructor(constructor, constructorValue, constructorInput) {
      super(new Uint16Array(constructor), constructorValue, constructorInput);
    }
  },
  fr = class extends ur {
    constructor(constructor, constructorValue, constructorInput) {
      super(new Uint32Array(constructor), constructorValue, constructorInput);
    }
  },
  pr = class extends ur {
    constructor(constructor, constructorValue, constructorInput) {
      super(new Float32Array(constructor), constructorValue, constructorInput);
    }
  },
  mr = new Kn(),
  hr = new q(),
  gr = new q(),
  _r = class {
    constructor(e = new q(), t = -1) {
      this.isSphere = true, this.center = e, this.radius = t;
    }
    set(e, t) {
      return this.center.copy(e), this.radius = t, this;
    }
    setFromPoints(count, points) {
      let center = this.center;
      points === undefined ? mr.setFromPoints(count).getCenter(center) : center.copy(points);
      let r = 0;
      for (let t = 0, i = count.length; t < i; t++) r = Math.max(r, center.distanceToSquared(count[t]));
      return this.radius = Math.sqrt(r), this;
    }
    copy(e) {
      return this.center.copy(e.center), this.radius = e.radius, this;
    }
    isEmpty() {
      return this.radius < 0;
    }
    makeEmpty() {
      return this.center.set(0, 0, 0), this.radius = -1, this;
    }
    containsPoint(contains) {
      return contains.distanceToSquared(this.center) <= this.radius * this.radius;
    }
    distanceToPoint(distance) {
      return distance.distanceTo(this.center) - this.radius;
    }
    intersectsSphere(intersects) {
      let t = this.radius + intersects.radius;
      return intersects.center.distanceToSquared(this.center) <= t * t;
    }
    intersectsBox(intersects) {
      return intersects.intersectsSphere(this);
    }
    intersectsPlane(intersects) {
      return Math.abs(intersects.distanceToPoint(this.center)) <= this.radius;
    }
    clampPoint(clamp, point) {
      let distanceToSquared = this.center.distanceToSquared(clamp);
      return point.copy(clamp), distanceToSquared > this.radius * this.radius && (point.sub(this.center).normalize(), point.multiplyScalar(this.radius).add(this.center)), point;
    }
    getBoundingBox(bounding) {
      return this.isEmpty() ? (bounding.makeEmpty(), bounding) : (bounding.set(this.center, this.center), bounding.expandByScalar(this.radius), bounding);
    }
    applyMatrix4(matrix4) {
      return this.center.applyMatrix4(matrix4), this.radius *= matrix4.getMaxScaleOnAxis(), this;
    }
    translate(translate) {
      return this.center.add(translate), this;
    }
    expandByPoint(expand) {
      if (this.isEmpty()) return this.center.copy(expand), this.radius = 0, this;
      hr.subVectors(expand, this.center);
      let lengthSq = hr.lengthSq();
      if (lengthSq > this.radius * this.radius) {
        let e = Math.sqrt(lengthSq),
          n = (e - this.radius) * .5;
        this.center.addScaledVector(hr, n / e), this.radius += n;
      }
      return this;
    }
    union(e) {
      return e.isEmpty() ? this : this.isEmpty() ? (this.copy(e), this) : (this.center.equals(e.center) === true ? this.radius = Math.max(this.radius, e.radius) : (gr.subVectors(e.center, this.center).setLength(e.radius), this.expandByPoint(hr.copy(e.center).add(gr)), this.expandByPoint(hr.copy(e.center).sub(gr))), this);
    }
    equals(equals) {
      return equals.center.equals(this.center) && equals.radius === this.radius;
    }
    clone() {
      return new this.constructor().copy(this);
    }
    toJSON() {
      return {
        radius: this.radius,
        center: this.center.toArray()
      };
    }
    fromJSON(e) {
      return this.radius = e.radius, this.center.fromArray(e.center), this;
    }
  },
  vr = 0,
  yr = new Jt(),
  br = new Sn(),
  xr = new q(),
  Sr = new Kn(),
  Cr = new Kn(),
  wr = new q(),
  Tr = class e extends $e {
    constructor() {
      super(), this.isBufferGeometry = true, Object.defineProperty(this, "id", {
        value: vr++
      }), this.uuid = it(), this.name = ``, this.type = `BufferGeometry`, this.index = null, this.indirect = null, this.indirectOffset = 0, this.attributes = {}, this.morphAttributes = {}, this.morphTargetsRelative = false, this.groups = [], this.boundingBox = null, this.boundingSphere = null, this.drawRange = {
        start: 0,
        count: 1 / 0
      }, this.userData = {}, this._transformed = false;
    }
    getIndex() {
      return this.index;
    }
    setIndex(index) {
      return this.index = Array.isArray(index) ? new (Ue(index) ? fr : dr)(index, 1) : index, this;
    }
    setIndirect(indirect, t = 0) {
      return this.indirect = indirect, this.indirectOffset = t, this;
    }
    getIndirect() {
      return this.indirect;
    }
    getAttribute(attribute) {
      return this.attributes[attribute];
    }
    setAttribute(attribute, attributeValue) {
      return this.attributes[attribute] = attributeValue, this;
    }
    deleteAttribute(attribute) {
      return delete this.attributes[attribute], this;
    }
    hasAttribute(attribute) {
      return this.attributes[attribute] !== undefined;
    }
    addGroup(group, groupValue, n = 0) {
      this.groups.push({
        start: group,
        count: groupValue,
        materialIndex: n
      });
    }
    clearGroups() {
      this.groups = [];
    }
    setDrawRange(draw, range) {
      this.drawRange.start = draw, this.drawRange.count = range;
    }
    applyMatrix4(matrix4) {
      let position = this.attributes.position;
      position !== undefined && (position.applyMatrix4(matrix4), position.needsUpdate = true);
      let normal = this.attributes.normal;
      if (normal !== undefined) {
        let normalMatrix = new J().getNormalMatrix(matrix4);
        normal.applyNormalMatrix(normalMatrix), normal.needsUpdate = true;
      }
      let tangent = this.attributes.tangent;
      return tangent !== undefined && (tangent.transformDirection(matrix4), tangent.needsUpdate = true), this.boundingBox !== null && this.computeBoundingBox(), this.boundingSphere !== null && this.computeBoundingSphere(), this._transformed = true, this;
    }
    applyQuaternion(quaternion) {
      return yr.makeRotationFromQuaternion(quaternion), this.applyMatrix4(yr), this;
    }
    rotateX(rotate) {
      return yr.makeRotationX(rotate), this.applyMatrix4(yr), this;
    }
    rotateY(rotate) {
      return yr.makeRotationY(rotate), this.applyMatrix4(yr), this;
    }
    rotateZ(rotate) {
      return yr.makeRotationZ(rotate), this.applyMatrix4(yr), this;
    }
    translate(translate, translateValue, translateInput) {
      return yr.makeTranslation(translate, translateValue, translateInput), this.applyMatrix4(yr), this;
    }
    scale(e, t, n) {
      return yr.makeScale(e, t, n), this.applyMatrix4(yr), this;
    }
    lookAt(look) {
      return br.lookAt(look), br.updateMatrix(), this.applyMatrix4(br.matrix), this;
    }
    center() {
      return this.computeBoundingBox(), this.boundingBox.getCenter(xr).negate(), this.translate(xr.x, xr.y, xr.z), this;
    }
    setFromPoints(count) {
      let attribute = this.getAttribute(`position`);
      if (attribute === undefined) {
        let emptyItems = [];
        for (let n = 0, r = count.length; n < r; n++) {
          let r = count[n];
          emptyItems.push(r.x, r.y, r.z || 0);
        }
        this.setAttribute(`position`, new pr(emptyItems, 3));
      } else {
        let n = Math.min(count.length, attribute.count);
        for (let r = 0; r < n; r++) {
          let n = count[r];
          attribute.setXYZ(r, n.x, n.y, n.z || 0);
        }
        count.length > attribute.count && U(`BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry.`), attribute.needsUpdate = true;
      }
      return this;
    }
    computeBoundingBox() {
      this.boundingBox === null && (this.boundingBox = new Kn());
      let position = this.attributes.position,
        t = this.morphAttributes.position;
      if (position && position.isGLBufferAttribute) {
        W(`BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.`, this), this.boundingBox.set(new q(-1 / 0, -1 / 0, -1 / 0), new q(1 / 0, 1 / 0, 1 / 0));
        return;
      }
      if (position !== undefined) {
        if (this.boundingBox.setFromBufferAttribute(position), t) for (let e = 0, n = t.length; e < n; e++) {
          let n = t[e];
          Sr.setFromBufferAttribute(n), this.morphTargetsRelative ? (wr.addVectors(this.boundingBox.min, Sr.min), this.boundingBox.expandByPoint(wr), wr.addVectors(this.boundingBox.max, Sr.max), this.boundingBox.expandByPoint(wr)) : (this.boundingBox.expandByPoint(Sr.min), this.boundingBox.expandByPoint(Sr.max));
        }
      } else this.boundingBox.makeEmpty();
      (isNaN(this.boundingBox.min.x) || isNaN(this.boundingBox.min.y) || isNaN(this.boundingBox.min.z)) && W(`BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.`, this);
    }
    computeBoundingSphere() {
      this.boundingSphere === null && (this.boundingSphere = new _r());
      let position = this.attributes.position,
        t = this.morphAttributes.position;
      if (position && position.isGLBufferAttribute) {
        W(`BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.`, this), this.boundingSphere.set(new q(), 1 / 0);
        return;
      }
      if (position) {
        let center = this.boundingSphere.center;
        if (Sr.setFromBufferAttribute(position), t) for (let e = 0, n = t.length; e < n; e++) {
          let n = t[e];
          Cr.setFromBufferAttribute(n), this.morphTargetsRelative ? (wr.addVectors(Sr.min, Cr.min), Sr.expandByPoint(wr), wr.addVectors(Sr.max, Cr.max), Sr.expandByPoint(wr)) : (Sr.expandByPoint(Cr.min), Sr.expandByPoint(Cr.max));
        }
        Sr.getCenter(center);
        let r = 0;
        for (let t = 0, i = position.count; t < i; t++) wr.fromBufferAttribute(position, t), r = Math.max(r, center.distanceToSquared(wr));
        if (t) for (let i = 0, a = t.length; i < a; i++) {
          let a = t[i],
            morphTargetsRelative = this.morphTargetsRelative;
          for (let t = 0, i = a.count; t < i; t++) wr.fromBufferAttribute(a, t), morphTargetsRelative && (xr.fromBufferAttribute(position, t), wr.add(xr)), r = Math.max(r, center.distanceToSquared(wr));
        }
        this.boundingSphere.radius = Math.sqrt(r), isNaN(this.boundingSphere.radius) && W(`BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.`, this);
      }
    }
    computeTangents() {
      let e = this.index,
        attributes = this.attributes;
      if (e === null || attributes.position === undefined || attributes.normal === undefined || attributes.uv === undefined) {
        W(`BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)`);
        return;
      }
      let position = attributes.position,
        normal = attributes.normal,
        i = attributes.uv,
        attribute = this.getAttribute(`tangent`);
      (attribute === undefined || attribute.count !== position.count) && (attribute = new ur(new Float32Array(4 * position.count), 4), this.setAttribute(`tangent`, attribute));
      let emptyItems = [],
        total = [];
      for (let e = 0; e < position.count; e++) emptyItems[e] = new q(), total[e] = new q();
      let c = new q(),
        l = new q(),
        u = new q(),
        d = new K(),
        f = new K(),
        p = new K(),
        m = new q(),
        h = new q();
      function g(e, t, r) {
        c.fromBufferAttribute(position, e), l.fromBufferAttribute(position, t), u.fromBufferAttribute(position, r), d.fromBufferAttribute(i, e), f.fromBufferAttribute(i, t), p.fromBufferAttribute(i, r), l.sub(c), u.sub(c), f.sub(d), p.sub(d);
        let a = 1 / (f.x * p.y - p.x * f.y);
        isFinite(a) && (m.copy(l).multiplyScalar(p.y).addScaledVector(u, -f.y).multiplyScalar(a), h.copy(u).multiplyScalar(f.x).addScaledVector(l, -p.x).multiplyScalar(a), emptyItems[e].add(m), emptyItems[t].add(m), emptyItems[r].add(m), total[e].add(h), total[t].add(h), total[r].add(h));
      }
      let _ = this.groups;
      _.length === 0 && (_ = [{
        start: 0,
        count: e.count
      }]);
      for (let t = 0, n = _.length; t < n; ++t) {
        let n = _[t],
          r = n.start,
          i = n.count;
        for (let t = r, n = r + i; t < n; t += 3) g(e.getX(t + 0), e.getX(t + 1), e.getX(t + 2));
      }
      let v = new q(),
        y = new q(),
        b = new q(),
        x = new q();
      function S(e) {
        b.fromBufferAttribute(normal, e), x.copy(b);
        let t = emptyItems[e];
        v.copy(t), v.sub(b.multiplyScalar(b.dot(t))).normalize(), y.crossVectors(x, t);
        let n = y.dot(total[e]) < 0 ? -1 : 1;
        attribute.setXYZW(e, v.x, v.y, v.z, n);
      }
      for (let t = 0, n = _.length; t < n; ++t) {
        let n = _[t],
          r = n.start,
          i = n.count;
        for (let t = r, n = r + i; t < n; t += 3) S(e.getX(t + 0)), S(e.getX(t + 1)), S(e.getX(t + 2));
      }
      this._transformed = true;
    }
    computeVertexNormals() {
      let e = this.index,
        attribute = this.getAttribute(`position`);
      if (attribute !== undefined) {
        let attributeResult = this.getAttribute(`normal`);
        if (attributeResult === undefined || attributeResult.count !== attribute.count) attributeResult = new ur(new Float32Array(attribute.count * 3), 3), this.setAttribute(`normal`, attributeResult);else for (let e = 0, t = attributeResult.count; e < t; e++) attributeResult.setXYZ(e, 0, 0, 0);
        let r = new q(),
          i = new q(),
          a = new q(),
          o = new q(),
          s = new q(),
          c = new q(),
          l = new q(),
          u = new q();
        if (e) for (let d = 0, f = e.count; d < f; d += 3) {
          let f = e.getX(d + 0),
            p = e.getX(d + 1),
            m = e.getX(d + 2);
          r.fromBufferAttribute(attribute, f), i.fromBufferAttribute(attribute, p), a.fromBufferAttribute(attribute, m), l.subVectors(a, i), u.subVectors(r, i), l.cross(u), o.fromBufferAttribute(attributeResult, f), s.fromBufferAttribute(attributeResult, p), c.fromBufferAttribute(attributeResult, m), o.add(l), s.add(l), c.add(l), attributeResult.setXYZ(f, o.x, o.y, o.z), attributeResult.setXYZ(p, s.x, s.y, s.z), attributeResult.setXYZ(m, c.x, c.y, c.z);
        } else for (let e = 0, o = attribute.count; e < o; e += 3) r.fromBufferAttribute(attribute, e + 0), i.fromBufferAttribute(attribute, e + 1), a.fromBufferAttribute(attribute, e + 2), l.subVectors(a, i), u.subVectors(r, i), l.cross(u), attributeResult.setXYZ(e + 0, l.x, l.y, l.z), attributeResult.setXYZ(e + 1, l.x, l.y, l.z), attributeResult.setXYZ(e + 2, l.x, l.y, l.z);
        this.normalizeNormals(), attributeResult.needsUpdate = true;
      }
    }
    normalizeNormals() {
      let normal = this.attributes.normal;
      for (let t = 0, n = normal.count; t < n; t++) wr.fromBufferAttribute(normal, t), wr.normalize(), normal.setXYZ(t, wr.x, wr.y, wr.z);
    }
    toNonIndexed() {
      function t(e, count) {
        let array = e.array,
          itemSize = e.itemSize,
          normalized = e.normalized,
          a = new array.constructor(count.length * itemSize),
          o = 0,
          s = 0;
        for (let i = 0, c = count.length; i < c; i++) {
          o = e.isInterleavedBufferAttribute ? count[i] * e.data.stride + e.offset : count[i] * itemSize;
          for (let e = 0; e < itemSize; e++) a[s++] = array[o++];
        }
        return new ur(a, itemSize, normalized);
      }
      if (this.index === null) return U(`BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed.`), this;
      let n = new e(),
        array = this.index.array,
        attributes = this.attributes;
      for (let ratio in attributes) {
        let a = attributes[ratio],
          o = t(a, array);
        n.setAttribute(ratio, o);
      }
      let morphAttributes = this.morphAttributes;
      for (let ratio in morphAttributes) {
        let emptyItems = [],
          o = morphAttributes[ratio];
        for (let e = 0, n = o.length; e < n; e++) {
          let n = o[e],
            a = t(n, array);
          emptyItems.push(a);
        }
        n.morphAttributes[ratio] = emptyItems;
      }
      n.morphTargetsRelative = this.morphTargetsRelative;
      let groups = this.groups;
      for (let e = 0, t = groups.length; e < t; e++) {
        let t = groups[e];
        n.addGroup(t.start, t.count, t.materialIndex);
      }
      return n;
    }
    toJSON() {
      let e = {
        metadata: {
          version: 4.7,
          type: `BufferGeometry`,
          generator: `BufferGeometry.toJSON`
        }
      };
      if (e.uuid = this.uuid, e.type = this.parameters !== undefined && this._transformed === true ? `BufferGeometry` : this.type, e.name = this.name, Object.keys(this.userData).length > 0 && (e.userData = this.userData), this.parameters !== undefined && this._transformed !== true) {
        let parameters = this.parameters;
        for (let count in parameters) parameters[count] !== undefined && (e[count] = parameters[count]);
        return e;
      }
      e.data = {
        attributes: {}
      };
      let t = this.index;
      t !== null && (e.data.index = {
        type: t.array.constructor.name,
        array: Array.prototype.slice.call(t.array)
      });
      let attributes = this.attributes;
      for (let total in attributes) {
        let r = attributes[total];
        e.data.attributes[total] = r.toJSON(e.data);
      }
      let r = {},
        i = false;
      for (let total in this.morphAttributes) {
        let n = this.morphAttributes[total],
          emptyItems = [];
        for (let t = 0, r = n.length; t < r; t++) {
          let r = n[t];
          emptyItems.push(r.toJSON(e.data));
        }
        emptyItems.length > 0 && (r[total] = emptyItems, i = true);
      }
      i && (e.data.morphAttributes = r, e.data.morphTargetsRelative = this.morphTargetsRelative);
      let groups = this.groups;
      groups.length > 0 && (e.data.groups = JSON.parse(JSON.stringify(groups)));
      let boundingSphere = this.boundingSphere;
      return boundingSphere !== null && (e.data.boundingSphere = boundingSphere.toJSON()), e;
    }
    clone() {
      return new this.constructor().copy(this);
    }
    copy(e) {
      this.index = null, this.attributes = {}, this.morphAttributes = {}, this.groups = [], this.boundingBox = null, this.boundingSphere = null;
      let t = {};
      this.name = e.name;
      let n = e.index;
      n !== null && this.setIndex(n.clone());
      let attributes = e.attributes;
      for (let ratio in attributes) {
        let n = attributes[ratio];
        this.setAttribute(ratio, n.clone(t));
      }
      let morphAttributes = e.morphAttributes;
      for (let ratio in morphAttributes) {
        let emptyItems = [],
          r = morphAttributes[ratio];
        for (let e = 0, i = r.length; e < i; e++) emptyItems.push(r[e].clone(t));
        this.morphAttributes[ratio] = emptyItems;
      }
      this.morphTargetsRelative = e.morphTargetsRelative;
      let groups = e.groups;
      for (let e = 0, t = groups.length; e < t; e++) {
        let t = groups[e];
        this.addGroup(t.start, t.count, t.materialIndex);
      }
      let boundingBox = e.boundingBox;
      boundingBox !== null && (this.boundingBox = boundingBox.clone());
      let boundingSphere = e.boundingSphere;
      return boundingSphere !== null && (this.boundingSphere = boundingSphere.clone()), this.drawRange.start = e.drawRange.start, this.drawRange.count = e.drawRange.count, this.userData = e.userData, this._transformed = e._transformed, this;
    }
    dispose() {
      this.dispatchEvent({
        type: `dispose`
      });
    }
  },
  Er = new q(),
  Dr = new q(),
  Or = new J(),
  kr = class {
    constructor(e = new q(1, 0, 0), t = 0) {
      this.isPlane = true, this.normal = e, this.constant = t;
    }
    set(e, t) {
      return this.normal.copy(e), this.constant = t, this;
    }
    setComponents(components, componentsValue, componentsInput, r) {
      return this.normal.set(components, componentsValue, componentsInput), this.constant = r, this;
    }
    setFromNormalAndCoplanarPoint(from, normal) {
      return this.normal.copy(from), this.constant = -normal.dot(this.normal), this;
    }
    setFromCoplanarPoints(from, coplanar, points) {
      let normalize = Er.subVectors(points, coplanar).cross(Dr.subVectors(from, coplanar)).normalize();
      return this.setFromNormalAndCoplanarPoint(normalize, from), this;
    }
    copy(e) {
      return this.normal.copy(e.normal), this.constant = e.constant, this;
    }
    normalize() {
      let e = 1 / this.normal.length();
      return this.normal.multiplyScalar(e), this.constant *= e, this;
    }
    negate() {
      return this.constant *= -1, this.normal.negate(), this;
    }
    distanceToPoint(distance) {
      return this.normal.dot(distance) + this.constant;
    }
    distanceToSphere(distance) {
      return this.distanceToPoint(distance.center) - distance.radius;
    }
    projectPoint(project, point) {
      return point.copy(project).addScaledVector(this.normal, -this.distanceToPoint(project));
    }
    intersectLine(intersect, line, n = true) {
      let r = intersect.delta(Er),
        i = this.normal.dot(r);
      if (i === 0) return this.distanceToPoint(intersect.start) === 0 ? line.copy(intersect.start) : null;
      let a = -(intersect.start.dot(this.normal) + this.constant) / i;
      return n === true && (a < 0 || a > 1) ? null : line.copy(intersect.start).addScaledVector(r, a);
    }
    intersectsLine(intersects) {
      let distanceToPoint = this.distanceToPoint(intersects.start),
        distanceToPointResult = this.distanceToPoint(intersects.end);
      return distanceToPoint < 0 && distanceToPointResult > 0 || distanceToPointResult < 0 && distanceToPoint > 0;
    }
    intersectsBox(intersects) {
      return intersects.intersectsPlane(this);
    }
    intersectsSphere(intersects) {
      return intersects.intersectsPlane(this);
    }
    coplanarPoint(coplanar) {
      return coplanar.copy(this.normal).multiplyScalar(-this.constant);
    }
    applyMatrix4(matrix4, matrix4Value) {
      let matrix4ValueValue = matrix4Value || Or.getNormalMatrix(matrix4),
        matrix4Result = this.coplanarPoint(Er).applyMatrix4(matrix4),
        normalize = this.normal.applyMatrix3(matrix4ValueValue).normalize();
      return this.constant = -matrix4Result.dot(normalize), this;
    }
    translate(translate) {
      return this.constant -= translate.dot(this.normal), this;
    }
    equals(equals) {
      return equals.normal.equals(this.normal) && equals.constant === this.constant;
    }
    clone() {
      return new this.constructor().copy(this);
    }
    toJSON() {
      return {
        normal: this.normal.toArray(),
        constant: this.constant
      };
    }
    fromJSON(e) {
      return this.normal.fromArray(e.normal), this.constant = e.constant, this;
    }
  },
  Ar = 0,
  jr = class extends $e {
    constructor() {
      super(), this.isMaterial = true, Object.defineProperty(this, "id", {
        value: Ar++
      }), this.uuid = it(), this.name = ``, this.type = `Material`, this.blending = 1, this.side = 0, this.vertexColors = false, this.opacity = 1, this.transparent = false, this.alphaHash = false, this.blendSrc = 204, this.blendDst = 205, this.blendEquation = 100, this.blendSrcAlpha = null, this.blendDstAlpha = null, this.blendEquationAlpha = null, this.blendColor = new X(0, 0, 0), this.blendAlpha = 0, this.depthFunc = 3, this.depthTest = true, this.depthWrite = true, this.stencilWriteMask = 255, this.stencilFunc = 519, this.stencilRef = 0, this.stencilFuncMask = 255, this.stencilFail = ze, this.stencilZFail = ze, this.stencilZPass = ze, this.stencilWrite = false, this.clippingPlanes = null, this.clipIntersection = false, this.clipShadows = false, this.shadowSide = null, this.colorWrite = true, this.precision = null, this.polygonOffset = false, this.polygonOffsetFactor = 0, this.polygonOffsetUnits = 0, this.dithering = false, this.alphaToCoverage = false, this.premultipliedAlpha = false, this.forceSinglePass = false, this.allowOverride = true, this.visible = true, this.toneMapped = true, this.userData = {}, this.version = 0, this._alphaTest = 0;
    }
    get alphaTest() {
      return this._alphaTest;
    }
    set alphaTest(alpha) {
      this._alphaTest > 0 != alpha > 0 && this.version++, this._alphaTest = alpha;
    }
    onBeforeRender() {}
    onBeforeCompile() {}
    customProgramCacheKey() {
      return this.onBeforeCompile.toString();
    }
    setValues(values) {
      if (values !== undefined) for (let total in values) {
        let n = values[total];
        if (n === undefined) {
          U(`Material: parameter '${total}' has value of undefined.`);
          continue;
        }
        let r = this[total];
        if (r === undefined) {
          U(`Material: '${total}' is not a property of THREE.${this.type}.`);
          continue;
        }
        r && r.isColor ? r.set(n) : r && r.isVector2 && n && n.isVector2 || r && r.isEuler && n && n.isEuler || r && r.isVector3 && n && n.isVector3 ? r.copy(n) : this[total] = n;
      }
    }
    toJSON(e) {
      let fallbackValue = e === undefined || typeof e == `string`;
      fallbackValue && (e = {
        textures: {},
        images: {}
      });
      let n = {
        metadata: {
          version: 4.7,
          type: `Material`,
          generator: `Material.toJSON`
        }
      };
      n.uuid = this.uuid, n.type = this.type, n.blending = this.blending, n.side = this.side, n.shadowSide = this.shadowSide, n.vertexColors = this.vertexColors, n.opacity = this.opacity, n.transparent = this.transparent, n.blendSrc = this.blendSrc, n.blendDst = this.blendDst, n.blendEquation = this.blendEquation, n.blendSrcAlpha = this.blendSrcAlpha, n.blendDstAlpha = this.blendDstAlpha, n.blendEquationAlpha = this.blendEquationAlpha, n.blendColor = this.blendColor.getHex(), n.blendAlpha = this.blendAlpha, n.depthFunc = this.depthFunc, n.depthTest = this.depthTest, n.depthWrite = this.depthWrite, n.colorWrite = this.colorWrite, n.clipIntersection = this.clipIntersection, n.clipShadows = this.clipShadows, n.stencilWriteMask = this.stencilWriteMask, n.stencilFunc = this.stencilFunc, n.stencilRef = this.stencilRef, n.stencilFuncMask = this.stencilFuncMask, n.stencilFail = this.stencilFail, n.stencilZFail = this.stencilZFail, n.stencilZPass = this.stencilZPass, n.stencilWrite = this.stencilWrite, n.polygonOffset = this.polygonOffset, n.polygonOffsetFactor = this.polygonOffsetFactor, n.polygonOffsetUnits = this.polygonOffsetUnits, n.dithering = this.dithering, n.alphaTest = this.alphaTest, n.alphaHash = this.alphaHash, n.alphaToCoverage = this.alphaToCoverage, n.premultipliedAlpha = this.premultipliedAlpha, n.forceSinglePass = this.forceSinglePass, n.allowOverride = this.allowOverride, n.visible = this.visible, n.toneMapped = this.toneMapped, n.name = this.name, this.color && this.color.isColor && (n.color = this.color.getHex()), this.roughness !== undefined && (n.roughness = this.roughness), this.metalness !== undefined && (n.metalness = this.metalness), this.sheen !== undefined && (n.sheen = this.sheen), this.sheenColor && this.sheenColor.isColor && (n.sheenColor = this.sheenColor.getHex()), this.sheenRoughness !== undefined && (n.sheenRoughness = this.sheenRoughness), this.emissive && this.emissive.isColor && (n.emissive = this.emissive.getHex()), this.emissiveIntensity !== undefined && (n.emissiveIntensity = this.emissiveIntensity), this.specular && this.specular.isColor && (n.specular = this.specular.getHex()), this.specularIntensity !== undefined && (n.specularIntensity = this.specularIntensity), this.specularColor && this.specularColor.isColor && (n.specularColor = this.specularColor.getHex()), this.shininess !== undefined && (n.shininess = this.shininess), this.clearcoat !== undefined && (n.clearcoat = this.clearcoat), this.clearcoatRoughness !== undefined && (n.clearcoatRoughness = this.clearcoatRoughness), this.clearcoatMap && this.clearcoatMap.isTexture && (n.clearcoatMap = this.clearcoatMap.toJSON(e).uuid), this.clearcoatRoughnessMap && this.clearcoatRoughnessMap.isTexture && (n.clearcoatRoughnessMap = this.clearcoatRoughnessMap.toJSON(e).uuid), this.clearcoatNormalMap && this.clearcoatNormalMap.isTexture && (n.clearcoatNormalMap = this.clearcoatNormalMap.toJSON(e).uuid, n.clearcoatNormalScale = this.clearcoatNormalScale.toArray()), this.sheenColorMap && this.sheenColorMap.isTexture && (n.sheenColorMap = this.sheenColorMap.toJSON(e).uuid), this.sheenRoughnessMap && this.sheenRoughnessMap.isTexture && (n.sheenRoughnessMap = this.sheenRoughnessMap.toJSON(e).uuid), this.dispersion !== undefined && (n.dispersion = this.dispersion), this.retroreflectivity !== undefined && (n.retroreflectivity = this.retroreflectivity), this.iridescence !== undefined && (n.iridescence = this.iridescence), this.iridescenceIOR !== undefined && (n.iridescenceIOR = this.iridescenceIOR), this.iridescenceThicknessRange !== undefined && (n.iridescenceThicknessRange = this.iridescenceThicknessRange), this.iridescenceMap && this.iridescenceMap.isTexture && (n.iridescenceMap = this.iridescenceMap.toJSON(e).uuid), this.iridescenceThicknessMap && this.iridescenceThicknessMap.isTexture && (n.iridescenceThicknessMap = this.iridescenceThicknessMap.toJSON(e).uuid), this.anisotropy !== undefined && (n.anisotropy = this.anisotropy), this.anisotropyRotation !== undefined && (n.anisotropyRotation = this.anisotropyRotation), this.anisotropyMap && this.anisotropyMap.isTexture && (n.anisotropyMap = this.anisotropyMap.toJSON(e).uuid), this.map && this.map.isTexture && (n.map = this.map.toJSON(e).uuid), this.matcap && this.matcap.isTexture && (n.matcap = this.matcap.toJSON(e).uuid), this.alphaMap && this.alphaMap.isTexture && (n.alphaMap = this.alphaMap.toJSON(e).uuid), this.lightMap && this.lightMap.isTexture && (n.lightMap = this.lightMap.toJSON(e).uuid, n.lightMapIntensity = this.lightMapIntensity), this.aoMap && this.aoMap.isTexture && (n.aoMap = this.aoMap.toJSON(e).uuid, n.aoMapIntensity = this.aoMapIntensity), this.bumpMap && this.bumpMap.isTexture && (n.bumpMap = this.bumpMap.toJSON(e).uuid, n.bumpScale = this.bumpScale), this.normalMap && this.normalMap.isTexture && (n.normalMap = this.normalMap.toJSON(e).uuid, n.normalMapType = this.normalMapType, n.normalScale = this.normalScale.toArray()), this.displacementMap && this.displacementMap.isTexture && (n.displacementMap = this.displacementMap.toJSON(e).uuid, n.displacementScale = this.displacementScale, n.displacementBias = this.displacementBias), this.roughnessMap && this.roughnessMap.isTexture && (n.roughnessMap = this.roughnessMap.toJSON(e).uuid), this.metalnessMap && this.metalnessMap.isTexture && (n.metalnessMap = this.metalnessMap.toJSON(e).uuid), this.emissiveMap && this.emissiveMap.isTexture && (n.emissiveMap = this.emissiveMap.toJSON(e).uuid), this.specularMap && this.specularMap.isTexture && (n.specularMap = this.specularMap.toJSON(e).uuid), this.specularIntensityMap && this.specularIntensityMap.isTexture && (n.specularIntensityMap = this.specularIntensityMap.toJSON(e).uuid), this.specularColorMap && this.specularColorMap.isTexture && (n.specularColorMap = this.specularColorMap.toJSON(e).uuid), this.envMap && this.envMap.isTexture && (n.envMap = this.envMap.toJSON(e).uuid, this.combine !== undefined && (n.combine = this.combine)), this.envMapRotation !== undefined && (n.envMapRotation = this.envMapRotation.toArray()), this.envMapIntensity !== undefined && (n.envMapIntensity = this.envMapIntensity), this.reflectivity !== undefined && (n.reflectivity = this.reflectivity), this.refractionRatio !== undefined && (n.refractionRatio = this.refractionRatio), this.gradientMap && this.gradientMap.isTexture && (n.gradientMap = this.gradientMap.toJSON(e).uuid), this.transmission !== undefined && (n.transmission = this.transmission), this.transmissionMap && this.transmissionMap.isTexture && (n.transmissionMap = this.transmissionMap.toJSON(e).uuid), this.thickness !== undefined && (n.thickness = this.thickness), this.thicknessMap && this.thicknessMap.isTexture && (n.thicknessMap = this.thicknessMap.toJSON(e).uuid), this.attenuationDistance !== undefined && (n.attenuationDistance = this.attenuationDistance), this.attenuationColor !== undefined && (n.attenuationColor = this.attenuationColor.getHex()), this.size !== undefined && (n.size = this.size), this.sizeAttenuation !== undefined && (n.sizeAttenuation = this.sizeAttenuation), Array.isArray(this.clippingPlanes) && this.clippingPlanes.length > 0 && (n.clippingPlanes = this.clippingPlanes.map(item => item.toJSON())), this.rotation !== undefined && (n.rotation = this.rotation), this.depthPacking !== undefined && (n.depthPacking = this.depthPacking), this.linewidth !== undefined && (n.linewidth = this.linewidth), this.linecap !== undefined && (n.linecap = this.linecap), this.linejoin !== undefined && (n.linejoin = this.linejoin), this.dashSize !== undefined && (n.dashSize = this.dashSize), this.gapSize !== undefined && (n.gapSize = this.gapSize), this.scale !== undefined && (n.scale = this.scale), this.wireframe !== undefined && (n.wireframe = this.wireframe), this.wireframeLinewidth !== undefined && (n.wireframeLinewidth = this.wireframeLinewidth), this.wireframeLinecap !== undefined && (n.wireframeLinecap = this.wireframeLinecap), this.wireframeLinejoin !== undefined && (n.wireframeLinejoin = this.wireframeLinejoin), this.flatShading !== undefined && (n.flatShading = this.flatShading), this.fog !== undefined && (n.fog = this.fog), Object.keys(this.userData).length > 0 && (n.userData = this.userData);
      function r(e) {
        let emptyItems = [];
        for (let count in e) {
          let r = e[count];
          delete r.metadata, emptyItems.push(r);
        }
        return emptyItems;
      }
      if (fallbackValue) {
        let t = r(e.textures),
          i = r(e.images);
        t.length > 0 && (n.textures = t), i.length > 0 && (n.images = i);
      }
      return n;
    }
    fromJSON(items, t) {
      if (items.uuid !== undefined && (this.uuid = items.uuid), items.name !== undefined && (this.name = items.name), items.color !== undefined && this.color !== undefined && this.color.setHex(items.color), items.roughness !== undefined && (this.roughness = items.roughness), items.metalness !== undefined && (this.metalness = items.metalness), items.sheen !== undefined && (this.sheen = items.sheen), items.sheenColor !== undefined && (this.sheenColor = new X().setHex(items.sheenColor)), items.sheenRoughness !== undefined && (this.sheenRoughness = items.sheenRoughness), items.emissive !== undefined && this.emissive !== undefined && this.emissive.setHex(items.emissive), items.specular !== undefined && this.specular !== undefined && this.specular.setHex(items.specular), items.specularIntensity !== undefined && (this.specularIntensity = items.specularIntensity), items.specularColor !== undefined && this.specularColor !== undefined && this.specularColor.setHex(items.specularColor), items.shininess !== undefined && (this.shininess = items.shininess), items.clearcoat !== undefined && (this.clearcoat = items.clearcoat), items.clearcoatRoughness !== undefined && (this.clearcoatRoughness = items.clearcoatRoughness), items.dispersion !== undefined && (this.dispersion = items.dispersion), items.retroreflectivity !== undefined && (this.retroreflectivity = items.retroreflectivity), items.iridescence !== undefined && (this.iridescence = items.iridescence), items.iridescenceIOR !== undefined && (this.iridescenceIOR = items.iridescenceIOR), items.iridescenceThicknessRange !== undefined && (this.iridescenceThicknessRange = items.iridescenceThicknessRange), items.transmission !== undefined && (this.transmission = items.transmission), items.thickness !== undefined && (this.thickness = items.thickness), items.attenuationDistance !== undefined && (this.attenuationDistance = items.attenuationDistance), items.attenuationColor !== undefined && this.attenuationColor !== undefined && this.attenuationColor.setHex(items.attenuationColor), items.anisotropy !== undefined && (this.anisotropy = items.anisotropy), items.anisotropyRotation !== undefined && (this.anisotropyRotation = items.anisotropyRotation), items.fog !== undefined && (this.fog = items.fog), items.flatShading !== undefined && (this.flatShading = items.flatShading), items.blending !== undefined && (this.blending = items.blending), items.combine !== undefined && (this.combine = items.combine), items.side !== undefined && (this.side = items.side), items.shadowSide !== undefined && (this.shadowSide = items.shadowSide), items.opacity !== undefined && (this.opacity = items.opacity), items.transparent !== undefined && (this.transparent = items.transparent), items.alphaTest !== undefined && (this.alphaTest = items.alphaTest), items.alphaHash !== undefined && (this.alphaHash = items.alphaHash), items.depthFunc !== undefined && (this.depthFunc = items.depthFunc), items.depthTest !== undefined && (this.depthTest = items.depthTest), items.depthWrite !== undefined && (this.depthWrite = items.depthWrite), items.colorWrite !== undefined && (this.colorWrite = items.colorWrite), items.clippingPlanes !== undefined && (this.clippingPlanes = items.clippingPlanes.map(item => new kr().fromJSON(item))), items.clipIntersection !== undefined && (this.clipIntersection = items.clipIntersection), items.clipShadows !== undefined && (this.clipShadows = items.clipShadows), items.depthPacking !== undefined && (this.depthPacking = items.depthPacking), items.blendSrc !== undefined && (this.blendSrc = items.blendSrc), items.blendDst !== undefined && (this.blendDst = items.blendDst), items.blendEquation !== undefined && (this.blendEquation = items.blendEquation), items.blendSrcAlpha !== undefined && (this.blendSrcAlpha = items.blendSrcAlpha), items.blendDstAlpha !== undefined && (this.blendDstAlpha = items.blendDstAlpha), items.blendEquationAlpha !== undefined && (this.blendEquationAlpha = items.blendEquationAlpha), items.blendColor !== undefined && this.blendColor !== undefined && this.blendColor.setHex(items.blendColor), items.blendAlpha !== undefined && (this.blendAlpha = items.blendAlpha), items.stencilWriteMask !== undefined && (this.stencilWriteMask = items.stencilWriteMask), items.stencilFunc !== undefined && (this.stencilFunc = items.stencilFunc), items.stencilRef !== undefined && (this.stencilRef = items.stencilRef), items.stencilFuncMask !== undefined && (this.stencilFuncMask = items.stencilFuncMask), items.stencilFail !== undefined && (this.stencilFail = items.stencilFail), items.stencilZFail !== undefined && (this.stencilZFail = items.stencilZFail), items.stencilZPass !== undefined && (this.stencilZPass = items.stencilZPass), items.stencilWrite !== undefined && (this.stencilWrite = items.stencilWrite), items.wireframe !== undefined && (this.wireframe = items.wireframe), items.wireframeLinewidth !== undefined && (this.wireframeLinewidth = items.wireframeLinewidth), items.wireframeLinecap !== undefined && (this.wireframeLinecap = items.wireframeLinecap), items.wireframeLinejoin !== undefined && (this.wireframeLinejoin = items.wireframeLinejoin), items.rotation !== undefined && (this.rotation = items.rotation), items.linewidth !== undefined && (this.linewidth = items.linewidth), items.linecap !== undefined && (this.linecap = items.linecap), items.linejoin !== undefined && (this.linejoin = items.linejoin), items.dashSize !== undefined && (this.dashSize = items.dashSize), items.gapSize !== undefined && (this.gapSize = items.gapSize), items.scale !== undefined && (this.scale = items.scale), items.polygonOffset !== undefined && (this.polygonOffset = items.polygonOffset), items.polygonOffsetFactor !== undefined && (this.polygonOffsetFactor = items.polygonOffsetFactor), items.polygonOffsetUnits !== undefined && (this.polygonOffsetUnits = items.polygonOffsetUnits), items.dithering !== undefined && (this.dithering = items.dithering), items.alphaToCoverage !== undefined && (this.alphaToCoverage = items.alphaToCoverage), items.premultipliedAlpha !== undefined && (this.premultipliedAlpha = items.premultipliedAlpha), items.forceSinglePass !== undefined && (this.forceSinglePass = items.forceSinglePass), items.allowOverride !== undefined && (this.allowOverride = items.allowOverride), items.visible !== undefined && (this.visible = items.visible), items.toneMapped !== undefined && (this.toneMapped = items.toneMapped), items.userData !== undefined && (this.userData = items.userData), items.vertexColors !== undefined && (this.vertexColors = typeof items.vertexColors == `number` ? items.vertexColors > 0 : items.vertexColors), items.size !== undefined && (this.size = items.size), items.sizeAttenuation !== undefined && (this.sizeAttenuation = items.sizeAttenuation), items.map !== undefined && (this.map = t[items.map] || null), items.matcap !== undefined && (this.matcap = t[items.matcap] || null), items.alphaMap !== undefined && (this.alphaMap = t[items.alphaMap] || null), items.bumpMap !== undefined && (this.bumpMap = t[items.bumpMap] || null), items.bumpScale !== undefined && (this.bumpScale = items.bumpScale), items.normalMap !== undefined && (this.normalMap = t[items.normalMap] || null), items.normalMapType !== undefined && (this.normalMapType = items.normalMapType), items.normalScale !== undefined) {
        let normalScale = items.normalScale;
        Array.isArray(normalScale) === false && (normalScale = [normalScale, normalScale]), this.normalScale = new K().fromArray(normalScale);
      }
      return items.displacementMap !== undefined && (this.displacementMap = t[items.displacementMap] || null), items.displacementScale !== undefined && (this.displacementScale = items.displacementScale), items.displacementBias !== undefined && (this.displacementBias = items.displacementBias), items.roughnessMap !== undefined && (this.roughnessMap = t[items.roughnessMap] || null), items.metalnessMap !== undefined && (this.metalnessMap = t[items.metalnessMap] || null), items.emissiveMap !== undefined && (this.emissiveMap = t[items.emissiveMap] || null), items.emissiveIntensity !== undefined && (this.emissiveIntensity = items.emissiveIntensity), items.specularMap !== undefined && (this.specularMap = t[items.specularMap] || null), items.specularIntensityMap !== undefined && (this.specularIntensityMap = t[items.specularIntensityMap] || null), items.specularColorMap !== undefined && (this.specularColorMap = t[items.specularColorMap] || null), items.envMap !== undefined && (this.envMap = t[items.envMap] || null), items.envMapRotation !== undefined && this.envMapRotation.fromArray(items.envMapRotation), items.envMapIntensity !== undefined && (this.envMapIntensity = items.envMapIntensity), items.reflectivity !== undefined && (this.reflectivity = items.reflectivity), items.refractionRatio !== undefined && (this.refractionRatio = items.refractionRatio), items.lightMap !== undefined && (this.lightMap = t[items.lightMap] || null), items.lightMapIntensity !== undefined && (this.lightMapIntensity = items.lightMapIntensity), items.aoMap !== undefined && (this.aoMap = t[items.aoMap] || null), items.aoMapIntensity !== undefined && (this.aoMapIntensity = items.aoMapIntensity), items.gradientMap !== undefined && (this.gradientMap = t[items.gradientMap] || null), items.clearcoatMap !== undefined && (this.clearcoatMap = t[items.clearcoatMap] || null), items.clearcoatRoughnessMap !== undefined && (this.clearcoatRoughnessMap = t[items.clearcoatRoughnessMap] || null), items.clearcoatNormalMap !== undefined && (this.clearcoatNormalMap = t[items.clearcoatNormalMap] || null), items.clearcoatNormalScale !== undefined && (this.clearcoatNormalScale = new K().fromArray(items.clearcoatNormalScale)), items.iridescenceMap !== undefined && (this.iridescenceMap = t[items.iridescenceMap] || null), items.iridescenceThicknessMap !== undefined && (this.iridescenceThicknessMap = t[items.iridescenceThicknessMap] || null), items.transmissionMap !== undefined && (this.transmissionMap = t[items.transmissionMap] || null), items.thicknessMap !== undefined && (this.thicknessMap = t[items.thicknessMap] || null), items.anisotropyMap !== undefined && (this.anisotropyMap = t[items.anisotropyMap] || null), items.sheenColorMap !== undefined && (this.sheenColorMap = t[items.sheenColorMap] || null), items.sheenRoughnessMap !== undefined && (this.sheenRoughnessMap = t[items.sheenRoughnessMap] || null), this;
    }
    clone() {
      return new this.constructor().copy(this);
    }
    copy(e) {
      this.name = e.name, this.blending = e.blending, this.side = e.side, this.vertexColors = e.vertexColors, this.opacity = e.opacity, this.transparent = e.transparent, this.blendSrc = e.blendSrc, this.blendDst = e.blendDst, this.blendEquation = e.blendEquation, this.blendSrcAlpha = e.blendSrcAlpha, this.blendDstAlpha = e.blendDstAlpha, this.blendEquationAlpha = e.blendEquationAlpha, this.blendColor.copy(e.blendColor), this.blendAlpha = e.blendAlpha, this.depthFunc = e.depthFunc, this.depthTest = e.depthTest, this.depthWrite = e.depthWrite, this.stencilWriteMask = e.stencilWriteMask, this.stencilFunc = e.stencilFunc, this.stencilRef = e.stencilRef, this.stencilFuncMask = e.stencilFuncMask, this.stencilFail = e.stencilFail, this.stencilZFail = e.stencilZFail, this.stencilZPass = e.stencilZPass, this.stencilWrite = e.stencilWrite;
      let clippingPlanes = e.clippingPlanes,
        count = null;
      if (clippingPlanes !== null) {
        let e = clippingPlanes.length;
        count = Array(e);
        for (let r = 0; r !== e; ++r) count[r] = clippingPlanes[r].clone();
      }
      return this.clippingPlanes = count, this.clipIntersection = e.clipIntersection, this.clipShadows = e.clipShadows, this.shadowSide = e.shadowSide, this.colorWrite = e.colorWrite, this.precision = e.precision, this.polygonOffset = e.polygonOffset, this.polygonOffsetFactor = e.polygonOffsetFactor, this.polygonOffsetUnits = e.polygonOffsetUnits, this.dithering = e.dithering, this.alphaTest = e.alphaTest, this.alphaHash = e.alphaHash, this.alphaToCoverage = e.alphaToCoverage, this.premultipliedAlpha = e.premultipliedAlpha, this.forceSinglePass = e.forceSinglePass, this.allowOverride = e.allowOverride, this.visible = e.visible, this.toneMapped = e.toneMapped, this.userData = JSON.parse(JSON.stringify(e.userData)), this;
    }
    dispose() {
      this.dispatchEvent({
        type: `dispose`
      });
    }
    set needsUpdate(needs) {
      needs === true && this.version++;
    }
  },
  Mr = new q(),
  Nr = new q(),
  Pr = new q(),
  Fr = new q(),
  Ir = class {
    constructor(e = new q(), t = new q(0, 0, -1)) {
      this.origin = e, this.direction = t;
    }
    set(e, t) {
      return this.origin.copy(e), this.direction.copy(t), this;
    }
    copy(e) {
      return this.origin.copy(e.origin), this.direction.copy(e.direction), this;
    }
    at(e, t) {
      return t.copy(this.origin).addScaledVector(this.direction, e);
    }
    lookAt(look) {
      return this.direction.copy(look).sub(this.origin).normalize(), this;
    }
    recast(recast) {
      return this.origin.copy(this.at(recast, Mr)), this;
    }
    closestPointToPoint(point, pointValue) {
      pointValue.subVectors(point, this.origin);
      let n = pointValue.dot(this.direction);
      return n < 0 ? pointValue.copy(this.origin) : pointValue.copy(this.origin).addScaledVector(this.direction, n);
    }
    distanceToPoint(distance) {
      return Math.sqrt(this.distanceSqToPoint(distance));
    }
    distanceSqToPoint(distance) {
      let t = Mr.subVectors(distance, this.origin).dot(this.direction);
      return t < 0 ? this.origin.distanceToSquared(distance) : (Mr.copy(this.origin).addScaledVector(this.direction, t), Mr.distanceToSquared(distance));
    }
    distanceSqToSegment(distance, segment, segmentValue, segmentInput) {
      Nr.copy(distance).add(segment).multiplyScalar(.5), Pr.copy(segment).sub(distance).normalize(), Fr.copy(this.origin).sub(Nr);
      let i = distance.distanceTo(segment) * .5,
        a = -this.direction.dot(Pr),
        o = Fr.dot(this.direction),
        s = -Fr.dot(Pr),
        lengthSq = Fr.lengthSq(),
        l = Math.abs(1 - a * a),
        total,
        count,
        f,
        ratio;
      if (l > 0) {
        if (total = a * s - o, count = a * o - s, ratio = i * l, total >= 0) {
          if (count >= -ratio) {
            if (count <= ratio) {
              let e = 1 / l;
              total *= e, count *= e, f = total * (total + a * count + 2 * o) + count * (a * total + count + 2 * s) + lengthSq;
            } else count = i, total = Math.max(0, -(a * count + o)), f = -total * total + count * (count + 2 * s) + lengthSq;
          } else count = -i, total = Math.max(0, -(a * count + o)), f = -total * total + count * (count + 2 * s) + lengthSq;
        } else count <= -ratio ? (total = Math.max(0, -(-a * i + o)), count = total > 0 ? -i : Math.min(Math.max(-i, -s), i), f = -total * total + count * (count + 2 * s) + lengthSq) : count <= ratio ? (total = 0, count = Math.min(Math.max(-i, -s), i), f = count * (count + 2 * s) + lengthSq) : (total = Math.max(0, -(a * i + o)), count = total > 0 ? i : Math.min(Math.max(-i, -s), i), f = -total * total + count * (count + 2 * s) + lengthSq);
      } else count = a > 0 ? -i : i, total = Math.max(0, -(a * count + o)), f = -total * total + count * (count + 2 * s) + lengthSq;
      return segmentValue && segmentValue.copy(this.origin).addScaledVector(this.direction, total), segmentInput && segmentInput.copy(Nr).addScaledVector(Pr, count), f;
    }
    intersectSphere(intersect, sphere) {
      if (intersect.radius < 0) return null;
      Mr.subVectors(intersect.center, this.origin);
      let n = Mr.dot(this.direction),
        r = Mr.dot(Mr) - n * n,
        i = intersect.radius * intersect.radius;
      if (r > i) return null;
      let a = Math.sqrt(i - r),
        o = n - a,
        s = n + a;
      return s < 0 ? null : o < 0 ? this.at(s, sphere) : this.at(o, sphere);
    }
    intersectsSphere(intersects) {
      return intersects.radius < 0 ? false : this.distanceSqToPoint(intersects.center) <= intersects.radius * intersects.radius;
    }
    distanceToPlane(distance) {
      let t = distance.normal.dot(this.direction);
      if (t === 0) return distance.distanceToPoint(this.origin) === 0 ? 0 : null;
      let n = -(this.origin.dot(distance.normal) + distance.constant) / t;
      return n >= 0 ? n : null;
    }
    intersectPlane(intersect, plane) {
      let distanceToPlane = this.distanceToPlane(intersect);
      return distanceToPlane === null ? null : this.at(distanceToPlane, plane);
    }
    intersectsPlane(intersects) {
      let distanceToPoint = intersects.distanceToPoint(this.origin);
      return distanceToPoint === 0 || intersects.normal.dot(this.direction) * distanceToPoint < 0;
    }
    intersectBox(intersect, box) {
      let count,
        r,
        i,
        flag,
        ratio,
        total,
        c = 1 / this.direction.x,
        l = 1 / this.direction.y,
        u = 1 / this.direction.z,
        origin = this.origin;
      return c >= 0 ? (count = (intersect.min.x - origin.x) * c, r = (intersect.max.x - origin.x) * c) : (count = (intersect.max.x - origin.x) * c, r = (intersect.min.x - origin.x) * c), l >= 0 ? (i = (intersect.min.y - origin.y) * l, flag = (intersect.max.y - origin.y) * l) : (i = (intersect.max.y - origin.y) * l, flag = (intersect.min.y - origin.y) * l), count > flag || i > r || ((i > count || isNaN(count)) && (count = i), (flag < r || isNaN(r)) && (r = flag), u >= 0 ? (ratio = (intersect.min.z - origin.z) * u, total = (intersect.max.z - origin.z) * u) : (ratio = (intersect.max.z - origin.z) * u, total = (intersect.min.z - origin.z) * u), count > total || ratio > r) || ((ratio > count || count !== count) && (count = ratio), (total < r || r !== r) && (r = total), r < 0) ? null : this.at(count >= 0 ? count : r, box);
    }
    intersectsBox(intersects) {
      return this.intersectBox(intersects, Mr) !== null;
    }
    intersectTriangle(intersect, triangle, triangleValue, triangleInput, i) {
      let origin = this.origin,
        direction = this.direction,
        s = direction.x,
        c = direction.y,
        l = direction.z,
        u = intersect.x - origin.x,
        d = intersect.y - origin.y,
        f = intersect.z - origin.z,
        p = triangle.x - origin.x,
        m = triangle.y - origin.y,
        h = triangle.z - origin.z,
        g = triangleValue.x - origin.x,
        _ = triangleValue.y - origin.y,
        v = triangleValue.z - origin.z,
        y = Math.abs(s),
        b = Math.abs(c),
        x = Math.abs(l),
        type,
        mipmaps,
        flag,
        count,
        E,
        vertexShader,
        fragmentShader,
        k,
        A,
        j,
        ee,
        te;
      if (y >= b && y >= x ? (flag = s, vertexShader = u, A = p, te = g, s >= 0 ? (type = c, mipmaps = l, count = d, E = f, fragmentShader = m, k = h, j = _, ee = v) : (type = l, mipmaps = c, count = f, E = d, fragmentShader = h, k = m, j = v, ee = _)) : b >= x ? (flag = c, vertexShader = d, A = m, te = _, c >= 0 ? (type = l, mipmaps = s, count = f, E = u, fragmentShader = h, k = p, j = v, ee = g) : (type = s, mipmaps = l, count = u, E = f, fragmentShader = p, k = h, j = g, ee = v)) : (flag = l, vertexShader = f, A = h, te = v, l >= 0 ? (type = s, mipmaps = c, count = u, E = d, fragmentShader = p, k = m, j = g, ee = _) : (type = c, mipmaps = s, count = d, E = u, fragmentShader = m, k = p, j = _, ee = g)), flag === 0) return null;
      let M = type / flag,
        N = mipmaps / flag,
        P = 1 / flag,
        ne = count - M * vertexShader,
        F = E - N * vertexShader,
        re = fragmentShader - M * A,
        ie = k - N * A,
        ae = j - M * te,
        oe = ee - N * te,
        se = ae * ie - oe * re,
        I = ne * oe - F * ae,
        L = re * F - ie * ne;
      if (triangleInput) {
        if (se < 0 || I < 0 || L < 0) return null;
      } else if ((se < 0 || I < 0 || L < 0) && (se > 0 || I > 0 || L > 0)) return null;
      let ce = se + I + L;
      if (ce === 0) return null;
      let le = P * (se * vertexShader + I * A + L * te);
      return (ce > 0 ? le < 0 : le > 0) ? null : this.at(le / ce, i);
    }
    applyMatrix4(matrix4) {
      return this.origin.applyMatrix4(matrix4), this.direction.transformDirection(matrix4), this;
    }
    equals(equals) {
      return equals.origin.equals(this.origin) && equals.direction.equals(this.direction);
    }
    clone() {
      return new this.constructor().copy(this);
    }
  },
  Lr = class extends jr {
    constructor(constructor) {
      super(), this.isMeshBasicMaterial = true, this.type = `MeshBasicMaterial`, this.color = new X(16777215), this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.specularMap = null, this.alphaMap = null, this.envMap = null, this.envMapRotation = new an(), this.combine = 0, this.reflectivity = 1, this.refractionRatio = .98, this.wireframe = false, this.wireframeLinewidth = 1, this.wireframeLinecap = `round`, this.wireframeLinejoin = `round`, this.fog = true, this.setValues(constructor);
    }
    copy(items) {
      return super.copy(items), this.color.copy(items.color), this.map = items.map, this.lightMap = items.lightMap, this.lightMapIntensity = items.lightMapIntensity, this.aoMap = items.aoMap, this.aoMapIntensity = items.aoMapIntensity, this.specularMap = items.specularMap, this.alphaMap = items.alphaMap, this.envMap = items.envMap, this.envMapRotation.copy(items.envMapRotation), this.combine = items.combine, this.reflectivity = items.reflectivity, this.refractionRatio = items.refractionRatio, this.wireframe = items.wireframe, this.wireframeLinewidth = items.wireframeLinewidth, this.wireframeLinecap = items.wireframeLinecap, this.wireframeLinejoin = items.wireframeLinejoin, this.fog = items.fog, this;
    }
  },
  Rr = new Jt(),
  zr = new Ir(),
  Br = new _r(),
  Vr = new q(),
  Hr = new q(),
  Ur = new q(),
  Wr = new q(),
  Gr = new q(),
  Kr = new q(),
  qr = new q(),
  Jr = new q(),
  Yr = class extends Sn {
    constructor(e = new Tr(), t = new Lr()) {
      super(), this.isMesh = true, this.type = `Mesh`, this.geometry = e, this.material = t, this.morphTargetDictionary = undefined, this.morphTargetInfluences = undefined, this.count = 1, this.updateMorphTargets();
    }
    copy(e, t) {
      return super.copy(e, t), e.morphTargetInfluences !== undefined && (this.morphTargetInfluences = e.morphTargetInfluences.slice()), e.morphTargetDictionary !== undefined && (this.morphTargetDictionary = Object.assign({}, e.morphTargetDictionary)), this.material = Array.isArray(e.material) ? e.material.slice() : e.material, this.geometry = e.geometry, this;
    }
    updateMorphTargets() {
      let morphAttributes = this.geometry.morphAttributes,
        keyList = Object.keys(morphAttributes);
      if (keyList.length > 0) {
        let n = morphAttributes[keyList[0]];
        if (n !== undefined) {
          this.morphTargetInfluences = [], this.morphTargetDictionary = {};
          for (let e = 0, t = n.length; e < t; e++) {
            let fallbackValue = n[e].name || String(e);
            this.morphTargetInfluences.push(0), this.morphTargetDictionary[fallbackValue] = e;
          }
        }
      }
    }
    getVertexPosition(vertex, positionValue) {
      let geometry = this.geometry,
        position = geometry.attributes.position,
        i = geometry.morphAttributes.position,
        morphTargetsRelative = geometry.morphTargetsRelative;
      positionValue.fromBufferAttribute(position, vertex);
      let morphTargetInfluences = this.morphTargetInfluences;
      if (i && morphTargetInfluences) {
        Kr.set(0, 0, 0);
        for (let n = 0, r = i.length; n < r; n++) {
          let r = morphTargetInfluences[n],
            s = i[n];
          r !== 0 && (Gr.fromBufferAttribute(s, vertex), morphTargetsRelative ? Kr.addScaledVector(Gr, r) : Kr.addScaledVector(Gr.sub(positionValue), r));
        }
        positionValue.add(Kr);
      }
      return positionValue;
    }
    intersectsFrustum(intersects) {
      return intersects.intersectsObject(this);
    }
    raycast(raycast, raycastValue) {
      let geometry = this.geometry,
        material = this.material,
        matrixWorld = this.matrixWorld;
      material !== undefined && (geometry.boundingSphere === null && geometry.computeBoundingSphere(), Br.copy(geometry.boundingSphere), Br.applyMatrix4(matrixWorld), zr.copy(raycast.ray).recast(raycast.near), !(Br.containsPoint(zr.origin) === false && (zr.intersectSphere(Br, Vr) === null || zr.origin.distanceToSquared(Vr) > (raycast.far - raycast.near) ** 2)) && (Rr.copy(matrixWorld).invert(), zr.copy(raycast.ray).applyMatrix4(Rr), (geometry.boundingBox === null || zr.intersectsBox(geometry.boundingBox) !== false) && this._computeIntersections(raycast, raycastValue, zr)));
    }
    _computeIntersections(e, items, intersections) {
      let count,
        geometry = this.geometry,
        material = this.material,
        o = geometry.index,
        position = geometry.attributes.position,
        c = geometry.attributes.uv,
        l = geometry.attributes.uv1,
        normal = geometry.attributes.normal,
        groups = geometry.groups,
        drawRange = geometry.drawRange;
      if (o !== null) {
        if (Array.isArray(material)) for (let i = 0, s = groups.length; i < s; i++) {
          let s = groups[i],
            p = material[s.materialIndex],
            m = Math.max(s.start, drawRange.start),
            h = Math.min(o.count, Math.min(s.start + s.count, drawRange.start + drawRange.count));
          for (let i = m, a = h; i < a; i += 3) {
            let a = o.getX(i),
              d = o.getX(i + 1),
              f = o.getX(i + 2);
            count = Zr(this, p, e, intersections, c, l, normal, a, d, f), count && (count.faceIndex = Math.floor(i / 3), count.face.materialIndex = s.materialIndex, items.push(count));
          }
        } else {
          let i = Math.max(0, drawRange.start),
            s = Math.min(o.count, drawRange.start + drawRange.count);
          for (let d = i, f = s; d < f; d += 3) {
            let i = o.getX(d),
              s = o.getX(d + 1),
              f = o.getX(d + 2);
            count = Zr(this, material, e, intersections, c, l, normal, i, s, f), count && (count.faceIndex = Math.floor(d / 3), items.push(count));
          }
        }
      } else if (position !== undefined) {
        if (Array.isArray(material)) for (let i = 0, o = groups.length; i < o; i++) {
          let o = groups[i],
            p = material[o.materialIndex],
            m = Math.max(o.start, drawRange.start),
            h = Math.min(position.count, Math.min(o.start + o.count, drawRange.start + drawRange.count));
          for (let i = m, a = h; i < a; i += 3) {
            let a = i,
              s = i + 1,
              d = i + 2;
            count = Zr(this, p, e, intersections, c, l, normal, a, s, d), count && (count.faceIndex = Math.floor(i / 3), count.face.materialIndex = o.materialIndex, items.push(count));
          }
        } else {
          let i = Math.max(0, drawRange.start),
            o = Math.min(position.count, drawRange.start + drawRange.count);
          for (let s = i, d = o; s < d; s += 3) {
            let i = s,
              o = s + 1,
              d = s + 2;
            count = Zr(this, material, e, intersections, c, l, normal, i, o, d), count && (count.faceIndex = Math.floor(s / 3), items.push(count));
          }
        }
      }
    }
  };
function Xr(e, t, n, r, i, a, o, s) {
  let total;
  if (total = t.side === 1 ? r.intersectTriangle(o, a, i, true, s) : r.intersectTriangle(i, a, o, t.side === 0, s), total === null) return null;
  Jr.copy(s), Jr.applyMatrix4(e.matrixWorld);
  let distanceTo = n.ray.origin.distanceTo(Jr);
  return distanceTo < n.near || distanceTo > n.far ? null : {
    distance: distanceTo,
    point: Jr.clone(),
    object: e
  };
}
function Zr(e, t, n, r, i, a, o, s, c, l) {
  e.getVertexPosition(s, Hr), e.getVertexPosition(c, Ur), e.getVertexPosition(l, Wr);
  let u = Xr(e, t, n, r, Hr, Ur, Wr, qr);
  if (u) {
    let e = new q();
    Gn.getBarycoord(qr, Hr, Ur, Wr, e), i && (u.uv = Gn.getInterpolatedAttribute(i, s, c, l, e, new K())), a && (u.uv1 = Gn.getInterpolatedAttribute(a, s, c, l, e, new K())), o && (u.normal = Gn.getInterpolatedAttribute(o, s, c, l, e, new q()), u.normal.dot(r.direction) > 0 && u.normal.multiplyScalar(-1));
    let t = {
      a: s,
      b: c,
      c: l,
      normal: new q(),
      materialIndex: 0
    };
    Gn.getNormal(Hr, Ur, Wr, t.normal), u.face = t, u.barycoord = e;
  }
  return u;
}
var Qr = class extends Ht {
    constructor(e = null, t = 1, n = 1, constructor, constructorValue, constructorInput, s, c, l = a, u = a, d, f) {
      super(null, constructorInput, s, c, l, u, constructor, constructorValue, d, f), this.isDataTexture = true, this.image = {
        data: e,
        width: t,
        height: n
      }, this.generateMipmaps = false, this.flipY = false, this.unpackAlignment = 1;
    }
  },
  $r = class extends ur {
    constructor(constructor, constructorValue, constructorInput, r = 1) {
      super(constructor, constructorValue, constructorInput), this.isInstancedBufferAttribute = true, this.meshPerAttribute = r;
    }
    copy(e) {
      return super.copy(e), this.meshPerAttribute = e.meshPerAttribute, this;
    }
    toJSON() {
      let e = super.toJSON();
      return e.meshPerAttribute = this.meshPerAttribute, e.isInstancedBufferAttribute = true, e;
    }
  },
  ei = new Jt(),
  ti = new Jt(),
  emptyItems = [],
  ri = new Kn(),
  ii = new Jt(),
  ai = new Yr(),
  oi = new _r(),
  si = class extends Yr {
    constructor(constructor, constructorValue, constructorInput) {
      super(constructor, constructorValue), this.isInstancedMesh = true, this.instanceMatrix = new $r(new Float32Array(constructorInput * 16), 16), this.instanceColor = null, this.morphTexture = null, this.count = constructorInput, this.boundingBox = null, this.boundingSphere = null;
      for (let e = 0; e < constructorInput; e++) this.setMatrixAt(e, ii);
    }
    computeBoundingBox() {
      let geometry = this.geometry,
        t = this.count;
      this.boundingBox === null && (this.boundingBox = new Kn()), geometry.boundingBox === null && geometry.computeBoundingBox(), this.boundingBox.makeEmpty();
      for (let n = 0; n < t; n++) this.getMatrixAt(n, ei), ri.copy(geometry.boundingBox).applyMatrix4(ei), this.boundingBox.union(ri);
    }
    computeBoundingSphere() {
      let geometry = this.geometry,
        t = this.count;
      this.boundingSphere === null && (this.boundingSphere = new _r()), geometry.boundingSphere === null && geometry.computeBoundingSphere(), this.boundingSphere.makeEmpty();
      for (let n = 0; n < t; n++) this.getMatrixAt(n, ei), oi.copy(geometry.boundingSphere).applyMatrix4(ei), this.boundingSphere.union(oi);
    }
    copy(e, t) {
      return super.copy(e, t), this.instanceMatrix.copy(e.instanceMatrix), e.morphTexture !== null && (this.morphTexture = e.morphTexture.clone()), e.instanceColor !== null && (this.instanceColor = e.instanceColor.clone()), this.count = e.count, e.boundingBox !== null && (this.boundingBox = e.boundingBox.clone()), e.boundingSphere !== null && (this.boundingSphere = e.boundingSphere.clone()), this;
    }
    getColorAt(color, colorValue) {
      return this.instanceColor === null ? colorValue.setRGB(1, 1, 1) : colorValue.fromArray(this.instanceColor.array, color * 3);
    }
    getMatrixAt(matrix, matrixValue) {
      return matrixValue.fromArray(this.instanceMatrix.array, matrix * 16);
    }
    getMorphAt(morph, morphValue) {
      let morphTargetInfluences = morphValue.morphTargetInfluences,
        r = this.morphTexture.source.data.data,
        i = morph * (morphTargetInfluences.length + 1) + 1;
      for (let e = 0; e < morphTargetInfluences.length; e++) morphTargetInfluences[e] = r[i + e];
    }
    raycast(raycast, items) {
      let matrixWorld = this.matrixWorld,
        r = this.count;
      if (ai.geometry = this.geometry, ai.material = this.material, ai.material !== undefined && (this.boundingSphere === null && this.computeBoundingSphere(), oi.copy(this.boundingSphere), oi.applyMatrix4(matrixWorld), raycast.ray.intersectsSphere(oi) !== false)) for (let i = 0; i < r; i++) {
        this.getMatrixAt(i, ei), ti.multiplyMatrices(matrixWorld, ei), ai.matrixWorld = ti, ai.raycast(raycast, emptyItems);
        for (let e = 0, n = emptyItems.length; e < n; e++) {
          let n = emptyItems[e];
          n.instanceId = i, n.object = this, items.push(n);
        }
        emptyItems.length = 0;
      }
    }
    setColorAt(color, colorValue) {
      return this.instanceColor === null && (this.instanceColor = new $r(new Float32Array(this.instanceMatrix.count * 3).fill(1), 3)), colorValue.toArray(this.instanceColor.array, color * 3), this;
    }
    setMatrixAt(matrix, matrixValue) {
      return matrixValue.toArray(this.instanceMatrix.array, matrix * 16), this;
    }
    setMorphAt(morph, morphValue) {
      let morphTargetInfluences = morphValue.morphTargetInfluences,
        r = morphTargetInfluences.length + 1;
      this.morphTexture === null && (this.morphTexture = new Qr(new Float32Array(r * this.count), r, this.count, k, _));
      let i = this.morphTexture.source.data.data,
        a = 0;
      for (let e = 0; e < morphTargetInfluences.length; e++) a += morphTargetInfluences[e];
      let o = this.geometry.morphTargetsRelative ? 1 : 1 - a,
        s = r * morph;
      return i[s] = o, i.set(morphTargetInfluences, s + 1), this;
    }
    updateMorphTargets() {}
    dispose() {
      super.dispose(), this.morphTexture !== null && (this.morphTexture.dispose(), this.morphTexture = null);
    }
  },
  ci = new _r(),
  li = new K(.5, .5),
  ui = new q(),
  di = class {
    constructor(e = new kr(), t = new kr(), n = new kr(), r = new kr(), i = new kr(), a = new kr()) {
      this.planes = [e, t, n, r, i, a];
    }
    set(e, t, n, r, i, a) {
      let planes = this.planes;
      return planes[0].copy(e), planes[1].copy(t), planes[2].copy(n), planes[3].copy(r), planes[4].copy(i), planes[5].copy(a), this;
    }
    copy(e) {
      let planes = this.planes;
      for (let n = 0; n < 6; n++) planes[n].copy(e.planes[n]);
      return this;
    }
    setFromProjectionMatrix(from, t = He, n = false) {
      let planes = this.planes,
        elements = from.elements,
        a = elements[0],
        o = elements[1],
        s = elements[2],
        c = elements[3],
        l = elements[4],
        u = elements[5],
        d = elements[6],
        f = elements[7],
        p = elements[8],
        m = elements[9],
        h = elements[10],
        g = elements[11],
        _ = elements[12],
        v = elements[13],
        y = elements[14],
        b = elements[15];
      if (planes[0].setComponents(c - a, f - l, g - p, b - _).normalize(), planes[1].setComponents(c + a, f + l, g + p, b + _).normalize(), planes[2].setComponents(c + o, f + u, g + m, b + v).normalize(), planes[3].setComponents(c - o, f - u, g - m, b - v).normalize(), n) planes[4].setComponents(s, d, h, y).normalize(), planes[5].setComponents(c - s, f - d, g - h, b - y).normalize();else if (planes[4].setComponents(c - s, f - d, g - h, b - y).normalize(), t === 2e3) planes[5].setComponents(c + s, f + d, g + h, b + y).normalize();else if (t === 2001) planes[5].setComponents(s, d, h, y).normalize();else throw Error(`THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: ` + t);
      return this;
    }
    intersectsObject(intersects) {
      if (intersects.boundingSphere !== undefined) intersects.boundingSphere === null && intersects.computeBoundingSphere(), ci.copy(intersects.boundingSphere).applyMatrix4(intersects.matrixWorld);else {
        let geometry = intersects.geometry;
        geometry.boundingSphere === null && geometry.computeBoundingSphere(), ci.copy(geometry.boundingSphere).applyMatrix4(intersects.matrixWorld);
      }
      return this.intersectsSphere(ci);
    }
    intersectsSprite(intersects) {
      return ci.center.set(0, 0, 0), ci.radius = .7071067811865476 + li.distanceTo(intersects.center), ci.applyMatrix4(intersects.matrixWorld), this.intersectsSphere(ci);
    }
    intersectsSphere(intersects) {
      let planes = this.planes,
        center = intersects.center,
        r = -intersects.radius;
      for (let e = 0; e < 6; e++) if (planes[e].distanceToPoint(center) < r) return false;
      return true;
    }
    intersectsBox(intersects) {
      let planes = this.planes;
      for (let n = 0; n < 6; n++) {
        let r = planes[n];
        if (ui.x = r.normal.x > 0 ? intersects.max.x : intersects.min.x, ui.y = r.normal.y > 0 ? intersects.max.y : intersects.min.y, ui.z = r.normal.z > 0 ? intersects.max.z : intersects.min.z, r.distanceToPoint(ui) < 0) return false;
      }
      return true;
    }
    containsPoint(contains) {
      let planes = this.planes;
      for (let n = 0; n < 6; n++) if (planes[n].distanceToPoint(contains) < 0) return false;
      return true;
    }
    clone() {
      return new this.constructor().copy(this);
    }
  },
  fi = class extends Ht {
    constructor(e = [], t = 301, constructor, constructorValue, constructorInput, a, o, s, c, l) {
      super(e, t, constructor, constructorValue, constructorInput, a, o, s, c, l), this.isCubeTexture = true, this.flipY = false;
    }
    get images() {
      return this.image;
    }
    set images(images) {
      this.image = images;
    }
  },
  pi = class extends Ht {
    constructor(constructor, constructorValue, n = g, constructorInput, i, o, s = a, c = a, l, u = D, d = 1) {
      if (u !== 1026 && u !== 1027) throw Error(`THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat`);
      super({
        width: constructor,
        height: constructorValue,
        depth: d
      }, constructorInput, i, o, s, c, u, n, l), this.isDepthTexture = true, this.flipY = false, this.generateMipmaps = false, this.compareFunction = null;
    }
    copy(e) {
      return super.copy(e), this.source = new Rt(Object.assign({}, e.image)), this.compareFunction = e.compareFunction, this;
    }
    toJSON(e) {
      let t = super.toJSON(e);
      return t.compareFunction = this.compareFunction, t;
    }
  },
  mi = class extends pi {
    constructor(constructor, t = g, n = 301, constructorValue, constructorInput, o = a, s = a, c, l = D) {
      let u = {
          width: constructor,
          height: constructor,
          depth: 1
        },
        d = [u, u, u, u, u, u];
      super(constructor, constructor, t, n, constructorValue, constructorInput, o, s, c, l), this.image = d, this.isCubeDepthTexture = true, this.isCubeTexture = true;
    }
    get images() {
      return this.image;
    }
    set images(images) {
      this.image = images;
    }
  },
  hi = class extends Ht {
    constructor(e = null) {
      super(), this.sourceTexture = e, this.isExternalTexture = true;
    }
    copy(e) {
      return super.copy(e), this.sourceTexture = e.sourceTexture, this;
    }
  },
  gi = class e extends Tr {
    constructor(e = 1, t = 1, n = 1, r = 1, i = 1, a = 1) {
      super(), this.type = `BoxGeometry`, this.parameters = {
        width: e,
        height: t,
        depth: n,
        widthSegments: r,
        heightSegments: i,
        depthSegments: a
      };
      let o = this;
      r = Math.floor(r), i = Math.floor(i), a = Math.floor(a);
      let total = [],
        c = [],
        l = [],
        u = [],
        d = 0,
        f = 0;
      p(`z`, `y`, `x`, -1, -1, n, t, e, a, i, 0), p(`z`, `y`, `x`, 1, -1, n, t, -e, a, i, 1), p(`x`, `z`, `y`, 1, 1, e, n, t, r, a, 2), p(`x`, `z`, `y`, 1, -1, e, n, -t, r, a, 3), p(`x`, `y`, `z`, 1, -1, e, t, n, r, i, 4), p(`x`, `y`, `z`, -1, -1, e, t, -n, r, i, 5), this.setIndex(total), this.setAttribute(`position`, new pr(c, 3)), this.setAttribute(`normal`, new pr(l, 3)), this.setAttribute(`uv`, new pr(u, 2));
      function p(e, t, n, r, i, a, p, m, h, g, _) {
        let v = a / h,
          y = p / g,
          b = a / 2,
          x = p / 2,
          S = m / 2,
          C = h + 1,
          w = g + 1,
          T = 0,
          E = 0,
          D = new q();
        for (let a = 0; a < w; a++) {
          let o = a * y - x;
          for (let s = 0; s < C; s++) D[e] = (s * v - b) * r, D[t] = o * i, D[n] = S, c.push(D.x, D.y, D.z), D[e] = 0, D[t] = 0, D[n] = m > 0 ? 1 : -1, l.push(D.x, D.y, D.z), u.push(s / h), u.push(1 - a / g), T += 1;
        }
        for (let e = 0; e < g; e++) for (let t = 0; t < h; t++) {
          let n = d + t + C * e,
            r = d + t + C * (e + 1),
            i = d + (t + 1) + C * (e + 1),
            a = d + (t + 1) + C * e;
          total.push(n, r, a), total.push(r, i, a), E += 6;
        }
        o.addGroup(f, E, _), f += E, d += T;
      }
    }
    copy(e) {
      return super.copy(e), this.parameters = Object.assign({}, e.parameters), this;
    }
    static fromJSON(t) {
      return new e(t.width, t.height, t.depth, t.widthSegments, t.heightSegments, t.depthSegments);
    }
  },
  _i = class e extends Tr {
    constructor(e = 1, t = 1, n = 1, r = 32, i = 1, a = false, o = 0, s = Math.PI * 2) {
      super(), this.type = `CylinderGeometry`, this.parameters = {
        radiusTop: e,
        radiusBottom: t,
        height: n,
        radialSegments: r,
        heightSegments: i,
        openEnded: a,
        thetaStart: o,
        thetaLength: s
      };
      let c = this;
      r = Math.floor(r), i = Math.floor(i);
      let total = [],
        u = [],
        count = [],
        f = [],
        p = 0,
        ratio = [],
        h = n / 2,
        g = 0;
      _(), a === false && (e > 0 && v(true), t > 0 && v(false)), this.setIndex(total), this.setAttribute(`position`, new pr(u, 3)), this.setAttribute(`normal`, new pr(count, 3)), this.setAttribute(`uv`, new pr(f, 2));
      function _() {
        let a = new q(),
          _ = new q(),
          v = 0,
          y = (t - e) / n;
        for (let c = 0; c <= i; c++) {
          let l = [],
            g = c / i,
            v = g * (t - e) + e;
          for (let e = 0; e <= r; e++) {
            let t = e / r,
              i = t * s + o,
              c = Math.sin(i),
              m = Math.cos(i);
            _.x = v * c, _.y = -g * n + h, _.z = v * m, u.push(_.x, _.y, _.z), a.set(c, y, m).normalize(), count.push(a.x, a.y, a.z), f.push(t, 1 - g), l.push(p++);
          }
          ratio.push(l);
        }
        for (let n = 0; n < r; n++) for (let r = 0; r < i; r++) {
          let a = ratio[r][n],
            o = ratio[r + 1][n],
            s = ratio[r + 1][n + 1],
            c = ratio[r][n + 1];
          (e > 0 || r !== 0) && (total.push(a, o, c), v += 3), (t > 0 || r !== i - 1) && (total.push(o, s, c), v += 3);
        }
        c.addGroup(g, v, 0), g += v;
      }
      function v(n) {
        let i = p,
          a = new K(),
          m = new q(),
          _ = 0,
          v = n === true ? e : t,
          y = n === true ? 1 : -1;
        for (let e = 1; e <= r; e++) u.push(0, h * y, 0), count.push(0, y, 0), f.push(.5, .5), p++;
        let b = p;
        for (let e = 0; e <= r; e++) {
          let t = e / r * s + o,
            n = Math.cos(t),
            i = Math.sin(t);
          m.x = v * i, m.y = h * y, m.z = v * n, u.push(m.x, m.y, m.z), count.push(0, y, 0), a.x = n * .5 + .5, a.y = i * .5 * y + .5, f.push(a.x, a.y), p++;
        }
        for (let e = 0; e < r; e++) {
          let t = i + e,
            r = b + e;
          n === true ? total.push(r, r + 1, t) : total.push(r + 1, r, t), _ += 3;
        }
        c.addGroup(g, _, n === true ? 1 : 2), g += _;
      }
    }
    copy(e) {
      return super.copy(e), this.parameters = Object.assign({}, e.parameters), this;
    }
    static fromJSON(t) {
      return new e(t.radiusTop, t.radiusBottom, t.height, t.radialSegments, t.heightSegments, t.openEnded, t.thetaStart, t.thetaLength);
    }
  },
  vi = class e extends Tr {
    constructor(e = 1, t = 1, n = 1, r = 1) {
      super(), this.type = `PlaneGeometry`, this.parameters = {
        width: e,
        height: t,
        widthSegments: n,
        heightSegments: r
      };
      let i = e / 2,
        a = t / 2,
        o = Math.floor(n),
        s = Math.floor(r),
        c = o + 1,
        l = s + 1,
        u = e / o,
        d = t / s,
        total = [],
        ratio = [],
        m = [],
        resolvedValue = [];
      for (let e = 0; e < l; e++) {
        let t = e * d - a;
        for (let n = 0; n < c; n++) {
          let r = n * u - i;
          ratio.push(r, -t, 0), m.push(0, 0, 1), resolvedValue.push(n / o), resolvedValue.push(1 - e / s);
        }
      }
      for (let e = 0; e < s; e++) for (let t = 0; t < o; t++) {
        let n = t + c * e,
          r = t + c * (e + 1),
          i = t + 1 + c * (e + 1),
          a = t + 1 + c * e;
        total.push(n, r, a), total.push(r, i, a);
      }
      this.setIndex(total), this.setAttribute(`position`, new pr(ratio, 3)), this.setAttribute(`normal`, new pr(m, 3)), this.setAttribute(`uv`, new pr(resolvedValue, 2));
    }
    copy(e) {
      return super.copy(e), this.parameters = Object.assign({}, e.parameters), this;
    }
    static fromJSON(t) {
      return new e(t.width, t.height, t.widthSegments, t.heightSegments);
    }
  };
function yi(e) {
  let t = {};
  for (let count in e) {
    t[count] = {};
    for (let r in e[count]) {
      let i = e[count][r];
      if (xi(i)) i.isRenderTargetTexture ? (U(`UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms().`), t[count][r] = null) : t[count][r] = i.clone();else if (Array.isArray(i)) {
        if (xi(i[0])) {
          let ratio = [];
          for (let t = 0, n = i.length; t < n; t++) ratio[t] = i[t].clone();
          t[count][r] = ratio;
        } else t[count][r] = i.slice();
      } else t[count][r] = i;
    }
  }
  return t;
}
function bi(count) {
  let t = {};
  for (let n = 0; n < count.length; n++) {
    let r = yi(count[n]);
    for (let ratio in r) t[ratio] = r[ratio];
  }
  return t;
}
function xi(e) {
  return e && (e.isColor || e.isMatrix3 || e.isMatrix4 || e.isVector2 || e.isVector3 || e.isVector4 || e.isTexture || e.isQuaternion);
}
function Si(count) {
  let total = [];
  for (let n = 0; n < count.length; n++) total.push(count[n].clone());
  return total;
}
function Ci(e) {
  let renderTarget = e.getRenderTarget();
  return renderTarget === null ? e.outputColorSpace : renderTarget.isXRRenderTarget === true ? renderTarget.texture.colorSpace : Y.workingColorSpace;
}
var wi = {
    clone: yi,
    merge: bi
  },
  Ti = `void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,
  Ei = `void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,
  Di = class extends jr {
    constructor(constructor) {
      super(), this.isShaderMaterial = true, this.type = `ShaderMaterial`, this.defines = {}, this.uniforms = {}, this.uniformsGroups = [], this.vertexShader = Ti, this.fragmentShader = Ei, this.linewidth = 1, this.wireframe = false, this.wireframeLinewidth = 1, this.fog = false, this.lights = false, this.clipping = false, this.forceSinglePass = true, this.extensions = {
        clipCullDistance: false,
        multiDraw: false
      }, this.defaultAttributeValues = {
        color: [1, 1, 1],
        uv: [0, 0],
        uv1: [0, 0]
      }, this.index0AttributeName = undefined, this.uniformsNeedUpdate = false, this.glslVersion = null, constructor !== undefined && this.setValues(constructor);
    }
    copy(e) {
      return super.copy(e), this.fragmentShader = e.fragmentShader, this.vertexShader = e.vertexShader, this.uniforms = yi(e.uniforms), this.uniformsGroups = Si(e.uniformsGroups), this.defines = Object.assign({}, e.defines), this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this.fog = e.fog, this.lights = e.lights, this.clipping = e.clipping, this.extensions = Object.assign({}, e.extensions), this.glslVersion = e.glslVersion, this.defaultAttributeValues = Object.assign({}, e.defaultAttributeValues), this.index0AttributeName = e.index0AttributeName, this.uniformsNeedUpdate = e.uniformsNeedUpdate, this;
    }
    toJSON(e) {
      let t = super.toJSON(e);
      t.glslVersion = this.glslVersion, t.uniforms = {};
      for (let count in this.uniforms) {
        let r = this.uniforms[count].value;
        r && r.isTexture ? t.uniforms[count] = {
          type: `t`,
          value: r.toJSON(e).uuid
        } : r && r.isColor ? t.uniforms[count] = {
          type: `c`,
          value: r.getHex()
        } : r && r.isVector2 ? t.uniforms[count] = {
          type: `v2`,
          value: r.toArray()
        } : r && r.isVector3 ? t.uniforms[count] = {
          type: `v3`,
          value: r.toArray()
        } : r && r.isVector4 ? t.uniforms[count] = {
          type: `v4`,
          value: r.toArray()
        } : r && r.isMatrix3 ? t.uniforms[count] = {
          type: `m3`,
          value: r.toArray()
        } : r && r.isMatrix4 ? t.uniforms[count] = {
          type: `m4`,
          value: r.toArray()
        } : t.uniforms[count] = {
          value: r
        };
      }
      Object.keys(this.defines).length > 0 && (t.defines = this.defines), t.vertexShader = this.vertexShader, t.fragmentShader = this.fragmentShader, t.lights = this.lights, t.clipping = this.clipping;
      let n = {};
      for (let ratio in this.extensions) this.extensions[ratio] === true && (n[ratio] = true);
      return Object.keys(n).length > 0 && (t.extensions = n), t;
    }
    fromJSON(e, t) {
      if (super.fromJSON(e, t), e.uniforms !== undefined) for (let count in e.uniforms) {
        let r = e.uniforms[count];
        switch (this.uniforms[count] = {}, r.type) {
          case `t`:
            this.uniforms[count].value = t[r.value] || null;
            break;
          case `c`:
            this.uniforms[count].value = new X().setHex(r.value);
            break;
          case `v2`:
            this.uniforms[count].value = new K().fromArray(r.value);
            break;
          case `v3`:
            this.uniforms[count].value = new q().fromArray(r.value);
            break;
          case `v4`:
            this.uniforms[count].value = new Ut().fromArray(r.value);
            break;
          case `m3`:
            this.uniforms[count].value = new J().fromArray(r.value);
            break;
          case `m4`:
            this.uniforms[count].value = new Jt().fromArray(r.value);
            break;
          default:
            this.uniforms[count].value = r.value;
        }
      }
      if (e.defines !== undefined && (this.defines = e.defines), e.vertexShader !== undefined && (this.vertexShader = e.vertexShader), e.fragmentShader !== undefined && (this.fragmentShader = e.fragmentShader), e.glslVersion !== undefined && (this.glslVersion = e.glslVersion), e.extensions !== undefined) for (let total in e.extensions) this.extensions[total] = e.extensions[total];
      return e.lights !== undefined && (this.lights = e.lights), e.clipping !== undefined && (this.clipping = e.clipping), this;
    }
  },
  Oi = class extends Di {
    constructor(constructor) {
      super(constructor), this.isRawShaderMaterial = true, this.type = `RawShaderMaterial`;
    }
  },
  ki = class extends jr {
    constructor(constructor) {
      super(), this.isMeshLambertMaterial = true, this.type = `MeshLambertMaterial`, this.color = new X(16777215), this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.emissive = new X(0), this.emissiveIntensity = 1, this.emissiveMap = null, this.bumpMap = null, this.bumpScale = 1, this.normalMap = null, this.normalMapType = 0, this.normalScale = new K(1, 1), this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.specularMap = null, this.alphaMap = null, this.envMap = null, this.envMapRotation = new an(), this.combine = 0, this.reflectivity = 1, this.envMapIntensity = 1, this.refractionRatio = .98, this.wireframe = false, this.wireframeLinewidth = 1, this.wireframeLinecap = `round`, this.wireframeLinejoin = `round`, this.flatShading = false, this.fog = true, this.setValues(constructor);
    }
    copy(items) {
      return super.copy(items), this.color.copy(items.color), this.map = items.map, this.lightMap = items.lightMap, this.lightMapIntensity = items.lightMapIntensity, this.aoMap = items.aoMap, this.aoMapIntensity = items.aoMapIntensity, this.emissive.copy(items.emissive), this.emissiveMap = items.emissiveMap, this.emissiveIntensity = items.emissiveIntensity, this.bumpMap = items.bumpMap, this.bumpScale = items.bumpScale, this.normalMap = items.normalMap, this.normalMapType = items.normalMapType, this.normalScale.copy(items.normalScale), this.displacementMap = items.displacementMap, this.displacementScale = items.displacementScale, this.displacementBias = items.displacementBias, this.specularMap = items.specularMap, this.alphaMap = items.alphaMap, this.envMap = items.envMap, this.envMapRotation.copy(items.envMapRotation), this.combine = items.combine, this.reflectivity = items.reflectivity, this.envMapIntensity = items.envMapIntensity, this.refractionRatio = items.refractionRatio, this.wireframe = items.wireframe, this.wireframeLinewidth = items.wireframeLinewidth, this.wireframeLinecap = items.wireframeLinecap, this.wireframeLinejoin = items.wireframeLinejoin, this.flatShading = items.flatShading, this.fog = items.fog, this;
    }
  },
  Ai = class extends jr {
    constructor(constructor) {
      super(), this.isMeshDepthMaterial = true, this.type = `MeshDepthMaterial`, this.depthPacking = Pe, this.map = null, this.alphaMap = null, this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.wireframe = false, this.wireframeLinewidth = 1, this.setValues(constructor);
    }
    copy(items) {
      return super.copy(items), this.depthPacking = items.depthPacking, this.map = items.map, this.alphaMap = items.alphaMap, this.displacementMap = items.displacementMap, this.displacementScale = items.displacementScale, this.displacementBias = items.displacementBias, this.wireframe = items.wireframe, this.wireframeLinewidth = items.wireframeLinewidth, this;
    }
  },
  ji = class extends jr {
    constructor(constructor) {
      super(), this.isMeshDistanceMaterial = true, this.type = `MeshDistanceMaterial`, this.map = null, this.alphaMap = null, this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.setValues(constructor);
    }
    copy(items) {
      return super.copy(items), this.map = items.map, this.alphaMap = items.alphaMap, this.displacementMap = items.displacementMap, this.displacementScale = items.displacementScale, this.displacementBias = items.displacementBias, this;
    }
  };
function Mi(e, t) {
  return !e || e.constructor === t ? e : typeof t.BYTES_PER_ELEMENT == `number` ? new t(e) : Array.prototype.slice.call(e);
}
function Ni(e) {
  return e !== undefined && e.inTangents !== undefined && e.outTangents !== undefined;
}
var Pi = class {
    constructor(constructor, constructorValue, constructorInput, r) {
      this.parameterPositions = constructor, this._cachedIndex = 0, this.resultBuffer = r === undefined ? new constructorValue.constructor(constructorInput) : r, this.sampleValues = constructorValue, this.valueSize = constructorInput, this.settings = null, this.DefaultSettings_ = {};
    }
    evaluate(evaluate) {
      let parameterPositions = this.parameterPositions,
        _cachedIndex = this._cachedIndex,
        r = parameterPositions[_cachedIndex],
        i = parameterPositions[_cachedIndex - 1];
      validate_interval: {
        seek: {
          let flag;
          linear_scan: {
            forward_scan: if (!(evaluate < r)) {
              for (let a = _cachedIndex + 2;;) {
                if (r === undefined) {
                  if (evaluate < i) break forward_scan;
                  return _cachedIndex = parameterPositions.length, this._cachedIndex = _cachedIndex, this.copySampleValue_(_cachedIndex - 1);
                }
                if (_cachedIndex === a) break;
                if (i = r, r = parameterPositions[++_cachedIndex], evaluate < r) break seek;
              }
              flag = parameterPositions.length;
              break linear_scan;
            }
            if (!(evaluate >= i)) {
              let o = parameterPositions[1];
              evaluate < o && (_cachedIndex = 2, i = o);
              for (let a = _cachedIndex - 2;;) {
                if (i === undefined) return this._cachedIndex = 0, this.copySampleValue_(0);
                if (_cachedIndex === a) break;
                if (r = i, i = parameterPositions[--_cachedIndex - 1], evaluate >= i) break seek;
              }
              flag = _cachedIndex, _cachedIndex = 0;
              break linear_scan;
            }
            break validate_interval;
          }
          for (; _cachedIndex < flag;) {
            let r = _cachedIndex + flag >>> 1;
            evaluate < parameterPositions[r] ? flag = r : _cachedIndex = r + 1;
          }
          if (r = parameterPositions[_cachedIndex], i = parameterPositions[_cachedIndex - 1], i === undefined) return this._cachedIndex = 0, this.copySampleValue_(0);
          if (r === undefined) return _cachedIndex = parameterPositions.length, this._cachedIndex = _cachedIndex, this.copySampleValue_(_cachedIndex - 1);
        }
        this._cachedIndex = _cachedIndex, this.intervalChanged_(_cachedIndex, i, r);
      }
      return this.interpolate_(_cachedIndex, i, evaluate, r);
    }
    getSettings_() {
      return this.settings || this.DefaultSettings_;
    }
    copySampleValue_(sample) {
      let resultBuffer = this.resultBuffer,
        sampleValues = this.sampleValues,
        valueSize = this.valueSize,
        i = sample * valueSize;
      for (let e = 0; e !== valueSize; ++e) resultBuffer[e] = sampleValues[i + e];
      return resultBuffer;
    }
    interpolate_() {
      throw Error(`THREE.Interpolant: Call to abstract method.`);
    }
    intervalChanged_() {}
  },
  Fi = class extends Pi {
    constructor(constructor, constructorValue, constructorInput, r) {
      super(constructor, constructorValue, constructorInput, r), this._weightPrev = -0, this._offsetPrev = -0, this._weightNext = -0, this._offsetNext = -0, this.DefaultSettings_ = {
        endingStart: Ne,
        endingEnd: Ne
      };
    }
    intervalChanged_(interval, t, n) {
      let parameterPositions = this.parameterPositions,
        i = interval - 2,
        a = interval + 1,
        o = parameterPositions[i],
        s = parameterPositions[a];
      if (o === undefined) switch (this.getSettings_().endingStart) {
        case V:
          i = interval, o = 2 * t - n;
          break;
        case H:
          i = parameterPositions.length - 2, o = t + parameterPositions[i] - parameterPositions[i + 1];
          break;
        default:
          i = interval, o = n;
      }
      if (s === undefined) switch (this.getSettings_().endingEnd) {
        case V:
          a = interval, s = 2 * n - t;
          break;
        case H:
          a = 1, s = n + parameterPositions[1] - parameterPositions[0];
          break;
        default:
          a = interval - 1, s = t;
      }
      let c = (n - t) * .5,
        valueSize = this.valueSize;
      this._weightPrev = c / (t - o), this._weightNext = c / (s - n), this._offsetPrev = i * valueSize, this._offsetNext = a * valueSize;
    }
    interpolate_(e, t, n, r) {
      let resultBuffer = this.resultBuffer,
        sampleValues = this.sampleValues,
        valueSize = this.valueSize,
        s = e * valueSize,
        c = s - valueSize,
        _offsetPrev = this._offsetPrev,
        _offsetNext = this._offsetNext,
        _weightPrev = this._weightPrev,
        _weightNext = this._weightNext,
        p = (n - t) / (r - t),
        m = p * p,
        h = m * p,
        g = -_weightPrev * h + 2 * _weightPrev * m - _weightPrev * p,
        _ = (1 + _weightPrev) * h + (-1.5 - 2 * _weightPrev) * m + (-.5 + _weightPrev) * p + 1,
        v = (-1 - _weightNext) * h + (1.5 + _weightNext) * m + .5 * p,
        y = _weightNext * h - _weightNext * m;
      for (let e = 0; e !== valueSize; ++e) resultBuffer[e] = g * sampleValues[_offsetPrev + e] + _ * sampleValues[c + e] + v * sampleValues[s + e] + y * sampleValues[_offsetNext + e];
      return resultBuffer;
    }
  },
  Ii = class extends Pi {
    constructor(constructor, constructorValue, constructorInput, r) {
      super(constructor, constructorValue, constructorInput, r);
    }
    interpolate_(e, t, n, r) {
      let resultBuffer = this.resultBuffer,
        sampleValues = this.sampleValues,
        valueSize = this.valueSize,
        s = e * valueSize,
        c = s - valueSize,
        l = (n - t) / (r - t),
        u = 1 - l;
      for (let e = 0; e !== valueSize; ++e) resultBuffer[e] = sampleValues[c + e] * u + sampleValues[s + e] * l;
      return resultBuffer;
    }
  },
  Li = class extends Pi {
    constructor(constructor, constructorValue, constructorInput, r) {
      super(constructor, constructorValue, constructorInput, r);
    }
    interpolate_(e) {
      return this.copySampleValue_(e - 1);
    }
  },
  Ri = class extends Pi {
    interpolate_(e, t, n, r) {
      let resultBuffer = this.resultBuffer,
        sampleValues = this.sampleValues,
        valueSize = this.valueSize,
        s = e * valueSize,
        c = s - valueSize,
        inTangents = this.inTangents,
        outTangents = this.outTangents;
      if (!inTangents || !outTangents) {
        let e = (n - t) / (r - t),
          l = 1 - e;
        for (let t = 0; t !== valueSize; ++t) resultBuffer[t] = sampleValues[c + t] * l + sampleValues[s + t] * e;
        return resultBuffer;
      }
      let d = valueSize * 2,
        f = e - 1;
      for (let p = 0; p !== valueSize; ++p) {
        let o = sampleValues[c + p],
          m = sampleValues[s + p],
          h = f * d + p * 2,
          g = outTangents[h],
          _ = outTangents[h + 1],
          v = e * d + p * 2,
          y = inTangents[v],
          b = inTangents[v + 1],
          x = Vi(n, t, g, y, r);
        resultBuffer[p] = zi(x, o, _, b, m);
      }
      return resultBuffer;
    }
  };
function zi(e, t, n, r, i) {
  let a = 1 - e;
  return a * a * a * t + 3 * a * a * e * n + 3 * a * e * e * r + e * e * e * i;
}
function Bi(e, t, n, r, i) {
  let a = 1 - e;
  return 3 * a * a * (n - t) + 6 * a * e * (r - n) + 3 * e * e * (i - r);
}
function Vi(e, t, n, r, i) {
  let a = (e - t) / (i - t);
  for (let o = 0; o < 8; o++) {
    let o = zi(a, t, n, r, i) - e;
    if (Math.abs(o) < 1e-10) break;
    let s = Bi(a, t, n, r, i);
    if (Math.abs(s) < 1e-10) break;
    a = Math.max(0, Math.min(1, a - o / s));
  }
  return a;
}
var Hi = class {
  constructor(constructor, count, constructorValue, constructorInput) {
    if (constructor === undefined) throw Error(`THREE.KeyframeTrack: track name is undefined`);
    if (count === undefined || count.length === 0) throw Error(`THREE.KeyframeTrack: no keyframes in track named ` + constructor);
    this.name = constructor, this.times = Mi(count, this.TimeBufferType), this.values = Mi(constructorValue, this.ValueBufferType), this.setInterpolation(constructorInput || this.DefaultInterpolation);
  }
  static toJSON(options) {
    let t = options.constructor,
      count;
    if (t.toJSON !== this.toJSON) count = t.toJSON(options);else {
      count = {
        name: options.name,
        times: Mi(options.times, Array),
        values: Mi(options.values, Array)
      };
      let interpolation = options.getInterpolation();
      interpolation !== options.DefaultInterpolation && (count.interpolation = interpolation), Ni(options.settings) && (count.settings = {
        inTangents: Mi(options.settings.inTangents, Array),
        outTangents: Mi(options.settings.outTangents, Array)
      });
    }
    return count.type = options.ValueTypeName, count;
  }
  InterpolantFactoryMethodDiscrete(interpolant) {
    return new Li(this.times, this.values, this.getValueSize(), interpolant);
  }
  InterpolantFactoryMethodLinear(interpolant) {
    return new Ii(this.times, this.values, this.getValueSize(), interpolant);
  }
  InterpolantFactoryMethodSmooth(interpolant) {
    return new Fi(this.times, this.values, this.getValueSize(), interpolant);
  }
  InterpolantFactoryMethodBezier(interpolant) {
    let t = new Ri(this.times, this.values, this.getValueSize(), interpolant);
    return this.settings && (t.inTangents = this.settings.inTangents, t.outTangents = this.settings.outTangents), t;
  }
  setInterpolation(interpolation) {
    let total;
    switch (interpolation) {
      case je:
        total = this.InterpolantFactoryMethodDiscrete;
        break;
      case z:
        total = this.InterpolantFactoryMethodLinear;
        break;
      case Me:
        total = this.InterpolantFactoryMethodSmooth;
        break;
      case B:
        total = this.InterpolantFactoryMethodBezier;
    }
    if (total === undefined) {
      let t = `unsupported interpolation for ` + this.ValueTypeName + ` keyframe track named ` + this.name;
      if (this.createInterpolant === undefined) {
        if (interpolation !== this.DefaultInterpolation) this.setInterpolation(this.DefaultInterpolation);else throw Error(t);
      }
      return U(`KeyframeTrack:`, t), this;
    }
    return this.createInterpolant = total, this;
  }
  getInterpolation() {
    switch (this.createInterpolant) {
      case this.InterpolantFactoryMethodDiscrete:
        return je;
      case this.InterpolantFactoryMethodLinear:
        return z;
      case this.InterpolantFactoryMethodSmooth:
        return Me;
      case this.InterpolantFactoryMethodBezier:
        return B;
    }
  }
  getValueSize() {
    return this.values.length / this.times.length;
  }
  shift(e) {
    if (e !== 0) {
      let times = this.times;
      for (let n = 0, r = times.length; n !== r; ++n) times[n] += e;
    }
    return this;
  }
  scale(e) {
    if (e !== 1) {
      let times = this.times;
      for (let n = 0, r = times.length; n !== r; ++n) times[n] *= e;
      Ni(this.settings) && (Ui(this.settings.inTangents, e), Ui(this.settings.outTangents, e));
    }
    return this;
  }
  trim(e, t) {
    let times = this.times,
      r = times.length,
      i = 0,
      a = r - 1;
    for (; i !== r && times[i] < e;) ++i;
    for (; a !== -1 && times[a] > t;) --a;
    if (++a, i !== 0 || a !== r) {
      i >= a && (a = Math.max(a, 1), i = a - 1);
      let valueSize = this.getValueSize();
      this.times = times.slice(i, a), this.values = this.values.slice(i * valueSize, a * valueSize);
    }
    return this;
  }
  validate() {
    let e = true,
      valueSize = this.getValueSize();
    valueSize - Math.floor(valueSize) !== 0 && (W(`KeyframeTrack: Invalid value size in track.`, this), e = false);
    let times = this.times,
      values = this.values,
      i = times.length;
    i === 0 && (W(`KeyframeTrack: Track is empty.`, this), e = false);
    let flag = null;
    for (let t = 0; t !== i; t++) {
      let r = times[t];
      if (typeof r == `number` && isNaN(r)) {
        W(`KeyframeTrack: Time is not a valid number.`, this, t, r), e = false;
        break;
      }
      if (flag !== null && flag > r) {
        W(`KeyframeTrack: Out of order keys.`, this, t, r, flag), e = false;
        break;
      }
      flag = r;
    }
    if (values !== undefined && We(values)) for (let t = 0, n = values.length; t !== n; ++t) {
      let n = values[t];
      if (isNaN(n)) {
        W(`KeyframeTrack: Value is not a valid number.`, this, t, n), e = false;
        break;
      }
    }
    return e;
  }
  optimize() {
    let part = this.times.slice(),
      t = this.values.slice(),
      valueSize = this.getValueSize(),
      r = this.getInterpolation() === Me,
      i = part.length - 1,
      a = 1;
    for (let o = 1; o < i; ++o) {
      let i = false,
        s = part[o];
      if (s !== part[o + 1] && (o !== 1 || s !== part[0])) {
        if (r) i = true;else {
          let e = o * valueSize,
            r = e - valueSize,
            a = e + valueSize;
          for (let o = 0; o !== valueSize; ++o) {
            let n = t[e + o];
            if (n !== t[r + o] || n !== t[a + o]) {
              i = true;
              break;
            }
          }
        }
      }
      if (i) {
        if (o !== a) {
          part[a] = part[o];
          let r = o * valueSize,
            i = a * valueSize;
          for (let e = 0; e !== valueSize; ++e) t[i + e] = t[r + e];
        }
        ++a;
      }
    }
    if (i > 0) {
      part[a] = part[i];
      for (let e = i * valueSize, r = a * valueSize, o = 0; o !== valueSize; ++o) t[r + o] = t[e + o];
      ++a;
    }
    return a === part.length ? (this.times = part, this.values = t) : (this.times = part.slice(0, a), this.values = t.slice(0, a * valueSize)), this;
  }
  clone() {
    let part = this.times.slice(),
      t = this.values.slice(),
      n = this.constructor,
      r = new n(this.name, part, t);
    return r.createInterpolant = this.createInterpolant, Ni(this.settings) && (r.settings = {
      inTangents: this.settings.inTangents.slice(),
      outTangents: this.settings.outTangents.slice()
    }), r;
  }
};
function Ui(count, t) {
  for (let n = 0, r = count.length; n !== r; n += 2) count[n] *= t;
}
Hi.prototype.ValueTypeName = ``, Hi.prototype.TimeBufferType = Float32Array, Hi.prototype.ValueBufferType = Float32Array, Hi.prototype.DefaultInterpolation = z;
var Wi = class extends Hi {
  constructor(constructor, constructorValue, constructorInput) {
    super(constructor, constructorValue, constructorInput);
  }
};
Wi.prototype.ValueTypeName = `bool`, Wi.prototype.ValueBufferType = Array, Wi.prototype.DefaultInterpolation = je, Wi.prototype.InterpolantFactoryMethodLinear = undefined, Wi.prototype.InterpolantFactoryMethodSmooth = undefined;
var Gi = class extends Hi {
  constructor(constructor, constructorValue, constructorInput, r) {
    super(constructor, constructorValue, constructorInput, r);
  }
};
Gi.prototype.ValueTypeName = `color`;
var Ki = class extends Hi {
  constructor(constructor, constructorValue, constructorInput, r) {
    super(constructor, constructorValue, constructorInput, r);
  }
};
Ki.prototype.ValueTypeName = `number`;
var qi = class extends Pi {
    constructor(constructor, constructorValue, constructorInput, r) {
      super(constructor, constructorValue, constructorInput, r);
    }
    interpolate_(e, t, n, r) {
      let resultBuffer = this.resultBuffer,
        sampleValues = this.sampleValues,
        valueSize = this.valueSize,
        s = (n - t) / (r - t),
        c = e * valueSize;
      for (let e = c + valueSize; c !== e; c += 4) Et.slerpFlat(resultBuffer, 0, sampleValues, c - valueSize, sampleValues, c, s);
      return resultBuffer;
    }
  },
  Ji = class extends Hi {
    constructor(constructor, constructorValue, constructorInput, r) {
      super(constructor, constructorValue, constructorInput, r);
    }
    InterpolantFactoryMethodLinear(interpolant) {
      return new qi(this.times, this.values, this.getValueSize(), interpolant);
    }
  };
Ji.prototype.ValueTypeName = `quaternion`, Ji.prototype.InterpolantFactoryMethodSmooth = undefined;
var Yi = class extends Hi {
  constructor(constructor, constructorValue, constructorInput) {
    super(constructor, constructorValue, constructorInput);
  }
};
Yi.prototype.ValueTypeName = `string`, Yi.prototype.ValueBufferType = Array, Yi.prototype.DefaultInterpolation = je, Yi.prototype.InterpolantFactoryMethodLinear = undefined, Yi.prototype.InterpolantFactoryMethodSmooth = undefined;
var Xi = class extends Hi {
  constructor(constructor, constructorValue, constructorInput, r) {
    super(constructor, constructorValue, constructorInput, r);
  }
};
Xi.prototype.ValueTypeName = `vector`;
var Zi = class extends Sn {
    constructor(constructor, t = 1) {
      super(), this.isLight = true, this.type = `Light`, this.color = new X(constructor), this.intensity = t;
    }
    copy(e, t) {
      return super.copy(e, t), this.color.copy(e.color), this.intensity = e.intensity, this;
    }
    toJSON(e) {
      let t = super.toJSON(e);
      return t.object.color = this.color.getHex(), t.object.intensity = this.intensity, t;
    }
  },
  Qi = new Jt(),
  $i = new q(),
  ea = new q(),
  ta = class {
    constructor(constructor) {
      this.camera = constructor, this.intensity = 1, this.bias = 0, this.biasNode = null, this.normalBias = 0, this.radius = 1, this.blurSamples = 8, this.mapSize = new K(512, 512), this.mapType = d, this.map = null, this.mapPass = null, this.matrix = new Jt(), this.autoUpdate = true, this.needsUpdate = false, this._frustum = new di(), this._frameExtents = new K(1, 1), this._viewportCount = 1, this._viewports = [new Ut(0, 0, 1, 1)];
    }
    getViewportCount() {
      return this._viewportCount;
    }
    getCamera() {
      return this.camera;
    }
    getFrustum() {
      return this._frustum;
    }
    updateMatrices(event) {
      let camera = this.camera;
      $i.setFromMatrixPosition(event.matrixWorld), camera.position.copy($i), ea.setFromMatrixPosition(event.target.matrixWorld), camera.lookAt(ea), camera.updateMatrixWorld(), this._updateMatrix(camera, this.matrix, this._frustum);
    }
    _updateMatrix(e, matrix, matrixValue, matrixInput) {
      Qi.multiplyMatrices(e.projectionMatrix, e.matrixWorldInverse), matrixValue.setFromProjectionMatrix(Qi, e.coordinateSystem, e.reversedDepth);
      let _frameExtents = this._frameExtents,
        a = matrixInput ? matrixInput.z / _frameExtents.x : 1,
        o = matrixInput ? matrixInput.w / _frameExtents.y : 1,
        s = matrixInput ? matrixInput.x / _frameExtents.x : 0,
        c = matrixInput ? matrixInput.y / _frameExtents.y : 0;
      e.coordinateSystem === 2001 || e.reversedDepth ? matrix.set(.5 * a, 0, 0, .5 * a + s, 0, .5 * o, 0, .5 * o + c, 0, 0, 1, 0, 0, 0, 0, 1) : matrix.set(.5 * a, 0, 0, .5 * a + s, 0, .5 * o, 0, .5 * o + c, 0, 0, .5, .5, 0, 0, 0, 1), matrix.multiply(Qi);
    }
    getViewport(viewport) {
      return this._viewports[viewport];
    }
    getFrameExtents() {
      return this._frameExtents;
    }
    dispose() {
      this.map && this.map.dispose(), this.mapPass && this.mapPass.dispose();
    }
    copy(e) {
      return this.camera = e.camera.clone(), this.intensity = e.intensity, this.bias = e.bias, this.radius = e.radius, this.autoUpdate = e.autoUpdate, this.needsUpdate = e.needsUpdate, this.normalBias = e.normalBias, this.blurSamples = e.blurSamples, this.mapSize.copy(e.mapSize), this.biasNode = e.biasNode, this;
    }
    clone() {
      return new this.constructor().copy(this);
    }
    toJSON() {
      let e = {};
      return e.intensity = this.intensity, e.bias = this.bias, e.normalBias = this.normalBias, e.radius = this.radius, e.blurSamples = this.blurSamples, e.mapSize = this.mapSize.toArray(), e.camera = this.camera.toJSON(false).object, delete e.camera.matrix, e;
    }
  },
  na = new q(),
  ra = new Et(),
  ia = new q(),
  aa = class extends Sn {
    constructor() {
      super(), this.isCamera = true, this.type = `Camera`, this.matrixWorldInverse = new Jt(), this.projectionMatrix = new Jt(), this.projectionMatrixInverse = new Jt(), this.coordinateSystem = He, this._reversedDepth = false;
    }
    get reversedDepth() {
      return this._reversedDepth;
    }
    copy(e, t) {
      return super.copy(e, t), this.matrixWorldInverse.copy(e.matrixWorldInverse), this.projectionMatrix.copy(e.projectionMatrix), this.projectionMatrixInverse.copy(e.projectionMatrixInverse), this.coordinateSystem = e.coordinateSystem, this;
    }
    getWorldDirection(world) {
      return super.getWorldDirection(world).negate();
    }
    updateMatrixWorld(matrix) {
      super.updateMatrixWorld(matrix), this.matrixWorld.decompose(na, ra, ia), ia.x === 1 && ia.y === 1 && ia.z === 1 ? this.matrixWorldInverse.copy(this.matrixWorld).invert() : this.matrixWorldInverse.compose(na, ra, ia.set(1, 1, 1)).invert();
    }
    updateWorldMatrix(world, matrix, n = false) {
      super.updateWorldMatrix(world, matrix, n), this.matrixWorld.decompose(na, ra, ia), ia.x === 1 && ia.y === 1 && ia.z === 1 ? this.matrixWorldInverse.copy(this.matrixWorld).invert() : this.matrixWorldInverse.compose(na, ra, ia.set(1, 1, 1)).invert();
    }
    clone() {
      return new this.constructor().copy(this);
    }
  },
  oa = new q(),
  sa = new K(),
  ca = new K(),
  la = class extends aa {
    constructor(e = 50, t = 1, n = .1, r = 2e3) {
      super(), this.isPerspectiveCamera = true, this.type = `PerspectiveCamera`, this.fov = e, this.zoom = 1, this.near = n, this.far = r, this.focus = 10, this.aspect = t, this.view = null, this.filmGauge = 35, this.filmOffset = 0, this.updateProjectionMatrix();
    }
    copy(e, t) {
      return super.copy(e, t), this.fov = e.fov, this.zoom = e.zoom, this.near = e.near, this.far = e.far, this.focus = e.focus, this.aspect = e.aspect, this.view = e.view === null ? null : Object.assign({}, e.view), this.filmGauge = e.filmGauge, this.filmOffset = e.filmOffset, this;
    }
    setFocalLength(focal) {
      let t = .5 * this.getFilmHeight() / focal;
      this.fov = rt * 2 * Math.atan(t), this.updateProjectionMatrix();
    }
    getFocalLength() {
      let e = Math.tan(nt * .5 * this.fov);
      return .5 * this.getFilmHeight() / e;
    }
    getEffectiveFOV() {
      return rt * 2 * Math.atan(Math.tan(nt * .5 * this.fov) / this.zoom);
    }
    getFilmWidth() {
      return this.filmGauge * Math.min(this.aspect, 1);
    }
    getFilmHeight() {
      return this.filmGauge / Math.max(this.aspect, 1);
    }
    getViewBounds(view, bounds, boundsValue) {
      oa.set(-1, -1, .5).applyMatrix4(this.projectionMatrixInverse), bounds.set(oa.x, oa.y).multiplyScalar(-view / oa.z), oa.set(1, 1, .5).applyMatrix4(this.projectionMatrixInverse), boundsValue.set(oa.x, oa.y).multiplyScalar(-view / oa.z);
    }
    getViewSize(view, size) {
      return this.getViewBounds(view, sa, ca), size.subVectors(ca, sa);
    }
    setViewOffset(view, offset, offsetValue, offsetInput, i, a) {
      this.aspect = view / offset, this.view === null && (this.view = {
        enabled: true,
        fullWidth: 1,
        fullHeight: 1,
        offsetX: 0,
        offsetY: 0,
        width: 1,
        height: 1
      }), this.view.enabled = true, this.view.fullWidth = view, this.view.fullHeight = offset, this.view.offsetX = offsetValue, this.view.offsetY = offsetInput, this.view.width = i, this.view.height = a, this.updateProjectionMatrix();
    }
    clearViewOffset() {
      this.view !== null && (this.view.enabled = false), this.updateProjectionMatrix();
    }
    updateProjectionMatrix() {
      let near = this.near,
        t = near * Math.tan(nt * .5 * this.fov) / this.zoom,
        n = 2 * t,
        r = this.aspect * n,
        i = -.5 * r,
        view = this.view;
      if (this.view !== null && this.view.enabled) {
        let fullWidth = view.fullWidth,
          fullHeight = view.fullHeight;
        i += view.offsetX * r / fullWidth, t -= view.offsetY * n / fullHeight, r *= view.width / fullWidth, n *= view.height / fullHeight;
      }
      let filmOffset = this.filmOffset;
      filmOffset !== 0 && (i += near * filmOffset / this.getFilmWidth()), this.projectionMatrix.makePerspective(i, i + r, t, t - n, near, this.far, this.coordinateSystem, this.reversedDepth), this.projectionMatrixInverse.copy(this.projectionMatrix).invert();
    }
    toJSON(e) {
      let t = super.toJSON(e);
      return t.object.fov = this.fov, t.object.zoom = this.zoom, t.object.near = this.near, t.object.far = this.far, t.object.focus = this.focus, t.object.aspect = this.aspect, this.view !== null && (t.object.view = Object.assign({}, this.view)), t.object.filmGauge = this.filmGauge, t.object.filmOffset = this.filmOffset, t;
    }
  },
  ua = class extends aa {
    constructor(e = -1, t = 1, n = 1, r = -1, i = .1, a = 2e3) {
      super(), this.isOrthographicCamera = true, this.type = `OrthographicCamera`, this.zoom = 1, this.view = null, this.left = e, this.right = t, this.top = n, this.bottom = r, this.near = i, this.far = a, this.updateProjectionMatrix();
    }
    copy(e, t) {
      return super.copy(e, t), this.left = e.left, this.right = e.right, this.top = e.top, this.bottom = e.bottom, this.near = e.near, this.far = e.far, this.zoom = e.zoom, this.view = e.view === null ? null : Object.assign({}, e.view), this;
    }
    setViewOffset(view, offset, offsetValue, offsetInput, i, a) {
      this.view === null && (this.view = {
        enabled: true,
        fullWidth: 1,
        fullHeight: 1,
        offsetX: 0,
        offsetY: 0,
        width: 1,
        height: 1
      }), this.view.enabled = true, this.view.fullWidth = view, this.view.fullHeight = offset, this.view.offsetX = offsetValue, this.view.offsetY = offsetInput, this.view.width = i, this.view.height = a, this.updateProjectionMatrix();
    }
    clearViewOffset() {
      this.view !== null && (this.view.enabled = false), this.updateProjectionMatrix();
    }
    updateProjectionMatrix() {
      let e = (this.right - this.left) / (2 * this.zoom),
        t = (this.top - this.bottom) / (2 * this.zoom),
        n = (this.right + this.left) / 2,
        r = (this.top + this.bottom) / 2,
        i = n - e,
        a = n + e,
        o = r + t,
        s = r - t;
      if (this.view !== null && this.view.enabled) {
        let e = (this.right - this.left) / this.view.fullWidth / this.zoom,
          t = (this.top - this.bottom) / this.view.fullHeight / this.zoom;
        i += e * this.view.offsetX, a = i + e * this.view.width, o -= t * this.view.offsetY, s = o - t * this.view.height;
      }
      this.projectionMatrix.makeOrthographic(i, a, o, s, this.near, this.far, this.coordinateSystem, this.reversedDepth), this.projectionMatrixInverse.copy(this.projectionMatrix).invert();
    }
    toJSON(e) {
      let t = super.toJSON(e);
      return t.object.zoom = this.zoom, t.object.left = this.left, t.object.right = this.right, t.object.top = this.top, t.object.bottom = this.bottom, t.object.near = this.near, t.object.far = this.far, this.view !== null && (t.object.view = Object.assign({}, this.view)), t;
    }
  },
  da = class extends ta {
    constructor() {
      super(new ua(-5, 5, 5, -5, .5, 500)), this.isDirectionalLightShadow = true;
    }
  },
  fa = class extends Zi {
    constructor(constructor, constructorValue) {
      super(constructor, constructorValue), this.isDirectionalLight = true, this.type = `DirectionalLight`, this.position.copy(Sn.DEFAULT_UP), this.updateMatrix(), this.target = new Sn(), this.shadow = new da();
    }
    dispose() {
      super.dispose(), this.shadow.dispose();
    }
    copy(event) {
      return super.copy(event), this.target = event.target.clone(), this.shadow = event.shadow.clone(), this;
    }
    toJSON(e) {
      let t = super.toJSON(e);
      return t.object.shadow = this.shadow.toJSON(), t.object.target = this.target.uuid, t;
    }
  },
  pa = class extends Zi {
    constructor(constructor, constructorValue) {
      super(constructor, constructorValue), this.isAmbientLight = true, this.type = `AmbientLight`;
    }
  },
  ma = -90,
  ha = 1,
  ga = class extends Sn {
    constructor(constructor, constructorValue, constructorInput) {
      super(), this.type = `CubeCamera`, this.renderTarget = constructorInput, this.coordinateSystem = null, this.activeMipmapLevel = 0;
      let r = new la(ma, ha, constructor, constructorValue);
      r.layers = this.layers, this.add(r);
      let i = new la(ma, ha, constructor, constructorValue);
      i.layers = this.layers, this.add(i);
      let a = new la(ma, ha, constructor, constructorValue);
      a.layers = this.layers, this.add(a);
      let o = new la(ma, ha, constructor, constructorValue);
      o.layers = this.layers, this.add(o);
      let s = new la(ma, ha, constructor, constructorValue);
      s.layers = this.layers, this.add(s);
      let c = new la(ma, ha, constructor, constructorValue);
      c.layers = this.layers, this.add(c);
    }
    updateCoordinateSystem() {
      let coordinateSystem = this.coordinateSystem,
        combined = this.children.concat(),
        [n, r, i, a, o, s] = combined;
      for (let ratio of combined) this.remove(ratio);
      if (coordinateSystem === 2e3) n.up.set(0, 1, 0), n.lookAt(1, 0, 0), r.up.set(0, 1, 0), r.lookAt(-1, 0, 0), i.up.set(0, 0, -1), i.lookAt(0, 1, 0), a.up.set(0, 0, 1), a.lookAt(0, -1, 0), o.up.set(0, 1, 0), o.lookAt(0, 0, 1), s.up.set(0, 1, 0), s.lookAt(0, 0, -1);else if (coordinateSystem === 2001) n.up.set(0, -1, 0), n.lookAt(-1, 0, 0), r.up.set(0, -1, 0), r.lookAt(1, 0, 0), i.up.set(0, 0, 1), i.lookAt(0, 1, 0), a.up.set(0, 0, -1), a.lookAt(0, -1, 0), o.up.set(0, -1, 0), o.lookAt(0, 0, 1), s.up.set(0, -1, 0), s.lookAt(0, 0, -1);else throw Error(`THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: ` + coordinateSystem);
      for (let ratio of combined) this.add(ratio), ratio.updateMatrixWorld();
    }
    update(update, updateValue) {
      this.parent === null && this.updateMatrixWorld();
      let {
        renderTarget: n,
        activeMipmapLevel: r
      } = this;
      this.coordinateSystem !== update.coordinateSystem && (this.coordinateSystem = update.coordinateSystem, this.updateCoordinateSystem());
      let [i, a, o, s, c, l] = this.children,
        renderTarget = update.getRenderTarget(),
        activeCubeFace = update.getActiveCubeFace(),
        activeMipmapLevel = update.getActiveMipmapLevel(),
        enabled = update.xr.enabled;
      update.xr.enabled = false;
      let generateMipmaps = n.texture.generateMipmaps;
      n.texture.generateMipmaps = false;
      let h = false;
      h = update.isWebGLRenderer === true ? update.state.buffers.depth.getReversed() : update.reversedDepthBuffer, update.setRenderTarget(n, 0, r), h && update.autoClear === false && update.clearDepth(), update.render(updateValue, i), update.setRenderTarget(n, 1, r), h && update.autoClear === false && update.clearDepth(), update.render(updateValue, a), update.setRenderTarget(n, 2, r), h && update.autoClear === false && update.clearDepth(), update.render(updateValue, o), update.setRenderTarget(n, 3, r), h && update.autoClear === false && update.clearDepth(), update.render(updateValue, s), update.setRenderTarget(n, 4, r), h && update.autoClear === false && update.clearDepth(), update.render(updateValue, c), n.texture.generateMipmaps = generateMipmaps, update.setRenderTarget(n, 5, r), h && update.autoClear === false && update.clearDepth(), update.render(updateValue, l), update.setRenderTarget(renderTarget, activeCubeFace, activeMipmapLevel), update.xr.enabled = enabled, n.texture.needsPMREMUpdate = true;
    }
  },
  _a = class extends la {
    constructor(e = []) {
      super(), this.isArrayCamera = true, this.isMultiViewCamera = false, this.cameras = e;
    }
  },
  va = `\\[\\]\\.:\\/`,
  ya = RegExp(`[\\[\\]\\.:\\/]`, `g`),
  ba = `[^\\[\\]\\.:\\/]`,
  xa = `[^` + va.replace(`\\.`, ``) + `]`,
  Sa = `((?:WC+[\\/:])*)`.replace(`WC`, ba),
  Ca = `(WCOD+)?`.replace(`WCOD`, xa),
  replaced = `(?:\\.(WC+)(?:\\[(.+)\\])?)?`.replace(`WC`, ba),
  Ta = `\\.(WC+)(?:\\[(.+)\\])?`.replace(`WC`, ba),
  Ea = RegExp(`^` + Sa + Ca + replaced + Ta + `$`),
  Da = [`material`, `materials`, `bones`, `map`],
  Oa = class {
    constructor(constructor, constructorValue, constructorInput) {
      let constructorInputValue = constructorInput || ka.parseTrackName(constructorValue);
      this._targetGroup = constructor, this._bindings = constructor.subscribe_(constructorValue, constructorInputValue);
    }
    getValue(value, valueValue) {
      this.bind();
      let nCachedObjects_ = this._targetGroup.nCachedObjects_,
        r = this._bindings[nCachedObjects_];
      r !== undefined && r.getValue(value, valueValue);
    }
    setValue(value, valueValue) {
      let _bindings = this._bindings;
      for (let nCachedObjects_ = this._targetGroup.nCachedObjects_, i = _bindings.length; nCachedObjects_ !== i; ++nCachedObjects_) _bindings[nCachedObjects_].setValue(value, valueValue);
    }
    bind() {
      let _bindings = this._bindings;
      for (let nCachedObjects_ = this._targetGroup.nCachedObjects_, n = _bindings.length; nCachedObjects_ !== n; ++nCachedObjects_) _bindings[nCachedObjects_].bind();
    }
    unbind() {
      let _bindings = this._bindings;
      for (let nCachedObjects_ = this._targetGroup.nCachedObjects_, n = _bindings.length; nCachedObjects_ !== n; ++nCachedObjects_) _bindings[nCachedObjects_].unbind();
    }
  },
  ka = class e {
    constructor(constructor, constructorValue, constructorInput) {
      this.path = constructorValue, this.parsedPath = constructorInput || e.parseTrackName(constructorValue), this.node = e.findNode(constructor, this.parsedPath.nodeName), this.rootNode = constructor, this.getValue = this._getValue_unbound, this.setValue = this._setValue_unbound;
    }
    static create(create, createValue, createInput) {
      return create && create.isAnimationObjectGroup ? new e.Composite(create, createValue, createInput) : new e(create, createValue, createInput);
    }
    static sanitizeNodeName(node) {
      return node.replace(/\s/g, `_`).replace(ya, ``);
    }
    static parseTrackName(track) {
      let t = Ea.exec(track);
      if (t === null) throw Error(`THREE.PropertyBinding: Cannot parse trackName: ` + track);
      let n = {
          nodeName: t[2],
          objectName: t[3],
          objectIndex: t[4],
          propertyName: t[5],
          propertyIndex: t[6]
        },
        r = n.nodeName && n.nodeName.lastIndexOf(`.`);
      if (r !== undefined && r !== -1) {
        let part = n.nodeName.substring(r + 1);
        Da.indexOf(part) !== -1 && (n.nodeName = n.nodeName.substring(0, r), n.objectName = part);
      }
      if (n.propertyName === null || n.propertyName.length === 0) throw Error(`THREE.PropertyBinding: can not parse propertyName from trackName: ` + track);
      return n;
    }
    static findNode(count, node) {
      if (node === undefined || node === `` || node === `.` || node === -1 || node === count.name || node === count.uuid) return count;
      if (count.skeleton) {
        let boneByName = count.skeleton.getBoneByName(node);
        if (boneByName !== undefined) return boneByName;
      }
      if (count.children) {
        let n = function (e) {
            for (let r = 0; r < e.length; r++) {
              let i = e[r];
              if (i.name === node || i.uuid === node) return i;
              let a = n(i.children);
              if (a) return a;
            }
            return null;
          },
          r = n(count.children);
        if (r) return r;
      }
      return null;
    }
    _getValue_unavailable() {}
    _setValue_unavailable() {}
    _getValue_direct(e, t) {
      e[t] = this.targetObject[this.propertyName];
    }
    _getValue_array(e, t) {
      let resolvedProperty = this.resolvedProperty;
      for (let r = 0, i = resolvedProperty.length; r !== i; ++r) e[t++] = resolvedProperty[r];
    }
    _getValue_arrayElement(e, t) {
      e[t] = this.resolvedProperty[this.propertyIndex];
    }
    _getValue_toArray(e, t) {
      this.resolvedProperty.toArray(e, t);
    }
    _setValue_direct(e, t) {
      this.targetObject[this.propertyName] = e[t];
    }
    _setValue_direct_setNeedsUpdate(e, t) {
      this.targetObject[this.propertyName] = e[t], this.targetObject.needsUpdate = true;
    }
    _setValue_direct_setMatrixWorldNeedsUpdate(e, t) {
      this.targetObject[this.propertyName] = e[t], this.targetObject.matrixWorldNeedsUpdate = true;
    }
    _setValue_array(e, t) {
      let resolvedProperty = this.resolvedProperty;
      for (let r = 0, i = resolvedProperty.length; r !== i; ++r) resolvedProperty[r] = e[t++];
    }
    _setValue_array_setNeedsUpdate(e, t) {
      let resolvedProperty = this.resolvedProperty;
      for (let r = 0, i = resolvedProperty.length; r !== i; ++r) resolvedProperty[r] = e[t++];
      this.targetObject.needsUpdate = true;
    }
    _setValue_array_setMatrixWorldNeedsUpdate(e, t) {
      let resolvedProperty = this.resolvedProperty;
      for (let r = 0, i = resolvedProperty.length; r !== i; ++r) resolvedProperty[r] = e[t++];
      this.targetObject.matrixWorldNeedsUpdate = true;
    }
    _setValue_arrayElement(e, t) {
      this.resolvedProperty[this.propertyIndex] = e[t];
    }
    _setValue_arrayElement_setNeedsUpdate(e, t) {
      this.resolvedProperty[this.propertyIndex] = e[t], this.targetObject.needsUpdate = true;
    }
    _setValue_arrayElement_setMatrixWorldNeedsUpdate(e, t) {
      this.resolvedProperty[this.propertyIndex] = e[t], this.targetObject.matrixWorldNeedsUpdate = true;
    }
    _setValue_fromArray(e, t) {
      this.resolvedProperty.fromArray(e, t);
    }
    _setValue_fromArray_setNeedsUpdate(e, t) {
      this.resolvedProperty.fromArray(e, t), this.targetObject.needsUpdate = true;
    }
    _setValue_fromArray_setMatrixWorldNeedsUpdate(e, t) {
      this.resolvedProperty.fromArray(e, t), this.targetObject.matrixWorldNeedsUpdate = true;
    }
    _getValue_unbound(e, t) {
      this.bind(), this.getValue(e, t);
    }
    _setValue_unbound(e, t) {
      this.bind(), this.setValue(e, t);
    }
    bind() {
      let node = this.node,
        parsedPath = this.parsedPath,
        objectName = parsedPath.objectName,
        propertyName = parsedPath.propertyName,
        propertyIndex = parsedPath.propertyIndex;
      if (node || (node = e.findNode(this.rootNode, parsedPath.nodeName), this.node = node), this.getValue = this._getValue_unavailable, this.setValue = this._setValue_unavailable, !node) {
        U(`PropertyBinding: No target node found for track: ` + this.path + `.`);
        return;
      }
      if (objectName) {
        let objectIndex = parsedPath.objectIndex;
        switch (objectName) {
          case `materials`:
            if (!node.material) {
              W(`PropertyBinding: Can not bind to material as node does not have a material.`, this);
              return;
            }
            if (!node.material.materials) {
              W(`PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.`, this);
              return;
            }
            node = node.material.materials;
            break;
          case `bones`:
            if (!node.skeleton) {
              W(`PropertyBinding: Can not bind to bones as node does not have a skeleton.`, this);
              return;
            }
            node = node.skeleton.bones;
            for (let n = 0; n < node.length; n++) if (node[n].name === objectIndex) {
              objectIndex = n;
              break;
            }
            break;
          case `map`:
            if (`map` in node) {
              node = node.map;
              break;
            }
            if (!node.material) {
              W(`PropertyBinding: Can not bind to material as node does not have a material.`, this);
              return;
            }
            if (!node.material.map) {
              W(`PropertyBinding: Can not bind to material.map as node.material does not have a map.`, this);
              return;
            }
            node = node.material.map;
            break;
          default:
            if (node[objectName] === undefined) {
              W(`PropertyBinding: Can not bind to objectName of node undefined.`, this);
              return;
            }
            node = node[objectName];
        }
        if (objectIndex !== undefined) {
          if (node[objectIndex] === undefined) {
            W(`PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.`, this, node);
            return;
          }
          node = node[objectIndex];
        }
      }
      let o = node[propertyName];
      if (o === undefined) {
        let nodeName = parsedPath.nodeName;
        W(`PropertyBinding: Trying to update property for track: ` + nodeName + `.` + propertyName + ` but it wasn't found.`, node);
        return;
      }
      let none = this.Versioning.None;
      this.targetObject = node, node.isMaterial === true ? none = this.Versioning.NeedsUpdate : node.isObject3D === true && (none = this.Versioning.MatrixWorldNeedsUpdate);
      let direct = this.BindingType.Direct;
      if (propertyIndex !== undefined) {
        if (propertyName === `morphTargetInfluences`) {
          if (!node.geometry) {
            W(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.`, this);
            return;
          }
          if (!node.geometry.morphAttributes) {
            W(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.`, this);
            return;
          }
          node.morphTargetDictionary[propertyIndex] !== undefined && (propertyIndex = node.morphTargetDictionary[propertyIndex]);
        }
        direct = this.BindingType.ArrayElement, this.resolvedProperty = o, this.propertyIndex = propertyIndex;
      } else o.fromArray !== undefined && o.toArray !== undefined ? (direct = this.BindingType.HasFromToArray, this.resolvedProperty = o) : Array.isArray(o) ? (direct = this.BindingType.EntireArray, this.resolvedProperty = o) : this.propertyName = propertyName;
      this.getValue = this.GetterByBindingType[direct], this.setValue = this.SetterByBindingTypeAndVersioning[direct][none];
    }
    unbind() {
      this.node = null, this.getValue = this._getValue_unbound, this.setValue = this._setValue_unbound;
    }
  };
ka.Composite = Oa, ka.prototype.BindingType = {
  Direct: 0,
  EntireArray: 1,
  ArrayElement: 2,
  HasFromToArray: 3
}, ka.prototype.Versioning = {
  None: 0,
  NeedsUpdate: 1,
  MatrixWorldNeedsUpdate: 2
}, ka.prototype.GetterByBindingType = [ka.prototype._getValue_direct, ka.prototype._getValue_array, ka.prototype._getValue_arrayElement, ka.prototype._getValue_toArray], ka.prototype.SetterByBindingTypeAndVersioning = [[ka.prototype._setValue_direct, ka.prototype._setValue_direct_setNeedsUpdate, ka.prototype._setValue_direct_setMatrixWorldNeedsUpdate], [ka.prototype._setValue_array, ka.prototype._setValue_array_setNeedsUpdate, ka.prototype._setValue_array_setMatrixWorldNeedsUpdate], [ka.prototype._setValue_arrayElement, ka.prototype._setValue_arrayElement_setNeedsUpdate, ka.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate], [ka.prototype._setValue_fromArray, ka.prototype._setValue_fromArray_setNeedsUpdate, ka.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];
var Aa = new Jt(),
  ja = class {
    constructor(constructor, constructorValue, n = 0, r = 1 / 0) {
      this.ray = new Ir(constructor, constructorValue), this.near = n, this.far = r, this.camera = null, this.layers = new on(), this.params = {
        Mesh: {},
        Line: {
          threshold: 1
        },
        LOD: {},
        Points: {
          threshold: 1
        },
        Sprite: {}
      };
    }
    set(e, t) {
      this.ray.set(e, t);
    }
    setFromCamera(from, camera) {
      camera.isPerspectiveCamera ? (this.ray.origin.setFromMatrixPosition(camera.matrixWorld), this.ray.direction.set(from.x, from.y, .5).unproject(camera).sub(this.ray.origin).normalize(), this.camera = camera) : camera.isOrthographicCamera ? (this.ray.origin.set(from.x, from.y, camera.projectionMatrix.elements[14]).unproject(camera), this.ray.direction.set(0, 0, -1).transformDirection(camera.matrixWorld), this.camera = camera) : W(`Raycaster: Unsupported camera type: ` + camera.type);
    }
    setFromXRController(from) {
      return Aa.identity().extractRotation(from.matrixWorld), this.ray.origin.setFromMatrixPosition(from.matrixWorld), this.ray.direction.set(0, 0, -1).applyMatrix4(Aa), this;
    }
    intersectObject(intersect, t = true, n = []) {
      return Na(intersect, this, n, t), n.sort(Ma), n;
    }
    intersectObjects(count, t = true, n = []) {
      for (let r = 0, i = count.length; r < i; r++) Na(count[r], this, n, t);
      return n.sort(Ma), n;
    }
  };
function Ma(e, t) {
  return e.distance - t.distance;
}
function Na(e, t, n, count) {
  let i = true;
  if (e.layers.test(t.layers) && e.raycast(t, n) === false && (i = false), i === true && count === true) {
    let r = e.children;
    for (let e = 0, i = r.length; e < i; e++) Na(r[e], t, n, true);
  }
}
var Pa = class {
  constructor(e = 1, t = 0, n = 0) {
    this.radius = e, this.phi = t, this.theta = n;
  }
  set(e, t, n) {
    return this.radius = e, this.phi = t, this.theta = n, this;
  }
  copy(e) {
    return this.radius = e.radius, this.phi = e.phi, this.theta = e.theta, this;
  }
  makeSafe() {
    let e = 1e-6;
    return this.phi = G(this.phi, e, Math.PI - e), this;
  }
  setFromVector3(from) {
    return this.setFromCartesianCoords(from.x, from.y, from.z);
  }
  setFromCartesianCoords(from, cartesian, coords) {
    return this.radius = Math.sqrt(from * from + cartesian * cartesian + coords * coords), this.radius === 0 ? (this.theta = 0, this.phi = 0) : (this.theta = Math.atan2(from, coords), this.phi = Math.acos(G(cartesian / this.radius, -1, 1))), this;
  }
  clone() {
    return new this.constructor().copy(this);
  }
};
(class e {
  static {
    e.prototype.isMatrix2 = true;
  }
  constructor(constructor, constructorValue, constructorInput, r) {
    this.elements = [1, 0, 0, 1], constructor !== undefined && this.set(constructor, constructorValue, constructorInput, r);
  }
  identity() {
    return this.set(1, 0, 0, 1), this;
  }
  fromArray(array, t = 0) {
    for (let n = 0; n < 4; n++) this.elements[n] = array[n + t];
    return this;
  }
  set(e, t, n, r) {
    let elements = this.elements;
    return elements[0] = e, elements[2] = t, elements[1] = n, elements[3] = r, this;
  }
});
var Fa = class extends $e {
  constructor(constructor, t = null) {
    super(), this.object = constructor, this.domElement = t, this.enabled = true, this.state = -1, this.keys = {}, this.mouseButtons = {
      LEFT: null,
      MIDDLE: null,
      RIGHT: null
    }, this.touches = {
      ONE: null,
      TWO: null
    };
  }
  connect(connect) {
    this.domElement !== null && this.disconnect(), this.domElement = connect;
  }
  disconnect() {}
  dispose() {}
  update() {}
};
function Ia(e, t, n, r) {
  let i = La(r);
  switch (n) {
    case w:
      return e * t;
    case k:
      return e * t / i.components * i.byteLength;
    case A:
      return e * t / i.components * i.byteLength;
    case j:
      return e * t * 2 / i.components * i.byteLength;
    case ee:
      return e * t * 2 / i.components * i.byteLength;
    case T:
      return e * t * 3 / i.components * i.byteLength;
    case E:
      return e * t * 4 / i.components * i.byteLength;
    case te:
      return e * t * 4 / i.components * i.byteLength;
    case M:
    case N:
      return Math.floor((e + 3) / 4) * Math.floor((t + 3) / 4) * 8;
    case P:
    case ne:
      return Math.floor((e + 3) / 4) * Math.floor((t + 3) / 4) * 16;
    case re:
    case ae:
      return Math.max(e, 16) * Math.max(t, 8) / 4;
    case F:
    case ie:
      return Math.max(e, 8) * Math.max(t, 8) / 2;
    case oe:
    case se:
    case L:
    case ce:
      return Math.floor((e + 3) / 4) * Math.floor((t + 3) / 4) * 8;
    case I:
    case le:
    case ue:
      return Math.floor((e + 3) / 4) * Math.floor((t + 3) / 4) * 16;
    case de:
      return Math.floor((e + 3) / 4) * Math.floor((t + 3) / 4) * 16;
    case fe:
      return Math.floor((e + 4) / 5) * Math.floor((t + 3) / 4) * 16;
    case pe:
      return Math.floor((e + 4) / 5) * Math.floor((t + 4) / 5) * 16;
    case me:
      return Math.floor((e + 5) / 6) * Math.floor((t + 4) / 5) * 16;
    case he:
      return Math.floor((e + 5) / 6) * Math.floor((t + 5) / 6) * 16;
    case ge:
      return Math.floor((e + 7) / 8) * Math.floor((t + 4) / 5) * 16;
    case _e:
      return Math.floor((e + 7) / 8) * Math.floor((t + 5) / 6) * 16;
    case ve:
      return Math.floor((e + 7) / 8) * Math.floor((t + 7) / 8) * 16;
    case ye:
      return Math.floor((e + 9) / 10) * Math.floor((t + 4) / 5) * 16;
    case be:
      return Math.floor((e + 9) / 10) * Math.floor((t + 5) / 6) * 16;
    case xe:
      return Math.floor((e + 9) / 10) * Math.floor((t + 7) / 8) * 16;
    case Se:
      return Math.floor((e + 9) / 10) * Math.floor((t + 9) / 10) * 16;
    case Ce:
      return Math.floor((e + 11) / 12) * Math.floor((t + 9) / 10) * 16;
    case we:
      return Math.floor((e + 11) / 12) * Math.floor((t + 11) / 12) * 16;
    case Te:
    case Ee:
    case De:
      return Math.ceil(e / 4) * Math.ceil(t / 4) * 16;
    case Oe:
    case ke:
      return Math.ceil(e / 4) * Math.ceil(t / 4) * 8;
    case Ae:
    case R:
      return Math.ceil(e / 4) * Math.ceil(t / 4) * 16;
  }
  throw Error(`Unable to determine texture byte length for ${n} format.`);
}
function La(e) {
  switch (e) {
    case d:
    case f:
      return {
        byteLength: 1,
        components: 1
      };
    case m:
    case p:
    case v:
      return {
        byteLength: 2,
        components: 1
      };
    case y:
    case b:
      return {
        byteLength: 2,
        components: 4
      };
    case g:
    case h:
    case _:
      return {
        byteLength: 4,
        components: 1
      };
    case S:
    case C:
      return {
        byteLength: 4,
        components: 3
      };
  }
  throw Error(`THREE.TextureUtils: Unknown texture type ${e}.`);
}
typeof __THREE_DEVTOOLS__ < `u` && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`register`, {
  detail: {
    revision: `186`
  }
})), typeof window < `u` && (window.__THREE__ ? U(`WARNING: Multiple instances of Three.js being imported.`) : window.__THREE__ = `186`);
function Ra() {
  let ratio = null,
    t = false,
    count = null,
    r = null;
  function i(t, a) {
    r = ratio.requestAnimationFrame(i), count(t, a);
  }
  return {
    start: function () {
      t !== true && count !== null && ratio !== null && (r = ratio.requestAnimationFrame(i), t = true);
    },
    stop: function () {
      ratio !== null && ratio.cancelAnimationFrame(r), t = false;
    },
    setAnimationLoop: function (e) {
      count = e;
    },
    setContext: function (t) {
      ratio = t;
    }
  };
}
function za(e) {
  let weakMap = new WeakMap();
  function n(t, n) {
    let array = t.array,
      usage = t.usage,
      byteLength = array.byteLength,
      buffer = e.createBuffer();
    e.bindBuffer(n, buffer), e.bufferData(n, array, usage), t.onUploadCallback();
    let total;
    if (array instanceof Float32Array) total = e.FLOAT;else if (typeof Float16Array < `u` && array instanceof Float16Array) total = e.HALF_FLOAT;else if (array instanceof Uint16Array) total = t.isFloat16BufferAttribute ? e.HALF_FLOAT : e.UNSIGNED_SHORT;else if (array instanceof Int16Array) total = e.SHORT;else if (array instanceof Uint32Array) total = e.UNSIGNED_INT;else if (array instanceof Int32Array) total = e.INT;else if (array instanceof Int8Array) total = e.BYTE;else if (array instanceof Uint8Array) total = e.UNSIGNED_BYTE;else if (array instanceof Uint8ClampedArray) total = e.UNSIGNED_BYTE;else throw Error(`THREE.WebGLAttributes: Unsupported buffer data format: ` + array);
    return {
      buffer: buffer,
      type: total,
      bytesPerElement: array.BYTES_PER_ELEMENT,
      version: t.version,
      size: byteLength
    };
  }
  function r(t, n, r) {
    let array = n.array,
      updateRanges = n.updateRanges;
    if (e.bindBuffer(r, t), updateRanges.length === 0) e.bufferSubData(r, 0, array);else {
      updateRanges.sort((left, right) => left.start - right.start);
      let t = 0;
      for (let e = 1; e < updateRanges.length; e++) {
        let n = updateRanges[t],
          r = updateRanges[e];
        r.start <= n.start + n.count + 1 ? n.count = Math.max(n.count, r.start + r.count - n.start) : (++t, updateRanges[t] = r);
      }
      updateRanges.length = t + 1;
      for (let t = 0, n = updateRanges.length; t < n; t++) {
        let n = updateRanges[t];
        e.bufferSubData(r, n.start * array.BYTES_PER_ELEMENT, array, n.start, n.count);
      }
      n.clearUpdateRanges();
    }
    n.onUploadCallback();
  }
  function i(e) {
    return e.isInterleavedBufferAttribute && (e = e.data), weakMap.get(e);
  }
  function a(n) {
    n.isInterleavedBufferAttribute && (n = n.data);
    let r = weakMap.get(n);
    r && (e.deleteBuffer(r.buffer), weakMap.delete(n));
  }
  function o(e, i) {
    if (e.isInterleavedBufferAttribute && (e = e.data), e.isGLBufferAttribute) {
      let n = weakMap.get(e);
      (!n || n.version < e.version) && weakMap.set(e, {
        buffer: e.buffer,
        type: e.type,
        bytesPerElement: e.elementSize,
        version: e.version
      });
      return;
    }
    let a = weakMap.get(e);
    if (a === undefined) weakMap.set(e, n(e, i));else if (a.version < e.version) {
      if (a.size !== e.array.byteLength) throw Error(`THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.`);
      r(a.buffer, e, i), a.version = e.version;
    }
  }
  return {
    get: i,
    remove: a,
    update: o
  };
}
var Z = {
    alphahash_fragment: `#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,
    alphahash_pars_fragment: `#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,
    alphamap_fragment: `#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,
    alphamap_pars_fragment: `#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,
    alphatest_fragment: `#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,
    alphatest_pars_fragment: `#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,
    aomap_fragment: `#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,
    aomap_pars_fragment: `#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,
    batching_pars_vertex: `#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,
    batching_vertex: `#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,
    begin_vertex: `vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,
    beginnormal_vertex: `vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,
    bsdfs: `float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,
    iridescence_fragment: `#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,
    bumpmap_pars_fragment: `#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,
    clipping_planes_fragment: `#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,
    clipping_planes_pars_fragment: `#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,
    clipping_planes_pars_vertex: `#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,
    clipping_planes_vertex: `#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,
    color_fragment: `#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,
    color_pars_fragment: `#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,
    color_pars_vertex: `#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,
    color_vertex: `#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,
    common: `#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,
    cube_uv_reflection_fragment: `#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,
    defaultnormal_vertex: `vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,
    displacementmap_pars_vertex: `#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,
    displacementmap_vertex: `#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,
    emissivemap_fragment: `#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,
    emissivemap_pars_fragment: `#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,
    colorspace_fragment: `gl_FragColor = linearToOutputTexel( gl_FragColor );`,
    colorspace_pars_fragment: `vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,
    envmap_fragment: `#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,
    envmap_common_pars_fragment: `#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,
    envmap_pars_fragment: `#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,
    envmap_pars_vertex: `#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,
    envmap_physical_pars_fragment: `#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_CUBE_UV
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,
    envmap_vertex: `#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,
    fog_vertex: `#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,
    fog_pars_vertex: `#ifdef USE_FOG
	varying float vFogDepth;
#endif`,
    fog_fragment: `#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,
    fog_pars_fragment: `#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,
    gradientmap_pars_fragment: `#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,
    lightmap_pars_fragment: `#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,
    lights_lambert_fragment: `LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,
    lights_lambert_pars_fragment: `varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,
    lights_pars_begin: `uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,
    lights_toon_fragment: `ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,
    lights_toon_pars_fragment: `varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,
    lights_phong_fragment: `BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,
    lights_phong_pars_fragment: `varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,
    lights_physical_fragment: `PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,
    lights_physical_pars_fragment: `uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,
    lights_fragment_begin: `
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,
    lights_fragment_maps: `#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,
    lights_fragment_end: `#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,
    lightprobes_pars_fragment: `#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,
    logdepthbuf_fragment: `#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,
    logdepthbuf_pars_fragment: `#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,
    logdepthbuf_pars_vertex: `#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,
    logdepthbuf_vertex: `#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,
    map_fragment: `#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,
    map_pars_fragment: `#ifdef USE_MAP
	uniform sampler2D map;
#endif`,
    map_particle_fragment: `#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,
    map_particle_pars_fragment: `#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,
    metalnessmap_fragment: `float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,
    metalnessmap_pars_fragment: `#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,
    morphinstance_vertex: `#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,
    morphcolor_vertex: `#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,
    morphnormal_vertex: `#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,
    morphtarget_pars_vertex: `#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,
    morphtarget_vertex: `#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,
    normal_fragment_begin: `float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,
    normal_fragment_maps: `#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,
    normal_pars_fragment: `#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,
    normal_pars_vertex: `#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,
    normal_vertex: `#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,
    normalmap_pars_fragment: `#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,
    clearcoat_normal_fragment_begin: `#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,
    clearcoat_normal_fragment_maps: `#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,
    clearcoat_pars_fragment: `#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,
    iridescence_pars_fragment: `#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,
    opaque_fragment: `#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,
    packing: `vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,
    premultiplied_alpha_fragment: `#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,
    project_vertex: `vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,
    dithering_fragment: `#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,
    dithering_pars_fragment: `#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,
    roughnessmap_fragment: `float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,
    roughnessmap_pars_fragment: `#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,
    shadowmap_pars_fragment: `#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,
    shadowmap_pars_vertex: `#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,
    shadowmap_vertex: `#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,
    shadowmask_pars_fragment: `float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,
    skinbase_vertex: `#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,
    skinning_pars_vertex: `#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,
    skinning_vertex: `#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,
    skinnormal_vertex: `#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,
    specularmap_fragment: `float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,
    specularmap_pars_fragment: `#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,
    tonemapping_fragment: `#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,
    tonemapping_pars_fragment: `#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,
    transmission_fragment: `#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,
    transmission_pars_fragment: `#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,
    uv_pars_fragment: `#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,
    uv_pars_vertex: `#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,
    uv_vertex: `#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,
    worldpos_vertex: `#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,
    background_vert: `varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,
    background_frag: `uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,
    backgroundCube_vert: `varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,
    backgroundCube_frag: `#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,
    cube_vert: `varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,
    cube_frag: `uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,
    depth_vert: `#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,
    depth_frag: `#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,
    distance_vert: `#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,
    distance_frag: `#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,
    equirect_vert: `varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,
    equirect_frag: `uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,
    linedashed_vert: `uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,
    linedashed_frag: `uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,
    meshbasic_vert: `#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,
    meshbasic_frag: `uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,
    meshlambert_vert: `#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,
    meshlambert_frag: `#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,
    meshmatcap_vert: `#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,
    meshmatcap_frag: `#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,
    meshnormal_vert: `#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,
    meshnormal_frag: `#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,
    meshphong_vert: `#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,
    meshphong_frag: `#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,
    meshphysical_vert: `#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,
    meshphysical_frag: `#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,
    meshtoon_vert: `#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,
    meshtoon_frag: `#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,
    points_vert: `uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,
    points_frag: `uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,
    shadow_vert: `#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,
    shadow_frag: `uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,
    sprite_vert: `uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,
    sprite_frag: `uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`
  },
  Q = {
    common: {
      diffuse: {
        value: new X(16777215)
      },
      opacity: {
        value: 1
      },
      map: {
        value: null
      },
      mapTransform: {
        value: new J()
      },
      alphaMap: {
        value: null
      },
      alphaMapTransform: {
        value: new J()
      },
      alphaTest: {
        value: 0
      }
    },
    specularmap: {
      specularMap: {
        value: null
      },
      specularMapTransform: {
        value: new J()
      }
    },
    envmap: {
      envMap: {
        value: null
      },
      envMapRotation: {
        value: new J()
      },
      reflectivity: {
        value: 1
      },
      ior: {
        value: 1.5
      },
      refractionRatio: {
        value: .98
      },
      dfgLUT: {
        value: null
      }
    },
    aomap: {
      aoMap: {
        value: null
      },
      aoMapIntensity: {
        value: 1
      },
      aoMapTransform: {
        value: new J()
      }
    },
    lightmap: {
      lightMap: {
        value: null
      },
      lightMapIntensity: {
        value: 1
      },
      lightMapTransform: {
        value: new J()
      }
    },
    bumpmap: {
      bumpMap: {
        value: null
      },
      bumpMapTransform: {
        value: new J()
      },
      bumpScale: {
        value: 1
      }
    },
    normalmap: {
      normalMap: {
        value: null
      },
      normalMapTransform: {
        value: new J()
      },
      normalScale: {
        value: new K(1, 1)
      }
    },
    displacementmap: {
      displacementMap: {
        value: null
      },
      displacementMapTransform: {
        value: new J()
      },
      displacementScale: {
        value: 1
      },
      displacementBias: {
        value: 0
      }
    },
    emissivemap: {
      emissiveMap: {
        value: null
      },
      emissiveMapTransform: {
        value: new J()
      }
    },
    metalnessmap: {
      metalnessMap: {
        value: null
      },
      metalnessMapTransform: {
        value: new J()
      }
    },
    roughnessmap: {
      roughnessMap: {
        value: null
      },
      roughnessMapTransform: {
        value: new J()
      }
    },
    gradientmap: {
      gradientMap: {
        value: null
      }
    },
    fog: {
      fogDensity: {
        value: 25e-5
      },
      fogNear: {
        value: 1
      },
      fogFar: {
        value: 2e3
      },
      fogColor: {
        value: new X(16777215)
      }
    },
    lights: {
      ambientLightColor: {
        value: []
      },
      lightProbe: {
        value: []
      },
      sunLights: {
        value: [],
        properties: {
          direction: {},
          color: {}
        }
      },
      sunLightShadows: {
        value: [],
        properties: {
          shadowIntensity: 1,
          shadowBias: {},
          shadowNormalBias: {},
          shadowRadius: {},
          shadowMapSize: {}
        }
      },
      sunShadowMatrix: {
        value: []
      },
      sunShadowCascade: {
        value: []
      },
      directionalLights: {
        value: [],
        properties: {
          direction: {},
          color: {}
        }
      },
      directionalLightShadows: {
        value: [],
        properties: {
          shadowIntensity: 1,
          shadowBias: {},
          shadowNormalBias: {},
          shadowRadius: {},
          shadowMapSize: {}
        }
      },
      directionalShadowMatrix: {
        value: []
      },
      spotLights: {
        value: [],
        properties: {
          color: {},
          position: {},
          direction: {},
          distance: {},
          coneCos: {},
          penumbraCos: {},
          decay: {}
        }
      },
      spotLightShadows: {
        value: [],
        properties: {
          shadowIntensity: 1,
          shadowBias: {},
          shadowNormalBias: {},
          shadowRadius: {},
          shadowMapSize: {}
        }
      },
      spotLightMap: {
        value: []
      },
      spotLightMatrix: {
        value: []
      },
      pointLights: {
        value: [],
        properties: {
          color: {},
          position: {},
          decay: {},
          distance: {}
        }
      },
      pointLightShadows: {
        value: [],
        properties: {
          shadowIntensity: 1,
          shadowBias: {},
          shadowNormalBias: {},
          shadowRadius: {},
          shadowMapSize: {},
          shadowCameraNear: {},
          shadowCameraFar: {}
        }
      },
      pointShadowMatrix: {
        value: []
      },
      hemisphereLights: {
        value: [],
        properties: {
          direction: {},
          skyColor: {},
          groundColor: {}
        }
      },
      rectAreaLights: {
        value: [],
        properties: {
          color: {},
          position: {},
          width: {},
          height: {}
        }
      },
      ltc_1: {
        value: null
      },
      ltc_2: {
        value: null
      },
      probesSH: {
        value: null
      },
      probesMin: {
        value: new q()
      },
      probesMax: {
        value: new q()
      },
      probesResolution: {
        value: new q()
      }
    },
    points: {
      diffuse: {
        value: new X(16777215)
      },
      opacity: {
        value: 1
      },
      size: {
        value: 1
      },
      scale: {
        value: 1
      },
      map: {
        value: null
      },
      alphaMap: {
        value: null
      },
      alphaMapTransform: {
        value: new J()
      },
      alphaTest: {
        value: 0
      },
      uvTransform: {
        value: new J()
      }
    },
    sprite: {
      diffuse: {
        value: new X(16777215)
      },
      opacity: {
        value: 1
      },
      center: {
        value: new K(.5, .5)
      },
      rotation: {
        value: 0
      },
      map: {
        value: null
      },
      mapTransform: {
        value: new J()
      },
      alphaMap: {
        value: null
      },
      alphaMapTransform: {
        value: new J()
      },
      alphaTest: {
        value: 0
      }
    }
  },
  Ba = {
    basic: {
      uniforms: bi([Q.common, Q.specularmap, Q.envmap, Q.aomap, Q.lightmap, Q.fog]),
      vertexShader: Z.meshbasic_vert,
      fragmentShader: Z.meshbasic_frag
    },
    lambert: {
      uniforms: bi([Q.common, Q.specularmap, Q.envmap, Q.aomap, Q.lightmap, Q.emissivemap, Q.bumpmap, Q.normalmap, Q.displacementmap, Q.fog, Q.lights, {
        emissive: {
          value: new X(0)
        },
        envMapIntensity: {
          value: 1
        }
      }]),
      vertexShader: Z.meshlambert_vert,
      fragmentShader: Z.meshlambert_frag
    },
    phong: {
      uniforms: bi([Q.common, Q.specularmap, Q.envmap, Q.aomap, Q.lightmap, Q.emissivemap, Q.bumpmap, Q.normalmap, Q.displacementmap, Q.fog, Q.lights, {
        emissive: {
          value: new X(0)
        },
        specular: {
          value: new X(1118481)
        },
        shininess: {
          value: 30
        },
        envMapIntensity: {
          value: 1
        }
      }]),
      vertexShader: Z.meshphong_vert,
      fragmentShader: Z.meshphong_frag
    },
    standard: {
      uniforms: bi([Q.common, Q.envmap, Q.aomap, Q.lightmap, Q.emissivemap, Q.bumpmap, Q.normalmap, Q.displacementmap, Q.roughnessmap, Q.metalnessmap, Q.fog, Q.lights, {
        emissive: {
          value: new X(0)
        },
        roughness: {
          value: 1
        },
        metalness: {
          value: 0
        },
        envMapIntensity: {
          value: 1
        }
      }]),
      vertexShader: Z.meshphysical_vert,
      fragmentShader: Z.meshphysical_frag
    },
    toon: {
      uniforms: bi([Q.common, Q.aomap, Q.lightmap, Q.emissivemap, Q.bumpmap, Q.normalmap, Q.displacementmap, Q.gradientmap, Q.fog, Q.lights, {
        emissive: {
          value: new X(0)
        }
      }]),
      vertexShader: Z.meshtoon_vert,
      fragmentShader: Z.meshtoon_frag
    },
    matcap: {
      uniforms: bi([Q.common, Q.bumpmap, Q.normalmap, Q.displacementmap, Q.fog, {
        matcap: {
          value: null
        }
      }]),
      vertexShader: Z.meshmatcap_vert,
      fragmentShader: Z.meshmatcap_frag
    },
    points: {
      uniforms: bi([Q.points, Q.fog]),
      vertexShader: Z.points_vert,
      fragmentShader: Z.points_frag
    },
    dashed: {
      uniforms: bi([Q.common, Q.fog, {
        scale: {
          value: 1
        },
        dashSize: {
          value: 1
        },
        totalSize: {
          value: 2
        }
      }]),
      vertexShader: Z.linedashed_vert,
      fragmentShader: Z.linedashed_frag
    },
    depth: {
      uniforms: bi([Q.common, Q.displacementmap]),
      vertexShader: Z.depth_vert,
      fragmentShader: Z.depth_frag
    },
    normal: {
      uniforms: bi([Q.common, Q.bumpmap, Q.normalmap, Q.displacementmap, {
        opacity: {
          value: 1
        }
      }]),
      vertexShader: Z.meshnormal_vert,
      fragmentShader: Z.meshnormal_frag
    },
    sprite: {
      uniforms: bi([Q.sprite, Q.fog]),
      vertexShader: Z.sprite_vert,
      fragmentShader: Z.sprite_frag
    },
    background: {
      uniforms: {
        uvTransform: {
          value: new J()
        },
        t2D: {
          value: null
        },
        backgroundIntensity: {
          value: 1
        }
      },
      vertexShader: Z.background_vert,
      fragmentShader: Z.background_frag
    },
    backgroundCube: {
      uniforms: {
        envMap: {
          value: null
        },
        backgroundBlurriness: {
          value: 0
        },
        backgroundIntensity: {
          value: 1
        },
        backgroundRotation: {
          value: new J()
        }
      },
      vertexShader: Z.backgroundCube_vert,
      fragmentShader: Z.backgroundCube_frag
    },
    cube: {
      uniforms: {
        tCube: {
          value: null
        },
        tFlip: {
          value: -1
        },
        opacity: {
          value: 1
        }
      },
      vertexShader: Z.cube_vert,
      fragmentShader: Z.cube_frag
    },
    equirect: {
      uniforms: {
        tEquirect: {
          value: null
        }
      },
      vertexShader: Z.equirect_vert,
      fragmentShader: Z.equirect_frag
    },
    distance: {
      uniforms: bi([Q.common, Q.displacementmap, {
        referencePosition: {
          value: new q()
        },
        nearDistance: {
          value: 1
        },
        farDistance: {
          value: 1e3
        }
      }]),
      vertexShader: Z.distance_vert,
      fragmentShader: Z.distance_frag
    },
    shadow: {
      uniforms: bi([Q.lights, Q.fog, {
        color: {
          value: new X(0)
        },
        opacity: {
          value: 1
        }
      }]),
      vertexShader: Z.shadow_vert,
      fragmentShader: Z.shadow_frag
    }
  };
Ba.physical = {
  uniforms: bi([Ba.standard.uniforms, {
    clearcoat: {
      value: 0
    },
    clearcoatMap: {
      value: null
    },
    clearcoatMapTransform: {
      value: new J()
    },
    clearcoatNormalMap: {
      value: null
    },
    clearcoatNormalMapTransform: {
      value: new J()
    },
    clearcoatNormalScale: {
      value: new K(1, 1)
    },
    clearcoatRoughness: {
      value: 0
    },
    clearcoatRoughnessMap: {
      value: null
    },
    clearcoatRoughnessMapTransform: {
      value: new J()
    },
    dispersion: {
      value: 0
    },
    retroreflectivity: {
      value: 0
    },
    iridescence: {
      value: 0
    },
    iridescenceMap: {
      value: null
    },
    iridescenceMapTransform: {
      value: new J()
    },
    iridescenceIOR: {
      value: 1.3
    },
    iridescenceThicknessMinimum: {
      value: 100
    },
    iridescenceThicknessMaximum: {
      value: 400
    },
    iridescenceThicknessMap: {
      value: null
    },
    iridescenceThicknessMapTransform: {
      value: new J()
    },
    sheen: {
      value: 0
    },
    sheenColor: {
      value: new X(0)
    },
    sheenColorMap: {
      value: null
    },
    sheenColorMapTransform: {
      value: new J()
    },
    sheenRoughness: {
      value: 1
    },
    sheenRoughnessMap: {
      value: null
    },
    sheenRoughnessMapTransform: {
      value: new J()
    },
    transmission: {
      value: 0
    },
    transmissionMap: {
      value: null
    },
    transmissionMapTransform: {
      value: new J()
    },
    transmissionSamplerSize: {
      value: new K()
    },
    transmissionSamplerMap: {
      value: null
    },
    thickness: {
      value: 0
    },
    thicknessMap: {
      value: null
    },
    thicknessMapTransform: {
      value: new J()
    },
    attenuationDistance: {
      value: 0
    },
    attenuationColor: {
      value: new X(0)
    },
    specularColor: {
      value: new X(1, 1, 1)
    },
    specularColorMap: {
      value: null
    },
    specularColorMapTransform: {
      value: new J()
    },
    specularIntensity: {
      value: 1
    },
    specularIntensityMap: {
      value: null
    },
    specularIntensityMapTransform: {
      value: new J()
    },
    anisotropyVector: {
      value: new K()
    },
    anisotropyMap: {
      value: null
    },
    anisotropyMapTransform: {
      value: new J()
    }
  }]),
  vertexShader: Z.meshphysical_vert,
  fragmentShader: Z.meshphysical_frag
};
var Va = {
    r: 0,
    b: 0,
    g: 0
  },
  Ha = new Jt(),
  Ua = new J();
Ua.set(-1, 0, 0, 0, 1, 0, 0, 0, 1);
function Wa(e, t, n, r, i, a) {
  let o = new X(0),
    s = i === true ? 0 : 1,
    total,
    l,
    u = null,
    d = 0,
    f = null;
  function p(e) {
    let n = e.isScene === true ? e.background : null;
    if (n && n.isTexture) {
      let r = e.backgroundBlurriness > 0;
      n = t.get(n, r);
    }
    return n;
  }
  function m(t) {
    let r = false,
      i = p(t);
    i === null ? g(o, s) : i && i.isColor && (g(i, 1), r = true);
    let environmentBlendMode = e.xr.getEnvironmentBlendMode();
    environmentBlendMode === `additive` ? n.buffers.color.setClear(0, 0, 0, 1, a) : environmentBlendMode === `alpha-blend` && n.buffers.color.setClear(0, 0, 0, 0, a), (e.autoClear || r) && (n.buffers.depth.setTest(true), n.buffers.depth.setMask(true), n.buffers.color.setMask(true), e.clear(e.autoClearColor, e.autoClearDepth, e.autoClearStencil));
  }
  function h(t, n) {
    let i = p(n);
    i && (i.isCubeTexture || i.mapping === 306) ? (l === undefined && (l = new Yr(new gi(1, 1, 1), new Di({
      name: `BackgroundCubeMaterial`,
      uniforms: yi(Ba.backgroundCube.uniforms),
      vertexShader: Ba.backgroundCube.vertexShader,
      fragmentShader: Ba.backgroundCube.fragmentShader,
      side: 1,
      depthTest: false,
      depthWrite: false,
      fog: false,
      allowOverride: false
    })), l.geometry.deleteAttribute(`normal`), l.geometry.deleteAttribute(`uv`), l.onBeforeRender = function (e, t, n) {
      this.matrixWorld.copyPosition(n.matrixWorld);
    }, Object.defineProperty(l.material, "envMap", {
      get: function () {
        return this.uniforms.envMap.value;
      }
    }), r.update(l)), l.material.uniforms.envMap.value = i, l.material.uniforms.backgroundBlurriness.value = n.backgroundBlurriness, l.material.uniforms.backgroundIntensity.value = n.backgroundIntensity, l.material.uniforms.backgroundRotation.value.setFromMatrix4(Ha.makeRotationFromEuler(n.backgroundRotation)).transpose(), i.isCubeTexture && i.isRenderTargetTexture === false && l.material.uniforms.backgroundRotation.value.premultiply(Ua), l.material.toneMapped = Y.getTransfer(i.colorSpace) !== Re, (u !== i || d !== i.version || f !== e.toneMapping) && (l.material.needsUpdate = true, u = i, d = i.version, f = e.toneMapping), l.layers.enableAll(), t.unshift(l, l.geometry, l.material, 0, 0, null)) : i && i.isTexture && (total === undefined && (total = new Yr(new vi(2, 2), new Di({
      name: `BackgroundMaterial`,
      uniforms: yi(Ba.background.uniforms),
      vertexShader: Ba.background.vertexShader,
      fragmentShader: Ba.background.fragmentShader,
      side: 0,
      depthTest: false,
      depthWrite: false,
      fog: false,
      allowOverride: false
    })), total.geometry.deleteAttribute(`normal`), Object.defineProperty(total.material, "map", {
      get: function () {
        return this.uniforms.t2D.value;
      }
    }), r.update(total)), total.material.uniforms.t2D.value = i, total.material.uniforms.backgroundIntensity.value = n.backgroundIntensity, total.material.toneMapped = Y.getTransfer(i.colorSpace) !== Re, i.matrixAutoUpdate === true && i.updateMatrix(), total.material.uniforms.uvTransform.value.copy(i.matrix), (u !== i || d !== i.version || f !== e.toneMapping) && (total.material.needsUpdate = true, u = i, d = i.version, f = e.toneMapping), total.layers.enableAll(), t.unshift(total, total.geometry, total.material, 0, 0, null));
  }
  function g(t, r) {
    t.getRGB(Va, Ci(e)), n.buffers.color.setClear(Va.r, Va.g, Va.b, r, a);
  }
  function _() {
    l !== undefined && (l.geometry.dispose(), l.material.dispose(), l = undefined), total !== undefined && (total.geometry.dispose(), total.material.dispose(), total = undefined);
  }
  return {
    getClearColor: function () {
      return o;
    },
    setClearColor: function (e, t = 1) {
      o.set(e), s = t, g(o, s);
    },
    getClearAlpha: function () {
      return s;
    },
    setClearAlpha: function (e) {
      s = e, g(o, s);
    },
    render: m,
    addToRenderList: h,
    dispose: _
  };
}
function Ga(count, t) {
  let parameter = count.getParameter(count.MAX_VERTEX_ATTRIBS),
    r = {},
    i = f(null),
    a = i,
    o = false;
  function s(n, r, i, s, c) {
    let u = false,
      f = d(n, s, i, r);
    a !== f && (a = f, l(a.object)), u = p(n, s, i, c), u && m(n, s, i, c), c !== null && t.update(c, count.ELEMENT_ARRAY_BUFFER), (u || o) && (o = false, b(n, r, i, s), c !== null && count.bindBuffer(count.ELEMENT_ARRAY_BUFFER, t.get(c).buffer));
  }
  function c() {
    return count.createVertexArray();
  }
  function l(t) {
    return count.bindVertexArray(t);
  }
  function u(t) {
    return count.deleteVertexArray(t);
  }
  function d(e, t, n, i) {
    let a = i.wireframe === true,
      o = r[t.id];
    o === undefined && (o = {}, r[t.id] = o);
    let s = e.isInstancedMesh === true ? e.id : 0,
      l = o[s];
    l === undefined && (l = {}, o[s] = l);
    let u = l[n.id];
    u === undefined && (u = {}, l[n.id] = u);
    let d = u[a];
    return d === undefined && (d = f(c()), u[a] = d), d;
  }
  function f(e) {
    let total = [],
      r = [],
      i = [];
    for (let e = 0; e < parameter; e++) total[e] = 0, r[e] = 0, i[e] = 0;
    return {
      geometry: null,
      program: null,
      wireframe: false,
      newAttributes: total,
      enabledAttributes: r,
      attributeDivisors: i,
      object: e,
      attributes: {},
      index: null
    };
  }
  function p(e, t, n, r) {
    let attributes = a.attributes,
      o = t.attributes,
      s = 0,
      attributesResult = n.getAttributes();
    for (let total in attributesResult) if (attributesResult[total].location >= 0) {
      let n = attributes[total],
        r = o[total];
      if (r === undefined && (total === `instanceMatrix` && e.instanceMatrix && (r = e.instanceMatrix), total === `instanceColor` && e.instanceColor && (r = e.instanceColor)), n === undefined || n.attribute !== r || r && n.data !== r.data) return true;
      s++;
    }
    return a.attributesNum !== s || a.index !== r;
  }
  function m(e, t, n, r) {
    let i = {},
      attributes = t.attributes,
      s = 0,
      attributesResult = n.getAttributes();
    for (let total in attributesResult) if (attributesResult[total].location >= 0) {
      let n = attributes[total];
      n === undefined && (total === `instanceMatrix` && e.instanceMatrix && (n = e.instanceMatrix), total === `instanceColor` && e.instanceColor && (n = e.instanceColor));
      let r = {};
      r.attribute = n, n && n.data && (r.data = n.data), i[total] = r, s++;
    }
    a.attributes = i, a.attributesNum = s, a.index = r;
  }
  function h() {
    let newAttributes = a.newAttributes;
    for (let t = 0, n = newAttributes.length; t < n; t++) newAttributes[t] = 0;
  }
  function g(e) {
    _(e, 0);
  }
  function _(t, n) {
    let newAttributes = a.newAttributes,
      enabledAttributes = a.enabledAttributes,
      attributeDivisors = a.attributeDivisors;
    newAttributes[t] = 1, enabledAttributes[t] === 0 && (count.enableVertexAttribArray(t), enabledAttributes[t] = 1), attributeDivisors[t] !== n && (count.vertexAttribDivisor(t, n), attributeDivisors[t] = n);
  }
  function v() {
    let newAttributes = a.newAttributes,
      enabledAttributes = a.enabledAttributes;
    for (let r = 0, i = enabledAttributes.length; r < i; r++) enabledAttributes[r] !== newAttributes[r] && (count.disableVertexAttribArray(r), enabledAttributes[r] = 0);
  }
  function y(t, n, r, i, a, o, s) {
    s === true ? count.vertexAttribIPointer(t, n, r, a, o) : count.vertexAttribPointer(t, n, r, i, a, o);
  }
  function b(n, r, i, a) {
    h();
    let attributes = a.attributes,
      attributesResult = i.getAttributes(),
      defaultAttributeValues = r.defaultAttributeValues;
    for (let r in attributesResult) {
      let i = attributesResult[r];
      if (i.location >= 0) {
        let s = attributes[r];
        if (s === undefined && (r === `instanceMatrix` && n.instanceMatrix && (s = n.instanceMatrix), r === `instanceColor` && n.instanceColor && (s = n.instanceColor)), s !== undefined) {
          let normalized = s.normalized,
            itemSize = s.itemSize,
            c = t.get(s);
          if (c === undefined) continue;
          let buffer = c.buffer,
            u = c.type,
            bytesPerElement = c.bytesPerElement,
            fallbackValue = u === count.INT || u === count.UNSIGNED_INT || s.gpuType === 1013;
          if (s.isInterleavedBufferAttribute) {
            let t = s.data,
              stride = t.stride,
              offset = s.offset;
            if (t.isInstancedInterleavedBuffer) {
              for (let e = 0; e < i.locationSize; e++) _(i.location + e, t.meshPerAttribute);
              n.isInstancedMesh !== true && a._maxInstanceCount === undefined && (a._maxInstanceCount = t.meshPerAttribute * t.count);
            } else for (let e = 0; e < i.locationSize; e++) g(i.location + e);
            count.bindBuffer(count.ARRAY_BUFFER, buffer);
            for (let e = 0; e < i.locationSize; e++) y(i.location + e, itemSize / i.locationSize, u, normalized, stride * bytesPerElement, (offset + itemSize / i.locationSize * e) * bytesPerElement, fallbackValue);
          } else {
            if (s.isInstancedBufferAttribute) {
              for (let e = 0; e < i.locationSize; e++) _(i.location + e, s.meshPerAttribute);
              n.isInstancedMesh !== true && a._maxInstanceCount === undefined && (a._maxInstanceCount = s.meshPerAttribute * s.count);
            } else for (let e = 0; e < i.locationSize; e++) g(i.location + e);
            count.bindBuffer(count.ARRAY_BUFFER, buffer);
            for (let e = 0; e < i.locationSize; e++) y(i.location + e, itemSize / i.locationSize, u, normalized, itemSize * bytesPerElement, itemSize / i.locationSize * e * bytesPerElement, fallbackValue);
          }
        } else if (defaultAttributeValues !== undefined) {
          let t = defaultAttributeValues[r];
          if (t !== undefined) switch (t.length) {
            case 2:
              count.vertexAttrib2fv(i.location, t);
              break;
            case 3:
              count.vertexAttrib3fv(i.location, t);
              break;
            case 4:
              count.vertexAttrib4fv(i.location, t);
              break;
            default:
              count.vertexAttrib1fv(i.location, t);
          }
        }
      }
    }
    v();
  }
  function x() {
    T();
    for (let ratio in r) {
      let t = r[ratio];
      for (let e in t) {
        let n = t[e];
        for (let e in n) {
          let t = n[e];
          for (let e in t) u(t[e].object), delete t[e];
          delete n[e];
        }
      }
      delete r[ratio];
    }
  }
  function S(e) {
    if (r[e.id] === undefined) return;
    let t = r[e.id];
    for (let ratio in t) {
      let n = t[ratio];
      for (let e in n) {
        let t = n[e];
        for (let e in t) u(t[e].object), delete t[e];
        delete n[e];
      }
    }
    delete r[e.id];
  }
  function C(e) {
    for (let total in r) {
      let n = r[total];
      for (let t in n) {
        let r = n[t];
        if (r[e.id] === undefined) continue;
        let i = r[e.id];
        for (let ratio in i) u(i[ratio].object), delete i[ratio];
        delete r[e.id];
      }
    }
  }
  function w(e) {
    for (let total in r) {
      let n = r[total],
        i = e.isInstancedMesh === true ? e.id : 0,
        a = n[i];
      if (a !== undefined) {
        for (let ratio in a) {
          let t = a[ratio];
          for (let e in t) u(t[e].object), delete t[e];
          delete a[ratio];
        }
        delete n[i], Object.keys(n).length === 0 && delete r[total];
      }
    }
  }
  function T() {
    E(), o = true, a !== i && (a = i, l(a.object));
  }
  function E() {
    i.geometry = null, i.program = null, i.wireframe = false;
  }
  return {
    setup: s,
    reset: T,
    resetDefaultState: E,
    dispose: x,
    releaseStatesOfGeometry: S,
    releaseStatesOfObject: w,
    releaseStatesOfProgram: C,
    initAttributes: h,
    enableAttribute: g,
    disableUnusedAttributes: v
  };
}
function Ka(e, t, n) {
  let count;
  function i(e) {
    count = e;
  }
  function a(t, i) {
    e.drawArrays(count, t, i), n.update(i, count, 1);
  }
  function o(t, i, a) {
    a !== 0 && (e.drawArraysInstanced(count, t, i, a), n.update(i, count, a));
  }
  function s(e, i, a) {
    if (a === 0) return;
    t.get(`WEBGL_multi_draw`).multiDrawArraysWEBGL(count, e, 0, i, 0, a);
    let o = 0;
    for (let e = 0; e < a; e++) o += i[e];
    n.update(o, count, 1);
  }
  this.setMode = i, this.render = a, this.renderInstances = o, this.renderMultiDraw = s;
}
function qa(e, t, n, r) {
  let count;
  function a() {
    if (count !== undefined) return count;
    if (t.has(`EXT_texture_filter_anisotropic`) === true) {
      let n = t.get(`EXT_texture_filter_anisotropic`);
      count = e.getParameter(n.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
    } else count = 0;
    return count;
  }
  function o(t) {
    return t === 1023 || r.convert(t) === e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT);
  }
  function s(n) {
    let i = n === 1016 && (t.has(`EXT_color_buffer_half_float`) || t.has(`EXT_color_buffer_float`));
    return !(n !== 1009 && n !== 1015 && !i && r.convert(n) !== e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE));
  }
  function c(t) {
    if (t === `highp`) {
      if (e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.HIGH_FLOAT).precision > 0 && e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.HIGH_FLOAT).precision > 0) return `highp`;
      t = `mediump`;
    }
    return t === `mediump` && e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.MEDIUM_FLOAT).precision > 0 && e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.MEDIUM_FLOAT).precision > 0 ? `mediump` : `lowp`;
  }
  let l = n.precision === undefined ? `highp` : n.precision,
    u = c(l);
  u !== l && (U(`WebGLRenderer:`, l, `not supported, using`, u, `instead.`), l = u);
  let d = n.logarithmicDepthBuffer === true,
    f = n.reversedDepthBuffer === true && t.has(`EXT_clip_control`);
  n.reversedDepthBuffer === true && f === false && U(`WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.`);
  let parameter = e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),
    parameterResult = e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),
    h = e.getParameter(e.MAX_TEXTURE_SIZE),
    g = e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),
    _ = e.getParameter(e.MAX_VERTEX_ATTRIBS),
    v = e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),
    y = e.getParameter(e.MAX_VARYING_VECTORS),
    b = e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),
    x = e.getParameter(e.MAX_SAMPLES),
    S = e.getParameter(e.SAMPLES);
  return {
    isWebGL2: true,
    getMaxAnisotropy: a,
    getMaxPrecision: c,
    textureFormatReadable: o,
    textureTypeReadable: s,
    precision: l,
    logarithmicDepthBuffer: d,
    reversedDepthBuffer: f,
    maxTextures: parameter,
    maxVertexTextures: parameterResult,
    maxTextureSize: h,
    maxCubemapSize: g,
    maxAttributes: _,
    maxVertexUniforms: v,
    maxVaryings: y,
    maxFragmentUniforms: b,
    maxSamples: x,
    samples: S
  };
}
function Ja(count) {
  let t = this,
    n = null,
    r = 0,
    i = false,
    a = false,
    o = new kr(),
    s = new J(),
    c = {
      value: null,
      needsUpdate: false
    };
  this.uniform = c, this.numPlanes = 0, this.numIntersection = 0, this.init = function (e, t) {
    let fallbackValue = e.length !== 0 || t || r !== 0 || i;
    return i = t, r = e.length, fallbackValue;
  }, this.beginShadows = function () {
    a = true, u(null);
  }, this.endShadows = function () {
    a = false;
  }, this.setGlobalState = function (e, t) {
    n = u(e, t, 0);
  }, this.setState = function (t, o, s) {
    let clippingPlanes = t.clippingPlanes,
      clipIntersection = t.clipIntersection,
      clipShadows = t.clipShadows,
      m = count.get(t);
    if (!i || clippingPlanes === null || clippingPlanes.length === 0 || a && !clipShadows) a ? u(null) : l();else {
      let e = a ? 0 : r,
        t = e * 4,
        fallbackValue = m.clippingState || null;
      c.value = fallbackValue, fallbackValue = u(clippingPlanes, o, t, s);
      for (let e = 0; e !== t; ++e) fallbackValue[e] = n[e];
      m.clippingState = fallbackValue, this.numIntersection = clipIntersection ? this.numPlanes : 0, this.numPlanes += e;
    }
  };
  function l() {
    c.value !== n && (c.value = n, c.needsUpdate = r > 0), t.numPlanes = r, t.numIntersection = 0;
  }
  function u(e, n, r, i) {
    let a = e === null ? 0 : e.length,
      total = null;
    if (a !== 0) {
      if (total = c.value, i !== true || total === null) {
        let t = r + a * 4,
          matrixWorldInverse = n.matrixWorldInverse;
        s.getNormalMatrix(matrixWorldInverse), (total === null || total.length < t) && (total = new Float32Array(t));
        for (let t = 0, n = r; t !== a; ++t, n += 4) o.copy(e[t]).applyMatrix4(matrixWorldInverse, s), o.normal.toArray(total, n), total[n + 3] = o.constant;
      }
      c.value = total, c.needsUpdate = true;
    }
    return t.numPlanes = a, t.numIntersection = 0, total;
  }
}
var Ya = 4,
  Xa = 6,
  Za = 20,
  Qa = 256,
  $a = new ua(),
  eo = new X(),
  to = null,
  no = 0,
  ro = 0,
  io = false,
  ao = new q(),
  oo = new q(),
  so = class {
    constructor(constructor) {
      this._renderer = constructor, this._pingPongRenderTarget = null, this._lodMax = 0, this._cubeSize = 0, this._sizeLods = [], this._lodMeshes = [], this._backgroundBox = null, this._cubemapMaterial = null, this._equirectMaterial = null, this._blurMaterial = null, this._ggxMaterial = null;
    }
    fromScene(scene, t = 0, n = .1, r = 100, i = {}) {
      let {
        size: a = 256,
        position: o = ao
      } = i;
      to = this._renderer.getRenderTarget(), no = this._renderer.getActiveCubeFace(), ro = this._renderer.getActiveMipmapLevel(), io = this._renderer.xr.enabled, this._renderer.xr.enabled = false, this._setSize(a);
      let s = this._allocateTargets();
      return s.depthBuffer = true, this._sceneToCubeUV(scene, n, r, s, o), t > 0 && this._blur(s, 0, 0, t), this._applyPMREM(s), this._cleanup(s), s;
    }
    fromEquirectangular(equirectangular, t = null) {
      return this._fromTexture(equirectangular, t);
    }
    fromCubemap(cubemap, t = null) {
      return this._fromTexture(cubemap, t);
    }
    compileCubemapShader() {
      this._cubemapMaterial === null && (this._cubemapMaterial = ho(), this._compileMaterial(this._cubemapMaterial));
    }
    compileEquirectangularShader() {
      this._equirectMaterial === null && (this._equirectMaterial = mo(), this._compileMaterial(this._equirectMaterial));
    }
    dispose() {
      this._dispose(), this._cubemapMaterial !== null && this._cubemapMaterial.dispose(), this._equirectMaterial !== null && this._equirectMaterial.dispose(), this._backgroundBox !== null && (this._backgroundBox.geometry.dispose(), this._backgroundBox.material.dispose());
    }
    _setSize(e) {
      this._lodMax = Math.floor(Math.log2(e)), this._cubeSize = 2 ** this._lodMax;
    }
    _dispose() {
      this._blurMaterial !== null && this._blurMaterial.dispose(), this._ggxMaterial !== null && this._ggxMaterial.dispose(), this._pingPongRenderTarget !== null && this._pingPongRenderTarget.dispose();
      for (let e = 0; e < this._lodMeshes.length; e++) this._lodMeshes[e].geometry.dispose();
    }
    _cleanup(e) {
      this._renderer.setRenderTarget(to, no, ro), this._renderer.xr.enabled = io, e.scissorTest = false, uo(e, 0, 0, e.width, e.height);
    }
    _fromTexture(e, texture) {
      e.mapping === 301 || e.mapping === 302 ? this._setSize(e.image.length === 0 ? 16 : e.image[0].width || e.image[0].image.width) : this._setSize(e.image.width / 4), to = this._renderer.getRenderTarget(), no = this._renderer.getActiveCubeFace(), ro = this._renderer.getActiveMipmapLevel(), io = this._renderer.xr.enabled, this._renderer.xr.enabled = false;
      let textureValue = texture || this._allocateTargets();
      return this._textureToCubeUV(e, textureValue), this._applyPMREM(textureValue), this._cleanup(textureValue), textureValue;
    }
    _allocateTargets() {
      let e = 3 * Math.max(this._cubeSize, 112),
        t = 4 * this._cubeSize,
        n = {
          magFilter: c,
          minFilter: c,
          generateMipmaps: false,
          type: v,
          format: E,
          colorSpace: Ie,
          depthBuffer: false
        },
        r = lo(e, t, n);
      if (this._pingPongRenderTarget === null || this._pingPongRenderTarget.width !== e || this._pingPongRenderTarget.height !== t) {
        this._pingPongRenderTarget !== null && this._dispose(), this._pingPongRenderTarget = lo(e, t, n);
        let {
          _lodMax: r
        } = this;
        ({
          lodMeshes: this._lodMeshes,
          sizeLods: this._sizeLods
        } = co(r)), this._blurMaterial = po(r, e, t), this._ggxMaterial = fo(r, e, t);
      }
      return r;
    }
    _compileMaterial(e) {
      let t = new Yr(new Tr(), e);
      this._renderer.compile(t, $a);
    }
    _sceneToCubeUV(e, cube, cubeValue, cubeInput, i) {
      let a = new la(90, 1, cube, cubeValue),
        o = [1, -1, 1, 1, 1, 1],
        s = [1, 1, 1, -1, -1, -1],
        _renderer = this._renderer,
        autoClear = _renderer.autoClear,
        toneMapping = _renderer.toneMapping;
      _renderer.getClearColor(eo), _renderer.toneMapping = 0, _renderer.autoClear = false, _renderer.state.buffers.depth.getReversed() && (_renderer.setRenderTarget(cubeInput), _renderer.clearDepth(), _renderer.setRenderTarget(null)), this._backgroundBox === null && (this._backgroundBox = new Yr(new gi(), new Lr({
        name: `PMREM.Background`,
        side: 1,
        depthWrite: false,
        depthTest: false
      })));
      let _backgroundBox = this._backgroundBox,
        material = _backgroundBox.material,
        p = false,
        background = e.background;
      background ? background.isColor && (material.color.copy(background), e.background = null, p = true) : (material.color.copy(eo), p = true);
      for (let t = 0; t < 6; t++) {
        let n = t % 3;
        n === 0 ? (a.up.set(0, o[t], 0), a.position.set(i.x, i.y, i.z), a.lookAt(i.x + s[t], i.y, i.z)) : n === 1 ? (a.up.set(0, 0, o[t]), a.position.set(i.x, i.y, i.z), a.lookAt(i.x, i.y + s[t], i.z)) : (a.up.set(0, o[t], 0), a.position.set(i.x, i.y, i.z), a.lookAt(i.x, i.y, i.z + s[t]));
        let _cubeSize = this._cubeSize;
        uo(cubeInput, n * _cubeSize, t > 2 ? _cubeSize : 0, _cubeSize, _cubeSize), _renderer.setRenderTarget(cubeInput), p && _renderer.render(_backgroundBox, a), _renderer.render(e, a);
      }
      _renderer.toneMapping = toneMapping, _renderer.autoClear = autoClear, e.background = background;
    }
    _textureToCubeUV(e, cube) {
      let _renderer = this._renderer,
        fallbackValue = e.mapping === 301 || e.mapping === 302;
      fallbackValue ? (this._cubemapMaterial === null && (this._cubemapMaterial = ho()), this._cubemapMaterial.uniforms.flipEnvMap.value = e.isRenderTargetTexture === false ? -1 : 1) : this._equirectMaterial === null && (this._equirectMaterial = mo());
      let i = fallbackValue ? this._cubemapMaterial : this._equirectMaterial,
        a = this._lodMeshes[0];
      a.material = i;
      let uniforms = i.uniforms;
      uniforms.envMap.value = e;
      let _cubeSize = this._cubeSize;
      uo(cube, 0, 0, 3 * _cubeSize, 2 * _cubeSize), _renderer.setRenderTarget(cube), _renderer.render(a, $a);
    }
    _applyPMREM(e) {
      let _renderer = this._renderer,
        autoClear = _renderer.autoClear;
      _renderer.autoClear = false;
      let r = this._lodMeshes.length;
      for (let t = 1; t < r; t++) this._applyGGXFilter(e, t - 1, t);
      _renderer.autoClear = autoClear;
    }
    _applyGGXFilter(e, filter, filterValue) {
      let _renderer = this._renderer,
        _pingPongRenderTarget = this._pingPongRenderTarget,
        _ggxMaterial = this._ggxMaterial,
        o = this._lodMeshes[filterValue];
      o.material = _ggxMaterial;
      let uniforms = _ggxMaterial.uniforms,
        c = filterValue / (this._lodMeshes.length - 1),
        l = filter / (this._lodMeshes.length - 1),
        u = Math.sqrt(c * c - l * l) * (c * 1.25),
        {
          _lodMax: d
        } = this,
        f = this._sizeLods[filterValue],
        p = 3 * f * (filterValue > d - Ya ? filterValue - d + Ya : 0),
        m = 4 * (this._cubeSize - f);
      uniforms.envMap.value = e.texture, uniforms.roughness.value = u, uniforms.mipInt.value = d - filter, uo(_pingPongRenderTarget, p, m, 3 * f, 2 * f), _renderer.setRenderTarget(_pingPongRenderTarget), _renderer.render(o, $a), uniforms.envMap.value = _pingPongRenderTarget.texture, uniforms.roughness.value = 0, uniforms.mipInt.value = d - filterValue, uo(e, p, m, 3 * f, 2 * f), _renderer.setRenderTarget(e), _renderer.render(o, $a);
    }
    _blur(e, t, n, r) {
      let _pingPongRenderTarget = this._pingPongRenderTarget,
        a = Math.min(r, Math.PI) / Math.SQRT2;
      this._blurPass(e, _pingPongRenderTarget, t, n, a), this._blurPass(_pingPongRenderTarget, e, n, n, a);
    }
    _blurPass(e, pass, passValue, passInput, i) {
      let _renderer = this._renderer,
        _blurMaterial = this._blurMaterial,
        s = this._lodMeshes[passInput];
      s.material = _blurMaterial;
      let uniforms = _blurMaterial.uniforms;
      uniforms.envMap.value = e.texture, uniforms.sigma.value = i, uniforms.mipInt.value = this._lodMax - passValue;
      let l = this._sizeLods[passInput];
      uo(pass, 3 * l * (passInput > this._lodMax - Ya ? passInput - this._lodMax + Ya : 0), 4 * (this._cubeSize - l), 3 * l, 2 * l), _renderer.setRenderTarget(pass), _renderer.render(s, $a);
    }
  };
function co(e) {
  let total = [],
    count = [],
    r = e,
    i = e - Ya + 1 + Xa;
  for (let e = 0; e < i; e++) {
    let e = 2 ** r;
    total.push(e);
    let i = 1 / (e - 2),
      a = -i,
      o = 1 + i,
      s = [a, a, o, a, o, o, a, a, o, o, a, o],
      float32Array = new Float32Array(108),
      l = new Float32Array(108);
    for (let e = 0; e < 6; e++) {
      let t = e % 3 * 2 / 3 - 1,
        n = e > 2 ? 0 : -1,
        r = [t, n, 0, t + 2 / 3, n, 0, t + 2 / 3, n + 1, 0, t, n, 0, t + 2 / 3, n + 1, 0, t, n + 1, 0];
      float32Array.set(r, 18 * e);
      for (let t = 0; t < 6; t++) {
        let n = s[t * 2] * 2 - 1,
          r = s[t * 2 + 1] * 2 - 1;
        e === 0 ? oo.set(1, r, n) : e === 1 ? oo.set(-n, 1, -r) : e === 2 ? oo.set(-n, r, 1) : e === 3 ? oo.set(-1, r, -n) : e === 4 ? oo.set(-n, -1, r) : oo.set(n, r, -1), oo.toArray(l, (e * 6 + t) * 3);
      }
    }
    let u = new Tr();
    u.setAttribute(`position`, new ur(float32Array, 3)), u.setAttribute(`outputDirection`, new ur(l, 3)), count.push(new Yr(u, null)), r > Ya && r--;
  }
  return {
    lodMeshes: count,
    sizeLods: total
  };
}
function lo(e, t, n) {
  let r = new Gt(e, t, n);
  return r.texture.mapping = 306, r.texture.name = `PMREM.cubeUv`, r.scissorTest = true, r;
}
function uo(e, t, n, r, i) {
  e.viewport.set(t, n, r, i), e.scissor.set(t, n, r, i);
}
function fo(e, t, n) {
  return new Di({
    name: `PMREMGGXConvolution`,
    defines: {
      GGX_SAMPLES: Qa,
      CUBEUV_TEXEL_WIDTH: 1 / t,
      CUBEUV_TEXEL_HEIGHT: 1 / n,
      CUBEUV_MAX_MIP: `${e}.0`
    },
    uniforms: {
      envMap: {
        value: null
      },
      roughness: {
        value: 0
      },
      mipInt: {
        value: 0
      }
    },
    vertexShader: go(),
    fragmentShader: `

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,
    blending: 0,
    depthTest: false,
    depthWrite: false
  });
}
function po(e, t, n) {
  return new Di({
    name: `SphericalGaussianBlur`,
    defines: {
      SAMPLES: Za,
      CUBEUV_TEXEL_WIDTH: 1 / t,
      CUBEUV_TEXEL_HEIGHT: 1 / n,
      CUBEUV_MAX_MIP: `${e}.0`
    },
    uniforms: {
      envMap: {
        value: null
      },
      sigma: {
        value: 0
      },
      mipInt: {
        value: 0
      }
    },
    vertexShader: go(),
    fragmentShader: `

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float sigma;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359
			#define GOLDEN_ANGLE 2.39996322973

			void main() {

				if ( sigma == 0.0 ) {

					gl_FragColor = vec4( bilinearCubeUV( envMap, vOutputDirection, mipInt ), 1.0 );
					return;

				}

				vec3 outputDirection = normalize( vOutputDirection );

				vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
				vec3 tangent = normalize( cross( up, outputDirection ) );
				vec3 bitangent = cross( outputDirection, tangent );

				// Truncate the kernel at three standard deviations or at the antipode.
				float thetaMax = min( 3.0 * sigma, PI );
				float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

				vec3 accumColor = vec3( 0.0 );
				float accumWeight = 0.0;

				for ( int i = 0; i < SAMPLES; i ++ ) {

					// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
					float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
					float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
					float phi = float( i ) * GOLDEN_ANGLE;

					vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
					vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

					// Correct the planar sample density to solid angle.
					float weight = sin( theta ) / theta;

					accumColor += weight * bilinearCubeUV( envMap, sampleDirection, mipInt );
					accumWeight += weight;

				}

				gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

			}
		`,
    blending: 0,
    depthTest: false,
    depthWrite: false
  });
}
function mo() {
  return new Di({
    name: `EquirectangularToCubeUV`,
    uniforms: {
      envMap: {
        value: null
      }
    },
    vertexShader: go(),
    fragmentShader: `

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,
    blending: 0,
    depthTest: false,
    depthWrite: false
  });
}
function ho() {
  return new Di({
    name: `CubemapToCubeUV`,
    uniforms: {
      envMap: {
        value: null
      },
      flipEnvMap: {
        value: -1
      }
    },
    vertexShader: go(),
    fragmentShader: `

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,
    blending: 0,
    depthTest: false,
    depthWrite: false
  });
}
function go() {
  return `

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`;
}
var _o = class extends Gt {
  constructor(e = 1, t = {}) {
    super(e, e, t), this.isWebGLCubeRenderTarget = true;
    let n = {
        width: e,
        height: e,
        depth: 1
      },
      r = [n, n, n, n, n, n];
    this.texture = new fi(r), this._setTextureOptions(t), this.texture.isRenderTargetTexture = true;
  }
  fromEquirectangularTexture(equirectangular, texture) {
    this.texture.type = texture.type, this.texture.colorSpace = texture.colorSpace, this.texture.generateMipmaps = texture.generateMipmaps, this.texture.minFilter = texture.minFilter, this.texture.magFilter = texture.magFilter;
    let n = {
        uniforms: {
          tEquirect: {
            value: null
          }
        },
        vertexShader: `

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,
        fragmentShader: `

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`
      },
      r = new gi(5, 5, 5),
      i = new Di({
        name: `CubemapFromEquirect`,
        uniforms: yi(n.uniforms),
        vertexShader: n.vertexShader,
        fragmentShader: n.fragmentShader,
        side: 1,
        blending: 0
      });
    i.uniforms.tEquirect.value = texture;
    let a = new Yr(r, i),
      minFilter = texture.minFilter;
    return texture.minFilter === 1008 && (texture.minFilter = c), new ga(1, 10, this).update(equirectangular, a), texture.minFilter = minFilter, a.geometry.dispose(), a.material.dispose(), this;
  }
  clear(e, t = true, n = true, r = true) {
    let renderTarget = e.getRenderTarget();
    for (let i = 0; i < 6; i++) e.setRenderTarget(this, i), e.clear(t, n, r);
    e.setRenderTarget(renderTarget);
  }
};
function vo(event) {
  let weakMap = new WeakMap(),
    n = new WeakMap(),
    count = null;
  function i(e, t = false) {
    return e == null ? null : t ? o(e) : a(e);
  }
  function a(n) {
    if (n && n.isTexture) {
      let mapping = n.mapping;
      if (mapping === 303 || mapping === 304) {
        if (weakMap.has(n)) {
          let texture = weakMap.get(n).texture;
          return s(texture, n.mapping);
        }
        {
          let image = n.image;
          if (image && image.height > 0) {
            let i = new _o(image.height);
            return i.fromEquirectangularTexture(event, n), weakMap.set(n, i), n.addEventListener(`dispose`, l), s(i.texture, n.mapping);
          }
          return null;
        }
      }
    }
    return n;
  }
  function o(t) {
    if (t && t.isTexture) {
      let mapping = t.mapping,
        fallbackValue = mapping === 303 || mapping === 304,
        o = mapping === 301 || mapping === 302;
      if (fallbackValue || o) {
        let i = n.get(t),
          s = i === undefined ? 0 : i.texture.pmremVersion;
        if (t.isRenderTargetTexture && t.pmremVersion !== s) return count === null && (count = new so(event)), i = fallbackValue ? count.fromEquirectangular(t, i) : count.fromCubemap(t, i), i.texture.pmremVersion = t.pmremVersion, n.set(t, i), i.texture;
        if (i !== undefined) return i.texture;
        {
          let image = t.image;
          return fallbackValue && image && image.height > 0 || o && image && c(image) ? (count === null && (count = new so(event)), i = fallbackValue ? count.fromEquirectangular(t) : count.fromCubemap(t), i.texture.pmremVersion = t.pmremVersion, n.set(t, i), t.addEventListener(`dispose`, u), i.texture) : null;
        }
      }
    }
    return t;
  }
  function s(e, t) {
    return t === 303 ? e.mapping = 301 : t === 304 && (e.mapping = 302), e;
  }
  function c(e) {
    let t = 0;
    for (let n = 0; n < 6; n++) e[n] !== undefined && t++;
    return t === 6;
  }
  function l(e) {
    let n = e.target;
    n.removeEventListener(`dispose`, l);
    let r = weakMap.get(n);
    r !== undefined && (weakMap.delete(n), r.dispose());
  }
  function u(e) {
    let t = e.target;
    t.removeEventListener(`dispose`, u);
    let r = n.get(t);
    r !== undefined && (n.delete(t), r.dispose());
  }
  function d() {
    weakMap = new WeakMap(), n = new WeakMap(), count !== null && (count.dispose(), count = null);
  }
  return {
    get: i,
    dispose: d
  };
}
function yo(e) {
  let t = {};
  function n(n) {
    if (t[n] !== undefined) return t[n];
    let extension = e.getExtension(n);
    return t[n] = extension, extension;
  }
  return {
    has: function (e) {
      return n(e) !== null;
    },
    init: function () {
      n(`EXT_color_buffer_float`), n(`WEBGL_clip_cull_distance`), n(`OES_texture_float_linear`), n(`EXT_color_buffer_half_float`), n(`WEBGL_multisampled_render_to_texture`), n(`WEBGL_render_shared_exponent`);
    },
    get: function (e) {
      let t = n(e);
      return t === null && Xe(`WebGLRenderer: ` + e + ` extension not supported.`), t;
    }
  };
}
function bo(event, t, items, r) {
  let i = {},
    weakMap = new WeakMap();
  function o(e) {
    let s = e.target;
    s.index !== null && t.remove(s.index);
    for (let ratio in s.attributes) t.remove(s.attributes[ratio]);
    s.removeEventListener(`dispose`, o), delete i[s.id];
    let c = weakMap.get(s);
    c && (t.remove(c), weakMap.delete(s)), r.releaseStatesOfGeometry(s), s.isInstancedBufferGeometry === true && delete s._maxInstanceCount, items.memory.geometries--;
  }
  function s(e, t) {
    return i[t.id] === true ? t : (t.addEventListener(`dispose`, o), i[t.id] = true, items.memory.geometries++, t);
  }
  function c(n) {
    let attributes = n.attributes;
    for (let count in attributes) t.update(attributes[count], event.ARRAY_BUFFER);
  }
  function l(count) {
    let n = [],
      r = count.index,
      position = count.attributes.position,
      o = 0;
    if (position === undefined) return;
    if (r !== null) {
      let array = r.array;
      o = r.version;
      for (let t = 0, r = array.length; t < r; t += 3) {
        let r = array[t + 0],
          i = array[t + 1],
          a = array[t + 2];
        n.push(r, i, i, a, a, r);
      }
    } else {
      let array = position.array;
      o = position.version;
      for (let t = 0, r = array.length / 3 - 1; t < r; t += 3) {
        let e = t + 0,
          r = t + 1,
          i = t + 2;
        n.push(e, r, r, i, i, e);
      }
    }
    let s = new (position.count >= 65535 ? fr : dr)(n, 1);
    s.version = o;
    let c = weakMap.get(count);
    c && t.remove(c), weakMap.set(count, s);
  }
  function u(e) {
    let t = weakMap.get(e);
    if (t) {
      let n = e.index;
      n !== null && t.version < n.version && l(e);
    } else l(e);
    return weakMap.get(e);
  }
  return {
    get: s,
    update: c,
    getWireframeAttribute: u
  };
}
function xo(e, t, n) {
  let count;
  function i(e) {
    count = e;
  }
  let flag, ratio;
  function s(e) {
    flag = e.type, ratio = e.bytesPerElement;
  }
  function c(t, i) {
    e.drawElements(count, i, flag, t * ratio), n.update(i, count, 1);
  }
  function l(t, i, s) {
    s !== 0 && (e.drawElementsInstanced(count, i, flag, t * ratio, s), n.update(i, count, s));
  }
  function u(e, i, o) {
    if (o === 0) return;
    t.get(`WEBGL_multi_draw`).multiDrawElementsWEBGL(count, i, 0, flag, e, 0, o);
    let s = 0;
    for (let e = 0; e < o; e++) s += i[e];
    n.update(s, count, 1);
  }
  this.setMode = i, this.setIndex = s, this.render = c, this.renderInstances = l, this.renderMultiDraw = u;
}
function So(e) {
  let t = {
      geometries: 0,
      textures: 0
    },
    n = {
      frame: 0,
      calls: 0,
      triangles: 0,
      points: 0,
      lines: 0
    };
  function r(t, r, i) {
    switch (n.calls++, r) {
      case e.TRIANGLES:
        n.triangles += t / 3 * i;
        break;
      case e.LINES:
        n.lines += t / 2 * i;
        break;
      case e.LINE_STRIP:
        n.lines += i * (t - 1);
        break;
      case e.LINE_LOOP:
        n.lines += i * t;
        break;
      case e.POINTS:
        n.points += i * t;
        break;
      default:
        W(`WebGLInfo: Unknown draw mode:`, r);
    }
  }
  function i() {
    n.calls = 0, n.triangles = 0, n.points = 0, n.lines = 0;
  }
  return {
    memory: t,
    render: n,
    programs: null,
    autoReset: true,
    reset: i,
    update: r
  };
}
function Co(e, t, n) {
  let weakMap = new WeakMap(),
    i = new Ut();
  function a(a, o, s) {
    let morphTargetInfluences = a.morphTargetInfluences,
      fallbackValue = o.morphAttributes.position || o.morphAttributes.normal || o.morphAttributes.color,
      u = fallbackValue === undefined ? 0 : fallbackValue.length,
      d = weakMap.get(o);
    if (d === undefined || d.count !== u) {
      d !== undefined && d.texture.dispose();
      let e = o.morphAttributes.position !== undefined,
        n = o.morphAttributes.normal !== undefined,
        a = o.morphAttributes.color !== undefined,
        s = o.morphAttributes.position || [],
        c = o.morphAttributes.normal || [],
        l = o.morphAttributes.color || [],
        f = 0;
      e === true && (f = 1), n === true && (f = 2), a === true && (f = 3);
      let p = o.attributes.position.count * f,
        m = 1;
      p > t.maxTextureSize && (m = Math.ceil(p / t.maxTextureSize), p = t.maxTextureSize);
      let float32Array = new Float32Array(p * m * 4 * u),
        g = new Kt(float32Array, p, m, u);
      g.type = _, g.needsUpdate = true;
      let v = f * 4;
      for (let t = 0; t < u; t++) {
        let r = s[t],
          o = c[t],
          u = l[t],
          d = p * m * 4 * t;
        for (let t = 0; t < r.count; t++) {
          let s = t * v;
          e === true && (i.fromBufferAttribute(r, t), float32Array[d + s + 0] = i.x, float32Array[d + s + 1] = i.y, float32Array[d + s + 2] = i.z, float32Array[d + s + 3] = 0), n === true && (i.fromBufferAttribute(o, t), float32Array[d + s + 4] = i.x, float32Array[d + s + 5] = i.y, float32Array[d + s + 6] = i.z, float32Array[d + s + 7] = 0), a === true && (i.fromBufferAttribute(u, t), float32Array[d + s + 8] = i.x, float32Array[d + s + 9] = i.y, float32Array[d + s + 10] = i.z, float32Array[d + s + 11] = u.itemSize === 4 ? i.w : 1);
        }
      }
      d = {
        count: u,
        texture: g,
        size: new K(p, m)
      }, weakMap.set(o, d);
      function y() {
        g.dispose(), weakMap.delete(o), o.removeEventListener(`dispose`, y);
      }
      o.addEventListener(`dispose`, y);
    }
    if (a.isInstancedMesh === true && a.morphTexture !== null) s.getUniforms().setValue(e, `morphTexture`, a.morphTexture, n);else {
      let t = 0;
      for (let e = 0; e < morphTargetInfluences.length; e++) t += morphTargetInfluences[e];
      let n = o.morphTargetsRelative ? 1 : 1 - t;
      s.getUniforms().setValue(e, `morphTargetBaseInfluence`, n), s.getUniforms().setValue(e, `morphTargetInfluences`, morphTargetInfluences);
    }
    s.getUniforms().setValue(e, `morphTargetsTexture`, d.texture, n), s.getUniforms().setValue(e, `morphTargetsTextureSize`, d.size);
  }
  return {
    update: a
  };
}
function wo(event, t, n, r, i) {
  let weakMap = new WeakMap();
  function o(r) {
    let frame = i.render.frame,
      geometry = r.geometry,
      l = t.get(r, geometry);
    if (weakMap.get(l) !== frame && (t.update(l), weakMap.set(l, frame)), r.isInstancedMesh && (r.hasEventListener(`dispose`, c) === false && r.addEventListener(`dispose`, c), weakMap.get(r) !== frame && (n.update(r.instanceMatrix, event.ARRAY_BUFFER), r.instanceColor !== null && n.update(r.instanceColor, event.ARRAY_BUFFER), weakMap.set(r, frame))), r.isSkinnedMesh) {
      let skeleton = r.skeleton;
      weakMap.get(skeleton) !== frame && (skeleton.update(), weakMap.set(skeleton, frame));
    }
    return l;
  }
  function s() {
    weakMap = new WeakMap();
  }
  function c(e) {
    let t = e.target;
    t.removeEventListener(`dispose`, c), r.releaseStatesOfObject(t), n.remove(t.instanceMatrix), t.instanceColor !== null && n.remove(t.instanceColor);
  }
  return {
    update: o,
    dispose: s
  };
}
var To = {
  1: `LINEAR_TONE_MAPPING`,
  2: `REINHARD_TONE_MAPPING`,
  3: `CINEON_TONE_MAPPING`,
  4: `ACES_FILMIC_TONE_MAPPING`,
  6: `AGX_TONE_MAPPING`,
  7: `NEUTRAL_TONE_MAPPING`,
  5: `CUSTOM_TONE_MAPPING`
};
function Eo(e, t, n, r, i, options) {
  let o = new Gt(t, n, {
      type: e,
      depthBuffer: i,
      stencilBuffer: options,
      samples: r ? 4 : 0,
      storeMultisampledDepthBuffer: false,
      storeMultisampledStencilBuffer: false,
      resolveDepthBuffer: false,
      resolveStencilBuffer: false
    }),
    total = null,
    c = null,
    l = new Tr();
  l.setAttribute(`position`, new pr([-1, 3, 0, -1, -1, 0, 3, -1, 0], 3)), l.setAttribute(`uv`, new pr([0, 2, 0, 0, 2, 0], 2));
  let u = new Oi({
      uniforms: {
        tDiffuse: {
          value: null
        }
      },
      vertexShader: `
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,
      fragmentShader: `
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,
      depthTest: false,
      depthWrite: false
    }),
    d = new Yr(l, u),
    f = new ua(-1, 1, 1, -1, 0, 1),
    ratio = null,
    m = null,
    h = false,
    toneMapping,
    _ = null,
    y = [],
    b = false;
  this.setSize = function (e, t) {
    o.setSize(e, t), total !== null && total.setSize(e, t), c !== null && c.setSize(e, t);
    for (let n = 0; n < y.length; n++) {
      let r = y[n];
      r.setSize && r.setSize(e, t);
    }
  }, this.setEffects = function (e) {
    y = e, b = y.length > 0 && y[0].isRenderPass === true;
    let t = o.width,
      n = o.height;
    y.length > 0 && total === null && (total = new Gt(t, n, {
      type: v,
      depthBuffer: false,
      stencilBuffer: false
    }), c = new Gt(t, n, {
      type: v,
      depthBuffer: false,
      stencilBuffer: false
    }));
    for (let e = 0; e < y.length; e++) {
      let r = y[e];
      r.setSize && r.setSize(t, n);
    }
  }, this.begin = function (e, t) {
    if (h || e.toneMapping === 0 && y.length === 0) return false;
    if (_ = t, t !== null) {
      let e = t.width,
        n = t.height;
      (o.width !== e || o.height !== n) && this.setSize(e, n);
    }
    return b === false && e.setRenderTarget(o), toneMapping = e.toneMapping, e.toneMapping = 0, true;
  }, this.hasRenderPass = function () {
    return b;
  }, this.end = function (e, t) {
    e.toneMapping = toneMapping, h = true;
    let n = o,
      r = total;
    for (let i = 0; i < y.length; i++) {
      let a = y[i];
      a.enabled !== false && (a.render(e, r, n, t), a.needsSwap !== false && (n = r, r = r === total ? c : total));
    }
    if (ratio !== e.outputColorSpace || m !== e.toneMapping) {
      ratio = e.outputColorSpace, m = e.toneMapping, u.defines = {}, Y.getTransfer(ratio) === `srgb` && (u.defines.SRGB_TRANSFER = ``);
      let t = To[m];
      t && (u.defines[t] = ``), u.needsUpdate = true;
    }
    u.uniforms.tDiffuse.value = n.texture, e.setRenderTarget(_), e.render(d, f), _ = null, h = false;
  }, this.isCompositing = function () {
    return h;
  }, this.dispose = function () {
    o.dispose(), total !== null && total.dispose(), c !== null && c.dispose(), l.dispose(), u.dispose();
  };
}
var Do = new Ht(),
  Oo = new pi(1, 1),
  ko = new Kt(),
  Ao = new qt(),
  jo = new fi(),
  Mo = [],
  No = [],
  Po = new Float32Array(16),
  Fo = new Float32Array(9),
  Io = new Float32Array(4);
function Lo(e, t, n) {
  let r = e[0];
  if (r <= 0 || r > 0) return e;
  let i = t * n,
    a = Mo[i];
  if (a === undefined && (a = new Float32Array(i), Mo[i] = a), t !== 0) {
    r.toArray(a, 0);
    for (let r = 1, i = 0; r !== t; ++r) i += n, e[r].toArray(a, i);
  }
  return a;
}
function Ro(count, t) {
  if (count.length !== t.length) return false;
  for (let n = 0, r = count.length; n < r; n++) if (count[n] !== t[n]) return false;
  return true;
}
function zo(e, count) {
  for (let n = 0, r = count.length; n < r; n++) e[n] = count[n];
}
function Bo(e, t) {
  let n = No[t];
  n === undefined && (n = new Int32Array(t), No[t] = n);
  for (let r = 0; r !== t; ++r) n[r] = e.allocateTextureUnit();
  return n;
}
function Vo(e, t) {
  let cache = this.cache;
  cache[0] !== t && (e.uniform1f(this.addr, t), cache[0] = t);
}
function Ho(e, t) {
  let cache = this.cache;
  if (t.x !== undefined) (cache[0] !== t.x || cache[1] !== t.y) && (e.uniform2f(this.addr, t.x, t.y), cache[0] = t.x, cache[1] = t.y);else {
    if (Ro(cache, t)) return;
    e.uniform2fv(this.addr, t), zo(cache, t);
  }
}
function Uo(e, t) {
  let cache = this.cache;
  if (t.x !== undefined) (cache[0] !== t.x || cache[1] !== t.y || cache[2] !== t.z) && (e.uniform3f(this.addr, t.x, t.y, t.z), cache[0] = t.x, cache[1] = t.y, cache[2] = t.z);else if (t.r !== undefined) (cache[0] !== t.r || cache[1] !== t.g || cache[2] !== t.b) && (e.uniform3f(this.addr, t.r, t.g, t.b), cache[0] = t.r, cache[1] = t.g, cache[2] = t.b);else {
    if (Ro(cache, t)) return;
    e.uniform3fv(this.addr, t), zo(cache, t);
  }
}
function Wo(e, t) {
  let cache = this.cache;
  if (t.x !== undefined) (cache[0] !== t.x || cache[1] !== t.y || cache[2] !== t.z || cache[3] !== t.w) && (e.uniform4f(this.addr, t.x, t.y, t.z, t.w), cache[0] = t.x, cache[1] = t.y, cache[2] = t.z, cache[3] = t.w);else {
    if (Ro(cache, t)) return;
    e.uniform4fv(this.addr, t), zo(cache, t);
  }
}
function Go(e, t) {
  let cache = this.cache,
    elements = t.elements;
  if (elements === undefined) {
    if (Ro(cache, t)) return;
    e.uniformMatrix2fv(this.addr, false, t), zo(cache, t);
  } else {
    if (Ro(cache, elements)) return;
    Io.set(elements), e.uniformMatrix2fv(this.addr, false, Io), zo(cache, elements);
  }
}
function Ko(e, t) {
  let cache = this.cache,
    elements = t.elements;
  if (elements === undefined) {
    if (Ro(cache, t)) return;
    e.uniformMatrix3fv(this.addr, false, t), zo(cache, t);
  } else {
    if (Ro(cache, elements)) return;
    Fo.set(elements), e.uniformMatrix3fv(this.addr, false, Fo), zo(cache, elements);
  }
}
function qo(e, t) {
  let cache = this.cache,
    elements = t.elements;
  if (elements === undefined) {
    if (Ro(cache, t)) return;
    e.uniformMatrix4fv(this.addr, false, t), zo(cache, t);
  } else {
    if (Ro(cache, elements)) return;
    Po.set(elements), e.uniformMatrix4fv(this.addr, false, Po), zo(cache, elements);
  }
}
function Jo(e, t) {
  let cache = this.cache;
  cache[0] !== t && (e.uniform1i(this.addr, t), cache[0] = t);
}
function Yo(e, t) {
  let cache = this.cache;
  if (t.x !== undefined) (cache[0] !== t.x || cache[1] !== t.y) && (e.uniform2i(this.addr, t.x, t.y), cache[0] = t.x, cache[1] = t.y);else {
    if (Ro(cache, t)) return;
    e.uniform2iv(this.addr, t), zo(cache, t);
  }
}
function Xo(e, t) {
  let cache = this.cache;
  if (t.x !== undefined) (cache[0] !== t.x || cache[1] !== t.y || cache[2] !== t.z) && (e.uniform3i(this.addr, t.x, t.y, t.z), cache[0] = t.x, cache[1] = t.y, cache[2] = t.z);else {
    if (Ro(cache, t)) return;
    e.uniform3iv(this.addr, t), zo(cache, t);
  }
}
function Zo(e, t) {
  let cache = this.cache;
  if (t.x !== undefined) (cache[0] !== t.x || cache[1] !== t.y || cache[2] !== t.z || cache[3] !== t.w) && (e.uniform4i(this.addr, t.x, t.y, t.z, t.w), cache[0] = t.x, cache[1] = t.y, cache[2] = t.z, cache[3] = t.w);else {
    if (Ro(cache, t)) return;
    e.uniform4iv(this.addr, t), zo(cache, t);
  }
}
function Qo(e, t) {
  let cache = this.cache;
  cache[0] !== t && (e.uniform1ui(this.addr, t), cache[0] = t);
}
function $o(e, t) {
  let cache = this.cache;
  if (t.x !== undefined) (cache[0] !== t.x || cache[1] !== t.y) && (e.uniform2ui(this.addr, t.x, t.y), cache[0] = t.x, cache[1] = t.y);else {
    if (Ro(cache, t)) return;
    e.uniform2uiv(this.addr, t), zo(cache, t);
  }
}
function es(e, t) {
  let cache = this.cache;
  if (t.x !== undefined) (cache[0] !== t.x || cache[1] !== t.y || cache[2] !== t.z) && (e.uniform3ui(this.addr, t.x, t.y, t.z), cache[0] = t.x, cache[1] = t.y, cache[2] = t.z);else {
    if (Ro(cache, t)) return;
    e.uniform3uiv(this.addr, t), zo(cache, t);
  }
}
function ts(e, t) {
  let cache = this.cache;
  if (t.x !== undefined) (cache[0] !== t.x || cache[1] !== t.y || cache[2] !== t.z || cache[3] !== t.w) && (e.uniform4ui(this.addr, t.x, t.y, t.z, t.w), cache[0] = t.x, cache[1] = t.y, cache[2] = t.z, cache[3] = t.w);else {
    if (Ro(cache, t)) return;
    e.uniform4uiv(this.addr, t), zo(cache, t);
  }
}
function ns(e, t, n) {
  let cache = this.cache,
    allocateTextureUnit = n.allocateTextureUnit();
  cache[0] !== allocateTextureUnit && (e.uniform1i(this.addr, allocateTextureUnit), cache[0] = allocateTextureUnit);
  let flag;
  this.type === e.SAMPLER_2D_SHADOW ? (Oo.compareFunction = n.isReversedDepthBuffer() ? 518 : 515, flag = Oo) : flag = Do, n.setTexture2D(t || flag, allocateTextureUnit);
}
function rs(e, t, n) {
  let cache = this.cache,
    allocateTextureUnit = n.allocateTextureUnit();
  cache[0] !== allocateTextureUnit && (e.uniform1i(this.addr, allocateTextureUnit), cache[0] = allocateTextureUnit), n.setTexture3D(t || Ao, allocateTextureUnit);
}
function is(e, t, n) {
  let cache = this.cache,
    allocateTextureUnit = n.allocateTextureUnit();
  cache[0] !== allocateTextureUnit && (e.uniform1i(this.addr, allocateTextureUnit), cache[0] = allocateTextureUnit), n.setTextureCube(t || jo, allocateTextureUnit);
}
function as(e, t, n) {
  let cache = this.cache,
    allocateTextureUnit = n.allocateTextureUnit();
  cache[0] !== allocateTextureUnit && (e.uniform1i(this.addr, allocateTextureUnit), cache[0] = allocateTextureUnit), n.setTexture2DArray(t || ko, allocateTextureUnit);
}
function os(e) {
  switch (e) {
    case 5126:
      return Vo;
    case 35664:
      return Ho;
    case 35665:
      return Uo;
    case 35666:
      return Wo;
    case 35674:
      return Go;
    case 35675:
      return Ko;
    case 35676:
      return qo;
    case 5124:
    case 35670:
      return Jo;
    case 35667:
    case 35671:
      return Yo;
    case 35668:
    case 35672:
      return Xo;
    case 35669:
    case 35673:
      return Zo;
    case 5125:
      return Qo;
    case 36294:
      return $o;
    case 36295:
      return es;
    case 36296:
      return ts;
    case 35678:
    case 36198:
    case 36298:
    case 36306:
    case 35682:
      return ns;
    case 35679:
    case 36299:
    case 36307:
      return rs;
    case 35680:
    case 36300:
    case 36308:
    case 36293:
      return is;
    case 36289:
    case 36303:
    case 36311:
    case 36292:
      return as;
  }
}
function ss(e, t) {
  e.uniform1fv(this.addr, t);
}
function cs(e, t) {
  let n = Lo(t, this.size, 2);
  e.uniform2fv(this.addr, n);
}
function ls(e, t) {
  let n = Lo(t, this.size, 3);
  e.uniform3fv(this.addr, n);
}
function us(e, t) {
  let n = Lo(t, this.size, 4);
  e.uniform4fv(this.addr, n);
}
function ds(e, t) {
  let n = Lo(t, this.size, 4);
  e.uniformMatrix2fv(this.addr, false, n);
}
function fs(e, t) {
  let n = Lo(t, this.size, 9);
  e.uniformMatrix3fv(this.addr, false, n);
}
function ps(e, t) {
  let n = Lo(t, this.size, 16);
  e.uniformMatrix4fv(this.addr, false, n);
}
function ms(e, t) {
  e.uniform1iv(this.addr, t);
}
function hs(e, t) {
  e.uniform2iv(this.addr, t);
}
function gs(e, t) {
  e.uniform3iv(this.addr, t);
}
function _s(e, t) {
  e.uniform4iv(this.addr, t);
}
function vs(e, t) {
  e.uniform1uiv(this.addr, t);
}
function ys(e, t) {
  e.uniform2uiv(this.addr, t);
}
function bs(e, t) {
  e.uniform3uiv(this.addr, t);
}
function xs(e, t) {
  e.uniform4uiv(this.addr, t);
}
function Ss(e, count, n) {
  let cache = this.cache,
    i = count.length,
    a = Bo(n, i);
  Ro(cache, a) || (e.uniform1iv(this.addr, a), zo(cache, a));
  let ratio;
  ratio = this.type === e.SAMPLER_2D_SHADOW ? Oo : Do;
  for (let e = 0; e !== i; ++e) n.setTexture2D(count[e] || ratio, a[e]);
}
function Cs(e, count, n) {
  let cache = this.cache,
    i = count.length,
    a = Bo(n, i);
  Ro(cache, a) || (e.uniform1iv(this.addr, a), zo(cache, a));
  for (let e = 0; e !== i; ++e) n.setTexture3D(count[e] || Ao, a[e]);
}
function ws(e, count, n) {
  let cache = this.cache,
    i = count.length,
    a = Bo(n, i);
  Ro(cache, a) || (e.uniform1iv(this.addr, a), zo(cache, a));
  for (let e = 0; e !== i; ++e) n.setTextureCube(count[e] || jo, a[e]);
}
function Ts(e, count, n) {
  let cache = this.cache,
    i = count.length,
    a = Bo(n, i);
  Ro(cache, a) || (e.uniform1iv(this.addr, a), zo(cache, a));
  for (let e = 0; e !== i; ++e) n.setTexture2DArray(count[e] || ko, a[e]);
}
function Es(e) {
  switch (e) {
    case 5126:
      return ss;
    case 35664:
      return cs;
    case 35665:
      return ls;
    case 35666:
      return us;
    case 35674:
      return ds;
    case 35675:
      return fs;
    case 35676:
      return ps;
    case 5124:
    case 35670:
      return ms;
    case 35667:
    case 35671:
      return hs;
    case 35668:
    case 35672:
      return gs;
    case 35669:
    case 35673:
      return _s;
    case 5125:
      return vs;
    case 36294:
      return ys;
    case 36295:
      return bs;
    case 36296:
      return xs;
    case 35678:
    case 36198:
    case 36298:
    case 36306:
    case 35682:
      return Ss;
    case 35679:
    case 36299:
    case 36307:
      return Cs;
    case 35680:
    case 36300:
    case 36308:
    case 36293:
      return ws;
    case 36289:
    case 36303:
    case 36311:
    case 36292:
      return Ts;
  }
}
var Ds = class {
    constructor(constructor, constructorValue, constructorInput) {
      this.id = constructor, this.addr = constructorInput, this.cache = [], this.type = constructorValue.type, this.setValue = os(constructorValue.type);
    }
  },
  Os = class {
    constructor(constructor, count, constructorValue) {
      this.id = constructor, this.addr = constructorValue, this.cache = [], this.type = count.type, this.size = count.size, this.setValue = Es(count.type);
    }
  },
  ks = class {
    constructor(constructor) {
      this.id = constructor, this.seq = [], this.map = {};
    }
    setValue(value, valueValue, valueInput) {
      let r = this.seq;
      for (let i = 0, a = r.length; i !== a; ++i) {
        let a = r[i];
        a.setValue(value, valueValue[a.id], valueInput);
      }
    }
  },
  As = /(\w+)(\])?(\[|\.)?/g;
function js(items, t) {
  items.seq.push(t), items.map[t.id] = t;
}
function Ms(e, t, items) {
  let r = e.name,
    i = r.length;
  for (As.lastIndex = 0;;) {
    let a = As.exec(r),
      lastIndex = As.lastIndex,
      s = a[1],
      c = a[2] === `]`,
      l = a[3];
    if (c && (s |= 0), l === undefined || l === `[` && lastIndex + 2 === i) {
      js(items, l === undefined ? new Ds(s, e, t) : new Os(s, e, t));
      break;
    }
    {
      let e = items.map[s];
      e === undefined && (e = new ks(s), js(items, e)), items = e;
    }
  }
}
var Ns = class {
  constructor(constructor, constructorValue) {
    this.seq = [], this.map = {};
    let programParameter = constructor.getProgramParameter(constructorValue, constructor.ACTIVE_UNIFORMS);
    for (let r = 0; r < programParameter; ++r) {
      let activeUniform = constructor.getActiveUniform(constructorValue, r);
      Ms(activeUniform, constructor.getUniformLocation(constructorValue, activeUniform.name), this);
    }
    let count = [],
      i = [];
    for (let total of this.seq) total.type === constructor.SAMPLER_2D_SHADOW || total.type === constructor.SAMPLER_CUBE_SHADOW || total.type === constructor.SAMPLER_2D_ARRAY_SHADOW ? count.push(total) : i.push(total);
    count.length > 0 && (this.seq = count.concat(i));
  }
  setValue(value, valueValue, valueInput, r) {
    let i = this.map[valueValue];
    i !== undefined && i.setValue(value, valueInput, r);
  }
  setOptional(optional, optionalValue, optionalInput) {
    let r = optionalValue[optionalInput];
    r !== undefined && this.setValue(optional, optionalInput, r);
  }
  static upload(upload, count, uploadValue, uploadInput) {
    for (let i = 0, a = count.length; i !== a; ++i) {
      let a = count[i],
        o = uploadValue[a.id];
      o.needsUpdate !== false && a.setValue(upload, o.value, uploadInput);
    }
  }
  static seqWithValue(count, withValue) {
    let n = [];
    for (let r = 0, i = count.length; r !== i; ++r) {
      let i = count[r];
      i.id in withValue && n.push(i);
    }
    return n;
  }
};
function Ps(e, t, n) {
  let shader = e.createShader(t);
  return e.shaderSource(shader, n), e.compileShader(shader), shader;
}
var Fs = 37297,
  Is = 0;
function Ls(text, t) {
  let n = text.split(`
`),
    count = [],
    i = Math.max(t - 6, 0),
    a = Math.min(t + 6, n.length);
  for (let e = i; e < a; e++) {
    let i = e + 1;
    count.push(`${i === t ? `>` : ` `} ${i}: ${n[e]}`);
  }
  return count.join(`
`);
}
var Rs = new J();
function zs(e) {
  Y._getMatrix(Rs, Y.workingColorSpace, e);
  let t = `mat3( ${Rs.elements.map(item => item.toFixed(4))} )`;
  switch (Y.getTransfer(e)) {
    case Le:
      return [t, `LinearTransferOETF`];
    case Re:
      return [t, `sRGBTransferOETF`];
    default:
      return U(`WebGLProgram: Unsupported color space: `, e), [t, `LinearTransferOETF`];
  }
}
function Bs(e, t, text) {
  let shaderParameter = e.getShaderParameter(t, e.COMPILE_STATUS),
    trimmed = (e.getShaderInfoLog(t) || ``).trim();
  if (shaderParameter && trimmed === ``) return ``;
  let a = /ERROR: 0:(\d+)/.exec(trimmed);
  if (a) {
    let parseIntResult = parseInt(a[1]);
    return text.toUpperCase() + `

` + trimmed + `

` + Ls(e.getShaderSource(t), parseIntResult);
  }
  return trimmed;
}
function Vs(e, t) {
  let n = zs(t);
  return [`vec4 ${e}( vec4 value ) {`, `	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`, `}`].join(`
`);
}
var Hs = {
  1: `Linear`,
  2: `Reinhard`,
  3: `Cineon`,
  4: `ACESFilmic`,
  6: `AgX`,
  7: `Neutral`,
  5: `Custom`
};
function Us(e, t) {
  let n = Hs[t];
  return n === undefined ? (U(`WebGLProgram: Unsupported toneMapping:`, t), `vec3 ` + e + `( vec3 color ) { return LinearToneMapping( color ); }`) : `vec3 ` + e + `( vec3 color ) { return ` + n + `ToneMapping( color ); }`;
}
var Ws = new q();
function Gs() {
  return Y.getLuminanceCoefficients(Ws), [`float luminance( const in vec3 rgb ) {`, `	const vec3 weights = vec3( ${Ws.x.toFixed(4)}, ${Ws.y.toFixed(4)}, ${Ws.z.toFixed(4)} );`, `	return dot( weights, rgb );`, `}`].join(`
`);
}
function Ks(e) {
  return [e.extensionClipCullDistance ? `#extension GL_ANGLE_clip_cull_distance : require` : ``, e.extensionMultiDraw ? `#extension GL_ANGLE_multi_draw : require` : ``].filter(Ys).join(`
`);
}
function qs(e) {
  let total = [];
  for (let count in e) {
    let r = e[count];
    r !== false && total.push(`#define ` + count + ` ` + r);
  }
  return total.join(`
`);
}
function Js(e, t) {
  let n = {},
    programParameter = e.getProgramParameter(t, e.ACTIVE_ATTRIBUTES);
  for (let i = 0; i < programParameter; i++) {
    let activeAttrib = e.getActiveAttrib(t, i),
      a = activeAttrib.name,
      o = 1;
    activeAttrib.type === e.FLOAT_MAT2 && (o = 2), activeAttrib.type === e.FLOAT_MAT3 && (o = 3), activeAttrib.type === e.FLOAT_MAT4 && (o = 4), n[a] = {
      type: activeAttrib.type,
      location: e.getAttribLocation(t, a),
      locationSize: o
    };
  }
  return n;
}
function Ys(e) {
  return e !== ``;
}
function Xs(e, t) {
  let n = t.numSpotLightShadows + t.numSpotLightMaps - t.numSpotLightShadowsWithMaps;
  return e.replace(/NUM_SUN_LIGHTS/g, t.numSunLights).replace(/NUM_DIR_LIGHTS/g, t.numDirLights).replace(/NUM_SPOT_LIGHTS/g, t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g, t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g, n).replace(/NUM_RECT_AREA_LIGHTS/g, t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g, t.numPointLights).replace(/NUM_HEMI_LIGHTS/g, t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g, t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g, t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g, t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g, t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g, t.numPointLightShadows);
}
function Zs(e, t) {
  return e.replace(/NUM_CLIPPING_PLANES/g, t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g, t.numClippingPlanes - t.numClipIntersection);
}
var Qs = /^[ \t]*#include +<([\w\d./]+)>/gm;
function $s(e) {
  return e.replace(Qs, tc);
}
var ec = new Map();
function tc(e, t) {
  let n = Z[t];
  if (n === undefined) {
    let e = ec.get(t);
    if (e !== undefined) n = Z[e], U(`WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.`, t, e);else throw Error(`THREE.WebGLProgram: Can not resolve #include <` + t + `>`);
  }
  return $s(n);
}
var nc = /#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;
function rc(e) {
  return e.replace(nc, ic);
}
function ic(e, t, n, r) {
  let i = ``;
  for (let parseIntResult = parseInt(t); parseIntResult < parseInt(n); parseIntResult++) i += r.replace(/\[\s*i\s*\]/g, `[ ` + parseIntResult + ` ]`).replace(/UNROLLED_LOOP_INDEX/g, parseIntResult);
  return i;
}
function ac(e) {
  let t = `precision ${e.precision} float;
	precision ${e.precision} int;
	precision ${e.precision} sampler2D;
	precision ${e.precision} samplerCube;
	precision ${e.precision} sampler3D;
	precision ${e.precision} sampler2DArray;
	precision ${e.precision} sampler2DShadow;
	precision ${e.precision} samplerCubeShadow;
	precision ${e.precision} sampler2DArrayShadow;
	precision ${e.precision} isampler2D;
	precision ${e.precision} isampler3D;
	precision ${e.precision} isamplerCube;
	precision ${e.precision} isampler2DArray;
	precision ${e.precision} usampler2D;
	precision ${e.precision} usampler3D;
	precision ${e.precision} usamplerCube;
	precision ${e.precision} usampler2DArray;
	`;
  return e.precision === `highp` ? t += `
#define HIGH_PRECISION` : e.precision === `mediump` ? t += `
#define MEDIUM_PRECISION` : e.precision === `lowp` && (t += `
#define LOW_PRECISION`), t;
}
var oc = {
  1: `SHADOWMAP_TYPE_PCF`,
  3: `SHADOWMAP_TYPE_VSM`
};
function sc(e) {
  return oc[e.shadowMapType] || `SHADOWMAP_TYPE_BASIC`;
}
var cc = {
  301: `ENVMAP_TYPE_CUBE`,
  302: `ENVMAP_TYPE_CUBE`,
  306: `ENVMAP_TYPE_CUBE_UV`
};
function lc(e) {
  return e.envMap === false ? `ENVMAP_TYPE_CUBE` : cc[e.envMapMode] || `ENVMAP_TYPE_CUBE`;
}
var uc = {
  302: `ENVMAP_MODE_REFRACTION`
};
function dc(e) {
  return e.envMap === false ? `ENVMAP_MODE_REFLECTION` : uc[e.envMapMode] || `ENVMAP_MODE_REFLECTION`;
}
var fc = {
  0: `ENVMAP_BLENDING_MULTIPLY`,
  1: `ENVMAP_BLENDING_MIX`,
  2: `ENVMAP_BLENDING_ADD`
};
function pc(e) {
  return e.envMap === false ? `ENVMAP_BLENDING_NONE` : fc[e.combine] || `ENVMAP_BLENDING_NONE`;
}
function mc(e) {
  let envMapCubeUVHeight = e.envMapCubeUVHeight;
  if (envMapCubeUVHeight === null) return null;
  let n = Math.log2(envMapCubeUVHeight) - 2,
    r = 1 / envMapCubeUVHeight;
  return {
    texelWidth: 1 / (3 * Math.max(2 ** n, 112)),
    texelHeight: r,
    maxMip: n
  };
}
function hc(e, t, items, text) {
  let context = e.getContext(),
    defines = items.defines,
    vertexShader = items.vertexShader,
    fragmentShader = items.fragmentShader,
    c = sc(items),
    l = lc(items),
    u = dc(items),
    d = pc(items),
    f = mc(items),
    p = Ks(items),
    m = qs(defines),
    program = context.createProgram(),
    toneMapping,
    _,
    v = items.glslVersion ? `#version ` + items.glslVersion + `
` : ``;
  items.isRawShaderMaterial ? (toneMapping = [`#define SHADER_TYPE ` + items.shaderType, `#define SHADER_NAME ` + items.shaderName, m].filter(Ys).join(`
`), toneMapping.length > 0 && (toneMapping += `
`), _ = [`#define SHADER_TYPE ` + items.shaderType, `#define SHADER_NAME ` + items.shaderName, m].filter(Ys).join(`
`), _.length > 0 && (_ += `
`)) : (toneMapping = [ac(items), `#define SHADER_TYPE ` + items.shaderType, `#define SHADER_NAME ` + items.shaderName, m, items.extensionClipCullDistance ? `#define USE_CLIP_DISTANCE` : ``, items.batching ? `#define USE_BATCHING` : ``, items.batchingColor ? `#define USE_BATCHING_COLOR` : ``, items.instancing ? `#define USE_INSTANCING` : ``, items.instancingColor ? `#define USE_INSTANCING_COLOR` : ``, items.instancingMorph ? `#define USE_INSTANCING_MORPH` : ``, items.useFog && items.fog ? `#define USE_FOG` : ``, items.useFog && items.fogExp2 ? `#define FOG_EXP2` : ``, items.map ? `#define USE_MAP` : ``, items.envMap ? `#define USE_ENVMAP` : ``, items.envMap ? `#define ` + u : ``, items.lightMap ? `#define USE_LIGHTMAP` : ``, items.aoMap ? `#define USE_AOMAP` : ``, items.bumpMap ? `#define USE_BUMPMAP` : ``, items.normalMap ? `#define USE_NORMALMAP` : ``, items.normalMapObjectSpace ? `#define USE_NORMALMAP_OBJECTSPACE` : ``, items.normalMapTangentSpace ? `#define USE_NORMALMAP_TANGENTSPACE` : ``, items.displacementMap ? `#define USE_DISPLACEMENTMAP` : ``, items.emissiveMap ? `#define USE_EMISSIVEMAP` : ``, items.anisotropy ? `#define USE_ANISOTROPY` : ``, items.anisotropyMap ? `#define USE_ANISOTROPYMAP` : ``, items.clearcoatMap ? `#define USE_CLEARCOATMAP` : ``, items.clearcoatRoughnessMap ? `#define USE_CLEARCOAT_ROUGHNESSMAP` : ``, items.clearcoatNormalMap ? `#define USE_CLEARCOAT_NORMALMAP` : ``, items.iridescenceMap ? `#define USE_IRIDESCENCEMAP` : ``, items.iridescenceThicknessMap ? `#define USE_IRIDESCENCE_THICKNESSMAP` : ``, items.specularMap ? `#define USE_SPECULARMAP` : ``, items.specularColorMap ? `#define USE_SPECULAR_COLORMAP` : ``, items.specularIntensityMap ? `#define USE_SPECULAR_INTENSITYMAP` : ``, items.roughnessMap ? `#define USE_ROUGHNESSMAP` : ``, items.metalnessMap ? `#define USE_METALNESSMAP` : ``, items.alphaMap ? `#define USE_ALPHAMAP` : ``, items.alphaHash ? `#define USE_ALPHAHASH` : ``, items.transmission ? `#define USE_TRANSMISSION` : ``, items.transmissionMap ? `#define USE_TRANSMISSIONMAP` : ``, items.thicknessMap ? `#define USE_THICKNESSMAP` : ``, items.sheenColorMap ? `#define USE_SHEEN_COLORMAP` : ``, items.sheenRoughnessMap ? `#define USE_SHEEN_ROUGHNESSMAP` : ``, items.mapUv ? `#define MAP_UV ` + items.mapUv : ``, items.alphaMapUv ? `#define ALPHAMAP_UV ` + items.alphaMapUv : ``, items.lightMapUv ? `#define LIGHTMAP_UV ` + items.lightMapUv : ``, items.aoMapUv ? `#define AOMAP_UV ` + items.aoMapUv : ``, items.emissiveMapUv ? `#define EMISSIVEMAP_UV ` + items.emissiveMapUv : ``, items.bumpMapUv ? `#define BUMPMAP_UV ` + items.bumpMapUv : ``, items.normalMapUv ? `#define NORMALMAP_UV ` + items.normalMapUv : ``, items.displacementMapUv ? `#define DISPLACEMENTMAP_UV ` + items.displacementMapUv : ``, items.metalnessMapUv ? `#define METALNESSMAP_UV ` + items.metalnessMapUv : ``, items.roughnessMapUv ? `#define ROUGHNESSMAP_UV ` + items.roughnessMapUv : ``, items.anisotropyMapUv ? `#define ANISOTROPYMAP_UV ` + items.anisotropyMapUv : ``, items.clearcoatMapUv ? `#define CLEARCOATMAP_UV ` + items.clearcoatMapUv : ``, items.clearcoatNormalMapUv ? `#define CLEARCOAT_NORMALMAP_UV ` + items.clearcoatNormalMapUv : ``, items.clearcoatRoughnessMapUv ? `#define CLEARCOAT_ROUGHNESSMAP_UV ` + items.clearcoatRoughnessMapUv : ``, items.iridescenceMapUv ? `#define IRIDESCENCEMAP_UV ` + items.iridescenceMapUv : ``, items.iridescenceThicknessMapUv ? `#define IRIDESCENCE_THICKNESSMAP_UV ` + items.iridescenceThicknessMapUv : ``, items.sheenColorMapUv ? `#define SHEEN_COLORMAP_UV ` + items.sheenColorMapUv : ``, items.sheenRoughnessMapUv ? `#define SHEEN_ROUGHNESSMAP_UV ` + items.sheenRoughnessMapUv : ``, items.specularMapUv ? `#define SPECULARMAP_UV ` + items.specularMapUv : ``, items.specularColorMapUv ? `#define SPECULAR_COLORMAP_UV ` + items.specularColorMapUv : ``, items.specularIntensityMapUv ? `#define SPECULAR_INTENSITYMAP_UV ` + items.specularIntensityMapUv : ``, items.transmissionMapUv ? `#define TRANSMISSIONMAP_UV ` + items.transmissionMapUv : ``, items.thicknessMapUv ? `#define THICKNESSMAP_UV ` + items.thicknessMapUv : ``, items.vertexTangents && items.flatShading === false ? `#define USE_TANGENT` : ``, items.vertexNormals ? `#define HAS_NORMAL` : ``, items.vertexColors ? `#define USE_COLOR` : ``, items.vertexAlphas ? `#define USE_COLOR_ALPHA` : ``, items.vertexUv1s ? `#define USE_UV1` : ``, items.vertexUv2s ? `#define USE_UV2` : ``, items.vertexUv3s ? `#define USE_UV3` : ``, items.pointsUvs ? `#define USE_POINTS_UV` : ``, items.flatShading ? `#define FLAT_SHADED` : ``, items.skinning ? `#define USE_SKINNING` : ``, items.morphTargets ? `#define USE_MORPHTARGETS` : ``, items.morphNormals && items.flatShading === false ? `#define USE_MORPHNORMALS` : ``, items.morphColors ? `#define USE_MORPHCOLORS` : ``, items.morphTargetsCount > 0 ? `#define MORPHTARGETS_TEXTURE_STRIDE ` + items.morphTextureStride : ``, items.morphTargetsCount > 0 ? `#define MORPHTARGETS_COUNT ` + items.morphTargetsCount : ``, items.doubleSided ? `#define DOUBLE_SIDED` : ``, items.flipSided ? `#define FLIP_SIDED` : ``, items.shadowMapEnabled ? `#define USE_SHADOWMAP` : ``, items.shadowMapEnabled ? `#define ` + c : ``, items.sizeAttenuation ? `#define USE_SIZEATTENUATION` : ``, items.numLightProbes > 0 ? `#define USE_LIGHT_PROBES` : ``, items.logarithmicDepthBuffer ? `#define USE_LOGARITHMIC_DEPTH_BUFFER` : ``, items.reversedDepthBuffer ? `#define USE_REVERSED_DEPTH_BUFFER` : ``, `uniform mat4 modelMatrix;`, `uniform mat4 modelViewMatrix;`, `uniform mat4 projectionMatrix;`, `uniform mat4 viewMatrix;`, `uniform mat3 normalMatrix;`, `uniform vec3 cameraPosition;`, `uniform bool isOrthographic;`, `#ifdef USE_INSTANCING`, `	attribute mat4 instanceMatrix;`, `#endif`, `#ifdef USE_INSTANCING_COLOR`, `	attribute vec3 instanceColor;`, `#endif`, `#ifdef USE_INSTANCING_MORPH`, `	uniform sampler2D morphTexture;`, `#endif`, `attribute vec3 position;`, `attribute vec3 normal;`, `attribute vec2 uv;`, `#ifdef USE_UV1`, `	attribute vec2 uv1;`, `#endif`, `#ifdef USE_UV2`, `	attribute vec2 uv2;`, `#endif`, `#ifdef USE_UV3`, `	attribute vec2 uv3;`, `#endif`, `#ifdef USE_TANGENT`, `	attribute vec4 tangent;`, `#endif`, `#if defined( USE_COLOR_ALPHA )`, `	attribute vec4 color;`, `#elif defined( USE_COLOR )`, `	attribute vec3 color;`, `#endif`, `#ifdef USE_SKINNING`, `	attribute vec4 skinIndex;`, `	attribute vec4 skinWeight;`, `#endif`, `
`].filter(Ys).join(`
`), _ = [ac(items), `#define SHADER_TYPE ` + items.shaderType, `#define SHADER_NAME ` + items.shaderName, m, items.useFog && items.fog ? `#define USE_FOG` : ``, items.useFog && items.fogExp2 ? `#define FOG_EXP2` : ``, items.alphaToCoverage ? `#define ALPHA_TO_COVERAGE` : ``, items.map ? `#define USE_MAP` : ``, items.matcap ? `#define USE_MATCAP` : ``, items.envMap ? `#define USE_ENVMAP` : ``, items.envMap ? `#define ` + l : ``, items.envMap ? `#define ` + u : ``, items.envMap ? `#define ` + d : ``, f ? `#define CUBEUV_TEXEL_WIDTH ` + f.texelWidth : ``, f ? `#define CUBEUV_TEXEL_HEIGHT ` + f.texelHeight : ``, f ? `#define CUBEUV_MAX_MIP ` + f.maxMip + `.0` : ``, items.lightMap ? `#define USE_LIGHTMAP` : ``, items.aoMap ? `#define USE_AOMAP` : ``, items.bumpMap ? `#define USE_BUMPMAP` : ``, items.normalMap ? `#define USE_NORMALMAP` : ``, items.normalMapObjectSpace ? `#define USE_NORMALMAP_OBJECTSPACE` : ``, items.normalMapTangentSpace ? `#define USE_NORMALMAP_TANGENTSPACE` : ``, items.packedNormalMap ? `#define USE_PACKED_NORMALMAP` : ``, items.emissiveMap ? `#define USE_EMISSIVEMAP` : ``, items.anisotropy ? `#define USE_ANISOTROPY` : ``, items.anisotropyMap ? `#define USE_ANISOTROPYMAP` : ``, items.clearcoat ? `#define USE_CLEARCOAT` : ``, items.clearcoatMap ? `#define USE_CLEARCOATMAP` : ``, items.clearcoatRoughnessMap ? `#define USE_CLEARCOAT_ROUGHNESSMAP` : ``, items.clearcoatNormalMap ? `#define USE_CLEARCOAT_NORMALMAP` : ``, items.dispersion ? `#define USE_DISPERSION` : ``, items.retroreflection ? `#define USE_RETROREFLECTION` : ``, items.iridescence ? `#define USE_IRIDESCENCE` : ``, items.iridescenceMap ? `#define USE_IRIDESCENCEMAP` : ``, items.iridescenceThicknessMap ? `#define USE_IRIDESCENCE_THICKNESSMAP` : ``, items.specularMap ? `#define USE_SPECULARMAP` : ``, items.specularColorMap ? `#define USE_SPECULAR_COLORMAP` : ``, items.specularIntensityMap ? `#define USE_SPECULAR_INTENSITYMAP` : ``, items.roughnessMap ? `#define USE_ROUGHNESSMAP` : ``, items.metalnessMap ? `#define USE_METALNESSMAP` : ``, items.alphaMap ? `#define USE_ALPHAMAP` : ``, items.alphaTest ? `#define USE_ALPHATEST` : ``, items.alphaHash ? `#define USE_ALPHAHASH` : ``, items.sheen ? `#define USE_SHEEN` : ``, items.sheenColorMap ? `#define USE_SHEEN_COLORMAP` : ``, items.sheenRoughnessMap ? `#define USE_SHEEN_ROUGHNESSMAP` : ``, items.transmission ? `#define USE_TRANSMISSION` : ``, items.transmissionMap ? `#define USE_TRANSMISSIONMAP` : ``, items.thicknessMap ? `#define USE_THICKNESSMAP` : ``, items.vertexTangents && items.flatShading === false ? `#define USE_TANGENT` : ``, items.vertexColors || items.instancingColor ? `#define USE_COLOR` : ``, items.vertexAlphas || items.batchingColor ? `#define USE_COLOR_ALPHA` : ``, items.vertexUv1s ? `#define USE_UV1` : ``, items.vertexUv2s ? `#define USE_UV2` : ``, items.vertexUv3s ? `#define USE_UV3` : ``, items.pointsUvs ? `#define USE_POINTS_UV` : ``, items.gradientMap ? `#define USE_GRADIENTMAP` : ``, items.flatShading ? `#define FLAT_SHADED` : ``, items.doubleSided ? `#define DOUBLE_SIDED` : ``, items.flipSided ? `#define FLIP_SIDED` : ``, items.shadowMapEnabled ? `#define USE_SHADOWMAP` : ``, items.shadowMapEnabled ? `#define ` + c : ``, items.premultipliedAlpha ? `#define PREMULTIPLIED_ALPHA` : ``, items.numLightProbes > 0 ? `#define USE_LIGHT_PROBES` : ``, items.numLightProbeGrids > 0 ? `#define USE_LIGHT_PROBES_GRID` : ``, items.decodeVideoTexture ? `#define DECODE_VIDEO_TEXTURE` : ``, items.decodeVideoTextureEmissive ? `#define DECODE_VIDEO_TEXTURE_EMISSIVE` : ``, items.logarithmicDepthBuffer ? `#define USE_LOGARITHMIC_DEPTH_BUFFER` : ``, items.reversedDepthBuffer ? `#define USE_REVERSED_DEPTH_BUFFER` : ``, `uniform mat4 viewMatrix;`, `uniform vec3 cameraPosition;`, `uniform bool isOrthographic;`, items.toneMapping === 0 ? `` : `#define TONE_MAPPING`, items.toneMapping === 0 ? `` : Z.tonemapping_pars_fragment, items.toneMapping === 0 ? `` : Us(`toneMapping`, items.toneMapping), items.dithering ? `#define DITHERING` : ``, items.opaque ? `#define OPAQUE` : ``, Z.colorspace_pars_fragment, Vs(`linearToOutputTexel`, items.outputColorSpace), Gs(), items.useDepthPacking ? `#define DEPTH_PACKING ` + items.depthPacking : ``, `
`].filter(Ys).join(`
`)), vertexShader = $s(vertexShader), vertexShader = Xs(vertexShader, items), vertexShader = Zs(vertexShader, items), fragmentShader = $s(fragmentShader), fragmentShader = Xs(fragmentShader, items), fragmentShader = Zs(fragmentShader, items), vertexShader = rc(vertexShader), fragmentShader = rc(fragmentShader), items.isRawShaderMaterial !== true && (v = `#version 300 es
`, toneMapping = [p, `#define attribute in`, `#define varying out`, `#define texture2D texture`].join(`
`) + `
` + toneMapping, _ = [`#define varying in`, items.glslVersion === `300 es` ? `` : `layout(location = 0) out highp vec4 pc_fragColor;`, items.glslVersion === `300 es` ? `` : `#define gl_FragColor pc_fragColor`, `#define gl_FragDepthEXT gl_FragDepth`, `#define texture2D texture`, `#define textureCube texture`, `#define texture2DProj textureProj`, `#define texture2DLodEXT textureLod`, `#define texture2DProjLodEXT textureProjLod`, `#define textureCubeLodEXT textureLod`, `#define texture2DGradEXT textureGrad`, `#define texture2DProjGradEXT textureProjGrad`, `#define textureCubeGradEXT textureGrad`].join(`
`) + `
` + _);
  let y = v + toneMapping + vertexShader,
    b = v + _ + fragmentShader,
    x = Ps(context, context.VERTEX_SHADER, y),
    S = Ps(context, context.FRAGMENT_SHADER, b);
  context.attachShader(program, x), context.attachShader(program, S), items.index0AttributeName === undefined ? items.hasPositionAttribute === true && context.bindAttribLocation(program, 0, `position`) : context.bindAttribLocation(program, 0, items.index0AttributeName), context.linkProgram(program);
  function C(t) {
    if (e.debug.checkShaderErrors) {
      let fallbackValue = context.getProgramInfoLog(program) || ``,
        r = context.getShaderInfoLog(x) || ``,
        a = context.getShaderInfoLog(S) || ``,
        trimmed = fallbackValue.trim(),
        s = r.trim(),
        c = a.trim(),
        l = true,
        u = true;
      if (context.getProgramParameter(program, context.LINK_STATUS) === false) {
        if (l = false, typeof e.debug.onShaderError == `function`) e.debug.onShaderError(context, program, x, S);else {
          let e = Bs(context, x, `vertex`),
            n = Bs(context, S, `fragment`);
          W(`WebGLProgram: Shader Error ` + context.getError() + ` - VALIDATE_STATUS ` + context.getProgramParameter(program, context.VALIDATE_STATUS) + `

Material Name: ` + t.name + `
Material Type: ` + t.type + `

Program Info Log: ` + trimmed + `
` + e + `
` + n);
        }
      } else trimmed === `` ? (s === `` || c === ``) && (u = false) : U(`WebGLProgram: Program Info Log:`, trimmed);
      u && (t.diagnostics = {
        runnable: l,
        programLog: trimmed,
        vertexShader: {
          log: s,
          prefix: toneMapping
        },
        fragmentShader: {
          log: c,
          prefix: _
        }
      });
    }
    context.deleteShader(x), context.deleteShader(S), flag = new Ns(context, program), count = Js(context, program);
  }
  let flag;
  this.getUniforms = function () {
    return flag === undefined && C(this), flag;
  };
  let count;
  this.getAttributes = function () {
    return count === undefined && C(this), count;
  };
  let E = items.rendererExtensionParallelShaderCompile === false;
  return this.isReady = function () {
    return E === false && (E = context.getProgramParameter(program, Fs)), E;
  }, this.destroy = function () {
    text.releaseStatesOfProgram(this), context.deleteProgram(program), this.program = undefined;
  }, this.type = items.shaderType, this.name = items.shaderName, this.id = Is++, this.cacheKey = t, this.usedTimes = 1, this.program = program, this.vertexShader = x, this.fragmentShader = S, this;
}
var gc = 0,
  _c = class {
    constructor() {
      this.shaderCache = new Map(), this.materialCache = new Map();
    }
    update(update, updateValue, updateInput) {
      let r = this._getShaderCacheForMaterial(update);
      return r.has(updateValue) === false && (r.add(updateValue), updateValue.usedTimes++), r.has(updateInput) === false && (r.add(updateInput), updateInput.usedTimes++), this;
    }
    remove(event) {
      let t = this.materialCache.get(event);
      for (let ratio of t) ratio.usedTimes--, ratio.usedTimes === 0 && this.shaderCache.delete(ratio.code);
      return this.materialCache.delete(event), this;
    }
    getVertexShaderStage(vertex) {
      return this._getShaderStage(vertex.vertexShader);
    }
    getFragmentShaderStage(fragment) {
      return this._getShaderStage(fragment.fragmentShader);
    }
    dispose() {
      this.shaderCache.clear(), this.materialCache.clear();
    }
    _getShaderCacheForMaterial(e) {
      let materialCache = this.materialCache,
        n = materialCache.get(e);
      return n === undefined && (n = new Set(), materialCache.set(e, n)), n;
    }
    _getShaderStage(e) {
      let shaderCache = this.shaderCache,
        n = shaderCache.get(e);
      return n === undefined && (n = new vc(e), shaderCache.set(e, n)), n;
    }
  },
  vc = class {
    constructor(constructor) {
      this.id = gc++, this.code = constructor, this.usedTimes = 0;
    }
  };
function yc(e) {
  return e === 1030 || e === 37490 || e === 36285;
}
function bc(items, t, n, r, i, a) {
  let o = new on(),
    s = new _c(),
    c = new Set(),
    total = [],
    u = new Map(),
    logarithmicDepthBuffer = r.logarithmicDepthBuffer,
    precision = r.precision,
    p = {
      MeshDepthMaterial: `depth`,
      MeshDistanceMaterial: `distance`,
      MeshNormalMaterial: `normal`,
      MeshBasicMaterial: `basic`,
      MeshLambertMaterial: `lambert`,
      MeshPhongMaterial: `phong`,
      MeshToonMaterial: `toon`,
      MeshStandardMaterial: `physical`,
      MeshPhysicalMaterial: `physical`,
      MeshMatcapMaterial: `matcap`,
      LineBasicMaterial: `basic`,
      LineDashedMaterial: `dashed`,
      PointsMaterial: `points`,
      ShadowMaterial: `shadow`,
      SpriteMaterial: `sprite`
    };
  function m(e) {
    return c.add(e), e === 0 ? `uv` : `uv${e}`;
  }
  function h(i, o, count, u, h, g) {
    let _ = u.fog,
      geometry = h.geometry,
      y = i.isMeshStandardMaterial || i.isMeshLambertMaterial || i.isMeshPhongMaterial ? u.environment : null,
      fallbackValue = i.isMeshStandardMaterial || i.isMeshLambertMaterial && !i.envMap || i.isMeshPhongMaterial && !i.envMap,
      x = t.get(i.envMap || y, fallbackValue),
      S = x && x.mapping === 306 ? x.image.height : null,
      C = p[i.type];
    i.precision !== null && (precision = r.getMaxPrecision(i.precision), precision !== i.precision && U(`WebGLProgram.getParameters:`, i.precision, `not supported, using`, precision, `instead.`));
    let w = geometry.morphAttributes.position || geometry.morphAttributes.normal || geometry.morphAttributes.color,
      T = w === undefined ? 0 : w.length,
      E = 0;
    geometry.morphAttributes.position !== undefined && (E = 1), geometry.morphAttributes.normal !== undefined && (E = 2), geometry.morphAttributes.color !== undefined && (E = 3);
    let vertexShader, fragmentShader, k, A;
    if (C) {
      let e = Ba[C];
      vertexShader = e.vertexShader, fragmentShader = e.fragmentShader;
    } else {
      vertexShader = i.vertexShader, fragmentShader = i.fragmentShader;
      let vertexShaderStage = s.getVertexShaderStage(i),
        fragmentShaderStage = s.getFragmentShaderStage(i);
      s.update(i, vertexShaderStage, fragmentShaderStage), k = vertexShaderStage.id, A = fragmentShaderStage.id;
    }
    let renderTarget = items.getRenderTarget(),
      reversed = items.state.buffers.depth.getReversed(),
      te = h.isInstancedMesh === true,
      M = h.isBatchedMesh === true,
      N = !!i.map,
      P = !!i.matcap,
      ne = !!x,
      F = !!i.aoMap,
      re = !!i.lightMap,
      ie = !!i.bumpMap && i.wireframe === false,
      ae = !!i.normalMap,
      oe = !!i.displacementMap,
      se = !!i.emissiveMap,
      I = !!i.metalnessMap,
      L = !!i.roughnessMap,
      ce = i.anisotropy > 0,
      le = i.clearcoat > 0,
      ue = i.dispersion > 0,
      de = i.retroreflectivity > 0,
      fe = i.iridescence > 0,
      pe = i.sheen > 0,
      me = i.transmission > 0,
      he = ce && !!i.anisotropyMap,
      ge = le && !!i.clearcoatMap,
      _e = le && !!i.clearcoatNormalMap,
      ve = le && !!i.clearcoatRoughnessMap,
      ye = fe && !!i.iridescenceMap,
      be = fe && !!i.iridescenceThicknessMap,
      xe = pe && !!i.sheenColorMap,
      Se = pe && !!i.sheenRoughnessMap,
      Ce = !!i.specularMap,
      we = !!i.specularColorMap,
      Te = !!i.specularIntensityMap,
      Ee = me && !!i.transmissionMap,
      De = me && !!i.thicknessMap,
      Oe = !!i.gradientMap,
      ke = !!i.alphaMap,
      Ae = i.alphaTest > 0,
      R = !!i.alphaHash,
      je = !!i.extensions,
      z = 0;
    i.toneMapped && (renderTarget === null || renderTarget.isXRRenderTarget === true) && (z = items.toneMapping);
    let Me = {
      shaderID: C,
      shaderType: i.type,
      shaderName: i.name,
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      defines: i.defines,
      customVertexShaderID: k,
      customFragmentShaderID: A,
      isRawShaderMaterial: i.isRawShaderMaterial === true,
      glslVersion: i.glslVersion,
      precision: precision,
      batching: M,
      batchingColor: M && h._colorsTexture !== null,
      instancing: te,
      instancingColor: te && h.instanceColor !== null,
      instancingMorph: te && h.morphTexture !== null,
      outputColorSpace: renderTarget === null ? items.outputColorSpace : renderTarget.isXRRenderTarget === true ? renderTarget.texture.colorSpace : Y.workingColorSpace,
      alphaToCoverage: !!i.alphaToCoverage,
      map: N,
      matcap: P,
      envMap: ne,
      envMapMode: ne && x.mapping,
      envMapCubeUVHeight: S,
      aoMap: F,
      lightMap: re,
      bumpMap: ie,
      normalMap: ae,
      displacementMap: oe,
      emissiveMap: se,
      normalMapObjectSpace: ae && i.normalMapType === 1,
      normalMapTangentSpace: ae && i.normalMapType === 0,
      packedNormalMap: ae && i.normalMapType === 0 && yc(i.normalMap.format),
      metalnessMap: I,
      roughnessMap: L,
      anisotropy: ce,
      anisotropyMap: he,
      clearcoat: le,
      clearcoatMap: ge,
      clearcoatNormalMap: _e,
      clearcoatRoughnessMap: ve,
      dispersion: ue,
      retroreflection: de,
      iridescence: fe,
      iridescenceMap: ye,
      iridescenceThicknessMap: be,
      sheen: pe,
      sheenColorMap: xe,
      sheenRoughnessMap: Se,
      specularMap: Ce,
      specularColorMap: we,
      specularIntensityMap: Te,
      transmission: me,
      transmissionMap: Ee,
      thicknessMap: De,
      gradientMap: Oe,
      opaque: i.transparent === false && i.blending === 1 && i.alphaToCoverage === false,
      alphaMap: ke,
      alphaTest: Ae,
      alphaHash: R,
      combine: i.combine,
      mapUv: N && m(i.map.channel),
      aoMapUv: F && m(i.aoMap.channel),
      lightMapUv: re && m(i.lightMap.channel),
      bumpMapUv: ie && m(i.bumpMap.channel),
      normalMapUv: ae && m(i.normalMap.channel),
      displacementMapUv: oe && m(i.displacementMap.channel),
      emissiveMapUv: se && m(i.emissiveMap.channel),
      metalnessMapUv: I && m(i.metalnessMap.channel),
      roughnessMapUv: L && m(i.roughnessMap.channel),
      anisotropyMapUv: he && m(i.anisotropyMap.channel),
      clearcoatMapUv: ge && m(i.clearcoatMap.channel),
      clearcoatNormalMapUv: _e && m(i.clearcoatNormalMap.channel),
      clearcoatRoughnessMapUv: ve && m(i.clearcoatRoughnessMap.channel),
      iridescenceMapUv: ye && m(i.iridescenceMap.channel),
      iridescenceThicknessMapUv: be && m(i.iridescenceThicknessMap.channel),
      sheenColorMapUv: xe && m(i.sheenColorMap.channel),
      sheenRoughnessMapUv: Se && m(i.sheenRoughnessMap.channel),
      specularMapUv: Ce && m(i.specularMap.channel),
      specularColorMapUv: we && m(i.specularColorMap.channel),
      specularIntensityMapUv: Te && m(i.specularIntensityMap.channel),
      transmissionMapUv: Ee && m(i.transmissionMap.channel),
      thicknessMapUv: De && m(i.thicknessMap.channel),
      alphaMapUv: ke && m(i.alphaMap.channel),
      vertexTangents: !!geometry.attributes.tangent && (ae || ce),
      vertexNormals: !!geometry.attributes.normal,
      vertexColors: i.vertexColors,
      vertexAlphas: i.vertexColors === true && !!geometry.attributes.color && geometry.attributes.color.itemSize === 4,
      pointsUvs: h.isPoints === true && !!geometry.attributes.uv && (N || ke),
      fog: !!_,
      useFog: i.fog === true,
      fogExp2: !!_ && _.isFogExp2,
      flatShading: i.wireframe === false && (i.flatShading === true || geometry.attributes.normal === undefined && ae === false && (i.isMeshLambertMaterial || i.isMeshPhongMaterial || i.isMeshStandardMaterial || i.isMeshPhysicalMaterial)),
      sizeAttenuation: i.sizeAttenuation === true,
      logarithmicDepthBuffer: logarithmicDepthBuffer,
      reversedDepthBuffer: reversed,
      skinning: h.isSkinnedMesh === true,
      hasPositionAttribute: geometry.attributes.position !== undefined,
      morphTargets: geometry.morphAttributes.position !== undefined,
      morphNormals: geometry.morphAttributes.normal !== undefined,
      morphColors: geometry.morphAttributes.color !== undefined,
      morphTargetsCount: T,
      morphTextureStride: E,
      numSunLights: o.sun.length,
      numDirLights: o.directional.length,
      numPointLights: o.point.length,
      numSpotLights: o.spot.length,
      numSpotLightMaps: o.spotLightMap.length,
      numRectAreaLights: o.rectArea.length,
      numHemiLights: o.hemi.length,
      numSunLightShadows: o.sunShadowMap.length,
      numDirLightShadows: o.directionalShadowMap.length,
      numPointLightShadows: o.pointShadowMap.length,
      numSpotLightShadows: o.spotShadowMap.length,
      numSpotLightShadowsWithMaps: o.numSpotLightShadowsWithMaps,
      numLightProbes: o.numLightProbes,
      numLightProbeGrids: g.length,
      numClippingPlanes: a.numPlanes,
      numClipIntersection: a.numIntersection,
      dithering: i.dithering,
      shadowMapEnabled: items.shadowMap.enabled && count.length > 0,
      shadowMapType: items.shadowMap.type,
      toneMapping: z,
      decodeVideoTexture: N && i.map.isVideoTexture === true && Y.getTransfer(i.map.colorSpace) === `srgb`,
      decodeVideoTextureEmissive: se && i.emissiveMap.isVideoTexture === true && Y.getTransfer(i.emissiveMap.colorSpace) === `srgb`,
      premultipliedAlpha: i.premultipliedAlpha,
      doubleSided: i.side === 2,
      flipSided: i.side === 1,
      useDepthPacking: i.depthPacking >= 0,
      depthPacking: i.depthPacking || 0,
      index0AttributeName: i.index0AttributeName,
      extensionClipCullDistance: je && i.extensions.clipCullDistance === true && n.has(`WEBGL_clip_cull_distance`),
      extensionMultiDraw: (je && i.extensions.multiDraw === true || M) && n.has(`WEBGL_multi_draw`),
      rendererExtensionParallelShaderCompile: n.has(`KHR_parallel_shader_compile`),
      customProgramCacheKey: i.customProgramCacheKey()
    };
    return Me.vertexUv1s = c.has(1), Me.vertexUv2s = c.has(2), Me.vertexUv3s = c.has(3), c.clear(), Me;
  }
  function g(t) {
    let count = [];
    if (t.shaderID ? count.push(t.shaderID) : (count.push(t.customVertexShaderID), count.push(t.customFragmentShaderID)), t.defines !== undefined) for (let ratio in t.defines) count.push(ratio), count.push(t.defines[ratio]);
    return t.isRawShaderMaterial === false && (_(count, t), v(count, t), count.push(items.outputColorSpace)), count.push(t.customProgramCacheKey), count.join();
  }
  function _(e, t) {
    e.push(t.precision), e.push(t.outputColorSpace), e.push(t.envMapMode), e.push(t.envMapCubeUVHeight), e.push(t.mapUv), e.push(t.alphaMapUv), e.push(t.lightMapUv), e.push(t.aoMapUv), e.push(t.bumpMapUv), e.push(t.normalMapUv), e.push(t.displacementMapUv), e.push(t.emissiveMapUv), e.push(t.metalnessMapUv), e.push(t.roughnessMapUv), e.push(t.anisotropyMapUv), e.push(t.clearcoatMapUv), e.push(t.clearcoatNormalMapUv), e.push(t.clearcoatRoughnessMapUv), e.push(t.iridescenceMapUv), e.push(t.iridescenceThicknessMapUv), e.push(t.sheenColorMapUv), e.push(t.sheenRoughnessMapUv), e.push(t.specularMapUv), e.push(t.specularColorMapUv), e.push(t.specularIntensityMapUv), e.push(t.transmissionMapUv), e.push(t.thicknessMapUv), e.push(t.combine), e.push(t.fogExp2), e.push(t.sizeAttenuation), e.push(t.morphTargetsCount), e.push(t.morphAttributeCount), e.push(t.numSunLights), e.push(t.numDirLights), e.push(t.numPointLights), e.push(t.numSpotLights), e.push(t.numSpotLightMaps), e.push(t.numHemiLights), e.push(t.numRectAreaLights), e.push(t.numSunLightShadows), e.push(t.numDirLightShadows), e.push(t.numPointLightShadows), e.push(t.numSpotLightShadows), e.push(t.numSpotLightShadowsWithMaps), e.push(t.numLightProbes), e.push(t.shadowMapType), e.push(t.toneMapping), e.push(t.numClippingPlanes), e.push(t.numClipIntersection), e.push(t.depthPacking);
  }
  function v(e, t) {
    o.disableAll(), t.instancing && o.enable(0), t.instancingColor && o.enable(1), t.instancingMorph && o.enable(2), t.matcap && o.enable(3), t.envMap && o.enable(4), t.normalMapObjectSpace && o.enable(5), t.normalMapTangentSpace && o.enable(6), t.clearcoat && o.enable(7), t.iridescence && o.enable(8), t.alphaTest && o.enable(9), t.vertexColors && o.enable(10), t.vertexAlphas && o.enable(11), t.vertexUv1s && o.enable(12), t.vertexUv2s && o.enable(13), t.vertexUv3s && o.enable(14), t.vertexTangents && o.enable(15), t.anisotropy && o.enable(16), t.alphaHash && o.enable(17), t.batching && o.enable(18), t.dispersion && o.enable(19), t.retroreflection && o.enable(24), t.batchingColor && o.enable(20), t.gradientMap && o.enable(21), t.packedNormalMap && o.enable(22), t.vertexNormals && o.enable(23), e.push(o.mask), o.disableAll(), t.fog && o.enable(0), t.useFog && o.enable(1), t.flatShading && o.enable(2), t.logarithmicDepthBuffer && o.enable(3), t.reversedDepthBuffer && o.enable(4), t.skinning && o.enable(5), t.morphTargets && o.enable(6), t.morphNormals && o.enable(7), t.morphColors && o.enable(8), t.premultipliedAlpha && o.enable(9), t.shadowMapEnabled && o.enable(10), t.doubleSided && o.enable(11), t.flipSided && o.enable(12), t.useDepthPacking && o.enable(13), t.dithering && o.enable(14), t.transmission && o.enable(15), t.sheen && o.enable(16), t.opaque && o.enable(17), t.pointsUvs && o.enable(18), t.decodeVideoTexture && o.enable(19), t.decodeVideoTextureEmissive && o.enable(20), t.alphaToCoverage && o.enable(21), t.numLightProbeGrids > 0 && o.enable(22), t.hasPositionAttribute && o.enable(23), e.push(o.mask);
  }
  function y(e) {
    let t = p[e.type],
      count;
    if (t) {
      let e = Ba[t];
      count = wi.clone(e.uniforms);
    } else count = e.uniforms;
    return count;
  }
  function b(t, n) {
    let r = u.get(n);
    return r === undefined ? (r = new hc(items, n, t, i), total.push(r), u.set(n, r)) : ++r.usedTimes, r;
  }
  function x(e) {
    if (--e.usedTimes === 0) {
      let t = total.indexOf(e);
      total[t] = total[total.length - 1], total.pop(), u.delete(e.cacheKey), e.destroy();
    }
  }
  function S(e) {
    s.remove(e);
  }
  function C() {
    s.dispose();
  }
  return {
    getParameters: h,
    getProgramCacheKey: g,
    getUniforms: y,
    acquireProgram: b,
    releaseProgram: x,
    releaseShaderCache: S,
    programs: total,
    dispose: C
  };
}
function xc() {
  let weakMap = new WeakMap();
  function t(t) {
    return weakMap.has(t);
  }
  function n(t) {
    let n = weakMap.get(t);
    return n === undefined && (n = {}, weakMap.set(t, n)), n;
  }
  function r(t) {
    weakMap.delete(t);
  }
  function i(t, n, r) {
    weakMap.get(t)[n] = r;
  }
  function a() {
    weakMap = new WeakMap();
  }
  return {
    has: t,
    get: n,
    remove: r,
    update: i,
    dispose: a
  };
}
function Sc(e, t) {
  return e.groupOrder === t.groupOrder ? e.renderOrder === t.renderOrder ? e.material.id === t.material.id ? e.materialVariant === t.materialVariant ? e.z === t.z ? e.id - t.id : e.z - t.z : e.materialVariant - t.materialVariant : e.material.id - t.material.id : e.renderOrder - t.renderOrder : e.groupOrder - t.groupOrder;
}
function Cc(e, t) {
  return e.groupOrder === t.groupOrder ? e.renderOrder === t.renderOrder ? e.z === t.z ? e.id - t.id : t.z - e.z : e.renderOrder - t.renderOrder : e.groupOrder - t.groupOrder;
}
function wc() {
  let ratio = [],
    t = 0,
    count = [],
    r = [],
    i = [];
  function a() {
    t = 0, count.length = 0, r.length = 0, i.length = 0;
  }
  function o(e) {
    let t = 0;
    return e.isInstancedMesh && (t += 2), e.isSkinnedMesh && (t += 1), t;
  }
  function s(n, r, i, a, s, c) {
    let l = ratio[t];
    return l === undefined ? (l = {
      id: n.id,
      object: n,
      geometry: r,
      material: i,
      materialVariant: o(n),
      groupOrder: a,
      renderOrder: n.renderOrder,
      z: s,
      group: c
    }, ratio[t] = l) : (l.id = n.id, l.object = n, l.geometry = r, l.material = i, l.materialVariant = o(n), l.groupOrder = a, l.renderOrder = n.renderOrder, l.z = s, l.group = c), t++, l;
  }
  function c(e, t, a, o, c, l, u) {
    u.reversedDepth === true && (c = -c);
    let d = s(e, t, a, o, c, l);
    a.transmission > 0 ? r.push(d) : a.transparent === true ? i.push(d) : count.push(d);
  }
  function l(e, t, a, o, c, l) {
    let u = s(e, t, a, o, c, l);
    a.transmission > 0 ? r.unshift(u) : a.transparent === true ? i.unshift(u) : count.unshift(u);
  }
  function u(e, t) {
    count.length > 1 && count.sort(e || Sc), r.length > 1 && r.sort(t || Cc), i.length > 1 && i.sort(t || Cc);
  }
  function d() {
    for (let n = t, r = ratio.length; n < r; n++) {
      let t = ratio[n];
      if (t.id === null) break;
      t.id = null, t.object = null, t.geometry = null, t.material = null, t.group = null;
    }
  }
  return {
    opaque: count,
    transmissive: r,
    transparent: i,
    init: a,
    push: c,
    unshift: l,
    finish: d,
    sort: u
  };
}
function Tc() {
  let weakMap = new WeakMap();
  function t(t, n) {
    let r = weakMap.get(t),
      count;
    return r === undefined ? (count = new wc(), weakMap.set(t, [count])) : n >= r.length ? (count = new wc(), r.push(count)) : count = r[n], count;
  }
  function n() {
    weakMap = new WeakMap();
  }
  return {
    get: t,
    dispose: n
  };
}
function Ec() {
  let e = {};
  return {
    get: function (t) {
      if (e[t.id] !== undefined) return e[t.id];
      let count;
      switch (t.type) {
        case `SunLight`:
        case `DirectionalLight`:
          count = {
            direction: new q(),
            color: new X()
          };
          break;
        case `SpotLight`:
          count = {
            position: new q(),
            direction: new q(),
            color: new X(),
            distance: 0,
            coneCos: 0,
            penumbraCos: 0,
            decay: 0
          };
          break;
        case `PointLight`:
          count = {
            position: new q(),
            color: new X(),
            distance: 0,
            decay: 0
          };
          break;
        case `HemisphereLight`:
          count = {
            direction: new q(),
            skyColor: new X(),
            groundColor: new X()
          };
          break;
        case `RectAreaLight`:
          count = {
            color: new X(),
            position: new q(),
            halfWidth: new q(),
            halfHeight: new q()
          };
      }
      return e[t.id] = count, count;
    }
  };
}
function Dc() {
  let e = {};
  return {
    get: function (t) {
      if (e[t.id] !== undefined) return e[t.id];
      let count;
      switch (t.type) {
        case `SunLight`:
        case `DirectionalLight`:
          count = {
            shadowIntensity: 1,
            shadowBias: 0,
            shadowNormalBias: 0,
            shadowRadius: 1,
            shadowMapSize: new K()
          };
          break;
        case `SpotLight`:
          count = {
            shadowIntensity: 1,
            shadowBias: 0,
            shadowNormalBias: 0,
            shadowRadius: 1,
            shadowMapSize: new K()
          };
          break;
        case `PointLight`:
          count = {
            shadowIntensity: 1,
            shadowBias: 0,
            shadowNormalBias: 0,
            shadowRadius: 1,
            shadowMapSize: new K(),
            shadowCameraNear: 1,
            shadowCameraFar: 1e3
          };
      }
      return e[t.id] = count, count;
    }
  };
}
var Oc = 0;
function kc(items, t) {
  return (t.castShadow ? 2 : 0) - (items.castShadow ? 2 : 0) + +!!t.map - !!items.map;
}
function Ac(count) {
  let t = new Ec(),
    n = Dc(),
    r = {
      version: 0,
      hash: {
        sunLength: -1,
        directionalLength: -1,
        pointLength: -1,
        spotLength: -1,
        rectAreaLength: -1,
        hemiLength: -1,
        numSunShadows: -1,
        numDirectionalShadows: -1,
        numPointShadows: -1,
        numSpotShadows: -1,
        numSpotMaps: -1,
        numLightProbes: -1
      },
      ambient: [0, 0, 0],
      probe: [],
      sun: [],
      sunShadow: [],
      sunShadowMap: [],
      sunShadowMatrix: [],
      sunShadowCascade: [],
      directional: [],
      directionalShadow: [],
      directionalShadowMap: [],
      directionalShadowMatrix: [],
      spot: [],
      spotLightMap: [],
      spotShadow: [],
      spotShadowMap: [],
      spotLightMatrix: [],
      rectArea: [],
      rectAreaLTC1: null,
      rectAreaLTC2: null,
      point: [],
      pointShadow: [],
      pointShadowMap: [],
      pointShadowMatrix: [],
      hemi: [],
      numSpotLightShadowsWithMaps: 0,
      numLightProbes: 0
    };
  for (let e = 0; e < 9; e++) r.probe.push(new q());
  let i = new q(),
    a = new Jt(),
    o = new Jt();
  function s(i) {
    let a = 0,
      o = 0,
      s = 0;
    for (let e = 0; e < 9; e++) r.probe[e].set(0, 0, 0);
    let c = 0,
      l = 0,
      u = 0,
      d = 0,
      f = 0,
      p = 0,
      m = 0,
      h = 0,
      g = 0,
      _ = 0,
      v = 0,
      y = 0,
      b = 0,
      x = 0;
    i.sort(kc);
    for (let e = 0, S = i.length; e < S; e++) {
      let S = i[e],
        color = S.color,
        intensity = S.intensity,
        distance = S.distance,
        E = null;
      if (S.shadow && S.shadow.map && (E = S.shadow.map.texture.format === 1030 ? S.shadow.map.texture : S.shadow.map.depthTexture || S.shadow.map.texture), S.isAmbientLight) a += color.r * intensity, o += color.g * intensity, s += color.b * intensity;else if (S.isLightProbe) {
        for (let e = 0; e < 9; e++) r.probe[e].addScaledVector(S.sh.coefficients[e], intensity);
        x++;
      } else if (S.isSunLight) {
        let e = t.get(S);
        if (e.color.copy(S.color).multiplyScalar(S.intensity), S.castShadow) {
          let shadow = S.shadow,
            t = n.get(S);
          t.shadowIntensity = shadow.intensity, t.shadowBias = shadow.bias, t.shadowNormalBias = shadow.normalBias, t.shadowRadius = shadow.radius, t.shadowMapSize.copy(shadow.mapSize).multiply(shadow.getFrameExtents()), r.sunShadow[l] = t, r.sunShadowMap[l] = E;
          let viewportCount = shadow.getViewportCount();
          for (let t = 0; t < viewportCount; t++) r.sunShadowMatrix[u + t] = shadow.getMatrix(t), r.sunShadowCascade[u + t] = shadow._cascadeData[t];
          u += viewportCount, l++;
        }
        r.sun[c] = e, c++;
      } else if (S.isDirectionalLight) {
        let e = t.get(S);
        if (e.color.copy(S.color).multiplyScalar(S.intensity), S.castShadow) {
          let shadow = S.shadow,
            t = n.get(S);
          t.shadowIntensity = shadow.intensity, t.shadowBias = shadow.bias, t.shadowNormalBias = shadow.normalBias, t.shadowRadius = shadow.radius, t.shadowMapSize = shadow.mapSize, r.directionalShadow[d] = t, r.directionalShadowMap[d] = E, r.directionalShadowMatrix[d] = S.shadow.matrix, g++;
        }
        r.directional[d] = e, d++;
      } else if (S.isSpotLight) {
        let e = t.get(S);
        e.position.setFromMatrixPosition(S.matrixWorld), e.color.copy(color).multiplyScalar(intensity), e.distance = distance, e.coneCos = Math.cos(S.angle), e.penumbraCos = Math.cos(S.angle * (1 - S.penumbra)), e.decay = S.decay, r.spot[p] = e;
        let shadow = S.shadow;
        if (S.map && (r.spotLightMap[y] = S.map, y++, shadow.updateMatrices(S), S.castShadow && b++), r.spotLightMatrix[p] = shadow.matrix, S.castShadow) {
          let e = n.get(S);
          e.shadowIntensity = shadow.intensity, e.shadowBias = shadow.bias, e.shadowNormalBias = shadow.normalBias, e.shadowRadius = shadow.radius, e.shadowMapSize = shadow.mapSize, r.spotShadow[p] = e, r.spotShadowMap[p] = E, v++;
        }
        p++;
      } else if (S.isRectAreaLight) {
        let e = t.get(S);
        e.color.copy(color).multiplyScalar(intensity), e.halfWidth.set(S.width * .5, 0, 0), e.halfHeight.set(0, S.height * .5, 0), r.rectArea[m] = e, m++;
      } else if (S.isPointLight) {
        let e = t.get(S);
        if (e.color.copy(S.color).multiplyScalar(S.intensity), e.distance = S.distance, e.decay = S.decay, S.castShadow) {
          let shadow = S.shadow,
            t = n.get(S);
          t.shadowIntensity = shadow.intensity, t.shadowBias = shadow.bias, t.shadowNormalBias = shadow.normalBias, t.shadowRadius = shadow.radius, t.shadowMapSize = shadow.mapSize, t.shadowCameraNear = shadow.camera.near, t.shadowCameraFar = shadow.camera.far, r.pointShadow[f] = t, r.pointShadowMap[f] = E, r.pointShadowMatrix[f] = S.shadow.matrix, _++;
        }
        r.point[f] = e, f++;
      } else if (S.isHemisphereLight) {
        let e = t.get(S);
        e.skyColor.copy(S.color).multiplyScalar(intensity), e.groundColor.copy(S.groundColor).multiplyScalar(intensity), r.hemi[h] = e, h++;
      }
    }
    m > 0 && (count.has(`OES_texture_float_linear`) === true ? (r.rectAreaLTC1 = Q.LTC_FLOAT_1, r.rectAreaLTC2 = Q.LTC_FLOAT_2) : (r.rectAreaLTC1 = Q.LTC_HALF_1, r.rectAreaLTC2 = Q.LTC_HALF_2)), r.ambient[0] = a, r.ambient[1] = o, r.ambient[2] = s;
    let hash = r.hash;
    (hash.sunLength !== c || hash.directionalLength !== d || hash.pointLength !== f || hash.spotLength !== p || hash.rectAreaLength !== m || hash.hemiLength !== h || hash.numSunShadows !== l || hash.numDirectionalShadows !== g || hash.numPointShadows !== _ || hash.numSpotShadows !== v || hash.numSpotMaps !== y || hash.numLightProbes !== x) && (r.sun.length = c, r.directional.length = d, r.spot.length = p, r.rectArea.length = m, r.point.length = f, r.hemi.length = h, r.sunShadow.length = l, r.sunShadowMap.length = l, r.sunShadowMatrix.length = u, r.sunShadowCascade.length = u, r.directionalShadow.length = g, r.directionalShadowMap.length = g, r.directionalShadowMatrix.length = g, r.pointShadow.length = _, r.pointShadowMap.length = _, r.pointShadowMatrix.length = _, r.spotShadow.length = v, r.spotShadowMap.length = v, r.spotLightMatrix.length = v + y - b, r.spotLightMap.length = y, r.numSpotLightShadowsWithMaps = b, r.numLightProbes = x, hash.sunLength = c, hash.directionalLength = d, hash.pointLength = f, hash.spotLength = p, hash.rectAreaLength = m, hash.hemiLength = h, hash.numSunShadows = l, hash.numDirectionalShadows = g, hash.numPointShadows = _, hash.numSpotShadows = v, hash.numSpotMaps = y, hash.numLightProbes = x, r.version = Oc++);
  }
  function c(e, t) {
    let n = 0,
      s = 0,
      c = 0,
      l = 0,
      u = 0,
      d = 0,
      matrixWorldInverse = t.matrixWorldInverse;
    for (let t = 0, p = e.length; t < p; t++) {
      let p = e[t];
      if (p.isSunLight) {
        let e = r.sun[n];
        e.direction.setFromMatrixPosition(p.matrixWorld), e.direction.transformDirection(matrixWorldInverse), n++;
      } else if (p.isDirectionalLight) {
        let e = r.directional[s];
        e.direction.setFromMatrixPosition(p.matrixWorld), i.setFromMatrixPosition(p.target.matrixWorld), e.direction.sub(i), e.direction.transformDirection(matrixWorldInverse), s++;
      } else if (p.isSpotLight) {
        let e = r.spot[l];
        e.position.setFromMatrixPosition(p.matrixWorld), e.position.applyMatrix4(matrixWorldInverse), e.direction.setFromMatrixPosition(p.matrixWorld), i.setFromMatrixPosition(p.target.matrixWorld), e.direction.sub(i), e.direction.transformDirection(matrixWorldInverse), l++;
      } else if (p.isRectAreaLight) {
        let e = r.rectArea[u];
        e.position.setFromMatrixPosition(p.matrixWorld), e.position.applyMatrix4(matrixWorldInverse), o.identity(), a.copy(p.matrixWorld), a.premultiply(matrixWorldInverse), o.extractRotation(a), e.halfWidth.set(p.width * .5, 0, 0), e.halfHeight.set(0, p.height * .5, 0), e.halfWidth.applyMatrix4(o), e.halfHeight.applyMatrix4(o), u++;
      } else if (p.isPointLight) {
        let e = r.point[c];
        e.position.setFromMatrixPosition(p.matrixWorld), e.position.applyMatrix4(matrixWorldInverse), c++;
      } else if (p.isHemisphereLight) {
        let e = r.hemi[d];
        e.direction.setFromMatrixPosition(p.matrixWorld), e.direction.transformDirection(matrixWorldInverse), d++;
      }
    }
  }
  return {
    setup: s,
    setupView: c,
    state: r
  };
}
function jc(e) {
  let t = new Ac(e),
    count = [],
    r = [],
    i = [];
  function a(e) {
    d.camera = e, count.length = 0, r.length = 0, i.length = 0;
  }
  function o(e) {
    count.push(e);
  }
  function s(e) {
    r.push(e);
  }
  function c(e) {
    i.push(e);
  }
  function l() {
    t.setup(count);
  }
  function u(e) {
    t.setupView(count, e);
  }
  let d = {
    lightsArray: count,
    shadowsArray: r,
    lightProbeGridArray: i,
    camera: null,
    lights: t,
    transmissionRenderTarget: {},
    textureUnits: 0
  };
  return {
    init: a,
    state: d,
    setupLights: l,
    setupLightsView: u,
    pushLight: o,
    pushShadow: s,
    pushLightProbeGrid: c
  };
}
function Mc(e) {
  let weakMap = new WeakMap();
  function n(n, r = 0) {
    let i = weakMap.get(n),
      flag;
    return i === undefined ? (flag = new jc(e), weakMap.set(n, [flag])) : r >= i.length ? (flag = new jc(e), i.push(flag)) : flag = i[r], flag;
  }
  function r() {
    weakMap = new WeakMap();
  }
  return {
    get: n,
    dispose: r
  };
}
var Nc = `void main() {
	gl_Position = vec4( position, 1.0 );
}`,
  Pc = `uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,
  Fc = [new q(1, 0, 0), new q(-1, 0, 0), new q(0, 1, 0), new q(0, -1, 0), new q(0, 0, 1), new q(0, 0, -1)],
  Ic = [new q(0, -1, 0), new q(0, -1, 0), new q(0, 0, 1), new q(0, 0, -1), new q(0, -1, 0), new q(0, -1, 0)],
  Lc = new Jt(),
  Rc = new q(),
  zc = new q();
function Bc(event, count, items) {
  let r = new di(),
    i = new K(),
    o = new K(),
    s = new Ut(),
    l = new Ai(),
    u = new ji(),
    d = {},
    maxTextureSize = items.maxTextureSize,
    p = {
      0: 1,
      1: 0,
      2: 2
    },
    m = new Di({
      defines: {
        VSM_SAMPLES: 8
      },
      uniforms: {
        shadow_pass: {
          value: null
        },
        resolution: {
          value: new K()
        },
        radius: {
          value: 4
        }
      },
      vertexShader: Nc,
      fragmentShader: Pc
    }),
    h = m.clone();
  h.defines.HORIZONTAL_PASS = 1;
  let y = new Tr();
  y.setAttribute(`position`, new ur(new Float32Array([-1, -1, .5, 3, -1, .5, -1, 3, .5]), 3));
  let b = new Yr(y, m),
    x = this;
  this.enabled = false, this.autoUpdate = true, this.needsUpdate = false, this.type = 1;
  let S = this.type;
  this.render = function (t, n, l) {
    if (x.enabled === false || x.autoUpdate === false && x.needsUpdate === false || t.length === 0) return;
    this.type === 2 && (U(`WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead.`), this.type = 1);
    let renderTarget = event.getRenderTarget(),
      activeCubeFace = event.getActiveCubeFace(),
      activeMipmapLevel = event.getActiveMipmapLevel(),
      state = event.state;
    state.setBlending(0), state.buffers.depth.getReversed() === true ? state.buffers.color.setClear(0, 0, 0, 0) : state.buffers.color.setClear(1, 1, 1, 1), state.buffers.depth.setTest(true), state.setScissorTest(false);
    let h = S !== this.type;
    h && n.traverse(function (e) {
      e.material && (Array.isArray(e.material) ? e.material.forEach(item => item.needsUpdate = true) : e.material.needsUpdate = true);
    });
    for (let u = 0, d = t.length; u < d; u++) {
      let d = t[u],
        shadow = d.shadow;
      if (shadow === undefined) {
        U(`WebGLShadowMap:`, d, `has no shadow.`);
        continue;
      }
      if (shadow.autoUpdate === false && shadow.needsUpdate === false) continue;
      i.copy(shadow.mapSize);
      let frameExtents = shadow.getFrameExtents();
      i.multiply(frameExtents), o.copy(shadow.mapSize), (i.x > maxTextureSize || i.y > maxTextureSize) && (i.x > maxTextureSize && (o.x = Math.floor(maxTextureSize / frameExtents.x), i.x = o.x * frameExtents.x, shadow.mapSize.x = o.x), i.y > maxTextureSize && (o.y = Math.floor(maxTextureSize / frameExtents.y), i.y = o.y * frameExtents.y, shadow.mapSize.y = o.y));
      let reversed = event.state.buffers.depth.getReversed();
      if (shadow.camera._reversedDepth = reversed, shadow.map === null || h === true) {
        if (shadow.map !== null && (shadow.map.depthTexture !== null && (shadow.map.depthTexture.dispose(), shadow.map.depthTexture = null), shadow.map.dispose()), this.type === 3) {
          if (d.isPointLight) {
            U(`WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.`);
            continue;
          }
          shadow.map = new Gt(i.x, i.y, {
            format: j,
            type: v,
            minFilter: c,
            magFilter: c,
            generateMipmaps: false
          }), shadow.map.texture.name = d.name + `.shadowMap`, shadow.map.depthTexture = new pi(i.x, i.y, _), shadow.map.depthTexture.name = d.name + `.shadowMapDepth`, shadow.map.depthTexture.format = D, shadow.map.depthTexture.compareFunction = null, shadow.map.depthTexture.minFilter = a, shadow.map.depthTexture.magFilter = a;
        } else d.isPointLight ? (shadow.map = new _o(i.x), shadow.map.depthTexture = new mi(i.x, g)) : (shadow.map = new Gt(i.x, i.y), shadow.map.depthTexture = new pi(i.x, i.y, g)), shadow.map.depthTexture.name = d.name + `.shadowMap`, shadow.map.depthTexture.format = D, this.type === 1 ? (shadow.map.depthTexture.compareFunction = reversed ? 518 : 515, shadow.map.depthTexture.minFilter = c, shadow.map.depthTexture.magFilter = c) : (shadow.map.depthTexture.compareFunction = null, shadow.map.depthTexture.minFilter = a, shadow.map.depthTexture.magFilter = a);
        shadow.camera.updateProjectionMatrix();
      }
      shadow.map.isWebGLCubeRenderTarget !== true && (shadow.map.width !== i.x || shadow.map.height !== i.y) && shadow.map.setSize(i.x, i.y);
      let x = shadow.map.isWebGLCubeRenderTarget ? 6 : shadow.getViewportCount();
      d.isPointLight !== true && shadow.updateMatrices(d, l);
      for (let t = 0; t < x; t++) {
        let camera = shadow.getCamera(t);
        if (d.isPointLight) {
          let camera = shadow.camera,
            matrix = shadow.matrix,
            fallbackValue = d.distance || camera.far;
          fallbackValue !== camera.far && (camera.far = fallbackValue, camera.updateProjectionMatrix()), Rc.setFromMatrixPosition(d.matrixWorld), camera.position.copy(Rc), zc.copy(camera.position), zc.add(Fc[t]), camera.up.copy(Ic[t]), camera.lookAt(zc), camera.updateMatrixWorld(), matrix.makeTranslation(-Rc.x, -Rc.y, -Rc.z), Lc.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse), shadow._frustum.setFromProjectionMatrix(Lc, camera.coordinateSystem, camera.reversedDepth);
        }
        if (shadow.map.isWebGLCubeRenderTarget) event.setRenderTarget(shadow.map, t), event.clear();else {
          t === 0 && (event.setRenderTarget(shadow.map), event.clear());
          let viewport = shadow.getViewport(t);
          s.set(o.x * viewport.x, o.y * viewport.y, o.x * viewport.z, o.y * viewport.w), state.viewport(s);
        }
        r = shadow.getFrustum(t), T(n, l, camera, d, this.type);
      }
      shadow.isPointLightShadow !== true && this.type === 3 && C(shadow, l), shadow.needsUpdate = false;
    }
    S = this.type, x.needsUpdate = false, event.setRenderTarget(renderTarget, activeCubeFace, activeMipmapLevel);
  };
  function C(n, r) {
    let a = count.update(b);
    m.defines.VSM_SAMPLES !== n.blurSamples && (m.defines.VSM_SAMPLES = n.blurSamples, h.defines.VSM_SAMPLES = n.blurSamples, m.needsUpdate = true, h.needsUpdate = true), n.mapPass === null ? n.mapPass = new Gt(i.x, i.y, {
      format: j,
      type: v
    }) : (n.mapPass.width !== n.map.width || n.mapPass.height !== n.map.height) && n.mapPass.setSize(n.map.width, n.map.height), m.uniforms.shadow_pass.value = n.map.depthTexture, m.uniforms.resolution.value.set(n.map.width, n.map.height), m.uniforms.radius.value = n.radius, event.setRenderTarget(n.mapPass), event.clear(), event.renderBufferDirect(r, null, a, m, b, null), h.uniforms.shadow_pass.value = n.mapPass.texture, h.uniforms.resolution.value.set(n.map.width, n.map.height), h.uniforms.radius.value = n.radius, event.setRenderTarget(n.map), event.clear(), event.renderBufferDirect(r, null, a, h, b, null);
  }
  function w(t, n, r, i) {
    let flag = null,
      o = r.isPointLight === true ? t.customDistanceMaterial : t.customDepthMaterial;
    if (o !== undefined) flag = o;else if (flag = r.isPointLight === true ? u : l, event.localClippingEnabled && n.clipShadows === true && Array.isArray(n.clippingPlanes) && n.clippingPlanes.length !== 0 || n.displacementMap && n.displacementScale !== 0 || n.alphaMap && n.alphaTest > 0 || n.map && n.alphaTest > 0 || n.alphaToCoverage === true) {
      let uuid = flag.uuid,
        t = n.uuid,
        r = d[uuid];
      r === undefined && (r = {}, d[uuid] = r);
      let i = r[t];
      i === undefined && (i = flag.clone(), r[t] = i, n.addEventListener(`dispose`, E)), flag = i;
    }
    if (flag.visible = n.visible, flag.wireframe = n.wireframe, i === 3 ? flag.side = n.shadowSide === null ? n.side : n.shadowSide : flag.side = n.shadowSide === null ? p[n.side] : n.shadowSide, flag.alphaMap = n.alphaMap, flag.alphaTest = n.alphaToCoverage === true ? .5 : n.alphaTest, flag.map = n.map, flag.clipShadows = n.clipShadows, flag.clippingPlanes = n.clippingPlanes, flag.clipIntersection = n.clipIntersection, flag.displacementMap = n.displacementMap, flag.displacementScale = n.displacementScale, flag.displacementBias = n.displacementBias, flag.wireframeLinewidth = n.wireframeLinewidth, flag.linewidth = n.linewidth, r.isPointLight === true && flag.isMeshDistanceMaterial === true) {
      let t = event.properties.get(flag);
      t.light = r;
    }
    return flag;
  }
  function T(n, i, a, o, s) {
    if (n.visible === false) return;
    if (n.layers.test(i.layers) && (n.isMesh || n.isLine || n.isPoints) && (n.castShadow || n.receiveShadow && s === 3) && (!n.frustumCulled || n.intersectsFrustum(r))) {
      n.modelViewMatrix.multiplyMatrices(a.matrixWorldInverse, n.matrixWorld);
      let r = count.update(n),
        material = n.material;
      if (Array.isArray(material)) {
        let groups = r.groups;
        for (let l = 0, u = groups.length; l < u; l++) {
          let u = groups[l],
            d = material[u.materialIndex];
          if (d && d.visible) {
            let t = w(n, d, o, s);
            n.onBeforeShadow(event, n, i, a, r, t, u), event.renderBufferDirect(a, null, r, t, n, u), n.onAfterShadow(event, n, i, a, r, t, u);
          }
        }
      } else if (material.visible) {
        let t = w(n, material, o, s);
        n.onBeforeShadow(event, n, i, a, r, t, null), event.renderBufferDirect(a, null, r, t, n, null), n.onAfterShadow(event, n, i, a, r, t, null);
      }
    }
    let c = n.children;
    for (let e = 0, t = c.length; e < t; e++) T(c[e], i, a, o, s);
  }
  function E(e) {
    e.target.removeEventListener(`dispose`, E);
    for (let total in d) {
      let n = d[total],
        uuid = e.target.uuid;
      uuid in n && (n[uuid].dispose(), delete n[uuid]);
    }
  }
}
function Vc(e, t) {
  function n() {
    let t = false,
      n = new Ut(),
      count = null,
      i = new Ut(0, 0, 0, 0);
    return {
      setMask: function (n) {
        count !== n && !t && (e.colorMask(n, n, n, n), count = n);
      },
      setLocked: function (e) {
        t = e;
      },
      setClear: function (t, r, a, o, s) {
        s === true && (t *= o, r *= o, a *= o), n.set(t, r, a, o), i.equals(n) === false && (e.clearColor(t, r, a, o), i.copy(n));
      },
      reset: function () {
        t = false, count = null, i.set(-1, 0, 0, 0);
      }
    };
  }
  function r() {
    let n = false,
      r = false,
      count = null,
      flag = null,
      ratio = null;
    return {
      setReversed: function (e) {
        if (r !== e) {
          let n = t.get(`EXT_clip_control`);
          e ? n.clipControlEXT(n.LOWER_LEFT_EXT, n.ZERO_TO_ONE_EXT) : n.clipControlEXT(n.LOWER_LEFT_EXT, n.NEGATIVE_ONE_TO_ONE_EXT), r = e;
          let i = ratio;
          ratio = null, this.setClear(i);
        }
      },
      getReversed: function () {
        return r;
      },
      setTest: function (t) {
        t ? I(e.DEPTH_TEST) : L(e.DEPTH_TEST);
      },
      setMask: function (t) {
        count !== t && !n && (e.depthMask(t), count = t);
      },
      setFunc: function (t) {
        if (r && (t = Qe[t]), flag !== t) {
          switch (t) {
            case 0:
              e.depthFunc(e.NEVER);
              break;
            case 1:
              e.depthFunc(e.ALWAYS);
              break;
            case 2:
              e.depthFunc(e.LESS);
              break;
            case 3:
              e.depthFunc(e.LEQUAL);
              break;
            case 4:
              e.depthFunc(e.EQUAL);
              break;
            case 5:
              e.depthFunc(e.GEQUAL);
              break;
            case 6:
              e.depthFunc(e.GREATER);
              break;
            case 7:
              e.depthFunc(e.NOTEQUAL);
              break;
            default:
              e.depthFunc(e.LEQUAL);
          }
          flag = t;
        }
      },
      setLocked: function (e) {
        n = e;
      },
      setClear: function (t) {
        ratio !== t && (ratio = t, r && (t = 1 - t), e.clearDepth(t));
      },
      reset: function () {
        n = false, count = null, flag = null, ratio = null, r = false;
      }
    };
  }
  function i() {
    let t = false,
      count = null,
      r = null,
      i = null,
      flag = null,
      ratio = null,
      total = null,
      c = null,
      l = null;
    return {
      setTest: function (n) {
        t || (n ? I(e.STENCIL_TEST) : L(e.STENCIL_TEST));
      },
      setMask: function (r) {
        count !== r && !t && (e.stencilMask(r), count = r);
      },
      setFunc: function (t, n, o) {
        (r !== t || i !== n || flag !== o) && (e.stencilFunc(t, n, o), r = t, i = n, flag = o);
      },
      setOp: function (t, n, r) {
        (ratio !== t || total !== n || c !== r) && (e.stencilOp(t, n, r), ratio = t, total = n, c = r);
      },
      setLocked: function (e) {
        t = e;
      },
      setClear: function (t) {
        l !== t && (e.clearStencil(t), l = t);
      },
      reset: function () {
        t = false, count = null, r = null, i = null, flag = null, ratio = null, total = null, c = null, l = null;
      }
    };
  }
  let a = new n(),
    o = new r(),
    s = new i(),
    weakMap = new WeakMap(),
    l = new WeakMap(),
    u = {},
    d = {},
    f = {},
    p = new WeakMap(),
    ratio = [],
    resolvedValue = null,
    g = false,
    _ = null,
    count = null,
    y = null,
    flag = null,
    x = null,
    type = null,
    mipmaps = null,
    w = new X(0, 0, 0),
    T = 0,
    E = false,
    vertexShader = null,
    fragmentShader = null,
    k = null,
    A = null,
    j = null,
    parameter = e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS),
    te = false,
    M = 0,
    parameterResult = e.getParameter(e.VERSION);
  parameterResult.indexOf(`WebGL`) === -1 ? parameterResult.indexOf(`OpenGL ES`) !== -1 && (M = parseFloat(/^OpenGL ES (\d)/.exec(parameterResult)[1]), te = M >= 2) : (M = parseFloat(/^WebGL (\d)/.exec(parameterResult)[1]), te = M >= 1);
  let far = null,
    ne = {},
    F = e.getParameter(e.SCISSOR_BOX),
    re = e.getParameter(e.VIEWPORT),
    fromArray = new Ut().fromArray(F),
    fromArrayResult = new Ut().fromArray(re);
  function oe(t, n, r, i) {
    let uint8Array = new Uint8Array(4),
      texture = e.createTexture();
    e.bindTexture(t, texture), e.texParameteri(t, e.TEXTURE_MIN_FILTER, e.NEAREST), e.texParameteri(t, e.TEXTURE_MAG_FILTER, e.NEAREST);
    for (let o = 0; o < r; o++) t === e.TEXTURE_3D || t === e.TEXTURE_2D_ARRAY ? e.texImage3D(n, 0, e.RGBA, 1, 1, i, 0, e.RGBA, e.UNSIGNED_BYTE, uint8Array) : e.texImage2D(n + o, 0, e.RGBA, 1, 1, 0, e.RGBA, e.UNSIGNED_BYTE, uint8Array);
    return texture;
  }
  let se = {};
  se[e.TEXTURE_2D] = oe(e.TEXTURE_2D, e.TEXTURE_2D, 1), se[e.TEXTURE_CUBE_MAP] = oe(e.TEXTURE_CUBE_MAP, e.TEXTURE_CUBE_MAP_POSITIVE_X, 6), se[e.TEXTURE_2D_ARRAY] = oe(e.TEXTURE_2D_ARRAY, e.TEXTURE_2D_ARRAY, 1, 1), se[e.TEXTURE_3D] = oe(e.TEXTURE_3D, e.TEXTURE_3D, 1, 1), a.setClear(0, 0, 0, 1), o.setClear(1), s.setClear(0), I(e.DEPTH_TEST), o.setFunc(3), he(false), ge(1), I(e.CULL_FACE), pe(0);
  function I(t) {
    u[t] !== true && (e.enable(t), u[t] = true);
  }
  function L(t) {
    u[t] !== false && (e.disable(t), u[t] = false);
  }
  function ce(t, n) {
    return f[t] !== n && (e.bindFramebuffer(t, n), f[t] = n, t === e.DRAW_FRAMEBUFFER && (f[e.FRAMEBUFFER] = n), t === e.FRAMEBUFFER && (f[e.DRAW_FRAMEBUFFER] = n), true);
  }
  function le(t, n) {
    let r = ratio,
      i = false;
    if (t) {
      r = p.get(n), r === undefined && (r = [], p.set(n, r));
      let textures = t.textures;
      if (r.length !== textures.length || r[0] !== e.COLOR_ATTACHMENT0) {
        for (let t = 0, n = textures.length; t < n; t++) r[t] = e.COLOR_ATTACHMENT0 + t;
        r.length = textures.length, i = true;
      }
    } else r[0] !== e.BACK && (r[0] = e.BACK, i = true);
    i && e.drawBuffers(r);
  }
  function ue(t) {
    return resolvedValue !== t && (e.useProgram(t), resolvedValue = t, true);
  }
  let de = {
    100: e.FUNC_ADD,
    101: e.FUNC_SUBTRACT,
    102: e.FUNC_REVERSE_SUBTRACT
  };
  de[103] = e.MIN, de[104] = e.MAX;
  let fe = {
    200: e.ZERO,
    201: e.ONE,
    202: e.SRC_COLOR,
    204: e.SRC_ALPHA,
    210: e.SRC_ALPHA_SATURATE,
    208: e.DST_COLOR,
    206: e.DST_ALPHA,
    203: e.ONE_MINUS_SRC_COLOR,
    205: e.ONE_MINUS_SRC_ALPHA,
    209: e.ONE_MINUS_DST_COLOR,
    207: e.ONE_MINUS_DST_ALPHA,
    211: e.CONSTANT_COLOR,
    212: e.ONE_MINUS_CONSTANT_COLOR,
    213: e.CONSTANT_ALPHA,
    214: e.ONE_MINUS_CONSTANT_ALPHA
  };
  function pe(t, n, r, i, a, o, s, c, l, u) {
    if (t === 0) {
      g === true && (L(e.BLEND), g = false);
      return;
    }
    if (g === false && (I(e.BLEND), g = true), t !== 5) {
      if (t !== _ || u !== E) {
        if ((count !== 100 || x !== 100) && (e.blendEquation(e.FUNC_ADD), count = 100, x = 100), u) switch (t) {
          case 1:
            e.blendFuncSeparate(e.ONE, e.ONE_MINUS_SRC_ALPHA, e.ONE, e.ONE_MINUS_SRC_ALPHA);
            break;
          case 2:
            e.blendFunc(e.ONE, e.ONE);
            break;
          case 3:
            e.blendFuncSeparate(e.ZERO, e.ONE_MINUS_SRC_COLOR, e.ZERO, e.ONE);
            break;
          case 4:
            e.blendFuncSeparate(e.DST_COLOR, e.ONE_MINUS_SRC_ALPHA, e.ZERO, e.ONE);
            break;
          default:
            W(`WebGLState: Invalid blending: `, t);
        } else switch (t) {
          case 1:
            e.blendFuncSeparate(e.SRC_ALPHA, e.ONE_MINUS_SRC_ALPHA, e.ONE, e.ONE_MINUS_SRC_ALPHA);
            break;
          case 2:
            e.blendFuncSeparate(e.SRC_ALPHA, e.ONE, e.ONE, e.ONE);
            break;
          case 3:
            W(`WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true`);
            break;
          case 4:
            W(`WebGLState: MultiplyBlending requires material.premultipliedAlpha = true`);
            break;
          default:
            W(`WebGLState: Invalid blending: `, t);
        }
        y = null, flag = null, type = null, mipmaps = null, w.set(0, 0, 0), T = 0, _ = t, E = u;
      }
      return;
    }
    a ||= n, o ||= r, s ||= i, (n !== count || a !== x) && (e.blendEquationSeparate(de[n], de[a]), count = n, x = a), (r !== y || i !== flag || o !== type || s !== mipmaps) && (e.blendFuncSeparate(fe[r], fe[i], fe[o], fe[s]), y = r, flag = i, type = o, mipmaps = s), (c.equals(w) === false || l !== T) && (e.blendColor(c.r, c.g, c.b, l), w.copy(c), T = l), _ = t, E = false;
  }
  function me(t, n) {
    t.side === 2 ? L(e.CULL_FACE) : I(e.CULL_FACE);
    let r = t.side === 1;
    n && (r = !r), he(r), t.blending === 1 && t.transparent === false ? pe(0) : pe(t.blending, t.blendEquation, t.blendSrc, t.blendDst, t.blendEquationAlpha, t.blendSrcAlpha, t.blendDstAlpha, t.blendColor, t.blendAlpha, t.premultipliedAlpha), o.setFunc(t.depthFunc), o.setTest(t.depthTest), o.setMask(t.depthWrite), a.setMask(t.colorWrite);
    let stencilWrite = t.stencilWrite;
    s.setTest(stencilWrite), stencilWrite && (s.setMask(t.stencilWriteMask), s.setFunc(t.stencilFunc, t.stencilRef, t.stencilFuncMask), s.setOp(t.stencilFail, t.stencilZFail, t.stencilZPass)), ve(t.polygonOffset, t.polygonOffsetFactor, t.polygonOffsetUnits), t.alphaToCoverage === true ? I(e.SAMPLE_ALPHA_TO_COVERAGE) : L(e.SAMPLE_ALPHA_TO_COVERAGE);
  }
  function he(t) {
    vertexShader !== t && (t ? e.frontFace(e.CW) : e.frontFace(e.CCW), vertexShader = t);
  }
  function ge(t) {
    t === 0 ? L(e.CULL_FACE) : (I(e.CULL_FACE), t !== fragmentShader && (t === 1 ? e.cullFace(e.BACK) : t === 2 ? e.cullFace(e.FRONT) : e.cullFace(e.FRONT_AND_BACK))), fragmentShader = t;
  }
  function _e(t) {
    t !== k && (te && e.lineWidth(t), k = t);
  }
  function ve(t, n, r) {
    t ? (I(e.POLYGON_OFFSET_FILL), (A !== n || j !== r) && (A = n, j = r, o.getReversed() && (n = -n), e.polygonOffset(n, r))) : L(e.POLYGON_OFFSET_FILL);
  }
  function ye(t) {
    t ? I(e.SCISSOR_TEST) : L(e.SCISSOR_TEST);
  }
  function be(t) {
    t === undefined && (t = e.TEXTURE0 + parameter - 1), far !== t && (e.activeTexture(t), far = t);
  }
  function xe(t, n, r) {
    r === undefined && (r = far === null ? e.TEXTURE0 + parameter - 1 : far);
    let i = ne[r];
    i === undefined && (i = {
      type: undefined,
      texture: undefined
    }, ne[r] = i), (i.type !== t || i.texture !== n) && (far !== r && (e.activeTexture(r), far = r), e.bindTexture(t, n || se[t]), i.type = t, i.texture = n);
  }
  function Se() {
    let t = ne[far];
    t !== undefined && t.type !== undefined && (e.bindTexture(t.type, null), t.type = undefined, t.texture = undefined);
  }
  function Ce() {
    try {
      e.compressedTexImage2D(...arguments);
    } catch (e) {
      W(`WebGLState:`, e);
    }
  }
  function we() {
    try {
      e.compressedTexImage3D(...arguments);
    } catch (e) {
      W(`WebGLState:`, e);
    }
  }
  function Te() {
    try {
      e.texSubImage2D(...arguments);
    } catch (e) {
      W(`WebGLState:`, e);
    }
  }
  function Ee() {
    try {
      e.texSubImage3D(...arguments);
    } catch (e) {
      W(`WebGLState:`, e);
    }
  }
  function De() {
    try {
      e.compressedTexSubImage2D(...arguments);
    } catch (e) {
      W(`WebGLState:`, e);
    }
  }
  function Oe() {
    try {
      e.compressedTexSubImage3D(...arguments);
    } catch (e) {
      W(`WebGLState:`, e);
    }
  }
  function ke() {
    try {
      e.texStorage2D(...arguments);
    } catch (e) {
      W(`WebGLState:`, e);
    }
  }
  function Ae() {
    try {
      e.texStorage3D(...arguments);
    } catch (e) {
      W(`WebGLState:`, e);
    }
  }
  function R() {
    try {
      e.texImage2D(...arguments);
    } catch (e) {
      W(`WebGLState:`, e);
    }
  }
  function je() {
    try {
      e.texImage3D(...arguments);
    } catch (e) {
      W(`WebGLState:`, e);
    }
  }
  function z(t) {
    return d[t] === undefined ? e.getParameter(t) : d[t];
  }
  function Me(t, n) {
    d[t] !== n && (e.pixelStorei(t, n), d[t] = n);
  }
  function B(t) {
    fromArray.equals(t) === false && (e.scissor(t.x, t.y, t.z, t.w), fromArray.copy(t));
  }
  function Ne(t) {
    fromArrayResult.equals(t) === false && (e.viewport(t.x, t.y, t.z, t.w), fromArrayResult.copy(t));
  }
  function V(t, n) {
    let r = l.get(n);
    r === undefined && (r = new WeakMap(), l.set(n, r));
    let i = r.get(t);
    i === undefined && (i = e.getUniformBlockIndex(n, t.name), r.set(t, i));
  }
  function H(t, n) {
    let r = l.get(n).get(t);
    weakMap.get(n) !== r && (e.uniformBlockBinding(n, r, t.__bindingPointIndex), weakMap.set(n, r));
  }
  function Pe() {
    e.disable(e.BLEND), e.disable(e.CULL_FACE), e.disable(e.DEPTH_TEST), e.disable(e.POLYGON_OFFSET_FILL), e.disable(e.SCISSOR_TEST), e.disable(e.STENCIL_TEST), e.disable(e.SAMPLE_ALPHA_TO_COVERAGE), e.blendEquation(e.FUNC_ADD), e.blendFunc(e.ONE, e.ZERO), e.blendFuncSeparate(e.ONE, e.ZERO, e.ONE, e.ZERO), e.blendColor(0, 0, 0, 0), e.colorMask(true, true, true, true), e.clearColor(0, 0, 0, 0), e.depthMask(true), e.depthFunc(e.LESS), o.setReversed(false), e.clearDepth(1), e.stencilMask(4294967295), e.stencilFunc(e.ALWAYS, 0, 4294967295), e.stencilOp(e.KEEP, e.KEEP, e.KEEP), e.clearStencil(0), e.cullFace(e.BACK), e.frontFace(e.CCW), e.polygonOffset(0, 0), e.activeTexture(e.TEXTURE0), e.bindFramebuffer(e.FRAMEBUFFER, null), e.bindFramebuffer(e.DRAW_FRAMEBUFFER, null), e.bindFramebuffer(e.READ_FRAMEBUFFER, null), e.useProgram(null), e.lineWidth(1), e.scissor(0, 0, e.canvas.width, e.canvas.height), e.viewport(0, 0, e.canvas.width, e.canvas.height), e.pixelStorei(e.PACK_ALIGNMENT, 4), e.pixelStorei(e.UNPACK_ALIGNMENT, 4), e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL, false), e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false), e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL, e.BROWSER_DEFAULT_WEBGL), e.pixelStorei(e.PACK_ROW_LENGTH, 0), e.pixelStorei(e.PACK_SKIP_PIXELS, 0), e.pixelStorei(e.PACK_SKIP_ROWS, 0), e.pixelStorei(e.UNPACK_ROW_LENGTH, 0), e.pixelStorei(e.UNPACK_IMAGE_HEIGHT, 0), e.pixelStorei(e.UNPACK_SKIP_PIXELS, 0), e.pixelStorei(e.UNPACK_SKIP_ROWS, 0), e.pixelStorei(e.UNPACK_SKIP_IMAGES, 0), u = {}, d = {}, far = null, ne = {}, f = {}, p = new WeakMap(), ratio = [], resolvedValue = null, g = false, _ = null, count = null, y = null, flag = null, x = null, type = null, mipmaps = null, w = new X(0, 0, 0), T = 0, E = false, vertexShader = null, fragmentShader = null, k = null, A = null, j = null, fromArray.set(0, 0, e.canvas.width, e.canvas.height), fromArrayResult.set(0, 0, e.canvas.width, e.canvas.height), a.reset(), o.reset(), s.reset();
  }
  return {
    buffers: {
      color: a,
      depth: o,
      stencil: s
    },
    enable: I,
    disable: L,
    bindFramebuffer: ce,
    drawBuffers: le,
    useProgram: ue,
    setBlending: pe,
    setMaterial: me,
    setFlipSided: he,
    setCullFace: ge,
    setLineWidth: _e,
    setPolygonOffset: ve,
    setScissorTest: ye,
    activeTexture: be,
    bindTexture: xe,
    unbindTexture: Se,
    compressedTexImage2D: Ce,
    compressedTexImage3D: we,
    texImage2D: R,
    texImage3D: je,
    pixelStorei: Me,
    getParameter: z,
    updateUBOMapping: V,
    uniformBlockBinding: H,
    texStorage2D: ke,
    texStorage3D: Ae,
    texSubImage2D: Te,
    texSubImage3D: Ee,
    compressedTexSubImage2D: De,
    compressedTexSubImage3D: Oe,
    scissor: B,
    viewport: Ne,
    reset: Pe
  };
}
function Hc(e, t, d, f, p, m, h) {
  let g = t.has(`WEBGL_multisampled_render_to_texture`) ? t.get(`WEBGL_multisampled_render_to_texture`) : null,
    _ = typeof navigator > `u` ? false : /OculusBrowser/g.test(navigator.userAgent),
    v = new K(),
    weakMap = new WeakMap(),
    b = new Set(),
    count,
    S = new WeakMap(),
    C = false;
  try {
    C = typeof OffscreenCanvas < `u` && new OffscreenCanvas(1, 1).getContext(`2d`) !== null;
  } catch {}
  function w(e, t) {
    return C ? new OffscreenCanvas(e, t) : Ge(`canvas`);
  }
  function T(e, t, n) {
    let r = 1,
      i = z(e);
    if ((i.width > n || i.height > n) && (r = n / Math.max(i.width, i.height)), r < 1) {
      if (typeof HTMLImageElement < `u` && e instanceof HTMLImageElement || typeof HTMLCanvasElement < `u` && e instanceof HTMLCanvasElement || typeof ImageBitmap < `u` && e instanceof ImageBitmap || typeof VideoFrame < `u` && e instanceof VideoFrame) {
        let n = Math.floor(r * i.width),
          a = Math.floor(r * i.height);
        count === undefined && (count = w(n, a));
        let o = t ? w(n, a) : count;
        return o.width = n, o.height = a, o.getContext(`2d`).drawImage(e, 0, 0, n, a), U(`WebGLRenderer: Texture has been resized from (` + i.width + `x` + i.height + `) to (` + n + `x` + a + `).`), o;
      }
      return `data` in e && U(`WebGLRenderer: Image in DataTexture is too big (` + i.width + `x` + i.height + `).`), e;
    }
    return e;
  }
  function E(e) {
    return e.generateMipmaps;
  }
  function D(t) {
    e.generateMipmap(t);
  }
  function k(t) {
    return t.isWebGLCubeRenderTarget ? e.TEXTURE_CUBE_MAP : t.isWebGL3DRenderTarget ? e.TEXTURE_3D : t.isWebGLArrayRenderTarget || t.isCompressedArrayTexture ? e.TEXTURE_2D_ARRAY : e.TEXTURE_2D;
  }
  function A(n, r, i, a, o, s = false) {
    if (n !== null) {
      if (e[n] !== undefined) return e[n];
      U(`WebGLRenderer: Attempt to use non-existing WebGL internal format '` + n + `'`);
    }
    let total;
    a && (total = t.get(`EXT_texture_norm16`), total || U(`WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension`));
    let l = r;
    if (r === e.RED && (i === e.FLOAT && (l = e.R32F), i === e.HALF_FLOAT && (l = e.R16F), i === e.UNSIGNED_BYTE && (l = e.R8), i === e.UNSIGNED_SHORT && total && (l = total.R16_EXT), i === e.SHORT && total && (l = total.R16_SNORM_EXT)), r === e.RED_INTEGER && (i === e.UNSIGNED_BYTE && (l = e.R8UI), i === e.UNSIGNED_SHORT && (l = e.R16UI), i === e.UNSIGNED_INT && (l = e.R32UI), i === e.BYTE && (l = e.R8I), i === e.SHORT && (l = e.R16I), i === e.INT && (l = e.R32I)), r === e.RG && (i === e.FLOAT && (l = e.RG32F), i === e.HALF_FLOAT && (l = e.RG16F), i === e.UNSIGNED_BYTE && (l = e.RG8), i === e.UNSIGNED_SHORT && total && (l = total.RG16_EXT), i === e.SHORT && total && (l = total.RG16_SNORM_EXT)), r === e.RG_INTEGER && (i === e.UNSIGNED_BYTE && (l = e.RG8UI), i === e.UNSIGNED_SHORT && (l = e.RG16UI), i === e.UNSIGNED_INT && (l = e.RG32UI), i === e.BYTE && (l = e.RG8I), i === e.SHORT && (l = e.RG16I), i === e.INT && (l = e.RG32I)), r === e.RGB_INTEGER && (i === e.UNSIGNED_BYTE && (l = e.RGB8UI), i === e.UNSIGNED_SHORT && (l = e.RGB16UI), i === e.UNSIGNED_INT && (l = e.RGB32UI), i === e.BYTE && (l = e.RGB8I), i === e.SHORT && (l = e.RGB16I), i === e.INT && (l = e.RGB32I)), r === e.RGBA_INTEGER && (i === e.UNSIGNED_BYTE && (l = e.RGBA8UI), i === e.UNSIGNED_SHORT && (l = e.RGBA16UI), i === e.UNSIGNED_INT && (l = e.RGBA32UI), i === e.BYTE && (l = e.RGBA8I), i === e.SHORT && (l = e.RGBA16I), i === e.INT && (l = e.RGBA32I)), r === e.RGB && (i === e.UNSIGNED_SHORT && total && (l = total.RGB16_EXT), i === e.SHORT && total && (l = total.RGB16_SNORM_EXT), i === e.UNSIGNED_INT_5_9_9_9_REV && (l = e.RGB9_E5), i === e.UNSIGNED_INT_10F_11F_11F_REV && (l = e.R11F_G11F_B10F)), r === e.RGBA) {
      let t = s ? Le : Y.getTransfer(o);
      i === e.FLOAT && (l = e.RGBA32F), i === e.HALF_FLOAT && (l = e.RGBA16F), i === e.UNSIGNED_BYTE && (l = t === `srgb` ? e.SRGB8_ALPHA8 : e.RGBA8), i === e.UNSIGNED_SHORT && total && (l = total.RGBA16_EXT), i === e.SHORT && total && (l = total.RGBA16_SNORM_EXT), i === e.UNSIGNED_SHORT_4_4_4_4 && (l = e.RGBA4), i === e.UNSIGNED_SHORT_5_5_5_1 && (l = e.RGB5_A1);
    }
    return (l === e.R16F || l === e.R32F || l === e.RG16F || l === e.RG32F || l === e.RGBA16F || l === e.RGBA32F) && t.get(`EXT_color_buffer_float`), l;
  }
  function j(t, n) {
    let r;
    return t ? n === null || n === 1014 || n === 1020 ? r = e.DEPTH24_STENCIL8 : n === 1015 ? r = e.DEPTH32F_STENCIL8 : n === 1012 && (r = e.DEPTH24_STENCIL8, U(`DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.`)) : n === null || n === 1014 || n === 1020 ? r = e.DEPTH_COMPONENT24 : n === 1015 ? r = e.DEPTH_COMPONENT32F : n === 1012 && (r = e.DEPTH_COMPONENT16), r;
  }
  function ee(e, t) {
    return E(e) === true || e.isFramebufferTexture && e.minFilter !== 1003 && e.minFilter !== 1006 ? Math.log2(Math.max(t.width, t.height)) + 1 : e.mipmaps !== undefined && e.mipmaps.length > 0 ? e.mipmaps.length : e.isCompressedTexture && Array.isArray(e.image) ? t.mipmaps.length : 1;
  }
  function te(event) {
    let t = event.target;
    t.removeEventListener(`dispose`, te), N(t), t.isVideoTexture && weakMap.delete(t), t.isHTMLTexture && b.delete(t);
  }
  function M(event) {
    let t = event.target;
    t.removeEventListener(`dispose`, M), ne(t);
  }
  function N(e) {
    let t = f.get(e);
    if (t.__webglInit === undefined) return;
    let source = e.source,
      r = S.get(source);
    if (r) {
      let i = r[t.__cacheKey];
      i.usedTimes--, i.usedTimes === 0 && P(e), Object.keys(r).length === 0 && S.delete(source);
    }
    f.remove(e);
  }
  function P(t) {
    let n = f.get(t);
    e.deleteTexture(n.__webglTexture);
    let source = t.source,
      i = S.get(source);
    delete i[n.__cacheKey], h.memory.textures--;
  }
  function ne(t) {
    let n = f.get(t);
    if (t.depthTexture && (t.depthTexture.dispose(), f.remove(t.depthTexture)), t.isWebGLCubeRenderTarget) for (let t = 0; t < 6; t++) {
      if (Array.isArray(n.__webglFramebuffer[t])) for (let r = 0; r < n.__webglFramebuffer[t].length; r++) e.deleteFramebuffer(n.__webglFramebuffer[t][r]);else e.deleteFramebuffer(n.__webglFramebuffer[t]);
      n.__webglDepthbuffer && e.deleteRenderbuffer(n.__webglDepthbuffer[t]);
    } else {
      if (Array.isArray(n.__webglFramebuffer)) for (let t = 0; t < n.__webglFramebuffer.length; t++) e.deleteFramebuffer(n.__webglFramebuffer[t]);else e.deleteFramebuffer(n.__webglFramebuffer);
      if (n.__webglDepthbuffer && e.deleteRenderbuffer(n.__webglDepthbuffer), n.__webglMultisampledFramebuffer && e.deleteFramebuffer(n.__webglMultisampledFramebuffer), n.__webglColorRenderbuffer) for (let t = 0; t < n.__webglColorRenderbuffer.length; t++) n.__webglColorRenderbuffer[t] && e.deleteRenderbuffer(n.__webglColorRenderbuffer[t]);
      n.__webglDepthRenderbuffer && e.deleteRenderbuffer(n.__webglDepthRenderbuffer);
    }
    let textures = t.textures;
    for (let t = 0, n = textures.length; t < n; t++) {
      let n = f.get(textures[t]);
      n.__webglTexture && (e.deleteTexture(n.__webglTexture), h.memory.textures--), f.remove(textures[t]);
    }
    f.remove(t);
  }
  let F = 0;
  function re() {
    F = 0;
  }
  function ie() {
    return F;
  }
  function ae(e) {
    F = e;
  }
  function oe() {
    let e = F;
    return e >= p.maxTextures && U(`WebGLTextures: Trying to use ` + (e + 1) + ` texture units while this GPU supports only ` + p.maxTextures), F += 1, e;
  }
  function se(e) {
    let total = [];
    return total.push(e.wrapS), total.push(e.wrapT), total.push(e.wrapR || 0), total.push(e.magFilter), total.push(e.minFilter), total.push(e.anisotropy), total.push(e.internalFormat), total.push(e.format), total.push(e.type), total.push(e.generateMipmaps), total.push(e.premultiplyAlpha), total.push(e.flipY), total.push(e.unpackAlignment), total.push(e.colorSpace), total.join();
  }
  function I(t, n) {
    let r = f.get(t);
    if (t.isVideoTexture && R(t), t.isRenderTargetTexture === false && t.isExternalTexture !== true && t.version > 0 && r.__version !== t.version) {
      let image = t.image;
      if (image === null) U(`WebGLRenderer: Texture marked for update but no image data found.`);else if (image.complete === false) U(`WebGLRenderer: Texture marked for update but image is incomplete`);else {
        _e(r, t, n);
        return;
      }
    } else t.isExternalTexture && (r.__webglTexture = t.sourceTexture ? t.sourceTexture : null);
    d.bindTexture(e.TEXTURE_2D, r.__webglTexture, e.TEXTURE0 + n);
  }
  function L(t, n) {
    let r = f.get(t);
    if (t.isRenderTargetTexture === false && t.version > 0 && r.__version !== t.version) {
      _e(r, t, n);
      return;
    }
    t.isExternalTexture && (r.__webglTexture = t.sourceTexture ? t.sourceTexture : null), d.bindTexture(e.TEXTURE_2D_ARRAY, r.__webglTexture, e.TEXTURE0 + n);
  }
  function ce(t, n) {
    let r = f.get(t);
    if (t.isRenderTargetTexture === false && t.version > 0 && r.__version !== t.version) {
      _e(r, t, n);
      return;
    }
    d.bindTexture(e.TEXTURE_3D, r.__webglTexture, e.TEXTURE0 + n);
  }
  function le(t, n) {
    let r = f.get(t);
    if (t.isCubeDepthTexture !== true && t.version > 0 && r.__version !== t.version) {
      ve(r, t, n);
      return;
    }
    d.bindTexture(e.TEXTURE_CUBE_MAP, r.__webglTexture, e.TEXTURE0 + n);
  }
  let ue = {
      [n]: e.REPEAT,
      [r]: e.CLAMP_TO_EDGE,
      [i]: e.MIRRORED_REPEAT
    },
    de = {
      [a]: e.NEAREST,
      [o]: e.NEAREST_MIPMAP_NEAREST,
      [s]: e.NEAREST_MIPMAP_LINEAR,
      [c]: e.LINEAR,
      [l]: e.LINEAR_MIPMAP_NEAREST,
      [u]: e.LINEAR_MIPMAP_LINEAR
    },
    fe = {
      512: e.NEVER,
      519: e.ALWAYS,
      513: e.LESS,
      515: e.LEQUAL,
      514: e.EQUAL,
      518: e.GEQUAL,
      516: e.GREATER,
      517: e.NOTEQUAL
    };
  function pe(n, r) {
    if (r.type === 1015 && t.has(`OES_texture_float_linear`) === false && (r.magFilter === 1006 || r.magFilter === 1007 || r.magFilter === 1005 || r.magFilter === 1008 || r.minFilter === 1006 || r.minFilter === 1007 || r.minFilter === 1005 || r.minFilter === 1008) && U(`WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device.`), e.texParameteri(n, e.TEXTURE_WRAP_S, ue[r.wrapS]), e.texParameteri(n, e.TEXTURE_WRAP_T, ue[r.wrapT]), (n === e.TEXTURE_3D || n === e.TEXTURE_2D_ARRAY) && e.texParameteri(n, e.TEXTURE_WRAP_R, ue[r.wrapR]), e.texParameteri(n, e.TEXTURE_MAG_FILTER, de[r.magFilter]), e.texParameteri(n, e.TEXTURE_MIN_FILTER, de[r.minFilter]), r.compareFunction && (e.texParameteri(n, e.TEXTURE_COMPARE_MODE, e.COMPARE_REF_TO_TEXTURE), e.texParameteri(n, e.TEXTURE_COMPARE_FUNC, fe[r.compareFunction])), t.has(`EXT_texture_filter_anisotropic`) === true) {
      if (r.magFilter === 1003 || r.minFilter !== 1005 && r.minFilter !== 1008 || r.type === 1015 && t.has(`OES_texture_float_linear`) === false) return;
      if (r.anisotropy > 1 || f.get(r).__currentAnisotropy) {
        let i = t.get(`EXT_texture_filter_anisotropic`);
        e.texParameterf(n, i.TEXTURE_MAX_ANISOTROPY_EXT, Math.min(r.anisotropy, p.getMaxAnisotropy())), f.get(r).__currentAnisotropy = r.anisotropy;
      }
    }
  }
  function me(t, n) {
    let r = false;
    t.__webglInit === undefined && (t.__webglInit = true, n.addEventListener(`dispose`, te));
    let source = n.source,
      a = S.get(source);
    a === undefined && (a = {}, S.set(source, a));
    let o = se(n);
    if (o !== t.__cacheKey) {
      a[o] === undefined && (a[o] = {
        texture: e.createTexture(),
        usedTimes: 0
      }, h.memory.textures++, r = true), a[o].usedTimes++;
      let i = a[t.__cacheKey];
      i !== undefined && (a[t.__cacheKey].usedTimes--, i.usedTimes === 0 && P(n)), t.__cacheKey = o, t.__webglTexture = a[o].texture;
    }
    return r;
  }
  function he(e, t, n) {
    return Math.floor(Math.floor(e / n) / t);
  }
  function ge(t, n, r, i) {
    let updateRanges = t.updateRanges;
    if (updateRanges.length === 0) d.texSubImage2D(e.TEXTURE_2D, 0, 0, 0, n.width, n.height, r, i, n.data);else {
      updateRanges.sort((left, right) => left.start - right.start);
      let o = 0;
      for (let e = 1; e < updateRanges.length; e++) {
        let t = updateRanges[o],
          r = updateRanges[e],
          i = t.start + t.count,
          s = he(r.start, n.width, 4),
          c = he(t.start, n.width, 4);
        r.start <= i + 1 && s === c && he(r.start + r.count - 1, n.width, 4) === s ? t.count = Math.max(t.count, r.start + r.count - t.start) : (++o, updateRanges[o] = r);
      }
      updateRanges.length = o + 1;
      let parameter = d.getParameter(e.UNPACK_ROW_LENGTH),
        parameterResult = d.getParameter(e.UNPACK_SKIP_PIXELS),
        l = d.getParameter(e.UNPACK_SKIP_ROWS);
      d.pixelStorei(e.UNPACK_ROW_LENGTH, n.width);
      for (let t = 0, o = updateRanges.length; t < o; t++) {
        let o = updateRanges[t],
          s = Math.floor(o.start / 4),
          c = Math.ceil(o.count / 4),
          l = s % n.width,
          u = Math.floor(s / n.width),
          f = c;
        d.pixelStorei(e.UNPACK_SKIP_PIXELS, l), d.pixelStorei(e.UNPACK_SKIP_ROWS, u), d.texSubImage2D(e.TEXTURE_2D, 0, l, u, f, 1, r, i, n.data);
      }
      t.clearUpdateRanges(), d.pixelStorei(e.UNPACK_ROW_LENGTH, parameter), d.pixelStorei(e.UNPACK_SKIP_PIXELS, parameterResult), d.pixelStorei(e.UNPACK_SKIP_ROWS, l);
    }
  }
  function _e(t, n, r) {
    let tEXTURE_2D = e.TEXTURE_2D;
    (n.isDataArrayTexture || n.isCompressedArrayTexture) && (tEXTURE_2D = e.TEXTURE_2D_ARRAY), n.isData3DTexture && (tEXTURE_2D = e.TEXTURE_3D);
    let a = me(t, n),
      source = n.source;
    d.bindTexture(tEXTURE_2D, t.__webglTexture, e.TEXTURE0 + r);
    let s = f.get(source);
    if (source.version !== s.__version || a === true) {
      if (d.activeTexture(e.TEXTURE0 + r), !(typeof ImageBitmap < `u` && n.image instanceof ImageBitmap)) {
        let primaries = Y.getPrimaries(Y.workingColorSpace),
          r = n.colorSpace === `` ? null : Y.getPrimaries(n.colorSpace),
          i = n.colorSpace === `` || primaries === r ? e.NONE : e.BROWSER_DEFAULT_WEBGL;
        d.pixelStorei(e.UNPACK_FLIP_Y_WEBGL, n.flipY), d.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL, n.premultiplyAlpha), d.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL, i);
      }
      d.pixelStorei(e.UNPACK_ALIGNMENT, n.unpackAlignment);
      let t = T(n.image, false, p.maxTextureSize);
      t = je(n, t);
      let c = m.convert(n.format, n.colorSpace),
        l = m.convert(n.type),
        u = A(n.internalFormat, c, l, n.normalized, n.colorSpace, n.isVideoTexture);
      pe(tEXTURE_2D, n);
      let total,
        mipmaps = n.mipmaps,
        g = n.isVideoTexture !== true,
        _ = s.__version === undefined || a === true,
        dataReady = source.dataReady,
        y = ee(n, t);
      if (n.isDepthTexture) u = j(n.format === O, n.type), _ && (g ? d.texStorage2D(e.TEXTURE_2D, 1, u, t.width, t.height) : d.texImage2D(e.TEXTURE_2D, 0, u, t.width, t.height, 0, c, l, null));else if (n.isDataTexture) {
        if (mipmaps.length > 0) {
          g && _ && d.texStorage2D(e.TEXTURE_2D, y, u, mipmaps[0].width, mipmaps[0].height);
          for (let t = 0, n = mipmaps.length; t < n; t++) total = mipmaps[t], g ? dataReady && d.texSubImage2D(e.TEXTURE_2D, t, 0, 0, total.width, total.height, c, l, total.data) : d.texImage2D(e.TEXTURE_2D, t, u, total.width, total.height, 0, c, l, total.data);
          n.generateMipmaps = false;
        } else g ? (_ && d.texStorage2D(e.TEXTURE_2D, y, u, t.width, t.height), dataReady && ge(n, t, c, l)) : d.texImage2D(e.TEXTURE_2D, 0, u, t.width, t.height, 0, c, l, t.data);
      } else if (n.isCompressedTexture) {
        if (n.isCompressedArrayTexture) {
          g && _ && d.texStorage3D(e.TEXTURE_2D_ARRAY, y, u, mipmaps[0].width, mipmaps[0].height, t.depth);
          for (let r = 0, i = mipmaps.length; r < i; r++) if (total = mipmaps[r], n.format !== 1023) {
            if (c !== null) {
              if (g) {
                if (dataReady) {
                  if (n.layerUpdates.size > 0) {
                    let t = Ia(total.width, total.height, n.format, n.type);
                    for (let i of n.layerUpdates) {
                      let subarray = total.data.subarray(i * t / total.data.BYTES_PER_ELEMENT, (i + 1) * t / total.data.BYTES_PER_ELEMENT);
                      d.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY, r, 0, 0, i, total.width, total.height, 1, c, subarray);
                    }
                  } else d.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY, r, 0, 0, 0, total.width, total.height, t.depth, c, total.data);
                }
              } else d.compressedTexImage3D(e.TEXTURE_2D_ARRAY, r, u, total.width, total.height, t.depth, 0, total.data, 0, 0);
            } else U(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`);
          } else g ? dataReady && d.texSubImage3D(e.TEXTURE_2D_ARRAY, r, 0, 0, 0, total.width, total.height, t.depth, c, l, total.data) : d.texImage3D(e.TEXTURE_2D_ARRAY, r, u, total.width, total.height, t.depth, 0, c, l, total.data);
          n.layerUpdates.size > 0 && n.clearLayerUpdates();
        } else {
          g && _ && d.texStorage2D(e.TEXTURE_2D, y, u, mipmaps[0].width, mipmaps[0].height);
          for (let t = 0, r = mipmaps.length; t < r; t++) total = mipmaps[t], n.format === 1023 ? g ? dataReady && d.texSubImage2D(e.TEXTURE_2D, t, 0, 0, total.width, total.height, c, l, total.data) : d.texImage2D(e.TEXTURE_2D, t, u, total.width, total.height, 0, c, l, total.data) : c === null ? U(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`) : g ? dataReady && d.compressedTexSubImage2D(e.TEXTURE_2D, t, 0, 0, total.width, total.height, c, total.data) : d.compressedTexImage2D(e.TEXTURE_2D, t, u, total.width, total.height, 0, total.data);
        }
      } else if (n.isDataArrayTexture) {
        if (g) {
          if (_ && d.texStorage3D(e.TEXTURE_2D_ARRAY, y, u, t.width, t.height, t.depth), dataReady) {
            if (n.layerUpdates.size > 0) {
              let r = Ia(t.width, t.height, n.format, n.type);
              for (let i of n.layerUpdates) {
                let subarray = t.data.subarray(i * r / t.data.BYTES_PER_ELEMENT, (i + 1) * r / t.data.BYTES_PER_ELEMENT);
                d.texSubImage3D(e.TEXTURE_2D_ARRAY, 0, 0, 0, i, t.width, t.height, 1, c, l, subarray);
              }
              n.clearLayerUpdates();
            } else d.texSubImage3D(e.TEXTURE_2D_ARRAY, 0, 0, 0, 0, t.width, t.height, t.depth, c, l, t.data);
          }
        } else d.texImage3D(e.TEXTURE_2D_ARRAY, 0, u, t.width, t.height, t.depth, 0, c, l, t.data);
      } else if (n.isData3DTexture) g ? (_ && d.texStorage3D(e.TEXTURE_3D, y, u, t.width, t.height, t.depth), dataReady && d.texSubImage3D(e.TEXTURE_3D, 0, 0, 0, 0, t.width, t.height, t.depth, c, l, t.data)) : d.texImage3D(e.TEXTURE_3D, 0, u, t.width, t.height, t.depth, 0, c, l, t.data);else if (n.isFramebufferTexture) {
        if (_) {
          if (g) d.texStorage2D(e.TEXTURE_2D, y, u, t.width, t.height);else {
            let n = t.width,
              r = t.height;
            for (let t = 0; t < y; t++) d.texImage2D(e.TEXTURE_2D, t, u, n, r, 0, c, l, null), n >>= 1, r >>= 1;
          }
        }
      } else if (n.isHTMLTexture) {
        if (`texElementImage2D` in e) {
          let canvas = e.canvas;
          if (canvas.hasAttribute(`layoutsubtree`) || canvas.setAttribute(`layoutsubtree`, `true`), t.parentNode !== canvas) {
            canvas.appendChild(t), b.add(n), canvas.onpaint = e => {
              let changedElements = e.changedElements;
              for (let ratio of b) changedElements.includes(ratio.image) && (ratio.needsUpdate = true);
            }, canvas.requestPaint();
            return;
          }
          if (e.texElementImage2D.length === 3) e.texElementImage2D(e.TEXTURE_2D, e.RGBA8, t);else {
            let rGBA = e.RGBA,
              r = e.RGBA,
              uNSIGNED_BYTE = e.UNSIGNED_BYTE;
            e.texElementImage2D(e.TEXTURE_2D, 0, rGBA, r, uNSIGNED_BYTE, t);
          }
          e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, e.LINEAR), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_S, e.CLAMP_TO_EDGE), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_T, e.CLAMP_TO_EDGE);
        }
      } else if (mipmaps.length > 0) {
        if (g && _) {
          let t = z(mipmaps[0]);
          d.texStorage2D(e.TEXTURE_2D, y, u, t.width, t.height);
        }
        for (let t = 0, n = mipmaps.length; t < n; t++) total = mipmaps[t], g ? dataReady && d.texSubImage2D(e.TEXTURE_2D, t, 0, 0, c, l, total) : d.texImage2D(e.TEXTURE_2D, t, u, c, l, total);
        n.generateMipmaps = false;
      } else if (g) {
        if (_) {
          let n = z(t);
          d.texStorage2D(e.TEXTURE_2D, y, u, n.width, n.height);
        }
        dataReady && d.texSubImage2D(e.TEXTURE_2D, 0, 0, 0, c, l, t);
      } else d.texImage2D(e.TEXTURE_2D, 0, u, c, l, t);
      E(n) && D(tEXTURE_2D), s.__version = source.version, n.onUpdate && n.onUpdate(n);
    }
    t.__version = n.version;
  }
  function ve(t, n, r) {
    if (n.image.length !== 6) return;
    let i = me(t, n),
      source = n.source;
    d.bindTexture(e.TEXTURE_CUBE_MAP, t.__webglTexture, e.TEXTURE0 + r);
    let o = f.get(source);
    if (source.version !== o.__version || i === true) {
      d.activeTexture(e.TEXTURE0 + r);
      let primaries = Y.getPrimaries(Y.workingColorSpace),
        s = n.colorSpace === `` ? null : Y.getPrimaries(n.colorSpace),
        c = n.colorSpace === `` || primaries === s ? e.NONE : e.BROWSER_DEFAULT_WEBGL;
      d.pixelStorei(e.UNPACK_FLIP_Y_WEBGL, n.flipY), d.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL, n.premultiplyAlpha), d.pixelStorei(e.UNPACK_ALIGNMENT, n.unpackAlignment), d.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL, c);
      let fallbackValue = n.isCompressedTexture || n.image[0].isCompressedTexture,
        u = n.image[0] && n.image[0].isDataTexture,
        total = [];
      for (let e = 0; e < 6; e++) !fallbackValue && !u ? total[e] = T(n.image[e], true, p.maxCubemapSize) : total[e] = u ? n.image[e].image : n.image[e], total[e] = je(n, total[e]);
      let h = total[0],
        g = m.convert(n.format, n.colorSpace),
        _ = m.convert(n.type),
        v = A(n.internalFormat, g, _, n.normalized, n.colorSpace),
        y = n.isVideoTexture !== true,
        b = o.__version === undefined || i === true,
        dataReady = source.dataReady,
        S = ee(n, h);
      pe(e.TEXTURE_CUBE_MAP, n);
      let mipmaps;
      if (fallbackValue) {
        y && b && d.texStorage2D(e.TEXTURE_CUBE_MAP, S, v, h.width, h.height);
        for (let t = 0; t < 6; t++) {
          mipmaps = total[t].mipmaps;
          for (let r = 0; r < mipmaps.length; r++) {
            let i = mipmaps[r];
            n.format === 1023 ? y ? dataReady && d.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + t, r, 0, 0, i.width, i.height, g, _, i.data) : d.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + t, r, v, i.width, i.height, 0, g, _, i.data) : g === null ? U(`WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()`) : y ? dataReady && d.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + t, r, 0, 0, i.width, i.height, g, i.data) : d.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + t, r, v, i.width, i.height, 0, i.data);
          }
        }
      } else {
        if (mipmaps = n.mipmaps, y && b) {
          mipmaps.length > 0 && S++;
          let t = z(total[0]);
          d.texStorage2D(e.TEXTURE_CUBE_MAP, S, v, t.width, t.height);
        }
        for (let t = 0; t < 6; t++) if (u) {
          y ? dataReady && d.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + t, 0, 0, 0, total[t].width, total[t].height, g, _, total[t].data) : d.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + t, 0, v, total[t].width, total[t].height, 0, g, _, total[t].data);
          for (let n = 0; n < mipmaps.length; n++) {
            let image = mipmaps[n].image[t].image;
            y ? dataReady && d.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + t, n + 1, 0, 0, image.width, image.height, g, _, image.data) : d.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + t, n + 1, v, image.width, image.height, 0, g, _, image.data);
          }
        } else {
          y ? dataReady && d.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + t, 0, 0, 0, g, _, total[t]) : d.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + t, 0, v, g, _, total[t]);
          for (let n = 0; n < mipmaps.length; n++) {
            let r = mipmaps[n];
            y ? dataReady && d.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + t, n + 1, 0, 0, g, _, r.image[t]) : d.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + t, n + 1, v, g, _, r.image[t]);
          }
        }
      }
      E(n) && D(e.TEXTURE_CUBE_MAP), o.__version = source.version, n.onUpdate && n.onUpdate(n);
    }
    t.__version = n.version;
  }
  function ye(t, n, r, i, a, o) {
    let s = m.convert(r.format, r.colorSpace),
      c = m.convert(r.type),
      l = A(r.internalFormat, s, c, r.normalized, r.colorSpace),
      u = f.get(n),
      p = f.get(r);
    if (p.__renderTarget = n, !u.__hasExternalTextures) {
      let t = Math.max(1, n.width >> o),
        r = Math.max(1, n.height >> o);
      a === e.TEXTURE_3D || a === e.TEXTURE_2D_ARRAY ? d.texImage3D(a, o, l, t, r, n.depth, 0, s, c, null) : d.texImage2D(a, o, l, t, r, 0, s, c, null);
    }
    d.bindFramebuffer(e.FRAMEBUFFER, t), Ae(n) ? g.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER, i, a, p.__webglTexture, 0, ke(n)) : (a === e.TEXTURE_2D || a >= e.TEXTURE_CUBE_MAP_POSITIVE_X && a <= e.TEXTURE_CUBE_MAP_NEGATIVE_Z) && e.framebufferTexture2D(e.FRAMEBUFFER, i, a, p.__webglTexture, o), d.bindFramebuffer(e.FRAMEBUFFER, null);
  }
  function be(count, n, r) {
    if (e.bindRenderbuffer(e.RENDERBUFFER, count), n.depthBuffer) {
      let depthTexture = n.depthTexture,
        a = depthTexture && depthTexture.isDepthTexture ? depthTexture.type : null,
        o = j(n.stencilBuffer, a),
        s = n.stencilBuffer ? e.DEPTH_STENCIL_ATTACHMENT : e.DEPTH_ATTACHMENT;
      Ae(n) ? g.renderbufferStorageMultisampleEXT(e.RENDERBUFFER, ke(n), o, n.width, n.height) : r ? e.renderbufferStorageMultisample(e.RENDERBUFFER, ke(n), o, n.width, n.height) : e.renderbufferStorage(e.RENDERBUFFER, o, n.width, n.height), e.framebufferRenderbuffer(e.FRAMEBUFFER, s, e.RENDERBUFFER, count);
    } else {
      let textures = n.textures;
      for (let i = 0; i < textures.length; i++) {
        let a = textures[i],
          o = m.convert(a.format, a.colorSpace),
          s = m.convert(a.type),
          c = A(a.internalFormat, o, s, a.normalized, a.colorSpace);
        Ae(n) ? g.renderbufferStorageMultisampleEXT(e.RENDERBUFFER, ke(n), c, n.width, n.height) : r ? e.renderbufferStorageMultisample(e.RENDERBUFFER, ke(n), c, n.width, n.height) : e.renderbufferStorage(e.RENDERBUFFER, c, n.width, n.height);
      }
    }
    e.bindRenderbuffer(e.RENDERBUFFER, null);
  }
  function xe(t, n, r) {
    let i = n.isWebGLCubeRenderTarget === true;
    if (d.bindFramebuffer(e.FRAMEBUFFER, t), !(n.depthTexture && n.depthTexture.isDepthTexture)) throw Error(`THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.`);
    let a = f.get(n.depthTexture);
    if (a.__renderTarget = n, (!a.__webglTexture || n.depthTexture.image.width !== n.width || n.depthTexture.image.height !== n.height) && (n.depthTexture.image.width = n.width, n.depthTexture.image.height = n.height, n.depthTexture.needsUpdate = true), i) {
      if (a.__webglInit === undefined && (a.__webglInit = true, n.depthTexture.addEventListener(`dispose`, te)), a.__webglTexture === undefined) {
        a.__webglTexture = e.createTexture(), d.bindTexture(e.TEXTURE_CUBE_MAP, a.__webglTexture), pe(e.TEXTURE_CUBE_MAP, n.depthTexture);
        let t = m.convert(n.depthTexture.format),
          r = m.convert(n.depthTexture.type),
          i;
        n.depthTexture.format === 1026 ? i = e.DEPTH_COMPONENT24 : n.depthTexture.format === 1027 && (i = e.DEPTH24_STENCIL8);
        for (let a = 0; a < 6; a++) e.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + a, 0, i, n.width, n.height, 0, t, r, null);
      }
    } else I(n.depthTexture, 0);
    let __webglTexture = a.__webglTexture,
      s = ke(n),
      c = i ? e.TEXTURE_CUBE_MAP_POSITIVE_X + r : e.TEXTURE_2D,
      l = n.depthTexture.format === 1027 ? e.DEPTH_STENCIL_ATTACHMENT : e.DEPTH_ATTACHMENT;
    if (n.depthTexture.format === 1026) Ae(n) ? g.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER, l, c, __webglTexture, 0, s) : e.framebufferTexture2D(e.FRAMEBUFFER, l, c, __webglTexture, 0);else if (n.depthTexture.format === 1027) Ae(n) ? g.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER, l, c, __webglTexture, 0, s) : e.framebufferTexture2D(e.FRAMEBUFFER, l, c, __webglTexture, 0);else throw Error(`THREE.WebGLTextures: Unknown depthTexture format.`);
  }
  function Se(t) {
    let n = f.get(t),
      r = t.isWebGLCubeRenderTarget === true;
    if (n.__boundDepthTexture !== t.depthTexture) {
      let depthTexture = t.depthTexture;
      if (n.__depthDisposeCallback && n.__depthDisposeCallback(), depthTexture) {
        let handler = () => {
          delete n.__boundDepthTexture, delete n.__depthDisposeCallback, depthTexture.removeEventListener(`dispose`, handler);
        };
        depthTexture.addEventListener(`dispose`, handler), n.__depthDisposeCallback = handler;
      }
      n.__boundDepthTexture = depthTexture;
    }
    if (t.depthTexture && !n.__autoAllocateDepthBuffer) {
      if (r) for (let e = 0; e < 6; e++) xe(n.__webglFramebuffer[e], t, e);else {
        let mipmaps = t.texture.mipmaps;
        mipmaps && mipmaps.length > 0 ? xe(n.__webglFramebuffer[0], t, 0) : xe(n.__webglFramebuffer, t, 0);
      }
    } else if (r) {
      n.__webglDepthbuffer = [];
      for (let r = 0; r < 6; r++) if (d.bindFramebuffer(e.FRAMEBUFFER, n.__webglFramebuffer[r]), n.__webglDepthbuffer[r] === undefined) n.__webglDepthbuffer[r] = e.createRenderbuffer(), be(n.__webglDepthbuffer[r], t, false);else {
        let i = t.stencilBuffer ? e.DEPTH_STENCIL_ATTACHMENT : e.DEPTH_ATTACHMENT,
          a = n.__webglDepthbuffer[r];
        e.bindRenderbuffer(e.RENDERBUFFER, a), e.framebufferRenderbuffer(e.FRAMEBUFFER, i, e.RENDERBUFFER, a);
      }
    } else {
      let mipmaps = t.texture.mipmaps;
      if (mipmaps && mipmaps.length > 0 ? d.bindFramebuffer(e.FRAMEBUFFER, n.__webglFramebuffer[0]) : d.bindFramebuffer(e.FRAMEBUFFER, n.__webglFramebuffer), n.__webglDepthbuffer === undefined) n.__webglDepthbuffer = e.createRenderbuffer(), be(n.__webglDepthbuffer, t, false);else {
        let r = t.stencilBuffer ? e.DEPTH_STENCIL_ATTACHMENT : e.DEPTH_ATTACHMENT,
          __webglDepthbuffer = n.__webglDepthbuffer;
        e.bindRenderbuffer(e.RENDERBUFFER, __webglDepthbuffer), e.framebufferRenderbuffer(e.FRAMEBUFFER, r, e.RENDERBUFFER, __webglDepthbuffer);
      }
    }
    d.bindFramebuffer(e.FRAMEBUFFER, null);
  }
  function Ce(t, n, r) {
    let i = f.get(t);
    n !== undefined && ye(i.__webglFramebuffer, t, t.texture, e.COLOR_ATTACHMENT0, e.TEXTURE_2D, 0), r !== undefined && Se(t);
  }
  function we(t) {
    let texture = t.texture,
      r = f.get(t),
      i = f.get(texture);
    t.addEventListener(`dispose`, M);
    let textures = t.textures,
      o = t.isWebGLCubeRenderTarget === true,
      s = textures.length > 1;
    if (s || (i.__webglTexture === undefined && (i.__webglTexture = e.createTexture()), i.__version = texture.version, h.memory.textures++), o) {
      r.__webglFramebuffer = [];
      for (let t = 0; t < 6; t++) if (texture.mipmaps && texture.mipmaps.length > 0) {
        r.__webglFramebuffer[t] = [];
        for (let i = 0; i < texture.mipmaps.length; i++) r.__webglFramebuffer[t][i] = e.createFramebuffer();
      } else r.__webglFramebuffer[t] = e.createFramebuffer();
    } else {
      if (texture.mipmaps && texture.mipmaps.length > 0) {
        r.__webglFramebuffer = [];
        for (let t = 0; t < texture.mipmaps.length; t++) r.__webglFramebuffer[t] = e.createFramebuffer();
      } else r.__webglFramebuffer = e.createFramebuffer();
      if (s) for (let t = 0, n = textures.length; t < n; t++) {
        let n = f.get(textures[t]);
        n.__webglTexture === undefined && (n.__webglTexture = e.createTexture(), h.memory.textures++);
      }
      if (t.samples > 0 && Ae(t) === false) {
        r.__webglMultisampledFramebuffer = e.createFramebuffer(), r.__webglColorRenderbuffer = [], d.bindFramebuffer(e.FRAMEBUFFER, r.__webglMultisampledFramebuffer);
        for (let n = 0; n < textures.length; n++) {
          let i = textures[n];
          r.__webglColorRenderbuffer[n] = e.createRenderbuffer(), e.bindRenderbuffer(e.RENDERBUFFER, r.__webglColorRenderbuffer[n]);
          let o = m.convert(i.format, i.colorSpace),
            s = m.convert(i.type),
            c = A(i.internalFormat, o, s, i.normalized, i.colorSpace, t.isXRRenderTarget === true),
            l = ke(t);
          e.renderbufferStorageMultisample(e.RENDERBUFFER, l, c, t.width, t.height), e.framebufferRenderbuffer(e.FRAMEBUFFER, e.COLOR_ATTACHMENT0 + n, e.RENDERBUFFER, r.__webglColorRenderbuffer[n]);
        }
        e.bindRenderbuffer(e.RENDERBUFFER, null), t.depthBuffer && (r.__webglDepthRenderbuffer = e.createRenderbuffer(), be(r.__webglDepthRenderbuffer, t, true)), d.bindFramebuffer(e.FRAMEBUFFER, null);
      }
    }
    if (o) {
      d.bindTexture(e.TEXTURE_CUBE_MAP, i.__webglTexture), pe(e.TEXTURE_CUBE_MAP, texture);
      for (let i = 0; i < 6; i++) if (texture.mipmaps && texture.mipmaps.length > 0) for (let a = 0; a < texture.mipmaps.length; a++) ye(r.__webglFramebuffer[i][a], t, texture, e.COLOR_ATTACHMENT0, e.TEXTURE_CUBE_MAP_POSITIVE_X + i, a);else ye(r.__webglFramebuffer[i], t, texture, e.COLOR_ATTACHMENT0, e.TEXTURE_CUBE_MAP_POSITIVE_X + i, 0);
      E(texture) && D(e.TEXTURE_CUBE_MAP), d.unbindTexture();
    } else if (s) {
      for (let n = 0, i = textures.length; n < i; n++) {
        let i = textures[n],
          o = f.get(i),
          tEXTURE_2D = e.TEXTURE_2D;
        (t.isWebGL3DRenderTarget || t.isWebGLArrayRenderTarget) && (tEXTURE_2D = t.isWebGL3DRenderTarget ? e.TEXTURE_3D : e.TEXTURE_2D_ARRAY), d.bindTexture(tEXTURE_2D, o.__webglTexture), pe(tEXTURE_2D, i), ye(r.__webglFramebuffer, t, i, e.COLOR_ATTACHMENT0 + n, tEXTURE_2D, 0), E(i) && D(tEXTURE_2D);
      }
      d.unbindTexture();
    } else {
      let tEXTURE_2D = e.TEXTURE_2D;
      if ((t.isWebGL3DRenderTarget || t.isWebGLArrayRenderTarget) && (tEXTURE_2D = t.isWebGL3DRenderTarget ? e.TEXTURE_3D : e.TEXTURE_2D_ARRAY), d.bindTexture(tEXTURE_2D, i.__webglTexture), pe(tEXTURE_2D, texture), texture.mipmaps && texture.mipmaps.length > 0) for (let i = 0; i < texture.mipmaps.length; i++) ye(r.__webglFramebuffer[i], t, texture, e.COLOR_ATTACHMENT0, tEXTURE_2D, i);else ye(r.__webglFramebuffer, t, texture, e.COLOR_ATTACHMENT0, tEXTURE_2D, 0);
      E(texture) && D(tEXTURE_2D), d.unbindTexture();
    }
    t.depthBuffer && Se(t);
  }
  function Te(e) {
    let textures = e.textures;
    for (let n = 0, r = textures.length; n < r; n++) {
      let r = textures[n];
      if (E(r)) {
        let t = k(e),
          __webglTexture = f.get(r).__webglTexture;
        d.bindTexture(t, __webglTexture), D(t), d.unbindTexture();
      }
    }
  }
  let Ee = [],
    De = [];
  function Oe(t) {
    if (t.samples > 0) {
      if (Ae(t) === false) {
        let textures = t.textures,
          r = t.width,
          i = t.height,
          cOLOR_BUFFER_BIT = e.COLOR_BUFFER_BIT,
          o = t.stencilBuffer ? e.DEPTH_STENCIL_ATTACHMENT : e.DEPTH_ATTACHMENT,
          s = f.get(t),
          c = textures.length > 1;
        if (c) for (let t = 0; t < textures.length; t++) d.bindFramebuffer(e.FRAMEBUFFER, s.__webglMultisampledFramebuffer), e.framebufferRenderbuffer(e.FRAMEBUFFER, e.COLOR_ATTACHMENT0 + t, e.RENDERBUFFER, null), d.bindFramebuffer(e.FRAMEBUFFER, s.__webglFramebuffer), e.framebufferTexture2D(e.DRAW_FRAMEBUFFER, e.COLOR_ATTACHMENT0 + t, e.TEXTURE_2D, null, 0);
        d.bindFramebuffer(e.READ_FRAMEBUFFER, s.__webglMultisampledFramebuffer);
        let mipmaps = t.texture.mipmaps;
        mipmaps && mipmaps.length > 0 ? d.bindFramebuffer(e.DRAW_FRAMEBUFFER, s.__webglFramebuffer[0]) : d.bindFramebuffer(e.DRAW_FRAMEBUFFER, s.__webglFramebuffer);
        for (let l = 0; l < textures.length; l++) {
          if (t.resolveDepthBuffer && (t.depthBuffer && (cOLOR_BUFFER_BIT |= e.DEPTH_BUFFER_BIT), t.stencilBuffer && t.resolveStencilBuffer && (cOLOR_BUFFER_BIT |= e.STENCIL_BUFFER_BIT)), c) {
            e.framebufferRenderbuffer(e.READ_FRAMEBUFFER, e.COLOR_ATTACHMENT0, e.RENDERBUFFER, s.__webglColorRenderbuffer[l]);
            let __webglTexture = f.get(textures[l]).__webglTexture;
            e.framebufferTexture2D(e.DRAW_FRAMEBUFFER, e.COLOR_ATTACHMENT0, e.TEXTURE_2D, __webglTexture, 0);
          }
          e.blitFramebuffer(0, 0, r, i, 0, 0, r, i, cOLOR_BUFFER_BIT, e.NEAREST), _ === true && (Ee.length = 0, De.length = 0, Ee.push(e.COLOR_ATTACHMENT0 + l), t.depthBuffer && t.storeMultisampledDepthBuffer === false && (Ee.push(o), De.push(o), e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER, De)), e.invalidateFramebuffer(e.READ_FRAMEBUFFER, Ee));
        }
        if (d.bindFramebuffer(e.READ_FRAMEBUFFER, null), d.bindFramebuffer(e.DRAW_FRAMEBUFFER, null), c) for (let t = 0; t < textures.length; t++) {
          d.bindFramebuffer(e.FRAMEBUFFER, s.__webglMultisampledFramebuffer), e.framebufferRenderbuffer(e.FRAMEBUFFER, e.COLOR_ATTACHMENT0 + t, e.RENDERBUFFER, s.__webglColorRenderbuffer[t]);
          let __webglTexture = f.get(textures[t]).__webglTexture;
          d.bindFramebuffer(e.FRAMEBUFFER, s.__webglFramebuffer), e.framebufferTexture2D(e.DRAW_FRAMEBUFFER, e.COLOR_ATTACHMENT0 + t, e.TEXTURE_2D, __webglTexture, 0);
        }
        d.bindFramebuffer(e.DRAW_FRAMEBUFFER, s.__webglMultisampledFramebuffer);
      } else if (t.depthBuffer && t.storeMultisampledDepthBuffer === false && _) {
        let n = t.stencilBuffer ? e.DEPTH_STENCIL_ATTACHMENT : e.DEPTH_ATTACHMENT;
        e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER, [n]);
      }
    }
  }
  function ke(e) {
    return Math.min(p.maxSamples, e.samples);
  }
  function Ae(e) {
    let n = f.get(e);
    return e.samples > 0 && t.has(`WEBGL_multisampled_render_to_texture`) === true && n.__useRenderToTexture !== false;
  }
  function R(e) {
    let frame = h.render.frame;
    weakMap.get(e) !== frame && (weakMap.set(e, frame), e.update());
  }
  function je(e, t) {
    let colorSpace = e.colorSpace,
      format = e.format,
      i = e.type;
    return e.isCompressedTexture === true || e.isVideoTexture === true || colorSpace !== `srgb-linear` && colorSpace !== `` && (Y.getTransfer(colorSpace) === `srgb` ? (format !== 1023 || i !== 1009) && U(`WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.`) : W(`WebGLTextures: Unsupported texture color space:`, colorSpace)), t;
  }
  function z(e) {
    return typeof HTMLImageElement < `u` && e instanceof HTMLImageElement ? (v.width = e.naturalWidth || e.width, v.height = e.naturalHeight || e.height) : typeof VideoFrame < `u` && e instanceof VideoFrame ? (v.width = e.displayWidth, v.height = e.displayHeight) : (v.width = e.width, v.height = e.height), v;
  }
  this.allocateTextureUnit = oe, this.resetTextureUnits = re, this.getTextureUnits = ie, this.setTextureUnits = ae, this.setTexture2D = I, this.setTexture2DArray = L, this.setTexture3D = ce, this.setTextureCube = le, this.rebindTextures = Ce, this.setupRenderTarget = we, this.updateRenderTargetMipmap = Te, this.updateMultisampleRenderTarget = Oe, this.setupDepthRenderbuffer = Se, this.setupFrameBufferTexture = ye, this.useMultisampledRTT = Ae, this.isReversedDepthBuffer = function () {
    return d.buffers.depth.getReversed();
  };
}
function Uc(e, t) {
  function n(n, r = ``) {
    let count,
      transfer = Y.getTransfer(r);
    if (n === 1009) return e.UNSIGNED_BYTE;
    if (n === 1017) return e.UNSIGNED_SHORT_4_4_4_4;
    if (n === 1018) return e.UNSIGNED_SHORT_5_5_5_1;
    if (n === 35902) return e.UNSIGNED_INT_5_9_9_9_REV;
    if (n === 35899) return e.UNSIGNED_INT_10F_11F_11F_REV;
    if (n === 1010) return e.BYTE;
    if (n === 1011) return e.SHORT;
    if (n === 1012) return e.UNSIGNED_SHORT;
    if (n === 1013) return e.INT;
    if (n === 1014) return e.UNSIGNED_INT;
    if (n === 1015) return e.FLOAT;
    if (n === 1016) return e.HALF_FLOAT;
    if (n === 1021) return e.ALPHA;
    if (n === 1022) return e.RGB;
    if (n === 1023) return e.RGBA;
    if (n === 1026) return e.DEPTH_COMPONENT;
    if (n === 1027) return e.DEPTH_STENCIL;
    if (n === 1028) return e.RED;
    if (n === 1029) return e.RED_INTEGER;
    if (n === 1030) return e.RG;
    if (n === 1031) return e.RG_INTEGER;
    if (n === 1033) return e.RGBA_INTEGER;
    if (n === 33776 || n === 33777 || n === 33778 || n === 33779) {
      if (transfer === `srgb`) {
        if (count = t.get(`WEBGL_compressed_texture_s3tc_srgb`), count !== null) {
          if (n === 33776) return count.COMPRESSED_SRGB_S3TC_DXT1_EXT;
          if (n === 33777) return count.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;
          if (n === 33778) return count.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;
          if (n === 33779) return count.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT;
        } else return null;
      } else if (count = t.get(`WEBGL_compressed_texture_s3tc`), count !== null) {
        if (n === 33776) return count.COMPRESSED_RGB_S3TC_DXT1_EXT;
        if (n === 33777) return count.COMPRESSED_RGBA_S3TC_DXT1_EXT;
        if (n === 33778) return count.COMPRESSED_RGBA_S3TC_DXT3_EXT;
        if (n === 33779) return count.COMPRESSED_RGBA_S3TC_DXT5_EXT;
      } else return null;
    }
    if (n === 35840 || n === 35841 || n === 35842 || n === 35843) {
      if (count = t.get(`WEBGL_compressed_texture_pvrtc`), count !== null) {
        if (n === 35840) return count.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;
        if (n === 35841) return count.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;
        if (n === 35842) return count.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;
        if (n === 35843) return count.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG;
      } else return null;
    }
    if (n === 36196 || n === 37492 || n === 37496 || n === 37488 || n === 37489 || n === 37490 || n === 37491) {
      if (count = t.get(`WEBGL_compressed_texture_etc`), count !== null) {
        if (n === 36196 || n === 37492) return transfer === `srgb` ? count.COMPRESSED_SRGB8_ETC2 : count.COMPRESSED_RGB8_ETC2;
        if (n === 37496) return transfer === `srgb` ? count.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC : count.COMPRESSED_RGBA8_ETC2_EAC;
        if (n === 37488) return count.COMPRESSED_R11_EAC;
        if (n === 37489) return count.COMPRESSED_SIGNED_R11_EAC;
        if (n === 37490) return count.COMPRESSED_RG11_EAC;
        if (n === 37491) return count.COMPRESSED_SIGNED_RG11_EAC;
      } else return null;
    }
    if (n === 37808 || n === 37809 || n === 37810 || n === 37811 || n === 37812 || n === 37813 || n === 37814 || n === 37815 || n === 37816 || n === 37817 || n === 37818 || n === 37819 || n === 37820 || n === 37821) {
      if (count = t.get(`WEBGL_compressed_texture_astc`), count !== null) {
        if (n === 37808) return transfer === `srgb` ? count.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR : count.COMPRESSED_RGBA_ASTC_4x4_KHR;
        if (n === 37809) return transfer === `srgb` ? count.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR : count.COMPRESSED_RGBA_ASTC_5x4_KHR;
        if (n === 37810) return transfer === `srgb` ? count.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR : count.COMPRESSED_RGBA_ASTC_5x5_KHR;
        if (n === 37811) return transfer === `srgb` ? count.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR : count.COMPRESSED_RGBA_ASTC_6x5_KHR;
        if (n === 37812) return transfer === `srgb` ? count.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR : count.COMPRESSED_RGBA_ASTC_6x6_KHR;
        if (n === 37813) return transfer === `srgb` ? count.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR : count.COMPRESSED_RGBA_ASTC_8x5_KHR;
        if (n === 37814) return transfer === `srgb` ? count.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR : count.COMPRESSED_RGBA_ASTC_8x6_KHR;
        if (n === 37815) return transfer === `srgb` ? count.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR : count.COMPRESSED_RGBA_ASTC_8x8_KHR;
        if (n === 37816) return transfer === `srgb` ? count.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR : count.COMPRESSED_RGBA_ASTC_10x5_KHR;
        if (n === 37817) return transfer === `srgb` ? count.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR : count.COMPRESSED_RGBA_ASTC_10x6_KHR;
        if (n === 37818) return transfer === `srgb` ? count.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR : count.COMPRESSED_RGBA_ASTC_10x8_KHR;
        if (n === 37819) return transfer === `srgb` ? count.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR : count.COMPRESSED_RGBA_ASTC_10x10_KHR;
        if (n === 37820) return transfer === `srgb` ? count.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR : count.COMPRESSED_RGBA_ASTC_12x10_KHR;
        if (n === 37821) return transfer === `srgb` ? count.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR : count.COMPRESSED_RGBA_ASTC_12x12_KHR;
      } else return null;
    }
    if (n === 36492 || n === 36494 || n === 36495) {
      if (count = t.get(`EXT_texture_compression_bptc`), count !== null) {
        if (n === 36492) return transfer === `srgb` ? count.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT : count.COMPRESSED_RGBA_BPTC_UNORM_EXT;
        if (n === 36494) return count.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;
        if (n === 36495) return count.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT;
      } else return null;
    }
    if (n === 36283 || n === 36284 || n === 36285 || n === 36286) {
      if (count = t.get(`EXT_texture_compression_rgtc`), count !== null) {
        if (n === 36283) return count.COMPRESSED_RED_RGTC1_EXT;
        if (n === 36284) return count.COMPRESSED_SIGNED_RED_RGTC1_EXT;
        if (n === 36285) return count.COMPRESSED_RED_GREEN_RGTC2_EXT;
        if (n === 36286) return count.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT;
      } else return null;
    }
    return n === 1020 ? e.UNSIGNED_INT_24_8 : e[n] === undefined ? null : e[n];
  }
  return {
    convert: n
  };
}
var Wc = `
void main() {

	gl_Position = vec4( position, 1.0 );

}`,
  Gc = `
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,
  Kc = class {
    constructor() {
      this.texture = null, this.mesh = null, this.depthNear = 0, this.depthFar = 0;
    }
    init(e, t) {
      if (this.texture === null) {
        let n = new hi(e.texture);
        (e.depthNear !== t.depthNear || e.depthFar !== t.depthFar) && (this.depthNear = e.depthNear, this.depthFar = e.depthFar), this.texture = n;
      }
    }
    getMesh(mesh) {
      if (this.texture !== null && this.mesh === null) {
        let viewport = mesh.cameras[0].viewport,
          n = new Di({
            vertexShader: Wc,
            fragmentShader: Gc,
            uniforms: {
              depthColor: {
                value: this.texture
              },
              depthWidth: {
                value: viewport.z
              },
              depthHeight: {
                value: viewport.w
              }
            }
          });
        this.mesh = new Yr(new vi(20, 20), n);
      }
      return this.mesh;
    }
    reset() {
      this.texture = null, this.mesh = null;
    }
    getDepthTexture() {
      return this.texture;
    }
  },
  qc = class extends $e {
    constructor(constructor, count) {
      super();
      let n = this,
        r = null,
        i = 1,
        flag = null,
        o = `local-floor`,
        s = 1,
        total = null,
        l = null,
        u = null,
        f = null,
        ratio = null,
        m = null,
        h = typeof XRWebGLBinding < `u`,
        _ = new Kc(),
        v = {},
        contextAttributes = count.getContextAttributes(),
        b = null,
        type = null,
        mipmaps = [],
        w = [],
        T = new K(),
        k = null,
        A = null,
        j = new la();
      j.viewport = new Ut();
      let ee = new la();
      ee.viewport = new Ut();
      let te = [j, ee],
        M = new _a(),
        near = null,
        far = null;
      this.cameraAutoUpdate = true, this.enabled = false, this.isPresenting = false, this.getController = function (e) {
        let t = mipmaps[e];
        return t === undefined && (t = new Tn(), mipmaps[e] = t), t.getTargetRaySpace();
      }, this.getControllerGrip = function (e) {
        let t = mipmaps[e];
        return t === undefined && (t = new Tn(), mipmaps[e] = t), t.getGripSpace();
      }, this.getHand = function (e) {
        let t = mipmaps[e];
        return t === undefined && (t = new Tn(), mipmaps[e] = t), t.getHandSpace();
      };
      function ne(e) {
        let t = w.indexOf(e.inputSource);
        if (t === -1) return;
        let n = mipmaps[t];
        n !== undefined && (n.update(e.inputSource, e.frame, total || flag), n.dispatchEvent({
          type: e.type,
          data: e.inputSource
        }));
      }
      function F() {
        r.removeEventListener(`select`, ne), r.removeEventListener(`selectstart`, ne), r.removeEventListener(`selectend`, ne), r.removeEventListener(`squeeze`, ne), r.removeEventListener(`squeezestart`, ne), r.removeEventListener(`squeezeend`, ne), r.removeEventListener(`end`, F), r.removeEventListener(`inputsourceschange`, re);
        for (let e = 0; e < mipmaps.length; e++) {
          let t = w[e];
          t !== null && (w[e] = null, mipmaps[e].disconnect(t));
        }
        near = null, far = null, _.reset();
        for (let e in v) delete v[e];
        if (constructor.setRenderTarget(b), ratio = null, f = null, u = null, r = null, type = null, le.stop(), n.isPresenting = false, constructor.setPixelRatio(k), constructor.setSize(T.width, T.height, false), A !== null) {
          let camera = A.camera;
          camera.fov = A.fov, camera.zoom = A.zoom, camera.updateProjectionMatrix(), A = null;
        }
        n.dispatchEvent({
          type: `sessionend`
        });
      }
      this.setFramebufferScaleFactor = function (e) {
        i = e, n.isPresenting === true && U(`WebXRManager: Cannot change framebuffer scale while presenting.`);
      }, this.setReferenceSpaceType = function (e) {
        o = e, n.isPresenting === true && U(`WebXRManager: Cannot change reference space type while presenting.`);
      }, this.getReferenceSpace = function () {
        return total || flag;
      }, this.setReferenceSpace = function (e) {
        total = e;
      }, this.getBaseLayer = function () {
        return f === null ? ratio : f;
      }, this.getBinding = function () {
        return u === null && h && (u = new XRWebGLBinding(r, count)), u;
      }, this.getFrame = function () {
        return m;
      }, this.getSession = function () {
        return r;
      }, this.setSession = async function (l) {
        if (r = l, r !== null) {
          if (b = constructor.getRenderTarget(), r.addEventListener(`select`, ne), r.addEventListener(`selectstart`, ne), r.addEventListener(`selectend`, ne), r.addEventListener(`squeeze`, ne), r.addEventListener(`squeezestart`, ne), r.addEventListener(`squeezeend`, ne), r.addEventListener(`end`, F), r.addEventListener(`inputsourceschange`, re), contextAttributes.xrCompatible !== true && (await count.makeXRCompatible()), k = constructor.getPixelRatio(), constructor.getSize(T), h && `createProjectionLayer` in XRWebGLBinding.prototype) {
            let n = null,
              a = null,
              o = null;
            contextAttributes.depth && (o = contextAttributes.stencil ? count.DEPTH24_STENCIL8 : count.DEPTH_COMPONENT24, n = contextAttributes.stencil ? O : D, a = contextAttributes.stencil ? x : g);
            let s = {
              colorFormat: count.RGBA8,
              depthFormat: o,
              scaleFactor: i
            };
            u = this.getBinding(), f = u.createProjectionLayer(s), r.updateRenderState({
              layers: [f]
            }), constructor.setPixelRatio(1), constructor.setSize(f.textureWidth, f.textureHeight, false), type = new Gt(f.textureWidth, f.textureHeight, {
              format: E,
              type: d,
              depthTexture: new pi(f.textureWidth, f.textureHeight, a, undefined, undefined, undefined, undefined, undefined, undefined, n),
              stencilBuffer: contextAttributes.stencil,
              colorSpace: constructor.outputColorSpace,
              samples: contextAttributes.antialias ? 4 : 0,
              resolveDepthBuffer: f.ignoreDepthValues === false,
              resolveStencilBuffer: f.ignoreDepthValues === false,
              storeMultisampledDepthBuffer: f.ignoreDepthValues === false,
              storeMultisampledStencilBuffer: f.ignoreDepthValues === false
            });
          } else {
            let n = {
              antialias: contextAttributes.antialias,
              alpha: true,
              depth: contextAttributes.depth,
              stencil: contextAttributes.stencil,
              framebufferScaleFactor: i
            };
            ratio = new XRWebGLLayer(r, count, n), r.updateRenderState({
              baseLayer: ratio
            }), constructor.setPixelRatio(1), constructor.setSize(ratio.framebufferWidth, ratio.framebufferHeight, false), type = new Gt(ratio.framebufferWidth, ratio.framebufferHeight, {
              format: E,
              type: d,
              colorSpace: constructor.outputColorSpace,
              stencilBuffer: contextAttributes.stencil,
              resolveDepthBuffer: ratio.ignoreDepthValues === false,
              resolveStencilBuffer: ratio.ignoreDepthValues === false,
              storeMultisampledDepthBuffer: ratio.ignoreDepthValues === false,
              storeMultisampledStencilBuffer: ratio.ignoreDepthValues === false
            });
          }
          type.isXRRenderTarget = true, this.setFoveation(s), total = null, flag = await r.requestReferenceSpace(o), le.setContext(r), le.start(), n.isPresenting = true, n.dispatchEvent({
            type: `sessionstart`
          });
        }
      }, this.getEnvironmentBlendMode = function () {
        if (r !== null) return r.environmentBlendMode;
      }, this.getDepthTexture = function () {
        return _.getDepthTexture();
      };
      function re(e) {
        for (let t = 0; t < e.removed.length; t++) {
          let n = e.removed[t],
            r = w.indexOf(n);
          r >= 0 && (w[r] = null, mipmaps[r].disconnect(n));
        }
        for (let t = 0; t < e.added.length; t++) {
          let n = e.added[t],
            r = w.indexOf(n);
          if (r === -1) {
            for (let e = 0; e < mipmaps.length; e++) if (e >= w.length) {
              w.push(n), r = e;
              break;
            } else if (w[e] === null) {
              w[e] = n, r = e;
              break;
            }
            if (r === -1) break;
          }
          let i = mipmaps[r];
          i && i.connect(n);
        }
      }
      let ie = new q(),
        ae = new q();
      function oe(e, t, n) {
        ie.setFromMatrixPosition(t.matrixWorld), ae.setFromMatrixPosition(n.matrixWorld);
        let distanceTo = ie.distanceTo(ae),
          elements = t.projectionMatrix.elements,
          a = n.projectionMatrix.elements,
          o = elements[14] / (elements[10] - 1),
          s = elements[14] / (elements[10] + 1),
          c = (elements[9] + 1) / elements[5],
          l = (elements[9] - 1) / elements[5],
          u = (elements[8] - 1) / elements[0],
          d = (a[8] + 1) / a[0],
          f = o * u,
          p = o * d,
          m = distanceTo / (-u + d),
          h = m * -u;
        if (t.matrixWorld.decompose(e.position, e.quaternion, e.scale), e.translateX(h), e.translateZ(m), e.matrixWorld.compose(e.position, e.quaternion, e.scale), e.matrixWorldInverse.copy(e.matrixWorld).invert(), elements[10] === -1) e.projectionMatrix.copy(t.projectionMatrix), e.projectionMatrixInverse.copy(t.projectionMatrixInverse);else {
          let t = o + m,
            n = s + m,
            i = f - h,
            a = p + (distanceTo - h),
            u = c * s / n * t,
            d = l * s / n * t;
          e.projectionMatrix.makePerspective(i, a, u, d, t, n), e.projectionMatrixInverse.copy(e.projectionMatrix).invert();
        }
      }
      function se(e, t) {
        t === null ? e.matrixWorld.copy(e.matrix) : e.matrixWorld.multiplyMatrices(t.matrixWorld, e.matrix), e.matrixWorldInverse.copy(e.matrixWorld).invert();
      }
      this.updateCamera = function (e) {
        if (r === null) return;
        let near = e.near,
          n = e.far;
        _.texture !== null && (_.depthNear > 0 && (near = _.depthNear), _.depthFar > 0 && (n = _.depthFar)), M.near = ee.near = j.near = near, M.far = ee.far = j.far = n, (near !== M.near || far !== M.far) && (r.updateRenderState({
          depthNear: M.near,
          depthFar: M.far
        }), near = M.near, far = M.far), M.layers.mask = e.layers.mask | 6, j.layers.mask = M.layers.mask & -5, ee.layers.mask = M.layers.mask & -3;
        let i = e.parent,
          cameras = M.cameras;
        se(M, i);
        for (let e = 0; e < cameras.length; e++) se(cameras[e], i);
        cameras.length === 2 ? oe(M, j, ee) : M.projectionMatrix.copy(j.projectionMatrix), A === null && e.isPerspectiveCamera && (A = {
          camera: e,
          fov: e.fov,
          zoom: e.zoom
        }), I(e, M, i);
      };
      function I(e, t, n) {
        n === null ? e.matrix.copy(t.matrixWorld) : (e.matrix.copy(n.matrixWorld), e.matrix.invert(), e.matrix.multiply(t.matrixWorld)), e.matrix.decompose(e.position, e.quaternion, e.scale), e.updateMatrixWorld(true), e.projectionMatrix.copy(t.projectionMatrix), e.projectionMatrixInverse.copy(t.projectionMatrixInverse), e.isPerspectiveCamera && (e.fov = rt * 2 * Math.atan(1 / e.projectionMatrix.elements[5]), e.zoom = 1);
      }
      this.getCamera = function () {
        return M;
      }, this.getFoveation = function () {
        if (f !== null || ratio !== null) return s;
      }, this.setFoveation = function (e) {
        s = e, f !== null && (f.fixedFoveation = e), ratio !== null && ratio.fixedFoveation !== undefined && (ratio.fixedFoveation = e);
      }, this.hasDepthSensing = function () {
        return _.texture !== null;
      }, this.getDepthSensingMesh = function () {
        return _.getMesh(M);
      }, this.getCameraTexture = function (e) {
        return v[e];
      };
      let L = null;
      function ce(t, i) {
        if (l = i.getViewerPose(total || flag), m = i, l !== null) {
          let views = l.views;
          ratio !== null && (constructor.setRenderTargetFramebuffer(type, ratio.framebuffer), constructor.setRenderTarget(type));
          let i = false;
          views.length !== M.cameras.length && (M.cameras.length = 0, i = true);
          for (let n = 0; n < views.length; n++) {
            let r = views[n],
              a = null;
            if (ratio !== null) a = ratio.getViewport(r);else {
              let viewSubImage = u.getViewSubImage(f, r);
              a = viewSubImage.viewport, n === 0 && (constructor.setRenderTargetTextures(type, viewSubImage.colorTexture, viewSubImage.depthStencilTexture), constructor.setRenderTarget(type));
            }
            let o = te[n];
            o === undefined && (o = new la(), o.layers.enable(n), o.viewport = new Ut(), te[n] = o), o.matrix.fromArray(r.transform.matrix), o.matrix.decompose(o.position, o.quaternion, o.scale), o.projectionMatrix.fromArray(r.projectionMatrix), o.projectionMatrixInverse.copy(o.projectionMatrix).invert(), o.viewport.set(a.x, a.y, a.width, a.height), n === 0 && (M.matrix.copy(o.matrix), M.matrix.decompose(M.position, M.quaternion, M.scale)), i === true && M.cameras.push(o);
          }
          let enabledFeatures = r.enabledFeatures;
          if (enabledFeatures && enabledFeatures.includes(`depth-sensing`) && r.depthUsage == `gpu-optimized` && h) {
            u = n.getBinding();
            let depthInformation = u.getDepthInformation(views[0]);
            depthInformation && depthInformation.isValid && depthInformation.texture && _.init(depthInformation, r.renderState);
          }
          if (enabledFeatures && enabledFeatures.includes(`camera-access`) && h) {
            constructor.state.unbindTexture(), u = n.getBinding();
            for (let e = 0; e < views.length; e++) {
              let camera = views[e].camera;
              if (camera) {
                let e = v[camera];
                e || (e = new hi(), v[camera] = e);
                let cameraImage = u.getCameraImage(camera);
                e.sourceTexture = cameraImage;
              }
            }
          }
        }
        for (let e = 0; e < mipmaps.length; e++) {
          let t = w[e],
            n = mipmaps[e];
          t !== null && n !== undefined && n.update(t, i, total || flag);
        }
        L && L(t, i), i.detectedPlanes && n.dispatchEvent({
          type: `planesdetected`,
          data: i
        }), m = null;
      }
      let le = new Ra();
      le.setAnimationLoop(ce), this.setAnimationLoop = function (e) {
        L = e;
      }, this.dispose = function () {};
    }
  },
  Jc = new Jt(),
  Yc = new J();
Yc.set(-1, 0, 0, 0, 1, 0, 0, 0, 1);
function Xc(items, t) {
  function n(e, t) {
    e.matrixAutoUpdate === true && e.updateMatrix(), t.value.copy(e.matrix);
  }
  function r(t, n) {
    n.color.getRGB(t.fogColor.value, Ci(items)), n.isFog ? (t.fogNear.value = n.near, t.fogFar.value = n.far) : n.isFogExp2 && (t.fogDensity.value = n.density);
  }
  function i(e, t, n, r, i) {
    t.isNodeMaterial ? t.uniformsNeedUpdate = false : t.isMeshBasicMaterial ? a(e, t) : t.isMeshLambertMaterial ? (a(e, t), t.envMap && (e.envMapIntensity.value = t.envMapIntensity)) : t.isMeshToonMaterial ? (a(e, t), d(e, t)) : t.isMeshPhongMaterial ? (a(e, t), u(e, t), t.envMap && (e.envMapIntensity.value = t.envMapIntensity)) : t.isMeshStandardMaterial ? (a(e, t), f(e, t), t.isMeshPhysicalMaterial && p(e, t, i)) : t.isMeshMatcapMaterial ? (a(e, t), m(e, t)) : t.isMeshDepthMaterial ? a(e, t) : t.isMeshDistanceMaterial ? (a(e, t), h(e, t)) : t.isMeshNormalMaterial ? a(e, t) : t.isLineBasicMaterial ? (o(e, t), t.isLineDashedMaterial && s(e, t)) : t.isPointsMaterial ? c(e, t, n, r) : t.isSpriteMaterial ? l(e, t) : t.isShadowMaterial ? (e.color.value.copy(t.color), e.opacity.value = t.opacity) : t.isShaderMaterial && (t.uniformsNeedUpdate = false);
  }
  function a(e, r) {
    e.opacity.value = r.opacity, r.color && e.diffuse.value.copy(r.color), r.emissive && e.emissive.value.copy(r.emissive).multiplyScalar(r.emissiveIntensity), r.map && (e.map.value = r.map, n(r.map, e.mapTransform)), r.alphaMap && (e.alphaMap.value = r.alphaMap, n(r.alphaMap, e.alphaMapTransform)), r.bumpMap && (e.bumpMap.value = r.bumpMap, n(r.bumpMap, e.bumpMapTransform), e.bumpScale.value = r.bumpScale, r.side === 1 && (e.bumpScale.value *= -1)), r.normalMap && (e.normalMap.value = r.normalMap, n(r.normalMap, e.normalMapTransform), e.normalScale.value.copy(r.normalScale), r.side === 1 && e.normalScale.value.negate()), r.displacementMap && (e.displacementMap.value = r.displacementMap, n(r.displacementMap, e.displacementMapTransform), e.displacementScale.value = r.displacementScale, e.displacementBias.value = r.displacementBias), r.emissiveMap && (e.emissiveMap.value = r.emissiveMap, n(r.emissiveMap, e.emissiveMapTransform)), r.specularMap && (e.specularMap.value = r.specularMap, n(r.specularMap, e.specularMapTransform)), r.alphaTest > 0 && (e.alphaTest.value = r.alphaTest);
    let i = t.get(r),
      envMap = i.envMap,
      envMapRotation = i.envMapRotation;
    envMap && (e.envMap.value = envMap, e.envMapRotation.value.setFromMatrix4(Jc.makeRotationFromEuler(envMapRotation)).transpose(), envMap.isCubeTexture && envMap.isRenderTargetTexture === false && e.envMapRotation.value.premultiply(Yc), e.reflectivity.value = r.reflectivity, e.ior.value = r.ior, e.refractionRatio.value = r.refractionRatio), r.lightMap && (e.lightMap.value = r.lightMap, e.lightMapIntensity.value = r.lightMapIntensity, n(r.lightMap, e.lightMapTransform)), r.aoMap && (e.aoMap.value = r.aoMap, e.aoMapIntensity.value = r.aoMapIntensity, n(r.aoMap, e.aoMapTransform));
  }
  function o(e, t) {
    e.diffuse.value.copy(t.color), e.opacity.value = t.opacity, t.map && (e.map.value = t.map, n(t.map, e.mapTransform));
  }
  function s(e, t) {
    e.dashSize.value = t.dashSize, e.totalSize.value = t.dashSize + t.gapSize, e.scale.value = t.scale;
  }
  function c(e, t, r, i) {
    e.diffuse.value.copy(t.color), e.opacity.value = t.opacity, e.size.value = t.size * r, e.scale.value = i * .5, t.map && (e.map.value = t.map, n(t.map, e.uvTransform)), t.alphaMap && (e.alphaMap.value = t.alphaMap, n(t.alphaMap, e.alphaMapTransform)), t.alphaTest > 0 && (e.alphaTest.value = t.alphaTest);
  }
  function l(e, t) {
    e.diffuse.value.copy(t.color), e.opacity.value = t.opacity, e.rotation.value = t.rotation, t.map && (e.map.value = t.map, n(t.map, e.mapTransform)), t.alphaMap && (e.alphaMap.value = t.alphaMap, n(t.alphaMap, e.alphaMapTransform)), t.alphaTest > 0 && (e.alphaTest.value = t.alphaTest);
  }
  function u(e, t) {
    e.specular.value.copy(t.specular), e.shininess.value = Math.max(t.shininess, 1e-4);
  }
  function d(e, t) {
    t.gradientMap && (e.gradientMap.value = t.gradientMap);
  }
  function f(e, t) {
    e.metalness.value = t.metalness, t.metalnessMap && (e.metalnessMap.value = t.metalnessMap, n(t.metalnessMap, e.metalnessMapTransform)), e.roughness.value = t.roughness, t.roughnessMap && (e.roughnessMap.value = t.roughnessMap, n(t.roughnessMap, e.roughnessMapTransform)), t.envMap && (e.envMapIntensity.value = t.envMapIntensity);
  }
  function p(e, t, r) {
    e.ior.value = t.ior, t.sheen > 0 && (e.sheenColor.value.copy(t.sheenColor).multiplyScalar(t.sheen), e.sheenRoughness.value = t.sheenRoughness, t.sheenColorMap && (e.sheenColorMap.value = t.sheenColorMap, n(t.sheenColorMap, e.sheenColorMapTransform)), t.sheenRoughnessMap && (e.sheenRoughnessMap.value = t.sheenRoughnessMap, n(t.sheenRoughnessMap, e.sheenRoughnessMapTransform))), t.clearcoat > 0 && (e.clearcoat.value = t.clearcoat, e.clearcoatRoughness.value = t.clearcoatRoughness, t.clearcoatMap && (e.clearcoatMap.value = t.clearcoatMap, n(t.clearcoatMap, e.clearcoatMapTransform)), t.clearcoatRoughnessMap && (e.clearcoatRoughnessMap.value = t.clearcoatRoughnessMap, n(t.clearcoatRoughnessMap, e.clearcoatRoughnessMapTransform)), t.clearcoatNormalMap && (e.clearcoatNormalMap.value = t.clearcoatNormalMap, n(t.clearcoatNormalMap, e.clearcoatNormalMapTransform), e.clearcoatNormalScale.value.copy(t.clearcoatNormalScale), t.side === 1 && e.clearcoatNormalScale.value.negate())), t.dispersion > 0 && (e.dispersion.value = t.dispersion), t.retroreflectivity > 0 && (e.retroreflectivity.value = t.retroreflectivity), t.iridescence > 0 && (e.iridescence.value = t.iridescence, e.iridescenceIOR.value = t.iridescenceIOR, e.iridescenceThicknessMinimum.value = t.iridescenceThicknessRange[0], e.iridescenceThicknessMaximum.value = t.iridescenceThicknessRange[1], t.iridescenceMap && (e.iridescenceMap.value = t.iridescenceMap, n(t.iridescenceMap, e.iridescenceMapTransform)), t.iridescenceThicknessMap && (e.iridescenceThicknessMap.value = t.iridescenceThicknessMap, n(t.iridescenceThicknessMap, e.iridescenceThicknessMapTransform))), t.transmission > 0 && (e.transmission.value = t.transmission, e.transmissionSamplerMap.value = r.texture, e.transmissionSamplerSize.value.set(r.width, r.height), t.transmissionMap && (e.transmissionMap.value = t.transmissionMap, n(t.transmissionMap, e.transmissionMapTransform)), e.thickness.value = t.thickness, t.thicknessMap && (e.thicknessMap.value = t.thicknessMap, n(t.thicknessMap, e.thicknessMapTransform)), e.attenuationDistance.value = t.attenuationDistance, e.attenuationColor.value.copy(t.attenuationColor)), t.anisotropy > 0 && (e.anisotropyVector.value.set(t.anisotropy * Math.cos(t.anisotropyRotation), t.anisotropy * Math.sin(t.anisotropyRotation)), t.anisotropyMap && (e.anisotropyMap.value = t.anisotropyMap, n(t.anisotropyMap, e.anisotropyMapTransform))), e.specularIntensity.value = t.specularIntensity, e.specularColor.value.copy(t.specularColor), t.specularColorMap && (e.specularColorMap.value = t.specularColorMap, n(t.specularColorMap, e.specularColorMapTransform)), t.specularIntensityMap && (e.specularIntensityMap.value = t.specularIntensityMap, n(t.specularIntensityMap, e.specularIntensityMapTransform));
  }
  function m(e, t) {
    t.matcap && (e.matcap.value = t.matcap);
  }
  function h(e, n) {
    let light = t.get(n).light;
    e.referencePosition.value.setFromMatrixPosition(light.matrixWorld), e.nearDistance.value = light.shadow.camera.near, e.farDistance.value = light.shadow.camera.far;
  }
  return {
    refreshFogUniforms: r,
    refreshMaterialUniforms: i
  };
}
function Zc(e, event, n, count) {
  let i = {},
    a = {},
    ratio = [],
    parameter = e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS);
  function c(e, t) {
    let program = t.program;
    count.uniformBlockBinding(e, program);
  }
  function l(e, n) {
    let o = i[e.id];
    o === undefined && (g(e), o = u(e), i[e.id] = o, e.addEventListener(`dispose`, v));
    let program = n.program;
    count.updateUBOMapping(e, program);
    let frame = event.render.frame;
    a[e.id] !== frame && (f(e), a[e.id] = frame);
  }
  function u(t) {
    let n = d();
    t.__bindingPointIndex = n;
    let buffer = e.createBuffer(),
      __size = t.__size,
      usage = t.usage;
    return e.bindBuffer(e.UNIFORM_BUFFER, buffer), e.bufferData(e.UNIFORM_BUFFER, __size, usage), e.bindBuffer(e.UNIFORM_BUFFER, null), e.bindBufferBase(e.UNIFORM_BUFFER, n, buffer), buffer;
  }
  function d() {
    for (let e = 0; e < parameter; e++) if (ratio.indexOf(e) === -1) return ratio.push(e), e;
    return W(`WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached.`), 0;
  }
  function f(t) {
    let n = i[t.id],
      uniforms = t.uniforms,
      __cache = t.__cache;
    e.bindBuffer(e.UNIFORM_BUFFER, n);
    for (let e = 0, t = uniforms.length; e < t; e++) {
      let t = uniforms[e];
      if (Array.isArray(t)) for (let n = 0, r = t.length; n < r; n++) p(t[n], e, n, __cache);else p(t, e, 0, __cache);
    }
    e.bindBuffer(e.UNIFORM_BUFFER, null);
  }
  function p(t, n, r, i) {
    if (h(t, n, r, i) === true) {
      let __offset = t.__offset,
        r = t.value;
      if (Array.isArray(r)) {
        let e = 0;
        for (let n = 0; n < r.length; n++) {
          let i = r[n],
            a = _(i);
          m(i, t.__data, e), typeof i != `number` && typeof i != `boolean` && !i.isMatrix3 && !ArrayBuffer.isView(i) && (e += a.storage / Float32Array.BYTES_PER_ELEMENT);
        }
      } else m(r, t.__data, 0);
      e.bufferSubData(e.UNIFORM_BUFFER, __offset, t.__data);
    }
  }
  function m(e, t, n) {
    typeof e == `number` || typeof e == `boolean` ? t[0] = e : e.isMatrix3 ? (t[0] = e.elements[0], t[1] = e.elements[1], t[2] = e.elements[2], t[3] = 0, t[4] = e.elements[3], t[5] = e.elements[4], t[6] = e.elements[5], t[7] = 0, t[8] = e.elements[6], t[9] = e.elements[7], t[10] = e.elements[8], t[11] = 0) : ArrayBuffer.isView(e) ? t.set(new e.constructor(e.buffer, e.byteOffset, t.length)) : e.toArray(t, n);
  }
  function h(e, t, n, r) {
    let i = e.value,
      a = t + `_` + n;
    if (r[a] === undefined) return r[a] = typeof i == `number` || typeof i == `boolean` ? i : ArrayBuffer.isView(i) ? i.slice() : i.clone(), true;
    {
      let e = r[a];
      if (typeof i == `number` || typeof i == `boolean`) {
        if (e !== i) return r[a] = i, true;
      } else if (ArrayBuffer.isView(i)) return true;else if (e.equals(i) === false) return e.copy(i), true;
    }
    return false;
  }
  function g(e) {
    let uniforms = e.uniforms,
      n = 0;
    for (let e = 0, r = uniforms.length; e < r; e++) {
      let r = Array.isArray(uniforms[e]) ? uniforms[e] : [uniforms[e]];
      for (let e = 0, t = r.length; e < t; e++) {
        let t = r[e],
          i = Array.isArray(t.value) ? t.value : [t.value];
        for (let e = 0, r = i.length; e < r; e++) {
          let r = i[e],
            a = _(r),
            o = n % 16,
            s = o % a.boundary,
            c = o + s;
          n += s, c !== 0 && 16 - c < a.storage && (n += 16 - c), t.__data = new Float32Array(a.storage / Float32Array.BYTES_PER_ELEMENT), t.__offset = n, n += a.storage;
        }
      }
    }
    let r = n % 16;
    return r > 0 && (n += 16 - r), e.__size = n, e.__cache = {}, this;
  }
  function _(e) {
    let t = {
      boundary: 0,
      storage: 0
    };
    return typeof e == `number` || typeof e == `boolean` ? (t.boundary = 4, t.storage = 4) : e.isVector2 ? (t.boundary = 8, t.storage = 8) : e.isVector3 || e.isColor ? (t.boundary = 16, t.storage = 12) : e.isVector4 ? (t.boundary = 16, t.storage = 16) : e.isMatrix3 ? (t.boundary = 48, t.storage = 48) : e.isMatrix4 ? (t.boundary = 64, t.storage = 64) : e.isTexture ? U(`WebGLRenderer: Texture samplers can not be part of an uniforms group.`) : ArrayBuffer.isView(e) ? (t.boundary = 16, t.storage = e.byteLength) : U(`WebGLRenderer: Unsupported uniform value type.`, e), t;
  }
  function v(t) {
    let n = t.target;
    n.removeEventListener(`dispose`, v);
    let r = ratio.indexOf(n.__bindingPointIndex);
    ratio.splice(r, 1), e.deleteBuffer(i[n.id]), delete i[n.id], delete a[n.id];
  }
  function y() {
    for (let total in i) e.deleteBuffer(i[total]);
    ratio = [], i = {}, a = {};
  }
  return {
    bind: c,
    update: l,
    dispose: y
  };
}
var Qc = new Uint16Array([12469, 15057, 12620, 14925, 13266, 14620, 13807, 14376, 14323, 13990, 14545, 13625, 14713, 13328, 14840, 12882, 14931, 12528, 14996, 12233, 15039, 11829, 15066, 11525, 15080, 11295, 15085, 10976, 15082, 10705, 15073, 10495, 13880, 14564, 13898, 14542, 13977, 14430, 14158, 14124, 14393, 13732, 14556, 13410, 14702, 12996, 14814, 12596, 14891, 12291, 14937, 11834, 14957, 11489, 14958, 11194, 14943, 10803, 14921, 10506, 14893, 10278, 14858, 9960, 14484, 14039, 14487, 14025, 14499, 13941, 14524, 13740, 14574, 13468, 14654, 13106, 14743, 12678, 14818, 12344, 14867, 11893, 14889, 11509, 14893, 11180, 14881, 10751, 14852, 10428, 14812, 10128, 14765, 9754, 14712, 9466, 14764, 13480, 14764, 13475, 14766, 13440, 14766, 13347, 14769, 13070, 14786, 12713, 14816, 12387, 14844, 11957, 14860, 11549, 14868, 11215, 14855, 10751, 14825, 10403, 14782, 10044, 14729, 9651, 14666, 9352, 14599, 9029, 14967, 12835, 14966, 12831, 14963, 12804, 14954, 12723, 14936, 12564, 14917, 12347, 14900, 11958, 14886, 11569, 14878, 11247, 14859, 10765, 14828, 10401, 14784, 10011, 14727, 9600, 14660, 9289, 14586, 8893, 14508, 8533, 15111, 12234, 15110, 12234, 15104, 12216, 15092, 12156, 15067, 12010, 15028, 11776, 14981, 11500, 14942, 11205, 14902, 10752, 14861, 10393, 14812, 9991, 14752, 9570, 14682, 9252, 14603, 8808, 14519, 8445, 14431, 8145, 15209, 11449, 15208, 11451, 15202, 11451, 15190, 11438, 15163, 11384, 15117, 11274, 15055, 10979, 14994, 10648, 14932, 10343, 14871, 9936, 14803, 9532, 14729, 9218, 14645, 8742, 14556, 8381, 14461, 8020, 14365, 7603, 15273, 10603, 15272, 10607, 15267, 10619, 15256, 10631, 15231, 10614, 15182, 10535, 15118, 10389, 15042, 10167, 14963, 9787, 14883, 9447, 14800, 9115, 14710, 8665, 14615, 8318, 14514, 7911, 14411, 7507, 14279, 7198, 15314, 9675, 15313, 9683, 15309, 9712, 15298, 9759, 15277, 9797, 15229, 9773, 15166, 9668, 15084, 9487, 14995, 9274, 14898, 8910, 14800, 8539, 14697, 8234, 14590, 7790, 14479, 7409, 14367, 7067, 14178, 6621, 15337, 8619, 15337, 8631, 15333, 8677, 15325, 8769, 15305, 8871, 15264, 8940, 15202, 8909, 15119, 8775, 15022, 8565, 14916, 8328, 14804, 8009, 14688, 7614, 14569, 7287, 14448, 6888, 14321, 6483, 14088, 6171, 15350, 7402, 15350, 7419, 15347, 7480, 15340, 7613, 15322, 7804, 15287, 7973, 15229, 8057, 15148, 8012, 15046, 7846, 14933, 7611, 14810, 7357, 14682, 7069, 14552, 6656, 14421, 6316, 14251, 5948, 14007, 5528, 15356, 5942, 15356, 5977, 15353, 6119, 15348, 6294, 15332, 6551, 15302, 6824, 15249, 7044, 15171, 7122, 15070, 7050, 14949, 6861, 14818, 6611, 14679, 6349, 14538, 6067, 14398, 5651, 14189, 5311, 13935, 4958, 15359, 4123, 15359, 4153, 15356, 4296, 15353, 4646, 15338, 5160, 15311, 5508, 15263, 5829, 15188, 6042, 15088, 6094, 14966, 6001, 14826, 5796, 14678, 5543, 14527, 5287, 14377, 4985, 14133, 4586, 13869, 4257, 15360, 1563, 15360, 1642, 15358, 2076, 15354, 2636, 15341, 3350, 15317, 4019, 15273, 4429, 15203, 4732, 15105, 4911, 14981, 4932, 14836, 4818, 14679, 4621, 14517, 4386, 14359, 4156, 14083, 3795, 13808, 3437, 15360, 122, 15360, 137, 15358, 285, 15355, 636, 15344, 1274, 15322, 2177, 15281, 2765, 15215, 3223, 15120, 3451, 14995, 3569, 14846, 3567, 14681, 3466, 14511, 3305, 14344, 3121, 14037, 2800, 13753, 2467, 15360, 0, 15360, 1, 15359, 21, 15355, 89, 15346, 253, 15325, 479, 15287, 796, 15225, 1148, 15133, 1492, 15008, 1749, 14856, 1882, 14685, 1886, 14506, 1783, 14324, 1608, 13996, 1398, 13702, 1183]),
  $c = null;
function el() {
  return $c === null && ($c = new Qr(Qc, 16, 16, j, v), $c.name = `DFG_LUT`, $c.minFilter = c, $c.magFilter = c, $c.wrapS = r, $c.wrapT = r, $c.generateMipmaps = false, $c.needsUpdate = true), $c;
}
var tl = class {
    constructor(e = {}) {
      let {
        canvas: t = Ke(),
        context: n = null,
        depth: r = true,
        stencil: i = false,
        alpha: a = false,
        antialias: o = false,
        premultipliedAlpha: s = true,
        preserveDrawingBuffer: c = false,
        powerPreference: l = `default`,
        failIfMajorPerformanceCaveat: f = false,
        reversedDepthBuffer: p = false,
        outputBufferType: h = d
      } = e;
      this.isWebGLRenderer = true;
      let _;
      if (n !== null) {
        if (typeof WebGLRenderingContext < `u` && n instanceof WebGLRenderingContext) throw Error(`THREE.WebGLRenderer: WebGL 1 is not supported since r163.`);
        _ = n.getContextAttributes().alpha;
      } else _ = a;
      let S = h,
        C = new Set([te, ee, A]),
        w = new Set([d, g, m, x, y, b]),
        uint32Array = new Uint32Array(4),
        int32Array = new Int32Array(4),
        D = new q(),
        fragmentShader = null,
        k = null,
        j = [],
        M = [],
        near = null;
      this.domElement = t, this.debug = {
        checkShaderErrors: true,
        diagnostics: {
          keywords: false
        },
        onShaderError: null
      }, this.autoClear = true, this.autoClearColor = true, this.autoClearDepth = true, this.autoClearStencil = true, this.sortObjects = true, this.clippingPlanes = [], this.localClippingEnabled = false, this.toneMapping = 0, this.toneMappingExposure = 1, this.transmissionResolutionScale = 1;
      let P = this,
        ne = false,
        count = null,
        re = null,
        ie = null,
        ae = null;
      this._outputColorSpace = Fe;
      let oe = 0,
        se = 0,
        I = null,
        L = -1,
        ce = null,
        le = new Ut(),
        ue = new Ut(),
        scissorTest = null,
        fe = new X(0),
        pe = 0,
        me = t.width,
        he = t.height,
        ge = 1,
        _e = null,
        ve = null,
        ye = new Ut(0, 0, me, he),
        be = new Ut(0, 0, me, he),
        xe = false,
        Se = new di(),
        Ce = false,
        we = false,
        Te = new Jt(),
        Ee = new q(),
        De = new Ut(),
        Oe = {
          background: null,
          fog: null,
          environment: null,
          overrideMaterial: null,
          isScene: true
        },
        ke = false;
      function Ae() {
        return I === null ? ge : 1;
      }
      let R = n;
      function je(e, n) {
        return t.getContext(e, n);
      }
      let toneMapping, Me, B, Ne, V, H, Pe, Ie, Le, Re, ze, Be, Ve, Ue, We, Ge, qe, Ye, Xe, Qe, $e, et, tt;
      try {
        let e = {
          alpha: true,
          depth: r,
          stencil: i,
          antialias: o,
          premultipliedAlpha: s,
          preserveDrawingBuffer: c,
          powerPreference: l,
          failIfMajorPerformanceCaveat: f
        };
        if (`setAttribute` in t && t.setAttribute(`data-engine`, `three.js r186`), t.addEventListener(`webglcontextlost`, it, false), t.addEventListener(`webglcontextrestored`, G, false), t.addEventListener(`webglcontextcreationerror`, at, false), R === null) {
          let t = `webgl2`;
          if (R = je(t, e), R === null) throw je(t) ? Error(`THREE.WebGLRenderer: Error creating WebGL context with your selected attributes.`) : Error(`THREE.WebGLRenderer: Error creating WebGL context.`);
        }
        nt();
      } catch (e) {
        throw t.removeEventListener(`webglcontextlost`, it, false), t.removeEventListener(`webglcontextrestored`, G, false), t.removeEventListener(`webglcontextcreationerror`, at, false), W(`WebGLRenderer: ` + e.message), e;
      }
      function nt() {
        toneMapping = new yo(R), toneMapping.init(), $e = new Uc(R, toneMapping), Me = new qa(R, toneMapping, e, $e), B = new Vc(R, toneMapping), Me.reversedDepthBuffer && p && B.buffers.depth.setReversed(true), re = R.createFramebuffer(), ie = R.createFramebuffer(), ae = R.createFramebuffer(), Ne = new So(R), V = new xc(), H = new Hc(R, toneMapping, B, V, Me, $e, Ne), Pe = new vo(P), Ie = new za(R), et = new Ga(R, Ie), Le = new bo(R, Ie, Ne, et), Re = new wo(R, Le, Ie, et, Ne), Ye = new Co(R, Me, H), We = new Ja(V), ze = new bc(P, Pe, toneMapping, Me, et, We), Be = new Xc(P, V), Ve = new Tc(), Ue = new Mc(toneMapping), qe = new Wa(P, Pe, B, Re, _, s), Ge = new Bc(P, Re, Me), tt = new Zc(R, Ne, Me, B), Xe = new Ka(R, toneMapping, Ne), Qe = new xo(R, toneMapping, Ne), Ne.programs = ze.programs, P.capabilities = Me, P.extensions = toneMapping, P.properties = V, P.renderLists = Ve, P.shadowMap = Ge, P.state = B, P.info = Ne;
      }
      S !== 1009 && (near = new Eo(S, t.width, t.height, o, r, i));
      let rt = new qc(P, R);
      this.xr = rt, this.getContext = function () {
        return R;
      }, this.getContextAttributes = function () {
        return R.getContextAttributes();
      }, this.forceContextLoss = function () {
        let e = toneMapping.get(`WEBGL_lose_context`);
        e && e.loseContext();
      }, this.forceContextRestore = function () {
        let e = toneMapping.get(`WEBGL_lose_context`);
        e && e.restoreContext();
      }, this.getPixelRatio = function () {
        return ge;
      }, this.setPixelRatio = function (e) {
        e !== undefined && (ge = e, this.setSize(me, he, false));
      }, this.getSize = function (e) {
        return e.set(me, he);
      }, this.setSize = function (e, n, r = true) {
        if (rt.isPresenting) {
          U(`WebGLRenderer: Can't change size while VR device is presenting.`);
          return;
        }
        me = e, he = n, t.width = Math.floor(e * ge), t.height = Math.floor(n * ge), r === true && (t.style.width = e + `px`, t.style.height = n + `px`), near !== null && near.setSize(t.width, t.height), this.setViewport(0, 0, e, n);
      }, this.getDrawingBufferSize = function (e) {
        return e.set(me * ge, he * ge).floor();
      }, this.setDrawingBufferSize = function (e, n, r) {
        me = e, he = n, ge = r, t.width = Math.floor(e * r), t.height = Math.floor(n * r), this.setViewport(0, 0, e, n);
      }, this.setEffects = function (count) {
        if (S === 1009) {
          W(`WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.`);
          return;
        }
        if (count) {
          for (let t = 0; t < count.length; t++) if (count[t].isOutputPass === true) {
            U(`WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.`);
            break;
          }
        }
        near.setEffects(count || []);
      }, this.getCurrentViewport = function (e) {
        return e.copy(le);
      }, this.getViewport = function (e) {
        return e.copy(ye);
      }, this.setViewport = function (e, t, n, r) {
        e.isVector4 ? ye.set(e.x, e.y, e.z, e.w) : ye.set(e, t, n, r), B.viewport(le.copy(ye).multiplyScalar(ge).round());
      }, this.getScissor = function (e) {
        return e.copy(be);
      }, this.setScissor = function (e, t, n, r) {
        e.isVector4 ? be.set(e.x, e.y, e.z, e.w) : be.set(e, t, n, r), B.scissor(ue.copy(be).multiplyScalar(ge).round());
      }, this.getScissorTest = function () {
        return xe;
      }, this.setScissorTest = function (e) {
        B.setScissorTest(xe = e);
      }, this.setOpaqueSort = function (e) {
        _e = e;
      }, this.setTransparentSort = function (e) {
        ve = e;
      }, this.getClearColor = function (e) {
        return e.copy(qe.getClearColor());
      }, this.setClearColor = function () {
        qe.setClearColor(...arguments);
      }, this.getClearAlpha = function () {
        return qe.getClearAlpha();
      }, this.setClearAlpha = function () {
        qe.setClearAlpha(...arguments);
      }, this.clear = function (e = true, t = true, n = true) {
        let r = 0;
        if (e) {
          let e = false;
          if (I !== null) {
            let format = I.texture.format;
            e = C.has(format);
          }
          if (e) {
            let e = I.texture.type,
              t = w.has(e),
              clearColor = qe.getClearColor(),
              clearAlpha = qe.getClearAlpha(),
              i = clearColor.r,
              a = clearColor.g,
              o = clearColor.b;
            t ? (uint32Array[0] = i, uint32Array[1] = a, uint32Array[2] = o, uint32Array[3] = clearAlpha, R.clearBufferuiv(R.COLOR, 0, uint32Array)) : (int32Array[0] = i, int32Array[1] = a, int32Array[2] = o, int32Array[3] = clearAlpha, R.clearBufferiv(R.COLOR, 0, int32Array));
          } else r |= R.COLOR_BUFFER_BIT;
        }
        t && (r |= R.DEPTH_BUFFER_BIT, this.state.buffers.depth.setMask(true)), n && (r |= R.STENCIL_BUFFER_BIT, this.state.buffers.stencil.setMask(4294967295)), r !== 0 && R.clear(r);
      }, this.clearColor = function () {
        this.clear(true, false, false);
      }, this.clearDepth = function () {
        this.clear(false, true, false);
      }, this.clearStencil = function () {
        this.clear(false, false, true);
      }, this.setNodesHandler = function (e) {
        e.setRenderer(this), count = e;
      }, this.dispose = function () {
        t.removeEventListener(`webglcontextlost`, it, false), t.removeEventListener(`webglcontextrestored`, G, false), t.removeEventListener(`webglcontextcreationerror`, at, false), qe.dispose(), Ve.dispose(), Ue.dispose(), V.dispose(), Pe.dispose(), Re.dispose(), et.dispose(), tt.dispose(), ze.dispose(), rt.dispose(), rt.removeEventListener(`sessionstart`, ft), rt.removeEventListener(`sessionend`, pt), mt.stop();
      };
      function it(event) {
        event.preventDefault(), Je(`WebGLRenderer: Context Lost.`), ne = true;
      }
      function G() {
        Je(`WebGLRenderer: Context Restored.`), ne = false;
        let autoReset = Ne.autoReset,
          enabled = Ge.enabled,
          autoUpdate = Ge.autoUpdate,
          needsUpdate = Ge.needsUpdate,
          i = Ge.type;
        nt(), Ne.autoReset = autoReset, Ge.enabled = enabled, Ge.autoUpdate = autoUpdate, Ge.needsUpdate = needsUpdate, Ge.type = i;
      }
      function at(e) {
        W(`WebGLRenderer: A WebGL context could not be created. Reason: `, e.statusMessage);
      }
      function ot(event) {
        let t = event.target;
        t.removeEventListener(`dispose`, ot), st(t);
      }
      function st(e) {
        ct(e), V.remove(e);
      }
      function ct(e) {
        let programs = V.get(e).programs;
        programs !== undefined && (programs.forEach(function (item) {
          ze.releaseProgram(item);
        }), e.isShaderMaterial && ze.releaseShaderCache(e));
      }
      this.renderBufferDirect = function (e, t, n, r, i, a) {
        t === null && (t = Oe);
        let o = i.isMesh && i.matrixWorld.determinantAffine() < 0,
          s = wt(e, t, n, r, i);
        B.setMaterial(r, o);
        let c = n.index,
          l = 1;
        if (r.wireframe === true) {
          if (c = Le.getWireframeAttribute(n), c === undefined) return;
          l = 2;
        }
        let drawRange = n.drawRange,
          position = n.attributes.position,
          f = drawRange.start * l,
          p = (drawRange.start + drawRange.count) * l;
        a !== null && (f = Math.max(f, a.start * l), p = Math.min(p, (a.start + a.count) * l)), c === null ? position != null && (f = Math.max(f, 0), p = Math.min(p, position.count)) : (f = Math.max(f, 0), p = Math.min(p, c.count));
        let m = p - f;
        if (m < 0 || m === 1 / 0) return;
        et.setup(i, r, s, n, c);
        let resolvedValue,
          g = Xe;
        if (c !== null && (resolvedValue = Ie.get(c), g = Qe, g.setIndex(resolvedValue)), i.isMesh) r.wireframe === true ? (B.setLineWidth(r.wireframeLinewidth * Ae()), g.setMode(R.LINES)) : g.setMode(R.TRIANGLES);else if (i.isLine) {
          let linewidth = r.linewidth;
          linewidth === undefined && (linewidth = 1), B.setLineWidth(linewidth * Ae()), i.isLineSegments ? g.setMode(R.LINES) : i.isLineLoop ? g.setMode(R.LINE_LOOP) : g.setMode(R.LINE_STRIP);
        } else i.isPoints ? g.setMode(R.POINTS) : i.isSprite && g.setMode(R.TRIANGLES);
        if (i.isBatchedMesh) {
          if (toneMapping.get(`WEBGL_multi_draw`)) g.renderMultiDraw(i._multiDrawStarts, i._multiDrawCounts, i._multiDrawCount);else {
            let _multiDrawStarts = i._multiDrawStarts,
              _multiDrawCounts = i._multiDrawCounts,
              _multiDrawCount = i._multiDrawCount,
              a = c ? Ie.get(c).bytesPerElement : 1,
              uniforms = V.get(r).currentProgram.getUniforms();
            for (let r = 0; r < _multiDrawCount; r++) uniforms.setValue(R, `_gl_DrawID`, r), g.render(_multiDrawStarts[r] / a, _multiDrawCounts[r]);
          }
        } else if (i.isInstancedMesh) g.renderInstances(f, m, i.count);else if (n.isInstancedBufferGeometry) {
          let e = n._maxInstanceCount === undefined ? 1 / 0 : n._maxInstanceCount,
            t = Math.min(n.instanceCount, e);
          g.renderInstances(f, m, t);
        } else g.render(f, m);
      };
      function lt(e, t, n, r) {
        count !== null && e.isNodeMaterial && count.setObject(r, e), Ce === true && We.setState(e, n, false), e.transparent === true && e.side === 2 && e.forceSinglePass === false ? (e.side = 1, e.needsUpdate = true, bt(e, t, r), e.side = 0, e.needsUpdate = true, bt(e, t, r), e.side = 2) : bt(e, t, r);
      }
      this.compile = function (e, t, n = null) {
        n === null && (n = e), count !== null && count.renderStart(e, t, n), k = Ue.get(n), k.init(t), M.push(k), n.traverseVisible(function (e) {
          e.isLight && e.layers.test(t.layers) && (k.pushLight(e), e.castShadow && k.pushShadow(e));
        }), e !== n && e.traverseVisible(function (e) {
          e.isLight && e.layers.test(t.layers) && (k.pushLight(e), e.castShadow && k.pushShadow(e));
        }), k.setupLights(), count !== null && count.updateLights(k.state.lightsArray), we = this.localClippingEnabled, Ce = We.init(this.clippingPlanes, we), Ce === true && We.setGlobalState(this.clippingPlanes, t), count !== null && Ge.render(k.state.shadowsArray, n, t);
        let r = new Set();
        return e.traverse(function (e) {
          if (!(e.isMesh || e.isPoints || e.isLine || e.isSprite)) return;
          let material = e.material;
          if (material) {
            if (Array.isArray(material)) for (let a = 0; a < material.length; a++) {
              let o = material[a];
              lt(o, n, t, e), r.add(o);
            } else lt(material, n, t, e), r.add(material);
          }
        }), k = M.pop(), count !== null && count.renderEnd(), r;
      }, this.compileAsync = function (e, t, n = null) {
        let r = this.compile(e, t, n);
        return new Promise(t => {
          function n() {
            if (r.forEach(function (item) {
              let currentProgram = V.get(item).currentProgram;
              (currentProgram === undefined || currentProgram.isReady()) && r.delete(item);
            }), r.size === 0) {
              t(e);
              return;
            }
            setTimeout(n, 10);
          }
          toneMapping.get(`KHR_parallel_shader_compile`) === null ? setTimeout(n, 10) : n();
        });
      };
      let ut = null;
      function dt(e) {
        ut && ut(e);
      }
      function ft() {
        mt.stop();
      }
      function pt() {
        mt.start();
      }
      let mt = new Ra();
      mt.setAnimationLoop(dt), typeof self < `u` && mt.setContext(self), this.setAnimationLoop = function (e) {
        ut = e, rt.setAnimationLoop(e), e === null ? mt.stop() : mt.start();
      }, rt.addEventListener(`sessionstart`, ft), rt.addEventListener(`sessionend`, pt), this.render = function (e, t) {
        if (t !== undefined && t.isCamera !== true) {
          W(`WebGLRenderer.render: camera is not an instance of THREE.Camera.`);
          return;
        }
        if (ne === true) return;
        count !== null && count.renderStart(e, t);
        let n = rt.enabled === true && rt.isPresenting === true,
          r = near !== null && (I === null || n) && near.begin(P, I);
        if (e.matrixWorldAutoUpdate === true && e.updateMatrixWorld(), t.parent === null && t.matrixWorldAutoUpdate === true && t.updateMatrixWorld(), rt.enabled === true && rt.isPresenting === true && (near === null || near.isCompositing() === false) && (rt.cameraAutoUpdate === true && rt.updateCamera(t), t = rt.getCamera()), e.isScene === true && e.onBeforeRender(P, e, t, I), k = Ue.get(e, M.length), k.init(t), k.state.textureUnits = H.getTextureUnits(), M.push(k), Te.multiplyMatrices(t.projectionMatrix, t.matrixWorldInverse), Se.setFromProjectionMatrix(Te, He, t.reversedDepth), we = this.localClippingEnabled, Ce = We.init(this.clippingPlanes, we), fragmentShader = Ve.get(e, j.length), fragmentShader.init(), j.push(fragmentShader), rt.enabled === true && rt.isPresenting === true) {
          let depthSensingMesh = P.xr.getDepthSensingMesh();
          depthSensingMesh !== null && ht(depthSensingMesh, t, -1 / 0, P.sortObjects);
        }
        ht(e, t, 0, P.sortObjects), fragmentShader.finish(), count !== null && count.updateLights(k.state.lightsArray), P.sortObjects === true && fragmentShader.sort(_e, ve), ke = rt.enabled === false || rt.isPresenting === false || rt.hasDepthSensing() === false, ke && qe.addToRenderList(fragmentShader, e), this.info.render.frame++, this.info.autoReset === true && this.info.reset(), Ce === true && We.beginShadows();
        let shadowsArray = k.state.shadowsArray;
        if (Ge.render(shadowsArray, e, t), Ce === true && We.endShadows(), (r && near.hasRenderPass()) === false) {
          let opaque = fragmentShader.opaque,
            transmissive = fragmentShader.transmissive;
          if (k.setupLights(), t.isArrayCamera) {
            let cameras = t.cameras;
            if (transmissive.length > 0) for (let t = 0, a = cameras.length; t < a; t++) {
              let a = cameras[t];
              _t(opaque, transmissive, e, a);
            }
            ke && qe.render(e);
            for (let t = 0, n = cameras.length; t < n; t++) {
              let n = cameras[t];
              gt(fragmentShader, e, n, n.viewport);
            }
          } else transmissive.length > 0 && _t(opaque, transmissive, e, t), ke && qe.render(e), gt(fragmentShader, e, t);
        }
        I !== null && se === 0 && (H.updateMultisampleRenderTarget(I), H.updateRenderTargetMipmap(I)), r && near.end(P), e.isScene === true && e.onAfterRender(P, e, t), et.resetDefaultState(), L = -1, ce = null, M.pop(), M.length > 0 ? (k = M[M.length - 1], H.setTextureUnits(k.state.textureUnits), Ce === true && We.setGlobalState(P.clippingPlanes, k.state.camera)) : k = null, j.pop(), fragmentShader = j.length > 0 ? j[j.length - 1] : null, count !== null && count.renderEnd();
      };
      function ht(e, t, n, count) {
        if (e.visible === false) return;
        if (e.layers.test(t.layers)) {
          if (e.isGroup) n = e.renderOrder;else if (e.isLOD) e.autoUpdate === true && e.update(t);else if (e.isLightProbeGrid) k.pushLightProbeGrid(e);else if (e.isLight) k.pushLight(e), e.castShadow && k.pushShadow(e);else if (e.isSprite) {
            if (!e.frustumCulled || e.intersectsFrustum(Se)) {
              count && De.setFromMatrixPosition(e.matrixWorld).applyMatrix4(Te);
              let i = Re.update(e),
                material = e.material;
              material.visible && fragmentShader.push(e, i, material, n, De.z, null, t);
            }
          } else if ((e.isMesh || e.isLine || e.isPoints) && (!e.frustumCulled || e.intersectsFrustum(Se))) {
            let i = Re.update(e),
              material = e.material;
            if (count && (e.boundingSphere === undefined ? (i.boundingSphere === null && i.computeBoundingSphere(), De.copy(i.boundingSphere.center)) : (e.boundingSphere === null && e.computeBoundingSphere(), De.copy(e.boundingSphere.center)), De.applyMatrix4(e.matrixWorld).applyMatrix4(Te)), Array.isArray(material)) {
              let groups = i.groups;
              for (let o = 0, s = groups.length; o < s; o++) {
                let s = groups[o],
                  c = material[s.materialIndex];
                c && c.visible && fragmentShader.push(e, i, c, n, De.z, s, t);
              }
            } else material.visible && fragmentShader.push(e, i, material, n, De.z, null, t);
          }
        }
        let i = e.children;
        for (let e = 0, a = i.length; e < a; e++) ht(i[e], t, n, count);
      }
      function gt(e, t, n, r) {
        let {
          opaque: i,
          transmissive: a,
          transparent: o
        } = e;
        k.setupLightsView(n), Ce === true && We.setGlobalState(P.clippingPlanes, n), r && B.viewport(le.copy(r)), i.length > 0 && vt(i, t, n), a.length > 0 && vt(a, t, n), o.length > 0 && vt(o, t, n), B.buffers.depth.setTest(true), B.buffers.depth.setMask(true), B.buffers.color.setMask(true), B.setPolygonOffset(false);
      }
      function _t(e, count, n, r) {
        if ((n.isScene === true ? n.overrideMaterial : null) !== null) return;
        if (k.state.transmissionRenderTarget[r.id] === undefined) {
          let fallbackValue = toneMapping.has(`EXT_color_buffer_half_float`) || toneMapping.has(`EXT_color_buffer_float`);
          k.state.transmissionRenderTarget[r.id] = new Gt(1, 1, {
            generateMipmaps: true,
            type: fallbackValue ? v : d,
            minFilter: u,
            samples: Math.max(4, Me.samples),
            stencilBuffer: i,
            resolveDepthBuffer: false,
            resolveStencilBuffer: false,
            storeMultisampledDepthBuffer: false,
            storeMultisampledStencilBuffer: false,
            colorSpace: Y.workingColorSpace
          });
        }
        let a = k.state.transmissionRenderTarget[r.id],
          fallbackValue = r.viewport || le;
        a.setSize(fallbackValue.z * P.transmissionResolutionScale, fallbackValue.w * P.transmissionResolutionScale);
        let renderTarget = P.getRenderTarget(),
          activeCubeFace = P.getActiveCubeFace(),
          activeMipmapLevel = P.getActiveMipmapLevel();
        P.setRenderTarget(a), P.getClearColor(fe), pe = P.getClearAlpha(), pe < 1 && P.setClearColor(16777215, .5), P.clear(), ke && qe.render(n);
        let toneMapping = P.toneMapping;
        P.toneMapping = 0;
        let viewport = r.viewport;
        if (r.viewport !== undefined && (r.viewport = undefined), k.setupLightsView(r), Ce === true && We.setGlobalState(P.clippingPlanes, r), vt(e, n, r), H.updateMultisampleRenderTarget(a), H.updateRenderTargetMipmap(a), toneMapping.has(`WEBGL_multisampled_render_to_texture`) === false) {
          let e = false;
          for (let i = 0, a = count.length; i < a; i++) {
            let {
              object: a,
              geometry: o,
              material: s,
              group: c
            } = count[i];
            if (s.side === 2 && a.layers.test(r.layers)) {
              let side = s.side;
              s.side = 1, s.needsUpdate = true, yt(a, n, r, o, s, c), s.side = side, s.needsUpdate = true, e = true;
            }
          }
          e === true && (H.updateMultisampleRenderTarget(a), H.updateRenderTargetMipmap(a));
        }
        P.setRenderTarget(renderTarget, activeCubeFace, activeMipmapLevel), P.setClearColor(fe, pe), viewport !== undefined && (r.viewport = viewport), P.toneMapping = toneMapping;
      }
      function vt(count, t, n) {
        let r = t.isScene === true ? t.overrideMaterial : null;
        for (let i = 0, a = count.length; i < a; i++) {
          let a = count[i],
            {
              object: o,
              geometry: s,
              group: c
            } = a,
            material = a.material;
          material.allowOverride === true && r !== null && (material = r), o.layers.test(n.layers) && yt(o, t, n, s, material, c);
        }
      }
      function yt(e, t, n, r, i, a) {
        count !== null && i.isNodeMaterial && count.setObject(e, i), e.onBeforeRender(P, t, n, r, i, a), e.modelViewMatrix.multiplyMatrices(n.matrixWorldInverse, e.matrixWorld), e.normalMatrix.getNormalMatrix(e.modelViewMatrix), i.onBeforeRender(P, t, n, r, e, a), i.transparent === true && i.side === 2 && i.forceSinglePass === false ? (i.side = 1, i.needsUpdate = true, P.renderBufferDirect(n, t, r, i, e, a), i.side = 0, i.needsUpdate = true, P.renderBufferDirect(n, t, r, i, e, a), i.side = 2) : P.renderBufferDirect(n, t, r, i, e, a), e.onAfterRender(P, t, n, r, i, a);
      }
      function bt(e, t, n) {
        t.isScene !== true && (t = Oe);
        let r = V.get(e),
          lights = k.state.lights,
          shadowsArray = k.state.shadowsArray,
          version = lights.state.version,
          parameters = ze.getParameters(e, lights.state, shadowsArray, t, n, k.state.lightProbeGridArray),
          programCacheKey = ze.getProgramCacheKey(parameters),
          programs = r.programs;
        r.environment = e.isMeshStandardMaterial || e.isMeshLambertMaterial || e.isMeshPhongMaterial ? t.environment : null, r.fog = t.fog;
        let fallbackValue = e.isMeshStandardMaterial || e.isMeshLambertMaterial && !e.envMap || e.isMeshPhongMaterial && !e.envMap;
        r.envMap = Pe.get(e.envMap || r.environment, fallbackValue), r.envMapRotation = r.environment !== null && e.envMap === null ? t.environmentRotation : e.envMapRotation, programs === undefined && (e.addEventListener(`dispose`, ot), programs = new Map(), r.programs = programs);
        let d = programs.get(programCacheKey);
        if (d !== undefined) {
          if (r.currentProgram === d && r.lightsStateVersion === version) return St(e, parameters), d;
        } else parameters.uniforms = ze.getUniforms(e), count !== null && e.isNodeMaterial && count.build(e, n, parameters), e.onBeforeCompile(parameters, P), d = ze.acquireProgram(parameters, programCacheKey), programs.set(programCacheKey, d), r.uniforms = parameters.uniforms;
        let uniforms = r.uniforms;
        return (!e.isShaderMaterial && !e.isRawShaderMaterial || e.clipping === true) && (uniforms.clippingPlanes = We.uniform), St(e, parameters), r.needsLights = K(e), r.lightsStateVersion = version, r.needsLights && (uniforms.ambientLightColor.value = lights.state.ambient, uniforms.lightProbe.value = lights.state.probe, uniforms.sunLights.value = lights.state.sun, uniforms.sunLightShadows.value = lights.state.sunShadow, uniforms.directionalLights.value = lights.state.directional, uniforms.directionalLightShadows.value = lights.state.directionalShadow, uniforms.spotLights.value = lights.state.spot, uniforms.spotLightShadows.value = lights.state.spotShadow, uniforms.rectAreaLights.value = lights.state.rectArea, uniforms.ltc_1.value = lights.state.rectAreaLTC1, uniforms.ltc_2.value = lights.state.rectAreaLTC2, uniforms.pointLights.value = lights.state.point, uniforms.pointLightShadows.value = lights.state.pointShadow, uniforms.hemisphereLights.value = lights.state.hemi, uniforms.sunShadowMatrix.value = lights.state.sunShadowMatrix, uniforms.sunShadowCascade.value = lights.state.sunShadowCascade, uniforms.directionalShadowMatrix.value = lights.state.directionalShadowMatrix, uniforms.spotLightMatrix.value = lights.state.spotLightMatrix, uniforms.spotLightMap.value = lights.state.spotLightMap, uniforms.pointShadowMatrix.value = lights.state.pointShadowMatrix), r.lightProbeGrid = k.state.lightProbeGridArray.length > 0, r.currentProgram = d, r.uniformsList = null, d;
      }
      function xt(e) {
        if (e.uniformsList === null) {
          let uniforms = e.currentProgram.getUniforms();
          e.uniformsList = Ns.seqWithValue(uniforms.seq, e.uniforms);
        }
        return e.uniformsList;
      }
      function St(e, t) {
        let n = V.get(e);
        n.outputColorSpace = t.outputColorSpace, n.batching = t.batching, n.batchingColor = t.batchingColor, n.instancing = t.instancing, n.instancingColor = t.instancingColor, n.instancingMorph = t.instancingMorph, n.skinning = t.skinning, n.morphTargets = t.morphTargets, n.morphNormals = t.morphNormals, n.morphColors = t.morphColors, n.morphTargetsCount = t.morphTargetsCount, n.numClippingPlanes = t.numClippingPlanes, n.numIntersection = t.numClipIntersection, n.vertexAlphas = t.vertexAlphas, n.vertexTangents = t.vertexTangents, n.toneMapping = t.toneMapping;
      }
      function Ct(count, t) {
        if (count.length === 0) return null;
        if (count.length === 1) return count[0].texture === null ? null : count[0];
        D.setFromMatrixPosition(t.matrixWorld);
        for (let t = 0, n = count.length; t < n; t++) {
          let n = count[t];
          if (n.texture !== null && n.boundingBox.containsPoint(D)) return n;
        }
        return null;
      }
      function wt(count, t, n, r, i) {
        t.isScene !== true && (t = Oe), H.resetTextureUnits();
        let a = t.fog,
          o = r.isMeshStandardMaterial || r.isMeshLambertMaterial || r.isMeshPhongMaterial ? t.environment : null,
          s = I === null ? P.outputColorSpace : I.isXRRenderTarget === true ? I.texture.colorSpace : Y.workingColorSpace,
          fallbackValue = r.isMeshStandardMaterial || r.isMeshLambertMaterial && !r.envMap || r.isMeshPhongMaterial && !r.envMap,
          l = Pe.get(r.envMap || o, fallbackValue),
          u = r.vertexColors === true && !!n.attributes.color && n.attributes.color.itemSize === 4,
          d = !!n.attributes.tangent && (!!r.normalMap || r.anisotropy > 0),
          f = !!n.morphAttributes.position,
          p = !!n.morphAttributes.normal,
          m = !!n.morphAttributes.color,
          h = 0;
        r.toneMapped && (I === null || I.isXRRenderTarget === true) && (h = P.toneMapping);
        let g = n.morphAttributes.position || n.morphAttributes.normal || n.morphAttributes.color,
          _ = g === undefined ? 0 : g.length,
          v = V.get(r),
          lights = k.state.lights;
        if (Ce === true && (we === true || count !== ce)) {
          let t = count === ce && r.id === L;
          We.setState(r, count, t);
        }
        let b = false;
        r.version === v.__version ? v.needsLights && v.lightsStateVersion !== lights.state.version ? b = true : v.outputColorSpace === s ? i.isBatchedMesh && v.batching === false || !i.isBatchedMesh && v.batching === true || i.isBatchedMesh && v.batchingColor === true && i._colorsTexture === null || i.isBatchedMesh && v.batchingColor === false && i._colorsTexture !== null || i.isInstancedMesh && v.instancing === false || !i.isInstancedMesh && v.instancing === true || i.isSkinnedMesh && v.skinning === false || !i.isSkinnedMesh && v.skinning === true || i.isInstancedMesh && v.instancingColor === true && i.instanceColor === null || i.isInstancedMesh && v.instancingColor === false && i.instanceColor !== null || i.isInstancedMesh && v.instancingMorph === true && i.morphTexture === null || i.isInstancedMesh && v.instancingMorph === false && i.morphTexture !== null ? b = true : v.envMap === l ? r.fog === true && v.fog !== a || v.numClippingPlanes !== undefined && (v.numClippingPlanes !== We.numPlanes || v.numIntersection !== We.numIntersection) ? b = true : v.vertexAlphas === u && v.vertexTangents === d && v.morphTargets === f && v.morphNormals === p && v.morphColors === m && v.toneMapping === h && v.morphTargetsCount === _ ? !!v.lightProbeGrid != k.state.lightProbeGridArray.length > 0 && (b = true) : b = true : b = true : b = true : (b = true, v.__version = r.version);
        let currentProgram = v.currentProgram;
        b === true && (currentProgram = bt(r, t, i), count && r.isNodeMaterial && count.onUpdateProgram(r, currentProgram, v));
        let S = false,
          C = false,
          w = false,
          uniformsResult = currentProgram.getUniforms(),
          uniforms = v.uniforms;
        if (B.useProgram(currentProgram.program) && (S = true, C = true, w = true), r.id !== L && (L = r.id, C = true), v.needsLights) {
          let e = Ct(k.state.lightProbeGridArray, i);
          v.lightProbeGrid !== e && (v.lightProbeGrid = e, C = true);
        }
        if (S || ce !== count) {
          B.buffers.depth.getReversed() && count.reversedDepth !== true && (count._reversedDepth = true, count.updateProjectionMatrix()), uniformsResult.setValue(R, `projectionMatrix`, count.projectionMatrix), uniformsResult.setValue(R, `viewMatrix`, count.matrixWorldInverse);
          let cameraPosition = uniformsResult.map.cameraPosition;
          cameraPosition !== undefined && cameraPosition.setValue(R, Ee.setFromMatrixPosition(count.matrixWorld)), Me.logarithmicDepthBuffer && uniformsResult.setValue(R, `logDepthBufFC`, 2 / (Math.log(count.far + 1) / Math.LN2)), (r.isMeshPhongMaterial || r.isMeshToonMaterial || r.isMeshLambertMaterial || r.isMeshBasicMaterial || r.isMeshStandardMaterial || r.isShaderMaterial) && uniformsResult.setValue(R, `isOrthographic`, count.isOrthographicCamera === true), ce !== count && (ce = count, C = true, w = true);
        }
        if (v.needsLights && (lights.state.sunShadowMap.length > 0 && uniformsResult.setValue(R, `sunShadowMap`, lights.state.sunShadowMap, H), lights.state.directionalShadowMap.length > 0 && uniformsResult.setValue(R, `directionalShadowMap`, lights.state.directionalShadowMap, H), lights.state.spotShadowMap.length > 0 && uniformsResult.setValue(R, `spotShadowMap`, lights.state.spotShadowMap, H), lights.state.pointShadowMap.length > 0 && uniformsResult.setValue(R, `pointShadowMap`, lights.state.pointShadowMap, H)), i.isSkinnedMesh) {
          uniformsResult.setOptional(R, i, `bindMatrix`), uniformsResult.setOptional(R, i, `bindMatrixInverse`);
          let skeleton = i.skeleton;
          skeleton && (skeleton.boneTexture === null && skeleton.computeBoneTexture(), uniformsResult.setValue(R, `boneTexture`, skeleton.boneTexture, H));
        }
        i.isBatchedMesh && (uniformsResult.setOptional(R, i, `batchingTexture`), uniformsResult.setValue(R, `batchingTexture`, i._matricesTexture, H), uniformsResult.setOptional(R, i, `batchingIdTexture`), uniformsResult.setValue(R, `batchingIdTexture`, i._indirectTexture, H), uniformsResult.setOptional(R, i, `batchingColorTexture`), i._colorsTexture !== null && uniformsResult.setValue(R, `batchingColorTexture`, i._colorsTexture, H));
        let morphAttributes = n.morphAttributes;
        if ((morphAttributes.position !== undefined || morphAttributes.normal !== undefined || morphAttributes.color !== undefined) && Ye.update(i, n, currentProgram), (C || v.receiveShadow !== i.receiveShadow) && (v.receiveShadow = i.receiveShadow, uniformsResult.setValue(R, `receiveShadow`, i.receiveShadow)), (r.isMeshStandardMaterial || r.isMeshLambertMaterial || r.isMeshPhongMaterial) && r.envMap === null && t.environment !== null && (uniforms.envMapIntensity.value = t.environmentIntensity), uniforms.dfgLUT !== undefined && (uniforms.dfgLUT.value = el()), C) {
          if (uniformsResult.setValue(R, `toneMappingExposure`, P.toneMappingExposure), v.needsLights && Tt(uniforms, w), a && r.fog === true && Be.refreshFogUniforms(uniforms, a), Be.refreshMaterialUniforms(uniforms, r, ge, he, k.state.transmissionRenderTarget[count.id]), v.needsLights && v.lightProbeGrid) {
            let lightProbeGrid = v.lightProbeGrid;
            uniforms.probesSH.value = lightProbeGrid.texture, uniforms.probesMin.value.copy(lightProbeGrid.boundingBox.min), uniforms.probesMax.value.copy(lightProbeGrid.boundingBox.max), uniforms.probesResolution.value.copy(lightProbeGrid.resolution);
          }
          Ns.upload(R, xt(v), uniforms, H);
        }
        if (r.isShaderMaterial && r.uniformsNeedUpdate === true && (Ns.upload(R, xt(v), uniforms, H), r.uniformsNeedUpdate = false), r.isSpriteMaterial && uniformsResult.setValue(R, `center`, i.center), uniformsResult.setValue(R, `modelViewMatrix`, i.modelViewMatrix), uniformsResult.setValue(R, `normalMatrix`, i.normalMatrix), uniformsResult.setValue(R, `modelMatrix`, i.matrixWorld), r.uniformsGroups !== undefined) {
          let uniformsGroups = r.uniformsGroups;
          for (let t = 0, n = uniformsGroups.length; t < n; t++) {
            let n = uniformsGroups[t];
            tt.update(n, currentProgram), tt.bind(n, currentProgram);
          }
        }
        return currentProgram;
      }
      function Tt(e, t) {
        e.ambientLightColor.needsUpdate = t, e.lightProbe.needsUpdate = t, e.sunLights.needsUpdate = t, e.sunLightShadows.needsUpdate = t, e.directionalLights.needsUpdate = t, e.directionalLightShadows.needsUpdate = t, e.pointLights.needsUpdate = t, e.pointLightShadows.needsUpdate = t, e.spotLights.needsUpdate = t, e.spotLightShadows.needsUpdate = t, e.rectAreaLights.needsUpdate = t, e.hemisphereLights.needsUpdate = t;
      }
      function K(e) {
        return e.isMeshLambertMaterial || e.isMeshToonMaterial || e.isMeshPhongMaterial || e.isMeshStandardMaterial || e.isShadowMaterial || e.isShaderMaterial && e.lights === true;
      }
      this.getActiveCubeFace = function () {
        return oe;
      }, this.getActiveMipmapLevel = function () {
        return se;
      }, this.getRenderTarget = function () {
        return I;
      }, this.setRenderTargetTextures = function (e, t, n) {
        let r = V.get(e);
        r.__autoAllocateDepthBuffer = e.resolveDepthBuffer === false, r.__autoAllocateDepthBuffer === false && (r.__useRenderToTexture = false), V.get(e.texture).__webglTexture = t, V.get(e.depthTexture).__webglTexture = r.__autoAllocateDepthBuffer ? undefined : n, r.__hasExternalTextures = true;
      }, this.setRenderTargetFramebuffer = function (e, t) {
        let n = V.get(e);
        n.__webglFramebuffer = t, n.__useDefaultFramebuffer = t === undefined;
      }, this.setRenderTarget = function (e, t = 0, n = 0) {
        I = e, oe = t, se = n;
        let r = null,
          i = false,
          a = false;
        if (e) {
          let o = V.get(e);
          if (o.__useDefaultFramebuffer !== undefined) {
            B.bindFramebuffer(R.FRAMEBUFFER, o.__webglFramebuffer), le.copy(e.viewport), ue.copy(e.scissor), scissorTest = e.scissorTest, B.viewport(le), B.scissor(ue), B.setScissorTest(scissorTest), L = -1;
            return;
          }
          if (o.__webglFramebuffer === undefined) H.setupRenderTarget(e);else if (o.__hasExternalTextures) H.rebindTextures(e, V.get(e.texture).__webglTexture, V.get(e.depthTexture).__webglTexture);else if (e.depthBuffer) {
            let depthTexture = e.depthTexture;
            if (o.__boundDepthTexture !== depthTexture) {
              if (depthTexture !== null && V.has(depthTexture) && (e.width !== depthTexture.image.width || e.height !== depthTexture.image.height)) throw Error(`THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.`);
              H.setupDepthRenderbuffer(e);
            }
          }
          let texture = e.texture;
          (texture.isData3DTexture || texture.isDataArrayTexture || texture.isCompressedArrayTexture) && (a = true);
          let __webglFramebuffer = V.get(e).__webglFramebuffer;
          e.isWebGLCubeRenderTarget ? (r = Array.isArray(__webglFramebuffer[t]) ? __webglFramebuffer[t][n] : __webglFramebuffer[t], i = true) : r = e.samples > 0 && H.useMultisampledRTT(e) === false ? V.get(e).__webglMultisampledFramebuffer : Array.isArray(__webglFramebuffer) ? __webglFramebuffer[n] : __webglFramebuffer, le.copy(e.viewport), ue.copy(e.scissor), scissorTest = e.scissorTest;
        } else le.copy(ye).multiplyScalar(ge).floor(), ue.copy(be).multiplyScalar(ge).floor(), scissorTest = xe;
        if (n !== 0 && (r = re), B.bindFramebuffer(R.FRAMEBUFFER, r) && B.drawBuffers(e, r), B.viewport(le), B.scissor(ue), B.setScissorTest(scissorTest), i) {
          let r = V.get(e.texture);
          R.framebufferTexture2D(R.FRAMEBUFFER, R.COLOR_ATTACHMENT0, R.TEXTURE_CUBE_MAP_POSITIVE_X + t, r.__webglTexture, n);
        } else if (a) {
          let r = t;
          for (let t = 0; t < e.textures.length; t++) {
            let i = V.get(e.textures[t]);
            R.framebufferTextureLayer(R.FRAMEBUFFER, R.COLOR_ATTACHMENT0 + t, i.__webglTexture, n, r);
          }
        } else if (e !== null && n !== 0) {
          let t = V.get(e.texture);
          R.framebufferTexture2D(R.FRAMEBUFFER, R.COLOR_ATTACHMENT0, R.TEXTURE_2D, t.__webglTexture, n);
        }
        L = -1;
      };
      function Et(e) {
        let t = V.get(e);
        return (t.__readFormat !== e.format || t.__readType !== e.type) && (t.__readFormat = e.format, t.__readType = e.type, t.__formatReadable = Me.textureFormatReadable(e.format), t.__typeReadable = Me.textureTypeReadable(e.type)), t;
      }
      this.readRenderTargetPixels = function (e, t, n, r, i, a, o, s = 0) {
        if (!(e && e.isWebGLRenderTarget)) {
          W(`WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);
          return;
        }
        let __webglFramebuffer = V.get(e).__webglFramebuffer;
        if (e.isWebGLCubeRenderTarget && o !== undefined && (__webglFramebuffer = __webglFramebuffer[o]), __webglFramebuffer) {
          B.bindFramebuffer(R.FRAMEBUFFER, __webglFramebuffer);
          try {
            let o = e.textures[s],
              format = o.format,
              l = o.type;
            e.textures.length > 1 && R.readBuffer(R.COLOR_ATTACHMENT0 + s);
            let u = Et(o);
            if (u.__formatReadable === false) {
              W(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.`);
              return;
            }
            if (u.__typeReadable === false) {
              W(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.`);
              return;
            }
            t >= 0 && t <= e.width - r && n >= 0 && n <= e.height - i && R.readPixels(t, n, r, i, $e.convert(format), $e.convert(l), a);
          } finally {
            let e = I === null ? null : V.get(I).__webglFramebuffer;
            B.bindFramebuffer(R.FRAMEBUFFER, e);
          }
        }
      }, this.readRenderTargetPixelsAsync = async function (e, t, n, r, i, a, o, s = 0) {
        if (!(e && e.isWebGLRenderTarget)) throw Error(`THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);
        let __webglFramebuffer = V.get(e).__webglFramebuffer;
        if (e.isWebGLCubeRenderTarget && o !== undefined && (__webglFramebuffer = __webglFramebuffer[o]), __webglFramebuffer) {
          if (t >= 0 && t <= e.width - r && n >= 0 && n <= e.height - i) {
            B.bindFramebuffer(R.FRAMEBUFFER, __webglFramebuffer);
            let o = e.textures[s],
              format = o.format,
              u = o.type;
            e.textures.length > 1 && R.readBuffer(R.COLOR_ATTACHMENT0 + s);
            let d = Et(o);
            if (d.__formatReadable === false) throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.`);
            if (d.__typeReadable === false) throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.`);
            let buffer = R.createBuffer();
            R.bindBuffer(R.PIXEL_PACK_BUFFER, buffer), R.bufferData(R.PIXEL_PACK_BUFFER, a.byteLength, R.STREAM_READ), R.readPixels(t, n, r, i, $e.convert(format), $e.convert(u), 0), R.bindBuffer(R.PIXEL_PACK_BUFFER, null);
            let p = I === null ? null : V.get(I).__webglFramebuffer;
            B.bindFramebuffer(R.FRAMEBUFFER, p);
            let fenceSync = R.fenceSync(R.SYNC_GPU_COMMANDS_COMPLETE, 0);
            return R.flush(), await Ze(R, fenceSync, 4), R.bindBuffer(R.PIXEL_PACK_BUFFER, buffer), R.getBufferSubData(R.PIXEL_PACK_BUFFER, 0, a), R.bindBuffer(R.PIXEL_PACK_BUFFER, null), R.deleteBuffer(buffer), R.deleteSync(fenceSync), a;
          }
          throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.`);
        }
      }, this.copyFramebufferToTexture = function (e, t = null, n = 0) {
        let r = 2 ** -n,
          i = Math.floor(e.image.width * r),
          a = Math.floor(e.image.height * r),
          o = t === null ? 0 : t.x,
          s = t === null ? 0 : t.y;
        H.setTexture2D(e, 0), R.copyTexSubImage2D(R.TEXTURE_2D, n, 0, 0, o, s, i, a), B.unbindTexture();
      }, this.copyTextureToTexture = function (e, t, n = null, r = null, i = 0, a = 0) {
        let ratio,
          total,
          c,
          l,
          u,
          d,
          f,
          p,
          m,
          h = e.isCompressedTexture ? e.mipmaps[a] : e.image;
        if (n !== null) ratio = n.max.x - n.min.x, total = n.max.y - n.min.y, c = n.isBox3 ? n.max.z - n.min.z : 1, l = n.min.x, u = n.min.y, d = n.isBox3 ? n.min.z : 0;else {
          let t = 2 ** -i;
          ratio = Math.floor(h.width * t), total = Math.floor(h.height * t), c = e.isDataArrayTexture ? h.depth : e.isData3DTexture ? Math.floor(h.depth * t) : 1, l = 0, u = 0, d = 0;
        }
        r === null ? (f = 0, p = 0, m = 0) : (f = r.x, p = r.y, m = r.z);
        let g = $e.convert(t.format),
          _ = $e.convert(t.type),
          v;
        t.isData3DTexture ? (H.setTexture3D(t, 0), v = R.TEXTURE_3D) : t.isDataArrayTexture || t.isCompressedArrayTexture ? (H.setTexture2DArray(t, 0), v = R.TEXTURE_2D_ARRAY) : (H.setTexture2D(t, 0), v = R.TEXTURE_2D), B.activeTexture(R.TEXTURE0), B.pixelStorei(R.UNPACK_FLIP_Y_WEBGL, t.flipY), B.pixelStorei(R.UNPACK_PREMULTIPLY_ALPHA_WEBGL, t.premultiplyAlpha), B.pixelStorei(R.UNPACK_ALIGNMENT, t.unpackAlignment);
        let parameter = B.getParameter(R.UNPACK_ROW_LENGTH),
          parameterResult = B.getParameter(R.UNPACK_IMAGE_HEIGHT),
          x = B.getParameter(R.UNPACK_SKIP_PIXELS),
          S = B.getParameter(R.UNPACK_SKIP_ROWS),
          C = B.getParameter(R.UNPACK_SKIP_IMAGES);
        B.pixelStorei(R.UNPACK_ROW_LENGTH, h.width), B.pixelStorei(R.UNPACK_IMAGE_HEIGHT, h.height), B.pixelStorei(R.UNPACK_SKIP_PIXELS, l), B.pixelStorei(R.UNPACK_SKIP_ROWS, u), B.pixelStorei(R.UNPACK_SKIP_IMAGES, d);
        let fallbackValue = e.isDataArrayTexture || e.isData3DTexture,
          T = t.isDataArrayTexture || t.isData3DTexture;
        if (e.isDepthTexture) {
          let n = V.get(e),
            r = V.get(t),
            h = V.get(n.__renderTarget),
            g = V.get(r.__renderTarget);
          B.bindFramebuffer(R.READ_FRAMEBUFFER, h.__webglFramebuffer), B.bindFramebuffer(R.DRAW_FRAMEBUFFER, g.__webglFramebuffer);
          for (let n = 0; n < c; n++) fallbackValue && (R.framebufferTextureLayer(R.READ_FRAMEBUFFER, R.COLOR_ATTACHMENT0, V.get(e).__webglTexture, i, d + n), R.framebufferTextureLayer(R.DRAW_FRAMEBUFFER, R.COLOR_ATTACHMENT0, V.get(t).__webglTexture, a, m + n)), R.blitFramebuffer(l, u, ratio, total, f, p, ratio, total, R.DEPTH_BUFFER_BIT, R.NEAREST);
          B.bindFramebuffer(R.READ_FRAMEBUFFER, null), B.bindFramebuffer(R.DRAW_FRAMEBUFFER, null);
        } else if (i !== 0 || e.isRenderTargetTexture || V.has(e)) {
          let n = V.get(e),
            r = V.get(t);
          B.bindFramebuffer(R.READ_FRAMEBUFFER, ie), B.bindFramebuffer(R.DRAW_FRAMEBUFFER, ae);
          for (let e = 0; e < c; e++) fallbackValue ? R.framebufferTextureLayer(R.READ_FRAMEBUFFER, R.COLOR_ATTACHMENT0, n.__webglTexture, i, d + e) : R.framebufferTexture2D(R.READ_FRAMEBUFFER, R.COLOR_ATTACHMENT0, R.TEXTURE_2D, n.__webglTexture, i), T ? R.framebufferTextureLayer(R.DRAW_FRAMEBUFFER, R.COLOR_ATTACHMENT0, r.__webglTexture, a, m + e) : R.framebufferTexture2D(R.DRAW_FRAMEBUFFER, R.COLOR_ATTACHMENT0, R.TEXTURE_2D, r.__webglTexture, a), i === 0 ? T ? R.copyTexSubImage3D(v, a, f, p, m + e, l, u, ratio, total) : R.copyTexSubImage2D(v, a, f, p, l, u, ratio, total) : R.blitFramebuffer(l, u, ratio, total, f, p, ratio, total, R.COLOR_BUFFER_BIT, R.NEAREST);
          B.bindFramebuffer(R.READ_FRAMEBUFFER, null), B.bindFramebuffer(R.DRAW_FRAMEBUFFER, null);
        } else T ? e.isDataTexture || e.isData3DTexture ? R.texSubImage3D(v, a, f, p, m, ratio, total, c, g, _, h.data) : t.isCompressedArrayTexture ? R.compressedTexSubImage3D(v, a, f, p, m, ratio, total, c, g, h.data) : R.texSubImage3D(v, a, f, p, m, ratio, total, c, g, _, h) : e.isDataTexture ? R.texSubImage2D(R.TEXTURE_2D, a, f, p, ratio, total, g, _, h.data) : e.isCompressedTexture ? R.compressedTexSubImage2D(R.TEXTURE_2D, a, f, p, h.width, h.height, g, h.data) : R.texSubImage2D(R.TEXTURE_2D, a, f, p, ratio, total, g, _, h);
        B.pixelStorei(R.UNPACK_ROW_LENGTH, parameter), B.pixelStorei(R.UNPACK_IMAGE_HEIGHT, parameterResult), B.pixelStorei(R.UNPACK_SKIP_PIXELS, x), B.pixelStorei(R.UNPACK_SKIP_ROWS, S), B.pixelStorei(R.UNPACK_SKIP_IMAGES, C), a === 0 && t.generateMipmaps && R.generateMipmap(v), B.unbindTexture();
      }, this.initRenderTarget = function (e) {
        V.get(e).__webglFramebuffer === undefined && H.setupRenderTarget(e);
      }, this.initTexture = function (e) {
        e.isCubeTexture ? H.setTextureCube(e, 0) : e.isData3DTexture ? H.setTexture3D(e, 0) : e.isDataArrayTexture || e.isCompressedArrayTexture ? H.setTexture2DArray(e, 0) : H.setTexture2D(e, 0), B.unbindTexture();
      }, this.resetState = function () {
        oe = 0, se = 0, I = null, B.reset(), et.reset();
      }, typeof __THREE_DEVTOOLS__ < `u` && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`, {
        detail: this
      }));
    }
    get coordinateSystem() {
      return He;
    }
    get outputColorSpace() {
      return this._outputColorSpace;
    }
    set outputColorSpace(output) {
      this._outputColorSpace = output;
      let context = this.getContext();
      context.drawingBufferColorSpace = Y._getDrawingBufferColorSpace(output), context.unpackColorSpace = Y._getUnpackColorSpace();
    }
  },
  nl = {
    type: `change`
  },
  rl = {
    type: `start`
  },
  il = {
    type: `end`
  },
  al = new Ir(),
  ol = new kr(),
  sl = Math.cos(70 * Tt.DEG2RAD),
  cl = new q(),
  ll = 2 * Math.PI,
  $ = {
    NONE: -1,
    ROTATE: 0,
    DOLLY: 1,
    PAN: 2,
    TOUCH_ROTATE: 3,
    TOUCH_PAN: 4,
    TOUCH_DOLLY_PAN: 5,
    TOUCH_DOLLY_ROTATE: 6
  },
  ul = 1e-6,
  dl = class extends Fa {
    constructor(constructor, r = null) {
      super(constructor, r), this.state = $.NONE, this.target = new q(), this.cursor = new q(), this.minDistance = 0, this.maxDistance = 1 / 0, this.minZoom = 0, this.maxZoom = 1 / 0, this.minTargetRadius = 0, this.maxTargetRadius = 1 / 0, this.minPolarAngle = 0, this.maxPolarAngle = Math.PI, this.minAzimuthAngle = -1 / 0, this.maxAzimuthAngle = 1 / 0, this.enableDamping = false, this.dampingFactor = .05, this.enableZoom = true, this.zoomSpeed = 1, this.enableRotate = true, this.rotateSpeed = 1, this.keyRotateSpeed = 1, this.enablePan = true, this.panSpeed = 1, this.screenSpacePanning = true, this.keyPanSpeed = 7, this.zoomToCursor = false, this.autoRotate = false, this.autoRotateSpeed = 2, this.keys = {
        LEFT: `ArrowLeft`,
        UP: `ArrowUp`,
        RIGHT: `ArrowRight`,
        BOTTOM: `ArrowDown`
      }, this.mouseButtons = {
        LEFT: options.ROTATE,
        MIDDLE: options.DOLLY,
        RIGHT: options.PAN
      }, this.touches = {
        ONE: t.ROTATE,
        TWO: t.DOLLY_PAN
      }, this.target0 = this.target.clone(), this.position0 = this.object.position.clone(), this.zoom0 = this.object.zoom, this._cursorStyle = `auto`, this._domElementKeyEvents = null, this._lastPosition = new q(), this._lastQuaternion = new Et(), this._lastTargetPosition = new q(), this._quat = new Et().setFromUnitVectors(constructor.up, new q(0, 1, 0)), this._quatInverse = this._quat.clone().invert(), this._spherical = new Pa(), this._sphericalDelta = new Pa(), this._scale = 1, this._panOffset = new q(), this._rotateStart = new K(), this._rotateEnd = new K(), this._rotateDelta = new K(), this._panStart = new K(), this._panEnd = new K(), this._panDelta = new K(), this._dollyStart = new K(), this._dollyEnd = new K(), this._dollyDelta = new K(), this._dollyDirection = new q(), this._mouse = new K(), this._performCursorZoom = false, this._pointers = [], this._pointerPositions = {}, this._controlActive = false, this._onPointerMove = pl.bind(this), this._onPointerDown = fl.bind(this), this._onPointerUp = ml.bind(this), this._onContextMenu = xl.bind(this), this._onMouseWheel = _l.bind(this), this._onKeyDown = vl.bind(this), this._onTouchStart = yl.bind(this), this._onTouchMove = bl.bind(this), this._onMouseDown = hl.bind(this), this._onMouseMove = gl.bind(this), this._interceptControlDown = Sl.bind(this), this._interceptControlUp = Cl.bind(this), this.domElement !== null && this.connect(this.domElement), this.update();
    }
    set cursorStyle(cursor) {
      this._cursorStyle = cursor, cursor === `grab` ? this.domElement.style.cursor = `grab` : this.domElement.style.cursor = `auto`;
    }
    get cursorStyle() {
      return this._cursorStyle;
    }
    connect(connect) {
      super.connect(connect), this.domElement.addEventListener(`pointerdown`, this._onPointerDown), this.domElement.addEventListener(`pointercancel`, this._onPointerUp), this.domElement.addEventListener(`contextmenu`, this._onContextMenu), this.domElement.addEventListener(`wheel`, this._onMouseWheel, {
        passive: false
      }), this.domElement.getRootNode().addEventListener(`keydown`, this._interceptControlDown, {
        passive: true,
        capture: true
      }), this.domElement.style.touchAction = `none`;
    }
    disconnect() {
      this.state = $.NONE, this.domElement.removeEventListener(`pointerdown`, this._onPointerDown), this.domElement.ownerDocument.removeEventListener(`pointermove`, this._onPointerMove), this.domElement.ownerDocument.removeEventListener(`pointerup`, this._onPointerUp), this.domElement.removeEventListener(`pointercancel`, this._onPointerUp), this.domElement.removeEventListener(`wheel`, this._onMouseWheel), this.domElement.removeEventListener(`contextmenu`, this._onContextMenu), this.stopListenToKeyEvents();
      let rootNode = this.domElement.getRootNode();
      rootNode.removeEventListener(`keydown`, this._interceptControlDown, {
        capture: true
      }), rootNode.removeEventListener(`keyup`, this._interceptControlUp, {
        capture: true
      }), this._controlActive = false, this._pointers.length = 0, this._pointerPositions = {}, this.domElement.style.touchAction = ``, this.domElement.style.cursor = `auto`;
    }
    dispose() {
      this.disconnect();
    }
    getPolarAngle() {
      return this._spherical.phi;
    }
    getAzimuthalAngle() {
      return this._spherical.theta;
    }
    getDistance() {
      return this.object.position.distanceTo(this.target);
    }
    listenToKeyEvents(key) {
      key.addEventListener(`keydown`, this._onKeyDown), this._domElementKeyEvents = key;
    }
    stopListenToKeyEvents() {
      this._domElementKeyEvents !== null && (this._domElementKeyEvents.removeEventListener(`keydown`, this._onKeyDown), this._domElementKeyEvents = null);
    }
    saveState() {
      this.target0.copy(this.target), this.position0.copy(this.object.position), this.zoom0 = this.object.zoom;
    }
    reset() {
      this.target.copy(this.target0), this.object.position.copy(this.position0), this.object.zoom = this.zoom0, this.object.updateProjectionMatrix(), this.dispatchEvent(nl), this.update(), this.state = $.NONE;
    }
    pan(e, t) {
      this._pan(e, t), this.update();
    }
    dollyIn(dolly) {
      this._dollyIn(dolly), this.update();
    }
    dollyOut(dolly) {
      this._dollyOut(dolly), this.update();
    }
    rotateLeft(rotate) {
      this._rotateLeft(rotate), this.update();
    }
    rotateUp(rotate) {
      this._rotateUp(rotate), this.update();
    }
    update(e = null) {
      let position = this.object.position;
      cl.copy(position).sub(this.target), cl.applyQuaternion(this._quat), this._spherical.setFromVector3(cl), this.autoRotate && this.state === $.NONE && this._rotateLeft(this._getAutoRotationAngle(e)), this.enableDamping ? (this._spherical.theta += this._sphericalDelta.theta * this.dampingFactor, this._spherical.phi += this._sphericalDelta.phi * this.dampingFactor) : (this._spherical.theta += this._sphericalDelta.theta, this._spherical.phi += this._sphericalDelta.phi);
      let minAzimuthAngle = this.minAzimuthAngle,
        maxAzimuthAngle = this.maxAzimuthAngle;
      isFinite(minAzimuthAngle) && isFinite(maxAzimuthAngle) && (minAzimuthAngle < -Math.PI ? minAzimuthAngle += ll : minAzimuthAngle > Math.PI && (minAzimuthAngle -= ll), maxAzimuthAngle < -Math.PI ? maxAzimuthAngle += ll : maxAzimuthAngle > Math.PI && (maxAzimuthAngle -= ll), minAzimuthAngle <= maxAzimuthAngle ? this._spherical.theta = Math.max(minAzimuthAngle, Math.min(maxAzimuthAngle, this._spherical.theta)) : this._spherical.theta = this._spherical.theta > (minAzimuthAngle + maxAzimuthAngle) / 2 ? Math.max(minAzimuthAngle, this._spherical.theta) : Math.min(maxAzimuthAngle, this._spherical.theta)), this._spherical.phi = Math.max(this.minPolarAngle, Math.min(this.maxPolarAngle, this._spherical.phi)), this._spherical.makeSafe(), this.enableDamping === true ? this.target.addScaledVector(this._panOffset, this.dampingFactor) : this.target.add(this._panOffset), this.target.sub(this.cursor), this.target.clampLength(this.minTargetRadius, this.maxTargetRadius), this.target.add(this.cursor);
      let i = false;
      if (this.zoomToCursor && this._performCursorZoom || this.object.isOrthographicCamera) this._spherical.radius = this._clampDistance(this._spherical.radius);else {
        let radius = this._spherical.radius;
        this._spherical.radius = this._clampDistance(this._spherical.radius * this._scale), i = radius != this._spherical.radius;
      }
      if (cl.setFromSpherical(this._spherical), cl.applyQuaternion(this._quatInverse), position.copy(this.target).add(cl), this.object.lookAt(this.target), this.enableDamping === true ? (this._sphericalDelta.theta *= 1 - this.dampingFactor, this._sphericalDelta.phi *= 1 - this.dampingFactor, this._panOffset.multiplyScalar(1 - this.dampingFactor)) : (this._sphericalDelta.set(0, 0, 0), this._panOffset.set(0, 0, 0)), this.zoomToCursor && this._performCursorZoom) {
        let ratio = null;
        if (this.object.isPerspectiveCamera) {
          let t = cl.length();
          ratio = this._clampDistance(t * this._scale);
          let n = t - ratio;
          this.object.position.addScaledVector(this._dollyDirection, n), this.object.updateMatrixWorld(), i = !!n;
        } else if (this.object.isOrthographicCamera) {
          let t = new q(this._mouse.x, this._mouse.y, 0);
          t.unproject(this.object);
          let zoom = this.object.zoom;
          this.object.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.object.zoom / this._scale)), this.object.updateProjectionMatrix(), i = zoom !== this.object.zoom;
          let r = new q(this._mouse.x, this._mouse.y, 0);
          r.unproject(this.object), this.object.position.sub(r).add(t), this.object.updateMatrixWorld(), ratio = cl.length();
        } else console.warn(`WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled.`), this.zoomToCursor = false;
        ratio !== null && (this.screenSpacePanning ? this.target.set(0, 0, -1).transformDirection(this.object.matrix).multiplyScalar(ratio).add(this.object.position) : (al.origin.copy(this.object.position), al.direction.set(0, 0, -1).transformDirection(this.object.matrix), Math.abs(this.object.up.dot(al.direction)) < sl ? this.object.lookAt(this.target) : (ol.setFromNormalAndCoplanarPoint(this.object.up, this.target), al.intersectPlane(ol, this.target))));
      } else if (this.object.isOrthographicCamera) {
        let zoom = this.object.zoom;
        this.object.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.object.zoom / this._scale)), zoom !== this.object.zoom && (this.object.updateProjectionMatrix(), i = true);
      }
      return this._scale = 1, this._performCursorZoom = false, i || this._lastPosition.distanceToSquared(this.object.position) > ul || 8 * (1 - this._lastQuaternion.dot(this.object.quaternion)) > ul || this._lastTargetPosition.distanceToSquared(this.target) > ul ? (this.dispatchEvent(nl), this._lastPosition.copy(this.object.position), this._lastQuaternion.copy(this.object.quaternion), this._lastTargetPosition.copy(this.target), true) : false;
    }
    _getAutoRotationAngle(e) {
      return e === null ? ll / 60 / 60 * this.autoRotateSpeed : ll / 60 * this.autoRotateSpeed * e;
    }
    _getZoomScale(e) {
      let t = Math.abs(e * .01);
      return .95 ** (this.zoomSpeed * t);
    }
    _rotateLeft(e) {
      this._sphericalDelta.theta -= e;
    }
    _rotateUp(e) {
      this._sphericalDelta.phi -= e;
    }
    _panLeft(e, left) {
      cl.setFromMatrixColumn(left, 0), cl.multiplyScalar(-e), this._panOffset.add(cl);
    }
    _panUp(e, t) {
      this.screenSpacePanning === true ? cl.setFromMatrixColumn(t, 1) : (cl.setFromMatrixColumn(t, 0), cl.crossVectors(this.object.up, cl)), cl.multiplyScalar(e), this._panOffset.add(cl);
    }
    _pan(e, t) {
      let domElement = this.domElement;
      if (this.object.isPerspectiveCamera) {
        let position = this.object.position;
        cl.copy(position).sub(this.target);
        let i = cl.length();
        i *= Math.tan(this.object.fov / 2 * Math.PI / 180), this._panLeft(2 * e * i / domElement.clientHeight, this.object.matrix), this._panUp(2 * t * i / domElement.clientHeight, this.object.matrix);
      } else this.object.isOrthographicCamera ? (this._panLeft(e * (this.object.right - this.object.left) / this.object.zoom / domElement.clientWidth, this.object.matrix), this._panUp(t * (this.object.top - this.object.bottom) / this.object.zoom / domElement.clientHeight, this.object.matrix)) : (console.warn(`WARNING: OrbitControls.js encountered an unknown camera type - pan disabled.`), this.enablePan = false);
    }
    _dollyOut(e) {
      this.object.isPerspectiveCamera || this.object.isOrthographicCamera ? this._scale /= e : (console.warn(`WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.`), this.enableZoom = false);
    }
    _dollyIn(e) {
      this.object.isPerspectiveCamera || this.object.isOrthographicCamera ? this._scale *= e : (console.warn(`WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.`), this.enableZoom = false);
    }
    _updateZoomParameters(e, zoom) {
      if (!this.zoomToCursor) return;
      this._performCursorZoom = true;
      let boundingClientRect = this.domElement.getBoundingClientRect(),
        r = e - boundingClientRect.left,
        i = zoom - boundingClientRect.top,
        a = boundingClientRect.width,
        o = boundingClientRect.height;
      this._mouse.x = r / a * 2 - 1, this._mouse.y = -(i / o) * 2 + 1, this._dollyDirection.set(this._mouse.x, this._mouse.y, 1).unproject(this.object).sub(this.object.position).normalize();
    }
    _clampDistance(e) {
      return Math.max(this.minDistance, Math.min(this.maxDistance, e));
    }
    _handleMouseDownRotate(event) {
      this._rotateStart.set(event.clientX, event.clientY);
    }
    _handleMouseDownDolly(event) {
      this._updateZoomParameters(event.clientX, event.clientX), this._dollyStart.set(event.clientX, event.clientY);
    }
    _handleMouseDownPan(event) {
      this._panStart.set(event.clientX, event.clientY);
    }
    _handleMouseMoveRotate(event) {
      this._rotateEnd.set(event.clientX, event.clientY), this._rotateDelta.subVectors(this._rotateEnd, this._rotateStart).multiplyScalar(this.rotateSpeed);
      let domElement = this.domElement;
      this._rotateLeft(ll * this._rotateDelta.x / domElement.clientHeight), this._rotateUp(ll * this._rotateDelta.y / domElement.clientHeight), this._rotateStart.copy(this._rotateEnd), this.update();
    }
    _handleMouseMoveDolly(event) {
      this._dollyEnd.set(event.clientX, event.clientY), this._dollyDelta.subVectors(this._dollyEnd, this._dollyStart), this._dollyDelta.y > 0 ? this._dollyOut(this._getZoomScale(this._dollyDelta.y)) : this._dollyDelta.y < 0 && this._dollyIn(this._getZoomScale(this._dollyDelta.y)), this._dollyStart.copy(this._dollyEnd), this.update();
    }
    _handleMouseMovePan(event) {
      this._panEnd.set(event.clientX, event.clientY), this._panDelta.subVectors(this._panEnd, this._panStart).multiplyScalar(this.panSpeed), this._pan(this._panDelta.x, this._panDelta.y), this._panStart.copy(this._panEnd), this.update();
    }
    _handleMouseWheel(event) {
      this._updateZoomParameters(event.clientX, event.clientY), event.deltaY < 0 ? this._dollyIn(this._getZoomScale(event.deltaY)) : event.deltaY > 0 && this._dollyOut(this._getZoomScale(event.deltaY)), this.update();
    }
    _handleKeyDown(event) {
      let t = false;
      switch (event.code) {
        case this.keys.UP:
          event.ctrlKey || event.metaKey || event.shiftKey ? this.enableRotate && this._rotateUp(ll * this.keyRotateSpeed / this.domElement.clientHeight) : this.enablePan && this._pan(0, this.keyPanSpeed), t = true;
          break;
        case this.keys.BOTTOM:
          event.ctrlKey || event.metaKey || event.shiftKey ? this.enableRotate && this._rotateUp(-ll * this.keyRotateSpeed / this.domElement.clientHeight) : this.enablePan && this._pan(0, -this.keyPanSpeed), t = true;
          break;
        case this.keys.LEFT:
          event.ctrlKey || event.metaKey || event.shiftKey ? this.enableRotate && this._rotateLeft(ll * this.keyRotateSpeed / this.domElement.clientHeight) : this.enablePan && this._pan(this.keyPanSpeed, 0), t = true;
          break;
        case this.keys.RIGHT:
          event.ctrlKey || event.metaKey || event.shiftKey ? this.enableRotate && this._rotateLeft(-ll * this.keyRotateSpeed / this.domElement.clientHeight) : this.enablePan && this._pan(-this.keyPanSpeed, 0), t = true;
      }
      t && (event.preventDefault(), this.update());
    }
    _handleTouchStartRotate(e) {
      if (this._pointers.length === 1) this._rotateStart.set(e.pageX, e.pageY);else {
        let t = this._getSecondPointerPosition(e),
          n = .5 * (e.pageX + t.x),
          r = .5 * (e.pageY + t.y);
        this._rotateStart.set(n, r);
      }
    }
    _handleTouchStartPan(e) {
      if (this._pointers.length === 1) this._panStart.set(e.pageX, e.pageY);else {
        let t = this._getSecondPointerPosition(e),
          n = .5 * (e.pageX + t.x),
          r = .5 * (e.pageY + t.y);
        this._panStart.set(n, r);
      }
    }
    _handleTouchStartDolly(e) {
      let t = this._getSecondPointerPosition(e),
        n = e.pageX - t.x,
        r = e.pageY - t.y,
        i = Math.sqrt(n * n + r * r);
      this._dollyStart.set(0, i);
    }
    _handleTouchStartDollyPan(e) {
      this.enableZoom && this._handleTouchStartDolly(e), this.enablePan && this._handleTouchStartPan(e);
    }
    _handleTouchStartDollyRotate(e) {
      this.enableZoom && this._handleTouchStartDolly(e), this.enableRotate && this._handleTouchStartRotate(e);
    }
    _handleTouchMoveRotate(e) {
      if (this._pointers.length == 1) this._rotateEnd.set(e.pageX, e.pageY);else {
        let t = this._getSecondPointerPosition(e),
          n = .5 * (e.pageX + t.x),
          r = .5 * (e.pageY + t.y);
        this._rotateEnd.set(n, r);
      }
      this._rotateDelta.subVectors(this._rotateEnd, this._rotateStart).multiplyScalar(this.rotateSpeed);
      let domElement = this.domElement;
      this._rotateLeft(ll * this._rotateDelta.x / domElement.clientHeight), this._rotateUp(ll * this._rotateDelta.y / domElement.clientHeight), this._rotateStart.copy(this._rotateEnd);
    }
    _handleTouchMovePan(e) {
      if (this._pointers.length === 1) this._panEnd.set(e.pageX, e.pageY);else {
        let t = this._getSecondPointerPosition(e),
          n = .5 * (e.pageX + t.x),
          r = .5 * (e.pageY + t.y);
        this._panEnd.set(n, r);
      }
      this._panDelta.subVectors(this._panEnd, this._panStart).multiplyScalar(this.panSpeed), this._pan(this._panDelta.x, this._panDelta.y), this._panStart.copy(this._panEnd);
    }
    _handleTouchMoveDolly(e) {
      let t = this._getSecondPointerPosition(e),
        n = e.pageX - t.x,
        r = e.pageY - t.y,
        i = Math.sqrt(n * n + r * r);
      this._dollyEnd.set(0, i), this._dollyDelta.set(0, (this._dollyEnd.y / this._dollyStart.y) ** +this.zoomSpeed), this._dollyOut(this._dollyDelta.y), this._dollyStart.copy(this._dollyEnd);
      let a = (e.pageX + t.x) * .5,
        o = (e.pageY + t.y) * .5;
      this._updateZoomParameters(a, o);
    }
    _handleTouchMoveDollyPan(e) {
      this.enableZoom && this._handleTouchMoveDolly(e), this.enablePan && this._handleTouchMovePan(e);
    }
    _handleTouchMoveDollyRotate(e) {
      this.enableZoom && this._handleTouchMoveDolly(e), this.enableRotate && this._handleTouchMoveRotate(e);
    }
    _addPointer(e) {
      this._pointers.push(e.pointerId);
    }
    _removePointer(e) {
      delete this._pointerPositions[e.pointerId];
      for (let t = 0; t < this._pointers.length; t++) if (this._pointers[t] == e.pointerId) {
        this._pointers.splice(t, 1);
        return;
      }
    }
    _isTrackingPointer(e) {
      for (let t = 0; t < this._pointers.length; t++) if (this._pointers[t] == e.pointerId) return true;
      return false;
    }
    _trackPointer(e) {
      let t = this._pointerPositions[e.pointerId];
      t === undefined && (t = new K(), this._pointerPositions[e.pointerId] = t), t.set(e.pageX, e.pageY);
    }
    _getSecondPointerPosition(e) {
      let t = e.pointerId === this._pointers[0] ? this._pointers[1] : this._pointers[0];
      return this._pointerPositions[t];
    }
    _customWheelEvent(event) {
      let deltaMode = event.deltaMode,
        n = {
          clientX: event.clientX,
          clientY: event.clientY,
          deltaY: event.deltaY
        };
      switch (deltaMode) {
        case 1:
          n.deltaY *= 16;
          break;
        case 2:
          n.deltaY *= 100;
      }
      return event.ctrlKey && !this._controlActive && (n.deltaY *= 10), n;
    }
  };
function fl(e) {
  this.enabled !== false && (this._pointers.length === 0 && (this.domElement.setPointerCapture(e.pointerId), this.domElement.ownerDocument.addEventListener(`pointermove`, this._onPointerMove), this.domElement.ownerDocument.addEventListener(`pointerup`, this._onPointerUp)), !this._isTrackingPointer(e) && (this._addPointer(e), e.pointerType === `touch` ? this._onTouchStart(e) : this._onMouseDown(e), this._cursorStyle === `grab` && (this.domElement.style.cursor = `grabbing`)));
}
function pl(e) {
  this.enabled !== false && (e.pointerType === `touch` ? this._onTouchMove(e) : this._onMouseMove(e));
}
function ml(e) {
  switch (this._removePointer(e), this._pointers.length) {
    case 0:
      this.domElement.releasePointerCapture(e.pointerId), this.domElement.ownerDocument.removeEventListener(`pointermove`, this._onPointerMove), this.domElement.ownerDocument.removeEventListener(`pointerup`, this._onPointerUp), this.dispatchEvent(il), this.state = $.NONE, this._cursorStyle === `grab` && (this.domElement.style.cursor = `grab`);
      break;
    case 1:
      let t = this._pointers[0],
        n = this._pointerPositions[t];
      this._onTouchStart({
        pointerId: t,
        pageX: n.x,
        pageY: n.y
      });
  }
}
function hl(event) {
  let count;
  switch (event.button) {
    case 0:
      count = this.mouseButtons.LEFT;
      break;
    case 1:
      count = this.mouseButtons.MIDDLE;
      break;
    case 2:
      count = this.mouseButtons.RIGHT;
      break;
    default:
      count = -1;
  }
  switch (count) {
    case options.DOLLY:
      if (this.enableZoom === false) return;
      this._handleMouseDownDolly(event), this.state = $.DOLLY;
      break;
    case options.ROTATE:
      if (event.ctrlKey || event.metaKey || event.shiftKey) {
        if (this.enablePan === false) return;
        this._handleMouseDownPan(event), this.state = $.PAN;
      } else {
        if (this.enableRotate === false) return;
        this._handleMouseDownRotate(event), this.state = $.ROTATE;
      }
      break;
    case options.PAN:
      if (event.ctrlKey || event.metaKey || event.shiftKey) {
        if (this.enableRotate === false) return;
        this._handleMouseDownRotate(event), this.state = $.ROTATE;
      } else {
        if (this.enablePan === false) return;
        this._handleMouseDownPan(event), this.state = $.PAN;
      }
      break;
    default:
      this.state = $.NONE;
  }
  this.state !== $.NONE && this.dispatchEvent(rl);
}
function gl(e) {
  switch (this.state) {
    case $.ROTATE:
      if (this.enableRotate === false) return;
      this._handleMouseMoveRotate(e);
      break;
    case $.DOLLY:
      if (this.enableZoom === false) return;
      this._handleMouseMoveDolly(e);
      break;
    case $.PAN:
      if (this.enablePan === false) return;
      this._handleMouseMovePan(e);
  }
}
function _l(event) {
  this.enabled !== false && this.enableZoom !== false && this.state === $.NONE && (event.preventDefault(), this.dispatchEvent(rl), this._handleMouseWheel(this._customWheelEvent(event)), this.dispatchEvent(il));
}
function vl(e) {
  this.enabled !== false && this._handleKeyDown(e);
}
function yl(e) {
  switch (this._trackPointer(e), this._pointers.length) {
    case 1:
      switch (this.touches.ONE) {
        case t.ROTATE:
          if (this.enableRotate === false) return;
          this._handleTouchStartRotate(e), this.state = $.TOUCH_ROTATE;
          break;
        case t.PAN:
          if (this.enablePan === false) return;
          this._handleTouchStartPan(e), this.state = $.TOUCH_PAN;
          break;
        default:
          this.state = $.NONE;
      }
      break;
    case 2:
      switch (this.touches.TWO) {
        case t.DOLLY_PAN:
          if (this.enableZoom === false && this.enablePan === false) return;
          this._handleTouchStartDollyPan(e), this.state = $.TOUCH_DOLLY_PAN;
          break;
        case t.DOLLY_ROTATE:
          if (this.enableZoom === false && this.enableRotate === false) return;
          this._handleTouchStartDollyRotate(e), this.state = $.TOUCH_DOLLY_ROTATE;
          break;
        default:
          this.state = $.NONE;
      }
      break;
    default:
      this.state = $.NONE;
  }
  this.state !== $.NONE && this.dispatchEvent(rl);
}
function bl(e) {
  switch (this._trackPointer(e), this.state) {
    case $.TOUCH_ROTATE:
      if (this.enableRotate === false) return;
      this._handleTouchMoveRotate(e), this.update();
      break;
    case $.TOUCH_PAN:
      if (this.enablePan === false) return;
      this._handleTouchMovePan(e), this.update();
      break;
    case $.TOUCH_DOLLY_PAN:
      if (this.enableZoom === false && this.enablePan === false) return;
      this._handleTouchMoveDollyPan(e), this.update();
      break;
    case $.TOUCH_DOLLY_ROTATE:
      if (this.enableZoom === false && this.enableRotate === false) return;
      this._handleTouchMoveDollyRotate(e), this.update();
      break;
    default:
      this.state = $.NONE;
  }
}
function xl(event) {
  this.enabled !== false && event.preventDefault();
}
function Sl(event) {
  event.key === `Control` && (this._controlActive = true, this.domElement.getRootNode().addEventListener(`keyup`, this._interceptControlUp, {
    passive: true,
    capture: true
  }));
}
function Cl(event) {
  event.key === `Control` && (this._controlActive = false, this.domElement.getRootNode().removeEventListener(`keyup`, this._interceptControlUp, {
    passive: true,
    capture: true
  }));
}
export { jn as C, q as E, Fe as S, K as T, Lr as _, gi as a, Et as b, _i as c, pr as d, Cn as f, Yr as g, Jt as h, Kn as i, fa as l, si as m, tl as n, Tr as o, $r as p, pa as r, X as s, dl as t, Ve as u, ki as v, Pa as w, ja as x, la as y };