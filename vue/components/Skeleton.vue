<template>
<div data-slot="skeleton" :class="je(`bg-muted rounded-md`,t.class)"></div>
</template>

<script setup>
import md from './BaseSeparator.vue';
import { S_je as je } from '../shared.js';
const e = defineProps({
      class: {
        type: [Boolean, null, String, Object, Array]
      }
    });
const t = e;
</script>
