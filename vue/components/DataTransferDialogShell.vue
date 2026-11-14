<template>
<component :is="ui" :open="t?.value" @update:open="n=>{event.busy||(t.value=n);}" />
</template>

<script setup>
// [符号说明] n~computed
import { S_is as is, S_n as n, S_ui as ui } from '../shared.js';
const event = defineProps({});

// [兜底] 模板引用但无来源的符号
const t = { value: undefined };
</script>
