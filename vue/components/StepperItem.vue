<template>
<component :is="fe" :ref="i" :as="e.as" :as-child="e.asChild" :aria-current="c.value===`active`?`true`:undefined" :data-state="c.value" :disabled="t||!l.value?``:undefined" :data-disabled="t||!l.value?``:undefined" :data-orientation="a.orientation.value" />
</template>

<script setup>
// [符号说明] l~computed
import { S_is as is, S_as as as, S_state as state, S_t as t, S_i as i, S_a as a, S_c as c, S_l as l, S_fe as fe } from '../shared.js';
const e = defineProps({
      step: {
        type: Number,
        required: true
      },
      disabled: {
        type: Boolean,
        required: false,
        default: false
      },
      completed: {
        type: Boolean,
        required: false,
        default: false
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
</script>
