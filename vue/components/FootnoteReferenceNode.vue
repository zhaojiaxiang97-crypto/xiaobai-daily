<template>
<sup data-v-c1463a29 :id="`fnref-${e.node.id}`" :class="`footnote-reference`" @click="n"><span :href="t" :title="`查看脚注 ${e.node.id}`" :class="`footnote-link cursor-pointer`">{{ `[`+toDisplayString(e.node.id)+`]` }}</span></sup>
</template>

<script setup>
import { toDisplayString } from 'vue';
import { S_href as href, S_t as t } from '../shared.js';
const e = defineProps({
      node: {}
    });

// [setup 还原] 原组件 setup 里初值不依赖 IPC 的声明
function n() {
  if (typeof document > `u`) return;
  let e = document.querySelector(t);
  e ? e.scrollIntoView({
    behavior: `smooth`
  }) : console.warn(`Element with href: ${t} not found`);
}
</script>

<style>
/* 从原应用 CSS 恢复（data-v-c1463a29） */
[data-v-c1463a29]{font-size:.75em;line-height:0}
[data-v-c1463a29]{color:var(--link-color);text-decoration:none}
[data-v-c1463a29]:hover{text-decoration:underline}
</style>
