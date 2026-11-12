<template>
<div data-slot="card" :data-size="e.size" :class="je(`ring-foreground/10 bg-card text-card-foreground gap-4 overflow-hidden rounded-xl py-4 text-sm ring-1 has-data-[slot=card-footer]:pb-0 has-[>img:first-child]:pt-0 data-[size=sm]:gap-3 data-[size=sm]:py-3 data-[size=sm]:has-data-[slot=card-footer]:pb-0 *:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl group/card flex flex-col`,t.class)"><slot /></div>
</template>

<script setup>
import xl from './MenuRadioItem.vue';
import { S_sm as sm, S_pb as pb, S_b as b, S_je as je } from '../shared.js';
const e = defineProps({
      class: {
        type: [Boolean, null, String, Object, Array]
      },
      size: {
        default: `default`
      }
    });
const t = e;
</script>
