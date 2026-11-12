<template>
<component :is="ui" :open="e.open" @update:open="e=>i(`update:open`,e)" />
</template>

<script setup>
import { S_is as is, S_i as i, S_ui as ui } from '../shared.js';
const e = defineProps({
      open: {
        type: Boolean
      },
      records: {},
      rangeStart: {},
      rangeEnd: {},
      generateSignal: {}
    });
</script>
