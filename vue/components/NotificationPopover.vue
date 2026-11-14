<template>
<div data-v-81c06a00 :class="[`flex items-start gap-3 px-5 py-3.5 cursor-pointer transition-colors hover:bg-gray-50 dark:hover:bg-accent/70 group`,{'bg-blue-50/40 dark:bg-primary/5':!row.isRead}]" @click="t=>se(row)"><div :class="[`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5`,ae(row.type)]"><component :is="Be(re(row.type))" :size="17" /></div><div><div><div :class="[`text-sm text-gray-800 dark:text-foreground truncate flex-1`,{'font-medium':!row.isRead}]">{{ row.title }}</div><span></span><span>{{ oe(row.createdAt) }}</span></div><div>{{ row.content }}</div></div><component :is="dn" :size="14" :class="`text-gray-300 group-hover:text-gray-500 dark:text-muted-foreground/50 dark:group-hover:text-muted-foreground transition-colors shrink-0 mt-2.5`" /></div>
</template>

<script setup>

// [兜底] 模板引用但无来源的符号
import { S_is as is, S_sm as sm, S_lg as lg, S_px as px, S_t as t, S_w as w, S_Be as Be, S_mt as mt, S_dn as dn } from '../shared.js';
const row = { value: undefined };

// [setup 还原] 原组件 setup 里初值不依赖 IPC 的声明
function re(e) {
  switch (e) {
    case `todo`:
      return Ro;
    case `report`:
      return oc;
    case `update`:
      return Ua;
    case `feature`:
      return Bn;
    case `promotion`:
      return vo;
    case `announcement`:
      return Jo;
    default:
      return sr;
  }
}
function ae(e) {
  switch (e) {
    case `todo`:
      return `text-emerald-600 bg-emerald-50 dark:text-emerald-300 dark:bg-emerald-500/10`;
    case `report`:
      return `text-emerald-600 bg-emerald-50 dark:text-emerald-300 dark:bg-emerald-500/10`;
    case `update`:
      return `text-blue-500 bg-blue-50 dark:text-blue-300 dark:bg-blue-500/10`;
    case `feature`:
      return `text-purple-500 bg-purple-50 dark:text-purple-300 dark:bg-purple-500/10`;
    case `promotion`:
      return `text-orange-500 bg-orange-50 dark:text-orange-300 dark:bg-orange-500/10`;
    case `announcement`:
      return `text-indigo-500 bg-indigo-50 dark:text-indigo-300 dark:bg-indigo-500/10`;
    default:
      return `text-gray-500 bg-gray-50 dark:text-gray-300 dark:bg-white/5`;
  }
}
function oe(e) {
  let date = new Date(e),
    n = new Date().getTime() - date.getTime(),
    r = Math.floor(n / 6e4),
    i = Math.floor(n / 36e5),
    a = Math.floor(n / 864e5);
  return r < 1 ? d(`notification.justNow`) : r < 60 ? d(`notification.minutesAgo`, {
    count: r
  }, r) : i < 24 ? d(`notification.hoursAgo`, {
    count: i
  }, i) : a < 7 ? d(`notification.daysAgo`, {
    count: a
  }, a) : date.toLocaleDateString(f.value);
}
function se(e) {
  h.value = e, v.value = ``, p.value = true, e.isRead || s(e.id);
}
</script>

<style>
/* 从原应用 CSS 恢复（data-v-81c06a00） */
[data-v-81c06a00],.fade-leave-active[data-v-81c06a00]{transition:opacity .2s}
[data-v-81c06a00],.fade-leave-to[data-v-81c06a00]{opacity:0}
[data-v-81c06a00],.slide-left-leave-active[data-v-81c06a00]{transition:transform .25s cubic-bezier(.16,1,.3,1)}
[data-v-81c06a00],.slide-left-leave-to[data-v-81c06a00]{transform:translate(100%)}
</style>
