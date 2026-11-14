<template>
<div :class="`group flex max-w-full items-center gap-1 rounded-full border border-black/6 bg-white px-2 py-1 text-xs leading-none text-[#555] transition-colors hover:border-black/10 hover:bg-black/[0.015]`"><span :class="[`size-2 shrink-0 rounded-full`,w[e.color]]"></span><span>{{ f_(e.name,n) }}</span><span>{{ t(`settings.customCategoryDisabled`) }}</span><button type="button" :class="`ml-0.5 flex size-4 shrink-0 items-center justify-center rounded-full text-[#999] opacity-70 transition hover:bg-black/5 hover:text-(--foreground) group-hover:opacity-100`" :title="t(`settings.editCustomCategory`)" @click="t=>oe(e)"><component :is="v" :size="11" /></button><button type="button" :class="`flex size-4 shrink-0 items-center justify-center rounded-full text-red-400 opacity-70 transition hover:bg-red-500/10 hover:text-red-600 group-hover:opacity-100`" :title="t(`common.delete`)" @click="t=>ce(e)"><component :is="Ae" :size="11" /></button></div>
</template>

<script setup>
// [符号说明] n~computed
import { S_is as is, S_xs as xs, S_f_ as f_, S_px as px, S_e as e, S_t as t, S_n as n, S_v as v, S_Ae as Ae } from '../shared.js';
const text = defineProps({});

// [setup 还原] 原组件 setup 里初值不依赖 IPC 的声明
let w = {
  emerald: `bg-emerald-500`,
  blue: `bg-blue-500`,
  amber: `bg-amber-500`,
  purple: `bg-purple-500`,
  rose: `bg-rose-500`,
  cyan: `bg-cyan-500`,
  red: `bg-red-500`,
  teal: `bg-teal-500`,
  indigo: `bg-indigo-500`,
  pink: `bg-pink-500`,
  violet: `bg-violet-500`,
  orange: `bg-orange-500`,
  zinc: `bg-zinc-500`
};
function oe(options) {
  p.value = options.id, m.value = options.name, h.value = options.keywords.join(`、`), g.value = options.color, _.value = options.enabled, u.value = ``, f.value = true;
}
function ce(e) {
  x.value = e.id, b.value = true;
}
</script>
