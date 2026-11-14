<template>
<div :class="[`rounded-lg border border-black/[0.08] p-3.5`,{'opacity-60':!e.syncEnabled}]"><div><component :is="sg" :model-value="e.syncEnabled" :class="`mt-1`" :aria-label="t(`settings.recordingBox.toggleDevice`,{name:ne(e)})" @update:modelvalue="t=>ge(e,t)" /><div><div><p>{{ ne(e) }}</p><component :is="Pp" variant="outline" :class="`shrink-0 px-1.5 py-0 text-xs font-normal text-[#777]`" /></div><div><span>{{ e.deviceId }}</span><span><span v-text="t(`settings.recordingBox.firmware`,{version:e.firmwareVersion})" /></span></div><p><span><span v-text="t(`settings.recordingBox.lastSync`,{time:N(e.lastSyncedAt),count:e.lastSyncCount})" /></span><span><span v-text="t(`settings.recordingBox.totalSynced`,{count:e.totalSyncCount??0})" /></span></p><p>{{ e.lastError }}</p></div><div><component :is="P" size="icon" variant="ghost" :class="`h-7 w-7 text-[#777]`" :title="t(`settings.recordingBox.syncNow`)" :disabled="!e.syncEnabled||v!==null" @click="t=>_e(e.deviceId)" /><component :is="P" size="icon" variant="ghost" :class="`h-7 w-7 text-[#999] hover:bg-destructive/10 hover:text-destructive`" :title="t(`settings.recordingBox.removeDevice`)" @click="t=>y=e" /></div></div></div>
</template>

<script setup>
import Pp from './Badge.vue';
import sg from './Checkbox.vue';
import { S_is as is, S_xs as xs, S_lg as lg, S_px as px, S_e as e, S_t as t, S_p as p, S_w as w, S_P as P, S_mt as mt } from '../shared.js';
const text = defineProps({});
import { ref } from 'vue';

// [setup 还原] 原组件 setup 里初值不依赖 IPC 的声明
let v = ref(null);
let y = ref(null);
function ne(e) {
  return e.deviceName.trim() || e.deviceId;
}
function N(e) {
  if (!e) return t(`settings.recordingBox.neverSynced`);
  let date = new Date(e);
  return Number.isNaN(date.getTime()) ? e : new Intl.DateTimeFormat(n.value === `zh-CN` ? `zh-CN` : `en-US`, {
    month: `2-digit`,
    day: `2-digit`,
    hour: `2-digit`,
    minute: `2-digit`
  }).format(date);
}
async function ge(e, n) {
  try {
    await RH.update({
      deviceId: e.deviceId,
      syncEnabled: n === true
    }), await re();
  } catch (e) {
    Ai(e instanceof Error ? e.message : t(`settings.recordingBox.saveFailed`));
  }
}
async function _e(e) {
  if (!v.value) {
    v.value = e ?? `__all__`;
    try {
      let n = await RH.sync(e ? {
        deviceId: e
      } : {});
      await re(), n.failedDeviceCount > 0 ? Ai(t(`settings.recordingBox.syncPartiallyFailed`, {
        succeeded: n.syncedDeviceCount,
        failed: n.failedDeviceCount
      })) : Oi(t(`settings.recordingBox.syncCompleted`, {
        count: n.newRecordCount
      }));
    } catch (e) {
      Ai(e instanceof Error ? e.message : t(`settings.recordingBox.syncFailed`));
    } finally {
      v.value = null;
    }
  }
}
</script>
