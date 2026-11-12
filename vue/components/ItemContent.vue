<template>
<div data-slot="item-content" :class="je(`gap-1 group-data-[size=xs]/item:gap-0 flex flex-1 flex-col [&+[data-slot=item-content]]:flex-none`,t.class)"><slot /></div>
</template>

<script setup>
import { S_xs as xs, S_je as je } from '../shared.js';
const e = defineProps({
      class: {
        type: [Boolean, null, String, Object, Array]
      }
    });
const t = e;
</script>
