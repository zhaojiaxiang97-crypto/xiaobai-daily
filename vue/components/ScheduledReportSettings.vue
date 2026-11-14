<template>
<button type="button" :class="[`flex w-full items-start gap-3 rounded-lg border px-3 py-2 text-left transition-colors`,ae?.value?.id===row.id?`border-emerald-400/60 bg-white`:`border-transparent bg-black/[0.02] hover:bg-black/[0.04]`]" @click="t=>ce(row)"><span :class="[`mt-1 h-2 w-2 shrink-0 rounded-full`,row.status===`success`?`bg-emerald-500`:`bg-red-500`]"></span><span><span><span>{{ row.status===`success`?t(`settings.scheduledReportLogSuccess`):t(`settings.scheduledReportLogFailed`) }}</span><span>{{ `HTTP `+toDisplayString(row.httpStatus) }}</span></span><span>{{ Yi(row.createdAt) }}</span><span><span v-text="t(`settings.scheduledReportLogMeta`,{records:row.recordCount,reports:row.reportCount,ms:row.durationMs})" /></span><span :class="`mt-0.5 block truncate font-mono text-xs text-[#888]`" :title="row.targetUrl">{{ se(row.targetUrl,26,14) }}</span><span>{{ row.errorMessage }}</span></span></button>
</template>

<script setup>
import { toDisplayString } from 'vue';

// [兜底] 模板引用但无来源的符号
import { S_ms as ms, S_xs as xs, S_lg as lg, S_px as px, S_t as t, S_v as v, S_w as w, S_mt as mt, S_Yi as Yi } from '../shared.js';
const row = { value: undefined };
const ae = { value: undefined };
import { ref } from 'vue';

// [setup 还原] 原组件 setup 里初值不依赖 IPC 的声明
let ee = ref([]);
let re = ref(``);
function se(items, t = 30, n = 20) {
  return items ? items.length <= t + n + 3 ? items : `${items.slice(0, t)}...${items.slice(-n)}` : ``;
}
function ce(e) {
  re.value = e.id;
}
</script>
