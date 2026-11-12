<template>
<article data-v-76153233 :class="`rounded-xl bg-muted/60 p-3`"><strong>{{ e.name }}</strong><p>{{ toDisplayString(e.schedule)+` · `+toDisplayString(o(`roleShare.offByDefault`)) }}</p><p>{{ e.instruction }}</p></article>
</template>

<script setup>
import { toDisplayString } from 'vue';
import xl from './MenuRadioItem.vue';
import { S_o as o, S_p as p } from '../shared.js';
const e = defineProps({});
const n = e;
</script>

<style>
/* 从原应用 CSS 恢复（data-v-76153233） */
[data-v-76153233]{scrollbar-width:none;flex:1;min-height:0;padding:36px 18px 24px;overflow-y:auto}
[data-v-76153233]::-webkit-scrollbar{display:none}
[data-v-76153233]{overflow-wrap:anywhere;overscroll-behavior:contain;min-width:0;overflow-x:hidden}
[data-v-76153233]{padding:18px 14px 24px}
[data-v-76153233]{border-bottom:1px solid var(--border);flex:0 0 58px;justify-content:center;align-items:center;padding:0 48px;display:flex;position:relative}
[data-v-76153233]{position:absolute;left:12px}
[data-v-76153233]{width:52px!important;height:52px!important;font-size:20px!important}
[data-v-76153233]{margin-top:24px}
[data-v-76153233]{color:var(--muted-foreground);margin-bottom:6px;padding:0 7px;font-size:12px;font-weight:400}
[data-v-76153233]{background:var(--muted);overflow-wrap:anywhere;border-radius:12px;padding:13px;font-size:13px;line-height:21px}
[data-v-76153233]{background:var(--muted);border-radius:12px;overflow:hidden}
[data-v-76153233]{border-top:1px solid var(--border)}
[data-v-76153233]{cursor:pointer;justify-content:space-between;align-items:center;gap:12px;padding:14px 12px;font-size:12px;list-style:none;display:flex}
[data-v-76153233]::-webkit-details-marker{display:none}
[data-v-76153233]{color:var(--muted-foreground);flex-shrink:0}
[data-v-76153233]{transform:rotate(90deg)}
[data-v-76153233]{color:var(--muted-foreground);padding:0 12px 14px;font-size:12px;line-height:20px}
[data-v-76153233]{text-align:center}
[data-v-76153233]{border:1px solid var(--border);color:#25352d;border-radius:50%;justify-content:center;align-items:center;width:74px;height:74px;margin:0 auto;font-size:26px;display:flex}
[data-v-76153233]{overflow-wrap:anywhere;-webkit-line-clamp:3;-webkit-box-orient:vertical;margin:8px 12px 0;font-size:12px;line-height:20px;display:-webkit-box;overflow:hidden}
[data-v-76153233]{background:var(--muted);border-radius:13px;margin-top:24px;overflow:hidden}
[data-v-76153233]{text-align:left;cursor:pointer;justify-content:space-between;align-items:center;gap:12px;width:100%;min-height:62px;padding:11px 13px;display:flex}
[data-v-76153233]{border-top:1px solid var(--border)}
[data-v-76153233]:hover{background:var(--accent)}
[data-v-76153233]:focus-visible{outline:2px solid var(--ring);outline-offset:-2px}
[data-v-76153233]{font-size:13px;font-weight:600;display:block}
[data-v-76153233]{color:var(--muted-foreground);text-overflow:ellipsis;white-space:nowrap;margin-top:2px;font-size:12px;display:block;overflow:hidden}
[data-v-76153233]{border-top:1px solid var(--border);flex-shrink:0;justify-content:flex-end;align-items:center;gap:12px;min-height:58px;padding:11px 14px;display:flex}
</style>
