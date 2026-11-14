<template>
{{ i(t) }}
</template>

<script setup>
const e = defineProps({
      node: {},
      customId: {},
      indexKey: {},
      customHtmlTags: {}
    });
const t = e;

// [setup 还原] 原组件 setup 里初值不依赖 IPC 的声明
function i(e) {
  return String(e.content ?? ``);
}
</script>

<style>
/* 从原应用 CSS 恢复（data-v-a07f942f） */
[data-v-a07f942f]{font-size:var(--ms-text-body);line-height:var(--ms-leading-body);margin:var(--ms-flow-paragraph-y) 0}
[data-v-a07f942f]{margin:0}
</style>
