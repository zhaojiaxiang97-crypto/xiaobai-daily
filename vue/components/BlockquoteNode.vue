<template>
<blockquote data-v-07e0310e :class="`blockquote`" dir="auto" :cite="e.node.cite"><component :is="s$" :index-key="`blockquote-${t.indexKey}`" :nodes="t.node.children||[]" :custom-id="t.customId" :typewriter="t.typewriter" @copy="e=>n.$emit(`copy`,e)" /></blockquote>
</template>

<script setup>
// [符号说明] n~computed
import { S_is as is, S_s$ as s$, S_n as n } from '../shared.js';
const e = defineProps({
      node: {},
      indexKey: {},
      typewriter: {
        type: Boolean
      },
      customId: {}
    });
const t = e;
</script>

<style>
/* 从原应用 CSS 恢复（data-v-07e0310e） */
[data-v-07e0310e]{color:var(--blockquote-fg,hsl(var(--ms-muted-foreground)));border-left:3px solid var(--blockquote-border);margin-top:var(--ms-flow-blockquote-y);margin-bottom:var(--ms-flow-blockquote-y);padding-left:var(--ms-flow-blockquote-indent);font-style:normal;font-weight:400}
[data-v-07e0310e] .markdown-renderer{content-visibility:visible;contain:content;contain-intrinsic-size:0px 0px}
</style>
