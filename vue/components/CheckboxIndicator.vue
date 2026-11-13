<template>
<component :is="h" :present="e.forceMount||fl(n.state.value)||n.state.value===true" />
</template>

<script setup>
// [符号说明] n~computed
import { S_is as is, S_as as as, S_fl as fl, S_state as state, S_n as n } from '../shared.js';
const e = defineProps({
      forceMount: {
        type: Boolean,
        required: false
      },
      asChild: {
        type: Boolean,
        required: false
      },
      as: {
        type: null,
        required: false,
        default: `span`
      }
    });
</script>
