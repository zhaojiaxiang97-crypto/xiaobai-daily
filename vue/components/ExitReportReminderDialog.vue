<template>
<component :is="ui" :open="e.open" />
</template>

<script setup>
import { S_is as is, S_ui as ui } from '../shared.js';
const e = defineProps({
      open: {
        type: Boolean
      },
      snapshot: {}
    });
const n = e;
</script>
