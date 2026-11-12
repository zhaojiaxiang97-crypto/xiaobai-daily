<template>
<component :is="_i" :open="r.value" @update:open="e=>r.value=e" />
</template>

<script setup>
import { S_is as is, S_r as r, S__i as _i } from '../shared.js';
const e = defineProps({});
</script>
