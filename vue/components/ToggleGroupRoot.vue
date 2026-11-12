<template>
<component :is="Be(a?Ti:fe)" as-child="" :orientation="a?e.orientation:undefined" :dir="c" :loop="a?i:undefined" />
</template>

<script setup>
import { S_is as is, S_as as as, S_i as i, S_a as a, S_c as c, S_fe as fe, S_Be as Be, S_Ti as Ti } from '../shared.js';
const e = defineProps({
      rovingFocus: {
        type: Boolean,
        required: false,
        default: true
      },
      disabled: {
        type: Boolean,
        required: false,
        default: false
      },
      orientation: {
        type: String,
        required: false
      },
      dir: {
        type: String,
        required: false
      },
      loop: {
        type: Boolean,
        required: false,
        default: true
      },
      asChild: {
        type: Boolean,
        required: false
      },
      as: {
        type: null,
        required: false
      },
      name: {
        type: String,
        required: false
      },
      required: {
        type: Boolean,
        required: false
      },
      type: {
        type: String,
        required: false
      },
      modelValue: {
        type: null,
        required: false
      },
      defaultValue: {
        type: null,
        required: false
      }
    });
const n = e;
</script>
