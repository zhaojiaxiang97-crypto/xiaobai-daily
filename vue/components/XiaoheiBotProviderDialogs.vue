<template>
<label data-v-4b7020f5 :class="`provider-thinking-levels__option`"><component :is="sg" :model-value="e.thinkingLevels.includes(t)" :aria-label="g(t)" @update:modelvalue="n=>_(e,t,n)" /><span>{{ g(t) }}</span></label>
</template>

<script setup>
import sg from './Checkbox.vue';
import { S_is as is, S_e as e, S_t as t, S_n as n, S_g as g, S__ as _ } from '../shared.js';
</script>

<style>
/* 从原应用 CSS 恢复（data-v-4b7020f5） */
[data-v-4b7020f5]{flex:none;padding:18px 20px 15px}
[data-v-4b7020f5] [data-slot=dialog-title]{font-size:16px}
[data-v-4b7020f5] [data-slot=dialog-description]{margin-top:3px;font-size:12px;line-height:1.45}
[data-v-4b7020f5]{height:min(560px,100vh - 176px);min-height:0;padding:0 20px 20px}
[data-v-4b7020f5] [data-slot=field-label]{font-size:12px}
[data-v-4b7020f5] [data-slot=field-description]{font-size:11px;line-height:1.45}
[data-v-4b7020f5] [data-slot=input],.provider-editor-dialog__content[data-v-4b7020f5] [data-slot=select-trigger]{font-size:13px}
[data-v-4b7020f5]{grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;display:grid}
[data-v-4b7020f5]{flex-direction:column;gap:9px;padding-top:3px;display:flex}
[data-v-4b7020f5]{justify-content:space-between;align-items:flex-end;gap:14px;display:flex}
[data-v-4b7020f5]{flex-direction:column;gap:2px;min-width:0;display:flex}
[data-v-4b7020f5]{font-size:13px;font-weight:600}
[data-v-4b7020f5]{color:var(--muted-foreground);font-size:11px;line-height:1.45}
[data-v-4b7020f5]{background:color-mix(in srgb, var(--muted) 42%, var(--background));box-shadow:none}
[data-v-4b7020f5]{justify-content:space-between;align-items:center;gap:12px;display:flex}
[data-v-4b7020f5] [data-slot=card-title]{font-size:12px}
[data-v-4b7020f5]{grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;display:grid}
[data-v-4b7020f5] [data-slot=field]{background:color-mix(in srgb, var(--background) 76%, var(--muted));border-radius:9px;justify-content:space-between;gap:10px;padding:8px 9px}
[data-v-4b7020f5]{background:color-mix(in srgb, var(--background) 76%, var(--muted));border-radius:9px;gap:9px;padding:10px}
[data-v-4b7020f5]{grid-template-columns:repeat(auto-fit,minmax(92px,1fr));gap:6px;display:grid}
[data-v-4b7020f5]{border:1px solid color-mix(in srgb, var(--border) 74%, transparent);background:var(--background);min-width:0;color:var(--foreground);cursor:pointer;border-radius:8px;align-items:center;gap:7px;padding:7px 8px;font-size:12px;display:flex}
[data-v-4b7020f5]{background:color-mix(in srgb, var(--muted) 34%, var(--background));margin:0;padding:13px 20px 16px}
[data-v-4b7020f5]{width:30px;height:30px;color:var(--foreground);background:var(--muted);border-radius:9px;flex:none;justify-content:center;align-items:center;display:inline-flex}
[data-v-4b7020f5]{flex:1;min-width:0}
[data-v-4b7020f5] [data-slot=card-title]{font-size:13px;line-height:1.35}
[data-v-4b7020f5] [data-slot=card-description]{text-overflow:ellipsis;white-space:nowrap;margin-top:3px;font-size:11px;line-height:1.45;overflow:hidden}
[data-v-4b7020f5]{flex:none;animation:.9s linear infinite activity-spin-4b7020f5}
[data-v-4b7020f5]{text-overflow:ellipsis;overflow:hidden}
</style>
