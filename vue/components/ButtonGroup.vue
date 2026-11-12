<template>
<div role="group" data-slot="button-group" :data-orientation="t.orientation" :class="je(lw({orientation:t.orientation}),t.class)"><slot /></div>
</template>

<script setup>
import { S_lw as lw, S_je as je } from '../shared.js';
const e = defineProps({
      class: {
        type: [Boolean, null, String, Object, Array]
      },
      orientation: {}
    });
const t = e;
</script>
