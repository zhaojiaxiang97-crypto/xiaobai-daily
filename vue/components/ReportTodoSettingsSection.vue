<template>
<component :is="YM" id="report-todo" />
</template>

<script setup>
import YM from './SettingsSection.vue';
import { S_is as is } from '../shared.js';
</script>
