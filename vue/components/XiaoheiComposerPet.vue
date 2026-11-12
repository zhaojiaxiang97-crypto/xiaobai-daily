<template>
<div data-v-687930fa :class="`composer-pet`" :style="at({bottom:`calc(100% - ${counter.value}px)`})"><button type="button" :class="`composer-pet__button`" :aria-label="t(`xiaoheiBot.composerPet.openGrowth`)" :aria-busy="n.value" @click="withDirectives(d,[`stop`])"><img :class="`composer-pet__art`" :src="s.value" alt="" draggable="false" @error="e=>s.value=Q5" /></button><span><span v-text="t(`todayWork.growthEntry.${r.value}`)" /></span></div>
</template>

<script setup>
import { withDirectives } from 'vue';
import { S_px as px, S_pet as pet, S_alt as alt, S_Q5 as Q5, S_counter as counter, S_t as t, S_n as n, S_r as r, S_s as s, S_d as d, S_v as v, S_at as at } from '../shared.js';
const e = defineProps({});
</script>

<style>
/* 从原应用 CSS 恢复（data-v-687930fa） */
[data-v-687930fa]{z-index:3;width:90px;height:90px;position:absolute;bottom:calc(100% - 8px);right:18px}
[data-v-687930fa]{cursor:pointer;-webkit-app-region:no-drag;transform-origin:50% 92%;background:0 0;border:0;border-radius:12px;width:100%;height:100%;padding:0;transition:transform .22s ease-out;display:block}
[data-v-687930fa]:hover{transform:scale(1.02)}
[data-v-687930fa]:focus-visible{outline:2px solid var(--ring);outline-offset:2px}
[data-v-687930fa]{object-fit:contain;pointer-events:none;width:100%;height:100%;display:block}
[data-v-687930fa]{transition:none}
[data-v-687930fa]{border:1px solid var(--border);background:var(--popover);width:max-content;max-width:240px;color:var(--popover-foreground);border-radius:8px;padding:7px 10px;font-size:12px;line-height:1.5;position:absolute;bottom:calc(100% + 4px);right:0}
[data-v-687930fa]{display:none}
</style>
