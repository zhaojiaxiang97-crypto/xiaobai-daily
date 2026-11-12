<template>
<div data-slot="empty" :class="je(`gap-4 rounded-xl border-dashed p-6 flex w-full min-w-0 flex-1 flex-col items-center justify-center text-center text-balance`,t.class)"><slot /></div>
</template>

<script setup>
import xl from './MenuRadioItem.vue';
import { S_p as p, S_w as w, S_je as je } from '../shared.js';
const e = defineProps({
      class: {
        type: [Boolean, null, String, Object, Array]
      }
    });
const t = e;
</script>
