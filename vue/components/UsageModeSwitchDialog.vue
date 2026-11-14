<template>
<component :is="_i" :open="flag" @update:open="e=>{e||f();}" />
</template>

<script setup>
import { ref } from 'vue';

// [setup 还原] 原组件 setup 里初值不依赖 IPC 的声明
let flag = ref(false);
function f() {
  u.value || (flag.value = false, r(`update:target`, null));
}
import { S_is as is, S_e as e, S__i as _i } from '../shared.js';
</script>
