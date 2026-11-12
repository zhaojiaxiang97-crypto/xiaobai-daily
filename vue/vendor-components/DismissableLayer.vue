<template>
<component :is="wo" :ref="a_4" :as-child="e_0_13.asChild" :as="e_0_13.as" data-dismissable-layer="" :style="pt({pointerEvents:d_9.value?f_10.value?`auto`:`none`:undefined})" @focuscapture="m_12.onFocusCapture" @blurcapture="m_12.onBlurCapture" @pointerdowncapture="p_11.onPointerDownCapture" />
</template>

<script setup>
import { normalizeClass as t, defineAsyncComponent as r, unref as i, renderSlot as u, createStaticVNode as d, watch as P, createBlock as F, openBlock as L, computed as B } from 'vue';

const e_0 = defineProps({
  disableOutsidePointerEvents: {
    type: Boolean,
    required: false,
    default: false
  },
  asChild: {
    type: Boolean,
    required: false
  },
  as: {
    type: null,
    required: false
  },
  present: {
    type: Boolean,
    required: false,
    default: true
  }
});
const n_1 = e_0_13;
function yi(e_0_13, t_14, n_1_2) {
  let target = n_1_2.originalEvent.target,
    i = new CustomEvent(e_0_13, {
      bubbles: false,
      cancelable: true,
      detail: n_1_2
    });
  t_14 && target.addEventListener(e_0_13, t_14, {
    once: true
  }), target.dispatchEvent(i);
}
function bi(e_0_13) {
  return e_0_13 == null;
}
var J = typeof window < `u` && typeof document < `u`;
var Oi = Object.prototype.toString;
var ki = e_0_13 => Oi.call(e_0_13) === `[object Object]`;
function zi(e_0_13) {
  return Array.isArray(e_0_13) ? e_0_13 : [e_0_13];
}
function ia(e_0_13, t_14, n_1_2) {
  return P(e_0_13, t_14, {
    ...n_1_2,
    immediate: true
  });
}
var X = J ? window : undefined;
function Z(e_0_13) {
  let t_14 = A(e_0_13);
  return t_14?.$el ?? t_14;
}
function ca(...e_0_13) {
  let t_14 = (e_0_13, t_14, n_1_2, r_3) => (e_0_13.addEventListener(t_14, n_1_2, r_3), () => e_0_13.removeEventListener(t_14, n_1_2, r_3)),
    n_1_2 = B(() => {
      let t_14 = zi(A(e_0_13[0])).filter(item => item != null);
      return t_14.every(item => typeof item != `string`) ? t_14 : undefined;
    });
  return ia(() => [n_1_2.value?.map(e_0_13 => Z(e_0_13)) ?? [X].filter(item => item != null), zi(A(n_1_2.value ? e_0_13[1] : e_0_13[0])), zi(i(n_1_2.value ? e_0_13[2] : e_0_13[1])), A(n_1_2.value ? e_0_13[3] : e_0_13[2])], ([e_0_13, n_1_2, r_3, i], a_4, o_5) => {
    if (!e_0_13?.length || !n_1_2?.length || !r_3?.length) return;
    let s_6 = ki(i) ? {
        ...i
      } : i,
      c_7 = e_0_13.flatMap(item => n_1_2.flatMap(n_1_2 => r_3.map(r_3 => t_14(item, n_1_2, r_3, s_6))));
    o_5(() => {
      c_7.forEach(item => item());
    });
  }, {
    flush: `post`
  });
}
function fa(e_0_13) {
  return typeof e_0_13 == `function` ? e_0_13 : typeof e_0_13 == `string` ? t_14 => t_14.key === e_0_13 : Array.isArray(e_0_13) ? t_14 => e_0_13.includes(t_14.key) : () => true;
}
function pa(...e_0_13) {
  let t_14,
    n_1_2,
    r_3 = {};
  e_0_13.length === 3 ? (t_14 = e_0_13[0], n_1_2 = e_0_13[1], r_3 = e_0_13[2]) : e_0_13.length === 2 ? typeof e_0_13[1] == `object` ? (t_14 = true, n_1_2 = e_0_13[0], r_3 = e_0_13[1]) : (t_14 = e_0_13[0], n_1_2 = e_0_13[1]) : (t_14 = true, n_1_2 = e_0_13[0]);
  let {
      target: i = X,
      eventName: a_4 = `keydown`,
      passive: o_5 = false,
      dedupe: s_6 = false
    } = r_3,
    c_7 = fa(t_14);
  return ca(i, a_4, e_0_13 => {
    e_0_13.repeat && A(s_6) || c_7(e_0_13) && n_1_2(e_0_13);
  }, o_5);
}
var Q = Ft({
  layersRoot: new Set(),
  layersWithOutsidePointerEventsDisabled: new Set(),
  originalBodyPointerEvents: undefined,
  branches: new Set()
});
function Qa() {
  let e_0_13 = V(),
    t_14 = I(),
    n_1_2 = B(() => r_3());
  Ze(() => {
    n_1_2.value !== r_3() && it(t_14);
  });
  function r_3() {
    return t_14.value && `$el` in t_14.value && [`#text`, `#comment`].includes(t_14.value.$el.nodeName) ? t_14.value.$el.nextElementSibling : Z(t_14);
  }
  let i = Object.assign({}, e_0_13.exposed),
    a_4 = {};
  for (let t_14 in e_0_13.props) Object.defineProperty(a_4, t_14, {
    enumerable: true,
    configurable: true,
    get: () => e_0_13.props[t_14]
  });
  if (Object.keys(i).length > 0) for (let e_0_13 in i) Object.defineProperty(a_4, e_0_13, {
    enumerable: true,
    configurable: true,
    get: () => i[e_0_13]
  });
  Object.defineProperty(a_4, "$el", {
    enumerable: true,
    configurable: true,
    get: () => e_0_13.vnode.el
  }), e_0_13.exposed = a_4;
  function o_5(n_1_2) {
    if (t_14.value = n_1_2, n_1_2 && (Object.defineProperty(a_4, "$el", {
      enumerable: true,
      configurable: true,
      get: () => n_1_2 instanceof Element ? n_1_2 : n_1_2.$el
    }), !(n_1_2 instanceof Element) && !Object.hasOwn(n_1_2, `$el`))) {
      let exposed = n_1_2.$.exposed,
        r_3 = Object.assign({}, a_4);
      for (let e_0_13 in exposed) Object.defineProperty(r_3, e_0_13, {
        enumerable: true,
        configurable: true,
        get: () => exposed[e_0_13]
      });
      e_0_13.exposed = r_3;
    }
  }
  return {
    forwardRef: o_5,
    currentRef: t_14,
    currentElement: n_1_2
  };
}
var Eo = `dismissableLayer.pointerDownOutside`;
var Do = `dismissableLayer.focusOutside`;
function Oo(e_0_13, t_14) {
  if (!(t_14 instanceof Element)) return false;
  let n_1_2 = t_14.closest(`[data-dismissable-layer]`),
    r_3 = e_0_13.dataset.dismissableLayer === `` ? e_0_13 : e_0_13.querySelector(`[data-dismissable-layer]`),
    i = Array.from(e_0_13.ownerDocument.querySelectorAll(`[data-dismissable-layer]`));
  return !!(n_1_2 && (r_3 === n_1_2 || i.indexOf(r_3) < i.indexOf(n_1_2)));
}
function ko(e_0_13, t_14, n_1_2 = true) {
  let r_3 = t_14?.value?.ownerDocument ?? globalThis?.document,
    i = I(false),
    a_4 = I(() => {});
  return b(o_5 => {
    if (!J || !A(n_1_2)) return;
    let s_6 = async n_1_2 => {
        let target = n_1_2.target;
        if (t_14?.value && target) {
          if (Oo(t_14.value, target)) {
            i.value = false;
            return;
          }
          if (n_1_2.target && !i.value) {
            let t_14 = {
              originalEvent: n_1_2
            };
            function i() {
              yi(Eo, e_0_13, t_14);
            }
            n_1_2.pointerType === `touch` ? (r_3.removeEventListener(`click`, a_4.value), a_4.value = i, r_3.addEventListener(`click`, a_4.value, {
              once: true
            })) : i();
          } else r_3.removeEventListener(`click`, a_4.value);
          i.value = false;
        }
      },
      c_7 = window.setTimeout(() => {
        r_3.addEventListener(`pointerdown`, s_6);
      }, 0);
    o_5(() => {
      window.clearTimeout(c_7), r_3.removeEventListener(`pointerdown`, s_6), r_3.removeEventListener(`click`, a_4.value);
    });
  }), {
    onPointerDownCapture: () => {
      A(n_1_2) && (i.value = true);
    }
  };
}
function Ao(e_0_13, t_14, n_1_2 = true) {
  let r_3 = t_14?.value?.ownerDocument ?? globalThis?.document,
    i = I(false);
  return b(a_4 => {
    if (!J || !A(n_1_2)) return;
    let o_5 = async n_1_2 => {
      if (!t_14?.value) return;
      await z(), await z();
      let target = n_1_2.target;
      t_14.value && target && !Oo(t_14.value, target) && n_1_2.target && !i.value && yi(Do, e_0_13, {
        originalEvent: n_1_2
      });
    };
    r_3.addEventListener(`focusin`, o_5), a_4(() => r_3.removeEventListener(`focusin`, o_5));
  }), {
    onFocusCapture: () => {
      A(n_1_2) && (i.value = true);
    },
    onBlurCapture: () => {
      A(n_1_2) && (i.value = false);
    }
  };
}
let n_1_2 = e_0_13,
  r_3 = t_14,
  {
    forwardRef: a_4,
    currentElement: o_5
  } = Qa(),
  s_6 = B(() => o_5.value?.ownerDocument ?? globalThis.document),
  c_7 = B(() => Q.layersRoot),
  l_8 = B(() => o_5.value ? Array.from(c_7.value).indexOf(o_5.value) : -1),
  d_9 = B(() => Q.layersWithOutsidePointerEventsDisabled.size > 0),
  f_10 = B(() => {
    let e_0_13 = Array.from(c_7.value),
      [t_14] = [...Q.layersWithOutsidePointerEventsDisabled].slice(-1),
      n_1_2 = e_0_13.indexOf(t_14);
    return l_8.value >= n_1_2;
  }),
  p_11 = ko(async e_0_13 => {
    let t_14 = [...Q.branches].some(item => item?.contains(e_0_13.target));
    n_1_2.present && f_10.value && !t_14 && (r_3(`pointerDownOutside`, e_0_13), r_3(`interactOutside`, e_0_13), await z(), e_0_13.defaultPrevented || r_3(`dismiss`));
  }, o_5, () => n_1_2.present),
  m_12 = Ao(e_0_13 => {
    let t_14 = [...Q.branches].some(item => item?.contains(e_0_13.target));
    n_1_2.present && !t_14 && (r_3(`focusOutside`, e_0_13), r_3(`interactOutside`, e_0_13), e_0_13.defaultPrevented || r_3(`dismiss`));
  }, o_5);
let e_0_13 = Array.from(c_7.value),
  [t_14] = [...Q.layersWithOutsidePointerEventsDisabled].slice(-1),
  n_1_15 = e_0_13.indexOf(t_14);
</script>
