import { H as e } from "./vue-i18n.runtime.js";
var handler = e => {
    for (let t in e) if (t.startsWith(`aria-`) || t === `role` || t === `title`) return true;
    return false;
  },
  n = e => e === ``,
  r = (...e) => e.filter((text, item, items) => !!text && text.trim() !== `` && items.indexOf(text) === item).join(` `).trim(),
  i = e => e.replace(/([a-z0-9])([A-Z])/g, `$1-$2`).toLowerCase(),
  a = e => e.replace(/^([A-Z])|[\s-_]+(\w)/g, (e, text, n) => n ? n.toUpperCase() : text.toLowerCase()),
  o = e => {
    let t = a(e);
    return t.charAt(0).toUpperCase() + t.slice(1);
  },
  options = {
    xmlns: `http://www.w3.org/2000/svg`,
    width: 24,
    height: 24,
    viewBox: `0 0 24 24`,
    fill: `none`,
    stroke: `currentColor`,
    "stroke-width": 2,
    "stroke-linecap": `round`,
    "stroke-linejoin": `round`
  },
  c = ({
    name: a,
    iconNode: c,
    absoluteStrokeWidth: l,
    "absolute-stroke-width": u,
    strokeWidth: d,
    "stroke-width": f,
    size: p = options.width,
    color: m = options.stroke,
    ...h
  }, {
    slots: g
  }) => e(`svg`, {
    ...options,
    ...h,
    width: p,
    height: p,
    stroke: m,
    "stroke-width": n(l) || n(u) || l === true || u === true ? Number(d || f || options[`stroke-width`]) * 24 / Number(p) : d || f || options[`stroke-width`],
    class: r(`lucide`, h.class, ...(a ? [`lucide-${i(o(a))}-icon`, `lucide-${i(a)}`] : [`lucide-icon`])),
    ...(!g.default && !handler(h) && {
      "aria-hidden": `true`
    })
  }, [...c.map(item => e(...item)), ...(g.default ? [g.default()] : [])]),
  l = (t, n) => (r, {
    slots: i,
    attrs: a
  }) => e(c, {
    ...a,
    ...r,
    iconNode: n,
    name: t
  }, i),
  u = l(`pin`, [[`path`, {
    d: `M12 17v5`,
    key: `bb1du9`
  }], [`path`, {
    d: `M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z`,
    key: `1nkz8b`
  }]]),
  d = l(`x`, [[`path`, {
    d: `M18 6 6 18`,
    key: `1bl5f8`
  }], [`path`, {
    d: `m6 6 12 12`,
    key: `d8bk6v`
  }]]);
export { u as n, l as r, d as t };