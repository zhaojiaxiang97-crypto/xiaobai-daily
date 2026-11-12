<template>
<div :class="[`rounded-lg border border-black/[0.08] p-3.5`,{'opacity-60':!e.syncEnabled}]"><div><component :is="sg" :model-value="e.syncEnabled" :class="`mt-1`" :aria-label="t(`settings.recordingBox.toggleDevice`,{name:ne(e)})" @update:modelvalue="t=>ge(e,t)" /><div><div><p>{{ ne(e) }}</p><component :is="Pp" variant="outline" :class="`shrink-0 px-1.5 py-0 text-xs font-normal text-[#777]`" /></div><div><span>{{ e.deviceId }}</span><span><span v-text="t(`settings.recordingBox.firmware`,{version:e.firmwareVersion})" /></span></div><p><span><span v-text="t(`settings.recordingBox.lastSync`,{time:N(e.lastSyncedAt),count:e.lastSyncCount})" /></span><span><span v-text="t(`settings.recordingBox.totalSynced`,{count:e.totalSyncCount??0})" /></span></p><p>{{ e.lastError }}</p></div><div><component :is="P" size="icon" variant="ghost" :class="`h-7 w-7 text-[#777]`" :title="t(`settings.recordingBox.syncNow`)" :disabled="!e.syncEnabled||v.value!==null" @click="t=>_e(e.deviceId)" /><component :is="P" size="icon" variant="ghost" :class="`h-7 w-7 text-[#999] hover:bg-destructive/10 hover:text-destructive`" :title="t(`settings.recordingBox.removeDevice`)" @click="t=>y.value=e" /></div></div></div>
</template>

<script setup>
import Pp from './Badge.vue';
import sg from './Checkbox.vue';
import { S_is as is, S_xs as xs, S_lg as lg, S_px as px, S_e as e, S_t as t, S_p as p, S_v as v, S_y as y, S_w as w, S_ne as ne, S_N as N, S_ge as ge, S__e as _e, S_P as P, S_mt as mt } from '../shared.js';
const text = defineProps({});
</script>
