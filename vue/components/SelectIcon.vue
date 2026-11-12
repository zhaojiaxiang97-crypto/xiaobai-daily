<template>
<component :is="fe" aria-hidden="true" :as="e.as" :as-child="e.asChild" />
</template>

<script setup>
import { S_is as is, S_as as as, S_fe as fe } from '../shared.js';
const e = defineProps({
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
