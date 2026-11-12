<template>
<thead data-slot="table-header" :class="je(`[&_tr]:border-b`,t.class)"><slot /></thead>
</template>

<script setup>
import { S_b as b, S_je as je } from '../shared.js';
const e = defineProps({
      class: {
        type: [Boolean, null, String, Object, Array]
      }
    });
const t = e;
</script>
