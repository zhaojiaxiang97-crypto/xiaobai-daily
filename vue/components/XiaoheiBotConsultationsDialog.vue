<template>
<button data-v-a372ed2c type="button" :class="`flex w-full items-center gap-3 rounded-xl border border-border/60 p-4 text-left transition-colors hover:border-primary/20 hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/15`" @click="t=>k(e.id)"><component :is="Yo" :size="18" :class="`shrink-0 text-primary/70`" /><span><strong>{{ toDisplayString(e.ownerName)+` → `+toDisplayString(e.targetName) }}</strong><span>{{ e.question }}</span><time>{{ D(e.createdAt) }}</time></span><component :is="Pp" variant="secondary" :class="`shrink-0`" /><component :is="dn" :size="14" :class="`shrink-0`" /></button>
</template>

<script setup>
import { toDisplayString } from 'vue';
import xl from './MenuRadioItem.vue';
import Pp from './Badge.vue';
import { S_Yo as Yo, S_is as is, S_e as e, S_t as t, S_p as p, S_w as w, S_D as D, S_k as k, S_dn as dn } from '../shared.js';
</script>

<style>
/* 从原应用 CSS 恢复（data-v-a372ed2c） */
[data-v-a372ed2c]{grid-template-columns:128px minmax(0,1fr) minmax(0,1fr);gap:8px;display:grid}
[data-v-a372ed2c] .consultation-control{background:var(--background);border-color:var(--input);min-width:0;box-shadow:none;border-radius:8px;height:34px!important;font-size:12px!important}
[data-v-a372ed2c] .consultation-control:focus-visible,.consultation-dialog[data-v-a372ed2c] .consultation-control[data-state=open],.consultation-dialog[data-v-a372ed2c] .consultation-action:focus-visible{border-color:var(--primary);box-shadow:0 0 0 2px color-mix(in srgb, var(--primary) 15%, transparent);outline:none}
[data-v-a372ed2c] .consultation-action{border-radius:8px;height:32px;font-size:12px}
[data-v-a372ed2c]{grid-template-columns:minmax(0,1fr) minmax(0,1fr)}
[data-v-a372ed2c] [data-slot=select-trigger]{grid-column:1/-1}
[data-v-a372ed2c]{flex-direction:column;gap:20px;padding-top:4px;display:flex}
[data-v-a372ed2c]{align-items:flex-start;gap:8px;display:flex}
[data-v-a372ed2c]{flex-direction:row-reverse}
[data-v-a372ed2c]{background:var(--muted);width:30px;height:30px;color:var(--muted-foreground);border-radius:50%;flex-shrink:0;justify-content:center;align-items:center;margin-top:22px;font-size:12px;display:flex;overflow:hidden}
[data-v-a372ed2c]{object-fit:cover;width:100%;height:100%}
[data-v-a372ed2c]{flex-direction:column;align-items:flex-start;gap:5px;min-width:0;max-width:calc(100% - 76px);display:flex}
[data-v-a372ed2c]{align-items:flex-end}
[data-v-a372ed2c]{color:var(--muted-foreground);font-size:12px}
[data-v-a372ed2c]{border:1px solid color-mix(in srgb, var(--border) 65%, transparent);background:var(--muted);border-radius:4px 12px 12px;min-width:0;max-width:100%;padding:10px 12px}
[data-v-a372ed2c]{background:color-mix(in srgb, var(--primary) 7%, var(--background));border-color:color-mix(in srgb, var(--primary) 12%, transparent);border-radius:12px 4px 12px 12px}
[data-v-a372ed2c]{color:var(--muted-foreground);opacity:.75;font-size:10px}
[data-v-a372ed2c]{animation:none}
[data-v-a372ed2c]{overflow-wrap:anywhere}
[data-v-a372ed2c] .markdown-body{font-size:13px}
[data-v-a372ed2c] pre{max-width:100%;overflow-x:auto}
</style>
