<template>
<div data-v-e4c69beb><button type="button" :class="`tutorial-sticker group ml-auto flex w-[100px] cursor-pointer flex-col items-center border-0 bg-transparent p-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40`" :aria-label="n(`todayWork.growthEntry.title`)" @click="e=>c.value=true"><component :is="Wie" :src="s" key-mode="green" /><span><span><component :is="ls" :size="8" fill="currentColor" /></span>{{ n(`todayWork.growthEntry.tutorial`) }}</span></button><p>{{ a.value }}</p><component :is="ui" :open="c.value" @update:open="e=>c.value=e" /></div>
</template>

<script setup>
import Wie from './ChromaKeyVideo.vue';
import { S_is as is, S_ls as ls, S_n as n, S_a as a, S_s as s, S_c as c, S_p as p, S_w as w, S_ui as ui } from '../shared.js';
const e = defineProps({});
</script>

<style>
/* 从原应用 CSS 恢复（data-v-e4c69beb） */
[data-v-e4c69beb]{z-index:0;-webkit-app-region:no-drag;width:304px;margin-top:-6px;padding-top:0;position:relative}
[data-v-e4c69beb]{z-index:1;--bubble-border:var(--border);width:196px;min-height:48px;padding-bottom:10px;position:absolute;top:10px;left:0}
[data-v-e4c69beb]:hover{--bubble-border:color-mix(in srgb, var(--primary) 40%, var(--border))}
[data-v-e4c69beb]{pointer-events:none;width:calc(100% + 12px);height:100%;position:absolute;inset:0;overflow:visible}
[data-v-e4c69beb]{fill:var(--background);stroke:var(--bubble-border);stroke-width:1px;stroke-linejoin:round;transition:stroke .15s}
[data-v-e4c69beb]{-webkit-app-region:no-drag;margin-top:-14px}
</style>
