<template>
<span data-v-c3a40817 :class="[`avatar-effect`,[e.stage&&`avatar-effect--${e.stage}`,{'avatar-effect--collapsed':r}]]" :style="o?.value" aria-hidden="true"><img :class="`avatar-effect__image`" :src="e.src" alt="" /><svg :class="`avatar-effect__motion`" viewBox="0 0 180 180" fill="currentColor"><g></g></svg></span>
</template>

<script setup>
import { S_alt as alt, S_g as g, S_at as at } from '../shared.js';
const e = defineProps({
      src: {},
      stage: {},
      collapsed: {
        type: Boolean
      },
      fallbackColor: {}
    });
const t = e;

// [兜底] 模板引用但无来源的符号
const o = { value: undefined };
import { ref } from 'vue';

// [setup 还原] 原组件 setup 里初值不依赖 IPC 的声明
let r = ref(false);
</script>

<style>
/* 从原应用 CSS 恢复（data-v-c3a40817） */
[data-v-c3a40817]{border-radius:inherit;isolation:isolate;width:100%;height:100%;color:color-mix(in srgb, var(--avatar-accent) 85%, var(--foreground));--effect-entry:.52s;--done-cycle:2.1s;display:inline-block;position:relative}
[data-v-c3a40817]{border-radius:inherit;object-fit:cover;width:100%;height:100%;transition:opacity var(--effect-entry) cubic-bezier(.32, 0, .18, 1), transform var(--effect-entry) cubic-bezier(.32, 0, .18, 1);display:block}
[data-v-c3a40817]{pointer-events:none;width:100%;height:100%;position:absolute;inset:0;overflow:visible}
[data-v-c3a40817]{opacity:0;transform:scale(.22)}
[data-v-c3a40817]{opacity:1;transition-duration:.3s;transform:none}
[data-v-c3a40817],.avatar-effect__writing[data-v-c3a40817],.avatar-effect__tool[data-v-c3a40817]{opacity:0;transform-origin:50%;animation:.26s .16s forwards avatar-effect-enter-c3a40817}
[data-v-c3a40817],.avatar-effect--writing:not(.avatar-effect--collapsed) .avatar-effect__writing[data-v-c3a40817],.avatar-effect--tool:not(.avatar-effect--collapsed) .avatar-effect__tool[data-v-c3a40817]{opacity:0;animation:none}
[data-v-c3a40817]{transform-box:fill-box;transform-origin:50%;animation:1.2s ease-in-out infinite avatar-loading-dot-c3a40817}
[data-v-c3a40817]{animation-delay:-.8s}
[data-v-c3a40817]{animation-delay:-.4s}
[data-v-c3a40817]{animation-delay:0s}
[data-v-c3a40817]{fill:none;stroke:currentColor;stroke-width:4.5px;stroke-linecap:round;stroke-dasharray:1}
[data-v-c3a40817]{transform-box:fill-box;transform-origin:50%;animation:1.35s ease-in-out infinite avatar-tool-center-c3a40817}
[data-v-c3a40817]{transform-origin:90px 100px;animation:2s linear infinite avatar-tool-particles-c3a40817}
[data-v-c3a40817]{transform-box:fill-box;transform-origin:50%;animation:1.35s ease-in-out infinite avatar-tool-particle-pulse-c3a40817}
[data-v-c3a40817]:nth-child(2n){animation-delay:-.45s}
[data-v-c3a40817]:nth-child(3n){animation-delay:-.9s}
[data-v-c3a40817]{fill:none;stroke:currentColor;stroke-width:7px;stroke-linecap:round;stroke-dasharray:.14 .86;opacity:.45;animation:1.4s linear infinite avatar-track-trail-c3a40817}
[data-v-c3a40817]{offset-path:path("M199 39 A120 70 -25 1 1 -19 141 A120 70 -25 1 1 199 39");animation:1.4s linear infinite avatar-track-comet-c3a40817}
[data-v-c3a40817]{fill:var(--background)}
[data-v-c3a40817]{animation:avatar-done-orbit-c3a40817 var(--done-cycle) ease both}
[data-v-c3a40817]{fill:none;stroke:currentColor;stroke-width:8px;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:1;animation:avatar-done-c3a40817 var(--done-cycle) ease both}
[data-v-c3a40817] *{animation:none!important}
[data-v-c3a40817]{opacity:0;transform:scale(.22)}
[data-v-c3a40817]{opacity:1;transform:none}
[data-v-c3a40817],.avatar-effect__writing[data-v-c3a40817],.avatar-effect__tool[data-v-c3a40817]{opacity:1}
[data-v-c3a40817]{opacity:0}
[data-v-c3a40817]{opacity:1;stroke-dashoffset:0}
</style>
