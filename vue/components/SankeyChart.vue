<template>
<div data-v-e97ee5e8 ref="n"><div :class="`relative`" :style="at({width:`${a.value.width}px`})"><div><span :class="`absolute top-0 text-right`" :style="at({right:`${a.value.width-a.value.sourceX-P3}px`})">{{ event.sourceTitle }}</span><span :class="`absolute top-0`" :style="at({left:`${a.value.targetX}px`})">{{ event.targetTitle }}</span></div><div :class="`relative`" :style="at({height:`${a.value.height}px`})" @mousemove="g" @mouseleave="_"><svg :width="a.value.width" :height="a.value.height" :class="`absolute inset-0 block`"></svg><div :class="`pointer-events-none absolute z-10 whitespace-nowrap rounded-md border border-border bg-popover px-2.5 py-1.5 text-xs text-popover-foreground shadow-md`" :style="at(h?.value)"><div>{{ m.value.title }}</div><div>{{ m.value.value }}</div></div></div></div></div>
</template>

<script setup>
import md from './BaseSeparator.vue';
import { S_xs as xs, S_px as px, S_P3 as P3, S_at as at } from '../shared.js';
const event = defineProps({
      sources: {},
      targets: {},
      links: {},
      sourceTitle: {},
      targetTitle: {},
      formatValue: {
        type: Function
      },
      linkColorBy: {}
    });
const t = event;

// [兜底] 模板引用但无来源的符号
const m = { value: undefined };
const a = { value: undefined };
const h = { value: undefined };
import { ref } from 'vue';

// [setup 还原] 原组件 setup 里初值不依赖 IPC 的声明
let n = ref(null);
let l = ref(null);
let u = ref({
  x: 0,
  y: 0
});
function g(e) {
  let t = e.currentTarget.getBoundingClientRect();
  u.value = {
    x: e.clientX - t.left,
    y: e.clientY - t.top
  };
}
function _() {
  c.value = null, l.value = null;
}
</script>

<style>
/* 从原应用 CSS 恢复（data-v-e97ee5e8） */
[data-v-e97ee5e8]{fill:#00000014;transition:fill .12s,fill-opacity .12s}
[data-v-e97ee5e8]{fill-opacity:.3}
[data-v-e97ee5e8]{fill-opacity:.08}
[data-v-e97ee5e8]{fill-opacity:.6}
[data-v-e97ee5e8]{fill-opacity:.4}
[data-v-e97ee5e8]{fill-opacity:.1}
[data-v-e97ee5e8]{fill-opacity:.7}
[data-v-e97ee5e8]{fill:#00000009}
[data-v-e97ee5e8]{fill:#10b98159}
[data-v-e97ee5e8]{fill:#ffffff17}
[data-v-e97ee5e8]{fill:#ffffff0a}
[data-v-e97ee5e8]{fill:#10b98166}
[data-v-e97ee5e8]{fill:#10b981bf;transition:opacity .12s}
[data-v-e97ee5e8]{fill:#00000038}
[data-v-e97ee5e8]{fill:#ffffff3d}
[data-v-e97ee5e8]{fill:#0006}
[data-v-e97ee5e8]{fill:#ffffff73}
[data-v-e97ee5e8]{opacity:.4}
</style>
