<template>
<a data-v-83c33a47 :class="`footnote-anchor text-sm hover:underline cursor-pointer`" :href="`#fnref-${event.node.id}`" :title="`返回引用 ${event.node.id}`" @click="n"> ↩︎ </a>
</template>

<script setup>
import { S_sm as sm, S_href as href, S_a as a } from '../shared.js';
const event = defineProps({
      node: {}
    });
const t = event;

// [setup 还原] 原组件 setup 里初值不依赖 IPC 的声明
function n(e) {
  if (e.preventDefault(), typeof document > `u`) return;
  let n = `fnref-${String(t.node.id ?? ``)}`,
    elementByIdResult = document.getElementById(n);
  elementByIdResult && elementByIdResult.scrollIntoView({
    behavior: `smooth`
  });
}
</script>

<style>
/* 从原应用 CSS 恢复（data-v-83c33a47） */
[data-v-83c33a47]{color:var(--link-color);margin-left:.5rem}
</style>
