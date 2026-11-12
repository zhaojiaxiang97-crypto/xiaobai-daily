<template>
<button data-v-1af4db62 type="button" :class="`timeline-companion`" :aria-label="t(`timeline.companionOpenGrowth`)" :aria-busy="r.value" @click="c"><img :src="i.value" alt="" draggable="false" @error="e=>i.value=z3" /></button>
</template>

<script setup>
import { S_z3 as z3, S_alt as alt, S_t as t, S_r as r, S_i as i, S_c as c } from '../shared.js';
const e = defineProps({});
</script>

<style>
/* 从原应用 CSS 恢复（data-v-1af4db62） */
[data-v-1af4db62]{cursor:pointer;-webkit-app-region:no-drag;background:0 0;border:0;border-radius:12px;width:72px;height:72px;padding:0;display:block}
[data-v-1af4db62]{object-fit:contain;pointer-events:none;-webkit-user-select:none;user-select:none;transform-origin:50% 90%;width:100%;height:100%;transition:transform .22s ease-out;display:block}
[data-v-1af4db62]{transform:scale(1.02)}
[data-v-1af4db62]:focus-visible{outline:2px solid var(--ring);outline-offset:2px}
[data-v-1af4db62]{transition:none}
</style>
