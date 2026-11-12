<template>
<svg data-v-88097689><defs><linearGradient :id="`${n}-cover`" x1="0" y1="0" x2="1" y2="1"></linearGradient><linearGradient :id="`${n}-paper`" x1="0" y1="0" x2="0.7" y2="1"></linearGradient></defs><g><rect x="22" y="15" width="76" height="88" rx="14" :fill="`url(#${n}-cover)`" :class="`tb-cover`" stroke-width="1.2"></rect><path d="M40 20h44a8 8 0 0 1 8 8v64a7 7 0 0 1-7 7H40Z" :fill="`url(#${n}-paper)`" stroke="#96C5A3" stroke-width="0.9" stroke-linejoin="round"></path></g></svg>
</template>

<script setup>
import tb from './TodoScheduleRangePanel.vue';
import { S_rx as rx, S_n as n, S_d as d, S_g as g, S_y as y, S_x as x } from '../shared.js';
</script>

<style>
/* 从原应用 CSS 恢复（data-v-88097689） */
[data-v-88097689]{--tb-cover-stroke:#36a772;width:100%;height:100%;display:block;overflow:visible}
[data-v-88097689]{stroke:var(--tb-cover-stroke)}
[data-v-88097689]{fill:#f7fcf5;stroke:#80af8e;transition:fill .2s,stroke .2s}
[data-v-88097689]{fill:#819f86;transition:fill .2s}
[data-v-88097689]{fill:#6dae83;stroke:#6dae83}
[data-v-88097689]{fill:#ccdcc8}
[data-v-88097689]{transform-box:fill-box;transform-origin:50%;animation:.22s ease-out tb-check-pop-88097689}
[data-v-88097689],.tb-line[data-v-88097689]{transition:none}
[data-v-88097689]{animation:none}
</style>
