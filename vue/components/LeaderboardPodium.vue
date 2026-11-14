<template>
<div data-v-3294a0c8 :class="`lb-podium-slot`" :data-rank="e.rank"><div><span :class="[`lb-podium-avatar`,{'is-me':e.isMe}]"><component :is="Ly" :name="e.displayName" :avatar-url="e.avatarUrl" :color-key="e.userKey" :size="e.rank===1?48:42" /><component :is="ao" :class="`lb-podium-crown`" :size="e.rank===1?18:16" :stroke-width="2" /></span><div><span>{{ e.displayName }}</span><span>{{ n(`leaderboard.currentUser`) }}</span></div><div><span v-text="n(`leaderboard.records`,{count:e.recordCount})" /></div><div><span><span v-text="n(`leaderboard.podiumLead`,{gap:i?.value})" /></span><component :is="Eg" :item="e" /></div></div><div><span>{{ e.rank }}</span></div></div>
</template>

<script setup>
import Ly from './LeaderboardAvatar.vue';
// [符号说明] n~computed
import { S_ao as ao, S_is as is, S_n as n, S_v as v, S_me as me } from '../shared.js';
const e = defineProps({
      items: {}
    });
const t = e;

// [兜底] 模板引用但无来源的符号
const i = { value: undefined };
const Eg = { value: undefined };
</script>

<style>
/* 从原应用 CSS 恢复（data-v-3294a0c8） */
[data-v-3294a0c8]{grid-template-columns:repeat(3,minmax(0,1fr));align-items:end;gap:16px;padding:4px 20px 0;display:grid}
[data-v-3294a0c8]{grid-template-columns:minmax(0,1fr);max-width:280px;margin:0 auto}
[data-v-3294a0c8]{grid-template-columns:repeat(2,minmax(0,1fr));max-width:560px;margin:0 auto}
[data-v-3294a0c8]{--stand-height:80px;--stand-tint:.14;--crown-fill:#fbbf24;--crown-stroke:#d97706;flex-direction:column;min-width:0;display:flex}
[data-v-3294a0c8]{--stand-height:60px;--stand-tint:.08;--crown-fill:#cbd2da;--crown-stroke:#8b95a1}
[data-v-3294a0c8]{--stand-height:46px;--stand-tint:.06;--crown-fill:#e0a77c;--crown-stroke:#b06a3b}
[data-v-3294a0c8]{text-align:center;flex-direction:column;align-items:center;gap:3px;padding:0 8px 12px;display:flex}
[data-v-3294a0c8]{color:var(--crown-stroke);fill:var(--crown-fill);filter:drop-shadow(0 1px 1px #0000001f);pointer-events:none;position:absolute;top:-7px;right:-5px;transform:rotate(28deg)}
[data-v-3294a0c8]{background:#fff;border-radius:999px;margin-bottom:6px;padding:2px;display:inline-flex;position:relative;box-shadow:0 1px 3px #00000014}
[data-v-3294a0c8]{background:#10b98159}
[data-v-3294a0c8]{background:#10b981}
[data-v-3294a0c8]{background:var(--border);box-shadow:none}
[data-v-3294a0c8]{justify-content:center;align-items:center;gap:4px;max-width:100%;display:flex}
[data-v-3294a0c8]{white-space:nowrap;text-overflow:ellipsis;color:var(--foreground);font-size:13px;font-weight:600;overflow:hidden}
[data-v-3294a0c8]{font-variant-numeric:tabular-nums;color:var(--foreground);font-size:18px;font-weight:600;line-height:1.3}
[data-v-3294a0c8]{white-space:nowrap;color:#999;align-items:center;gap:6px;max-width:100%;font-size:12px;display:inline-flex;overflow:hidden}
[data-v-3294a0c8] .lb-change{min-width:0}
[data-v-3294a0c8]{height:var(--stand-height);background:linear-gradient(to bottom, rgb(16 185 129/var(--stand-tint)), #10b98105);color:#8a8a8a;border-radius:12px 12px 0 0;justify-content:center;align-items:flex-start;padding-top:10px;font-size:18px;font-weight:600;line-height:1;display:flex}
[data-v-3294a0c8]{color:#047857}
[data-v-3294a0c8]{color:var(--muted-foreground)}
[data-v-3294a0c8]{color:#6ee7b7}
[data-v-3294a0c8]{color:#047857;background:#10b9811a;border-radius:4px;flex-shrink:0;padding:1px 5px;font-size:11px}
[data-v-3294a0c8]{color:#6ee7b7}
</style>
