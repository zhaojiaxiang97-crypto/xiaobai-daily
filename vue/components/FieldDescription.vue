<template>
<p data-slot="field-description" :class="je(`text-muted-foreground text-left text-sm [[data-variant=legend]+&]:-mt-1.5 leading-normal font-normal group-has-data-horizontal/field:text-balance`,`last:mt-0 nth-last-2:-mt-1`,`[&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary`,t.class)"><slot /></p>
</template>

<script setup>
import { S_sm as sm, S_a as a, S_p as p, S_je as je, S_mt as mt } from '../shared.js';
const e = defineProps({
      class: {
        type: [Boolean, null, String, Object, Array]
      }
    });
const t = e;
</script>
