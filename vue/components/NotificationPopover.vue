<template>
<div data-v-81c06a00 :class="[`flex items-start gap-3 px-5 py-3.5 cursor-pointer transition-colors hover:bg-gray-50 dark:hover:bg-accent/70 group`,{'bg-blue-50/40 dark:bg-primary/5':!row.isRead}]" @click="t=>se(row)"><div :class="[`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5`,ae(row.type)]"><component :is="Be(re(row.type))" :size="17" /></div><div><div><div :class="[`text-sm text-gray-800 dark:text-foreground truncate flex-1`,{'font-medium':!row.isRead}]">{{ row.title }}</div><span></span><span>{{ oe(row.createdAt) }}</span></div><div>{{ row.content }}</div></div><component :is="dn" :size="14" :class="`text-gray-300 group-hover:text-gray-500 dark:text-muted-foreground/50 dark:group-hover:text-muted-foreground transition-colors shrink-0 mt-2.5`" /></div>
</template>

<script setup>
import { S_is as is, S_sm as sm, S_lg as lg, S_px as px, S_t as t, S_w as w, S_re as re, S_ae as ae, S_oe as oe, S_se as se, S_Be as Be, S_mt as mt, S_dn as dn } from '../shared.js';
</script>

<style>
/* 从原应用 CSS 恢复（data-v-81c06a00） */
[data-v-81c06a00],.fade-leave-active[data-v-81c06a00]{transition:opacity .2s}
[data-v-81c06a00],.fade-leave-to[data-v-81c06a00]{opacity:0}
[data-v-81c06a00],.slide-left-leave-active[data-v-81c06a00]{transition:transform .25s cubic-bezier(.16,1,.3,1)}
[data-v-81c06a00],.slide-left-leave-to[data-v-81c06a00]{transform:translate(100%)}
</style>
