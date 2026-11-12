<template>
<span :class="[`inline-flex shrink-0 select-none items-center justify-center overflow-hidden rounded-full bg-primary/10 font-semibold leading-none text-primary`,[e.muted?`opacity-35 grayscale`:``,e.ring?`ring-2 ring-white dark:ring-background`:``]]" :style="at(i.value)" :title="e.name"><img :src="e.avatarUrl" alt="" draggable="false" :class="`size-full object-cover`" @error="e=>n.value=true" /></span>
</template>

<script setup>
import { S_alt as alt, S_n as n, S_i as i, S_at as at } from '../shared.js';
const e = defineProps({
      name: {},
      avatarUrl: {
        default: null
      },
      size: {
        default: 28
      },
      muted: {
        type: Boolean,
        default: false
      },
      ring: {
        type: Boolean,
        default: false
      }
    });
const t = e;
</script>
