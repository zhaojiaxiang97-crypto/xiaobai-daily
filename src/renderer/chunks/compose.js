import { r as lucideR } from "../ui/icons/lucide-icons.js";
import { l as beautifierL, o as beautifierO } from "./screenshot-beautifier.js";
var r = lucideR(`scan-text`, [[`path`, {
  d: `M3 7V5a2 2 0 0 1 2-2h2`,
  key: `aa7l1z`
}], [`path`, {
  d: `M17 3h2a2 2 0 0 1 2 2v2`,
  key: `4qcy5o`
}], [`path`, {
  d: `M21 17v2a2 2 0 0 1-2 2h-2`,
  key: `6vwrx8`
}], [`path`, {
  d: `M7 21H5a2 2 0 0 1-2-2v-2`,
  key: `ioqczr`
}], [`path`, {
  d: `M7 8h8`,
  key: `1jbsf9`
}], [`path`, {
  d: `M7 12h10`,
  key: `b7w52i`
}], [`path`, {
  d: `M7 16h6`,
  key: `1vyc9m`
}]]);
function i(e, t) {
  let element = document.createElement(`canvas`);
  return element.width = Math.max(1, Math.round(e)), element.height = Math.max(1, Math.round(t)), element;
}
function a(e, t) {
  let context = e.getContext(`2d`, t);
  if (!context) throw Error(`Canvas 2D is not available`);
  return context;
}
function o(items, t, n) {
  let r = t * n,
    i = items.byteOffset % 4 == 0 ? items : items.slice(),
    uint32Array = new Uint32Array(i.buffer, i.byteOffset, r),
    uint8ClampedArray = new Uint8ClampedArray(r * 4),
    s = new Uint32Array(uint8ClampedArray.buffer);
  for (let e = 0; e < r; e += 1) {
    let t = uint32Array[e];
    s[e] = t & 65280 | (t & 255) << 16 | t >>> 16 & 255 | 4278190080;
  }
  return new ImageData(uint8ClampedArray, t, n);
}
async function s(e) {
  let blob = new Blob([e], {
      type: `image/png`
    }),
    imageBitmap = await createImageBitmap(blob);
  try {
    let e = i(imageBitmap.width, imageBitmap.height);
    return a(e).drawImage(imageBitmap, 0, 0), e;
  } finally {
    imageBitmap.close();
  }
}
function c(e) {
  return new Promise((fn, n) => {
    e.toBlob(e => {
      if (!e) {
        n(Error(`PNG export failed`));
        return;
      }
      e.arrayBuffer().then(result => fn(new Uint8Array(result)), n);
    }, `image/png`);
  });
}
function l(e, t, n, r, o) {
  let s = i(r, o);
  return a(s).drawImage(e, t, n, r, o, 0, 0, s.width, s.height), s;
}
function u(e) {
  e && (e.width = 1, e.height = 1);
}
function d(e, t) {
  return `#${[e[t], e[t + 1], e[t + 2]].map(item => item.toString(16).padStart(2, `0`)).join(``)}`;
}
var f = `system-ui, -apple-system, "PingFang SC", "Microsoft YaHei", "Segoe UI", sans-serif`,
  p = 1.3,
  count = null;
