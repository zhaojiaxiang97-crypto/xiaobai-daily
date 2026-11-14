<template>
<div><component :is="rU" :start="n.value.from" :end="n.value.to" :label="r(`settings.dataTransfer.range`)" @change="e=>n.value={...n.value,from:e.start,to:e.end}" /></div>
</template>

<script setup>
import rU from './DateRangePickerField.vue';

// [兜底] 模板引用但无来源的符号
import { S_to as to, S_is as is, S_e as e, S_r as r } from '../shared.js';
const n = { value: undefined };
</script>
