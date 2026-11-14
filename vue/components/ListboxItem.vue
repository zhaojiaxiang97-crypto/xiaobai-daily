<template>
<component :is="a" :value="e?.value" />
</template>

<script setup>
import { S_is as is, S_as as as, S_a as a } from '../shared.js';
const e = defineProps({
      value: {
        type: null,
        required: true
      },
      disabled: {
        type: Boolean,
        required: false
      },
      asChild: {
        type: Boolean,
        required: false
      },
      as: {
        type: null,
        required: false,
        default: `div`
      }
    });
const n = e;
</script>