function h() {
  return count ||= a(i(4, 4)), count;
}
function g(e) {
  return `600 ${Math.round(e)}px ${f}`;
}
function _(e) {
  return {
    x: e.width < 0 ? e.x + e.width : e.x,
    y: e.height < 0 ? e.y + e.height : e.y,
    width: Math.abs(e.width),
    height: Math.abs(e.height)
  };
}
function v(items) {
  let parseIntResult = Number.parseInt(items.slice(1), 16),
    n = parseIntResult >> 16 & 255,
    r = parseIntResult >> 8 & 255,
    i = parseIntResult & 255;
  return (.299 * n + .587 * r + .114 * i) / 255;
}
function y(count) {
  let t = h();
  t.font = g(count.size);
  let parts = count.text.split(`
`),
    r = Math.max(count.size * .6, ...parts.map(item => t.measureText(item || ` `).width));
  return {
    x: count.x,
    y: count.y,
    width: r,
    height: parts.length * count.size * p
  };
}
function b(count) {
  switch (count.kind) {
    case `rect`:
    case `ellipse`:
    case `mosaic`:
      return _(count);
    case `arrow`:
    case `line`:
      return _({
        x: count.x1,
        y: count.y1,
        width: count.x2 - count.x1,
        height: count.y2 - count.y1
      });
    case `pen`:
    case `highlighter`:
      {
        let t = 1 / 0,
          n = 1 / 0,
          r = -1 / 0,
          i = -1 / 0;
        for (let a = 0; a < count.points.length; a += 2) t = Math.min(t, count.points[a]), r = Math.max(r, count.points[a]), n = Math.min(n, count.points[a + 1]), i = Math.max(i, count.points[a + 1]);
        return {
          x: t,
          y: n,
          width: r - t,
          height: i - n
        };
      }
    case `text`:
      return y(count);
    case `number`:
      return {
        x: count.x - count.size,
        y: count.y - count.size,
        width: count.size * 2,
        height: count.size * 2
      };
  }
}
function x(e, t, n, r, i, a) {
  let o = i - n,
    s = a - r,
    c = o * o + s * s,
    l = c === 0 ? 0 : Math.max(0, Math.min(1, ((e - n) * o + (t - r) * s) / c));
  return Math.hypot(e - (n + l * o), t - (r + l * s));
}
function S(count, t, n, r) {
  switch (count.kind) {
    case `rect`:
    case `ellipse`:
    case `mosaic`:
    case `text`:
    case `number`:
      {
        let i = b(count);
        return t >= i.x - r && t <= i.x + i.width + r && n >= i.y - r && n <= i.y + i.height + r;
      }
    case `arrow`:
    case `line`:
      return x(t, n, count.x1, count.y1, count.x2, count.y2) <= Math.max(r, count.size);
    case `pen`:
    case `highlighter`:
      {
        let i = Math.max(r, count.kind === `highlighter` ? count.size * 2 : count.size),
          points = count.points;
        if (points.length === 2) return Math.hypot(t - points[0], n - points[1]) <= i;
        for (let e = 2; e < points.length; e += 2) if (x(t, n, points[e - 2], points[e - 1], points[e], points[e + 1]) <= i) return true;
        return false;
      }
  }
}
function C(e) {
  if (e.kind === `arrow` || e.kind === `line`) return [{
    handle: `start`,
    x: e.x1,
    y: e.y1
  }, {
    handle: `end`,
    x: e.x2,
    y: e.y2
  }];
  if (e.kind === `rect` || e.kind === `ellipse` || e.kind === `mosaic`) {
    let t = _(e);
    return [{
      handle: `nw`,
      x: t.x,
      y: t.y
    }, {
      handle: `ne`,
      x: t.x + t.width,
      y: t.y
    }, {
      handle: `sw`,
      x: t.x,
      y: t.y + t.height
    }, {
      handle: `se`,
      x: t.x + t.width,
      y: t.y + t.height
    }];
  }
  return [];
}
function w(e, t, n, r) {
  if (e.kind === `arrow` || e.kind === `line`) return t === `start` ? {
    ...e,
    x1: n,
    y1: r
  } : {
    ...e,
    x2: n,
    y2: r
  };
  if (e.kind === `rect` || e.kind === `ellipse` || e.kind === `mosaic`) {
    let i = _(e),
      a = i.x,
      o = i.y,
      s = i.x + i.width,
      c = i.y + i.height;
    return (t === `nw` || t === `sw`) && (a = n), (t === `ne` || t === `se`) && (s = n), (t === `nw` || t === `ne`) && (o = r), (t === `sw` || t === `se`) && (c = r), {
      ...e,
      ..._({
        x: a,
        y: o,
        width: s - a,
        height: c - o
      })
    };
  }
  return e;
}
function T(e, t, n) {
  switch (e.kind) {
    case `rect`:
    case `ellipse`:
    case `mosaic`:
    case `text`:
    case `number`:
      return {
        ...e,
        x: e.x + t,
        y: e.y + n
      };
    case `arrow`:
    case `line`:
      return {
        ...e,
        x1: e.x1 + t,
        y1: e.y1 + n,
        x2: e.x2 + t,
        y2: e.y2 + n
      };
    case `pen`:
    case `highlighter`:
      return {
        ...e,
        points: e.points.map((item, r) => item + (r % 2 == 0 ? t : n))
      };
  }
}
function E(e, count) {
  let n = _(count);
  if (e.lineWidth = count.size, e.strokeStyle = count.color, e.lineJoin = `round`, e.beginPath(), count.kind === `ellipse`) e.ellipse(n.x + n.width / 2, n.y + n.height / 2, Math.max(.5, n.width / 2), Math.max(.5, n.height / 2), 0, 0, Math.PI * 2);else {
    let r = Math.min(count.size * 1.2, n.width / 2, n.height / 2);
    e.roundRect(n.x, n.y, n.width, n.height, r);
  }
  e.stroke();
}
function D(e, t) {
  let {
    x1: n,
    y1: r,
    x2: i,
    y2: a,
    size: o,
    color: s
  } = t;
  e.strokeStyle = s, e.fillStyle = s, e.lineCap = `round`, e.lineJoin = `round`, e.lineWidth = o;
  let c = Math.hypot(i - n, a - r);
  if (t.kind === `line` || c < 1) {
    e.beginPath(), e.moveTo(n, r), e.lineTo(i, a), e.stroke();
    return;
  }
  let l = Math.min(c * .6, Math.max(12, o * 4.2)),
    u = l * .78,
    d = Math.atan2(a - r, i - n),
    f = i - Math.cos(d) * l * .82,
    p = a - Math.sin(d) * l * .82;
  e.beginPath(), e.moveTo(n, r), e.lineTo(f, p), e.stroke();
  let m = i - Math.cos(d) * l,
    h = a - Math.sin(d) * l,
    g = -Math.sin(d) * u / 2,
    _ = Math.cos(d) * u / 2;
  e.beginPath(), e.moveTo(i, a), e.lineTo(m + g, h + _), e.quadraticCurveTo(f, p, m - g, h - _), e.closePath(), e.lineWidth = Math.max(1, o * .5), e.stroke(), e.fill();
}
function O(e, count) {
  let points = count.points,
    r = count.kind === `highlighter`;
  if (e.save(), e.strokeStyle = count.color, e.fillStyle = count.color, e.lineCap = `round`, e.lineJoin = `round`, e.lineWidth = r ? count.size * 4 : count.size, r && (e.globalAlpha = .38), e.beginPath(), points.length === 2) {
    e.arc(points[0], points[1], e.lineWidth / 2, 0, Math.PI * 2), e.fill(), e.restore();
    return;
  }
  e.moveTo(points[0], points[1]);
  for (let t = 2; t < points.length - 2; t += 2) {
    let r = (points[t] + points[t + 2]) / 2,
      i = (points[t + 1] + points[t + 3]) / 2;
    e.quadraticCurveTo(points[t], points[t + 1], r, i);
  }
  e.lineTo(points[points.length - 2], points[points.length - 1]), e.stroke(), e.restore();
}
function k(e, count) {
  e.save(), e.font = g(count.size), e.textBaseline = `top`, e.lineJoin = `round`, e.strokeStyle = v(count.color) > .6 ? `rgba(0,0,0,0.55)` : `rgba(255,255,255,0.9)`, e.lineWidth = Math.max(2, count.size * .16), e.fillStyle = count.color;
  let n = count.size * p,
    r = (n - count.size) / 2;
  count.text.split(`
`).forEach((item, a) => {
    let o = count.y + a * n + r;
    e.strokeText(item, count.x, o), e.fillText(item, count.x, o);
  }), e.restore();
}
function A(e, count) {
  let n = count.size;
  e.save(), e.shadowColor = `rgba(0,0,0,0.25)`, e.shadowBlur = n * .4, e.shadowOffsetY = n * .12, e.fillStyle = count.color, e.beginPath(), e.arc(count.x, count.y, n, 0, Math.PI * 2), e.fill(), e.shadowColor = `transparent`, e.lineWidth = Math.max(1.5, n * .14), e.strokeStyle = `rgba(255,255,255,0.95)`, e.stroke(), e.fillStyle = v(count.color) > .7 ? `#111111` : `#ffffff`;
  let r = String(count.value);
  e.font = `700 ${Math.round(n * (r.length > 2 ? .8 : r.length > 1 ? .95 : 1.1))}px ${f}`, e.textAlign = `center`, e.textBaseline = `middle`, e.fillText(r, count.x, count.y + n * .04), e.restore();
}
function j(e, count, n, r, o) {
  let s = _(count),
    c = Math.max(0, Math.floor(s.x)),
    l = Math.max(0, Math.floor(s.y)),
    u = Math.min(r, Math.ceil(s.x + s.width)),
    d = Math.min(o, Math.ceil(s.y + s.height)),
    f = u - c,
    p = d - l;
  if (f < 1 || p < 1) return;
  let m = Math.max(2, count.size),
    h = i(Math.max(1, Math.ceil(f / m)), Math.max(1, Math.ceil(p / m))),
    g = a(h);
  g.imageSmoothingEnabled = true, g.imageSmoothingQuality = `medium`, g.drawImage(n, c, l, f, p, 0, 0, h.width, h.height), e.save(), e.imageSmoothingEnabled = false, e.drawImage(h, 0, 0, h.width, h.height, c, l, h.width * m, h.height * m), e.restore();
}
function M(e, t, n) {
  for (let r of t) r.kind === `mosaic` && r.id !== n.hiddenId && j(e, r, n.source, n.sourceWidth, n.sourceHeight);
  for (let r of t) if (r.id !== n.hiddenId) switch (r.kind) {
    case `rect`:
    case `ellipse`:
      E(e, r);
      break;
    case `arrow`:
    case `line`:
      D(e, r);
      break;
    case `pen`:
    case `highlighter`:
      O(e, r);
      break;
    case `text`:
      k(e, r);
      break;
    case `number`:
      A(e, r);
  }
}
var N = 24,
  P = .4,
  F = 40;
