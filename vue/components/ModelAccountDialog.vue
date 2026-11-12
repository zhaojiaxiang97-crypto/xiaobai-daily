<template>
<component data-v-a2403230 :is="P" type="button" variant="outline" :class="`provider-auth-option`" @click="t=>p(e.id)" />
</template>

<script setup>
import { S_is as is, S_t as t, S_p as p, S_P as P } from '../shared.js';
const e = defineProps({
      open: {
        type: Boolean,
        default: false
      },
      openModifiers: {}
    });
</script>

<style>
/* 从原应用 CSS 恢复（data-v-a2403230） */
[data-v-a2403230]{flex:none;padding:18px 20px 15px}
[data-v-a2403230] [data-slot=dialog-title]{font-size:16px}
[data-v-a2403230] [data-slot=dialog-description]{margin-top:3px;font-size:12px;line-height:1.45}
[data-v-a2403230]{height:min(520px,100vh - 176px);min-height:0;padding:0 20px 20px}
[data-v-a2403230] [data-slot=alert]{margin-bottom:10px}
[data-v-a2403230]{min-height:180px;color:var(--muted-foreground);justify-content:center;align-items:center;gap:8px;font-size:12px;display:flex}
[data-v-a2403230],.provider-auth-progress-card__title>svg[data-v-a2403230]{width:17px;height:17px}
[data-v-a2403230]{flex-direction:column;gap:8px;display:flex}
[data-v-a2403230],.provider-auth-progress-card[data-v-a2403230]{background:color-mix(in srgb, var(--muted) 42%, var(--background));box-shadow:none}
[data-v-a2403230],.provider-auth-progress-card__title[data-v-a2403230]{align-items:center;gap:10px;min-width:0;display:flex}
[data-v-a2403230] [data-slot=badge]{flex:none}
[data-v-a2403230]{margin-bottom:10px}
[data-v-a2403230],.provider-auth-prompt[data-v-a2403230]{color:var(--muted-foreground);flex-direction:column;gap:7px;font-size:12px;line-height:1.5;display:flex}
[data-v-a2403230]{border:1px solid var(--border);width:fit-content;color:var(--foreground);background:var(--background);letter-spacing:.08em;border-radius:8px;padding:7px 10px;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:18px}
[data-v-a2403230]{word-break:break-all}
[data-v-a2403230]{margin-top:10px}
[data-v-a2403230]{color:var(--foreground);font-size:12px}
[data-v-a2403230]{gap:7px;display:grid}
[data-v-a2403230]{white-space:normal;flex-direction:column;align-items:flex-start;gap:1px;height:auto;min-height:38px;padding-block:7px}
[data-v-a2403230]{color:var(--muted-foreground);font-size:10px;font-weight:400}
[data-v-a2403230]{grid-template-columns:minmax(0,1fr) auto;gap:8px;display:grid}
[data-v-a2403230]{background:color-mix(in srgb, var(--muted) 34%, var(--background));margin:0;padding:13px 20px 16px}
[data-v-a2403230]{width:30px;height:30px;color:var(--foreground);background:var(--muted);border-radius:9px;flex:none;justify-content:center;align-items:center;display:inline-flex}
[data-v-a2403230]{flex:1;min-width:0}
[data-v-a2403230] [data-slot=card-title]{font-size:13px;line-height:1.35}
[data-v-a2403230] [data-slot=card-description]{text-overflow:ellipsis;white-space:nowrap;margin-top:3px;font-size:11px;line-height:1.45;overflow:hidden}
[data-v-a2403230]{flex:none;animation:.9s linear infinite activity-spin-a2403230}
[data-v-a2403230]{text-overflow:ellipsis;overflow:hidden}
</style>
