<template>
<div data-v-e874d044><div :class="`mt-6 mb-4 relative cursor-pointer group`" :title="r(`profile.changeAvatar`)" @click="Le"><div><img :src="s.avatarUrl" alt="avatar" :class="`w-full h-full object-cover`" /></div><div><component :is="zn" :size="20" :class="`text-white animate-spin`" /></div><span><component :is="v" :size="12" :stroke-width="1.75" /></span></div><h2>{{ s?.nickname||r(`profile.user`) }}</h2><p>{{ s?.jobTitle||s?.email }}</p><div></div><div></div><div><section><div><div><component :is="Ft" :size="14" :stroke-width="1.5" :class="`text-[#999]`" /><h3>{{ r(`profile.insights.footprint`) }}</h3></div><span><span v-text="r(`profile.insights.recentWeeks`,{weeks:SW})" /></span></div><div :class="`profile-heat-grid`" :style="at({gridTemplateColumns:`repeat(${ge.value.columns}, minmax(0, 1fr))`})"></div><div><p>{{ toDisplayString(r(`profile.insights.summaryLine`,{records:_e(he.value.totalRecords),streak:_e(he.value.longestStreak)}))+` ` }}{{ ` · `+toDisplayString(r(`profile.insights.firstRecord`,{date:he.value.firstDate})) }}</p><p><span v-text="r(`profile.insights.reportsLine`,{daily:_e(he.value.reports.daily),weekly:_e(he.value.reports.weekly),monthly:_e(he.value.reports.monthly)})" /></p><p>{{ r(`profile.insights.timeSavedHint`,oW) }}</p></div></section><section><div><div><component :is="ao" :size="14" :stroke-width="1.5" :class="`text-[#999]`" /><h3>{{ r(`profile.account`) }}</h3></div><component :is="P" size="sm" variant="ghost" :class="`h-7 border-0 px-0 text-xs text-primary`" @click="Me" /></div><div><p>{{ toDisplayString(oe.value)+` ` }}<span>{{ r(`profile.active`) }}</span></p><p>{{ le.value }}</p></div><div><div><component :is="sc" :size="14" :stroke-width="1.5" :class="`text-[#999]`" /><span>{{ Fe(counter.value) }}</span><span>{{ r(`profile.creditsUnit`) }}</span></div><div><component :is="P" size="sm" variant="ghost" :class="`h-7 border-0 px-0 text-xs text-primary`" @click="Pe" /><component :is="P" size="sm" variant="ghost" :class="`h-7 border-0 px-0 text-xs text-primary`" @click="Ne" /></div></div></section><component :is="Ip" variant="profile" :user-id="s?.userId??null" :refresh-key="o.refreshKey" @claimed="e=>{L(),u();}" /></div><component :is="ui" :open="y.value" @update:open="e=>y.value=e" /><component :is="ui" :open="E.value" @update:open="e=>E.value=e" /><component :is="gM" :open="w.value" @update:open="e=>w.value=e" @balancechanged="L" /><component :is="_Ge" :open="T.value" @update:open="e=>T.value=e" /></div>
</template>

<script setup>
import { toDisplayString } from 'vue';
import Ip from './CreditCampaignCard.vue';
import gM from './RechargeDialog.vue';
import _Ge from './CreditLedgerDialog.vue';
// [符号说明] u=useConfigProviderContext, Ne~computed
import { S_ao as ao, S_is as is, S_xs as xs, S_sc as sc, S_sm as sm, S_px as px, S_oW as oW, S_SW as SW, S_h2 as h2, S_alt as alt, S_counter as counter, S_e as e, S_r as r, S_o as o, S_s as s, S_u as u, S_p as p, S_v as v, S_y as y, S_w as w, S_T as T, S_E as E, S_oe as oe, S_le as le, S_he as he, S_ge as ge, S__e as _e, S_P as P, S_Me as Me, S_Ne as Ne, S_Pe as Pe, S_at as at, S_mt as mt, S_Ft as Ft, S_zn as zn, S_ui as ui } from '../shared.js';
</script>

<style>
/* 从原应用 CSS 恢复（data-v-e874d044） */
[data-v-e874d044]{height:24px;color:var(--foreground);background:#00000008;border-radius:999px;align-items:center;gap:4px;padding:0 8px 0 2px;font-size:12px;transition:background .14s;display:inline-flex}
[data-v-e874d044]:hover{background:#0000000f}
[data-v-e874d044]{background:#ffffff0f}
[data-v-e874d044]:hover{background:#ffffff1a}
[data-v-e874d044]{grid-template-rows:repeat(7,auto);gap:3px;display:grid}
[data-v-e874d044]{aspect-ratio:1;border-radius:3px}
[data-v-e874d044]{place-items:center;width:44px;height:46px;display:grid;position:relative}
[data-v-e874d044]{object-fit:contain;width:100%;height:100%}
[data-v-e874d044]{filter:grayscale();opacity:.4}
[data-v-e874d044]{border:1px solid color-mix(in srgb, var(--border) 80%, transparent);background:var(--background);height:15px;color:var(--foreground);font-variant-numeric:tabular-nums;border-radius:999px;padding:0 4px;font-size:9px;font-weight:600;line-height:13px;position:absolute;bottom:0;right:-8px}
[data-v-e874d044]{border-color:color-mix(in srgb, var(--primary) 35%, var(--border));color:var(--primary)}
</style>
