<template>
<p data-v-9f1395fd>{{ i(`roleShare.preparing`) }}</p><component :is="P" :class="`mt-2`" variant="outline" size="sm" :disabled="e.retryDisabled" @click="e=>r(`retry`)" /><section><div><strong><span v-text="i(`roleShare.templateTitle`,{name:a.value.template.name})" /></strong><span>{{ `● `+toDisplayString(i(`roleShare.shareable`)) }}</span></div><div :class="`share-cover mb-3 flex items-center justify-center rounded-lg border`" :style="at({'--cover':a.value.template.avatarColor})"><span><img :src="a.value.template.avatar||e.avatar" :alt="a.value.template.name" :class="`size-full object-cover`" referrerpolicy="no-referrer" /></span></div><p>{{ a.value.template.description }}</p><div><component :is="P" size="sm" @click="d" /><component :is="P" size="sm" variant="outline" @click="e=>o.value=true" /></div><a :href="a.value.url" target="_blank" rel="noopener noreferrer" :class="`mt-3 block break-all text-xs text-emerald-600`">{{ toDisplayString(a.value.url)+` ↗` }}</a><p>{{ u.value }}</p><component :is="Pzt" :open="o.value" @update:open="e=>o.value=e" :card="a.value" :avatar="e.avatar" :copied="l.value" :error="u.value" @copy="d" /></section><slot name="after" />
</template>

<script setup>
import { toDisplayString } from 'vue';
import Pzt from './XiaoheiBotShareDetailDialog.vue';
// [符号说明] l~computed, u=useConfigProviderContext
import { S_no as no, S_is as is, S_xs as xs, S_sm as sm, S_href as href, S_lg as lg, S_alt as alt, S_r as r, S_i as i, S_a as a, S_o as o, S_l as l, S_u as u, S_d as d, S_p as p, S_v as v, S_P as P, S_at as at, S_mt as mt } from '../shared.js';
const e = defineProps({
      items: {},
      retryDisabled: {
        type: Boolean
      },
      avatar: {}
    });
const n = e;
</script>

<style>
/* 从原应用 CSS 恢复（data-v-9f1395fd） */
[data-v-9f1395fd]{width:360px;max-width:100%;margin-top:10px}
[data-v-9f1395fd]{background:radial-gradient(ellipse at 24% 12%, #ffffffb3, transparent 70%), linear-gradient(135deg, color-mix(in srgb, var(--cover), white 35%), var(--cover) 65%, color-mix(in srgb, var(--cover), white 15%));height:144px;box-shadow:inset 0 1px #ffffff80}
</style>
