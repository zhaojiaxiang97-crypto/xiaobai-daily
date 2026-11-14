<template>
<component :is="ui" :open="r?.value" @update:open="e=>r.value=e" />
</template>

<script setup>

// [兜底] 模板引用但无来源的符号
import { S_is as is, S_e as e, S_ui as ui } from '../shared.js';
const r = { value: undefined };
</script>
