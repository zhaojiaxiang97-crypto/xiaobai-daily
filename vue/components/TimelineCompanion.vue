<template>
<button data-v-1af4db62 type="button" :class="`timeline-companion`" :aria-label="t(`timeline.companionOpenGrowth`)" :aria-busy="r" @click="c"><img :src="i?.value" alt="" draggable="false" @error="e=>i.value=z3" /></button>
</template>

<script setup>
import { S_z3 as z3, S_alt as alt, S_t as t } from '../shared.js';
const e = defineProps({});

// [兜底] 模板引用但无来源的符号
const i = { value: undefined };
import { ref } from 'vue';

// [setup 还原] 原组件 setup 里初值不依赖 IPC 的声明
let r = ref(false);
async function c() {
  if (!r.value) {
    r.value = true;
    try {
      await window.electronAPI.growth.open();
    } catch (e) {
      let n = (e instanceof Error ? e.message : ``).includes(`请先登录`) ? `loginRequired` : `openError`;
      Ai(t(`todayWork.growthEntry.${n}`));
    } finally {
      r.value = false;
    }
  }
}
</script>

<style>
/* 从原应用 CSS 恢复（data-v-1af4db62） */
[data-v-1af4db62]{cursor:pointer;-webkit-app-region:no-drag;background:0 0;border:0;border-radius:12px;width:72px;height:72px;padding:0;display:block}
[data-v-1af4db62]{object-fit:contain;pointer-events:none;-webkit-user-select:none;user-select:none;transform-origin:50% 90%;width:100%;height:100%;transition:transform .22s ease-out;display:block}
[data-v-1af4db62]{transform:scale(1.02)}
[data-v-1af4db62]:focus-visible{outline:2px solid var(--ring);outline-offset:2px}
[data-v-1af4db62]{transition:none}
</style>
