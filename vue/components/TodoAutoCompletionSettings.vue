<template>
<div :class="`overflow-hidden rounded-xl border border-black/[0.07] bg-white/70 shadow-[0_1px_2px_rgba(0,0,0,0.02)]`"><div><div><span :class="[`flex size-7 shrink-0 items-center justify-center rounded-full`,e.status===`failed`?`bg-red-50 text-red-500`:e.status===`skipped`?`bg-amber-50 text-amber-600`:`bg-emerald-50 text-emerald-600`]"><component :is="Ys" :size="14" /></span><div><span>{{ Se(e.status) }}</span><span>{{ e.triggerType===`manual`?t(`settings.todoAutoCompletion.triggerManual`):t(`settings.todoAutoCompletion.triggerScheduled`) }}</span></div></div><span>{{ xe(e.createdAt) }}</span></div><div><div><div><p>{{ t(`settings.todoAutoCompletion.timelineRecords`) }}</p><p>{{ e.recordCount }}</p></div><div><p>{{ t(`settings.todoAutoCompletion.incompleteCandidates`) }}</p><p>{{ e.candidateCount }}</p></div><div><p>{{ t(`settings.todoAutoCompletion.completed`) }}</p><p>{{ e.completedCount }}</p></div><div><p>{{ t(`settings.todoAutoCompletion.actualCost`) }}</p><p>{{ toDisplayString(we(e.chargedYuan))+` `+toDisplayString(t(`commonUnits.credits`)) }}</p></div></div><div><span><span>{{ toDisplayString(t(`settings.todoAutoCompletion.evaluationScope`))+`：` }}</span>{{ ` `+toDisplayString(se(e.assigneeScope))+` · `+toDisplayString(oe(e.taskRange)) }}</span><span>{{ ` `+toDisplayString(t(`settings.todoAutoCompletion.actualInput`))+` `+toDisplayString($i(e.inputTokens))+` · `+toDisplayString(t(`settings.todoAutoCompletion.actualOutput`))+` `+toDisplayString($i(e.outputTokens)) }}</span></div><div><p>{{ t(`settings.todoAutoCompletion.returnedTasks`) }}</p><div></div></div><div>{{ e.errorCode }}</div></div></div>
</template>

<script setup>
import { toDisplayString } from 'vue';
import xl from './MenuRadioItem.vue';

// [setup 还原] 原组件 setup 里初值不依赖 IPC 的声明
function oe(e = r.value.todoAutoCompletionTaskRange) {
  return t(e === `week` ? `settings.todoAutoCompletion.weekTasks` : e === `all` ? `settings.todoAutoCompletion.allTasks` : `settings.todoAutoCompletion.todayTasks`);
}
function se(e = r.value.todoAutoCompletionAssigneeScope) {
  return t(e === `allAccessible` ? `settings.todoAutoCompletion.allAccessibleTasks` : `settings.todoAutoCompletion.assignedToMe`);
}
function xe(e) {
  if (!e) return `--`;
  let date = new Date(e);
  return Number.isNaN(date.getTime()) ? e : date.toLocaleString(n.value);
}
function Se(e) {
  return t(e === `failed` ? `settings.todoAutoCompletion.statusFailed` : e === `skipped` ? `settings.todoAutoCompletion.statusSkipped` : `settings.todoAutoCompletion.statusSuccess`);
}
function we(e) {
  let value = N.value,
    n = value.inputPriceYuanPerM > 0 ? value.inputPriceCreditsPerM / value.inputPriceYuanPerM : 1e3,
    r = Math.round(Math.max(0, e) * n * 1e8) / 1e8;
  return Zi(r > 0 ? Math.ceil(r) : 0);
}
import { S_is as is, S_Ys as Ys, S_e as e, S_t as t, S_p as p, S_$i as $i } from '../shared.js';
</script>
