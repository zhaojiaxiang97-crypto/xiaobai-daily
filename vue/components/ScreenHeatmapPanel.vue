<template>
<div><component :is="Qe" :to="Rt" defer="" /><div><component :is="zn" :size="20" :class="`mx-auto mb-2 animate-spin`" />{{ ` `+toDisplayString(a(`screenHeatmap.loading`)) }}</div><div :class="`pointer-events-none fixed z-50 w-[230px] rounded-lg border border-black/10 bg-white px-3 py-2 text-xs shadow-lg dark:border-border dark:bg-popover`" :style="be?.value"><div>{{ ye.value.title }}</div><div>{{ ye.value.total }}</div><div></div></div></div>
</template>

<script setup>
import { toDisplayString } from 'vue';

// [兜底] 模板引用但无来源的符号
import { S_to as to, S_is as is, S_xs as xs, S_lg as lg, S_px as px, S_mx as mx, S_a as a, S_w as w, S_Qe as Qe, S_at as at, S_Rt as Rt, S_zn as zn } from '../shared.js';
const ye = { value: undefined };
const be = { value: undefined };
import { ref } from 'vue';

// [setup 还原] 原组件 setup 里初值不依赖 IPC 的声明
let v = ref(null);
let E = ref(null);
</script>
