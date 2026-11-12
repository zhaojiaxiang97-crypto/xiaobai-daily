<template>
<component :is="h" :present="e.forceMount||o.value" force-mount="" />
</template>

<script setup>
import { S_is as is, S_as as as, S_o as o } from '../shared.js';
const e = defineProps({
      value: {
        type: [String, Number],
        required: true
      },
      forceMount: {
        type: Boolean,
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
const t = e;
</script>
