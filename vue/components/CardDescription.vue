<template>
<div data-slot="card-description" :class="je(`text-muted-foreground text-sm`,t.class)"><slot /></div>
</template>

<script setup>
import { S_sm as sm, S_je as je } from '../shared.js';
const e = defineProps({
      class: {
        type: [Boolean, null, String, Object, Array]
      }
    });
const t = e;
</script>
