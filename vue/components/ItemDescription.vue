<template>
<p data-slot="item-description" :class="je(`text-muted-foreground text-left text-sm leading-normal group-data-[size=xs]/item:text-xs line-clamp-2 font-normal [&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary`,t.class)"><slot /></p>
</template>

<script setup>
import { S_xs as xs, S_sm as sm, S_a as a, S_p as p, S_je as je } from '../shared.js';
const e = defineProps({
      class: {
        type: [Boolean, null, String, Object, Array]
      }
    });
const t = e;
</script>
