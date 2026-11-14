<template>
<component :is="Du" :ref="r" :is-horizontal="true" data-orientation="horizontal" :style="{bottom:0,left:t.dir.value===`rtl`?`var(--reka-scroll-area-corner-width)`:0,right:t.dir.value===`ltr`?`var(--reka-scroll-area-corner-width)`:0,'--reka-scroll-area-thumb-width':a?.value?`${cu(a?.value)}px`:undefined}" @ondragscroll="e=>n.onDragScroll(e.x)" />
</template>

<script setup>
import Du from './ScrollAreaScrollbarImpl.vue';
// [符号说明] n~computed
import { S_is as is, S_cu as cu, S_px as px, S_t as t, S_n as n, S_r as r, S_x as x, S_at as at } from '../shared.js';
const e = defineProps({});

// [兜底] 模板引用但无来源的符号
const a = { value: undefined };
</script>
