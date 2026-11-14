<template>
<span :class="`flex min-w-0 items-center gap-1.5 text-xs text-[#777] dark:text-muted-foreground`"><span :class="`size-2.5 shrink-0 rounded-[3px]`" :style="{background:e.color}"></span><span>{{ C(e) }}</span><span>{{ c(e.activeSec) }}</span></span>
</template>

<script setup>
import { S_xs as xs, S_e as e, S_c as c, S_C as C, S_w as w, S_at as at } from '../shared.js';
const items = defineProps({
      refreshKey: {}
    });
const n = items;
</script>
