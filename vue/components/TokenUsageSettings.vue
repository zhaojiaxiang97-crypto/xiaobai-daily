<template>
<div><div><div><p>{{ t(`settings.tokenUsage`) }}</p><span><span v-text="t(`settings.tokenUsageEstimatedCount`,{count:a.estimatedCount})" /></span></div><p>{{ S?.value }}</p><div></div></div><div><div><div><div>{{ t(`settings.tokenUsageInputShort`) }}</div><div>{{ Qi(b) }}</div></div><div><div>{{ t(`settings.tokenUsageOutputShort`) }}</div><div>{{ Qi(x) }}</div></div></div><component :is="P" size="sm" variant="outline" :class="`h-7 gap-1.5 text-xs`" @click="E" /></div></div>
</template>

<script setup>

// [兜底] 模板引用但无来源的符号
import { S_is as is, S_xs as xs, S_sm as sm, S_t as t, S_p as p, S_v as v, S_P as P, S_Qi as Qi } from '../shared.js';
const S = { value: undefined };
import { ref, computed } from 'vue';

// [setup 还原] 原组件 setup 里初值不依赖 IPC 的声明
let a = ref(null);
let o = ref(false);
let b = computed(() => a.value?.totalInputTokens ?? 0);
let x = computed(() => a.value?.totalOutputTokens ?? 0);
function E() {
  s.value = true, counter.value = 1, Promise.all([w(), T(1)]);
}
</script>
