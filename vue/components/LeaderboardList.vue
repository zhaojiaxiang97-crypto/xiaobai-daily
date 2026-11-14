<template>
<div data-v-1729278b><component :is="St" name="lb-row" tag="div" :class="`lb-list-rows`" /><div><div :class="`lb-row-bar`" :style="at({width:o(event.pinnedMe.recordCount)})"></div><span>{{ event.pinnedMe.rank }}</span><component :is="Ly" :name="event.pinnedMe.displayName" :avatar-url="event.pinnedMe.avatarUrl" :color-key="event.pinnedMe.userKey" :size="32" /><div><div><span>{{ event.pinnedMe.displayName }}</span><span>{{ n(`leaderboard.myPosition`) }}</span></div><span>{{ event.pinnedHint }}</span></div><component :is="Eg" :item="event.pinnedMe" /><span><span v-text="n(`leaderboard.records`,{count:event.pinnedMe.recordCount})" /></span></div></div>
</template>

<script setup>
import Ly from './LeaderboardAvatar.vue';
// [符号说明] n~computed
import { S_is as is, S_n as n, S_v as v, S_at as at, S_St as St } from '../shared.js';
const event = defineProps({
      allItems: {},
      items: {},
      pinnedMe: {},
      pinnedHint: {},
      showTop10Line: {
        type: Boolean
      }
    });
const t = event;

// [兜底] 模板引用但无来源的符号
const Eg = { value: undefined };

// [setup 还原] 原组件 setup 里初值不依赖 IPC 的声明
function o(e) {
  return `${Math.max(4, Math.round(e / r.value * 100))}%`;
}
</script>

<style>
/* 从原应用 CSS 恢复（data-v-1729278b） */
[data-v-1729278b]{flex-direction:column;gap:6px;display:flex}
[data-v-1729278b]{flex-direction:column;gap:6px;display:flex;position:relative}
[data-v-1729278b]{background:#fff9;border-radius:8px;grid-template-columns:28px 32px minmax(0,1fr) auto 84px;align-items:center;gap:12px;padding:9px 14px 9px 10px;transition:background .14s;display:grid;position:relative;overflow:hidden}
[data-v-1729278b]:hover{background:#fff}
[data-v-1729278b]{background:var(--secondary)}
[data-v-1729278b]:hover{background:var(--settings-ghost-hover,#2b3137)}
[data-v-1729278b]{pointer-events:none;background:#10b9810f;transition:width .7s cubic-bezier(.22,1,.36,1);position:absolute;inset:0 auto 0 0}
[data-v-1729278b]{background:#34d39914}
[data-v-1729278b]>:not(.lb-row-bar){position:relative}
[data-v-1729278b]{background:#10b9811a}
[data-v-1729278b]{background:#34d3991f}
[data-v-1729278b]{font-variant-numeric:tabular-nums;text-align:center;color:#999;font-size:13px;font-weight:600}
[data-v-1729278b]{color:#059669}
[data-v-1729278b]{color:#34d399}
[data-v-1729278b]{flex-direction:column;gap:3px;min-width:0;display:flex}
[data-v-1729278b]{align-items:center;gap:6px;min-width:0;display:flex}
[data-v-1729278b]{white-space:nowrap;text-overflow:ellipsis;color:var(--foreground);font-size:13px;font-weight:600;overflow:hidden}
[data-v-1729278b]{white-space:nowrap;text-overflow:ellipsis;color:#9aa0a8;font-size:11px;overflow:hidden}
[data-v-1729278b]{font-variant-numeric:tabular-nums;text-align:right;color:var(--foreground);font-size:14px;font-weight:600}
[data-v-1729278b]{color:#047857;background:#10b98124;border-radius:4px;flex-shrink:0;padding:1px 5px;font-size:11px}
[data-v-1729278b]{color:#6ee7b7}
[data-v-1729278b]{color:#b0b5bc;align-items:center;gap:10px;padding:4px;font-size:11px;font-weight:600;display:flex}
[data-v-1729278b]:before,.lb-divider[data-v-1729278b]:after{content:"";border-top:1px dashed #0000001f;flex:1;height:0}
[data-v-1729278b]:before,.dark .lb-divider[data-v-1729278b]:after{border-top-color:#ffffff1f}
[data-v-1729278b]{justify-content:center;gap:4px;padding:2px 0;display:flex}
[data-v-1729278b]{background:#c4c8ce;border-radius:999px;width:4px;height:4px}
[data-v-1729278b],.lb-row-enter-active[data-v-1729278b],.lb-row-leave-active[data-v-1729278b]{transition:transform .42s cubic-bezier(.22,1,.36,1),opacity .3s}
[data-v-1729278b],.lb-row-leave-to[data-v-1729278b]{opacity:0;transform:translateY(8px)}
[data-v-1729278b]{position:absolute;left:0;right:0}
[data-v-1729278b],.lb-row-enter-active[data-v-1729278b],.lb-row-leave-active[data-v-1729278b],.lb-row-bar[data-v-1729278b]{transition:none}
</style>
