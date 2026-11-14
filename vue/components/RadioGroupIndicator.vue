<template>
<component :is="h" :present="e.forceMount||n.checked.value" />
</template>

<script setup>
// [符号说明] n~computed
import { S_is as is, S_as as as, S_n as n } from '../shared.js';
const e = defineProps({
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
        required: false,
        default: `span`
      }
    });

// [兜底] 模板引用但无来源的符号
const h = { value: undefined };
</script>
