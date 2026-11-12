<template>
<span data-slot="dropdown-menu-shortcut" :class="c(`text-muted-foreground group-focus/dropdown-menu-item:text-accent-foreground ml-auto text-xs tracking-widest`,props.class)"><slot /></span>
</template>

<script setup>
import { normalizeClass as u, unref as d, renderSlot as p, createElementBlock as g, openBlock as T } from 'vue';
// [符号说明] e~computed
import { B as e, C as t, T as n, xt as c } from '../vendor/ui/Switch.js';

const props = defineProps({
  class: {
    type: [Boolean, null, String, Object, Array]
  }
});
</script>
