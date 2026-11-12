<template>
<div data-slot="card-header" :class="je(`gap-1 rounded-t-xl px-4 group-data-[size=sm]/card:px-3 [.border-b]:pb-4 group-data-[size=sm]/card:[.border-b]:pb-3 group/card-header @container/card-header grid auto-rows-min items-start has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto]`,t.class)"><slot /></div>
</template>

<script setup>
import xl from './MenuRadioItem.vue';
import { S_sm as sm, S_pb as pb, S_px as px, S_b as b, S_je as je } from '../shared.js';
const e = defineProps({
      class: {
        type: [Boolean, null, String, Object, Array]
      }
    });
const t = e;
</script>
