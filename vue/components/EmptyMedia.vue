<template>
<div data-slot="empty-icon" :data-variant="e.variant" :class="je(MO({variant:e.variant}),t.class)"><slot /></div>
</template>

<script setup>
import { S_MO as MO, S_je as je } from '../shared.js';
const e = defineProps({
      class: {
        type: [Boolean, null, String, Object, Array]
      },
      variant: {
        default: `default`
      }
    });
const t = e;
</script>
