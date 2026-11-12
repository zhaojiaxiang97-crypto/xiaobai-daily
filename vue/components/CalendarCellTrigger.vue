<template>
<component :is="fe" :ref="a" :as="n.as" :as-child="n.asChild" role="button" :aria-label="c.value" data-reka-calendar-cell-trigger="" :aria-disabled="p.value||l.value?true:undefined" :data-selected="h.value?true:undefined" :data-value="e.day.toString()" :data-disabled="p.value?``:undefined" :data-unavailable="l.value?``:undefined" :data-today="u.value?``:undefined" :data-outside-view="d.value?``:undefined" :data-outside-visible-view="f.value?``:undefined" :data-focused="m.value?``:undefined" :tabindex="m.value?0:d.value||p.value?undefined:-1" @click="_" @keydown="xt(v,[`up`,`down`,`left`,`right`,`space`,`enter`])" />
</template>

<script setup>
import { S_is as is, S_as as as, S_up as up, S_e as e, S_a as a, S_c as c, S_l as l, S_u as u, S_d as d, S_f as f, S_p as p, S_m as m, S__ as _, S_v as v, S_fe as fe, S_xt as xt } from '../shared.js';
const t = defineProps({
      day: {
        type: null,
        required: true
      },
      month: {
        type: null,
        required: true
      },
      asChild: {
        type: Boolean,
        required: false
      },
      as: {
        type: null,
        required: false,
        default: `div`
      }
    });
const n = t;
</script>
