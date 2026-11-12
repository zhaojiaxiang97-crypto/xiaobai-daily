<template>
<span data-v-03641323 :class="[[n&&e.node.center?`text-node-center`:``],`whitespace-pre-wrap break-words text-node`]"><span>{{ u.value }}</span><span :class="[`text-node-stream-delta`,[g.value]]" @animationend="h">{{ d.value }}</span></span>
</template>

<script setup>
// [符号说明] u=useConfigProviderContext
import { S_pre as pre, S_n as n, S_u as u, S_d as d, S_g as g } from '../shared.js';
const e = defineProps({
      node: {}
    });
const t = e;
</script>

<style>
/* 从原应用 CSS 恢复（data-v-03641323） */
[data-v-03641323]{font-weight:inherit;vertical-align:baseline;display:inline}
[data-v-03641323]{justify-content:center;width:100%;display:inline-flex}
[data-v-03641323]{animation-duration:var(--stream-update-fade-duration,var(--typewriter-fade-duration,.9s));animation-timing-function:var(--stream-update-fade-ease,var(--typewriter-fade-ease,ease-out));will-change:opacity;animation-fill-mode:both}
[data-v-03641323]{animation-name:text-node-stream-update-fade-a-03641323}
[data-v-03641323]{animation-name:text-node-stream-update-fade-b-03641323}
[data-v-03641323]{animation:none!important}
</style>
