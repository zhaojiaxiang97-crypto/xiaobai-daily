<template>
<component :is="on" />
</template>

<script setup>
import { S_is as is, S_on as on } from '../shared.js';
</script>
