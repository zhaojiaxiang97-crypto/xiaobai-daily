<template>
<component :is="Cu" />
</template>

<script setup>

// [兜底] 模板引用但无来源的符号
import { S_is as is, S_as as as } from '../shared.js';
const Cu = { value: undefined };
</script>
