<template>
<span data-v-d3083d4b :class="`leaderboard-avatar`" :style="o?.value"><img :src="e.avatarUrl" alt="" draggable="false" @error="e=>r=true" /></span>
</template>

<script setup>
import { S_alt as alt, S_at as at } from '../shared.js';
const e = defineProps({
      name: {},
      avatarUrl: {},
      colorKey: {},
      size: {
        default: 32
      }
    });
const t = e;

// [兜底] 模板引用但无来源的符号
const o = { value: undefined };
import { ref } from 'vue';

// [setup 还原] 原组件 setup 里初值不依赖 IPC 的声明
let r = ref(false);
</script>

<style>
/* 从原应用 CSS 恢复（data-v-d3083d4b） */
[data-v-d3083d4b]{background:var(--avatar-bg);color:var(--avatar-fg);-webkit-user-select:none;user-select:none;border-radius:999px;flex-shrink:0;justify-content:center;align-items:center;font-weight:650;line-height:1;display:inline-flex;overflow:hidden}
[data-v-d3083d4b]{object-fit:cover;width:100%;height:100%}
[data-v-d3083d4b]{color:#9ca3af;background:#2b3137}
</style>
