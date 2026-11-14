<template>
<component :is="fe" :ref="i" :as="e.as" :as-child="e.asChild" :aria-current="c?.value===`active`?`true`:undefined" :data-state="c?.value" :disabled="t||!l?.value?``:undefined" :data-disabled="t||!l?.value?``:undefined" :data-orientation="a.orientation.value" />
</template>

<script setup>
import { S_is as is, S_as as as, S_state as state, S_t as t, S_i as i, S_a as a, S_fe as fe } from '../shared.js';
const e = defineProps({
      step: {
        type: Number,
        required: true
      },
      disabled: {
        type: Boolean,
        required: false,
        default: false
      },
      completed: {
        type: Boolean,
        required: false,
        default: false
      },
      asChild: {
        type: Boolean,
        required: false
      },
      as: {
        type: null,
        required: false
      }
    });

// [兜底] 模板引用但无来源的符号
const c = { value: undefined };
const l = { value: undefined };
</script>
