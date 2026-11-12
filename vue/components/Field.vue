<template>
<div role="group" data-slot="field" :data-orientation="e.orientation" :class="je(KB({orientation:e.orientation}),t.class)"><slot /></div>
</template>

<script setup>
import { S_KB as KB, S_je as je } from '../shared.js';
const e = defineProps({
      class: {
        type: [Boolean, null, String, Object, Array]
      },
      orientation: {
        default: `vertical`
      }
    });
const t = e;
</script>
