<template>
<component :is="ie" />
</template>

<script setup>
import { unref as T, renderSlot as E, createBlock as j, openBlock as P } from 'vue';
import { B as e, D as t, L as i, N as a, at as p, lt as _ } from '../vendor/ui/Switch.js';
import { a as ie } from '../vendor/ui/PopperContent.js';
// [符号说明] K=useConfigProviderContext
import { r as K } from '../vendor/ui/Collection.js';

function le() {
  let e = M(false);
  return B(() => {
    c(`keydown`, () => {
      e.value = true;
    }, {
      capture: true,
      passive: true
    }), c([`pointerdown`, `pointermove`], () => {
      e.value = false;
    }, {
      capture: true,
      passive: true
    });
  }), e;
}
var ue = v(le);
</script>
