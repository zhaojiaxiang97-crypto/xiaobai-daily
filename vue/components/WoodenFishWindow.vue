<template>
<div data-v-040e6bb5><div :class="[`wooden-fish-hit`,{'is-dragging':u.value}]" :style="g" :title="u.value?undefined:_.value" @pointerenter="y" @pointerleave="b" @pointerdown="x" @pointermove="S" @pointerup="w" @pointercancel="T" @lostpointercapture="T" @contextmenu="E"><component :is="m9" :ref="c" :texts="a" tone="desktop" /></div></div>
</template>

<script setup>
import m9 from './WoodenFishFigure.vue';
// [符号说明] u=useConfigProviderContext
import { S_is as is, S_a as a, S_c as c, S_u as u, S_g as g, S__ as _, S_y as y, S_b as b, S_x as x, S_S as S, S_w as w, S_T as T, S_E as E } from '../shared.js';
</script>

<style>
/* 从原应用 CSS 恢复（data-v-040e6bb5） */
[data-v-040e6bb5]{background:0 0;width:100vw;height:100vh;position:relative;overflow:hidden}
[data-v-040e6bb5]{cursor:pointer;transition:transform .15s;position:absolute;left:50%;transform:translate(-50%)}
[data-v-040e6bb5]:hover{transform:translate(-50%)scale(1.05)}
[data-v-040e6bb5]{cursor:grabbing;transform:translate(-50%)}
</style>
