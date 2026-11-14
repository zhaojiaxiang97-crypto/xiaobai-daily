<template>
<div><div><div><div><div>{{ n(`reportGenerationBasis.range`) }}</div><div>{{ items.summary.range.startedAt }}{{ items.summary.range.endedAt }}</div></div><div><div>{{ n(`reportGenerationBasis.workRecords`) }}</div><div>{{ items.summary.workRecords.total }}</div><div><span v-text="n(`reportGenerationBasis.compressedInput`,{count:items.summary.workRecords.inputCount})" /></div></div><div><div>{{ n(`reportGenerationBasis.appReference`) }}</div><div>{{ items.summary.appUsage?i(items.summary.appUsage.includedDurationSec):`--` }}</div><div><span v-text="n(`reportGenerationBasis.appCount`,{count:items.summary.appUsage.includedAppCount})" /></div><div><span v-text="n(`reportGenerationBasis.activityEvidenceCount`,{count:items.summary.activityEvidence.summaryCount})" /></div></div></div><div><div>{{ n(`reportGenerationBasis.topApps`) }}</div><div></div></div><div><span>{{ n(`reportGenerationBasis.usedData`) }}</span></div><p>{{ o?.value }}</p></div></div>
</template>

<script setup>
// [符号说明] n~computed
import { S_n as n, S_p as p, S_v as v } from '../shared.js';
const items = defineProps({
      summary: {}
    });
const t = items;

// [兜底] 模板引用但无来源的符号
const o = { value: undefined };

// [setup 还原] 原组件 setup 里初值不依赖 IPC 的声明
function i(e) {
  let t = Math.max(0, Math.round(e)),
    n = Math.floor(t / 3600),
    i = Math.floor(t % 3600 / 60);
  return r.value.startsWith(`zh`) ? n > 0 ? `${n}小时${i}分钟` : `${i}分钟` : n > 0 ? `${n}h ${i}m` : `${i}m`;
}
</script>
