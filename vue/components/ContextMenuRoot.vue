<template>
<component :is="Gr" :open="flag" @update:open="e=>flag=e" :dir="s" :modal="a" />
</template>

<script setup>
import { S_is as is, S_a as a, S_s as s, S_Gr as Gr } from '../shared.js';
const e = defineProps({
      pressOpenDelay: {
        type: Number,
        required: false,
        default: 700
      },
      dir: {
        type: String,
        required: false
      },
      modal: {
        type: Boolean,
        required: false,
        default: true
      }
    });
const n = e;
import { ref } from 'vue';

// [setup 还原] 原组件 setup 里初值不依赖 IPC 的声明
let flag = ref(false);
</script>
