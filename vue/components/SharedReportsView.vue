<template>
<section><div><component :is="cw" /><div><component :is="By" :modelValue="f.value" @update:modelvalue="e=>f.value=e" /><div><component :is="Cs" :size="13" :class="`absolute left-2.5 top-1/2 -translate-y-1/2 text-[#bbb]`" /><component :is="Lp" :modelValue="p.value" @update:modelvalue="e=>p.value=e" :placeholder="a(`reportCc.searchPlaceholder`)" :class="`h-7 w-[180px] pl-8 text-xs`" /></div><component :is="P" size="icon-sm" variant="ghost" :title="a(`common.refresh`)" :disabled="C.value" @click="e=>D(b.value)" /><component :is="P" size="sm" variant="outline" :class="`h-7 gap-1 px-2.5 text-xs`" @click="e=>ye.value=true" /></div></div></section><section><div><div><component :is="Be(u.value?o:Oo)" :size="14" :stroke-width="1.5" :class="`text-[#999]`" /><h2>{{ u.value?a(`reportCc.sentList`):a(`reportCc.receivedList`) }}</h2><component :is="zn" :size="12" :class="`animate-spin text-[#bbb]`" /></div><div><button type="button" :class="`inline-flex items-center gap-1.5 text-xs text-[#666] hover:text-(--foreground)`" @click="Te"><span :class="[`flex size-3.5 items-center justify-center rounded-[3px] border`,we.value?`border-primary bg-primary text-primary-foreground`:`border-black/20 bg-white dark:bg-background`]"><component :is="an" :size="10" :stroke-width="3" /></span>{{ ` `+toDisplayString(a(`reportCc.selectPage`)) }}</button><span :class="[`text-xs`,be.value.size?`text-(--foreground)`:`text-[#999]`]"><span v-text="be.value.size?a(`reportCc.selectedCount`,{reports:be.value.size,members:Ee.value}):a(`reportCc.selectHint`)" /></span><component :is="P" size="sm" variant="ghost" :class="`h-7 px-2 text-xs text-[#666]`" @click="Se" /><component :is="P" size="sm" :class="`h-7 gap-1 px-3 text-xs`" :disabled="!be.value.size" @click="e=>ke([...be.value.values()])" /></div></div><div><component :is="zn" :size="16" :class="`animate-spin`" /></div></section><component :is="v5" :open="le.value" @update:open="e=>le.value=e" :report-id="ue.value.id" :title="ue.value.title" @changed="_e" /><component :is="zy" :open="Me.value" @update:open="e=>Me.value=e" context="todo" />
</template>

<script setup>
import { toDisplayString } from 'vue';
import zy from './FriendManagerDialog.vue';
import By from './Select.vue';
import cw from './ButtonGroup.vue';
import v5 from './ReportCcShareDialog.vue';
// [符号说明] u=useConfigProviderContext, f=useConfigProviderContext, D=useConfigProviderContext
import { S_Oo as Oo, S_is as is, S_xs as xs, S_Cs as Cs, S_sm as sm, S_px as px, S_h2 as h2, S_e as e, S_a as a, S_o as o, S_u as u, S_f as f, S_p as p, S_v as v, S_y as y, S_b as b, S_C as C, S_w as w, S_D as D, S_le as le, S_ue as ue, S__e as _e, S_ye as ye, S_be as be, S_Se as Se, S_P as P, S_we as we, S_Te as Te, S_Ee as Ee, S_ke as ke, S_Me as Me, S_Be as Be, S_an as an, S_zn as zn } from '../shared.js';
const text = defineProps({
      mode: {}
    });
const r = text;
</script>
