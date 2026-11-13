<template>
<component :is="jc" />
</template>

<script setup>
import jc from './ListboxRoot.vue';
import { S_is as is, S_as as as, S_by as by } from '../shared.js';
</script>
