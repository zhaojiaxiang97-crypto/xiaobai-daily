<template>
<component :is="OW" :open="r?.value" @update:open="e=>r.value=e" />
</template>

<script setup>
import OW from './Sheet.vue';

// [兜底] 模板引用但无来源的符号
import { S_is as is, S_e as e } from '../shared.js';
const r = { value: undefined };
</script>
