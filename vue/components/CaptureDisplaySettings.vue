<template>
<div :class="`flex items-center gap-3 px-3 py-2.5`"><div><div :class="[`flex h-5 w-7 items-center justify-center rounded-[3px] border transition-colors`,u(n.id)?`border-primary/50 bg-primary/[0.08] text-primary/80`:`border-[#ccc] bg-[#eee] text-[#999] dark:border-border dark:bg-muted dark:text-muted-foreground`]"><span>{{ i+1 }}</span></div></div><div><div><p>{{ n.label }}</p><span>{{ t(`settings.captureDisplays.primary`) }}</span></div><p>{{ toDisplayString(n.resolution)+` · `+toDisplayString(Math.round(n.scaleFactor*100))+`%` }}{{ ` · `+toDisplayString(t(`settings.captureDisplays.position`,{x:n.bounds.x,y:n.bounds.y})) }}</p></div><span :title="d(n.id)?t(`settings.captureDisplays.keepOne`):undefined" :class="`flex shrink-0`"><component :is="Te" :model-value="u(n.id)" :disabled="e.disabled||d(n.id)" :aria-label="n.label" @update:modelvalue="e=>f(n.id,e)" /></span></div>
</template>

<script setup>
import { toDisplayString } from 'vue';
// [符号说明] n~computed, u=useConfigProviderContext, f=useConfigProviderContext
import { S_eee as eee, S_is as is, S_px as px, S_t as t, S_n as n, S_i as i, S_u as u, S_d as d, S_f as f, S_p as p, S_y as y, S_x as x, S_w as w, S_Te as Te } from '../shared.js';
const e = defineProps({
      disabled: {
        type: Boolean
      }
    });
</script>
