<template>
<sup data-v-c1463a29 :id="`fnref-${e.node.id}`" :class="`footnote-reference`" @click="n"><span :href="t" :title="`查看脚注 ${e.node.id}`" :class="`footnote-link cursor-pointer`">{{ `[`+toDisplayString(e.node.id)+`]` }}</span></sup>
</template>

<script setup>
import { toDisplayString } from 'vue';
// [符号说明] n~computed
import { S_href as href, S_t as t, S_n as n } from '../shared.js';
const e = defineProps({
      node: {}
    });
</script>

<style>
/* 从原应用 CSS 恢复（data-v-c1463a29） */
[data-v-c1463a29]{font-size:.75em;line-height:0}
[data-v-c1463a29]{color:var(--link-color);text-decoration:none}
[data-v-c1463a29]:hover{text-decoration:underline}
</style>
