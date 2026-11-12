<template>
<component :is="ui" :open="u.value" @update:open="e=>{e||C();}" />
</template>

<script setup>
import { S_is as is, S_u as u, S_C as C, S_ui as ui } from '../shared.js';
const e = defineProps({});
</script>
