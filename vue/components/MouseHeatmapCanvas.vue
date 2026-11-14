<template>
<div ref="o" :class="`w-full min-w-0`"><div :class="`relative overflow-hidden rounded-lg outline-none transition-[height] duration-[380ms] ease-[cubic-bezier(0.22,0.8,0.24,1)] focus-visible:ring-2 focus-visible:ring-ring/30 motion-reduce:transition-none`" :style="at(j?.value)" :tabindex="S?.value?0:undefined" @keydown="ge"></div><div><div><button type="button" :class="`flex size-6 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground`" :aria-label="a(`mouseHeatmap.prevDisplay`)" data-share-exclude="" @click="e=>he(-1)"><component :is="Qt" :size="14" /></button><span :class="`min-w-0 truncate px-1.5 text-muted-foreground`" :title="T?.value">{{ T?.value }}</span><span></span><button type="button" :class="`flex size-6 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground`" :aria-label="a(`mouseHeatmap.nextDisplay`)" data-share-exclude="" @click="e=>he(1)"><component :is="dn" :size="14" /></button></div><p :class="`mt-0.5 max-w-full truncate px-2 text-center text-xs text-muted-foreground/70`" :title="E?.value">{{ E?.value }}</p></div></div>
</template>

<script setup>

// [兜底] 模板引用但无来源的符号
import { S_is as is, S_xs as xs, S_lg as lg, S_px as px, S_e as e, S_a as a, S_o as o, S_p as p, S_w as w, S_at as at, S_mt as mt, S_Qt as Qt, S_dn as dn } from '../shared.js';
const T = { value: undefined };
const E = { value: undefined };
const j = { value: undefined };
const S = { value: undefined };
import { ref } from 'vue';

// [setup 还原] 原组件 setup 里初值不依赖 IPC 的声明
let counter = ref(0);
let f = ref(false);
function he(e) {
  let length = C.value.length;
  if (length < 2) return;
  let n = C.value.indexOf(w.value);
  me(C.value[(n + e + length) % length]);
}
function ge(e) {
  if (S.value) {
    if (e.key === `ArrowLeft`) he(-1);else if (e.key === `ArrowRight`) he(1);else return;
    e.preventDefault();
  }
}
</script>
