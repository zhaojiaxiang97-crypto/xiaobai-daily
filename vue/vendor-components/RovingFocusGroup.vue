<template>
<component :is="A" />
</template>

<script setup>
import { unref as i, renderSlot as a, createBlock as c, openBlock as u, defineComponent as d } from 'vue';
import { vt as n, yt as r } from '../vendor/ui/Switch.js';
import { r as p, t as m } from '../vendor/ui/Collection.js';

var h = `rovingFocusGroup.onEntryFocus`;
var g = {
  bubbles: false,
  cancelable: true
};
function b(e_0, t = false) {
  let r = n();
  for (let i of e_0) if (i === r || (i.focus({
    preventScroll: t
  }), n() !== r)) return;
}
let _ = n,
  v = d,
  {
    loop: y,
    orientation: x,
    dir: S
  } = o(_),
  w = p(S),
  T = e_0(_, `currentTabStopId`, v, {
    defaultValue: _.defaultCurrentTabStopId,
    passive: _.currentTabStopId === undefined
  }),
  E = l(false),
  D = l(false),
  O = l(0),
  {
    getItems: k,
    CollectionSlot: A
  } = m({
    isProvider: true
  });
let e_0 = k().map(item => item.ref).filter(item => item.dataset.disabled !== ``);
</script>
