<template>
<div data-v-983aff85><component :is="Qe" :to="a.rangePickerTarget||`#heatmap-panel-actions`" defer="" /><div><component :is="zn" :size="18" :class="`animate-spin`" />{{ ` `+toDisplayString(s(`keyboardHeatmap.loading`)) }}</div></div>
</template>

<script setup>
import { toDisplayString } from 'vue';
import { S_to as to, S_is as is, S_a as a, S_s as s, S_Qe as Qe, S_zn as zn } from '../shared.js';
</script>

<style>
/* 从原应用 CSS 恢复（data-v-983aff85） */
[data-v-983aff85]{--keyboard-gap:clamp(2px, .42cqw, 6px);--keyboard-zone-gap:clamp(4px, .8cqw, 14px);width:100%;min-width:0;overflow:hidden;container-type:inline-size}
[data-v-983aff85]{grid-template-columns:var(--keyboard-columns);gap:var(--keyboard-zone-gap);min-width:0;display:grid}
[data-v-983aff85]{grid-template-columns:minmax(0,1fr);grid-template-rows:var(--key-height) calc(var(--keyboard-zone-gap) - var(--keyboard-gap)) repeat(5, var(--key-height));gap:var(--keyboard-gap);min-width:0;display:grid}
[data-v-983aff85]{gap:var(--keyboard-gap);min-width:0;display:flex}
[data-v-983aff85]{flex:var(--key-width,1) 1 0;min-width:0}
[data-v-983aff85]{flex:var(--key-width,3) 1 0;gap:var(--keyboard-gap);min-width:0;display:flex}
[data-v-983aff85]{justify-content:flex-end;gap:var(--keyboard-gap);flex-direction:column;flex:1 1 0;min-width:0;display:flex}
[data-v-983aff85]{flex:none}
[data-v-983aff85]:not(:only-child){height:calc((var(--key-height) - var(--keyboard-gap)) / 2)}
[data-v-983aff85]{flex:var(--key-width,1) 1 0;min-width:0;height:var(--key-height);border:1px solid color-mix(in oklab, var(--border) 75%, transparent);color:var(--foreground);font-size:var(--key-font-size);text-overflow:ellipsis;white-space:nowrap;border-radius:clamp(4px,.55cqw,7px);padding-inline:clamp(1px,.28cqw,4px);line-height:1;transition:transform .12s,box-shadow .12s;overflow:hidden;box-shadow:0 1px 1px #0000000f}
[data-v-983aff85]{height:auto}
[data-v-983aff85]:hover{transform:translateY(-1px);box-shadow:0 3px 8px #0000001a}
</style>
