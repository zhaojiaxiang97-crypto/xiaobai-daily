<template>
<div data-slot="dialog-footer" :class="i(`bg-muted/50 -mx-4 -mb-4 rounded-b-xl border-props p-4 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end`,props.class)"><slot /><component :is="S" as-child="" /></div>
</template>

<script setup>
import { normalizeClass as o, unref as s, renderSlot as c, createTextVNode as l, createElementBlock as u, createBlock as p, openBlock as m, createCommentVNode as y, createElementVNode as b } from 'vue';
// [符号说明] e~computed, a~computed
import { B as e, _ as t, lt as n, r, xt as i, z as a } from '../vendor/ui/Switch.js';
import { a as S } from '../vendor/ui/DialogTitle.js';

const props = defineProps({
  class: {
    type: [Boolean, null, String, Object, Array]
  },
  showCloseButton: {
    type: Boolean,
    default: false
  }
});
</script>
