<template>
<component :is="pe" :open="i" @update:open="props=>ne(i)?i.value=props:null" :dir="c" :modal="o" />
</template>

<script setup>
import { unref as T, renderSlot as E, createBlock as j, openBlock as P } from 'vue';
// [符号说明] e~computed, p~computed
import { B as e, D as t, L as i, O as o, P as s, Q as c, V as u, at as p, lt as _ } from '../vendor/ui/Switch.js';
// [符号说明] K=useConfigProviderContext
import { r as K } from '../vendor/ui/Collection.js';

const props = defineProps({
  defaultOpen: {
    type: Boolean,
    required: false
  },
  open: {
    type: Boolean,
    required: false,
    default: undefined
  },
  dir: {
    type: String,
    required: false
  },
  modal: {
    type: Boolean,
    required: false,
    default: true
  }
});
</script>
