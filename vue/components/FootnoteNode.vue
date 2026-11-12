<template>
<div :id="`fnref--${e.node.id}`" :class="`footnote-node flex text-sm leading-relaxed border-t border-[var(--footnote-border)] pt-2`"><div><component :is="s$" :index-key="`footnote-${t.indexKey}`" :nodes="t.node.children" :custom-id="t.customId" :typewriter="t.typewriter" @copy="e=>n.$emit(`copy`,e)" /></div></div>
</template>

<script setup>
import { S_is as is, S_sm as sm, S_s$ as s$, S_n as n } from '../shared.js';
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
