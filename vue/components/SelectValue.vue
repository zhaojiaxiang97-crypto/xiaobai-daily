<template>
<component :is="fe" :ref="n" :as="e.as" :as-child="e.asChild" :style="({pointerEvents:`none`})" :data-placeholder="a.value.length?undefined:t.placeholder" />
</template>

<script setup>
import { S_is as is, S_as as as, S_e as e, S_n as n, S_a as a, S_fe as fe } from '../shared.js';
const items = defineProps({
      placeholder: {
        type: String,
        required: false,
        default: ``
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
const t = items;
</script>
