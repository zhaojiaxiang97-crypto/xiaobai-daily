<template>
<component :is="ui" :open="e.open" @update:open="i" />
</template>

<script setup>
import { S_is as is, S_i as i, S_ui as ui } from '../shared.js';
const e = defineProps({
      open: {
        type: Boolean
      }
    });
</script>
