<template>
<div :class="`fixed inset-0 overflow-hidden select-none`" :style="u({cursor:Ye.value})" @pointermove="Qe" @pointerdown="$e" @pointerup="et" @pointerenter="t_0=>overlay.focus()" @dblclick="tt" @contextmenu="nt"><canvas ref="T" :class="`pointer-events-none absolute inset-0 h-full w-full`"></canvas><canvas ref="Fe" :class="`pointer-events-none absolute inset-0 h-full w-full`"></canvas><div :class="`pointer-events-none absolute rounded-md bg-black/75 px-2 py-0.5 text-[11px] font-medium tabular-nums text-white`" :style="u(Ve.value)">{{ Be.value }}</div><div>{{ _(`OverlayHint`) }}</div><div>{{ F.value }}</div></div>
</template>

<script setup>
import { unref as e, createTextVNode as n, createElementBlock as r, watch as i, createBlock as o, Fragment as ee, openBlock as c, defineComponent as te, onMounted as ne, toDisplayString as d, onBeforeMount as ie, computed as f, createCommentVNode as p, createElementVNode as m } from 'vue';
import { E as h, w as ae } from '../vendor/i18n/en-US-player.js';
import { n as oe, t as se } from '../vendor/ui/icons/lucide-icons.js';
import { _ as ce, g as le, v as ue, y as de } from '../vendor/chunks/screenshot-beautifier.js';
import { a as fe, f as pe, g as me, h as he, p as g, r as ge, v as _e, y as ve } from '../vendor/chunks/compose.js';
import { a as _, i as ye, n as be, r as xe } from '../vendor/chunks/screenshotTool.js';

var Se = {
  key: 1,
  class: `pointer-events-none absolute left-1/2 top-5 -translate-x-1/2 rounded-full bg-black/75 px-3.5 py-1.5 text-xs text-white shadow-lg`
};
var Ce = {
  class: `flex flex-col gap-0.5 px-2 py-1.5 tabular-nums`
};
var we = {
  class: `flex items-center gap-1.5`
};
var Te = {
  class: `text-white/60`
};
var Ee = {
  key: 2,
  class: `pointer-events-none absolute left-1/2 top-5 -translate-x-1/2 rounded-full bg-black/80 px-3.5 py-1.5 text-xs text-white shadow-lg`
};
var De = [`title`, `disabled`];
var Oe = [`title`, `disabled`];
var ke = [`title`, `disabled`];
var Ae = [`title`, `disabled`];
var je = [`title`, `disabled`];
var Me = [`title`, `disabled`];
var v = 4;
var Ne = 4;
var y = 8;
var b = 120;
var Pe = 8;
var x = 40;
var S = 8;
let overlay = window.screenshotToolAPI.overlay,
  w = t_0(null),
  T = s_6(null),
  Fe = s_6(null),
  Ie = s_6(null),
  E = s_6(null),
  D = s_6(`idle`),
  O = s_6(null),
  k = s_6(null),
  A = s_6(null),
  j = s_6({
    width: window.innerWidth,
    height: window.innerHeight
  }),
  M = s_6(320),
  N = s_6(false),
  P = s_6(false),
  F = s_6(``),
  data = null,
  L = null,
  R = false,
  payload = null,
  B = null,
  V = 0,
  H = null,
  emptyItems = [],
  U = f(() => w.value ? w.value.width / j.value.width : 1),
  W = f(() => w.value ? w.value.height / j.value.height : 1),
  G = f(() => O.value ?? (D.value === `idle` ? k.value : null)),
  Re = f(() => D.value === `selected` && O.value !== null),
  ze = f(() => !!(w.value && A.value && [`idle`, `pending`, `drawing`, `resizing`].includes(D.value))),
  Be = f(() => {
    let value = G.value;
    return value ? `${Math.round(value.width * U.value)} × ${Math.round(value.height * W.value)}` : ``;
  }),
  Ve = f(() => {
    let value = G.value;
    if (!value) return {};
    let text = value.y >= 28 ? value.y - 26 : value.y + 6;
    return {
      left: `${Math.max(4, value.x)}px`,
      top: `${text}px`
    };
  }),
  He = f(() => {
    let value = O.value;
    if (!value) return {};
    let {
        width: t_0,
        height: result
      } = j.value,
      r_1_3 = value.y + value.height + S;
    return r_1_3 + x > result - 4 && (r_1_3 = value.y - x - S), r_1_3 < 4 && (r_1_3 = Math.max(4, value.y + value.height - x - S)), {
      left: `${Math.min(Math.max(4, value.x + value.width - M.value), t_0 - M.value - 4)}px`,
      top: `${r_1_3}px`
    };
  }),
  Ue = f(() => {
    let value = A.value;
    if (!value) return {};
    let {
        width: t_0,
        height: n_2
      } = j.value,
      r_1_3 = value.x + 20,
      i_4 = value.y + 20;
    return r_1_3 + b > t_0 - 4 && (r_1_3 = value.x - 20 - b), i_4 + 172 > n_2 - 4 && (i_4 = value.y - 20 - 172), {
      left: `${Math.max(4, r_1_3)}px`,
      top: `${Math.max(4, i_4)}px`
    };
  }),
  K = f(() => {
    let value = A.value;
    if (!value || !w.value) return {
      coords: ``,
      color: ``
    };
    let t_0 = Math.min(w.value.width - 1, Math.max(0, Math.floor(value.x * U.value))),
      n_2 = Math.min(w.value.height - 1, Math.max(0, Math.floor(value.y * W.value)));
    return {
      coords: `${t_0}, ${n_2}`,
      color: data ? me(data, (n_2 * w.value.width + t_0) * 4) : ``
    };
  }),
  We = f(() => w.value?.afterCapture === `copy` ? _(`OverlayBeautifyCopy`) : _(`OverlayBeautify`)),
  Ge = xe ? `⌘` : `Ctrl+`;
