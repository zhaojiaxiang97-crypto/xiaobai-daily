<template>
<component :is="ss" />
</template>

<script setup>
import { normalizeClass as t, defineAsyncComponent as r, unref as i, renderSlot as u, createStaticVNode as d, createElementBlock as fe, createBlock as F, Fragment as Ie, openBlock as L, computed as B, createCommentVNode as Bt } from 'vue';
import { E as Jt, T as Xt, i as on } from '../vendor/i18n/en-US-player.js';

var Ei = e => e !== undefined;
function Z(e) {
  let t = A(e);
  return t?.$el ?? t;
}
function va(e) {
  return JSON.parse(JSON.stringify(e));
}
function Ra(e, t, n, r = {}) {
  var i, a;
  let {
      clone: o = false,
      passive: s = false,
      eventName: c,
      deep: l = false,
      defaultValue: u,
      shouldEmit: d
    } = r,
    f = V(),
    p = n || f?.emit || (f == null || (i = f.$emit) == null ? undefined : i.bind(f)) || (f == null || (a = f.proxy) == null || (a = a.$emit) == null ? undefined : a.bind(f?.proxy)),
    m = c;
  t ||= `modelValue`, m ||= `update:${t.toString()}`;
  let h = e => o ? typeof o == `function` ? o(e) : va(e) : e,
    g = () => Ei(e[t]) ? h(e[t]) : u,
    _ = e => {
      d ? d(e) && p(m, e) : p(m, e);
    };
  if (s) {
    let n = I(g()),
      r = false;
    return P(() => e[t], e => {
      r || (r = true, n.value = h(e), z(() => r = false));
    }), P(n, n => {
      !r && (n !== e[t] || l) && _(n);
    }, {
      deep: l
    }), n;
  }
  return B({
    get() {
      return g();
    },
    set(e) {
      _(e);
    }
  });
}
function Za(e) {
  return B(() => !A(e) || !!Z(e)?.closest(`form`));
}
function Qa() {
  let e = V(),
    t = I(),
    n = B(() => r());
  Ze(() => {
    n.value !== r() && it(t);
  });
  function r() {
    return t.value && `$el` in t.value && [`#text`, `#comment`].includes(t.value.$el.nodeName) ? t.value.$el.nextElementSibling : Z(t);
  }
  let i = Object.assign({}, e.exposed),
    a = {};
  for (let t in e.props) Object.defineProperty(a, t, {
    enumerable: true,
    configurable: true,
    get: () => e.props[t]
  });
  if (Object.keys(i).length > 0) for (let e in i) Object.defineProperty(a, e, {
    enumerable: true,
    configurable: true,
    get: () => i[e]
  });
  Object.defineProperty(a, "$el", {
    enumerable: true,
    configurable: true,
    get: () => e.vnode.el
  }), e.exposed = a;
  function o(n) {
    if (t.value = n, n && (Object.defineProperty(a, "$el", {
      enumerable: true,
      configurable: true,
      get: () => n instanceof Element ? n : n.$el
    }), !(n instanceof Element) && !Object.hasOwn(n, `$el`))) {
      let exposed = n.$.exposed,
        r = Object.assign({}, a);
      for (let e in exposed) Object.defineProperty(r, e, {
        enumerable: true,
        configurable: true,
        get: () => exposed[e]
      });
      e.exposed = r;
    }
  }
  return {
    forwardRef: o,
    currentRef: t,
    currentElement: n
  };
}
function to() {
  let e = V()?.vnode?.scopeId;
  return e ? {
    [e]: ``
  } : {};
}
</script>
