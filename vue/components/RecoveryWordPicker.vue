<template>
<div><div><div><p>{{ i(`appLock.selectedRecoveryWords`) }}</p><p>{{ i(`appLock.recoveryWordCountHint`) }}</p></div><span :class="[`rounded-full px-2.5 py-1 text-xs font-semibold tabular-nums`,e.modelValue.length>=3?`bg-primary/10 text-primary`:`bg-amber-500/10 text-amber-700`]">{{ toDisplayString(e.modelValue.length)+` / 8 ` }}</span></div><div><div></div><component :is="P" type="button" size="sm" variant="ghost" :class="`absolute right-1.5 top-1.5 h-7 gap-1.5 px-2 text-xs text-muted-foreground`" :disabled="!e.modelValue.length" @click="p" /></div><div><component :is="Lp" :modelValue="o.value" @update:modelvalue="e=>o.value=e" :class="`h-8`" :maxlength="5" :placeholder="i(`appLock.customRecoveryWordPlaceholder`)" @keydown="xt(withDirectives(f,[`prevent`]),[`enter`])" /><component :is="P" type="button" variant="outline" :class="`h-8 shrink-0 gap-1.5`" :disabled="!o.value.trim()||l.value" @click="f" /></div><div><div><p>{{ i(`appLock.chooseSuggestedWords`) }}</p><component :is="P" type="button" size="sm" variant="ghost" :class="`h-7 gap-1.5 px-2 text-xs text-muted-foreground`" :disabled="e.loading" @click="e=>r(`refresh`)" /></div><div></div></div></div>
</template>

<script setup>
import { toDisplayString, withDirectives } from 'vue';
import { S_is as is, S_xs as xs, S_sm as sm, S_px as px, S_r as r, S_i as i, S_o as o, S_l as l, S_f as f, S_p as p, S_P as P, S_xt as xt } from '../shared.js';
const e = defineProps({
      modelValue: {},
      suggestions: {},
      loading: {
        type: Boolean,
        default: false
      }
    });
const n = e;
</script>
