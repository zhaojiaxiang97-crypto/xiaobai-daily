<template>
<div data-slot="dialog-header" :class="i(`gap-2 flex flex-col`,props.class)"><slot /></div>
</template>

<script setup>
import { normalizeClass as o, unref as s, renderSlot as c, createElementBlock as u, openBlock as m } from 'vue';
import { B as e, _ as t, lt as n, xt as i } from '../vendor/ui/Switch.js';

const props = defineProps({
  class: {
    type: [Boolean, null, String, Object, Array]
  }
});
</script>
