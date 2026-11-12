<template>
<component :is="zn" role="status" aria-label="Loading" :class="je(`size-4 animate-spin`,t.class)" />
</template>

<script setup>
import { S_is as is, S_je as je, S_zn as zn } from '../shared.js';
const e = defineProps({
      class: {
        type: [Boolean, null, String, Object, Array]
      }
    });
const t = e;
</script>
