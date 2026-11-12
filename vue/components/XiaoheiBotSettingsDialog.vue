<template>
<div data-v-0238b36a :class="`configured-model-item`"><div><strong>{{ e.isBuiltin?t.id:t.name }}</strong><span>{{ t.id }}</span></div><div><component :is="Pp" variant="secondary" /><component :is="Pp" variant="secondary" /><component :is="Pp" variant="outline" /></div></div>
</template>

<script setup>
import Pp from './Badge.vue';
import { S_is as is, S_t as t } from '../shared.js';
const e = defineProps({});
</script>

<style>
/* 从原应用 CSS 恢复（data-v-0238b36a） */
[data-v-0238b36a]{flex-direction:column;display:flex}
[data-v-0238b36a]{flex:1;grid-template-columns:176px minmax(0,1fr);width:100%;min-height:0;display:grid;overflow:hidden}
[data-v-0238b36a]{background:color-mix(in srgb, var(--muted) 42%, var(--background));flex-direction:column;gap:4px;min-width:0;padding:10px;display:flex}
[data-v-0238b36a]{white-space:normal;justify-content:flex-start;gap:9px;width:100%;height:auto;min-height:52px;padding:8px 9px}
[data-v-0238b36a],.bot-settings-nav__item--active[data-v-0238b36a]:hover{color:var(--foreground);background:var(--accent)}
[data-v-0238b36a]{flex-direction:column;flex:1;align-items:flex-start;gap:2px;min-width:0;display:flex}
[data-v-0238b36a]{text-align:left;font-size:13px;font-weight:600;line-height:1.3}
[data-v-0238b36a]{color:var(--muted-foreground);text-align:left;font-size:11px;line-height:1.35}
[data-v-0238b36a]{flex-direction:column;min-width:0;min-height:0;display:flex;overflow:hidden}
[data-v-0238b36a]{flex:1;min-height:0}
[data-v-0238b36a]{flex-direction:column;gap:12px;min-width:0;padding:12px 18px 22px;display:flex}
[data-v-0238b36a]{flex:none;padding:17px 52px 3px 19px}
[data-v-0238b36a]{justify-content:space-between;align-items:flex-start;gap:18px;display:flex}
[data-v-0238b36a]{margin:0;font-size:15px;font-weight:600;line-height:1.35}
[data-v-0238b36a]{max-width:520px;color:var(--muted-foreground);margin:4px 0 0;font-size:12px;line-height:1.5}
[data-v-0238b36a]{background:color-mix(in srgb, var(--muted) 38%, var(--background));box-shadow:none;border:0}
[data-v-0238b36a],.bot-settings-card__heading[data-v-0238b36a],.model-provider-card__header[data-v-0238b36a]{align-items:center;gap:10px;min-width:0;display:flex}
[data-v-0238b36a]{grid-template-columns:auto minmax(0,1fr) auto}
[data-v-0238b36a]{flex:1;min-width:0}
[data-v-0238b36a] [data-slot=card-title]{font-size:13px;line-height:1.35}
[data-v-0238b36a] [data-slot=card-description]{text-overflow:ellipsis;white-space:nowrap;margin-top:3px;font-size:11px;line-height:1.45;overflow:hidden}
[data-v-0238b36a] [data-slot=card-content]{padding-top:0}
[data-v-0238b36a] [data-slot=field-label]{font-size:12px}
[data-v-0238b36a] [data-slot=field-description]{font-size:11px;line-height:1.45}
[data-v-0238b36a]{margin-top:12px}
[data-v-0238b36a] [data-slot=alert-title]{font-size:12px}
[data-v-0238b36a] [data-slot=alert-description]{font-size:11px;line-height:1.5}
[data-v-0238b36a]{grid-template-columns:minmax(0,1fr);gap:10px;display:grid}
[data-v-0238b36a]{color:var(--muted-foreground);font-size:11px;line-height:1.4}
[data-v-0238b36a]{gap:8px}
[data-v-0238b36a]{background:color-mix(in srgb, var(--background) 82%, var(--muted));flex-wrap:nowrap}
[data-v-0238b36a]{width:36px;height:36px}
[data-v-0238b36a] [data-slot=item-content]{min-width:0}
[data-v-0238b36a] [data-slot=item-title]{min-width:0;max-width:100%}
[data-v-0238b36a] [data-slot=item-title]>span:first-child{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}
[data-v-0238b36a] [data-slot=item-title] [data-slot=badge]{flex:none;height:19px;padding-inline:6px;font-size:10px}
[data-v-0238b36a] [data-slot=item-description]{font-size:11px}
[data-v-0238b36a] [data-slot=item-actions]{flex:none}
[data-v-0238b36a]{border:1px dashed var(--border);min-height:260px;color:var(--muted-foreground);background:color-mix(in srgb, var(--muted) 24%, var(--background))}
[data-v-0238b36a]{width:22px;height:22px}
[data-v-0238b36a]{color:var(--muted-foreground);justify-content:space-between;align-items:center;gap:12px;font-size:11px;display:flex}
[data-v-0238b36a]{align-items:center;gap:12px;display:flex}
[data-v-0238b36a]{align-items:center;gap:8px;display:flex}
[data-v-0238b36a]{flex-direction:column;gap:10px;display:flex}
[data-v-0238b36a]>[data-slot=badge]{flex:none}
[data-v-0238b36a]{color:var(--muted-foreground);justify-content:space-between;align-items:center;gap:10px;margin-bottom:8px;font-size:11px;display:flex}
[data-v-0238b36a] [data-slot=badge]{height:20px;padding-inline:6px;font-size:10px}
[data-v-0238b36a]{flex-direction:column;gap:4px;display:flex}
[data-v-0238b36a]{background:color-mix(in srgb, var(--background) 78%, var(--muted));border-radius:9px;align-items:center;gap:10px;min-width:0;padding:7px 8px;display:flex}
[data-v-0238b36a]{flex-direction:column;flex:1;gap:1px;min-width:0;display:flex}
[data-v-0238b36a],.configured-model-item__identity span[data-v-0238b36a]{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}
[data-v-0238b36a]{font-size:12px;font-weight:600}
[data-v-0238b36a]{color:var(--muted-foreground);font-size:10px}
[data-v-0238b36a]{flex:none;gap:4px;display:flex}
[data-v-0238b36a] [data-slot=badge]{height:20px;padding-inline:6px;font-size:10px;font-weight:500}
[data-v-0238b36a]{width:30px;height:30px;color:var(--foreground);background:var(--muted);border-radius:9px;flex:none;justify-content:center;align-items:center;display:inline-flex}
[data-v-0238b36a]{flex:none;animation:.9s linear infinite activity-spin-0238b36a}
[data-v-0238b36a]{text-overflow:ellipsis;overflow:hidden}
</style>
