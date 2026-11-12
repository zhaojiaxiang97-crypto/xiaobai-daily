<template>
<component data-v-4fd46b7e :is="wt" enter-active-class="transition duration-200 ease-out" enter-from-class="opacity-0 translate-y-2" leave-active-class="transition duration-150 ease-in" leave-to-class="opacity-0 translate-y-2" />
</template>

<script setup>
import { S_to as to, S_is as is, S_out as out, S_y as y, S_wt as wt } from '../shared.js';
</script>

<style>
/* 从原应用 CSS 恢复（data-v-4fd46b7e） */
[data-v-4fd46b7e]{z-index:40;border:1px solid color-mix(in srgb, var(--border) 78%, transparent);background:var(--popover);width:340px;box-shadow:0 12px 36px color-mix(in srgb, var(--foreground) 14%, transparent);font-family:var(--font-sans);border-radius:14px;align-items:center;gap:10px;padding:12px 14px;display:flex;position:fixed;bottom:60px;left:12px}
[data-v-4fd46b7e]{border-color:color-mix(in srgb, var(--primary) 45%, transparent);color:var(--primary)}
[data-v-4fd46b7e]:hover{background:color-mix(in srgb, var(--primary) 8%, transparent);color:var(--primary)}
[data-v-4fd46b7e]{border:1px solid color-mix(in srgb, var(--border) 78%, transparent);background:var(--popover);width:22px;height:22px;color:var(--muted-foreground);cursor:pointer;box-shadow:0 2px 6px color-mix(in srgb, var(--foreground) 10%, transparent);border-radius:999px;justify-content:center;align-items:center;transition:color .15s;display:flex;position:absolute;top:-8px;right:-8px}
[data-v-4fd46b7e]:hover{color:var(--foreground)}
</style>
