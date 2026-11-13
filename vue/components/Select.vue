<template>
<component :is="Ru" />
</template>

<script setup>
import Ru from './SelectRoot.vue';
import { S_is as is, S_by as by } from '../shared.js';
</script>
