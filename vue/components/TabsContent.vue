<template>
<component :is="h" :present="e.forceMount||o?.value" force-mount="" />
</template>

<script setup>
import { S_is as is, S_as as as } from '../shared.js';
const e = defineProps({
      value: {
        type: [String, Number],
        required: true
      },
      forceMount: {
        type: Boolean,
        required: false
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
const t = e;

// [兜底] 模板引用但无来源的符号
const h = { value: undefined };
const o = { value: undefined };
</script>
