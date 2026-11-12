<template>
<component :is="fe" data-slot="item" :data-variant="e.variant" :data-size="e.size" :as="e.as" :as-child="e.asChild" :class="je(SFt({variant:e.variant,size:e.size}),t.class)" />
</template>

<script setup>
import { S_is as is, S_as as as, S_SFt as SFt, S_fe as fe, S_je as je } from '../shared.js';
const e = defineProps({
      asChild: {
        type: Boolean
      },
      as: {
        default: `div`
      },
      class: {
        type: [Boolean, null, String, Object, Array]
      },
      variant: {
        default: `default`
      },
      size: {
        default: `default`
      }
    });
const t = e;
</script>
