<template>
<component :is="fe" :as="e.as" :as-child="e.asChild" role="gridcell" :aria-selected="t.isDateSelected(e.date)?true:undefined" :aria-disabled="t.isDateDisabled(e.date)||t.isDateUnavailable?.(e.date)||t.disableDaysOutsideCurrentView.value" :data-disabled="t.isDateDisabled(e.date)||t.disableDaysOutsideCurrentView.value?``:undefined" />
</template>

<script setup>
import { S_is as is, S_as as as, S_t as t, S_fe as fe } from '../shared.js';
const e = defineProps({
      date: {
        type: null,
        required: true
      },
      asChild: {
        type: Boolean,
        required: false
      },
      as: {
        type: null,
        required: false,
        default: `td`
      }
    });
</script>
