<template>
<component :is="ui" :open="t.value" @update:open="n=>{event.busy||(t.value=n);}" />
</template>

<script setup>
import { S_is as is, S_t as t, S_n as n, S_ui as ui } from '../shared.js';
const event = defineProps({});
</script>
