<template>
<component data-v-883980f2 :is="a5" :badge="rW" :year="rW.year" @close="e=>rW.value=null" />
</template>

<script setup>
import a5 from './HeatMapBadgeShareDialog.vue';
import { S_is as is, S_rW as rW, S_e as e } from '../shared.js';
</script>

<style>
/* 从原应用 CSS 恢复（data-v-883980f2） */
[data-v-883980f2]{z-index:40;border:1px solid color-mix(in srgb, var(--border) 78%, transparent);background:var(--popover);width:360px;box-shadow:0 12px 36px color-mix(in srgb, var(--foreground) 14%, transparent);font-family:var(--font-sans);border-radius:14px;align-items:center;gap:10px;padding:12px 14px;display:flex;position:fixed;bottom:16px;right:16px}
[data-v-883980f2]{object-fit:contain;flex:none;width:40px;height:40px}
[data-v-883980f2]{background:color-mix(in srgb, var(--primary) 10%, transparent);width:36px;height:36px;color:var(--primary);border-radius:10px;flex:none;justify-content:center;align-items:center;display:flex}
[data-v-883980f2]{border:1px solid color-mix(in srgb, var(--border) 78%, transparent);background:var(--popover);width:22px;height:22px;color:var(--muted-foreground);cursor:pointer;box-shadow:0 2px 6px color-mix(in srgb, var(--foreground) 10%, transparent);border-radius:999px;justify-content:center;align-items:center;transition:color .15s;display:flex;position:absolute;top:-8px;right:-8px}
[data-v-883980f2]:hover{color:var(--foreground)}
</style>
