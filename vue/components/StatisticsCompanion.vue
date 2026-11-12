<template>
<span data-v-4bdcecec><img :src="t[e.scene]" alt="" draggable="false" @error="t=>n(e.scene)" /></span>
</template>

<script setup>
import { S_alt as alt, S_t as t, S_n as n } from '../shared.js';
const e = defineProps({
      scene: {}
    });
</script>

<style>
/* 从原应用 CSS 恢复（data-v-4bdcecec） */
[data-v-4bdcecec]{flex-shrink:0;width:56px;height:40px;display:block;position:relative}
[data-v-4bdcecec]{object-fit:contain;-webkit-user-select:none;user-select:none;transform-origin:bottom;width:56px;height:56px;transition:transform .22s ease-out;position:absolute;top:-8px;left:0}
[data-v-4bdcecec]{transform:scale(1.02)}
[data-v-4bdcecec]{transition:none}
</style>
