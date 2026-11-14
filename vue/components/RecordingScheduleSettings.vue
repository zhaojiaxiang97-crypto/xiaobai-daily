<template>
<div :class="[`flex shrink-0 items-center gap-4 rounded-xl px-4 py-3 transition-colors`,options.enabled?`bg-black/[0.028] hover:bg-black/[0.045] dark:bg-white/[0.045] dark:hover:bg-white/[0.07]`:`bg-black/[0.018] hover:bg-black/[0.032] dark:bg-white/[0.022] dark:hover:bg-white/[0.045]`]"><button type="button" :class="[`min-w-0 flex-1 cursor-pointer rounded-md text-left outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary/40`,{'opacity-50':!options.enabled}]" :disabled="u?.value" @click="t=>ee(options)"><span><span>{{ options.allDay?n(`settings.recordingSchedule.allDay`):options.start }}</span><span>{{ n(`settings.recordingSchedule.nextDay`) }}</span><span>{{ options.end }}</span></span><span><span :class="[`rounded px-1.5 py-0.5 text-[11px] font-medium`,options.type===`record`?`bg-primary/10 text-primary`:`bg-black/[0.06] text-muted-foreground dark:bg-white/10`]">{{ n(options.type===`record`?`settings.recordingSchedule.record`:`settings.recordingSchedule.exclude`) }}</span><span>{{ E(options) }}</span></span></button><div><component :is="Te" :class="`mr-1`" :model-value="options.enabled" :disabled="u?.value" :aria-label="n(options.enabled?`settings.recordingSchedule.disableRule`:`settings.recordingSchedule.enableRule`)" @update:modelvalue="t=>ie(options,t)" /><component :is="P" variant="ghost" size="icon" :class="`h-7 w-7`" :disabled="u?.value" :aria-label="n(`settings.recordingSchedule.editRule`)" @click="t=>ee(options)" /><component :is="P" variant="ghost" size="icon" :class="`h-7 w-7 hover:text-destructive`" :disabled="u?.value" :aria-label="n(`settings.recordingSchedule.deleteRule`)" @click="t=>ae(options)" /></div></div>
</template>

<script setup>
import xl from './MenuRadioItem.vue';
import md from './BaseSeparator.vue';
// [符号说明] n~computed
import { S_is as is, S_px as px, S_n as n, S_w as w, S_E as E, S_P as P, S_Te as Te, S_mr as mr } from '../shared.js';
const event = defineProps({
      disabled: {
        type: Boolean
      }
    });
const t = event;

// [兜底] 模板引用但无来源的符号
const options = { value: undefined };
const u = { value: undefined };

// [setup 还原] 原组件 setup 里初值不依赖 IPC 的声明
function ee(e) {
  if (f.value = e ? {
    ...e,
    days: [...e.days]
  } : {
    id: crypto.randomUUID(),
    enabled: true,
    type: `record`,
    days: [1, 2, 3, 4, 5],
    start: `09:00`,
    end: `18:00`
  }, y.value = e ? D(e) : `weekdays`, e && C(e)) {
    let date = new Date();
    list.value = [...nr(e, date)], x.value = [...nr(e, new Date(date.getFullYear(), date.getMonth(), date.getDate() + 7))];
  } else list.value = [1, 2, 3, 4, 5, 6], x.value = [1, 2, 3, 4, 5];
  p.value = ``, d.value = true;
}
function ie(e, t) {
  j({
    rules: l.value.rules.map(item => item.id === e.id ? {
      ...item,
      enabled: t
    } : item)
  });
}
function ae(e) {
  j({
    rules: l.value.rules.filter(item => item.id !== e.id)
  });
}
</script>
