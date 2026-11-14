<template>
<button data-v-b0fa3887 type="button" :aria-pressed="_===e.key" @click="t=>b(e.key)"><span><component :is="Be(e.icon)" :size="16" /></span><span><strong><span v-text="t(`xiaoheiBot.onboardingCard.${e.key}`)" /></strong><small><span v-text="t(`xiaoheiBot.onboardingCard.${e.key}Hint`)" /></small></span><component :is="an" :class="`onboarding-card__choice-check`" :size="13" /></button>
</template>

<script setup>
import { ref } from 'vue';

// [setup 还原] 原组件 setup 里初值不依赖 IPC 的声明
let _ = ref(``);
function b(e) {
  _.value = e, p.value = t(`xiaoheiBot.onboardingCard.${e}Purpose`);
}
import { S_is as is, S_e as e, S_t as t, S_v as v, S_Be as Be, S_an as an } from '../shared.js';
</script>

<style>
/* 从原应用 CSS 恢复（data-v-b0fa3887） */
[data-v-b0fa3887]{border:1px solid var(--border);background:var(--background);border-radius:14px;flex-direction:column;gap:16px;width:min(100%,480px);min-width:0;padding:18px;display:flex}
[data-v-b0fa3887]{font-size:14px;font-weight:600}
[data-v-b0fa3887]{color:var(--muted-foreground);margin:5px 0 0;font-size:12px;line-height:1.6}
[data-v-b0fa3887]{border:0;flex-direction:column;gap:18px;min-width:0;margin:0;padding:0;display:flex}
[data-v-b0fa3887]{align-items:center;gap:14px;display:flex}
[data-v-b0fa3887]{border:1px solid var(--border);background:var(--muted);cursor:pointer;border-radius:15px;flex-shrink:0;width:52px;height:52px;padding:4px;position:relative}
[data-v-b0fa3887]{object-fit:cover;border-radius:11px;width:100%;height:100%}
[data-v-b0fa3887]{border:1px solid var(--border);background:var(--background);width:21px;height:21px;color:var(--muted-foreground);border-radius:50%;place-items:center;display:grid;position:absolute;bottom:-3px;right:-3px}
[data-v-b0fa3887]{flex:1;gap:6px;min-width:0;display:grid}
[data-v-b0fa3887]{font-size:12px;font-weight:500}
[data-v-b0fa3887]{color:var(--muted-foreground);margin-left:4px;font-size:11px;font-weight:400}
[data-v-b0fa3887]{flex-direction:column;gap:9px;display:flex}
[data-v-b0fa3887]{grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;display:grid}
[data-v-b0fa3887]{border:1px solid var(--border);min-width:0;color:var(--foreground);background:var(--background);text-align:left;cursor:pointer;border-radius:10px;align-items:center;gap:9px;padding:10px;transition:background .12s,border-color .12s;display:flex;position:relative}
[data-v-b0fa3887]:hover{background:var(--muted)}
[data-v-b0fa3887]{border-color:var(--primary);background:color-mix(in srgb, var(--primary) 5%, var(--background))}
[data-v-b0fa3887]{background:var(--muted);width:28px;height:28px;color:var(--muted-foreground);border-radius:8px;flex-shrink:0;place-items:center;display:grid}
[data-v-b0fa3887]{background:color-mix(in srgb, var(--primary) 10%, var(--background));color:var(--primary)}
[data-v-b0fa3887]{flex-direction:column;gap:3px;min-width:0;display:flex}
[data-v-b0fa3887]{font-size:12px;font-weight:500}
[data-v-b0fa3887]{color:var(--muted-foreground);font-size:10px;line-height:1.4}
[data-v-b0fa3887]{color:var(--primary);position:absolute;top:6px;right:6px}
[data-v-b0fa3887]{grid-template-columns:1fr}
[data-v-b0fa3887]{padding:14px}
[data-v-b0fa3887]:focus-visible{outline:2px solid var(--ring);outline-offset:2px}
[data-v-b0fa3887]{border:1px solid var(--border);background:var(--muted);border-radius:10px;justify-content:space-between;align-items:flex-start;gap:12px;padding:12px;display:flex}
[data-v-b0fa3887]{font-size:12px;font-weight:600;display:block}
[data-v-b0fa3887]{color:var(--muted-foreground);margin:4px 0 0;font-size:11px;line-height:1.55}
[data-v-b0fa3887]{color:var(--muted-foreground);margin:0;font-size:11px;line-height:1.7}
[data-v-b0fa3887]{justify-content:space-between;gap:8px;display:flex}
[data-v-b0fa3887]:disabled{opacity:.6}
</style>
