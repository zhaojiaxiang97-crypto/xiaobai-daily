<template>
<component :is="ui" :open="u" @update:open="e=>{e||C();}" />
</template>

<script setup>
import { S_is as is, S_ui as ui } from '../shared.js';
const e = defineProps({});
import { ref } from 'vue';

// [setup 还原] 原组件 setup 里初值不依赖 IPC 的声明
let u = ref(false);
function C() {
  u.value = false, _();
}
</script>
