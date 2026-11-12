<template>
<details data-v-8f77b8e0><summary><component :is="Pp" variant="outline" /><span>{{ `#`+toDisplayString(e.chunkSeq) }}</span><time>{{ _(e.occurredAt) }}</time></summary><pre>{{ JSON.stringify(e.payload,null,2) }}</pre></details>
</template>

<script setup>
import { toDisplayString } from 'vue';
import Pp from './Badge.vue';
import { S_is as is, S_pre as pre, S__ as _ } from '../shared.js';
const e = defineProps({});
</script>

<style>
/* 从原应用 CSS 恢复（data-v-8f77b8e0） */
[data-v-8f77b8e0]{background:var(--background);flex-direction:column;display:flex}
[data-v-8f77b8e0]{border-bottom:1px solid var(--border);flex-direction:row;justify-content:space-between;align-items:flex-start;gap:16px;min-height:68px;padding:16px 18px 14px;display:flex}
[data-v-8f77b8e0]{min-width:0}
[data-v-8f77b8e0] [data-slot=dialog-title]{font-size:15px;line-height:1.4}
[data-v-8f77b8e0] [data-slot=dialog-description]{margin-top:3px;font-size:11px;line-height:1.45}
[data-v-8f77b8e0],.conversation-log__toolbar[data-v-8f77b8e0]{align-items:center;gap:6px;display:flex}
[data-v-8f77b8e0]{flex:none}
[data-v-8f77b8e0]{border-bottom:1px solid var(--border);-webkit-app-region:no-drag;padding:10px 14px}
[data-v-8f77b8e0]{flex:1;min-width:180px}
[data-v-8f77b8e0]{gap:8px;padding:10px 14px 0;display:grid}
[data-v-8f77b8e0]{flex:1;grid-template-columns:minmax(280px,340px) minmax(0,1fr);min-height:0;display:grid}
[data-v-8f77b8e0],.conversation-log__detail[data-v-8f77b8e0]{min-width:0;min-height:0}
[data-v-8f77b8e0]{border-right:1px solid var(--border);background:color-mix(in srgb, var(--muted) 24%, var(--background))}
[data-v-8f77b8e0],.conversation-log__detail-scroll[data-v-8f77b8e0]{height:100%}
[data-v-8f77b8e0]{gap:6px;padding:10px}
[data-v-8f77b8e0]{cursor:pointer;min-width:0;color:var(--foreground);background:var(--background);text-align:left;-webkit-app-region:no-drag}
[data-v-8f77b8e0]:hover,.conversation-log__event--active[data-v-8f77b8e0]{border-color:color-mix(in srgb, var(--ring) 48%, var(--border));background:var(--accent)}
[data-v-8f77b8e0]{box-shadow:0 0 0 1px color-mix(in srgb, var(--ring) 18%, transparent)}
[data-v-8f77b8e0] [data-slot=item-title]{justify-content:space-between;gap:8px;width:100%}
[data-v-8f77b8e0] [data-slot=item-title]>span{text-overflow:ellipsis;white-space:nowrap;min-width:0;overflow:hidden}
[data-v-8f77b8e0] [data-slot=item-description]{flex-direction:column;align-items:flex-start;gap:2px;min-width:0;font-size:10px;display:flex}
[data-v-8f77b8e0] [data-slot=item-description]>span{text-overflow:ellipsis;white-space:nowrap;max-width:100%;font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;overflow:hidden}
[data-v-8f77b8e0]{justify-content:center;padding:2px 10px 14px;display:flex}
[data-v-8f77b8e0]{min-height:220px;color:var(--muted-foreground);border:0}
[data-v-8f77b8e0]{min-height:420px}
[data-v-8f77b8e0]{flex-direction:column;gap:18px;padding:18px 20px 24px;display:flex}
[data-v-8f77b8e0]{justify-content:space-between;align-items:flex-start;gap:12px;display:flex}
[data-v-8f77b8e0],.conversation-log__payload h4[data-v-8f77b8e0],.conversation-log__relations h4[data-v-8f77b8e0],.conversation-log__diagnostics h4[data-v-8f77b8e0]{color:var(--foreground);margin:0;font-size:12px;font-weight:600;line-height:1.4}
[data-v-8f77b8e0]{color:var(--muted-foreground);margin-top:3px;font-size:10px;display:block}
[data-v-8f77b8e0]{grid-template-columns:repeat(2,minmax(0,1fr));gap:10px 18px;margin:0;display:grid}
[data-v-8f77b8e0]{min-width:0}
[data-v-8f77b8e0]{color:var(--muted-foreground);font-size:9px;line-height:1.4}
[data-v-8f77b8e0]{color:var(--foreground);text-overflow:ellipsis;white-space:nowrap;margin:3px 0 0;font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;font-size:10px;line-height:1.5;overflow:hidden}
[data-v-8f77b8e0],.conversation-log__relations[data-v-8f77b8e0],.conversation-log__diagnostics[data-v-8f77b8e0]{flex-direction:column;gap:8px;min-width:0;display:flex}
[data-v-8f77b8e0],.conversation-log__diagnostic-list pre[data-v-8f77b8e0]{border:1px solid var(--border);max-width:100%;color:var(--foreground);background:color-mix(in srgb, var(--muted) 46%, var(--background));white-space:pre-wrap;word-break:break-word;border-radius:9px;margin:0;padding:12px;font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;font-size:10px;line-height:1.55;overflow:auto}
[data-v-8f77b8e0]{flex-direction:column;align-items:flex-start;gap:2px;display:flex}
[data-v-8f77b8e0]>*{justify-content:flex-start;max-width:100%}
[data-v-8f77b8e0]{flex-direction:column;gap:6px;display:flex}
[data-v-8f77b8e0]{border:1px solid var(--border);background:var(--background);border-radius:9px}
[data-v-8f77b8e0]{color:var(--muted-foreground);cursor:pointer;align-items:center;gap:8px;padding:8px 10px;font-size:9px;display:flex}
[data-v-8f77b8e0]{margin-left:auto}
[data-v-8f77b8e0]{border-width:1px 0 0;border-radius:0 0 8px 8px}
[data-v-8f77b8e0]{flex:none;animation:.9s linear infinite activity-spin-8f77b8e0}
[data-v-8f77b8e0]{text-overflow:ellipsis;overflow:hidden}
</style>
