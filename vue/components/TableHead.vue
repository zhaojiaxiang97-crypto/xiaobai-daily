<template>
<th data-slot="table-head" :class="je(`text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0`,t.class)"><slot /></th>
</template>

<script setup>
import { S_th as th, S_px as px, S_je as je, S_pr as pr } from '../shared.js';
const e = defineProps({
      class: {
        type: [Boolean, null, String, Object, Array]
      }
    });
const t = e;
</script>
