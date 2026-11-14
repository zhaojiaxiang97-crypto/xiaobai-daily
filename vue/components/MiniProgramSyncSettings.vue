<template>
<div><div><p>{{ t(`settings.miniProgramSync`) }}</p><p>{{ m?.value }}</p><p>{{ t(`settings.miniProgramSyncCloudNote`) }}</p></div><div><component :is="P" size="sm" variant="outline" :class="`h-7 text-xs`" @click="e=>s.value=true" /><component :is="P" size="sm" variant="outline" :class="`h-7 gap-1.5 border-destructive/30 text-xs text-destructive hover:bg-destructive/20 hover:text-destructive`" :disabled="p" @click="e=>f=true" /><component :is="Te" :model-value="i" :disabled="r" @update:modelvalue="l" /></div></div>
</template>

<script setup>
// [符号说明] l~computed
import { S_is as is, S_xs as xs, S_sm as sm, S_t as t, S_r as r, S_i as i, S_l as l, S_P as P, S_Te as Te } from '../shared.js';
const e = defineProps({});

// [兜底] 模板引用但无来源的符号
const m = { value: undefined };
const s = { value: undefined };
import { ref } from 'vue';

// [setup 还原] 原组件 setup 里初值不依赖 IPC 的声明
let f = ref(false);
let p = ref(false);
</script>
