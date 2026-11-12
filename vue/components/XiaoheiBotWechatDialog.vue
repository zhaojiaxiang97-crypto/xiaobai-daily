<template>
<component data-v-ca267b32 :is="ui" :open="!!e.contact" @update:open="e=>!e&&o(`close`)" />
</template>

<script setup>
import { S_is as is, S_o as o, S_ui as ui } from '../shared.js';
const e = defineProps({
      contact: {},
      avatar: {},
      binding: {},
      login: {},
      busy: {
        type: Boolean
      },
      error: {},
      now: {}
    });
</script>

<style>
/* 从原应用 CSS 恢复（data-v-ca267b32） */
[data-v-ca267b32]{border-radius:20px;gap:0;max-height:calc(100dvh - 48px);padding:0;overflow-y:auto}
[data-v-ca267b32]{border-bottom:1px solid var(--border);text-align:left;padding:20px 48px 20px 20px}
[data-v-ca267b32]{flex-direction:column;align-items:center;gap:18px;padding:22px 24px 24px;display:flex}
[data-v-ca267b32]{gap:16px}
[data-v-ca267b32]{justify-content:center;align-items:center;gap:12px;max-width:100%;display:flex}
[data-v-ca267b32]{border-radius:14px;flex-shrink:0;width:48px;height:48px}
[data-v-ca267b32]{text-overflow:ellipsis;white-space:nowrap;font-size:14px;font-weight:600;display:block;overflow:hidden}
[data-v-ca267b32]{color:var(--muted-foreground);margin-top:4px;font-size:11px;display:block}
[data-v-ca267b32]{background:color-mix(in srgb, var(--primary) 10%, var(--background));width:62px;height:62px;color:var(--primary);border-radius:20px;place-items:center;display:grid}
[data-v-ca267b32]{color:var(--muted-foreground);background:var(--muted)}
[data-v-ca267b32]{text-align:center}
[data-v-ca267b32]{margin:0;font-size:18px;font-weight:600;line-height:1.5}
[data-v-ca267b32]{color:var(--muted-foreground);margin:6px 0 0;font-size:12px;line-height:1.7}
[data-v-ca267b32]{background:color-mix(in srgb, var(--muted) 65%, var(--background));border-radius:12px;flex-direction:column;gap:12px;width:100%;margin:0;padding:16px;font-size:12px;display:flex}
[data-v-ca267b32]{justify-content:space-between;align-items:center;gap:18px;display:flex}
[data-v-ca267b32]{color:var(--muted-foreground);flex-shrink:0;font-size:11px}
[data-v-ca267b32]{text-align:right;min-width:0}
[data-v-ca267b32]{justify-content:flex-end;align-items:center;gap:6px;display:flex}
[data-v-ca267b32]{flex-shrink:0;width:22px;height:22px}
[data-v-ca267b32]:last-child{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}
[data-v-ca267b32]{border:1px solid var(--border);background:#fff;border-radius:20px;flex-shrink:0;justify-content:center;align-items:center;width:224px;height:224px;padding:5px;display:flex;overflow:hidden}
[data-v-ca267b32]{text-align:center;font-size:12px;font-weight:500}
[data-v-ca267b32]{color:var(--muted-foreground);align-items:center;gap:8px;font-size:11px;display:flex}
[data-v-ca267b32]{border-top:1px solid var(--border);background:color-mix(in srgb, var(--muted) 20%, var(--background));flex-wrap:wrap;justify-content:flex-end;align-items:center;gap:8px;padding:14px 20px;display:flex}
[data-v-ca267b32]{color:var(--destructive);border-color:color-mix(in srgb, var(--destructive) 25%, var(--border))}
[data-v-ca267b32]:hover{color:var(--destructive);background:color-mix(in srgb, var(--destructive) 5%, var(--background))}
[data-v-ca267b32]{text-align:center;color:var(--destructive);overflow-wrap:anywhere;font-size:12px}
</style>
