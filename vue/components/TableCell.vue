<template>
<td data-slot="table-cell" :class="je(`p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0`,t.class)"><slot /></td>
</template>

<script setup>
import { S_p as p, S_je as je, S_pr as pr } from '../shared.js';
const e = defineProps({
      class: {
        type: [Boolean, null, String, Object, Array]
      }
    });
const t = e;
</script>
