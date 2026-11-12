<template>
<span data-v-d3083d4b :class="`leaderboard-avatar`" :style="at(o.value)"><img :src="e.avatarUrl" alt="" draggable="false" @error="e=>r.value=true" /></span>
</template>

<script setup>
import { S_alt as alt, S_r as r, S_o as o, S_at as at } from '../shared.js';
const e = defineProps({
      name: {},
      avatarUrl: {},
      colorKey: {},
      size: {
        default: 32
      }
    });
const t = e;
</script>

<style>
/* 从原应用 CSS 恢复（data-v-d3083d4b） */
[data-v-d3083d4b]{background:var(--avatar-bg);color:var(--avatar-fg);-webkit-user-select:none;user-select:none;border-radius:999px;flex-shrink:0;justify-content:center;align-items:center;font-weight:650;line-height:1;display:inline-flex;overflow:hidden}
[data-v-d3083d4b]{object-fit:cover;width:100%;height:100%}
[data-v-d3083d4b]{color:#9ca3af;background:#2b3137}
</style>
