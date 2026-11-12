<template>
<div data-slot="alert-title" :class="je(`font-medium group-has-[>svg]/alert:col-start-2 cn-font-heading [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground`,t.class)"><slot /></div>
</template>

<script setup>
import { S__a as _a, S_je as je, S_cn as cn } from '../shared.js';
const e = defineProps({
      class: {
        type: [Boolean, null, String, Object, Array]
      }
    });
const t = e;
</script>
