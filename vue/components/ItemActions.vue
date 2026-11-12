<template>
<div data-slot="item-actions" :class="je(`gap-2 flex items-center`,t.class)"><slot /></div>
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
