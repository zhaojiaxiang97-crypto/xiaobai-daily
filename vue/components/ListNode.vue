<template>
<component data-v-c145570b :is="Be(e.node.ordered?`ol`:`ul`)" :class="[`list-node`,{'list-decimal':e.node.ordered,'list-disc':!e.node.ordered}]" />
</template>

<script setup>
import ol from './CalendarHeadCell.vue';
import ul from './CalendarPrev.vue';
import { S_is as is, S_Be as Be } from '../shared.js';
const e = defineProps({
    node: {},
    customId: {},
    indexKey: {},
    typewriter: {
      type: Boolean
    },
    showTooltips: {
      type: Boolean
    }
  });
</script>

<style>
/* 从原应用 CSS 恢复（data-v-c145570b） */
[data-v-c145570b]{margin-top:var(--ms-flow-list-y);margin-bottom:var(--ms-flow-list-y);padding-left:var(--ms-flow-list-indent)}
[data-v-c145570b]{list-style-type:decimal}
[data-v-c145570b]{list-style-type:disc}
[data-v-c145570b]{padding-left:var(--ms-flow-list-indent-mobile);margin-top:1.33333em;margin-bottom:1.33333em}
</style>
