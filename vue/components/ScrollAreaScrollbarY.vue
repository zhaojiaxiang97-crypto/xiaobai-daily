<template>
<component :is="Du" :ref="r" :is-horizontal="false" data-orientation="vertical" :style="at({top:0,right:t.dir.value===`ltr`?0:undefined,left:t.dir.value===`rtl`?0:undefined,bottom:`var(--reka-scroll-area-corner-height)`,'--reka-scroll-area-thumb-height':a.value?`${cu(a.value)}px`:undefined})" @ondragscroll="e=>n.onDragScroll(e.y)" />
</template>

<script setup>
import Du from './ScrollAreaScrollbarImpl.vue';
// [符号说明] n~computed
import { S_is as is, S_px as px, S_t as t, S_n as n, S_r as r, S_a as a, S_y as y, S_at as at } from '../shared.js';
const e = defineProps({});
</script>
