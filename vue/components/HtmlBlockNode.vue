<template>
<component data-v-4d8bb24b :is="Be(h?.value?p?.value:`div`)" />
</template>

<script setup>

// [兜底] 模板引用但无来源的符号
import { S_is as is, S_Be as Be } from '../shared.js';
const h = { value: undefined };
const p = { value: undefined };
</script>

<style>
/* 从原应用 CSS 恢复（data-v-4d8bb24b） */
[data-v-4d8bb24b]{white-space:pre-wrap;overflow-wrap:anywhere;opacity:.85}
[data-v-4d8bb24b]{flex-direction:column;gap:.35rem;padding:.5rem 0;display:flex}
[data-v-4d8bb24b]{background-image:linear-gradient(90deg,var(--loading-shimmer),transparent,var(--loading-shimmer));background-size:200% 100%;border-radius:9999px;height:.8rem;animation:1.2s infinite html-block-node-shimmer-4d8bb24b;display:block}
</style>
