<template>
<component data-v-e28aa7bd :is="Qe" to="body" />
</template>

<script setup>
import { S_to as to, S_is as is, S_Qe as Qe } from '../shared.js';
</script>

<style>
/* 从原应用 CSS 恢复（data-v-e28aa7bd） */
[data-v-e28aa7bd]{z-index:9999;border-radius:calc(var(--ms-radius) * .75);white-space:normal;word-break:break-word;pointer-events:none;background-color:var(--tooltip-bg);max-width:20rem;color:var(--tooltip-fg);box-shadow:inset 0 1px #ffffff26,0 0 0 1px #0000001f,var(--ms-shadow-popover);transition:transform var(--ms-duration-emphasis) var(--ms-ease-spring),box-shadow var(--ms-duration-emphasis) var(--ms-ease-spring);padding:.25rem .5rem;font-size:.75rem;line-height:1.4;display:inline-block}
[data-v-e28aa7bd]{background:inherit;width:6px;height:6px;position:absolute;transform:rotate(45deg)}
[data-v-e28aa7bd]{bottom:-3px}
[data-v-e28aa7bd]{top:-3px}
[data-v-e28aa7bd]{right:-3px}
[data-v-e28aa7bd]{left:-3px}
[data-v-e28aa7bd]{transition:opacity .18s cubic-bezier(.16,1,.3,1),transform .18s cubic-bezier(.16,1,.3,1)}
[data-v-e28aa7bd]{transition:opacity .12s ease-in,transform .12s ease-in}
[data-v-e28aa7bd]{opacity:0;transform:scale(.96)}
[data-v-e28aa7bd],.tooltip-leave-from[data-v-e28aa7bd]{opacity:1;transform:scale(1)}
[data-v-e28aa7bd]{opacity:0;transform:scale(.97)}
</style>
