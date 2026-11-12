<template>
<div data-v-67f1b87f><component :is="Xs" :class="`lb-celebrate-icon`" :size="14" /><p>{{ e.message }}</p><button type="button" :class="`lb-celebrate-action`" @click="e=>n(`share`)">{{ r(`leaderboard.celebrate.action`) }}</button><button type="button" :class="`lb-celebrate-close`" :aria-label="r(`leaderboard.celebrate.dismiss`)" @click="e=>n(`dismiss`)"><component :is="Nt" :size="13" /></button></div>
</template>

<script setup>
// [符号说明] n~computed
import { S_is as is, S_Xs as Xs, S_n as n, S_r as r, S_p as p, S_Nt as Nt } from '../shared.js';
const e = defineProps({
      message: {}
    });
</script>

<style>
/* 从原应用 CSS 恢复（data-v-67f1b87f） */
[data-v-67f1b87f]{color:#065f46;background:#10b98114;border-radius:10px;align-items:center;gap:8px;padding:8px 10px 8px 14px;font-size:12px;display:flex}
[data-v-67f1b87f]{color:#a7f3d0;background:#34d3991a}
[data-v-67f1b87f]{color:#10b981;flex-shrink:0}
[data-v-67f1b87f]{flex:1;min-width:0;font-weight:500}
[data-v-67f1b87f]{background:var(--primary);height:24px;color:var(--primary-foreground);cursor:pointer;border:0;border-radius:6px;flex-shrink:0;padding:0 10px;font-size:12px;font-weight:500}
[data-v-67f1b87f]:hover{opacity:.9}
[data-v-67f1b87f]{color:inherit;opacity:.55;cursor:pointer;background:0 0;border:0;border-radius:6px;flex-shrink:0;padding:4px;display:inline-flex}
[data-v-67f1b87f]:hover{opacity:1;background:#0000000d}
</style>
