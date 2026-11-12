<template>
<div data-slot="alert-dialog-media" :class="e(`bg-muted mb-2 inline-flex size-10 items-center justify-center rounded-md sm:group-data-[size=default]/alert-dialog-content:row-span-2 *:[svg:not([class*=size-])]:size-6`,s.class)"><slot /></div>
</template>

<script setup>
import { normalizeClass as t, unref as n, renderSlot as r, createElementBlock as i, openBlock as a, defineComponent as o } from 'vue';
import { xt as e } from '../vendor/ui/Switch.js';

const o_0 = defineProps({
  class: {
    type: [Boolean, null, String, Object, Array]
  }
});
const s = o_0;
</script>
