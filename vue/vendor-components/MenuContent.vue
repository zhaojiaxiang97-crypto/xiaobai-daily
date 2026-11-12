<template>
<component :is="a" :present="props.forceMount||r.open.value" />
</template>

<script setup>
import { unref as T, renderSlot as E, createBlock as j, openBlock as P } from 'vue';
// [符号说明] r=useConfigProviderContext
import { B as e, D as t, I as r, N as a, lt as _, z as w } from '../vendor/ui/Switch.js';

const props = defineProps({
  forceMount: {
    type: Boolean,
    required: false
  },
  loop: {
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
</script>
