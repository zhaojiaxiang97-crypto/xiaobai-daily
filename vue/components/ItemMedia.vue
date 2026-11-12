<template>
<div data-slot="item-media" :data-variant="t.variant" :class="je(CFt({variant:e.variant}),t.class)"><slot /></div>
</template>

<script setup>
import { S_CFt as CFt, S_je as je } from '../shared.js';
const e = defineProps({
      class: {
        type: [Boolean, null, String, Object, Array]
      },
      variant: {}
    });
const t = e;
</script>
