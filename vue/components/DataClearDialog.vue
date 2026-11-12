<template>
<li :class="`flex items-center justify-between gap-3`"><span><span v-text="o(`settings.dataTransfer.groups.${e.id}.name`)" /></span><span><span v-text="o(`settings.dataTransfer.countUnit`,{count:e.count.toLocaleString()})" /></span></li>
</template>

<script setup>
import { S_o as o, S_v as v, S_li as li } from '../shared.js';
const e = defineProps({
      open: {
        type: Boolean,
        required: true
      },
      openModifiers: {}
    });
</script>
