<template>
<button type="button" role="radio" :aria-checked="e.modelValue===t.mode" :data-usage-mode="t.mode" :disabled="e.disabled" :class="[`group relative flex flex-col rounded-2xl border-2 bg-card text-left transition-all disabled:cursor-not-allowed disabled:opacity-60`,[e.compact?`gap-3 p-4`:`gap-4 p-5`,e.modelValue===t.mode?`border-primary bg-primary/[0.04] ring-4 ring-primary/10`:`border-border hover:border-primary/40 hover:bg-muted/30`]]" @click="e=>u(t.mode)"><div><span :class="[`flex shrink-0 items-center justify-center rounded-xl transition-colors`,[e.compact?`size-10`:`size-12`,e.modelValue===t.mode?`bg-primary text-primary-foreground`:`bg-muted text-muted-foreground group-hover:text-foreground`]]"><component :is="Be(t.icon)" :class="e.compact?`size-5`:`size-6`" /></span><span><span :class="[`rounded-full px-2 py-0.5 text-[11px] font-medium leading-5 whitespace-nowrap`,l(t.mode).tone===`primary`?`bg-primary/10 text-primary`:`bg-muted text-muted-foreground`]">{{ l(t.mode).text }}</span><span :class="[`flex size-6 shrink-0 items-center justify-center rounded-full border-2 transition-colors`,e.modelValue===t.mode?`border-primary bg-primary text-primary-foreground`:`border-border bg-background`]"><component :is="an" :class="`size-3.5`" stroke-width="3" /></span></span></div><div><p :class="[`whitespace-nowrap font-semibold text-foreground`,e.compact?`text-sm`:`text-base`]">{{ t.title }}</p><p :class="[`mt-1.5 text-xs leading-5 text-muted-foreground`,e.compact?``:`min-h-[60px]`]">{{ t.desc }}</p></div><ul></ul></button>
</template>

<script setup>
import ul from './CalendarPrev.vue';
import xl from './MenuRadioItem.vue';
import { S_is as is, S_xs as xs, S_sm as sm, S_px as px, S_t as t, S_l as l, S_u as u, S_p as p, S_Be as Be, S_mt as mt, S_an as an } from '../shared.js';
const e = defineProps({
      modelValue: {},
      recommended: {
        default: null
      },
      current: {
        default: null
      },
      disabled: {
        type: Boolean,
        default: false
      },
      compact: {
        type: Boolean,
        default: false
      }
    });
const n = e;
</script>
