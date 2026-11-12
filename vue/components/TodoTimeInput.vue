<template>
<button type="button" role="option" tabindex="-1" :data-time="t" :aria-selected="t===event.modelValue" :disabled="!!(event.min&&t<event.min)" :class="`flex h-7 w-full items-center rounded-md px-2 text-left text-sm tabular-nums text-foreground transition-colors hover:bg-accent disabled:pointer-events-none disabled:opacity-40 aria-selected:bg-primary aria-selected:text-primary-foreground`" @mousedown="withDirectives(()=>{},[`prevent`])" @click="e=>f(t)">{{ t }}</button>
</template>

<script setup>
import { withDirectives } from 'vue';
import md from './BaseSeparator.vue';
import { S_sm as sm, S_px as px, S_e as e, S_t as t, S_f as f, S_w as w } from '../shared.js';
const event = defineProps({
      modelValue: {},
      label: {},
      min: {},
      invalid: {
        type: Boolean
      },
      disabled: {
        type: Boolean
      }
    });
const n = event;
</script>
