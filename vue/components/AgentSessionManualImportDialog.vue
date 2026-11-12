<template>
<li :class="[`rounded-lg border`,x.value.has(e.key)?`border-primary/40 bg-primary/[0.03]`:`border-black/[0.08]`]" :data-testid="`agent-session-manual-import-session-${e.key}`"><div><label :class="[`flex min-w-0 flex-1 items-start gap-2.5`,e.newMessageCount>0?`cursor-pointer`:`cursor-default`]"><component :is="sg" :model-value="x.value.has(e.key)" :disabled="e.newMessageCount===0||p.value" :class="`mt-0.5 shrink-0`" @update:modelvalue="t=>ae(e.key,t)" /><div><div><span>{{ lr(e.providerId) }}</span><span :class="`truncate font-medium text-[#555]`" :title="e.cwd??undefined">{{ e.project }}</span><span><component :is="yo" :size="11" :class="`shrink-0`" /><span>{{ e.gitBranch }}</span></span><span>{{ M(e) }}</span><span>{{ j(e) }}</span></div><p :class="[`mt-1 truncate text-sm`,e.newMessageCount>0?`text-(--foreground)`:`text-[#999]`]" :title="e.title">{{ e.title }}</p><p>{{ ee(e) }}</p></div></label><component :is="P" type="button" size="sm" variant="ghost" :class="`h-6 shrink-0 gap-1 px-1.5 text-xs text-[#666]`" @click="t=>se(e.key)" /></div><ol></ol></li>
</template>

<script setup>
import ol from './CalendarHeadCell.vue';
import sg from './Checkbox.vue';
import { S_yo as yo, S_is as is, S_xs as xs, S_sm as sm, S_lg as lg, S_px as px, S_e as e, S_t as t, S_p as p, S_x as x, S_w as w, S_j as j, S_ee as ee, S_M as M, S_ae as ae, S_se as se, S_P as P, S_mt as mt, S_lr as lr, S_li as li } from '../shared.js';
</script>
