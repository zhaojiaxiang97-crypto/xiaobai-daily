<template>
<div :class="`flex items-center justify-between gap-3 border-b border-border py-3.5 last:border-0`"><div><div><span :class="`truncate text-sm font-medium`" :title="S(e.type,e.displayName)">{{ S(e.type,e.displayName) }}</span><span>{{ r(e.direction===`credit`?`profile.ledgerReceived`:`profile.usageRecordStatusSuccess`) }}</span></div><p>{{ e.createdAt.replace(`T`,` `).slice(0,16) }}</p></div><div><p :class="[`text-sm font-medium`,e.direction===`credit`?`text-emerald-700 dark:text-emerald-400`:`text-foreground`]">{{ toDisplayString(e.direction===`credit`?`+`:`−`)+toDisplayString(g(e.amount)) }}<span>{{ r(`profile.creditsUnit`) }}</span></p><p>{{ toDisplayString(r(`profile.ledgerBalance`))+` `+toDisplayString(g(e.balanceAfter)) }}</p></div></div>
</template>

<script setup>
import { toDisplayString } from 'vue';

// [setup 还原] 原组件 setup 里初值不依赖 IPC 的声明
function S(e, t) {
  for (let t of [`profile.ledgerTypes.${e}`, `profile.usageRecordTypes.${e}`]) if (i(t)) return r(t);
  return t || r(`profile.ledgerAdjustment`);
}
import { S_sm as sm, S_e as e, S_r as r, S_p as p, S_g as g, S_b as b, S_T as T } from '../shared.js';
</script>
