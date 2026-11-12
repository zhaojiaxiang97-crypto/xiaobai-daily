<template>
<div><component :is="rU" :start="n.value.from" :end="n.value.to" :label="r(`settings.dataTransfer.range`)" @change="e=>n.value={...n.value,from:e.start,to:e.end}" /></div>
</template>

<script setup>
import rU from './DateRangePickerField.vue';
import { S_to as to, S_is as is, S_e as e, S_n as n, S_r as r } from '../shared.js';
</script>
