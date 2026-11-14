<template>
<button data-v-a2cfabe0 type="button" role="tab" :class="[`flex min-w-0 flex-col items-center rounded-md px-0.5 pt-2 pb-1.5 transition-colors`,y===t?`bg-black/[0.04]`:`hover:bg-black/[0.03]`]" :aria-selected="y===t" @click="e=>y=t"><span :class="[`year-trend-value text-xs leading-none tabular-nums whitespace-nowrap`,[y===t||v?.value===t?`font-semibold text-(--foreground)`:`text-[#999]`,{'is-selected':y===t}]]">{{ w(e.records) }}</span><div><span :class="`w-full max-w-[28px] rounded-t-[4px] rounded-b-[2px] transition-[height] duration-200`" :style="C(e.records,t)"></span></div><span :class="[`mt-2 text-xs leading-none whitespace-nowrap`,y===t?`font-medium text-(--foreground)`:`text-[#555]`]">{{ e.label }}</span></button>
</template>

<script setup>
import md from './BaseSeparator.vue';

// [兜底] 模板引用但无来源的符号
import { S_is as is, S_xs as xs, S_pb as pb, S_px as px, S_e as e, S_t as t, S_b as b, S_at as at, S_mt as mt } from '../shared.js';
const v = { value: undefined };
import { ref } from 'vue';

// [setup 还原] 原组件 setup 里初值不依赖 IPC 的声明
let y = ref(0);
function C(e, t) {
  return e <= 0 ? {
    height: `2px`,
    background: `var(--heatmap-empty)`
  } : {
    height: `max(3px, ${e / _.value * 100}%)`,
    background: t === v.value ? `var(--heatmap-4)` : `var(--heatmap-2)`
  };
}
function w(e) {
  return WU(e, a.value);
}
</script>

