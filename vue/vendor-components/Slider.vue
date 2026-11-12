<template>
<component :is="re" data-slot="slider-thumb" :data-vertical="props.orientation===`vertical`?``:undefined" :class="`border-ring ring-ring/50 relative size-3 rounded-full border bg-white transition-[color,box-shadow] after:absolute after:-inset-2 hover:ring-3 focus-visible:ring-3 focus-visible:outline-hidden active:ring-3 block shrink-0 select-none disabled:pointer-events-none disabled:opacity-50`" />
</template>

<script setup>
import { unref as d, createElementBlock as h, renderList as g, createBlock as y, Fragment as x, openBlock as S } from 'vue';
import { $ as e, H as t, V as n, lt as s, xt as c, z as u } from '../vendor/ui/Switch.js';

const props = defineProps({
  defaultValue: {},
  modelValue: {},
  disabled: {
    type: Boolean
  },
  orientation: {},
  dir: {},
  inverted: {
    type: Boolean
  },
  min: {},
  max: {},
  step: {},
  minStepsBetweenThumbs: {},
  thumbAlignment: {},
  asChild: {
    type: Boolean
  },
  as: {},
  name: {},
  required: {
    type: Boolean
  },
  class: {
    type: [Boolean, null, String, Object, Array]
  }
});
</script>
