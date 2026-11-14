<template>
<div data-v-bce7723a :class="`flex flex-col items-center gap-3 cursor-pointer`" @click="t=>o=e"><div :class="`relative flex items-center justify-center w-[88px] h-[88px] rounded-full text-[30px] transition-transform duration-300 hover:scale-110`" :style="e.unlocked?{background:d(e.tier),boxShadow:f(e.tier)}:{background:`linear-gradient(135deg, #f0f0f0, #e4e4e4)`}"><span :class="[`relative z-10`,e.unlocked?`drop-shadow-sm`:`opacity-40 grayscale`]">{{ e.icon }}</span></div><span :class="[`text-xs text-center leading-tight max-w-[92px]`,e.unlocked?`text-[#555]`:`text-[#ccc]`]">{{ m(e) }}</span></div>
</template>

<script setup>
import { S_xs as xs, S_sm as sm, S_t as t, S_w as w, S_at as at } from '../shared.js';
const e = defineProps({});
import { ref } from 'vue';

// [setup 还原] 原组件 setup 里初值不依赖 IPC 的声明
let o = ref(null);
function d(e) {
  return {
    bronze: `linear-gradient(135deg, #E8D5C4, #D4B896)`,
    silver: `linear-gradient(135deg, #E2E2E2, #C8C8C8)`,
    gold: `linear-gradient(135deg, #F5E6C8, #E8C984)`,
    diamond: `linear-gradient(135deg, #C8E8E8, #A8D8D8)`,
    crown: `linear-gradient(135deg, #E8D5F5, #D4B8E8)`
  }[e] ?? `#e8e8e8`;
}
function f(e) {
  return {
    bronze: `0 4px 14px rgba(212,184,150,0.3)`,
    silver: `0 4px 14px rgba(200,200,200,0.3)`,
    gold: `0 4px 14px rgba(232,201,132,0.35)`,
    diamond: `0 4px 14px rgba(168,216,216,0.35)`,
    crown: `0 4px 14px rgba(212,184,232,0.35)`
  }[e] ?? `none`;
}
function m(e) {
  let r = `badgeDefinitions.${e.id}.name`;
  return n(r) ? t(r) : e.name;
}
</script>

<style>
/* 从原应用 CSS 恢复（data-v-bce7723a） */
[data-v-bce7723a],.modal-leave-active[data-v-bce7723a]{transition:opacity .2s}
[data-v-bce7723a],.modal-leave-active .relative[data-v-bce7723a]{transition:transform .25s cubic-bezier(.34,1.56,.64,1),opacity .2s}
[data-v-bce7723a],.modal-leave-to[data-v-bce7723a]{opacity:0}
[data-v-bce7723a],.modal-leave-to .relative[data-v-bce7723a]{opacity:0;transform:scale(.9)translateY(8px)}
</style>
