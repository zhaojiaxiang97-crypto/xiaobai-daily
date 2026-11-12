<template>
<div :data-record-id="e.id" :class="`min-w-0 rounded-lg border border-black/6 bg-white p-3 dark:border-white/10 dark:bg-card`"><div><span>{{ D(e) }}</span><span><span :class="`size-1.5 rounded-full`" :style="at({background:ee(e)})"></span>{{ ` `+toDisplayString(j(e)) }}</span><span>{{ M(e) }}</span><component :is="P" size="sm" variant="ghost" :class="`ml-auto h-6 gap-1 px-1.5 text-xs text-muted-foreground hover:text-foreground`" @click="t=>me(e)" /></div><p>{{ k(e) }}</p><p>{{ O(e) }}</p><div><div><component :is="zn" :size="14" :class="`animate-spin`" />{{ ` `+toDisplayString(i(`heatmapCellDetail.loading`)) }}</div></div></div>
</template>

<script setup>
import { toDisplayString } from 'vue';
import { S_is as is, S_xs as xs, S_sm as sm, S_lg as lg, S_px as px, S_e as e, S_t as t, S_i as i, S_p as p, S_w as w, S_D as D, S_O as O, S_k as k, S_j as j, S_ee as ee, S_M as M, S_me as me, S_P as P, S_at as at, S_zn as zn } from '../shared.js';
</script>
