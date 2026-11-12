<template>
<article data-v-548a02c5 :class="[`share-import-task`,{'is-removed':!o.keep[n]}]"><div><strong>{{ t.name }}</strong><p>{{ toDisplayString(t.schedule)+` · `+toDisplayString(a(`roleShare.offByDefault`)) }}</p><p>{{ t.instruction }}</p></div><component :is="P" type="button" variant="ghost" size="sm" :class="`shrink-0`" :disabled="e.busy" @click="e=>o.keep[n]=!o.keep[n]" /></article>
</template>

<script setup>
import { toDisplayString } from 'vue';
import { S_is as is, S_sm as sm, S_t as t, S_a as a, S_o as o, S_p as p, S_P as P } from '../shared.js';
const e = defineProps({});
const n = e;
</script>

<style>
/* 从原应用 CSS 恢复（data-v-548a02c5） */
[data-v-548a02c5]{border-bottom:1px solid var(--border);flex:none;padding:18px 52px 12px 20px;position:relative}
[data-v-548a02c5]{position:absolute;top:14px;right:14px}
[data-v-548a02c5]{overscroll-behavior:contain;flex:1;min-height:0;padding:18px 20px 22px;overflow:hidden auto}
[data-v-548a02c5]{border:1px solid var(--border);color:#25352d;border-radius:50%;justify-content:center;align-items:center;width:64px;height:64px;margin:0 auto 16px;font-size:24px;display:flex}
[data-v-548a02c5]{resize:vertical;min-height:150px;max-height:280px;line-height:1.6}
[data-v-548a02c5]{flex-wrap:wrap;gap:8px;display:flex}
[data-v-548a02c5]{background:var(--muted);height:30px;color:var(--muted-foreground);cursor:pointer;border-radius:999px;padding:0 12px;font-size:12.5px}
[data-v-548a02c5]:hover:not(:disabled){color:var(--foreground)}
[data-v-548a02c5]{background:var(--foreground);color:var(--background)}
[data-v-548a02c5]:focus-visible{outline:2px solid var(--ring);outline-offset:2px}
[data-v-548a02c5]{flex-wrap:wrap;gap:6px;margin-bottom:8px;display:flex}
[data-v-548a02c5]{background:var(--muted);border-radius:999px;align-items:center;gap:2px;max-width:100%;height:26px;padding:0 4px 0 10px;font-size:12.5px;display:inline-flex}
[data-v-548a02c5]{width:18px;height:18px;color:var(--muted-foreground);cursor:pointer;border-radius:50%;place-items:center;display:grid}
[data-v-548a02c5]:hover:not(:disabled){background:var(--accent);color:var(--foreground)}
[data-v-548a02c5]{background:var(--muted);border-radius:12px;align-items:flex-start;gap:10px;margin-top:6px;padding:10px 10px 10px 12px;font-size:13px;display:flex}
[data-v-548a02c5]{opacity:.45}
[data-v-548a02c5]{text-decoration:line-through}
[data-v-548a02c5]{color:var(--muted-foreground);white-space:pre-wrap;overflow-wrap:anywhere;-webkit-line-clamp:3;-webkit-box-orient:vertical;margin-top:6px;font-size:12px;line-height:1.6;display:-webkit-box;overflow:hidden}
[data-v-548a02c5]{color:var(--muted-foreground);margin-top:4px;font-size:12px;line-height:1.6}
[data-v-548a02c5]{border-top:1px solid var(--border);flex-shrink:0;justify-content:flex-end;align-items:center;gap:12px;min-height:58px;padding:11px 16px;display:flex}
</style>
