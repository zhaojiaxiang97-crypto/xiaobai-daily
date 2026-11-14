<template>
<section data-v-9347e030><div><p><span :class="[`lb-hero-dot`,{'is-live':text.isLive}]"></span><span>{{ text.isLive?i(`leaderboard.live`):i(`leaderboard.settled`) }}</span><span>{{ `· `+toDisplayString(text.statusText) }}</span></p><div><p><span>{{ c.value[0] }}</span><span>{{ text.me.rank }}</span><span>{{ c.value[1] }}</span></p><span>{{ text.headline }}</span></div><div><div><span>{{ text.me.recordCount }}</span><span>{{ i(`leaderboard.metric.records`) }}</span></div><div><span>{{ i(`leaderboard.changeSame`) }}</span><span><span v-text="i(`leaderboard.metric.change`,{previous:text.previousLabel})" /></span></div><div><span>{{ toDisplayString(a?.value)+`%` }}</span><span>{{ i(`leaderboard.metric.percent`) }}</span></div><div><span><span v-text="i(`leaderboard.streakDays`,{days:s?.value})" /></span><span>{{ i(`leaderboard.metric.streak`) }}</span></div></div><div><div><div :class="`lb-hero-progress-fill`" :style="{width:`${Math.round((text.progressRatio??0)*100)}%`}"></div></div><span>{{ text.progressText }}</span></div></div><div><div><button type="button" :class="`lb-hero-friend`" @click="e=>r(`addFriend`)"><component :is="tc" :size="13" />{{ ` `+toDisplayString(i(`leaderboard.addFriend`))+` ` }}<span>{{ (text.friendRequestCount??0)>99?`99+`:text.friendRequestCount }}</span></button><button type="button" :class="`lb-hero-share`" :disabled="!text.me" @click="e=>r(`share`)"><component :is="Ds" :size="13" />{{ ` `+toDisplayString(i(`leaderboard.share`)) }}</button></div></div></section>
</template>

<script setup>
import { toDisplayString } from 'vue';
import { S_is as is, S_Ds as Ds, S_tc as tc, S_dot as dot, S_e as e, S_r as r, S_i as i, S_p as p, S_v as v, S_me as me, S_at as at } from '../shared.js';
const text = defineProps({
      me: {},
      totalUsers: {},
      headline: {},
      statusText: {},
      isLive: {
        type: Boolean
      },
      previousLabel: {},
      progressText: {},
      progressRatio: {},
      emptyText: {},
      loading: {
        type: Boolean
      },
      friendRequestCount: {}
    });
const n = text;

// [兜底] 模板引用但无来源的符号
const c = { value: undefined };
const a = { value: undefined };
const s = { value: undefined };
</script>

<style>
/* 从原应用 CSS 恢复（data-v-9347e030） */
[data-v-9347e030]{background:#00000005;border-radius:10px;justify-content:space-between;align-items:stretch;gap:20px;padding:16px 18px;display:flex;container-type:inline-size}
[data-v-9347e030]{background:var(--card)}
[data-v-9347e030]{flex-direction:column;flex:1;gap:12px;min-width:0;display:flex}
[data-v-9347e030]{color:#999;align-items:center;gap:6px;min-width:0;font-size:12px;line-height:1;display:flex}
[data-v-9347e030]{white-space:nowrap;text-overflow:ellipsis;overflow:hidden}
[data-v-9347e030]{background:#ccc;border-radius:999px;flex-shrink:0;width:6px;height:6px}
[data-v-9347e030]{background:#10b981}
[data-v-9347e030]{flex-wrap:wrap;align-items:center;gap:8px 12px;display:flex}
[data-v-9347e030]{color:var(--foreground);align-items:baseline;gap:4px;display:inline-flex}
[data-v-9347e030]{font-variant-numeric:tabular-nums;letter-spacing:-.01em;font-size:34px;font-weight:600;line-height:1}
[data-v-9347e030]{font-size:14px;font-weight:600}
[data-v-9347e030]{color:#047857;white-space:nowrap;background:#10b9811a;border-radius:4px;padding:2px 8px;font-size:12px;font-weight:500}
[data-v-9347e030]{color:#6ee7b7}
[data-v-9347e030]{flex-wrap:wrap;gap:8px 28px;display:flex}
[data-v-9347e030]{flex-direction:column;gap:3px;display:flex}
[data-v-9347e030]{font-variant-numeric:tabular-nums;min-height:22px;color:var(--foreground);align-items:center;font-size:18px;font-weight:600;line-height:1.2;display:inline-flex}
[data-v-9347e030]{min-width:0;font-size:16px}
[data-v-9347e030] svg{width:9px;height:9px}
[data-v-9347e030]{color:#999;font-size:12px;line-height:1}
[data-v-9347e030]{color:#999;flex-direction:column;gap:6px;max-width:480px;font-size:12px;display:flex}
[data-v-9347e030]{background:#0000000d;border-radius:999px;height:6px;overflow:hidden}
[data-v-9347e030]{background:#ffffff14}
[data-v-9347e030]{border-radius:inherit;background:#10b981;height:100%;transition:width .4s}
[data-v-9347e030]{flex-direction:column;gap:4px;padding:4px 0;display:flex}
[data-v-9347e030]{color:var(--foreground);font-size:18px;font-weight:600}
[data-v-9347e030]{color:#999;font-size:12px}
[data-v-9347e030]{flex-direction:column;flex-shrink:0;justify-content:space-between;align-items:flex-end;gap:12px;display:flex}
[data-v-9347e030]{align-items:center;gap:8px;display:flex}
[data-v-9347e030]{border:1px solid var(--border);background:var(--card);height:28px;color:var(--foreground);cursor:pointer;border-radius:6px;align-items:center;gap:5px;padding:0 12px;font-size:12px;font-weight:500;transition:background .14s;display:inline-flex}
[data-v-9347e030]:hover{background:var(--muted)}
[data-v-9347e030]{color:#fff;text-align:center;background:#ef4444;border-radius:999px;min-width:16px;padding:0 4px;font-size:10px;font-weight:600;line-height:16px}
[data-v-9347e030]:focus-visible{outline:2px solid var(--primary);outline-offset:2px}
[data-v-9347e030]{background:var(--primary);height:28px;color:var(--primary-foreground);cursor:pointer;border:0;border-radius:6px;align-items:center;gap:5px;padding:0 12px;font-size:12px;font-weight:500;transition:opacity .14s;display:inline-flex}
[data-v-9347e030]:hover:not(:disabled){opacity:.9}
[data-v-9347e030]:disabled{cursor:not-allowed;opacity:.45}
[data-v-9347e030]:focus-visible{outline:2px solid var(--primary);outline-offset:2px}
[data-v-9347e030]{display:none}
[data-v-9347e030]{transition:none}
</style>
