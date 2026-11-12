<template>
<component :is="CP" :model-value="e.modelValue" :label="r(`common.selectDateTime`)" value-format="iso" align="start" trigger-class="h-8 w-[206px]" @update:modelvalue="e=>n(`update:modelValue`,e)" />
</template>

<script setup>
import CP from './DateTimePickerField.vue';
// [符号说明] n~computed
import { S_is as is, S_n as n, S_r as r, S_w as w } from '../shared.js';
const e = defineProps({
      modelValue: {}
    });
</script>
