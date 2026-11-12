<template>
<component :is="as" />
</template>

<script setup>
import { normalizeClass as t, defineAsyncComponent as r, unref as i, watch as P, createBlock as F, openBlock as L, computed as B } from 'vue';

function Z(e) {
  let t = A(e);
  return t?.$el ?? t;
}
function To() {
  let e = I();
  return {
    primitiveElement: e,
    currentElement: B(() => [`#text`, `#comment`].includes(e.value?.$el.nodeName) ? e.value?.$el.nextElementSibling : Z(e))
  };
}
</script>
