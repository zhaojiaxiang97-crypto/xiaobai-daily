<template>
<component :is="T" />
</template>

<script setup>
import { unref as n, renderSlot as r, watch as i, createBlock as o, openBlock as s, defineComponent as c, onUnmounted as u, onBeforeMount as f, computed as p } from 'vue';
// [符号说明] e=useConfigProviderContext
import { I as e } from '../vendor/ui/Switch.js';
import { t as m } from '../vendor/ui/Collection.js';
// [符号说明] _=useRovingFocusGroupContext
import { a as h, i as g, n as _, r as v } from '../vendor/ui/RovingFocusGroup.js';

let y = c,
  b = _(),
  x = e(),
  S = p(() => y.tabStopId || x),
  C = p(() => b.currentTabStopId.value === S.value),
  {
    getItems: w,
    CollectionItem: T
  } = m();
</script>
