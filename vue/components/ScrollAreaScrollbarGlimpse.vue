<template>
<component :is="h" :present="e.forceMount||o.value" />
</template>

<script setup>
import { S_is as is, S_o as o } from '../shared.js';
const e = defineProps({
      forceMount: {
        type: Boolean,
        required: false
      }
    });
</script>
