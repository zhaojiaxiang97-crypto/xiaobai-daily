<template>
<div><component :is="IPe" :value="state?.value" root="" /></div>
</template>

<script setup>
import IPe from './JsonTreeNode.vue';
import { S_is as is } from '../shared.js';
const state = defineProps({
      value: {}
    });
</script>
