<template>
<component :is="XH" :open="n?.value" @update:open="e=>n.value=e" :title="r(`settings.dataTransfer.export.title`)" :description="r(`settings.dataTransfer.export.desc`)" :busy="l" />
</template>

<script setup>
import XH from './DataTransferDialogShell.vue';
import { S_is as is, S_r as r } from '../shared.js';
const e = defineProps({
      open: {
        type: Boolean,
        required: true
      },
      openModifiers: {}
    });

// [兜底] 模板引用但无来源的符号
const n = { value: undefined };
import { ref } from 'vue';

// [setup 还原] 原组件 setup 里初值不依赖 IPC 的声明
let l = ref(false);
</script>
