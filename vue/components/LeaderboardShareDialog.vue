<template>
<button data-v-2f9cfa3f type="button" :class="[`lb-share-template`,{'is-selected':e.id===o?.value}]" :aria-pressed="e.id===o?.value" @click="t=>o.value=e.id"><span><canvas ref="t => D(e.id, t)"></canvas></span><span><span v-text="r(`leaderboard.templates.${e.id}`)" /></span></button>
</template>

<script setup>
// [符号说明] D=useConfigProviderContext
import { S_is as is, S_e as e, S_r as r, S_v as v, S_D as D } from '../shared.js';
const text = defineProps({});
const t = text;

// [兜底] 模板引用但无来源的符号
const o = { value: undefined };
</script>

<style>
/* 从原应用 CSS 恢复（data-v-2f9cfa3f） */
[data-v-2f9cfa3f]{grid-template-columns:minmax(0,1.15fr) minmax(300px,.85fr);max-height:min(760px,100vh - 48px);display:grid}
[data-v-2f9cfa3f]{background:radial-gradient(circle at 1px 1px,#0000000f 1px,#0000 0) 0 0/16px 16px,#f4f5f7;flex-direction:column;justify-content:center;align-items:center;gap:12px;min-height:0;padding:28px 24px 20px;display:flex}
[data-v-2f9cfa3f]{background:radial-gradient(circle at 1px 1px,#ffffff0d 1px,#0000 0) 0 0/16px 16px,#111417}
[data-v-2f9cfa3f]{border-radius:14px;box-shadow:0 18px 40px #0000002e,0 2px 6px #00000014}
[data-v-2f9cfa3f]{color:#9aa0a8;font-size:11px}
[data-v-2f9cfa3f]{border-left:1px solid var(--border);flex-direction:column;gap:18px;min-height:0;padding:22px 22px 20px;display:flex;overflow-y:auto}
[data-v-2f9cfa3f]{flex-direction:column;gap:6px;padding-right:24px;display:flex}
[data-v-2f9cfa3f]{flex-direction:column;gap:10px;display:flex}
[data-v-2f9cfa3f]{color:var(--foreground);font-size:12px;font-weight:650}
[data-v-2f9cfa3f]{grid-template-columns:repeat(4,minmax(0,1fr));gap:8px;display:grid}
[data-v-2f9cfa3f]{border:1px solid var(--border);background:var(--card);min-width:0;color:var(--foreground);cursor:pointer;border-radius:10px;flex-direction:column;gap:5px;padding:5px;transition:border-color .14s,box-shadow .14s;display:flex}
[data-v-2f9cfa3f]:hover{border-color:color-mix(in srgb, var(--primary) 45%, var(--border))}
[data-v-2f9cfa3f]{border-color:var(--primary);box-shadow:0 0 0 1px var(--primary)}
[data-v-2f9cfa3f]:focus-visible{outline:2px solid var(--primary);outline-offset:2px}
[data-v-2f9cfa3f]{background:var(--muted);border-radius:6px;justify-content:center;align-items:center;height:92px;display:flex;overflow:hidden}
[data-v-2f9cfa3f]{border-radius:3px;max-width:100%;max-height:100%}
[data-v-2f9cfa3f]{white-space:nowrap;text-overflow:ellipsis;font-size:11px;overflow:hidden}
[data-v-2f9cfa3f]{flex-wrap:wrap;gap:6px;display:flex}
[data-v-2f9cfa3f]{border:1px solid var(--border);background:var(--card);color:var(--foreground);cursor:pointer;border-radius:999px;padding:6px 11px;font-size:12px;transition:all .14s}
[data-v-2f9cfa3f]:hover{border-color:color-mix(in srgb, var(--primary) 45%, var(--border))}
[data-v-2f9cfa3f]{border-color:var(--primary);background:color-mix(in srgb, var(--primary) 10%, var(--card));color:var(--primary);font-weight:600}
[data-v-2f9cfa3f]{color:var(--foreground);cursor:pointer;justify-content:space-between;align-items:center;gap:12px;font-size:13px;display:flex}
[data-v-2f9cfa3f]{color:#9aa0a8;font-size:11px;line-height:1.6}
[data-v-2f9cfa3f]{grid-template-columns:1fr 1fr;gap:10px;margin-top:auto;padding-top:4px;display:grid}
[data-v-2f9cfa3f]{border:1px solid var(--border);background:var(--card);height:38px;color:var(--foreground);cursor:pointer;border-radius:10px;justify-content:center;align-items:center;gap:6px;font-size:13px;font-weight:600;transition:background .14s,opacity .14s;display:inline-flex}
[data-v-2f9cfa3f]:hover:not(:disabled){background:var(--muted)}
[data-v-2f9cfa3f]{background:var(--primary);color:var(--primary-foreground);border-color:#0000}
[data-v-2f9cfa3f]:hover:not(:disabled){background:color-mix(in srgb, var(--primary) 88%, #000)}
[data-v-2f9cfa3f]:disabled{cursor:not-allowed;opacity:.55}
[data-v-2f9cfa3f]{grid-template-columns:1fr;overflow-y:auto}
[data-v-2f9cfa3f]{border-left:0;border-top:1px solid var(--border);overflow:visible}
</style>
