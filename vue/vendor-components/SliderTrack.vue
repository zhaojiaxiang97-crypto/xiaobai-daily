<template>
<component :is="o" :as-child="props.asChild" :as="props.as" :data-disabled="t.disabled.value?``:undefined" :data-orientation="t.orientation.value" />
</template>

<script setup>
import { unref as d, renderSlot as f, createBlock as y, openBlock as S } from 'vue';
import { $ as e, H as t, V as n, j as o } from '../vendor/ui/Switch.js';

const props = defineProps({
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
