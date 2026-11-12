<template>
<component :is="h" :present="e.forceMount||flag.value" />
</template>

<script setup>
import { S_is as is, S_flag as flag } from '../shared.js';
const e = defineProps({
      forceMount: {
        type: Boolean,
        required: false
      }
    });
</script>
