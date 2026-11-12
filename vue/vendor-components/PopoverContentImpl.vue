<template>
<component :is="a" as-child="" loop="" :trapped="e.trapFocus" @mountautofocus="e=>i(`openAutoFocus`,e)" @unmountautofocus="e=>i(`closeAutoFocus`,e)" />
</template>

<script setup>
import { unref as g, renderSlot as _, createBlock as y, openBlock as x } from 'vue';
// [符号说明] e~computed, t=useConfigProviderContext, n=useConfigProviderContext
import { B as e, I as t, K as n, N as i, O as a, V as o, _ as c, k as d, lt as f } from '../vendor/ui/Switch.js';
import { n as de, o as fe } from '../vendor/ui/PopperContent.js';
</script>
