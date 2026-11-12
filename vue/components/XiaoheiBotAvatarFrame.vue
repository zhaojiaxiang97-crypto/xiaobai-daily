<template>
<span data-v-41c5d7d2 :class="[`avatar-frame`,[a.value?`avatar-frame--badged`:null,a.value?`avatar-frame--${e.badgeSize??`sm`}`:null]]"><span><slot /></span><component :is="vIt" :origin="n.value" :size="e.badgeSize??`sm`" /></span>
</template>

<script setup>
import { S_is as is, S_sm as sm, S_n as n, S_a as a } from '../shared.js';
const e = defineProps({
      origin: {},
      originKey: {},
      badgeSize: {},
      synced: {
        type: Boolean
      }
    });
const t = e;
</script>

<style>
/* 从原应用 CSS 恢复（data-v-41c5d7d2） */
[data-v-41c5d7d2]{flex:none;display:inline-flex;position:relative}
[data-v-41c5d7d2]{display:inherit;border-radius:50%}
[data-v-41c5d7d2]{--origin-notch-r:6px;--origin-badge:12px}
[data-v-41c5d7d2]{--origin-notch-r:6.5px;--origin-badge:13px}
[data-v-41c5d7d2]{-webkit-mask-image:radial-gradient(circle var(--origin-notch-r) at calc(100% - var(--origin-badge) / 2) calc(100% - var(--origin-badge) / 2), transparent var(--origin-notch-r), #000 calc(var(--origin-notch-r) + .5px));-webkit-mask-image:radial-gradient(circle var(--origin-notch-r) at calc(100% - var(--origin-badge) / 2) calc(100% - var(--origin-badge) / 2), transparent var(--origin-notch-r), #000 calc(var(--origin-notch-r) + .5px));mask-image:radial-gradient(circle var(--origin-notch-r) at calc(100% - var(--origin-badge) / 2) calc(100% - var(--origin-badge) / 2), transparent var(--origin-notch-r), #000 calc(var(--origin-notch-r) + .5px));border-radius:50%;overflow:hidden}
</style>
