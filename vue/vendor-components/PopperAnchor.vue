<template>
<component :is="s" :ref="r" :as="e.as" :as-child="e.asChild" />
</template>

<script setup>
import { unref as h, renderSlot as _, createBlock as T, openBlock as O } from 'vue';
// [符号说明] i~指令
import { V as e, a as t, ct as r, d as i, j as s } from '../vendor/ui/Switch.js';
</script>
