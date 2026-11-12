<template>
<div role="list" data-slot="item-group" :class="je(`gap-4 has-data-[size=sm]:gap-2.5 has-data-[size=xs]:gap-2 group/item-group flex w-full flex-col`,t.class)"><slot /></div>
</template>

<script setup>
import { S_xs as xs, S_sm as sm, S_w as w, S_je as je } from '../shared.js';
const e = defineProps({
      class: {
        type: [Boolean, null, String, Object, Array]
      }
    });
const t = e;
</script>
