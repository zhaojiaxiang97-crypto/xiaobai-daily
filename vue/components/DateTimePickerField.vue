<template>
<button type="button" :disabled="fe(`minute`,t)" :class="[`mb-1 flex w-full items-center justify-center rounded-md text-xs font-medium transition-colors last:mb-0`,options.mode===`datetime`?`h-6`:`h-7`,fe(`minute`,t)?`cursor-not-allowed text-muted-foreground/35`:u===t?`bg-primary text-primary-foreground`:`text-foreground hover:bg-muted`]" :data-time-selected="u===t" data-time-option="" @click="e=>ue(`minute`,t)">{{ t }}</button>
</template>

<script setup>
import md from './BaseSeparator.vue';
import { S_xs as xs, S_e as e, S_t as t, S_w as w } from '../shared.js';
const options = defineProps({
      modelValue: {},
      label: {},
      mode: {
        default: `datetime`
      },
      precision: {
        default: `second`
      },
      valueFormat: {
        default: `local`
      },
      endBoundary: {
        type: Boolean,
        default: false
      },
      align: {
        default: `center`
      },
      maxDate: {},
      minDate: {},
      maxDateTime: {},
      minDateTime: {},
      triggerClass: {
        default: ``
      },
      disabled: {
        type: Boolean,
        default: false
      },
      minuteStep: {
        default: 1
      },
      compact: {
        type: Boolean,
        default: false
      },
      showQuickDates: {
        type: Boolean,
        default: true
      },
      modal: {
        type: Boolean,
        default: false
      }
    });
const n = options;
import { ref } from 'vue';

// [setup 还原] 原组件 setup 里初值不依赖 IPC 的声明
let u = ref(`00`);
function ue(e, t) {
  fe(e, t) || (e === `hour` ? l.value = t : e === `minute` ? u.value = t : d.value = t, n.mode === `time` && r(`update:modelValue`, ce()));
}
function fe(e, t) {
  if (n.mode === `date`) return false;
  let r = Number(e === `hour` ? t : l.value),
    i = Number(e === `minute` ? t : u.value),
    a = Number(e === `second` ? t : d.value),
    o = (e, t, n) => new Date(c.value.year, c.value.month - 1, c.value.day, e, t, n).getTime(),
    s = o(r, i, a),
    f = s;
  return e === `hour` ? (s = o(r, 0, 0), f = o(r, 59, 59)) : e === `minute` && (s = o(r, i, 0), f = o(r, i, 59)), A.value != null && f < A.value || j.value != null && s > j.value;
}
</script>
