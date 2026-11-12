<template>
<dt data-v-c1b2a2e8><component :is="s$" :index-key="`definition-term-${t.indexKey}-${i}`" :nodes="r.term" :custom-id="t.customId" :typewriter="t.typewriter" @copy="t=>e.$emit(`copy`,t)" /></dt><dd><component :is="s$" :index-key="`definition-desc-${t.indexKey}-${i}`" :nodes="r.definition" :custom-id="t.customId" :typewriter="t.typewriter" @copy="t=>e.$emit(`copy`,t)" /></dd>
</template>

<script setup>
import dd from './SelectTrigger.vue';
import { S_is as is, S_s$ as s$, S_r as r, S_i as i, S_dt as dt } from '../shared.js';
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
/* 从原应用 CSS 恢复（data-v-c1b2a2e8） */
[data-v-c1b2a2e8]{margin:0 0 1rem}
[data-v-c1b2a2e8]{margin-top:var(--ms-flow-definition-term-mt);font-weight:600}
[data-v-c1b2a2e8]{margin-left:var(--ms-flow-definition-desc-ml);margin-bottom:var(--ms-flow-definition-desc-mb)}
[data-v-c1b2a2e8] .markdown-renderer{content-visibility:visible;contain:content;contain-intrinsic-size:0px 0px}
</style>
