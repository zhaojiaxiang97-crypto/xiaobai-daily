<template>
<div data-v-8329ed73><div ref="r" :class="`todo-post-rich-text`" :style="at(c?.value)" v-html="s?.value"></div><button type="button" :class="`mt-1 text-xs font-medium text-[#16a34a] hover:text-[#15803d]`" @click="e=>i=!i">{{ i?n(`todo.activity.collapseText`):n(`todo.activity.expandText`) }}</button></div>
</template>

<script setup>
// [符号说明] n~computed
import { S_xs as xs, S_n as n, S_r as r, S_v as v, S_at as at, S_mt as mt } from '../shared.js';
const e = defineProps({
      html: {},
      maxLines: {
        default: 8
      }
    });
const t = e;

// [兜底] 模板引用但无来源的符号
const c = { value: undefined };
const s = { value: undefined };
import { ref } from 'vue';

// [setup 还原] 原组件 setup 里初值不依赖 IPC 的声明
let i = ref(false);
</script>

<style>
/* 从原应用 CSS 恢复（data-v-8329ed73） */
[data-v-8329ed73]{overflow-wrap:anywhere;white-space:pre-wrap;word-break:break-word;-webkit-user-select:text;user-select:text;max-width:100%}
[data-v-8329ed73] *{overflow-wrap:anywhere;word-break:break-word;max-width:100%}
[data-v-8329ed73] ul{padding-left:1.25rem;list-style:outside}
[data-v-8329ed73] ol{padding-left:1.25rem;list-style:decimal}
[data-v-8329ed73] li{margin:.125rem 0}
[data-v-8329ed73] b,.todo-post-rich-text[data-v-8329ed73] strong{font-weight:700}
[data-v-8329ed73] i,.todo-post-rich-text[data-v-8329ed73] em{font-style:italic}
</style>
