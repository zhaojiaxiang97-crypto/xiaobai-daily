<template>
<component :is="o" as-child="" :trapped="p" @mountautofocus="ie" @unmountautofocus="props=>a(`closeAutoFocus`,props)" />
</template>

<script setup>
import { unref as T, renderSlot as E, watch as k, createBlock as j, openBlock as P, defineComponent as F, onUnmounted as re, onBeforeMount as B, computed as V } from 'vue';
import { B as e, N as a, O as o, S as l, V as u, W as d, at as p, b as m, j as h, k as g, lt as _, v as y, vt as b, w as ee } from '../vendor/ui/Switch.js';
import { T as U } from '../vendor/i18n/en-US-player.js';
import { a as ie, i as W, n as ae, o as oe, t as G } from '../vendor/ui/PopperContent.js';
import { r as K, t as q } from '../vendor/ui/Collection.js';
import { t as se } from '../vendor/ui/RovingFocusGroup.js';

const props = defineProps({
  loop: {
    type: Boolean,
    required: false
  },
  disableOutsidePointerEvents: {
    type: Boolean,
    required: false
  },
  disableOutsideScroll: {
    type: Boolean,
    required: false
  },
  trapFocus: {
    type: Boolean,
    required: false
  },
  memoDependencies: {
    type: Array,
    required: false
  },
  side: {
    type: null,
    required: false
  },
  sideOffset: {
    type: Number,
    required: false
  },
  sideFlip: {
    type: Boolean,
    required: false
  },
  align: {
    type: null,
    required: false
  },
  alignOffset: {
    type: Number,
    required: false
  },
  alignFlip: {
    type: Boolean,
    required: false
  },
  avoidCollisions: {
    type: Boolean,
    required: false
  },
  collisionBoundary: {
    type: null,
    required: false
  },
  collisionPadding: {
    type: [Number, Object],
    required: false
  },
  arrowPadding: {
    type: Number,
    required: false
  },
  hideShiftedArrow: {
    type: Boolean,
    required: false
  },
  sticky: {
    type: String,
    required: false
  },
  hideWhenDetached: {
    type: Boolean,
    required: false
  },
  positionStrategy: {
    type: String,
    required: false
  },
  updatePositionStrategy: {
    type: String,
    required: false
  },
  disableUpdateOnLayoutShift: {
    type: Boolean,
    required: false
  },
  prioritizePosition: {
    type: Boolean,
    required: false
  },
  reference: {
    type: null,
    required: false
  },
  asChild: {
    type: Boolean,
    required: false
  },
  as: {
    type: null,
    required: false
  }
});
var ce = [`INPUT`, `TEXTAREA`];
function J(event, t, n, r = {}) {
  if (!t || r.enableIgnoredElement && ce.includes(t.nodeName)) return null;
  let {
      arrowKeyOptions: i = `both`,
      attributeName: a = `[data-reka-collection-item]`,
      itemsArray: el = [],
      loop: items = true,
      dir: c = `ltr`,
      preventScroll: l = true,
      focus: u = false
    } = r,
    [d, f, p, m, h, g] = [event.key === `ArrowRight`, event.key === `ArrowLeft`, event.key === `ArrowUp`, event.key === `ArrowDown`, event.key === `Home`, event.key === `End`],
    _ = p || m,
    v = d || f;
  if (!h && !g && (!_ && !v || i === `vertical` && v || i === `horizontal` && _)) return null;
  let y = n ? Array.from(n.querySelectorAll(a)) : el;
  if (!y.length) return null;
  l && event.preventDefault();
  let b = null;
  return v || _ ? b = Y(y, t, {
    goForward: _ ? m : c === `ltr` ? d : f,
    loop: items
  }) : h ? b = y.at(0) || null : g && (b = y.at(-1) || null), u && b?.focus(), b;
}
function Y(e, t, n, r = e.includes(t) ? e.length : e.length + 1) {
  if (--r === 0) return null;
  let i = e.indexOf(t),
    resolvedValue;
  if (resolvedValue = i === -1 ? n.goForward ? 0 : e.length - 1 : n.goForward ? i + 1 : i - 1, !n.loop && (resolvedValue < 0 || resolvedValue >= e.length)) return null;
  let o = e[(resolvedValue + e.length) % e.length];
  return o ? o.hasAttribute(`disabled`) && o.getAttribute(`disabled`) !== `false` ? Y(e, o, n, r) : o : null;
}
</script>
