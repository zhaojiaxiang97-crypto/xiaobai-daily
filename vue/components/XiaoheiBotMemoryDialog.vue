<template>
<article data-v-f137fce8 :class="`memory-card`" role="listitem" :data-memory-id="e.id"><p>{{ e.content }}</p><div><div><component :is="Pp" variant="secondary" /><span>{{ y(e.updatedAt) }}</span></div><div><component :is="P" variant="ghost" size="icon-xs" :disabled="c.value" :aria-label="r(`xiaoheiBot.memory.edit`)" @click="t=>x(e)" /><component :is="P" variant="ghost" size="icon-xs" :disabled="c.value" :aria-label="r(`xiaoheiBot.memory.delete`)" @click="t=>p.value=e" /></div></div></article>
</template>

<script setup>
import Pp from './Badge.vue';
import { S_is as is, S_xs as xs, S_e as e, S_r as r, S_c as c, S_p as p, S_y as y, S_x as x, S_P as P } from '../shared.js';
const row = defineProps({});
const t = row;
</script>

<style>
/* 从原应用 CSS 恢复（data-v-f137fce8） */
[data-v-f137fce8]{flex-direction:row;flex-shrink:0;justify-content:space-between;align-items:center;gap:12px;padding:16px}
[data-v-f137fce8]{scrollbar-width:thin;flex-direction:column;flex:1;gap:12px;min-height:0;padding:4px 12px 16px;display:flex;overflow-y:auto}
[data-v-f137fce8]{background:var(--background);border-radius:12px;padding:12px 14px}
[data-v-f137fce8]{flex-shrink:0;justify-content:space-between;align-items:center;gap:8px;padding:12px 16px;display:flex}
</style>
