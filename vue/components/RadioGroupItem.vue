<template>
<component :is="Ei" :checked="l?.value" :disabled="s?.value" as-child="" :focusable="!s?.value" :active="l?.value" />
</template>

<script setup>

// [兜底] 模板引用但无来源的符号
import { S_is as is, S_as as as, S_Ei as Ei } from '../shared.js';
const l = { value: undefined };
const s = { value: undefined };
</script>
