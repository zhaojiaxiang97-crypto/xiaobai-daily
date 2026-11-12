<template>
<component :is="wo" :as="e_0.as" :as-child="e_0.asChild" :aria-hidden="e_0.feature===`focusable`||e_0.feature===`fully-hidden`?`true`:undefined" :data-hidden="e_0.feature===`fully-hidden`?``:undefined" :tabindex="e_0.feature===`fully-hidden`?`-1`:undefined" :style="({position:`absolute`,border:0,width:`1px`,height:`1px`,padding:0,margin:`-1px`,overflow:`hidden`,clip:`rect(0, 0, 0, 0)`,clipPath:`inset(50%)`,whiteSpace:`nowrap`,wordWrap:`normal`,top:`-1px`,left:`-1px`})" />
</template>

<script setup>
import { normalizeClass as t, unref as i, renderSlot as u, createBlock as F, openBlock as L } from 'vue';

const e_0 = defineProps({
  feature: {
    type: String,
    required: false,
    default: `focusable`
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
