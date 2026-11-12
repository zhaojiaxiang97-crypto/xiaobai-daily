<template>
<component :is="p" as-child="" :disable-outside-pointer-events="false" @escapekeydown="props=>i(`escapeKeyDown`,props)" @pointerdownoutside="props=>{o.disableClosingTrigger.value&&o.trigger.value?.contains(props.target)&&props.preventDefault(),i(`pointerDownOutside`,props);}" @focusoutside="R(()=>{},[`prevent`])" @dismiss="props=>o.onClose()" />
</template>

<script setup>
import { unref as x, renderSlot as S, createTextVNode as ne, createBlock as O, openBlock as A, toDisplayString as ae, onBeforeMount as F, computed as I } from 'vue';
// [符号说明] e~computed, l~computed, _~ref
import { B as e, C as t, G as n, N as i, Q as a, T as o, V as s, at as l, dt as u, g as d, k as p, ut as _ } from '../vendor/ui/Switch.js';
import { E as R } from '../vendor/i18n/en-US-player.js';
import { n as V } from '../vendor/ui/PopperContent.js';

const props = defineProps({
  ariaLabel: {
    type: String,
    required: false
  },
  asChild: {
    type: Boolean,
    required: false,
    default: undefined
  },
  as: {
    type: null,
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
  align: {
    type: null,
    required: false
  },
  alignOffset: {
    type: Number,
    required: false
  },
  avoidCollisions: {
    type: Boolean,
    required: false,
    default: undefined
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
  sticky: {
    type: String,
    required: false
  },
  hideWhenDetached: {
    type: Boolean,
    required: false,
    default: undefined
  },
  positionStrategy: {
    type: String,
    required: false
  },
  updatePositionStrategy: {
    type: String,
    required: false
  }
});
var X = `tooltip.open`;
</script>
