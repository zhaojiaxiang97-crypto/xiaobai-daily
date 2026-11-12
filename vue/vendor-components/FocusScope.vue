<template>
<component :is="wo" :ref="a_4" tabindex="-1" :as-child="e_0.asChild" :as="e_0.as" @keydown="f_9" />
</template>

<script setup>
import { normalizeClass as t, defineAsyncComponent as r, unref as i, renderSlot as u, createStaticVNode as d, watch as P, createBlock as F, openBlock as L } from 'vue';

const e_0 = defineProps({
  loop: {
    type: Boolean,
    required: false,
    default: false
  },
  trapped: {
    type: Boolean,
    required: false,
    default: false
  },
  present: {
    type: Boolean,
    required: false,
    default: true
  },
  asChild: {
    type: Boolean,
    required: false
  },
  as: {
    type: null,
    required: false
  }
});
const n_1 = e_0;
function K() {
  let activeElement = document.activeElement;
  if (activeElement == null) return null;
  for (; activeElement != null && activeElement.shadowRoot != null && activeElement.shadowRoot.activeElement != null;) activeElement = activeElement.shadowRoot.activeElement;
  return activeElement;
}
function Ci(e_0) {
  let t_10 = false,
    n_1_2,
    r_3_11 = gt(true);
  return (...i) => (t_10 ||= (n_1_2 = r_3_11.run(() => e_0(...i)), true), n_1_2);
}
var J = typeof window < `u` && typeof document < `u`;
function Z(e_0) {
  let t_10 = A(e_0);
  return t_10?.$el ?? t_10;
}
function Qa() {
  let e_0 = V(),
    t_10 = I(),
    n_1_2 = B(() => r_3_11());
  Ze(() => {
    n_1_2.value !== r_3_11() && it(t_10);
  });
  function r_3_11() {
    return t_10.value && `$el` in t_10.value && [`#text`, `#comment`].includes(t_10.value.$el.nodeName) ? t_10.value.$el.nextElementSibling : Z(t_10);
  }
  let i = Object.assign({}, e_0.exposed),
    a_4 = {};
  for (let t_10 in e_0.props) Object.defineProperty(a_4, t_10, {
    enumerable: true,
    configurable: true,
    get: () => e_0.props[t_10]
  });
  if (Object.keys(i).length > 0) for (let e_0 in i) Object.defineProperty(a_4, e_0, {
    enumerable: true,
    configurable: true,
    get: () => i[e_0]
  });
  Object.defineProperty(a_4, "$el", {
    enumerable: true,
    configurable: true,
    get: () => e_0.vnode.el
  }), e_0.exposed = a_4;
  function o_5(n_1_2) {
    if (t_10.value = n_1_2, n_1_2 && (Object.defineProperty(a_4, "$el", {
      enumerable: true,
      configurable: true,
      get: () => n_1_2 instanceof Element ? n_1_2 : n_1_2.$el
    }), !(n_1_2 instanceof Element) && !Object.hasOwn(n_1_2, `$el`))) {
      let exposed = n_1_2.$.exposed,
        r_3_11 = Object.assign({}, a_4);
      for (let e_0 in exposed) Object.defineProperty(r_3_11, e_0, {
        enumerable: true,
        configurable: true,
        get: () => exposed[e_0]
      });
      e_0.exposed = r_3_11;
    }
  }
  return {
    forwardRef: o_5,
    currentRef: t_10,
    currentElement: n_1_2
  };
}
var Mo = Ci(() => I([]));
function No() {
  let e_0 = Mo();
  return {
    add(t_10) {
      let n_1_2 = e_0.value[0];
      t_10 !== n_1_2 && n_1_2?.pause(), e_0.value = Po(e_0.value, t_10), e_0.value.unshift(t_10);
    },
    remove(t_10) {
      e_0.value = Po(e_0.value, t_10), e_0.value[0]?.resume();
    }
  };
}
function Po(e_0, t_10) {
  let n_1_2 = [...e_0],
    r_3_11 = n_1_2.indexOf(t_10);
  return r_3_11 !== -1 && n_1_2.splice(r_3_11, 1), n_1_2;
}
var Fo = `focusScope.autoFocusOnMount`;
var Io = `focusScope.autoFocusOnUnmount`;
var Lo = {
  bubbles: false,
  cancelable: true
};
function Ro(e_0, {
  select: t_10 = false
} = {}) {
  let n_1_2 = K();
  for (let r_3_11 of e_0) if (Wo(r_3_11, {
    select: t_10
  }), K() !== n_1_2) return true;
}
function zo(e_0) {
  let t_10 = Bo(e_0);
  return [Vo(t_10, e_0), Vo(t_10.reverse(), e_0)];
}
function Bo(e_0) {
  let t_10 = [],
    treeWalker = document.createTreeWalker(e_0, NodeFilter.SHOW_ELEMENT, {
      acceptNode: e_0 => {
        let t_10 = e_0.tagName === `INPUT` && e_0.type === `hidden`;
        return e_0.disabled || e_0.hidden || t_10 ? NodeFilter.FILTER_SKIP : e_0.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
      }
    });
  for (; treeWalker.nextNode();) t_10.push(treeWalker.currentNode);
  return t_10;
}
function Vo(e_0, t_10) {
  for (let n_1_2 of e_0) if (!Ho(n_1_2, {
    upTo: t_10
  })) return n_1_2;
}
function Ho(e_0, {
  upTo: t_10
}) {
  if (getComputedStyle(e_0).visibility === `hidden`) return true;
  for (; e_0;) {
    if (t_10 !== undefined && e_0 === t_10) return false;
    if (getComputedStyle(e_0).display === `none`) return true;
    e_0 = e_0.parentElement;
  }
  return false;
}
function Uo(e_0) {
  return e_0 instanceof HTMLInputElement && `select` in e_0;
}
function Wo(e_0, {
  select: t_10 = false
} = {}) {
  if (e_0 && e_0.focus) {
    let n_1_2 = K();
    e_0.focus({
      preventScroll: true
    }), e_0 !== n_1_2 && Uo(e_0) && t_10 && e_0.select();
  }
}
let n_1_2 = e_0,
  r_3 = t_10,
  {
    currentRef: a_4,
    currentElement: o_5
  } = Qa(),
  s_6 = I(null),
  c_7 = No(),
  l_8 = Ft({
    paused: false,
    pause() {
      this.paused = true;
    },
    resume() {
      this.paused = false;
    }
  });
function f_9(e_0) {
  if (!n_1.loop && !n_1.trapped || l_8.paused) return;
  let t_10 = e_0.key === `Tab` && !e_0.altKey && !e_0.ctrlKey && !e_0.metaKey,
    r_3_11 = K();
  if (t_10 && r_3_11) {
    let currentTarget = e_0.currentTarget,
      [i, a_4] = zo(currentTarget);
    i && a_4 ? !e_0.shiftKey && r_3_11 === a_4 ? (e_0.preventDefault(), n_1.loop && Wo(i, {
      select: true
    })) : e_0.shiftKey && r_3_11 === i && (e_0.preventDefault(), n_1.loop && Wo(a_4, {
      select: true
    })) : r_3_11 === currentTarget && e_0.preventDefault();
  }
}
let t_10 = e_0.key === `Tab` && !e_0.altKey && !e_0.ctrlKey && !e_0.metaKey,
  r_3_11 = K();
</script>
