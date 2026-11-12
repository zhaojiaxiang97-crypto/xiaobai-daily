<template>
<component data-v-af3ce037 :is="Be(r[n.type])" :index-key="`${e.indexKey||`strong`}-${i}`" :node="n" :custom-id="t.customId" />
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
/* 从原应用 CSS 恢复（data-v-af3ce037） */
[data-v-af3ce037]{font-weight:700}
</style>
