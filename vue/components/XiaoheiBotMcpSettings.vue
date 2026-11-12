<template>
<div data-v-9c2a03ce><div><span><span v-text="E(`count`,{count:n.servers.length})" /></span><div><component :is="P" variant="ghost" size="icon-xs" :disabled="i" :aria-label="E(`refresh`)" :title="E(`refresh`)" @click="g" /><component :is="P" size="sm" :disabled="!r||s" @click="y" /></div></div><component :is="uc" variant="destructive" /><p>{{ E(`permission`) }}</p><component :is="Dp" size="sm" :class="`mcp-card`" /><component :is="EO" :class="`min-h-40 border-0`" /></div>
</template>

<script setup>
import uc from './Alert.vue';
import Dp from './Card.vue';
import EO from './Empty.vue';
// [符号说明] n~computed
import { S_is as is, S_xs as xs, S_sm as sm, S_n as n, S_r as r, S_i as i, S_s as s, S_p as p, S_g as g, S_v as v, S_y as y, S_E as E, S_P as P } from '../shared.js';
</script>

<style>
/* 从原应用 CSS 恢复（data-v-9c2a03ce） */
[data-v-9c2a03ce]{flex-direction:column;gap:12px;min-width:0;display:flex}
[data-v-9c2a03ce],.mcp-service-header[data-v-9c2a03ce]{justify-content:space-between;align-items:center;gap:10px;min-width:0;display:flex}
[data-v-9c2a03ce]{box-shadow:none;--tw-ring-color:transparent;background:color-mix(in srgb, var(--muted) 38%, var(--background));border:0}
[data-v-9c2a03ce]{background:var(--muted);border-radius:10px;flex:none;justify-content:center;align-items:center;width:32px;height:32px;display:flex}
[data-v-9c2a03ce]{resize:none;field-sizing:fixed;min-height:64px;max-height:120px;font-family:ui-monospace,monospace;font-size:12px;overflow:auto}
[data-v-9c2a03ce]{min-height:180px;max-height:260px}
[data-v-9c2a03ce]{align-items:center;gap:5px;display:inline-flex}
[data-v-9c2a03ce]{background:var(--muted-foreground);border-radius:50%;width:6px;height:6px}
[data-v-9c2a03ce]{background:#16a34a}
[data-v-9c2a03ce]{background:#d97706}
[data-v-9c2a03ce]{background:var(--destructive)}
[data-v-9c2a03ce]{opacity:.65}
[data-v-9c2a03ce]{border-top:1px solid var(--border);max-height:240px;padding-top:10px;overflow:auto}
</style>
