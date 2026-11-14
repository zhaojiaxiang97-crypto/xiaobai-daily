<template>
<component :is="An" :open="a" @update:open="e=>a=e" modal="" />
</template>

<script setup>
import { ref } from 'vue';

// [setup 还原] 原组件 setup 里初值不依赖 IPC 的声明
let a = ref(false);
import { S_is as is, S_e as e, S_An as An } from '../shared.js';
</script>
