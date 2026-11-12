<template>
<component :is="Mc" />
</template>

<script setup>
import Mc from './ListboxContent.vue';
import { S_is as is, S_as as as } from '../shared.js';
</script>
