<template>
<component :is="OW" :open="r.value" @update:open="e=>r.value=e" />
</template>

<script setup>
import OW from './Sheet.vue';
import { S_is as is, S_e as e, S_r as r } from '../shared.js';
</script>
