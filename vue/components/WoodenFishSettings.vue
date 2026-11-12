<template>
<div><div><div><p>{{ t(`settings.showWoodenFish`) }}</p><p>{{ t(`settings.showWoodenFishDesc`) }}</p></div><component :is="Te" :modelValue="a" @update:modelvalue="e=>$e(a)?a.value=e:null" :disabled="r" /></div><div><div><div><p>{{ t(`settings.woodenFishMode`) }}</p><component :is="By" :model-value="n.woodenFishMode" :disabled="r" @update:modelvalue="c" /><p>{{ n.woodenFishMode===`app`?t(`settings.woodenFishModeAppDesc`):t(`settings.woodenFishModeGlobalDesc`) }}</p></div><div><p>{{ t(`settings.woodenFishSound`) }}</p><component :is="Te" :modelValue="o" @update:modelvalue="e=>$e(o)?o.value=e:null" :disabled="r" /></div></div><div><p>{{ t(`settings.woodenFishHiddenForSession`) }}</p><component :is="P" variant="outline" size="sm" :class="`h-7 shrink-0 text-xs`" :disabled="r" @click="s" /></div></div></div>
</template>

<script setup>
import By from './Select.vue';
import { S_is as is, S_xs as xs, S_sm as sm, S_e as e, S_t as t, S_n as n, S_r as r, S_a as a, S_o as o, S_s as s, S_c as c, S_p as p, S_P as P, S_Te as Te, S_$e as $e } from '../shared.js';
</script>
