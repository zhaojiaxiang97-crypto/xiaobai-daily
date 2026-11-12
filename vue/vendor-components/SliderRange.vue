<template>
<component :is="o" :data-disabled="t.disabled.value?``:undefined" :data-orientation="t.orientation.value" :as-child="props.asChild" :as="props.as" :style="E({[r.startEdge.value]:`${a.value}%`,[r.endEdge.value]:`${s.value}%`})" />
</template>

<script setup>
import { unref as d, renderSlot as f, createBlock as y, openBlock as S, computed as k } from 'vue';
import { $ as e, H as t, V as n, at as r, h as a, j as o, lt as s } from '../vendor/ui/Switch.js';

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
function P(e, t, n) {
  let r = 100 / (n - t) * (e - t);
  return i(r, 0, 100);
}
</script>
