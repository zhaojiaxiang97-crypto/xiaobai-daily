<template>
<component :is="fe" aria-label="Previous page" :as="t.as" :as-child="t.asChild" :type="t.as===`button`?`button`:undefined" :aria-disabled="n.value||undefined" :data-disabled="n.value||undefined" :disabled="n.value" @click="i" />
</template>

<script setup>
// [符号说明] n~computed
import { S_is as is, S_as as as, S_n as n, S_i as i, S_fe as fe } from '../shared.js';
const e = defineProps({
      prevPage: {
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
