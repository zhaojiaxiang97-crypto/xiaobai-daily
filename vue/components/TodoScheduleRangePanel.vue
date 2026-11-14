<template>
<div role="group" :aria-label="t.label" :data-boundary="t.boundary" :data-active="event.target===t.boundary" :data-selected-datetime="t?.value" :class="[`flex items-center gap-2 rounded-lg border px-2.5 py-2 transition-colors`,event.target===t.boundary?`border-primary/50 bg-primary/5`:`border-border`]" @focusin="e=>i(`update:target`,t.boundary)"><button type="button" :class="`flex min-w-0 flex-1 flex-col items-start gap-0.5 rounded-md text-left outline-none focus-visible:ring-2 focus-visible:ring-ring`" :aria-pressed="event.target===t.boundary" :disabled="event.disabled" @click="e=>i(`update:target`,t.boundary)"><span>{{ t.label }}</span><span :class="[`max-w-full truncate text-sm font-semibold`,t.invalid?`text-destructive`:`text-foreground`]">{{ T(t.value.slice(0,10)) }}</span></button><div><component :is="gge" :model-value="t.value.slice(11,16)" :label="t.label" :min="t.min" :invalid="t.invalid" :disabled="event.disabled" @update:modelvalue="e=>ee(t.boundary,e)" /></div></div>
</template>

<script setup>
import md from './BaseSeparator.vue';
import gge from './TodoTimeInput.vue';
import { S_is as is, S_sm as sm, S_lg as lg, S_px as px, S_e as e, S_t as t, S_i as i, S_w as w } from '../shared.js';
const event = defineProps({
      modelValue: {},
      target: {},
      quickDates: {},
      quickStart: {},
      quickEnd: {},
      disabled: {
        type: Boolean
      }
    });
const r = event;

// [setup 还原] 原组件 setup 里初值不依赖 IPC 的声明
function T(text) {
  let t = text.startsWith(toString.slice(0, 4)) ? {
    month: `short`,
    day: `numeric`,
    weekday: `short`,
    timeZone: `UTC`
  } : {
    year: `numeric`,
    month: `numeric`,
    day: `numeric`,
    weekday: `short`,
    timeZone: `UTC`
  };
  return new Intl.DateTimeFormat(o.value, t).format(d(text).toDate(`UTC`));
}
function ee(e, t) {
  i(`update:modelValue`, e === `start` ? Xy(r.modelValue, `${f.value}T${t}`) : {
    ...r.modelValue,
    end: `${p.value}T${t}`
  });
}
</script>
