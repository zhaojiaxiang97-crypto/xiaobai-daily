<template>
<div data-slot="card-content" :class="je(`px-4 group-data-[size=sm]/card:px-3`,t.class)"><slot /></div>
</template>

<script setup>
import { S_sm as sm, S_px as px, S_je as je } from '../shared.js';
const e = defineProps({
      class: {
        type: [Boolean, null, String, Object, Array]
      }
    });
const t = e;
</script>
