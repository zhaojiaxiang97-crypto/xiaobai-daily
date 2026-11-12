<template>
<component :is="o" />
</template>

<script setup>
import { unref as d, renderSlot as f, createBlock as y, openBlock as S } from 'vue';
// [符号说明] e~shallowRef, t~computed
import { $ as e, H as t, j as o } from '../vendor/ui/Switch.js';

var U = [`PageUp`, `PageDown`];
var W = [`ArrowUp`, `ArrowDown`, `ArrowLeft`, `ArrowRight`];
</script>
