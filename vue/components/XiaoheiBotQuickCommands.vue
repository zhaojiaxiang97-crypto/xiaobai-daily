<template>
<component data-v-2fd624c9 :is="Nr" :class="`quick-command-item`" @select="t=>i(`select`,a(`xiaoheiBot.quickCommands.${e.key}.prompt`))" />
</template>

<script setup>
import { S_is as is, S_e as e, S_t as t, S_i as i, S_a as a, S_Nr as Nr } from '../shared.js';
</script>

<style>
/* 从原应用 CSS 恢复（data-v-2fd624c9） */
[data-v-2fd624c9]{width:28px;height:28px;color:var(--muted-foreground);cursor:pointer;background:0 0;border:0;border-radius:7px;place-items:center;padding:0;display:grid}
[data-v-2fd624c9]:hover,.quick-command-trigger[data-state=open][data-v-2fd624c9]{background:var(--muted);color:var(--foreground)}
[data-v-2fd624c9]:disabled{opacity:.45;cursor:not-allowed}
[data-v-2fd624c9]:focus-visible{outline:2px solid var(--ring);outline-offset:2px}
[data-v-2fd624c9]{cursor:pointer;border-radius:7px;align-items:center;gap:10px;padding:9px 8px;display:flex}
[data-v-2fd624c9]{background:var(--muted);width:28px;height:28px;color:var(--muted-foreground);border-radius:7px;flex-shrink:0;place-items:center;display:grid}
[data-v-2fd624c9]{flex-direction:column;gap:3px;min-width:0;display:flex}
[data-v-2fd624c9]{font-size:12px;font-weight:500;line-height:1.5}
[data-v-2fd624c9]{color:var(--muted-foreground);font-size:11px;line-height:1.4}
</style>
