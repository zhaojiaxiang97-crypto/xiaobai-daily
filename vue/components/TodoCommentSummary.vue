<template>
<section :class="`mt-5 border-t border-[#e5e7eb] pt-4`" @click="withDirectives(()=>{},[`stop`])"><div><h3><component :is="ts" :size="15" :stroke-width="2" :class="`text-[#6b7280]`" />{{ ` `+toDisplayString(i(`todo.activity.dialogTitle`))+` ` }}<span>{{ row.commentCount }}</span></h3><button type="button" :class="`text-xs font-medium text-[#16a34a] transition-colors hover:text-[#15803d]`" @click="e=>r(`open`)">{{ i(`todo.activity.viewAll`) }}</button></div><div></div><button type="button" :class="`mt-2 flex h-9 w-full items-center rounded-lg border border-[#e5e7eb] bg-white px-3 text-left text-sm text-[#9ca3af] transition-colors hover:border-[#d1d5db]`" @click="e=>r(`open`)">{{ l.value?i(`todo.activity.summaryEmpty`):i(`todo.activity.placeholder`) }}</button></section>
</template>

<script setup>
import { toDisplayString, withDirectives } from 'vue';
// [符号说明] l~computed
import { S_ts as ts, S_is as is, S_xs as xs, S_sm as sm, S_lg as lg, S_px as px, S_e as e, S_t as t, S_r as r, S_i as i, S_l as l, S_w as w, S_mt as mt } from '../shared.js';
const row = defineProps({
      todoId: {},
      commentCount: {},
      refreshKey: {}
    });
const n = row;
</script>
