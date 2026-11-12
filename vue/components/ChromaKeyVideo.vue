<template>
<span data-v-11b00f46 :class="`chroma-key-video`" :style="at({width:`${e.width}px`,height:`${o.value}px`})"><video ref="r" :src="e.src" muted="" loop="" playsinline="" preload="auto" :class="`chroma-key-video__source`" aria-hidden="true"></video><canvas ref="n" :class="`chroma-key-video__canvas`" :width="e.width*2" :height="o.value*2"></canvas></span>
</template>

<script setup>
// [符号说明] n~computed
import { S_px as px, S_n as n, S_r as r, S_o as o, S_at as at } from '../shared.js';
const e = defineProps({
      src: {},
      width: {
        default: 100
      },
      height: {
        default: 0
      },
      keyMode: {
        default: `green`
      },
      keyColor: {
        default: `#579B4A`
      },
      threshold: {
        default: 30
      },
      smoothness: {
        default: 28
      }
    });
const t = e;
</script>

<style>
/* 从原应用 CSS 恢复（data-v-11b00f46） */
[data-v-11b00f46]{z-index:0;pointer-events:none;transform-origin:50% 90%;transition:transform .2s;display:block;position:relative;overflow:hidden}
[data-v-11b00f46]{opacity:0;pointer-events:none;width:1px;height:1px;position:absolute}
[data-v-11b00f46]{z-index:1;width:100%;height:100%;display:block;position:relative}
[data-v-11b00f46]{z-index:0;pointer-events:none;background:radial-gradient(#0f172a1f 0%,#0f172a0a 44%,#0000 72%);border-radius:9999px;width:48%;height:8%;position:absolute;bottom:6%;left:50%;transform:translate(-50%)}
[data-v-11b00f46]{transform:translateY(-4px)rotate(-2deg)}
[data-v-11b00f46]{transform:scale(.95)}
[data-v-11b00f46]{transition:none}
[data-v-11b00f46],.tutorial-sticker:active .chroma-key-video[data-v-11b00f46]{transform:none}
</style>
