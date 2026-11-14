<template>
<component :is="ui" :open="e.open" @update:open="i" />
</template>

<script setup>
import { S_is as is, S_ui as ui } from '../shared.js';
const e = defineProps({
      open: {
        type: Boolean
      }
    });

// [setup 还原] 原组件 setup 里初值不依赖 IPC 的声明
function i(e) {
  e || n(`reject`);
}
</script>
