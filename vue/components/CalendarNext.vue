<template>
<component :is="fe" :as="t.as" :as-child="t.asChild" aria-label="Next page" :type="t.as===`button`?`button`:undefined" :aria-disabled="n?.value||undefined" :data-disabled="n?.value||undefined" :disabled="n?.value" @click="i" />
</template>

<script setup>
import { S_is as is, S_as as as, S_fe as fe } from '../shared.js';
const e = defineProps({
      nextPage: {
        type: Function,
        required: false
      },
      asChild: {
        type: Boolean,
        required: false
      },
      as: {
        type: null,
        required: false,
        default: `button`
      }
    });
const t = e;

// [兜底] 模板引用但无来源的符号
const n = { value: undefined };

// [setup 还原] 原组件 setup 里初值不依赖 IPC 的声明
function i() {
  n.value || r.nextPage(t.nextPage);
}
</script>
