<template>
{{ i(t) }}
</template>

<script setup>
import { S_i as i } from '../shared.js';
const e = defineProps({
      node: {},
      customId: {},
      indexKey: {},
      customHtmlTags: {}
    });
const t = e;
</script>

<style>
/* 从原应用 CSS 恢复（data-v-a07f942f） */
[data-v-a07f942f]{font-size:var(--ms-text-body);line-height:var(--ms-leading-body);margin:var(--ms-flow-paragraph-y) 0}
[data-v-a07f942f]{margin:0}
</style>
