<template>
<div data-v-0546d285 :class="[`wooden-fish-figure`,[`tone-${e.tone}`,{'is-large':e.large}]]"><svg><defs><radialGradient :id="`${n}-ground`" cx="0.5" cy="0.5" r="0.5"></radialGradient><radialGradient :id="`${n}-cushion`" cx="0.5" cy="0.42" r="0.6"></radialGradient><radialGradient :id="`${n}-body`" cx="0.36" cy="0.26" r="0.82"></radialGradient><radialGradient :id="`${n}-gloss`" cx="0.5" cy="0.5" r="0.5"></radialGradient><radialGradient :id="`${n}-mallet-head`" cx="0.36" cy="0.3" r="0.75"></radialGradient></defs><ellipse cx="58" cy="91" rx="48" ry="6" :fill="`url(#${n}-ground)`"></ellipse><ellipse cx="58" cy="84" rx="44" ry="8.5" :fill="`url(#${n}-cushion)`"></ellipse><g ref="i" :class="`fish-body`"><path d="M26,85 C16,80 13,66 16,55 C20,36 37,22 58,22 C79,22 96,36 100,55 C103,66 100,80 90,85 C78,89.5 38,89.5 26,85 Z" :fill="`url(#${n}-body)`"></path><ellipse cx="41" cy="35" rx="15" ry="7" transform="rotate(-26 41 35)" :fill="`url(#${n}-gloss)`"></ellipse></g><ellipse ref="a" :class="`strike-ripple`" cx="78" cy="23.5" rx="9" ry="3" fill="none" stroke="#FFE7C2" stroke-width="1.2"></ellipse><g ref="r" :class="`fish-mallet`"><circle cx="79" cy="14.5" r="8.5" :fill="`url(#${n}-mallet-head)`"></circle></g></svg><div></div></div>
</template>

<script setup>
// [符号说明] n~computed
import { S_is as is, S_cy as cy, S_rx as rx, S_cx as cx, S_n as n, S_r as r, S_i as i, S_a as a, S_d as d, S_g as g } from '../shared.js';
const e = defineProps({
      texts: {},
      tone: {},
      large: {
        type: Boolean
      }
    });
</script>

<style>
/* 从原应用 CSS 恢复（data-v-0546d285） */
[data-v-0546d285]{width:100%;height:100%;position:relative}
[data-v-0546d285]{width:100%;height:100%;display:block;overflow:visible}
[data-v-0546d285]{transform-box:fill-box;transform-origin:50% 100%}
[data-v-0546d285]{transform-box:view-box;transform-origin:113px 0;transform:rotate(12deg)}
[data-v-0546d285]{transform-box:fill-box;transform-origin:50%;opacity:0}
[data-v-0546d285]{pointer-events:none;width:0;height:0;position:absolute;bottom:84%;left:50%}
[data-v-0546d285]{white-space:nowrap;pointer-events:none;-webkit-user-select:none;user-select:none;font-size:13px;font-weight:600;line-height:1;animation:1s cubic-bezier(.25,.46,.45,.94) forwards wf-merit-float-0546d285;position:absolute;bottom:0;left:0}
[data-v-0546d285]{color:var(--wooden-fish-merit-color);text-shadow:var(--wooden-fish-merit-shadow)}
[data-v-0546d285]{color:#fff;text-shadow:0 0 1px #000000e6,0 1px 2px #000000d9,0 0 6px #00000059}
[data-v-0546d285]{font-size:14px;font-weight:700}
[data-v-0546d285]{color:#f4b740;text-shadow:0 0 1px #000000d9,0 1px 3px #0009,0 0 10px #f4b74059;font-size:16px;font-weight:700;animation-name:wf-milestone-float-0546d285;animation-duration:1.6s}
[data-v-0546d285]{font-size:18px}
[data-v-0546d285]{font-size:19px}
[data-v-0546d285]{font-size:22px}
</style>
