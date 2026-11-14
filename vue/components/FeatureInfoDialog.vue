<template>
<component :is="ui" :open="r" @update:open="e=>r=e" />
</template>

<script setup>
import { S_is as is, S_ui as ui } from '../shared.js';
const e = defineProps({
      title: {},
      description: {},
      eventName: {},
      panel: {},
      eventProps: {},
      disabled: {
        type: Boolean
      }
    });
const t = e;
import { ref } from 'vue';

// [setup 还原] 原组件 setup 里初值不依赖 IPC 的声明
let r = ref(false);
</script>
