<template>
<div data-slot="sheet-header" :class="je(`gap-0.5 p-4 flex flex-col`,t.class)"><slot /></div>
</template>

<script setup>
import { S_p as p, S_je as je } from '../shared.js';
const e = defineProps({
      class: {
        type: [Boolean, null, String, Object, Array]
      }
    });
const t = e;
</script>
