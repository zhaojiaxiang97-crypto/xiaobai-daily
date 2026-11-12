<template>
<div data-slot="empty-header" :class="je(`gap-2 flex max-w-sm flex-col items-center`,t.class)"><slot /></div>
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
