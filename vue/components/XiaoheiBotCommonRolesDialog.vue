<template>
<article data-v-984a4963 :class="`role-card`"><div><div :class="`role-avatar`" :style="at({backgroundColor:e.avatarColor})"><img :src="e.avatar" alt="" loading="lazy" @error="e=>e.target.style.display=`none`" /><span>{{ e.name.slice(0,1) }}</span></div><div><h3>{{ e.name }}</h3><p>{{ e.subtitle }}</p></div></div><p :class="`role-description`" :title="e.description">{{ e.description }}</p><div><span :class="`role-card-tag`" :title="e.tags[0]">{{ e.tags[0] }}</span><component :is="P" variant="outline" size="sm" @click="t=>s.value=e" /><component :is="P" size="sm" :disabled="!!i||n" :title="p(`commonRoles.addTitle`)" @click="t=>d(e)" /></div></article>
</template>

<script setup>
// [符号说明] n~computed
import { S_is as is, S_sm as sm, S_h3 as h3, S_alt as alt, S_e as e, S_t as t, S_n as n, S_i as i, S_s as s, S_d as d, S_p as p, S_P as P, S_at as at } from '../shared.js';
</script>

<style>
/* 从原应用 CSS 恢复（data-v-984a4963） */
[data-v-984a4963]{border-block:1px solid var(--border);flex-wrap:wrap;align-items:center;gap:12px;margin-top:18px;padding-block:12px;display:flex}
[data-v-984a4963]{background:var(--muted);border-radius:10px;flex-wrap:wrap;gap:2px;padding:4px;display:flex}
[data-v-984a4963]{color:var(--muted-foreground);cursor:pointer;border-radius:7px;padding:6px 12px;font-size:12px}
[data-v-984a4963]{background:var(--background);color:var(--primary);font-weight:600}
[data-v-984a4963]{color:var(--muted-foreground);justify-content:space-between;padding:10px 0;font-size:12px;display:flex}
[data-v-984a4963]{color:var(--primary);cursor:pointer}
[data-v-984a4963]{scrollbar-gutter:stable}
[data-v-984a4963]{grid-template-columns:repeat(3,minmax(0,1fr));grid-auto-rows:auto;align-content:start;gap:12px;min-width:0;padding:1px 4px 4px 0;display:grid}
[data-v-984a4963]{border:1px solid var(--border);box-sizing:border-box;border-radius:14px;grid-template-rows:46px 1fr 30px;gap:8px;min-width:0;min-height:0;padding:14px;display:grid;overflow:hidden}
[data-v-984a4963],.role-detail-header[data-v-984a4963]{align-items:center;gap:12px;display:flex}
[data-v-984a4963]:last-child{flex:1;min-width:0}
[data-v-984a4963]{white-space:nowrap;text-overflow:ellipsis;font-size:14px;font-weight:600;overflow:hidden}
[data-v-984a4963]{color:var(--muted-foreground);white-space:nowrap;text-overflow:ellipsis;margin-top:3px;font-size:12px;overflow:hidden}
[data-v-984a4963]{color:#40534a;border:1px solid #0000000d;border-radius:13px;flex-shrink:0;place-items:center;width:46px;height:46px;font-size:18px;display:grid;position:relative;overflow:hidden}
[data-v-984a4963]{z-index:1;object-fit:cover;width:100%;height:100%;position:absolute;inset:0}
[data-v-984a4963]{color:var(--muted-foreground);-webkit-line-clamp:3;-webkit-box-orient:vertical;min-height:0;font-size:12px;line-height:1.7;display:-webkit-box;overflow:hidden}
[data-v-984a4963]{align-items:center;gap:6px;min-width:0;display:flex}
[data-v-984a4963]{flex-shrink:0;gap:3px;height:30px;padding-inline:8px;font-size:11px}
[data-v-984a4963]{background:var(--muted);min-width:0;max-width:72px;color:var(--muted-foreground);white-space:nowrap;text-overflow:ellipsis;cursor:default;border-radius:4px;padding:2px 6px;font-size:10px;line-height:16px;overflow:hidden}
[data-v-984a4963]{flex-wrap:wrap;gap:6px;display:flex}
[data-v-984a4963]{background:var(--muted);color:var(--muted-foreground);cursor:default;border-radius:6px;align-items:center;padding:3px 8px;font-size:11px;line-height:18px;display:inline-flex}
[data-v-984a4963]{border-top:1px solid var(--border);flex-wrap:wrap;justify-content:space-between;align-items:center;gap:12px;margin-top:14px;padding-top:14px;display:flex}
[data-v-984a4963]{color:var(--muted-foreground);font-size:12px}
[data-v-984a4963]{flex-shrink:0;gap:8px;display:flex}
[data-v-984a4963]{font-size:12px}
[data-v-984a4963]{text-align:center;min-height:0;color:var(--muted-foreground);flex:1;padding:32px 12px;overflow-y:auto}
[data-v-984a4963]{color:var(--destructive);padding-top:12px;font-size:12px}
[data-v-984a4963]{text-align:left;flex-direction:row;padding-bottom:18px}
[data-v-984a4963]{width:64px;height:64px;font-size:24px;position:relative}
[data-v-984a4963]{font-size:13px;line-height:1.7;overflow-y:auto}
[data-v-984a4963]{color:var(--muted-foreground);margin:16px 0 6px;font-size:12px}
[data-v-984a4963]{gap:8px;margin-bottom:14px;display:grid}
[data-v-984a4963]{background:var(--muted);border-radius:10px;align-items:center;gap:10px;padding:10px;display:flex}
[data-v-984a4963]{color:var(--primary);flex-shrink:0}
[data-v-984a4963]{grid-template-columns:repeat(2,minmax(0,1fr))}
[data-v-984a4963]{grid-template-columns:minmax(0,1fr)}
</style>
