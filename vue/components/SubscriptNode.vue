<template>
<component data-v-69de9b81 :is="Be(r[n.type])" :node="n" :custom-id="t.customId" :index-key="`${e.indexKey||`subscript`}-${i}`" />
</template>

<script setup>
// [符号说明] n~computed
import { S_is as is, S_n as n, S_r as r, S_i as i, S_Be as Be } from '../shared.js';
const e = defineProps({
      node: {},
      customId: {},
      indexKey: {}
    });
const t = e;
</script>

<style>
/* 从原应用 CSS 恢复（data-v-69de9b81） */
[data-v-69de9b81]{vertical-align:sub;font-size:.8em}
</style>
