<template>
<div><component :is="fe" :ref="s" :style="{minWidth:a.scrollbarXEnabled.value?`fit-content`:undefined}" :as-child="n.asChild" :as="e.as" /></div>
</template>

<script setup>
import { S_is as is, S_as as as, S_fit as fit, S_a as a, S_s as s, S_fe as fe, S_at as at } from '../shared.js';
const e = defineProps({
      nonce: {
        type: String,
        required: false
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
