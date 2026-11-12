<template>
<component data-v-36e74e6b :is="Be(r[n.type])" :node="n" :custom-id="t.customId" :index-key="`${e.indexKey||`highlight`}-${i}`" />
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
/* 从原应用 CSS 恢复（data-v-36e74e6b） */
[data-v-36e74e6b]{background-color:var(--highlight-bg);border-radius:.2em;padding:0 .2rem}
</style>
