<template>
<div :data-record-id="e.id" :class="`min-w-0 rounded-lg border border-black/6 bg-white p-3 dark:border-white/10 dark:bg-card`"><div><span>{{ D(e) }}</span><span><span :class="`size-1.5 rounded-full`" :style="at({background:ee(e)})"></span>{{ ` `+toDisplayString(j(e)) }}</span><span>{{ M(e) }}</span><component :is="P" size="sm" variant="ghost" :class="`ml-auto h-6 gap-1 px-1.5 text-xs text-muted-foreground hover:text-foreground`" @click="t=>me(e)" /></div><p>{{ k(e) }}</p><p>{{ O(e) }}</p><div><div><component :is="zn" :size="14" :class="`animate-spin`" />{{ ` `+toDisplayString(i(`heatmapCellDetail.loading`)) }}</div></div></div>
</template>

<script setup>
import { toDisplayString } from 'vue';

// [setup 还原] 原组件 setup 里初值不依赖 IPC 的声明
function D(e) {
  let date = new Date(e.endedAt);
  return `${E(date.getHours())}:${E(date.getMinutes())}:${E(date.getSeconds())}`;
}
function O(e) {
  if (!T.includes(e.source)) return e.summary.trim();
  let t = $f.parse(e.summary);
  return (new DOMParser().parseFromString(t, `text/html`).body.textContent ?? ``).trim();
}
function k(e) {
  let t = e.details?.title;
  return typeof t == `string` ? t.trim() : ``;
}
function j(e) {
  return f_(e.category, a.value);
}
function ee(e) {
  return Ooe(e.category, l.value);
}
function M(e) {
  let t = te[e.source];
  return i(t || `timeline.unknownSource`);
}
async function me(e) {
  let t = u.value[e.id];
  if (t?.open) {
    t.open = false;
    return;
  }
  if (t && t.urls.length > 0) {
    t.open = true;
    return;
  }
  u.value[e.id] = {
    open: true,
    loading: true,
    urls: [],
    error: ``
  };
  let n = (await Promise.all(pe(e).map(item => window.electronAPI.readLocalImage(item).catch(() => null)))).flatMap(item => item?.ok && item.dataUrl ? [item.dataUrl] : []);
  u.value[e.id] = {
    open: true,
    loading: false,
    urls: n,
    error: n.length > 0 ? `` : i(`heatmapCellDetail.imageFailed`)
  };
}
import { S_is as is, S_xs as xs, S_sm as sm, S_lg as lg, S_px as px, S_e as e, S_t as t, S_i as i, S_p as p, S_w as w, S_P as P, S_at as at, S_zn as zn } from '../shared.js';
</script>
