<template>
<component :is="Tl" />
</template>

<script setup>
import Tl from './ContextMenuRoot.vue';
import { S_is as is } from '../shared.js';
</script>
