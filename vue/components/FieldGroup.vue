<template>
<div data-slot="field-group" :class="je(`gap-5 data-[slot=checkbox-group]:gap-3 *:data-[slot=field-group]:gap-4 group/field-group @container/field-group flex w-full flex-col`,t.class)"><slot /></div>
</template>

<script setup>
import { S_w as w, S_je as je } from '../shared.js';
const e = defineProps({
      class: {
        type: [Boolean, null, String, Object, Array]
      }
    });
const t = e;
</script>
