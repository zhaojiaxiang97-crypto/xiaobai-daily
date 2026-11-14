<template>
<component :is="h" :present="e.forceMount||o?.value" />
</template>

<script setup>
import { S_is as is } from '../shared.js';
const e = defineProps({
      forceMount: {
        type: Boolean,
        required: false
      }
    });

// [兜底] 模板引用但无来源的符号
const h = { value: undefined };
const o = { value: undefined };
</script>
