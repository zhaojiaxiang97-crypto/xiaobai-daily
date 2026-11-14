<template>
<component :is="l" :value="({textValue:p?.value})" />
</template>

<script setup>

// [兜底] 模板引用但无来源的符号
// [符号说明] l~computed
import { S_is as is, S_as as as, S_l as l } from '../shared.js';
const p = { value: undefined };
</script>
