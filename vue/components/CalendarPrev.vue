<template>
<component :is="fe" aria-label="Previous page" :as="t.as" :as-child="t.asChild" :type="t.as===`button`?`button`:undefined" :aria-disabled="n?.value||undefined" :data-disabled="n?.value||undefined" :disabled="n?.value" @click="i" />
</template>

<script setup>
import { S_is as is, S_as as as, S_fe as fe } from '../shared.js';
const e = defineProps({
      prevPage: {
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
  n.value || r.prevPage(t.prevPage);
}
</script>
