<template>
<div :class="[`group flex items-center gap-2.5 px-3 py-2`,t>0?`border-t border-black/[0.05] dark:border-white/10`:``]"><component :is="lH" :name="u5(e.person)" :avatar-url="e.person.avatarUrl" :size="28" /><span>{{ u5(e.person) }}</span><span :class="[`shrink-0 text-xs`,e.readAt?`text-primary`:`text-[#bbb]`]"><span v-text="e.readAt?a(`reportCc.share.readAt`,{time:h5(e.readAt)}):a(`reportCc.share.unread`)" /></span><button type="button" :class="[`inline-flex h-6 shrink-0 items-center gap-1 rounded-md px-1.5 text-xs transition-colors`,h.value===e.person.userId?`bg-destructive/10 text-destructive`:`text-[#bbb] opacity-0 hover:bg-black/5 hover:text-destructive group-hover:opacity-100`]" :disabled="g.value===e.person.userId" :title="a(`reportCc.share.remove`)" @click="t=>O(e)"><component :is="zn" :size="12" :class="`animate-spin`" /></button></div>
</template>

<script setup>
import md from './BaseSeparator.vue';
import lH from './ReportCcAvatar.vue';
import { S_is as is, S_xs as xs, S_px as px, S_u5 as u5, S_h5 as h5, S_t as t, S_a as a, S_g as g, S_v as v, S_O as O, S_zn as zn } from '../shared.js';
const e = defineProps({});
const n = e;
</script>
