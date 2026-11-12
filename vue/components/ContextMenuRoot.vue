<template>
<component :is="Gr" :open="flag.value" @update:open="e=>flag.value=e" :dir="s" :modal="a" />
</template>

<script setup>
import { S_is as is, S_flag as flag, S_a as a, S_s as s, S_Gr as Gr } from '../shared.js';
const e = defineProps({
      pressOpenDelay: {
        type: Number,
        required: false,
        default: 700
      },
      dir: {
        type: String,
        required: false
      },
      modal: {
        type: Boolean,
        required: false,
        default: true
      }
    });
const n = e;
</script>
