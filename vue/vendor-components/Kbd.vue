<template>
<kbd data-slot="kbd" :class="e(`bg-muted text-muted-foreground in-data-[slot=tooltip-content]:bg-background/20 in-data-[slot=tooltip-content]:text-background dark:in-data-[slot=tooltip-content]:bg-background/10 h-5 w-fit min-w-5 gap-1 rounded-sm px-1 font-sans text-xs font-medium [&_svg:not([class*=size-])]:size-3 pointer-events-none inline-flex items-center justify-center select-none`,s.class)"><slot /></kbd>
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
