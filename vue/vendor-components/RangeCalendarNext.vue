<template>
<component :is="i" :as="props.as" :as-child="props.asChild" aria-label="Next page" :type="props.as===`button`?`button`:undefined" :aria-disabled="n.value||undefined" :data-disabled="n.value||undefined" :disabled="n.value" @click="a" />
</template>

<script setup>
import { unref as d, renderSlot as p, createTextVNode as h, renderList as _, createBlock as x, openBlock as w, computed as M } from 'vue';
import { A as e, B as t, Q as n, j as i, lt as a } from '../vendor/ui/Switch.js';

const props = defineProps({
  nextPage: {
    type: Function,
    required: false
  },
  asChild: {
    type: Boolean,
    required: false
  },
  as: {
    type: null,
    required: false,
    default: `button`
  }
});
</script>
