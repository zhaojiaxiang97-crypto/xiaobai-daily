<template>
<component :is="fe" :as-child="e.asChild" :as="e.as" />
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
