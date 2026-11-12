<template>
<component :is="CP" :model-value="e.modelValue" :label="e.label" precision="minute" :minute-step="5" value-format="report" :end-boundary="e.endBoundary" :align="e.align" trigger-class="!h-8 !w-[156px]" @update:modelvalue="e=>n(`update:modelValue`,e)" />
</template>

<script setup>
import CP from './DateTimePickerField.vue';
// [符号说明] n~computed
import { S_is as is, S_n as n, S_w as w } from '../shared.js';
const e = defineProps({
      modelValue: {},
      label: {},
      endBoundary: {
        type: Boolean,
        default: false
      },
      align: {
        default: `center`
      }
    });
</script>
