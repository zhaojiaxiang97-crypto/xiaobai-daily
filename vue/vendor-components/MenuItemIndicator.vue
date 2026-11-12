<template>
<component :is="i" :present="props.forceMount||o(n.modelValue.value)||n.modelValue.value===true" />
</template>

<script setup>
import { unref as x, renderSlot as S, createBlock as O, openBlock as A } from 'vue';
import { B as e, C as t, G as n, I as r, N as i, T as o, j as f, ut as _ } from '../vendor/ui/Switch.js';

const props = defineProps({
  forceMount: {
    type: Boolean,
    required: false
  },
  asChild: {
    type: Boolean,
    required: false
  },
  as: {
    type: null,
    required: false,
    default: `span`
  }
});
</script>
