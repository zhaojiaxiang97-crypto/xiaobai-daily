<template>
<div data-slot="alert" :class="je(pc({variant:e.variant}),t.class)" role="alert"><slot /></div>
</template>

<script setup>
import { S_pc as pc, S_je as je } from '../shared.js';
const e = defineProps({
      class: {
        type: [Boolean, null, String, Object, Array]
      },
      variant: {}
    });
const t = e;
</script>
