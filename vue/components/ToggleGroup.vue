<template>
<component :is="Id" />
</template>

<script setup>
import Id from './ToggleGroupRoot.vue';
import { S_is as is, S_as as as } from '../shared.js';
</script>
