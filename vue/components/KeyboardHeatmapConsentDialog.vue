<template>
<component :is="_i" :open="r?.value" @update:open="e=>r.value=e" />
</template>

<script setup>
import { S_is as is, S__i as _i } from '../shared.js';
const e = defineProps({});

// [兜底] 模板引用但无来源的符号
const r = { value: undefined };
</script>
