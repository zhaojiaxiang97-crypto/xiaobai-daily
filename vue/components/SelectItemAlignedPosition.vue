<template>
<div ref="state" :style="at({display:`flex`,flexDirection:`column`,position:`fixed`,zIndex:_})"><component :is="fe" /></div>
</template>

<script setup>
import { ref } from 'vue';

// [setup 还原] 原组件 setup 里初值不依赖 IPC 的声明
let _ = ref(``);
import { S_is as is, S_as as as, S_state as state, S_fe as fe, S_at as at } from '../shared.js';
</script>
