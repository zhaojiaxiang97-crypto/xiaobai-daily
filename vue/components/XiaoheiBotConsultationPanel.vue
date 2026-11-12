<template>
<aside data-v-06e8b278 :class="`consultation-side-panel`" :aria-label="i(`xiaoheiBot.consultation.records`)"><header><div><div><strong>{{ u.value.consultation.ownerName }}</strong><component :is="pa" :size="13" aria-hidden="true" /><strong>{{ u.value.consultation.targetName }}</strong></div><div><span :class="[`consultation-side-status consultation-side-tag`,{'text-primary':v.value||u.value.consultation.status===`completed`}]"><component :is="zn" :size="12" :class="`animate-spin`" /><span><span v-text="i(`xiaoheiBot.consultation.${u.value.consultation.status}`)" /></span></span><span>{{ i(`xiaoheiBot.consultation.records`) }}</span></div></div><component :is="P" variant="ghost" size="icon-sm" :class="`shrink-0`" :aria-label="i(`app.close`)" @click="e=>r(`close`)" /></header><div ref="p" :class="`consultation-side-scroll`" @scroll="x"><div ref="m" :class="`consultation-side-transcript`"><p>{{ P5({status:`failed`,errorMessage:f.value},i) }}<component :is="P" variant="ghost" size="sm" :disabled="d.value" @click="e=>C()" /></p><div><component :is="zn" :size="20" :class="`animate-spin`" /><span>{{ i(`xiaoheiBot.consultation.loading`) }}</span></div><component :is="P" variant="ghost" size="sm" :class="`self-center text-xs`" :disabled="d.value" @click="e=>{h.value=false,C(true);}" /><p><span v-text="P5({status:`failed`,errorMessage:u.value.consultation.error},i)" /></p></div></div></aside>
</template>

<script setup>
// [符号说明] u=useConfigProviderContext, f=useConfigProviderContext
import { S_pa as pa, S_is as is, S_xs as xs, S_sm as sm, S_e as e, S_r as r, S_i as i, S_u as u, S_d as d, S_f as f, S_p as p, S_m as m, S_v as v, S_x as x, S_C as C, S_P as P, S_zn as zn } from '../shared.js';
</script>

<style>
/* 从原应用 CSS 恢复（data-v-06e8b278） */
[data-v-06e8b278]{border:1px solid var(--border);background:var(--background);border-radius:12px;flex-direction:column;flex:0 0 360px;width:360px;min-width:0;min-height:0;margin-top:56px;display:flex;overflow:hidden}
[data-v-06e8b278]{border-bottom:1px solid var(--border);flex-shrink:0;align-items:center;gap:8px;min-height:66px;padding:11px 12px 11px 14px;display:flex}
[data-v-06e8b278]{flex-direction:column;flex:1;gap:7px;min-width:0;display:flex}
[data-v-06e8b278]{align-items:center;gap:6px;min-width:0;font-size:14px;line-height:20px;display:flex}
[data-v-06e8b278]{text-overflow:ellipsis;white-space:nowrap;min-width:0;font-weight:600;overflow:hidden}
[data-v-06e8b278]{color:var(--muted-foreground);flex-shrink:0}
[data-v-06e8b278]{align-items:center;gap:6px;display:flex}
[data-v-06e8b278]{align-items:center;gap:5px;font-size:11px;display:inline-flex}
[data-v-06e8b278]{color:var(--primary)}
[data-v-06e8b278]{border:1px solid var(--border);color:var(--muted-foreground);white-space:nowrap;border-radius:4px;align-self:flex-start;padding:2px 5px;font-size:10px;line-height:14px}
[data-v-06e8b278]{overscroll-behavior:contain;flex:1;min-height:0;overflow-y:auto}
[data-v-06e8b278]{flex-direction:column;gap:20px;padding:18px 14px;display:flex}
[data-v-06e8b278]{color:var(--muted-foreground);justify-content:center;align-items:center;gap:8px;padding:40px 0;font-size:12px;display:flex}
[data-v-06e8b278]{align-items:flex-start;gap:7px;display:flex}
[data-v-06e8b278]{flex-direction:row-reverse}
[data-v-06e8b278]{flex-direction:column;flex:0 0 28px;justify-content:flex-end;align-self:stretch;min-height:28px;margin-bottom:19px;display:flex}
[data-v-06e8b278]{flex:0 0 28px;width:28px;height:28px;display:flex;position:sticky;bottom:12px}
[data-v-06e8b278]{background:var(--muted);border-radius:9px;flex-shrink:0;place-items:center;width:28px;height:28px;font-size:12px;display:grid;overflow:hidden}
[data-v-06e8b278]{object-fit:cover;width:100%;height:100%}
[data-v-06e8b278]{flex-direction:column;align-items:flex-start;gap:5px;min-width:0;max-width:calc(100% - 35px);display:flex}
[data-v-06e8b278]{align-items:flex-end}
[data-v-06e8b278]{color:var(--muted-foreground);font-size:11px}
[data-v-06e8b278]{background:var(--muted);overflow-wrap:anywhere;border-radius:3px 11px 11px;min-width:0;max-width:100%;padding:9px 11px}
[data-v-06e8b278]{background:color-mix(in srgb, var(--primary) 9%, var(--background));border-radius:11px 3px 11px 11px}
[data-v-06e8b278] .markdown-body{font-size:13px;line-height:1.7}
[data-v-06e8b278] pre{max-width:100%;overflow-x:auto}
[data-v-06e8b278]{color:var(--muted-foreground);opacity:.75;font-size:10px;line-height:14px}
[data-v-06e8b278]{z-index:10;width:min(360px,100%);height:calc(100% - 56px);margin-top:0;position:absolute;top:56px;right:0;box-shadow:-8px 0 24px #0000000d}
[data-v-06e8b278]{animation:none}
</style>
