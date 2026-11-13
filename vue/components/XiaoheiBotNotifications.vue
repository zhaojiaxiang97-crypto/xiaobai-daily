<template>
<section data-v-4794d21a><header><div><component :is="P" variant="ghost" size="icon-sm" :class="`shrink-0`" :aria-label="n(`botUi.back`)" :title="n(`botUi.back`)" @click="e=>i(`close`)" /><div><h1>{{ n(`botUi.notifications`) }}</h1><p>{{ n(`botUi.notificationSubtitle`) }}</p></div></div></header><div><div><div><div><h2>{{ n(`botUi.activity`) }}</h2><p>{{ n(`botUi.activityHint`) }}</p></div><component :is="gp" :modelValue="l.value" @update:modelvalue="e=>l.value=e" activation-mode="manual" /></div><div :class="`flex justify-center py-16`" :aria-label="n(`botUi.loadingNotifications`)"><component :is="zn" :size="22" :class="`animate-spin text-muted-foreground`" /></div></div></div></section>
</template>

<script setup>
import gp from './Tabs.vue';
// [符号说明] n~computed, l~computed
import { S_is as is, S_sm as sm, S_h1 as h1, S_h2 as h2, S_e as e, S_n as n, S_i as i, S_l as l, S_p as p, S_P as P, S_zn as zn } from '../shared.js';
</script>

<style>
/* 从原应用 CSS 恢复（data-v-4794d21a） */
[data-v-4794d21a]{background:var(--background);width:100%;height:100%;min-height:0;color:var(--foreground);flex-direction:column;flex:1;display:flex}
[data-v-4794d21a]{min-height:64px;padding:12px 24px;padding-right:calc(20px + var(--xiaohei-bot-window-controls-width,0px));border-bottom:1px solid color-mix(in srgb, var(--border) 65%, transparent);flex-shrink:0;justify-content:space-between;align-items:center;gap:16px;display:flex}
[data-v-4794d21a]{align-items:center;gap:10px;min-width:0;display:flex}
[data-v-4794d21a]{white-space:nowrap;font-size:16px;font-weight:600}
[data-v-4794d21a]{color:var(--muted-foreground);margin-top:3px;font-size:12px}
[data-v-4794d21a]{letter-spacing:-.02em;font-size:22px;font-weight:600}
[data-v-4794d21a]{color:var(--muted-foreground);margin-top:7px;font-size:12px}
[data-v-4794d21a]{flex:1;min-height:0;overflow-y:auto}
[data-v-4794d21a]{width:100%;max-width:840px;margin:0 auto;padding:24px 28px 40px}
[data-v-4794d21a]{flex-wrap:wrap;justify-content:space-between;align-items:flex-end;gap:12px;margin-bottom:28px;display:flex}
[data-v-4794d21a]{color:var(--muted-foreground);align-items:center;gap:8px;margin-bottom:10px;padding:0 12px;font-size:12px;font-weight:500;display:flex}
[data-v-4794d21a]{font-variant-numeric:tabular-nums;opacity:.5;font-size:11px;font-weight:400}
[data-v-4794d21a]{flex-direction:column;gap:10px;display:flex}
[data-v-4794d21a]{border:1px solid var(--border);text-align:left;cursor:pointer;background:0 0;border-radius:12px;align-items:flex-start;gap:12px;width:100%;padding:16px;transition:background .15s,border-color .15s;display:flex;position:relative}
[data-v-4794d21a]{background:color-mix(in srgb, var(--primary) 4%, var(--background))}
[data-v-4794d21a]:hover{background:color-mix(in srgb, var(--muted) 65%, var(--background));border-color:color-mix(in srgb, var(--muted-foreground) 30%, var(--border))}
[data-v-4794d21a]:focus-visible{outline:2px solid var(--ring);outline-offset:2px}
[data-v-4794d21a]{flex-shrink:0;margin-top:1px;position:relative}
[data-v-4794d21a]{border:2px solid var(--background);background:var(--primary);border-radius:50%;width:9px;height:9px;position:absolute;top:-2px;right:-2px}
[data-v-4794d21a]{flex:1;min-width:0}
[data-v-4794d21a]{align-items:center;gap:12px;min-height:20px;margin-bottom:6px;display:flex}
[data-v-4794d21a]{text-overflow:ellipsis;white-space:nowrap;font-size:13px;font-weight:600;overflow:hidden}
[data-v-4794d21a]{color:var(--muted-foreground);background:var(--muted);border-radius:5px;flex-shrink:0;padding:2px 6px;font-size:10px;line-height:1.4}
[data-v-4794d21a]{color:#926019;background:#fff3df}
[data-v-4794d21a]{color:#3f6e9b;background:#eaf2fb}
[data-v-4794d21a]{color:var(--muted-foreground);font-variant-numeric:tabular-nums;opacity:.7;flex-shrink:0;margin-left:auto;font-size:11px}
[data-v-4794d21a]{-webkit-line-clamp:2;white-space:normal;overflow-wrap:anywhere;color:var(--muted-foreground);-webkit-box-orient:vertical;font-size:13px;line-height:1.7;display:-webkit-box;overflow:hidden}
[data-v-4794d21a]{color:color-mix(in srgb, var(--foreground) 78%, var(--muted-foreground))}
[data-v-4794d21a]{color:var(--muted-foreground);opacity:.6;flex-shrink:0;align-self:center;transition:opacity .15s}
[data-v-4794d21a],.bot-notifications__card:focus-visible .bot-notifications__arrow[data-v-4794d21a]{opacity:1}
[data-v-4794d21a]{padding:20px 16px 28px}
[data-v-4794d21a]{padding:14px}
[data-v-4794d21a]{gap:6px}
[data-v-4794d21a]{gap:8px}
[data-v-4794d21a],.bot-notifications__arrow[data-v-4794d21a]{transition:none}
</style>
