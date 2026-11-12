<template>
<tbody data-slot="table-body" :class="je(`[&_tr:last-child]:border-0`,t.class)"><slot /></tbody>
</template>

<script setup>
import { S_je as je } from '../shared.js';
const e = defineProps({
      class: {
        type: [Boolean, null, String, Object, Array]
      }
    });
const t = e;
</script>
