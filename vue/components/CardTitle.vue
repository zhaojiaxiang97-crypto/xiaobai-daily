<template>
<div data-slot="card-title" :class="je(`text-base leading-snug font-medium group-data-[size=sm]/card:text-sm cn-font-heading`,t.class)"><slot /></div>
</template>

<script setup>
import { S_sm as sm, S_je as je, S_cn as cn } from '../shared.js';
const e = defineProps({
      class: {
        type: [Boolean, null, String, Object, Array]
      }
    });
const t = e;
</script>
