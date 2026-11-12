<template>
<div :class="[`flex items-stretch gap-4 rounded-xl px-4 py-3.5 transition-colors`,e.task.enabled?`bg-black/[0.028] hover:bg-black/[0.045] dark:bg-white/[0.045] dark:hover:bg-white/[0.07]`:`bg-black/[0.018] hover:bg-black/[0.032] dark:bg-white/[0.022] dark:hover:bg-white/[0.045]`]"><button type="button" :class="[`min-w-0 flex-1 cursor-pointer rounded-md text-left outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary/40`,{'opacity-50':!e.task.enabled}]" :disabled="e.disabled" @click="e=>r(`edit`)"><div>{{ o.value }}</div><div><span><span></span><span>{{ a.shareText(e.task) }}</span></span></div><div><span><component :is="Ma" :size="12" :class="`shrink-0`" />{{ ` `+toDisplayString(l.value) }}</span><span :class="[`inline-flex min-w-0 items-center gap-1.5`,{'text-red-600 dark:text-red-400':u.value.tone===`danger`}]"><span :class="[`size-1.5 shrink-0 rounded-full`,d.value]"></span><span :class="`truncate`" :title="u.value.text">{{ u.value.text }}</span></span></div></button><div><component :is="Te" :model-value="e.task.enabled" :disabled="e.disabled" :aria-label="i(e.task.enabled?`settings.autoReport.actions.disable`:`settings.autoReport.actions.enable`)" @update:modelvalue="e=>r(`toggle`,e)" /><div><component :is="P" variant="ghost" size="icon" :class="`h-7 w-7`" :disabled="e.disabled" :aria-label="i(`settings.autoReport.actions.edit`)" @click="e=>r(`edit`)" /><component :is="Wr" :modal="false" /></div></div></div>
</template>

<script setup>
import { toDisplayString } from 'vue';
import xl from './MenuRadioItem.vue';
import md from './BaseSeparator.vue';
// [符号说明] u=useConfigProviderContext
import { S_Ma as Ma, S_is as is, S_px as px, S_r as r, S_i as i, S_a as a, S_o as o, S_l as l, S_u as u, S_d as d, S_w as w, S_P as P, S_Te as Te, S_Wr as Wr } from '../shared.js';
const e = defineProps({
      task: {},
      run: {},
      nextRun: {},
      disabled: {
        type: Boolean
      }
    });
const n = e;
</script>
