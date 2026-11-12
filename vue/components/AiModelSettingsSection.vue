<template>
<div :class="`rounded-lg border border-black/8 bg-black/[0.015] p-4`"><div><p>{{ b(e.purpose) }}</p><component :is="Pp" :class="e.ok?`bg-emerald-50 text-emerald-700 !border-emerald-200`:`bg-red-50 text-red-700 !border-red-200`" /></div><p>{{ toDisplayString(e.evidence.provider)+` · `+toDisplayString(e.evidence.model||t(`settings.modelDiagnosis.modelMissing`))+` · `+toDisplayString(e.evidence.latencyMs)+`ms` }}</p><p>{{ e.evidence.errorMessage||e.message }}</p><ul></ul><div><p>{{ x(e.purpose)?.title }}</p><p>{{ toDisplayString(t(`settings.modelDiagnosis.confirmedCause`))+`：`+toDisplayString(x(e.purpose)?.confirmedCause) }}</p><div><p>{{ t(`settings.modelDiagnosis.possibleCauses`) }}</p><ul></ul></div><div><p>{{ t(`settings.modelDiagnosis.solutions`) }}</p><ol></ol></div></div></div>
</template>

<script setup>
import { toDisplayString } from 'vue';
import ol from './CalendarHeadCell.vue';
import ul from './CalendarPrev.vue';
import Pp from './Badge.vue';
import { S_is as is, S_ms as ms, S_lg as lg, S_ok as ok, S_t as t, S_p as p, S_b as b, S_x as x } from '../shared.js';
const e = defineProps({});
</script>
