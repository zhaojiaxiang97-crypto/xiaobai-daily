<template>
<component :is="ui" :open="e.open" @update:open="t=>!e.switching&&r(`update:open`,t)" />
</template>

<script setup>
import { S_is as is, S_t as t, S_r as r, S_ui as ui } from '../shared.js';
const e = defineProps({
      open: {
        type: Boolean
      },
      currentMode: {},
      recommendedMode: {
        default: null
      },
      switching: {
        type: Boolean,
        default: false
      }
    });
const n = e;
</script>
