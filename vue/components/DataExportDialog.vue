<template>
<component :is="XH" :open="n.value" @update:open="e=>n.value=e" :title="r(`settings.dataTransfer.export.title`)" :description="r(`settings.dataTransfer.export.desc`)" :busy="l.value" />
</template>

<script setup>
import XH from './DataTransferDialogShell.vue';
import { S_is as is, S_n as n, S_r as r, S_l as l } from '../shared.js';
const e = defineProps({
      open: {
        type: Boolean,
        required: true
      },
      openModifiers: {}
    });
</script>
