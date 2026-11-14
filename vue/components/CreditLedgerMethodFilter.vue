<template>
<div role="option" :aria-selected="event.modelValue.includes(t.key)" :class="`flex cursor-pointer items-center gap-2.5 rounded-lg px-2 py-1.5 transition-colors hover:bg-muted`" @click="e=>u(t.key)"><component :is="sg" :model-value="event.modelValue.includes(t.key)" tabindex="-1" @click="withDirectives(()=>{},[`stop`])" @update:modelvalue="e=>u(t.key)" /><span>{{ event.methodLabel(t.key) }}</span></div>
</template>

<script setup>
import { withDirectives } from 'vue';
import sg from './Checkbox.vue';
import { S_is as is, S_lg as lg, S_px as px, S_e as e, S_t as t } from '../shared.js';
const event = defineProps({
      items: {},
      modelValue: {},
      methodLabel: {
        type: Function
      }
    });
const n = event;

// [setup 还原] 原组件 setup 里初值不依赖 IPC 的声明
function u(e) {
  r(`update:modelValue`, n.modelValue.includes(e) ? n.modelValue.filter(item => item !== e) : [...n.modelValue, e]);
}
</script>
