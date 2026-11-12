<template>
<component :is="fe" :as="t.as" :as-child="t.asChild" aria-label="Next page" :type="t.as===`button`?`button`:undefined" :aria-disabled="n.value||undefined" :data-disabled="n.value||undefined" :disabled="n.value" @click="i" />
</template>

<script setup>
import { S_is as is, S_as as as, S_n as n, S_i as i, S_fe as fe } from '../shared.js';
const e = defineProps({
      nextPage: {
        type: Function,
        required: false
      },
      asChild: {
        type: Boolean,
        required: false
      },
      as: {
        type: null,
        required: false,
        default: `button`
      }
    });
const t = e;
</script>
