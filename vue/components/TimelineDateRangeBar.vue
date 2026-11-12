<template>
<button type="button" :class="[`h-7 whitespace-nowrap rounded-md px-2 text-left text-xs transition-colors`,t.start===items.start&&t.end===items.end?`bg-muted font-medium text-foreground`:`text-muted-foreground hover:bg-muted hover:text-foreground`]" @click="e=>D(t.start,t.end)">{{ t.label }}</button>
</template>

<script setup>
import md from './BaseSeparator.vue';
// [符号说明] D=useConfigProviderContext
import { S_xs as xs, S_px as px, S_e as e, S_t as t, S_D as D } from '../shared.js';
const items = defineProps({
      start: {},
      end: {},
      maxDate: {}
    });
const n = items;
</script>
