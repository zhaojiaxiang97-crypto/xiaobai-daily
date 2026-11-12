<template>
<component data-v-8264674d :is="Be(r[n.type])" :node="n" :custom-id="t.customId" :index-key="`${e.indexKey||`emphasis`}-${i}`" />
</template>

<script setup>
import { S_is as is, S_n as n, S_r as r, S_i as i, S_Be as Be } from '../shared.js';
const e = defineProps({
      node: {},
      customId: {},
      indexKey: {}
    });
const t = e;
</script>

<style>
/* 从原应用 CSS 恢复（data-v-8264674d） */
[data-v-8264674d]{font-style:italic}
</style>
