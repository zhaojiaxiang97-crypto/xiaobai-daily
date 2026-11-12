<template>
<div data-v-a55ea416><div><div><div><button type="button" :class="({'is-active':d.value===`global`})" @click="e=>Ke(`global`)"><component :is="bo" :size="13" />{{ i(`leaderboard.scope.global`) }}</button><button type="button" :class="({'is-active':d.value===`friends`})" @click="e=>Ke(`friends`)"><component :is="oc" :size="13" />{{ i(`leaderboard.scope.friends`) }}</button></div><div></div></div><div><div><button type="button" :class="`lb-icon-button`" :aria-label="i(`leaderboard.prevAria`)" @click="e=>We(-1)"><component :is="Qt" :size="15" /></button><component :is="CP" :modelValue="l.value" @update:modelvalue="e=>l.value=e" :label="i(`common.selectDate`)" mode="date" align="end" :max-date="c.value" /><button type="button" :class="`lb-icon-button`" :aria-label="i(`leaderboard.nextAria`)" :disabled="ae.value" @click="e=>We(1)"><component :is="dn" :size="15" /></button></div><button type="button" :class="`lb-chip-button`" @click="Ge"><span v-text="i(`leaderboard.backToCurrent.${u.value}`)" /></button><button type="button" :class="`lb-icon-button`" :aria-label="i(`leaderboard.refresh`)" :title="i(`leaderboard.refresh`)" :disabled="g.value" @click="e=>Pe()"><component :is="zn" :size="14" :class="`animate-spin`" /></button><component :is="An" /></div></div><div><component :is="zn" :size="18" :class="`animate-spin`" />{{ ` `+toDisplayString(i(`common.loading`)) }}</div><component :is="Tgt" :open="w.value" @update:open="e=>w.value=e" :context="Me.value" /><component :is="zy" :open="T.value" @update:open="e=>T.value=e" context="leaderboard" @added="Xe" /><component :is="ui" :open="S.value" @update:open="e=>S.value=e" /><component :is="_i" :open="C.value" @update:open="e=>C.value=e" /></div>
</template>

<script setup>
import { toDisplayString } from 'vue';
import zy from './FriendManagerDialog.vue';
import CP from './DateTimePickerField.vue';
import Tgt from './LeaderboardShareDialog.vue';
// [符号说明] u=useConfigProviderContext
import { S_bo as bo, S_is as is, S_oc as oc, S_e as e, S_i as i, S_c as c, S_l as l, S_u as u, S_d as d, S_g as g, S_v as v, S_S as S, S_C as C, S_w as w, S_T as T, S_ae as ae, S_Me as Me, S_Pe as Pe, S_We as We, S_Ge as Ge, S_Ke as Ke, S_Xe as Xe, S_Qt as Qt, S_dn as dn, S_An as An, S_zn as zn, S_ui as ui, S__i as _i } from '../shared.js';
</script>

<style>
/* 从原应用 CSS 恢复（data-v-a55ea416） */
[data-v-a55ea416]{flex-wrap:wrap;justify-content:space-between;align-items:center;gap:10px 16px;display:flex}
[data-v-a55ea416],.lb-toolbar-right[data-v-a55ea416]{flex-wrap:wrap;align-items:center;gap:8px;display:flex}
[data-v-a55ea416]{align-items:flex-start;gap:8px;display:flex}
[data-v-a55ea416]{color:var(--foreground);font-size:14px;font-weight:600}
[data-v-a55ea416]{color:#999;margin-top:4px;font-size:12px}
[data-v-a55ea416]{background:#00000008;border:1px solid #0000000d;border-radius:8px;align-items:center;gap:2px;height:32px;padding:2px;display:inline-flex}
[data-v-a55ea416]{color:#666;cursor:pointer;background:0 0;border:0;border-radius:6px;align-items:center;gap:4px;height:26px;padding:0 10px;font-size:12px;transition:background .14s,color .14s,box-shadow .14s;display:inline-flex}
[data-v-a55ea416]:hover{color:var(--foreground)}
[data-v-a55ea416]{color:#111;background:#fff;font-weight:600;box-shadow:0 1px 2px #00000014}
[data-v-a55ea416]{border-color:var(--border);background:var(--secondary)}
[data-v-a55ea416]{color:var(--muted-foreground)}
[data-v-a55ea416]{color:var(--foreground);background:#2b3137}
[data-v-a55ea416]{align-items:center;gap:4px;display:inline-flex}
[data-v-a55ea416]{border:1px solid var(--border);background:var(--card);color:#666;cursor:pointer;border-radius:7px;justify-content:center;align-items:center;width:28px;height:28px;transition:background .14s,color .14s;display:inline-flex}
[data-v-a55ea416]:hover:not(:disabled){background:var(--muted);color:var(--foreground)}
[data-v-a55ea416]:disabled{cursor:not-allowed;opacity:.4}
[data-v-a55ea416]{color:var(--muted-foreground)}
[data-v-a55ea416]{color:#047857;cursor:pointer;background:#10b9811a;border:0;border-radius:7px;height:28px;padding:0 10px;font-size:12px;font-weight:600}
[data-v-a55ea416]{color:#6ee7b7;background:#34d3991f}
[data-v-a55ea416]{flex-direction:column;gap:14px;display:flex}
[data-v-a55ea416]{justify-content:space-between;align-items:flex-start;gap:12px;display:flex}
[data-v-a55ea416]{color:var(--foreground);font-size:12px;font-weight:600}
[data-v-a55ea416]{color:#999;margin-top:3px;font-size:11px;line-height:1.55}
[data-v-a55ea416]{background:#00000005;border-radius:14px;flex-direction:column;gap:14px;padding:16px 18px 18px;display:flex}
[data-v-a55ea416]{background:var(--card)}
[data-v-a55ea416]{justify-content:space-between;align-items:baseline;gap:12px;display:flex}
[data-v-a55ea416]{color:var(--foreground);font-size:13px;font-weight:650}
[data-v-a55ea416]{color:#aaa;font-size:12px}
[data-v-a55ea416]{color:#999;flex-direction:column;align-items:center;gap:8px;padding:36px 0;font-size:12px;display:flex}
[data-v-a55ea416]{text-align:center;background:#10b9810a;border:1px dashed #10b98159;border-radius:12px;flex-direction:column;align-items:center;gap:8px;padding:28px 16px;display:flex}
[data-v-a55ea416]{padding:16px}
[data-v-a55ea416]{align-items:center;gap:8px;margin-top:2px;display:flex}
[data-v-a55ea416]{color:#059669;background:#10b9811f;border-radius:999px;justify-content:center;align-items:center;width:42px;height:42px;display:inline-flex}
[data-v-a55ea416]{color:var(--foreground);font-size:13px;font-weight:650}
[data-v-a55ea416]{color:#999;max-width:420px;font-size:12px;line-height:1.6}
[data-v-a55ea416]{color:#059669;cursor:pointer;background:0 0;border:0;border-radius:6px;align-self:center;align-items:center;gap:5px;padding:4px 8px;font-size:12px;font-weight:600;display:inline-flex}
[data-v-a55ea416]:hover{background:#10b98114}
[data-v-a55ea416]{color:#34d399}
</style>
