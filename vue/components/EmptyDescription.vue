<template>
<p data-slot="empty-description" :class="je(`text-sm/relaxed text-muted-foreground [&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary`,e.$attrs.class??``)"><slot /></p>
</template>

<script setup>
import { S_sm as sm, S_a as a, S_p as p, S_je as je } from '../shared.js';
const e = defineProps({
      class: {
        type: [Boolean, null, String, Object, Array]
      }
    });
</script>
