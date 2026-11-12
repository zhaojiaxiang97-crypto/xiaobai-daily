<template>
<component :is="Uy" :value="v(t.providerId,e.id)" />
</template>

<script setup>
import Uy from './SelectItem.vue';
import { S_is as is, S_v as v } from '../shared.js';
const e = defineProps({});
const t = e;
</script>
