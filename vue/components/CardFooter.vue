<template>
<div data-slot="card-footer" :class="je(`bg-muted/50 rounded-b-xl border-t p-4 group-data-[size=sm]/card:p-3 flex items-center`,t.class)"><slot /></div>
</template>

<script setup>
import xl from './MenuRadioItem.vue';
import { S_sm as sm, S_p as p, S_b as b, S_je as je } from '../shared.js';
const e = defineProps({
      class: {
        type: [Boolean, null, String, Object, Array]
      }
    });
const t = e;
</script>
