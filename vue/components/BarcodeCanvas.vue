<template>
<div ref="a" :class="`w-full min-w-0`"><canvas ref="o" :class="[`block`,{'cursor-pointer':event.selectable&&c!==null}]" role="img" :aria-label="event.label" :style="at({width:`${f.value.width}px`,height:`${f.value.height}px`})" @pointermove="g" @pointerleave="_" @click="v"></canvas></div>
</template>

<script setup>
import { S_px as px, S_a as a, S_o as o, S_w as w, S_at as at } from '../shared.js';
const event = defineProps({
      result: {},
      colors: {},
      theme: {},
      label: {},
      layout: {
        default: `strip`
      },
      compact: {
        type: Boolean,
        default: false
      },
      highlight: {
        default: null
      },
      dayLabels: {
        default: undefined
      },
      emphasizedDay: {
        default: null
      },
      monthMarks: {
        default: undefined
      },
      centerTitle: {
        default: undefined
      },
      centerSubtitle: {
        default: undefined
      },
      nowMinute: {
        default: null
      },
      bucketRange: {
        default: null
      },
      selectable: {
        type: Boolean,
        default: false
      }
    });
const r = event;

// [兜底] 模板引用但无来源的符号
const f = { value: undefined };
import { ref } from 'vue';

// [setup 还原] 原组件 setup 里初值不依赖 IPC 的声明
let c = ref(null);
function g(e) {
  let value = o.value;
  if (!value) return;
  let n = value.getBoundingClientRect(),
    a = qg(f.value, e.clientX - n.left, e.clientY - n.top, r.bucketRange ?? undefined);
  c.value = a?.dayIndex ?? null, i(`hover`, a ? {
    ...a,
    clientX: e.clientX,
    clientY: e.clientY
  } : null);
}
function _() {
  c.value = null, i(`hover`, null);
}
function v(e) {
  let value = o.value;
  if (!r.selectable || !value) return;
  let n = value.getBoundingClientRect(),
    a = qg(f.value, e.clientX - n.left, e.clientY - n.top, r.bucketRange ?? undefined);
  a && r.result.days[a.dayIndex]?.activeSec && i(`select`, a.dayIndex);
}
</script>
