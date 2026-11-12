<template>
<div data-v-a6f2005a role="radio" tabindex="0" :aria-checked="pe===e" :class="[`cursor-pointer rounded-[10px] border px-4 py-3 transition-colors`,pe===e?`border-primary bg-primary/[0.03] ring-1 ring-primary/20`:`border-black/[0.08] hover:border-black/15 dark:border-white/10`]" @click="t=>pe.value=e" @keydown="xt(withDirectives(t=>pe.value=e,[`prevent`]),[`enter`])"><div><span :class="[`flex size-3.5 shrink-0 items-center justify-center rounded-full border`,pe===e?`border-primary`:`border-black/25 dark:border-white/30`]"><span></span></span><span>{{ e===`chat`?o(`generateReport.chatOutput`):o(`generateReport.directOutput`) }}</span></div><p>{{ e===`chat`?o(`generateReport.chatOutputDesc`):o(`reportCc.summary.directHint`) }}</p><div></div></div>
</template>

<script setup>
import { withDirectives } from 'vue';
import { S_px as px, S_e as e, S_t as t, S_o as o, S_p as p, S_pe as pe, S_xt as xt } from '../shared.js';
</script>

<style>
/* 从原应用 CSS 恢复（data-v-a6f2005a） */
[data-v-a6f2005a] .markdown-body{color:#555;font-size:13px;line-height:1.7}
[data-v-a6f2005a] .markdown-body h1,.cc-template-preview[data-v-a6f2005a] .markdown-body h2{margin:14px 0 6px;font-size:14px;font-weight:600;line-height:1.5}
[data-v-a6f2005a] .markdown-body h3,.cc-template-preview[data-v-a6f2005a] .markdown-body h4{margin:10px 0 4px;font-size:13px;font-weight:600;line-height:1.5}
[data-v-a6f2005a] .markdown-body>:first-child{margin-top:0}
[data-v-a6f2005a] .markdown-body p,.cc-template-preview[data-v-a6f2005a] .markdown-body li{margin:2px 0;font-size:13px;line-height:1.7}
[data-v-a6f2005a] .markdown-body ul,.cc-template-preview[data-v-a6f2005a] .markdown-body ol{margin:2px 0 6px}
</style>
