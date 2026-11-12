<template>
<div data-slot="alert-dialog-footer" :class="a(`bg-muted/50 -mx-4 -mb-4 rounded-b-xl border-props p-4 flex flex-col-reverse gap-2 group-data-[size=sm]/alert-dialog-content:grid group-data-[size=sm]/alert-dialog-content:grid-cols-2 sm:flex-row sm:justify-end`,props.class)"><slot /></div>
</template>

<script setup>
import { normalizeClass as c, unref as l, renderSlot as u, createElementBlock as d, openBlock as g } from 'vue';
import { U as e, V as t, _ as n, xt as a } from '../vendor/ui/Switch.js';

const props = defineProps({
  class: {
    type: [Boolean, null, String, Object, Array]
  }
});
</script>
