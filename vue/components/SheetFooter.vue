<template>
<div data-slot="sheet-footer" :class="je(`gap-2 p-4 mt-auto flex flex-col`,t.class)"><slot /></div>
</template>

<script setup>
import { S_p as p, S_je as je, S_mt as mt } from '../shared.js';
const e = defineProps({
      class: {
        type: [Boolean, null, String, Object, Array]
      }
    });
const t = e;
</script>
