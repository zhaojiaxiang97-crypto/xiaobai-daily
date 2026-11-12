<template>
<dialog data-v-6ca0fba7 ref="o" :class="`badge-share-dialog`" @click="h" @close="e=>r(`close`)"><header><div><h2>{{ i(`heatMap.yearHighlights.shareAchievement`) }}</h2><p>{{ toDisplayString(event.badge.name)+` · `+toDisplayString(event.year) }}</p></div><button type="button" :aria-label="i(`common.close`)" @click="m"><component :is="Nt" :size="18" /></button></header><div><div><canvas ref="s" width="1080" height="1440" :aria-label="event.badge.name" role="img"></canvas></div><aside><img :src="event.badge.image" alt="" /><h3>{{ event.badge.name }}</h3><p>{{ event.badge.desc }}</p><div><span>{{ i(`heatMap.yearHighlights.metricLabel`) }}</span><strong>{{ event.badge.metric }}</strong></div><small>{{ event.badge.unlockedLabel }}</small><p>{{ i(`heatMap.shareMaker.footerNote`) }}</p><button type="button" :class="`badge-share-save`" :disabled="!c.value||l.value" @click="g"><component :is="Vn" :size="16" />{{ l.value?i(`heatMap.shareMaker.saving`):i(`heatMap.shareMaker.exportPng`) }}</button><span>{{ u.value }}</span></aside></div></dialog>
</template>

<script setup>
import { toDisplayString } from 'vue';
// [符号说明] l~computed, u=useConfigProviderContext
import { S_is as is, S_h2 as h2, S_alt as alt, S_e as e, S_r as r, S_i as i, S_o as o, S_s as s, S_c as c, S_l as l, S_u as u, S_p as p, S_m as m, S_g as g, S_Nt as Nt, S_Vn as Vn } from '../shared.js';
const event = defineProps({
      badge: {},
      year: {}
    });
const n = event;
</script>

<style>
/* 从原应用 CSS 恢复（data-v-6ca0fba7） */
[data-v-6ca0fba7]{border:1px solid var(--border);background:var(--card);width:min(940px,100vw - 40px);max-width:none;height:min(800px,100dvh - 40px);max-height:none;color:var(--foreground);border-radius:16px;margin:auto;padding:0;position:fixed;inset:0;overflow:hidden;box-shadow:0 24px 80px #0000002e}
[data-v-6ca0fba7]{flex-direction:column;display:flex}
[data-v-6ca0fba7]::backdrop{-webkit-backdrop-filter:blur(3px);backdrop-filter:blur(3px);background:#161e1d6b}
[data-v-6ca0fba7]{border-bottom:1px solid var(--border);flex:none;justify-content:space-between;align-items:center;gap:16px;padding:18px 22px;display:flex}
[data-v-6ca0fba7]{margin:0;font-size:17px;font-weight:700}
[data-v-6ca0fba7]{color:var(--muted-foreground);margin:4px 0 0;font-size:12px}
[data-v-6ca0fba7]{width:32px;height:32px;color:var(--muted-foreground);cursor:pointer;background:0 0;border:0;border-radius:8px;place-items:center;display:grid}
[data-v-6ca0fba7]:hover{background:var(--muted);color:var(--foreground)}
[data-v-6ca0fba7]{flex:1;grid-template-columns:minmax(0,1fr) 310px;min-height:0;display:grid}
[data-v-6ca0fba7]{background:color-mix(in srgb, var(--muted) 22%, var(--background));justify-content:center;align-items:center;min-width:0;min-height:0;padding:22px;display:flex;overflow:auto}
[data-v-6ca0fba7]{width:auto;max-width:100%;height:auto;max-height:100%;display:block;box-shadow:0 12px 38px #00000026}
[data-v-6ca0fba7]{border-left:1px solid var(--border);flex-direction:column;align-items:flex-start;min-width:0;padding:30px 24px;display:flex}
[data-v-6ca0fba7]{object-fit:contain;width:96px;height:96px}
[data-v-6ca0fba7]{margin:18px 0 0;font-size:22px;font-weight:700}
[data-v-6ca0fba7]{color:var(--muted-foreground);margin:10px 0 0;font-size:13px;line-height:1.7}
[data-v-6ca0fba7]{flex-direction:column;gap:5px;margin-top:27px;display:flex}
[data-v-6ca0fba7],.badge-share-side>small[data-v-6ca0fba7]{color:var(--muted-foreground);font-size:12px}
[data-v-6ca0fba7]{font-size:20px}
[data-v-6ca0fba7]{margin-top:9px}
[data-v-6ca0fba7]{margin-top:auto;font-size:11px}
[data-v-6ca0fba7]{background:var(--primary);width:100%;min-height:40px;color:var(--primary-foreground);cursor:pointer;border:0;border-radius:9px;justify-content:center;align-items:center;gap:8px;margin-top:20px;font-size:13px;font-weight:650;display:flex}
[data-v-6ca0fba7]:disabled{opacity:.5;cursor:wait}
[data-v-6ca0fba7]{color:var(--primary);align-self:center;margin-top:10px;font-size:12px}
[data-v-6ca0fba7]{grid-template-columns:1fr;overflow-y:auto}
[data-v-6ca0fba7]{min-height:400px}
[data-v-6ca0fba7]{max-height:520px}
[data-v-6ca0fba7]{border-left:0;border-top:1px solid var(--border)}
</style>
