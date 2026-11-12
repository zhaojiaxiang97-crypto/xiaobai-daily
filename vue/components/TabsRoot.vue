<template>
<component :is="fe" :dir="s" :data-orientation="i" :as-child="e.asChild" :as="e.as" />
</template>

<script setup>
import { S_is as is, S_as as as, S_i as i, S_s as s, S_fe as fe } from '../shared.js';
const e = defineProps({
      defaultValue: {
        type: null,
        required: false
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
      activationMode: {
        type: String,
        required: false,
        default: `automatic`
      },
      modelValue: {
        type: null,
        required: false
      },
      unmountOnHide: {
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
const n = e;
</script>
