<template>
<component :is="Uy" :value="String(e)" />
</template>

<script setup>
import Uy from './SelectItem.vue';
import { S_is as is } from '../shared.js';
const e = defineProps({});
</script>
