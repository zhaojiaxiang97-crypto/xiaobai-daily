<template>
<div role="group" data-slot="input-group-addon" :data-align="t.align" :class="je(bFt({align:t.align}),t.class)" @click="n"><slot /></div>
</template>

<script setup>
import { S_bFt as bFt, S_n as n, S_je as je } from '../shared.js';
const event = defineProps({
      align: {
        default: `inline-start`
      },
      class: {
        type: [Boolean, null, String, Object, Array]
      }
    });
const t = event;
</script>
