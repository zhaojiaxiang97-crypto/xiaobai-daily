<template>
<component :is="ui" :open="r.value" @update:open="e=>r.value=e" />
</template>

<script setup>
import { S_is as is, S_r as r, S_ui as ui } from '../shared.js';
const e = defineProps({
      title: {},
      description: {},
      eventName: {},
      panel: {},
      eventProps: {},
      disabled: {
        type: Boolean
      }
    });
const t = e;
</script>
