import { r as e } from "../ui/icons/lucide-icons.js";
var t = e(`copy`, [[`rect`, {
    width: `14`,
    height: `14`,
    x: `8`,
    y: `8`,
    rx: `2`,
    ry: `2`,
    key: `17jyea`
  }], [`path`, {
    d: `M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2`,
    key: `zix9uf`
  }]]),
  n = e(`download`, [[`path`, {
    d: `M12 15V3`,
    key: `m9g1x1`
  }], [`path`, {
    d: `M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4`,
    key: `ih7n3h`
  }], [`path`, {
    d: `m7 10 5 5 5-5`,
    key: `brsn70`
  }]]),
  r = e(`loader-circle`, [[`path`, {
    d: `M21 12a9 9 0 1 1-6.219-8.56`,
    key: `13zald`
  }]]),
  i = e(`sparkles`, [[`path`, {
    d: `M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z`,
    key: `1s2grr`
  }], [`path`, {
    d: `M20 2v4`,
    key: `1rf3ol`
  }], [`path`, {
    d: `M22 4h-4`,
    key: `gwowj6`
  }], [`circle`, {
    cx: `4`,
    cy: `20`,
    r: `2`,
    key: `6kqj1y`
  }]]),
  a = [0, 20, 50, 100, 200],
  o = 41943040,
  s = 12e3,
  c = [`ctrl`, `alt`, `shift`, `command`, `super`],
  l = new Set([`A`, `C`, `F`, `L`, `N`, `P`, `Q`, `R`, `S`, `T`, `V`, `W`, `X`, `Z`]);
function u(text) {
  let t = text.split(`+`).map(item => item.trim()).filter(Boolean),
    n = t.pop()?.toUpperCase();
  if (!n) return null;
  let r = /^[A-Z]$/.test(n),
    i = /^[0-9]$/.test(n),
    a = /^F([1-9]|1[0-2])$/.test(n);
  if (!r && !i && !a) return null;
  let o = t.map(item => item.toLowerCase());
  if (o.length > 3 || new Set(o).size !== o.length || o.some(item => !c.includes(item)) || o.includes(`command`) && o.includes(`super`)) return null;
  let s = o.some(item => item !== `shift`);
  if ((r || i) && !s) return null;
  let u = o.length === 1 && (o[0] === `ctrl` || o[0] === `command`);
  return u && r && l.has(n) || u && i || o.length === 1 && o[0] === `alt` && (n === `F` || n === `F4`) ? null : [o.includes(`ctrl`) && `Ctrl`, o.includes(`alt`) && `Alt`, o.includes(`shift`) && `Shift`, o.includes(`command`) && `Command`, o.includes(`super`) && `Super`, n].filter(Boolean).join(`+`);
}
var d = [`blur`, `solid`, `gradient`, `transparent`, `image`],
  f = [`none`, `mac-light`, `mac-dark`, `browser-light`, `browser-dark`],
  p = [`auto`, `1:1`, `4:3`, `3:4`, `16:9`, `9:16`],
  m = [`#ffffff`, `#f4f4f5`, `#e4e4e7`, `#a1a1aa`, `#27272a`, `#09090b`, `#ecfdf5`, `#10b981`],
  h = [{
    id: `mist`,
    stops: [`#fafaf9`, `#e7e5e4`]
  }, {
    id: `mint`,
    stops: [`#ecfdf5`, `#bbf7d0`]
  }, {
    id: `sky`,
    stops: [`#f0f9ff`, `#c7d2fe`]
  }, {
    id: `dawn`,
    stops: [`#fdf2f8`, `#ddd6fe`]
  }, {
    id: `sand`,
    stops: [`#fffbeb`, `#fed7aa`]
  }, {
    id: `dusk`,
    stops: [`#3f3f46`, `#09090b`]
  }, {
    id: `forest`,
    stops: [`#065f46`, `#022c22`]
  }],
  g = {
    min: 0,
    max: 160
  },
  _ = {
    min: 0,
    max: 32
  },
  v = {
    min: 0,
    max: 100
  },
  y = {
    enabled: true,
    backgroundKind: `blur`,
    backgroundColor: `#f4f4f5`,
    backgroundImage: ``,
    backgroundImageSource: ``,
    gradientId: `mint`,
    padding: 56,
    radius: 12,
    shadow: 45,
    frame: `none`,
    ratio: `auto`,
    balance: true
  },
  b = [{
    id: `Soft`,
    style: {
      ...y
    }
  }, {
    id: `Clean`,
    style: {
      ...y,
      backgroundKind: `solid`,
      backgroundColor: `#f4f4f5`,
      padding: 48,
      radius: 10,
      shadow: 30
    }
  }, {
    id: `Window`,
    style: {
      ...y,
      backgroundKind: `solid`,
      backgroundColor: `#e4e4e7`,
      padding: 64,
      radius: 10,
      shadow: 55,
      frame: `mac-light`
    }
  }, {
    id: `Dark`,
    style: {
      ...y,
      backgroundKind: `solid`,
      backgroundColor: `#27272a`,
      padding: 56,
      radius: 12,
      shadow: 70
    }
  }, {
    id: `Brand`,
    style: {
      ...y,
      backgroundKind: `gradient`,
      gradientId: `mint`,
      padding: 56,
      radius: 12,
      shadow: 40
    }
  }, {
    id: `Plain`,
    style: {
      ...y,
      backgroundKind: `transparent`,
      padding: 32,
      radius: 10,
      shadow: 40
    }
  }];
function x(text, t) {
  if (typeof text != `string`) return t;
  let n = text.trim().toLowerCase();
  return /^#[0-9a-f]{6}$/.test(n) ? n : /^#[0-9a-f]{3}$/.test(n) ? `#${n.slice(1).split(``).map(item => item + item).join(``)}` : t;
}
export { r as _, f as a, o as c, _ as d, v as f, i as g, u as h, b as i, s as l, x as m, p as n, h as o, m as p, d as r, a as s, y as t, g as u, n as v, t as y };