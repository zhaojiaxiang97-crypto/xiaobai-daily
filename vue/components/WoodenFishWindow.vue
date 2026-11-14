<template>
<div data-v-040e6bb5><div :class="[`wooden-fish-hit`,{'is-dragging':u}]" :style="g" :title="u?undefined:_?.value" @pointerenter="y" @pointerleave="b" @pointerdown="x" @pointermove="S" @pointerup="w" @pointercancel="T" @lostpointercapture="T" @contextmenu="E"><component :is="m9" :ref="c" :texts="a" tone="desktop" /></div></div>
</template>

<script setup>
import m9 from './WoodenFishFigure.vue';

// [兜底] 模板引用但无来源的符号
import { S_is as is, S_hit as hit, S_a as a } from '../shared.js';
const _ = { value: undefined };
import { ref } from 'vue';

// [setup 还原] 原组件 setup 里初值不依赖 IPC 的声明
let c = ref(null);
let u = ref(false);
let g = {
  width: `80px`,
  height: `68px`,
  bottom: `6px`
};
function y() {
  l.value = true, s(), fU.setInteractive(true);
}
function b() {
  l.value = false, d === null && fU.setInteractive(false);
}
function x(e) {
  e.button === 0 && (d = e.pointerId, f = e.screenX, p = e.screenY, m = false, e.currentTarget?.setPointerCapture?.(e.pointerId), fU.dragStart(e.screenX, e.screenY), e.preventDefault());
}
function S(e) {
  if (d === e.pointerId) {
    if (!(e.buttons & 1)) {
      C(e, false);
      return;
    }
    !m && Math.hypot(e.screenX - f, e.screenY - p) >= B2t && (m = true, u.value = true), m && fU.dragMove(e.screenX, e.screenY);
  }
}
function w(e) {
  d === e.pointerId && C(e, true);
}
function T(e) {
  C(e ?? null, false);
}
function E(e) {
  e.preventDefault(), T(), s(), fU.showMenu({
    total: r.value,
    today: i.value
  });
}
</script>

<style>
/* 从原应用 CSS 恢复（data-v-040e6bb5） */
[data-v-040e6bb5]{background:0 0;width:100vw;height:100vh;position:relative;overflow:hidden}
[data-v-040e6bb5]{cursor:pointer;transition:transform .15s;position:absolute;left:50%;transform:translate(-50%)}
[data-v-040e6bb5]:hover{transform:translate(-50%)scale(1.05)}
[data-v-040e6bb5]{cursor:grabbing;transform:translate(-50%)}
</style>
