<template>
<div data-slot="alert-description" :class="je(`text-muted-foreground text-sm text-balance md:text-pretty [&_p:not(:last-child)]:mb-4 [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground`,t.class)"><slot /></div>
</template>

<script setup>
import md from './BaseSeparator.vue';
import _p from './TabsContent.vue';
import { S__a as _a, S_sm as sm, S_je as je } from '../shared.js';
const e = defineProps({
      class: {
        type: [Boolean, null, String, Object, Array]
      }
    });
const t = e;
</script>
