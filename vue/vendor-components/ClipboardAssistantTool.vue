<template>
<div><span v-text="m(_e,{tool:props.tool,user:props.user,'credits-balance':props.creditsBalance,'voice-tool':false,'show-history':false,'local-tool':``,'show-balance':false,onBack:t[0]||=props=>r(`back`),onRecharge:t[1]||=props=>r(`recharge`)},null,8,[`tool`,`user`,`credits-balance`])" /><span v-text="m(x,{active:props.active},null,8,[`active`])" /></div>
</template>

<script setup>
import { createElementBlock as c, openBlock as p } from 'vue';
import { Dt as e, Ot as t, r as n, t as r } from '../vendor/ui/Switch.js';
import { t as _e } from '../vendor/pages/ToolboxWorkspaceHeader.js';

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
var S = {
  class: `flex h-full min-h-0 w-full flex-col overflow-hidden bg-background`
};
</script>
