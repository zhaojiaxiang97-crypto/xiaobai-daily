<template>
<component data-v-6dc1e3ba :is="Be(r[n.type])" :node="n" :custom-id="t.customId" :index-key="`${e.indexKey||`superscript`}-${i}`" />
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
/* 从原应用 CSS 恢复（data-v-6dc1e3ba） */
[data-v-6dc1e3ba]{vertical-align:super;font-size:.8em}
</style>
