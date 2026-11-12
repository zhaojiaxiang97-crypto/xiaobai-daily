<template>
<div><table data-slot="table" :class="je(`w-full caption-bottom text-sm`,t.class)"><slot /></table></div>
</template>

<script setup>
import { S_sm as sm, S_w as w, S_je as je } from '../shared.js';
const e = defineProps({
      class: {
        type: [Boolean, null, String, Object, Array]
      }
    });
const t = e;
</script>
