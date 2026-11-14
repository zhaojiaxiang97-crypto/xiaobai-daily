<template>
<div :class="`rounded-lg border border-black/5 bg-black/[0.015] p-3`"><div><span><component :is="Be(u(e.key))" :size="16" :stroke-width="1.7" /></span><div><div><p>{{ l(e.key).title }}</p><span :class="[`rounded-full border px-2 py-0.5 text-[11px] font-medium`,f(e.status,e.granted)]">{{ d(e) }}</span></div><p>{{ l(e.key).description }}</p><p>{{ l(e.key).usage }}</p><p>{{ t(`settings.permissionCheck.notificationStatusHint`) }}</p></div><component :is="P" size="sm" variant="outline" :class="`h-7 shrink-0 gap-1.5 text-xs`" :disabled="e.status===`not-supported`" @click="t=>p(e.key)" /></div></div>
</template>

<script setup>

// [setup 还原] 原组件 setup 里初值不依赖 IPC 的声明
function l(e) {
  return c.value[e];
}
function u(e) {
  return e === `screenRecording` ? rs : e === `notifications` ? ba : cr;
}
function d(e) {
  return e.granted ? t(`settings.permissionCheck.statusGranted`) : e.status === `not-determined` ? t(`settings.permissionCheck.statusNotDetermined`) : e.status === `restricted` ? t(`settings.permissionCheck.statusRestricted`) : e.status === `not-supported` ? t(`settings.permissionCheck.statusNotSupported`) : e.status === `unknown` ? t(`settings.permissionCheck.statusUnknown`) : t(`settings.permissionCheck.statusDenied`);
}
function f(e, t) {
  return t ? `border-green-200 bg-green-50 text-green-700` : e === `unknown` || e === `not-determined` ? `border-amber-200 bg-amber-50 text-amber-700` : `border-red-200 bg-red-50 text-red-700`;
}
async function p(e) {
  if (Wi.value) try {
    await Ji.openMacSettings(e), window.setTimeout(() => {
      o();
    }, 1200);
  } catch (e) {
    i.value = e instanceof Error ? e.message : t(`settings.permissionCheck.loadFailed`);
  }
}
import { S_is as is, S_xs as xs, S_sm as sm, S_lg as lg, S_px as px, S_e as e, S_t as t, S_P as P, S_Be as Be } from '../shared.js';
</script>
