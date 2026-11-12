<template>
<div data-slot="item-title" :class="je(`gap-2 text-sm leading-snug font-medium underline-offset-4 cn-font-heading line-clamp-1 flex w-fit items-center`,t.class)"><slot /></div>
</template>

<script setup>
import { S_sm as sm, S_w as w, S_je as je, S_cn as cn } from '../shared.js';
const e = defineProps({
      class: {
        type: [Boolean, null, String, Object, Array]
      }
    });
const t = e;
</script>
