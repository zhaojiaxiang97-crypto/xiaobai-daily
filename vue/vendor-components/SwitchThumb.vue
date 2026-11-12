<template>
<component :is="wo" :data-state="t_1.checked.value?`checked`:`unchecked`" :data-disabled="t_1.disabled.value?``:undefined" :as-child="e_0.asChild" :as="e_0.as" />
</template>

<script setup>
import { normalizeClass as t, unref as i, renderSlot as u, createBlock as F, openBlock as L } from 'vue';

const e_0 = defineProps({
  asChild: {
    type: Boolean,
    required: false
  },
  as: {
    type: null,
    required: false,
    default: `span`
  }
});
function Z(e_0) {
  let t_1 = A(e_0);
  return t_1?.$el ?? t_1;
}
function Qa() {
  let e_0 = V(),
    t_1 = I(),
    n = B(() => r());
  Ze(() => {
    n.value !== r() && it(t_1);
  });
  function r() {
    return t_1.value && `$el` in t_1.value && [`#text`, `#comment`].includes(t_1.value.$el.nodeName) ? t_1.value.$el.nextElementSibling : Z(t_1);
  }
  let i = Object.assign({}, e_0.exposed),
    a = {};
  for (let t_1 in e_0.props) Object.defineProperty(a, t_1, {
    enumerable: true,
    configurable: true,
    get: () => e_0.props[t_1]
  });
  if (Object.keys(i).length > 0) for (let e_0 in i) Object.defineProperty(a, e_0, {
    enumerable: true,
    configurable: true,
    get: () => i[e_0]
  });
  Object.defineProperty(a, "$el", {
    enumerable: true,
    configurable: true,
    get: () => e_0.vnode.el
  }), e_0.exposed = a;
  function o(n) {
    if (t_1.value = n, n && (Object.defineProperty(a, "$el", {
      enumerable: true,
      configurable: true,
      get: () => n instanceof Element ? n : n.$el
    }), !(n instanceof Element) && !Object.hasOwn(n, `$el`))) {
      let exposed = n.$.exposed,
        r = Object.assign({}, a);
      for (let e_0 in exposed) Object.defineProperty(r, e_0, {
        enumerable: true,
        configurable: true,
        get: () => exposed[e_0]
      });
      e_0.exposed = r;
    }
  }
  return {
    forwardRef: o,
    currentRef: t_1,
    currentElement: n
  };
}
let t_1 = il();
</script>
