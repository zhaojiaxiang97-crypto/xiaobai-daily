<template>
<component :is="Ei" as-child="" :focusable="!e.disabled" :active="o.value" />
</template>

<script setup>
import { S_is as is, S_as as as, S_o as o, S_Ei as Ei } from '../shared.js';
const e = defineProps({
      value: {
        type: [String, Number],
        required: true
      },
      disabled: {
        type: Boolean,
        required: false,
        default: false
      },
      asChild: {
        type: Boolean,
        required: false
      },
      as: {
        type: null,
        required: false,
        default: `button`
      }
    });
const t = e;
</script>