function I(e, t, n) {
  return Math.abs(e[t] - n[0]) + Math.abs(e[t + 1] - n[1]) + Math.abs(e[t + 2] - n[2]) <= N;
}
function L(e, t) {
  let {
    width: n,
    height: r
  } = e;
  if (n < 24 || r < 24) return null;
  let i = a(e, {
      willReadFrequently: true
    }).getImageData(0, 0, n, r).data,
    o = [i[0], i[1], i[2]];
  if (![0, (n - 1) * 4, (r - 1) * n * 4, ((r - 1) * n + n - 1) * 4].every(item => I(i, item, o))) return null;
  let s = Math.max(1, Math.floor(n / 1200)),
    c = Math.max(1, Math.floor(r / 1200)),
    handler = e => {
      let t = e * n * 4;
      for (let e = 0; e < n; e += s) if (!I(i, t + e * 4, o)) return false;
      return true;
    },
    u = e => {
      for (let t = 0; t < r; t += c) if (!I(i, (t * n + e) * 4, o)) return false;
      return true;
    },
    f = Math.floor(r * P),
    p = Math.floor(n * P),
    m = 0;
  for (; m < f && handler(m);) m += 1;
  if (m >= f && handler(Math.floor(r / 2))) return null;
  let h = 0;
  for (; h < f && handler(r - 1 - h);) h += 1;
  let g = 0;
  for (; g < p && u(g);) g += 1;
  let _ = 0;
  for (; _ < p && u(n - 1 - _);) _ += 1;
  if (m + h + g + _ === 0) return null;
  let v = Math.min(m, _, h, g, Math.round(F * t));
  return {
    top: m,
    right: _,
    bottom: h,
    left: g,
    margin: v,
    color: d(i, 0)
  };
}
var R = {
  mac: 30,
  browser: 42
};
function z(text) {
  if (text === `auto`) return null;
  let [t, n] = text.split(`:`).map(Number);
  return t > 0 && n > 0 ? t / n : null;
}
function B(e) {
  let {
      source: t,
      style: n
    } = e,
    r = Math.max(1, e.scale);
  if (!n.enabled) {
    let options = {
      x: 0,
      y: 0,
      width: t.width,
      height: t.height
    };
    return {
      width: t.width,
      height: t.height,
      window: options,
      radius: 0,
      frameHeight: 0,
      image: options,
      origin: {
        x: 0,
        y: 0
      },
      balance: null
    };
  }
  let i = n.balance ? e.balance : null,
    a = i ? t.width - i.left - i.right + i.margin * 2 : t.width,
    o = i ? t.height - i.top - i.bottom + i.margin * 2 : t.height,
    s = n.frame === `none` ? 0 : Math.round((n.frame.startsWith(`mac`) ? R.mac : R.browser) * r),
    c = a,
    l = o + s,
    u = Math.round(n.padding * r),
    d = c + u * 2,
    f = l + u * 2,
    p = z(n.ratio);
  p && (d / f < p ? d = Math.round(f * p) : f = Math.round(d / p)), d = Math.max(1, d), f = Math.max(1, f);
  let m = Math.round((d - c) / 2),
    h = Math.round((f - l) / 2),
    options = {
      x: m,
      y: h + s,
      width: a,
      height: o
    },
    _ = i ? {
      x: options.x + i.margin - i.left,
      y: options.y + i.margin - i.top
    } : {
      x: options.x,
      y: options.y
    },
    v = Math.min(Math.round(n.radius * r), Math.floor(Math.min(c, l) / 2));
  return {
    width: d,
    height: f,
    window: {
      x: m,
      y: h,
      width: c,
      height: l
    },
    radius: v,
    frameHeight: s,
    image: options,
    origin: _,
    balance: i
  };
}
function V() {
  return {
    key: ``,
    canvas: null
  };
}
function H(e, t, n, r) {
  let o = i(Math.max(2, Math.ceil(n / 8)), Math.max(2, Math.ceil(r / 8))),
    s = a(o),
    c = Math.max(o.width / t.width, o.height / t.height) * 1.25,
    l = t.width * c,
    u = t.height * c;
  s.filter = `blur(${Math.max(4, Math.round(Math.max(o.width, o.height) * .05))}px) saturate(1.15)`, s.drawImage(t, (o.width - l) / 2, (o.height - u) / 2, l, u), e.save(), e.imageSmoothingEnabled = true, e.imageSmoothingQuality = `high`, e.drawImage(o, 0, 0, n, r), e.fillStyle = `rgba(255,255,255,0.12)`, e.fillRect(0, 0, n, r), e.restore();
}
var request = null;
function W(fn) {
  if (request?.url === fn) return request;
  let image = new Image(),
    promise = new Promise((e, n) => {
      image.onload = () => e(), image.onerror = () => n(Error(`Background image could not be decoded`));
    });
  return image.src = fn, request = {
    url: fn,
    image: image,
    ready: promise
  }, request;
}
function G(e, t, r, i) {
  let {
      style: a
    } = t,
    o = r.width * i,
    s = r.height * i;
  if (a.backgroundKind === `image`) {
    if (e.fillStyle = a.backgroundColor, e.fillRect(0, 0, o, s), a.backgroundImage) {
      let n = W(a.backgroundImage);
      if (n.image.complete && n.image.naturalWidth) {
        let t = Math.max(o / n.image.naturalWidth, s / n.image.naturalHeight),
          r = n.image.naturalWidth * t,
          i = n.image.naturalHeight * t;
        e.drawImage(n.image, (o - r) / 2, (s - i) / 2, r, i);
      } else n.ready.then(() => t.onBackgroundLoaded?.(), () => {});
    }
  } else if (a.backgroundKind === `solid`) e.fillStyle = a.backgroundColor, e.fillRect(0, 0, o, s);else if (a.backgroundKind === `gradient`) {
    let fallbackValue = beautifierO.find(item => item.id === a.gradientId) ?? beautifierO[0],
      linearGradient = e.createLinearGradient(0, 0, o, s);
    linearGradient.addColorStop(0, fallbackValue.stops[0]), linearGradient.addColorStop(1, fallbackValue.stops[1]), e.fillStyle = linearGradient, e.fillRect(0, 0, o, s);
  } else a.backgroundKind === `blur` && H(e, t.source, o, s);
  let c = a.shadow / 100;
  if (c <= 0) return;
  let l = Math.max(1, t.scale) * i,
    {
      x: u,
      y: d,
      width: f,
      height: p
    } = r.window,
    handler = () => {
      e.beginPath(), e.roundRect(u * i, d * i, f * i, p * i, r.radius * i);
    };
  e.save(), e.fillStyle = `#ffffff`, e.shadowColor = `rgba(0,0,0,${(.12 + .33 * c).toFixed(3)})`, e.shadowBlur = (8 + 52 * c) * l, e.shadowOffsetY = (2 + 22 * c) * l, handler(), e.fill(), e.shadowColor = `rgba(0,0,0,${(.06 + .1 * c).toFixed(3)})`, e.shadowBlur = (2 + 4 * c) * l, e.shadowOffsetY = l, handler(), e.fill(), e.restore();
}
function K(e, t, n, r) {
  if (n.frameHeight <= 0) return;
  let endsWith = t.frame.endsWith(`dark`),
    {
      x: a,
      y: o,
      width: s
    } = n.window,
    frameHeight = n.frameHeight;
  e.fillStyle = endsWith ? `#2c2c2e` : `#f2f2f3`, e.fillRect(a, o, s, frameHeight), e.fillStyle = endsWith ? `rgba(0,0,0,0.5)` : `rgba(0,0,0,0.08)`, e.fillRect(a, o + frameHeight - Math.max(1, Math.round(r)), s, Math.max(1, Math.round(r)));
  let l = 6 * r,
    u = o + frameHeight / 2;
  if ([`#ff5f57`, `#febc2e`, `#28c840`].forEach((item, n) => {
    e.fillStyle = item, e.beginPath(), e.arc(a + 16 * r + l + n * 20 * r, u, l, 0, Math.PI * 2), e.fill();
  }), t.frame.startsWith(`browser`)) {
    let t = a + 92 * r,
      n = a + s - 20 * r,
      o = Math.min(n - t, 560 * r);
    if (o > 40 * r) {
      let a = 24 * r,
        s = t + Math.max(0, (n - t - o) / 2);
      e.fillStyle = endsWith ? `#3a3a3d` : `#ffffff`, e.beginPath(), e.roundRect(s, u - a / 2, o, a, a / 2), e.fill(), e.fillStyle = endsWith ? `rgba(255,255,255,0.18)` : `rgba(0,0,0,0.12)`, e.beginPath(), e.roundRect(s + 14 * r, u - 3 * r, Math.min(180 * r, o * .4), 6 * r, 3 * r), e.fill();
    }
  }
}
function q(e, t, n, r = 1, event) {
  let {
      source: s,
      style: c
    } = t,
    l = Math.round(n.width * r),
    u = Math.round(n.height * r);
  if (e.save(), e.clearRect(0, 0, l, u), c.enabled) {
    let s = c.backgroundKind === `image` && c.backgroundImage ? W(c.backgroundImage) : null,
      serialized = JSON.stringify([c.backgroundKind, c.backgroundColor, c.backgroundImage, !!s?.image.naturalWidth, c.gradientId, c.shadow, c.radius, n.window, n.width, n.height, l, u, t.scale]);
    if (event) {
      if (event.key !== serialized || !event.canvas) {
        let e = event.canvas && event.canvas.width === l && event.canvas.height === u ? event.canvas : i(l, u),
          s = a(e);
        s.clearRect(0, 0, e.width, e.height), G(s, t, n, r), event.canvas = e, event.key = serialized;
      }
      e.drawImage(event.canvas, 0, 0);
    } else G(e, t, n, r);
  }
  e.scale(r, r), e.imageSmoothingEnabled = true, e.imageSmoothingQuality = `high`;
  let d = Math.max(1, t.scale);
  e.save(), e.beginPath(), e.roundRect(n.window.x, n.window.y, n.window.width, n.window.height, n.radius), e.clip(), K(e, c, n, d);
  let {
    image: f,
    balance: p
  } = n;
  if (p) {
    e.fillStyle = p.color, e.fillRect(f.x, f.y, f.width, f.height);
    let t = s.width - p.left - p.right,
      n = s.height - p.top - p.bottom;
    e.drawImage(s, p.left, p.top, t, n, f.x + p.margin, f.y + p.margin, t, n);
  } else e.drawImage(s, f.x, f.y);
  e.beginPath(), e.rect(f.x, f.y, f.width, f.height), e.clip(), e.translate(n.origin.x, n.origin.y), M(e, t.annotations, {
    source: s,
    sourceWidth: s.width,
    sourceHeight: s.height,
    hiddenId: t.hiddenAnnotationId
  }), e.restore(), e.restore();
}
async function J(el) {
  el.style.enabled && el.style.backgroundKind === `image` && el.style.backgroundImage && (await W(el.style.backgroundImage).ready);
  let n = B(el),
    r = Math.min(1, beautifierL / Math.max(n.width, n.height)),
    o = i(Math.round(n.width * r), Math.round(n.height * r));
  q(a(o), el, n, r);
  let s = await c(o),
    l = {
      width: o.width,
      height: o.height
    };
  return o.width = 1, o.height = 1, {
    png: s,
    ...l
  };
}
export { s as _, L as a, C as c, w as d, o as f, d as g, l as h, q as i, S as l, i as m, V as n, f as o, a as p, J as r, b as s, B as t, T as u, u as v, r as y };