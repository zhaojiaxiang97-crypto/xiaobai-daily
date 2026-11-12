<template>
<button type="button" :disabled="fe(`minute`,t)" :class="[`mb-1 flex w-full items-center justify-center rounded-md text-xs font-medium transition-colors last:mb-0`,options.mode===`datetime`?`h-6`:`h-7`,fe(`minute`,t)?`cursor-not-allowed text-muted-foreground/35`:u.value===t?`bg-primary text-primary-foreground`:`text-foreground hover:bg-muted`]" :data-time-selected="u.value===t" data-time-option="" @click="e=>ue(`minute`,t)">{{ t }}</button>
</template>

<script setup>
import md from './BaseSeparator.vue';
// [符号说明] u=useConfigProviderContext, ue~指令
import { S_xs as xs, S_e as e, S_t as t, S_u as u, S_w as w, S_ue as ue, S_fe as fe } from '../shared.js';
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
</script>
