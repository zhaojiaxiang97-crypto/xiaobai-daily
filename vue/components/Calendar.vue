<template>
<component :is="TN" :value="t.month" :selected="e.month===t.month" />
</template>

<script setup>
import TN from './NativeSelectOption.vue';
import { S_is as is, S_as as as, S_e as e, S_t as t } from '../shared.js';
</script>
