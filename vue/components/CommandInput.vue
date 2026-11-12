<template>
<div><component :is="F5" :class="`bg-input/30 border-input/30 h-8! rounded-lg! shadow-none! *:data-[slot=input-group-addon]:pl-2!`" /></div>
</template>

<script setup>
import F5 from './InputGroup.vue';
import { S_is as is, S_as as as, S_lg as lg } from '../shared.js';
</script>
