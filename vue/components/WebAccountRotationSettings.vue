<template>
<div><div><component :is="Ys" :size="14" :class="`text-amber-600 shrink-0`" /><span>{{ t(`settings.webAccount.noticeTitle`) }}</span></div><ul><li>{{ t(`settings.webAccount.noticeScope`) }}</li><li>{{ t(`settings.webAccount.noticeRisk`) }}</li><li>{{ t(`settings.webAccount.noticeBenefit`) }}</li><li>{{ t(`settings.webAccount.noticeInterval`) }}</li><li>{{ t(`settings.webAccount.noticeFallback`) }}</li></ul></div><div><div><p>{{ t(`settings.webAccount.accountManagement`) }}</p><p>{{ te.value }}</p></div><component :is="P" size="sm" variant="outline" :class="`h-7 gap-1.5 text-xs`" :disabled="_.value" @click="e=>k.value=true" /></div><div><div><div><p>{{ t(`settings.webAccount.rotationStrategy`) }}</p><button type="button" :class="`text-[#bbb] hover:text-[#666] cursor-pointer`" :title="t(`settings.webAccount.rotationLogicTitle`)" @click="e=>O.value=true"><component :is="Ln" :size="13" /></button></div><p>{{ t(`settings.webAccount.rotationStrategyDesc`) }}</p></div><component :is="By" :modelValue="T.value" @update:modelvalue="e=>T.value=e" :disabled="_.value" /></div><div><div><p>{{ t(`settings.webAccount.showWindow`) }}</p><p>{{ t(`settings.webAccount.showWindowDesc`) }}</p></div><component :is="Te" :modelValue="D.value" @update:modelvalue="e=>D.value=e" :disabled="_.value" /></div>
</template>

<script setup>
import ul from './CalendarPrev.vue';
import By from './Select.vue';
import { S_is as is, S_xs as xs, S_Ys as Ys, S_sm as sm, S_t as t, S_p as p, S__ as _, S_T as T, S_D as D, S_O as O, S_k as k, S_te as te, S_P as P, S_Te as Te, S_Ln as Ln, S_li as li } from '../shared.js';
const e = defineProps({});
</script>
