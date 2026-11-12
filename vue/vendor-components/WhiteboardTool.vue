<template>
<div><span v-text="g(_e,{tool:props.tool,user:props.user,'credits-balance':props.creditsBalance,'voice-tool':false,'local-tool':``,'whiteboard-tool':``,'show-history':false,onBack:t[0]||=props=>i(`back`),onRecharge:t[1]||=props=>i(`recharge`),onWhiteboardOpen:t[2]||=props=>a.value?.openBoard(),onWhiteboardSave:t[3]||=props=>a.value?.saveCurrentBoard(),onWhiteboardSaveAs:t[4]||=props=>a.value?.openSaveAsDialog()},null,8,[`tool`,`user`,`credits-balance`])" /><span v-text="g(tn,{ref_key:`workspace`,ref:a},null,512)" /></div>
</template>

<script setup>
import { createElementBlock as d, openBlock as h } from 'vue';
import { Ct as e, Ot as t, Tt as n, jt as r, kt as i, r as a, wt as o } from '../vendor/ui/Switch.js';
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
var nn = {
  class: `flex h-full min-h-0 w-full flex-col overflow-hidden bg-background`
};
</script>
