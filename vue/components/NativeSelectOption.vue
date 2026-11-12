<template>
<option data-slot="native-select-option" :class="je(`bg-[Canvas] text-[CanvasText]`,t.class)"><slot /></option>
</template>

<script setup>
import { S_je as je } from '../shared.js';
const e = defineProps({
      class: {
        type: [Boolean, null, String, Object, Array]
      }
    });
const t = e;
</script>
