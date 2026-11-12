<template>
<component :is="ui" :open="e.open" @update:open="e=>n(`update:open`,e)" />
</template>

<script setup>
import { S_is as is, S_n as n, S_ui as ui } from '../shared.js';
const e = defineProps({
      open: {
        type: Boolean
      },
      summary: {}
    });
</script>
