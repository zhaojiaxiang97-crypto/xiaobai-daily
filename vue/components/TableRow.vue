<template>
<tr data-slot="table-row" :class="je(`hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors has-aria-expanded:bg-muted/50`,t.class)"><slot /></tr>
</template>

<script setup>
import { S_state as state, S_b as b, S_je as je, S_tr as tr } from '../shared.js';
const e = defineProps({
      class: {
        type: [Boolean, null, String, Object, Array]
      }
    });
const t = e;
</script>