<style>
/* 从原应用 CSS 恢复（data-v-a2cfabe0） */
[data-v-a2cfabe0]{container-type:inline-size}
[data-v-a2cfabe0]:not(.is-selected){visibility:hidden}
[data-v-a2cfabe0]{place-items:center;width:64px;height:66px;margin:0 auto 7px;transition:transform .2s;display:grid;position:relative}
[data-v-a2cfabe0]{object-fit:contain;width:100%;height:100%;display:block}
[data-v-a2cfabe0]{transform:translateY(-3px)}
[data-v-a2cfabe0]{filter:grayscale();opacity:.45}
[data-v-a2cfabe0]{border:1px solid color-mix(in srgb, var(--border) 80%, transparent);background:var(--background);height:16px;color:var(--foreground);font-variant-numeric:tabular-nums;border-radius:999px;padding:0 5px;font-size:10px;font-weight:600;line-height:14px;position:absolute;bottom:5px;right:-4px}
[data-v-a2cfabe0]{border-color:color-mix(in srgb, var(--primary) 35%, var(--border));color:var(--primary)}
[data-v-a2cfabe0]{gap:3px;width:60px;max-width:100%;margin-top:8px;display:flex}
[data-v-a2cfabe0]{background:color-mix(in srgb, var(--foreground) 8%, transparent);border-radius:999px;flex:1;height:3px;overflow:hidden}
[data-v-a2cfabe0]{border-radius:inherit;background:var(--primary);height:100%;display:block}
[data-v-a2cfabe0]{border:1px solid color-mix(in srgb, var(--border) 80%, transparent);background:color-mix(in srgb, var(--background) 90%, var(--card));width:18px;height:18px;color:var(--muted-foreground);border-radius:50%;place-items:center;display:grid;position:absolute;bottom:6px;right:4px}
[data-v-a2cfabe0]{border:1px solid color-mix(in srgb, var(--primary) 18%, var(--border));background:color-mix(in srgb, var(--primary) 8%, var(--background));width:100%;min-height:38px;color:var(--foreground);cursor:pointer;border-radius:9px;justify-content:center;align-items:center;gap:6px;margin-top:14px;padding:0 12px;font-size:12px;font-weight:500;display:flex}
[data-v-a2cfabe0]:hover{background:color-mix(in srgb, var(--primary) 12%, var(--background))}
[data-v-a2cfabe0]{border:1px solid color-mix(in srgb, var(--border) 85%, transparent);cursor:pointer;background:0 0;border-radius:8px;width:100%;min-height:36px;margin-top:12px;font-size:12px}
[data-v-a2cfabe0]{border:1px solid color-mix(in srgb, var(--border) 90%, transparent);background:var(--card);width:min(560px,100vw - 32px);max-height:min(760px,100dvh - 40px);color:var(--foreground);border-radius:16px;margin:auto;padding:0;position:fixed;inset:0;overflow:hidden}
[data-v-a2cfabe0]{flex-direction:column;display:flex}
[data-v-a2cfabe0]{width:min(420px,100vw - 32px)}
[data-v-a2cfabe0]::backdrop{background:color-mix(in srgb, var(--foreground) 22%, transparent);-webkit-backdrop-filter:blur(3px);backdrop-filter:blur(3px)}
[data-v-a2cfabe0]{border-bottom:1px solid color-mix(in srgb, var(--border) 78%, transparent);flex:none;justify-content:space-between;align-items:center;gap:12px;padding:18px 22px;display:flex}
[data-v-a2cfabe0]{margin:0;font-size:18px;font-weight:600}
[data-v-a2cfabe0]{align-items:center;gap:6px;display:flex}
[data-v-a2cfabe0]{text-align:center;min-width:40px;color:var(--muted-foreground);font-variant-numeric:tabular-nums;font-size:12px}
[data-v-a2cfabe0]{border:1px solid var(--border);width:28px;height:28px;color:var(--muted-foreground);cursor:pointer;background:0 0;border-radius:50%;place-items:center;display:grid}
[data-v-a2cfabe0]:hover{color:var(--foreground);background:color-mix(in srgb, var(--muted) 45%, var(--card))}
[data-v-a2cfabe0]{border:1px solid var(--border);background:color-mix(in srgb, var(--muted) 25%, var(--card));width:32px;height:32px;color:var(--muted-foreground);cursor:pointer;border-radius:50%;flex:none;place-items:center;margin-left:6px;display:grid}
[data-v-a2cfabe0]:hover{color:var(--foreground);background:color-mix(in srgb, var(--muted) 45%, var(--card))}
[data-v-a2cfabe0]{min-height:0;padding:20px 22px 18px;overflow-y:auto}
[data-v-a2cfabe0]{text-align:center}
[data-v-a2cfabe0]{width:132px;height:132px;margin:0 auto 12px}
[data-v-a2cfabe0]{margin:0;font-size:18px}
[data-v-a2cfabe0]{color:var(--muted-foreground);margin:8px 0 0;font-size:11px;line-height:1.6}
[data-v-a2cfabe0]{text-align:left;grid-template-columns:1fr 1fr;gap:10px;margin-top:16px;display:grid}
[data-v-a2cfabe0]{font-size:13px;display:block}
[data-v-a2cfabe0]{color:var(--muted-foreground);margin-top:4px;font-size:10px;display:block}
[data-v-a2cfabe0]{background:color-mix(in srgb, var(--primary) 10%, transparent);color:var(--primary);vertical-align:2px;font-variant-numeric:tabular-nums;border-radius:999px;margin-left:4px;padding:1px 6px;font-size:11px;font-weight:600}
[data-v-a2cfabe0]{border:1px solid color-mix(in srgb, var(--border) 80%, transparent);text-align:left;border-radius:10px;margin:14px 0 0;padding:0;list-style:none}
[data-v-a2cfabe0]{grid-template-columns:36px minmax(0,1fr) auto;align-items:center;gap:10px;padding:8px 12px;font-size:12px;display:grid}
[data-v-a2cfabe0]{border-top:1px solid color-mix(in srgb, var(--border) 60%, transparent)}
[data-v-a2cfabe0]{color:var(--muted-foreground);font-variant-numeric:tabular-nums;font-weight:600}
[data-v-a2cfabe0]{color:var(--primary)}
[data-v-a2cfabe0]{text-overflow:ellipsis;white-space:nowrap;font-variant-numeric:tabular-nums;min-width:0;overflow:hidden}
[data-v-a2cfabe0]{color:var(--muted-foreground);font-variant-numeric:tabular-nums;align-items:center;gap:6px;font-size:11px;display:inline-flex}
[data-v-a2cfabe0]{color:var(--primary);gap:3px}
[data-v-a2cfabe0]{background:color-mix(in srgb, var(--muted) 60%, transparent);border-radius:999px;width:48px;height:4px;overflow:hidden}
[data-v-a2cfabe0]{border-radius:inherit;background:color-mix(in srgb, var(--primary) 65%, var(--foreground));height:100%;display:block}
[data-v-a2cfabe0],.year-badge-hint[data-v-a2cfabe0]{text-align:left;margin-top:10px!important}
</style>