let value = G.value;
let text = value.y >= 28 ? value.y - 26 : value.y + 6;
let {
    width: t_0,
    height: result
  } = j.value,
  r_1 = value.y + value.height + S;
let Ye = f(() => {
  if (N.value) return `progress`;
  if (D.value === `moving`) return `move`;
  if (D.value !== `selected` || !A.value) return `crosshair`;
  let e_7 = Je(A.value);
  return e_7 === `n` || e_7 === `s` ? `ns-resize` : e_7 === `e` || e_7 === `w` ? `ew-resize` : e_7 === `nw` || e_7 === `se` ? `nwse-resize` : e_7 === `ne` || e_7 === `sw` ? `nesw-resize` : O.value && q(O.value, A.value) ? `move` : `crosshair`;
});
function Qe(e_7) {
  if (!w.value || N.value) return;
  let t_0 = Q(e_7);
  switch (A.value = t_0, D.value) {
    case `idle`:
      k.value = J(t_0);
      break;
    case `pending`:
      L && Math.hypot(t_0.x - L.x, t_0.y - L.y) > Ne && (D.value = `drawing`, X(qe(L, t_0)));
      break;
    case `drawing`:
      L && (O.value = qe(L, t_0));
      break;
    case `moving`:
      if (L && payload) {
        let {
            width: e_7,
            height: n_2
          } = j.value,
          r_1_3 = Math.min(Math.max(0, payload.x + t_0.x - L.x), e_7 - payload.width),
          i_4 = Math.min(Math.max(0, payload.y + t_0.y - L.y), n_2 - payload.height);
        O.value = {
          ...payload,
          x: r_1_3,
          y: i_4
        };
      }
      break;
    case `resizing`:
      if (payload && B) {
        let e_7 = payload.x,
          n_2 = payload.y,
          r_1_3 = payload.x + payload.width,
          i_4 = payload.y + payload.height;
        B.includes(`w`) && (e_7 = t_0.x), B.includes(`e`) && (r_1_3 = t_0.x), B.includes(`n`) && (n_2 = t_0.y), B.includes(`s`) && (i_4 = t_0.y), O.value = qe({
          x: e_7,
          y: n_2
        }, {
          x: r_1_3,
          y: i_4
        });
      }
  }
  Y();
}
function $e(event) {
  if (!w.value || N.value || event.button !== 0) return;
  P.value = true;
  let t_0 = Q(event);
  if (A.value = t_0, event.currentTarget.setPointerCapture(event.pointerId), D.value === `selected` && O.value) {
    let e_7 = Je(t_0);
    if (e_7) {
      D.value = `resizing`, B = e_7, payload = {
        ...O.value
      };
      return;
    }
    if (q(O.value, t_0)) {
      D.value = `moving`, L = t_0, payload = {
        ...O.value
      };
      return;
    }
    R = true;
  } else R = false;
  D.value = `pending`, L = t_0, Y();
}
function et(event) {
  if (!w.value || event.button !== 0) return;
  let t_0 = Q(event);
  switch (D.value) {
    case `pending`:
      R && O.value || X(J(t_0)), D.value = `selected`;
      break;
    case `drawing`:
      !O.value || O.value.width < v || O.value.height < v ? Z() : D.value = `selected`;
      break;
    case `moving`:
    case `resizing`:
      O.value && (O.value.width < v || O.value.height < v) && payload && (O.value = payload), D.value = `selected`;
  }
  L = null, payload = null, B = null, R = false, Y();
}
function tt(e_7) {
  D.value === `selected` && O.value && q(O.value, Q(e_7)) && $(`beautify`);
}
function nt(event) {
  event.preventDefault(), !N.value && (O.value ? Z() : overlay.cancel());
}
function qe(e_7, t_0) {
  return Ke({
    x: Math.min(e_7.x, t_0.x),
    y: Math.min(e_7.y, t_0.y),
    width: Math.abs(e_7.x - t_0.x),
    height: Math.abs(e_7.y - t_0.y)
  });
}
function q(e_7, t_0) {
  return t_0.x >= e_7.x && t_0.x <= e_7.x + e_7.width && t_0.y >= e_7.y && t_0.y <= e_7.y + e_7.height;
}
function J(e_7) {
  let t_0 = (w.value?.windows ?? []).find(item => q(item, e_7));
  return t_0 ? Ke(t_0) : {
    x: 0,
    y: 0,
    width: j.value.width,
    height: j.value.height
  };
}
function Je(e_7) {
  let value = O.value;
  if (!value) return null;
  let n_2 = Math.abs(e_7.x - value.x) <= y,
    r_1_3 = Math.abs(e_7.x - (value.x + value.width)) <= y,
    i_4 = Math.abs(e_7.y - value.y) <= y,
    a_5 = Math.abs(e_7.y - (value.y + value.height)) <= y,
    response = e_7.x >= value.x - y && e_7.x <= value.x + value.width + y,
    s_6 = e_7.y >= value.y - y && e_7.y <= value.y + value.height + y;
  return i_4 && n_2 ? `nw` : i_4 && r_1_3 ? `ne` : a_5 && n_2 ? `sw` : a_5 && r_1_3 ? `se` : i_4 && response ? `n` : a_5 && response ? `s` : n_2 && s_6 ? `w` : r_1_3 && s_6 ? `e` : null;
}
let n_2 = Math.abs(e_7.x - value.x) <= y,
  r_1_3 = Math.abs(e_7.x - (value.x + value.width)) <= y,
  i_4 = Math.abs(e_7.y - value.y) <= y,
  a_5 = Math.abs(e_7.y - (value.y + value.height)) <= y,
  response = e_7.x >= value.x - y && e_7.x <= value.x + value.width + y,
  s_6 = e_7.y >= value.y - y && e_7.y <= value.y + value.height + y;
