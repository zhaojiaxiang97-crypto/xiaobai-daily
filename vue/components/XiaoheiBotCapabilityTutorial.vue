<template>
<li data-v-6a70c3b4><span><component :is="cc" :size="14" />{{ E(e.toolName) }}</span><component :is="Pp" :variant="e.status===`failed`?`destructive`:`secondary`" /></li>
</template>

<script setup>
import Pp from './Badge.vue';

// [setup 还原] 原组件 setup 里初值不依赖 IPC 的声明
function E(e) {
  return e === `xiaohei_read_attachment` ? t(x(`readTool`)) : e === `write` ? t(x(`writeTool`)) : t(x(`otherTool`), {
    name: e ?? t(x(`tool`))
  });
}
import { S_is as is, S_cc as cc, S_e as e, S_li as li } from '../shared.js';
</script>

<style>
/* 从原应用 CSS 恢复（data-v-6a70c3b4） */
[data-v-6a70c3b4]{flex-shrink:0;justify-content:space-between;align-items:flex-start;gap:16px;padding:24px 24px 18px;display:flex}
[data-v-6a70c3b4]{flex-direction:column;gap:8px;min-width:0;display:flex}
[data-v-6a70c3b4]{color:var(--muted-foreground);flex-wrap:wrap;align-items:center;gap:8px;font-size:12px;display:flex}
[data-v-6a70c3b4]{border-bottom:1px solid var(--border);flex-shrink:0;padding:0 24px 18px}
[data-v-6a70c3b4]{cursor:pointer;min-width:70px}
[data-v-6a70c3b4]{overscroll-behavior:contain;min-height:0;padding:20px 24px;overflow-y:auto}
[data-v-6a70c3b4]{flex-direction:column;gap:16px;display:flex}
[data-v-6a70c3b4],.tutorial-intro h3[data-v-6a70c3b4]{margin:0;font-size:17px;font-weight:600;line-height:1.5}
[data-v-6a70c3b4],.tutorial-intro p[data-v-6a70c3b4]{color:var(--muted-foreground);margin:6px 0 0;font-size:13px;line-height:1.7}
[data-v-6a70c3b4]{text-align:center}
[data-v-6a70c3b4]{width:52px;height:52px;color:var(--primary);background:var(--muted);border-radius:14px;place-items:center;margin-bottom:14px;display:inline-grid}
[data-v-6a70c3b4]{grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;display:grid}
[data-v-6a70c3b4]{text-align:center;color:var(--muted-foreground);margin:0;font-size:12px;line-height:1.7}
[data-v-6a70c3b4]{white-space:pre-wrap;overflow-wrap:anywhere;margin:0;font-family:inherit;font-size:12px;line-height:1.8}
[data-v-6a70c3b4]{max-height:250px;overflow-y:auto}
[data-v-6a70c3b4]{color:var(--muted-foreground);margin:0;font-size:12px;line-height:1.6}
[data-v-6a70c3b4]{flex-direction:column;gap:12px;margin:0;padding:0;list-style:none;display:flex}
[data-v-6a70c3b4],.tutorial-tools li>span[data-v-6a70c3b4]{align-items:center;gap:8px;display:flex}
[data-v-6a70c3b4]{justify-content:space-between}
[data-v-6a70c3b4]{overflow-wrap:anywhere;min-width:0;font-size:13px}
[data-v-6a70c3b4]{justify-content:space-between;align-items:center;gap:12px;display:flex}
[data-v-6a70c3b4]{color:var(--muted-foreground);margin:0;font-size:12px;line-height:1.6}
[data-v-6a70c3b4]{border-top:1px solid var(--border);flex-shrink:0;justify-content:space-between;align-items:center;gap:12px;padding:16px 24px;display:flex}
[data-v-6a70c3b4]{color:var(--destructive);margin:0;padding:8px 24px;font-size:12px;line-height:1.6}
[data-v-6a70c3b4]{align-items:center;gap:8px;display:flex}
[data-v-6a70c3b4]{gap:8px;padding:18px 16px 14px}
[data-v-6a70c3b4]{padding:0 12px 14px}
[data-v-6a70c3b4]{min-width:0}
[data-v-6a70c3b4] h4{font-size:11px}
[data-v-6a70c3b4]{padding:16px}
[data-v-6a70c3b4]{padding:14px 16px}
[data-v-6a70c3b4]{gap:8px}
</style>
