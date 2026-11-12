<template>
<div :class="`flex shrink-0 items-center gap-3.5`" :title="p.value||undefined"><div><p>{{ l.value }}</p><p>{{ toDisplayString(n(`mouseHeatmap.leftButton`))+` · `+toDisplayString(d(items.left)) }}</p></div><svg viewBox="0 0 60 92" :class="`h-[54px] w-[35px] shrink-0 text-[#c8c8c8] dark:text-[#4b5057]`" role="img" :aria-label="n(`mouseHeatmap.buttonsAria`,{left:l.value,right:u.value})"><defs><clipPath :id="i"></clipPath></defs><g :clip-path="`url(#${i})`"><rect x="2.5" y="2.5" width="27.5" height="36" :style="at({fill:f(o.value)})"></rect><rect x="30" y="2.5" width="27.5" height="36" :style="at({fill:f(s.value)})"></rect></g></svg><div><p>{{ u.value }}</p><p>{{ toDisplayString(n(`mouseHeatmap.rightButton`))+` · `+toDisplayString(d(items.right)) }}</p></div></div>
</template>

<script setup>
import { toDisplayString } from 'vue';
// [符号说明] n~computed, l~computed, u=useConfigProviderContext, f=useConfigProviderContext
import { S_n as n, S_i as i, S_o as o, S_s as s, S_l as l, S_u as u, S_d as d, S_f as f, S_p as p, S_g as g, S_y as y, S_x as x, S_w as w, S_at as at } from '../shared.js';
const items = defineProps({
      left: {},
      right: {},
      middle: {},
      other: {}
    });
const t = items;
</script>
