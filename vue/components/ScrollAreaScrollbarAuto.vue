<template>
<component :is="h" :present="e.forceMount||flag" />
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
import { ref } from 'vue';

// [setup 还原] 原组件 setup 里初值不依赖 IPC 的声明
let flag = ref(false);
</script>
