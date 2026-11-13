<template>
<component :is="PO" data-slot="field-label" :class="je(`has-data-checked:bg-primary/5 has-data-checked:border-primary/30 dark:has-data-checked:border-primary/20 dark:has-data-checked:bg-primary/10 gap-2 group-data-[disabled=true]/field:opacity-50 has-[>[data-slot=field]]:rounded-lg has-[>[data-slot=field]]:border *:data-[slot=field]:p-2.5 group/field-label peer/field-label flex w-fit leading-snug`,`has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col`,t.class)" />
</template>

<script setup>
import PO from './Label.vue';
import { S_is as is, S_lg as lg, S_fit as fit, S_p as p, S_w as w, S_je as je } from '../shared.js';
const e = defineProps({
      class: {
        type: [Boolean, null, String, Object, Array]
      }
    });
const t = e;
</script>
