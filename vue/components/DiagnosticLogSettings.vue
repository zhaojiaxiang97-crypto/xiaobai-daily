<template>
<div :class="[`flex flex-col gap-2 py-3`,n<c.value.length-1?`border-b border-black/5`:``]"><div><span :class="[`rounded px-1.5 py-px text-[11px] font-medium`,e.skipType===`all`?`bg-green-500/10 text-green-600`:`bg-sky-500/10 text-sky-600`]">{{ e.skipType===`all`?t(`settings.frameDedupLogSkipAll`):t(`settings.frameDedupLogSkipPartial`) }}</span><span>{{ e.trigger===`enter_key`?t(`settings.frameDedupLogTriggerEnterKey`):t(`settings.frameDedupLogTriggerAuto`) }}</span><span><span v-text="t(`settings.frameDedupLogScreens`,{skipped:e.skippedDisplays,total:e.totalDisplays})" /></span><span>{{ t(`settings.frameDedupLogExtended`) }}</span><span>{{ Yi(e.capturedAt) }}</span></div><div><span>{{ toDisplayString(t(`settings.frameDedupLogForegroundApp`))+`: ` }}<b>{{ e.foregroundApp||t(`settings.frameDedupLogUnknown`) }}</b></span><span>{{ toDisplayString(t(`settings.frameDedupLogWhitelist`))+`: ` }}<b><span v-text="e.whitelistKeyword?t(`settings.frameDedupLogWhitelistHit`,{keyword:e.whitelistKeyword}):e.whitelistChecked?t(`settings.frameDedupLogWhitelistMiss`):t(`settings.frameDedupLogWhitelistNone`)" /></b></span><span>{{ toDisplayString(t(`settings.frameDedupLogThreshold`))+`: ` }}<b>{{ v(e.diffThreshold) }}</b></span></div><div></div></div>
</template>

<script setup>
import { toDisplayString } from 'vue';
import { S_px as px, S_t as t, S_n as n, S_c as c, S_v as v, S_b as b, S_Yi as Yi } from '../shared.js';
const e = defineProps({});
</script>
