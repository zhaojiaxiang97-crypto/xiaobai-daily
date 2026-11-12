<template>
<component data-v-bf120de0 :is="Be(r[n.type])" :custom-id="t.customId" :node="n" :index-key="`${e.indexKey||`heading`}-${i}`" />
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
/* 从原应用 CSS 恢复（data-v-bf120de0） */
[data-v-bf120de0]{font-weight:500;line-height:1.25}
[data-v-bf120de0]{margin-top:0}
[data-v-bf120de0]{font-size:var(--ms-text-h1);line-height:var(--ms-leading-h1);font-weight:var(--ms-weight-h1);margin-top:var(--ms-flow-heading-1-mt);margin-bottom:var(--ms-flow-heading-1-mb)}
[data-v-bf120de0]{font-size:var(--ms-text-h2);line-height:var(--ms-leading-h2);font-weight:var(--ms-weight-h2);margin-top:var(--ms-flow-heading-2-mt);margin-bottom:var(--ms-flow-heading-2-mb)}
[data-v-bf120de0]{font-size:var(--ms-text-h3);line-height:var(--ms-leading-h3);font-weight:var(--ms-weight-h3);margin-top:var(--ms-flow-heading-3-mt);margin-bottom:var(--ms-flow-heading-3-mb)}
[data-v-bf120de0]{font-size:var(--ms-text-h4);font-weight:var(--ms-weight-h4);margin-top:var(--ms-flow-heading-4-mt);margin-bottom:var(--ms-flow-heading-4-mb)}
[data-v-bf120de0]{font-size:var(--ms-text-h5);margin-top:var(--ms-flow-heading-5-mt);margin-bottom:var(--ms-flow-heading-5-mb)}
[data-v-bf120de0]{font-size:var(--ms-text-h6);margin-top:var(--ms-flow-heading-6-mt);margin-bottom:var(--ms-flow-heading-6-mb)}
</style>
