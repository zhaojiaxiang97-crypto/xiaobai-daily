import { A as e, J as t, K as n, M as r } from "./Switch.js";
import { Gt as i, H as a, Wt as o, X as s, bn as c, j as l, mn as u, mt as d, ut as f, v as p, vt as m } from "../chunks/vue-i18n.runtime.js";
function h(e) {
  let t = n({
    dir: c(`ltr`)
  });
  return p(() => e?.value || t.dir?.value || `ltr`);
}
function g(e) {
  let n = c(),
    r = p(() => n.value?.width ?? 0),
    i = p(() => n.value?.height ?? 0),
    a;
  return f(() => {
    let r = t(e);
    r ? (n.value = {
      width: r.offsetWidth,
      height: r.offsetHeight
    }, a = new ResizeObserver(e => {
      if (!Array.isArray(e) || !e.length) return;
      let t = e[0],
        i,
        a;
      if (`borderBoxSize` in t) {
        let borderBoxSize = t.borderBoxSize,
          n = Array.isArray(borderBoxSize) ? borderBoxSize[0] : borderBoxSize;
        i = n.inlineSize, a = n.blockSize;
      } else i = r.offsetWidth, a = r.offsetHeight;
      n.value = {
        width: i,
        height: a
      };
    }), a.observe(r, {
      box: `border-box`
    })) : n.value = undefined;
  }), d(() => {
    a?.disconnect(), a = undefined;
  }), {
    width: r,
    height: i
  };
}
var _ = `data-reka-collection-item`;
function v(t = {}) {
  let {
      key: n = ``,
      isProvider: d = false
    } = t,
    f = `${n}CollectionProvider`,
    h;
  if (d) {
    let e = c(new Map());
    h = {
      collectionRef: c(),
      itemMap: e
    }, m(f, h);
  } else h = s(f);
  let g = (e = false) => {
      let value = h.collectionRef.value;
      if (!value) return [];
      let n = Array.from(value.querySelectorAll(`[${_}]`)),
        r = new Map(n.map((item, t) => [item, t])),
        i = Array.from(h.itemMap.value.values()).sort((left, right) => (r.get(left.ref) ?? -1) - (r.get(right.ref) ?? -1));
      return e ? i : i.filter(item => item.ref.dataset.disabled !== ``);
    },
    v = l({
      name: `CollectionSlot`,
      inheritAttrs: false,
      setup(t, {
        slots: n,
        attrs: i
      }) {
        let {
          primitiveElement: s,
          currentElement: c
        } = e();
        return o(c, () => {
          h.collectionRef.value = c.value;
        }), () => a(r, {
          ref: s,
          ...i
        }, n);
      }
    }),
    y = l({
      name: `CollectionItem`,
      inheritAttrs: false,
      props: {
        value: {
          validator: () => true
        }
      },
      setup(t, {
        slots: n,
        attrs: o
      }) {
        let {
          primitiveElement: s,
          currentElement: c
        } = e();
        return i(e => {
          if (c.value) {
            let n = u(c.value);
            h.itemMap.value.set(n, {
              ref: c.value,
              value: t.value
            }), e(() => h.itemMap.value.delete(n));
          }
        }), () => a(r, {
          ...o,
          [_]: ``,
          ref: s
        }, n);
      }
    });
  return {
    getItems: g,
    reactiveItems: p(() => Array.from(h.itemMap.value.values())),
    itemMapSize: p(() => h.itemMap.value.size),
    CollectionSlot: v,
    CollectionItem: y
  };
}
export { g as n, h as r, v as t };