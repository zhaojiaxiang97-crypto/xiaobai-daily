<template>
<div data-slot="alert-dialog-header" :class="a(`grid grid-rows-[auto_1fr] place-items-center gap-1.5 text-center has-data-[slot=alert-dialog-media]:grid-rows-[auto_auto_1fr] has-data-[slot=alert-dialog-media]:gap-x-4 sm:group-data-[size=default]/alert-dialog-content:place-items-start sm:group-data-[size=default]/alert-dialog-content:text-left sm:group-data-[size=default]/alert-dialog-content:has-data-[slot=alert-dialog-media]:grid-rows-[auto_1fr]`,props.class)"><slot /></div>
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
