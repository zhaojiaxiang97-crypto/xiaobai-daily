<template>
<div><component :is="pp" :modelValue="n?.value" @update:modelvalue="e=>n.value=e" :recommended="e.recommendedUsageMode" :disabled="c" /><footer><component :is="P" variant="ghost" :class="`h-9 cursor-pointer gap-1.5 px-3`" :disabled="c" @click="e=>r(`back`)" /><div><p>{{ l }}</p><component :is="P" :class="`h-9 cursor-pointer gap-2 px-4`" :disabled="c" data-testid="onboarding-usage-mode-continue" @click="u" /></div></footer></div>
</template>

<script setup>
import pp from './UsageModePicker.vue';
import { S_is as is, S_px as px, S_r as r, S_p as p, S_P as P } from '../shared.js';
const e = defineProps({});

// [兜底] 模板引用但无来源的符号
const n = { value: undefined };
import { ref } from 'vue';

// [setup 还原] 原组件 setup 里初值不依赖 IPC 的声明
let c = ref(false);
let l = ref(``);
async function u() {
  if (!c.value) {
    c.value = true, l.value = ``;
    try {
      if (n.value !== a.value.usageMode && !(await o(n.value))) {
        l.value = s.value || i(`promptOnboarding.saveFailed`);
        return;
      }
      r(`next`);
    } finally {
      c.value = false;
    }
  }
}
</script>
