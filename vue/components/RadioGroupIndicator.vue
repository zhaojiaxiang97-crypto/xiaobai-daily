<template>
<component :is="h" :present="e.forceMount||n.checked.value" />
</template>

<script setup>
import { S_is as is, S_as as as, S_n as n } from '../shared.js';
const e = defineProps({
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
        required: false,
        default: `span`
      }
    });
</script>
