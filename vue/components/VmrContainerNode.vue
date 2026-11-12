<template>
<component data-v-b0a43820 :is="Be((a=n.type,i[a]||RZ))" :custom-id="t.customId" :node="n" :index-key="`${e.indexKey||`vmr-container`}-${r}`" />
</template>

<script setup>
import RZ from './FallbackComponent.vue';
import { S_is as is, S_n as n, S_r as r, S_i as i, S_a as a, S_Be as Be } from '../shared.js';
const e = defineProps({
      node: {},
      indexKey: {},
      isDark: {
        type: Boolean
      },
      typewriter: {
        type: Boolean
      },
      customId: {}
    });
const t = e;
</script>

<style>
/* 从原应用 CSS 恢复（data-v-b0a43820） */
[data-v-b0a43820]{border-radius:var(--ms-radius);border-width:1px;border-left-width:var(--ms-border-width-strong);margin-top:1rem;margin-bottom:1rem;padding:1rem}
</style>
