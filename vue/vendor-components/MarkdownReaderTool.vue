<template>
<div><span v-text="D(ni,{ref_key:`reader`,ref:a,tool:props.tool,user:props.user,'credits-balance':props.creditsBalance,active:props.active,'open-request':props.openRequest,onBack:t[0]||=props=>i(`back`),onRecharge:t[1]||=props=>i(`recharge`)},null,8,[`tool`,`user`,`credits-balance`,`active`,`open-request`])" /></div>
</template>

<script setup>
import { createElementBlock as g, openBlock as T } from 'vue';
import { B as e, C as t, T as n, U as r, V as i, at as a, lt as o } from '../vendor/ui/Switch.js';

const props = defineProps({
  tool: {},
  user: {},
  creditsBalance: {},
  creditsPolicy: {},
  active: {
    type: Boolean
  },
  openRequest: {}
});
var ri = {
  class: `flex h-full min-h-0 w-full flex-col overflow-hidden bg-background`
};
</script>
