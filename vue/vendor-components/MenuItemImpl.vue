<template>
<component :is="o" :value="({textValue:props.textValue})" />
</template>

<script setup>
import { unref as T, renderSlot as E, createBlock as j, openBlock as P, computed as V } from 'vue';
import { B as e, E as n, L as i, N as a, O as o, S as l, V as u, W as d, j as h, lt as _, vt as b } from '../vendor/ui/Switch.js';
import { t as q } from '../vendor/ui/Collection.js';

const props = defineProps({
  disabled: {
    type: Boolean,
    required: false
  },
  textValue: {
    type: String,
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
