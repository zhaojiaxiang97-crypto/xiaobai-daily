<template>
<div data-v-687930fa :class="`composer-pet`" :style="at({bottom:`calc(100% - ${counter}px)`})"><button type="button" :class="`composer-pet__button`" :aria-label="t(`xiaoheiBot.composerPet.openGrowth`)" :aria-busy="n" @click="withDirectives(d,[`stop`])"><img :class="`composer-pet__art`" :src="s?.value" alt="" draggable="false" @error="e=>s.value=Q5" /></button><span><span v-text="t(`todayWork.growthEntry.${r}`)" /></span></div>
</template>

<script setup>
import { withDirectives } from 'vue';
import { S_px as px, S_pet as pet, S_alt as alt, S_Q5 as Q5, S_t as t, S_v as v, S_at as at } from '../shared.js';
const e = defineProps({});

// [兜底] 模板引用但无来源的符号
const s = { value: undefined };
import { ref } from 'vue';

// [setup 还原] 原组件 setup 里初值不依赖 IPC 的声明
let n = ref(false);
let r = ref(``);
let counter = ref(8);
async function d() {
  if (!n.value) {
    n.value = true, r.value = ``;
    try {
      await window.electronAPI.growth.open();
    } catch (e) {
      if (!i) return;
      let t = e instanceof Error ? e.message : ``;
      r.value = t.includes(`请先登录`) ? `loginRequired` : t.includes(`暂未向当前账号开放`) ? `unavailable` : `openError`;
    } finally {
      n.value = false;
    }
  }
}
</script>

<style>
/* 从原应用 CSS 恢复（data-v-687930fa） */
[data-v-687930fa]{z-index:3;width:90px;height:90px;position:absolute;bottom:calc(100% - 8px);right:18px}
[data-v-687930fa]{cursor:pointer;-webkit-app-region:no-drag;transform-origin:50% 92%;background:0 0;border:0;border-radius:12px;width:100%;height:100%;padding:0;transition:transform .22s ease-out;display:block}
[data-v-687930fa]:hover{transform:scale(1.02)}
[data-v-687930fa]:focus-visible{outline:2px solid var(--ring);outline-offset:2px}
[data-v-687930fa]{object-fit:contain;pointer-events:none;width:100%;height:100%;display:block}
[data-v-687930fa]{transition:none}
[data-v-687930fa]{border:1px solid var(--border);background:var(--popover);width:max-content;max-width:240px;color:var(--popover-foreground);border-radius:8px;padding:7px 10px;font-size:12px;line-height:1.5;position:absolute;bottom:calc(100% + 4px);right:0}
[data-v-687930fa]{display:none}
</style>
