<template>
<component :is="Q" />
</template>

<script setup>
import { unref as x, renderSlot as S, createBlock as O, openBlock as A } from 'vue';
// [符号说明] r=useConfigProviderContext
import { B as e, C as t, I as r, N as i, Q as a, T as o, V as s, at as l, dt as u, ut as _ } from '../vendor/ui/Switch.js';

function U(event, el) {
  let n = _(false, 300);
  u(() => {
    n.value = false;
  });
  let r = k(null),
    i = g();
  function a() {
    r.value = null, n.value = false;
  }
  function o(e, t) {
    if (!t) return;
    let currentTarget = e.currentTarget,
      a = {
        x: e.clientX,
        y: e.clientY
      },
      o = G(a, W(a, currentTarget.getBoundingClientRect()), 1),
      s = K(t.getBoundingClientRect()),
      c = J([...o, ...s]);
    r.value = c, n.value = true;
  }
  return w(n => {
    if (event.value && el.value) {
      let handler = e => o(e, el.value),
        i = t => o(t, event.value);
      event.value.addEventListener(`pointerleave`, handler), el.value.addEventListener(`pointerleave`, i), n(() => {
        event.value?.removeEventListener(`pointerleave`, handler), el.value?.removeEventListener(`pointerleave`, i);
      });
    }
  }), w(n => {
    if (r.value) {
      let o = n => {
        if (!r.value || !(n.target instanceof Element)) return;
        let target = n.target,
          s = {
            x: n.clientX,
            y: n.clientY
          },
          c = event.value?.contains(target) || el.value?.contains(target),
          l = !q(s, r.value),
          u = !!target.closest(`[data-grace-area-trigger]`);
        c ? a() : (l || u) && (a(), i.trigger());
      };
      event.value?.ownerDocument.addEventListener(`pointermove`, o), n(() => event.value?.ownerDocument.removeEventListener(`pointermove`, o));
    }
  }), {
    isPointerInTransit: n,
    onPointerExit: i.on
  };
}
function W(e, t) {
  let n = Math.abs(t.top - e.y),
    r = Math.abs(t.bottom - e.y),
    i = Math.abs(t.right - e.x),
    a = Math.abs(t.left - e.x);
  switch (Math.min(n, r, i, a)) {
    case a:
      return `left`;
    case i:
      return `right`;
    case n:
      return `top`;
    case r:
      return `bottom`;
    default:
      throw Error(`unreachable`);
  }
}
function G(e, t, n = 5) {
  let emptyItems = [];
  switch (t) {
    case `top`:
      emptyItems.push({
        x: e.x - n,
        y: e.y + n
      }, {
        x: e.x + n,
        y: e.y + n
      });
      break;
    case `bottom`:
      emptyItems.push({
        x: e.x - n,
        y: e.y - n
      }, {
        x: e.x + n,
        y: e.y - n
      });
      break;
    case `left`:
      emptyItems.push({
        x: e.x + n,
        y: e.y - n
      }, {
        x: e.x + n,
        y: e.y + n
      });
      break;
    case `right`:
      emptyItems.push({
        x: e.x - n,
        y: e.y - n
      }, {
        x: e.x - n,
        y: e.y + n
      });
  }
  return emptyItems;
}
function K(e) {
  let {
    top: t,
    right: n,
    bottom: r,
    left: i
  } = e;
  return [{
    x: i,
    y: t
  }, {
    x: n,
    y: t
  }, {
    x: n,
    y: r
  }, {
    x: i,
    y: r
  }];
}
function q(e, t) {
  let {
      x: n,
      y: r
    } = e,
    i = false;
  for (let e = 0, a = t.length - 1; e < t.length; a = e++) {
    let o = t[e].x,
      s = t[e].y,
      c = t[a].x,
      l = t[a].y;
    s > r != l > r && n < (c - o) * (r - s) / (l - s) + o && (i = !i);
  }
  return i;
}
function J(e) {
  let t = e.slice();
  return t.sort((left, right) => left.x < right.x ? -1 : left.x > right.x ? 1 : left.y < right.y ? -1 : +(left.y > right.y)), oe(t);
}
function oe(e) {
  if (e.length <= 1) return e.slice();
  let t = [];
  for (let n = 0; n < e.length; n++) {
    let r = e[n];
    for (; t.length >= 2;) {
      let e = t.at(-1),
        n = t[t.length - 2];
      if ((e.x - n.x) * (r.y - n.y) >= (e.y - n.y) * (r.x - n.x)) t.pop();else break;
    }
    t.push(r);
  }
  t.pop();
  let n = [];
  for (let t = e.length - 1; t >= 0; t--) {
    let r = e[t];
    for (; n.length >= 2;) {
      let e = n.at(-1),
        t = n[n.length - 2];
      if ((e.x - t.x) * (r.y - t.y) >= (e.y - t.y) * (r.x - t.x)) n.pop();else break;
    }
    n.push(r);
  }
  return n.pop(), t.length === 1 && n.length === 1 && t[0].x === n[0].x && t[0].y === n[0].y ? t : t.concat(n);
}
</script>
