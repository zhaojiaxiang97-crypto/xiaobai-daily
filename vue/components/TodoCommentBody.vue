<template>
<div><p ref="r" :class="[`select-text whitespace-pre-wrap break-words text-sm leading-6 text-[#374151]`,i.value?``:`line-clamp-6`]"></p><button type="button" :class="`mt-0.5 text-xs font-medium text-[#16a34a] hover:text-[#15803d]`" @click="e=>i.value=!i.value">{{ i.value?n(`todo.activity.collapseText`):n(`todo.activity.expandText`) }}</button></div>
</template>

<script setup>
// [符号说明] n~computed
import { S_xs as xs, S_sm as sm, S_pre as pre, S_e as e, S_n as n, S_r as r, S_i as i, S_p as p, S_mt as mt } from '../shared.js';
</script>
