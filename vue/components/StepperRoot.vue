<template>
<component :is="fe" role="group" aria-label="progress" :as="e.as" :as-child="e.asChild" :data-linear="s?``:undefined" :data-orientation="e.orientation" />
</template>

<script setup>
import { S_is as is, S_as as as, S_s as s, S_fe as fe } from '../shared.js';
const e = defineProps({
      defaultValue: {
        type: Number,
        required: false,
        default: 1
      },
      orientation: {
        type: String,
        required: false,
        default: `horizontal`
      },
      dir: {
        type: String,
        required: false
      },
      modelValue: {
        type: Number,
        required: false
      },
      linear: {
        type: Boolean,
        required: false,
        default: true
      },
      asChild: {
        type: Boolean,
        required: false
      },
      as: {
        type: null,
        required: false
      }
    });
const r = e;
</script>
