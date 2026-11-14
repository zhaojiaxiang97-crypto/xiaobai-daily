<template>
<component data-v-8992f408 :is="Be(function(e){return o.value[e.type]||a[e.type]||null;}(n))" :node="n" :custom-id="t.customId" :index-key="`${event.indexKey||`link-text`}-${r}`" />
</template>

<script setup>
// [符号说明] n~computed
import { S_is as is, S_e as e, S_n as n, S_r as r, S_a as a, S_Be as Be } from '../shared.js';
const event = defineProps({
      node: {},
      indexKey: {},
      customId: {},
      showTooltip: {
        type: Boolean,
        default: true
      },
      color: {},
      underlineHeight: {},
      underlineBottom: {},
      animationDuration: {},
      animationOpacity: {},
      animationTiming: {},
      animationIteration: {}
    });
const t = event;

// [兜底] 模板引用但无来源的符号
const o = { value: undefined };
</script>

<style>
/* 从原应用 CSS 恢复（data-v-8992f408） */
[data-v-8992f408]{color:var(--link-color);text-decoration:none}
[data-v-8992f408]:hover{text-underline-offset:.2rem;text-decoration:underline}
[data-v-8992f408]{position:relative}
[data-v-8992f408]{color:var(--link-color)}
[data-v-8992f408]{z-index:2;position:relative}
[data-v-8992f408]{height:var(--underline-height,2px);left:0;right:0;bottom:var(--underline-bottom,-3px);will-change:opacity;opacity:var(--underline-rest-opacity,.18);animation:underlinePulse-8992f408 var(--underline-duration,1.6s) var(--underline-timing,ease-in-out) var(--underline-iteration,infinite);background:currentColor;border-radius:999px;position:absolute}
[data-v-8992f408]{opacity:var(--underline-rest-opacity,.18);animation:none}
</style>