function Y() {
  V ||= requestAnimationFrame(() => {
    V = 0, Xe(), Ze();
  });
}
function X(e_7) {
  let t_0 = O.value !== null;
  O.value = e_7, t_0 !== (e_7 !== null) && overlay.selection(e_7 !== null);
}
function Z() {
  X(null), D.value = `idle`, A.value && (k.value = J(A.value)), Y();
}
function Q(event) {
  return {
    x: event.clientX,
    y: event.clientY
  };
}
async function $(e_7) {
  let value = w.value,
    n_2 = O.value,
    r_1 = T.value;
  if (value && n_2 && r_1 && !N.value) {
    N.value = true;
    try {
      let i_4 = st(n_2),
        png;
      if (e_7 === `beautify` && value.afterCapture === `copy`) {
        let e_7 = he(r_1, i_4.x, i_4.y, i_4.width, i_4.height);
        try {
          let n_2 = value.style.enabled && value.style.balance ? fe(e_7, value.scale) : null;
          png = (await ge({
            source: e_7,
            scale: value.scale,
            style: value.style,
            annotations: [],
            balance: n_2
          })).png;
        } finally {
          _e(e_7);
        }
      }
      let o = await overlay.finish({
        sessionId: value.sessionId,
        action: e_7,
        rect: i_4,
        rendered: png
      });
      o.ok || console.warn(`[截图美化] 完成截图失败:`, o.error.message);
    } catch (e_7) {
      console.warn(`[截图美化] 完成截图失败:`, e_7);
    } finally {
      N.value = false;
    }
  }
}
function Ke(e_7) {
  let {
      width: t_0,
      height: n_2
    } = j.value,
    r_1 = Math.max(0, Math.min(e_7.x, t_0)),
    i_4 = Math.max(0, Math.min(e_7.y, n_2));
  return {
    x: r_1,
    y: i_4,
    width: Math.max(0, Math.min(e_7.width, t_0 - r_1)),
    height: Math.max(0, Math.min(e_7.height, n_2 - i_4))
  };
}
let e_7 = Je(A.value);
function Xe() {
  let value = Fe.value;
  if (!value) return;
  let t_0 = window.devicePixelRatio || 1,
    {
      width: n_2,
      height: r_1
    } = j.value;
  (value.width !== Math.round(n_2 * t_0) || value.height !== Math.round(r_1 * t_0)) && (value.width = Math.round(n_2 * t_0), value.height = Math.round(r_1 * t_0));
  let i_4 = g(value);
  if (i_4.setTransform(t_0, 0, 0, t_0, 0, 0), i_4.clearRect(0, 0, n_2, r_1), !w.value) return;
  let a_5 = G.value;
  if (i_4.fillStyle = `rgba(0,0,0,0.42)`, i_4.beginPath(), i_4.rect(0, 0, n_2, r_1), a_5 && a_5.width > 0 && a_5.height > 0 && i_4.rect(a_5.x, a_5.y, a_5.width, a_5.height), i_4.fill(`evenodd`), !(!a_5 || a_5.width <= 0 || a_5.height <= 0) && (i_4.strokeStyle = `#10b981`, i_4.lineWidth = O.value ? 1.5 : 2, i_4.strokeRect(a_5.x + .5, a_5.y + .5, Math.max(0, a_5.width - 1), Math.max(0, a_5.height - 1)), D.value === `selected` || D.value === `moving` || D.value === `resizing`)) {
    let e_7 = [[a_5.x, a_5.y], [a_5.x + a_5.width / 2, a_5.y], [a_5.x + a_5.width, a_5.y], [a_5.x, a_5.y + a_5.height / 2], [a_5.x + a_5.width, a_5.y + a_5.height / 2], [a_5.x, a_5.y + a_5.height], [a_5.x + a_5.width / 2, a_5.y + a_5.height], [a_5.x + a_5.width, a_5.y + a_5.height]];
    for (let [t_0, n_2] of e_7) i_4.fillStyle = `#ffffff`, i_4.strokeStyle = `#10b981`, i_4.lineWidth = 1.5, i_4.beginPath(), i_4.arc(t_0, n_2, 4, 0, Math.PI * 2), i_4.fill(), i_4.stroke();
  }
}
function Ze() {
  let value = Ie.value,
    t_0 = T.value,
    n_2 = A.value;
  if (!value || !t_0 || !n_2 || !ze.value) return;
  let r_1 = window.devicePixelRatio || 1,
    i_4 = Math.round(b * r_1);
  value.width !== i_4 && (value.width = i_4, value.height = i_4);
  let a_5 = g(value);
  a_5.imageSmoothingEnabled = false, a_5.fillStyle = `#000`, a_5.fillRect(0, 0, i_4, i_4);
  let o = b / Pe * U.value,
    s_6 = n_2.x * U.value,
    ee = n_2.y * W.value;
  a_5.drawImage(t_0, s_6 - o / 2, ee - o / 2, o, o, 0, 0, i_4, i_4), a_5.strokeStyle = `rgba(16,185,129,0.9)`, a_5.lineWidth = Math.max(1, r_1), a_5.beginPath(), a_5.moveTo(i_4 / 2, 0), a_5.lineTo(i_4 / 2, i_4), a_5.moveTo(0, i_4 / 2), a_5.lineTo(i_4, i_4 / 2), a_5.stroke();
}
function st(e_7) {
  let value = w.value,
    n_2 = Math.max(0, Math.min(value.width - 1, Math.round(e_7.x * U.value))),
    r_1 = Math.max(0, Math.min(value.height - 1, Math.round(e_7.y * W.value)));
  return {
    x: n_2,
    y: r_1,
    width: Math.max(1, Math.min(value.width - n_2, Math.round(e_7.width * U.value))),
    height: Math.max(1, Math.min(value.height - r_1, Math.round(e_7.height * W.value)))
  };
}
</script>
