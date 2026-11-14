<template>
<component :is="fe" :as-child="e.asChild" :as="e.as" :aria-valuemax="a" :aria-valuemin="0" :aria-valuenow="Vl(i)?i:undefined" :aria-valuetext="e.getValueText?.(i,a)" :aria-label="e.getValueLabel(i,a)" role="progressbar" :data-state="o?.value" :data-value="i??undefined" :data-max="a" />
</template>

<script setup>
import { S_is as is, S_as as as, S_Rl as Rl, S_Vl as Vl, S_state as state, S_t as t, S_i as i, S_a as a, S_fe as fe } from '../shared.js';
const e = defineProps({
      modelValue: {
        type: [Number, null],
        required: false
      },
      max: {
        type: Number,
        required: false,
        default: Rl
      },
      getValueLabel: {
        type: Function,
        required: false,
        default: (e, t) => Vl(e) ? `${Math.round(e / t * Rl)}%` : undefined
      },
      getValueText: {
        type: Function,
        required: false
      },
      asChild: {
        type: Boolean,
        required: false
      },
      as: {
        type: null,
        required: false
      }
    });
const n = e;

// [兜底] 模板引用但无来源的符号
const o = { value: undefined };
</script>
