<template>
<div><div><div><div><div>{{ n(`reportGenerationBasis.range`) }}</div><div>{{ items.summary.range.startedAt }}{{ items.summary.range.endedAt }}</div></div><div><div>{{ n(`reportGenerationBasis.workRecords`) }}</div><div>{{ items.summary.workRecords.total }}</div><div><span v-text="n(`reportGenerationBasis.compressedInput`,{count:items.summary.workRecords.inputCount})" /></div></div><div><div>{{ n(`reportGenerationBasis.appReference`) }}</div><div>{{ items.summary.appUsage?i(items.summary.appUsage.includedDurationSec):`--` }}</div><div><span v-text="n(`reportGenerationBasis.appCount`,{count:items.summary.appUsage.includedAppCount})" /></div><div><span v-text="n(`reportGenerationBasis.activityEvidenceCount`,{count:items.summary.activityEvidence.summaryCount})" /></div></div></div><div><div>{{ n(`reportGenerationBasis.topApps`) }}</div><div></div></div><div><span>{{ n(`reportGenerationBasis.usedData`) }}</span></div><p>{{ o.value }}</p></div></div>
</template>

<script setup>
// [符号说明] n~computed
import { S_n as n, S_i as i, S_o as o, S_p as p, S_v as v } from '../shared.js';
const items = defineProps({
      summary: {}
    });
const t = items;
</script>
